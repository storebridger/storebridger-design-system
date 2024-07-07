import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from 'constants/Colors';
import { FontSize } from 'constants/FontSize';
import { Dimensions, DimensionType } from 'constants/Dimensions';
import { Radius } from 'constants/Radius';
import UploadIcon from 'assets/icons/specials/add-image.svg';
import { Box } from 'components/Box';
import { Icon } from 'components/Icon';
import { localStore } from 'utils/localStore';
import { StorageVariable } from 'constants/storageVariables';
import {
  translations,
  useInternationalization,
} from 'locales/useInternationalization';
import { Image } from '../Image';
import { ImageUrlFormModal } from '../ImageUrlFormModal';
import { useMediaSlice } from '../../slice';
import {
  mediaDeletingSelector,
  mediaImagesSelector,
  mediaLoadingSelector,
} from '../../slice/selectors';

interface Props {
  height?: DimensionType;
  width?: DimensionType;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  center?: boolean;
  allowUrlUpload?: boolean;
}

// Always remember to clean up with the line below where ever this component is used
// dispatch(mediaAction.clearImages());
// Check example here src/app/pages/product/CreateProduct/components/Media.tsx

export const SingleViewUploader = ({
  height,
  width,
  objectFit,
  center,
  allowUrlUpload,
}: Props) => {
  const intl = useInternationalization();
  const { actions: mediaAction } = useMediaSlice();
  const dispatch = useDispatch();
  const isUploading = useSelector(mediaLoadingSelector);
  const isDeleting = useSelector(mediaDeletingSelector);
  const mediaImages = useSelector(mediaImagesSelector);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [urlFormOpen, setUrlFormOpen] = React.useState(false);

  const uploadImage = (files: FileList) => {
    const formData = new FormData();
    formData.append('image', files[0]);

    dispatch(mediaAction.uploadImage({ formData }));
  };

  const deleteImage = (fileName: string) => {
    const formData = { imageUrl: fileName };
    dispatch(mediaAction.deleteImage({ formData }));
  };

  React.useEffect(() => {
    const images = localStore.getItem(StorageVariable.MEDIA_IMAGES);
    if (images) dispatch(mediaAction.setImages(images));
    // eslint-disable-next-line
  }, []);

  if (mediaImages.length > 0) {
    const latestUpload = mediaImages[0];
    return (
      <UploadDiv height={height} width={width} center={center}>
        <RelativeBox width="full" height="full" objectFit={objectFit}>
          <Image src={latestUpload?.path as string} width={Dimensions.full} />
          {isDeleting ? (
            <Overlay />
          ) : (
            <CancelIcon
              onClick={() => deleteImage(latestUpload?.fileName as string)}
            >
              <Icon iconName="x-circle" size="D24" color="GRAY700" />
            </CancelIcon>
          )}
        </RelativeBox>
      </UploadDiv>
    );
  }

  return (
    <UploadDiv
      onClick={() => {
        fileInputRef.current?.click();
      }}
    >
      <Box width="D50" height="D50">
        <Image src={UploadIcon} />
      </Box>
      <UploadText>Upload Image</UploadText>
      <UploadDescription>
        {intl.t(translations.common.components.imageUploadText)}
      </UploadDescription>
      {allowUrlUpload && (
        <React.Fragment>
          <LabelOr>{intl.t(translations.common.or)}</LabelOr>
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
        accept="image/*"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const files = event.target.files;
          if (files && files.length > 0) {
            uploadImage(files);
          }
        }}
      />
      {urlFormOpen && (
        <ImageUrlFormModal onClose={() => setUrlFormOpen(false)} />
      )}
    </UploadDiv>
  );
};

type UploadDivProps = Pick<Props, 'height' | 'width' | 'objectFit' | 'center'>;
const UploadDiv = styled.div<UploadDivProps>`
  border: 1px dashed ${Colors.GRAY500};
  border-radius: 5px;
  ${({ width }) => (width ? `width: ${Dimensions[width]};` : 'width: 100%;')}
  ${({ height }) => height && `height: ${Dimensions[height]};`}
  ${({ center }) => center && 'margin-left: auto; margin-right: auto;'}
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  padding: 1.6rem;
  position: relative;
`;

const RelativeBox = styled(Box)<UploadDivProps>`
  width: 100%;
  height: 100%;
  position: relative;
  ${({ objectFit }) => objectFit && `object-fit:${objectFit};`}
`;

const UploadText = styled.span`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.color.blackText};
`;

const UploadDescription = styled.span`
  max-width: 28rem;
  text-align: center;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.text};
`;

const CancelIcon = styled.span`
  border-radius: ${Radius.R10};
  position: absolute;
  top: -1rem;
  right: -1rem;
  background: white;
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

const LabelOr = styled.span`
  color: ${({ theme }) => theme.color.text};
`;

const UrlLabel = styled.span`
  color: ${Colors.PURPLE500};
  text-decoration: underline;
  font-size: ${FontSize.F14};
  cursor: pointer;
`;
