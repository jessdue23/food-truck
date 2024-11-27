const express = require('express')

const app = express()
const port = 3010

// middleware
app.use(express.static('public'))
app.use(express.json())

// routes
app.use('/api/v1', require('./routes/api/v1/items'))
app.use('/api/v1', require('./routes/api/v1/events'))
app.use('/', require('./routes/static'))



// server
const message = `Server is running on port ${port}. Visit  in your browser.`
app.listen(port, () => console.log(message))