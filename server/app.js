if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(router);

app.use(errorHandler);

module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Listening from port ${port}`);
  });
}
