import type { SpotError, TokenResponse } from "$lib/types";
import { SPOT_API_ID, SPOT_API_SECRET } from "$env/static/private";
import { log } from '$lib/colorlog';

export async function getToken(authcode: string): Promise<TokenResponse>{
    //Get access token
    var response = await fetch('https://accounts.spotify.com/api/token',{
        method:"POST",
        headers:{
            'Authorization': 'Basic ' + btoa(`${SPOT_API_ID}:${SPOT_API_SECRET}`),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            redirect_uri:"http://localhost:5173/sift/auth/token",
            grant_type:"authorization_code",
            code:authcode
        })
    });

    return response.json();
}

export async function refreshToken(refreshToken: string){
   return (await fetch("https://accounts.spotify.com/api/token",{
        method:"POST",
        headers:{
            'Authorization': 'Basic ' + btoa(`${SPOT_API_ID}:${SPOT_API_SECRET}`),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:new URLSearchParams({
            grant_type: "refresh_token",
            client_id: SPOT_API_ID,
            refresh_token: refreshToken
        })
    })).json();
}

export async function getProfileData(accessToken: string){
    return (await fetch('https://api.spotify.com/v1/me',
    {
        headers:{
            'Authorization':`Bearer ${accessToken}`
        }
    })).json();
}

export async function getTracks(accessToken: string, url: string){
    return (await fetch(`${url}?limit=20`,
    {
        headers:{
            'Authorization':`Bearer ${accessToken}`
        }
    })).json();
}

export async function getUserTop(accessToken:string, type:string, limit = 20, timeRange = "medium_term")
{
    var res = await fetch(`https://api.spotify.com/v1/me/top/${type}?limit=${limit}&time_range=${timeRange}`,{
        headers:{
            'Authorization':`Bearer ${accessToken}`
        }
    })
    return res.json();
}

export async function getReccomendations(accessToken: string, artistSeeds: string, trackSeeds: string)
{
    // var topTracksJSON = await getUserTop(accessToken, "tracks", 5, "medium_term");
    
    // var trackIds:any = [];
    // for(var track of topTracksJSON.items)
    // {
    //     trackIds = [...trackIds, track.id];
    // }
    
    var recsRes = await fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${trackSeeds}&seed_artists=${artistSeeds}`,{
        headers:{
            "Authorization": `Bearer ${accessToken}`
        }
    });

    // console.log(recsRes.headers);

    return recsRes.json();
}