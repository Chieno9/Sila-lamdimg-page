import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check } from "lucide-react";

// ==================== MODERN MINIMAL CARD ====================
interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  active?: boolean;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className = "",
  onClick,
  id,
  active = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      id={id}
      className={`relative rounded-xl border p-6 transition-colors duration-300 bg-surface ${
        active || isHovered ? "border-accent" : "border-line"
      } ${onClick ? "cursor-pointer select-none" : ""} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={onClick || isHovered ? { y: -2 } : undefined}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.015)",
      }}
    >
      {/* Corner precise node-dot */}
      <div className="absolute top-4 right-4 w-2 h-2 flex items-center justify-center pointer-events-none">
        <motion.div
          className={`w-1.5 h-1.5 rounded-full border ${
            active || isHovered ? "bg-accent border-accent" : "bg-transparent border-ink-soft/40"
          }`}
          animate={active || isHovered ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main card contents */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};


// ==================== MODERN BUTTONS ====================
interface ModernButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
  icon?: React.ReactNode;
  id?: string;
  type?: "button" | "submit";
}

export const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  icon,
  id,
  type = "button",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === "tertiary") {
    return (
      <button
        id={id}
        type={type}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative font-sans font-semibold text-sm tracking-wide text-ink hover:text-accent transition-colors duration-300 flex items-center gap-1.5 pb-1 ${className}`}
      >
        <span>{children}</span>
        {icon && <span className="transition-transform duration-300">{icon}</span>}
        {/* Draw Line on hover */}
        <motion.span
          className="absolute bottom-0 left-0 h-[1.5px] bg-accent"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </button>
    );
  }

  // Primary & Secondary Buttons
  const baseClasses = "relative px-5 py-2.5 font-sans font-semibold text-xs tracking-widest uppercase rounded-lg transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden border";
  
  const variantClasses = variant === "primary"
    ? `${isHovered ? "bg-accent border-accent text-white" : "bg-ink border-ink text-surface"}`
    : `${isHovered ? "border-ink bg-surface-mute text-ink" : "border-line bg-surface text-ink"}`;

  return (
    <motion.button
      id={id}
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 15 }}
    >
      {/* Node indicator dot for Primary button */}
      {variant === "primary" && (
        <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isHovered ? "bg-white" : "bg-accent"}`} />
      )}

      {/* Button text */}
      <span className="relative z-10 flex items-center gap-1.5 font-sans font-semibold">
        {children}
        {icon && <span className="group-hover:translate-x-1 transition-transform duration-300">{icon}</span>}
      </span>
    </motion.button>
  );
};


// ==================== MODERN BADGE ====================
interface ModernBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "active" | "sovereign";
  className?: string;
}

export const ModernBadge: React.FC<ModernBadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const colorMap = {
    default: "border-line text-ink-soft bg-surface-mute",
    active: "border-accent/30 text-accent bg-accent/5",
    sovereign: "border-sovereign/30 text-sovereign bg-sovereign/5",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-sans font-bold tracking-wider uppercase rounded-full border ${colorMap} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${
        variant === "active" ? "bg-accent" : variant === "sovereign" ? "bg-sovereign" : "bg-ink-soft"
      }`} />
      {children}
    </span>
  );
};


// ==================== MODERN TOAST ENGINE ====================
export interface Toast {
  id: string;
  message: string;
  type?: "success" | "info" | "error";
}

let toastListeners: Array<(toast: Toast) => void> = [];

export const showModernToast = (message: string, type: "success" | "info" | "error" = "success") => {
  const id = Math.random().toString(36).substring(2, 9);
  toastListeners.forEach((listener) => listener({ id, message, type }));
};

export const ModernToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleNewToast = (newToast: Toast) => {
      setToasts((prev) => [...prev, newToast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 4000);
    };

    toastListeners.push(handleNewToast);
    return () => {
      toastListeners = toastListeners.filter((listener) => listener !== handleNewToast);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full font-sans">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-surface p-4 border border-line rounded-xl shadow-md max-w-sm"
          >
            <div className="relative z-10 flex gap-3 items-start justify-between">
              <span className="flex items-center justify-center p-1.5 rounded-full bg-accent/5 border border-accent/15">
                <Check className="w-3.5 h-3.5 text-accent" />
              </span>
              <div className="flex-1 text-xs">
                <span className="block font-bold text-ink uppercase tracking-widest text-[8px] mb-0.5 font-display">
                  SILA SYSTEM
                </span>
                <p className="text-ink-soft font-medium leading-relaxed">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-ink-soft/40 hover:text-accent transition-colors p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};


// ==================== MODERN DRAWER ====================
interface ModernDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export const ModernDrawer: React.FC<ModernDrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/20 z-40 backdrop-blur-xs"
          />

          {/* Drawer sheet panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-surface z-50 p-6 flex flex-col justify-between shadow-xl border-l border-line"
          >
            <div className="relative z-10 flex flex-col h-full justify-between pt-8">
              {/* Header inside drawer */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-line">
                  <div>
                    <span className="block font-sans text-[10px] font-bold tracking-widest text-accent uppercase">
                      Gen Z Initiative
                    </span>
                    <h2 className="font-display text-xl text-ink font-bold tracking-tight mt-0.5">
                      {title}
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-full border border-line hover:border-accent group transition-colors bg-surface-mute"
                  >
                    <X className="w-5 h-5 text-ink group-hover:text-accent transition-colors" />
                  </button>
                </div>

                {/* Nav links / Children content */}
                <div className="py-6">{children}</div>
              </div>

              {/* Drawer footer */}
              <div className="pt-6 border-t border-line relative">
                <div className="text-center">
                  <span className="font-display text-3xl font-bold text-accent block tracking-normal">
                    SILA
                  </span>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-ink-soft mt-1.5">
                    Sovereign Agency Connection Layer
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
