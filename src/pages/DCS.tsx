import type { DCSScreen } from '../types'

export const DCS_SCREENS: DCSScreen[] = [
  { id: 'T100', name: 'Train 100 — Liquéfaction',  area: 'Compression / Échangeurs',  status: 'run',  tags: ['PT-1001','TT-1002','FT-1003','LT-1004','PIC-1005','TIC-1006'] },
  { id: 'T200', name: 'Train 200 — Liquéfaction',  area: 'Cold Box / Turbines',       status: 'run',  tags: ['TT-2001','TT-2002','PT-2003','FCV-2004','XV-2005','PDT-2006'] },
  { id: 'T300', name: 'Train 300 — Liquéfaction',  area: 'Séparation / Stockage',     status: 'idle', tags: ['LT-3001','LT-3002','PT-3003','FT-3004','TT-3005'] },
  { id: 'U400', name: 'Unité 400 — Prétraitement', area: 'Déshydratation / Démerc.',  status: 'run',  tags: ['AT-4001','TT-4002','PT-4003','DP-4004','FT-4005','AT-4006'] },
  { id: 'U500', name: 'Unité 500 — Stockage GNL',  area: 'Réservoirs & Pompes',       status: 'run',  tags: ['LT-5001','TT-5002','PT-5003','FT-5004','PDT-5005','LIC-5006'] },
  { id: 'U600', name: 'Unité 600 — Expédition',    area: 'Bras chargement / Bord',    status: 'run',  tags: ['FT-6001','FT-6002','PT-6003','TT-6004','FCV-6005'] },
  { id: 'U700', name: 'Unité 700 — Utilités',      area: 'Vapeur / Air / Eau',        status: 'run',  tags: ['PT-7001','FT-7002','LT-7003','TT-7004','PIC-7005'] },
  { id: 'U800', name: 'Unité 800 — Torches',       area: 'HP/LP Flares',              status: 'idle', tags: ['PT-8001','FT-8002','TT-8003','XV-8004'] },
  { id: 'U900', name: 'Unité 900 — Réfrigération', area: 'Propane / Ethylène / CH₄',  status: 'run',  tags: ['TT-9001','PT-9002','LT-9003','FT-9004','TIC-9005','LIC-9006'] },
]

const MOCK = [
  { l: 'PT', v: '62.4 bar', c: '#10b981' },
  { l: 'TT', v: '-162 °C',  c: '#06b6d4' },
  { l: 'FT', v: '28.3 t/h', c: '#f59e0b' },
  { l: 'LT', v: '74 %',     c: '#10b981' },
]

export function DCS({ onSelect }: { onSelect: (d: DCSScreen) => void }) {
  return (
    <div style={{ padding: 16, overflowY: 'auto', flex: 1, animation: 'fadeIn .25s ease' }}>
      <div style={{ fontSize: 9, color: '#64748b', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
        VUES DCS — {DCS_SCREENS.length} UNITÉS
        <div style={{ flex: 1, height: 1, background: '#1e3a5f' }} />
        <span style={{ color: '#10b981', fontSize: 8 }}>{DCS_SCREENS.filter(d => d.status === 'run').length} EN SERVICE</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12 }}>
        {DCS_SCREENS.map(dcs => (
          <div key={dcs.id} onClick={() => onSelect(dcs)}
            style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: 6, overflow: 'hidden', cursor: 'pointer', transition: 'border-color .2s,transform .15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#f59e0b'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#1e3a5f'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
          >
            {/* Mini DCS screen */}
            <div style={{ height: 120, background: '#050e1a', position: 'relative', padding: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div style={{ fontSize: 7, color: '#06b6d4', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>{dcs.id} — DCS VIEW</div>
              {MOCK.map(r => (
                <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9 }}>
                  <span style={{ color: '#64748b' }}>{r.l}</span>
                  <span style={{ color: r.c }}>{r.v}</span>
                </div>
              ))}
              <div style={{ height: 1, background: '#1e3a5f', margin: '2px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8 }}>
                <span style={{ color: '#64748b' }}>STATUS</span>
                <span style={{ color: dcs.status === 'run' ? '#10b981' : '#64748b' }}>■ {dcs.status === 'run' ? 'RUN' : 'IDLE'}</span>
              </div>
              <span style={{ position: 'absolute', top: 8, right: 8, fontSize: 7, padding: '2px 5px', borderRadius: 3, fontWeight: 700, letterSpacing: 0.5,
                background: dcs.status === 'run' ? '#064e3b' : '#1c1917',
                color:      dcs.status === 'run' ? '#10b981'  : '#78716c',
                border:     `1px solid ${dcs.status === 'run' ? '#065f46' : '#292524'}` }}>
                {dcs.status.toUpperCase()}
              </span>
            </div>
            {/* Card info */}
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: 11, color: '#c8d8e4', fontWeight: 700, letterSpacing: 0.5 }}>{dcs.name}</div>
              <div style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>{dcs.area}</div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 7 }}>
                {dcs.tags.slice(0, 3).map(t => (
                  <span key={t} style={{ background: '#1a2332', border: '1px solid rgba(37,99,235,.27)', color: '#06b6d4', fontSize: 8, padding: '2px 5px', borderRadius: 3 }}>{t}</span>
                ))}
                {dcs.tags.length > 3 && <span style={{ fontSize: 8, color: '#64748b', alignSelf: 'center' }}>+{dcs.tags.length - 3}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
