import createFio from "./functions/createFio.js";
import store from "./store.js";

const sort = {
  // id | fio | createdAt | updatedAt
  field: 'id',
  // desc === true | asc === false
  order: true,
  lastClickedField: 'id',
  setSort: function (field = 'id', {fieldDOM, arrowDOM}) {
    if (field === this.lastClickedField) {
      this.order = !this.order
    } else {
      this.lastClickedField = field
      this.field = field
      this.order = true
    }
    for (const fieldElement of document.getElementsByClassName('sort__field-active')) {
      fieldElement.classList.toggle('sort__field-active', false)
    }
    for (const arrow of document.getElementsByClassName('svg-sort-arrow')) {
      arrow.classList.toggle('sort-desc', true)
    }
    fieldDOM?.classList.toggle('sort__field-active', this.field === field)
    arrowDOM?.classList.toggle('sort-desc', !this.order)
  },
  sortClientList: function () {
    switch (this.field) {
      case "id":
        return this.reverse(store.clients.sort( (a, b) => {
          if (+a.id > +b.id) return 1
          else return -1
        }))
      case "fio":
        return this.reverse(store.clients.sort( (a, b) => {
          if (createFio(a) > createFio(b)) return 1
          else return -1
        }))
      case "createdAt":
        return this.reverse(store.clients.sort( (a, b) => {
          // console.log(new Date(a.createdAt).getTime(), new Date(b.createdAt).getTime())
          if (new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()) return 1
          else return -1
        }))
      case "updatedAt":
        return this.reverse(store.clients.sort( (a, b) => {
          // console.log(new Date(a.updatedAt).getTime(), new Date(b.updatedAt).getTime())
          if (new Date(a.updatedAt).getTime() > new Date(b.updatedAt).getTime()) return 1
          else return -1
        }))
      default:
        return store.clients
    }
  },
  reverse: function(array = []) {
    if (this.order) {
      return array
    } else {
      return array.reverse()
    }
  },
}

export default sort