import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.51.1:0',
  releaseNotes: {
    en_US:
      'Updated ERPNext to 16.51.1. Corrected Stock Closing Entry validation and balance generation. The Stock Balance report now applies item, warehouse, and dimension filters to opening balances and avoids counting closed stock twice in ageing calculations. [Full upstream release notes](https://github.com/frappe/erpnext/releases/tag/v16.51.1)',
    es_ES:
      'ERPNext se actualizó a la versión 16.51.1. Se corrigieron la validación y la generación de saldos de Stock Closing Entry. El informe Stock Balance ahora aplica los filtros de artículo, almacén y dimensión a los saldos iniciales y evita contar dos veces las existencias incluidas en un cierre al calcular su antigüedad. [Notas completas de la versión original](https://github.com/frappe/erpnext/releases/tag/v16.51.1)',
    de_DE:
      'ERPNext wurde auf Version 16.51.1 aktualisiert. Validierung und Saldenberechnung von Stock Closing Entry wurden korrigiert. Der Bericht Stock Balance wendet Artikel-, Lager- und Dimensionsfilter nun auf Anfangsbestände an und zählt bereits abgeschlossene Bestände bei der Altersberechnung nicht mehr doppelt. [Vollständige Upstream-Versionshinweise](https://github.com/frappe/erpnext/releases/tag/v16.51.1)',
    pl_PL:
      'Zaktualizowano ERPNext do wersji 16.51.1. Poprawiono walidację i generowanie sald w Stock Closing Entry. Raport Stock Balance stosuje teraz filtry artykułów, magazynów i wymiarów do sald początkowych oraz nie liczy dwukrotnie zapasów objętych zamknięciem przy obliczaniu ich wieku. [Pełne informacje o wydaniu projektu źródłowego](https://github.com/frappe/erpnext/releases/tag/v16.51.1)',
    fr_FR:
      'ERPNext a été mis à jour vers la version 16.51.1. La validation et la génération des soldes de Stock Closing Entry ont été corrigées. Le rapport Stock Balance applique désormais les filtres d’article, d’entrepôt et de dimension aux soldes d’ouverture et évite de compter deux fois les stocks déjà clôturés dans le calcul de leur ancienneté. [Notes de version amont complètes](https://github.com/frappe/erpnext/releases/tag/v16.51.1)',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
