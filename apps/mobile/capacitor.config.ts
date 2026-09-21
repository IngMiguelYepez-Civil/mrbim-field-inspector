import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.mrbim.fieldinspector',
  appName: 'MrBIM Field Inspector',
  webDir: 'dist',
  backgroundColor: '#111827',
  android: {
    allowMixedContent: false,
    backgroundColor: '#111827',
  },
}

export default config
