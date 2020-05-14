/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QUERY_CURRENT_USER
// ====================================================

export interface QUERY_CURRENT_USER_currentUser {
  __typename: "User";
  id: string;
}

export interface QUERY_CURRENT_USER {
  currentUser: QUERY_CURRENT_USER_currentUser | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LogoutUser
// ====================================================

export interface LogoutUser {
  logout: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MUTATION_REGISTER_USER
// ====================================================

export interface MUTATION_REGISTER_USER_createAccount {
  __typename: "AuthPayload";
  id: string;
}

export interface MUTATION_REGISTER_USER {
  createAccount: MUTATION_REGISTER_USER_createAccount;
}

export interface MUTATION_REGISTER_USERVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MUTATION_LOGIN_USER
// ====================================================

export interface MUTATION_LOGIN_USER_login {
  __typename: "User";
  id: string;
}

export interface MUTATION_LOGIN_USER {
  login: MUTATION_LOGIN_USER_login;
}

export interface MUTATION_LOGIN_USERVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
