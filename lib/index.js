'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isArray = require( 'validate.io-array' ),
	validate = require( './validate.js' ),
	defaults = require( './defaults.js' ),
	dget = require( './deepget.js' );


// DEEP GET //

/**
* FUNCTION: deepGet( obj, path[, opts] )
*	Deep get a nested property.
*
* @param {Object|Array} obj - input object
* @param {String|Array} path - key path
* @param {Object} [opts] - function options
* @param {String} [opts.sep='.'] - key path separator
* @returns {*} nested property value
*/
function deepGet( obj, path, options ) {
	var isStr = isString( path ),
		props,
		opts,
		err;
	if ( typeof obj !== 'object' || obj === null ) {
		return;
	}
	if ( !isStr && !isArray( path ) ) {
		throw new TypeError( 'deepGet()::invalid input argument. Key path must be a string primitive or a key array. Value: `' + path + '`.' );
	}
	opts = defaults();
	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isStr ) {
		props = path.split( opts.sep );
	} else {
		props = path;
	}
	return dget( obj, props );
} // end FUNCTION deepGet()


// EXPORTS //

module.exports = deepGet;
module.exports.factory = require( './factory.js' );
