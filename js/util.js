function empty (element) {
  while (element.firstChild) element.removeChild(element.firstChild)
}

function in_one_year () {
  let today = new Date()
  today.setFullYear(today.getFullYear() + 1)
  return today
}
