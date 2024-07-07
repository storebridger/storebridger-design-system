import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Text, Image } from 'components';
import { gapi } from 'gapi-script';
import GoogleIcon from 'assets/icons/specials/google.svg';
import { Button } from '../Main';
import styled from 'styled-components';

interface Props {
  handleSuccess: (response: any) => Promise<void>;
  handleError: (error: any) => void;
  buttonText: string;
}

const { REACT_APP_GOOGLE_CLIENT_ID } = import.meta.env;
export const GoogleSigninBtn = React.memo(
  ({ handleSuccess, handleError, buttonText }: Props) => {
    React.useEffect(() => {
      const initClient = () => {
        gapi.client.init({
          clientId: REACT_APP_GOOGLE_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/cloud-platform',
        });
      };
      gapi.load('client:auth2', initClient);
    });

    const responseSuccess = async (response: any) => {
      await handleSuccess(response);
    };

    const responseError = error => {
      handleError(error);
    };

    const login = useGoogleLogin({
      onSuccess: responseSuccess,
      onError: responseError,
    });

    return (
      <Button onClick={() => login()} type="authButton" height="D50">
        <GoogleCustomIcon>
          <Image src={GoogleIcon} />
        </GoogleCustomIcon>
        <Text size="F12">{buttonText}</Text>
      </Button>
    );
  },
);

const GoogleCustomIcon = styled.div`
  width: 2.4rem;
  height: 2.4rem;
`;
