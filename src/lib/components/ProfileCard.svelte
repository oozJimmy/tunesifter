<script lang="ts">
    export let profile: any;
</script>

<div class="profile-card">
    <div class="left-col">
        {#if profile.error}
        <h1>Uh oh... {profile.error.status}: {profile.error.message}</h1>
        {:else}
        <p>Welcome,<br><br>{profile.display_name} <br>{profile.country}</p>
        <img class="avatar" src="{profile.images[1].url}" alt="User avatar" height="100" width="100">
        {/if}
    </div>
    <div class="right-col">
        <h2>Instructions</h2>
        <ul>
            <h3>On the left:</h3>
            <ul>
                <li>Select up to 5 of your top tracks and artists with the checkboxes</li>
                <li>Change the time range of tracks and artists with the dropdown menus</li>
                <li>Click/tap the album/artist photos to arrive at the corresponding Spotify webpage</li>
            </ul>
            <h3>On the right &#40bottom on mobile&#41:</h3>
            <ul>
                <li>Edit your seed selections</li>
                <li>See your reccomendations</li>
                <li>Magically create a playlist on your Spotify by clicking the button</li>
            </ul>
        </ul>
    </div>
</div>

<style>
    .profile-card{
        background-color: #1f0933;
        border-radius: 1rem;
        width: auto;
        height: auto;
        padding: 2rem;
        margin: 2rem;
        display: grid;
        grid-template-columns: 100%;
    }
    
    @media(min-width: 800px){
        .profile-card{
            grid-template-columns: 20% 80%;
        }
    }

    .avatar{
        border-radius: 5rem;
    }
</style>