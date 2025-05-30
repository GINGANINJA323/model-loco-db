import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const domNode = document.getElementById('root');

if (!domNode) {
    console.log('No domNode!');
} else {
    const root = createRoot(domNode);
    root.render(<App />);
}
