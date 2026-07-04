
export function getEnumDataSource<T extends Record<string, string>>(enumObj: T) {
  return Object.keys(enumObj).map((key) => ({
    key,
    value: enumObj[key as keyof T]
  }));
}

export interface EnumDataSourceItem<T extends Record<string, string>> {
  key: string,
  value: T[keyof T];
}