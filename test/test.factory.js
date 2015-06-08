/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	factory = require( './../lib/factory.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'factory', function tests() {

	it( 'should export a function', function test() {
		expect( factory ).to.be.a( 'function' );
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
				factory( value );
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
				factory( 'a', value );
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
				factory( 'a', {
					'sep': value
				});
			};
		}
	});

	it( 'should return a function', function test() {
		var dget = factory( 'a/b', {
			'sep': '/'
		});
		expect( dget ).to.be.a( 'function' );
	});

	it( 'should return `undefined` if provided a non-object or null', function test() {
		var values, dget;

		values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			function(){}
		];

		dget = factory( 'a/b', {
			'sep': '/'
		});

		for ( var i = 0; i < values.length; i++ ) {
			assert.isUndefined( dget( values[ i ] ) );
		}
	});

	it( 'should deep get', function test() {
		var obj, dget, actual, expected;

		dget = factory( ['a','b'] );

		obj = { 'a': { 'b': 999 } };

		actual = dget( obj );
		expected = 999;

		assert.strictEqual( actual, expected );
	});

});
