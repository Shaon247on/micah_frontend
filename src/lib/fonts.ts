import localFont from 'next/font/local';

export const barlowCondensed = localFont({
  src: [
    {
      path: '../../public/fonts/BarlowCondensed-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/BarlowCondensed-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],

  variable: '--font-barlow-condensed',
  display: 'swap',
});