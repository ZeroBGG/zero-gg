import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const URL_RIOT = 'https://kr.api.riotgames.com';

const KEY = `api_key=${process.env.VITE_RIOT_API_KEY}`;

export default async function getRotationChampion(request: VercelRequest, response: VercelResponse) {
  try {
    const res = await fetch(`${URL_RIOT}/lol/platform/v3/champion-rotations?${KEY}`);

    const result = await res.json().then((data) => data);

    response.status(200).json({
      result,
    });
  } catch (err) {
    console.log(err);
  }
}
