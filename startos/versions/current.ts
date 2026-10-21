import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.52.0:0',
  releaseNotes: {
    en_US: `Updated ERPNext to 16.52.0.

- Clearer step-by-step manufacturing in BOMs, Work Orders, and Job Cards under "Produce an Item at Each Operation".
- More flexible item-variant and sales/purchase trends reports; corrected stock valuation, reconciliation, billing, and currency calculations.
- Strengthened report and portal permissions, and made imported supplier-invoice XML files private.

**Upgrade considerations**

The database migration recalculates affected production-plan quantities, work-order transfers and subcontracted quantities, and returned delivery-note billing statuses. Allow extra time for large histories and check those records after updating. An unset or zero interval between manufacturing operations becomes 10 minutes; review Manufacturing Settings if you used zero.

Full upstream release notes: [16.51.2](https://github.com/frappe/erpnext/releases/tag/v16.51.2), [16.52.0](https://github.com/frappe/erpnext/releases/tag/v16.52.0)`,
    es_ES: `ERPNext se actualizó a la versión 16.52.0.

- Fabricación paso a paso más clara en BOM, Work Order y Job Card mediante "Produce an Item at Each Operation".
- Informes de variantes de artículos y tendencias de ventas y compras más flexibles; correcciones en valoración de existencias, conciliación, facturación y cálculos de divisas.
- Permisos reforzados en informes y portales; los archivos XML de facturas de proveedores importadas ahora son privados.

**Consideraciones para la actualización**

La migración de la base de datos recalcula las cantidades afectadas de los planes de producción, las transferencias y cantidades subcontratadas de las órdenes de trabajo y los estados de facturación de las notas de entrega con devoluciones. Prevea más tiempo para historiales grandes y compruebe esos registros después de actualizar. Un intervalo entre operaciones de fabricación vacío o igual a cero pasa a ser de 10 minutos; revise Manufacturing Settings si utilizaba cero.

Notas completas de las versiones originales: [16.51.2](https://github.com/frappe/erpnext/releases/tag/v16.51.2), [16.52.0](https://github.com/frappe/erpnext/releases/tag/v16.52.0)`,
    de_DE: `ERPNext wurde auf Version 16.52.0 aktualisiert.

- Klarere schrittweise Fertigung in BOM, Work Order und Job Card unter "Produce an Item at Each Operation".
- Flexiblere Berichte zu Artikelvarianten sowie Verkaufs- und Einkaufstrends; Korrekturen bei Bestandsbewertung, Bestandsabgleich, Abrechnung und Währungsberechnungen.
- Verbesserte Berichts- und Portalberechtigungen; importierte XML-Dateien von Lieferantenrechnungen sind nun privat.

**Hinweise zum Upgrade**

Die Datenbankmigration berechnet betroffene Produktionsplanmengen, Materialtransfers und Fremdfertigungsmengen von Fertigungsaufträgen sowie den Abrechnungsstatus von Lieferscheinen mit Retouren neu. Planen Sie bei umfangreichen Historien zusätzliche Zeit ein und prüfen Sie diese Datensätze nach dem Upgrade. Ein nicht gesetzter oder auf null gesetzter Abstand zwischen Fertigungsschritten wird auf 10 Minuten gesetzt; prüfen Sie Manufacturing Settings, falls Sie null verwendet haben.

Vollständige Upstream-Versionshinweise: [16.51.2](https://github.com/frappe/erpnext/releases/tag/v16.51.2), [16.52.0](https://github.com/frappe/erpnext/releases/tag/v16.52.0)`,
    pl_PL: `Zaktualizowano ERPNext do wersji 16.52.0.

- Czytelniejsza produkcja krok po kroku w BOM, Work Order i Job Card w opcji "Produce an Item at Each Operation".
- Bardziej elastyczne raporty wariantów artykułów oraz trendów sprzedaży i zakupów; poprawki wyceny zapasów, uzgadniania, fakturowania i przeliczeń walutowych.
- Wzmocnione uprawnienia raportów i portalu; importowane pliki XML faktur dostawców są teraz prywatne.

**Uwagi dotyczące aktualizacji**

Migracja bazy danych przelicza odpowiednie ilości planów produkcyjnych, przesunięcia i ilości zlecone podwykonawcom w zleceniach produkcyjnych oraz statusy fakturowania dokumentów dostawy ze zwrotami. Przy obszernej historii przewidź więcej czasu i sprawdź te rekordy po aktualizacji. Nieustawiona lub zerowa przerwa między operacjami produkcyjnymi zmienia się na 10 minut; sprawdź Manufacturing Settings, jeśli używano zera.

Pełne informacje o wydaniach projektu źródłowego: [16.51.2](https://github.com/frappe/erpnext/releases/tag/v16.51.2), [16.52.0](https://github.com/frappe/erpnext/releases/tag/v16.52.0)`,
    fr_FR: `ERPNext a été mis à jour vers la version 16.52.0.

- Fabrication étape par étape plus claire dans BOM, Work Order et Job Card avec "Produce an Item at Each Operation".
- Rapports plus souples sur les variantes d’articles et les tendances des ventes et des achats ; corrections de la valorisation des stocks, du rapprochement, de la facturation et des calculs de devises.
- Autorisations des rapports et du portail renforcées ; les fichiers XML de factures fournisseurs importées sont désormais privés.

**Points à vérifier lors de la mise à niveau**

La migration de la base de données recalcule les quantités concernées des plans de production, les transferts et quantités sous-traitées des ordres de fabrication, ainsi que les états de facturation des bons de livraison avec retours. Prévoyez davantage de temps pour les historiques volumineux et vérifiez ces enregistrements après la mise à jour. Un intervalle entre opérations de fabrication non défini ou nul passe à 10 minutes ; vérifiez Manufacturing Settings si vous utilisiez zéro.

Notes de version amont complètes : [16.51.2](https://github.com/frappe/erpnext/releases/tag/v16.51.2), [16.52.0](https://github.com/frappe/erpnext/releases/tag/v16.52.0)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
