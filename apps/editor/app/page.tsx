'use client'

import { Editor, ItemsPanel } from '@pascal-app/editor'
import { Hammer, Layers, Package, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { BuildTab } from '@/components/build-tab'
import {
  CommunityViewerToolbarLeft,
  CommunityViewerToolbarRight,
} from '@/components/viewer-toolbar'

// The open-source editor only ships the built-in catalog (no uploaded items),
// so the Library/Community/Mine source chips and tag filters add nothing —
// drop them and keep the panel to plain categories.
function EditorItemsPanel() {
  return <ItemsPanel showSourceFilter={false} showTagFilters={false} />
}

const SIDEBAR_TABS = [
  {
    id: 'site',
    label: 'Scene',
    component: () => null,
    mobileDefaultSnap: 0.5,
    mobileIcon: <Layers className="h-5 w-5" />,
    icon: (
      <Image
        alt=""
        className="h-8 w-8 object-contain"
        height={32}
        src="/icons/scene.webp"
        width={32}
      />
    ),
  },
  {
    id: 'build',
    label: 'Build',
    component: BuildTab,
    mobileDefaultSnap: 0.5,
    mobileIcon: <Hammer className="h-5 w-5" />,
    icon: (
      <Image
        alt=""
        className="h-8 w-8 object-contain"
        height={32}
        src="/icons/build.webp"
        width={32}
      />
    ),
  },
  {
    id: 'items',
    label: 'Items',
    component: EditorItemsPanel,
    mobileDefaultSnap: 0.5,
    mobileIcon: <Package className="h-5 w-5" />,
    icon: (
      <Image
        alt=""
        className="h-8 w-8 object-contain"
        height={32}
        src="/icons/couch.webp"
        width={32}
      />
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    component: () => null,
    mobileDefaultSnap: 0.5,
    mobileIcon: <Settings className="h-5 w-5" />,
    icon: (
      <Image
        alt=""
        className="h-8 w-8 object-contain"
        height={32}
        src="/icons/settings.webp"
        width={32}
      />
    ),
  },
]

const PROJECT_ID = 'local-editor'

export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      {PROJECT_ID === 'local-editor' && (
        <div className="pointer-events-none absolute top-[max(0.75rem,env(safe-area-inset-top))] left-1/2 z-40 w-[calc(100%-1rem)] max-w-xl -translate-x-1/2">
          <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-2xl border border-border/60 bg-background/90 px-3 py-2 text-center text-xs shadow-sm backdrop-blur sm:rounded-full sm:px-4 sm:py-1.5">
            <strong className="text-foreground">MrBIM Field Inspector</strong>\n            <span className="text-muted-foreground">Modo local — las escenas aún no se sincronizan.</span>
            <Link className="font-medium text-foreground hover:underline" href="/scenes">
              Abrir escenas
            </Link>
            <span aria-hidden className="text-muted-foreground">
              ·
            </span>
            <Link className="font-medium text-foreground hover:underline" href="/scenes">
              Crear nueva
            </Link>
          </div>
        </div>
      )}
      <Editor
        layoutVersion="v2"
        projectId={PROJECT_ID}
        sidebarTabs={SIDEBAR_TABS}
        viewerToolbarLeft={<CommunityViewerToolbarLeft />}
        viewerToolbarRight={<CommunityViewerToolbarRight />}
      />
    </div>
  )
}
