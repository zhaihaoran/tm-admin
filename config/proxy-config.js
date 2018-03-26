module.exports = {
    proxyList: {
        '/admin': {
            target: "https://www.easy-mock.com/mock/5ab1cd4e099ac320aa6ba75b",
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/admin': ''
            }
        }
    }
}
