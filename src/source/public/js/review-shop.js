const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// var replyForms = $$('.reply-form')
var submitBtns = $$('.submit-btn')
console.log(submitBtns)

// for (var btn of submitBtns){
//     btn.onclick = function(){
//         const idEvaluate = btn.getAttribute('data-id')
//         console.log(idEvaluate)
//         var formReply = $(`.reply-form[data-id="${idEvaluate}"]`)
//         console.log(formReply)
//         formReply.submit()
//     }
// }