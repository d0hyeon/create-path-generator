# Path Variable

## Description
Replace the path with params and infer the params from the path   
<br />

## Table Of Content
 - [Example](#Example)
 - [Usage](#Usage)
 - [API](#API)
<br />

## Example
[CodeSandbox](https://codesandbox.io/p/sandbox/ts-pattern-params-kzykks?file=%2Fsrc%2Findex.ts%3A1%2C1)
<br />

## Usage
### Default
```ts
generatePath('/users/:userId', { userId: 1 }); // => "/users/1"
```

### Customizing
```ts
import { createParamsPattern, createSerializer } from 'path-variable';

const PathParamsPattern = {
  Default: createParamsPattern(':'),
  NextJSRoute: createParamsPattern('[', ']')
}
export const generatePath = createSerializer(
  PathParamsPattern.Default,
  PathParamsPattern.NextJSRoute
)

generatePath('/users/:userId', { userId: 1 });
generatePath('/users/[userId]', { userId: 1 });
// => "/users/1"
```
<br />   
<br />

## API
### generatePath(path: string, params: object): string
 `generatePath` replaces path with params  
```ts
  generatePath('/user/:userId', { userId: 1 });
```
 
### createParamsPattern(prefix: string, postfix?: string): ParamPattern
 return value is `ParamPattern` and used for `createSerializer`  
  - `/user/:userId` => `createParamsPattern(':')`
  - `/user/[userId]` => `createParamsPattern('[', ']')`

### createSerializer(...args: ParamPattern): Function
 `createSerializer` create the `generatePath` function.   
  Created function will replaces path by pattern 
```ts
  const genreatePath = createSerializer(
    createParamsPattern(':'),
    createParamsPattern('[', ']')
  )
  genreatePath('/user/:userId', { userId: 1 });
  genreatePath('/user/[userId]', { userId: 1 });
```
### type PathVariable<Path, Pattern?>
`PathVariable` infer a type from path.
```ts
  type MyParams = PathVariable<'/user/:userId'>; // { userId: string | number }
  type MySecondParams = PathVariable<
    '/user/[userId]', 
    typeof createParamsPattern('[', ']')
  > // { userId: string | number }
```

