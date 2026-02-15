import { Link, type LinkProps } from "react-router";

import {
  buildPath,
  type AppRoute,
  type ExtractParams,
} from "@/@types/route-path";

type TypedLinkProps<T extends AppRoute> = Omit<LinkProps, "to"> & {
  to: T;
} & (keyof ExtractParams<T> extends never
    ? { params?: never }
    : { params: ExtractParams<T> });

export function TypedLink<T extends AppRoute>({
  to,
  params,
  ...rest
}: TypedLinkProps<T>) {
  return <Link to={buildPath(to, params)} {...rest} />;
}
