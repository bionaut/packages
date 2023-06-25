import React, { useRef, useEffect, FC, PropsWithChildren } from 'react'

export const ViewportTrap: FC<PropsWithChildren> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!wrapperRef.current || !targetRef.current) {
      return
    }

    const element = wrapperRef.current

    const threshold: number[] = []
    for (let i = 0; i <= 1.0; i += 0.01) {
      threshold.push(i)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 1) {
          const rect = entry.boundingClientRect
          const intersectionRect = entry.intersectionRect
          let translateX = 0
          let translateY = 0

          if (rect.right > intersectionRect.right) {
            translateX = intersectionRect.right - rect.right
          } else if (rect.left < intersectionRect.left) {
            translateX = intersectionRect.left - rect.left
          }

          if (rect.bottom > intersectionRect.bottom) {
            translateY = intersectionRect.bottom - rect.bottom
          } else if (rect.top < intersectionRect.top) {
            translateY = intersectionRect.top - rect.top
          }

          if (!targetRef.current) {
            return
          }

          const style = targetRef.current.style
          style.transform = `translate(${translateX}px, ${translateY}px)`
        } else {
          if (!targetRef.current) {
            return
          }

          const style = targetRef.current.style
          style.transform = ''
        }
      },
      {
        root: null,
        threshold: threshold,
      },
    )

    observer.observe(element)

    return () => {
      if (!element) {
        return
      }
      observer.unobserve(element)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        pointerEvents: 'none',
      }}
    >
      <div
        ref={targetRef}
        style={{ position: 'relative', pointerEvents: 'none' }}
      >
        {children}
      </div>
    </div>
  )
}
