<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    import TopTracks from "$lib/components/TopTracks.svelte";
    import TopArtists from '$lib/components/TopArtists.svelte';
    import { seeds, count } from "$lib/SeedStore";
    import RecTracks from '$lib/components/RecTracks.svelte';

    export let data: PageData;

    const userName = data.profile.display_name;

    async function makePlaylist(){
        var res = await fetch("/sift/playlist");

        if(res.status != 200) return res;

        
    }

</script>

<div class="profile-card">
    {#if data.profile.error}
        <h1>Uh oh... {data.profile.error.status}: {data.profile.error.message}</h1>
    {:else}
        <p>{userName} <br>{data.profile.country}</p>
        <!-- <p style="text-align:right;">{data.tracks.total} songs saved! Uh...get help.</p> -->
        <img class="avatar" src="{data.profile.images[1].url}" alt="User avatar" height="100" width="100">
    {/if}
</div>

<!-- <div class="sift-prompt">
    <button class="sift-button">Tunesifter Make custom playlist eh</button>
</div> -->

<div class="data-grid">
    <div id="left-col">
        <TopTracks />
        <TopArtists />
    </div>
    <div id="right-col">
        <div class="data-group">
            <h2>Select tracks on the left</h2>
            <h4>Artists</h4><hr>
            <p>{$seeds.artists}</p>
            <h4>Tracks</h4><hr>
            <p>{$seeds.tracks}</p>
            <h4>Count</h4><hr>
            <p>{$count}</p>
            <div><button on:click={() => { makePlaylist() }}>Make Playlist from Reccomendations</button></div>
        </div>
        <RecTracks />
    </div>
</div>

<form method="POST" action="?/test" use:enhance>
    <button type="submit" formaction="?/test">Test Client to server pass data</button>
</form>

<p>{data.actionsData.messages}</p>

<!-- <h6>OpenAI Msg</h6> -->
<!-- <p>{data.ai.choices[0].message.role}:<br>
    {data.ai.choices[0].message.content}</p> -->

<style lang="scss">
    .profile-card{
        background-color: #1f0933;
        border-radius: 1rem;
        width:auto;
        height:auto;
        padding:2rem;
        margin:2rem;
    }
    .avatar{
        border-radius: 5rem;
    }
    .data-group{
        background-color: #1f0933;
        border:.125rem solid #5e34eb;
        border-radius: 1rem;
        padding:0.5rem;
        margin:2rem;
        max-width: 900px;
        width:auto;
    }

    .sift-prompt{
        display:block;
        transform: translate(200,200);
        background-color: #2d5ec1;
        width:40rem;
        height:10rem;
        margin-left:5rem;
        margin-right:5rem;

    }
    .sift-button{
        transform: translate(5rem,5rem);
        background-color: aquamarine;
        border: solid 1rem salmon;
    }

    .sift-button:hover{
        background-color:#FFFFFF;
    }

    .sift-button:active {
        background-color:#488b54
    }

    .data-grid{
        display: grid;
        grid-template-columns: 60rem 40rem;
    }
</style>