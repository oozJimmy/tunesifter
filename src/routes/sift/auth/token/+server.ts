import { redirect } from '@sveltejs/kit';
import type { SpotError, TokenResponse } from '$lib/types';
import { getToken } from '$lib/server/spot.server';
import { log } from '$lib/colorlog';

export async function GET({ url, cookies }):Promise<any>{
    //Get data from query string
    var state = url.searchParams.get('state');
    var error = url.searchParams.get('error');
    var code = url.searchParams.get('code');
    
    var authcode = typeof code === "string" ? code : "";

    //TESTING
    console.log("state", state);
    console.log("error", error);
    console.log("authcode", authcode);
    
    if(error != null){
        log.red(`_error from auth:\n${error}`);
        redirect(307,`/sift/auth/error?reason=${error}`);
    }

    if(state != cookies.get("SPOT_AUTH_STATE"))
        redirect(307,'/sift/auth/error?reason=state_mismatch');

    var tokens = await getToken(authcode, url.toString());

    var tokenBool:string = tokens.access_token != undefined ? "true": "false";

    //Set cookies for tokens and positive auth response
    cookies.set("ACCESS_TOKEN",tokens.access_token,{path:"/sift"});
    cookies.set("REFRESH_TOKEN",tokens.refresh_token,{path:"/sift"});
    cookies.set("AUTHENTICATION","true",{path:"/sift"});
    cookies.set("TOKEN_VALID",tokenBool,{
        path:"/sift",
        maxAge:tokens.expires_in
    });

    //To tunesifter page (success)
    redirect(307,`/sift`);
};