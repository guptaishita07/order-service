const { OrderNotFoundError } = require('../services/orderService');

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err instanceof OrderNotFoundError)
    return res.status(404).json({ error: err.message, code: err.code });
  if (err.httpStatus)
    return res.status(err.httpStatus).json({ error: err.message, code: err.code });
  return res.status(500).json({ error: 'Internal server error', code: 'INTERNAL_ERROR' });
};
module.exports = errorHandler;