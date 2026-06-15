import useReveal from '../hooks/useReveal'

export default function Reveal({ children, delay = 0, as: Component = 'div', className = '' }) {
  const [ref, visible] = useReveal()

  return (
    <Component
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Component>
  )
}
