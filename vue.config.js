module.exports = {
  devServer: {
    port: process.env.VUE_APP_PORT || 8080,
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
