import express from 'express';
import { logging, HttpStatus } from './infrastructure';
import { shorUrlHandler } from './short-url/handlers';

const app = express();
const port = 3000;

/** middlewares */
app.use(express.json());
app.use(function(err, req, res, next) {
  logging.error('Unexpected error', err.stack);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Unexpected error');
});

/** APIs */
app.post('/createKey', shorUrlHandler.handleCreateKey);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});