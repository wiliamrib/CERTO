const errorHandler = (err, req, res, next) => {
  console.error('Erro capturado:', err.message);
  
  res.status(500).json({
    message: err.message || 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
};

module.exports = errorHandler;