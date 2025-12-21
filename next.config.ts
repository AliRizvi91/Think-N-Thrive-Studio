/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return [
      { source: "/", destination: "/with-nav-footer/home" },
      { source: "/about", destination: "/with-nav-footer/about" },
      { source: "/contact", destination: "/with-nav-footer/contact" },
      { source: "/courses", destination: "/with-nav-footer/courses" },
      { source: "/admission", destination: "/with-nav-footer/admission" },
      { source: "/authenticate", destination: "/with-nav-footer/authenticate" },
      { source: "/course/:id", destination: "/with-nav-footer/course/:id" },
      { source: "/verification", destination: "/no-nav-footer/verify-email" },
      { source: "/profile", destination: "/with-nav-footer/profile" },
      { source: "/details", destination: "/with-nav-footer/details" },
      { source: "/faqs", destination: "/with-nav-footer/faqs" },
      { source: "/admin-course", destination: "/with-nav-footer/adminCourse" },
    ];
  },
};

export default nextConfig;
