import store from "../store.js";
import updateListDOM from "./updateListDOM.js";
import clientForApi from "./clientForApi.js";
import sleep from "./sleep.js";
import constants from "../constants.js";

export default async function apiCreateClient() {
  const contactsDOM = document.getElementsByClassName('modal-contacts__contact')
  const contacts = []
  for (const contact of contactsDOM) {
    const type = contact.children[0].children[0].innerText
    const value = contact.children[1].value
    if (value.length <= 0) return  [{message: 'Не все контакты заполнены'}]
    contacts.push({type, value})
  }
  await sleep(constants.delay)
  const response = await fetch(constants.createClient, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(clientForApi(contacts))
  })
  const data = await response.json()
  console.log(data.errors)

  if (data.errors) return [...data.errors]
  store.addClientToStore(data)
}