import axios from 'axios';
import { URL_LOL, URL_RIOT, VERSION } from '@/constants/url';

const getChampion = async () => {
  try {
    const res = await axios.get(`${URL_LOL}/cdn/${VERSION}/data/ko_KR/champion.json`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getRotationChampion = async () => {
  try {
    const res = await axios.get(
      `${URL_RIOT}/lol/platform/v3/champion-rotations?api_key=${import.meta.env.VITE_RIOT_API_KEY}`,
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export { getChampion, getRotationChampion };
