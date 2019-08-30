const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const authRouter = require('./routers/authRouter');
const sellRouter = require('./routers/sellRouter');
const bookRouter = require('./routers/bookRouter');
const cartRouter = require('./routers/cartRouter');
const orderRouter = require('./routers/orderRouter');
const searchRouter = require('./routers/searchRouter');
const payloadRouter = require('./routers/payloadRouter');
const anotherShelfRouter = require('./routers/anotherShelfRouter');

// init app
const app = express();

// connect db
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log('connected db'))
  .catch(err => console.log(err));

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
require('./config/passport')(passport);

// router
app.use('/api/auth', authRouter);
app.use('/sell', passport.authenticate('jwt', { session: false }), sellRouter);
app.use('/carts', passport.authenticate('jwt', { session: false }), cartRouter);
app.use('/order', passport.authenticate('jwt', { session: false }), orderRouter);
app.use('/payloads', passport.authenticate('jwt', { session: false }), payloadRouter);
app.use('/books', bookRouter);
app.use('/search', searchRouter);
app.use('/anotherShelf', anotherShelfRouter);

// start server
app.listen(process.env.PORT_SERVER, () =>
  console.log(`server is running on port ${process.env.PORT_SERVER}`),
);
