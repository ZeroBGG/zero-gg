import axios from 'axios';
import { URL_LOL, URL_RIOT } from '@/constants/url';

const getSummonerInfo = async (name: string) => {
  try {
    const res = await axios.post('/api/getSummonerInfo', {
      data: {
        name,
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

const getSummonerEntries = async (id: string) => {
  try {
    const res = await axios.post('/api/getSummonerEntries', {
      data: {
        id,
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

export { getSummonerInfo, getSummonerEntries };
