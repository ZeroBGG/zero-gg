import React, { useState } from 'react';
import { create } from 'zustand';
import { DuoType, FilterType } from '../../utils/DuoType';

const FilterRadio = (lolInfo: any) => {
  const [lolInfoFilterList, setLolInfoFilterList] = useState<any[]>([]);
  const [selectValue, setSelectValue] = useState<FilterType>({
    queue: '',
    tier: '',
    position: '',
  });

  const useStore = create((set) => {});

  return <></>;
};

export default FilterRadio;
