// @flow
require("dotenv");

import morgan from "morgan";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import stylus from 'stylus';
import koutoSwiss from 'kouto-swiss';
import rupture from 'rupture';

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

// config stylus compiler
function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(koutoSwiss())
        .use(rupture());
}

// plugins
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//middlewares
app.use(stylus.middleware({
  src: __dirname + "/public/assets/styles",
  compile: compile
}));

// set the view engine to ejs
app.set('view engine', 'ejs');

// set views path
app.set("views", "public/views");

// set static files
app.use(express.static(__dirname + '/public/assets'));

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.listen(5000, "localhost", () => {
  console.log('listening to port 5000');
});
