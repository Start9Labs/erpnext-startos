import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '16.50.0:0',
  releaseNotes: {
    en_US: `Updated ERPNext to 16.50.0.

**Features and fixes**

- New reports find uncancelled stock ledger entries and compare actual versus expected stock valuations. Manufacturing can map raw-material serial and batch numbers to finished goods and check availability across a group warehouse.
- Corrected payment rounding, manufacturing costs, return quantities and report access controls. Frappe adds recovery of supported edits to standard workspaces after upgrades.
- Switching to a passwordless SMTP relay clears the previous password. Rejected email settings now warn that previous settings may remain active.

**After upgrading**

Try routine workflows with your ordinary users: stricter record access checks can affect custom roles. The upgrade removes the broad All-role grant on Payment Terms Template; editing Quality Management documents requires Quality Manager. Review affected roles and document permissions rather than granting unrestricted access.

Full upstream notes: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.50.0), [Frappe navigation and workspace changes](https://github.com/frappe/frappe/releases/tag/v16.50.0), [Frappe fixes](https://github.com/frappe/frappe/releases/tag/v16.51.0)`,
    es_ES: `ERPNext se actualizó a la versión 16.50.0.

**Funciones y correcciones**

- Nuevos informes detectan movimientos del libro mayor de existencias que no se cancelaron y comparan la valoración real con la esperada. En fabricación se pueden vincular números de serie y lotes de materias primas con productos terminados y comprobar la disponibilidad en un almacén de grupo.
- Se corrigieron el redondeo de pagos, los costes de fabricación, las cantidades devueltas y los controles de acceso a informes. Frappe permite recuperar cambios compatibles en espacios de trabajo estándar después de actualizar.
- Al cambiar a un servidor SMTP sin contraseña se borra la contraseña anterior. Si se rechazan los ajustes de correo, ahora se advierte que los anteriores pueden seguir activos.

**Después de actualizar**

Pruebe los procesos habituales con usuarios normales: los controles de acceso más estrictos pueden afectar a roles personalizados. La actualización elimina el permiso general del rol All en Payment Terms Template; para editar documentos de gestión de calidad se necesita Quality Manager. Revise los roles y permisos afectados en lugar de conceder acceso sin restricciones.

Notas completas de las versiones originales: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.50.0), [cambios de navegación y espacios de trabajo de Frappe](https://github.com/frappe/frappe/releases/tag/v16.50.0), [correcciones de Frappe](https://github.com/frappe/frappe/releases/tag/v16.51.0)`,
    de_DE: `ERPNext wurde auf Version 16.50.0 aktualisiert.

**Funktionen und Fehlerbehebungen**

- Neue Berichte finden nicht stornierte Lagerbucheinträge und vergleichen tatsächliche mit erwarteten Lagerbewertungen. In der Fertigung lassen sich Serien- und Chargennummern von Rohstoffen den Fertigprodukten zuordnen und Bestände über ein Gruppenlager prüfen.
- Zahlungsrundungen, Fertigungskosten, Rückgabemengen und Berichtszugriffe wurden korrigiert. Frappe ermöglicht nach Upgrades die Wiederherstellung unterstützter Änderungen an Standard-Arbeitsbereichen.
- Beim Wechsel zu einem SMTP-Relay ohne Passwort wird das bisherige Passwort gelöscht. Bei abgelehnten E-Mail-Einstellungen wird darauf hingewiesen, dass bisherige Einstellungen aktiv bleiben können.

**Nach dem Upgrade**

Prüfen Sie alltägliche Abläufe mit normalen Benutzern: strengere Zugriffsprüfungen können benutzerdefinierte Rollen betreffen. Das Upgrade entfernt die allgemeine Berechtigung der Rolle All für Payment Terms Template; zum Bearbeiten von Qualitätsmanagement-Dokumenten ist Quality Manager erforderlich. Prüfen Sie betroffene Rollen und Dokumentberechtigungen, statt uneingeschränkten Zugriff zu vergeben.

Vollständige Upstream-Versionshinweise: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.50.0), [Frappe-Navigation und Arbeitsbereiche](https://github.com/frappe/frappe/releases/tag/v16.50.0), [Frappe-Fehlerbehebungen](https://github.com/frappe/frappe/releases/tag/v16.51.0)`,
    pl_PL: `Zaktualizowano ERPNext do wersji 16.50.0.

**Funkcje i poprawki**

- Nowe raporty wykrywają nieanulowane wpisy rejestru magazynowego i porównują rzeczywistą wycenę zapasów z oczekiwaną. Produkcja pozwala powiązać numery seryjne i partie surowców z wyrobami gotowymi oraz sprawdzić dostępność w grupie magazynów.
- Poprawiono zaokrąglanie płatności, koszty produkcji, ilości zwrotów i kontrolę dostępu do raportów. Frappe pozwala po aktualizacji odzyskać obsługiwane zmiany w standardowych obszarach roboczych.
- Przejście na serwer SMTP bez hasła usuwa poprzednie hasło. Odrzucenie ustawień poczty wyświetla teraz ostrzeżenie, że poprzednie ustawienia mogą nadal działać.

**Po aktualizacji**

Sprawdź codzienne procesy na kontach zwykłych użytkowników: bardziej rygorystyczna kontrola dostępu może wpłynąć na role niestandardowe. Aktualizacja usuwa ogólne uprawnienie roli All do Payment Terms Template; edycja dokumentów zarządzania jakością wymaga Quality Manager. Sprawdź odpowiednie role i uprawnienia do dokumentów zamiast przyznawać nieograniczony dostęp.

Pełne informacje o wydaniach projektu źródłowego: [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.50.0), [nawigacja i obszary robocze Frappe](https://github.com/frappe/frappe/releases/tag/v16.50.0), [poprawki Frappe](https://github.com/frappe/frappe/releases/tag/v16.51.0)`,
    fr_FR: `ERPNext a été mis à jour vers la version 16.50.0.

**Fonctionnalités et correctifs**

- De nouveaux rapports détectent les écritures de stock non annulées et comparent la valorisation réelle à celle attendue. La fabrication permet de relier les numéros de série et lots des matières premières aux produits finis et de vérifier la disponibilité dans un groupe d'entrepôts.
- Les arrondis des paiements, coûts de fabrication, quantités retournées et contrôles d'accès aux rapports ont été corrigés. Frappe permet de récupérer les modifications prises en charge des espaces de travail standard après une mise à niveau.
- Le passage à un relais SMTP sans mot de passe efface l'ancien mot de passe. Le rejet des paramètres de messagerie avertit désormais que les anciens paramètres peuvent rester actifs.

**Après la mise à niveau**

Testez les opérations habituelles avec vos utilisateurs ordinaires : les contrôles d'accès renforcés peuvent affecter les rôles personnalisés. La mise à niveau supprime l'autorisation générale du rôle All sur Payment Terms Template ; la modification des documents de gestion de la qualité nécessite Quality Manager. Vérifiez les rôles et autorisations concernés plutôt que d'accorder un accès illimité.

Notes de version amont complètes : [ERPNext](https://github.com/frappe/erpnext/releases/tag/v16.50.0), [navigation et espaces de travail Frappe](https://github.com/frappe/frappe/releases/tag/v16.50.0), [correctifs Frappe](https://github.com/frappe/frappe/releases/tag/v16.51.0)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
