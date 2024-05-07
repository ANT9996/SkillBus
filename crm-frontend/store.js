import updateListDOM from "./functions/updateListDOM.js";
import sleep from "./functions/sleep.js";
import constants from "./constants.js";

const store = {
  clients: [],
  addClientToStore: function(client) {
    this.clients = [...store.clients, client]
    updateListDOM()
  },
  getClients: async function () {
    await sleep(constants.delay)
    await fetch(constants.getClients)
      .then(async r => {
        const data = await r.json();
        this.clients = [...data];
      })
      .catch(e => console.log(e))
    updateListDOM()
  },
  deleteClient: async function(id) {
    await sleep(constants.delay)
    const response = await fetch(constants.deleteClient+id, {method: 'delete'});
    const data = await response.json();

    if (data.message) return data.message;

    this.clients = this.clients.filter((el) => el.id !== id)
    updateListDOM()
  },
  updateClient: function (data) {
    const client = this.clients.find(el => el.id === data.id);
    if (client) {
      client.contacts = data.contacts;
      client.createdAt = data.createdAt;
      client.id = data.id;
      client.lastName = data.lastName;
      client.name = data.name;
      client.surname = data.surname;
      client.updatedAt = data.updatedAt;
    }
    updateListDOM();
  },
  searchClients: async function (searchValue) {
    await sleep(constants.delay)
    const response = await fetch(constants.searchClients+searchValue)
    return await response.json()
  },
  searchClient: async function (id) {
    await sleep(constants.delay)
    const response = await fetch(constants.searchClient+id, {method: 'get'})
    const data = await response.json()
    if (data.errors === undefined)
      return data
    else
      return {errors: data.errors}
  }
};

export default store;