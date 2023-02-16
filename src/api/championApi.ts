import axios from 'axios';
import { URL_LOL, URL_RIOT } from '@/constants/url';

import { storeVersion } from '@/store/store';

const getChampion = async (version) => {
  try {
    const res = await axios.get(`${URL_LOL}/cdn/${version}/data/ko_KR/champion.json`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getRotationChampion = async () => {
  try {
    const res = await axios.get('api/getRotationChampion');

    if (res.data.result.status?.status_code) {
      throw new Error(res.data.result.status.message);
    }

    return res.data.result;
  } catch (err) {
    console.log(err);
  }
};

export { getChampion, getRotationChampion };
