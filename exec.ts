let vars = {};
let last = 0;

let execAssign = (stm) => {
	vars[stm.lhs.val] = stm.rhs.val
}

let execSum = (stm) => {
	last = parseInt(stm.lhs.val) + parseInt(stm.rhs.val);
}


function e(t) {
	if (t.type == "ASSIGN") {
		execAssign(t);
	}
	else if (t.type === "SUM") {
		let val = execSum(t);
	}
	else if (t.type === "BLOCK") {
		t.exprs.forEach((expr) => {
			e(expr);
		});
	}
}

export function exec(t){
	e(t);
	console.log(last)
}

