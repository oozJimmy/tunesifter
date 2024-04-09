<script lang="ts">
    // import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    
    import TopTracks from "$lib/components/TopTracks.svelte";
    import TopArtists from '$lib/components/TopArtists.svelte';
    import RecTracks from '$lib/components/RecTracks.svelte';
    import RecHead from '$lib/components/RecHead.svelte';
    import ProfileCard from '$lib/components/ProfileCard.svelte';

    export let data: PageData;
</script>

<ProfileCard profile={data.profile}/>

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

<style>
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