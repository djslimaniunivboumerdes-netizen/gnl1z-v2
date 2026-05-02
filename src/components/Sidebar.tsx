import { SonatrachLogo } from './SonatrachLogo'
import type { PageName } from '../types'

const NAV: Array<{ page: PageName; label: string; icon: string }> = [
  { page: 'home',  label: 'Tableau de Bord',   icon: '▦' },
  { page: 'dcs',   label: 'Répertoire DCS',    icon: '◈' },
  { page: 'tools', label: 'Outils Ingénierie', icon: '◉' },
  { page: 'about', label: 'À Propos GNL1Z',   icon: '◎' },
]

export function Sidebar({ current, onNav }: { current: PageName; onNav: (p: PageName) => void }) {
  const active = current === 'dcs-detail' ? 'dcs' : current
  return (
    <aside style={{ width: 210, minWidth: 210, background: '#0d1626', borderRight: '1px solid #1e3a5f', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '16px 12px 12px', borderBottom: '1px solid #1e3a5f' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SonatrachLogo size={38} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', letterSpacing: 2 }}>GNL1Z</div>
            <div style={{ fontSize: 8, color: '#64748b', letterSpacing: 0.5, lineHeight: 1.4 }}>
              SONATRACH S.p.A<br/>ARZEW — ORAN, DZ
            </div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        <div style={{ fontSize: 8, color: '#64748b', letterSpacing: 1.5, textTransform: 'uppercase', padding: '6px 14px 2px' }}>Navigation</div>
        {NAV.map(({ page, label, icon }) => {
          const isActive = active === page
          return (
            <div key={page} onClick={() => onNav(page)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer',
                borderLeft: `2px solid ${isActive ? '#f59e0b' : 'transparent'}`,
                background: isActive ? '#1a2332' : 'transparent',
                color: isActive ? '#f59e0b' : '#64748b',
                fontSize: 10, letterSpacing: 0.5, textTransform: 'uppercase', userSelect: 'none', transition: 'all .15s' }}
              onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLDivElement).style.color = '#c8d8e4'; (e.currentTarget as HTMLDivElement).style.background = '#1a2332' } }}
              onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLDivElement).style.color = '#64748b'; (e.currentTarget as HTMLDivElement).style.background = 'transparent' } }}
            >
              <span style={{ fontSize: 14, width: 18, textAlign: 'center' }}>{icon}</span>
              {label}
            </div>
          )
        })}
        <div style={{ height: 1, background: '#1e3a5f', margin: '8px 14px' }} />
        <div style={{ fontSize: 8, color: '#64748b', letterSpacing: 1.5, textTransform: 'uppercase', padding: '6px 14px 2px' }}>Système</div>
        {['Maintenance','Rapports'].map(lbl => (
          <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', color: '#64748b', fontSize: 10, letterSpacing: 0.5, textTransform: 'uppercase', opacity: 0.5 }}>
            <span style={{ fontSize: 14, width: 18, textAlign: 'center' }}>◐</span>{lbl}
          </div>
        ))}
      </nav>

      <div style={{ padding: '10px 14px', borderTop: '1px solid #1e3a5f', fontSize: 8, color: '#64748b', lineHeight: 1.6 }}>
        GNL1Z Asset Management v2.0<br/>
        Vite · React · TypeScript<br/>
        © 2025 Sonatrach — All rights reserved
      </div>
    </aside>
  )
}
