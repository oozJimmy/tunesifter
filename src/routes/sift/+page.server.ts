import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { log } from '$lib/colorlog';
import type { TokenResponse, SpotError } from '$lib/types';

//Import spotify and openAI custom api functions 
import { getProfileData, refreshToken } from '$lib/server/spot.server';
import { openAIReq } from '$lib/server/openai.server';

export const load:PageServerLoad = async ({ cookies }) => {
    if(cookies.get("AUTHENTICATION") != "true"){
        log.yellow('REDIRECT TO AUTH...');
        redirect(307,'/sift/auth');
    }
    else
        log.yellow("User already authenticated");

    var accessToken:string = `${cookies.get("ACCESS_TOKEN")}`;
    var refToken:string = `${cookies.get("REFRESH_TOKEN")}`;

    if(cookies.get("TOKEN_VALID") === undefined){
        // log.red("TOKEN NOT VALID REDIRECT TO AUTH");
        // redirect(307,"/sift/auth")
        //Refresh token
        log.yellow("Refreshing tokens...");
        var tokens = await refreshToken(refToken);

        if(!tokens.error){
            accessToken = tokens.access_token;
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
    var profileResponse:any = await getProfileData(accessToken);
    console.log("Get profile response: ", profileResponse);
    // if(profileResponse.error != undefined){
    //     log.yellow("BAD TOKEN, REAUTHORIZING...");
    //     redirect(307, "/sift/auth");
    // }

    log.blue(`Sift server loaded: ${new Date().toUTCString()}`);
        
    return {
        profile: profileResponse.error === undefined ? profileResponse : {error: profileResponse.error},
        // ai: await openAIReq(),
    };
}