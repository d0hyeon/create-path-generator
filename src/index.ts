import { createPathGenerator, createVariablePattern } from "./createPathGenerator";
import { PathVariable as PathVariableByPattern, PathVariableValue } from "./types";

const pattern = createVariablePattern(':');
export const generatePath = createPathGenerator(pattern);
export type PathVariable<Path extends string> = PathVariableByPattern<
  Path,
  typeof pattern[0],
  typeof pattern[1]
>;
export {
  createPathGenerator,
  createVariablePattern,
  PathVariableByPattern,
  PathVariableValue
};

