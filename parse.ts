import { Token } from "./token";

export type Node = BlockNode | BinaryNode | ValNode;

export interface BinaryNode {
	type: string,
	lhs: Token | Node,
	rhs: Token | Node
}

export interface ValNode {
	type: string,
	val: string
}

export interface BlockNode {
	type: string,
	exprs: Node[]
}

let op = {
	"+": "SUM",
	"-": "DIFF",
	"*": "MUL",
	"/": "DIV",
	"=": "ASSIGN"
}

let parsePrimary = (tokens: Token[]): Node => {
	let token: Token = tokens[0];

	if (tokens.length >= 2) {
		let lastToken: Token = tokens[tokens.length - 1];

		if (token.type === "PAREN" && token.val === "(") {
			if (lastToken.type === "PAREN" && lastToken.val === ")") {
				return parseAdditive(tokens.slice(1, -1));
			}
			else {
				throw Error("Mismatching Parenthesis")
			}
		}
	}	

	if (tokens.length > 1) throw Error("Parse Primary got multiple tokens");

	return token;
}

let parseBinary = (tokens: Token[], matchOp: string[], nextFn: Function): Node => {
	let before: Token[] = [];	
	let after: Token[] = [];
	let openParens: number = 0;
	let i: number = 0;

	for (i = 0; i < tokens.length; i++) {
		let item: Token = tokens[i];
		if (item.type === "PAREN" && item.val === "(") openParens++;
		if (item.type === "PAREN" && item.val === ")") {
			openParens--;
			if (openParens < 0) throw Error("Unmatched Parens");
		}

		if (openParens === 0 && item.type === "OP" && matchOp.includes(item.val)) {
			break;	
		}	

		before.push(item);
	}

	if (openParens !== 0) throw Error("Mismatched Parens");

	for (let j = i + 1; j < tokens.length; j++) {
		let item: Token = tokens[j];
		after.push(item);	
	}

	if (after.length > 0) {

		return {
			type: op[tokens[i].val],
			lhs: nextFn(before),
			rhs: parseBinary(after, matchOp, nextFn)
		}
	}
	else {
		return nextFn(tokens);
	}
}

let parseMultiplicative = (tokens: Token[]): Node => {
	return parseBinary(tokens, ["*", "/"], parsePrimary)
}

export let parseAdditive = (tokens: Token[]): Node => {
	return parseBinary(tokens, ["+", "-"], parseMultiplicative)
}

let parseAssign = (tokens: Token[]): Node => {
	return parseBinary(tokens, ["="], parseAdditive);
}


let parseBlock = (tokens: Token[]): Node => {
	// Find EOl
	let exprs: Node[] = [];

	let pulled: Token[] = [];

	tokens.forEach((t) => {
		if (t.type === "EOL") {
			exprs.push(parseAssign(pulled));
			pulled = [];
		}
		else {
			pulled.push(t);
		}
	});

	if (pulled.length > 0) exprs.push(parseAssign(pulled));


	if (exprs.length <= 1) {
		return exprs[0];
	}
	else {
		return {
			type: "BLOCK",
			exprs: exprs
		}
	}

}

export function parse (tokens: Token[]): Node {
	let ret =  parseBlock(tokens)
	return ret;
}


