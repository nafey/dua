export interface Token {
	type: string,
	val: string
}

export function tokenize (code : string) : Token[] {
	let tokens : Token[] = [];

	let lines: string[] = code.split("\n");

	lines.forEach((line: string, i: number) => {
		if (i > 0) {
			if (tokens[tokens.length - 1].type !== "EOL") {
				tokens.push({type: "EOL", val : "\n"});
			}
		}

		let chars = line.split("");

		let peek = (idx: number) => {
			if (idx < chars.length) return chars[idx];
			else return "";
		}

		for (let i = 0; i < chars.length; i++) {
			let next: string = chars[i];

			if (["=", "+", "-", "/", "*"].includes(next)) {

				tokens.push({type: "OP", val: next});
			}
			else if (next === "(" || next === ")") {
				tokens.push({type: "PAREN", val: next});
			}
			else if (next === "\t") {
				tokens.push({type: "INDENT", val: next});
			}
			else if (/^\d+$/.test(next)) {
				tokens.push({type: "NUM", val: next});

				while (/^\d+$/.test(peek(i+1))) {
					i = i + 1;
					next = chars[i];
					tokens[tokens.length - 1].val += next;
				}
			}
			else if (next === " ") {
				continue;
			}
			else {
				tokens.push({type : "SYM", val: next});

				while (/^[a-z0-9]+$/i.test(peek(i + 1))) {
					i = i + 1;
					next = chars[i];
					tokens[tokens.length - 1].val += next;
				}
			}
		}
	});



	return tokens;
}

