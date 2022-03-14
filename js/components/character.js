function bind_change (element, get, set) {
  element.addEventListener('click', () => {
    if (element.firstChild && element.firstChild.tagName == 'INPUT') return
    let input = document.createElement('input')
    input.value = get()
    input.addEventListener('change', () => { set(input.value) })
    input.addEventListener('focusout', () => { set(input.value) })
    empty(element)
    element.appendChild(input)
    input.select()
  })
}

function compare_characters (a, b) {
  if (a.initiative == b.initiative) return b.bonus_initiative - a.bonus_initiative
  else return b.initiative - a.initiative
}

class Character extends HTMLElement {
  constructor ({
    name = 'John Doe',
    initiative = 0,
    bonus_initiative = 0,
    image = 'https://www.dndbeyond.com/Content/Skins/Waterdeep/images/characters/default-avatar-builder.png',
  } = {}) {
    super()
    this._initialized = false
    this._name = null
    this._initiative = null
    this._bonus_initiative = null
    this._image = null

    this.image_div = document.createElement('div')
    this.image_div.className = 'image'
    bind_change(this.image_div, value => this.image, value => this.image = value)

    this.name_div = document.createElement('div')
    this.name_div.className = 'name'
    bind_change(this.name_div, value => this.name, value => this.name = value)

    this.initiative_div = document.createElement('div')
    bind_change(this.initiative_div, value => this.initiative, value => this.initiative = value)

    this.bonus_initiative_div = document.createElement('div')
    this.bonus_initiative_div.className = 'bonus_initiative'
    bind_change(this.bonus_initiative_div, value => this.bonus_initiative, value => this.bonus_initiative = value)

    this.delete_button = document.createElement('button')
    this.delete_button.className = 'delete'
    this.delete_button.textContent = 'delete'
    this.delete_button.addEventListener('click', () => {
      this.classList.add('deleted')
      this.dispatchEvent(new Event('delete'))
    })

    this.image = image
    this.name = name
    this.initiative = initiative
    this.bonus_initiative = bonus_initiative
  }

  get image () {
    return this._image
  }

  set image (value) {
    if (value != this.image) {
      this._image = value
      this.dispatchEvent(new Event('change'))
    }
    try {
      this.image_div.innerHTML = `<img src="${this.image}">`
    } catch (error) {
      // Useless erro, it does work just fine
    }
  }

  get name () {
    return this._name
  }

  set name (value) {
    if (value != this.name) {
      this._name = value
      this.dispatchEvent(new Event('change'))
    }
    this.name_div.textContent = this.name
  }

  get initiative () {
    return this._initiative
  }

  set initiative (value) {
    if (typeof value == 'string') value = parseInt(value)
    if (value != this.initiative) {
      this._initiative = value
      this.dispatchEvent(new Event('initiative_change'))
      this.dispatchEvent(new Event('change'))
    }
    this.initiative_div.textContent = `${this.initiative}`
  }

  get bonus_initiative () {
    return this._bonus_initiative
  }

  set bonus_initiative (value) {
    if (typeof value == 'string') value = parseInt(value)
    if (value != this._bonus_initiative) {
      this._bonus_initiative = value
      this.dispatchEvent(new Event('initiative_change'))
      this.dispatchEvent(new Event('change'))
    }
    this.bonus_initiative_div.textContent = `(+${this.bonus_initiative})`
  }

  connectedCallback () {
    if (this._initialized) return
    this._initialized = true

    this.appendChild(this.image_div)
    this.appendChild(this.name_div)
    this.appendChild(this.initiative_div)
    this.appendChild(this.bonus_initiative_div)
    this.appendChild(this.delete_button)
  }

  serialize () {
    return  {
      name: this.name,
      initiative: this.initiative,
      bonus_initiative: this.bonus_initiative,
      image: this.image
    }
  }
}

customElements.define('a-character', Character)
