import axios from 'axios';
import { URL_LOL, URL_RIOT, URL_ASIA_RIOT } from '@/constants/url';

const KEY = `api_key=${import.meta.env.VITE_RIOT_API_KEY}`;

const MATCH_URL = `${URL_ASIA_RIOT}/lol/match/v5/matches/by-puuid`;

const getMatchApi = async (puuid: string, start: number = 0, count: number = 5) => {
  try {
    const res = await axios.get(`${MATCH_URL}/${puuid}/ids?start=${start}&count=${count}&${KEY}&queue=420`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

const getDetailMatchApi = async (data: string) => {
  try {
    const res = await axios.get(`${URL_ASIA_RIOT}/lol/match/v5/matches/${data}?${KEY}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export { getMatchApi, getDetailMatchApi };
