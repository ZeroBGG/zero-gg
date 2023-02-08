import axios from 'axios';
import { URL_LOL, URL_RIOT, URL_ASIA_RIOT } from '@/constants/url';

const KEY = `api_key=${import.meta.env.VITE_RIOT_API_KEY}`;

const MATCH_URL = `${URL_ASIA_RIOT}/lol/match/v5/matches/by-puuid`;

const getMatch = async (puuid: string, start: number = 0, count: number = 5) => {
  try {
    const res = await axios.post('/api/getMatch', {
      data: {
        puuid,
        start,
        count,
      },
    });

    if (res.data.result.status?.status_code) {
      throw new Error(res.data.result.status.message);
    }

    return res.data.result;
  } catch (err) {
    throw err;
  }
};

const getDetailMatch = async (data: string) => {
  try {
    const res = await axios.post('/api/getDetailMatch', {
      data: {
        data,
      },
    });

    if (res.data.result.status?.status_code) {
      throw new Error(res.data.result.status.message);
    }

    return res.data.result;
  } catch (err) {
    throw err;
  }
};

export { getMatch, getDetailMatch };
