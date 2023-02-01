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
    const res = await axios.get('api/getRotationChampion');
    return res.data.result;
  } catch (err) {
    console.log(err);
  }
};

export { getChampion, getRotationChampion };
