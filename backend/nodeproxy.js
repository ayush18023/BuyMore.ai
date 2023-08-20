const express = require("express")
const app = express()
const cors = require("cors")
const proxy = require('express-http-proxy');

app.listen(5001,()=>{
    console.log("Started at 5001")
})
app.use(cors())
app.use(proxy('127.0.0.1:5000', {
    proxyReqPathResolver: function (req) {
      var parts = req.url.split('?');
      var queryString = parts[1];
      var updatedPath = parts[0].replace(/test/, 'tent');
      return updatedPath + (queryString ? '?' + queryString : '');
    }
}));