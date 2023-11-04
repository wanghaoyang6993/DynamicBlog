const name = 'CSSSplitWebpackPluginFix';
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;

module.exports = class CSSSplitWebpackPluginFix extends CSSSplitWebpackPlugin {

    apply(compiler) {
        return super.apply(this.patchCompiler(compiler));
    }

    chunksMapping(compilation, chunks, done) {
        return super.chunksMapping(compilation, this.patchChunks(chunks), done);
    }

    patchCompiler(compiler) {
        // break 1: since that `compiler.plugin` has been removed
        compiler.plugin = (hookName, hooker) => {
            ({
                'emit'             : () => compiler.hooks['emit'].tapAsync(name, hooker),
                'this-compilation' : () => compiler.hooks['thisCompilation'].tap(name, compilation =>
                    hooker(this.patchCompilation(compilation))),
            })[hookName]();
        };
        return compiler;
    }

    patchCompilation(compilation) {
        // break 2: since that `compilation.plugin` has been removed
        compilation.plugin = (hookName, hooker) => {
            ({
                'optimize-chunk-assets' : () => compilation.hooks['processAssets'].tapAsync({
                    name, stage : compilation.constructor['PROCESS_ASSETS_STAGE_OPTIMIZE_COUNT'],
                }, (assets, done) => hooker(compilation['chunks'], done)),
            })[hookName]();
        };
        return compilation;
    }

    patchChunks(chunks) {
        // break 3: since that `chunk.files` has been changed from Array to Set
        chunks.forEach(chunk => { chunk.files = Array.from(chunk.files) });
        return chunks;
    }
};