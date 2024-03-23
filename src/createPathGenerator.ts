import { ParamPattern, PathVariable, PathVariableValue } from "./types";

const EmptyStr = '';
type EmptyStr = typeof EmptyStr;

export function createParamsPattern<Prefix extends string>(prefix: Prefix): ParamPattern<Prefix, EmptyStr>
export function createParamsPattern<Prefix extends string, Postfix extends string>(
  prefix: Prefix,
  postfix: Postfix
): ParamPattern<Prefix, Postfix>
export function createParamsPattern<
  Prefix extends string,
  Postfix extends string = EmptyStr
>(prefix: Prefix, postfix?: Postfix) {
  return postfix == null
    ? [prefix, EmptyStr] as const
    : [prefix, postfix] as const;
}

type MergePathVariables<
  Path extends string,
  Patterns extends ReadonlyArray<ParamPattern>
> = Patterns extends [infer Pattern extends ParamPattern, ...infer Rest extends ReadonlyArray<ParamPattern>]
  ? { [key in keyof PathVariable<Path, Pattern> | keyof MergePathVariables<Path, Rest>]: PathVariableValue }
  : Record<never, never>;

export function createPathGenerator<ParamPatterns extends ReadonlyArray<ParamPattern>>(...patterns: ParamPatterns) {
  type VariableByPattern<Path extends string> = MergePathVariables<Path, ParamPatterns>;

  function generatePath<const Path extends string>(
    path: Path,
    variable: keyof VariableByPattern<Path> extends never
      ? never
      : VariableByPattern<Path>
  ) {
    return Object.entries(variable).reduce((acc, [key, value]) => {
      const regexps = patterns.map(([prefix, postfix]) => {
        if (postfix === EmptyStr) {
          return `(\\${prefix}${key})`
        }
        return `(\\${prefix}${key}\\${postfix})`
      });
      const regexp = new RegExp(regexps.join('|'), 'g');

      return acc.replace(regexp, (value as PathVariableValue).toString());
    }, path);
  }

  return generatePath;
};
