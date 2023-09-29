<script>
    import { onMount } from 'svelte';
    import io from 'socket.io-client';
    const socket = io('http://localhost:3000');

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

    //when user creates new game, modal pops up with a link and game code to share with other player and modal stays up until another person joins Waiting for other player...








    import playerOne from '$lib/assets/player-one.svg';
    import playerTwo from '$lib/assets/player-two.svg';
    import redTurn from '$lib/assets/turn-red.svg'; 
    import yellowTurn from '$lib/assets/turn-yellow.svg';
    import Page from '../../routes/+page.svelte';

    const cellClick = (e) => {
        const cellNum = Number(e.target.id.split('-')[1]) - 1;

        if (cells[cellNum].inPlay) {
            alert('That cell is already in play!');
            return;
        } else if (cells[cellNum + 7] && !cells[cellNum + 7].inPlay) {
            alert('The cell below is not in play, you must build up!');
            return;
        } else {
            cells[cellNum].inPlay = true;
            cells[cellNum].cellBelowInPlay = true;
            //when get player number cells[cellNum].belongsTo = 'playerOne';
        }

        cells = cells;
    };

        
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

    <div class="middle">
        <div class="your-score">
            <img src={playerOne} alt="Player One Icon" />
            <p class="player-text">You</p>
            <p class="score-text">36</p>
        </div>
        <div class="board">
            {#each cells as cell}
                {#if cell.inPlay}
                    <div class="cell in-play" id={cell.id}></div>
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
            <img src={redTurn} alt="">
            <p class="sub-text">Your Turn</p>
            <p class="big-text">15s</p>
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
        background: #FFCE67;
        border: 3px black solid;
        box-shadow: none;
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