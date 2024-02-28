<script lang="ts">
    import Track from "./Track.svelte";
    import { onMount } from "svelte";
    import { seeds, count } from "$lib/SeedStore";

    let checkedTrackIds: string[] = [];
    var trackData: any;
    let timeRange: string = "medium_term";
    
    $: maxTracksReached = $count >= 5;
    
    function updateTrackList(e:any, track:any): void
    {
        let trackId:string  = track.id;

        if(e.target.checked){
            if(!maxTracksReached)
            {
                checkedTrackIds = [...checkedTrackIds, trackId];
                count.set($count + 1);
            }
        }
        else{
            if(checkedTrackIds.indexOf(trackId) != -1){
                checkedTrackIds.splice(checkedTrackIds.indexOf(track.id),1);
                count.set($count - 1);
            }
        }

        seeds.set({
            artists: $seeds.artists,
            tracks: checkedTrackIds
        });
    }

    async function updateTopTracks(){
        const res = await fetch(`/sift/top?limit=10&time_range=${timeRange}&type=tracks`);
        const data = await res.json();
        trackData = data;
        return data;
    }

    onMount(() => updateTopTracks());

</script>

    <div class="data-group">
        <h2>Your Top Tracks: </h2>
        <select name="time-range-dropdown" bind:value={timeRange} on:change={() => updateTopTracks()}>
            <option value="short_term">Short Term - 4 weeks</option>
            <option value="medium_term">Medium Term - 6 months</option>
            <option value="long_term">Long Term - all time</option>
        </select>

        <div class="track-grid">
            {#if trackData}
                {#each trackData.items as track}
                    <div class="track-row">
                        <input type="checkbox" disabled={maxTracksReached && checkedTrackIds.indexOf(track.id) == -1} on:click={(e) => updateTrackList(e, track)}/>
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
        background-color: #1f0933;
        border:.125rem solid #5e34eb;
        border-radius: 1rem;
        padding:0.25rem;
        margin:2rem;
        max-width: 900px;
        width:auto;
    }

    input[type="checkbox"]{
        margin:0.25rem;
        justify-self: center;
    }

    .track-grid{
        display:grid;
    }

    .track-row{
        display:grid;
        grid-template-columns: 2rem 50rem;
    }
</style>