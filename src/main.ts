import './style.css'
import pause from './img/pause-svgrepo-com.svg'
import play from './img/play-svgrepo-com.svg'

let data: Array<DataType> = []

const button = document.querySelector('.btn')
const iconButton = document.querySelector('img')
const numsAndColumnsContainer = document.querySelector('.schedule__nums-columns')
const namesContainer = document.querySelector('.schedule__names')

const fetchData = async () => {

  const url = import.meta.env.VITE_DATA_URL

  const res = await fetch(url)
  const text = await res.text()

  data = text
    .split("\n")
    .filter(el => el)
    .map(el => {

      const newArr = el.split(' ')

      return {name: newArr[0], num: newArr[1]}

    }).sort((a, b) => +b.num - +a.num)

}

const outputData = async () => {

  const colors = ['#7858d7', '#ea643f', '#5baa73', '#f4a965']

  try {

    await fetchData()

    numsAndColumnsContainer!.innerHTML = data.map((el, i) => {

        const width = Math.floor(+el.num) * 10

        return `<div><div class="num">${Math.floor(+el.num)}</div>
              <div class="column" style="height: ${!el.num ? el.num : width}px; background-color: ${colors[i]}"></div></div>`
      }
    ).join('')

    namesContainer!.innerHTML = data.map((el) => `<span class="name">${el.name}</span>`).join('')

  } catch (e) {
    console.log(e)
  }

}

outputData()

let timer = window.setInterval(outputData, 5000)

button!.addEventListener('click', () => {

  if (timer) {
    clearInterval(timer)
    timer = 0
    iconButton!.setAttribute('src', play)
  } else {
    outputData()
    timer = window.setInterval(outputData, 5000)
    iconButton!.setAttribute('src', pause)
  }

})

//types
type DataType = {
  name: string
  num: string
}

