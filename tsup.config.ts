import { defineConfig } from "tsup";

const is_dev = process.env.npm_lifecycle_event === "dev";

export default defineConfig((options) => {
	const debug = Boolean(options.watch) || is_dev;

	return {
		clean: true,
		entry: ["src/index.ts", "src/metadata.ts", "src/transform.ts", "src/use.ts"],
		outDir: "dist",
		onSuccess: debug ? "node dist/index.js" : undefined,

		// Format
		format: ["esm"],
		minify: !debug,
		splitting: true,

		// Generate
		sourcemap: debug,
		dts: true,
	};
});
