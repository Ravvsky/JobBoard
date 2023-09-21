interface SlugEndpointObject<T = Record<string, unknown>> {
  [key: string]: unknown;
  attributes?: T;
  data?: SlugEndpointObject<T> | SlugEndpointObject<T>[];
}

function slugEndpointDataTransformer<T = Record<string, unknown>>(
  obj: SlugEndpointObject<T>,
): T {
  if (!obj || typeof obj !== "object") {
    return obj as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => slugEndpointDataTransformer(item)) as T;
  }

  if (obj.attributes && typeof obj.attributes === "object") {
    obj = { ...obj, ...obj.attributes } as SlugEndpointObject<T>;
  }

  if (obj.data && typeof obj.data === "object") {
    if (Array.isArray(obj.data)) {
      return obj.data.map((item) => slugEndpointDataTransformer(item)) as T;
    } else {
      return slugEndpointDataTransformer(obj.data as SlugEndpointObject<T>);
    }
  }

  const result: Record<string, T> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = slugEndpointDataTransformer(
        obj[key] as SlugEndpointObject<T>,
      );
    }
  }

  return result as T;
}

export default slugEndpointDataTransformer;
