import { redirect } from '@sveltejs/kit';
import { SPOT_API_CLIENT_ID } from "$env/static/private";

export function GET({url, cookies}){
    const state = generateRandomString(16);
    cookies.set("SPOT_AUTH_STATE", state, {
        path:'/sift/auth'
    });
    
    redirect(307,makeSpotAuthURL(state, url.toString()));
}

function makeSpotAuthURL(state: string, pageUrl: string): string{
    var scopes = 'user-read-private user-read-email user-library-read user-top-read playlist-modify-public playlist-modify-private';

    console.log("AUTH redirect_uri: ", `${pageUrl}/token`);

    var params = new URLSearchParams({
        client_id: `${SPOT_API_CLIENT_ID}`,
        response_type: "code",
        redirect_uri: `${pageUrl}/token`,
        state:state,
        scope:scopes
    });

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

function generateRandomString(length:number){
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let ranString = '';

    for(var i = 0; i < length; i++)
        ranString += characters[Math.floor(Math.random() * characters.length)];

    return ranString;
}