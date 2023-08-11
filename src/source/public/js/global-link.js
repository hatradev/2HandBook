function globalLink(href){
    var currentDomain = window.location.origin;
    window.location.href = currentDomain + '/' + href
}