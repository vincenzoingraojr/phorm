import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Chat = {
  __typename?: 'Chat';
  chatId: Scalars['String'];
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  events?: Maybe<Array<Event>>;
  id: Scalars['Int'];
  messages?: Maybe<Array<Message>>;
  messagesCount?: Maybe<Scalars['Float']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ChatResponse = {
  __typename?: 'ChatResponse';
  chat?: Maybe<Chat>;
  errors?: Maybe<Array<FieldError>>;
  status?: Maybe<Scalars['String']>;
};

export type Event = {
  __typename?: 'Event';
  chat: Chat;
  createdAt: Scalars['String'];
  eventMessage: Scalars['String'];
  eventType: Scalars['String'];
  fromUser: Scalars['Boolean'];
  id: Scalars['Int'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  chat: Chat;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  fromUser: Scalars['Boolean'];
  id: Scalars['Int'];
  isEdited?: Maybe<Scalars['Boolean']>;
  isReplyTo?: Maybe<Scalars['Int']>;
  messageId: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
};

/** Message or Event type */
export type MessageOrEvent = Event | Message;

export type Mutation = {
  __typename?: 'Mutation';
  authSendVerificationEmail: UserResponse;
  changePassword: UserResponse;
  createChat?: Maybe<ChatResponse>;
  deleteAccount: Scalars['Boolean'];
  deleteChat: Scalars['Boolean'];
  editChatInfo: ChatResponse;
  editEmailAddress: UserResponse;
  editProfile: UserResponse;
  login?: Maybe<UserResponse>;
  logout: Scalars['Boolean'];
  notAuthModifyPassword: UserResponse;
  revokeRefreshTokensForUser: Scalars['Boolean'];
  sendMessage?: Maybe<Message>;
  sendRecoveryEmail: UserResponse;
  signup?: Maybe<UserResponse>;
  verifyEmailAddress: UserResponse;
};


export type MutationChangePasswordArgs = {
  confirmPassword: Scalars['String'];
  currentPassword: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateChatArgs = {
  content: Scalars['String'];
  type: Scalars['String'];
};


export type MutationDeleteChatArgs = {
  chatId: Scalars['String'];
};


export type MutationEditChatInfoArgs = {
  chatId: Scalars['String'];
  title: Scalars['String'];
};


export type MutationEditEmailAddressArgs = {
  confirmEmail: Scalars['String'];
  email: Scalars['String'];
};


export type MutationEditProfileArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  profilePicture: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationNotAuthModifyPasswordArgs = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  id: Scalars['Float'];
};


export type MutationSendMessageArgs = {
  chatId: Scalars['String'];
  content: Scalars['String'];
  type: Scalars['String'];
};


export type MutationSendRecoveryEmailArgs = {
  email: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVerifyEmailAddressArgs = {
  token: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  chats: Array<Chat>;
  findChat?: Maybe<Chat>;
  latestMessageOrEvent?: Maybe<MessageOrEvent>;
  me?: Maybe<User>;
  messagesAndEvents: Array<MessageOrEvent>;
};


export type QueryFindChatArgs = {
  chatId?: InputMaybe<Scalars['String']>;
};


export type QueryLatestMessageOrEventArgs = {
  chatId?: InputMaybe<Scalars['String']>;
};


export type QueryMessagesAndEventsArgs = {
  chatId?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessageOrEvent: MessageOrEvent;
};


export type SubscriptionNewMessageOrEventArgs = {
  chatId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  chats?: Maybe<Array<Chat>>;
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  profilePicture?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  accessToken?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  status?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type AuthSendVerificationEmailMutationVariables = Exact<{ [key: string]: never; }>;


export type AuthSendVerificationEmailMutation = { __typename?: 'Mutation', authSendVerificationEmail: { __typename?: 'UserResponse', status?: string | null | undefined } };

export type ChangePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type ChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChatsQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'Chat', id: number, chatId: string, creatorId: number, title: string, createdAt: string, updatedAt: string, messagesCount?: number | null | undefined, creator: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, emailVerified: boolean, profilePicture?: string | null | undefined }, messages?: Array<{ __typename?: 'Message', id: number, messageId: string, fromUser: boolean, isReplyTo?: number | null | undefined, type: string, content?: string | null | undefined, createdAt: string, updatedAt: string, isEdited?: boolean | null | undefined }> | null | undefined, events?: Array<{ __typename?: 'Event', id: number, eventType: string, eventMessage: string, fromUser: boolean, createdAt: string }> | null | undefined }> };

export type CreateChatMutationVariables = Exact<{
  type: Scalars['String'];
  content: Scalars['String'];
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat?: { __typename?: 'ChatResponse', status?: string | null | undefined, chat?: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, title: string, createdAt: string, updatedAt: string, messagesCount?: number | null | undefined, creator: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, emailVerified: boolean, profilePicture?: string | null | undefined }, messages?: Array<{ __typename?: 'Message', id: number, messageId: string, fromUser: boolean, isReplyTo?: number | null | undefined, type: string, content?: string | null | undefined, createdAt: string, updatedAt: string, isEdited?: boolean | null | undefined }> | null | undefined, events?: Array<{ __typename?: 'Event', id: number, eventType: string, eventMessage: string, fromUser: boolean, createdAt: string }> | null | undefined } | null | undefined } | null | undefined };

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: boolean };

export type DeleteChatMutationVariables = Exact<{
  chatId: Scalars['String'];
}>;


export type DeleteChatMutation = { __typename?: 'Mutation', deleteChat: boolean };

export type EditChatInfoMutationVariables = Exact<{
  chatId: Scalars['String'];
  title: Scalars['String'];
}>;


export type EditChatInfoMutation = { __typename?: 'Mutation', editChatInfo: { __typename?: 'ChatResponse', status?: string | null | undefined, chat?: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, title: string, createdAt: string, updatedAt: string, messagesCount?: number | null | undefined, creator: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, emailVerified: boolean, profilePicture?: string | null | undefined }, messages?: Array<{ __typename?: 'Message', id: number, messageId: string, fromUser: boolean, isReplyTo?: number | null | undefined, type: string, content?: string | null | undefined, createdAt: string, updatedAt: string, isEdited?: boolean | null | undefined }> | null | undefined, events?: Array<{ __typename?: 'Event', id: number, eventType: string, eventMessage: string, fromUser: boolean, createdAt: string }> | null | undefined } | null | undefined } };

export type EditEmailAddressMutationVariables = Exact<{
  email: Scalars['String'];
  confirmEmail: Scalars['String'];
}>;


export type EditEmailAddressMutation = { __typename?: 'Mutation', editEmailAddress: { __typename?: 'UserResponse', status?: string | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, emailVerified: boolean, profilePicture?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type EditProfileMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  profilePicture: Scalars['String'];
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'UserResponse', status?: string | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, emailVerified: boolean, profilePicture?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type FindChatQueryVariables = Exact<{
  chatId?: InputMaybe<Scalars['String']>;
}>;


export type FindChatQuery = { __typename?: 'Query', findChat?: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, title: string, createdAt: string, updatedAt: string, messagesCount?: number | null | undefined, creator: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, emailVerified: boolean, profilePicture?: string | null | undefined }, messages?: Array<{ __typename?: 'Message', id: number, messageId: string, fromUser: boolean, isReplyTo?: number | null | undefined, type: string, content?: string | null | undefined, createdAt: string, updatedAt: string, isEdited?: boolean | null | undefined }> | null | undefined, events?: Array<{ __typename?: 'Event', id: number, eventType: string, eventMessage: string, fromUser: boolean, createdAt: string }> | null | undefined } | null | undefined };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'UserResponse', accessToken?: string | null | undefined, status?: string | null | undefined, user?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, emailVerified: boolean, profilePicture?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } | null | undefined };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, emailVerified: boolean, profilePicture?: string | null | undefined } | null | undefined };

export type MessagesAndEventsQueryVariables = Exact<{
  chatId?: InputMaybe<Scalars['String']>;
}>;


export type MessagesAndEventsQuery = { __typename?: 'Query', messagesAndEvents: Array<{ __typename?: 'Event', id: number, eventType: string, eventMessage: string, fromUser: boolean, createdAt: string } | { __typename?: 'Message', id: number, messageId: string, fromUser: boolean, isReplyTo?: number | null | undefined, type: string, content?: string | null | undefined, createdAt: string, updatedAt: string, isEdited?: boolean | null | undefined }> };

export type NewMessageOrEventSubscriptionVariables = Exact<{
  chatId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
}>;


export type NewMessageOrEventSubscription = { __typename?: 'Subscription', newMessageOrEvent: { __typename?: 'Event', id: number, eventType: string, eventMessage: string, fromUser: boolean, createdAt: string } | { __typename?: 'Message', id: number, messageId: string, fromUser: boolean, isReplyTo?: number | null | undefined, type: string, content?: string | null | undefined, createdAt: string, updatedAt: string, isEdited?: boolean | null | undefined } };

export type NotAuthModifyPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
}>;


export type NotAuthModifyPasswordMutation = { __typename?: 'Mutation', notAuthModifyPassword: { __typename?: 'UserResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type SendMessageMutationVariables = Exact<{
  type: Scalars['String'];
  content: Scalars['String'];
  chatId: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'Message', id: number, messageId: string, fromUser: boolean, isReplyTo?: number | null | undefined, type: string, content?: string | null | undefined, createdAt: string, updatedAt: string, isEdited?: boolean | null | undefined, chat: { __typename?: 'Chat', id: number, chatId: string, creatorId: number, title: string, createdAt: string, updatedAt: string, messagesCount?: number | null | undefined } } | null | undefined };

export type SendRecoveryEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendRecoveryEmailMutation = { __typename?: 'Mutation', sendRecoveryEmail: { __typename?: 'UserResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type SignupMutationVariables = Exact<{
  password: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  email: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename?: 'UserResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } | null | undefined };

export type VerifyEmailAddressMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailAddressMutation = { __typename?: 'Mutation', verifyEmailAddress: { __typename?: 'UserResponse', status?: string | null | undefined } };


export const AuthSendVerificationEmailDocument = gql`
    mutation AuthSendVerificationEmail {
  authSendVerificationEmail {
    status
  }
}
    `;
export type AuthSendVerificationEmailMutationFn = Apollo.MutationFunction<AuthSendVerificationEmailMutation, AuthSendVerificationEmailMutationVariables>;

/**
 * __useAuthSendVerificationEmailMutation__
 *
 * To run a mutation, you first call `useAuthSendVerificationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthSendVerificationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authSendVerificationEmailMutation, { data, loading, error }] = useAuthSendVerificationEmailMutation({
 *   variables: {
 *   },
 * });
 */
export function useAuthSendVerificationEmailMutation(baseOptions?: Apollo.MutationHookOptions<AuthSendVerificationEmailMutation, AuthSendVerificationEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthSendVerificationEmailMutation, AuthSendVerificationEmailMutationVariables>(AuthSendVerificationEmailDocument, options);
      }
export type AuthSendVerificationEmailMutationHookResult = ReturnType<typeof useAuthSendVerificationEmailMutation>;
export type AuthSendVerificationEmailMutationResult = Apollo.MutationResult<AuthSendVerificationEmailMutation>;
export type AuthSendVerificationEmailMutationOptions = Apollo.BaseMutationOptions<AuthSendVerificationEmailMutation, AuthSendVerificationEmailMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($currentPassword: String!, $password: String!, $confirmPassword: String!) {
  changePassword(
    currentPassword: $currentPassword
    password: $password
    confirmPassword: $confirmPassword
  ) {
    status
    errors {
      field
      message
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      currentPassword: // value for 'currentPassword'
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChatsDocument = gql`
    query Chats {
  chats {
    id
    chatId
    creatorId
    creator {
      id
      firstName
      lastName
      email
      emailVerified
      profilePicture
    }
    title
    createdAt
    updatedAt
    messagesCount
    messages {
      id
      messageId
      fromUser
      isReplyTo
      type
      content
      createdAt
      updatedAt
      isEdited
    }
    events {
      id
      eventType
      eventMessage
      fromUser
      createdAt
    }
  }
}
    `;

/**
 * __useChatsQuery__
 *
 * To run a query within a React component, call `useChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useChatsQuery(baseOptions?: Apollo.QueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, options);
      }
export function useChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, options);
        }
export type ChatsQueryHookResult = ReturnType<typeof useChatsQuery>;
export type ChatsLazyQueryHookResult = ReturnType<typeof useChatsLazyQuery>;
export type ChatsQueryResult = Apollo.QueryResult<ChatsQuery, ChatsQueryVariables>;
export const CreateChatDocument = gql`
    mutation CreateChat($type: String!, $content: String!) {
  createChat(type: $type, content: $content) {
    status
    chat {
      id
      chatId
      creatorId
      creator {
        id
        firstName
        lastName
        email
        emailVerified
        profilePicture
      }
      title
      createdAt
      updatedAt
      messagesCount
      messages {
        id
        messageId
        fromUser
        isReplyTo
        type
        content
        createdAt
        updatedAt
        isEdited
      }
      events {
        id
        eventType
        eventMessage
        fromUser
        createdAt
      }
    }
  }
}
    `;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      type: // value for 'type'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, options);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount {
  deleteAccount
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const DeleteChatDocument = gql`
    mutation DeleteChat($chatId: String!) {
  deleteChat(chatId: $chatId)
}
    `;
export type DeleteChatMutationFn = Apollo.MutationFunction<DeleteChatMutation, DeleteChatMutationVariables>;

/**
 * __useDeleteChatMutation__
 *
 * To run a mutation, you first call `useDeleteChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChatMutation, { data, loading, error }] = useDeleteChatMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useDeleteChatMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChatMutation, DeleteChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChatMutation, DeleteChatMutationVariables>(DeleteChatDocument, options);
      }
export type DeleteChatMutationHookResult = ReturnType<typeof useDeleteChatMutation>;
export type DeleteChatMutationResult = Apollo.MutationResult<DeleteChatMutation>;
export type DeleteChatMutationOptions = Apollo.BaseMutationOptions<DeleteChatMutation, DeleteChatMutationVariables>;
export const EditChatInfoDocument = gql`
    mutation EditChatInfo($chatId: String!, $title: String!) {
  editChatInfo(chatId: $chatId, title: $title) {
    status
    chat {
      id
      chatId
      creatorId
      creator {
        id
        firstName
        lastName
        email
        emailVerified
        profilePicture
      }
      title
      createdAt
      updatedAt
      messagesCount
      messages {
        id
        messageId
        fromUser
        isReplyTo
        type
        content
        createdAt
        updatedAt
        isEdited
      }
      events {
        id
        eventType
        eventMessage
        fromUser
        createdAt
      }
    }
  }
}
    `;
export type EditChatInfoMutationFn = Apollo.MutationFunction<EditChatInfoMutation, EditChatInfoMutationVariables>;

/**
 * __useEditChatInfoMutation__
 *
 * To run a mutation, you first call `useEditChatInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditChatInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editChatInfoMutation, { data, loading, error }] = useEditChatInfoMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useEditChatInfoMutation(baseOptions?: Apollo.MutationHookOptions<EditChatInfoMutation, EditChatInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditChatInfoMutation, EditChatInfoMutationVariables>(EditChatInfoDocument, options);
      }
export type EditChatInfoMutationHookResult = ReturnType<typeof useEditChatInfoMutation>;
export type EditChatInfoMutationResult = Apollo.MutationResult<EditChatInfoMutation>;
export type EditChatInfoMutationOptions = Apollo.BaseMutationOptions<EditChatInfoMutation, EditChatInfoMutationVariables>;
export const EditEmailAddressDocument = gql`
    mutation EditEmailAddress($email: String!, $confirmEmail: String!) {
  editEmailAddress(email: $email, confirmEmail: $confirmEmail) {
    user {
      id
      firstName
      lastName
      email
      emailVerified
      profilePicture
    }
    errors {
      field
      message
    }
    status
  }
}
    `;
export type EditEmailAddressMutationFn = Apollo.MutationFunction<EditEmailAddressMutation, EditEmailAddressMutationVariables>;

/**
 * __useEditEmailAddressMutation__
 *
 * To run a mutation, you first call `useEditEmailAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditEmailAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editEmailAddressMutation, { data, loading, error }] = useEditEmailAddressMutation({
 *   variables: {
 *      email: // value for 'email'
 *      confirmEmail: // value for 'confirmEmail'
 *   },
 * });
 */
export function useEditEmailAddressMutation(baseOptions?: Apollo.MutationHookOptions<EditEmailAddressMutation, EditEmailAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditEmailAddressMutation, EditEmailAddressMutationVariables>(EditEmailAddressDocument, options);
      }
export type EditEmailAddressMutationHookResult = ReturnType<typeof useEditEmailAddressMutation>;
export type EditEmailAddressMutationResult = Apollo.MutationResult<EditEmailAddressMutation>;
export type EditEmailAddressMutationOptions = Apollo.BaseMutationOptions<EditEmailAddressMutation, EditEmailAddressMutationVariables>;
export const EditProfileDocument = gql`
    mutation EditProfile($firstName: String!, $lastName: String!, $profilePicture: String!) {
  editProfile(
    firstName: $firstName
    lastName: $lastName
    profilePicture: $profilePicture
  ) {
    user {
      id
      firstName
      lastName
      email
      emailVerified
      profilePicture
    }
    errors {
      field
      message
    }
    status
  }
}
    `;
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      profilePicture: // value for 'profilePicture'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;
export const FindChatDocument = gql`
    query FindChat($chatId: String) {
  findChat(chatId: $chatId) {
    id
    chatId
    creatorId
    creator {
      id
      firstName
      lastName
      email
      emailVerified
      profilePicture
    }
    title
    createdAt
    updatedAt
    messagesCount
    messages {
      id
      messageId
      fromUser
      isReplyTo
      type
      content
      createdAt
      updatedAt
      isEdited
    }
    events {
      id
      eventType
      eventMessage
      fromUser
      createdAt
    }
  }
}
    `;

/**
 * __useFindChatQuery__
 *
 * To run a query within a React component, call `useFindChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindChatQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useFindChatQuery(baseOptions?: Apollo.QueryHookOptions<FindChatQuery, FindChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindChatQuery, FindChatQueryVariables>(FindChatDocument, options);
      }
export function useFindChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindChatQuery, FindChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindChatQuery, FindChatQueryVariables>(FindChatDocument, options);
        }
export type FindChatQueryHookResult = ReturnType<typeof useFindChatQuery>;
export type FindChatLazyQueryHookResult = ReturnType<typeof useFindChatLazyQuery>;
export type FindChatQueryResult = Apollo.QueryResult<FindChatQuery, FindChatQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      id
      firstName
      lastName
      email
      emailVerified
      profilePicture
    }
    errors {
      field
      message
    }
    accessToken
    status
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    firstName
    lastName
    email
    emailVerified
    profilePicture
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MessagesAndEventsDocument = gql`
    query MessagesAndEvents($chatId: String) {
  messagesAndEvents(chatId: $chatId) {
    ... on Message {
      id
      messageId
      fromUser
      isReplyTo
      type
      content
      createdAt
      updatedAt
      isEdited
    }
    ... on Event {
      id
      eventType
      eventMessage
      fromUser
      createdAt
    }
  }
}
    `;

/**
 * __useMessagesAndEventsQuery__
 *
 * To run a query within a React component, call `useMessagesAndEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesAndEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesAndEventsQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useMessagesAndEventsQuery(baseOptions?: Apollo.QueryHookOptions<MessagesAndEventsQuery, MessagesAndEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesAndEventsQuery, MessagesAndEventsQueryVariables>(MessagesAndEventsDocument, options);
      }
export function useMessagesAndEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesAndEventsQuery, MessagesAndEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesAndEventsQuery, MessagesAndEventsQueryVariables>(MessagesAndEventsDocument, options);
        }
export type MessagesAndEventsQueryHookResult = ReturnType<typeof useMessagesAndEventsQuery>;
export type MessagesAndEventsLazyQueryHookResult = ReturnType<typeof useMessagesAndEventsLazyQuery>;
export type MessagesAndEventsQueryResult = Apollo.QueryResult<MessagesAndEventsQuery, MessagesAndEventsQueryVariables>;
export const NewMessageOrEventDocument = gql`
    subscription NewMessageOrEvent($chatId: String, $userId: Int) {
  newMessageOrEvent(chatId: $chatId, userId: $userId) {
    ... on Message {
      id
      messageId
      fromUser
      isReplyTo
      type
      content
      createdAt
      updatedAt
      isEdited
    }
    ... on Event {
      id
      eventType
      eventMessage
      fromUser
      createdAt
    }
  }
}
    `;

/**
 * __useNewMessageOrEventSubscription__
 *
 * To run a query within a React component, call `useNewMessageOrEventSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageOrEventSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageOrEventSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNewMessageOrEventSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMessageOrEventSubscription, NewMessageOrEventSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageOrEventSubscription, NewMessageOrEventSubscriptionVariables>(NewMessageOrEventDocument, options);
      }
export type NewMessageOrEventSubscriptionHookResult = ReturnType<typeof useNewMessageOrEventSubscription>;
export type NewMessageOrEventSubscriptionResult = Apollo.SubscriptionResult<NewMessageOrEventSubscription>;
export const NotAuthModifyPasswordDocument = gql`
    mutation NotAuthModifyPassword($token: String!, $confirmPassword: String!, $password: String!) {
  notAuthModifyPassword(
    token: $token
    confirmPassword: $confirmPassword
    password: $password
  ) {
    status
    errors {
      field
      message
    }
  }
}
    `;
export type NotAuthModifyPasswordMutationFn = Apollo.MutationFunction<NotAuthModifyPasswordMutation, NotAuthModifyPasswordMutationVariables>;

/**
 * __useNotAuthModifyPasswordMutation__
 *
 * To run a mutation, you first call `useNotAuthModifyPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotAuthModifyPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notAuthModifyPasswordMutation, { data, loading, error }] = useNotAuthModifyPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      confirmPassword: // value for 'confirmPassword'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useNotAuthModifyPasswordMutation(baseOptions?: Apollo.MutationHookOptions<NotAuthModifyPasswordMutation, NotAuthModifyPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotAuthModifyPasswordMutation, NotAuthModifyPasswordMutationVariables>(NotAuthModifyPasswordDocument, options);
      }
export type NotAuthModifyPasswordMutationHookResult = ReturnType<typeof useNotAuthModifyPasswordMutation>;
export type NotAuthModifyPasswordMutationResult = Apollo.MutationResult<NotAuthModifyPasswordMutation>;
export type NotAuthModifyPasswordMutationOptions = Apollo.BaseMutationOptions<NotAuthModifyPasswordMutation, NotAuthModifyPasswordMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($type: String!, $content: String!, $chatId: String!) {
  sendMessage(type: $type, content: $content, chatId: $chatId) {
    id
    messageId
    fromUser
    isReplyTo
    type
    content
    createdAt
    updatedAt
    isEdited
    chat {
      id
      chatId
      creatorId
      title
      createdAt
      updatedAt
      messagesCount
    }
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      type: // value for 'type'
 *      content: // value for 'content'
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const SendRecoveryEmailDocument = gql`
    mutation SendRecoveryEmail($email: String!) {
  sendRecoveryEmail(email: $email) {
    errors {
      field
      message
    }
    status
  }
}
    `;
export type SendRecoveryEmailMutationFn = Apollo.MutationFunction<SendRecoveryEmailMutation, SendRecoveryEmailMutationVariables>;

/**
 * __useSendRecoveryEmailMutation__
 *
 * To run a mutation, you first call `useSendRecoveryEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendRecoveryEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendRecoveryEmailMutation, { data, loading, error }] = useSendRecoveryEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendRecoveryEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendRecoveryEmailMutation, SendRecoveryEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendRecoveryEmailMutation, SendRecoveryEmailMutationVariables>(SendRecoveryEmailDocument, options);
      }
export type SendRecoveryEmailMutationHookResult = ReturnType<typeof useSendRecoveryEmailMutation>;
export type SendRecoveryEmailMutationResult = Apollo.MutationResult<SendRecoveryEmailMutation>;
export type SendRecoveryEmailMutationOptions = Apollo.BaseMutationOptions<SendRecoveryEmailMutation, SendRecoveryEmailMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($password: String!, $lastName: String!, $firstName: String!, $email: String!) {
  signup(
    password: $password
    lastName: $lastName
    firstName: $firstName
    email: $email
  ) {
    errors {
      field
      message
    }
    status
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      password: // value for 'password'
 *      lastName: // value for 'lastName'
 *      firstName: // value for 'firstName'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const VerifyEmailAddressDocument = gql`
    mutation VerifyEmailAddress($token: String!) {
  verifyEmailAddress(token: $token) {
    status
  }
}
    `;
export type VerifyEmailAddressMutationFn = Apollo.MutationFunction<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>;

/**
 * __useVerifyEmailAddressMutation__
 *
 * To run a mutation, you first call `useVerifyEmailAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailAddressMutation, { data, loading, error }] = useVerifyEmailAddressMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailAddressMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>(VerifyEmailAddressDocument, options);
      }
export type VerifyEmailAddressMutationHookResult = ReturnType<typeof useVerifyEmailAddressMutation>;
export type VerifyEmailAddressMutationResult = Apollo.MutationResult<VerifyEmailAddressMutation>;
export type VerifyEmailAddressMutationOptions = Apollo.BaseMutationOptions<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>;