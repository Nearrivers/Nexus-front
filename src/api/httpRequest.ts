import { API_ROUTES, type ApiRoutes } from "@/api/api.routes";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function httpRequest<T>(
  url: ApiRoutes,
  method: HttpMethod,
  body?: any,
) {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const response = await fetch(
    import.meta.env.VITE_API_HOST + API_ROUTES[url],
    {
      method,
      ...(!!body && {
        body: JSON.stringify(body),
      }),
      headers,
    },
  );

  if (!response.ok) {
    console.error("erreur http");
    return;
  }

  return response.json() as T;
}
