import createModal from "./functions/createModal.js";
import store from "./store.js";
import sort from "./sort.js";
import updateListDOM from "./functions/updateListDOM.js";
import createElement from "./functions/createElement.js";
import constants from "./constants.js";
import createSearchElement from "./functions/createSearchElement.js";

(async () => {
  // получение и рендер клиентов при загрузке страницы
  store.getClients()
    .then(() => console.log('запуск страницы', store.clients))


  // если в url есть запрос
  const urlParams = new URLSearchParams(window.location.search)
  const idClient = urlParams.get('client')
  if (idClient !== null && idClient.length > 0) {
    store.searchClient(idClient).then((r) => {
      console.log('Клиент, переданный в ссылке', r)
      if (r.message === undefined) {
        createModal('edit', r.id)
      }
    })
  }

  // управление с помощью стрелок/enter
  let timer = null
  let results = false
  let firstPress = false
  const searchFieldDOM = document.getElementById('searchField')
  const searchResultsDOM = document.getElementById('searchResults')
  let selectedElement = 0
  document.addEventListener('keydown', (e) => {
    if (!results) return
    const elements = document.getElementsByClassName('search-element')

    // up
    if (e.code === 'ArrowUp') {
      if (selectedElement <= 0) return;
      for (const element of elements) element.classList.toggle('search-element_selected', false)
      selectedElement--
      elements[selectedElement].classList.toggle('search-element_selected', true)
    }
    // down
    if (e.code === 'ArrowDown' && selectedElement < elements.length) {
      if (selectedElement >= elements.length-1) return;
      for (const element of elements) element.classList.toggle('search-element_selected', false)
      if (!firstPress) {
        elements[selectedElement].classList.toggle('search-element_selected', true)
        firstPress = true
      } else {
        selectedElement++
        elements[selectedElement].classList.toggle('search-element_selected', true)
      }
    }
    // enter
    if (e.code === 'Enter') {
      createModal('edit', +elements[selectedElement].querySelector('span').textContent)
    }
  })

  // строка поиска
  const loading = createElement('div', {classList: ['searchLoading', 'svg-loading']});
  searchFieldDOM.addEventListener('input',  (e) => {
    clearTimeout(timer)
    timer = setTimeout(async () => {
      if (e.target.value.trim().length > 0) {
        document.querySelector('.search').append(loading)

        // рендер списка
        searchResultsDOM.innerHTML = ''
        for (const el of await store.searchClients(e.target.value)) {
          document.getElementById('searchResults').append(createSearchElement(el))
        }

        // если найден всего 1 клиент, то он сразу выделен и можно нажать Enter
        if (document.getElementsByClassName('search-element').length === 1) {
          document.getElementsByClassName('search-element')[0].classList.toggle('search-element_selected', true)
        }
        results = true
        loading.remove()
      } else {
        searchResultsDOM.innerHTML = '';
        selectedElement = 0
        results = false
        firstPress = false
      }
    }, 300)
  })
})()


// кнопка 'добавить клиента'
document.getElementById('addClient').addEventListener('click', createModal)

// поля сортировки списка
for (const field of constants.sortFields) {
  document.getElementById(field).addEventListener('click', (e) => {
    const normalized = field.substring(4, 5).toLowerCase()+field.substring(5, field.length)
    sort.setSort(normalized, {
      fieldDOM: e.target,
      arrowDOM: e.target.querySelector('.svg-sort-arrow')
    })
    updateListDOM()
  })
}