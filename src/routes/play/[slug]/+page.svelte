<script>
    import { onMount } from 'svelte';
    import {page} from '$app/stores';
    const slug = $page.params.slug;
    import io from 'socket.io-client';
    const socket = io('http://localhost:3000');

    let gameStarted = false;
    let myTurn = false;

    let cells = [
  { id: "cell-1", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-2", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-3", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-4", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-5", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-6", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-7", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-8", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-9", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-10", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-11", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-12", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-13", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-14", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-15", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-16", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-17", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-18", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-19", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-20", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-21", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-22", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-23", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-24", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-25", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-26", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-27", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-28", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-29", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-30", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-31", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-32", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-33", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-34", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-35", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-36", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-37", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-38", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id:"cell-39", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-40", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-41", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-42", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-43", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-44", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-45", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-46", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-47", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-48", inPlay: false, cellBelowInPlay: false, belongsTo: null },
  { id: "cell-49", inPlay: false, cellBelowInPlay: false, belongsTo: null }
];


const winningPatterns = [
  // Horizontal wins
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6],
  [7, 8, 9, 10],
  [8, 9, 10, 11],
  [9, 10, 11, 12],
  [10, 11, 12, 13],
  [14, 15, 16, 17],
  [15, 16, 17, 18],
  [16, 17, 18, 19],
  [17, 18, 19, 20],
  [21, 22, 23, 24],
  [22, 23, 24, 25],
  [23, 24, 25, 26],
  [24, 25, 26, 27],
  [28, 29, 30, 31],
  [29, 30, 31, 32],
  [30, 31, 32, 33],
  [31, 32, 33, 34],
  [35, 36, 37, 38],
  [36, 37, 38, 39],
  [37, 38, 39, 40],
  [38, 39, 40, 41],
  [42, 43, 44, 45],
  [43, 44, 45, 46],
  [44, 45, 46, 47],
  [45, 46, 47, 48],
  [49, 50, 51, 52],
  [50, 51, 52, 53],
  [51, 52, 53, 54],
  [52, 53, 54, 55],
  [56, 57, 58, 59],
  [57, 58, 59, 60],
  [58, 59, 60, 61],
  [59, 60, 61, 62],

  // Vertical wins
  [0, 7, 14, 21],
  [1, 8, 15, 22],
  [2, 9, 16, 23],
  [3, 10, 17, 24],
  [4, 11, 18, 25],
  [5, 12, 19, 26],
  [6, 13, 20, 27],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 16, 23, 30],
  [10, 17, 24, 31],
  [11, 18, 25, 32],
  [12, 19, 26, 33],
  [13, 20, 27, 34],
  [14, 21, 28, 35],
  [15, 22, 29, 36],
  [16, 23, 30, 37],
  [17, 24, 31, 38],
  [18, 25, 32, 39],
  [19, 26, 33, 40],
  [20, 27, 34, 41],
  [21, 28, 35, 42],
  [22, 29, 36, 43],
  [23, 30, 37, 44],
  [24, 31, 38, 45],
  [25, 32, 39, 46],
  [26, 33, 40, 47],
  [27, 34, 41, 48],
  [28, 35, 42, 49],
  [29, 36, 43, 50],
  [30, 37, 44, 51],
  [31, 38, 45, 52],
  [32, 39, 46, 53],
  [33, 40, 47, 54],
  [34, 41, 48, 55],
  [35, 42, 49, 56],
  [36, 43, 50, 57],
  [37, 44, 51, 58],
  [38, 45, 52, 59],
  [39, 46, 53, 60],
  [40, 47, 54, 61],
  [41, 48, 55, 62],

  // Diagonal wins (top-left to bottom-right)
  [0, 8, 16, 24],
  [1, 9, 17, 25],
  [2, 10, 18, 26],
  [3, 11, 19, 27],
  [7, 15, 23, 31],
  [8, 16, 24, 32],
  [9, 17, 25, 33],
  [10, 18, 26, 34],
  [14, 22, 30, 38],
  [15, 23, 31, 39],
  [16, 24, 32, 40],
  [17, 25, 33, 41],
  [8, 16, 24, 32, 40],
  [9, 17, 25, 33, 41],
  [10, 18, 26, 34, 42],
  [15, 23, 31, 39, 47],
  [16, 24, 32, 40, 48],
  [17, 25, 33, 41, 49],
  [24, 32, 40, 48],
  [25, 33, 41, 49],
  [26, 34, 42, 50],

  // Diagonal wins (top-right to bottom-left)
  [3, 9, 15, 21],
  [4, 10, 16, 22],
  [5, 11, 17, 23],
  [6, 12, 18, 24],
  [10, 16, 22, 28],
  [11, 17, 23, 29],
  [12, 18, 24, 30],
  [13, 19, 25, 31],
  [17, 23, 29, 35],
  [18, 24, 30, 36],
  [19, 25, 31, 37],
  [20, 26, 32, 38],
  [11, 17, 23, 29, 35],
  [12, 18, 24, 30, 36],
  [13, 19, 25, 31, 37],
  [18, 24, 30, 36, 42],
  [19, 25, 31, 37, 43],
  [24, 30, 36, 42],
  [25, 31, 37, 43],
  [26, 32, 38, 44],
  [31, 37, 43, 49],
  [32, 38, 44, 50],
  [37, 43, 49, 55],
  [38, 44, 50, 56],
  [43, 49, 55, 61],
  [44, 50, 56, 62],
];

// Function to check for a win
function checkForWin(player) {
  for (const pattern of winningPatterns) {
    const [a, b, c, d] = pattern;

    if(cells[a], cells[b], cells[c], cells[d]){
        if (
        cells[a].belongsTo === 'You' &&
        cells[b].belongsTo === 'You' &&
        cells[c].belongsTo === 'You' &&
        cells[d].belongsTo === 'You'
        ) {
        console.log(`You win!`);
        return true;
        }

        if (
            cells[a].belongsTo === 'Other Player' &&
            cells[b].belongsTo === 'Other Player' &&
            cells[c].belongsTo === 'Other Player' &&
            cells[d].belongsTo === 'Other Player'
        ) {
            console.log(`Other Player wins!`);
            return true;
        }
    }
  }
  return false;
}
    //when user creates new game, modal pops up with a link and game code to share with other player and modal stays up until another person joins Waiting for other player...

    onMount(() => {
        socket.emit('join-game', slug);
    });


    socket.on('move', (cellNum) => {
        cells[cellNum].inPlay = true;
        cells[cellNum].belongsTo = 'Other Player';
    })

    socket.on('your-turn', () => {
        myTurn = true;
        resetTimer();
    });

    let seconds = 30; // Set your initial timer value in seconds
    let timerInterval; // Variable to store the timer interval ID

    // Function to decrement the timer
    function decrementTimer() {
    if (seconds > 0) {
        seconds--;
    } else {
        if(myTurn){
            console.log('now running')
            socket.emit('next-turn', slug);
            myTurn = false;
        }
        
        resetTimer();
        // To stop the timer after the action is performed
        clearInterval(timerInterval);
    }
    }

    // Function to reset the timer
    function resetTimer() {
    clearInterval(timerInterval); // Stop the current timer
    seconds = 30; // Reset the timer to the initial value
    timerInterval = setInterval(decrementTimer, 1000); // Start a new timer
    }

    // To stop the timer manually (optional)
    function stopTimer() {
        clearInterval(timerInterval);
    }



    import playerOne from '$lib/assets/player-one.svg';
    import playerTwo from '$lib/assets/player-two.svg';
    import redTurn from '$lib/assets/turn-red.svg'; 
    import yellowTurn from '$lib/assets/turn-yellow.svg';

    const cellClick = (e) => {
        const cellNum = Number(e.target.id.split('-')[1]) - 1;

        if (!gameStarted) {
            alert('Waiting for other player to join..');
            return;
        } else if (!myTurn) {
            alert('It is not your turn!');
            return;
        }

        if (cells[cellNum].inPlay) {
            alert('That cell is already in play!');
            return;
        } else if (cells[cellNum + 7] && !cells[cellNum + 7].inPlay) {
            alert('The cell below is not in play, you must build up!');
            return;
        } else {
            cells[cellNum].inPlay = true;
            cells[cellNum].cellBelowInPlay = true;
            cells[cellNum].belongsTo = 'You';
            socket.emit('move', cellNum, slug);
            //when get player number cells[cellNum].belongsTo = 'playerOne';
        }

        checkForWin('You');
        console.log(cells)

        myTurn = false;
        cells = cells;
        resetTimer();
    };

    socket.on('start-game', () => {
        gameStarted = true;
        timerInterval = setInterval(decrementTimer, 1000);
    });

        
        //set the cell to in play, belongs to player one

        /*if(e.target.style.border === '3px black solid'){
            alert('That cell has already been  selected!');
            return;
        } else if(e.target.nextElementSibling){
            if(e.target.nextElementSibling.style.border !== '3px black solid'){
                alert('The cell below is not in play, you must build up!');
                return;
            }
        }*/

        

</script>

<main>
    <div class="top">
        <button class="menu">Menu</button>
        <div class="dots">
            <div>
                <div class="dot dot1"></div>
                <div class="dot dot2"></div>
            </div>
            <div>
                <div class="dot dot3"></div>
                <div class="dot dot4"></div>
            </div>
        </div>
        <button class="restart">Restart</button>
    </div>

    {#if gameStarted === false}
        <div class="blur-darken">
            <div class="invite">
                <h1>Invite Another Player</h1>
                <p class="share-text">Share this link with another player to join your game!</p>

                <div class="copy-link-container">
                    <div class="link">
                        <img src="https://img.icons8.com/ios-filled/100/link--v1.png" alt="">
                        <p class="url">https://connect-four-clone.herokuapp.com/</p>
                    </div>
                    <button class="copy-link-btn">
                        <img src="https://img.icons8.com/ios-glyphs/30/154eeb/copy.png" alt="">
                        Copy
                    </button>
                </div>

                <p class="or">or</p>
                <p class="game-pin-text">Ask them to enter the following game Pin</p>
                <div class="game-pin">
                    <p class="pin">4612</p>
                </div>

                <p class="waiting-text">Waiting for other player to join..</p>
            </div>
        </div>
    {/if}

    <div class="middle">
        <div class="your-score">
            <img src={playerOne} alt="Player One Icon" />
            <p class="player-text">You</p>
            <p class="score-text">36</p>
        </div>
        <div class="board">
            {#each cells as cell}
                {#if cell.inPlay}
                    <div class={cell.belongsTo === "You" ? 'cell in-play' : 'cell in-play otherPlayer'} id={cell.id}></div>
                {:else}
                    <div class="cell" id={cell.id} on:click={cellClick}></div>
                {/if}
            {/each}
        </div>
        <div class="other-score">
            <img src={playerTwo} alt="Player Two Icon" />
            <p class="player-text">Player 2</p>
            <p class="score-text">23</p>
        </div>
    </div>
    
    
    <div class="bottom">
        <div class="turn-info">
            <img src={myTurn ? redTurn : yellowTurn} alt="">
            <p class="sub-text">{myTurn ? "You" : "Player 2"}</p>
            <p class="big-text">{seconds}</p>
        </div>
    </div>
</main>

<style>

    .or{
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        margin: 6%;
    }

    .copy-link-container{
        display: flex;
        align-items: center;
        gap: 2%;
    }

    .link, 
    .game-pin{
        display: flex;
        align-items: center;
        background: white;
        width: 80%;
        border-radius: 18px;
        border: black 2px solid;
        padding-top: 1.4%;
        padding-bottom: 1.4%;
        margin-left: 4%;
    }

    .pin{
        margin-left: 4%;
    }

    .copy-link-btn{
        display: flex;
        align-items: center;
        background: #E5F1FFff;
        color: #154EEBff;
        border: none;
        border-radius: 10px;
        gap: 3%;
        font-size: 15px;
        padding-top: 1.6%;
        padding-bottom: 1.6%;
        padding-left: 2%;
        padding-right: 2%;
    }

    .copy-link-btn img{
        height: 22px;
        width: auto;
    }

    .link img{
        height: 24px;
        width: auto;
        margin-left: 4%;
        margin-right: 2%;
    }

    .invite{
        width: 45%;
        height: 62%;
        border-radius: 40px;
        background: white;
        position: absolute;
        z-index: 10;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0px 10px 0px black;
        border: 3px black solid;
        background:#FFCE67;
    }

    .invite h1{
        font-size: 52px;
        font-weight: 700;
        margin-top: 5%;
        margin-left: 4%;
        margin-bottom: 5%;
    }

    .share-text, 
    .game-pin-text, 
    .waiting-text{
        font-weight: 500;
        font-size: 24px;
        margin-left: 4%;
        margin-right: 2%;
        margin-bottom: 3%;
    }

    .waiting-text{
        text-align: center;
        margin-left: 0;
        margin-right: 0;
        margin-top: 8%;
    }

    .url{
        font-size: 16px;
        font-weight: 400;
    }

    .blur-darken{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        z-index: 5;
    }

    .cell{
        width: 10%;
        height: 10%;
        background: #7945FF;
        border-radius: 100%;
        margin: 2%;
        box-shadow: 0px -5px 0px black;
        border: 2px black solid;
    }

    .cell:hover{
        border: solid 4.5px red;
        cursor: pointer;
    }

    .in-play{
        background: #FD6687;
        border: 3px black solid;
        box-shadow: none;
    }

    .otherPlayer{
        background: #FFCE67;
    }

    .in-play:hover{
        cursor: default;
        border: 3px black solid;
    }

    .middle{
        position: absolute;
        height: 70%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100;
        z-index: 1;
        display: flex;
        align-items: center;
    }

    .your-score, 
    .other-score{
        position: absolute;
        height: 30%;
        width: 25%;
        box-shadow: 0px 10px 0px black;
        border-radius: 20px;
        border: 3px black solid;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .your-score img,
    .other-score img{
        height: 30%;
        width: auto;
        position: absolute;
        top: -15%;
    }

    .your-score{
        left: -35%;
    }

    .other-score{
        right: -35%;
    }

    .player-text{
        font-size: 20px;
        font-weight: 700;
    }

    .score-text{
        font-size: 56px;
        font-weight: 700;
    }

    .board{
        height: 100%;
        aspect-ratio: 1/1;
        background: white;
        box-shadow: 0px 10px 0px black;
        border-radius: 40px;
        border: 3px black solid;
        display: flex;
        flex-wrap: wrap; /* Allow cells to wrap to the next line */
        align-content: flex-start;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    main{
        width: 100vw;
        height: 100vh;
    }

    .top{
        display: flex;
        position: absolute;
        width: 58%;
        justify-content: space-around;
        align-items: center;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 2%;
    }

    .restart,
    .menu{
        font-size: 16px;
        font-weight: 700;
        border-radius: 20px;
        background: #5C2DD5;
        border: none;
        color: white;
        height: 39px;
        padding-left: 19px;
        padding-right: 19px;
    }

    .dots{
        display: flex;
    }

    .dot {
        width: 20px;
        height: 20px;
        background: #FD6687;
        box-shadow: 0px 3px 0px black;
        border-radius: 9999px;
        border: 3px black solid;
        margin-top: 6px;
        margin-bottom: 6px;
        margin-left: 3px;
        margin-right: 3px;
    }

    .dot3 {
        background: #FFCE67;
    }

    .dot4 {
        background: #FFCE67;
    }

    .bottom{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 22%;
        background: #5C2DD5;
        border-top-right-radius: 60px;
        border-top-left-radius: 60px;
        display: flex;
        justify-content: center;
        align-self: flex-end;
    }

    .bottom img{
        position: absolute;
        z-index: 2;
        height: 100%;
    }

    .turn-info{
        height: 85%;
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .sub-text, .big-text{
        color: white;
        font-weight: 700;
        z-index: 3;
    }

    .sub-text{
        font-size: 16px;
    }

    .big-text{
        font-size: 56px;
    }
</style>