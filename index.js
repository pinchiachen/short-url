import express from 'express';
import { logging, HttpStatus } from './infrastructure';
import { shorUrlHandler } from './short-url/handlers';

const app = express();
const port = 3000;

/** Middlewares */
app.use(express.json());

/** APIs */
app.post('/keys', shorUrlHandler.handleCreateKey);

/** Handle unexpected error */
app.use(function(err, req, res, next) {
  logging.error('Unexpected error', err.stack);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Unexpected error');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});