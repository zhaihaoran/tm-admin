module.exports = {
    proxyList: {
        '/api': {
            target: "https://jsonplaceholder.typicode.com",
            changeOrigin: true,
            pathRewrite: {'^/api' : ''}
        }
    }
}
