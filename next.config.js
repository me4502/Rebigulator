/** @type {import('next').NextConfig} */
const config = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
          },
        ],
        as: '*.js',
      },
    },
  },
  reactCompiler: true,
};

export default config;
