import { writable } from "svelte/store";
import type { Seeds } from "../types";

export const seeds = writable<Seeds>(
    {
        artists:[],
        tracks:[]
    }
);

export const count = writable(0);

export const checkedTrackIds = writable<string[]>([]);
export const checkedArtistIds = writable<string[]>([]);

export const idCheckboxMap = writable
                                <Map<string, HTMLInputElement>>
                                (new Map<string, HTMLInputElement>);