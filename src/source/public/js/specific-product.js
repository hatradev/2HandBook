const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

var plusBtn = $('.plus-btn')
var minusBtn = $('.minus-btn')
var quantity = $('.quantity-number')

plusBtn.onclick = function(){
    quantity.innerText = Number(quantity.innerText) + 1
}

minusBtn.onclick = function(){
    var temp = Number(quantity.innerText) - 1
    temp = temp >= 0 ? temp : 0
    quantity.innerText = temp
}