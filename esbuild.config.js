const { startService } = require('esbuild')
const { watch } = require('chokidar')

const noop = () => {};

/**
 * Function to update lines when something happens
 * @param input The text you want to print
 * @param isBuiltInput Whether you are printing `Built in x ms` or not
 */
const updateLine = (input, isBuiltInput = false) => {
    const numberOfLines = (input.match(/\n/g) || []).length;
    process.stdout.cursorTo(0, 2);
    process.stdout.clearScreenDown();
    process.stdout.write(input);
    isBuiltInput ? process.stdout.moveCursor(0, -numberOfLines) : noop();
};

/**
 * Builds the code in no time
 */
const build = async () => {
    //Start build service
    const service = await startService();
    try {
        process.stdout.cursorTo(0, 2);
        process.stdout.clearLine(0);
        // Get time before build starts
        const timerStart = Date.now();
        // Build code
        await service.build({
            color: true,
            entryPoints: ["./src/flex-select.js", "./src/flex-select.css"],
            outdir: "./build",
            minify: true,
            bundle: true,
            sourcemap: false,
            logLevel: "error",
        });
        // Get time after build ends
        const timerEnd = Date.now();
        updateLine(`Built in ${timerEnd - timerStart}ms.`, true);
    } catch (e) {
        console.warn(e)
        // OOPS! ERROR!
    } finally {
        // We command you to stop. Will start again if files change.
        service.stop();
    }
};

const watcher = watch(["src/**/*"]);
console.log("Watching files... \n");
build();
watcher.on("change", () => {
    build();
});
