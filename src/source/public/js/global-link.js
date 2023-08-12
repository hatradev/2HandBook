function globalLink(event,href){
    event.preventDefault()
    let currentDomain = window.location.origin;
    console.log(currentDomain)
    console.log(href)
    window.location.href = currentDomain + href
}