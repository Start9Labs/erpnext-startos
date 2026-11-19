import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.60.0:0',
  releaseNotes: {
    en_US: `Updated ERPNext to 16.60.0 with Frappe 16.60.2.

- New Customer and Supplier overview dashboards, a revamped Projects form with task management and costing, a Day Book report, and new report print formats with a full-page print preview.
- Desk now works on phones and tablets, list views gain a new filter panel, and child tables can be imported from CSV, Excel, or Google Sheets.
- Adds Studio (beta), a visual app and portal builder, and Flow, an optional AI assistant panel in Desk.
- Hundreds of fixes across accounting, selling, buying, stock, manufacturing, subcontracting, and assets, and tighter permission checks throughout.

**Upgrade considerations**

You may need to sign in again after updating. Existing sites keep classic dashboards; a System Manager can switch to Insights dashboards in System Settings.

Full upstream release notes: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.60.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.60.0)`,
    es_ES: `ERPNext se actualizó a la versión 16.60.0 con Frappe 16.60.2.

- Nuevos paneles de resumen de clientes y proveedores, un formulario de proyectos renovado con gestión de tareas y costes, un informe de libro diario y nuevos formatos de impresión de informes con vista previa a página completa.
- Desk ahora funciona en teléfonos y tabletas, las vistas de lista incorporan un nuevo panel de filtros y las tablas secundarias pueden importarse desde CSV, Excel o Google Sheets.
- Se añaden Studio (beta), un constructor visual de aplicaciones y portales, y Flow, un panel opcional de asistente de IA en Desk.
- Cientos de correcciones en contabilidad, ventas, compras, existencias, fabricación, subcontratación y activos, y comprobaciones de permisos más estrictas en todo el sistema.

**Consideraciones para la actualización**

Es posible que deba iniciar sesión de nuevo después de actualizar. Los sitios existentes conservan los paneles clásicos; un System Manager puede cambiar a los paneles de Insights en System Settings.

Notas completas de las versiones originales: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.60.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.60.0)`,
    de_DE: `ERPNext wurde auf Version 16.60.0 mit Frappe 16.60.2 aktualisiert.

- Neue Übersichts-Dashboards für Kunden und Lieferanten, ein überarbeitetes Projektformular mit Aufgabenverwaltung und Kostenrechnung, ein Journalbericht sowie neue Berichtsdruckformate mit ganzseitiger Druckvorschau.
- Desk funktioniert jetzt auf Smartphones und Tablets, Listenansichten erhalten ein neues Filterfeld, und Untertabellen lassen sich aus CSV, Excel oder Google Sheets importieren.
- Neu sind Studio (Beta), ein visueller Baukasten für Apps und Portale, und Flow, ein optionaler KI-Assistent als Seitenleiste in Desk.
- Hunderte Korrekturen in Buchhaltung, Verkauf, Einkauf, Lager, Fertigung, Fremdfertigung und Anlagen sowie durchgängig strengere Berechtigungsprüfungen.

**Hinweise zum Upgrade**

Nach dem Update müssen Sie sich möglicherweise erneut anmelden. Bestehende Sites behalten die klassischen Dashboards; ein System Manager kann in den System Settings auf Insights-Dashboards umstellen.

Vollständige Upstream-Versionshinweise: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.60.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.60.0)`,
    pl_PL: `Zaktualizowano ERPNext do wersji 16.60.0 z Frappe 16.60.2.

- Nowe pulpity przeglądowe klientów i dostawców, przebudowany formularz projektu z zarządzaniem zadaniami i kosztami, raport dziennika oraz nowe formaty wydruku raportów z podglądem pełnej strony.
- Desk działa teraz na telefonach i tabletach, widoki list mają nowy panel filtrów, a tabele podrzędne można importować z CSV, Excela lub Arkuszy Google.
- Dodano Studio (beta), wizualny kreator aplikacji i portali, oraz Flow, opcjonalny panel asystenta AI w Desk.
- Setki poprawek w księgowości, sprzedaży, zakupach, magazynie, produkcji, podwykonawstwie i środkach trwałych oraz bardziej rygorystyczna kontrola uprawnień w całym systemie.

**Uwagi dotyczące aktualizacji**

Po aktualizacji może być konieczne ponowne zalogowanie. Istniejące witryny zachowują klasyczne pulpity; System Manager może przełączyć się na pulpity Insights w System Settings.

Pełne informacje o wydaniach projektów źródłowych: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.60.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.60.0)`,
    fr_FR: `ERPNext a été mis à jour vers la version 16.60.0 avec Frappe 16.60.2.

- Nouveaux tableaux de bord de synthèse clients et fournisseurs, formulaire de projet repensé avec gestion des tâches et des coûts, rapport du journal et nouveaux formats d’impression de rapports avec aperçu pleine page.
- Desk fonctionne désormais sur téléphones et tablettes, les vues en liste disposent d’un nouveau panneau de filtres et les tables enfants peuvent être importées depuis CSV, Excel ou Google Sheets.
- Ajout de Studio (bêta), un constructeur visuel d’applications et de portails, et de Flow, un panneau d’assistant IA facultatif dans Desk.
- Des centaines de corrections en comptabilité, ventes, achats, stocks, fabrication, sous-traitance et immobilisations, et des contrôles d’autorisation renforcés partout.

**Points à vérifier lors de la mise à niveau**

Il se peut que vous deviez vous reconnecter après la mise à jour. Les sites existants conservent les tableaux de bord classiques ; un System Manager peut passer aux tableaux de bord Insights dans System Settings.

Notes de version amont complètes : [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.60.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.60.0)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
