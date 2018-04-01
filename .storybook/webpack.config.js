var path = require('path');
var utils = require(path.resolve(__dirname, '../build/utils.js'));

module.exports = {
    module: {
        rules: [
            ...utils.styleLoaders({
                sourceMap: true,
                usePostCSS: true,
            }),
        ],
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
        },
    },
};