import createElement from "./createElement.js";
import constants from "../constants.js";

export default function addContactField(data) {
  let phone = false
  for (const span of document.querySelectorAll('.modal-contacts__span')) {
    if (span.innerHTML === 'Телефон') {
      phone = true
      break;
    }
  }
  const contact = createElement('li', {classList: ['modal-contacts__contact'],})
  contact.append(...(() => {

    const options = createElement('div', {
      classList: ['modal-contacts__optgroup'],
    })

    const select = createElement('div', {
      classList: ['modal-contacts__select'],
      append: [createElement('span', {
        classList: ['modal-contacts__span'],
        textContent: data ? data.type : phone ? 'Доп. телефон': 'Телефон',
      })],
      addEventListeners: [
        {
          event: 'click',
          func: (e) => {
            console.log('клик')
            focusSelect(e)
          }
        },
        {
          event: 'blur',
          func: () => {
            open = false
          }
        }
      ]
    });

    document.addEventListener('click', (e) => {
      if (e.target !== select) {
        select.classList.toggle('selected', false)
        options.style.display = 'none'
        open = false
      }
    })

    let open = false;
    function focusSelect(e) {
      if (open) {
        e.target.classList.toggle('selected', !open)
        options.style.display = 'none'
        open = !open
      } else {
        e.target.classList.toggle('selected', !open)
        options.style.display = 'flex'
        open = !open
      }
    }

    for (const item of constants.selectOptions) {
      if (phone === true && item === 'Телефон') continue
      options.append(createElement('div', {
        classList: ['modal-contacts__option'],
        value: item,
        textContent: item,
        addEventListener: {
          event: 'click',
          func: (e) => {
            options.style.display = 'none'
            options.blur()
            select.querySelector('span').innerText = e.target.innerText
          }
        }
      }))
    }
    select.append(options)

    const input = createElement('input', {
      classList: ['modal-contacts__input'],
      type: 'text',
      placeholder: 'Введите данные контакта',
      value: data?.value ? data.value : '',
      addEventListener: {
        event: 'input',
        func: (e) => {
          if (e.target.value.length <= 0) e.target.classList.toggle('error-color', true)
          else e.target.classList.toggle('error-color', false)
        }
      }
    })

    const button = createElement('button', {
      classList: ['modal-contacts__clear'],
      addEventListener: {
        event: 'click',
        func: (e) => {
          e.preventDefault()
          console.log('click');
          contact.remove()
        }
      }
    })
    button.append(createElement('div', {classList: ['svg-contact-clear']}))
    return [select, input, button]
  })())
  return contact
}