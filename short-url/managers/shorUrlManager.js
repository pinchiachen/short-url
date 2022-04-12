import crypto from 'crypto';
import moment from 'moment-timezone';
import errorHanlding from '../error-handling';
import { logging } from '../../infrastructure';
import { urlKeyModel } from '../models';

const MANAGER_NAME = 'shorUrlManager';

function createUrlKey(url = '') {
  return crypto.createHash('sha256').update(url).digest('base64').substring(0, 20);
}

function getIndexByUrlKey(urlKey = '') {
  const codeSum = Array.from(urlKey).reduce((codeAcc, char) => {
    codeAcc += char.charCodeAt(0);
    return codeAcc;
  }, 0);

  return codeSum % 8;
}

async function createShortUrl({
  originalUrl,
  customAlias,
  expireDate,
}) {
  logging.debug(`${MANAGER_NAME}.createShortUrl`, {
    originalUrl,
    customAlias,
    expireDate,
  });

  const urlKey = customAlias || createUrlKey(originalUrl);
  const index = getIndexByUrlKey(urlKey);

  const successCreated = await urlKeyModel.createUrlKey({
    originalUrl,
    urlKey,
    index,
    expiredStamp: moment.utc(expireDate).toDate(),
  });
  if (!successCreated) {
    return {
      error: {
        msg: 'Url key created failed',
        errno: errorHanlding.ErrorNumber.ERR_URL_KEY_CREATED_FAILED,
      }
    };
  }

  return {
    urlKey,

    error: null,
  };
}

async function getOriginalUrl({ key }) {
  logging.debug(`${MANAGER_NAME}.getOriginalUrl`, { key });

  const index = getIndexByUrlKey(key);

  const url = await urlKeyModel.getOriginalUrlByKey({
    urlKey: key,
    index,
  });
  if (!url) {
    return {
      error: {
        msg: 'Url key does not exist or is expired',
        errno: errorHanlding.ErrorNumber.ERR_URL_KEY_NOT_EXISTS_OR_EXPIRED,
      }
    };
  }

  return {
    url,

    error: null,
  };
}

const shorUrlManager = {
  createUrlKey,
  getIndexByUrlKey,
  createShortUrl,
  getOriginalUrl,
};

export default shorUrlManager;
