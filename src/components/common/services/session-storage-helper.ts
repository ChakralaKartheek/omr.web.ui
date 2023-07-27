export const STORAGE_KEY = 'ea.omr';

export const GetStorageKeyPrefix = (): string => `${STORAGE_KEY}`;

export const GetStorageKey = (key: string): string => `${GetStorageKeyPrefix()}.${key.toLowerCase()}`;


const GetItem = (key: string): any => {
  const storageKey = GetStorageKey( key);
  const value = sessionStorage.getItem(storageKey);
  if (value && value.length > 0) {
    return JSON.parse(value);
  }
  return null;
};


const SetItem = (key: string, value: any): void => {
  const storageKey = GetStorageKey(key);
  if (key) {
    sessionStorage.setItem(storageKey, JSON.stringify(value));
  }
};

const RemoveItem = (key: string): void => {
  const storageKey = GetStorageKey(key);
  sessionStorage.removeItem(storageKey);
};

const ClearAll = (): void => {
  const keys: string[] = [];
  const storageKeyPrefix = GetStorageKeyPrefix();

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