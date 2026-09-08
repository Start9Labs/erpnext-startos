import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.32.3:2',
  releaseNotes: {
    en_US: 'Backups and restores are substantially faster.',
    es_ES:
      'Las copias de seguridad y las restauraciones son sustancialmente más rápidas.',
    de_DE: 'Backups und Wiederherstellungen sind deutlich schneller.',
    pl_PL: 'Tworzenie i przywracanie kopii zapasowych jest znacznie szybsze.',
    fr_FR: 'Les sauvegardes et les restaurations sont nettement plus rapides.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
