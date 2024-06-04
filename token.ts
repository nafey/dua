export function tokenize (code : string) {
	let tokens : any= [];

	let lines: string[] = code.split("\n");

	lines.forEach((line: string) => {
		let items = line.split(" ");

		items.forEach((item: string) => {
			if (item === "=") {
				tokens.push({type: "OP", val: item});
			}
			else if (["1", "2", "3"].includes(item)) {
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

