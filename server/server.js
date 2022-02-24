const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use(express.static(path.join(__dirname, '../public')))

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '0eac6c2b530e417b80559513559d3b10',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')



const port = process.env.PORT || 4545
// app.use(rollbar.errorHandler())
app.listen(port, ()=>{ console.log(`take us to warp ${port}`)})