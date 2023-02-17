import Accordian from '../Accordion/Accordion';
import { ACCODIAN_CATEGORY } from '@/data/filterCategory';
const SideBar = () => {
  return (
    <>
      <Accordian title={ACCODIAN_CATEGORY.MONTH} />
      <Accordian title={ACCODIAN_CATEGORY.TEAM} />
    </>
  );
};

export default SideBar;
