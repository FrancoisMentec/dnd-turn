class Character extends HTMLElement {
  constructor ({
    name = '',
    initiative = 0,
    initiative_bonus = 0,
  } = {}) {
    super()
    this._initialized = false

    this.name_div = document.createElement('div')
    this.name_div.textContent = name

    this.initiative_div = document.createElement('div')
    this.initiative_div.textContent = initiative
  }

  connectedCallback () {
    if (this._initialized) return
    this._initialized = true

    this.appendChild(this.name_div)
    this.appendChild(this.initiative_div)
  }
}

customElements.define('a-character', Character)
