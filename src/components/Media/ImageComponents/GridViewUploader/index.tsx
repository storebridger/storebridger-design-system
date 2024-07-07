import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from 'constants/Colors';
import { Radius } from 'constants/Radius';
import { Box } from 'components/Box';
import { Icon } from 'components/Icon';
import UploadImageIcon from 'assets/icons/specials/add-image-blue.svg';
import UploadIcon from 'assets/icons/specials/add-image.svg';
import { localStore } from 'utils/localStore';
import { StorageVariable } from 'constants/storageVariables';
import { useMediaSlice } from '../../slice';
import { Image } from '../Image';
import {
  mediaDeletingSelector,
  mediaImagesSelector,
  mediaLoadingSelector,
} from '../../slice/selectors';
import {
  translations,
  useInternationalization,
} from 'locales/useInternationalization';
import { FontSize } from 'constants/FontSize';
import { ImageUrlFormModal } from '../ImageUrlFormModal';

interface Props {
  allowUrlUpload?: boolean;
}

// Always remember to clean up with the line below where ever this component is used
// dispatch(mediaAction.clearImages());
// Check example here src/app/pages/product/CreateProduct/components/Media.tsx

export const GridViewUploader = ({ allowUrlUpload }: Props) => {
  const intl = useInternationalization();
  const { actions: mediaAction } = useMediaSlice();
  const dispatch = useDispatch();
  const isUploading = useSelector(mediaLoadingSelector);
  const isDeleting = useSelector(mediaDeletingSelector);
  const imagesFromState = useSelector(mediaImagesSelector);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const fileInputRef2 = React.useRef<HTMLInputElement>(null);
  const [urlFormOpen, setUrlFormOpen] = React.useState(false);
  const [currentDeletingImage, setCurrentDeletingImage] = React.useState<
    string | null
  >(null);
  const uploadImage = (files: FileList) => {
    const formData = new FormData();
    for (const key of Object.keys(files)) {
      formData.append('image', files[key]);
    }

    dispatch(mediaAction.uploadImage({ formData }));
  };

  const deleteImage = (fileName: string) => {
    setCurrentDeletingImage(fileName);
    const formData = { imageUrl: fileName };

    dispatch(mediaAction.deleteImage({ formData }));
  };

  React.useEffect(() => {
    const images = localStore.getItem(StorageVariable.MEDIA_IMAGES);
    if (images) dispatch(mediaAction.setImages(images));
    // eslint-disable-next-line
  }, []);

  if (imagesFromState.length > 0) {
    return (
      <Box flexDirection="row" gap="S16" isResponsiveRow>
        {imagesFromState.length > 0 &&
          imagesFromState.map((image, index) => (
            <ImageSquare key={image.fileName}>
              <Image src={image.path} objectFit="cover" />
              {isDeleting && currentDeletingImage === image.fileName ? (
                <Overlay />
              ) : (
                <CancelIcon onClick={() => deleteImage(image.fileName)}>
                  <Icon iconName="x-circle" size="D24" color="GRAY600" />
                </CancelIcon>
              )}
            </ImageSquare>
          ))}
        <MiniImageTrigger
          onClick={() => {
            fileInputRef2.current?.click();
          }}
        >
          <Image src={UploadImageIcon} />
          <input
            type="file"
            ref={fileInputRef2}
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
        </MiniImageTrigger>
      </Box>
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

const UploadDiv = styled.div`
  border: 1px dashed ${Colors.GRAY500};
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  padding: 2rem;
  position: relative;
`;

const UploadText = styled.span`
  font-size: 1.8rem;
  ${({ theme }) => theme.color.blackText};
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

const ImageSquare = styled.div`
  width: 6rem;
  height: 6rem;
  position: relative;
`;

const MiniImageTrigger = styled.div`
  width: 6rem;
  height: 6rem;
  padding: 1rem;
  border: 1px dashed ${Colors.GRAY500};
  border-radius: 5px;
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
