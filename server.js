const express  = require('express');
const app      = express();
const app2     = express();
const app3     = express();
const proxyApp = express();




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app2.use(express.json());
app2.use(express.urlencoded({ extended: true }));
app3.use(express.json());
app3.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.DevDB.sequelize.sync();

require("./app/routes/malware.path:1000.routes")(app);
require("./app/routes/malware.path:9000.routes")(app3);
require("./app/routes/malware.routes")(app2);
require("./app/routes/malware.proxy.routes")(proxyApp);

const proxyPort = 8007;
const port8000 = 8000;
const port9000 = 9000;
const port1000 = 1000;



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

