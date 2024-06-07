let isDigits = (s: string) => {
	return /^\d+$/.test(s);
}

let isAdditive = (token) => {
	return (token.type === "OP" && (token.val === "+" || token.val === "-"));
}

let isMultiplicative = (token) => {
	return (token.type === "OP" && (token.val === "*" || token.val === "/"))

}

let parseNumber = (token) => {
	return {
		type: "NUM",
		val: parseInt(token.val)
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
	if (isDigits(token.val)) {
		return parseNumber(token);
	}
	else {
		return parseVar(token);
	}
}

let parseOperation = (tokens) => {
	let lhs = parseLiteral(tokens[0]);
	let op = parseOp(tokens[1]);
	let rhs = parseExpr(tokens.splice(2));

	if (op.val === "+") {
		return {
			type: "SUM",
			lhs: lhs,
			op: op,
			rhs: rhs
		};
	}
	else if (op.val === "-") {
		return {
			type: "DIFF",
			lhs: lhs,
			op: op,
			rhs: rhs
		}
	}
	else if (op.val === "/") {
		return {
			type: "DIV",
			lhs: lhs,
			op: op,
			rhs: rhs
		}
	}
	else if (op.val === "*") {
		return {
			type: "MUL",
			lhs: lhs,
			op: op,
			rhs: rhs
		}
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

let parseAdditive = (tokens: any[]) => {
	let before : any[] = [];	
	let after: any[] = [];
	let i = 0;

	for (i = 0; i < tokens.length; i++) {
		let item : any = tokens[i];
		if (isAdditive(item)) {
			break;
		}

		before.push(item);
	}

	for (let j = i + 1; j < tokens.length; j++) {
		let item = tokens[j];
		after.push(item);	
	}

	if (after.length > 0) {

		return {
			type: (tokens[i].val === "+") ? "SUM" : "DIFF",
			lhs: parseExpr(before),
			rhs: parseAdditive(after)
		}
	}
	else {
		return parseExpr(tokens);
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


