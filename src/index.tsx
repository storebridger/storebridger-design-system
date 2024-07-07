import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { App } from './app';
import reportWebVitals from './reportWebVitals';

const MOUNT_NODE = document.getElementById('root') as HTMLElement;
ReactDOMClient.createRoot(MOUNT_NODE!).render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
