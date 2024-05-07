const constants = {
  delay: 300,
  sortFields: ['sortId', 'sortFio', 'sortCreatedAt', 'sortUpdatedAt'],
  selectOptions: ['Телефон', 'Доп. телефон', 'Email', 'Vk', 'Facebook', 'Twitter'],
  getClients: 'http://localhost:3000/api/clients',
  deleteClient: 'http://localhost:3000/api/clients/',
  searchClients: 'http://localhost:3000/api/clients?search=',
  searchClient: 'http://localhost:3000/api/clients/',
  patchClient: 'http://localhost:3000/api/clients/',
  createClient: 'http://localhost:3000/api/clients',
}

export default constants;