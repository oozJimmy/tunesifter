//API endpoint for the /sift frontend for async top items calls
import { getUserTop } from "$lib/server/spot.server";

export async function GET ({ url, cookies }) {
    var limit = Number(url.searchParams.get("limit"));
    var timeRange = url.searchParams.get("time_range");
    var type = url.searchParams.get("type");
    var accessToken = cookies.get("ACCESS_TOKEN");

    if(!limit || !timeRange || !type) return new Response("Bad URL Params",{status: 400});
    if(!accessToken) return new Response("No access token",{status: 400});

    var jsonData = await getUserTop(accessToken, type, limit, timeRange);

    return new Response(JSON.stringify(jsonData), {status:200, headers:{"Content-Type":"application/json"}});
}