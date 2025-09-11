import { useEffect, useRef } from 'react';

export const useMotionTracking = (ref: React.RefObject<HTMLElement | null>) => {
  const lastMotion = useRef({ x: 0, y: 0, timestamp: 0 });
  const animationFrame = useRef<number | undefined>(undefined);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      element.style.setProperty('--mouse-x', `${x}px`);
      element.style.setProperty('--mouse-y', `${y}px`);
    };

    const updateMotionEffect = () => {
      const now = Date.now();
      const timeDiff = now - lastMotion.current.timestamp;
      
      if (timeDiff < 16) { // Limit to ~60fps
        animationFrame.current = requestAnimationFrame(updateMotionEffect);
        return;
      }

      const rect = element.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Create a smooth transition effect
      const targetX = centerX + (lastMotion.current.x * rect.width * 0.5);
      const targetY = centerY + (lastMotion.current.y * rect.height * 0.5);

      // Get current position
      const currentX = parseFloat(element.style.getPropertyValue('--mouse-x')) || centerX;
      const currentY = parseFloat(element.style.getPropertyValue('--mouse-y')) || centerY;

      // Smooth interpolation
      const newX = currentX + (targetX - currentX) * 0.15;
      const newY = currentY + (targetY - currentY) * 0.15;

      element.style.setProperty('--mouse-x', `${newX}px`);
      element.style.setProperty('--mouse-y', `${newY}px`);
      
      lastMotion.current.timestamp = now;
      animationFrame.current = requestAnimationFrame(updateMotionEffect);
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!e.beta || !e.gamma) return;
      
      // Convert orientation to degrees of rotation (limited range)
      const rotateX = (e.beta - 45) * -0.5; // -20 to +20 degrees
      const rotateY = e.gamma * 0.5; // -20 to +20 degrees
      
      // Update CSS custom properties for rotation
      element.style.setProperty('--rotate-x', `${Math.min(20, Math.max(-20, rotateX))}deg`);
      element.style.setProperty('--rotate-y', `${Math.min(20, Math.max(-20, rotateY))}deg`);

      // Update motion values for the liquid effect
      lastMotion.current = {
        x: e.gamma / 90, // Normalize to -1 to 1
        y: (e.beta - 45) / 90, // Normalize to -1 to 1
        timestamp: Date.now()
      };

      if (!animationFrame.current) {
        animationFrame.current = requestAnimationFrame(updateMotionEffect);
      }
    };

    const handleDeviceMotion = (e: DeviceMotionEvent) => {
      if (!e.accelerationIncludingGravity) return;

      const { x, y } = e.accelerationIncludingGravity;
      if (x === null || y === null) return;

      // Normalize and smooth out the acceleration values
      const normalizedX = Math.min(1, Math.max(-1, x / 10));
      const normalizedY = Math.min(1, Math.max(-1, y / 10));

      // Update motion values for the liquid effect
      lastMotion.current = {
        x: normalizedX,
        y: normalizedY,
        timestamp: Date.now()
      };

      if (!animationFrame.current) {
        animationFrame.current = requestAnimationFrame(updateMotionEffect);
      }
    };

    // Add mouse event listeners
    element.addEventListener('mousemove', handleMouseMove);
    
    // Request device orientation permission and add listener
    interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
      requestPermission?: () => Promise<'granted' | 'denied' | 'default'>;
    }
    
    const DeviceOrientationEventiOS = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied' | 'default'>;
    };
    
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEventiOS.requestPermission === 'function') {
      DeviceOrientationEventiOS.requestPermission?.()
        .then((permissionState) => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
            window.addEventListener('devicemotion', handleDeviceMotion);
          }
        })
        .catch(console.error);
    } else {
      // For devices that don't require permission
      window.addEventListener('deviceorientation', handleDeviceOrientation);
      window.addEventListener('devicemotion', handleDeviceMotion);
    }

    // Reset transforms when mouse leaves
    const handleMouseLeave = () => {
      element.style.setProperty('--rotate-x', '0deg');
      element.style.setProperty('--rotate-y', '0deg');
      
      // Smoothly reset the liquid effect to center
      lastMotion.current = {
        x: 0,
        y: 0,
        timestamp: Date.now()
      };
    };

    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('devicemotion', handleDeviceMotion);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [ref]);
}; 