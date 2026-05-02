import { useState, useEffect } from 'react'
import type { PageName, DCSScreen } from '../types'

const TITLES: Record<PageName, string> = {
  home: 'TABLEAU DE BORD',
  dcs: 'RÉPERTOIRE DCS',
  'dcs-detail': '',
  tools: 'OUTILS INGÉNIERIE — IMPERIAL (POUCES)',
  about: 'À PROPOS DE GNL1Z',
}

export function TopBar({ current, dcs, onBack }: { current: PageName; dcs: DCSScreen | null; onBack: () => void }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString('fr-FR'))
  useEffect(() => { const id = setInterval(() => setTime(new Date().toLocaleTimeString('fr-FR')), 1000); return () => clearInterval(id) }, [])

  const title = current === 'dcs-detail' && dcs ? `${dcs.id} — ${dcs.area}` : TITLES[current]
  const showBack = current !== 'home'

  return (
    <div style={{ height: 46, minHeight: 46, background: '#0d1626', borderBottom: '1px solid #1e3a5f', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12, flexShrink: 0 }}>
      {showBack && (
        <button onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#1a2332', border: '1px solid #1e3a5f', color: '#f59e0b', padding: '5px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', transition: 'all .15s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#f59e0b'; (e.currentTarget as HTMLButtonElement).style.background = '#1f2d42' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#1e3a5f'; (e.currentTarget as HTMLButtonElement).style.background = '#1a2332' }}
        >← RETOUR</button>
      )}
      <span style={{ fontSize: 11, color: '#c8d8e4', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 700 }}>{title}</span>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite' }} />
        <span style={{ fontSize: 9, color: '#10b981', letterSpacing: 1, textTransform: 'uppercase' }}>Opérationnel</span>
        <span style={{ fontSize: 9, color: '#64748b', marginLeft: 12, borderLeft: '1px solid #1e3a5f', paddingLeft: 12 }}>{time}</span>
      </div>
    </div>
  )
}
