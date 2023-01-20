/* static 정보 */

const PERKS_IMAGE_PATH = 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles';

// 스펠 정보
type spellType = {
  [key: number]: string;
};

export const SPELL: spellType = {
  21: 'SummonerBarrier',
  1: 'SummonerBoost',
  14: 'SummonerDot',
  3: 'SummonerExhaust',
  4: 'SummonerFlash',
  6: 'SummonerHaste',
  7: 'SummonerHeal',
  13: 'SummonerMana',
  30: 'SummonerPoroRecall',
  31: 'SummonerPoroThrow',
  11: 'SummonerSmite',
  39: 'SummonerSnowURFSnowball_Mark',
  32: 'SummonerSnowball',
  12: 'SummonerTeleport',
  54: 'Summoner_UltBookPlaceholder',
  55: 'Summoner_UltBookSmitePlaceholder',
};

// 룬 정보
type perkType = {
  [key: number]: string;
};

export const PERKS: perkType = {
  8000: `${PERKS_IMAGE_PATH}/7201_Precision.png`,
  8100: `${PERKS_IMAGE_PATH}/7200_Domination.png`,
  8200: `${PERKS_IMAGE_PATH}/7202_Sorcery.png`,
  8300: `${PERKS_IMAGE_PATH}/7203_Whimsy.png`,
  8400: `${PERKS_IMAGE_PATH}/7204_Resolve.png`,
  8112: `${PERKS_IMAGE_PATH}/Domination/Electrocute/Electrocute.png`,
  8124: `${PERKS_IMAGE_PATH}/Domination/Predator/Predator.png`,
  8128: `${PERKS_IMAGE_PATH}/Domination/DarkHarvest/DarkHarvest.png`,
  9923: `${PERKS_IMAGE_PATH}/Domination/HailOfBlades/HailOfBlades.png`,
  8351: `${PERKS_IMAGE_PATH}/Inspiration/GlacialAugment/GlacialAugment.png`,
  8360: `${PERKS_IMAGE_PATH}/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png`,
  8369: `${PERKS_IMAGE_PATH}/Inspiration/FirstStrike/FirstStrike.png`,
  8005: `${PERKS_IMAGE_PATH}/Precision/PressTheAttack/PressTheAttack.png`,
  8008: `${PERKS_IMAGE_PATH}/Precision/LethalTempo/LethalTempoTemp.png`,
  8021: `${PERKS_IMAGE_PATH}/Precision/FleetFootwork/FleetFootwork.png`,
  8010: `${PERKS_IMAGE_PATH}/Precision/Conqueror/Conqueror.png`,
  8437: `${PERKS_IMAGE_PATH}/Resolve/GraspOfTheUndying/GraspOfTheUndying.png`,
  8439: `${PERKS_IMAGE_PATH}/Resolve/VeteranAftershock/VeteranAftershock.png`,
  8465: `${PERKS_IMAGE_PATH}/Resolve/Guardian/Guardian.png`,
  8214: `${PERKS_IMAGE_PATH}/Sorcery/SummonAery/SummonAery.png`,
  8229: `${PERKS_IMAGE_PATH}/Sorcery/ArcaneComet/ArcaneComet.png`,
  8230: `${PERKS_IMAGE_PATH}/Sorcery/PhaseRush/PhaseRush.png`,
};
