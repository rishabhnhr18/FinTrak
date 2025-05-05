const dotenv = require('dotenv').config()
const path = require('path')
const express = require('express')
const colors = require('colors')
const cors = require('cors')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorHandler')
const fileUpload = require('express-fileupload')


connectDB()

const app = express()
const allowedOrigins = [
  'http://localhost:5173',
  'http://192.168.1.3:5173',
  'https://fintrak-frontend.onrender.com'
]
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true, // only if using cookies/auth
  }
))
//app.options('*', cors())
// Enable CORS
app.use(
  fileUpload({
    useTempFiles: true,
  })
)
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

const PORT = process.env.PORT || 8080

app.use(errorHandler)
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/', require('./routes/transactionRoutes'))
app.use('/api/', require('./routes/requestRoutes'))
app.use('/api/', require('./routes/uploadRoutes'))


app.get('/', (req, res) => {
  res.send('api is running...')
})

app.listen(PORT, () =>
  console.log(
    `Server Running on Port: http://localhost:${PORT} at ${new Date().toLocaleString(
      'en-US'
    )}`.bgCyan.bold.underline
  )
)
