# MrBIM Field Inspector — Android

Aplicación móvil local basada en Capacitor. Reutiliza el editor, el visor y el importador IFC/GLB de MrBIM sin depender de una URL remota para iniciar.

## Desarrollo

```bash
npm install --no-package-lock --ignore-scripts --legacy-peer-deps
npm run build -w @pascal-app/core
npm run build -w @pascal-app/viewer
npm run build -w @pascal-app/nodes
npm run build -w @pascal-app/ifc-converter
npx tsc --build packages/editor/tsconfig.json
NODE_OPTIONS=--max-old-space-size=4096 npm run build -w @mrbim/mobile
npm run android:sync -w @mrbim/mobile
```

## APK de prueba

El workflow `MrBIM Android APK` genera `app-debug.apk` como artefacto descargable de GitHub Actions.

## Google Play

El identificador permanente es `com.mrbim.fieldinspector`. Para publicar se requiere generar un AAB firmado con una clave de carga privada y completar la ficha de Play Console. Las claves nunca deben guardarse en el repositorio.
