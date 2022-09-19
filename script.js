
let playerTurns = document.querySelector('.turn')
let resetBtn = document.querySelector('.reset')
let scoreboard = document.querySelector('.scoreboard')
let boxes = document.querySelectorAll('.box')
let line = document.querySelector('#line')
let results =document.querySelector('.results')
let xhoverC = document.querySelector('.x-hover')
let ohoverC = document.querySelector('.o-hover')
let Startscreen = document.querySelector('.start-screen')
let board = document.querySelector('.board')
let playCom = document.querySelector('#playCOM')
let playP = document.querySelector('#playP')
let footer = document.querySelector('.footer')
let scoreX = 0
let scoreO = 0
let scoreDraw = 0
scoreboard.innerHTML = `X: ${scoreX}<br> Draw: ${scoreDraw}<br> O: ${scoreO}<br>`

//setting the players to their respective character 

const Player_X = 'X'
const Player_O = 'O'

let turn = Player_X

//boardstate will be used to understand which pieces are set on the board
playP.addEventListener('click', startPlayer)
playCom.addEventListener('click', startCOM)

function startPlayer(){
    
    playCom.style.display = 'none'
    playP.style.display = 'none'
    board.style.display = 'grid'
    footer.style.display = 'flex'
    Startscreen.style.display = 'none'

    const boardState = Array(boxes.length);
    boardState.fill(null)

    function hoverText() {
    //removes any hovers that should not be there
        boxes.forEach((box) => {
            box.classList.remove('x-hover')
            box.classList.remove('o-hover')
        })
    //checks to put either X or O on the hover text
        if (turn === Player_X){
            hoverClass = 'x-hover'
        } else if (turn === Player_O) {
            hoverClass = 'o-hover'
        } else {
            hoverClass = null
        }
    //if there is nothing in the box, hover should be on
        boxes.forEach((box) => {
            if (box.innerText == '') {
                box.classList.add(hoverClass)
            }
            
        })
    }
    hoverText()

    boxes.forEach(box =>box.addEventListener('click', boxClick))

    function boxClick(e) {
    //if a player has won not allowed to place an x or o
        if (results.style.opacity === '1'){
            return;
        }

    let box = e.target
    let boxNum = box.dataset.index
    //does not allow you to select a box that is already selected
        if (box.innerText != ""){
            return;
        }

        if (turn === Player_X){
            box.innerText = Player_X
            boardState[boxNum-1] = Player_X
            turn = Player_O
        } else {
            box.innerText = Player_O
            boardState[boxNum-1] = Player_O
            turn = Player_X
        }
        hoverText()
        checkWinner()
    }

    function checkWinner(){
        for (let winner of winningCombo){
            let combo = winner.combo
            let lineClass = winner.lineClass
    //-1 since boardstate array starts at 0
            let box1 = boardState[combo[0] -1]
            let box2 = boardState[combo[1] -1]
            let box3 = boardState[combo[2] -1]
            if (box1 != null && box1 === box2 && box1 === box3){
                line.classList.add(lineClass) //this will select the right line class (the strike through) to apply to each win condition
                turn = null
                hoverText()
                if (box1 === Player_X){
                    results.style.opacity = '1'
                    results.innerText = 'X Wins'
                    scoreX++
                    updateScore()
                    return;
                    
                } else if (box1 === Player_O){
                    results.style.opacity = '1'
                    results.innerText = 'O Wins'
                    scoreO++
                    updateScore()
                    return;
                    
                } 
            }
        }
        let boxesFilled = boardState.every((box) => box !== null)
        if (boxesFilled){
            turn=null
            results.style.opacity = '1'
            results.innerText = 'Draw'
            scoreDraw++
            updateScore()
        }
    }

    function resetBoard(){
        boardState.fill(null)
        boxes.forEach((box) => box.innerText = '')
        line.removeAttribute('class')
        turn = Player_X
        results.style.opacity = '0'
        hoverText()
    }

    resetBtn.addEventListener('click', resetBoard)


    function updateScore() {
        scoreboard.innerHTML = `X: ${scoreX}<br> Draw: ${scoreDraw}<br> O: ${scoreO}<br>`
    }
    //data set that checks all winning combos
    let winningCombo = [
        //rows
        {combo:[1,2,3], lineClass: 'line-row-1'},
        {combo:[4,5,6], lineClass: 'line-row-2' },
        {combo:[7,8,9], lineClass: 'line-row-3' },
        //columns    
        {combo:[1,4,7], lineClass: 'line-column-1'},
        {combo:[2,5,8], lineClass: 'line-column-2'},
        {combo:[3,6,9], lineClass: 'line-column-3'},
        //diagonal
        {combo:[1,5,9], lineClass: 'line-diagonal-1'},
        {combo:[3,5,7], lineClass: 'line-diagonal-2'},    
        ]
    }
let choices = [1, 2, 3, 4, 5, 6, 7, 8, 9]
function startCOM(){

    playCom.style.display = 'none'
    playP.style.display = 'none'
    board.style.display = 'grid'
    footer.style.display = 'flex'
    Startscreen.style.display = 'none'

    const boardState = Array(boxes.length);
    boardState.fill(null)
    function hoverText() {
        //removes any hovers that should not be there
            boxes.forEach((box) => {
                box.classList.remove('x-hover')
                box.classList.remove('o-hover')
            })
        //checks to put either X or O on the hover text
            if (turn === Player_X){
                hoverClass = 'x-hover'
            } else {
                hoverClass = null
            }
        //if there is nothing in the box, hover should be on
            boxes.forEach((box) => {
                if (box.innerText == '') {
                    box.classList.add(hoverClass)
                }
                
            })
        }
    hoverText()

    boxes.forEach(box =>box.addEventListener('click', boxClick))
    
    function boxClick(e) {
//if a player has won not allowed to place an x or o
        if (results.style.opacity === '1'){
            return;
        }
    let box = e.target
    let boxNum = box.dataset.index
        if (box.innerText != ""){
            return;
        }
    
        if (turn === Player_X){
            box.innerText = Player_X
            boardState[boxNum-1] = Player_X
            let num = Number(boxNum) //box num is not an integer we can use so we call number to create it into one
            let remove = choices.indexOf(num) //remove is the number of the box we selected (grabbing its index)
            choices.splice(remove, 1) //removing it from choices
            turn = Player_O
        }
        hoverText()
        checkWinner()
        if (turn === Player_O){
            computerTurn()  
        }
        
    }
    function randomNum(min,max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function computerTurn(){
        if (turn = Player_O){
            num = randomNum(0,choices.length-1) //selecting the computers choice from the choices array (this is the index not the number)
            let number = choices.at(num)  //creating it into an acutaly value
            choices.splice(num, 1) //remove it from the choices array (it cant select the same value twice)
            if (choices.length == 0){
            checkWinner()
        } else { //if the computer still has choices, run the code
            boxes[number-1].innerText = Player_O
            boardState[number-1] = Player_O
            turn = Player_X
            hoverText()
            checkWinner()
        }    
    }
        
        
        
    }
    function checkWinner(){
        for (let winner of winningCombo){
            let combo = winner.combo
            let lineClass = winner.lineClass
    //-1 since boardstate array starts at 0
            let box1 = boardState[combo[0] -1]
            let box2 = boardState[combo[1] -1]
            let box3 = boardState[combo[2] -1]
            if (box1 != null && box1 === box2 && box1 === box3){
                line.classList.add(lineClass)
                turn = null
                hoverText()
                if (box1 === Player_X){
                    results.style.opacity = '1'
                    results.innerText = 'X Wins'
                    scoreX++
                    turn = null
                    updateScore()
                    return;
                        
                } else if (box1 === Player_O){
                    results.style.opacity = '1'
                    results.innerText = 'O Wins'
                    scoreO++
                    turn = null
                    updateScore()
                    return;
                        
                } 
            }
        }
        let boxesFilled = boardState.every((box) => box !== null)
        if (boxesFilled){
            turn=null
            results.style.opacity = '1'
            results.innerText = 'Draw'
            scoreDraw++
            updateScore()
        }
    }
    
    function resetBoard(){
        boardState.fill(null)
        boxes.forEach((box) => box.innerText = '')
        line.removeAttribute('class')
        turn = Player_X
        results.style.opacity = '0'
        hoverText()
        choices = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
    
    resetBtn.addEventListener('click', resetBoard)
    
    
    function updateScore() {
        scoreboard.innerHTML = `X: ${scoreX}<br> Draw: ${scoreDraw}<br> O: ${scoreO}<br>`
    }
    //data set that checks all winning combos
    let winningCombo = [
        //rows
        {combo:[1,2,3], lineClass: 'line-row-1'},
        {combo:[4,5,6], lineClass: 'line-row-2' },
        {combo:[7,8,9], lineClass: 'line-row-3' },
        //columns    
        {combo:[1,4,7], lineClass: 'line-column-1'},
        {combo:[2,5,8], lineClass: 'line-column-2'},
        {combo:[3,6,9], lineClass: 'line-column-3'},
        //diagonal
        {combo:[1,5,9], lineClass: 'line-diagonal-1'},
        {combo:[3,5,7], lineClass: 'line-diagonal-2'},    
    ]
}





