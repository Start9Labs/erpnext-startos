import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.32.3:3',
  releaseNotes: {
    en_US: 'Backups include the MariaDB data directory and are larger.',
    es_ES:
      'Las copias de seguridad incluyen el directorio de datos de MariaDB y son más grandes.',
    de_DE: 'Backups enthalten das MariaDB-Datenverzeichnis und sind größer.',
    pl_PL: 'Kopie zapasowe zawierają katalog danych MariaDB i są większe.',
    fr_FR:
      'Les sauvegardes incluent le répertoire de données de MariaDB et sont plus volumineuses.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
