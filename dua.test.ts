import { expect, test} from "bun:test";
import { tokenize } from "./token.ts";
import { parse, parseLines } from "./parse.ts";
import { exec, dump } from "./exec.ts";
import { readF } from "./utils.ts";

// const consoleDebug: any = console.debug;
// console.log = () => {};

let interpret = (code) => {
	return exec(parse(tokenize(code)));
}

let dumpVars = (code): any => {
	return dump(parse(tokenize(code)));
}

test("Sum 1", () => {
	expect(interpret("1 + 1")).toBe(2);
});

test("Mul 1", () => {
	expect(interpret("2 * 3")).toBe(6);
});

test("Add and Mul", () => {
	expect(interpret("22 * 2 + 3 + 3 * 6 * 2 + 3 + 8")).toBe(94);
});

test("Sub support", () => {
	expect(interpret("22 - 12")).toBe(10);
});

test("Sub 2", () => {
	expect(interpret("22 * 2 - 12 * 2")).toBe(20);
});

test("Div", () => {
	expect(interpret("4 / 2")).toBe(2);
});

test("Div 2", () => {
	expect(interpret("8 + 2 / 2")).toBe(9);
});

test("Paren", () => {
	expect(interpret("( 9 + 2 )")).toBe(11);
});

test("Paren 2", () => {
	expect(interpret("2 + ( 9 + 2 )")).toBe(13);
});

test("Paren 3", () => {
	expect(interpret("( 9 + 2 ) + 3")).toBe(14);
});

test("Paren 4", () => {
	expect(interpret("( 9 + 2 ) * 3")).toBe(33);
});

test("No Space", () => {
	expect(interpret("2+2")).toBe(4);
});

test("Assign", () => {
	expect(dumpVars("a = 1").a).toBe(1);
});


test("Func", async () => {
	let code = await readF("a.dua")
	let ret = dumpVars(code);
	expect(ret.a).toBe(1);
})
