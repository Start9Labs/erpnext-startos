import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.53.0:0',
  releaseNotes: {
    en_US: `Updated ERPNext to 16.53.0 with Frappe 16.54.0 and the StartOS SDK to 3.1.1.

- BOM Creator becomes a design workspace with STEP/CSV import, a 3D viewer, and design revisions.
- Corrected accounting reports, stock valuation, manufacturing quantities, payments, and access controls. Improved PDF printing.

**Upgrade considerations**

The database migration converts existing BOM Creator designs, corrects affected Work Order operation and Job Card transfer quantities, updates unchanged standard IFRS cash-flow formulas and matching generated cheque formats, and applies Selling Settings section visibility. Duplicate bank balances for the same account and date are reduced to the most recently modified entry; Voice Call Settings become private to each user and lose existing shares. Allow extra time for large histories and check these records, reports, printing, and custom-role access after updating.

Full upstream release notes: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.53.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.54.0)`,
    es_ES: `ERPNext se actualizó a la versión 16.53.0 con Frappe 16.54.0 y el SDK de StartOS a 3.1.1.

- BOM Creator se convierte en un espacio de diseño con importación STEP/CSV, visor 3D y revisiones de diseños.
- Se corrigieron informes contables, valoración de existencias, cantidades de fabricación, pagos y controles de acceso. Se mejoró la impresión de PDF.

**Consideraciones para la actualización**

La migración de la base de datos convierte los diseños existentes de BOM Creator, corrige las cantidades afectadas de operaciones de Work Order y transferencias de Job Card, actualiza las fórmulas estándar de flujo de efectivo IFRS sin modificar y los formatos de cheques generados que coinciden con su plantilla, y aplica la visibilidad de secciones de Selling Settings. Los saldos bancarios duplicados para una misma cuenta y fecha se reducen al registro modificado más recientemente; Voice Call Settings pasa a ser privado para cada usuario y pierde los accesos compartidos existentes. Prevea más tiempo para historiales grandes y compruebe estos registros, informes, impresión y acceso de roles personalizados después de actualizar.

Notas completas de las versiones originales: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.53.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.54.0)`,
    de_DE: `ERPNext wurde auf Version 16.53.0 mit Frappe 16.54.0 und das StartOS-SDK auf 3.1.1 aktualisiert.

- BOM Creator wird zum Design-Arbeitsbereich mit STEP-/CSV-Import, 3D-Ansicht und Designrevisionen.
- Buchhaltungsberichte, Bestandsbewertung, Fertigungsmengen, Zahlungen und Zugriffskontrollen wurden korrigiert. Der PDF-Druck wurde verbessert.

**Hinweise zum Upgrade**

Die Datenbankmigration konvertiert bestehende BOM-Creator-Designs, korrigiert betroffene Mengen von Work-Order-Vorgängen und Job-Card-Transfers, aktualisiert unveränderte IFRS-Standardformeln für den Cashflow sowie zur Vorlage passende erzeugte Scheckformate und übernimmt die Abschnittssichtbarkeit aus Selling Settings. Von doppelten Banksalden für dasselbe Konto und Datum bleibt nur der zuletzt geänderte Eintrag erhalten; Voice Call Settings werden benutzerprivat und verlieren bestehende Freigaben. Planen Sie bei umfangreichen Historien zusätzliche Zeit ein und prüfen Sie diese Datensätze, Berichte, Druckausgaben und den Zugriff benutzerdefinierter Rollen nach dem Upgrade.

Vollständige Upstream-Versionshinweise: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.53.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.54.0)`,
    pl_PL: `Zaktualizowano ERPNext do wersji 16.53.0 z Frappe 16.54.0 oraz SDK StartOS do 3.1.1.

- BOM Creator staje się przestrzenią projektową z importem STEP/CSV, przeglądarką 3D i rewizjami projektów.
- Poprawiono raporty księgowe, wycenę zapasów, ilości produkcyjne, płatności i kontrolę dostępu. Ulepszono drukowanie PDF.

**Uwagi dotyczące aktualizacji**

Migracja bazy danych konwertuje istniejące projekty BOM Creator, poprawia odpowiednie ilości operacji Work Order i przesunięć Job Card, aktualizuje niezmienione standardowe formuły przepływów pieniężnych IFRS oraz wygenerowane formaty czeków zgodne z szablonem, a także stosuje widoczność sekcji z Selling Settings. Spośród zduplikowanych sald bankowych dla tego samego konta i daty pozostaje ostatnio zmodyfikowany wpis; Voice Call Settings stają się prywatne dla każdego użytkownika i tracą dotychczasowe udostępnienia. Przy obszernej historii przewidź więcej czasu i sprawdź te rekordy, raporty, wydruki oraz dostęp ról niestandardowych po aktualizacji.

Pełne informacje o wydaniach projektów źródłowych: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.53.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.54.0)`,
    fr_FR: `ERPNext a été mis à jour vers la version 16.53.0 avec Frappe 16.54.0 et le SDK StartOS vers 3.1.1.

- BOM Creator devient un espace de conception avec import STEP/CSV, visualisation 3D et révisions des conceptions.
- Corrections des rapports comptables, de la valorisation des stocks, des quantités de fabrication, des paiements et des contrôles d’accès. Amélioration de l’impression PDF.

**Points à vérifier lors de la mise à niveau**

La migration de la base de données convertit les conceptions BOM Creator existantes, corrige les quantités concernées des opérations Work Order et des transferts Job Card, met à jour les formules standard IFRS de flux de trésorerie non modifiées ainsi que les formats de chèques générés correspondant à leur modèle, et applique la visibilité des sections de Selling Settings. Les soldes bancaires en double pour un même compte et une même date sont réduits à l’entrée modifiée le plus récemment ; Voice Call Settings devient privé pour chaque utilisateur et perd les partages existants. Prévoyez davantage de temps pour les historiques volumineux et vérifiez ces enregistrements, rapports, impressions et accès des rôles personnalisés après la mise à jour.

Notes de version amont complètes : [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.53.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.54.0)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
