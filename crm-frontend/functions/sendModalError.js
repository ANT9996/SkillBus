import createElement from "./createElement.js";

export default function sendModalError(errors) {
  const errorsContainer = document.querySelector('.modal__error-message')
  errorsContainer.innerHTML = ''
  errorsContainer.append(createElement('strong', {
    textContent: 'Ошибки:'
  }))
  if (typeof errors === 'string') {
    errorsContainer.append(createElement('div', {
      textContent: errors
    }))
    return
  }
  for (const error of errors) {
    let customMessage = null
    if (error.message === 'Client Not Found') {
      customMessage = 'Клиент не найден'
    }
    errorsContainer.append(createElement('div', {
      textContent: customMessage === null ? error.message : customMessage
    }))
  }

}