let vars = {};
let last = 0;

let isNum = (stm) => {
	return stm.type === "NUM";
}

let execNum = (stm) => {
	return parseInt(stm.val);
}

let execAssign = (stm) => {
	vars[stm.lhs.val] = stm.rhs.val
}

let execSum = (stm) => {
	let lhs, rhs;

	if (isNum(stm.lhs)) {
		lhs = execNum(stm.lhs)
	}
	else  {
		lhs = execExpr(stm.lhs)
	}	

	if (isNum(stm.rhs)) {
		rhs = execNum(stm.rhs)
	}
	else  {
		rhs = execExpr(stm.rhs)
	}	

	return rhs + lhs;
}

let execMultiplication = (stm) => {
	last = parseInt(stm.lhs.val) * parseInt(stm.rhs.val);
}

function execExpr(stm) {
	if (stm.type == "ASSIGN") {
		execAssign(stm);
	}
	else if (stm.type === "SUM") {
		return execSum(stm);
	}
	else if (stm.type === "MUL") {
		return execMultiplication(stm);
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


