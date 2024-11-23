/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')],
    logger: {
      warn: (message) => {
        if (message.includes('legacy-js-api')) return;
        console.warn(message);
      }
    }
  }
};

module.exports = nextConfig; 