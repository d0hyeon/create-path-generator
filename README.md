# Path Variable

## Description
Replace the path with params and infer the params from the path
  
## Table Of Content
 - [Example](#Example)
 - [Usage](#Usage)
 - [API](#API)


### Example
[CodeSandbox](https://codesandbox.io/p/sandbox/ts-pattern-params-kzykks?file=%2Fsrc%2Findex.ts%3A1%2C1)
    
### Usage

**Default**
```ts
generatePath('/users/:userId', { userId: 1 }); // => "/users/1"
```

**Customizing** 
```ts
import { createParamsPattern, createSerializer } from 'path-variable';

const PathVariablePattern = {
  Default: createParamsPattern(':'),
  NextJSRoute: createParamsPattern('[', ']')
}
export const generatePath = createSerializer(
  PathVariablePattern.Default,
  PathVariablePattern.NextJSRoute
)

generatePath('/users/:userId', { userId: 1 });
generatePath('/users/[userId]', { userId: 1 });
// => "/users/1"
```
  

### API
**generatePath(path: string, params: object): string** 
 `generatePath` replaces path with params
```ts
  const path = generatePath('/user/:userId', { userId: 1 });
  // "/user/1"
```
 
**createParamsPattern(prefix: string, postfix?: string)**
 return value is `ParamPattern` and used for `createSerializer`
  - `/user/:userId` => `createParamsPattern(':')`
  - `/user/[userId]` => `createParamsPattern('[', ']')`

**createSerializer(...args: ParamPattern)**
 `createSerializer` create a `generatePath` function and created function will replaces path by pattern
```ts
  const generatePattern = createSerializer(
    createParamsPattern(':'),
    createParamsPattern('[', ']')
  )
  generatePattern('/user/:userId', { userId: 1 });
  generatePattern('/user/[userId]', { userId: 1 });
```

