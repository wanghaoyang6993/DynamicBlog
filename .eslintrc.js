module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // 添加组件命名忽略规则
 
    "vue/multi-word-component-names": ["error",{
      "ignores": ["Pagination", "HomeView"]  //在这个数组中加入需要忽略的组件名
    }]
  },
}
