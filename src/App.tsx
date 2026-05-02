import { useState } from 'react'
import type { PageName, DCSScreen, InstrumentTag } from './types'
import { Sidebar } from './components/Sidebar'
import { TopBar } from './components/TopBar'
import { Home } from './pages/Home'
import { DCS } from './pages/DCS'
import { DCSDetail } from './pages/DCSDetail'
import { Tools } from './pages/Tools'
import { About } from './pages/About'

export default function App() {
  const [page, setPage]       = useState<PageName>('home')
  const [currentDCS, setDCS]  = useState<DCSScreen | null>(null)
  const [tagStore, setTagStore]   = useState<Record<string, InstrumentTag[]>>({})
  const [imageStore, setImageStore] = useState<Record<string, string>>({})

  function navigate(p: PageName, dcs?: DCSScreen) {
    setPage(p)
    if (dcs) setDCS(dcs)
  }

  function goBack() {
    if (page === 'dcs-detail') { setPage('dcs'); return }
    setPage('home')
  }

  function saveTags(id: string, tags: InstrumentTag[]) {
    setTagStore(prev => ({ ...prev, [id]: tags }))
  }

  function saveImage(id: string, img: string) {
    setImageStore(prev => ({ ...prev, [id]: img }))
  }

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'#0a0f1a' }}>
      <Sidebar current={page} onNav={(p) => navigate(p)} />

      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>
        <TopBar current={page} dcs={currentDCS} onBack={goBack} />

        {page === 'home'       && <Home />}
        {page === 'dcs'        && <DCS onSelect={dcs => navigate('dcs-detail', dcs)} />}
        {page === 'dcs-detail' && currentDCS && (
          <DCSDetail
            dcs={currentDCS}
            savedTags={tagStore[currentDCS.id] ?? []}
            savedImage={imageStore[currentDCS.id] ?? null}
            onSaveTags={saveTags}
            onSaveImage={saveImage}
          />
        )}
        {page === 'tools'      && <Tools />}
        {page === 'about'      && <About />}
      </div>
    </div>
  )
}
