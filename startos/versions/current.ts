import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.35.0:0',
  releaseNotes: {
    en_US: `Updated ERPNext to 16.35.0.

**Features**

- The Warehouse Wise Item Balance Age and Value report now supports selecting multiple items and warehouses.

**Fixes**

- Corrected inventory valuation, additional-cost allocation, stock closings, returns, billing calculations, and historical stock-entry costs.
- Corrected dunning balances, transaction price lists, document rates, manufacturing workflows, and project details on subcontracting documents.
- Added permission checks for customer emails, payment-ledger reposting, and invoice discounting.

**Compatibility**

- IRS 1099 form printing now uses an external filing workflow; the report’s built-in printing option was retired.

[Full upstream release notes](https://github.com/frappe/erpnext/releases/tag/v16.35.0)`,
    es_ES: `ERPNext se actualizó a la versión 16.35.0.

**Funciones**

- El informe Antigüedad y valor del saldo de artículos por almacén ahora permite seleccionar varios artículos y almacenes.

**Correcciones**

- Se corrigieron la valoración del inventario, la distribución de costes adicionales, los cierres de existencias, las devoluciones, los cálculos de facturación y los costes históricos de los movimientos de existencias.
- Se corrigieron los saldos de reclamaciones de pago, las listas de precios de las transacciones, las tarifas de documentos, los procesos de fabricación y los datos de proyectos en documentos de subcontratación.
- Se añadieron controles de permisos para los correos electrónicos de clientes, la contabilización de nuevo del libro mayor de pagos y el descuento de facturas.

**Compatibilidad**

- La impresión de formularios IRS 1099 requiere ahora un proceso de presentación externo; se retiró la opción de impresión integrada del informe.

[Notas completas de la versión original](https://github.com/frappe/erpnext/releases/tag/v16.35.0)`,
    de_DE: `ERPNext wurde auf Version 16.35.0 aktualisiert.

**Funktionen**

- Im Bericht zu Alter und Wert des artikelbezogenen Lagerbestands können nun mehrere Artikel und Lager ausgewählt werden.

**Fehlerbehebungen**

- Bestandsbewertung, Verteilung zusätzlicher Kosten, Lagerabschlüsse, Retouren, Abrechnungsberechnungen und historische Kosten von Lagerbuchungen wurden korrigiert.
- Mahnsalden, Preislisten für Transaktionen, Dokumentpreise, Fertigungsabläufe und Projektdaten in Untervergabedokumenten wurden korrigiert.
- Berechtigungsprüfungen für Kunden-E-Mails, die erneute Buchung des Zahlungsbuchs und die Rechnungsdiskontierung wurden hinzugefügt.

**Kompatibilität**

- IRS-1099-Formulare werden nun über einen externen Einreichungsablauf gedruckt; die integrierte Druckoption des Berichts wurde eingestellt.

[Vollständige Upstream-Versionshinweise](https://github.com/frappe/erpnext/releases/tag/v16.35.0)`,
    pl_PL: `Zaktualizowano ERPNext do wersji 16.35.0.

**Funkcje**

- Raport wieku i wartości salda artykułów według magazynu pozwala teraz wybrać wiele artykułów i magazynów.

**Poprawki**

- Poprawiono wycenę zapasów, przydzielanie kosztów dodatkowych, zamknięcia magazynowe, zwroty, obliczenia rozliczeń i historyczne koszty przesunięć magazynowych.
- Poprawiono salda monitów, cenniki transakcji, stawki dokumentów, procesy produkcyjne i dane projektów w dokumentach podwykonawstwa.
- Dodano kontrole uprawnień do wiadomości e-mail klientów, ponownego księgowania rejestru płatności i dyskontowania faktur.

**Zgodność**

- Drukowanie formularzy IRS 1099 wymaga teraz zewnętrznego procesu składania; wbudowana opcja drukowania raportu została wycofana.

[Pełne informacje o wydaniu projektu źródłowego](https://github.com/frappe/erpnext/releases/tag/v16.35.0)`,
    fr_FR: `ERPNext a été mis à jour vers la version 16.35.0.

**Fonctionnalités**

- Le rapport sur l’ancienneté et la valeur du solde des articles par entrepôt permet désormais de sélectionner plusieurs articles et entrepôts.

**Correctifs**

- La valorisation des stocks, la répartition des coûts supplémentaires, les clôtures de stock, les retours, les calculs de facturation et les coûts historiques des mouvements de stock ont été corrigés.
- Les soldes des relances, les listes de prix des transactions, les tarifs des documents, les processus de fabrication et les données de projet dans les documents de sous-traitance ont été corrigés.
- Des contrôles d’autorisation ont été ajoutés pour les e-mails aux clients, la republication du grand livre des paiements et l’escompte de factures.

**Compatibilité**

- L’impression des formulaires IRS 1099 passe désormais par un processus de dépôt externe ; l’option d’impression intégrée au rapport a été retirée.

[Notes de version amont complètes](https://github.com/frappe/erpnext/releases/tag/v16.35.0)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
