const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  images: {
    domains: [
      "img.youtube.com",
      "i.postimg.cc",
      "ibb.co",
      "www.google.com.bd",
      "th.bing.com",
      "docs.nestjs.com",
      "res.cloudinary.com",
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/dashboard",
  //       destination: "/dashboard/student",
  //       permanent: false,
  //     },
  //   ];
  // },
});
