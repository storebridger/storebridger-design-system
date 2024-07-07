import { Colors } from './Colors';

export enum FontSize {
  F8 = '0.8rem',
  F10 = '1rem',
  F12 = '1.2rem',
  F14 = '1.4rem',
  F16 = '1.6rem',
  F18 = '1.8rem',
  F20 = '2rem',
  F22 = '2.2rem',
  F24 = '2.4rem',
  F32 = '3.2rem',
}

export type FontSizeKey = keyof typeof Colors;
