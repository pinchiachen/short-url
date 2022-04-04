import { HttpStatus } from '../../infrastructure';

const ErrorNumber = Object.freeze({
  ERR_URL_KEY_CREATED_FAILED: 'ERR_URL_KEY_CREATED_FAILED',
  ERR_URL_KEY_NOT_EXISTS_OR_EXPIRED: 'ERR_URL_KEY_NOT_EXISTS_OR_EXPIRED',
});

function getStatusCodeByErrno(errno) {
  switch (errno) {
    case ErrorNumber.ERR_URL_KEY_NOT_EXISTS_OR_EXPIRED:
      return HttpStatus.NOT_FOUND;
    case ErrorNumber.ERR_URL_KEY_CREATED_FAILED:
    default:
      return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

export {
  ErrorNumber,
  getStatusCodeByErrno,
};