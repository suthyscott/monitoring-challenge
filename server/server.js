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
  accessToken: 'ec7e8a99f5cd41ae93b6b10c5d37ddbe',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')
let students = []

app.post('/api/student', (req, res)=>{
    rollbar.log("Hi,Scott")
    let {name} = req.body

    name = name.trim()

    const index = students.findIndex(studentName=> studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('Student added successfully', {author: 'Scott', type: 'manual entry'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.warning('No name given')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.error('student already exists')
        res.status(400).critical('that student already exists')
    }

})

const port = process.env.PORT || 4545
app.use(rollbar.errorHandler())
app.listen(port, ()=>{ console.log(`take us to warp ${port}`)})