const slice0 = document.getElementById("slice0")
const slice1 = document.getElementById("slice1")
const slice2 = document.getElementById("slice2")
const slice3 = document.getElementById("slice3")
const slices = [slice0, slice1, slice2, slice3]

const buttonPlay = document.getElementById("button-play")
const scoreDisplay = document.getElementById("score-display")
const pieContainer = document.getElementById("pie-container")


function generateSequence (level) {
    // returns a random array of length level of slice elements 
    const sequence = []
    for (let i=0; i<level; i+=1) {
        const sliceID = Math.floor(Math.random() * 4);
        sequence.push(slices[sliceID]); 
    }
    return sequence
}

function sleep(msDelay) {
    // institute a delay of msDelay
    return new Promise( (resolve)=>{
        setTimeout(resolve, msDelay)
    })
}

async function flashSequence (sequence) {
    // flash slices with a given delay by adding and removing a CSS class
    for (const slice of sequence) {
        await sleep(1000)
        slice.classList.add("flash-slice")

        slice.addEventListener("animationend", ()=>{
            slice.classList.remove("flash-slice")
        })
        await sleep(100)
    }
}

let currentLevel = 1
let currentSequence = []
let currentScore = 0
function playRound() {
    // reset the score if the user want's to play again
    // this should've been it's own function cause we use it twice
    currentScore = 0
    scoreDisplay.textContent = String(currentScore)
    // after play button click generate a new sequence of slices and display it to the user
    currentSequence = generateSequence(currentLevel)
    console.log(currentSequence)
    flashSequence(currentSequence)
}

function checkPlayersSequence(event) {
    // record player's click on the slices and check if they match the current sequence
    // increment score if they do and end round if there's a mismatch
    if (slices.includes(event.target)) {
        // only act on presses on the actual pie slices (it'd have been better to deactivate the play button)
        if (currentSequence.length > 0) {
            // while there're still slices in the currentSequence list grab the 0th element and compare it
            // to the user's click target
            const answer = currentSequence.shift()
            console.log(answer)
            if (event.target === answer) {
                // if the user's click target matches the current slice add score
                currentScore +=1
                scoreDisplay.textContent = String(currentScore)
            }
            else {
                // if the click target doesn't match the current slice end the game
                console.log(`you lose`)
                scoreDisplay.textContent = "💀"
                return
            }
        }

    if (currentSequence.length === 0) {
        // if there're no more slices in the current array go to the next round
        currentLevel +=1
        playRound()
        return
    }
    }
}

buttonPlay.addEventListener("click", playRound)
pieContainer.addEventListener("click", checkPlayersSequence)