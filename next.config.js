/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['www.gravatar.com', 'res.cloudinary.com', process.env.NEXT_PUBLIC_DOMAIN] 
  }
}

