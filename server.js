const path = require('path')
const cookieParser = require('cookie-parser')
const express = require('express')
const dotenv = require('dotenv')
const app = express()
const colors = require('colors')
const fileupload = require('express-fileupload')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')

// server.js
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const morgan = require('morgan')
const connectDB = require('./configs/db')
const errorHandler = require('./middlewares/error')

dotenv.config({ path: './configs/config.env' })
connectDB()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

// fileupload
app.use(fileupload())

// helmet
app.use(helmet())

// xss clean
app.use(xss())

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
})

app.use(limiter)

// Prevent http param pollution
app.use(hpp())

// Enable CORS
app.use(cors())

// server.js
app.use(mongoSanitize())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1/auth', require('./routes/auth'))

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(
    `Server running on port: ${PORT} mode: ${process.env.MODE_DEV}`.yellow
  )
)
