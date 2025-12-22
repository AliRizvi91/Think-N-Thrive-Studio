'use client';
import '@/app/globals.css';
import { ReactNode, useEffect } from 'react';
import { Toaster } from 'sonner';
import ReduxProvider from '@/components/reduxComponents/ReduxProvider';
import AuthenticateUser from './AuthenticateUser';
import { OAuthGoogleProvider } from '../oAuth/OAuthGoogleProvider';
import SmoothScroll from '../pocket/SmoothScroll';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../reduxComponents/ReduxHook';
import { usePathname } from 'next/navigation';
import ColorfulSpinner from '../pocket/ColourfullSpinner';
import { appLoadedReducer } from '@/react_redux/slices/UserSlice';

interface ClientLayoutHomeProps {
  children: ReactNode;
}

function InnerLayout({ children }: ClientLayoutHomeProps) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { appLoaded, authChecked } = useAppSelector(
    (state) => state.StoreOfUser
  );


  // Fonts + window load
useEffect(() => {
  Promise.all([
    new Promise((res) => {
      if (document.readyState === "complete") res(true);
      else window.addEventListener("load", () => res(true), { once: true });
    }),
    document.fonts.ready,
  ]).then(() => {
    dispatch(appLoadedReducer(true));
  });
}, [dispatch]);


  return (
    <OAuthGoogleProvider>
      <AuthenticateUser>
        <AnimatePresence mode="wait">
          {!appLoaded || !authChecked ? (
            <motion.div
              key="loading"
              transition={{ duration: 0.5 }}
              className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black z-[9999]"
            >
              <ColorfulSpinner />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SmoothScroll>
                <main className="grow">{children}</main>
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
              </SmoothScroll>
            </motion.div>
          )}
        </AnimatePresence>
      </AuthenticateUser>
    </OAuthGoogleProvider>
  );
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <InnerLayout>{children}</InnerLayout>
    </ReduxProvider>
  );
}
