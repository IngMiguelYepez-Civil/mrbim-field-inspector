import { Editor, ItemsPanel } from '@pascal-app/editor'
import { FileUp, Hammer, Layers, Package, Settings } from 'lucide-react'
import { BuildTab } from '../../editor/components/build-tab'
import { ImportModelTab } from '../../editor/components/import-model-tab'
import {
  CommunityViewerToolbarLeft,
  CommunityViewerToolbarRight,
} from '../../editor/components/viewer-toolbar'

function EditorItemsPanel() {
  return <ItemsPanel showSourceFilter={false} showTagFilters={false} />
}

const sidebarTabs = [
  {
    id: 'import',
    label: 'Importar',
    component: ImportModelTab,
    mobileDefaultSnap: 0.65,
    mobileIcon: <FileUp className="h-5 w-5" />,
    icon: <FileUp className="h-8 w-8" />,
  },
  {
    id: 'site',
    label: 'Modelo',
    component: () => null,
    mobileDefaultSnap: 0.5,
    mobileIcon: <Layers className="h-5 w-5" />,
    icon: <Layers className="h-8 w-8" />,
  },
  {
    id: 'build',
    label: 'Construir',
    component: BuildTab,
    mobileDefaultSnap: 0.5,
    mobileIcon: <Hammer className="h-5 w-5" />,
    icon: <Hammer className="h-8 w-8" />,
  },
  {
    id: 'items',
    label: 'Objetos',
    component: EditorItemsPanel,
    mobileDefaultSnap: 0.5,
    mobileIcon: <Package className="h-5 w-5" />,
    icon: <Package className="h-8 w-8" />,
  },
  {
    id: 'settings',
    label: 'Ajustes',
    component: () => null,
    mobileDefaultSnap: 0.5,
    mobileIcon: <Settings className="h-5 w-5" />,
    icon: <Settings className="h-8 w-8" />,
  },
]

export function App() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute top-[max(0.5rem,env(safe-area-inset-top))] left-1/2 z-40 -translate-x-1/2">
        <div className="rounded-full border border-border/60 bg-background/90 px-4 py-2 text-center text-xs shadow-sm backdrop-blur">
          <strong>MrBIM Field Inspector</strong>
          <span className="ml-2 text-muted-foreground">Modo móvil local</span>
        </div>
      </div>
      <Editor
        layoutVersion="v2"
        projectId="mrbim-mobile-local"
        sidebarTabs={sidebarTabs}
        viewerToolbarLeft={<CommunityViewerToolbarLeft />}
        viewerToolbarRight={<CommunityViewerToolbarRight />}
      />
    </main>
  )
}
