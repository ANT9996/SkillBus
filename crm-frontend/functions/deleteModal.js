import createElement from "./createElement.js";
import store from "../store.js";
import sendModalError from "./sendModalError.js";

const modalContainer = document.getElementById('modalContainer');

const deleteModal = (id) => new Promise((resolve) => {
  modalContainer.classList.toggle('d-none', false)
  modalContainer.innerHTML = ''
  const modal = createElement('div', {
    classList: ['modal'],
    id: 'modal',
    append: [
      createElement('div', {
        classList: ['modal__status', 'd-none']
      }),
      createElement('div', {
        classList: ['modal__head', 'justify-center'],
        append: [
          createElement('h3', {
            classList: ['modal__title'],
            textContent: 'Удалить клиента',
          })
        ]
      }),
      createElement('form', {
        id: 'modal-form',
        action: '#',
        addEventListener: {
          event: 'submit',
          func: async (e) => {
            e.preventDefault()
            document.querySelector('.modal__status').classList.toggle('d-none', false)
            modal.style.pointerEvents = 'none';
            const response = await store.deleteClient(id)
            if (!response) {
              resolve()
              modal.remove()
              modalContainer.classList.toggle('d-none', true)
            } else {
              document.querySelector('.modal__status').classList.toggle('d-none', true)
              modal.style.pointerEvents = 'initial';
              sendModalError([{message: response}])
            }
          }
        },
        append: [
          createElement('div', {
            classList: ['modal__control'],
            append: [
              createElement('p', {
                classList: ['modal__message'],
                textContent: 'Вы действительно хотите удалить данного клиента?'
              }),
              createElement('p', {classList: ['modal__error-message']}),
              createElement('button', {
                classList: ['modal__save'],
                id: 'modal-save-button',
                textContent: 'Удалить',
                type: 'submit',
              }),
              createElement('div', {
                classList: ['modal__delete-cancel'],
                textContent: 'Отмена',
                addEventListener: {
                  event: 'click',
                  func: () => {
                    resolve()
                    modal.remove()
                    modalContainer.classList.toggle('d-none', true)
                  }
                }
              })
            ]
          })
        ]
      }),
    ]
  })
  console.log('delete', modal);
  modalContainer.append(modal)
})

export default deleteModal;