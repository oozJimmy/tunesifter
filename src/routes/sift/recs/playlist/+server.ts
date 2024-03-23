import { createPlaylist, fillPlaylist } from "$lib/server/spot.server";
import { log } from "$lib/colorlog";

export async function POST({ request, cookies }){
    console.log("POST CALLED")
    const accessToken = `${cookies.get("ACCESS_TOKEN")}`;
    
    const {urisList, userId } = await request.json();

    const createPlaylistRes = await createPlaylist(accessToken, userId, "Tunesifter List");

    log.yellow(`Create playlist:  ${createPlaylistRes.ok} ${createPlaylistRes.status} ${createPlaylistRes.statusText}`);
    
    if(!createPlaylistRes.ok)
        return createPlaylistRes;

    const createResJson = await createPlaylistRes.json();
    const playlistId = createResJson.id;

    const fillPlaylistRes = await fillPlaylist(accessToken, playlistId, urisList);

    log.yellow(`Fill Playlist: ${fillPlaylistRes.ok} ${fillPlaylistRes.status} ${fillPlaylistRes.statusText}`);

    if(!fillPlaylistRes.ok)
            return fillPlaylistRes;

    return new Response(JSON.stringify({statusText:"All good"}), {status:200});
}