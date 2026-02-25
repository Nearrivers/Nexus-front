import type { JSX, ReactNode } from "react";
import type { LoaderFunction } from "react-router";

type RouteObject<T extends string> = {
  path: T;
  element?: ReactNode;
  loader?: LoaderFunction;
  children?: RouteObject<T>[];
  Component?: () => JSX.Element;
};

export const UNAUTH_ROUTES = {
  joker: "*" as const,
  login: "/login" as const,
} as const;

export const ADMIN_ROUTES = {
  joker: "*",
  addRoute: "add",
  updateRoute: "update/:id",
  oneRoute: ":id",

  home: "/home",
  players: "/player",
  onePlayer: "/player/:id",
  addPlayer: "/player/add",
  items: "/items",
  oneItem: "/items/:id",
  addItem: "/items/add",
  updateItem: "/items/update/:id",
  demo: "/demo",
} as const;

export type UnAuthRoutes = (typeof UNAUTH_ROUTES)[keyof typeof UNAUTH_ROUTES];

export type AdminRoutes = (typeof ADMIN_ROUTES)[keyof typeof ADMIN_ROUTES];

type RoutePaths<T> = T extends string
  ? T
  : { [K in keyof T]: RoutePaths<T[K]> }[keyof T];

export type AppRoute =
  | RoutePaths<typeof ADMIN_ROUTES>
  | RoutePaths<typeof UNAUTH_ROUTES>
  | "..";

export type UnAuthRouteObject = RouteObject<UnAuthRoutes>;

export type AuthRouteObject = RouteObject<AdminRoutes>;

// Objectif du type :
// à partir d'une route telle que "/users/:id/posts/:postId".
// on veut obtenir le type { id: string, postId: string }
export type ExtractParams<T extends string> =
  // Cette clause matche les routes telles que :anything/:params/...reste
  /* pour retourner 
{
  [K in Param | keyof ExtractParams<`/${Rest}`>]: string
}
  On crée des clés dont les clés sont :
    - le param courant (id)
    - plus tous ceux trouvés dans la route (récursion)
*/
  T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractParams<`/${Rest}`>]: string }
    : // Qu'un seul param
      T extends `${string}:${infer Param}`
      ? { [K in Param]: string }
      : // Aucun param
        object;

export function buildPath<T extends AppRoute>(
  path: T,
  params?: ExtractParams<T>,
): string {
  let result = path as string;

  if (!params) {
    return result;
  }

  for (const key in params) {
    result = result.replace(`:${key}`, params[key] as string);
  }

  return result;
}
