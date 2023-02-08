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

import styles from './route.module.scss';

export default function route() {
  return (
    <main className={styles.main}>
      <Routes>
        <Route path={'/'} element={<Main />} />

        <Route path={'/Record/:summonerId'} element={<Record />} />
        <Route path={'/Duo'} element={<Duo />} />

        <Route path={'/Duo'} element={<Duo />} />
        <Route path={'/Duo/:userId'} element={<DuoInfo />} />

        <Route path={'/lck'} element={<LCK />} />
        <Route path={'lck/team/'} element={<Team />}>
          <Route path={':team'} element={<PlayerList />} />
        </Route>
        <Route path={'lck/matches/'} element={<Match />}>
          <Route
            path={':month'}
            element={<Schedule isHover={false} limitCount={10} collectionName={'lck_matches'} />}
          />
        </Route>

        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </main>
  );
}
