export const API_ROUTES = {
  /* -- SESSION -- */
  POST_SIGNUP: "/auth/register",
  POST_LOGIN: "/auth/login",
  POST_LOGOUT: "/auth/logout",
  POST_REFRESH_TOKEN: "/auth/refresh",
  GET_ME: "/auth/me",
  /* ------------- */
} as const;

export type ApiRoutes = keyof typeof API_ROUTES;
