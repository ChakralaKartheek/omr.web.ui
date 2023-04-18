export const STORAGE_KEY = 'ea.talenttest';

export const GetStorageKeyPrefix = (state: string): string => `${STORAGE_KEY}${state.toLowerCase()}`;

export const GetStorageKey = (state: string, key: string): string => `${GetStorageKeyPrefix(state)}.${key.toLowerCase()}`;

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const GetItem = (state: string, key: string): any => {
  const storageKey = GetStorageKey(state, key);
  const value = sessionStorage.getItem(storageKey);
  if (value && value.length > 0) {
    return JSON.parse(value);
  }
  return null;
};

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const SetItem = (state: string, key: string, value: any): void => {
  const storageKey = GetStorageKey(state, key);
  if (key) {
    sessionStorage.setItem(storageKey, JSON.stringify(value));
  }
};

const RemoveItem = (state: string, key: string): void => {
  const storageKey = GetStorageKey(state, key);
  sessionStorage.removeItem(storageKey);
};

const ClearAll = (state: string): void => {
  const keys: string[] = [];
  const storageKeyPrefix = GetStorageKeyPrefix(state);

  for (let i = 0; i < sessionStorage.length; i++) {
    const key = String(sessionStorage.key(i));
    if (key?.startsWith(storageKeyPrefix)) {
      keys.push(key);
    }
  }

  keys.forEach(key => sessionStorage.removeItem(key));
};

export const SessionStorageHelper = {
  GetItem,
  SetItem,
  RemoveItem,
  ClearAll
};