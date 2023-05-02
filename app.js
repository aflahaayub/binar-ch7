const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session)
// const csrf = require('csurf');
const flash = require("connect-flash")
const User = require("./models/user")
const multer = require("multer")
const MONGODB_URI =
  "mongodb://aflahaayub:gLzysk3yEPvmR25P@ac-ceb7muo-shard-00-00.4tq5jxd.mongodb.net:27017,ac-ceb7muo-shard-00-01.4tq5jxd.mongodb.net:27017,ac-ceb7muo-shard-00-02.4tq5jxd.mongodb.net:27017/?ssl=true&replicaSet=atlas-11rkp9-shard-0&authSource=admin&retryWrites=true&w=majority"
const app = express()

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
})
// const csrfProtection = csrf();

app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "views")

const authRoutes = require("./routes/auth")
const apiRoutes = require("./routes/api")

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
)

// app.use(csrfProtection);
app.use(flash())

app.use((req, res, next) => {
  if (!req.session.user) {
    return next()
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => console.log(err))
})

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn
  // res.locals.csrfToken = req.csrfToken();
  next()
})

app.use("/", authRoutes)

app.use("/api", apiRoutes)

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  )
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  next()
})

app.use((error, req, res, next) => {
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({ message, data })
})

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(result => {
    console.log("RUNNING ON PORT 2000")
    app.listen(2000)
  })
  .catch(err => console.log(err))
