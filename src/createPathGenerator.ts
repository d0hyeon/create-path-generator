import { PathVariable, PathValue } from "./types";

type Pattern = Readonly<[string, string]>;
const EmptyString = '';
type EmptyString = typeof EmptyString;

export function createPattern<Prefix extends string>(prefix: Prefix): readonly [Prefix, EmptyString];
export function createPattern<Prefix extends string, Postfix extends string>(
  prefix: Prefix,
  postfix: Postfix
): readonly [Prefix, Postfix];
export function createPattern<
  Prefix extends string,
  Postfix extends string = EmptyString
>(prefix: Prefix, postfix?: Postfix) {
  return postfix == null
    ? [prefix, EmptyString] as const
    : [prefix, postfix] as const;
}

type MergePathVariableByPattern<
  Path extends string,
  Patterns extends ReadonlyArray<Pattern>
> = Patterns extends [infer Item extends Pattern, ...infer Rest extends ReadonlyArray<Pattern>]
  ? PathVariable<Path, Item[0], Item[1]> & MergePathVariableByPattern<Path, Rest>
  : Record<never, never>;

export function createPathGenerator<Patterns extends ReadonlyArray<Pattern>>(...patterns: Patterns) {
  function generatePath<const Path extends string>(
    path: Path,
    variables: MergePathVariableByPattern<Path, Patterns>
  ) {
    return Object.entries(variables).reduce((acc, [key, variable]) => {
      const regexps = patterns.map(([prefix, postfix]) => {
        if (postfix === EmptyString) {
          return `(\\${prefix}${key})`
        }
        return `(\\${prefix}${key}\\${postfix})`
      });
      const regexp = new RegExp(regexps.join('|'), 'g');

      return acc.replace(regexp, (variable as PathValue).toString());
    }, path as string);
  }

  return generatePath;
};