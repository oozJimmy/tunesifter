import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { log } from '$lib/colorlog';
import type { TokenResponse, SpotError } from '$lib/types';

//Import spotify and openAI custom api functions 
import { getProfileData, refreshToken } from '$lib/server/spot.server';
import { openAIReq } from '$lib/server/openai.server';

var actionsData:any = {messages:[]};

export const load:PageServerLoad = async ({ cookies }) => {
    if(cookies.get("AUTHENTICATION") != "true"){
        log.yellow('REDIRECT TO AUTH...');
        redirect(307,'/sift/auth');
    }
    else
        log.yellow("User already authenticated");

    var accessToken:string = `${cookies.get("ACCESS_TOKEN")}`
    var refToken:string = `${cookies.get("REFRESH_TOKEN")}`;

    console.log("accessToken:", accessToken);
    console.log("Refresh token: ", refToken)
    console.log("AUTH: ", cookies.get("AUTHENTICATION"))
    console.log("TOKEN_VALID: ", cookies.get("TOKEN_VALID"))
    console.log("SPOT_AUTH_STATE:", cookies.get("SPOT_AUTH_STATE"))

    if(cookies.get("TOKEN_VALID") === undefined){
        //Refresh token
        log.yellow("Refreshing tokens...");
        var tokens = await refreshToken(refToken);

        console.log("tokens: ", tokens);
        
        if(!tokens.error){
            cookies.set("ACCESS_TOKEN",tokens.access_token,{
                path:"/sift",
            });
            
            cookies.set("TOKEN_VALID","true",{ 
                path: "/sift",
                maxAge: tokens.expires_in
            });
            
        }else{
            console.log("ERROR REFRESHING: ", tokens.error);
        }
    }

    /*claims error
            SyntaxError: Unexpected token 'U', "User not r"... is not valid JSON
        */
    const profileResponse:any = await getProfileData(accessToken);
    console.log("Get profile response: ", profileResponse);
    if(profileResponse.error != undefined){
        log.yellow("BAD TOKEN, REAUTHORIZING...");
        redirect(307, "/sift/auth");
    }

    log.blue(`Sift server loaded: ${new Date().toUTCString()}`);
        
    return {
        actionsData: actionsData,
        profile: profileResponse.error === undefined ? profileResponse : {error: profileResponse.error},
        // ai: await openAIReq(),
    };
}

export const actions = {
    async test() {
        log.blue('Its alive! FROM +page.server.ts!');
        actionsData.messages.push('And its coming back!');
    }
}