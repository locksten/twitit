import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Me>;
  userById?: Maybe<User>;
  userSearch: Array<User>;
  twitById?: Maybe<Twit>;
};


export type QueryUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryUserSearchArgs = {
  searchTerm: Scalars['String'];
};


export type QueryTwitByIdArgs = {
  id: Scalars['ID'];
};

export type Me = {
  __typename?: 'Me';
  user: User;
  feed: Array<Twit>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  _type: Scalars['String'];
  username: Scalars['String'];
  createdAt: Scalars['Date'];
  followers: Array<User>;
  followerCount: Scalars['Int'];
  followees: Array<User>;
  followeeCount: Scalars['Int'];
  twits: Array<Twit>;
};


export type Twit = {
  __typename?: 'Twit';
  id?: Maybe<Scalars['ID']>;
  _type: Scalars['String'];
  text: Scalars['String'];
  createdAt: Scalars['Date'];
  author: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: RegistrationResult;
  login: LoginResult;
  makeTwit?: Maybe<Twit>;
};


export type MutationRegisterArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationMakeTwitArgs = {
  text: Scalars['String'];
};

export type RegistrationResult = SuccessfulLoginResult | FailedRegistrationResult;

export type SuccessfulLoginResult = {
  __typename?: 'SuccessfulLoginResult';
  _type: Scalars['String'];
  user: User;
  authTokens: AuthTokens;
};

export type AuthTokens = {
  __typename?: 'AuthTokens';
  _type: Scalars['String'];
  accessToken: Scalars['String'];
};

export type FailedRegistrationResult = {
  __typename?: 'FailedRegistrationResult';
  _type: Scalars['String'];
  reason: Scalars['String'];
};

export type LoginResult = SuccessfulLoginResult | FailedLoginResult;

export type FailedLoginResult = {
  __typename?: 'FailedLoginResult';
  _type: Scalars['String'];
  reason: Scalars['String'];
};

export type TwitFragment = (
  { __typename?: 'Twit' }
  & Pick<Twit, 'id' | 'text'>
  & { author: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type MyTwitListQueryVariables = Exact<{ [key: string]: never; }>;


export type MyTwitListQuery = (
  { __typename?: 'Query' }
  & { userById?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
    & { twits: Array<(
      { __typename?: 'Twit' }
      & Pick<Twit, 'id' | 'createdAt'>
      & TwitFragment
    )> }
  )> }
);

export type MakeTwitMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type MakeTwitMutation = (
  { __typename?: 'Mutation' }
  & { makeTwit?: Maybe<(
    { __typename?: 'Twit' }
    & Pick<Twit, 'id' | 'createdAt'>
    & TwitFragment
  )> }
);

export const TwitFragmentDoc: DocumentNode<TwitFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Twit"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Twit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]};
export const MyTwitListDocument: DocumentNode<MyTwitListQuery, MyTwitListQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyTwitList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"StringValue","value":"26","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"twits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Twit"}}]}}]}}]}},...TwitFragmentDoc.definitions]};
export const MakeTwitDocument: DocumentNode<MakeTwitMutation, MakeTwitMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"makeTwit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"makeTwit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Twit"}}]}}]}},...TwitFragmentDoc.definitions]};