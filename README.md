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
import { createPattern, createPathGenerator } from 'path-variable';

const PathVariablePattern = {
  DEFAULT: createPattern(':'),
  FOR_NEXT_DYNAMIC_ROUTE: createPattern('[', ']')
}
export const generatePath = createPathGenerator(
  PathVariablePattern.DEFAULT,
  PathVariablePattern.FOR_NEXT_DYNAMIC_ROUTE
)

generatePath('/users/:userId', { userId: 1 });
generatePath('/users/[userId]', { userId: 1 });
// => "/users/1"
```
