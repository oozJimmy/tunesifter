<script lang="ts">
    export let data;
</script>

<div class="container">
    <h1>About TuneSifter</h1>
    {#each data.about as para}
        <p>{para}</p>
    {/each}
</div>

<footer>Credit to "Islenia Milien for NPR", whatever that means, for the bg art. It is beautiful, Islenia, thank you.</footer>


<style>
    .container{
        background-image: url('$lib/assets/hindu_dj_dark.jpg');
        height:25rem;
        width:auto;
        margin: 0.125rem;
        border: 0.125rem dashed white; 
        background-attachment: fixed;
        background-size: cover;
    }
    h1, p{
        margin-left:5%;
        margin-right:5%;
        text-align:left;
    }
    footer{
        text-align: center;
        color:#FFF8E7;
        margin:1rem;
        font-size:8pt;
    }
</style>