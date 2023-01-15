import { Routes, Route } from 'react-router-dom';

import Main from '@/pages/Main';
import Record from '@/pages/Record';
import Duo from '@/pages/Duo';
import LCK from '@/pages/LCK';
import NotFound from '@/pages/NotFound';

import DuoInfo from './components/Duo/DuoInfo/DuoInfo';

import Team from '@/components/LCK/components/Team/team_main/Team';
import Match from '@/components/LCK/components/Match/Match';
import PlayerList from './components/LCK/components/Team/PlayerList/PlayerList';
import Schedule from './components/LCK/components/Match/Schedule/Schedule';

export default function route() {
  return (
    <Routes>
      <Route path={'/'} element={<Main />} />
      <Route path={'/Record/:summonerId'} element={<Record />} />
      <Route path={'/Duo'} element={<Duo />} />

      <Route path={'/Duo/:id'} element={<DuoInfo />} />

      <Route path={'/lck'} element={<LCK />} />
      <Route path={'lck/team/'} element={<Team />}>
        <Route path={':team'} element={<PlayerList />} />
      </Route>
      <Route path={'lck/matches/'} element={<Match />}>
        <Route path={':month'} element={<Schedule isHover={false} />} />
      </Route>

      <Route path={'*'} element={<NotFound />} />
    </Routes>
  );
}
