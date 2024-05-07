import createElement from "./createElement.js";

export default function listLoading(isLoading) {
  /*<ul id="clientsList" class="clients__list list">*/
  if (isLoading) {
    document.getElementById('clientsList').innerHTML = ''
    document.getElementById('clientsList').classList.toggle('loading-container', true)
    document.getElementById('clientsList').append(createElement('li', {classList: ['loading', 'svg-loading']}))
  } else {
    document.getElementById('clientsList').classList.toggle('loading-container', false)
    document.getElementById('clientsList').innerHTML = ''
  }
}