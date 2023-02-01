import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const URL_RIOT = 'https://kr.api.riotgames.com';

export default async function getRotationChampion(request: VercelRequest, response: VercelResponse) {
  try {
    const res = await fetch(
      `${URL_RIOT}/lol/platform/v3/champion-rotations?api_key=RGAPI-6a4b103e-8ce5-4c4d-bf1d-b7446843ed19`,
    );

    const result = await res.json().then((data) => data);

    response.status(200).json({
      result,
    });
  } catch (err) {
    console.log(err);
  }
}
