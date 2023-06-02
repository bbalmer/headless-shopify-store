import { AppWrapper } from '../state.js';
import '../globals.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyHeadlessApp({ Component, pageProps }) {
    return (
        <AppWrapper>
            <Component {...pageProps} />
        </AppWrapper>
    );
}