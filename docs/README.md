# Dokumentation

Projektet följer uppgiftsstrukturen med separata `backend`- och `frontend`-mappar.

Backend använder `backend/src/db.json` som databas. Lösenord sparas i klartext eftersom uppgiften uttryckligen efterfrågar enkel inloggning utan auth-bibliotek.

Frontend sparar den inloggade användaren i `localStorage` och skickar användarens `id` till backend vid åtgärder som kräver ägarskap.
