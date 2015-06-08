/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	deepGet = require( './../lib/deepget.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepget', function tests() {

	var obj = {
		'a': {
			'b': {
				'c': 'd'
			}
		},
		'arr': [
			{
				'x': 1,
				'y': 2
			},
			{
				'x': 3,
				'y': 4
			}
		],
		'null': null
	};

	it( 'should export a function', function test() {
		expect( deepGet ).to.be.a( 'function' );
	});

	it( 'should deep get a nested property', function test() {
		var expected, actual;

		actual = deepGet( obj, ['a','b','c'] );
		expected = 'd';

		assert.strictEqual( actual, expected );
	});

	it( 'should return `undefined` if unable to successfully get', function test() {
		var actual;

		actual = deepGet( obj, ['a','b','djfajdfaj'] );
		assert.isUndefined( actual );

		actual = deepGet( obj, ['null','e'] );
		assert.isUndefined( actual );
	});

	it( 'should deep get into an array', function test() {
		var expected, actual;

		actual = deepGet( obj, ['arr',0,'y'] );
		expected = 2;

		assert.strictEqual( actual, expected );
	});

});
