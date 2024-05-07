import createElement from "./createElement.js";
import addContactField from "./addContactField.js";
import apiCreateClient from "./apiCreateClient.js";
import apiUpdateClient from "./apiUpdateClient.js";
import deleteModal from "./deleteModal.js";
import store from "../store.js";
import sendModalError from "./sendModalError.js";
import sleep from "./sleep.js";
import constants from "../constants.js";

const modalContainer = document.getElementById('modalContainer');
// type = 'create' | 'edit'
const createModal = async (type = 'create', id) => new Promise(async (resolve) => {
  let clientData = null
  modalContainer.classList.toggle('d-none', false)
  modalContainer.innerHTML = ''
  if (type === 'edit' && id) {
    clientData = await store.searchClient(id)
    window.history.replaceState(null, null, "?client=" + id);
  }
  const modal = createElement('div', {
    classList: ['modal'],
    id: 'modal',
    append: [...(() => {
      const modalClose = createElement('div', {
        classList: ['modal__close'],
        addEventListener: {
          event: 'click',
          func: () => {
            modal.remove();
            resolve()
            window.history.replaceState(null, null, "?")
            modalContainer.classList.toggle('d-none', true);
          }
        }
      })
      const modalStatus = createElement('div', {
        classList: ['modal__status', 'd-none']
      })
      const modalHead = createElement('div', {
        classList: ['modal__head'],
        append: [...(() => {
          const title = createElement('h3', {
            classList: ['modal__title'],
            textContent: type === 'edit' ? 'Изменить данные' : 'Новый клиент',
          })
          if (clientData && type === 'edit') {
            const idSpan = createElement('span', {
              classList: ['modal__client-id'],
              textContent: `ID: ${clientData.id || 0}`
            });
            return [title, idSpan]
          }
          return [title]
        })()]
      })
      const form = createElement('form', {
        id: 'modal-form',
        method: 'post',
        append: [...(() => {
          const modalInputs = createElement('div', {
            classList: ['modal__inputs'],
            append: [
              // поле 'Фамилия'
              createElement('label', {
                classList: ['modal__label'],
                for: 'surname',
                append: [
                  createElement('span', {
                    classList: ['modal__label-text'],
                    innerHTML: 'Фамилия<span>*</span>'
                  }),
                  createElement('input', {
                    classList: ['modal__input'],
                    id: 'surname',
                    required: true,
                    value: type === 'edit' && clientData.surname ? clientData.surname : '',
                  })
                ]
              }),
              // поле 'Имя'
              createElement('label', {
                classList: ['modal__label'],
                for: 'name',
                append: [
                  createElement('span', {
                    classList: ['modal__label-text'],
                    innerHTML: 'Имя<span>*</span>'
                  }),
                  createElement('input', {
                    classList: ['modal__input'],
                    id: 'name',
                    required: true,
                    value: type === 'edit' && clientData.name ? clientData.name : '',
                  })
                ]
              }),
              // поле 'Отчество'
              createElement('label', {
                classList: ['modal__label'],
                for: 'lastname',
                append: [
                  createElement('span', {
                    classList: ['modal__label-text'],
                    textContent: 'Отчество'
                  }),
                  createElement('input', {
                    classList: ['modal__input'],
                    id: 'lastname',
                    value: type === 'edit' && clientData.lastName ? clientData.lastName : ''
                  })
                ]
              })
            ]
          })
          // Максимальное кол-во контактов
          const maxContacts = 10
          const modalContacts = createElement('ul', {
            classList: ['modal__contacts', 'modal-contacts'],
            id: 'contactList',
            append: [
              ...(() => {
                const contacts = []
                const addField = createElement('li', {
                  classList: ['modal-contacts__add'],
                  innerHTML: '<div class="svg-add-contact"></div>' + 'Добавить контакт',
                  addEventListener: {
                    event: 'click',
                    func: () => {
                      if (modalContacts.querySelectorAll('.modal-contacts__contact').length < maxContacts)
                        modalContacts.append(addContactField())
                    }
                  }
                })
                if (type === 'edit' && clientData) {

                  for (const contact of clientData.contacts) {
                    if (clientData.contacts.length < maxContacts)
                      contacts.push(addContactField(contact))
                  }
                  return [...contacts, addField]
                }
                return [addField]
              })(),

            ]
          })

          const modalControl = createElement('div', {
            classList: ['modal__control'],
            append: [
              createElement('div', {classList: ['modal__error-message']}),
              createElement('button', {
                type: 'submit',
                classList: ['modal__save'],
                id: 'modal-save-button',
                textContent: 'Сохранить',
              }),
              createElement('div', {
                classList: ['modal__delete-cancel'],
                textContent: type === 'edit' && clientData ? 'Удалить клиента' : 'Отмена',
                addEventListener: {
                  event: 'click',
                  func: async () => {
                    if (type === 'edit' && clientData) {
                      deleteModal(clientData.id)
                        .finally(() => {
                          modal.remove()
                          resolve()
                          window.history.replaceState(null, null, "?")
                          modalContainer.classList.toggle('d-none', true)
                        })
                    } else {
                      modal.remove()
                      resolve()
                      window.history.replaceState(null, null, "?")
                      modalContainer.classList.toggle('d-none', true)
                    }
                  }
                }
              })
            ]
          });
          return [modalInputs, modalContacts, modalControl]
        })()],
        addEventListener: {
          event: 'submit',
          func: async (e) => {
            e.preventDefault()
            modal.style.pointerEvents = 'none';
            modalStatus.classList.toggle('d-none', false)
            if (type === 'edit' && clientData) {
              await sleep(constants.delay)
              const errors = await apiUpdateClient(clientData)
              if (errors === undefined) {
                resolve();
                window.history.replaceState(null, null, "?")
                modal.remove();
                modalContainer.classList.toggle('d-none', true);
              } else {
                modal.style.pointerEvents = 'initial';
                modalStatus.classList.toggle('d-none', true)
                console.log(errors)
                sendModalError(errors)
              }
            } else {
              const errors = await apiCreateClient()
              if (errors === undefined) {
                resolve();
                window.history.replaceState(null, null, "?")
                modal.remove();
                modalContainer.classList.toggle('d-none', true);
              } else {
                console.log(errors)
                modal.style.pointerEvents = 'initial';
                modalStatus.classList.toggle('d-none', true)
                sendModalError(errors)
              }
            }
          }
        }
      })
      return [modalClose, modalStatus, modalHead, form]
    })()]
  })
  // console.log('create', modal);
  modalContainer.append(modal)
})

export default createModal;