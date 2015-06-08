'use strict';

var deepGet = require( './../lib' );

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
