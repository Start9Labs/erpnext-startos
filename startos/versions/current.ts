import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.52.1:0',
  releaseNotes: {
    en_US:
      'Updated ERPNext to 16.52.1. Reposted Purchase Receipt returns for moving-average items now use the current average stock cost instead of the original purchase rate, reducing the risk of negative stock values affecting later transfers. [Full upstream release notes](https://github.com/frappe/erpnext/releases/tag/v16.52.1)',
    es_ES:
      'ERPNext se actualizó a la versión 16.52.1. Las devoluciones de recepciones de compra recalculadas para artículos con valoración por coste medio ahora usan el coste medio actual de las existencias en lugar del precio de compra original, lo que reduce el riesgo de valores de existencias negativos que afecten a transferencias posteriores. [Notas completas de la versión original](https://github.com/frappe/erpnext/releases/tag/v16.52.1)',
    de_DE:
      'ERPNext wurde auf Version 16.52.1 aktualisiert. Neu berechnete Retouren von Wareneingängen für Artikel mit gleitender Durchschnittsbewertung verwenden nun die aktuellen durchschnittlichen Lagerkosten statt des ursprünglichen Einkaufspreises. Dadurch sinkt das Risiko negativer Bestandswerte bei späteren Umlagerungen. [Vollständige Upstream-Versionshinweise](https://github.com/frappe/erpnext/releases/tag/v16.52.1)',
    pl_PL:
      'Zaktualizowano ERPNext do wersji 16.52.1. Przeliczane zwroty przyjęć zakupu dla artykułów wycenianych według średniej ruchomej używają teraz bieżącego średniego kosztu zapasów zamiast pierwotnej ceny zakupu, zmniejszając ryzyko ujemnych wartości zapasów wpływających na późniejsze przesunięcia. [Pełne informacje o wydaniu projektu źródłowego](https://github.com/frappe/erpnext/releases/tag/v16.52.1)',
    fr_FR:
      'ERPNext a été mis à jour vers la version 16.52.1. Les retours de réceptions d’achat recalculés pour les articles valorisés au coût moyen utilisent désormais le coût moyen actuel du stock au lieu du prix d’achat initial, réduisant le risque de valeurs de stock négatives affectant les transferts ultérieurs. [Notes de version amont complètes](https://github.com/frappe/erpnext/releases/tag/v16.52.1)',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
