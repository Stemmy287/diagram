import './style.css'

let data = []

const diagram = document.querySelector('.diagram')

const getData = async () => {
  const res = await fetch('http://tt.centr-to.ru/frontend-2023.txt')
  const text = await res.text()
  data = text.split("\n").filter(el => el).map(el => {
    const newArr = el.split(' ')
    return {name: newArr[0], num: newArr[1]}
  }).sort((a,b) => b.num - a.num)

  diagram.innerHTML = data.map(el => {

    const width = Math.floor(el.num  * 10)

      return `<div class="scheduleContainer"><div class="num">${Math.floor(el.num)}</div>
<div id="schedule" class="schedule" style="height: ${width}px"></div>
<span class="name">${el.name}</span></div> `
    }
  ).join('')

}

getData()

setInterval(getData, 5000)

