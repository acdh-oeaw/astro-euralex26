import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";

export function loadEnvFiles(paths: ReadonlyArray<string>): void {
	for (const path of paths) {
		if (existsSync(path)) loadEnvFile(path);
	}
}
