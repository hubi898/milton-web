# MILTON d.o.o. — új weboldal

Precision Workshop UI (inspiráció zip) + PDF katalógus-lapozó, többoldalas struktúra.

## Indítás

```bash
cd milton-redesign
pnpm install
pnpm run dev
```

Nyisd: http://localhost:3000

## Oldalak

| Útvonal | Tartalom |
|---------|----------|
| `/` | Főoldal |
| `/o-nama` | Rólunk |
| `/katalozi` | Katalógus lista |
| `/katalozi/:id` | PDF lapozó |
| `/kontakt` | Kapcsolat |

## Új PDF hozzáadása

1. Másold a PDF-et ide: `client/public/catalogs/`
2. Szerkeszd: `client/src/data/catalogs.ts`
3. Állítsd be: `pdf: "/catalogs/fajlnev.pdf"`

Részletek: `client/public/catalogs/README.md`
