import './style.css'

let data = []

const diagram = document.querySelector('.diagram')
const button = document.querySelector('.btn')
const iconButton = document.querySelector('img')

const getData = async () => {

  const colors = ['#7858d7', '#ea643f', '#5baa73', '#f4a965']

  const url = import.meta.env.VITE_DATA_URL

  const res = await fetch(url)
  const text = await res.text()
  data = text.split("\n").filter(el => el).map(el => {
    const newArr = el.split(' ')
    return {name: newArr[0], num: newArr[1]}
  }).sort((a, b) => b.num - a.num)

  diagram.innerHTML = data.map((el, i) => {

      const width = Math.floor(el.num * 10)

      return `<div class="scheduleContainer"><div class="num">${Math.floor(el.num)}</div>
<div id="schedule" class="schedule" style="height: ${width}px; background-color: ${colors[i]}"></div>
<span class="name">${el.name}</span></div>`
    }
  ).join('')

}

getData()

let timer = setInterval(getData, 5000)

button.addEventListener('click', () => {

  if (timer) {
    timer = clearInterval(timer) as number
    iconButton.setAttribute('src', 'src/img/play-svgrepo-com.svg')
  } else {
    getData()
    timer = setInterval(getData, 5000)
    iconButton.setAttribute('src', 'src/img/pause-svgrepo-com.svg')
  }

})

