import type { SpotError, TokenResponse } from "$lib/types";
import { log } from '$lib/colorlog';
import { SPOT_API_CLIENT_ID, SPOT_API_CLIENT_SECRET } from "$env/static/private";

export async function getToken(authcode: string, pageUrl: string): Promise<TokenResponse>{
    var response = await fetch("https://accounts.spotify.com/api/token",{
        method:"POST",
        headers:{
            'Authorization': 'Basic ' + btoa(`${SPOT_API_CLIENT_ID}:${SPOT_API_CLIENT_SECRET}`),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            redirect_uri: pageUrl,
            grant_type: "authorization_code",
            code: authcode
        })
    });
    return response.json();
}

export async function refreshToken(refreshToken: string){
   const response = await fetch("https://accounts.spotify.com/api/token",{
        method:"POST",
        headers:{
            'Authorization': 'Basic ' + btoa(`${SPOT_API_CLIENT_ID}:${SPOT_API_CLIENT_SECRET}`),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            client_id: `${SPOT_API_CLIENT_ID}`,
            refresh_token: refreshToken
        })
    })

    return response.json()
}

export async function getProfileData(accessToken: string){
    const response = await fetch('https://api.spotify.com/v1/me',{
        headers:{
            'Authorization':`Bearer ${accessToken}`
        }
    });
    console.log("getProfileData: ", response);

    return response.json();
}

export async function getTracks(accessToken: string, url: string){
    return (await fetch(`${url}?limit=20`,{
        headers:{
            'Authorization':`Bearer ${accessToken}`
        }
    })).json();
}

export async function getUserTop(accessToken:string, 
                                type:string, 
                                limit = 20, 
                                timeRange = "medium_term"){
    var res = await fetch(`https://api.spotify.com/v1/me/top/${type}?limit=${limit}&time_range=${timeRange}`,{
        headers:{
            'Authorization':`Bearer ${accessToken}`
        }
    });
    return res.json();
}

export async function getReccomendations(accessToken: string, 
                                        artistSeeds: string, 
                                        trackSeeds: string){
    var recsRes = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_tracks=${trackSeeds}&seed_artists=${artistSeeds}`,{
        headers:{
            "Authorization": `Bearer ${accessToken}`
        }
    });

    return recsRes.json();
}

export async function createPlaylist(accessToken: string, 
                                    userId: string, 
                                    playlistName: string,
                                     isPublic = false){
    const reqBodyJson = JSON.stringify({
        "name": playlistName,
        "description": "Created by Tunesifter (:() ",
        "public": isPublic
    });
    const res = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method:"POST",
        body: reqBodyJson,
        headers:{ "Authorization":`Bearer ${accessToken}`, 
            "Content-Type":"application/json",
            "Accept":"application/json"
        }
    });
    return res;
}

export async function fillPlaylist(accessToken: string, playlistId: string, urisList: string[]){
    const jsonBody = JSON.stringify({
        uris: urisList
    });
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers: {"Authorization" :`Bearer ${accessToken}`,
                "Accept":"application/json",
                "Content-Type":"application/json"
        },
        body: jsonBody,
    });

    console.log("api res fillPlaylist: ", res);

    return res;
}

