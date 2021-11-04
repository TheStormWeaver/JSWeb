document.querySelector(".cube-list").addEventListener("click", (evt) => {
  const target = evt.target
  if(target.classList.contains("more")) {
    const desc = target.parentNode.querySelector(".cube-description")
    if(desc.style.display == "block"){
      desc.style.display = "none"
    }else{
      desc.style.display = "block"
    }
  }
})