export function omit(key: any, obj: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [key]: omitted, ...rest } = obj;
  return rest;
}
