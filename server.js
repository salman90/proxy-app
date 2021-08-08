const express = require('express');
const http = require('http');
const httpProxy = require('http-proxy');
const app      = express();
const app2     = express();
const app3     = express();
const proxyApp = express();
const mysql = require("mysql2");
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');


var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.DevDB.sequelize.sync();
require("./app/routes/malware.routes")(app);
require("./app/routes/malware.routes")(app2);
require("./app/routes/malware.routes")(app3);



const targets = [
    'http://localhost:8000',
    'http://localhost:9000',
    'http://localhost:1000'
]

// const proxyServer = http.createServer(
//                         function (req, res) {
//                         setTimeout(function () {
//                             proxy.web(req, res, {
//                                 target: targets[Math.floor(Math.random() * 3)]
//                             });
//                         }, 50);
//                     }).listen(8008);

// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
//     res.end();
// }).listen(9008);

const proxyPort = 8007;
const port8000 = 8000;
const port9000 = 9000;
const port1000 = 1000;




const customRouter = function (req) {
    return targets[Math.floor(Math.random() * 3)];
}

const rewriteFn = function (path, req) {
    let hostname    = req.params.hostname;
    let pathEnd     = req.params[0];
    if(pathEnd){
        return path.replace(`/urlinfo/1/${hostname}/${pathEnd}`, `/urlinfo/1/${hostname}/${pathEnd}`);
    }else{
        return path.replace(`/urlinfo/1/${hostname}`, `/urlinfo/1/${hostname}`);

    }
};

const options = {
    target: 'http://localhost:8000/', // target host
    router: customRouter,
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: rewriteFn, // rewrites our endpoints to '' when forwarded to our target
}



const exampleProxy = createProxyMiddleware(options);

proxyApp.get("/urlinfo/1/:hostname/*", exampleProxy);
proxyApp.use("/urlinfo/1/:hostname", exampleProxy);

proxyApp.listen(proxyPort, () => {
    console.log(`listing on port ${proxyPort}...`);
})

app.listen(port1000, () => {
    console.log(`listing on port ${port1000}...`);
});


app2.listen(port8000, () => {
    console.log(`listen on port ${port8000}...`)
})

app3.listen(port9000, () => {
    console.log(`listen on port ${port9000}...`)
})


module.exports = {
    proxyApp,
    app,
    app2,
    app3
}

