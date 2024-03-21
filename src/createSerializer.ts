import { PathVariable, PathVariableValue, SerializePath } from "./types";

type Pattern = Readonly<[string, string]>;
const EmptyString = '';
type EmptyString = typeof EmptyString;

export function createParamsPattern<Prefix extends string>(prefix: Prefix): readonly [Prefix, EmptyString];
export function createParamsPattern<Prefix extends string, Postfix extends string>(
  prefix: Prefix,
  postfix: Postfix
): readonly [Prefix, Postfix];
export function createParamsPattern<
  Prefix extends string,
  Postfix extends string = EmptyString
>(prefix: Prefix, postfix?: Postfix) {
  return postfix == null
    ? [prefix, EmptyString] as const
    : [prefix, postfix] as const;
}

type MergePathVariableByPattern<
  Path extends string,
  ParamPatterns extends ReadonlyArray<Pattern>
> = ParamPatterns extends [infer Item extends Pattern, ...infer Rest extends ReadonlyArray<Pattern>]
  ? { [key in keyof PathVariable<Path, Item[0], Item[1]> | keyof MergePathVariableByPattern<Path, Rest>]: PathVariableValue }
  : Record<never, never>;

type SerializePathByParamPatterns<
  Path extends string,
  ParamPatterns extends ReadonlyArray<Pattern>,
  Variable extends Record<string, PathVariableValue>
> = ParamPatterns extends [infer Item extends Pattern, ...infer Rest extends ReadonlyArray<Pattern>]
  ? Exclude<SerializePath<Path, Item[0], Item[1], Variable> | SerializePathByParamPatterns<Path, Rest, Variable>, Path | never>
  : never;


export function createSerializer<ParamPatterns extends ReadonlyArray<Pattern>>(...patterns: ParamPatterns) {
  function generatePath<
    const Path extends string,
    const Variable extends MergePathVariableByPattern<Path, ParamPatterns>
  >(path: Path, variables: Variable) {
    type SerializedVariable = { [key in keyof Variable]: string };
    type SerializedPath = SerializePathByParamPatterns<Path, ParamPatterns, SerializedVariable>;

    return Object.entries(variables).reduce((acc, [key, variable]) => {
      const regexps = patterns.map(([prefix, postfix]) => {
        if (postfix === EmptyString) {
          return `(\\${prefix}${key})`
        }
        return `(\\${prefix}${key}\\${postfix})`
      });
      const regexp = new RegExp(regexps.join('|'), 'g');

      return acc.replace(regexp, (variable as PathVariableValue).toString());
    }, path) as SerializedPath;
  }

  return generatePath;
};
