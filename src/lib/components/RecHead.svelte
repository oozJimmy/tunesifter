<script lang="ts">
    import { seeds, count, checkedArtistIds, checkedTrackIds, idCheckboxMap} from "$lib/stores/SeedStore";
    import { recTracks } from "$lib/stores/RecTracksStore";

    export let userId: string;
    let playlistCreated:string = "";

    async function requestPlaylist(){
        const urisList = extractUriStrings($recTracks);
        const bodyJson = JSON.stringify({
            urisList: urisList,
            userId: userId
        });

        playlistCreated = "Making your playlist...";

        const res = await fetch('/sift/recs/playlist',{
            method: 'POST',
            body: bodyJson,
            headers: {
                "Content-Type": "application/json",
                "Allow": "application/json"
            }
        });
        
        playlistCreated = res.statusText;
        return res.json();
    }

    function extractUriStrings(tracks:any):string[]{
        let uriList:string[] = [];
        for(let i = 0; i < tracks.length; i++){
            uriList.push(`spotify:track:${tracks[i].id}`);
        }
        return uriList;
    }
    
    function removeEntryFromSeeds(seedObj:any){
        let newSeeds:any[];
        const id = seedObj.id;
        const isTrack = seedObj.artists != undefined;
        const box = $idCheckboxMap.get(id) as HTMLInputElement;

        if(isTrack){
            const index = $checkedTrackIds.indexOf(id);
            newSeeds = $seeds.tracks;

            $checkedTrackIds.splice(index, 1);
            newSeeds.splice(index, 1);

            seeds.set({
                artists: $seeds.artists,
                tracks: newSeeds
            });
        }
        else{
            const index = $checkedArtistIds.indexOf(id);
            newSeeds = $seeds.artists;

            $checkedArtistIds.splice(index, 1);
            newSeeds.splice(index, 1);

            seeds.set({
                artists: newSeeds,
                tracks: $seeds.tracks
            });
        }

        if(box != undefined){
            $idCheckboxMap.delete(id);
            box.checked! = false;
        }
         
        count.set($count - 1);
    }


</script>

<div class="data-group">
    <h2>Select tracks to base Reccomendations</h2>

    <h4>Artists</h4><hr>
    {#each $seeds.artists as artistSeed}
        <div class="seed-grid seed">
            <p>{artistSeed.name}</p>
            <button class="remove-seed-button" on:click={() => removeEntryFromSeeds(artistSeed)}>
                <svg fill="#FFFFFF" width="25px" height="25px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                    <path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"/>
                  </svg>
            </button>
        </div>
    {/each}
    
    <h4>Tracks</h4><hr>
    {#each $seeds.tracks as trackSeed}   
        <div class="seed-grid seed">
            <div>{trackSeed.name} by {trackSeed.artists}</div>
            <button class="remove-seed-button" on:click={() => removeEntryFromSeeds(trackSeed)}>
                <svg fill="#FFFFFF" width="25px" height="25px" 
                    viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                    <path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"/>
                  </svg>
            </button>
        </div>
    {/each}
    
    <h4>Count : <span>{$count}</span></h4>

    <button class="create-playlist-button" on:click={() => requestPlaylist() }>Create Playlist</button>
        {#if playlistCreated === "OK"}
            <div>Success! Playlist created with the name "Tunesifter List"</div>
        {:else}
            {#if playlistCreated != ""}
            <div>{playlistCreated}</div>
            {/if}
        {/if}
    </div>
<style>
    .data-group{
        background-color: #1f0933;
        border: .125rem solid #5e34eb;
        border-radius: 1rem;
        padding: 1rem;
        margin: 1rem;
        max-width: 900px;
        width: auto;
    }
    
    @media(min-width: 600px){
        .data-group{
            margin-left: 0.5rem;
        }
    }

    .seed{
        background-color: #8466e8;
        border: .125rem solid #5e34eb;
        border-radius: 1rem;
        margin: 1rem;
        padding: 0.5rem;
        padding-top: 0.125rem;
        padding-bottom: 0.125rem;
        box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
        align-items: center;

    }

    .seed-grid{
        display: grid;
        grid-template-columns: 90% 10%;
    }

    .remove-seed-button{
        background-color: rgb(0,0,0,0);
        border: 0px;
        cursor: pointer;
    }

    .create-playlist-button{
        background-color:#1f0933;
        border: 0.25rem solid #5e34eb;
        border-radius: 1rem;
        padding: 0.5rem;
        padding-right: 1rem;
        padding-left: 1rem;
        color: white;
        font: monospace;

    }

    .create-playlist-button:active{
        background-color: 8466e8;
    }

</style>