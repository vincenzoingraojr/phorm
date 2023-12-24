import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import path from "path";
import favicon from "serve-favicon";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./entities/User";
import { createAccessToken, createRefreshToken } from "./auth/auth";
import { sendRefreshToken } from "./auth/sendRefreshToken";
import { getPresignedUrl } from "./helpers/getPresignedUrl";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { execute, subscribe } from "graphql";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ChatResolver, MessageResolver } from "./resolvers/ChatResolver";

async function main() {
    const app = express();

    app.use(cookieParser());
    
    app.use(
        cors({
            origin: new RegExp(process.env.ORIGIN!),
            credentials: true,
        })
    );

    app.use(express.static(path.join(__dirname, "./public")));
    app.use(favicon(path.join(__dirname, "./public", "favicon.ico")));
    app.get(process.env.NODE_ENV === "production" ? "/*" : "/", (_req, res) => {
        res.sendFile("index.html", {
            root: path.join(__dirname, "./public"),
        });
    });

    app.use(express.json());

    app.post("/", async (req, res) => {
        const token = req.cookies.cke;

        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }

        let payload: any = null;

        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch (error) {
            console.error(error);
            return res.send({ ok: false, accessToken: "" });
        }

        const user = await User.findOne({ where: { id: payload.id } });

        if (!user) {
            return res.send({ ok: false, accessToken: "" });
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }

        sendRefreshToken(res, createRefreshToken(user));

        return res.send({ ok: true, accessToken: createAccessToken(user) });
    });

    app.post("/presigned-url", async (req, res) => {
        const { key } = req.body;
        const url = await getPresignedUrl(key);
        res.send({ url });
    });

    await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        synchronize: true,
        logging: false,
        entities: ["src/entities/**/*.ts"],
        migrations: ["src/migrations/**/*.ts"],
        subscribers: ["src/subscribers/**/*.ts"],
        cli: {
            entitiesDir: "src/entities",
            migrationsDir: "src/migrations",
            subscribersDir: "src/subscribers",
        },
        ssl:
            process.env.NODE_ENV === "production"
                ? { rejectUnauthorized: false }
                : false,
    });

    const schema = await buildSchema({
        resolvers: [UserResolver, ChatResolver, MessageResolver],
    });

    const httpServer = http.createServer(app);
    const wsServer = new WebSocketServer({ server: httpServer, path: "/graphql" });

    const serverCleanup = useServer({ 
        schema, 
        execute, 
        subscribe,
    }, wsServer);

    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
        plugins: [        
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });

    await server.start();

    server.applyMiddleware({ app, cors: false });

    httpServer.listen({ port: process.env.PORT || 4000 }, () => {
        console.log("Phorm server started.");
    });
}

main().catch((error) => {
    console.log(error);
});
