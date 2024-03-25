<script lang="ts">
    export let track:any;

    var artistsJoined = "";
    
    function getArtistsJoined(track:any): string {
        var artistsList:string[] = [];

        for(var artist of track.artists)
            artistsList = [...artistsList, artist.name];
        
        return artistsList.join(", ");
    }

    $: artistsJoined = getArtistsJoined(track);

</script>

<div class="grid">
    <a href="{track.external_urls.spotify}">
        <img src="{track.album.images[2].url}" alt="Album art">
    </a>    
    <span class="track-info">{track.name} by {artistsJoined}</span>
</div>

<style>
    div{
        padding: 0.5rem;
        font-size: 11pt;
    }

    span{
        margin: 0.5rem;
    }

    img{
        margin: 0.125rem;
        height: 2rem;
    }
    
    .track-info{
        margin: 0.5rem;
    }

    .grid{
        display:grid;
        grid-template-columns: 2.5rem auto;
        /* grid-template-columns: 15% 85%; */
        align-items: center;
    }
</style>