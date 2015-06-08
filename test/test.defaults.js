/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	defaults = require( './../lib/defaults.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'defaults', function tests() {

	it( 'should export a function', function test() {
		expect( defaults ).to.be.a( 'function' );
	});

	it( 'should return an object', function test() {
		assert.isObject( defaults() );
	});

});
