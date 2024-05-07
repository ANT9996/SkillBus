import store from "../store.js";
import clientForApi from "./clientForApi.js";
import sleep from "./sleep.js";
import constants from "../constants.js";

export default async function apiUpdateClient(client) {
  const contactsDOM = document.getElementsByClassName('modal-contacts__contact')
  const contacts = []
  for (const contact of contactsDOM) {
    contacts.push({
      type: contact.children[0].children[0].innerText,
      value: contact.children[1].value
    })
  }
  await sleep(constants.delay)
  const response = await fetch(constants.patchClient+client.id, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(clientForApi(contacts))
  })

  const data = await response.json()
  console.log(data)
  if (data.errors) return [...data.errors]
  store.updateClient(data)
}