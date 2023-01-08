import axios from 'axios';
import dotenv from 'dotenv';

const getChampion = async () => {
  const res = await axios.get('https://ddragon.leagueoflegends.com/cdn/12.23.1/data/ko_KR/champion.json');

  return res.data;
};

const getRotationChampion = async () => {
  const res = await axios.get(
    `https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${import.meta.env.VITE_RIOT_API_KEY}`,
  );

  return res.data;
};

export { getChampion, getRotationChampion };
