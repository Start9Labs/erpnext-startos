import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.34.2:0',
  releaseNotes: {
    en_US: `Updated ERPNext to 16.34.2.

**Features**

- Added entity filters to Purchase Analytics and Sales Analytics.
- Added transaction currencies and price lists to Blanket Orders, configurable valuation for secondary items, custom tax calculations based on alternative values, and four Belgian charts of accounts.

**Fixes**

- Strengthened access controls across accounting, banking, POS, project, and stock workflows.
- Corrected manufacturing quantities, bank reconciliation, returns, reports, and numerous accounting and stock calculations.

**Compatibility**

- Financial Report Templates now reject invalid configurations, and the unused \`get_last_interaction\` CRM endpoint was removed.

Full upstream release notes: [16.33.0](https://github.com/frappe/erpnext/releases/tag/v16.33.0), [16.34.0](https://github.com/frappe/erpnext/releases/tag/v16.34.0), [16.34.1](https://github.com/frappe/erpnext/releases/tag/v16.34.1), [16.34.2](https://github.com/frappe/erpnext/releases/tag/v16.34.2)`,
    es_ES: `ERPNext se actualizó a la versión 16.34.2.

**Funciones**

- Se añadieron filtros de entidad a los informes de análisis de compras y ventas.
- Se añadieron monedas de transacción y listas de precios a los pedidos abiertos, valoración configurable para artículos secundarios, cálculos de impuestos basados en valores alternativos y cuatro planes contables belgas.

**Correcciones**

- Se reforzaron los controles de acceso en los procesos de contabilidad, banca, punto de venta, proyectos y existencias.
- Se corrigieron cantidades de fabricación, conciliaciones bancarias, devoluciones, informes y numerosos cálculos contables y de existencias.

**Compatibilidad**

- Las plantillas de informes financieros ahora rechazan configuraciones no válidas y se eliminó el punto final de CRM \`get_last_interaction\`, que no se utilizaba.

Notas completas de las versiones originales: [16.33.0](https://github.com/frappe/erpnext/releases/tag/v16.33.0), [16.34.0](https://github.com/frappe/erpnext/releases/tag/v16.34.0), [16.34.1](https://github.com/frappe/erpnext/releases/tag/v16.34.1), [16.34.2](https://github.com/frappe/erpnext/releases/tag/v16.34.2)`,
    de_DE: `ERPNext wurde auf Version 16.34.2 aktualisiert.

**Funktionen**

- Die Einkaufs- und Verkaufsanalysen erhielten Entitätsfilter.
- Rahmenaufträge erhielten Transaktionswährungen und Preislisten. Außerdem wurden eine konfigurierbare Bewertung von Nebenartikeln, Steuerberechnungen anhand alternativer Werte und vier belgische Kontenpläne hinzugefügt.

**Fehlerbehebungen**

- Die Zugriffskontrollen in Buchhaltungs-, Bank-, Kassen-, Projekt- und Lagerabläufen wurden verbessert.
- Fertigungsmengen, Bankabstimmungen, Retouren, Berichte sowie zahlreiche Buchhaltungs- und Lagerberechnungen wurden korrigiert.

**Kompatibilität**

- Finanzberichtsvorlagen lehnen nun ungültige Konfigurationen ab. Der ungenutzte CRM-Endpunkt \`get_last_interaction\` wurde entfernt.

Vollständige Upstream-Versionshinweise: [16.33.0](https://github.com/frappe/erpnext/releases/tag/v16.33.0), [16.34.0](https://github.com/frappe/erpnext/releases/tag/v16.34.0), [16.34.1](https://github.com/frappe/erpnext/releases/tag/v16.34.1), [16.34.2](https://github.com/frappe/erpnext/releases/tag/v16.34.2)`,
    pl_PL: `Zaktualizowano ERPNext do wersji 16.34.2.

**Funkcje**

- Dodano filtry jednostek do analiz zakupów i sprzedaży.
- Dodano waluty transakcji i cenniki do zamówień ramowych, konfigurowalną wycenę produktów ubocznych, obliczenia podatków na podstawie alternatywnych wartości oraz cztery belgijskie plany kont.

**Poprawki**

- Wzmocniono kontrolę dostępu w procesach księgowych, bankowych, kasowych, projektowych i magazynowych.
- Poprawiono ilości produkcyjne, uzgadnianie operacji bankowych, zwroty, raporty oraz liczne obliczenia księgowe i magazynowe.

**Zgodność**

- Szablony raportów finansowych odrzucają teraz nieprawidłowe konfiguracje, a nieużywany punkt końcowy CRM \`get_last_interaction\` został usunięty.

Pełne informacje o wydaniach projektu źródłowego: [16.33.0](https://github.com/frappe/erpnext/releases/tag/v16.33.0), [16.34.0](https://github.com/frappe/erpnext/releases/tag/v16.34.0), [16.34.1](https://github.com/frappe/erpnext/releases/tag/v16.34.1), [16.34.2](https://github.com/frappe/erpnext/releases/tag/v16.34.2)`,
    fr_FR: `ERPNext a été mis à jour vers la version 16.34.2.

**Fonctionnalités**

- Des filtres d’entités ont été ajoutés aux analyses des achats et des ventes.
- Les commandes permanentes prennent désormais en charge les devises de transaction et les listes de prix. Cette version ajoute aussi l’évaluation configurable des articles secondaires, le calcul des taxes à partir de valeurs alternatives et quatre plans comptables belges.

**Correctifs**

- Les contrôles d’accès ont été renforcés dans les processus de comptabilité, de banque, de point de vente, de projets et de stock.
- Les quantités de fabrication, les rapprochements bancaires, les retours, les rapports et de nombreux calculs comptables et de stock ont été corrigés.

**Compatibilité**

- Les modèles de rapports financiers refusent désormais les configurations non valides et le point de terminaison CRM inutilisé \`get_last_interaction\` a été supprimé.

Notes de version amont complètes : [16.33.0](https://github.com/frappe/erpnext/releases/tag/v16.33.0), [16.34.0](https://github.com/frappe/erpnext/releases/tag/v16.34.0), [16.34.1](https://github.com/frappe/erpnext/releases/tag/v16.34.1), [16.34.2](https://github.com/frappe/erpnext/releases/tag/v16.34.2)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
