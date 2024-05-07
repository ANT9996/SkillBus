export default function createOutputDate(client) {
  const createdDate = new Date(client.createdAt)
  const createdDateOut = `${createdDate.getDate()}.${+createdDate.getMonth() > 9 ? createdDate.getMonth() : '0' + createdDate.getMonth()}.${createdDate.getFullYear()} `
  const createdTime = ` ${createdDate.getHours() > 9 ? createdDate.getHours() : '0' + createdDate.getHours()}:${createdDate.getMinutes() > 9 ? createdDate.getMinutes() : '0' + createdDate.getMinutes()}`

  const updatedDate = new Date(client.updatedAt)
  const updatedDateOut = `${updatedDate.getDate()}.${+updatedDate.getMonth() > 9 ? updatedDate.getMonth() : '0' + updatedDate.getMonth()}.${updatedDate.getFullYear()} `
  const updatedTime = ` ${updatedDate.getHours() > 9 ? updatedDate.getHours() : '0' + updatedDate.getHours()}:${updatedDate.getMinutes() > 9 ? updatedDate.getMinutes() : '0' + updatedDate.getMinutes()}`

  return {createdDateOut, updatedDateOut, createdDate, updatedDate, createdTime, updatedTime}
}