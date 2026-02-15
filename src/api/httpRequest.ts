import { API_ROUTES, type ApiRoutes } from "@/api/api.routes";

import { sessionService } from "@/store/session";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type FetchResult<T> =
  | {
      ok: true;
      data: T;
      error?: never;
      response: Response;
    }
  | {
      ok: false;
      data?: never;
      error: unknown;
      response?: Response;
    };

export function BuildRequest(url: ApiRoutes, method: HttpMethod, body?: any) {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  return new Request(import.meta.env.VITE_API_HOST + API_ROUTES[url], {
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
  const response = await fetch(req);

  if (response.ok) {
    return {
      ok: true,
      response,
      data: (await response.json()) as T,
    };
  }

  let errorBody: unknown = undefined;
  try {
    errorBody = await response.clone().json();
  } catch {}

  if (response.status !== 401 || url === "POST_LOGOUT") {
    return {
      ok: false,
      error: {
        status: response.status,
        statusText: response.statusText,
        errorBody,
      },
      response,
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
      status: response.status,
      statusText: response.statusText,
      errorBody,
    },
    response,
  };
}
