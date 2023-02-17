export const liVarients = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0 },
};

export const boxVarients = {
  out: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

export const openSideBarVaritent = {
  initial: {
    width: 0,
  },
  open: {
    width: 450,
  },
};

export const closeSideBarVaritent = {
  close: {
    width: 450,
  },
  initial: {
    width: 0,
  },
};
