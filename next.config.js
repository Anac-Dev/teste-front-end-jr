// next.config.js
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/proxy/:path*',
          destination: 'https://app.econverse.com.br/:path*', // Proxy para a API externa
        },
      ];
    },
  };
  