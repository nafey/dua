export  async function readFile(fileName: string) : Promise<string> {
	// const code = await Deno.readTextFile("a.dua");
	const code = await Bun.file(fileName).text();
	return code
}