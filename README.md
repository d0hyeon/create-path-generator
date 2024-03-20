# Path Variable

## Example
**Default**
```ts
import { generatePath } from 'path-variable';

generatePath('/users/:userId', { userId: 1 }); 
// => "/users/1"
```

**Customizing** 
```ts
import { createVariablePattern, createPathGenerator } from 'path-variable';

const PathVariablePattern = {
  DEFAULT: createVariablePattern(':'),
  FOR_NEXT_DYNAMIC_ROUTE: createVariablePattern('[', ']')
}
export const generatePath = createPathGenerator(
  PathVariablePattern.DEFAULT,
  PathVariablePattern.FOR_NEXT_DYNAMIC_ROUTE
)

generatePath('/users/:userId', { userId: 1 });
generatePath('/users/[userId]', { userId: 1 });
// => "/users/1"
```
