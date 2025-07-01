import React, { useEffect } from 'react';
import { useTransitionStore } from '../stores/transitionStore';

interface TransitionWrapperProps {
  children: React.ReactNode;
}

/**
 * TransitionWrapper - Component tạo hiệu ứng chuyển trang mượt mà với fade-in/fade-out
 * Bọc quanh các Route components trong App.tsx để có hiệu ứng chuyển trang
 */
const TransitionWrapper: React.FC<TransitionWrapperProps> = ({ children }) => {
  const { isTransitioning, fadeType, duration, startTransition, finishTransition } = useTransitionStore();

  // Xử lý hiệu ứng khi route thay đổi
  useEffect(() => {
    // Khi component mount, bắt đầu với fade-in
    const handleFadeIn = () => {
      startTransition('fade-in');
      setTimeout(() => {
        finishTransition();
      }, duration);
    };

    handleFadeIn();

    // Xử lý unmount với hiệu ứng fade-out
    return () => {
      startTransition('fade-out');
    };
  }, []);

  // Styles dựa trên trạng thái chuyển trang
  const getTransitionStyles = (): React.CSSProperties => {
    // Mặc định
    const baseStyle: React.CSSProperties = {
      opacity: 1,
      transition: `opacity ${duration}ms ease-in-out`
    };

    // Hiệu ứng dựa trên trạng thái
    if (isTransitioning) {
      if (fadeType === 'fade-in') {
        return { ...baseStyle, opacity: 1 };
      } else if (fadeType === 'fade-out') {
        return { ...baseStyle, opacity: 0 };
      }
    }

    return baseStyle;
  };

  return (
    <div style={getTransitionStyles()}>
      {children}
    </div>
  );
};

export default TransitionWrapper;
