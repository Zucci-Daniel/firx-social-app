
import { useRef } from 'react';
//custom hooks to toggle bottomsheets
export const useToggleSheet = () => {
  const sheet = useRef(null);

  const toggleBottomSheet = () => sheet.current.show();
  const hideBottomSheet = () => sheet.current.close();

  return {
    sheet,
    toggleBottomSheet,
    hideBottomSheet,
  };
};
