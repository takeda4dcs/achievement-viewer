/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: { // eslintのlint checkをbuild時にoff
        ignoreDuringBuilds: true,
    },
    output: 'export',
    compiler: { // production用にビルドする時にconsole.logを削除する
        removeConsole: process.env.NODE_ENV === 'production',
      },
};

export default nextConfig;
