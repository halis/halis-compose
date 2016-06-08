# halis-compose

## Install

``` bash
npm install halis-compose --save
```

## Unit Tests

``` bash
npm run test
```

## Usage

Minimal usage:

```js
const compose = require( 'halis-compose' );
let inc = x => x += 1;
let neg = x => x *= -1;

let add3 = compose.foldl( inc, inc, inc );
console.log( add3( 3 ) ); // 6

// foldr - last function takes n args
// the rest take one, this is required
let right = compose.foldr( inc, inc, inc, neg, Math.pow ); 
console.log( right( 3, 4 ) ); // -78

// foldl - first function takes n args
// the rest take one, this is required
let left = compose.foldl( Math.pow, inc, inc, neg );
console.log( left( 3, 4 ) ); // -83

// foldl - last function takes 2 args
let bad = compose.foldl( Math.pow, inc, inc, Math.pow );
// results in an error being thrown

// calling foldl or foldr without args
// results in the identity function
let identity = compose.foldl( );
console.log( identity( 234 ) ); // 234
```
