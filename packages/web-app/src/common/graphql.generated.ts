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
  userByName?: Maybe<User>;
  userSearch: Array<User>;
  twitById?: Maybe<Twit>;
  hashtagById?: Maybe<Hashtag>;
  hashtagByText?: Maybe<Hashtag>;
  hashtagSearch: Array<Hashtag>;
};


export type QueryUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryUserByNameArgs = {
  username: Scalars['String'];
};


export type QueryUserSearchArgs = {
  searchTerm: Scalars['String'];
};


export type QueryTwitByIdArgs = {
  id: Scalars['ID'];
};


export type QueryHashtagByIdArgs = {
  id: Scalars['ID'];
};


export type QueryHashtagByTextArgs = {
  text: Scalars['String'];
};


export type QueryHashtagSearchArgs = {
  searchTerm: Scalars['String'];
};

export type Me = {
  __typename?: 'Me';
  id: Scalars['ID'];
  user: User;
  feed: Array<Twit>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  _type: Scalars['String'];
  username: Scalars['String'];
  createdAt: Scalars['Date'];
  followers: Array<User>;
  followerCount: Scalars['Int'];
  followees: Array<User>;
  followeeCount: Scalars['Int'];
  iAmFollowing: Scalars['Boolean'];
  twits: Array<Twit>;
  likedTwits: Array<Twit>;
};


export type Twit = {
  __typename?: 'Twit';
  id: Scalars['ID'];
  _type: Scalars['String'];
  text: Scalars['String'];
  createdAt: Scalars['Date'];
  author: User;
  hashtags: Array<Hashtag>;
  likeCount: Scalars['Int'];
  iHaveLiked: Scalars['Boolean'];
};

export type Hashtag = {
  __typename?: 'Hashtag';
  id: Scalars['ID'];
  _type: Scalars['String'];
  text: Scalars['String'];
  twits: Array<Twit>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: RegistrationResult;
  login: LoginResult;
  makeTwit?: Maybe<Twit>;
  likeTwit?: Maybe<Twit>;
  unlikeTwit?: Maybe<Twit>;
  unfollowUser?: Maybe<Array<User>>;
  followUser?: Maybe<Array<User>>;
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


export type MutationLikeTwitArgs = {
  id: Scalars['ID'];
};


export type MutationUnlikeTwitArgs = {
  id: Scalars['ID'];
};


export type MutationUnfollowUserArgs = {
  id: Scalars['ID'];
};


export type MutationFollowUserArgs = {
  id: Scalars['ID'];
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

export type LoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInUserQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename: 'Me' }
    & Pick<Me, 'id'>
    & { user: (
      { __typename: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type FollowUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FollowUserMutation = (
  { __typename?: 'Mutation' }
  & { followUser?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'followeeCount' | 'followerCount' | 'iAmFollowing'>
  )>> }
);

export type UnfollowUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnfollowUserMutation = (
  { __typename?: 'Mutation' }
  & { unfollowUser?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'followeeCount' | 'followerCount' | 'iAmFollowing'>
  )>> }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'SuccessfulLoginResult' }
    & Pick<SuccessfulLoginResult, '_type'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, '_type' | 'id' | 'username'>
    ), authTokens: (
      { __typename?: 'AuthTokens' }
      & Pick<AuthTokens, '_type' | 'accessToken'>
    ) }
  ) | (
    { __typename?: 'FailedLoginResult' }
    & Pick<FailedLoginResult, '_type' | 'reason'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'SuccessfulLoginResult' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), authTokens: (
      { __typename?: 'AuthTokens' }
      & Pick<AuthTokens, 'accessToken'>
    ) }
  ) | (
    { __typename?: 'FailedRegistrationResult' }
    & Pick<FailedRegistrationResult, '_type' | 'reason'>
  ) }
);

export type TwitFragment = (
  { __typename?: 'Twit' }
  & Pick<Twit, 'id' | 'text' | 'likeCount' | 'iHaveLiked'>
  & { author: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type MakeTwitMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type MakeTwitMutation = (
  { __typename?: 'Mutation' }
  & { makeTwit?: Maybe<(
    { __typename?: 'Twit' }
    & Pick<Twit, 'id'>
    & TwitFragment
  )> }
);

export type LikeTwitMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LikeTwitMutation = (
  { __typename?: 'Mutation' }
  & { likeTwit?: Maybe<(
    { __typename?: 'Twit' }
    & Pick<Twit, 'id'>
    & TwitFragment
  )> }
);

export type UnlikeTwitMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlikeTwitMutation = (
  { __typename?: 'Mutation' }
  & { unlikeTwit?: Maybe<(
    { __typename?: 'Twit' }
    & Pick<Twit, 'id'>
    & TwitFragment
  )> }
);

export type MyTwitListQueryVariables = Exact<{ [key: string]: never; }>;


export type MyTwitListQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'Me' }
    & Pick<Me, 'id'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
      & { twits: Array<(
        { __typename?: 'Twit' }
        & Pick<Twit, 'id'>
        & TwitFragment
      )> }
    ) }
  )> }
);

export type HashtagTwitListQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type HashtagTwitListQuery = (
  { __typename?: 'Query' }
  & { hashtagByText?: Maybe<(
    { __typename?: 'Hashtag' }
    & Pick<Hashtag, 'id'>
    & { twits: Array<(
      { __typename?: 'Twit' }
      & Pick<Twit, 'id'>
      & TwitFragment
    )> }
  )> }
);

export type UserTwitListQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserTwitListQuery = (
  { __typename?: 'Query' }
  & { userByName?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { twits: Array<(
      { __typename?: 'Twit' }
      & Pick<Twit, 'id'>
      & TwitFragment
    )> }
  )> }
);

export type LikedTwitListQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type LikedTwitListQuery = (
  { __typename?: 'Query' }
  & { userByName?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { likedTwits: Array<(
      { __typename?: 'Twit' }
      & Pick<Twit, 'id'>
      & TwitFragment
    )> }
  )> }
);

export type UserByNameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserByNameQuery = (
  { __typename?: 'Query' }
  & { userByName?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'iAmFollowing'>
  )> }
);

export const TwitFragmentDoc: DocumentNode<TwitFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Twit"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Twit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"iHaveLiked"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]};
export const LoggedInUserDocument: DocumentNode<LoggedInUserQuery, LoggedInUserQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoggedInUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]};
export const FollowUserDocument: DocumentNode<FollowUserMutation, FollowUserMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"followUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"followeeCount"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"iAmFollowing"}}]}}]}}]};
export const UnfollowUserDocument: DocumentNode<UnfollowUserMutation, UnfollowUserMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unfollowUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unfollowUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"followeeCount"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"iAmFollowing"}}]}}]}}]};
export const LoginDocument: DocumentNode<LoginMutation, LoginMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SuccessfulLoginResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_type"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_type"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_type"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FailedLoginResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_type"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}}]}}]}}]};
export const RegisterDocument: DocumentNode<RegisterMutation, RegisterMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SuccessfulLoginResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FailedRegistrationResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_type"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}}]}}]}}]};
export const MakeTwitDocument: DocumentNode<MakeTwitMutation, MakeTwitMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"makeTwit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"makeTwit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Twit"}}]}}]}},...TwitFragmentDoc.definitions]};
export const LikeTwitDocument: DocumentNode<LikeTwitMutation, LikeTwitMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"likeTwit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeTwit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Twit"}}]}}]}},...TwitFragmentDoc.definitions]};
export const UnlikeTwitDocument: DocumentNode<UnlikeTwitMutation, UnlikeTwitMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unlikeTwit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlikeTwit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Twit"}}]}}]}},...TwitFragmentDoc.definitions]};
export const MyTwitListDocument: DocumentNode<MyTwitListQuery, MyTwitListQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyTwitList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"twits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Twit"}}]}}]}}]}}]}},...TwitFragmentDoc.definitions]};
export const HashtagTwitListDocument: DocumentNode<HashtagTwitListQuery, HashtagTwitListQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"hashtagTwitList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashtagByText"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"twits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Twit"}}]}}]}}]}},...TwitFragmentDoc.definitions]};
export const UserTwitListDocument: DocumentNode<UserTwitListQuery, UserTwitListQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userTwitList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"twits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Twit"}}]}}]}}]}},...TwitFragmentDoc.definitions]};
export const LikedTwitListDocument: DocumentNode<LikedTwitListQuery, LikedTwitListQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"likedTwitList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"likedTwits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Twit"}}]}}]}}]}},...TwitFragmentDoc.definitions]};
export const UserByNameDocument: DocumentNode<UserByNameQuery, UserByNameQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"iAmFollowing"}}]}}]}}]};