export enum Spacing {
  S0 = '0rem',
  S1 = '0.1rem',
  S2 = '0.2rem',
  S4 = '0.4rem',
  S6 = '0.6rem',
  S8 = '0.8rem',
  S10 = '1.0rem',
  S12 = '1.2rem',
  S14 = '1.4rem',
  S16 = '1.6rem',
  S18 = '1.8rem',
  S20 = '2.0rem',
  S24 = '2.4rem',
  S32 = '3.2rem',
  S40 = '4.0rem',
  S48 = '4.8rem',
  S60 = '6.0rem',
  S64 = '6.4rem',
  S128 = '12.8rem',
  auto = 'auto',
}

export type SpacingType = keyof typeof Spacing;
