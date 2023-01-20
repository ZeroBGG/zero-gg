import axios from 'axios';
import { VERSION } from '@/constants/url';

const getSpell = async () => {
  try {
    const res = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/en_US/summoner.json`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export { getSpell };
