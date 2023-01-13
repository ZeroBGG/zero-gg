import axios from 'axios';
import { URL_LOL, URL_RIOT } from '@/constants/url';

const KEY = `api_key=${import.meta.env.VITE_RIOT_API_KEY}`;

const getSummonerInfo = async (name: string) => {
  try {
    const res = await axios.get(`${URL_RIOT}/lol/summoner/v4/summoners/by-name/${name}?${KEY}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

const getSummonerEntries = async (id: string) => {
  try {
    const res = await axios.get(`${URL_RIOT}/lol/league/v4/entries/by-summoner/${id}?${KEY}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export { getSummonerInfo, getSummonerEntries };
