// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: [
//       'source.unsplash.com',
//       'randomuser.me',
//       'i.pravatar.cc',
//       'picsum.photos',
//       'amaris.com',
//       'fugitives.com'
//     ],
//   }
// }

// module.exports = nextConfig


// module.exports = {
//   allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
// }




// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {


  images: {
        domains: [
          'source.unsplash.com',
          'randomuser.me',
          'i.pravatar.cc',
          'picsum.photos',
          'amaris.com',
          'fugitives.com'
        ],
      },
  allowedDevOrigins: [
    'http://172.20.10.11:3000', // утсаар нэвтрэх үед
    'http://localhost:3000',    // локал
  ],
};

module.exports = nextConfig;
