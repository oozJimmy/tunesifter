<script lang="ts">
    import Artist from "./Artist.svelte";
    import { onMount } from "svelte";
    import { seeds, count } from "$lib/SeedStore";

    let checkedArtistIds: string[] = [];
    var artistsData: any;
    let timeRange: string = "medium_term";
    
    $: maxArtistsReached = $count >= 5;

    function updateArtistList(e:any, artist:any):void
    {        
        let artistId:string = artist.id;
        
        if(e.target.checked){
            if(!maxArtistsReached){
                checkedArtistIds = [...checkedArtistIds, artistId];
                count.set($count + 1);
            }
        }
        else{
            if(checkedArtistIds.indexOf(artistId) != -1){
                checkedArtistIds.splice(checkedArtistIds.indexOf(artistId),1);
                count.set($count - 1);
            }
        }

        seeds.set({
            artists: checkedArtistIds,
            tracks: $seeds.tracks
        });
    }

    async function updateTopArtists(){
        const res = await fetch(`/sift/top?limit=10&time_range=${timeRange}&type=artists`);
        const data = await res.json();
        artistsData = data;
        return data;
    }


    onMount(() => updateTopArtists());
</script>

    <div class="data-group">
        <h2>Your top artists:</h2>
        <select name="time-range-dropdown" bind:value={timeRange} on:change={() => updateTopArtists()}>
            <option value="short_term">Short Term - 4 weeks</option>
            <option value="medium_term">Medium Term - 6 months</option>
            <option value="long_term">Long Term - all time</option>
        </select>

        <!-- <div>Uh oh... {artistsData.error.status}: {artistsData.error.message}</div> -->
        <div class="artist-grid">
            {#if artistsData}
                {#each artistsData.items as artist}
                <div class="artist-row">
                    <input type="checkbox" disabled = {maxArtistsReached && checkedArtistIds.indexOf(artist.id) == -1} on:click={(e) => {updateArtistList(e, artist)}}/>
                    <Artist {artist}/>
                </div>
                {/each}
            {:else}
                <p>Uh oh...{artistsData}</p>
            {/if}
        </div>

    </div>

<style>
    .data-group{
        background-color: #1f0933;
        border: .125rem solid #5e34eb;
        border-radius: 1rem;
        padding:0.25rem;
        margin: 2rem;
        margin-top: 0.25rem;
        margin-bottom:0.25rem;
        max-width: 900px;
        font-size: 12pt;
        width:auto;
    }

    input[type="checkbox"]{
        margin:0.25rem;
        justify-self: center;
    }

    .artist-grid{
        display:grid;
    }

    .artist-row{
        display:grid;
        grid-template-columns: 2rem 50rem;
    }
</style>