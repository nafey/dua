let vars = {};
let last = 0;

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
	vars[stm.lhs.val] = stm.rhs.val
}

let execSum = (stm) => {
	return execNum(stm.lhs) + execNum(stm.rhs);
}

let execMultiplication = (stm) => {
	last = parseInt(stm.lhs.val) * parseInt(stm.rhs.val);
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


