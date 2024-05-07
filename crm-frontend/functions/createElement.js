export default function createElement(tag, attrs) {
  const element = document.createElement(tag)
  for (const key of Object.keys(attrs)) {
    if (key === 'append') continue
    if (key === 'addEventListener') continue
    if (key === 'addEventListeners') continue
    if (key === 'classList') {
      element.classList.add(...attrs[key])
      continue
    }
    element[key] = attrs[key]
  }
  if (attrs['addEventListeners']) for (const listener of attrs['addEventListeners']) element.addEventListener(listener.event, listener.func)
  if (attrs['addEventListener']) element.addEventListener(attrs.addEventListener.event, attrs.addEventListener.func)


  if (attrs['append']) element.append(...attrs.append)

  return element
}