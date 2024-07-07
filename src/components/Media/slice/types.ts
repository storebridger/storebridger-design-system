export interface IImage {
  size: number;
  format: string;
  path: string;
  fileName: string;
}

export interface MediaState {
  isLoading: boolean;
  isDeleting: boolean;
  images: Array<IImage>;
  videos: Array<object>;
  error: any;
}
