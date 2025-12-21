"use client"; // important if you use hooks
import React from 'react'
import CardNav from '../reactBits/CardNav'

function Navbar() {
  const Cards = [
    {
      label: "Main",
      bgColor: "#ffffff",
      textColor: "#000",
      links: [
        { label: "Home", ariaLabel: "Home Company", href: "/" },
        { label: "About", ariaLabel: "About Careers", href: "/about" },
        { label: "Contact", ariaLabel: "Contact Careers", href: "/contact" },
      ]
    },
    {
      label: "Projects", 
      bgColor: "#ffffff",
      textColor: "#000",
      links: [
        { label: "Courses", ariaLabel: "Projects", href: "/courses" },
        { label: "Admission", ariaLabel: "Admission", href: "/admission" },
        { label: "Authentication", ariaLabel: "Authentication", href: "/authenticate" }
      ]
    },
    {
      label: "Social Media",
      bgColor: "#ffffff", 
      textColor: "#000",
      links: [
        { label: "Facebook", ariaLabel: "Email us", href: "https://www.instagram.com/reel/DSH56oRDYSl/?igsh=em84dmJqOW45cWps" },
        { label: "Twitter", ariaLabel: "Twitter", href: "https://twitter.com" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://linkedin.com" }
      ]
    } ,
    {
      label: "Admission",
      bgColor: "#ffffff", 
      textColor: "#000",
      links: [
        { label: "Profile", ariaLabel: "Profile", href: "/profile" },
        { label: "Details", ariaLabel: "Details", href: "/details" },
        { label: "Faqs", ariaLabel: "LinkedIn", href: "/faqs" },
        { label: "AdminCourse", ariaLabel: "AdminCourse", href: "/admin-course" },
      ]
    }
  ];
  const logo = `/assets/images/NimraLogo.png`

  return (
    <CardNav
      logo={logo}
      logoAlt="Company Logo"
      items={Cards}
      baseColor="#000"
      menuColor="#fff"
      buttonBgColor="#fff"
      buttonTextColor="#111"
      ease="power3.out"
    />
  )
}

export default Navbar
