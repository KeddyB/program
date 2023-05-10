button = document.querySelector("button")
text = document.querySelector("textarea")
button.addEventListener("click", ()=>{
   let code = new SpeechSynthesisUtterance(text.value)
   speechSynthesis.speak(code)
})