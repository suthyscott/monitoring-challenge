const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}
const getAllCharacters = () =>{
  clearCharacters()

  axios.get(`${baseURL}/characters`)
  .then((response) => {
    for( let i = 0; i < response.data.length; i++){
      console.log()
      createCharacterCard(response.data[i])
    }
  })
  .catch(error => console.log(error))
}

const getOneCharacter = () =>{
  clearCharacters()
  axios.get(`${baseURL}/character/${event.target.id}`)
  .then(response => {
    console.log("get on character: ", id)
    createCharacterCard(response.data)
  })
  .catch(error => console.log(error))
}

const getOldChars = (event) =>{
event.preventDefault()

  clearCharacters()
  axios.get(`${baseURL}/character/?age=${ageInput.value}`)
  .then(res => {
    for( let i = 0; i < res.data.length; i++){
      createCharacterCard(res.data[i])
    }
  })
  .catch(error => console.log(error))
  ageInput.value = ''
}

const createNewChar = (event) =>{
  event.preventDefault()
  clearCharacters()

  const newLikes = [...newLikesText.value.trim().split(',')]

  let body = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: newAgeInput.value,
    likes: newLikes
  }
  axios.post(`${baseURL}/character`, body)
  .then(res => {
    for( let i = 0; i < res.data.length; i++){
      createCharacterCard(res.data[i])
    }

  })
  .catch(error => console.log(error))

  newFirstInput.value = ''
  newLastInput.value = ''
  newGenderDropDown.value = 'female'
  newAgeInput.value = ''
  newLikesText.value = ''
}


for(let i = 0; i < charBtns.length; i++){
  charBtns[i].addEventListener('click', getOneCharacter)
}
getAllBtn.addEventListener('click', getAllCharacters)
ageForm.addEventListener('submit', getOldChars)
getAllCharacters()
createForm.addEventListener('submit', createNewChar)