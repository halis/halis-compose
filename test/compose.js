'use strict';

const compose = require( '../src/compose' );
const expect = require( 'chai' ).expect;

let inc = x => x += 1;
let neg = x => x *= -1;

describe( 'compose', () => {

	describe( '#foldl()', () => {

		it( 'should run left to right correctly', () => {
			let l = compose.foldl( Math.pow, inc, inc, neg );
			expect( l( 3, 4 ) ).to.equal( -83 );
		});

		it( 'args should have arity of 1 (except the first) or throw an error', () => {
			let error = false;
			try {
				let bad = compose.foldl( Math.pow, inc, inc, inc, neg, Math.pow );
			} catch( e ) {
				error = true;
			}
			expect( error ).to.equal( true );
		});

		it( 'without args should return the identity function', () => {
			let identity = compose.foldl( );

			expect( identity( 234 ) ).to.equal( 234 );
		});

	});
	
	describe( '#foldr()', () => {

		it( 'should run right to left correctly', () => {
			let r = compose.foldr( inc, inc, inc, neg, Math.pow );
			expect( r( 3, 4 ) ).to.equal( -78 );
		});

		it( 'args should have arity of 1 except the last or throw an error', () => {
			let error = false;
			try {
				let bad = compose.foldr( Math.pow, inc, inc, inc, neg, Math.pow );
			} catch( e ) {
				error = true;
			}
			expect( error ).to.equal( true );
		});

		it( 'without args should return the identity function', () => {
			let identity = compose.foldr( );

			expect( identity( 'Hello' ) ).to.equal( 'Hello' );
		});

	});

});
