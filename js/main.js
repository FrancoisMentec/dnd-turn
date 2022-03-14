let characters_container = document.getElementById('characters_container')

let names = ['Fizz', 'Diana', 'Ezreal', 'Riven']
names.forEach(name => {
  characters_container.appendChild(new Character({
    name: name
  }))
})
