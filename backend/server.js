const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const hpp = require('hpp');
require('dotenv').config();

const app = express();

// =====================
// SECURITY MIDDLEWARES
// =====================

// 1. Helmet with safe configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// 2. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // different limits for dev/prod
  message: {
    error: 'Too many requests from this IP, please try again after 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// 3. Body Parsing with limits
app.use(express.json({ 
  limit: '10mb',
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb' 
}));

// 4. HTTP Parameter Pollution protection
app.use(hpp());

// 5. Compression
app.use(compression());

// 6. CORS with proper configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// 7. Custom Security Headers
app.use((req, res, next) => {
  // Remove X-Powered-By
  res.removeHeader('X-Powered-By');
  
  // Additional security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  next();
});

// =====================
// DATABASE CONNECTION
// =====================

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('✅ MongoDB Connected Successfully');
  console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
})
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err.message);
  process.exit(1);
});

// =====================
// ROUTES
// =====================

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

// =====================
// HEALTH CHECK
// =====================

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Amour Florals Backend is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// =====================
// ERROR HANDLING
// =====================

// 404 Handler
app.use( (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🚨 Error:', err.message);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      status: 'error',
      message: 'Duplicate field value entered'
    });
  }
  
  // Mongoose cast error
  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid resource ID'
    });
  }

  res.status(err.statusCode || 500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message
  });
});

// =====================
// SERVER START
// =====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📍 Health Check: http://localhost:${PORT}/api/health`);
});

module.exports = app;