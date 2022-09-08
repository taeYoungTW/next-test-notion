/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['dummyjson.com'],
	},
	async rewrites() {
		return [
			{
				source: '/og',
				destination: 'https://leeporter.tistory.com/19',
			},
		];
	},
};

module.exports = nextConfig;
