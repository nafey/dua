export function tokenize (code : string) {
	let items = code.split(" ")
	let tokens : any= [];
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
	})

	return tokens;
}

export function helloWorld () {
	console.log("Hello world")
}