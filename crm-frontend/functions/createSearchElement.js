import createElement from "./createElement.js";
import createFio from "./createFio.js";
import createOutputDate from "./createOutputDate.js";
import createModal from "./createModal.js";

export default function createSearchElement(client) {
  return createElement('div', {
    href: '#',
    classList: ['search__element', 'search-element'],
    append: [
      createElement('div', {
        classList: ['search-element__id'],
        textContent: 'ID: ',
        append: [createElement('span', {textContent: client.id})]
      }),
      createElement('div', {
        classList: ['search-element__fio'],
        textContent: createFio(client, 'fi')
      }),
      createElement('div', {
        classList: ['search-element__date'],
        textContent: 'Обновлён: ' + createOutputDate(client).updatedDateOut
      }),
    ],
    addEventListener: {
      event: 'click',
      func: async () => {
        document.getElementById('searchResults').style.pointerEvents = 'none'
        await createModal('edit', client.id)
        document.getElementById('searchResults').style.pointerEvents = 'initial'
      }
    },
  })
}