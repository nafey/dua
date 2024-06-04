
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

let parseAssignment = (tokens) => {
	let lhs = parseVar(tokens[0]);
	let op = parseOp(tokens[1]);
	let rhs = parseLiteral(tokens[2]);

	return {
		type: "ASSIGN",
		lhs: lhs,
		op: op,
		rhs: rhs
	}
}

let parseExpr = (tokens) => {
	if (tokens.length > 1) {
		return parseAssignment(tokens)
	}
	else {
		return parseLiteral(tokens[0])
	}
}

export function parse (tokens) {
	return parseExpr(tokens)
}
