export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
};

let accessToken: string | null = null;
let currentUser: AuthUser | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export function clearAccessToken() {
  accessToken = null;
}

export function setCurrentUser(user: AuthUser | null) {
  currentUser = user;
}

export function getCurrentUser() {
  return currentUser;
}

export function clearAuth() {
  accessToken = null;
  currentUser = null;
}
