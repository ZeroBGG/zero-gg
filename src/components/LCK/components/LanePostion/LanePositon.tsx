import React from 'react';

const ICON_URL = 'src/assets/icons/lane';
const icons = [
  { name: 'JGL', url: 'Jungle.svg' },
  { name: 'BOT', url: 'Bottom.svg' },
  { name: 'SPT', url: 'Support.svg' },
  { name: 'TOP', url: 'Top.svg' },
  { name: 'MID', url: 'Middle.svg' },
];
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
