Deep Get
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Deep get a nested property.


## Installation

``` bash
$ npm install utils-deep-get
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var deepGet = require( 'utils-deep-get' );
```

#### deepGet( obj, path[, options] )

Deep get a nested property.

``` javascript
var obj = { 'a': { 'b': { 'c': 'd' } } };

var val = deepGet( obj, 'a.b.c' );
// returns 'd'
```

For `paths` including `arrays`, specify the numeric index.

``` javascript
var arr = [
	{ 'a': [ {'x': 5} ] },
	{ 'a': [ {'x': 10} ] }
];

var val = deepGet( arr, '1.a.0.x' );
// returns 10
```

The key `path` may be specified as either a delimited `string` or a key `array`.

``` javascript
var obj = { 'a': { 'b': { 'c': 'd' } } };

var val = deepGet( obj, ['a','b','c'] );
// returns 'd'
```

The function accepts the following `options`:

*	__sep__: key path separator. Default: `'.'`.

By default, the function assumes `dot` separated key values. To specify an alternative separator, set the `sep` option.

``` javascript
var obj = { 'a': { 'b': { 'c': 'd' } } };

var val = deepGet( obj, 'a/b/c', {
	'sep': '/'	
});
// returns 'd'
```


#### deepGet.factory( path[, options] )

Creates a reusable deep get factory. The factory method ensures a `deepGet` function is configured identically by using the same set of provided `options`.

``` javascript
var dget = deepGet.factory( 'a/b/c', {
	'sep': '/'
});
```


#### dget( obj )

Deep get a nested property.

``` javascript
var obj = { 'a': { 'b': { 'c': 'd' } } };

var val = dget( obj );
// returns 'd'
```



## Examples

``` javascript
var deepGet = require( 'utils-deep-get' );

var data,
	keys,
	val,
	i;

data = new Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': Date.now(),
		'y': [ Math.random(), Math.random(), i ]
	};
}

keys = [ 0, 'y', 2 ];
for ( i = 0; i < data.length; i++ ) {
	keys[ 0 ] = i;
	val = deepGet( data, keys );
	console.log( val );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/utils-deep-get.svg
[npm-url]: https://npmjs.org/package/utils-deep-get

[travis-image]: http://img.shields.io/travis/kgryte/utils-deep-get/master.svg
[travis-url]: https://travis-ci.org/kgryte/utils-deep-get

[coveralls-image]: https://img.shields.io/coveralls/kgryte/utils-deep-get/master.svg
[coveralls-url]: https://coveralls.io/r/kgryte/utils-deep-get?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-deep-get.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-deep-get

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-deep-get.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-deep-get

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-deep-get.svg
[github-issues-url]: https://github.com/kgryte/utils-deep-get/issues
