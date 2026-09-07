import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.32.3:1',
  releaseNotes: {
    en_US: 'Initial release of ERPNext for StartOS',
    es_ES: 'Lanzamiento inicial de ERPNext para StartOS',
    de_DE: 'Erstveröffentlichung von ERPNext für StartOS',
    pl_PL: 'Pierwsze wydanie ERPNext dla StartOS',
    fr_FR: "Première version d'ERPNext pour StartOS",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
