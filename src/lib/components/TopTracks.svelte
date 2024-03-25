<script lang="ts">
    import Track from "./Track.svelte";
    import { onMount } from "svelte";
    import { seeds, count, checkedTrackIds, idCheckboxMap } from "$lib/stores/SeedStore";
    import { browser } from "$app/environment";
    
    let trackData: any;
    let timeRange: string = "medium_term";
    let newSeedTracks: any[] = [];
    
    $: maxTracksReached = $count >= 5;

    function getArtistsJoined(track:any): string {
        var artistsList:string[] = [];

        for(var artist of track.artists)
            artistsList = [...artistsList, artist.name];
        
        return artistsList.join(", ");
    }

    function updateTrackList(e:any, track:any): void
    {
        let trackId: string  = track.id;
        let trackName: string = track.name;
        let trackArtists: string = getArtistsJoined(track);
        
        if(e.target.checked){
            if(!maxTracksReached && $checkedTrackIds.indexOf(trackId) === -1)
            {
                checkedTrackIds.set([...$checkedTrackIds, trackId]);
                newSeedTracks = [...newSeedTracks, {id: trackId, name: trackName, artists: trackArtists}];
                $idCheckboxMap.set(trackId, e.target);

                count.set($count + 1);
            }
        }
        else{
            const trackIndex = $checkedTrackIds.indexOf(trackId);
            if( trackIndex != -1){
                $checkedTrackIds.splice(trackIndex, 1);
                newSeedTracks.splice(trackIndex, 1);
                count.set($count - 1);
                $idCheckboxMap.delete(trackId);
            }
        }

        seeds.set({
            artists: $seeds.artists,
            tracks: newSeedTracks
        }); 
    }

    async function updateTopTracks(){
        const res = await fetch(`/sift/top?limit=10&time_range=${timeRange}&type=tracks`);
        const data = await res.json();
        trackData = data;
        return data;
    }

    function resetCheckboxes(){
        if(!browser) return;
        
        let boxes = document.getElementsByClassName("seed-checkbox-track");
        for(let i = 0; i < boxes.length; i++){
            let box = boxes[i] as HTMLInputElement;

            if($checkedTrackIds.indexOf(box.id) != -1)
                box.checked = true;
            else
                box.checked = false;
        }
    }

    onMount(() => updateTopTracks());

</script>

<div class="data-group">
    <h2>Your Top Tracks: </h2>
    <select name="time-range-dropdown" 
        bind:value={timeRange} 
        on:change={async () => {
            await updateTopTracks();
            resetCheckboxes();
        }}>
        
        <option value="short_term">Short Term - 4 weeks</option>
        <option value="medium_term">Medium Term - 6 months</option>
        <option value="long_term">Long Term - all time</option>
    </select>

    <div class="track-grid">
        {#if trackData}
            {#each trackData.items as track}
                <div class="track-row">
                    <input type="checkbox" class="seed-checkbox-track" id="{track.id}"
                        disabled={maxTracksReached && $checkedTrackIds.indexOf(track.id) == -1} 
                        on:click={(e) => updateTrackList(e, track)}/>
                    <Track {track} />
                </div>
            {/each}
        {:else}
            <p>Uh oh...{trackData}</p>
        {/if}
    </div>
</div>

<style>
    .data-group{
        background-color: #000000;
        border: .125rem solid #5e34eb;
        border-radius: 1rem;
        padding: 0.5rem;
        margin: 2rem;
        width: auto;
    }

    input[type="checkbox"]{
        margin:0.25rem;
        justify-self: center;
    }

    .track-grid{
        display:grid;
        background-color: black;
    }

    .track-row{
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