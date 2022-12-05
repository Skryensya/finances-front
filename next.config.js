/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};
const withSass = require("@zeit/next-sass");
module.exports = withSass({
  cssModules: true,
});

module.exports = nextConfig;
