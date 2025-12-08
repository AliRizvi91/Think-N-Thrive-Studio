'use client'
import '@/app/globals.css';
import { Suspense, useState, useEffect, ReactNode } from 'react';
import { Toaster } from 'sonner';
import ReduxProvider from '@/components/reduxComponents/ReduxProvider';
import AuthenticateUser from './AuthenticateUser';
import { OAuthGoogleProvider } from '../oAuth/OAuthGoogleProvider';
import LoadingDevices from '../pocket/LoadingDevices';
import SmoothScroll from '../pocket/SmoothScroll';
import { AnimatePresence } from 'framer-motion';
import MiniLoading from '../pocket/MiniLoading';
import { useAppSelector, useAppDispatch } from '../reduxComponents/ReduxHook';
import { showMiniLoading } from '@/react_redux/slices/UserSlice'; // ensure correct path
import { usePathname } from 'next/navigation';

interface ClientLayoutHomeProps {
  children: ReactNode;
}

function InnerLayout({ children }: ClientLayoutHomeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const { MiniLoadingState, currentLang } = useAppSelector((state) => state.StoreOfUser);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsLoading(false);
      return;
    }

    const handleLoad = () => setIsLoading(false);

    window.addEventListener('load', handleLoad);

    const loadTimeout = setTimeout(() => setIsLoading(false), 5000);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(loadTimeout);
    };
  }, []);

  const showContent = !isLoading && animationCompleted;

  // <-- FALLBACK: hide mini loader on any pathname change (navigation complete)
  useEffect(() => {
    // If pathname changes, make sure the mini loader is off.
    // This is a fallback in case some navigation path didn't dispatch(false).
    if (pathname) {
      dispatch(showMiniLoading(false));
    }
  }, [pathname, dispatch]);

  return (
    <>
      {/* Page Loading Overlay */}
      <AnimatePresence>
        {MiniLoadingState && <MiniLoading />}
      </AnimatePresence>

      <OAuthGoogleProvider>
        <AuthenticateUser>
          <SmoothScroll>
            {!showContent ? (
              <LoadingDevices onAnimationComplete={() => setAnimationCompleted(true)} />
            ) : (
              <div className="transition-opacity duration-200 opacity-100 z-10" aria-busy={false}>
                <main className="flex-grow">{children}</main>
                <Toaster
                  position="bottom-left"
                  theme="dark"
                  richColors
                  closeButton
                  toastOptions={{
                    duration: 9000,
                    classNames: {
                      toast: 'bg-black font-sans text-sm text-white border border-gray-800',
                      title: 'text-white',
                      description: 'text-gray-300',
                      actionButton: 'bg-white text-black',
                      closeButton:
                        'text-black hover:text-white bg-gray-100 hover:bg-gray-700 border-none',
                    },
                  }}
                />
              </div>
            )}
          </SmoothScroll>
        </AuthenticateUser>
      </OAuthGoogleProvider>
    </>
  );
}

export default function ClientLayout({ children }: ClientLayoutHomeProps) {
  return (
    <ReduxProvider>
      <InnerLayout>{children}</InnerLayout>
    </ReduxProvider>
  );
}