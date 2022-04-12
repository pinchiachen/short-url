import SQL from 'sql-template-strings';
import { logging, mysqlConnector } from '../../infrastructure';

const MODEL_NAME = 'urlKeyModel';

function getTableName(index) {
  return `url_key_000${index}`;
}

async function createUrlKey({
  originalUrl,
  urlKey,
  index,
  expiredStamp,
}) {
  logging.debug(`${MODEL_NAME}.createUrlKey`, {
    originalUrl,
    urlKey,
    index,
    expiredStamp,
  });

  const { affectedRows = 0 } = await mysqlConnector.query(SQL`
    INSERT INTO short_url.`.append(getTableName(index)).append(SQL`
    (
      url_key,
      original_url,
      expired_stamp
    ) VALUES (
      ${urlKey},
      ${originalUrl},
      ${expiredStamp}
    )
  `));

  return affectedRows > 0;
}

async function getOriginalUrlByKey({ urlKey, index }) {
  logging.debug(`${MODEL_NAME}.getOriginalUrlByKey`, { urlKey, index });

  const [{ original_url: url } = []] = await mysqlConnector.query(SQL`
    SELECT original_url
    FROM short_url.`.append(getTableName(index)).append(SQL`
    WHERE true
      AND url_key = ${urlKey}
      AND IFNULL(expired_stamp, '2999-12-31T23:59:59Z') > NOW()
  `));

  return url;
}

const urlKeyModel = {
  createUrlKey,
  getOriginalUrlByKey,
};

export default urlKeyModel;
