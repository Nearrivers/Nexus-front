import { type ApiRoutes } from "@/api/api.routes";

import { sessionService } from "@/store/session";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class FetchError extends Error {
  public readonly status: number;
  public readonly statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);

    this.name = new.target.name;
    this.status = status;
    this.statusText = statusText;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

type ErrorResponse = {
  error: string;
};

export type FetchResult<T> = {
  data: T;
};

export function BuildRequest(url: ApiRoutes, method: HttpMethod, body?: any) {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  return new Request(import.meta.env.VITE_API_HOST + url, {
    method,
    ...(!!body && {
      body: JSON.stringify(body),
    }),
    headers,
    credentials: "include",
  });
}

export async function httpRequest<T>(
  url: ApiRoutes,
  method: HttpMethod,
  body?: any,
): Promise<FetchResult<T>> {
  const req = BuildRequest(url, method, body);
  const res = await fetch(req);

  if (res.ok) {
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    return {
      data: data as T,
    };
  }

  let errorBody: ErrorResponse | undefined = undefined;
  try {
    errorBody = (await res.clone().json()) as ErrorResponse;
  } catch {}

  if (
    res.status !== 401 ||
    req.url.includes("auth/refresh") ||
    req.url.includes("auth/logout") ||
    req.url.includes("auth/login")
  ) {
    throw new FetchError(
      errorBody?.error ?? "SERVER_ERROR",
      res.status,
      res.statusText,
    );
  }

  const refreshResponse = await sessionService.refreshToken();
  if (refreshResponse.ok) {
    return httpRequest(url, method, body);
  }

  await sessionService.logout();
  throw new FetchError(
    errorBody?.error ?? "SERVER_ERROR",
    res.status,
    res.statusText,
  );
}
