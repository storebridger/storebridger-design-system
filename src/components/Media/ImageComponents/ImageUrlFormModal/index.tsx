import React from 'react';
import { Modal } from 'components/Modal';
import { TextInput } from 'components/Form';
import { Box } from 'components/Box';
import { Header3 } from 'components/Typography';
import { Button } from 'components/Button';
import { useDispatch } from 'react-redux';
import { mediaAction } from '../../slice';
import {
  translations,
  useInternationalization,
} from 'locales/useInternationalization';

interface Props {
  onClose: () => void;
  overlayClose?: boolean;
}

export const ImageUrlFormModal = ({ onClose, overlayClose }: Props) => {
  const dispatch = useDispatch();
  const intl = useInternationalization();
  const [imageUrl, setImageUrl] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const onChange = e => {
    setImageUrl(e.target.value);
  };

  const urlIsValid = (url: string) => {
    // eslint-disable-next-line
    let regex =
      // eslint-disable-next-line
      /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)/i;
    return url.match(regex);
  };
  const addImage = () => {
    if (imageUrl === '' || !urlIsValid(imageUrl)) {
      setError(intl.t(translations.common.components.imageUrlInvalid));
      return;
    }
    const imageObject = {
      path: imageUrl,
      fileName: imageUrl,
      format: 'image/jpeg',
      size: 0,
    };
    dispatch(mediaAction.setImages([imageObject]));
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      isOverlay
      overLayClose={overlayClose}
      closeIcon
      headerComponent={
        <Header3 colorType="black">
          {intl.t(translations.common.components.addImageFromUrl)}
        </Header3>
      }
      minWidth="D360"
    >
      <Box paddingX="S24" gap="S24" paddingBottom="S32">
        <TextInput
          name="url"
          label="Image url"
          value={imageUrl}
          onChange={onChange}
          error={error}
        />
        <Button height="D50" type="secondary" onClick={addImage}>
          {intl.t(translations.common.components.addImage)}
        </Button>
      </Box>
    </Modal>
  );
};
