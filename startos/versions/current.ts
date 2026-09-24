import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.36.0:0',
  releaseNotes: {
    en_US: `Updated ERPNext to 16.36.0.

**Features**

- Serialized items can use moving-average valuation instead of individual serial-number costs. Existing serialized items keep serial-number-wise valuation by default.
- The Stock and Account Value Comparison report can create accounting-only reposts.

**Fixes**

- Corrected stock valuation and reconciliation, payment exchange rates, and stock-ledger reposting.

**Compatibility**

- New access checks may affect custom roles; the upstream upgrade adds missing grants to customized permissions without replacing existing rules.
- The upgrade updates serial and batch entries. Large inventories may take longer to migrate.

[Full upstream release notes](https://github.com/frappe/erpnext/releases/tag/v16.36.0)`,
    es_ES: `ERPNext se actualizó a la versión 16.36.0.

**Funciones**

- Los artículos serializados pueden utilizar la valoración por coste medio en lugar del coste individual de cada número de serie. Los artículos serializados existentes conservan por defecto la valoración por número de serie.
- El informe Comparación del valor de existencias y contabilidad permite crear recálculos exclusivamente contables.

**Correcciones**

- Se corrigieron la valoración y conciliación de existencias, los tipos de cambio de los pagos y el recálculo del libro mayor de existencias.

**Compatibilidad**

- Los nuevos controles de acceso pueden afectar a los roles personalizados; la actualización añade los permisos que faltan sin reemplazar las reglas existentes.
- La actualización procesa los registros de números de serie y lotes. La migración puede tardar más si hay muchas existencias.

[Notas completas de la versión original](https://github.com/frappe/erpnext/releases/tag/v16.36.0)`,
    de_DE: `ERPNext wurde auf Version 16.36.0 aktualisiert.

**Funktionen**

- Artikel mit Seriennummern können statt einzelner Seriennummernkosten den gleitenden Durchschnitt für die Bewertung verwenden. Bestehende Artikel behalten standardmäßig die seriennummernbezogene Bewertung.
- Der Bericht zum Vergleich von Lager- und Buchwerten kann rein buchhalterische Neubuchungen erstellen.

**Fehlerbehebungen**

- Bestandsbewertung und -abgleich, Wechselkurse bei Zahlungen und Neubuchungen im Lagerbuch wurden korrigiert.

**Kompatibilität**

- Neue Zugriffsprüfungen können benutzerdefinierte Rollen betreffen; das Upgrade ergänzt fehlende Berechtigungen, ohne bestehende Regeln zu ersetzen.
- Das Upgrade aktualisiert Seriennummern- und Chargeneinträge. Bei großen Beständen kann die Migration länger dauern.

[Vollständige Upstream-Versionshinweise](https://github.com/frappe/erpnext/releases/tag/v16.36.0)`,
    pl_PL: `Zaktualizowano ERPNext do wersji 16.36.0.

**Funkcje**

- Artykuły z numerami seryjnymi mogą być wyceniane według średniej ruchomej zamiast kosztu osobnego dla każdego numeru. Istniejące artykuły zachowują domyślnie wycenę według numerów seryjnych.
- Raport porównujący wartość zapasów i ksiąg pozwala tworzyć ponowne księgowania wyłącznie w księgowości.

**Poprawki**

- Poprawiono wycenę i uzgadnianie zapasów, kursy wymiany przy płatnościach oraz ponowne księgowanie w rejestrze magazynowym.

**Zgodność**

- Nowe kontrole dostępu mogą wpłynąć na role niestandardowe; aktualizacja dodaje brakujące uprawnienia bez zastępowania istniejących reguł.
- Aktualizacja przetwarza wpisy numerów seryjnych i partii. Migracja dużych zapasów może potrwać dłużej.

[Pełne informacje o wydaniu projektu źródłowego](https://github.com/frappe/erpnext/releases/tag/v16.36.0)`,
    fr_FR: `ERPNext a été mis à jour vers la version 16.36.0.

**Fonctionnalités**

- Les articles sérialisés peuvent utiliser le coût moyen pondéré au lieu du coût propre à chaque numéro de série. Les articles existants conservent par défaut leur valorisation par numéro de série.
- Le rapport de comparaison des valeurs de stock et comptables permet de créer des écritures de reprise uniquement comptables.

**Correctifs**

- La valorisation et le rapprochement des stocks, les taux de change des paiements et les reprises du grand livre des stocks ont été corrigés.

**Compatibilité**

- Les nouveaux contrôles d’accès peuvent toucher les rôles personnalisés ; la mise à jour ajoute les autorisations manquantes sans remplacer les règles existantes.
- La mise à jour traite les entrées de numéros de série et de lots. La migration peut prendre plus de temps pour les stocks volumineux.

[Notes de version amont complètes](https://github.com/frappe/erpnext/releases/tag/v16.36.0)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
