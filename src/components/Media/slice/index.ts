import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { MediaState } from './types';
import mediaSaga from './saga';
import { localStore } from 'utils/localStore';
import { StorageVariable } from 'constants/storageVariables';
import { updateImageList } from './utils';

const initialState: MediaState = {
  isLoading: false,
  isDeleting: false,
  images: [],
  videos: [],
  error: null,
};

const slice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setIsLoading(state: MediaState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setIsDeleting(state: MediaState, action: PayloadAction<boolean>) {
      state.isDeleting = action.payload;
    },

    setError(state: MediaState, action: PayloadAction<any>) {
      state.error = action.payload;
      state.isLoading = false;
    },

    uploadImage(state: MediaState, _: PayloadAction<any>) {
      state.isLoading = true;
    },

    setImages(state: MediaState, action: PayloadAction<any>) {
      state.isLoading = false;
      state.images = updateImageList(state.images, action.payload);
      localStore.setItem(StorageVariable.MEDIA_IMAGES, state.images);
    },

    setNewImages(state: MediaState, action: PayloadAction<any>) {
      state.isLoading = false;
      state.images = action.payload;
      localStore.setItem(StorageVariable.MEDIA_IMAGES, state.images);
    },
    clearImages(state) {
      state.images = [];
      localStore.removeItem(StorageVariable.MEDIA_IMAGES);
    },

    setRemovedImage(state: MediaState, action: PayloadAction<any>) {},

    deleteImage(state: MediaState, action: PayloadAction<any>) {
      const { formData } = action.payload;
      state.images = state.images.filter(
        image => image.fileName !== formData.imageUrl,
      );
      localStore.setItem(StorageVariable.MEDIA_IMAGES, state.images);
      state.isDeleting = true;
    },
  },
});

const mediaAction = slice.actions;

const useMediaSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: mediaSaga });
  return { actions: slice.actions };
};

export { initialState as mediaInitialState, mediaAction, useMediaSlice };
