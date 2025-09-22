# FWK24S-PLU-fem-i-rad-frontend

Grupparbete i kursen *Paketering, leverans och uppföljning*.

# Starta projektet lokalt

### Initiera projektet

1. Klona ner projektet.

Skriv i terminalen t.ex:
```bash
git clone https://github.com/hampusvh/FWK24S-PLU-tamagotchi-components.git
```

2. Ladda ner beroenden:
```bash
npm install
```

3. Skapa .env i root 
```md
VITE_API_SERVER_URL="http://localhost:5000/api"
```

## Starta Storybook

Starta så här:

```bash
npm run storybook
```

## CI: React Build

Varje gång kod pushas körs en GitHub Action som kör `npm run buil`automatiskt.  
Det säkerställer att projektet kompilerar korrekt.

### Så här ser du resultaten:
1. Gå till repo på GitHub.
2. Klicka på fliken **Actions**.
3. Välj workflow **React Build**.
4. Öppna senaste körningen för att se loggar och resultat.


## Helpers

`src/utils` innehåller små hjälpfunktioner (helpers) som används i hela projektet.
Syftet är att slippa skriva samma kod flera gånger och göra utvecklingen enklare och mer konsekvent.


### Användning
Alla helpers importeras via barrel-export:

```js
import { fetchClient, formatDate, classNames } from "src/util";
```

### Lista med helpers och vad de gör

#### 1. `fetchClient`

**Vad:** Hämtar data från en server.

**Varför:** Gör att du inte behöver skriva samma felhantering och inställningar varje gång du hämtar data.

```js
const data = await fetchClient("/users");
```

#### 2. `formatters`

**Vad:** Ändrar hur datum och nummer visas.

**Varför:** Säkerställer att allt ser snyggt och konsekvent ut.

```js
formatDate("2025-09-11");       // "11 sep. 2025"
formatCurrency(199);            // "199,00 kr"
```

#### 3. `classNames`

**Vad:** Sätter ihop CSS-klasser dynamiskt.

**Varför:** Lättare än att skriva långa strängar med villkor varje gång.

```js
classNames("btn", isActive && "btn-active");
// isActive true → "btn btn-active"
// isActive false → "btn"
```

#### 4. `featureFlags`

**Vad:** Slår på eller av funktioner i appen.

**Varför:** Gör det möjligt att testa nya funktioner utan att alla användare ser dem.

```js
if (isFeatureEnabled("newCheckout")) {
  // Visa nya betalflödet
}
```

#### 5. `testHelpers`

**Vad:** Hjälper när man testar komponenter automatiskt.

**Varför:** Gör det enkelt att sätta upp rätt miljö för tester, t.ex. med rätt context och providers.

```js
renderWithProviders(<MyComponent />);
```