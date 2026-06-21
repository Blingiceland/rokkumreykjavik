# Póstlistinn → Google Sheet

Hvernig skráningar af `/#skraning` lenda í þínu eigin Google Sheet. Ókeypis, þú átt
gögnin, engin þriðja-aðila þjónusta.

Flæðið: gestur skráir netfang → `/api/subscribe` (á Vercel) → áframsendir á Google
Apps Script web-app → bætir línu í Sheet-ið þitt.

> ⚠️ **Ekki rugla saman tveimur hlekkjum.** „Publish to web" (File → Share →
> Publish to web) gefur þér **CSV-hlekk sem endar á `/pub?...output=csv`** — hann
> er bara til að **lesa** blaðið og getur ALDREI tekið við skráningum. Hlekkurinn
> sem fer í `NEWSLETTER_WEBHOOK` er **Apps Script „Web app" hlekkurinn sem endar á
> `/exec`** (skref 3 að neðan).

## 1. Búðu til Sheet

1. Nýtt Google Sheet (t.d. „Rokk í Reykjavík – póstlisti").
2. Skrifaðu fyrirsagnir í fyrstu línu: `Dagsetning` | `Netfang` | `Nafn` | `Uppruni`
   (A1–D1).

## 2. Settu inn Apps Script

Í Sheet-inu: **Extensions → Apps Script**. Eyddu því sem fyrir er og límdu inn:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var email = String(data.email || "").trim().toLowerCase();
    if (!email) return ContentService.createTextOutput("no email");

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Sleppa tvíteknum netföngum (dálkur B).
    var existing = sheet.getRange("B:B").getValues().flat();
    if (existing.indexOf(email) === -1) {
      // Dagsetning | Netfang | Nafn | Uppruni
      sheet.appendRow([new Date(), email, data.name || "", data.source || ""]);
    }
    return ContentService.createTextOutput("ok");
  } catch (err) {
    return ContentService.createTextOutput("error");
  }
}
```

## 3. Deploy-aðu sem web-app

1. **Deploy → New deployment**.
2. Tannhjólið → veldu **Web app**.
3. _Execute as_: **Me**. _Who has access_: **Anyone**.
4. **Deploy** → samþykktu aðganginn → afritaðu **Web app URL**-ið
   (`https://script.google.com/macros/s/.../exec`).

> Mundu: í hvert sinn sem þú breytir scriptinu þarftu **Deploy → Manage
> deployments → Edit → New version** til að breytingin taki gildi.

## 4. Tengdu á Vercel

1. Vercel → verkefnið → **Settings → Environment Variables**.
2. Nýr breyta: `NEWSLETTER_WEBHOOK` = Web app URL-ið að ofan.
3. **Redeploy** (svo breytan taki gildi).

## 5. Prófaðu

Skráðu netfang á `https://rokkumreykjavik.vercel.app/#skraning` — ný lína á að
birtast í Sheet-inu samstundis. Sendi tóma/ógilt netfang skilar villu og skráist
ekki.

## Athugið

- `/api/subscribe` sendir `{ email, ts, source }`; netfang er lágstafað og
  staðfest (regex) áður en það fer áfram. Scriptið sleppir tvíteknum.
- Engin gögn geymast á Vercel — allt liggur í Sheet-inu þínu.
- Til að senda fréttabréf/tilboð seinna geturðu flutt dálk B út og notað hvaða
  tól sem er (Mailchimp, sendiþjónustu Dillon, o.s.frv.).
