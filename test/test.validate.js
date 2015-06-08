/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	validate = require( './../lib/validate.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'validate', function tests() {

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
	});

	it( 'should return an error if provided an options argument which is not an object', function test() {
		var values, err;

		values = [
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
			err = validate( {}, values[ i ] );
			assert.isTrue( err instanceof TypeError, values[ i ] );
		}
	});

	it( 'should return an error if provided a separator option which is not a string primitive', function test() {
		var values, err;

		values = [
			new String( '5' ),
			5,
			null,
			NaN,
			true,
			undefined,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'sep': values[ i ]
			});
			assert.isTrue( err instanceof TypeError, values[ i ] );
		}
	});

	it( 'should return `null` if all options are valid', function test() {
		var opts;

		opts = {
			'sep': '_'
		};
		assert.isNull( validate( {}, opts ) );

		opts = {
			'beep': true, // unrelated options
			'boop': false
		};
		assert.isNull( validate( {}, opts ) );
	});

});
