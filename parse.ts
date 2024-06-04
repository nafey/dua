
let parseNumber = (token) => {
	return {
		type: "NUM",
		val: token.val
	};
}

let parseOp = (token) => {
	return {
		type: "OP",
		val: token.val
	};
}

let parseVar = (token) => {
	return {
		type: "VAR",
		val: token.val
	};
}

let parseLiteral = (token) => {
	if (["1", "2", "3"].includes(token.val )) {
		return parseNumber(token);
	}
	else {
		return parseVar(token);
	}
}

let parseOperation = (tokens) => {
	let lhs = parseLiteral(tokens[0]);
	let op = parseOp(tokens[1]);
	let rhs = parseLiteral(tokens[2]);

	if (op.val === "+") {
		return {
			type: "SUM",
			lhs: lhs,
			op: op,
			rhs: rhs
		};
	}
	else {
		return {
			type: "ASSIGN",
			lhs: lhs,
			op: op,
			rhs: rhs
		}
	}
}

export let parseExpr  = (tokens) : any => {
	if (tokens.length > 1) {
		return parseOperation(tokens)
	}
	else {
		return parseLiteral(tokens[0])
	}
}

let parseBlock = (tokens) => {
	// Find EOl
	let exprs : any = [];

	let pulled: any= [];

	tokens.forEach((t) => {
		if (t.type === "EOL") {
			exprs.push(parseExpr(pulled));
			pulled = [];
		}
		else {
			pulled.push(t);
		}
	});

	if (pulled.length > 0) exprs.push(parseExpr(pulled));


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
	return parseBlock(tokens)
}


