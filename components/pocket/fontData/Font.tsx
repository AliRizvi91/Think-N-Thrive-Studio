// components/pocket/fontData/Fonts.tsx
import localFont from 'next/font/local';

// Jost font
export const Jost = localFont({
  src: [
    {
      path: '../../../public/fonts/jost/Jost-900-BlackItalic.otf',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/jost/Jost-900-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/jost/Jost-800-HevyItalic.otf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/jost/Jost-800-Hevy.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/jost/Jost-700-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/jost/Jost-700-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/jost/Jost-600-SemiItalic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/jost/Jost-600-Semi.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/jost/Jost-500-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/jost/Jost-500-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/jost/Jost-400-BookItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/jost/Jost-400-Book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/jost/Jost-300-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/jost/Jost-300-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/jost/Jost-200-ThinItalic.otf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/jost/Jost-200-Thin.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/jost/Jost-100-HairlineItalic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/jost/Jost-100-Hairline.otf',
      weight: '100',
      style: 'normal',
    },
  ],
  variable: '--font-Jost',
  display: 'swap',
});

export const Ballet = localFont({
  src: [
    {
      path: '../../../public/fonts/ballet/BalletFont.ttf',
      style: 'normal',
    },
  ],
  variable: '--font-Ballet',
  display: 'swap',
});
