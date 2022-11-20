var sentence = document.querySelector("input")
const button = document.querySelector("btn")


function long(sentence){
    let words = sentence.split(" ")
    console.log(sentence)
    longestWord = "" 
    for(let word of words){
        if(word.length>longestWord.length){
            longestWord = word
        }
    }
    return longestWord;
    
}
console.log(long(sentence))