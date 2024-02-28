<script lang="ts">
    export let artist:any;
</script>

    <div>
        <a href="{artist.external_urls.spotify}">
            <img src="{artist.images[0].url}" alt="Artist">
        </a> 
        <span>{artist.name}</span>
    </div>


<style>
    div{
        background-color: #000000;
        border:.125rem solid #5e34eb;
        border-radius: 1rem;
        padding:0.5rem;
        margin:0.25rem;
        max-width: 800px;
        font-size:14pt;
        width:auto;
    }

    img{
        margin:0.25rem;
        height:auto;
        max-width:10%
    }
</style>