<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>


<div class="page">
    <slot/>
</div>


<style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Space Grotesk', sans-serif;
    }

    .page{
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
        background: #7945FF;
    }
</style>