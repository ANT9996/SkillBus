export default function createFio({name, surname, lastName}, type = 'fio') {
  switch (type) {
    case "fio":
      return `${surname} ${name} ${lastName}`
    case "fi":
      return `${surname} ${name}`
    default:
      return `${surname} ${name} ${lastName}`
  }
}