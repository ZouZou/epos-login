export default {
    '/api/*': {
      "target": 'http://192.168.12.30:3000/',
      "secure": false,
      "bypass": function (req, res, proxyOptions) {
        /*console.log(req);
        console.log(res);
        console.log(proxyOptions);*/
        req.headers['X-Custom-Header'] = 'yes';
      },
      "pathRewrite": {
          "^/api": "/users"
      },
      "changeOrigin": true,
      "logLevel": "debug"
    }
  };