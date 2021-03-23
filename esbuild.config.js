const { build } = require('esbuild')
const postCssPlugin = require('@deanc/esbuild-plugin-postcss')

build({
    entryPoints: ['./src/flex-select.js', './src/flex-select.css'],
    outdir: './build',
    minify: true,
    bundle: true,
    sourcemap: true,
    plugins: [
        postCssPlugin()
    ],
    watch: {
        onRebuild(error, result) {
            if (error) console.error('watch build failed: ', error)
            else console.error('watch build succeeded: ', result)
        }
    }
}).catch(() => process.exit(1))
