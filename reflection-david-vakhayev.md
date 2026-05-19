# Reflection - David Vakhayev

## Vad var roligast?

Det roligaste var att bygga om projektet till en tydligare blogg där varje användare får en egen sida. Det blev också roligt att koppla ihop avatarer, användarbeskrivning och blogginlägg så att sidan känns mer personlig.

## Vad var mest utmanande?

Det mest utmanande var att hålla reglerna för ägarskap tydliga. En användare ska kunna skapa, redigera och ta bort egna inlägg, men samma kontroller får inte visas eller tillåtas för andra användares inlägg.

## Hur löste du det?

Frontend visar bara formulär och knappar när den inloggade användaren äger bloggen eller inlägget. Backend kontrollerar ändå alltid `userId` mot ägaren innan ett inlägg skapas, redigeras, tas bort eller innan ett konto tas bort. Fel skickas tillbaka som tydliga svenska meddelanden.

## Hur kan projektet vidareutvecklas och förbättras?

Projektet kan förbättras med riktig autentisering, hashade lösenord, sessions eller JWT, bättre formulärvalidering, sökfunktion för användare och inlägg, pagination för många inlägg och automatiska tester. JSON-filen kan också bytas mot en riktig databas om projektet ska användas på riktigt.
