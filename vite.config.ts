import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite' // 从vite导入，而不是vitest/config

// https://vitejs.dev/config/
export default defineConfig({
  esbuild:{
    pure: ['console.log'], // 删除 console.log
    drop: ['debugger'], // 删除 debugger
},
  plugins: [
    // 处理Vue单文件组件
    vue(),
    // 生成TypeScript类型声明文件的插件，用于把项目中的类型声明提取成一个文件，从而可以自动获得提示，这里主要是配置输出到哪里以及对应的名称
    dts({
      // 把src作为类型的根目录
      entryRoot:"./src",
      // src 目录下的所有 .ts / .d.ts / .vue 文件
      include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.vue'],
      // 输出到dist/types目录
      outDir: 'dist/types',
      staticImport: true,
      // // 在输出的 .d.ts 文件中插入类型声明的入口文件，通常是 index.d.ts，使得外部项目引用时可以更好地识别类型。
      // insertTypesEntry: true,
      // 使用tsconfig.app.json的配置而不是tsconfig.json
      tsconfigPath:"./tsconfig.app.json",
      // 不要打包成单个.d.ts文件，以便更好地调试
      rollupTypes: true,
      // 生成前清理目录
      cleanVueFileName: true,
      compilerOptions: {
        // 跳过第三方库（node_modules）里的 .d.ts 文件检查，
        skipLibCheck: true,
        declaration: true,
        emitDeclarationOnly: true,
      },
    }),
  ],
  // 路径别名设置
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  // 构建配置
  build: {
    // 库模式配置
    lib: {
      // 入口文件，组件库的导出文件
      entry: resolve(__dirname, 'src/index.ts'),
      // 库的全局变量名，专门给 UMD 或 IIFE 模式
      name: 'CreamUI',
      // 输出文件名格式，format为下面的es/umd
      fileName: (format) => `cream-ui.${format}.js`,
      // 产物格式
      formats: ['es'],
      // formats: ['es', 'umd'],
    },

    // 输出目录
    outDir: 'dist',
    // Rollup特定选项
    rollupOptions: {
      // 外部化依赖（不打包进库中）
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/free-regular-svg-icons',
        '@fortawesome/free-brands-svg-icons',
        '@fortawesome/vue-fontawesome',
        '@popperjs/core',
        'lodash-es'
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        // globals: {
        //   vue: 'Vue',
        //   '@fortawesome/fontawesome-svg-core': 'FontawesomeCore',
        //   '@fortawesome/free-solid-svg-icons': 'FaSolid',
        //   '@fortawesome/free-regular-svg-icons': 'FaRegular',
        //   '@fortawesome/free-brands-svg-icons': 'FaBrands',
        //   '@fortawesome/vue-fontawesome': 'FontawesomeVue',
        //   '@popperjs/core': 'Popper',
        //   'lodash-es': '_'
        // },
        // 确保输出到dist目录
        dir: "dist",
        // 关键：保持模块结构
        preserveModules: true,
        // // 取消放在同一个文件
        // inlineDynamicImports: false,
        // 关键：设置模块存放路径，以src为根输出目录
        preserveModulesRoot: 'src',
        // 控制打包输出的 JS 文件名
        entryFileNames: (chunk) => {
          return `es/${chunk.name}.js`;
        },
        // CSS文件输出配置
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'cream-ui.css';
          }
          return assetInfo.name || 'asset-[name]-[hash][extname]';
        }
      },
    },
      // // 确保CSS被提取到单独的文件中
      // cssCodeSplit: false,
      // // 是否压缩代码，不知道有什么作用
      // minify: true,
    // // 源码映射文件，方便调试
    // sourcemap: true,
  },
})
