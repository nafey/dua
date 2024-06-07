import { tokenize } from "./token.ts";
import { parse, parseExpr } from "./parse.ts";
import { exec } from "./exec.ts";
import {readFile} from "./utils.ts";

// const code = await Deno.readTextFile("a.dua");
const code = await readFile("a.dua");


let interpret = (code) => {
	exec(parse(tokenize(code)))
}

let parseT = (code) => {
	return parse(tokenize(code))
}

// console.log(parseT(code));
interpret(code);