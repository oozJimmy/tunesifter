<script lang="ts">
    import { onMount } from "svelte";
    import Track from "./Track.svelte";
    
    import { seeds } from "$lib/stores/SeedStore";
    import { recTracks } from "$lib/stores/RecTracksStore";

    async function updateRecs(artistIds:string[], trackIds:string[]){
        const recsRes = await fetch(`/sift/recs?seed_artists=${artistIds.join(",")}&seed_tracks=${trackIds.join(",")}`);
        const recsJson = await recsRes.json();

        $recTracks = recsJson.tracks;
        
        return recsJson;
    }

    function getSeedIds(seed:any[]): string[]
    {
        let ids:string[] = [];
        for(let i = 0; i < seed.length; i++)
        {
            ids = [...ids, seed[i].id];
        }

        return ids;
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

    {#await updateRecs(getSeedIds($seeds.artists), getSeedIds($seeds.tracks))}
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
        border: .125rem solid #5e34eb;
        border-radius: 1rem;
        padding: 1rem;
        margin: 2rem;
        max-width: 900px;
        width: auto;
    }

    @media(min-width: 600px){
        
        .data-group{
            margin-left: 0.5rem;
            
        }
    }
</style>