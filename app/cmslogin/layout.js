import { Noto_Sans_Devanagari } from 'next/font/google';
import "./login.css";
const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export default function LoginLayout({ children }) {
  return (
    <html lang="en">
      <body className={notoSansDevanagari.className}>
          {children}
      </body>
    </html>
  );
}
