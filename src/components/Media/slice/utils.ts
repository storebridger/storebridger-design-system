import { localStore } from 'utils/localStore';
import { StorageVariable } from 'constants/storageVariables';
import { IImage } from './types';

export const getMediaImages = () => {
  const images = localStore.getItem(StorageVariable.MEDIA_IMAGES);
  if (images) return images;

  return null;
};

export const updateImageList = (
  existingImagesList: IImage[],
  newImagesList: IImage[],
) => {
  if (existingImagesList.length === 0) return newImagesList;

  const existingTitles = existingImagesList.map(item => item.fileName);
  const appendableItems: IImage[] = [];
  for (let newItem of newImagesList) {
    if (!existingTitles.includes(newItem.fileName)) {
      appendableItems.push(newItem);
    }
  }

  return [...existingImagesList, ...appendableItems];
};
