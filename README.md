# FE23-js2-slutprojekt-blogg-david-vakhayev

Slutprojekt, Individuell - Blogg. En enkel multi-user blogg byggd med TypeScript, Parcel, Node.js, Express och JSON-fil som databas.

## Funktioner

- Registrering med unikt användarnamn, lösenord, beskrivning och avatarval.
- Enkel osäker login där användarnamn och lösenord kontrolleras mot JSON-databasen.
- Inloggad användare sparas i `localStorage` och visas i navbaren.
- Startsida och användarsida listar alla bloggare.
- Varje användare är klickbar och öppnar användarens blogg.
- Bloggsidan visar användarnamn, avatar, beskrivning och inlägg i kronologisk ordning.
- Inloggad användare kan skapa, redigera och ta bort inlägg på sin egen blogg.
- Inloggad användare kan läsa och gilla andra användares inlägg.
- Användare kan ta bort sitt eget konto.
- Backend hanterar dåliga requests med tydliga felmeddelanden.

## Projektstruktur

```text
backend/
  src/
    controllers/
    routes/
    services/
    utils/
    types/
    db.json
    server.ts
frontend/
  src/
    api/
    components/
    pages/
    state/
    main.ts
    router.ts
    styles.css
```

## Installation

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Starta appen

Starta backend:

```bash
cd backend
npm run dev
```

Starta frontend:

```bash
cd frontend
npm run dev
```

Öppna frontend på:

```text
http://localhost:1234
```

Backend kör på:

```text
http://localhost:3000
```

## Testkonton

Exempelkonton i `backend/src/db.json`:

- `anna` / `password`
- `erik` / `password`
- `david` / `123456`

## API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users`
- `GET /api/users/:userId`
- `DELETE /api/users/:userId`
- `GET /api/users/:userId/posts`
- `POST /api/users/:userId/posts`
- `PUT /api/posts/:postId`
- `DELETE /api/posts/:postId`
- `POST /api/posts/:postId/like`
- `GET /api/health`

## Kontrollkommandon

```bash
cd backend
npm run build

cd ../frontend
npm run typecheck
npm run build
```

## Assignment Checklist

- [x] Användare kan registrera konto.
- [x] Användarnamn måste vara unikt.
- [x] Användare har lösenord.
- [x] Användare väljer mellan minst 3 standardavatarer.
- [x] Användare har beskrivning av sin blogg.
- [x] Login kontrollerar användarnamn och lösenord mot JSON-databasen.
- [x] Inloggad användare visas i navbaren.
- [x] Inloggad användare kan skapa inlägg endast på egen blogg.
- [x] Inloggad användare kan ta bort egna inlägg.
- [x] Användare kan inte ta bort andras inlägg.
- [x] Inloggad användare kan besöka andra användares bloggar.
- [x] Inloggad användare kan besöka egen blogg via "Min blogg".
- [x] Inloggad användare kan ta bort sitt eget konto.
- [x] Appen har en användarlista.
- [x] Varje användare är klickbar och öppnar användarens blogg.
- [x] Bloggsidan visar användarnamn, avatar, beskrivning och inlägg.
- [x] Inlägg visas i kronologisk ordning.
- [x] Relevanta felmeddelanden visas.
- [x] Backend använder Node.js, Express och TypeScript.
- [x] Backend använder JSON-fil som databas.
- [x] Servern hanterar dåliga requests utan att krascha.
- [x] VG-extra: användare kan redigera egna blogginlägg.
- [x] VG-extra: användare kan gilla och av-gilla blogginlägg.
