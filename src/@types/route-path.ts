import type { JSX, ReactNode } from "react";

type RouteObject<T extends string> = {
  path: T;
  Component?: () => JSX.Element;
  element?: ReactNode;
};

export const UNAUTH_ROUTES = {
  joker: "*",
  login: "/login",
  signup: "/signup",
} as const;

export const AUTH_ROUTES = {
  joker: "*",
  home: "/home",
  note: "/note",
} as const;

export type UnAuthRoutes = (typeof UNAUTH_ROUTES)[keyof typeof UNAUTH_ROUTES];

export type AuthRoutes = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES];

export type UnAuthRouteObject = RouteObject<UnAuthRoutes>;

export type AuthRouteObject = RouteObject<AuthRoutes>;
