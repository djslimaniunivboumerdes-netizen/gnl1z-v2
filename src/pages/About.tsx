import { SonatrachLogo } from '../components/SonatrachLogo'

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: 6, padding: 14 }}>
      <div style={{ fontSize: 10, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, paddingBottom: 6, borderBottom: '1px solid #1e3a5f' }}>{title}</div>
      {children}
    </div>
  )
}
function Row({ k, v, hl }: { k: string; v: React.ReactNode; hl?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6, gap: 8 }}>
      <span style={{ fontSize: 9, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, flexShrink: 0 }}>{k}</span>
      <span style={{ fontSize: 10, color: hl ? '#10b981' : '#c8d8e4', textAlign: 'right', lineHeight: 1.4 }}>{v}</span>
    </div>
  )
}
function Para({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 10, color: '#94a3b8', lineHeight: 1.65, marginBottom: 8 }}>{children}</p>
}
function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  const cfg: Record<string,{bg:string;c:string;b:string}> = {
    green: { bg:'#064e3b', c:'#10b981', b:'#065f46' },
    amber: { bg:'#451a03', c:'#f59e0b', b:'#78350f' },
    blue:  { bg:'#1e3a5f', c:'#3b82f6', b:'rgba(59,130,246,.4)' },
  }
  const s = cfg[color]
  return <span style={{ display:'inline-block', padding:'2px 8px', borderRadius:3, fontSize:8, fontWeight:700, letterSpacing:0.5, background:s.bg, color:s.c, border:`1px solid ${s.b}` }}>{children}</span>
}
function TlItem({ year, title, text }: { year: string; title: string; text: string }) {
  return (
    <div style={{ display:'flex', gap:10, paddingBottom:14, position:'relative' }}>
      <div style={{ position:'absolute', left:19, top:22, bottom:0, width:1, background:'#1e3a5f' }} />
      <div style={{ width:40, height:40, borderRadius:'50%', background:'#1f2d42', border:'1px solid #f59e0b', display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, color:'#f59e0b', fontWeight:700, flexShrink:0, zIndex:1 }}>{year}</div>
      <div style={{ flex:1, paddingTop:4 }}>
        <div style={{ fontSize:10, color:'#f59e0b', fontWeight:700 }}>{title}</div>
        <div style={{ fontSize:9, color:'#64748b', lineHeight:1.5, marginTop:2 }}>{text}</div>
      </div>
    </div>
  )
}

const PROCESS_FLOW = [
  "Hassi R'Mel","Pipeline SONATRACH","Désentanisation","Déshydratation","Démérc./CO₂","Liquéfaction","Stockage GNL","Chargement navires","Europe / Asie"
]

export function About() {
  return (
    <div style={{ padding:16, overflowY:'auto', flex:1, animation:'fadeIn .25s ease' }}>

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0d1626,#1a2332)', border:'1px solid #1e3a5f', borderRadius:6, padding:20, marginBottom:14, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', right:-10, top:-10, fontSize:90, color:'#1a2332', fontWeight:900, letterSpacing:-4, pointerEvents:'none', userSelect:'none' }}>GNL1Z</div>
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:14, position:'relative', zIndex:1 }}>
          <SonatrachLogo size={60} />
          <div>
            <div style={{ fontSize:18, color:'#f59e0b', fontWeight:700, letterSpacing:2 }}>GNL1Z — TERMINAL GNL D'ARZEW</div>
            <div style={{ fontSize:11, color:'#64748b', marginTop:4 }}>Sonatrach S.p.A · Arzew, Wilaya d'Oran, Algérie · Premier terminal GNL d'exportation au monde</div>
            <div style={{ marginTop:10, display:'flex', gap:6, flexWrap:'wrap' }}>
              <Badge color="green">OPÉRATIONNEL</Badge>
              <Badge color="blue">GNL / GPL</Badge>
              <Badge color="amber">Depuis 1964</Badge>
              <Badge color="blue">ISO 9001</Badge>
            </div>
          </div>
        </div>
        {/* Process flow */}
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ fontSize:9, color:'#64748b', textTransform:'uppercase', letterSpacing:1.5, marginBottom:6 }}>Schéma de Procédé Simplifié</div>
          <div style={{ display:'flex', alignItems:'center', gap:4, flexWrap:'wrap', background:'#1f2d42', padding:10, borderRadius:4 }}>
            {PROCESS_FLOW.map((s, i) => (
              <span key={i} style={{ display:'flex', alignItems:'center', gap:4 }}>
                <span style={{ background:'#111827', border:'1px solid rgba(37,99,235,.27)', color:'#06b6d4', fontSize:8, padding:'3px 8px', borderRadius:3 }}>{s}</span>
                {i < PROCESS_FLOW.length - 1 && <span style={{ color:'#64748b', fontSize:10 }}>→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:12, marginBottom:12 }}>

        {/* Technical Specs */}
        <Card title="Caractéristiques Techniques">
          <Row k="Localisation" v={<>Arzew, Wilaya d'Oran, Algérie<br/>35°49′N 0°19′E</>} />
          <Row k="Opérateur" v="Sonatrach S.p.A" hl />
          <Row k="Mise en service" v="1964 (premier au monde)" hl />
          <Row k="Capacité nominale" v="8.8 MTPA GNL" hl />
          <Row k="Trains liquéfaction" v="6 trains (Cascade classique)" />
          <Row k="Technologie" v="Cascade Propane / Éthylène / Méthane" />
          <Row k="Température GNL" v="-162 °C  (-260 °F)" />
          <Row k="Réservoirs GNL" v="5 réservoirs double paroi (full containment)" />
          <Row k="Postes chargement" v="3 postes méthaniers simultanés" />
          <Row k="Navires / an" v="~120 escales/an" />
          <Row k="Pression stockage" v="~1.1 bara (atmosphérique)" />
          <Row k="Standard" v="ISO 9001 · OHSAS 18001 · HSE Sonatrach" />
        </Card>

        {/* History Timeline */}
        <Card title="Historique & Jalons">
          <TlItem year="1964" title="Inauguration mondiale"
            text="Premier terminal GNL d'exportation commerciale au monde. Première livraison de GNL vers le Royaume-Uni à bord du méthanier Methane Princess." />
          <TlItem year="1971" title="Nationalisation"
            text="Passage sous contrôle total de Sonatrach lors de la nationalisation des hydrocarbures algériens par le Président Boumédiène." />
          <TlItem year="1981" title="Extension capacité"
            text="Ajout de nouveaux trains de liquéfaction. Diversification des marchés vers la France (GDF), l'Espagne (Enagas) et l'Italie (ENI)." />
          <TlItem year="1996" title="Modernisation"
            text="Programme de rénovation des équipements de compression et échangeurs thermiques. Amélioration du taux de disponibilité." />
          <TlItem year="2006" title="DCS Numérique"
            text="Remplacement des systèmes de contrôle analogiques par des DCS modernes (ABB / Honeywell). Intégration SIS (Safety Instrumented System)." />
          <TlItem year="2024" title="Rénovation & IA"
            text="Programme de maintenance majeure, optimisation procédés, digitalisation et intégration d'outils IA pour la surveillance des instruments." />
        </Card>

        {/* Process & Instrumentation */}
        <Card title="Procédé & Instrumentation">
          <Para>
            GNL1Z utilise le procédé de liquéfaction en cascade classique à trois niveaux. Le gaz naturel provenant de Hassi R'Mel (le plus grand gisement de gaz d'Afrique) est acheminé par pipeline et traité avant liquéfaction.
          </Para>
          <Row k="Gaz entrant" v="~70 bar · ~30 °C" />
          <Row k="Désentanisation" v="Séparateurs entrée train" />
          <Row k="Déshydratation" v="Tamis moléculaires 4Å (mol sieves)" />
          <Row k="Démérc. / CO₂" v="Absorption MDEA (methyldiéthanolamine)" />
          <Row k="Réfrig. 1 — Propane" v="-40 °C / 16 bar" />
          <Row k="Réfrig. 2 — Éthylène" v="-101 °C / 4 bar" />
          <Row k="Réfrig. 3 — Méthane" v="-162 °C / 1.1 bar" />
          <div style={{ height:1, background:'#1e3a5f', margin:'8px 0' }} />
          <Para>
            L'instrumentation comprend plus de 2 000 boucles de mesure et contrôle : transmetteurs de pression (PT), température (TT), débit (FT), niveau (LT), analyseurs (AT-CO₂, AT-H₂S, AT-Hg), vannes de régulation (FCV, PCV, TCV) et systèmes de sécurité (SIS/SIL 2-3).
          </Para>
          <Row k="Système DCS" v="ABB / Honeywell DeltaV" />
          <Row k="Système SIS" v="SIL 2 / SIL 3 certifié" />
          <Row k="Bus terrain" v="FOUNDATION Fieldbus / HART" />
        </Card>

        {/* Markets & Exports */}
        <Card title="Marchés & Exportations">
          <Para>
            GNL1Z est l'un des plus anciens et fidèles fournisseurs de GNL pour l'Europe méridionale et occidentale depuis plus de 60 ans, jouant un rôle stratégique pour la sécurité énergétique européenne.
          </Para>
          <Row k="Principaux clients" v={<>France (GDF Suez), Espagne (Enagas)<br/>Italie (ENI/SNAM), Belgique (Fluxys)<br/>Turquie (Botaş), Portugal (REN)</>} />
          <Row k="Capacité export" v="8.8 MTPA (millions tonnes/an)" hl />
          <Row k="Débit chargement" v="~10 000 m³/h par bras" />
          <Row k="Taille navires" v="70 000 – 177 000 m³ (Q-Flex)" />
          <Row k="Escales/an" v="~120 méthaniers" />
          <div style={{ height:1, background:'#1e3a5f', margin:'8px 0' }} />
          <Row k="Gisement source" v={<>Hassi R'Mel<br/><span style={{color:'#10b981',fontSize:9}}>Plus grand gisement de gaz d'Afrique</span></>} />
          <Row k="Longueur pipeline" v="~550 km (Hassi R'Mel → Arzew)" />
          <Row k="Contenu énergie" v="~1 GNL = 600 gaz naturel (volume)" />
          <div style={{ height:1, background:'#1e3a5f', margin:'8px 0' }} />
          <Para>
            Sonatrach dispose d'une flotte de méthaniers propres et affrète des navires tiers pour desservir ses clients contractuels (contrats long terme 15–25 ans) et les marchés spot selon la conjoncture.
          </Para>
        </Card>

      </div>

      {/* Footer note */}
      <div style={{ background:'#111827', border:'1px solid #1e3a5f', borderRadius:6, padding:12, display:'flex', alignItems:'center', gap:12 }}>
        <SonatrachLogo size={28} />
        <div style={{ fontSize:9, color:'#64748b', lineHeight:1.6 }}>
          <span style={{ color:'#f59e0b', fontWeight:700 }}>GNL1Z Asset Management v2.0</span> — Système de surveillance et gestion des actifs industriels.<br/>
          Développé pour Sonatrach, Arzew, Algérie. Données à titre indicatif — se référer aux documents P&ID et manuels d'exploitation officiels.
        </div>
      </div>
    </div>
  )
}
