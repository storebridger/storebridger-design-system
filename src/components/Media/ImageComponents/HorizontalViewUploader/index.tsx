import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Radius } from 'constants/Radius';
import { Colors } from 'constants/Colors';
import { FontSize } from 'constants/FontSize';
import { Dimensions } from 'constants/Dimensions';
import { Screen } from 'constants/Screen';
import { localStore } from 'utils/localStore';
import { StorageVariable } from 'constants/storageVariables';
import {
  translations,
  useInternationalization,
} from 'locales/useInternationalization';
import { IconV2 } from 'components/Icon';
import { useMediaSlice } from '../../slice';
import {
  mediaDeletingSelector,
  mediaImagesSelector,
  mediaLoadingSelector,
} from '../../slice/selectors';
import { Image } from '../Image';
import { ImageUrlFormModal } from '../ImageUrlFormModal';
import { Text } from 'components/Typography';
import { Box } from 'components/Box';
import { ImageAssets } from 'assets/images/ImageAssets';

interface Props {
  showPlaceholders?: boolean;
  allowUrlUpload?: boolean;
  error?: boolean;
  setError?: React.Dispatch<React.SetStateAction<boolean>>;
}

// Always remember to clean up with the line below where ever this component is used
// dispatch(mediaAction.clearImages());
// Check example here src/app/pages/product/CreateProduct/components/Media.tsx

export const HorizontalViewUploader = ({
  showPlaceholders,
  allowUrlUpload,
  error,
  setError,
}: Props) => {
  const { actions: mediaAction } = useMediaSlice();
  const intl = useInternationalization();
  const isUploading = useSelector(mediaLoadingSelector);
  const isDeleting = useSelector(mediaDeletingSelector);
  const images = useSelector(mediaImagesSelector);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const placeholders = [
    { value: ImageAssets.UPLOAD_FRONT_VIEW, label: 'Front View' },
    { value: ImageAssets.UPLOAD_SIDE_VIEW, label: 'Side View' },
    { value: ImageAssets.UPLOAD_BACK_VIEW, label: 'Back View' },
    { value: ImageAssets.UPLOAD_OTHER_VIEW, label: 'Other View' },
  ];
  const [urlFormOpen, setUrlFormOpen] = React.useState(false);
  const [disableLeftArrow, setDisableLeftArrow] = React.useState(true);
  const [disableRightArrow, setDisableRightArrow] = React.useState(true);
  const [currentDeletingImage, setCurrentDeletingImage] = React.useState<
    string | null
  >(null);
  const [maxError, setMaxError] = useState(false);
  const mediaLineRef = React.useRef<any>(null);
  const dispatch = useDispatch();
  const uploadImage = (files: FileList) => {
    if (images.length + files.length <= 5) {
      const formData = new FormData();
      for (const key of Object.keys(files)) {
        formData.append('image', files[key]);
      }

      setError && setError(false);
      setMaxError(false);
      dispatch(mediaAction.uploadImage({ formData }));
    } else {
      setError && setError(false);
      setMaxError(true);
    }
  };

  const visiblePlaceholder = React.useMemo(() => {
    if (images.length > placeholders.length) return [];
    else return placeholders.slice(images.length);
    // eslint-disable-next-line
  }, [images.length]);

  const deleteImage = (fileName: string) => {
    setCurrentDeletingImage(fileName);
    const formData = { imageUrl: fileName };

    setError && setError(false);
    setMaxError(false);

    dispatch(mediaAction.deleteImage({ formData }));
  };

  const handleHorizontalScroll = React.useCallback(
    (element: any, speed: number, distance: number, step: number) => {
      let scrollAmount = 0;
      const slideTimer = setInterval(() => {
        element.scrollLeft += step;
        scrollAmount += Math.abs(step);
        if (scrollAmount >= distance) {
          clearInterval(slideTimer);
        }
        if (element.scrollLeft === 0) {
          setDisableLeftArrow(true);
        } else {
          setDisableLeftArrow(false);
        }
      }, speed);
    },
    // eslint-disable-next-line
    [mediaLineRef.current],
  );

  React.useEffect(() => {
    const images = localStore.getItem(StorageVariable.MEDIA_IMAGES);
    if (images) dispatch(mediaAction.setImages(images));
    // eslint-disable-next-line
  }, []);

  React.useLayoutEffect(() => {
    const screenWidth = window.innerWidth;
    const desktopOverflow =
      screenWidth > Screen.MEDIUMPLUS && images.length >= 4;
    const mobileOverflow =
      screenWidth < Screen.MEDIUMPLUS && images.length >= 2;

    if (desktopOverflow || mobileOverflow) {
      setDisableRightArrow(false);
    } else {
      setDisableRightArrow(true);
      setDisableLeftArrow(true);
    }
    // eslint-disable-next-line
  }, [images.length]);

  return (
    <React.Fragment>
      <MediaLine ref={mediaLineRef}>
        <ImageRow>
          {!disableLeftArrow && (
            <PreviousIcon
              onClick={() => {
                handleHorizontalScroll(mediaLineRef.current, 25, 500, -10);
              }}
            >
              <IconV2 name="arrow-left-circle" size="D24" color="PURPLE500" />
            </PreviousIcon>
          )}

          <UploadTrigger
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            <Image
              src={ImageAssets.ADD_IMAGE}
              width={Dimensions.D32}
              height={Dimensions.D32}
            />
            <Label> {intl.t(translations.common.components.uploadImage)}</Label>
            {allowUrlUpload && (
              <React.Fragment>
                <LabelOr> {intl.t(translations.common.or)}</LabelOr>
                <UrlLabel
                  onClick={e => {
                    setUrlFormOpen(true);
                    e.stopPropagation();
                  }}
                >
                  {intl.t(translations.common.components.addFromUrl)}
                </UrlLabel>
              </React.Fragment>
            )}
            {isUploading && (
              <Overlay>
                <ProgressIndicator value={10} color="dark" />
              </Overlay>
            )}

            <input
              type="file"
              ref={fileInputRef}
              multiple={true}
              hidden
              max={5}
              accept="image/*"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const files = event.target.files;
                if (files && files.length > 0) {
                  uploadImage(files);
                }
              }}
            />
          </UploadTrigger>

          {images.length > 0 &&
            images.map(image => (
              <ImageCard key={image.fileName}>
                <Image src={image.path} objectFit="cover" radius={Radius.R4} />
                {isDeleting && image.fileName === currentDeletingImage ? (
                  <Overlay />
                ) : (
                  <CancelIcon onClick={() => deleteImage(image.fileName)}>
                    <IconV2 name="x-circle" size="D24" color="GRAY500" />
                  </CancelIcon>
                )}
              </ImageCard>
            ))}

          {showPlaceholders &&
            visiblePlaceholder.map((placeholder, index) => (
              <ImageCard key={index} borderRadius>
                <Image
                  src={placeholder.value}
                  objectFit="cover"
                  radius={Radius.R4}
                />
                <Box paddingBottom="S2">
                  <Text size="F12">{placeholder.label}</Text>
                </Box>
              </ImageCard>
            ))}
          {!disableRightArrow && (
            <NextIcon
              onClick={() => {
                handleHorizontalScroll(mediaLineRef.current, 25, 100, 10);
              }}
            >
              <IconV2 name="arrow-right-circle" size="D24" color="PURPLE500" />
            </NextIcon>
          )}
        </ImageRow>
      </MediaLine>
      {urlFormOpen && (
        <ImageUrlFormModal onClose={() => setUrlFormOpen(false)} overlayClose />
      )}
      {error && (
        <ErrorWrapper>
          <ErrorText>{intl.t(translations.common.components.error)}</ErrorText>
        </ErrorWrapper>
      )}
      {maxError && (
        <ErrorWrapper>
          <ErrorText>
            {intl.t(translations.common.components.maxImageError)}
          </ErrorText>
        </ErrorWrapper>
      )}
    </React.Fragment>
  );
};

const MediaLine = styled.div`
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
  max-width: 100%;
  position: relative;
`;
const ImageRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  width: fit-content;
  min-width: 500px;
  height: 12rem;
`;

const UploadTrigger = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: ${Radius.R6};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed ${Colors.PRIMARY};
  background-color: ${({ theme }) => theme.color.background};
  position: relative;
`;

const ScrollArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.background};
  width: 3rem;
  height: 12rem;
  z-index: 1000;
`;
const NextIcon = styled(ScrollArrow)`
  position: sticky;
  top: -1rem;
  right: 0;
`;
const PreviousIcon = styled(ScrollArrow)`
  position: sticky;
  top: -1rem;
  left: 0;
`;
const ImageCard = styled.div<{ borderRadius?: boolean }>`
  width: 10rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${({ theme }) => theme.color.inputBackground};
  ${({ borderRadius }) => borderRadius && `border-radius: 5px`};
`;

const CancelIcon = styled.span`
  border-radius: ${Radius.R10};
  position: absolute;
  top: -1rem;
  right: -1rem;
  background-color: ${({ theme }) => theme.color.background};
`;

const Label = styled.span`
  text-align: center;
  color: ${({ theme }) => theme.color.blackText};
  font-size: ${FontSize.F10};
  font-weight: 400;
  line-height: 13.02px;
`;
const LabelOr = styled.span`
  color: ${Colors.GRAY500};
`;
const UrlLabel = styled.span`
  color: ${Colors.PURPLE500};
  text-decoration: underline;
  font-size: ${FontSize.F10};
  cursor: pointer;
`;

const ProgressIndicator = styled(Progress)`
  opacity: 0.8;
  width: 100%;
  height: 0.7rem;
  border-radius: 2rem;

  .progress-bar {
    border-radius: 0.45rem;
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0);
  height: 100%;
  padding: 0 1rem;
  width: 100%;
  transition: 0.5s ease;
  border-radius: ${Radius.R6};
  display: flex;
  background: rgba(0, 0, 0, 0.5); /* Black see-through */
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.small`
  color: ${Colors.RED500};
  font-size: ${Dimensions.D10};
`;

const ErrorWrapper = styled.div`
  padding-left: 5px;
  padding-top: 2px;
`;
