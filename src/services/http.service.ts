interface HttpOptions {
  headers: Record<string, string>;
}

export const httpService = (options?: HttpOptions) => {
  const bodyHeaders = new Headers({
    "Content-Type": "application/json",
    ...options?.headers,
  });

  return {
    get: async <T>(url: string): Promise<T> => {
      const response = await fetch(url, {
        method: "GET",
        headers: options?.headers || undefined,
      });

      return response.json() as Promise<T>;
    },

    post: async <T>(url: string, body?: Object): Promise<T> => {
      const response = await fetch(url, {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
        headers: bodyHeaders,
      });

      return response.json() as Promise<T>;
    },

    put: async <T>(url: string, body?: Object): Promise<T> => {
      const response = await fetch(url, {
        method: "PUT",
        body: body ? JSON.stringify(body) : undefined,
        headers: bodyHeaders,
      });

      return response.json() as Promise<T>;
    },

    delete: async <T>(url: string): Promise<T> => {
      const response = await fetch(url, {
        method: "DELETE",
        headers: options?.headers || undefined,
      });

      return response.json() as Promise<T>;
    },
  };
};
