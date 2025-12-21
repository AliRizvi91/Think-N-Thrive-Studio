import { motion } from "framer-motion";

type ProfileButtonProps = {
  onClick?: () => void;
};

export default function ProfileButton({ onClick }: ProfileButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="relative w-full h-full rounded-full p-[2px] bg-gradient-to-br from-[#7ed6ffcc] to-[#7ed6ff25] cursor-pointer"
    >
      {/* Inner button with inset shadow */}
      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#7ed6ffcc] to-[#7ed6ff25]  shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.2)] flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-sky-100"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      </div>
    </motion.button>
  );
}