import { tokenize } from "./token.ts";
import { parse } from "./parse.ts";
import { exec } from "./exec.ts";
import {readFile} from "./utils.ts";

// const code = await Deno.readTextFile("a.dua");
const code = await readFile("a.dua");

exec(parse(tokenize(code)));
