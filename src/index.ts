import { createPathGenerator, createPattern } from "./createPathGenerator";
import { GeneratePathVariablePattern } from "./types";

const pattern = createPattern(':');
export const generatePath = createPathGenerator(pattern);
export type PathVariable<Path extends string> = GeneratePathVariablePattern<
  Path,
  typeof pattern[0],
  typeof pattern[1]
>;
export { createPathGenerator, createPattern };
