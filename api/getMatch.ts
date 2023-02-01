import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const URL_ASIA_RIOT = 'https://asia.api.riotgames.com';

const MATCH_URL = `${URL_ASIA_RIOT}/lol/match/v5/matches/by-puuid`;

const KEY = `api_key=${process.env.VITE_RIOT_API_KEY}`;

export default async function getMatch(request: VercelRequest, response: VercelResponse) {
  try {
    const { body } = request;
    const payload = body.data;
    const { puuid, start, count }: { puuid: string; start: number; count: number } = payload;
    const res = await fetch(`${MATCH_URL}/${puuid}/ids?start=${start}&count=${count}&${KEY}&queue=420`);

    const result = await res.json().then((data) => data);

    response.status(200).json({
      result,
    });
  } catch (err) {
    console.log(err);
  }
}
