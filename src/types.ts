export type ParamPattern<Prefix = string, Postfix = string> = Readonly<[Prefix, Postfix]>;
export type PathVariableValue = string | number;
export type PathVariable<Path extends string, Pattern extends ParamPattern> =
  Path extends `${string}/${Pattern[0]}${infer Key}${Pattern[1]}/${infer Tail}`
  ? { [key in Key | keyof PathVariable<Tail, Pattern>]: string | number }
  : RestPathVariable<Path, Pattern>;

type RestPathVariable<Path extends string, Pattern extends ParamPattern> =
  Path extends `${string}/${Pattern[0]}${infer LastKey}${Pattern[1]}`
  ? Record<LastKey, PathVariableValue>
  : Record<never, never>;