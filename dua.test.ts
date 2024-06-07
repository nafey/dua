import { expect, test, beforeEach,  } from "bun:test";
import { tokenize } from "./token.ts";
import { parse, parseExpr } from "./parse.ts";
import { exec } from "./exec.ts";
import { readFile } from "./utils.ts";

// const consoleDebug: any = console.debug;

console.debug = () => {};
console.log = () => {};


let interpret = (code) => {
	return exec(parse(tokenize(code)))
}

test("2 + 3", () => {
	expect(2 + 3).toBe(5);
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

