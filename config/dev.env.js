'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

/* 配置全局变量 */
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_URL: 'http://10.0.0.148'
})
