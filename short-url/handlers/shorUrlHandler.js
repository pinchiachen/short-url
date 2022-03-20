import { logging, HttpStatus } from '../../infrastructure';
import { shorUrlManager } from '../managers';

const HANDLER_NAME = 'shorUrlHandler';

async function handleCreateKey(req, res) {
  logging.debug(`${HANDLER_NAME}.handleCreateKey`);

  const {
    original_url: originalUrl,
    custom_alias: customAlias,
    expire_date: expireDate,
  } = req?.body || {};
  if (!originalUrl) {
    res.status(HttpStatus.BAD_REQUEST).send({
      code: HttpStatus.BAD_REQUEST,
      msg: 'original_url is required',
    });
    return;
  }
  if (customAlias && ((typeof customAlias !== 'string') || (customAlias?.length > 20))) {
    res.status(HttpStatus.BAD_REQUEST).send({
      code: HttpStatus.BAD_REQUEST,
      msg: 'Invalid custom_alias',
    });
    return;
  }

  const { urlKey } = await shorUrlManager.createShortUrl({
    originalUrl,
    customAlias,
    expireDate,
  });

  res.status(HttpStatus.CREATED).send({
    code: 0,
    msg: null,
    url_key: urlKey,
  });

  return;
}

const shorUrlHandler = {
  handleCreateKey,
};

export default shorUrlHandler;
