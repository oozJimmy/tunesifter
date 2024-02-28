<script lang="ts">
    export let track:any;

    var artistsJoined = "";
    
    function getArtistsJoined(track:any): string {
        var artistsList:string[] = [];
        for(var artist of track.artists)
        {
            artistsList = [...artistsList, artist.name];
        }
        
        return artistsList.join(", ");
    }

    $: artistsJoined = getArtistsJoined(track);

</script>

<div>
    <a href="{track.external_urls.spotify}">
        <img src="{track.album.images[2].url}" alt="Album art">
    </a>    
    <span>{track.name} by {artistsJoined}</span>

</div>

<style>
    div{
        background-color: #000000;
        border:.125rem solid #5e34eb;
        border-radius: 1rem;
        padding: 0.25rem;
        margin: 0.25rem;
        max-width: 700px;
        font-size:12pt;
        width:auto;

    }
    img{
        margin:0.25rem;
        height:60%;

    }
</style>