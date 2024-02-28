<script lang="ts">
    import spotifyLogo from '$lib/assets/spot_logo.png';

    
</script>

<h2>Hello, from your friend at the end,</h2>
<div class="container">
    <h1>James Kinsley</h1>
    <p>I'm not sure what to say about my coding product.</p>
    <p>I think it's secure, it may not be beautiful but they can't all be winners, eh?</p>
</div>

<div class="container">
    <h2>The TuneSifter</h2>
    <p>Splits your "Liked Songs" by different attributes.</p>
    <p>Adds them to new playlists</p>
    <p>And lets you go kill it</p>
    
    <a href="/sift/auth"><button class="spot-login-button" >Use with Spotify<img id="spotlogo" src="{spotifyLogo}" alt="Spotify Logo"></button></a>
</div>

<footer>Credit to "Islenia Milien for NPR", whatever that means, for the bg art. It is beautiful, Islenia, thank you.</footer>


<style>
    .container{
        margin:0rem;
        margin-top:1rem;
        margin-bottom:1rem;
        text-align:center;
        font-family: monospace;
        border: 0.25rem solid darkgreen;
        border-left: none;
        border-right: none;
        background-image: url("$lib/assets/hindu_dj_dark.jpg");
        background-repeat: repeat-x;
        background-position: center center;
        padding-top:2rem;
        padding-bottom: 2rem;
    }
    h1,h2,p{
        text-align:center;
        margin:0.925rem;
        color:#FFF8E7;
    }
    .spot-login-button{
        color:black;
        background-color: #1db954;
        border:0.25rem solid rgb(9, 82, 9);
        border-radius: 2rem;
        font-family: monospace;
        font-weight: bold;
        font-size: 12pt;
        padding:0.125rem;
        margin:1rem;
        width:15rem;
        position: relative;
        line-height: 3rem;
        text-wrap: wrap;
        text-align: center;
        cursor: pointer;
    }
    #spotlogo{
        height:2rem;
        width:2rem;
        transform: translate(1rem, 0.5rem);
    }
    footer{
        text-align: center;
        color:#FFF8E7;
        margin:1rem;
        font-size:8pt;
    }
</style>