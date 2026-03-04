function isKeyOfDict<T extends Record<string, unknown>>(val: string, dict: T): val is (keyof T & string) {
  return typeof val === "string" && val in dict;
}

function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}


export function pickTranslation(key: string, dict: Record<string, unknown>): string | never {
  
  if (key.startsWith(".") || key.endsWith(".")) {
    throw new Error(`Key ${key} is invalid.`);
  }
  
  if (isKeyOfDict(key, dict) && typeof dict[key] === "string") {
    return dict[key];
  } 
  
  const keys = key.split(".");

  for (let i = 0; i < keys.length; i++) {
    const baseKey = keys.slice(0, i+1).join(".");
    const restKey = keys.slice(i+1).join(".");

    if (!isKeyOfDict(baseKey, dict)) {
      continue;
    }

    const value = dict[baseKey];

    if (typeof value === "string") {
      continue;
    }

    if (isObject(value)) {
      if (!restKey) {
        throw new Error(`Key exist but its value is not a string.`);
      }
      return pickTranslation(restKey, value);
    }
  }

  throw new Error(`Part of the key do not exist: ${key}`); 
}