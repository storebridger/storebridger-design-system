import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import { apiCall } from 'utils/axios';
import { mediaAction } from './index';

function* uploadImage(data) {
  yield delay(500);
  try {
    const { formData } = data.payload;

    const response = yield call(apiCall, {
      method: 'POST',
      route: '/images',
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    yield put(mediaAction.setImages(response.content));
    yield put(mediaAction.setIsLoading(false));
  } catch (error: any) {
    yield put(mediaAction.setIsLoading(false));
    yield put(mediaAction.setError(error.data));
  }
}

function* deleteImage(data) {
  yield delay(500);
  try {
    const { formData } = data.payload;

    yield call(apiCall, {
      method: 'POST',
      route: '/images/delete',
      body: formData,
    });

    yield put(mediaAction.setRemovedImage(formData.imageUrl));
    yield put(mediaAction.setIsLoading(false));
    yield put(mediaAction.setIsDeleting(false));
  } catch (error: any) {
    yield put(mediaAction.setIsLoading(false));
    yield put(mediaAction.setError(error.data));
    yield put(mediaAction.setIsDeleting(false));
  }
}

export default function* mediaSaga() {
  yield all([
    takeLatest(mediaAction.uploadImage.type, uploadImage),
    takeLatest(mediaAction.deleteImage.type, deleteImage),
  ]);
}
