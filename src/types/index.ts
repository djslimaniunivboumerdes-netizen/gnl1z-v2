export type PageName = 'home' | 'dcs' | 'dcs-detail' | 'tools' | 'about'

export interface DCSScreen {
  id: string
  name: string
  area: string
  status: 'run' | 'idle'
  tags: string[]
}

export interface InstrumentTag {
  id: string
  type: string
  desc: string
  val: string
}
