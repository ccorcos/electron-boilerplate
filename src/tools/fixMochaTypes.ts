import * as fs from "fs-extra"
import { rootPath } from "./rootPath"

async function rewrite(file: string, fn: (text: string) => string) {
	const contents = await fs.readFile(file, "utf8")
	const output = fn(contents)
	await fs.writeFile(file, output, { encoding: "utf8" })
}

async function main() {
	await rewrite(rootPath("node_modules/@types/mocha/index.d.ts"), (str) => {
		return (
			str
				.replace(/declare const/g, "export const")
				.replace(/declare var/g, "export var")
				.replace(/declare function/g, "export function")
				.replace(/declare module "mocha"[^\}]+\}/m, "")
				// Delete to the end.
				.replace(/declare module "mocha\/lib\/interfaces\/common"[^\$]+/m, "")
		)
	})
}

main().catch((error) => {
	console.error(error)
	setTimeout(() => {
		process.exit(1)
	}, 100)
})
