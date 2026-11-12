import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.55.0:0',
  releaseNotes: {
    en_US: `Updated ERPNext to 16.55.0 with Frappe 16.56.0.

- Added consolidated receivables/payables reports across companies and reporting-date exchange rates in the General Ledger.
- Corrected stock valuation, serial/batch picking, subcontracting returns, manufacturing quantities, payments, and access controls.
- Improved PDF printing, file uploads, and email handling; updated PDF-processing dependencies to address security issues.

**Upgrade considerations**

Requires StartOS 0.4.2 or later. The database upgrade restores automatic payment reconciliation schedules and standard amount-in-words print visibility, updates affected Work Order operation statuses and open Job Card quantities, restricts company-address flags to managing roles, and rebuilds item-search indexes in the background. Allow extra time for large histories and check these records, stock reports, printing, and custom-role access after updating. Snapshot report frequency becomes weekly. Renaming a user requires setting up their two-factor login again. Integrations triggering processing actions through GET links must switch to POST.

Full upstream release notes: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.55.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.56.0)`,
    es_ES: `ERPNext se actualizó a la versión 16.55.0 con Frappe 16.56.0.

- Se añadieron informes consolidados de cuentas por cobrar y pagar entre empresas y tipos de cambio de la fecha del informe en el libro mayor.
- Se corrigieron la valoración de existencias, la preparación por números de serie y lotes, las devoluciones de subcontratación, las cantidades de fabricación, los pagos y los controles de acceso.
- Se mejoraron la impresión de PDF, la carga de archivos y el correo electrónico; se actualizaron las dependencias de procesamiento de PDF para corregir problemas de seguridad.

**Consideraciones para la actualización**

Requiere StartOS 0.4.2 o posterior. La actualización de la base de datos restaura los horarios de conciliación automática de pagos y la visibilidad estándar de los importes en letras al imprimir, actualiza los estados afectados de las operaciones de Work Order y las cantidades de Job Card abiertos, restringe las marcas de dirección de empresa a los roles de gestión y reconstruye los índices de búsqueda de artículos en segundo plano. Prevea más tiempo para historiales grandes y compruebe estos registros, los informes de existencias, la impresión y el acceso de roles personalizados después de actualizar. La frecuencia de los informes de instantáneas pasa a ser semanal. Al cambiar el nombre de un usuario, debe configurarse de nuevo su acceso de dos factores. Las integraciones que activan acciones de procesamiento mediante enlaces GET deben usar POST.

Notas completas de las versiones originales: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.55.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.56.0)`,
    de_DE: `ERPNext wurde auf Version 16.55.0 mit Frappe 16.56.0 aktualisiert.

- Unternehmensübergreifende Berichte zu Forderungen und Verbindlichkeiten sowie stichtagsbezogene Wechselkurse im Hauptbuch wurden hinzugefügt.
- Bestandsbewertung, Seriennummern- und Chargenkommissionierung, Fremdfertigungsretouren, Fertigungsmengen, Zahlungen und Zugriffskontrollen wurden korrigiert.
- PDF-Druck, Datei-Uploads und E-Mail-Verarbeitung wurden verbessert; PDF-Abhängigkeiten wurden zur Behebung von Sicherheitsproblemen aktualisiert.

**Hinweise zum Upgrade**

Erfordert StartOS 0.4.2 oder neuer. Das Datenbank-Upgrade stellt Zeitpläne für den automatischen Zahlungsabgleich und die standardmäßige Drucksichtbarkeit von Beträgen in Worten wieder her, aktualisiert betroffene Work-Order-Vorgangsstatus und Mengen offener Job Cards, beschränkt Unternehmensadressmarkierungen auf Verwaltungsrollen und baut Artikelsuchindizes im Hintergrund neu auf. Planen Sie bei umfangreichen Historien zusätzliche Zeit ein und prüfen Sie diese Datensätze, Lagerberichte, Druckausgaben und den Zugriff benutzerdefinierter Rollen nach dem Upgrade. Snapshot-Berichte erscheinen künftig wöchentlich. Nach dem Umbenennen eines Benutzers muss dessen Zwei-Faktor-Anmeldung erneut eingerichtet werden. Integrationen, die Verarbeitungsvorgänge über GET-Links auslösen, müssen auf POST wechseln.

Vollständige Upstream-Versionshinweise: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.55.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.56.0)`,
    pl_PL: `Zaktualizowano ERPNext do wersji 16.55.0 z Frappe 16.56.0.

- Dodano skonsolidowane raporty należności i zobowiązań wielu firm oraz kursy wymiany z daty raportu w księdze głównej.
- Poprawiono wycenę zapasów, kompletację według numerów seryjnych i partii, zwroty podwykonawstwa, ilości produkcyjne, płatności i kontrolę dostępu.
- Ulepszono drukowanie PDF, przesyłanie plików i obsługę poczty; zaktualizowano zależności przetwarzania PDF, aby usunąć problemy bezpieczeństwa.

**Uwagi dotyczące aktualizacji**

Wymaga StartOS 0.4.2 lub nowszego. Aktualizacja bazy danych przywraca harmonogramy automatycznego uzgadniania płatności i standardową widoczność kwot słownie na wydrukach, aktualizuje odpowiednie statusy operacji Work Order i ilości otwartych Job Card, ogranicza oznaczanie adresów firmy do ról zarządzających i odbudowuje indeksy wyszukiwania artykułów w tle. Przy obszernej historii przewidź więcej czasu, a po aktualizacji sprawdź te rekordy, raporty magazynowe, wydruki i dostęp ról niestandardowych. Częstotliwość raportów migawek zmienia się na tygodniową. Zmiana nazwy użytkownika wymaga ponownej konfiguracji jego logowania dwuskładnikowego. Integracje uruchamiające operacje przetwarzania przez łącza GET muszą przejść na POST.

Pełne informacje o wydaniach projektów źródłowych: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.55.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.56.0)`,
    fr_FR: `ERPNext a été mis à jour vers la version 16.55.0 avec Frappe 16.56.0.

- Ajout de rapports consolidés des créances et dettes de plusieurs sociétés et des taux de change à la date du rapport dans le grand livre.
- Corrections de la valorisation des stocks, de la préparation par numéro de série et lot, des retours de sous-traitance, des quantités de fabrication, des paiements et des contrôles d’accès.
- Amélioration de l’impression PDF, des téléversements et du courrier électronique ; mise à jour des dépendances de traitement PDF pour corriger des problèmes de sécurité.

**Points à vérifier lors de la mise à niveau**

Nécessite StartOS 0.4.2 ou ultérieur. La mise à niveau de la base de données restaure les calendriers de rapprochement automatique des paiements et la visibilité standard des montants en lettres à l’impression, met à jour les états concernés des opérations Work Order et les quantités des Job Card ouvertes, réserve les indicateurs d’adresse de société aux rôles de gestion et reconstruit les index de recherche d’articles en arrière-plan. Prévoyez davantage de temps pour les historiques volumineux et vérifiez ces enregistrements, les rapports de stock, l’impression et l’accès des rôles personnalisés après la mise à jour. La fréquence des rapports d’instantanés devient hebdomadaire. Renommer un utilisateur nécessite de reconfigurer son authentification à deux facteurs. Les intégrations déclenchant des traitements par des liens GET doivent passer à POST.

Notes de version amont complètes : [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.55.0), [Frappe](https://github.com/frappe/frappe/releases/tag/v16.56.0)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
