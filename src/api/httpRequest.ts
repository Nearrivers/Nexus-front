import { type ApiRoutes } from "@/api/api.routes";

import { sessionService } from "@/store/session";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type FetchResult<T> =
  | {
      ok: true;
      data: T;
      error?: never;
    }
  | {
      ok: false;
      data?: never;
      error: unknown;
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
      ok: true,
      data: data as T,
    };
  }

  let errorBody: unknown = undefined;
  try {
    errorBody = await res.clone().json();
  } catch {}

  if (
    res.status !== 401 ||
    req.url.includes("auth/refresh") ||
    req.url.includes("auth/logout")
  ) {
    return {
      ok: false,
      error: {
        status: res.status,
        statusText: res.statusText,
        errorBody,
      },
    };
  }

  const refreshResponse = await sessionService.refreshToken();
  if (refreshResponse.ok) {
    return httpRequest(url, method, body);
  }

  await sessionService.logout();
  return {
    ok: false,
    error: {
      status: res.status,
      statusText: res.statusText,
      errorBody,
    },
  };
}
