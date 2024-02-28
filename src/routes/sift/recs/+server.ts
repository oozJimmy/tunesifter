import { getReccomendations } from '$lib/server/spot.server.js';
import type { SpotError } from '$lib/types.js';

export async function GET({ url, cookies }){
    const accessToken = `${cookies.get("ACCESS_TOKEN")}`;

    const artistSeeds = url.searchParams.get("seed_artists");
    const trackSeeds  = url.searchParams.get("seed_tracks");

    if(!accessToken) return new Response("No access token",{status: 400});

    if(artistSeeds === null || trackSeeds === null) 
        return new Response(JSON.stringify({error:"Bad URL Seeds"}),{status:400});

    const recsJson = await getReccomendations(accessToken, artistSeeds, trackSeeds);
    // const recsJson = {};
    // console.log("recsJson from /sift/recs ", recsJson);

    return new Response(JSON.stringify(recsJson),{headers:{"Content-Type":"application/json"}})
}