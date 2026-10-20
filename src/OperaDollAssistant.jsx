import React, { useEffect, useRef, useState } from 'react'

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`
const DOLL_IMAGE = assetUrl('assets/doll.png')
const WAVE_IMAGE = assetUrl('assets/doll-wave.png')
const DESKTOP_DOLL_WIDTH = 96
const MOBILE_DOLL_WIDTH = 64
const GUIDE_URL = '#learning'
const SUBMISSION_URL = '#contact'
const GENERIC_LINES = ['你好呀！有什么可以帮你？', '今日也请多多指教~', '有什么想了解的内容吗？']
const LONG_STAY_MS = 3 * 60 * 1000
const DRAG_THRESHOLD = 5
const DOCK_THRESHOLD = 100
const DOCK_GAP = 20

export default function OperaDollAssistant() {
  const [minimized, setMinimized] = useState(false)
  const [showWakeHint, setShowWakeHint] = useState(false)
  const [imageReady, setImageReady] = useState(true)
  const [position, setPosition] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [tilt, setTilt] = useState(0)
  const [speech, setSpeech] = useState('')
  const [bubbleFading, setBubbleFading] = useState(false)
  const [dockedLeft, setDockedLeft] = useState(false)
  const [waving, setWaving] = useState(false)
  const dragRef = useRef(null)
  const movedRef = useRef(false)
  const copiedRef = useRef(false)
  const returnedRef = useRef(false)
  const mountedAtRef = useRef(Date.now())
  const speechTimerRef = useRef(null)
  const fadeTimerRef = useRef(null)
  const waveTimeoutRef = useRef(null)
  const wakeHintTimeoutRef = useRef(null)
  const hasShownWakeHintRef = useRef(false)

  useEffect(() => {
    try {
      returnedRef.current = sessionStorage.getItem('opera-helper-returned') === 'yes'
      sessionStorage.removeItem('opera-helper-returned')
    } catch { /* storage can be disabled; the helper still works */ }

    const rememberDeparture = () => {
      returnedRef.current = true
      try { sessionStorage.setItem('opera-helper-returned', 'yes') } catch { /* optional */ }
    }
    const rememberCopy = () => { copiedRef.current = true }
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') rememberDeparture()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    document.addEventListener('copy', rememberCopy)
    window.addEventListener('pagehide', rememberDeparture)
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      document.removeEventListener('copy', rememberCopy)
      window.removeEventListener('pagehide', rememberDeparture)
      window.clearTimeout(speechTimerRef.current)
      window.clearTimeout(fadeTimerRef.current)
      window.clearTimeout(wakeHintTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    // Briefly switch to the supplied waving pose every few seconds.
    const waveTimer = window.setInterval(() => {
      setWaving(true)
      window.clearTimeout(waveTimeoutRef.current)
      waveTimeoutRef.current = window.setTimeout(() => setWaving(false), 1500)
    }, 6500)
    return () => {
      window.clearInterval(waveTimer)
      window.clearTimeout(waveTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    const onResize = () => {
      setPosition((current) => {
        if (!current) return current
        const width = window.innerWidth < 768 ? MOBILE_DOLL_WIDTH : DESKTOP_DOLL_WIDTH
        const height = width * 4 / 3
        if (dockedLeft) return { x: DOCK_GAP, y: Math.max(12, (window.innerHeight - height) / 2) }
        return {
          x: Math.max(12, Math.min(current.x, window.innerWidth - width - 12)),
          y: Math.max(12, Math.min(current.y, window.innerHeight - height - 12)),
        }
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [dockedLeft])

  const showSpeech = () => {
    const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 36
    const route = `${window.location.pathname}${window.location.hash}`
    const isWorkOrSubmissionPage = /(work|submission|投稿|作品)/i.test(route)
    let line

    if (atBottom) {
      line = '已经滑到页面末尾啦'
    } else if (copiedRef.current) {
      line = '摘抄的文字很不错哦'
      copiedRef.current = false
    } else if (returnedRef.current) {
      line = '欢迎回来！'
      returnedRef.current = false
      try { sessionStorage.removeItem('opera-helper-returned') } catch { /* optional */ }
    } else if (Date.now() - mountedAtRef.current >= LONG_STAY_MS) {
      line = '要不要停下来歇一歇？'
    } else if (isWorkOrSubmissionPage) {
      line = '一起来聊聊热点话题吧！'
    } else {
      const choices = GENERIC_LINES.filter((item) => item !== speech)
      line = choices[Math.floor(Math.random() * choices.length)]
    }

    window.clearTimeout(speechTimerRef.current)
    window.clearTimeout(fadeTimerRef.current)
    setSpeech(line)
    setBubbleFading(false)
    fadeTimerRef.current = window.setTimeout(() => setBubbleFading(true), 2600)
    speechTimerRef.current = window.setTimeout(() => setSpeech(''), 3000)
  }

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    event.preventDefault()
    const rect = event.currentTarget.getBoundingClientRect()
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      left: rect.left,
      top: rect.top,
    }
    movedRef.current = false
    setPosition({ x: rect.left, y: rect.top })
    setDockedLeft(false)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event) => {
    const start = dragRef.current
    if (!start || start.pointerId !== event.pointerId) return
    const dx = event.clientX - start.startX
    const dy = event.clientY - start.startY
    if (!movedRef.current && Math.hypot(dx, dy) < DRAG_THRESHOLD) return
    movedRef.current = true
    setDragging(true)
    setTilt(dx === 0 ? 0 : dx > 0 ? 3 : -3)
    const width = window.innerWidth < 768 ? MOBILE_DOLL_WIDTH : DESKTOP_DOLL_WIDTH
    const height = width * 4 / 3
    setPosition({
      x: Math.max(12, Math.min(start.left + dx, window.innerWidth - width - 12)),
      y: Math.max(12, Math.min(start.top + dy, window.innerHeight - height - 12)),
    })
  }

  const onPointerUp = (event) => {
    const start = dragRef.current
    if (!start || start.pointerId !== event.pointerId) return
    dragRef.current = null
    setDragging(false)
    setTilt(0)
    if (movedRef.current) {
      const current = position || { x: start.left, y: start.top }
      if (current.x < DOCK_THRESHOLD) {
        const width = window.innerWidth < 768 ? MOBILE_DOLL_WIDTH : DESKTOP_DOLL_WIDTH
        const height = width * 4 / 3
        setDockedLeft(true)
        setPosition({ x: DOCK_GAP, y: Math.max(12, (window.innerHeight - height) / 2) })
      }
    } else {
      showSpeech()
    }
    movedRef.current = false
  }

  if (!imageReady) return null

  const dollWidth = window.innerWidth < 768 ? MOBILE_DOLL_WIDTH : DESKTOP_DOLL_WIDTH
  const bubbleOnRight = position ? position.x + dollWidth / 2 < window.innerWidth / 2 : false
  const rootStyle = position
    ? { left: `${position.x}px`, top: `${position.y}px`, right: 'auto', transform: dragging ? `rotate(${tilt}deg)` : 'none' }
    : undefined

  if (minimized) {
    const launcherStyle = {
      top: position ? `${position.y + dollWidth * 2 / 3}px` : '50%',
      left: dockedLeft ? '0' : 'auto',
      right: dockedLeft ? 'auto' : '0',
      transform: 'translateY(-50%)',
    }
    return <aside className={`opera-helper opera-helper--minimized${dockedLeft ? ' is-docked-left' : ''}`} style={launcherStyle} aria-label="梨园戏曲小助手已收起">
      {showWakeHint && <span className="opera-helper__wake-hint" role="status">点我唤醒</span>}
      <button className="opera-helper__launcher" type="button" aria-label="唤醒京剧小助手" onClick={() => { setMinimized(false); setShowWakeHint(false) }}>
        <span aria-hidden="true">京</span>
        <i aria-hidden="true">✦</i>
      </button>
    </aside>
  }

  return <aside className={`opera-helper${dragging ? ' is-dragging' : ''}${bubbleOnRight ? ' bubble-on-right' : ''}`} style={rootStyle} aria-label="梨园戏曲小助手">
    {speech && <div className={`opera-helper__bubble${bubbleFading ? ' is-fading' : ''}`} role="status" aria-live="polite">
      <p>{speech}</p>
      <div className="opera-helper__actions">
        <a href={GUIDE_URL} onClick={() => setSpeech('')}>查看学习指南</a>
        <a href={SUBMISSION_URL} onClick={() => setSpeech('')}>联系我</a>
      </div>
    </div>}
    <button className="opera-helper__close" type="button" aria-label="收起小助手" onClick={() => {
      setMinimized(true)
      if (!hasShownWakeHintRef.current) {
        hasShownWakeHintRef.current = true
        setShowWakeHint(true)
        window.clearTimeout(wakeHintTimeoutRef.current)
        wakeHintTimeoutRef.current = window.setTimeout(() => setShowWakeHint(false), 3000)
      }
    }}>×</button>
    <div
      className="opera-helper__figure"
      role="button"
      tabIndex={0}
      aria-label="点击和拖动京剧小助手"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          showSpeech()
        }
      }}
    >
      <span className="opera-helper__scale"><span className={`opera-helper__bob${waving ? ' is-waving' : ''}`}>
        <img className="opera-helper__image opera-helper__image--idle" src={DOLL_IMAGE} alt="Q版京剧少女戏曲手办小助手" draggable="false" onError={() => setImageReady(false)} />
        <img className="opera-helper__image opera-helper__image--wave" src={WAVE_IMAGE} alt="" aria-hidden="true" draggable="false" />
        <span className="opera-helper__blink" aria-hidden="true" />
      </span></span>
    </div>
  </aside>
}
