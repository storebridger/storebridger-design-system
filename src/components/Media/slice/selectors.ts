import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/RootState';
import { mediaInitialState } from './index';
import { IImage, MediaState } from './types';

const selector = (state: RootState) => state.media || mediaInitialState;

export const mediaLoadingSelector = createSelector(
  selector,
  (state: MediaState): boolean => state.isLoading,
);
export const mediaDeletingSelector = createSelector(
  selector,
  (state: MediaState): boolean => state.isDeleting,
);
export const mediaImagesSelector = createSelector(
  selector,
  (state: MediaState): IImage[] => state.images,
);
