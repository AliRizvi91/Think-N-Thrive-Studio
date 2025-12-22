'use client';

import React, {
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect
} from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import BorderedAvatar from '../pocket/BorderedAvatar';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../reduxComponents/ReduxHook';

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimatingRef = useRef(false);


  const router = useRouter();
  const { user } = useAppSelector((state) => state.StoreOfUser);

  /* ---------------- ADMIN SLICE LOGIC ---------------- */
  const isAdmin = user?.role === 'admin';

  const visibleItems = useMemo(() => {
    return (items || []).slice(0, isAdmin ? 4 : 3);
  }, [items, isAdmin]);

  /* ---------------- RESET REFS ---------------- */
  useEffect(() => {
    cardsRef.current = [];
  }, [visibleItems]);

  /* ---------------- HEIGHT CALC ---------------- */
  const calculateHeight = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) return 260;

    const contentEl = navEl.querySelector(
      '.card-nav-content'
    ) as HTMLElement;

    if (!contentEl) return 260;

    return 60 + contentEl.scrollHeight + 16;
  }, []);

  /* ---------------- TIMELINE ---------------- */
const createTimeline = useCallback(() => {
  const navEl = navRef.current;
  if (!navEl) return null;

  gsap.set(navEl, { height: 60, overflow: 'hidden' });
  gsap.set(cardsRef.current, { y: 30, opacity: 0 });

  const tl = gsap.timeline({ paused: true });

  // 🔥 SPEED CONTROL HERE
  tl.timeScale(1.1);

  tl.to(navEl, {
    height: calculateHeight(),
    duration: 0.35,
    ease
  }).to(
    cardsRef.current,
    {
      y: 0,
      opacity: 1,
      duration: 0.35,
      ease,
      stagger: 0.06
    },
    '-=0.15'
  );

  return tl;
}, [ease, calculateHeight]);


  /* ---------------- INIT GSAP ---------------- */
  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [createTimeline]);

  /* ---------------- RESIZE THROTTLE ---------------- */
  useLayoutEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (!navRef.current || !tlRef.current) return;

        gsap.set(navRef.current, {
          height: isExpanded ? calculateHeight() : 60
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded, calculateHeight]);

  /* ---------------- TOGGLE ---------------- */
const toggleMenu = () => {
  const tl = tlRef.current;
  if (!tl || isAnimatingRef.current) return;

  isAnimatingRef.current = true;

  if (!isExpanded) {
    setIsHamburgerOpen(true);
    setIsExpanded(true);

    tl.play(0).eventCallback('onComplete', () => {
      isAnimatingRef.current = false;
    });
  } else {
    setIsHamburgerOpen(false);

    tl.reverse().eventCallback('onReverseComplete', () => {
      setIsExpanded(false);
      isAnimatingRef.current = false;
    });
  }
};


  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  const handleAuthenticationSite = () => {
    router.push('/authenticate');
  };

  /* ---------------- JSX ---------------- */
  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-50 top-[1.2em] md:top-[2em] ${className}`}
    >
      <nav
        ref={navRef}
        className={`block h-[60px] shadow-md relative overflow-hidden ${
          isExpanded ? 'rounded-xl' : 'rounded-full'
        }`}
        style={{ backgroundColor: baseColor }}
      >
        {/* TOP BAR */}
       <div className="absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-4 z-10 select-none">

          {/* HAMBURGER */}
          <button
            onClick={toggleMenu}
            role="button"
            aria-label="Toggle Menu"
            className="cursor-pointer flex flex-col gap-[6px]"
            style={{ color: menuColor || '#000' }}
          >
            <div
              className={`w-[30px] h-[2px] bg-current transition ${
                isHamburgerOpen ? 'rotate-45 translate-y-[4px]' : ''
              }`}
            />
            <div
              className={`w-[30px] h-[2px] bg-current transition ${
                isHamburgerOpen ? '-rotate-45 -translate-y-[4px]' : ''
              }`}
            />
          </button>

          {/* LOGO */}
          <h1 className='sm:text-[20px] text-[15px] font-black text-white text-center'>Think <span className='text-sky-400'>N</span> Thrive Studio</h1>

          {/* AVATAR */}
          <button onClick={handleAuthenticationSite} className='cursor-pointer'>
            <BorderedAvatar
              src={
                user?.image ||
                'https://res.cloudinary.com/dkbz23qyt/image/upload/v1759525517/Avatar_k3tkyn.png'
              }
              alt="Avatar"
            />
          </button>
        </div>

        {/* CONTENT */}
        <div
          className={`card-nav-content absolute inset-x-0 top-[60px] p-2 flex flex-col md:flex-row sm:gap-2 gap-1 ${
            isExpanded
              ? 'visible pointer-events-auto h-fit'
              : 'invisible pointer-events-none h-fit'
          }`}
        >
          {visibleItems.map((item, idx) => (
            <div
              key={idx}
              ref={setCardRef(idx)}
              className="flex-1 rounded-xl p-4 flex flex-col md:h-[20vh] min-h-fit"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <h3 className="text-lg font-medium">{item.label}</h3>

              <div className="mt-auto flex flex-col gap-1">
                {item.links.map((lnk, i) => (
                  <a
                    key={i}
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    className="flex items-center gap-1 hover:text-pink-300 transition"
                  >
                    <GoArrowUpRight />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
