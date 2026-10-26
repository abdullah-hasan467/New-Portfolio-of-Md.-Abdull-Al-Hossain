import { useEffect, useRef } from 'react'

// Neural backdrop that follows the active theme:
//  - reads colors from CSS variables (--node-rgb, --node-alt-rgb, --link-rgb)
//  - smoothly morphs colors when the theme changes
//  - nodes reach toward the cursor and link to it
//  - pauses when the tab is hidden; static single frame if reduced motion is on

const LINK_DIST = 150
const MOUSE_DIST = 180
const FALLBACK = {
  node: [232, 147, 90],
  alt: [111, 207, 151],
  link: [170, 180, 204],
}

function parseRgb(raw, fallback) {
  const parts = String(raw).split(',').map(v => parseFloat(v))
  return parts.length === 3 && parts.every(Number.isFinite) ? parts : [...fallback]
}

function readPalette() {
  const s = getComputedStyle(document.documentElement)
  return {
    node: parseRgb(s.getPropertyValue('--node-rgb'), FALLBACK.node),
    alt: parseRgb(s.getPropertyValue('--node-alt-rgb'), FALLBACK.alt),
    link: parseRgb(s.getPropertyValue('--link-rgb'), FALLBACK.link),
  }
}

const rgba = (c, a) => `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${a})`

export default function NeuralBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = window.innerWidth
    let height = window.innerHeight
    let nodes = []
    let raf = 0
    let resizeTimer = 0
    const mouse = { x: -9999, y: -9999 }

    let target = readPalette()
    const cur = {
      node: [...target.node],
      alt: [...target.alt],
      link: [...target.link],
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
      const count = Math.min(80, Math.max(28, Math.floor((width * height) / 22000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        bx: (Math.random() - 0.5) * 0.25, // base drift
        by: (Math.random() - 0.5) * 0.25,
        px: 0, // push from cursor (decays)
        py: 0,
        r: Math.random() * 1.6 + 0.8,
        alt: Math.random() < 0.25,
      }))
    }

    function easeColors(speed) {
      for (const key of ['node', 'alt', 'link']) {
        for (let i = 0; i < 3; i++) {
          cur[key][i] += (target[key][i] - cur[key][i]) * speed
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      for (const n of nodes) {
        // cursor attraction (gentle, decays so nodes never clump)
        const mx = mouse.x - n.x
        const my = mouse.y - n.y
        const md = Math.hypot(mx, my)
        if (md < MOUSE_DIST && md > 1) {
          const f = (1 - md / MOUSE_DIST) * 0.05
          n.px += (mx / md) * f
          n.py += (my / md) * f
        }
        n.px *= 0.94
        n.py *= 0.94

        n.x += n.bx + n.px
        n.y += n.by + n.py

        if (n.x < -20) n.x = width + 20
        if (n.x > width + 20) n.x = -20
        if (n.y < -20) n.y = height + 20
        if (n.y > height + 20) n.y = -20
      }

      // node-to-node links
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK_DIST) {
            ctx.strokeStyle = rgba(cur.link, (1 - d / LINK_DIST) * 0.2)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // cursor links (accent colored)
      for (const n of nodes) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y)
        if (d < MOUSE_DIST) {
          ctx.strokeStyle = rgba(cur.node, (1 - d / MOUSE_DIST) * 0.45)
          ctx.beginPath()
          ctx.moveTo(n.x, n.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.beginPath()
        ctx.fillStyle = rgba(n.alt ? cur.alt : cur.node, n.alt ? 0.5 : 0.6)
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function loop() {
      easeColors(0.07)
      draw()
      raf = requestAnimationFrame(loop)
    }

    function start() {
      if (!raf && !reduced) raf = requestAnimationFrame(loop)
    }
    function stop() {
      cancelAnimationFrame(raf)
      raf = 0
    }

    // Theme change -> new target colors
    const observer = new MutationObserver(() => {
      target = readPalette()
      if (reduced) {
        for (const key of ['node', 'alt', 'link']) cur[key] = [...target[key]]
        draw()
      }
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const onMove = e => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    const onVisibility = () => (document.hidden ? stop() : start())
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => { resize(); initNodes(); if (reduced) draw() }, 150)
    }

    resize()
    initNodes()
    if (reduced) draw()
    else start()

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', onResize)

    return () => {
      stop()
      observer.disconnect()
      window.clearTimeout(resizeTimer)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="neural-bg" aria-hidden="true" />
}
