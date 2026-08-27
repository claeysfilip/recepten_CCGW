# De Receptendoos

Een eenvoudige, doorzoekbare receptenwebsite. Elk recept staat in
`recipes.json` — voeg een nieuw recept toe door dat bestand te bewerken
en naar GitHub te pushen.

## Publiceren met GitHub Pages

1. Maak een nieuwe GitHub-repository (bijv. `receptendoos`).
2. Upload alle bestanden uit deze map (`index.html`, `style.css`, `script.js`, `recipes.json`) naar de repository.
3. Ga in de repository naar **Settings → Pages**.
4. Zet onder "Build and deployment" de **Source** op `Deploy from a branch`, kies de `main`-branch en de map `/ (root)`, en sla op.
5. GitHub geeft je een link zoals `https://jouwgebruikersnaam.github.io/receptendoos/` — dat is je live site.

## Een nieuw recept toevoegen

Open `recipes.json` en voeg een nieuw item toe aan de lijst. Elk recept ziet er zo uit:

```json
{
  "id": "unieke-korte-naam",
  "title": "Naam van het recept",
  "category": "Hoofdgerecht",
  "tags": ["snel", "vegetarisch"],
  "time": "30 min",
  "servings": 4,
  "image": "images/naam-van-het-recept.jpg",
  "ingredients": [
    "1 kop bloem",
    "2 eieren"
  ],
  "steps": [
    "Eerste stap.",
    "Tweede stap."
  ],
  "notes": "Optionele tip of variatie."
}
```

Toelichting per veld:

- **id** — moet uniek zijn binnen alle recepten; kleine letters met streepjes werkt het makkelijkst.
- **category** — dit wordt automatisch een filter-tab op de site (bijv. "Voorgerecht," "Hoofdgerecht," "Dessert"). Gebruik welke categorieën jou logisch lijken.
- **tags** — gebruikt bij het zoeken; niet zichtbaar als filter, maar zoeken op "vegetarisch" vindt deze wel.
- **image** — optioneel; pad naar een foto (zie hieronder). Laat dit veld weg als je geen foto hebt.
- **notes** — optioneel; laat dit veld gewoon weg als je het niet nodig hebt.

## Een foto toevoegen aan een recept

1. Zet je foto in de map `images/` in de repository (maak deze map aan als hij nog niet bestaat). Gebruik bij voorkeur `.jpg` bestanden van maximaal een paar MB, zodat de site snel blijft laden.
2. Geef het bestand een duidelijke naam, bijvoorbeeld `images/tarte-tatin.jpg`.
3. Voeg in `recipes.json` bij het betreffende recept het veld `"image"` toe met dat pad, bijvoorbeeld:
   ```json
   "image": "images/tarte-tatin.jpg"
   ```
4. Commit beide wijzigingen (de foto en de aangepaste `recipes.json`) — de foto verschijnt dan zowel op de kaart als bovenaan het volledige recept.

Op GitHub kun je een foto uploaden via **Add file → Upload files** in de map `images/`.

Zorg dat items gescheiden zijn door komma's en dat het bestand geldige
JSON blijft — als een recept niet verschijnt na het pushen, is de
oorzaak meestal een ontbrekende komma of accolade. Je kunt het bestand
plakken op [jsonlint.com](https://jsonlint.com) om het te controleren.

## Rechtstreeks bewerken op GitHub (geen lokale installatie nodig)

Je hoeft de repository niet te clonen of de command line te gebruiken:

1. Open `recipes.json` in je GitHub-repository.
2. Klik op het potlood-icoon (Edit).
3. Voeg je nieuwe recept toe.
4. Scroll naar beneden en klik op **Commit changes**.
5. De live site wordt binnen een minuut of twee automatisch bijgewerkt.

## Lokaal bekijken voor het publiceren

Omdat de site `recipes.json` via `fetch` inlaadt, werkt het niet om
`index.html` rechtstreeks in een browser te openen (browsers blokkeren
lokale bestands-fetches). Om wijzigingen te bekijken voordat je pusht,
start je een klein lokaal servertje vanuit deze map:

```
python3 -m http.server 8000
```

Ga vervolgens naar `http://localhost:8000` in je browser.
