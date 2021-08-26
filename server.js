const express  = require('express');
const app      = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
require('dotenv').config();

db.DevDB.sequelize.sync();
// db.testDB.sequelize.sync({ force: true });

require("./app/routes/malware.routes")(app);

const port = process.env.PORT || 3000;



/**
 * @description runs app on port 1000
 */
app.listen(port, () => {
    console.log(`listing on port ${port}...`);
});



module.exports = {
    app,
}

