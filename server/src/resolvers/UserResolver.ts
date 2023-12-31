import { User } from "../entities/User";
import {
    Arg,
    Ctx,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import argon2 from "argon2";
import { MyContext } from "../types";
import { sendRefreshToken } from "../auth/sendRefreshToken";
import { createAccessToken, createRefreshToken } from "../auth/auth";
import { verify } from "jsonwebtoken";
import { sendVerificationEmail } from "../helpers/sendVerificationEmail";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { FieldError } from "./common";
import { isAuth } from "../middleware/isAuth";
import { Chat, Event, Message } from "../entities/Chat";

@ObjectType()
export class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;

    @Field(() => String, { nullable: true })
    accessToken?: string;

    @Field(() => String, { nullable: true })
    status?: string;
}

@Resolver(User)
export class UserResolver {
    @Query(() => User, { nullable: true })
    me(@Ctx() context: MyContext) {
        const authorization = context.req.headers["authorization"];

        if (!authorization) {
            return null;
        }

        try {
            const token = authorization.split(" ")[1];
            const payload: any = verify(
                token,
                process.env.ACCESS_TOKEN_SECRET!
            );
            
            return User.findOne({
                where: { id: payload.id },
            });
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    @Mutation(() => UserResponse, { nullable: true })
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { res }: MyContext
    ): Promise<UserResponse> {
        let errors = [];
        let user;
        let accessToken;
        let status;

        user = await User.findOne({
            where: { email },
        });

        if (!user) {
            errors.push({
                field: "email",
                message: "Sorry, but we can't find your account",
            });
        } else {
            const valid = await argon2.verify(user.password, password);

            if (!valid) {
                errors.push({
                    field: "password",
                    message: "Incorrect password",
                });
            } else {
                if (user.emailVerified) {
                    sendRefreshToken(res, createRefreshToken(user));
                    accessToken = createAccessToken(user);

                    status = "You are now logged in.";
                } else {
                    status =
                        "Your email address is not verified. We just sent you an email containing the instructions for verification.";
                    const verifyToken = createAccessToken(user);
                    sendVerificationEmail(user.email, verifyToken);
                }
            }
        }

        return {
            user,
            errors,
            accessToken,
            status,
        };
    }

    @Mutation(() => UserResponse, { nullable: true })
    async signup(
        @Arg("email") email: string,
        @Arg("firstName") firstName: string,
        @Arg("lastName") lastName: string,
        @Arg("password") password: string,
    ): Promise<UserResponse> {
        let errors = [];

        if (!email.includes("@") || email === "" || email === null) {
            errors.push({
                field: "email",
                message: "Invalid email",
            });
        }
        if (password.length <= 2) {
            errors.push({
                field: "password",
                message: "The password lenght must be greater than 2",
            });
        }
        if (firstName === "" || firstName === null) {
            errors.push({
                field: "firstName",
                message: "The first name field cannot be empty",
            });
        }
        if (lastName === "" || lastName === null) {
            errors.push({
                field: "lastName",
                message: "The last name field cannot be empty",
            });
        }

        let status;
        const hashedPassword = await argon2.hash(password);

        if (errors.length === 0) {
            try {
                const user = await User.create({
                    email,
                    password: hashedPassword,
                    firstName,
                    lastName,
                    emailVerified: false,
                }).save();

                const token = createAccessToken(user);
                sendVerificationEmail(email, token);
                status =
                    "Check your inbox, we just sent you an email with the instructions to verify your account.";
            } catch (error) {
                console.log(error);

                if (error.detail.includes("email")) {
                    errors.push({
                        field: "email",
                        message: "A user using this email already exists",
                    });
                }
            }
        }

        return {
            errors,
            status,
        };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async logout(@Ctx() { res, payload }: MyContext) {
        if (!payload) {
            return false;
        }

        sendRefreshToken(res, "");
        return true;
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(@Arg("id", () => Number) id: number) {
        await getConnection()
            .getRepository(User)
            .increment({ id }, "tokenVersion", 1);

        return true;
    }

    // web implementation
    @Mutation(() => UserResponse)
    async verifyEmailAddress(
        @Arg("token") token: string
    ): Promise<UserResponse> {
        let status = "";

        try {
            const payload: any = verify(
                token,
                process.env.ACCESS_TOKEN_SECRET!
            );
            await User.update(
                {
                    id: payload.id,
                },
                {
                    emailVerified: true,
                }
            );
            status = "Your email address is now verified.";
        } catch (error) {
            console.error(error);
            status =
                "An error has occurred. Please repeat the email address verification.";
        }

        return { status };
    }

    @Mutation(() => UserResponse)
    async sendRecoveryEmail(
        @Arg("email") email: string
    ): Promise<UserResponse> {
        let transporter = nodemailer.createTransport({
            host: "authsmtp.securemail.pro",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SUPPORT_EMAIL_USER,
                pass: process.env.SUPPORT_EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let errors = [];
        let user;
        let status = "";

        if (!email.includes("@") || email === "" || email === null) {
            errors.push({
                field: "email",
                message: "Invalid email",
            });
        } else {
            user = await User.findOne({ where: { email } });

            if (!user) {
                errors.push({
                    field: "email",
                    message:
                        "This email address is not associated with any account",
                });
            } else if (!user.emailVerified) {
                status =
                    "Your email address is not verified. We just sent you an email containing the instructions for verification.";
                const verifyToken = createAccessToken(user);
                sendVerificationEmail(user.email, verifyToken);
            } else {
                const token = createAccessToken(user);
                const link = `${process.env.CLIENT_ORIGIN}/modify-password/${token}`;

                try {
                    ejs.renderFile(
                        path.join(
                            __dirname,
                            "../helpers/templates/RecoveryEmail.ejs"
                        ),
                        { link: link },
                        function (error, data) {
                            if (error) {
                                console.log(error);
                            } else {
                                transporter.sendMail({
                                    from: "Phorm <support@phormapp.com>",
                                    to: email,
                                    subject: "Recover your password",
                                    html: data,
                                });
                                status =
                                    "Check your inbox, we just sent you an email with the instructions to recover your account password.";
                            }
                        }
                    );
                } catch (error) {
                    console.error(error);
                    errors.push({
                        field: "email",
                        message:
                            "Could not send the email, check your internet connection",
                    });
                }
            }
        }

        return {
            errors,
            status,
        };
    }

    // web implementation
    @Mutation(() => UserResponse)
    async notAuthModifyPassword(
        @Arg("password") password: string,
        @Arg("confirmPassword") confirmPassword: string,
        @Arg("token") token: string
    ): Promise<UserResponse> {
        let errors = [];

        if (password.length <= 2) {
            errors.push({
                field: "password",
                message: "The password lenght must be greater than 2",
            });
        }

        if (confirmPassword.length <= 2) {
            errors.push({
                field: "confirmPassword",
                message:
                    "The confirmation password lenght must be greater than 2",
            });
        }

        if (password != confirmPassword) {
            errors.push(
                {
                    field: "password",
                    message: "The two passwords do not match",
                },
                {
                    field: "confirmPassword",
                    message: "The two passwords do not match",
                }
            );
        }

        let status = "";

        if (errors.length === 0) {
            try {
                const payload: any = verify(
                    token,
                    process.env.ACCESS_TOKEN_SECRET!
                );
                await User.update(
                    {
                        id: payload.id,
                    },
                    {
                        password: await argon2.hash(password),
                    }
                );

                status = "The password has been changed, now you can log in.";
            } catch (error) {
                status =
                    "An error has occurred. Please repeat the password recovery operation.";
            }
        }

        return {
            status,
            errors,
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async editProfile(
        @Arg("firstName") firstName: string,
        @Arg("lastName") lastName: string,
        @Arg("profilePicture") profilePicture: string,
        @Ctx() { payload }: MyContext
    ): Promise<UserResponse> {
        let errors = [];
        let user;
        let status = "";

        if (firstName === "" || firstName === null) {
            errors.push({
                field: "firstName",
                message: "The first name field cannot be empty",
            });
        }
        if (lastName === "" || lastName === null) {
            errors.push({
                field: "lastName",
                message: "The last name field cannot be empty",
            });
        }

        if (!payload) {
            status = "You are not authenticated.";
        } else if (errors.length === 0) {
            try {
                await User.update(
                    {
                        id: payload.id,
                    },
                    {
                        firstName,
                        lastName,
                        profilePicture,
                    },
                );

                user = await User.findOne({
                    where: { id: payload.id },
                });
                status = "Your profile has been updated.";
            } catch (error) {
                console.log(error);
                status =
                    "An error has occurred. Please try again later to edit your profile";
            }
        }

        return {
            errors,
            user,
            status,
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async editEmailAddress(
        @Arg("email") email: string,
        @Arg("confirmEmail") confirmEmail: string,
        @Ctx() { payload }: MyContext
    ): Promise<UserResponse> {
        let transporter = nodemailer.createTransport({
            host: "authsmtp.securemail.pro",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SUPPORT_EMAIL_USER,
                pass: process.env.SUPPORT_EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        let errors = [];

        if (!email.includes("@") || email === "" || email === null) {
            errors.push({
                field: "email",
                message: "Invalid email",
            });
        }
        if (!confirmEmail.includes("@") || confirmEmail === "" || confirmEmail === null) {
            errors.push({
                field: "confirmEmail",
                message: "Invalid confirmation email",
            });
        }

        if (email != confirmEmail) {
            errors.push(
                {
                    field: "email",
                    message: "The two email addresses do not match",
                },
                {
                    field: "confirmEmail",
                    message: "The two email addresses do not match",
                }
            );
        }

        let status = "";
        let user = await User.findOne({
            where: { id: payload?.id },
        });

        if (!payload) {
            status = "You are not authenticated.";
        } else if (user && user.email === email) {
            errors.push({
                field: "email",
                message: "The email address you entered is the one you are already using",
            });
        } else if (errors.length === 0) {
            const token = createAccessToken(user!);
            const link = `${process.env.CLIENT_ORIGIN}/account/verify-email/${token}`;

            try {
                await User.update(
                    {
                        id: payload.id,
                    },
                    {
                        email,
                        emailVerified: false,
                    },
                );

                ejs.renderFile(
                    path.join(
                        __dirname,
                        "../helpers/templates/VerifyNewEmail.ejs"
                    ),
                    { link: link },
                    function (error, data) {
                        if (error) {
                            console.log(error);
                            status = "Could not send the email, check your internet connection.";
                        } else {
                            transporter.sendMail({
                                from: "Phorm <support@phormapp.com>",
                                to: email,
                                subject: "Verify your new email address",
                                html: data,
                            });
                            status =
                                "Check your inbox, we just sent you an email with the instructions to verify your new email address.";
                        }
                    }
                );

                user = await User.findOne({
                    where: { id: payload?.id },
                });
            } catch (error) {
                console.error(error);
                if (error.code === "23505") {
                    status = "A user using this email address already exists.";
                } else {
                    status = "An error has occurred. Please try again later to edit your email address.";
                }
            }
        }

        return {
            status,
            errors,
            user,
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async authSendVerificationEmail(
        @Ctx() { payload }: MyContext
    ): Promise<UserResponse> {
        let transporter = nodemailer.createTransport({
            host: "authsmtp.securemail.pro",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SUPPORT_EMAIL_USER,
                pass: process.env.SUPPORT_EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let status = "";
        
        const user = await User.findOne({
            where: { id: payload?.id },
        });

        if (!payload) {
            status = "You are not authenticated.";
        } else if (user) {
            const token = createAccessToken(user);
            const link = `${process.env.CLIENT_ORIGIN}/account/verify-email/${token}`;

            try {
                ejs.renderFile(
                    path.join(
                        __dirname,
                        "../helpers/templates/VerifyEmail.ejs"
                    ),
                    { link: link },
                    function (error, data) {
                        if (error) {
                            console.log(error);
                        } else {
                            transporter.sendMail({
                                from: "Phorm <support@phormapp.com>",
                                to: user.email,
                                subject: "Verify your email address",
                                html: data,
                            });
                            status =
                                "Check your inbox, we just sent you an email with the instructions to verify your email address.";
                        }
                    }
                );
            } catch (error) {
                console.error(error);
                status = "Could not send the email, check your internet connection.";
            }
        }

        return {
            status
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async changePassword(
        @Arg("currentPassword") currentPassword: string,
        @Arg("password") password: string,
        @Arg("confirmPassword") confirmPassword: string,
        @Ctx() { payload }: MyContext
    ): Promise<UserResponse> {
        let errors = [];

        if (currentPassword.length <= 2) {
            errors.push({
                field: "currentPassword",
                message: "The current password lenght must be greater than 2",
            });
        }

        if (password.length <= 2) {
            errors.push({
                field: "password",
                message: "The password lenght must be greater than 2",
            });
        }

        if (confirmPassword.length <= 2) {
            errors.push({
                field: "confirmPassword",
                message:
                    "The confirmation password lenght must be greater than 2",
            });
        }

        if (password != confirmPassword) {
            errors.push(
                {
                    field: "password",
                    message: "The two passwords do not match",
                },
                {
                    field: "confirmPassword",
                    message: "The two passwords do not match",
                }
            );
        }

        let status = "";
        const user = await User.findOne({
            where: { id: payload?.id },
        });

        let valid = false;

        if (user) {
            valid = await argon2.verify(user.password, currentPassword);
        }

        if (!payload) {
            status = "You are not authenticated.";
        } else if (!valid) {
            errors.push({
                field: "currentPassword",
                message: "Incorrect password",
            });
        } else if (errors.length === 0) {
            try {
                
                await User.update(
                    {
                        id: payload.id,
                    },
                    {
                        password: await argon2.hash(password),
                    }
                );

                status = "The password has been changed.";
            } catch (error) {
                console.error(error);

                status =
                    "An error has occurred. Please try again later to change your account password";
            }
        }

        return {
            status,
            errors,
        };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteAccount(
        @Ctx() { payload }: MyContext
    ) {
        if (!payload) {
            return false;
        }
        
        const me = await User.findOne({ where: { id: payload.id } });

        if (!me) {
            return false;
        } else {
            try {
                await Message.delete({ chat: { creator: me } });
                await Event.delete({ chat: { creator: me } });
                await Chat.delete({ creator: me });
                await User.delete({ id: payload.id });
            
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    }
}
