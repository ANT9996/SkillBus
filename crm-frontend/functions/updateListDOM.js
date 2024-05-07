import store from "../store.js";
import createElement from "./createElement.js";
import createModal from "./createModal.js";
import listLoading from "./listLoading.js";
import sort from "../sort.js";
import deleteModal from "./deleteModal.js";
import sleep from "./sleep.js";
import createOutputDate from "./createOutputDate.js";

export default function updateListDOM() {
  const clientsList = document.getElementById('clientsList')
  const list = []
  listLoading(true)
  for (const client of sort.sortClientList(store.clients)) {
    const {createdDateOut, updatedDateOut, createdDate, updatedDate, createdTime, updatedTime} = createOutputDate(client)

    function selectSvgIcon(type) {
      switch (type) {
        case "Телефон":
          return "svg__contact-tel";
        case "Доп. телефон":
          return "svg__contact-tel";
        case "Email":
          return "svg__contact-mail";
        case "Vk":
          return "svg__contact-vk";
        case "Facebook":
          return "svg__contact-fb";
        case "Twitter":
          return "svg__contact-profile"
        default:
          return
      }
    }

    function contactContent(type, value) {
      // console.log(`${type}: ${value}`)
      switch (type) {
        case "Телефон":
          return `${type}: ${value}`
        case "Доп. телефон":
          return `${type}: ${value}`
        case "Email":
          return `${type}: <a class="contact__link" href="mailto:${value}"> ${value}</a>`
        case "Vk":
          return `${type}: <a class="contact__link" target="_blank" href="https://www.vk.com/${value}">@${value}</a>`
        case "Facebook":
          return `${type}: <a class="contact__link" target="_blank" href="https://www.facebook.com/${value}">@${value}</a>`
        case "Twitter":
          return `${type}: <a class="contact__link" target="_blank" href="https://www.twitter.com/${value}">@${value}`
      }
      return `${type}: ${value}`
    }
    const contacts = [];
    const remContacts = [];
    for (let i = 0; i < client.contacts.length; i++) {
        (i > 3 ? remContacts : contacts).push(createElement('li', {
          classList: ['contact', selectSvgIcon(client.contacts[i].type)],
          append: [
            createElement('span', {
              classList: ['contact__info'],
              innerHTML: contactContent(client.contacts[i].type, client.contacts[i].value)
            })
          ]
        }))
    }

    const clientDOM = createElement('li', {
      classList: ['list__item', 'item', 'grid'],
      append: [
        createElement('div', {classList: ['item__id'], textContent: client.id}),
        createElement('div', {
          classList: ['item__fio'],
          textContent: `${client.surname} ${client.name} ${client.lastName}`
        }),
        createElement('div', {
          classList: ['item__created-at'],
          textContent: createdDateOut,
          append: [createElement('span', {textContent: createdTime})]
        }),
        createElement('div', {
          classList: ['item__updated-at'],
          textContent: updatedDateOut,
          append: [createElement('span', {textContent: updatedTime})]
        }),
        createElement('ul', {
          classList: ['item__contacts', 'contacts'],
          append: (() => {
            const showMore = createElement('li', {
              classList: [ 'contact', 'contact__more'],
              textContent: `+${remContacts.length}`,
              title: 'Показать все',
              addEventListener: {
                event: 'click',
                func: () => {showMore.remove(); clientDOM.querySelector('.contacts').append(...remContacts)}
              }
            })
            return remContacts.length > 0 ? [...contacts, showMore] : [...contacts]
          })()}),
        createElement('ul', {
          classList: ['item__control', 'control'],
          append: [(() => {
            const edit = createElement('li', {
              classList: ['control__edit'],
              textContent: 'Изменить',
              addEventListener: {
                event: 'click',
                func: () => {
                  // console.log('изменить')
                  edit.classList.toggle('svg-control-loading', true)
                  createModal('edit', client.id)
                    .then(() => {
                      window.history.replaceState(null, null, "?");
                      edit.classList.toggle('svg-control-loading', false)
                    })
                }
              }
            })
            return edit;
          })(),
            createElement('li', {
              classList: ['control__delete'],
              textContent: 'Удалить',
              addEventListener: {
                event: 'click',
                func: async (e) => {
                  e.target.classList.toggle('svg-control-loading', true)
                  clientDOM.style.pointerEvents = 'none';
                  console.log(client.id)
                  await deleteModal(client.id)
                  e.target.classList.toggle('svg-control-loading', false)
                  clientDOM.style.pointerEvents = 'initial';
                }
              }
            }),
          ]
        })
      ]
    })
    list.push(clientDOM)
  }
    listLoading(false)
    clientsList.append(...list)
  // console.log('updateListDOM', store.clients)
}