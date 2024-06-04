export  async function readFile(fileName: string) : Promise<string> {
	const code = await Deno.readTextFile("a.dua");
	return code
}