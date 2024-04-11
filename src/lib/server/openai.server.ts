import OpenAI from "openai";
import type { Message } from "$lib/types";
import { OPENAI_API_KEY } from "$env/static/private";

var ai = new OpenAI({apiKey:`${process.env.OPENAI_API_KEY}`});
export async function chat(messages:Message[]){
    var res = ai.chat.completions.create({
        model:"gpt-3.5-turbo-1106",
        messages: messages
        // [
            // {role:"system",content:"You are a swami of raja yoga, please answer my questions."},
            // {role:"user",content:"How should I shake my dreams and get up in the morning?"}

        // ],
    });
}

export async function openAIReq() {
  const openai = new OpenAI({apiKey:`${OPENAI_API_KEY}`});

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You reccomend a list of songs 5 items long in the format \"song-name-here;artist-name-here\n\" from different artists the user might like. You get 5 songs that the user likes in the same format." },
      {role:"user",content:"IZ-US;Aphex Twin\nSF Sorrow;The Pretty Things\nInstant Disassembly;Parquet Courts\nBaby Blue;King Krule\nTobacco Road;Jefferson Airplane"}
    ],
    model: "gpt-3.5-turbo-1106",
  //   response_format:{"type":"json_object"}
  });

  return completion;
}