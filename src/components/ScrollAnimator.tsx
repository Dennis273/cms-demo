'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollAnimatorProps {
  children: ReactNode
  className?: string
  delay?: number
  threshold?: number
}

export function ScrollAnimator({
  children,
  className = '',
  delay = 0,
  threshold = 0.1,
}: ScrollAnimatorProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      element.classList.add('visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible')
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [delay, threshold])

  return (
    <div ref={elementRef} className={`animate-on-scroll ${className}`}>
      {children}
    </div>
  )
}

// Wrapper for animating multiple children with stagger effect
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  threshold?: number
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 100,
  threshold = 0.1,
}: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const animatableElements = container.querySelectorAll('.animate-on-scroll')

    if (prefersReducedMotion) {
      animatableElements.forEach((el) => el.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animatableElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('visible')
              }, index * staggerDelay)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [staggerDelay, threshold])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
