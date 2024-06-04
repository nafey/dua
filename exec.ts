let vars = {};

let execAssign = (stm) => {
	vars[stm.lhs.val] = stm.rhs.val
}

export function exec(t){
	if (t.type == "ASSIGN") execAssign(t);
	console.log(vars)
}

