<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    
    import TopTracks from "$lib/components/TopTracks.svelte";
    import TopArtists from '$lib/components/TopArtists.svelte';
    import RecTracks from '$lib/components/RecTracks.svelte';
    import RecHead from '$lib/components/RecHead.svelte';
    import ProfileCard from '$lib/components/ProfileCard.svelte';

    export let data: PageData;

    const userName = data.profile.display_name;

</script>



<ProfileCard profile={data.profile}/>

<!-- <div class="sift-prompt">
    <button class="sift-button">Tunesifter Make custom playlist eh</button>
</div> -->

<div class="data-grid">
    <div id="left-col">
        <TopTracks />
        <TopArtists />
    </div>
    <div id="right-col">
        <RecHead userId={data.profile.id}/>
        
        <RecTracks />
    </div>
</div>

<!-- <form method="POST" action="?/test" use:enhance>
    <button type="submit" formaction="?/test">Test Client to server pass data</button>
</form> 
<p>{data.actionsData.messages}</p> -->

<!-- <h6>OpenAI Msg</h6> -->
<!-- <p>{data.ai.choices[0].message.role}:<br>
    {data.ai.choices[0].message.content}</p> -->

<style lang="scss">

    .avatar{
        border-radius: 5rem;
    }
    .data-group{
        background-color: #1f0933;
        border: .125rem solid #5e34eb;
        border-radius: 1rem;
        padding: 0.5rem;
        margin: 2rem;
        // max-width: 900px;
        // width:auto;
    }

    .sift-prompt{
        display: block;
        transform: translate(200,200);
        background-color: #2d5ec1;
        width: 40rem;
        height: 10rem;
        margin-left: 5rem;
        margin-right: 5rem;

    }
    .sift-button{
        transform: translate(5rem,5rem);
        background-color: aquamarine;
        border: solid 1rem salmon;
    }

    .sift-button:hover{
        background-color: #FFFFFF;
    }

    .sift-button:active {
        background-color: #488b54
    }

    .data-grid{
        display: grid;
        grid-template-columns: 100%;
    }


    @media(min-width: 600px){
        .data-grid{ 
            grid-template-columns: 50% 50%;

        }

    }

</style>