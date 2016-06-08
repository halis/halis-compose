'use strict';

function fold( ) {
	let fns = Array.from( arguments );
	let right = fns.shift();

	return function ( ) {
		let args = Array.from( arguments );
		let result = null;

		if ( right === true ) fns.reverse();
		fns.forEach( fn => {
			if ( result == null ) {
				result = fn.apply( this, args );
			} else {
				result = fn.call( this, result );
			}
		});

	return result;
	};
}

let arityLimit = 1;
let checkArity = fn  => fn.length === arityLimit;
let allButLast = a => a.slice( 0, a.length - 1 );
let allButFirst = a => a.slice( 1 );
let identity = x => x;

function foldr() {
	let args = Array.from( arguments );
	let right = true;

	allButLast( args ).forEach( fn => {
		if ( !checkArity( fn ) ) {
			throw `foldr( ...functions ) requires all but the right-most 
function parameter to have an arity of ${arityLimit} but had ${fn.length}`;
		}
	});

	args.unshift( identity );
	args.unshift( right );
	return fold.apply( this,  args );
}

function foldl() {
	let args = Array.from( arguments );
	let right = false;

	allButFirst( args ).forEach( fn => {
		if ( !checkArity( fn ) ) {
			throw `foldl( ...functions ) requires all but the left-most
function parameter to have an arity of ${arityLimit} but had ${fn.length}`;
		}
	});

	args.push( identity );
	args.unshift( right );
	return fold.apply( this,  args );
}

module.exports = {
	foldr,
	foldl,
};
