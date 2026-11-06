import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.54.0:0',
  releaseNotes: {
    en_US: `Updated ERPNext to 16.54.0 with Frappe 16.55.2.

- Added pro forma invoices, customer holds, company-specific access restrictions, and faster stock-balance snapshots.
- Improved manufacturing process-loss planning, stock reservations, financial statements, payments, and access controls.
- Reduced database conflict errors in background jobs.

**Upgrade considerations**

Requires StartOS 0.4.1 or later. Integrations calling data-changing ERPNext methods with GET must switch to POST. The database upgrade backfills payment schedules, production-plan stock balances, quotation and work-order quantities, asset adjustments, lost-opportunity dates, appointment sharing, dunning statuses, and POS cash change. Allow extra time for large histories and check these records, access permissions, and PDF printing after updating. Existing submitted BOM material breakdowns retain their values until a child BOM is replaced or a new BOM is created.

Full upstream release notes: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.54.0), [Frappe 16.55.0](https://github.com/frappe/frappe/releases/tag/v16.55.0), [Frappe 16.55.2](https://github.com/frappe/frappe/releases/tag/v16.55.2)`,
    es_ES: `ERPNext se actualizó a la versión 16.54.0 con Frappe 16.55.2.

- Se añadieron facturas proforma, bloqueos de clientes, restricciones de acceso por empresa e instantáneas más rápidas del saldo de existencias.
- Se mejoraron la planificación de pérdidas de fabricación, las reservas de existencias, los estados financieros, los pagos y los controles de acceso.
- Se redujeron los errores de conflicto de la base de datos en tareas en segundo plano.

**Consideraciones para la actualización**

Requiere StartOS 0.4.1 o posterior. Las integraciones que llaman a métodos de ERPNext que modifican datos mediante GET deben usar POST. La actualización de la base de datos completa o recalcula calendarios de pagos, saldos de existencias de planes de producción, cantidades de cotizaciones y órdenes de trabajo, ajustes de activos, fechas de oportunidades perdidas, accesos compartidos de citas, estados de reclamaciones de pago y cambio en efectivo de facturas POS. Prevea más tiempo para historiales grandes y compruebe estos registros, los permisos de acceso y la impresión de PDF después de actualizar. Los desgloses de materiales de las BOM ya confirmadas conservan sus valores hasta que se sustituya una BOM secundaria o se cree una nueva BOM.

Notas completas de las versiones originales: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.54.0), [Frappe 16.55.0](https://github.com/frappe/frappe/releases/tag/v16.55.0), [Frappe 16.55.2](https://github.com/frappe/frappe/releases/tag/v16.55.2)`,
    de_DE: `ERPNext wurde auf Version 16.54.0 mit Frappe 16.55.2 aktualisiert.

- Proformarechnungen, Kundensperren, unternehmensbezogene Zugriffsbeschränkungen und schnellere Lagerbestandsschnappschüsse wurden hinzugefügt.
- Planung von Fertigungsverlusten, Bestandsreservierungen, Finanzberichte, Zahlungen und Zugriffskontrollen wurden verbessert.
- Datenbankkonflikte bei Hintergrundaufgaben wurden reduziert.

**Hinweise zum Upgrade**

Erfordert StartOS 0.4.1 oder neuer. Integrationen, die datenändernde ERPNext-Methoden mit GET aufrufen, müssen auf POST wechseln. Das Datenbank-Upgrade ergänzt oder berechnet Zahlungspläne, Lagerbestände von Produktionsplänen, Angebots- und Fertigungsauftragsmengen, Anlagenanpassungen, Verlustdaten von Verkaufschancen, Terminfreigaben, Mahnstatus und POS-Wechselgeldbeträge neu. Planen Sie bei umfangreichen Historien zusätzliche Zeit ein und prüfen Sie diese Datensätze, Zugriffsberechtigungen und den PDF-Druck nach dem Upgrade. Materialaufstellungen bereits bestätigter Stücklisten behalten ihre Werte, bis eine untergeordnete Stückliste ersetzt oder eine neue Stückliste erstellt wird.

Vollständige Upstream-Versionshinweise: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.54.0), [Frappe 16.55.0](https://github.com/frappe/frappe/releases/tag/v16.55.0), [Frappe 16.55.2](https://github.com/frappe/frappe/releases/tag/v16.55.2)`,
    pl_PL: `Zaktualizowano ERPNext do wersji 16.54.0 z Frappe 16.55.2.

- Dodano faktury pro forma, blokady klientów, ograniczenia dostępu według firmy i szybsze migawki sald magazynowych.
- Ulepszono planowanie strat produkcyjnych, rezerwacje zapasów, sprawozdania finansowe, płatności i kontrolę dostępu.
- Ograniczono błędy konfliktów bazy danych w zadaniach w tle.

**Uwagi dotyczące aktualizacji**

Wymaga StartOS 0.4.1 lub nowszego. Integracje wywołujące metody ERPNext zmieniające dane przez GET muszą przejść na POST. Aktualizacja bazy danych uzupełnia lub przelicza harmonogramy płatności, salda zapasów planów produkcyjnych, ilości ofert i zleceń produkcyjnych, korekty aktywów, daty utraty szans sprzedaży, udostępnienia spotkań, statusy monitów i resztę gotówkową na fakturach POS. Przy obszernej historii przewidź więcej czasu, a po aktualizacji sprawdź te rekordy, uprawnienia dostępu i drukowanie PDF. Rozbicia materiałowe zatwierdzonych BOM zachowują swoje wartości do zastąpienia podrzędnego BOM lub utworzenia nowego BOM.

Pełne informacje o wydaniach projektów źródłowych: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.54.0), [Frappe 16.55.0](https://github.com/frappe/frappe/releases/tag/v16.55.0), [Frappe 16.55.2](https://github.com/frappe/frappe/releases/tag/v16.55.2)`,
    fr_FR: `ERPNext a été mis à jour vers la version 16.54.0 avec Frappe 16.55.2.

- Ajout des factures pro forma, des blocages de clients, des restrictions d’accès par société et d’instantanés plus rapides des soldes de stock.
- Amélioration de la planification des pertes de fabrication, des réservations de stock, des états financiers, des paiements et des contrôles d’accès.
- Réduction des erreurs de conflit de base de données dans les tâches en arrière-plan.

**Points à vérifier lors de la mise à niveau**

Nécessite StartOS 0.4.1 ou ultérieur. Les intégrations appelant des méthodes ERPNext qui modifient des données avec GET doivent passer à POST. La mise à niveau de la base de données complète ou recalcule les échéanciers de paiement, les stocks des plans de production, les quantités des devis et des ordres de fabrication, les ajustements d’actifs, les dates de perte d’opportunités, les partages de rendez-vous, les états des relances et la monnaie rendue des factures POS. Prévoyez davantage de temps pour les historiques volumineux et vérifiez ces enregistrements, les droits d’accès et l’impression PDF après la mise à jour. Les décompositions de matières des nomenclatures déjà soumises conservent leurs valeurs jusqu’au remplacement d’une nomenclature enfant ou à la création d’une nouvelle nomenclature.

Notes de version amont complètes : [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.54.0), [Frappe 16.55.0](https://github.com/frappe/frappe/releases/tag/v16.55.0), [Frappe 16.55.2](https://github.com/frappe/frappe/releases/tag/v16.55.2)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
