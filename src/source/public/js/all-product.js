const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function linkSort(event, href){
    var href_arr = href.split('?')
    // var tagA = $(`${classtagA}`)
    var currentLink = window.location.href
    var currentDomain = window.location.origin;
    // var hrefTagA = classtagA.href
    // window.location.href = currentDomain + '/' + href
    if (currentLink.includes('search') || currentLink.includes('category')){
        window.location.href = currentLink + '&' + href_arr[1]
        // console.log(currentLink + '&' + href_arr[1])
    }else{
        window.location.href = currentDomain + '/' + href
        // console.log(currentDomain + '/' + href)
    }
    console.log(currentLink)
    console.log(currentDomain)
    console.log(href)
    
    // event.preventDefault()
}