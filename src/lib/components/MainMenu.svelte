<script>
    import { onMount } from 'svelte';
    import io from 'socket.io-client';
    const socket = io('http://localhost:3000');
    import pvpIcon from '$lib/assets/pvp.svg';
    let requestGamePin = '';

    let showing = 'Main';

    const goToMain = () => {
        showing = 'Main';
    }

    const goToJoin = () =>{
        showing = 'Join';
    }

    const requestNewGame = () => {
        socket.emit('request-new-game');
    }
    socket.on('new-game-pin', (gamePin) => {
        console.log(gamePin);
    })

    const requestJoinGame = () => {
        socket.emit('request-join-game', requestGamePin);
    }
</script>


<main>
    <div class={showing === 'Main' ? 'container gap' : 'container join-gap'}>
        {#if showing === 'Main'}
            <a href="#" on:click={goToJoin}>Join Game</a>
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
            <div class="buttons">
                <button class="pvp" on:click={requestNewGame}>New Game <img src={pvpIcon} alt="Player Vs Play Icon"></button>
                <button class="rules">Game Rules</button>
            </div>
        {:else if showing === 'Rules'}
            <h1>Rules</h1>
        {:else if showing === 'Join'}
        <h1 class="game-pin-title">Enter the Game Pin</h1>
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
        <input class="game-pin" type="text" placeholder="4621" bind:value={requestGamePin}>

        <button class="join-game" on:click={requestJoinGame}>Join Game</button>

        <img on:click={goToMain} class="back-icon" src="https://img.icons8.com/ios-filled/100/back.png" alt="Back Icon">
        {/if}
    </div>
</main>

<style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .container {
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background: #7945FF;
        width: 32%;
        height: 50%;
        border-radius: 40px;
        box-shadow: 0px 10px 0px black;
        border: 3px black solid;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .gap{
        gap: 11%;
    }

    .join-gap{
        gap: 6%;
    }

    a{
        background: white;
        color: black;
        font-weight: 700;
        font-size: 1rem;
        border-radius: 40px;
        padding: 0.5rem 0.5rem;
        position: absolute;
        top: 2%;
        right: 2%;
        text-decoration: none;
        box-shadow: 0px 3px 0px black;
        border: 3px black solid;
    }

    .back-icon{
        position: absolute;
        left: 4%;
        top: 5%;
        height: 8%;
    }

    .back-icon:hover{
        cursor: pointer;
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

    .dot1 {
        background: #FFCE67;
    }

    .dot4 {
        background: #FFCE67;
    }

    .buttons{
        width: 100%;
        height: 40%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.3rem;
    }

    button{
        box-shadow: 0px 10px 0px black; 
        border-radius: 20px; 
        border: 3px black solid;
        width: 80%;
        height: 40%;
        font-size: 1.5rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        padding-left: 1rem;
        padding-right: 2.5rem;
        justify-content: space-between;
        transition: all 0.2s ease-in-out;
    }

    .join-game{
        height: 14%;
    }

    .join-game{
        font-size: 1.3rem;
        box-shadow: 0px 7px 0px black;
        width: 70%;
        padding-left: 0;
        padding-right: 0;
        display: flex;
        justify-content: center;
        background: #FFCE67;
    }

    .game-pin-title{
        font-size: 2.3rem;
        font-weight: 700;
        margin-top: 4%;
    }

    input{
        width: 80%;
        height: 15%;
        box-shadow: 0px 5px 0px black; 
        border-radius: 20px; 
        border: 3px black solid;
        padding-left: 1rem;
        font-size: 1.2rem;
    }

    button:hover, a:hover{
        filter: brightness(95%);
        cursor: pointer;
    }

    button:active{
        transform: translateY(10px);
        box-shadow: 0px 5px 0px #5C2DD5; 
        border-radius: 20px; 
        border: 3px #5C2DD5 solid;
    }

    .pvp{
        background: #FFCE67;
    }

    .rules{
        background: white;
    }

    button > img {
        height: 34px;
        width: auto;
    }

    @media (max-width: 575.98px) {
        .container{
            border-radius: 0 0 0 0;
            box-shadow: none;
            border: none;
            width: 100%;
            background: none;
        }
    }

    /* Small devices (phones, 576px and up) */
    @media (min-width: 576px) {
        .container{
            position: absolute;
            background: #7945FF;
            width: 80%;
            border-radius: 40px;
            box-shadow: 0px 10px 0px black;
            border: 3px black solid;
        }
    }

    /* Medium devices (tablets, 768px and up) */
    @media (min-width: 768px) {
        .container {
            width: 62%;
            height: 55%;
        }
    }

    /* Large devices (desktops, 992px and up) */
    @media (min-width: 992px) {
        .container {
            width: 32%;
            height: 50%;
        }
    }

    /* Extra large devices (large desktops, 1200px and up) */
    @media (min-width: 1200px) {
        /* CSS rules for extra large devices */
    }
</style>