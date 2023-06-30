import React, {
  useRef,
  useEffect,
  FC,
  PropsWithChildren,
} from 'react'

export const ViewportTrap: FC<PropsWithChildren> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let animationFrameId: number | null = null

    const checkBounds = () => {
      if (!wrapperRef.current || !targetRef.current) {
        return
      }


      const rect = wrapperRef.current.getBoundingClientRect()
      let translateX = 0
      let translateY = 0

      const ww = window?.visualViewport?.width || window.innerWidth
      const wh = window?.visualViewport?.height || window.innerHeight

      if (rect.right > ww) {
        translateX = ww - rect.right
      } else if (rect.left < 0) {
        translateX = -rect.left
      }

      if (rect.bottom > wh) {
        translateY = wh - rect.bottom
      } else if (rect.top < 0) {
        translateY = -rect.top
      }

      // update the transform directly instead of using state to avoid
      // unnecessary re-renders.
      targetRef.current.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`
    }

    const animate = () => {
      checkBounds()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
      }}
    >
      <div
        ref={targetRef}
        style={{
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  )
}
