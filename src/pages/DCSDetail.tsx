import { useState, useRef, useEffect } from 'react'
import type { DCSScreen, InstrumentTag } from '../types'

const TAG_TYPES: Record<string, string> = {
  PT: 'Transmetteur Pression', TT: 'Transmetteur Temp.',    FT: 'Transmetteur Débit',
  LT: 'Transmetteur Niveau',   PIC: 'Rég. Pression',        TIC: 'Rég. Température',
  FIC: 'Rég. Débit',           LIC: 'Rég. Niveau',          FCV: 'Vanne Régulatrice',
  XV:  'Vanne Automatique',    PDT: 'Diff. Pression',        AT: 'Analyseur',
  DP:  'ΔP Transmetteur',      SV:  'Soupape Sécurité',     PCV: 'Vanne Pression',
}
function getType(tag: string) { return TAG_TYPES[tag.split('-')[0]] ?? 'Instrument' }

interface Props {
  dcs: DCSScreen
  savedTags: InstrumentTag[]
  savedImage: string | null
  onSaveTags: (id: string, tags: InstrumentTag[]) => void
  onSaveImage: (id: string, img: string) => void
}

export function DCSDetail({ dcs, savedTags, savedImage, onSaveTags, onSaveImage }: Props) {
  const [image, setImage]   = useState<string | null>(savedImage)
  const [tags, setTags]     = useState<InstrumentTag[]>(savedTags)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setImage(savedImage); setTags(savedTags) }, [dcs.id, savedImage, savedTags])

  const displayTags: InstrumentTag[] = tags.length > 0 ? tags
    : dcs.tags.map(t => ({ id: t, type: getType(t), desc: dcs.area, val: '—' }))

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return
    const reader = new FileReader()
    reader.onload = ev => { const r = ev.target?.result as string; setImage(r); onSaveImage(dcs.id, r) }
    reader.readAsDataURL(f); e.target.value = ''
  }

  async function detectTags() {
    if (!image) return
    setLoading(true); setStatus('Analyse IA de la photo DCS…')
    const b64 = image.split(',')[1]
    const mime = (image.match(/data:([^;]+);/)?.[1] ?? 'image/jpeg') as string
    const prompt = `You are an expert I&C engineer for GNL1Z Sonatrach LNG plant, Arzew, Algeria.
Analyse this DCS screenshot / P&ID image.
Identify ALL instrument tags visible (PT, TT, FT, LT, PIC, TIC, FIC, LIC, FCV, XV, PDT, AT, SV, PCV…).
Return ONLY a valid JSON array, no markdown fences, no explanation.
Each element: {"id":"TAG-XXXX","type":"French type name","desc":"French functional description","val":"value or range if visible"}
Generate 6–15 realistic tags for an LNG liquefaction DCS.`
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1500,
          messages: [{ role: 'user', content: [
            { type: 'image', source: { type: 'base64', media_type: mime, data: b64 } },
            { type: 'text', text: prompt }
          ]}]
        })
      })
      const data = await res.json()
      const text = (data.content as Array<{ type: string; text?: string }>).map(b => b.text ?? '').join('')
      const match = text.match(/\[[\s\S]*\]/)
      if (match) {
        const detected: InstrumentTag[] = JSON.parse(match[0])
        setTags(detected); onSaveTags(dcs.id, detected)
        setStatus(`✓ ${detected.length} tags détectés avec succès`)
      } else { setStatus("Erreur : réponse inattendue de l'IA") }
    } catch (err) { setStatus(`Erreur API : ${(err as Error).message}`) }
    finally { setLoading(false) }
  }

  const isRun = dcs.status === 'run'
  return (
    <div style={{ padding: 16, overflowY: 'auto', flex: 1, animation: 'fadeIn .25s ease' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 12 }}>

        {/* LEFT — photo */}
        <div style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: 6, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '11px 14px', borderBottom: '1px solid #1e3a5f', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>{dcs.id} — {dcs.name}</span>
            <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 10, fontSize: 8, fontWeight: 700, letterSpacing: 0.5,
              background: isRun ? '#064e3b' : '#1c1917', color: isRun ? '#10b981' : '#78716c', border: `1px solid ${isRun ? '#065f46' : '#292524'}` }}>
              {isRun ? 'EN SERVICE' : 'MAINTENANCE'}
            </span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 12, borderRadius: 4,
              border: '2px dashed #1e3a5f', cursor: 'pointer', transition: 'border-color .2s,background .2s', minHeight: 220, padding: 16 }}
            onClick={() => fileRef.current?.click()}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#f59e0b'; (e.currentTarget as HTMLDivElement).style.background = '#1a2332' }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#1e3a5f'; (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
          >
            {image
              ? <img src={image} alt="DCS" style={{ maxWidth: '100%', maxHeight: 280, borderRadius: 4, objectFit: 'contain' }} />
              : <>
                  <div style={{ fontSize: 30, color: '#64748b', marginBottom: 10 }}>+</div>
                  <div style={{ fontSize: 10, color: '#64748b', textAlign: 'center', lineHeight: 1.6 }}>
                    Cliquer pour uploader une photo DCS<br/>
                    <span style={{ fontSize: 9, color: '#475569' }}>PNG · JPG · JPEG</span>
                  </div>
                </>
            }
          </div>
          {image && (
            <button onClick={() => fileRef.current?.click()}
              style={{ margin: '0 12px 12px', background: '#f59e0b', color: '#000', border: 'none', padding: '7px 16px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: 1, cursor: 'pointer', textTransform: 'uppercase' }}>
              Changer la photo
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
        </div>

        {/* RIGHT — tags */}
        <div style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: 6, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '11px 14px', borderBottom: '1px solid #1e3a5f', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>Tags Instruments</span>
            <span style={{ fontSize: 9, color: '#64748b' }}>{displayTags.length} tags</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: 8, maxHeight: 320 }}>
            {displayTags.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '6px 8px', borderRadius: 4, border: '1px solid #1e3a5f', marginBottom: 4, background: '#1f2d42' }}>
                <span style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700, minWidth: 80, flexShrink: 0 }}>{t.id}</span>
                <span style={{ fontSize: 8, color: '#06b6d4', minWidth: 70, flexShrink: 0 }}>{t.type}</span>
                <span style={{ fontSize: 9, color: '#c8d8e4', flex: 1, lineHeight: 1.4 }}>{t.desc}</span>
                <span style={{ fontSize: 9, color: '#10b981', minWidth: 52, textAlign: 'right', flexShrink: 0 }}>{t.val}</span>
              </div>
            ))}
          </div>

          <button disabled={!image || loading} onClick={detectTags}
            style={{ margin: 10, background: '#1e3a5f', border: '1px solid #3b82f6', color: '#3b82f6', padding: 9, borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, cursor: image && !loading ? 'pointer' : 'not-allowed', textTransform: 'uppercase', transition: 'all .2s', opacity: image && !loading ? 1 : 0.5 }}
            onMouseEnter={e => { if (image && !loading) { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#1d4ed8'; b.style.color = '#fff'; b.style.borderColor = '#1d4ed8' } }}
            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#1e3a5f'; b.style.color = '#3b82f6'; b.style.borderColor = '#3b82f6' }}
          >
            {image ? '◈ DÉTECTER TAGS PAR IA' : "Uploader une photo d'abord"}
          </button>

          <div style={{ padding: '8px 12px', fontSize: 9, color: '#06b6d4', borderTop: '1px solid #1e3a5f', display: 'flex', alignItems: 'center', gap: 8, minHeight: 32 }}>
            {loading && <span style={{ display: 'inline-block', width: 9, height: 9, border: '1.5px solid #06b6d4', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin .8s linear infinite', flexShrink: 0 }} />}
            <span>{status || (image ? 'Prêt — Cliquer "Détecter Tags"' : "Uploader une photo DCS pour activer la détection IA")}</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ marginTop: 14, background: '#111827', border: '1px solid #1e3a5f', borderRadius: 6, padding: 12 }}>
        <div style={{ fontSize: 9, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Légende — Types d'Instruments</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {Object.entries(TAG_TYPES).map(([k, v]) => (
            <span key={k} style={{ background: '#1a2332', border: '1px solid rgba(37,99,235,.27)', borderRadius: 3, padding: '2px 7px', fontSize: 8 }}>
              <span style={{ color: '#f59e0b' }}>{k}</span>
              <span style={{ color: '#64748b' }}> — {v}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
