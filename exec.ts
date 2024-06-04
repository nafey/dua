let vars = {};

let execAssign = (stm) => {
	vars[stm.lhs.val] = stm.rhs.val
}


function e(t) {
	if (t.type == "ASSIGN") execAssign(t);
	else if (t.type === "BLOCK") {
		t.exprs.forEach((expr) => {
			e(expr);
		});
	}
}

export function exec(t){
	e(t);
	console.log(vars);
}

