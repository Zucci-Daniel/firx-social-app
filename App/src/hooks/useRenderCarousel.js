import {useRef} from '../imports/all_RnComponents';

//custom hooks to handle carousels
export const useRenderCarousel = () => {
  const carouselRef = useRef(null);

 
  return {
    carouselRef,
  };
};
