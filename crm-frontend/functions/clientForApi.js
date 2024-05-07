export default function clientForApi(contacts) {
  const surname = document.getElementById('surname')
  const name = document.getElementById('name')
  const lastName = document.getElementById('lastname')

  // surname.value.length <= 0 ? surname.classList.toggle('error-color', true) : surname.classList.toggle('error-color', false)
  // name.value.length <= 0 ? name.classList.toggle('error-color', true) : name.classList.toggle('error-color', false)
  // lastName.value.length <= 0 ? lastName.classList.toggle('error-color', true) : lastName.classList.toggle('error-color', false)

  let client = {
    surname: surname.value,
    name: name.value,
    lastName: lastName.value,
  }
  if (contacts) client.contacts = contacts
  console.log(contacts)
  return client
}