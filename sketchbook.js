// This array holds the words we are going to choose from.
// Feel free to add new words!
var words = ['cat', 'tree', 'swing', 'around', 'scientist'];

// This function will pick our word
function chooseWord () {
    console.log(words + " Hmmmm")
    // Write code here
    function randword (){
        let i = words[Math.floor(Math.random() * words.length)]
        console.log(i);
        return i;
        }
}