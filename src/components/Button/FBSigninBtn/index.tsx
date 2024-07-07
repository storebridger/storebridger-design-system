// import React from 'react';
// import {
//   ReactFacebookFailureResponse,
//   ReactFacebookLoginInfo,
// } from 'react-facebook-login';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
// // import { ReactComponent as FBIcon } from 'assets/icons/svgs/facebook.svg';
// // import { Text } from 'components/Typography';
// import { Button } from '../Main';
//
// interface Props {
//   handleSuccess: (
//     response: ReactFacebookLoginInfo | ReactFacebookFailureResponse,
//   ) => Promise<void>;
//   handleError: (error: any) => void;
//   buttonText: string;
// }
//
// export const FBSigninBtn = React.memo(
//   ({ handleSuccess, handleError, buttonText }: Props) => {
//     const responseSuccess = async (
//       response: ReactFacebookLoginInfo | ReactFacebookFailureResponse,
//     ) => {
//       if (response.status) {
//         handleError('An error occured using facebook login please try again');
//       } else {
//         await handleSuccess(response);
//       }
//     };
//
//     const responseError = (response: ReactFacebookFailureResponse) => {
//       handleError(response);
//     };
//
//     return (
//       <FacebookLogin
//         appId={'207197307157990'}
//         fields="name,email,picture,first_name,last_name"
//         scope="public_profile"
//         render={renderProps => (
//           <Button onClick={renderProps.onClick} type="outline" disabled>
//             {/* TO DO - facebook oauth - uncomment the codes below */}
//             {/* <FBIcon /> */}
//             {/* <Text size="F12">{buttonText}</Text> */}
//           </Button>
//         )}
//         callback={responseSuccess}
//         onFailure={responseError}
//       />
//     );
//   },
// );

export const FBSigninBtn = () => {
  return <div></div>;
};
