"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { cn, generateId } from "@/lib/utils";
import type { Toast as ToastType, ToastType as ToastVariant } from "@/lib/types";

interface ToastContextType {
  toasts: ToastType[];
  addToast: (
    message: string,
    type?: ToastVariant,
    duration?: number
  ) => void;
  removeToast: (id: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastVariant = "info", duration: number = 5000) => {
      const id = generateId();
      const newToast: ToastType = { id, message, type, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = useCallback(
    (message: string) => addToast(message, "success"),
    [addToast]
  );
  const error = useCallback(
    (message: string) => addToast(message, "error"),
    [addToast]
  );
  const warning = useCallback(
    (message: string) => addToast(message, "warning"),
    [addToast]
  );
  const info = useCallback(
    (message: string) => addToast(message, "info"),
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, success, error, warning, info }}
    >
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastType;
  onRemove: (id: string) => void;
}) {
  const iconMap: Record<ToastVariant, ReactNode> = {
    success: <CheckIcon />,
    error: <XCircleIcon />,
    warning: <AlertIcon />,
    info: <InfoIcon />,
  };

  const colorMap: Record<ToastVariant, string> = {
    success: "border-success bg-success/5",
    error: "border-error bg-error/5",
    warning: "border-warning bg-warning/5",
    info: "border-accent bg-accent/5",
  };

  const iconColorMap: Record<ToastVariant, string> = {
    success: "text-success",
    error: "text-error",
    warning: "text-warning",
    info: "text-accent",
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border bg-bg-primary shadow-lg animate-slide-up",
        colorMap[toast.type]
      )}
      role="alert"
    >
      <span className={cn("flex-shrink-0 mt-0.5", iconColorMap[toast.type])}>
        {iconMap[toast.type]}
      </span>
      <p className="text-sm text-text-primary flex-1">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 text-text-tertiary hover:text-text-primary transition-colors"
        aria-label="Dismiss notification"
      >
        <XIcon />
      </button>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6667 5L7.5 14.1667L3.33333 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XCircleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12.5 7.5L7.5 12.5M7.5 7.5L12.5 12.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 7V10M10 13H10.01M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
      <path
        d="M10 9V14M10 6H10.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4L4 12M4 4L12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
