import { useEffect, useRef, useState } from 'react'

export default function FadeIn({ children, delay = 0, as: Tag = 'div', style, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      {...rest}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(16px)',
        transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}