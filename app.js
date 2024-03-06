const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const createError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(morgan("dev"));
//app.use(cors());
//app.options('*', cors())
var whitelist = ['http://localhost:8000', 'http://192.168.1.100']; //white list consumers
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

app.use(cors(corsOptions)); 


const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Simplysplit API with Swagger",
      version: "0.0.1",
      description:
        "This is a simple CRUD API docs for Simplysplit application",
    },
    servers: [
      {
        //url: "http://192.168.1.102:3000",
        url: "http://localhost:3000"
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"], // paths to your files
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));



//ROUTES
app.use("/user", require("./routes/user.routes"));
app.use("/transaction", require("./routes/transaction.routes"));
app.use("/split", require("./routes/split.routes"));


app.get("/", async (req, res, next) => {
  console.log(req.body);
  res.status(401).send({ message: "Prohibited 🐻" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server Started 🚀 @ http://localhost:${PORT}`)
);
