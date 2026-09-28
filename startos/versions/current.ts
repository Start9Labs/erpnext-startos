import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.36.1:0',
  releaseNotes: {
    en_US:
      'Updated ERPNext to 16.36.1. Creating a new CRM record no longer triggers a permission error when loading its activity history before it has been saved. [Full upstream release notes](https://github.com/frappe/erpnext/releases/tag/v16.36.1)',
    es_ES:
      'ERPNext se actualizó a la versión 16.36.1. La creación de un nuevo registro de CRM ya no provoca un error de permisos al cargar su historial de actividad antes de guardarlo. [Notas completas de la versión original](https://github.com/frappe/erpnext/releases/tag/v16.36.1)',
    de_DE:
      'ERPNext wurde auf Version 16.36.1 aktualisiert. Beim Erstellen eines neuen CRM-Eintrags tritt kein Berechtigungsfehler mehr auf, wenn dessen Aktivitätsverlauf vor dem Speichern geladen wird. [Vollständige Upstream-Versionshinweise](https://github.com/frappe/erpnext/releases/tag/v16.36.1)',
    pl_PL:
      'Zaktualizowano ERPNext do wersji 16.36.1. Tworzenie nowego rekordu CRM nie powoduje już błędu uprawnień podczas wczytywania historii aktywności przed zapisaniem rekordu. [Pełne informacje o wydaniu projektu źródłowego](https://github.com/frappe/erpnext/releases/tag/v16.36.1)',
    fr_FR:
      "ERPNext a été mis à jour vers la version 16.36.1. La création d'un nouvel enregistrement CRM ne provoque plus d'erreur d'autorisation lors du chargement de son historique d'activité avant son enregistrement. [Notes de version amont complètes](https://github.com/frappe/erpnext/releases/tag/v16.36.1)",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
