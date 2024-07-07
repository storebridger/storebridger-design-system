import React from 'react';
import { FlashCard } from 'components/FlashCard';
import styled from 'styled-components';
import {
  useInternationalization,
  translations,
} from 'locales/useInternationalization';

interface CopyLinkProps {
  text: string | React.ReactNode;
}

export const CopyToClipboard: React.FC<CopyLinkProps> = ({ text }) => {
  const [success, setSuccess] = React.useState(false);
  const intl = useInternationalization();

  const clearSuccess = () => {
    setSuccess(false);
  };

  const handleCopyClick = () => {
    let contentToCopy = '';

    if (typeof text === 'string') {
      contentToCopy = text;
    } else {
      contentToCopy = JSON.stringify(text);
    }

    navigator.clipboard.writeText(contentToCopy);
    setSuccess(true);
  };

  return (
    <Span onClick={handleCopyClick}>
      {text}
      {success && typeof text === 'string' && (
        <FlashCard
          type="success"
          text={intl.t(translations.common.components.linkCopied)}
          timerInSeconds={1}
          onClose={clearSuccess}
        />
      )}
    </Span>
  );
};

const Span = styled.span`
  cursor: pointer;
`;
