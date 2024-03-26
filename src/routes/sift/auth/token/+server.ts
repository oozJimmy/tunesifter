import { redirect } from '@sveltejs/kit';
import type { SpotError, TokenResponse } from '$lib/types';
import { getToken } from '$lib/server/spot.server';
import { log } from '$lib/colorlog';

export async function GET({ url, cookies }):Promise<null>{
    //Get data from query string
    var state = url.searchParams.get('state');
    var error = url.searchParams.get('error');
    var code = url.searchParams.get('code');
    
    var authcode = typeof code === "string" ? code : "";

    if(error != undefined){
        log.red(`_error from auth:\n${error}`);
        redirect(307,`/sift/auth/error?reason=${error}`);
    }

    if(state != cookies.get("SPOT_AUTH_STATE"))
        redirect(307,'/sift/auth/error?reason=state_mismatch');

    var tokens = await getToken(authcode) satisfies TokenResponse;

    console.log("tokens res: ", tokens);
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