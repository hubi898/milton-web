/** Verbatim legal copy parsed from MILTON_Legal_Documents.docx. Flag emojis stripped. */
export type LegalSection = { heading: string; body: string };
export type LegalDocument = { title: string; sections: LegalSection[] };
export type LegalLang = "sr" | "hu" | "en";

export const legalByLang: Record<
  LegalLang,
  { terms: LegalDocument; privacy: LegalDocument }
> = {
  sr: {
    terms: {
      title: "USLOVI KORIŠĆENJA",
      sections: [
        {
          heading: "1. O kompaniji",
          body: "MILTON d.o.o., Kanjiža, Srbija. Uvoz-izvoz veleprodaja: odvodne instalacije, mesing fitinzi, grejanje i vodoinstalaterski materijali. Kontakt: info@milton.rs",
        },
        {
          heading: "2. Sadržaj veb sajta",
          body: "Sadržaj veb sajta (tekstovi, slike, katalozi) služi za predstavljanje ponude MILTON d.o.o. Cene u katalozima i cenovnicima su informativne dok se ne potvrde ponudom.",
        },
        {
          heading: "3. Intelektualna svojina",
          body: "Kopiranje i komercijalna upotreba materijala sa sajta bez dozvole kompanije je zabranjeno.",
        },
        {
          heading: "4. Porudžbine i isporuka",
          body: "Porudžbine se primaju putem e-maila ili telefona. Uslovi i rokovi isporuke dogovaraju se individualno. Konačna cena potvrđuje se ponudom.",
        },
        {
          heading: "5. Uslovi plaćanja",
          body: "Prihvaćeni načini i rokovi plaćanja navedeni su u individualnoj ponudi. U slučaju kašnjenja u plaćanju, MILTON d.o.o. zadržava pravo naplate zateznih kamata.",
        },
        {
          heading: "6. Ograničenje odgovornosti",
          body: "MILTON d.o.o. ne odgovara za eventualne greške u podacima ili cenama na sajtu. Konačni uslovi su uvek oni navedeni u pismenoj ponudi.",
        },
        {
          heading: "7. Merodavno pravo",
          body: "Na ove uslove primenjuje se pravo Republike Srbije. Za sporove je nadležan sud u Kanjiži.",
        },
      ],
    },
    privacy: {
      title: "POLITIKA PRIVATNOSTI",
      sections: [
        {
          heading: "1. Rukovalac podacima",
          body: "MILTON d.o.o., Kanjiža, Srbija. Kontakt: info@milton.rs",
        },
        {
          heading: "2. Podaci koji se prikupljaju",
          body: "Podaci dobrovoljno poslati putem kontakt forme ili e-maila: ime, e-mail adresa, sadržaj poruke.",
        },
        {
          heading: "3. Svrha i pravni osnov obrade",
          body: "Podaci se koriste isključivo za odgovor na Vaš upit. Pravni osnov: pristanak lica na koje se podaci odnose (ZZPL čl. 12 / GDPR čl. 6 st. 1 tač. a).",
        },
        {
          heading: "4. Rok čuvanja podataka",
          body: "Podaci se čuvaju samo onoliko dugo koliko je potrebno za komunikaciju o upitu, najduže 1 godinu.",
        },
        {
          heading: "5. Deljenje podataka",
          body: "Vaše podatke ne prodajemo niti delimo sa trećim stranama u marketinške svrhe.",
        },
        {
          heading: "6. Prava lica na koje se podaci odnose",
          body: "Imate pravo da: pristupite svojim podacima · zatražite ispravku ili brisanje · povučete pristanak · uložite prigovor · podnesete pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti.",
        },
        {
          heading: "7. Kolačići (cookies)",
          body: "Naš veb sajt može koristiti kolačiće radi poboljšanja korisničkog iskustva. Za analitičke ili marketinške kolačiće tražimo Vaš prethodni pristanak.",
        },
        {
          heading: "8. Kontakt za pitanja o privatnosti",
          body: "info@milton.rs",
        },
      ],
    },
  },
  hu: {
    terms: {
      title: "FELHASZNÁLÁSI FELTÉTELEK",
      sections: [
        {
          heading: "1. A vállalkozásról",
          body: "MILTON d.o.o., Kanjiža, Szerbia. Export-import nagykereskedelem: lefolyórendszerek, réz csatlakozók, fűtési és vízvezetéki anyagok. Kapcsolat: info@milton.rs",
        },
        {
          heading: "2. A webhely tartalma",
          body: "A webhely tartalma (szövegek, képek, katalógusok) a MILTON d.o.o. kínálatának ismertetésére szolgál. A katalógusokban és árlistákon szereplő árak tájékoztató jellegűek, amíg ajánlatban meg nem erősítjük őket.",
        },
        {
          heading: "3. Szellemi tulajdon",
          body: "A webhely anyagának engedély nélküli másolása és kereskedelmi felhasználása tilos a cég hozzájárulása nélkül.",
        },
        {
          heading: "4. Rendelések és szállítás",
          body: "A megrendelések e-mailben vagy telefonon adhatók le. A szállítási feltételeket és határidőket minden esetben egyedileg egyeztetjük. A végső ár az ajánlatban kerül megerősítésre.",
        },
        {
          heading: "5. Fizetési feltételek",
          body: "Az elfogadott fizetési módokat és határidőket az egyedi ajánlat tartalmazza. Késedelmes fizetés esetén a MILTON d.o.o. fenntartja a jogot késedelmi kamat felszámítására.",
        },
        {
          heading: "6. Felelősség korlátozása",
          body: "A MILTON d.o.o. nem vállal felelősséget a weboldalon található esetleges adathibákért vagy árelírásokért. A végleges feltételek minden esetben az írásos ajánlatban rögzítettek.",
        },
        {
          heading: "7. Alkalmazandó jog",
          body: "Jelen feltételekre a Szerb Köztársaság jogszabályai az irányadók. Jogvita esetén a kanjizsai illetékes bíróság rendelkezik hatáskörrel.",
        },
      ],
    },
    privacy: {
      title: "ADATVÉDELMI TÁJÉKOZTATÓ",
      sections: [
        {
          heading: "1. Adatkezelő",
          body: "MILTON d.o.o., Kanjiža, Szerbia. Kapcsolat: info@milton.rs",
        },
        {
          heading: "2. Gyűjtött adatok",
          body: "A kapcsolati űrlapon vagy e-mailben önkéntesen megadott adatok: név, e-mail cím, üzenet tartalma.",
        },
        {
          heading: "3. Adatkezelés célja és jogalapja",
          body: "Az adatokat kizárólag az Ön megkeresésének megválaszolására használjuk. Jogalap: az érintett hozzájárulása (ZZPL 12. cikk / GDPR 6. cikk (1) bek. a) pont).",
        },
        {
          heading: "4. Adatmegőrzési idő",
          body: "Az adatokat csak a megkeresés lezárásához szükséges ideig őrizzük meg, maximum 1 évig.",
        },
        {
          heading: "5. Adattovábbítás",
          body: "Az Ön adatait nem adjuk el, és nem osztjuk meg harmadik felekkel marketing célból.",
        },
        {
          heading: "6. Az érintett jogai",
          body: "Önnek joga van: hozzáférni adataihoz · kérni azok helyesbítését vagy törlését · visszavonni hozzájárulását · tiltakozni az adatkezelés ellen · panaszt benyújtani a Szerb Adatvédelmi Biztoshoz.",
        },
        {
          heading: "7. Sütik (cookie-k)",
          body: "Weboldalunk sütiket használhat a felhasználói élmény javítása érdekében. Analitikai vagy marketing süti használata esetén az Ön előzetes hozzájárulását kérjük.",
        },
        {
          heading: "8. Kapcsolat adatvédelmi kérdésekben",
          body: "info@milton.rs",
        },
      ],
    },
  },
  en: {
    terms: {
      title: "TERMS AND CONDITIONS",
      sections: [
        {
          heading: "1. About the Company",
          body: "MILTON d.o.o., Kanjiža, Serbia. Import-export wholesale: drainage systems, brass fittings, heating and plumbing materials. Contact: info@milton.rs",
        },
        {
          heading: "2. Website Content",
          body: "The website content (texts, images, catalogues) serves to present the MILTON d.o.o. product range. Prices shown in catalogues and price lists are indicative until confirmed in a formal offer.",
        },
        {
          heading: "3. Intellectual Property",
          body: "Unauthorised copying or commercial use of website materials without the company's consent is prohibited.",
        },
        {
          heading: "4. Orders and Delivery",
          body: "Orders are accepted by email or telephone. Delivery terms and timelines are agreed individually. The final price is confirmed in the written offer.",
        },
        {
          heading: "5. Payment Terms",
          body: "Accepted payment methods and deadlines are stated in the individual offer. In case of late payment, MILTON d.o.o. reserves the right to charge statutory interest.",
        },
        {
          heading: "6. Limitation of Liability",
          body: "MILTON d.o.o. is not liable for any errors in data or prices on the website. Final terms are always those stated in the written offer.",
        },
        {
          heading: "7. Governing Law",
          body: "These terms are governed by the laws of the Republic of Serbia. The competent court in Kanjiža has jurisdiction over any disputes.",
        },
      ],
    },
    privacy: {
      title: "PRIVACY POLICY",
      sections: [
        {
          heading: "1. Data Controller",
          body: "MILTON d.o.o., Kanjiža, Serbia. Contact: info@milton.rs",
        },
        {
          heading: "2. Data Collected",
          body: "Data voluntarily submitted via the contact form or email: name, email address, message content.",
        },
        {
          heading: "3. Purpose and Legal Basis",
          body: "Data is used solely to respond to your enquiry. Legal basis: consent of the data subject (Serbian ZZPL Art. 12 / GDPR Art. 6(1)(a)).",
        },
        {
          heading: "4. Data Retention",
          body: "Data is kept only as long as needed to communicate about the enquiry, and no longer than 1 year.",
        },
        {
          heading: "5. Data Sharing",
          body: "We do not sell or share your data with third parties for marketing purposes.",
        },
        {
          heading: "6. Your Rights",
          body: "You have the right to: access your data · request correction or deletion · withdraw consent · object to processing · file a complaint with the Commissioner for Information of Public Importance and Personal Data Protection in Serbia.",
        },
        {
          heading: "7. Cookies",
          body: "Our website may use cookies to improve user experience. For analytical or marketing cookies, we will request your prior consent.",
        },
        {
          heading: "8. Privacy Contact",
          body: "info@milton.rs",
        },
      ],
    },
  },
};
