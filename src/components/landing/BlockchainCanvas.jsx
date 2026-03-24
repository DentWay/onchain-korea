import { useRef, useEffect } from 'react'

const NODE_COUNT = 25
const CONNECTION_DIST_SQ = 150 * 150 // squared distance avoids sqrt per frame

export default function BlockchainCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let nodes = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2)
    }

    const createNodes = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      // Update positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.x += n.vx
        n.y += n.vy
        n.pulse += 0.02
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }

      // Draw connections — use squared distance to skip sqrt
      ctx.lineWidth = 0.5
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distSq = dx * dx + dy * dy
          if (distSq < CONNECTION_DIST_SQ) {
            const opacity = (1 - distSq / CONNECTION_DIST_SQ) * 0.15
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const glow = Math.sin(n.pulse) * 0.3 + 0.7
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius * glow, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${0.4 * glow})`
        ctx.fill()
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${0.05 * glow})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    const handleResize = () => { resize(); createNodes() }

    resize()
    createNodes()
    draw()
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ opacity: 0.6 }}
    />
  )
}
