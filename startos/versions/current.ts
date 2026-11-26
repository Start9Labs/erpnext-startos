import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.61.0:0',
  releaseNotes: {
    en_US: `Updated ERPNext to 16.61.0.

- New: optional weekly check that reposts incorrect stock valuation entries
- New: valuation breakdown page for an item and warehouse, opened from the Stock Ledger report
- New: return unused materials from a draft Job Card
- Fixes across accounting, selling, buying, stock, manufacturing and subcontracting, including tighter permission checks on company, customer, supplier and price list data
- Fix: published Studio apps no longer fail with a server error

[Full release notes](https://github.com/frappe/erpnext/releases/tag/v16.61.0)`,
    es_ES: `ERPNext actualizado a 16.61.0.

- Nuevo: comprobación semanal opcional que vuelve a contabilizar las valoraciones de inventario incorrectas
- Nuevo: página de desglose de valoración por artículo y almacén, accesible desde el informe Libro de Inventario
- Nuevo: devolución de materiales no usados desde una Tarjeta de Trabajo en borrador
- Correcciones en contabilidad, ventas, compras, inventario, fabricación y subcontratación, con controles de permisos más estrictos sobre datos de empresa, cliente, proveedor y lista de precios
- Corrección: las aplicaciones de Studio publicadas ya no fallan con un error del servidor

[Notas completas](https://github.com/frappe/erpnext/releases/tag/v16.61.0)`,
    de_DE: `ERPNext auf 16.61.0 aktualisiert.

- Neu: optionale wöchentliche Prüfung, die fehlerhafte Lagerbewertungen neu bucht
- Neu: Bewertungsaufschlüsselung je Artikel und Lager, erreichbar aus dem Lagerbuch-Bericht
- Neu: Rückgabe ungenutzter Materialien aus einer Arbeitskarte im Entwurf
- Korrekturen in Buchhaltung, Verkauf, Einkauf, Lager, Fertigung und Fremdfertigung, darunter strengere Berechtigungsprüfungen für Unternehmens-, Kunden-, Lieferanten- und Preislistendaten
- Behoben: veröffentlichte Studio-Apps schlagen nicht mehr mit einem Serverfehler fehl

[Vollständige Versionshinweise](https://github.com/frappe/erpnext/releases/tag/v16.61.0)`,
    pl_PL: `Zaktualizowano ERPNext do 16.61.0.

- Nowość: opcjonalne cotygodniowe sprawdzanie, które ponownie księguje błędne wyceny zapasów
- Nowość: strona rozbicia wyceny dla towaru i magazynu, dostępna z raportu Księga magazynowa
- Nowość: zwrot niewykorzystanych materiałów z roboczej Karty pracy
- Poprawki w księgowości, sprzedaży, zakupach, magazynie, produkcji i podwykonawstwie, w tym ściślejsze sprawdzanie uprawnień do danych firmy, klienta, dostawcy i cennika
- Poprawka: opublikowane aplikacje Studio nie kończą się już błędem serwera

[Pełne informacje o wydaniu](https://github.com/frappe/erpnext/releases/tag/v16.61.0)`,
    fr_FR: `Mise à jour d'ERPNext vers 16.61.0.

- Nouveau : vérification hebdomadaire facultative qui recomptabilise les valorisations de stock incorrectes
- Nouveau : page de détail de valorisation par article et entrepôt, ouverte depuis le rapport Grand livre des stocks
- Nouveau : retour des matériaux inutilisés depuis une Fiche de travail en brouillon
- Corrections en comptabilité, ventes, achats, stocks, fabrication et sous-traitance, dont des contrôles d'autorisation plus stricts sur les données de société, client, fournisseur et liste de prix
- Correction : les applications Studio publiées n'échouent plus avec une erreur serveur

[Notes de version complètes](https://github.com/frappe/erpnext/releases/tag/v16.61.0)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
