let sentence = prompt('Enter a sentence into the palindrome checker:')
function checkPalindrome(sentence){
    sentence = sentence.toLowerCase();
    let first = sentence.split(' ').join('')
    let second = first.split('').reverse().join('')
    console.log(first)
    console.log(second)
    if (first == second){
        console.log('this is a palindrome');
    }else{
        console.log('this is not a palindrome')
    }
    
    return sentence;
}
console.log(checkPalindrome(sentence))