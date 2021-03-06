/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	deepGet = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'utils-deep-get', function tests() {

	it( 'should export a function', function test() {
		expect( deepGet ).to.be.a( 'function' );
	});

	it( 'should export a factory function', function test() {
		expect( deepGet.factory ).to.be.a( 'function' );
	});

	it( 'should return `undefined` if provided a non-object or null', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isUndefined( deepGet( values[ i ], 'a.b.c' ) );
		}
	});

	it( 'should throw an error if provided a key path argument which is not either a string primitive or a key array', function test() {
		var values = [
			5,
			null,
			undefined,
			NaN,
			true,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				deepGet( {'a':5}, value );
			};
		}
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			null,
			NaN,
			true,
			undefined,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				deepGet( {'a':5}, 'a', value );
			};
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			5,
			null,
			true,
			NaN,
			{},
			undefined,
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				deepGet( {'a':5}, 'a', {
					'sep': value
				});
			};
		}
	});

	it( 'should deep get', function test() {
		var obj, actual, expected;

		obj = { 'a': { 'b': 999 } };

		// String path:
		actual = deepGet( obj, 'a.b' );
		expected = 999;

		assert.strictEqual( actual, expected );

		// String path with custom separator:
		actual = deepGet( obj, 'a/b', {
			'sep': '/'
		});
		expected = 999;

		assert.strictEqual( actual, expected );

		// Array path:
		actual = deepGet( obj, ['a','b'] );
		expected = 999;

		assert.strictEqual( actual, expected );

		// Non-existent path:
		actual = deepGet( obj, ['a','c'] );
		expected = undefined;

		assert.strictEqual( actual, expected );
	});

});
