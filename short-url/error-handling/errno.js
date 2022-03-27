import { HttpStatus } from '../../infrastructure';

const ErrorNumber = Object.freeze({
  ERR_URL_KEY_CREATED_FAILED: 'ERR_URL_KEY_CREATED_FAILED',
});

function getStatusCodeByErrno(errno) {
  switch (errno) {
    case ErrorNumber.ERR_URL_KEY_CREATED_FAILED:
    default:
      return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

export {
  ErrorNumber,
  getStatusCodeByErrno,
};