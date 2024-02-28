import { writable } from "svelte/store";
import type { Seeds } from "./types";

export const seeds = writable<Seeds>(
    {
        artists:[],
        tracks:[]
    }
);

export const count = writable(0);
