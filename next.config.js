module.exports = {
  experimental: {
    typedRoutes: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/indeed",
        permanent: true,
      },
    ];
  },
};
