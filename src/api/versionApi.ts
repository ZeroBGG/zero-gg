import axios from 'axios';

const getVersion = async () => {
  try {
    const res = await axios.get(`https://ddragon.leagueoflegends.com/api/versions.json`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export { getVersion };
