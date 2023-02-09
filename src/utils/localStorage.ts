export const getValueFromLocalStorage = <T>(key: string, defaultReturn?: unknown): T | undefined => {
  const localStorageValue = localStorage.getItem(key)
  const keyValue =
    localStorageValue && localStorageValue !== 'undefined' ? JSON.parse(localStorageValue) : defaultReturn
  return keyValue
}
