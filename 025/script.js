portfolio1.onclick = function() {
    portfolioBar.className = 'bar state-1'
}
portfolio2.onclick = function() {
    portfolioBar.className = 'bar state-2'
}
portfolio3.onclick = function() {
    portfolioBar.className = 'bar state-3'
}

window.onscroll = function(e){
    window.scrollY > 25 ? topNavBar.classList.add("sticky") : topNavBar.classList.remove("sticky");
}