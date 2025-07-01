import { create } from 'zustand';

interface TransitionState {
  // Trạng thái chuyển trang
  isTransitioning: boolean;
  fadeType: 'fade-in' | 'fade-out' | null;
  duration: number;
  
  // Actions
  startTransition: (type: 'fade-in' | 'fade-out', duration?: number) => void;
  finishTransition: () => void;
}

/**
 * Store quản lý hiệu ứng chuyển trang
 * Sử dụng để tạo hiệu ứng fade-in/fade-out khi chuyển giữa các trang
 */
export const useTransitionStore = create<TransitionState>((set) => ({
  // State mặc định
  isTransitioning: false,
  fadeType: null,
  duration: 300, // ms
  
  // Actions
  startTransition: (type, duration = 300) => set({
    isTransitioning: true,
    fadeType: type,
    duration
  }),
  
  finishTransition: () => set({
    isTransitioning: false,
    fadeType: null
  })
}));
