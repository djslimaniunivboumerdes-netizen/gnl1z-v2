const KPIs = [
  { label: 'Capacité GNL',     value: '8.8',  unit: 'MTPA',   sub: '▲ 3 trains actifs / 3' },
  { label: 'Pression Réseau',  value: '62',   unit: 'bar g',  sub: '● Conforme' },
  { label: 'Temp. GNL Stock.', value: '-162', unit: '°C',     sub: '● Nominal' },
  { label: 'Tags DCS Actifs',  value: '247',  unit: 'tags',   sub: '▲ 6 boucles actives' },
  { label: 'Débit Chargement', value: '10.4', unit: 'k m³/h', sub: '▲ Méthanier en berge' },
  { label: 'Uptime Système',   value: '99.7', unit: '%',      sub: '▲ Ce mois-ci' },
]

const TRAINS = [
  { name: 'Train 100', status: 'run',  load: 97 },
  { name: 'Train 200', status: 'run',  load: 94 },
  { name: 'Train 300', status: 'idle', load: null },
]

const ALERTS = [
  { tag: 'PT-3003', msg: 'Pression basse — Train 300',         time: '08:14', type: 'warn' },
  { tag: 'TT-2001', msg: 'Température normalisée',             time: '07:52', type: 'ok'   },
  { tag: 'LT-5002', msg: 'Niveau réservoir GNL — seuil bas',  time: '07:30', type: 'warn' },
  { tag: 'FT-6001', msg: 'Débit chargement nominal',           time: '06:45', type: 'ok'   },
  { tag: 'AT-4001', msg: 'Teneur CO₂ — limite haute',          time: '06:20', type: 'crit' },
]

const ALT_CLR: Record<string, string> = { ok: '#10b981', warn: '#f59e0b', crit: '#ef4444' }

const SL = (s: React.CSSProperties): React.CSSProperties => s

export function Home() {
  return (
    <div style={SL({ padding: 16, overflowY: 'auto', flex: 1, animation: 'fadeIn .25s ease' })}>
      {/* KPIs */}
      <div style={SL({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12, marginBottom: 18 })}>
        {KPIs.map(k => (
          <div key={k.label} style={SL({ background: '#111827', border: '1px solid #1e3a5f', borderRadius: 6, padding: 14, position: 'relative', overflow: 'hidden' })}>
            <div style={SL({ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#f59e0b' })} />
            <div style={SL({ fontSize: 8, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 })}>{k.label}</div>
            <div style={SL({ fontSize: 24, fontWeight: 700, color: '#f59e0b', lineHeight: 1 })}>
              {k.value}<span style={SL({ fontSize: 10, color: '#64748b', marginLeft: 3 })}>{k.unit}</span>
            </div>
            <div style={SL({ fontSize: 8, color: '#10b981', marginTop: 5 })}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Trains */}
      <SectionTitle>TRAINS DE LIQUÉFACTION</SectionTitle>
      <div style={SL({ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 18 })}>
        {TRAINS.map(t => (
          <div key={t.name} style={SL({ background: '#111827', border: '1px solid #1e3a5f', borderRadius: 6, padding: 12, textAlign: 'center' })}>
            <div style={SL({ fontSize: 8, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 })}>{t.name}</div>
            <span style={SL({ display: 'inline-block', padding: '3px 9px', borderRadius: 10, fontSize: 8, fontWeight: 700, letterSpacing: 0.5, marginBottom: 8,
              background: t.status === 'run' ? '#064e3b' : '#292524',
              color:      t.status === 'run' ? '#10b981'  : '#a8a29e',
              border:     `1px solid ${t.status === 'run' ? '#065f46' : '#44403c'}` })}>
              {t.status === 'run' ? 'EN SERVICE' : 'MAINTENANCE'}
            </span>
            <div style={SL({ fontSize: 20, fontWeight: 700, color: t.status === 'run' ? '#f59e0b' : '#64748b' })}>{t.load ?? '—'}{t.load ? '%' : ''}</div>
            <div style={SL({ fontSize: 7, color: '#64748b', marginTop: 2 })}>charge nominal</div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <SectionTitle>ALARMES ACTIVES</SectionTitle>
      <div style={SL({ display: 'flex', flexDirection: 'column', gap: 6 })}>
        {ALERTS.map(a => (
          <div key={a.tag} style={SL({ background: '#111827', border: '1px solid #1e3a5f', borderLeft: `3px solid ${ALT_CLR[a.type]}`, borderRadius: 4, padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' })}>
            <span style={SL({ color: '#f59e0b', fontWeight: 700, fontSize: 10, minWidth: 80 })}>{a.tag}</span>
            <span style={SL({ color: '#c8d8e4', fontSize: 10, flex: 1, margin: '0 10px' })}>{a.msg}</span>
            <span style={SL({ color: '#64748b', fontSize: 9 })}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 9, color: '#64748b', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
      {children}
      <div style={{ flex: 1, height: 1, background: '#1e3a5f' }} />
    </div>
  )
}
