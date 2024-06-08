let op = {
	"+": "SUM",
	"-": "DIFF",
	"*": "MUL",
	"/": "DIV",
}

let isDigits = (s: string) => {
	return /^\d+$/.test(s);
}


let parseNumber = (token) => {
	return {
		type: "NUM",
		val: parseInt(token.val)
	};
}

let parseVar = (token) => {
	return {
		type: "VAR",
		val: token.val
	};
}


let parsePrimary = (tokens: any[]) => {
	if (tokens.length > 1) throw Error("Parse Primary got multiple tokens");

	let token = tokens[0];

	if (isDigits(token.val)) {
		return parseNumber(token);
	}
	else {
		return parseVar(token);
	}
}

let parseBinary = (tokens: any[], matchOp: string[], nextFn: Function) => {
	let before : any[] = [];	
	let after: any[] = [];
	let i = 0;

	for (i = 0; i < tokens.length; i++) {
		let item : any = tokens[i];
		if (item.type === "OP" && matchOp.includes(item.val)) {
			break;	
		}	
		// if (isAdditive(item)) {
		// 	break;
		// }

		before.push(item);
	}

	for (let j = i + 1; j < tokens.length; j++) {
		let item = tokens[j];
		after.push(item);	
	}

	if (after.length > 0) {

		return {
			type: op[tokens[i].val],
			lhs: nextFn(before),
			// rhs: parseAdditive(after),
			rhs: parseBinary(after, matchOp, nextFn)
		}
	}
	else {
		return nextFn(tokens);
	}
}

let parseMultiplicative = (tokens: any[]) => {
	return parseBinary(tokens, ["*", "/"], parsePrimary)
}

export let parseAdditive = (tokens: any[]) => {
	return parseBinary(tokens, ["+", "-"], parseMultiplicative)
}


let parseBlock = (tokens) => {
	// Find EOl
	let exprs : any = [];

	let pulled: any = [];

	tokens.forEach((t) => {
		if (t.type === "EOL") {
			exprs.push(parseAdditive(pulled));
			pulled = [];
		}
		else {
			pulled.push(t);
		}
	});

	if (pulled.length > 0) exprs.push(parseAdditive(pulled));


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

export function parse (tokens) {
	let ret =  parseBlock(tokens)
	return ret;
}


