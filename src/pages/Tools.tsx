import { useState, useCallback } from 'react'

// Pipe ID table inches: [NPS -> {sch: ID}]
const PIPE: Record<string, Record<string, number>> = {
  '0.5':  { std: 0.622,  '40': 0.622,  '80': 0.546,  xs: 0.546,  '160': 0.252, xxs: 0.252 },
  '0.75': { std: 0.824,  '40': 0.824,  '80': 0.742,  xs: 0.742,  '160': 0.434, xxs: 0.434 },
  '1':    { std: 1.049,  '40': 1.049,  '80': 0.957,  xs: 0.957,  '160': 0.599, xxs: 0.599 },
  '1.5':  { std: 1.610,  '40': 1.610,  '80': 1.500,  xs: 1.500,  '160': 1.100, xxs: 1.100 },
  '2':    { std: 2.067,  '40': 2.067,  '80': 1.939,  xs: 1.939,  '160': 1.503, xxs: 1.503 },
  '3':    { std: 3.068,  '40': 3.068,  '80': 2.900,  xs: 2.900,  '160': 2.300, xxs: 2.300 },
  '4':    { std: 4.026,  '40': 4.026,  '80': 3.826,  xs: 3.826,  '160': 2.938, xxs: 2.626 },
  '6':    { std: 6.065,  '40': 6.065,  '80': 5.761,  xs: 5.761,  '160': 4.897, xxs: 4.313 },
  '8':    { std: 8.071,  '40': 8.071,  '80': 7.981,  xs: 7.625,  '160': 6.813, xxs: 6.063 },
  '10':   { std: 10.020, '40': 10.020, '80': 9.750,  xs: 9.750,  '160': 8.500, xxs: 7.625 },
  '12':   { std: 11.938, '40': 11.938, '80': 11.626, xs: 11.374, '160':10.126, xxs: 9.314 },
  '14':   { std: 13.250, '40': 13.124, '80': 12.500, xs: 12.500, '160':11.188, xxs:10.126 },
  '16':   { std: 15.250, '40': 15.000, '80': 14.314, xs: 14.314, '160':12.814, xxs:11.500 },
  '18':   { std: 17.250, '40': 17.000, '80': 16.126, xs: 16.126, '160':14.438, xxs:13.126 },
  '20':   { std: 19.250, '40': 19.000, '80': 18.376, xs: 18.376, '160':16.064, xxs:14.751 },
  '24':   { std: 23.250, '40': 23.000, '80': 22.626, xs: 22.376, '160':19.314, xxs:17.751 },
}

function Lbl({ children }: { children: React.ReactNode }) {
  return <label style={{ display: 'block', fontSize: 8, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{children}</label>
}
function Inp({ id, value, step, onChange }: { id: string; value: string; step?: string; onChange: (v: string) => void }) {
  return (
    <input id={id} type="number" value={value} step={step ?? '0.1'}
      onChange={e => onChange(e.target.value)}
      style={{ width: '100%', background: '#050e1a', border: '1px solid #1e3a5f', color: '#c8d8e4', padding: '6px 8px', borderRadius: 4, fontSize: 11, fontFamily: 'var(--font)', outline: 'none' }}
      onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#f59e0b'}
      onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#1e3a5f'}
    />
  )
}
function Sel({ id, value, options, onChange }: { id: string; value: string; options: Array<{v:string;l:string}>; onChange: (v: string) => void }) {
  return (
    <select id={id} value={value} onChange={e => onChange(e.target.value)}
      style={{ width: '100%', background: '#050e1a', border: '1px solid #1e3a5f', color: '#c8d8e4', padding: '6px 8px', borderRadius: 4, fontSize: 11, fontFamily: 'var(--font)', outline: 'none' }}>
      {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  )
}
function Res({ rows }: { rows: Array<{label: string; value: string; color?: string}> }) {
  return (
    <div style={{ background: '#050e1a', border: '1px solid rgba(37,99,235,.27)', borderRadius: 4, padding: 10, marginTop: 8 }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: i < rows.length - 1 ? 5 : 0 }}>
          <span style={{ fontSize: 9, color: '#64748b' }}>{r.label}</span>
          <span style={{ fontSize: 12, color: r.color ?? '#10b981', fontWeight: 700 }}>{r.value}</span>
        </div>
      ))}
    </div>
  )
}
function Card({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: 6, padding: 14 }}>
      <div style={{ fontSize: 11, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span>{icon}</span>{title}
      </div>
      {children}
    </div>
  )
}

// --- PIPE SIZING ---
function PipeSizing() {
  const [nps, setNps] = useState('4')
  const [sch, setSch] = useState('std')
  const [flow, setFlow] = useState('500')
  const id_in = PIPE[nps]?.[sch] ?? 4.026
  const area_ft2 = Math.PI * (id_in / 24) ** 2
  const q_cfs = parseFloat(flow) / 448.83
  const vel = area_ft2 > 0 ? q_cfs / area_ft2 : 0
  const area_in2 = area_ft2 * 144
  const velColor = vel > 15 ? '#ef4444' : vel > 10 ? '#f59e0b' : '#10b981'
  return (
    <Card title="Dimensionnement Conduite" icon="◉">
      <div style={{ marginBottom: 10 }}><Lbl>NPS — Diamètre Nominal (pouces)</Lbl>
        <Sel id="nps" value={nps} onChange={setNps} options={Object.keys(PIPE).map(v => ({ v, l: `NPS ${v}"` }))} />
      </div>
      <div style={{ marginBottom: 10 }}><Lbl>Schedule (épaisseur)</Lbl>
        <Sel id="sch" value={sch} onChange={setSch} options={[{v:'std',l:'STD'},{v:'40',l:'SCH 40'},{v:'80',l:'SCH 80'},{v:'xs',l:'XS'},{v:'160',l:'SCH 160'},{v:'xxs',l:'XXS'}]} />
      </div>
      <div style={{ marginBottom: 10 }}><Lbl>Débit volumique (GPM — US gal/min)</Lbl><Inp id="flow" value={flow} step="10" onChange={setFlow} /></div>
      <Res rows={[
        { label: 'Ø interne (ID)', value: `${id_in.toFixed(3)}"` },
        { label: 'Section écoulement', value: `${area_in2.toFixed(3)} in²` },
        { label: 'Débit volumique', value: `${parseFloat(flow).toFixed(0)} GPM` },
        { label: 'Vitesse fluide', value: `${vel.toFixed(2)} ft/s`, color: velColor },
      ]} />
      <div style={{ fontSize: 8, marginTop: 6, color: velColor }}>
        {vel > 15 ? '▲ Vitesse excessive — risque érosion' : vel > 10 ? '▲ Vitesse élevée — vérifier' : '● Vitesse acceptable'}
      </div>
    </Card>
  )
}

// --- ORIFICE PLATE ---
function OrificePlate() {
  const [D, setD] = useState('4.026')
  const [d, setD2] = useState('2.400')
  const [dp, setDp] = useState('25')
  const [rho, setRho] = useState('44.9')
  const Dv = parseFloat(D) || 1, dv = parseFloat(d) || 0.5
  const beta = dv / Dv
  const Cd = 0.61
  const A0 = Math.PI * (dv / 24) ** 2
  const dP_lbft2 = parseFloat(dp) * 144
  const q_cfs = Cd * (A0 / Math.sqrt(1 - beta ** 4)) * Math.sqrt(2 * dP_lbft2 * 32.174 / parseFloat(rho))
  const q_gpm = q_cfs * 448.83
  const betaOk = beta >= 0.2 && beta <= 0.75
  return (
    <Card title="Plaque à Orifice (ISO 5167)" icon="◎">
      <div style={{ marginBottom: 10 }}><Lbl>Ø interne conduite D (pouces)</Lbl><Inp id="oD" value={D} step="0.001" onChange={setD} /></div>
      <div style={{ marginBottom: 10 }}><Lbl>Ø orifice d (pouces)</Lbl><Inp id="od" value={d} step="0.01" onChange={setD2} /></div>
      <div style={{ marginBottom: 10 }}><Lbl>Pression différentielle ΔP (PSI)</Lbl><Inp id="dp" value={dp} onChange={setDp} /></div>
      <div style={{ marginBottom: 10 }}><Lbl>Densité fluide (lb/ft³)</Lbl><Inp id="rho" value={rho} onChange={setRho} /></div>
      <Res rows={[
        { label: 'Ratio β = d/D', value: beta.toFixed(4), color: betaOk ? '#10b981' : '#ef4444' },
        { label: 'Aire orifice', value: `${(Math.PI * dv * dv / 4).toFixed(4)} in²` },
        { label: 'Débit mesuré (GPM)', value: `${q_gpm.toFixed(1)} GPM` },
        { label: 'Débit (ft³/s)', value: `${q_cfs.toFixed(3)} ft³/s` },
      ]} />
      <div style={{ fontSize: 8, marginTop: 6, color: betaOk ? '#10b981' : '#ef4444' }}>
        {betaOk ? '● β dans plage ISO 5167 [0.20 – 0.75]' : '▲ β hors plage ISO 5167 [0.20 – 0.75]'}
      </div>
    </Card>
  )
}

// --- PRESSURE DROP (Darcy-Weisbach) ---
function PressureDrop() {
  const [d, setD] = useState('4.026')
  const [L, setL] = useState('100')
  const [v, setV] = useState('10')
  const [f, setF] = useState('0.020')
  const [rho, setRho] = useState('44.9')
  const d_ft = parseFloat(d) / 12
  const hL = f !== '' ? parseFloat(f) * (parseFloat(L) / d_ft) * (parseFloat(v) ** 2 / (2 * 32.174)) : 0
  const dP_psi = hL * parseFloat(rho) / 144
  const dP_bar = dP_psi * 0.0689476
  return (
    <Card title="Perte de Charge — Darcy-Weisbach" icon="▦">
      <div style={{ marginBottom: 10 }}><Lbl>Ø interne conduite (pouces)</Lbl><Inp id="pdd" value={d} step="0.001" onChange={setD} /></div>
      <div style={{ marginBottom: 10 }}><Lbl>Longueur conduite (pieds — ft)</Lbl><Inp id="pdL" value={L} step="1" onChange={setL} /></div>
      <div style={{ marginBottom: 10 }}><Lbl>Vitesse fluide (ft/s)</Lbl><Inp id="pdv" value={v} onChange={setV} /></div>
      <div style={{ marginBottom: 10 }}><Lbl>Facteur de friction Darcy (f)</Lbl><Inp id="pdf" value={f} step="0.001" onChange={setF} /></div>
      <div style={{ marginBottom: 10 }}><Lbl>Densité fluide (lb/ft³)</Lbl><Inp id="pdrho" value={rho} onChange={setRho} /></div>
      <Res rows={[
        { label: 'Perte de charge hL', value: `${hL.toFixed(2)} ft`, color: hL > 50 ? '#f59e0b' : '#10b981' },
        { label: 'ΔP (psi)', value: `${dP_psi.toFixed(3)} psi` },
        { label: 'ΔP (bar)', value: `${dP_bar.toFixed(4)} bar` },
      ]} />
    </Card>
  )
}

// --- VELOCITY & REYNOLDS ---
function VelocityReynolds() {
  const [d, setD] = useState('4.026')
  const [q, setQ] = useState('500')
  const [nu, setNu] = useState('0.500')
  const d_ft = parseFloat(d) / 12
  const A = Math.PI * d_ft ** 2 / 4
  const q_cfs = parseFloat(q) / 448.83
  const vel = A > 0 ? q_cfs / A : 0
  const nu_ft2s = parseFloat(nu) / 92903
  const Re = nu_ft2s > 0 ? (vel * d_ft / nu_ft2s) : 0
  const regime = Re < 2300 ? 'Laminaire' : Re < 4000 ? 'Transitoire' : 'Turbulent'
  const rColor = Re < 2300 ? '#06b6d4' : Re < 4000 ? '#f59e0b' : '#10b981'
  return (
    <Card title="Vitesse & Nombre de Reynolds" icon="◈">
      <div style={{ marginBottom: 10 }}><Lbl>Ø interne conduite (pouces)</Lbl><Inp id="red" value={d} step="0.001" onChange={setD} /></div>
      <div style={{ marginBottom: 10 }}><Lbl>Débit volumique (GPM)</Lbl><Inp id="req" value={q} step="1" onChange={setQ} /></div>
      <div style={{ marginBottom: 10 }}><Lbl>Viscosité cinématique (cSt)</Lbl><Inp id="renu" value={nu} step="0.01" onChange={setNu} /></div>
      <Res rows={[
        { label: 'Débit (ft³/s)', value: `${q_cfs.toFixed(4)} ft³/s` },
        { label: 'Vitesse fluide', value: `${vel.toFixed(3)} ft/s` },
        { label: 'Nombre de Reynolds', value: Math.round(Re).toLocaleString('fr-FR') },
        { label: 'Régime d\'écoulement', value: regime, color: rColor },
      ]} />
    </Card>
  )
}

export function Tools() {
  void useCallback // keep import happy
  return (
    <div style={{ padding: 16, overflowY: 'auto', flex: 1, animation: 'fadeIn .25s ease' }}>
      <div style={{ fontSize: 9, color: '#64748b', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
        Système imperial · Pouces (") · PSI · ft/s · GPM · lb/ft³
        <div style={{ flex: 1, height: 1, background: '#1e3a5f' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 12 }}>
        <PipeSizing />
        <OrificePlate />
        <PressureDrop />
        <VelocityReynolds />
      </div>
    </div>
  )
}
