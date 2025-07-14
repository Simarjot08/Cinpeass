
import './globals.css';
// import { AppProvider } from '@/context/appContext';
import LayoutWrapper from './component/atom/layoutwrapper';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;


export const metadata = {
  title: 'QuickSeat',
  description: 'Movie seat booking app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <AppProvider> */}
        <LayoutWrapper>{children}</LayoutWrapper>
        {/* </AppProvider> */}
      </body>
    </html>
  );
}