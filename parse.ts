import { Token } from "./token";

export type Line = Token[];

export type Node = BlockNode | BinaryNode | ValNode | InvocationNode | FnNode;

export interface BinaryNode {
	type: string,
	lhs: Token | Node,
	rhs: Token | Node
}

export interface InvocationNode {
	type: "INVOKE",
	func: string
}


export interface ValNode {
	type: string,
	val: string
}

export type BlockNode = ExprsNode | FnNode;

export interface ExprsNode {
	type: "BLOCK",
	exprs: Node[]
}

export interface FnNode {
	type : "FN",
	name: string,
	body: Node[],
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
		else if(token.type === "SYM" && tokens[1].val === "(" && lastToken.val === ")") {
			return {
				type: "INVOKE",
				func: token.val
			}
		} 
		else {
			throw Error("Unexpected primary expression of type " + token.type);
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
		if (item.type === "INDENT") continue;

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

let parseLine = (tokens: Token[]) : Node => {
	return parseAssign(tokens);
}

let parseBlock2 = (tokens: Token[]): Node => {
	// Find EOl
	let exprs: Node[] = [];

	let pulled: Token[] = [];

	tokens.forEach((t) => {
		if (t.type === "EOL") {
			exprs.push(parseLine(pulled));
			pulled = [];
		}
		else {
			pulled.push(t);
		}
	});

	if (pulled.length > 0) exprs.push(parseLine(pulled));


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

let getIndentation = (line: Line) => {
	let i = 0;
	for (i = 0; i < line.length; i++) {
		if (line[i].type !== "INDENT") {
			return i;
		}
	}

	return i;
}

let parseBlock = (lines: Line[], indentation = 0) : Node => {
	let nodes : Node[] = [];

	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		if (getIndentation(line) > indentation) {
			continue;
		}

		if (getIndentation(line) < indentation) {
			return {type: "BLOCK", exprs: nodes};
		}

		if (line[0].type === "SYM" && line[0].val === "fn") {
			let fnName = line[1].val;
			let fnBody = parseBlock(lines.slice(i + 1), indentation + 1) as ExprsNode;
			nodes.push({type :"FN", name: fnName, body: fnBody.exprs});
		}
		else {
			nodes.push(parseLine(line));
		}
	}

	return {type: "BLOCK", exprs: nodes};
}


export let parseLines = (tokens: Token[]) : Node =>  {
	let lines:  Line[] = [];
	lines.push([]);

	for (let i = 0; i < tokens.length; i++) {
		let token: Token = tokens[i];
		if (token.type === "EOL") {
			lines.push([]);
		}
		else {
			lines[lines.length - 1].push(token);
		}
	}




	let b = parseBlock(lines, 0);
	console.log(JSON.stringify(b, null, 4));
	// console.log(b);
	// console.log(b.exprs[0].body);

	return b;
}



export function parse (tokens: Token[]): Node {
	let ret =  parseLines(tokens)
	console.log(ret);
	return ret;
}
