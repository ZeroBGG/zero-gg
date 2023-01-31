import { ListProps, PlayerListType } from '../../../typings';
import Player from '../Player/Player';
import styles from './List.module.scss';
import { useMyTeam } from '@/components/LCK/Zustand/useMyTeam';
import SkeletonProfile from '../../Skeleton/SkeletonProfile';

interface ListType {
  isLoading: boolean;
  teams: ListProps[];
}

const List = ({ isLoading, teams }: ListType) => {
  const { myteam, getTeam } = useMyTeam();
  return (
    <>
      <div className={styles.team_info}>
        <div className={styles.team_info_list}>
          {isLoading
            ? new Array(6).fill(1).map((_, i) => {
                return <SkeletonProfile key={i} />;
              })
            : teams?.map((team: ListProps | any) =>
                team.players?.map((player: PlayerListType, idx: number) => {
                  if (team.id === myteam)
                    return (
                      <div className={styles.card} key={`${player.id}_${idx}a`}>
                        <Player
                          name={player.korName}
                          summoner={player.summoner}
                          image={player.image}
                          position={player.position}
                          logo={team.logo}
                          captain={player.captain}
                          Loading={isLoading}
                          KorName={player.korName}
                        />
                      </div>
                    );
                }),
              )}
        </div>
      </div>
    </>
  );
};

export default List;
