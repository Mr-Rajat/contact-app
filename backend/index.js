// import connectToMongo from './db';

require('./db').connect()

const express = require('express')
var cors = require('cors')
const app = express()
const port = 5500

app.use(cors())

// middleware
app.use(express.json())

// to view images in frontend
app.use(express.static('uploads'));

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

app.get('/', (req, res) => {
  res.send('Hello Rajat!')
})

app.listen(port, () => {
  console.log(`ContactApp backend listening on port http://localhost:${port}`)
})

// client.connect()
