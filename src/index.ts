import { createPathGenerator, createPattern } from "./createPathGenerator";
import { PathVariable as PathVariableByPattern } from "./types";

const pattern = createPattern(':');
export const generatePath = createPathGenerator(pattern);
export type PathVariable<Path extends string> = PathVariableByPattern<
  Path,
  typeof pattern[0],
  typeof pattern[1]
>;
export { createPathGenerator, createPattern };
