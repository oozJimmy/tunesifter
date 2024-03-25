<script lang="ts">
    export let artist:any;
</script>

    <div class="grid">
        <a href="{artist.external_urls.spotify}">
            <img src="{artist.images[0].url}" alt="Artist">
        </a> 
        <span>{artist.name}</span>
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
        margin:0.125rem;
        height: 2rem;
        aspect-ratio: 1;
    }

    .grid{  
        display: grid;
        grid-template-columns: 2.5rem auto;
        align-items: center;
    }
</style>