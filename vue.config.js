module.exports = {
  devServer: {
    port: process.env.VUE_APP_PORT || 8080,
    proxy: {
      '/api': {
        target: 'https://ctmb.ecommercesheba.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  pluginOptions: {
    i18n: {
      locale: "bn",
      fallbackLocale: "bn",
      localeDir: "locales",
      enableInSFC: false
    }
  } 
};
