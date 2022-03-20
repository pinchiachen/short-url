import crypto from 'crypto';
import { logging } from '../../infrastructure';
import { urlKeyModel } from '../models';

const MANAGER_NAME = 'shorUrlManager';

function createUrlKey(url = '') {
  return crypto.createHash('sha256').update(url).digest('base64').substring(0, 20);
}

function getIndexByUrlKey(urlKey = '') {
  const total = Array.from(urlKey).reduce((acc, char) => {
    acc += char.charCodeAt(0);
    return acc;
  }, 0);

  return total % 8;
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

  let urlKey = customAlias;
  if (!urlKey) {
    urlKey = createUrlKey(originalUrl);
  }

  const index = getIndexByUrlKey(urlKey);

  await urlKeyModel.createUrlKey({
    originalUrl,
    urlKey,
    index,
    expiredStamp: expireDate,
  });

  return { urlKey };
}

const shorUrlManager = {
  createShortUrl,
};

export default shorUrlManager;
