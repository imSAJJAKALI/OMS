import type { Metadata } from 'next';
import './globals.css';
import Navbar from './(user)/components/Navbar';
import Footer from './(user)/components/Footer';

export const metadata: Metadata = {
  title: 'Next Auth App',
  description: 'Admin/User split layout',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
         {children}
        <Footer/>
      </body>
    </html>
  );
}
