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

  async redirects() {
    return [
      { source: "/", destination: "/with-nav-footer/home", permanent: false },
      { source: "/about", destination: "/with-nav-footer/about", permanent: false },
      { source: "/contact", destination: "/with-nav-footer/contact", permanent: false },
      { source: "/courses", destination: "/with-nav-footer/courses", permanent: false },
      { source: "/admission", destination: "/with-nav-footer/admission", permanent: false },
      { source: "/authenticate", destination: "/with-nav-footer/authenticate", permanent: false },
      { source: "/course/:id", destination: "/with-nav-footer/course/:id", permanent: false },
      { source: "/verification", destination: "/no-nav-footer/verify-email", permanent: false },
      { source: "/profile", destination: "/with-nav-footer/profile", permanent: false },
      { source: "/details", destination: "/with-nav-footer/details", permanent: false },
      { source: "/faqs", destination: "/with-nav-footer/faqs", permanent: false },
      { source: "/admin-course", destination: "/with-nav-footer/adminCourse", permanent: false },
    ];
  },
};

export default nextConfig;
