import { tokenize } from "./token.ts";
import { parse } from "./parse.ts";
import { exec } from "./exec.ts";



let code = "a = 1"
exec(parse(tokenize(code)))

// let ret = parse(tokens)
// console.log(ret)

