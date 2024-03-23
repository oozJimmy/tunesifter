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
        background-color: #000000;
        border: .125rem solid #5e34eb;
        border-radius: 1rem;
        padding: 0.5rem;
        margin: 0.5rem;
        font-size: 11pt;
    }
    span{
        margin: 0.5rem;
    }

    img{
        margin:0.25rem;
        height: 3rem;
    }

    .grid{
        display: grid;
        grid-template-columns: 15% 85%;
        align-items: center;
    }
</style>