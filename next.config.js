module.exports = {
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
