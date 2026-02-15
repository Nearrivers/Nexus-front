import { useNavigate } from "react-router";

import {
  buildPath,
  type AppRoute,
  type ExtractParams,
} from "@/@types/route-path";

export function useTypedNavigate() {
  const navigate = useNavigate();

  return <T extends AppRoute>(
    path: T,
    ...args: keyof ExtractParams<T> extends never
      ? []
      : [params: ExtractParams<T>]
  ) => {
    navigate(args[0] ? buildPath(path, args[0]) : path);
  };
}

export default useTypedNavigate;
