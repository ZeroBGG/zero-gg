import { icons } from '@/data/position';
import { ICON_URL } from './constant';

interface PositionType {
  position: string;
}
const LanePositon = ({ position }: PositionType) => {
  return (
    <div>
      {icons.map((p, index) => {
        if (position === p.name)
          return (
            <div key={`${p.name}_${index}`}>
              <img src={`${ICON_URL}/${p.url}`} alt="position" />
            </div>
          );
      })}
    </div>
  );
};

export default LanePositon;
