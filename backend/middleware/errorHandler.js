/**
 * Global error handler middleware
 */
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Handle multer errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        error: 'File too large. Maximum file size is 5MB.' 
      });
    }
    return res.status(400).json({ error: err.message });
  }

  // Handle Zod validation errors
  if (err.name === 'ZodError') {
    return res.status(400).json({ 
      error: 'Validation error', 
      details: err.errors 
    });
  }

  // Default error response
  res.status(500).json({ 
    error: 'Something went wrong!', 
    message: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
}

export default errorHandler;