<script lang="ts">
    import { onMount } from "svelte";
    import { seeds } from "$lib/SeedStore";
    import Track from "./Track.svelte";

    var trackRecs:any = {};

    async function updateRecs(artistIds:string[], trackIds:string[]){
        const recsRes = await fetch(`/sift/recs?seed_artists=${artistIds.join(",")}&seed_tracks=${trackIds.join(",")}`);
        const recsJson = await recsRes.json();

        trackRecs = recsJson;
        
        console.log("updateRecs called");
        return recsJson;
    }

</script>

<div class="data-group" id="recs">
    <h2>Reccomendations:</h2>
    <!-- {#if !trackRecs.tracks}
        <p>Uh oh... {trackRecs}</p>    
    {:else}
        {#each trackRecs.tracks as track}
            <Track {track}/>
        {/each}
    {/if} -->

    {#await updateRecs($seeds.artists, $seeds.tracks)}
        <p>Waiting for recs...</p>
    {:then tracksJson}
        {#if tracksJson.tracks === undefined}
            <p>Error: Try checking the boxes</p>
        {:else}
            {#each tracksJson.tracks as track}
                <Track {track} />
                <!-- <p>RECS</p> -->
            {/each}
        {/if}
    {:catch error}
        <p>CATCH ERROR: {error}</p>
    {/await}
</div>

<style>
    .data-group{
    background-color: #1f0933;
    border:.125rem solid #5e34eb;
    border-radius: 1rem;
    padding:0.25rem;
    margin:2rem;
    max-width: 900px;
    width:auto;
    }
</style>