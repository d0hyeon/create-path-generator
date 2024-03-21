export type ParamPattern<Prefix = string, Postfix = string> = Readonly<[Prefix, Postfix]>;

export type PathVariableValue = string | number;
export type PathVariable<
  Path extends string,
  Pattern extends ParamPattern,
> = Path extends `${string}/${Pattern[0]}${infer Key}${Pattern[1]}/${infer Tail}`
  ? { [key in Key | keyof PathVariable<Tail, Pattern>]: string | number }
  : RestPathVariable<Path, Pattern>;

type RestPathVariable<
  Path extends string,
  Pattern extends ParamPattern,
> =
  Path extends `${string}/${Pattern[0]}${infer LastKey}${Pattern[1]}`
  ? Record<LastKey, PathVariableValue>
  : Record<never, never>;

export type SerializePath<
  Path extends string,
  Prefix extends string,
  Postfix extends string,
  Variable extends Record<string, PathVariableValue> = {}
> = Path extends `${infer Head}/${Prefix}${infer Key}${Postfix}/${infer Tail}`
  ? `${SerializePath<Head, Prefix, Postfix, Variable>}/${InferVariableValue<Variable, Key>}/${SerializePath<Tail, Prefix, Postfix, Variable>}`
  : RestSerializePath<Path, Prefix, Postfix, Variable>

type RestSerializePath<
  Path extends string,
  Prefix extends string,
  Postfix extends string = '',
  Variable extends Record<string, PathVariableValue> = {}
> = Path extends `${infer Head}/${Prefix}${infer Key}${Postfix}`
  ? `${Head}/${InferVariableValue<Variable, Key>}`
  : Path

type InferVariableValue<Variable extends Record<string, unknown>, Key extends string>
  = Key extends keyof Variable ? Variable[Key] : string;