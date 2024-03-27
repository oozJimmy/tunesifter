<script lang="ts">
    import Artist from "./Artist.svelte";
    import { onMount } from "svelte";
    import { seeds, count, checkedArtistIds, idCheckboxMap } from "$lib/stores/SeedStore";
    import { browser } from "$app/environment";

    let artistsData: any;
    let artistsError: any;
    let timeRange: string = "medium_term";
    let newSeedArtists:any[] = $seeds.artists;
    
    $: maxArtistsReached = $count >= 5;

    function updateArtistList(e:any, artist:any):void{        
        let artistId:string = artist.id;
        let artistName: string = artist.name;
        
        if(e.target.checked){
            if(!maxArtistsReached){
                $checkedArtistIds = [...$checkedArtistIds, artistId];
                count.set($count + 1);
                newSeedArtists = [...newSeedArtists, {name: artistName, id: artistId}];
                $idCheckboxMap.set(artistId, e.target);
            }
        }
        else{
            const index = $checkedArtistIds.indexOf(artistId);
            if(index != -1){
                $checkedArtistIds.splice(index, 1);
                count.set($count - 1);
                newSeedArtists.splice(index, 1);
                $idCheckboxMap.delete(artistId);
            }
        }

        seeds.set({
            artists: newSeedArtists,
            tracks: $seeds.tracks
        });
    }

    async function updateTopArtists(){
        const res = await fetch(`/sift/top?limit=10&time_range=${timeRange}&type=artists`);
        const data = await res.json();
        
        if(data.error != undefined)
            artistsError = data;
        else
        artistsData = data;
    
        return data;
    }


    onMount(() => updateTopArtists());

    function resetCheckboxes(){
        if(browser){
            let boxes = document.getElementsByClassName("seed-checkbox-artist");
            for(let i = 0; i < boxes.length; i++){
                let box = boxes[i] as HTMLInputElement;

                if($checkedArtistIds.indexOf(box.id) != -1)
                    box.checked = true;
                else
                    box.checked = false;
            }
        }
    }

</script>

<div class="data-group">
    <h2>Your top artists:</h2>
    <select name="time-range-dropdown" 
        bind:value={timeRange} 
        on:change={async () => {
            await updateTopArtists();
            resetCheckboxes();
        }}>

        <option value="short_term">Short Term - 4 weeks</option>
        <option value="medium_term">Medium Term - 6 months</option>
        <option value="long_term">Long Term - all time</option>
    </select>

    <!-- <div>Uh oh... {artistsData.error.status}: {artistsData.error.message}</div> -->
    <div class="artist-grid">
        {#if artistsData != undefined}
            {#each artistsData.items as artist}
            <div class="artist-row">
                <input type="checkbox" class="seed-checkbox-artist" id="{artist.id}"
                disabled = {maxArtistsReached && $checkedArtistIds.indexOf(artist.id) == -1} 
                on:click={(e) => {updateArtistList(e, artist)}}/>
                <Artist {artist}/>
            </div>
            {/each}
        {:else}
            <p>Uh oh...{artistsError}</p>
        {/if}
    </div>

</div>

<style>
    .data-group{
        background-color: #000000;
        border: .125rem solid #5e34eb;
        border-radius: 1rem;
        padding: 0.25rem;
        margin: 1rem;
        width: auto;
    }

    input[type="checkbox"]{
        margin: 0.25rem;
        justify-self: center;
    }

    .artist-grid{
        display:grid;
    }

    .artist-row{
        display:grid;
        grid-template-columns: 5% 95%;
        border-top: .001rem solid #b8aedf;
        background-color: black;

    }

    select{
        margin: 0.5rem;
        margin-left: none;
    }
    
</style>