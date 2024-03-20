export type PathValue = string | number;
export type PathVariable<
  Path extends string,
  Prefix extends string,
  Postfix extends string = ''
> = Path extends `${string}/${Prefix}${infer Key}${Postfix}/${infer Tail}`
  ? { [key in Key | keyof PathVariable<Tail, Prefix, Postfix>]: string | number }
  : RestPathVariable<Path, Prefix, Postfix>;

type RestPathVariable<
  Path extends string,
  Prefix extends string,
  Postfix extends string | undefined
> =
  Path extends `${string}/${Prefix}${infer LastKey}${Postfix extends string ? Postfix : ' '}`
  ? Record<LastKey, PathValue>
  : Record<never, never>;

export type SerializePath<
  Path extends string,
  Prefix extends string,
  Postfix extends string,
  Variable extends Record<string, PathValue> = {}
> = Path extends `${infer Head}/${Prefix}${infer Key}${Postfix}/${infer Tail}`
  ? `${SerializePath<Head, Prefix, Postfix, Variable>}/${InferVariableValue<Variable, Key>}/${SerializePath<Tail, Prefix, Postfix, Variable>}`
  : RestSerializePath<Path, Prefix, Postfix, Variable>

type RestSerializePath<
  Path extends string,
  Prefix extends string,
  Postfix extends string = '',
  Variable extends Record<string, PathValue> = {}
> = Path extends `${infer Head}/${Prefix}${infer Key}${Postfix}`
  ? `${Head}/${InferVariableValue<Variable, Key>}`
  : Path

type InferVariableValue<Variable extends Record<string, unknown>, Key extends string>
  = Key extends keyof Variable ? Variable[Key] : string;