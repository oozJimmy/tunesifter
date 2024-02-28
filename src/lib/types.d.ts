export interface TokenResponse{
    access_token:string,
    token_type:string,
    scope:string,
    expires_in:number,
    refresh_token:string
}

export interface Message{
    role:"user" | "system" | "assistant",
    content:string
}

export interface SpotError{
    error: {
        status: number,
        message: string
    }
}

export interface Seeds{
    artists:string[],
    tracks:string[]
}