import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.37.0:0',
  releaseNotes: {
    en_US: `Updated ERPNext to 16.37.0.

**Fixes and improvements**

- Faster item searches and more accurate manufacturing stock reservations, transfers, and returns.
- Foreign-currency subcontracting service costs are converted to company currency; existing orders and draft receipts are updated during the upgrade.
- Startup waits for a successful Redis PONG reply before configuring the application.

**After upgrading**

Check existing chained Stock Closing Entry balances and use "Regenerate Stock Closing Entry" for affected entries. Existing batch- and serial-tracked Subcontracting Receipt returns need reposting to apply corrected valuations. Regeneration and reposting run as background jobs; allow time according to your stock history and check that they complete before relying on the affected reports.

[Full upstream release notes](https://github.com/frappe/erpnext/releases/tag/v16.37.0)`,
    es_ES: `ERPNext se actualizó a la versión 16.37.0.

**Correcciones y mejoras**

- Búsquedas de artículos más rápidas y mayor precisión en las reservas, transferencias y devoluciones de existencias de fabricación.
- Los costes de servicios de subcontratación en moneda extranjera se convierten a la moneda de la empresa; los pedidos existentes y las recepciones en borrador se actualizan durante la actualización.
- El inicio espera una respuesta PONG correcta de Redis antes de configurar la aplicación.

**Después de actualizar**

Compruebe los saldos de los registros encadenados de Stock Closing Entry existentes y utilice "Regenerate Stock Closing Entry" para los registros afectados. Las devoluciones existentes de Subcontracting Receipt con seguimiento por lote o número de serie necesitan una nueva contabilización para aplicar las valoraciones corregidas. La regeneración y la nueva contabilización se ejecutan en segundo plano; deje tiempo según su historial de existencias y compruebe que terminen antes de utilizar los informes afectados.

[Notas completas de la versión original](https://github.com/frappe/erpnext/releases/tag/v16.37.0)`,
    de_DE: `ERPNext wurde auf Version 16.37.0 aktualisiert.

**Korrekturen und Verbesserungen**

- Schnellere Artikelsuche und genauere Lagerreservierungen, Umlagerungen und Rückgaben in der Fertigung.
- Fremdwährungskosten für Fremdfertigungsleistungen werden in die Unternehmenswährung umgerechnet; bestehende Aufträge und Wareneingangsentwürfe werden beim Upgrade aktualisiert.
- Der Start wartet auf eine erfolgreiche PONG-Antwort von Redis, bevor die Anwendung konfiguriert wird.

**Nach dem Upgrade**

Prüfen Sie die Salden bestehender verketteter Stock Closing Entry-Datensätze und verwenden Sie "Regenerate Stock Closing Entry" für betroffene Einträge. Bestehende Rückgaben von Subcontracting Receipt-Datensätzen mit Chargen- oder Seriennummernverfolgung müssen neu verbucht werden, damit die korrigierten Bewertungen gelten. Neuberechnung und Neuverbuchung laufen im Hintergrund; planen Sie je nach Lagerhistorie Zeit ein und prüfen Sie den Abschluss, bevor Sie sich auf die betroffenen Berichte verlassen.

[Vollständige Upstream-Versionshinweise](https://github.com/frappe/erpnext/releases/tag/v16.37.0)`,
    pl_PL: `Zaktualizowano ERPNext do wersji 16.37.0.

**Poprawki i ulepszenia**

- Szybsze wyszukiwanie artykułów i dokładniejsze rezerwacje, przesunięcia oraz zwroty zapasów w produkcji.
- Koszty usług podwykonawstwa w walucie obcej są przeliczane na walutę firmy; istniejące zamówienia i robocze dokumenty przyjęcia są aktualizowane podczas aktualizacji.
- Uruchamianie czeka na poprawną odpowiedź PONG z Redis przed skonfigurowaniem aplikacji.

**Po aktualizacji**

Sprawdź salda istniejących powiązanych wpisów Stock Closing Entry i użyj "Regenerate Stock Closing Entry" dla wpisów wymagających korekty. Istniejące zwroty Subcontracting Receipt śledzone według partii lub numerów seryjnych wymagają ponownego księgowania, aby zastosować poprawione wyceny. Regeneracja i ponowne księgowanie działają w tle; uwzględnij czas zależny od historii zapasów i sprawdź zakończenie zadań, zanim oprzesz się na tych raportach.

[Pełne informacje o wydaniu projektu źródłowego](https://github.com/frappe/erpnext/releases/tag/v16.37.0)`,
    fr_FR: `ERPNext a été mis à jour vers la version 16.37.0.

**Corrections et améliorations**

- Recherche d'articles plus rapide et réservations, transferts et retours de stocks de fabrication plus précis.
- Les coûts des services de sous-traitance en devise étrangère sont convertis dans la devise de l'entreprise ; les commandes existantes et les réceptions en brouillon sont mises à jour pendant la mise à niveau.
- Le démarrage attend une réponse PONG réussie de Redis avant de configurer l'application.

**Après la mise à niveau**

Vérifiez les soldes des écritures Stock Closing Entry existantes liées entre elles et utilisez "Regenerate Stock Closing Entry" pour les écritures concernées. Les retours Subcontracting Receipt existants suivis par lot ou numéro de série doivent être recomptabilisés pour appliquer les valorisations corrigées. La régénération et la recomptabilisation s'exécutent en arrière-plan ; prévoyez du temps selon votre historique de stocks et vérifiez leur achèvement avant de vous fier aux rapports concernés.

[Notes de version amont complètes](https://github.com/frappe/erpnext/releases/tag/v16.37.0)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
