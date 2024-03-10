export type PathValue = string | number;
export type PathVariable<
  Path extends string,
  Prefix extends string,
  Postfix extends string = ''
> = Path extends `${string}/${Prefix}${infer Key}${Postfix}/${infer Tail}`
  ? Record<Key, PathValue> & PathVariable<Tail, Prefix, Postfix>
  : RestPathVariable<Path, Prefix, Postfix>;

type RestPathVariable<
  Path extends string,
  Prefix extends string,
  Postfix extends string | undefined
> =
  Path extends `${string}/${Prefix}${infer LastKey}${Postfix extends string ? Postfix : ' '}`
  ? Record<LastKey, PathValue>
  : Record<never, never>;