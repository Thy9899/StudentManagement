module.exports = (err, req, res, next) => {
  console.error("❌ Gateway Error:", err.message);

  // Axios Response Error
  if (err.response) {
    return res.status(err.response.status).json({
      success: false,
      message: err.response.data?.message || "Upstream service error",
      service: err.response.data,
    });
  }

  // Axios Request Error (service unreachable)
  if (err.request) {
    return res.status(503).json({
      success: false,
      message: "Service unavailable",
    });
  }

  // Other Errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
};
