import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import vitePluginVueSetupExtend from 'vite-plugin-vue-setup-extend'
import autoprefixer from 'autoprefixer'
import postCssPxToRem from 'postcss-pxtorem'
import copyPlugin from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const isProd = env.VITE_NODE_ENV === 'prod';

    return {
        plugins: [
            vue(),
            vitePluginVueSetupExtend(),
            // AutoImport({
            //     resolvers: [VantResolver()],
            // }),
            // Components({
            //     resolvers: [VantResolver()],
            // }),
            copyPlugin({
                targets: [
                    { src: 'src/utils/crypto-js.min.js', dest: 'dist/assets' },
                    { src: 'src/utils/telegram-mini-app.js', dest: 'dist/assets' },
                    { src: 'src/assets/css/font/creepycrawlersrotal.ttf', dest: 'dist/assets' },
                    { src: 'public/logo.png', dest: 'dist' },
                    { src: isProd ? 'public/tonconnect-manifest-prod.json' : 'public/tonconnect-manifest-test.json', dest: 'dist', rename: 'tonconnect-manifest.json' }
                ],
                hook: 'writeBundle'
            })
        ],
        css: {
            postcss: {
                plugins: [
                    autoprefixer({
                        overrideBrowserslist: [
                            "Android 4.1",
                            "iOS 7.1",
                            "Chrome > 31",
                            "ff > 31",
                            "ie >= 8",
                        ],
                    }),
                    postCssPxToRem({
                        rootValue(res: any) {
                            return res.file.indexOf('vant') !== -1 ? 37.5 : 39;// // 39表示设计稿宽度是390px，37.5表示375设计稿375px，vant的设计是375
                        },
                        propList: ['*', '!border'], // 需要转换的属性，这里选择除了border外其他全部都进行转换
                        // selectorBlackList: [".van"], // 过滤掉van-开头的class，不进行rem转换
                        // exclude: "/node_modules", // 忽略包文件转换rem
                    }),
                ]
            }
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
    }
})
