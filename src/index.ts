import { createParamsPattern, createPathGenerator } from "./createPathGenerator";
import { ParamPattern, PathVariable as PathVariableByPattern } from "./types";

const pattern = createParamsPattern(':');
export const generatePath = createPathGenerator(pattern);
export type PathVariable<
  Path extends string,
  Pattern extends ParamPattern | undefined = undefined
> = Pattern extends undefined
  ? PathVariableByPattern<Path, typeof pattern>
  : PathVariableByPattern<Path, Pattern>

export { createParamsPattern, createPathGenerator };