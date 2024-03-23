# Path Params

## Description
This module is utility module to replace path with params and infer the params from the path 
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
generatePath('/users/:userId', { userId: 1 }); // "/users/1"
type Params = PathVariable<'/users/:userId'> // { userId: string | number }
```

### Customizing
```ts
const PathParamsPattern = {
  Default: createParamsPattern(':'),
  NextJSRoute: createParamsPattern('[', ']')
}
const generatePath = createPathGenerator(
  PathParamsPattern.Default,
  PathParamsPattern.NextJSRoute
)

generatePath('/users/:userId', { userId: 1 });
generatePath('/users/[userId]', { userId: 1 });
type Params = PathVariable<'/users/[userId]', typeof PathParamsPattern.NextJSRoute>
```
<br />   

## API
### generatePath(path, params)
 `generatePath` replaces path with params  
```ts
  generatePath('/user/:userId', { userId: 1 });
```
 
### createParamsPattern(prefix, postfix?)
 return value is `ParamPattern` and used for `createPathGenerator`  
  - `/user/:userId` => `createParamsPattern(':')`
  - `/user/[userId]` => `createParamsPattern('[', ']')`

### createPathGenerator(...patterns)
 `createPathGenerator` creates the `generatePath` function.   
  Created function replaces path by pattern 
```ts
  const genreatePath = createPathGenerator(
    createParamsPattern(':'),
    createParamsPattern('[', ']')
  )
  genreatePath('/user/:userId', { userId: 1 });
  genreatePath('/user/[userId]', { userId: 1 });
```
### type PathVariable<Path, Pattern?>
`PathVariable` infers the type from the path.
```ts
  type MyParams = PathVariable<'/user/:userId'>; 
  // { userId: string | number }

  const pattern = createParamsPattern('[', ']');
  type MySecondParams = PathVariable<'/user/[userId]', typeof pattern> 
  // { userId: string | number }
```

