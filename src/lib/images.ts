import dam from '../assets/images/dam.webp';
import lakeDawn from '../assets/images/lake-dawn.webp';
import lakeMorning from '../assets/images/lake-morning.webp';
import lakeNight from '../assets/images/lake-night.webp';
import lodgeCutaway from '../assets/images/lodge-cutaway.webp';

/* the paintings, one per page; each chapter link borrows the picture of the page it opens */
export const images = { dam, lakeDawn, lakeMorning, lakeNight, lodgeCutaway };

export const pageImage = {
  home: lakeDawn,
  services: lakeMorning,
  night: lakeNight,
  beavers: dam,
  lodge: lodgeCutaway,
  contact: lakeMorning
} as const;

/* the small pictures in the index and in the next-chapter links */
export const thumbFor = {
  home: lakeDawn,
  services: lakeDawn,
  night: lakeNight,
  beavers: dam,
  lodge: lodgeCutaway,
  contact: lakeMorning
} as const;
