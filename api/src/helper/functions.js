const sendError = (errorMessage) => {
  return res.status(500).json({
    success: false,
    message: errorMessage,
  });
};

module.exports = {
  sendError,
};
