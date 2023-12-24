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

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authSendVerificationEmail: UserResponse;
  changePassword: UserResponse;
  editEmailAddress: UserResponse;
  editProfile: UserResponse;
  login?: Maybe<UserResponse>;
  logout: Scalars['Boolean'];
  notAuthModifyPassword: UserResponse;
  revokeRefreshTokensForUser: Scalars['Boolean'];
  sendRecoveryEmail: UserResponse;
  signup?: Maybe<UserResponse>;
  verifyEmailAddress: UserResponse;
};


export type MutationChangePasswordArgs = {
  confirmPassword: Scalars['String'];
  currentPassword: Scalars['String'];
  password: Scalars['String'];
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
  me?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
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

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, emailVerified: boolean, profilePicture?: string | null | undefined } | null | undefined };

export type NotAuthModifyPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
}>;


export type NotAuthModifyPasswordMutation = { __typename?: 'Mutation', notAuthModifyPassword: { __typename?: 'UserResponse', status?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message: string }> | null | undefined } };

export type VerifyEmailAddressMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailAddressMutation = { __typename?: 'Mutation', verifyEmailAddress: { __typename?: 'UserResponse', status?: string | null | undefined } };


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