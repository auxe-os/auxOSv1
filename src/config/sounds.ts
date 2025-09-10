// src/config/sounds.ts

const SOUND_ASSETS = {
  readonly IPOD_CLICK_WHEEL: "/sounds/WheelsOfTime.m4a",
} as const;

export const SOUNDS = {
  ...SOUND_ASSETS,
  MENU_SELECT: SOUND_ASSETS.CHORD_SUCCESS,
} as const;