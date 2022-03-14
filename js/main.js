let characters_container = document.getElementById('characters_container')

let characters = []

function sort_characters () {
  characters = characters.sort(compare_characters)
  empty(characters_container)
  characters.forEach(character => characters_container.appendChild(character))
}

function bind_character (character) {
  character.addEventListener('initiative_change', () => { sort_characters() })
  character.addEventListener('delete', () => {
    setTimeout(() => {
      characters.splice(characters.indexOf(character), 1)
      characters_container.removeChild(character)
    }, 200)
  })
  character.addEventListener('change', () => {
    document.cookie = `characters=${JSON.stringify(characters.map(character => character.serialize()))}; expires=${in_one_year().toGMTString()}`
  })
}

document.getElementById('new_character').addEventListener('click', () => {
  let character = new Character()
  bind_character(character)
  characters.push(character)
  sort_characters()
})

for (let cookie of document.cookie.split(/\s+/)) {
  if (cookie.startsWith('characters='))
  let characters_data = JSON.parse(cookie.slice(11))
  characters_data.forEach(character_data => {
    let character = new Character(character_data)
    bind_character(character)
    characters.push(character)
    sort_characters()
  })
  break
}
