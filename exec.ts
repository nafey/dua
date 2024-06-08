let vars = {};

let isNum = (stm) => {
	return stm.type === "NUM";
}

let execNum = (stm) => {
	let num = 0;
	if (isNum(stm)) {
		num = parseInt(stm.val);
	}
	else {
		num = execExpr(stm) as number;
	}
	return num;
}

let execAssign = (stm) => {
	vars[stm.lhs.val] = execNum(stm.rhs)
}

let execSum = (stm) => {
	return execNum(stm.lhs) + execNum(stm.rhs);
}

let execMultiplication = (stm) => {
	return execNum(stm.lhs) * execNum(stm.rhs);
}

let execDivision = (stm) => {
	return execNum(stm.lhs) / execNum(stm.rhs);
}

let execDiff = (stm) => {
	return execNum(stm.lhs) - execNum(stm.rhs);
}

function execExpr(stm) {
	if (stm.type === "ASSIGN") {
		execAssign(stm);
	}
	else if (stm.type === "NUM") {
		return execNum(stm);
	}
	else if (stm.type === "SUM") {
		return execSum(stm);
	}
	else if (stm.type === "MUL") {
		return execMultiplication(stm);
	}
	else if (stm.type === "DIV") {
		return execDivision(stm);
	}
	else if (stm.type === "DIFF") {
		return execDiff(stm);
	}
	else if (stm.type === "BLOCK") {
		stm.exprs.forEach((expr) => {
			execExpr(expr);
		});
	}
}

export function exec(stm){
	let val = execExpr(stm);
	return val;
}

export function dump(stm) : Object {
	exec(stm);
	return vars;
}
