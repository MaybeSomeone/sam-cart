/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const repoBasePath = '/sam-cart'

const nextConfig = {
  output: 'export',
  basePath: isGithubPages ? repoBasePath : '',
  assetPrefix: isGithubPages ? repoBasePath : '',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
