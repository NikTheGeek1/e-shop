/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "media.istockphoto.com",
      "img.ltwebstatic.com",
      "ae01.alicdn.com",
      "res.cloudinary.com",
      "assets.stickpng.com",
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "variables.scss";`,
  },
};

module.exports = nextConfig;
