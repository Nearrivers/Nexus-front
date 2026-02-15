export const API_ROUTES = {
  /* -- SESSION -- */
  POST_SIGNUP: "/auth/register",
  POST_LOGIN: "/auth/login",
  /* ------------- */
} as const;

export type ApiRoutes = keyof typeof API_ROUTES;
