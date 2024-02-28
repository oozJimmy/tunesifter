import {redirect} from '@sveltejs/kit';

export function load(){
    //USE STATUS 307, 300 DOESN'T WORK
    redirect(307,'/about');
    return {movements:"jammy"}
}