import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.60.0:1',
  releaseNotes: {
    en_US: `ERPNext's bundled Redis cache and job queue accept connections from ERPNext alone.`,
    es_ES: `La caché y la cola de trabajos Redis incluidas en ERPNext solo aceptan conexiones de ERPNext.`,
    de_DE: `Der mitgelieferte Redis-Cache und die Job-Warteschlange von ERPNext nehmen nur Verbindungen von ERPNext an.`,
    pl_PL: `Dołączona pamięć podręczna i kolejka zadań Redis przyjmują połączenia wyłącznie od ERPNext.`,
    fr_FR: `Le cache et la file de tâches Redis intégrés à ERPNext n'acceptent les connexions que d'ERPNext.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
