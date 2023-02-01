import axios from 'axios';
import { URL_LOL, URL_RIOT } from '@/constants/url';

const getSummonerInfo = async (name: string) => {
  try {
    const res = await axios.post('/api/getSummonerInfo', {
      data: {
        name,
      },
    });

    return res.data.result;
  } catch (err) {
    throw err;
  }
};

const getSummonerEntries = async (id: string) => {
  try {
    const res = await axios.post('/api/getSummonerEntries', {
      data: {
        id,
      },
    });

    return res.data.result;
  } catch (err) {
    throw err;
  }
};

export { getSummonerInfo, getSummonerEntries };
