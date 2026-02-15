import type { JSX, ReactNode } from "react";

type RouteObject<T extends string> = {
  path: T;
  Component?: () => JSX.Element;
  element?: ReactNode;
};

export type UnAuthRoutes = "/" | "*" | "login" | "signup";

export type AuthRoutes = "";

export type UnAuthRouteObject = RouteObject<UnAuthRoutes>;

export type AuthRouteObject = RouteObject<AuthRoutes>;
