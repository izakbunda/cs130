export const PetFactory = (variant, level) => {
    let petImage = '';
    let isSpecial = false;
  
    if (level >= 0 && level <= 8) {
      petImage = `../../public/${variant}A.png`;
    } else if (level >= 9 && level <= 12) {
      petImage = `../../public/${variant}B.png`;
    } else if (level >= 13) {
      petImage = `../../public/${variant}C.png`;
      isSpecial = true; // special behavior tbd -- maybe powers? idk
    }
  
    return { petImage, isSpecial };
  };
  