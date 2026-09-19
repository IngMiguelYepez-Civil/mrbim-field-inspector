'use client'

import { type AnyNode, type AnyNodeId, ScanNode, saveAsset, useScene } from '@pascal-app/core'
import { useViewer } from '@pascal-app/editor'
import { convertIfcToPascal } from '@pascal-app/ifc-converter'
import { Box, FileUp, LoaderCircle } from 'lucide-react'
import { type ChangeEvent, useRef, useState } from 'react'

const ACCEPTED_EXTENSIONS = ['ifc', 'glb', 'gltf'] as const
const MAX_LOCAL_FILE_BYTES = 250 * 1024 * 1024

type ImportStatus = 'idle' | 'reading' | 'converting' | 'done' | 'error'

function extensionOf(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() ?? ''
}

function firstNodeOfType(nodes: Record<string, AnyNode>, type: string): AnyNode | undefined {
  return Object.values(nodes).find((node) => node.type === type)
}

export function ImportModelTab() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<ImportStatus>('idle')
  const [message, setMessage] = useState('Seleccione un modelo IFC, GLB o GLTF.')

  const importIfc = async (file: File) => {
    const confirmed = window.confirm(
      'Importar un IFC reemplazará la escena actual. ¿Desea continuar?',
    )
    if (!confirmed) {
      setStatus('idle')
      setMessage('Importación cancelada; la escena actual no fue modificada.')
      return
    }

    setStatus('converting')
    setMessage('Convirtiendo el modelo IFC y sus propiedades BIM…')
    const data = new Uint8Array(await file.arrayBuffer())
    const sceneGraph = await convertIfcToPascal(data, (progressMessage, percent) => {
      setMessage(`${progressMessage} (${Math.round(percent)} %)`)
    })

    const nodes = sceneGraph.nodes as Record<string, AnyNode>
    useScene
      .getState()
      .setScene(nodes as Record<AnyNodeId, AnyNode>, sceneGraph.rootNodeIds as AnyNodeId[])

    const building = firstNodeOfType(nodes, 'building')
    const level = firstNodeOfType(nodes, 'level')
    useViewer.getState().setSelection({
      buildingId: (building?.id ?? null) as never,
      levelId: (level?.id ?? null) as never,
      zoneId: null,
      selectedIds: [],
    })
    setStatus('done')
    setMessage(`IFC importado: ${file.name}`)
  }

  const importWebModel = async (file: File) => {
    const scene = useScene.getState()
    const selectedLevelId = useViewer.getState().selection.levelId
    const fallbackLevel = Object.values(scene.nodes).find((node) => node.type === 'level')
    const levelId = selectedLevelId ?? fallbackLevel?.id

    if (!levelId) {
      throw new Error('Cree o seleccione un nivel antes de importar el modelo 3D.')
    }

    setStatus('reading')
    setMessage('Guardando el modelo localmente en este dispositivo…')
    const assetUrl = await saveAsset(file)
    const scan = ScanNode.parse({
      type: 'scan',
      name: file.name.replace(/\.(glb|gltf)$/i, ''),
      parentId: levelId,
      url: assetUrl,
      opacity: 100,
    })
    scene.createNode(scan, levelId as AnyNodeId)
    useViewer.getState().setShowScans(true)
    setStatus('done')
    setMessage(`${file.name} añadido a la escena actual.`)
  }

  const handleFile = async (file: File) => {
    const extension = extensionOf(file.name)
    if (!ACCEPTED_EXTENSIONS.includes(extension as (typeof ACCEPTED_EXTENSIONS)[number])) {
      setStatus('error')
      setMessage('Formato no compatible. Use IFC, GLB o GLTF.')
      return
    }
    if (file.size > MAX_LOCAL_FILE_BYTES) {
      setStatus('error')
      setMessage('El archivo supera 250 MB. Optimícelo antes de usarlo en un teléfono.')
      return
    }

    try {
      setStatus('reading')
      setMessage(`Leyendo ${file.name}…`)
      if (extension === 'ifc') await importIfc(file)
      else await importWebModel(file)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'No se pudo importar el modelo.')
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file) void handleFile(file)
  }

  const isBusy = status === 'reading' || status === 'converting'

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div>
        <h2 className="font-semibold text-base">Importar modelo</h2>
        <p className="mt-1 text-muted-foreground text-xs">
          IFC conserva información BIM. GLB y GLTF se añaden como modelos de referencia.
        </p>
      </div>

      <input
        accept=".ifc,.glb,.gltf,model/gltf-binary,model/gltf+json"
        className="hidden"
        disabled={isBusy}
        onChange={handleChange}
        ref={inputRef}
        type="file"
      />
      <button
        className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-muted/30 p-4 text-center transition-colors hover:bg-muted/60 disabled:cursor-wait disabled:opacity-60"
        disabled={isBusy}
        onClick={() => inputRef.current?.click()}
        type="button"
      >
        {isBusy ? (
          <LoaderCircle aria-hidden className="size-8 animate-spin text-primary" />
        ) : (
          <FileUp aria-hidden className="size-8 text-primary" />
        )}
        <span className="font-medium text-sm">Seleccionar archivo</span>
        <span className="text-muted-foreground text-xs">IFC · GLB · GLTF · máximo 250 MB</span>
      </button>

      <div
        aria-live="polite"
        className={`rounded-lg border p-3 text-xs ${
          status === 'error'
            ? 'border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300'
            : status === 'done'
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
              : 'border-border bg-background text-muted-foreground'
        }`}
      >
        {message}
      </div>

      <div className="mt-auto flex gap-2 rounded-lg bg-muted/40 p-3 text-muted-foreground text-xs">
        <Box aria-hidden className="mt-0.5 size-4 shrink-0" />
        <p>
          Los archivos permanecen en el dispositivo. Un GLTF con texturas externas debe convertirse
          previamente a GLB para conservar todos sus recursos.
        </p>
      </div>
    </div>
  )
}
