import { createSerializer, createParamsPattern } from "./createSerializer";
import { PathVariable as PathVariableByPattern, PathVariableValue } from "./types";

const pattern = createParamsPattern(':');
export const generatePath = createSerializer(pattern);
export type PathVariable<
  Path extends string,
  Pattern extends ReadonlyArray<string> | undefined = undefined
> = Pattern extends undefined
  ? PathVariableByPattern<Path, typeof pattern[0], typeof pattern[1]>
  : PathVariableByPattern<Path, Pattern[0], Pattern[1]>

export { createSerializer, createParamsPattern };
