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
    ) ON DUPLICATE KEY UPDATE
      original_url = VALUES(original_url),
      expired_stamp = VALUES(expired_stamp)
  `));

  return affectedRows > 0;
}

const urlKeyModel = {
  createUrlKey,
};

export default urlKeyModel;
