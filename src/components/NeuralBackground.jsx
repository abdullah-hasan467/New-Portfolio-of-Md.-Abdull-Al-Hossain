import { useEffect, useRef } from 'react'

// Animated "neural network" backdrop: drifting nodes connected by lines
// that brighten as nodes come close together. Sits fixed behind all content.
export default function NeuralBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = window.innerWidth
    let height = window.innerHeight
    let nodes = []
    let animationId
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const COLORS = {
      node: 'rgba(232, 147, 90, 0.55)',      // copper
      nodeAlt: 'rgba(111, 207, 151, 0.45)',  // circuit green
      line: 'rgba(170, 180, 204, 0.14)',     // soft ink
    }

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function initNodes() {
      const area = width * height
      // Density scales with viewport, capped for performance
      const count = Math.min(70, Math.max(28, Math.floor(area / 24000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.8,
        alt: Math.random() < 0.25,
      }))
    }

    const LINK_DIST = 150

    function step() {
      ctx.clearRect(0, 0, width, height)

      // Update positions
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy

        if (n.x < -20) n.x = width + 20
        if (n.x > width + 20) n.x = -20
        if (n.y < -20) n.y = height + 20
        if (n.y > height + 20) n.y = -20
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK_DIST) {
            const opacity = (1 - dist / LINK_DIST) * 0.5
            ctx.strokeStyle = `rgba(170, 180, 204, ${opacity * 0.35})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        ctx.beginPath()
        ctx.fillStyle = n.alt ? COLORS.nodeAlt : COLORS.node
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(step)
    }

    resize()
    initNodes()

    if (prefersReduced) {
      // Draw a single static frame and skip the animation loop entirely
      step()
      cancelAnimationFrame(animationId)
    } else {
      step()
    }

    function onResize() {
      resize()
      initNodes()
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="neural-bg" aria-hidden="true" />
}
