import errorHanlding from '../error-handling';
import { logging, HttpStatus } from '../../infrastructure';
import { shorUrlManager } from '../managers';

const HANDLER_NAME = 'shorUrlHandler';

async function handleCreateKey(req, res, next) {
  try {
    logging.debug(`${HANDLER_NAME}.handleCreateKey`);

    const {
      original_url: originalUrl,
      custom_alias: customAlias,
      expire_date: expireDate,
    } = req?.body || {};
    if (!originalUrl) {
      res.status(HttpStatus.BAD_REQUEST).send({
        msg: 'original_url is required',
      });
      return;
    }
    if (customAlias && ((typeof customAlias !== 'string') || (customAlias?.length > 20))) {
      res.status(HttpStatus.BAD_REQUEST).send({
        msg: 'Invalid custom_alias',
      });
      return;
    }

    const {
      urlKey,
      error,
    } = await shorUrlManager.createShortUrl({
      originalUrl,
      customAlias,
      expireDate,
    });
    if (error) {
      res.status(errorHanlding.getStatusCodeByErrno(error.errno)).send({
        msg: error.msg,
      });
      return;
    }

    res.status(HttpStatus.CREATED).send({
      url_key: urlKey,
    });

    return;
  } catch (err) {
    next(err);
  }
}

async function handleGetOriginalUrl(req, res, next) {
  try {
    logging.debug(`${HANDLER_NAME}.handleGetOriginalUrl`);

    const { key } = req?.params || {};
    if (!key) {
      res.status(HttpStatus.BAD_REQUEST).send({
        msg: 'key is required',
      });
      return;
    }

    const {
      url,
      error,
    } = await shorUrlManager.getOriginalUrl({ key });
    if (error) {
      res.status(errorHanlding.getStatusCodeByErrno(error.errno)).send({
        msg: error.msg,
      });
      return;
    }

    res.status(HttpStatus.OK).send({
      url,
    });

    return;
  } catch (err) {
    next(err);
  }
}

const shorUrlHandler = {
  handleCreateKey,
  handleGetOriginalUrl,
};

export default shorUrlHandler;
