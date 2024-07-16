import { defineConfig } from "tsup";

const is_dev = process.env.npm_lifecycle_event === "dev";

export default defineConfig((options) => {
	const debug = Boolean(options.watch) || is_dev;

	if (debug) console.info("🚧 Building in debug mode");
	else console.info("🏗️ Building in production mode");

	return {
		clean: true,
		entry: ["src/index.ts", "src/schemeta.ts"],
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
