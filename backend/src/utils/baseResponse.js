
/**
 * Fungsi untuk membentuk response sukses standar.
 * @param {Object} res - express response object
 * @param {Number} statusCode - HTTP status code (default: 200)
 * @param {String} message - pesan sukses
 * @param {Object|Array|null} data - data payload
 */
exports.successResponse = (res, statusCode = 200, message = 'Success', data = null) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Fungsi untuk membentuk response error standar.
 * @param {Object} res - express response object
 * @param {Number} statusCode - HTTP status code (default: 500)
 * @param {String} message - pesan error
 * @param {Object|null} error - detail error opsional
 */
exports.errorResponse = (res, statusCode = 500, message = 'Internal Server Error', error = null) => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    error: error ? error.toString() : undefined,
    timestamp: new Date().toISOString(),
  });
};
