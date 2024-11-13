// next.config.mjs
// 2 ภาษา
// import createNextIntlPlugin from 'next-intl/plugin'
// const withNextIntl = createNextIntlPlugin('./i18n.ts', {
//   static: true,
// })

// const nextConfig = {
//     // async redirects() {
//     //     return [
//     //       {
//     //         source: '/',
//     //         destination: '/home',
//     //         permanent: true,
//     //       },
//     //     ];
//     //   },
//       images: {
//         domains: ['courses-online-api.devsriwararak.com'],
//       },
//       i18n: {
//         locales: ['th', 'en'],
//         defaultLocale: 'th',
//       },
// };



// export default withNextIntl(nextConfig);

// next.config.mjs

/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts', {
  static: true,
});

const nextConfig = {
  images: {
    domains: ['courses-online-api.devsriwararak.com'],
  },
};

export default withNextIntl(nextConfig);
