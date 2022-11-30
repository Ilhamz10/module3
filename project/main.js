const convertFrom = document.querySelectorAll('.convert-from div label')
const convertTo = document.querySelectorAll('.convert-to div label')
const to = document.querySelector('#to')
const from = document.querySelector('#from')

let mousedown = true

from.addEventListener('click', () => {
    mousedown = true
})

to.addEventListener('click', () => {
    mousedown = false
})

let base = 'RUB'
let symbols = 'USD'
const getBreweryData = async () => {
    
    const response = await fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`);
    const data = await response.json();
    
    if(mousedown)
        to.value = (from.value * data.rates[symbols]).toFixed(3)
    if(!mousedown)
        from.value = (to.value / data.rates[symbols]).toFixed(3)
  }
convertFrom.forEach(item => {
    item.addEventListener('click', (e) => {
        base = e.target.innerText
        getBreweryData()
    })
})

convertTo.forEach(item => {
    item.addEventListener('click', (e) => {
        symbols = e.target.innerText
        getBreweryData()
    })
})

from.addEventListener('input', getBreweryData)
to.addEventListener('input', getBreweryData)