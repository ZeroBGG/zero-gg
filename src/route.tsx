import { Routes, Route } from 'react-router-dom';

import Main from '@/pages/Main';
import Record from '@/pages/Record';
import Duo from '@/pages/Duo';
import LCK from '@/pages/LCK';
import NotFound from '@/pages/NotFound';

import DuoInfo from './components/Duo/DuoInfo/DuoInfo';

import Team from '@/components/LCK/components/Team/team_main/Team';
import Match from '@/components/LCK/components/Match/Match';

export default function route() {
  return (
    <Routes>
      <Route path={'/'} element={<Main />} />
      <Route path={'/Record'} element={<Record />} />
      <Route path={'/Duo'} element={<Duo />} />

      <Route path={'/Duo/:id'} element={<DuoInfo />} />

      <Route path={'/LCK/*'} element={<LCK />} />
      <Route path={'LCK/team'} element={<Team />} />
      <Route path={'LCK/matches'} element={<Match />} />

      <Route path={'*'} element={<NotFound />} />
    </Routes>
  );
}
