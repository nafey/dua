let isDigits = (s: string) => {
	return /^\d+$/.test(s);
}

export function tokenize (code : string) {
	let tokens : any = [];

	let lines: string[] = code.split("\n");

	lines.forEach((line: string) => {
		let items = line.split(" ");

		items.forEach((item: string) => {
			item = item.trim();
			
			if (item === "=" || item === "+" || item === "*" || item === "-" || item === "/") {
				tokens.push({type: "OP", val: item});
			}
			else if (item === "(" || item === ")") {
				tokens.push({type: "PAREN", val: item});
			}
			else if (isDigits(item)) {
				tokens.push({type: "NUM", val: item});
			}
			else {
				tokens.push({type: "VAL", val: item})
			}
		});

		tokens.push({type : "EOL", val: "\n"});
	});

	return tokens;
}

