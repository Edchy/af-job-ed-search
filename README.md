[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/YHBYA8SY)

TODO:
Cacha sökresultat (sessionstorage t.ex). ✅
Kolla över CSS.
Kolla över accessibility.
Paginering.

# Case: Matcha yrken mot utbildningar

## Bygga applikationer på Arbetsförmedlingens öppna data för studenter

Dokumentation om Arbetsförmedlingens öppna data finns på [jobtechdev.se](https://jobtechdev.se). All öppen data från Arbetsförmedlingen och andra offentliga organisationer går även att hitta direkt på [dataportal.se](https://dataportal.se).

I detta dokument ges förslag på ett användningsfall som vi tror är lämpligt för studenter som vill utveckla en applikation på riktig data. All data som är öppen data får vem som helst använda utan att fråga myndigheten om lov, så ingen är begränsad till de exempel vi ger.

---

### Kom igång

1.  **Läs dokumentationen:**

    - [Övergripande dokumentation API:et JobEdConnect](https://jobtechdev.se/sv/specifications/jobed-connect-api)
    - [Kom-igång guide](https://jobtechdev.se/sv/guides/get-started-with-jobed-connect)

2.  **Utforska API:et:**
    - Använd den interaktiva [Swagger-sidan](https://jobed-connect-api.jobtechdev.se/) för att enkelt testa olika endpoints och läsa dokumentationen.

---

## Uppgift

### 1. Matcha yrken mot utbildning

Använd endpointen `/v1/occupations/match-by-text` för att matcha fram relaterade yrken för en utbildning, med utbildningstitel och utbildningsbeskrivning som input.

**Tips:** Du kan söka fram utbildningar på [denna demosida](https://demo-jobed-connect.jobtechdev.se/) under fliken “Sök utbildningar och visa relaterade yrken”. Klicka på “Om utbildningen” för att hitta titel och beskrivning.

### 2. Hämta kompetenser

Lista de yrken som är relaterade till utbildningen och gör det möjligt att för varje yrke hämta de vanligaste kompetenserna som arbetsgivare efterfrågar.

**Tips:** För att hämta kompetenser, använd endpointen: `/v1/enriched_occupations`.

### 3. Grafisk presentation (Valfritt)

Om möjligt, använd en grafisk presentation av era resultat genom antingen stapeldiagram eller linjegrafer.

---

## Designsystem

Arbetsförmedlingens [designsystem](https://designsystem.arbetsformedlingen.se/) är öppen källkod och kan användas för att snabbt komma igång med utvecklingen. Det sparar tid och ger en enhetlig användarinteraktion. Support finns för React, Angular och "vanilla" JavaScript.

> **Observera!**
> Er slutprodukt ska **inte** innehålla Arbetsförmedlingens logga eller färger. Anpassa efter eget tycke och smak med en egen färgpalett.

---

## Betygskriterier

### Need-to-have (G)

- [ ] Ni har hämtat data på ett strukturerat sätt med `fetch` eller `axios`.
- [ ] Ni har skapat en tjänst/service-lager som ni använder för att hämta data.
- [ ] Ni använder centrala React-koncept (context, state, routing etc.) för att göra datan tillgänglig i applikationen.
- [ ] Ni följer den syntax, namngivningsstandard samt kodstil som vi har lärt er.
- [ ] Ni använder designsystemet för presentation av komponenter.

### Nice-to-have (Bonus)

- [ ] Användning av `styled-components` (som drar nytta av designsystemet).
- [ ] Grafisk presentation av data (t.ex. diagram).
- [ ] Användning av custom hooks där det finns möjlighet.
