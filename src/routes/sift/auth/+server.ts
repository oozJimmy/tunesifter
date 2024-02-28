import { redirect } from '@sveltejs/kit';
import { SPOT_API_ID } from '$env/static/private';

const stateKey = "SPOT_AUTH_STATE";

export function GET({cookies}){
    const state = generateRandomString(16);
    cookies.set(stateKey,state,{
        path:'/sift/auth'
    });
    
    redirect(307,makeSpotAuthURL(state));
}

function makeSpotAuthURL(state: string):string{
    var scopes = 'user-read-private user-read-email user-library-read user-top-read';

    var params = new URLSearchParams({
        client_id: `${SPOT_API_ID}`,
        response_type: 'code',
        redirect_uri:'http://localhost:5173/sift/auth/token',
        state:state,
        scope:scopes
    });

    return 'https://accounts.spotify.com/authorize?' + params.toString();
};

function generateRandomString(length:number){
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let ranString = '';

    for(var i = 0; i < length; i++)
        ranString += characters[Math.floor(Math.random() * characters.length)];

    return ranString;
}