import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.51.0:0',
  releaseNotes: {
    en_US: `Updated ERPNext to 16.51.0 with Frappe 16.52.0.

- Financial statements can group results by accounting dimension, and new US companies receive a dedicated chart of accounts.
- Corrected stock valuation, manufacturing reservations, purchasing, timesheet billing, and report permissions. Improved print-format editing and PDF output.

**Upgrade considerations**

The database migration updates stock-closing values, clears saved FIFO queues, moves warehouse defaults from Stock Settings to Company, and replaces legacy standard print formats with Classic formats. Allow extra time for large stock histories; check stock reports, warehouse defaults, document printing, and custom-role access after updating.

Full upstream release notes: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.51.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.52.0)`,
    es_ES: `ERPNext se actualizó a la versión 16.51.0 con Frappe 16.52.0.

- Los estados financieros permiten agrupar los resultados por dimensión contable y las nuevas empresas de Estados Unidos reciben un plan contable específico.
- Se corrigieron la valoración de existencias, las reservas de fabricación, las compras, la facturación de partes de horas y los permisos de informes. Se mejoraron la edición de formatos de impresión y la generación de PDF.

**Consideraciones para la actualización**

La migración de la base de datos actualiza los valores de cierre de existencias, borra las colas FIFO guardadas, traslada los almacenes predeterminados de Stock Settings a Company y reemplaza los formatos de impresión estándar antiguos por formatos Classic. Prevea más tiempo si el historial de existencias es grande; compruebe los informes de existencias, los almacenes predeterminados, la impresión de documentos y el acceso de los roles personalizados después de actualizar.

Notas completas de las versiones originales: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.51.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.52.0)`,
    de_DE: `ERPNext wurde auf Version 16.51.0 mit Frappe 16.52.0 aktualisiert.

- Finanzberichte können Ergebnisse nach Buchhaltungsdimension gruppieren; neue US-Unternehmen erhalten einen eigenen Kontenplan.
- Bestandsbewertung, Fertigungsreservierungen, Einkauf, Zeiterfassungsabrechnung und Berichtsberechtigungen wurden korrigiert. Druckformatbearbeitung und PDF-Ausgabe wurden verbessert.

**Hinweise zum Upgrade**

Die Datenbankmigration aktualisiert Lagerabschlusswerte, leert gespeicherte FIFO-Warteschlangen, verschiebt Lagervorgaben von Stock Settings nach Company und ersetzt ältere Standarddruckformate durch Classic-Formate. Planen Sie bei umfangreicher Lagerhistorie zusätzliche Zeit ein; prüfen Sie nach dem Upgrade Lagerberichte, Lagervorgaben, Dokumentdruck und den Zugriff benutzerdefinierter Rollen.

Vollständige Upstream-Versionshinweise: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.51.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.52.0)`,
    pl_PL: `Zaktualizowano ERPNext do wersji 16.51.0 z Frappe 16.52.0.

- Sprawozdania finansowe pozwalają grupować wyniki według wymiaru księgowego, a nowe firmy z USA otrzymują dedykowany plan kont.
- Poprawiono wycenę zapasów, rezerwacje produkcyjne, zakupy, fakturowanie kart czasu pracy i uprawnienia do raportów. Ulepszono edycję formatów wydruku i generowanie PDF.

**Uwagi dotyczące aktualizacji**

Migracja bazy danych aktualizuje wartości zamknięć magazynowych, czyści zapisane kolejki FIFO, przenosi domyślne magazyny ze Stock Settings do Company i zastępuje starsze standardowe formaty wydruku formatami Classic. Przy obszernej historii zapasów przewidź więcej czasu; po aktualizacji sprawdź raporty magazynowe, domyślne magazyny, drukowanie dokumentów i dostęp ról niestandardowych.

Pełne informacje o wydaniach projektów źródłowych: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.51.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.52.0)`,
    fr_FR: `ERPNext a été mis à jour vers la version 16.51.0 avec Frappe 16.52.0.

- Les états financiers peuvent regrouper les résultats par dimension comptable et les nouvelles sociétés américaines reçoivent un plan comptable dédié.
- La valorisation des stocks, les réservations de fabrication, les achats, la facturation des feuilles de temps et les autorisations des rapports ont été corrigés. L’édition des formats d’impression et la génération de PDF ont été améliorées.

**Points à vérifier lors de la mise à niveau**

La migration de la base de données met à jour les valeurs de clôture des stocks, efface les files FIFO enregistrées, déplace les entrepôts par défaut de Stock Settings vers Company et remplace les anciens formats d’impression standard par des formats Classic. Prévoyez davantage de temps pour un historique de stocks volumineux ; après la mise à jour, vérifiez les rapports de stocks, les entrepôts par défaut, l’impression des documents et l’accès des rôles personnalisés.

Notes de version amont complètes : [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.51.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.52.0)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
