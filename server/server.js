const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')

app.use(cors())
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
Rollbar.critical("Crash while processing payment");
Rollbar.warning("Facebook API unavailable");


let characters = [
    {
        id: 0,
        firstName: 'Jake', 
        lastName: 'Peralta', 
        gender: 'male',
        age: 39, 
        likes: ['Amy', 'Die Hard', 'Taylor Swift']
    }, 
    {
        id: 2, 
        firstName: 'Rosa', 
        lastName: 'Diaz', 
        gender: 'female',
        age: 34, 
        likes: ['motorcycles', 'Nancy Meyers', 'weapons']
    }, 
    {
        id: 1, 
        firstName: 'Amy', 
        lastName: 'Santiago', 
        gender: 'female', 
        age: 37, 
        likes: ['binders', 'grammar', 'dancing']
    }, 
    {
        id: 3,
        firstName: 'Charles', 
        lastName: 'Boyle', 
        gender: 'male',
        age: 42, 
        likes: ['Jake', 'dogs', 'food']
    }
]

app.get('/characters', (req, res) => {
    console.log('hit chars')
    res.status(200).send(characters)
})

app.get('/character/:name', (req, res) => {
    console.log("get name is running")
    const { name } = req.params
    const index = characters.findIndex(char => char.firstName.toLowerCase() === name)
    res.status(200).send(characters[index])
})

app.get('/character', (req, res) => {
    const { age } = req.query
    console.log("age")
    if(age === ''){
        Rollbar.warning("no age given")
        res.status(400).send('must provide an age.')
    }
    else{
    let filtered = characters.filter(char => {
        return char.age > age
    })

    res.status(200).send(filtered)
    }
})

// app.get('/character', (req, res) => {
//     const { age } = req.query
//     console.log("age")
//     let filtered = characters.filter(char => {
//         return char.age > age
//     })

//     res.status(200).send(filtered)
// })

let id = 4

app.post('/character', (req, res) => {
    let newChar = {...req.body, id}
    newChar.likes = newChar.likes.slice(0, 3)
    characters.unshift(newChar)
    rollbar.log("successfully")
    res.status(200).send(characters)
    id++
})





const port = process.env.PORT || 4545
app.use(rollbar.errorHandler())
app.listen(port, ()=>{ console.log(`take us to warp ${port}`)})