function GlobalExceptionHandler(app) {
  app.use((err, req, res, next) => {
    let status = err?.status ?? err?.statusCode;
    if (!status || isNaN(status) || status > 511 || status < 200) {
      status = 500;
    }
    res.status(status).send({
      status,
      type: 'Server Error',
      message: err?.message ?? err.stack ?? 'Internal Server Error',
    });
  });
}
module.exports = GlobalExceptionHandler;
