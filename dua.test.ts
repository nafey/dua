import { expect, test, beforeEach,  } from "bun:test";
import { tokenize } from "./token.ts";
import { parse, parseAdditive } from "./parse.ts";
import { exec } from "./exec.ts";
import { readFile } from "./utils.ts";

// const consoleDebug: any = console.debug;

// console.debug = () => {};
// console.log = () => {};


let interpret = (code) => {
	return exec(parse(tokenize(code)))
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

