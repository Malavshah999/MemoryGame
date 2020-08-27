const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false ;
/*
As u click on multiple cards the program get hanged like 
if u click on 4 cards then first two cards will remain open only 
so to prevent that we created lockBoard 
*/
let lockBoard = false ;
let firstcard, secondcard ;
function flipCard() {
    if (lockBoard) return;
    /*
    Now if u double click on a single card it gets stick i.e it wont return to normaal and wont function correctly 
    so we create if this firstcard return ...
    */
    if (this === firstcard) return ;
    this.classList.add('flip');

    if (!hasFlippedCard){
        /*first click */
        hasFlippedCard =true ;
        firstcard= this;
        return ;
    }
        secondcard = this ;
        checkForMatch();
    
}

function checkForMatch(){
    /* instead of if-else u can also use ternary operator ! It has 3 blocks in first we place our condition 
    in second we place statement to be executed if condition is true and third one if condition is false .
 
    so instead of ifelse block u can write the following code 
*/
    let isMatch = firstcard.dataset.framework == secondcard.dataset.framework ;
    isMatch ? disableCards():unflipCards();

    /*
    if (firstcard.dataset.framewwork === secondcard.dataset.framework) {
        disableCards();
    } else {
        unflipCards();
    }*/

} 
function disableCards(){
    firstcard.removeEventListener('click',flipCard);
    secondcard.removeEventListener('click',flipCard);
    resetBoard();
}
function unflipCards(){
    lockBoard = true ;

        setTimeout(() => {
        firstcard.classList.remove('flip');
        secondcard.classList.remove('flip');
        
        resetBoard();    
    }, 1400);
    
}
/*
Once the board is done u need to reset it so the function ResetBoard is created .... 
*/
function resetBoard(){
    [hasFlippedCard, lockBoard] = [false,false];
    [firstcard , secondcard] =[null,null]
}

/*
Now to shuffle the board u need to do the following ...
*/

(function shuffle(){
    cards.forEach(card => {
        /*
        Math.random function is used to get any random number betwn 0-1 
        we need 12 numbers so we multiply by 12 eg. 0.14656 *12 = 1.75872 but 
        we need in positive so we use Math.floor so we get round figure   
        */
        let randomPos = Math.floor(Math.random() *12);
        card.style.order = randomPos ; /* it is the order property */
    });
})();
/* we need shuffle function to work before the game so we need to put the round brackets 
i.e called as IIFE Immediately invoked function expression means it is invoked before any function */ 
cards.forEach(card => card.addEventListener('click',flipCard));