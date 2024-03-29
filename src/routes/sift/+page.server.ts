import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { log } from '$lib/colorlog';
import type { TokenResponse, SpotError } from '$lib/types';

//Import spotify and openAI custom api functions 
import { getProfileData, getTracks, getUserTop, refreshToken, getReccomendations } from '$lib/server/spot.server';
import { openAIReq } from '$lib/server/openai.server';

var actionsData:any = {messages:[]};

export const load:PageServerLoad = async ({ cookies }) => {
    if( cookies.get("AUTHENTICATION") != "true"){
        log.yellow('REDIRECT TO AUTH...');
        redirect(307,'/sift/auth');
    }
    else
        log.yellow("User already authenticated");

    var accessToken:string = `${cookies.get("ACCESS_TOKEN")}`
    var refToken:string = `${cookies.get("REFRESH_TOKEN")}`;

    if(cookies.get("TOKEN_VALID") === undefined){
        //Refresh token
        log.yellow("Refreshing tokens...");
        var tokens = await refreshToken(refToken);
        
        if(!tokens.error){
            cookies.set("ACCESS_TOKEN",tokens.access_token,{
                path:"/sift",
            });

            cookies.set("TOKEN_VALID","true",{
                path:"/sift",
                maxAge:tokens.expires_in
            });
            
        }else
            console.log("ERROR REFRESHING: ",tokens.error);
    }

    log.blue(`Sift server loaded: ${new Date().toUTCString()}`);

        
    return {
        tokens:tokens,
        actionsData:actionsData,
        profile: await getProfileData(accessToken),
        // tracks: await getTracks(accessToken,'https://api.spotify.com/v1/me/tracks'),
        // ai: await openAIReq(),
    };
}

export const actions = {
    async test() {
        log.blue('Its alive! FROM +page.server.ts!');
        actionsData.messages.push('And its coming back!');
    }
}