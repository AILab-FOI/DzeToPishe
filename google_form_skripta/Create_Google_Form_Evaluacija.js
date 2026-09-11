/**
 * Google Apps Script za automatsko kreiranje Google Obrasca (Forme)
 * za evaluaciju odgovora raznih verzija chatbota (Vanilla, RAG, GraphRAG).
 *
 * UPUTE ZA POKRETANJE:
 * 1. Otvorite https://script.google.com/ i kliknite "Novi projekt" (New project).
 * 2. Zamijenite sav postojeći kod ovim kodom.
 * 3. Odaberite funkciju "createEvaluationForm" iz padajućeg izbornika na vrhu.
 * 4. Kliknite "Pokreni" (Run) i odobrite potrebne dozvole (Google Forms permissions).
 * 5. U konzoli (Logger) ćete dobiti poveznicu za uređivanje i za ispunjavanje forme!
 */

// Podaci iz rezultati.csv ugrađeni izravno u skriptu
var DATASET = [
  {
    "rbr": 1,
    "kategorija": "kompleksna_pitanja_vise_dokumenata",
    "pitanje": "Opišite cjelokupnu proceduru transformacije novaka u razvrstanog pričuvnika kroz sve pravne akte koji reguliraju taj proces.",
    "ocekivani_odgovor": "Procedura je regulirana kroz 4 pravna akta. 1. USTAVNI TEMELJ (Ustav RH, čl. 47). Vojna obveza je dužnost svih za to sposobnih državljana. Dopušten prigovor savjesti iz vjerskih i/ili moralnih razloga uz obvezu ispunjavanja drugih dužnosti određenih zakonom. 2. NOVAČKA OBVEZA (Zakon o obrani, čl. 19-21). Nastaje u kalendarskoj godini kad državljanin RH navrši 18 godina. Državljanin RH uvodi se u vojnu evidenciju u kalendarskoj godini u kojoj navrši 18 godina života. Prolazi zdravstveni pregled i psihologijsko ispitivanje. 3. TEMELJNO VOJNO OSPOSOBLJAVANJE (Zakon o obrani čl. 21.m, Pravilnik o temeljnom vojnom osposobljavanju). Traje 2 mjeseca. Ministar obrane donosi Plan upućivanja u tekućoj godini do 15.12. za iduću godinu. Odluku o upućivanju donosi 40 dana prije upućivanja kandidata (Pravilnik čl. 7). Ročnici se obučavaju za specijalnost 11A - strijelac (Pravilnik čl. 9). Daju svečanu prisegu. 4. STATUS ROČNIKA (Zakon o službi, čl. 25, 26, 30). Ročnik je dio mirnodopskog sastava OS tijekom temeljnog vojnog osposobljavanja. Odluka o temeljnom vojnom osposobljavanju uređuje prava i obveze (nije upravna stvar). 5. PRIJELAZ U PRIČUVU (Zakon o obrani, čl. 25, 27). Nakon temeljnog vojnog osposobljavanja automatski postaje pričuvnik. Razvrstani je pričuvnik jer ima određenu vojnostručnu specijalnost. Određuje mu se ratni raspored. Može biti pozivan na vježbe do 90 dana godišnje",
    "vanilla_odgovor": "Transformacija novaka u razvrstani pričuvnik u Hrvatskoj regulirana je Zakonom o službi u Oružanim snagama Republike Hrvatske (ZSOŠ) te pripadajućim pravilnicima. Evo korak-po-korak procedure:  \n\n1. **Raspored na odsluženje vojnog roka** – Prema članku 60. ZSOŠ, mladi ljudi raspoređeni su na odsluženje vojnog roka nakon završetka srednje škole ili po drugi put kad navrše 18 godina.  \n\n2. **Proverba zdravstvenog stanja i sposobnosti** – Nakon dolaska u postrojbu, provodi se medicinska proverba kako bi se utvrdilo da li kandidat ispunjava fizičke i psihičke uvjete za služenje (članak 79. ZSOŠ).  \n\n3. **Teorijsko i praktično osposobljavanje** – Vojnici prolaze osnovno vojno osposobljavanje prema Programu vojne osposobljenosti (članak 80. ZSOŠ), uključujući topografiju, taktiku, uporabu oružja itd.  \n\n4. **Ocena sposobnosti i klasifikacija** – Na kraju osposobljavanja, zapovjednik postrojbe ocjenjuje sposobnost vojnika i daje preporuku za klasifikaciju (npr. \"odlično\", \"dobro\" itd.) (članak 81. ZSOŠ).  \n\n5. **Deklariranje kao razvrstani pričuvnik** – Ako ispuni kriterije, vojnik postaje razvrstani pričuvnik i dobiva status pričuve (članak 82. ZSOŠ).  \n\n6. **Registracija u sustavu pričuvnih snaga** – Ministarstvo obrane vodi evidenciju razvrstanih pričuvnika (članak 83. ZSOŠ).  \n\n7. **Moguća pozivnica na dodatnu osposobljavanju** – Razvrstani pričuvnici mogu biti pozvani na dodatne tečajeve ovisno o potrebama vojske (članak 84. ZSOŠ).  \n\nNadležno tijelo za ovaj postupak je Glavno stožer Oružanih snaga RH, a detaljniji uputi nalaze se u Pravilniku o provedbi ZSOŠ.",
    "rag_odgovor": "Transformacija novaka u razvrstanog pričuvnika u Republici Hrvatskoj regulirana je Zakonom o obrani („Narodne novine“ br. 136/25), a procedura uključuje sljedeće korake:  \n\n### **1. Prihvata u vojnu evidenciju**  \nPrema **čl. 21.** Zakona o obrani, **novak koji boravi u inozemstvu** dužan je prijaviti se diplomatskoj misiji ili konzularnom uredu RH ako želi regulirati svoju vojnu obvezu. To se odnosi na one koji nisu bili uvedeni u vojnu evidenciju u RH.  \n- **Čl. 21. stavak 1.:** Zahtijeva prijavu diplomatskoj misiji do 18. godine života.  \n- **Čl. 21. stavak 2.:** Dopuštena je prijava do 29. godine života ako se obveznik ranije nije uključio u sustav.  \n- **Čl. 21. stavak 3.:** Potreban je dokaz o izvršenju vojne obaveze u inozemstvu.  \n\nDokumentacija se prosljeđuje Ministarstvu obrane putem diplomatskih kanala.  \n\n---  \n\n### **2. Ocjena sposobnosti i razvrstavanje**  \nNakon uvođenja u vojnu evidenciju, obveznik prolazi medicinsku procjenu. Prema **čl. 25.** Zakona o obrani:  \n- **Čl. 25. d (1):** Promjene u zdravstvenom stanju moraju se prijaviti Ministarstvu obrane unutar 8 dana.  \n- **Čl. 25. d (2):** Medicinska komisija ocjenjuje sposobnost za vojnu službu.  \n- **Čl. 25. d (3):** Ako nedostaje dokumentacija, traži se dodatna provjera.  \n- **Čl. 25. d (4):** Rezultat se unosi u vojnu iskaznicu.  \n\nAko je sposoban, obveznik postaje **razvrstan pripašnjak** prema **čl. 25. k** istog zakona.  \n\n---  \n\n### **3. Dodatni uvjeti za razvrstavanje**  \nZa razvrstavanje u pripašnjake vrijede dodatni kriteriji:  \n- **Čl. 25. m:** Oni koji su već služili kao **civilni ročnici** također ulaze u sustav.  \n- **Čl. 25. j:** Ako se novak prije civilne službe odluči za vojnu karijeru, prelazi na temeljno vojno osposobljavanje.  \n\n---  \n\n### **4. Pravna osnova i nadležna tijela**  \n- **Zakon o obrani (NN 136/25) – čl. 21.–25.:** Regulira prijavu, medicinski pregled i razvrstavanje.  \n- **Zakon o službi u Oružanim snagama (NN 73/13, 75/15) – čl. 32.:** Ministrtvo obrane vodi evidenciju ročnika i pričuvnika.  \n- **Glavni stožer OSRH:** Donosi programe osposobljavanja (npr. **čl. 25. c**).  \n\nProcedura je zaključena kada Ministarstvo obrane izda rješenje o razvrstavanju, a obveznik primi nalog za službu.",
    "graph_rag_odgovor": "Cjelokupna procedura transformacije novaka u razvrstanog pričuvnika regulirana je slijedećim pravnim aktima:  \n\n1. **Zakon o službi u Oružanim snagama Republike Hrvatske** (članak 31):  \n   - Novaci se popunom ratnog ustroja Oružanih snaga obračunavaju prema odredbama Zakona o obrani.  \n   - Ugovorni pričuvnici se pozivaju i upućuju na službu u skladu s odredbama Zakona o obrani i ovog Zakona.  \n\n2. **Zakon o obrani** (članak 21.a):  \n   - Pri dolasku u Oružane snage, pričuvnici moraju ispunjavati uvjete iz članka 21.a, uključujući putovanje od prebivališta do mjesta službe i natrag.  \n\n3. **Pravilnik o temeljnom vojnom osposobljavanju** (članak 2):  \n   - Pojam \"ročnik\" uključuje i one koji se dragovoljno prijave za osposobljavanje, što može dovesti do klasifikacije kao pričuvnika.  \n\n4. **Postupak prijave i evidencije kandidata** (Pravilnik o temeljnom vojnom osposobljavanju, članak 1):  \n   - Kandidati se prijavljuju i evidentiraju prema propisanom postupku, što omogućuje njihov prijelaz u status pričuvnika nakon osposobljavanja.  \n\n5. **Kriteriji za razvrstavanje u pričuvnike** (Zakon o obrani, članak 25.a):  \n   - Vojni obveznik koji je odslužio temeljno osposobljavanje postaje razvrstan pričuvnik.  \n\n6. **Mogućnost dragovoljnog osposobljavanja** (Zakon o obrani, članak 25.b):  \n   - Oni koji su uspješno završili dragovoljno osposobljavanje također ulaze u sustav pričuvništva.  \n\n7. **Dodatni uvjeti za razvrstavanje** (Zakon o obrani, članak 25.c-25."
  },
  {
    "rbr": 2,
    "kategorija": "kompleksna_pitanja_vise_dokumenata",
    "pitanje": "Kako je regulirana hijerarhija odlučivanja o uporabi Oružanih snaga u različitim situacijama kroz Ustav i Zakon o obrani?",
    "ocekivani_odgovor": "Hijerarhija odlučivanja detaljno razlikuje situacije. 1. RATNO STANJE (Ustav čl. 100, Zakon čl. 47). Predsjednik Republike naređuje uporabu i zapovijeda. Ima punu ovlast i odgovoran je za obranu. 2. STANJE NEPOSREDNE UGROŽENOSTI (Ustav čl. 100, Zakon čl. 48). Predsjednik Republike može narediti uporabu. Potreban je supotpis predsjednika Vlade. 3. PRELAZAK GRANICE (Ustav čl. 7, Zakon čl. 49). Hrvatski sabor donosi odluku (većina svih zastupnika). Vlada predlaže. Predsjednik daje prethodnu suglasnost. Ako Predsjednik uskrati suglasnost, potrebna je dvotrećinska većina. 4. POMOĆ SAVEZNICIMA (Ustav čl. 7, Zakon čl. 51). Sabor donosi odluku. Vlada predlaže. Predsjednik daje suglasnost. 5. VJEŽBE I OBUKA (Ustav čl. 7, Zakon čl. 69). Vlada donosi odluku. Predsjednik daje suglasnost. Za manje postrojbe (do razine voda) odluku donosi ministar obrane. 6. PROVEDBA (Zakon čl. 70). Načelnik Glavnog stožera ima ovlast punog zapovijedanja. Odgovoran je Predsjedniku za zapovijedi i naredbe, a ministru za provedbu odluka",
    "vanilla_odgovor": "Hierarhija odlučivanja o uporabi Oružanih snaga u Republici Hrvatskoj regulirana je Ustavom Republike Hrvatske (članak 97.) i Zakonom o obrani (članci 6., 8., 10.).  \n\n**Prema Ustavu (čl. 97.):**  \n- Predsjednik Republike Hrvatske vrhovni je zapovjednik Oružanih snaga.  \n- Vlada RH ima ovlast donošenja odluka o upotrebi oružanih snaga u skladu s Ustavom i međunarodnim obvezama.  \n\n**Prema Zakonu o obrani (članci 6.–10.):**  \n- **Ministar obrane** donosi odluke o korištenju snaga pod vodstvom Vlade.  \n- **Predsjednik RH** može rasporediti snage izvan granica samo uz suglasnost Sabora.  \n- **Sabor RH** ima ulogu nadzora nad sigurnosnom politikom putem odbora za obranu.  \n\nNadležno tijelo za nadzor je **Državno tajništvo za nacionalnu sigurnost** (prema Pravilniku o unutarnjoj organizaciji).  \n\nNapomena: Ova informacija temelji se na važećim propisima do 2024. godine. Za ažurirane podatke preporučuje se provjera najnovijih izmjena zakona.",
    "rag_odgovor": "Prema Ustavu Republike Hrvatske (Članak 100.) i Zakonu o obrani (Članak 46.), hijerarhija odlučivanja o uporabi Oružanih snaga u različitim situacijama je sljedeća:  \n\n1. **U ratu** – Prema Ustavu (Članak 100., stavak 4.) i Zakonu o obrani (Članak 47.), **predsjednik republike** naređuje uporabu Oružanih snaga i zapovijeda njima u ratnom stanju.  \n\n2. **U stanju neposredne ugroženosti** – Prema Ustavu (Članak 100., stavak 3.) i Zakonu o obrani (Članak 48.), **predsjednik republike** može, uz supotpis predsjednika vlade, narediti uporabu Oružanih snaga čak i ako nije proglašeno ratno stanje.  \n\n3. **U ostalim slučajevima** – Prema Zakonu o obrani (Članak 46.), odluku donose **Hrvatski sabor, predsjednik republike, predsjednik vlade i ministar obrane** zajedno, ovisno o situaciji.  \n\nTakođer, prema Zakonu o obrani (Članak 46., stavak 3.), **zapovijedi načelnika Glavnog stožera** provode odluke o uporabi Oružanih snaga.  \n\nNapomena: Ova struktura vrijedi osim u izvanrednim situacijama kada predsjednik republike ima šire ovlasti po Ustavu (Članak 100.).",
    "graph_rag_odgovor": "Hierarhija odlučivanja o uporabi Oružanih snaga u različitim situacijama regulirana je kroz **Ustav Republike Hrvatske** i **Zakon o obrani** kako slijedi:  \n\n### **Prema Ustavu (Članak 7):**  \n- **Ratno stanje / Teritorijalna cjelovitost:**  \n  - Odluku o upotrebi Oružanih snaga donose **Hrvatski sabor**, **Predsjednik Republike**, **predsjednik Vlade** i **ministar obrane** zajedno, u skladu s Ustavom i Zakonom o obrani.  \n  - Ako Predsjednik odbije suglasnost, Hrvatski sabor donosi odluku **dvotrećinskom većinom**.  \n\n- **Međunarodni ugovori / Saveznička pomoć:**  \n  - Ulazak stranih Oružanih snaga u RH moguć je samo na temelju **međunarodnih ugovora** i odluke Hrvatskog sabora (uz suglasnost Predsjednika).  \n\n- **Protupožarna zaštita / Spašavanje:**  \n  - Oružane snage mogu pomagati vatrogastvu i civilnoj zaštiti po odluci Vlade.  \n\n### **Prema Zakonu o obrani (Članak 46 & 57):**  \n- **Borbeno djelovanje protiv civilnih zrakoplova:**  \n  - Regulirano posebnim zakonom (npr. Zbirka zakona o zračnoj plovidbi).  \n\n- **Glavni stožer kao izvršni organ:**  \n  - Sve odluke o upotrebi Oružanih snaga (osim u ratu) provode se preko **zapovijedi načelnika Glavnog stožera**.  \n\n### **Izvori:**  \n- [Ustav RH, Članak 7](https://www.sabor.hr/Search/DocDetail.aspx?"
  },
  {
    "rbr": 3,
    "kategorija": "kompleksna_pitanja_vise_dokumenata",
    "pitanje": "Objasnite sve oblike obveza državljana u obrani prema Zakonu o obrani i Ustavu.",
    "ocekivani_odgovor": "Državljani RH imaju 6 kategorija obveza u obrani. 1. USTAVNI TEMELJ (Ustav RH, čl. 47). Vojna obveza i obrana RH dužnost je svih za to sposobnih državljana. Dopušten je prigovor savjesti. 2. VOJNA OBVEZA (Zakon o obrani, čl. 19-21). Nastaje u godini kada državljanin navrši 18 godina. Prestaje s 55 godina za muškarce i 50 godina za žene. Sastoji se od novačke obveze, temeljnog vojnog osposobljavanja ili civilne službe te služenja u pričuvi. 3. SLUŽENJE U UGOVORNOJ PRIČUVI (Zakon o obrani, čl. 27, 28). Obuhvaća dragovoljno / temeljno vojno osposobljavanje. Osposobljavanje traje do 90 dana godišnje. 4. RADNA OBVEZA (Zakon o obrani, čl. 31). Odnosi se na pravne osobe i državljane RH. Uvodi se u ratnom stanju i stanju neposredne ugroženosti. 5. RADNA POMOĆ (Zakon o obrani, čl. 31-32). Može se uvesti u ratnom stanju i stanju neposredne ugroženosti. Služi za izvršenje zadaća nositelja obrambenih funkcija. 6. MATERIJALNA OBVEZA (Zakon o obrani, čl. 33). Obuhvaća ustupanje objekata i materijalnih sredstava. Za obrambene zadaće i osposobljavanje",
    "vanilla_odgovor": "Prema **Zakonu o obrani** (Narodne novine broj 76/05) i **Ustavu Republike Hrvatske** (NN br. 123/2000), građani imaju sljedeće obveze u području obrane:  \n\n1. **Građanska obaveza prema Zakonu o obrani (čl. 8–9):**  \n   - Građani su dužni sudjelovati u obrani zemlje kroz:  \n     - **Služenje vojnog roka** (građevinski rok) – određuje se Pravilnikom o vojnom roku (NN br. 123/05).  \n     - **Mobilizaciju** – poziv na služenje u slučaju izvanrednih situacija (čl. 10).  \n     - **Dobrovoljna vojna služba** – mogućnost dobrovoljnog angažmana (čl. 11).  \n\n2. **Obveza prema Ustavu RH (čl. 14):**  \n   - Svaki građanin ima pravo i dužnost braniti domovinu.  \n   - Obrana zemlje uključuje i **alternativnu službu** za one koji iz vjerskih ili moralnih razloga ne mogu nositi oružje (čl. 14).  \n\n3. **Nadležno tijelo:**  \n   - Za provedbu zakona nadležno je **Ministarstvo obrane RH** (čl. 12 Zakona o obrani).  \n\nNapomena: Ova informacija temelji se isključivo na hrvatskom zakonodavstvu. Dodatne specifikacije (npr. iznose naknada za alternativnu službu) zahtijevaju provjeru Pravilnika o vojnom roku.",
    "rag_odgovor": "Prema Zakonu o obrani i Ustavu Republike Hrvatske, građani imaju različite oblike obveza u obrani:\n\n1. **Vojna obveza** (Zakon o obrani, članak 18., 19.):  \n   - Dužnost svih sposobnih građana od 18. godine života.  \n   - Obuhvaća osposobljavanje, pripremu i sudjelovanje u obrani.  \n\n2. **Služenje u ugovornoj pričuvi** (Zakon o obrani, članak 18.):  \n   - Građani sklapaju ugovor s Oružanim snagama za služenje u pričuvi.  \n\n3. **Radna obveza** (Zakon o obrani, članak 18.):  \n   - Građani pružaju radnu potporu za potrebe obrane.  \n\n4. **Materijalna obveza** (Zakon o obrani, članak 18.):  \n   - Građani doprinosu financiranju obrane poreznim i drugim davanjima.  \n\n5. **Ostala prava i obveze** (Zakon o obrani, članak 18.):  \n   - Inkluzivna kategorija koja može uključivati dodatne oblike suradnje.  \n\n6. **Pripadnici oružanih snaga** (Zakon o službi u Oružanim snagama, članak 3.):  \n   - Djelatne vojne osobe, pričuvnici, kadeti i ročnici.  \n\n7. **Priigovor savjesti** (Ustav RH, članak 47.):  \n   - Građani mogu odbiti vojnu službu zbog vjerskih ili moralnih uvjerenja, ali moraju ispunjavati alternativne obveze.  \n\n8. **Radna pomoć u ratu** (Zakon o obrani, članak 31.):  \n   - U izvanrednim situacijama građani mogu biti pozvani na rad za obranu.  \n\nOve obveze su definirane kako bi osigurale nacionalnu sigurnost i sukladne su ustavnom načelu da je obrana dužnost svakog građanina (Ustav, članak 47.).",
    "graph_rag_odgovor": "Prema **Zakonu o obrani** i **Ustavu Republike Hrvatske**, građani imaju različite oblike obveza u obrani:  \n\n### 1. **Vojna obveza**  \n- Prema **Članku 19.** Zakona o obrani, vojna obveza obuhvaća:  \n  - Osposobljavanje, pripremu i sudjelovanje u obrani.  \n  - Nastaje u kalendarskoj godini kada građanin navrši **18 godina**.  \n- Ustav (**Članak 47.**) također spominje da je obrana domovine dužnost građana.  \n\n### 2. **Priopćenje savjesti**  \n- Građani mogu odbiti vojnu službu iz vjerskih ili moralnih razloga (Ustav, **Članak 47.**).  \n- Moraju ispunjavati druge zakonske obveze umjesto vojne službe.  \n\n### 3. **Radna i materijalna obveza**  \n- Prema **Članku 21.f.** Zakona o obrani, građani su dužni pružiti materijalnu potporu obrani.  \n- Postoji i **radna obveza** (npr. za pripadnike nekih profesija poput policajaca), ali moraju biti obaviješteni unaprijed (**Članak 21.j.**).  \n\n### 4. **Druge posebne obveze**  \n- Za određene skupine (npr. studente, umirovljenike) postoje odgode ili izuzeća (**Članak 21.k–q.**).  \n- Građani moraju poštovati odluke nadležnih tijela (npr. pozivi na osposobljavanje, Pravilnik o temeljnom vojnom osposobljavanju, **Članak 4.**).  \n\nZa detaljnije informacije pogledajte odgovarajuće članke Zakona o obrani i Ustava RH."
  },
  {
    "rbr": 4,
    "kategorija": "kompleksna_pitanja_jedan_dokument",
    "pitanje": "Objasnite sustav imenovanja i odgovornosti načelnika Glavnog stožera kroz sve relevantne propise.",
    "ocekivani_odgovor": "Položaj načelnika Glavnog stožera OS RH reguliran je kroz pet razina. Imenuje ga Predsjednik Republike na prijedlog Vlade, nakon pribavljenog mišljenja Odbora za obranu Sabora. Mandat traje četiri godine bez mogućnosti ponovnog imenovanja. Razrješuje ga Predsjednik Republike izravno ili na prijedlog Vlade, nakon mišljenja Odbora za obranu Sabora. Na čelu je Glavnog stožera i nadređen je svim stožerima, zapovjedništvima i postrojbama OS-a. Obnaša dužnost glavnog vojnog savjetnika Predsjedniku i ministru obrane. Ima ovlast punog zapovijedanja u OS-u. Djeluje na temelju zapovijedi Predsjednika, odluka ministra obrane i Zakona. Predsjedniku je odgovoran za provedbu zapovijedi i naredbi, a ministru obrane za provedbu odluka. Obvezan je istodobno izvještavati oba o uporabi Oružanih snaga.",
    "vanilla_odgovor": "Sustav imenovanja i odgovornosti **Načelnika Glavnog stožera OSRH** (Oružanih snaga Republike Hrvatske) reguliran je sljedećim propisima:  \n\n### **Zakon o obrani (Narodne novine br. 97/02., 86/04., 127/06.)**  \n- **Članak 10.**: Načelnika Glavnog stožera imenuje Predsjednik Republike Hrvatske na prijedlog Vlade, uz suglasnost Sabora.  \n- **Članak 11.**: Načelnik Glavnog stožera vrši rukovodeću funkciju u OSRH i odgovoran je za provedbu odluka Predsjednika i Vlade.  \n\n### **Zakon o službi u Oružanim snagama RH (Narodne novine br. 127/06.)**  \n- **Članak 12.**: Načelnik Glavnog stožera ima najviši čin generala i izravno je podređen predsjedniku države kao vrhovnom zapovjedniku OSRH.  \n\n### **Pravilnik o ustroju Glavnog stožera OSRH (NN 127/06.)**  \n- Definisan je rad Načelnika kao strateškog voditelja vojne politike i operacija.  \n\n### **Dodatne odgovornosti**  \n- Nadzire planiranje i provedbu vojnih operacija.  \n- Imenuje zapovjednike rodova i postrojbi po preporuci ministra obrane.  \n- Predstavlja OSRH pred međunarodnim partnerima.  \n\nNapomena: Ova informacija temelji se na važećim hrvatskim zakonima i pravilnicima do 2023. godine. Za ažurirane podatke preporučuje se provjera najnovijih izmjena.",
    "rag_odgovor": "Sustav imenovanja i odgovornosti **načelnika Glavnog stožera** uređen je sljedećim propisima:\n\n### **1. Imenovanje načelnika Glavnog stožera**  \n- Prema **Članku 16. stavku 4. Zakona o obrani (2025.)**, **načelnik Glavnog stožera imenuje se na razdoblje od četiri godine i ne može biti ponovno imenovan**.  \n- **Članak 123.** istog zakona nalaže da osoba koja je na dužnosti načelnika Glavnog stožera na dan stupanja na snagu Zakona ostaje na dužnosti do isteka svog mandata.  \n- **Propisivanje ustroja Glavnog stožera** vrši **Predsjednik Republike** na prijedlog načelnika Glavnog stožera i uz suglasnost **ministra obrane** (**Članak 16. stavak 5.*).  \n\n### **2. Nadležnosti i odgovornosti načelnika Glavnog stožera**  \n- Prema **Članku 70. stavku 1.**, načelnik Glavnog stožera ima **punu ovlast zapovijedanja u Oružanim snagama** temeljem odluka Predsjednika Republike i ministra obrane.  \n- On je **odgovoran Predsjedniku Republike** za provedbu zapovijedi i **ministru obrane** za provedbu odluka (**Članak 70. stavci 2. i 3.*).  \n- Prema **Članku 70. stavku 4.**, načelnici Glavnog stožera mogu **privremeno staviti postrojbe u pripravnost** u slučaju opasnosti (npr. katastrofe), a o tome moraju odmah izvijestiti predsjednika i ministra.  \n- Prema **Članku 50. stavku 6.**, ministar obrane na prijedlog načelnika Glavnog stožera propisuje **uvjete i postupak raspoređivanja vojnih osoba** na dužnosti.  \n\n### **3. Pravosudni nadzor i ustavna osnova**  \n- Iako Zakon o obrani ne sadrži direktnu poveznicu s Ustavom, prema **Članku 103.** Ustava, Predsjednik i Vlada surađuju u sigurnosnoj politici, što uključuje i imenovanje visokih vojnih dužnosnika.  \n- Prema **Članku 111.** Ustava, odluke Vlade (uključujući i one vezane za sigurnost) moraju biti usklađene sa zakonom.",
    "graph_rag_odgovor": "Sustav imenovanja i odgovornosti **Načelnika Glavnog stožera** Oružanih snaga Republike Hrvatske regulisan je kroz više propisa, uključujući **Zakon o obrani** i **Zakon o službi u Oružanim snagama RH**. Evo ključnih elemenata:\n\n### **Imenovanje Načelnika Glavnog stožera**  \n- Prema **Članku 15. Zakona o obrani**, **Načelnik Glavnog stožera** imenuje se na razdoblje od **četiri godine** i ne može biti ponovno imenovan.  \n- Ustroj Glavnog stožera propisuje **Predsjednik Republike** na prijedlog **Načelnika Glavnog stožera** i uz suglasnost **ministra obrane** (Članak 15.).  \n- Trenutni Načelnik Glavnog stožera zadržava dužnost do isteka mandata ako je imenovan prije stupanja na snagu novog Zakona (Članak 123).  \n\n### **Dužnosti i odgovornosti**  \n- Prema **Članku 70. Zakona o obrani**, Načelnik Glavnog stožera ima **punu ovlast zapovijedanja u Oružanim snagama** temeljen na:  \n  - Naredbama **Predsjednika Republike**  \n  - Odlukama **ministra obrane**  \n  - Odredbama Zakona o obrani  \n- Odgovoran je **Predsjedniku Republike** za provedbu zapovijedi i **ministru obrane** za provedbu odluka (Članak 70.).  \n- Dužan je o provedbi akata vezanih uz uporabu Oružanih snaga **istodobno izvijestiti** predsjednika i ministra (Članak 70.).  \n- Može **privremeno staviti postrojbe u pripravnost** u slučaju opasnosti (npr. katastrofe, velike nesreće) i mora o tome odmah izvijestiti predsjednika i ministra (Članak 70.).  \n- Kao **glavni vojni savjetnik** predsjedniku i ministru, koordinira pripremu, zapovijedanje i uporabu Oružanih snaga (Članak 15.)."
  },
  {
    "rbr": 5,
    "kategorija": "kompleksna_pitanja_jedan_dokument",
    "pitanje": "Objasnite razlike između uporabe i korištenja Oružanih snaga prema Zakonu o obrani, uključujući tko donosi odluke u svakom slučaju.",
    "ocekivani_odgovor": "Zakon o obrani jasno razlikuje UPORABU i KORIŠTENJE OS. UPORABA (čl. 46-57) odnosi se na borbeno djelovanje. U ratnom stanju Predsjednik naređuje uporabu. U stanju neposredne ugroženosti Predsjednik odlučuje uz supotpis predsjednika Vlade. Za prelazak granice odluku donosi Hrvatski sabor, Vlada predlaže, a Predsjednik daje suglasnost. Za pomoć saveznicima odlučuju Sabor, Vlada i Predsjednik. Za operacije u inozemstvu odlučuju Sabor, Vlada i Predsjednik. KORIŠTENJE (čl. 58-64) odnosi se na neborbeno djelovanje. Kod katastrofa Vlada donosi odluku. Kod velikih nesreća odlučuje ministar obrane. Kod protupožarne zaštite odlučuje ministar obrane. Kod traganja i spašavanja odlučuje ministar obrane. Kod pomoći policiji na granici odlučuje Vlada uz suglasnost Predsjednika. KLJUČNE RAZLIKE: uporaba je borbena, izvan RH, o njoj odlučuju Sabor i Predsjednik; korištenje je neborbeno, unutar RH, o njemu odlučuju Vlada i ministar",
    "vanilla_odgovor": "Prema **Zakonu o obrani** (Narodne novine br. 76/05 i sl.), postoje jasne razlike između **upotrebe** i **korištenja** Oružanih snaga, kao i različiti postupci donošenja odluka ovisno o situaciji.  \n\n### **1. Korištenje Oružanih snaga**  \n- Prema **čl. 9.** Zakona, korišćenjem se podrazumijeva upotreba snaga i sredstava OSRH u miru, npr. za održavanje reda, potporu civilnim institucijama ili sudjelovanje u međunarodnim misijama.  \n- Odluku o korištenju donosi **Predsjednik Republike** po preporuci Vlade (**čl. 8.**).  \n\n### **2. Upotreba Oružanih snaga**  \n- Prema **čl. 10.**, upotrebom se podrazumijeva aktivno djelovanje u ratu, izvanrednom stanju ili agresiji protiv RH.  \n- U tom slučaju odluku donosi **Vlada** nakon savjetovanja s Predsjednikom i Glavnim stožerom OSRH.  \n\n### **Ključna razlika**  \n- **Korištenje** odnosi se na mirnodopsko razdoblje i redovitu provedbu zadaća.  \n- **Upotreba** uključuje ratne operacije i izvanredne situacije.  \n\nNapomena: Ova informacija temelji se na Zakonu o obrani i pripadajućim pravilnicima. Za detaljnije tumačenje potrebno je dodatno proučavati važeće propise.",
    "rag_odgovor": "Prema **Zakonu o obrani** (2025), postoje jasne razlike između **korištenja** i **upotrebe** Oružanih snaga, kao i različita tijela koja donose odluke u svakom slučaju.  \n\n### **1. Korišćenje Oružanih snaga**  \n- **Definicija**: Prema **Čl. 46.** Zakona o obrani, korišćenjem se podrazumijeva aktivno angažiranje snaga u operacijama, uključujući i izvan ratnog stanja.  \n- **Tijela koja donose odluke**:  \n  - **Sabor** (donosi strateške odluke),  \n  - **Predsjednik RH** (vrhovni zapovjednik, vidi **Ustav, Čl. 100.**),  \n  - **Vlada** (ministar obrane),  \n  - **Glavni stožer** (provođenje odluka).  \n- **Mehanizam donošenja odluka**: Odluke se donose na temelju Ustava i Zakona o obrani, a provode se preko zapovijedi Glavnog stožera.  \n\n### **2. Uporaba Oružanih snaga**  \n- **Definicija**: Prema **Čl. 47.** Zakona o obrani, upotrebom se podrazumijeva aktivno djelovanje snaga u situacijama neposredne ugroženosti (npr. teroristički napad, invazija).  \n- **Tijela koja donose odluke**:  \n  - **Predsjednik RH** ima pravo naredio upotrebu čak i bez proglašenog rata (vidi **Ustav, Čl. 100.**),  \n  - **Vlada** i **ministar obrane** također sudjeluju u donošenju odluka.  \n- **Posebnost**: Ako postoji neposredna opasnost, Predsjednik RH može samostalno reagirati (supotpis Vlade nije potreban).  \n\n### **Ključna razlika**  \n- **Korišćenje** uključuje širi spektar aktivnosti (operacije, misije, obuka) i zahtijeva višestruku sankciju (Sabor, Vlada, Predsjednik).  \n- **Upotreba** odnosi se na hitne slučajeve ugroze i omogućuje brzu reakciju najviših autoriteta (Predsjednik RH).  \n\nIzvor: **Zakon o obrani 2025, Čl. 46.–47.** + **Ustav RH, Čl. 100.",
    "graph_rag_odgovor": "Prema **Zakonu o obrani**, postoje jasne razlike između **korištenja** i **upotrebe** Oružanih snaga, ovisno o situaciji i nadležnim tijelima koja donose odluke.  \n\n### **Korišćenje Oružanih snaga**  \n- Riječ je o svakodnevnom korištenju snaga u mirnodopskim aktivnostima (npr. vježbe, održavanje reda, humanitarne misije).  \n- **Donose odluku:**  \n  - **Vlada** ili **ministar obrane** (Članak 58).  \n  - Odluke se provode preko **zapovijedi načelnika Glavnog stožera** (Članak 58).  \n\n### **Upotreba Oružanih snaga**  \n- Primjenjuje se u specifičnim situacijama, poput:  \n  - Ratnog stanja (Članak 46).  \n  - Proturaketnih operacija (Članak 57).  \n- **Donose odluku:**  \n  - **Hrvatski sabor**, **Predsjednik Republike**, **predsjednik Vlade** i **ministar obrane** zajedno (Članak 46).  \n  - Provodi se preko **zapovijedi načelnika Glavnog stožera** (Članak 46).  \n\n### **Ključna razlika**  \n- **Korišćenje** odnosi se na redovitu upotrebu snaga u mirnodopskom vremenu.  \n- **Upotreba** uključuje hitne/vojne situacije gdje odlučuju više politički i vojni dužnosnici.  \n\nIzvor: [Zakon o obrani 2025, Članak 46 & 58](https://www.nacionalnaobrana."
  },
  {
    "rbr": 6,
    "kategorija": "kompleksna_pitanja_jedan_dokument",
    "pitanje": "Koja su prava i obveze ročnika tijekom temeljnog vojnog osposobljavanja prema Pravilniku o temeljnom vojnom osposobljavanju?",
    "ocekivani_odgovor": "OBVEZE ROČNIKA. Življenje i rad u skladu s propisima o službi u OS. Osposobljavanje za specijalnost 11A (strijelac). Svečana prisega pred ministrom obrane. Pridržavanje vojnih pravila i discipline. PRAVA ROČNIKA. 1. FINANCIJSKA. Plaća ili naknada prema Zakonu o službi. Naknada prijevoza od i do prebivališta. 2. ZDRAVSTVENA ZAŠTITA. Osnovno zdravstveno osiguranje. Dopunsko zdravstveno osiguranje. Osiguranje od ozljede na radu. Osiguranje od nesretnog slučaja. 3. MATERIJALNA. Smještaj. Prehrana. Vojna odora. Sportska oprema. 4. PRIZNANJA. Značka najboljeg ročnika naraštaja. Pravo izbora mjesta službe pri prijmu u djelatnu službu (za najboljeg ročnika)",
    "vanilla_odgovor": "Prema **Pravilniku o temeljnom vojnom osposobljavanju** (NN br. 9/08), ročnici imaju sljedeća prava i obveze:  \n\n### **Obveze:**  \n- Ispunjavanje svih zapovjedi nadređenih (čl. 7).  \n- Aktivno sudjelovanje u obuci i vježbama (čl. 6).  \n- Poštivanje reda, discipline i propisa (čl. 8).  \n- Čuvanje vojne tajne (čl. 10).  \n\n### **Prava:**  \n- Pravo na zdravstvenu zaštitu i medicinski pregled (čl. 12).  \n- Pravo na obrazovanje i kulturne aktivnosti (čl. 13).  \n- Pravo na pritužbu protiv nepravednog postupka (čl. 14).  \n- Pravo na naknadu štete ako dođe do ozljede ili smrti (čl. 15).  \n\nNadležno tijelo za provedbu je Ministarstvo obrane RH (čl. 1).  \n\n*Napomena: Ova informacija temelji se isključivo na Pravilniku o temeljnom vojnom osposobljavanju.",
    "rag_odgovor": "Prema **Pravilniku o temeljnom vojnom osposobljavanju** (Članak 18.), prava i obveze ročnika tijekom temeljnog vojnog osposobljavanja uključuju sljedeće:  \n\n### **Prava ročnika:**  \n- **Plaća ili naknada** – u iznosu određenom zakonom koji uređuje službu u Oružanim snagama.  \n- **Naknada troškova javnog prijevoza** – u visini cijene karte najjeftinijeg javnog prijevoza:  \n  - Pri dolasku na mjesto provedbe osposobljavanja (od prebivališta do lokacije).  \n  - Pri povratku (od lokacije do prebivališta).  \n- **Osnovno i dopunsko zdravstveno osiguranje**.  \n- **Osiguranje od posljedica nesretnog slučaja**.  \n- **Obvezno zdravstveno osiguranje za slučaj ozljede na radu**.  \n- **Mogućnost izlaska izvan vojne lokacije** – u skladu s rasporedom programa osposobljavanja (npr. vikendevi, slobodni dani).  \n- **Slobodno vrijeme** – unutar propisanog raspona.  \n- **Smještaj i prehrana** – osigurani po standardima vojske.  \n- **Vojna odora i sportska oprema** – osigurana tijekom trajanja osposobljavanja.  \n\n### **Obveze ročnika:**  \n- Svršavanje svih zadataka i aktivnosti definiranih programom osposobljavanja.  \n- Poštivanje propisa i naredaba nadležnih časnika.  \n- Redovno polaženi zdravstveni pregledi i psihološko ispitivanje (ako je predviđeno).  \n\nIzvor: **Pravilnik o temeljnom vojnom osposobljavanju**, Članak 18. (NN 136/25), dostupno na [pravilnik.hr](https://www.pravilnik.",
    "graph_rag_odgovor": "Prema **Pravilniku o temeljnom vojnom osposobljavanju**, prava i obveze ročnika tijekom temeljnog vojnog osposobljavanja uključuju sljedeće:  \n\n### **Prava ročnika:**  \n1. **Plaća / Naknada** – Prema članku 18. Pravilnika, ročnici imaju pravo na plaću odnosno naknadu u iznosu određenom zakonom kojim se uređuje služba u Oružanim snagama.  \n2. **Naknada troškova prijevoza** – Prema članku 18. Pravilnika, ročnici imaju pravo na naknadu troškova javnog prijevoza u visini cijene karte najjeftinijeg javnog prijevoza pri dolasku na mjesto osposobljavanja i povratku.  \n3. **Zdravstveno osiguranje** – Prema članku 18. Pravilnika, ročnici imaju pravo na osnovno i dopunsko zdravstveno osiguranje, osiguranje od posljedica nesretnog slučaja, obvezno zdravstveno osiguranje za slučaj ozljede na radu, kao i smještaj i prehranu.  \n4. **Mokra i sportska oprema** – Prema članku 18. Pravilnika, ročnici dobivaju vojnu odoru i sportsku opremu.  \n5. **Izlazak izvan vojne lokacije** – Prema članku 16. Pravilnika, ročnici imaju pravo na izlazak iz vojne lokacije u skladu s rasporedom utvrđenim programom osposobljavanja.  \n\n### **Obaveze ročnika:**  \n- **Pohađanje programa osposobljavanja** – Prema članku 3. Pravilnika, ročnici moraju proći program temeljnog vojnog osposobljavanja kako bi stekli vojna znanja i vještine potrebne za službu u Oružanim snagama.  \n- **Spoštivanje propisa i pravila** – Rukovnici su dužni pridržavati se svih propisa i pravila iz članka 1. Pravilnika.  \n\nAko vam trebaju dodatne pojedinosti, slobodno pitajte!"
  },
  {
    "rbr": 7,
    "kategorija": "kompleksna_pitanja_jedan_dokument",
    "pitanje": "Objasnite razlike između mirnodopskog i ratnog sastava Oružanih snaga prema Zakonu o službi.",
    "ocekivani_odgovor": "MIRNODOPSKI SASTAV. Čine ga djelatne vojne osobe, službenici i namještenici, pričuvnici pozvani na službu, ugovorni pričuvnici, kadeti te ročnici na temeljnom vojnom osposobljavanju. Svrha mu je redovno funkcioniranje OS. Veličina je određena mirnodopskim ustrojem. RATNI SASTAV. Čine ga svi iz mirnodopskog sastava te dodatno mobilizirani i razvrstani pričuvnici, nerazvrstani pričuvnici i drugi vojni obveznici. Svrha mu je borbeno djelovanje. Veličina je određena ratnim ustrojem i znatno je veća. PRIJELAZ. Odvija se mobilizacijom u ratnom stanju i stanju neposredne ugroženosti. Odluku donosi Predsjednik Republike. Mobilizacija može biti opća ili djelomična. Mobilizacijom OS prelaze iz mirnodopskog u ratno ustrojstvo",
    "vanilla_odgovor": "Prema **Zakonu o službi u Oružanim snagama Republike Hrvatske** (Narodne novine broj 76/06), razlike između mirnodopskog i ratnog sastava Oružanih snaga određene su slijedećim načinom:  \n\n### **Mirnodopski sastav**  \n- Definisan je člankom **8.** Zakona – uključuje aktivnu vojsku, pričuve i domobranstvo.  \n- Sastoji se od profesionalnih vojnika, ročnih vojnika i dragovoljaca.  \n- Nadzor obavlja Ministarstvo obrane RH.  \n\n### **Ratni sastav**  \n- Definisan je člankom **9.** Zakona – uključuje sve pripadnike koji mogu biti pozvani u službu tijekom rata ili izvanrednog stanja.  \n- Obavlja se mobilizacijom, uključujući pričuvnike i dragovoljce.  \n- Upravljanje ratnim sastavom regulirano je člankom **10.** Zakona, gdje se navodi da ratno stanje može proglasiti Vlada RH uz suglasnost Sabora.  \n\n### **Nadležno tijelo**  \nZa ratni sastav, odluka o mobilizaciji donosi **Vlada RH** (članak **10.**), dok mirnodopski sastav koordinira **Ministarstvo obrane**.  \n\nNapomena: Ova informacija temelji se isključivo na Zakonu o službi u Oružanim snagama RH (NN 76/06).",
    "rag_odgovor": "Prema **Zakonu o službi u Oružanim snagama Republike Hrvatske** (Članak 25.), razlike između mirnodopskog i ratnog sastava Oružanih snaga jesu sljedeće:  \n\n### **Mirnodopski sastav**  \n- Sastoji se od:  \n  - *Djelatnih vojnih osoba* (aktivni časnici, dočasnici, vojnici),  \n  - *Službenika i namještenika* raspoređenih u OSRH,  \n  - *Pričajeva* pozvanih na obuku,  \n  - *Ugovornih pričavnika*,  \n  - *Kadeta* i  \n  - *Ronilaca* koji su završili temeljno vojno osposobljavanje.  \n- Prema **Zakonu o obrani** (Članak 43., stavak 2.), dodatni elementi uključuju *državne službenike i namještenike* raspoređene u OSRH.  \n\n### **Ratni sastav**  \n- Uz sve elemente iz mirnodopskog sastava, uključuje još i:  \n  - *Vojne obveznike* mobilizirane u OSRH (po **Zakonu o službi**, Članak 25., stavak 3.).  \n- Prema **Zakonu o obrani** (Članak 45.), službena upotreba je hrvatski jezik i latinica.  \n\n### **Nadležno tijelo**  \n- **Predsjednik Republike** određuje mirnodopski i ratni ustroj OSRH (prema **Zakonu o službi**, Članak 44.) te potvrđuje strukturu činova.  \n\nNapomena: Informacije su preuzete iz navedenih članaka zakona. Za detaljnije informacije preporučuje se konzultiranje nadležnih tijela (npr. MORH).",
    "graph_rag_odgovor": "Prema **Zakonu o službi u Oružanim snagama Republike Hrvatske**, razlike između **mirnodopskog** i **ratnog sastava** Oružanih snaga definirane su sljedećim načinom:  \n\n### **Mirnodopski sastav**  \n- Prema **Članku 25.** Zakona, mirnodopski sastav čine:  \n  - *Djelatne vojne osobe* (vojnici, časnici, dočasnici, mornari).  \n  - *Službenici i namještenici* (npr. civilni zaposlenici u MORH-u).  \n  - *Pričuvnici pozvani na službu*, uključujući:  \n    - *Ugovorne pričuvnike*.  \n    - *Kadete* (studenti vojne škole).  \n    - *Ročnike* (osobe koje su prošle temeljno vojno osposobljavanje).  \n  - *Osobe koje su pristupile temeljnom vojnom osposobljavanju*.  \n\n### **Ratni sastav**  \n- Prema istom članku, ratni sastav uključuje sve iz mirnodopskog sastava **plus**:  \n  - *Mobilizirane vojne obveznike* (npr. ročnici koji nisu još služili).  \n\n### Ključna razlika  \n- **Mirnodopski sastav** odnosi se na stalni dio OS-a (aktivno osoblje + pričuve).  \n- **Ratni sastav** uključuje i mobiliziranu narodnu gardu (vojne obveznike) u slučaju krize.  \n\nZa dodatne detalje pogledajte **Članak 43.** Zakona o obrani, koji dodatno pojašnjava ustroj vojske."
  },
  {
    "rbr": 8,
    "kategorija": "kompleksna_pitanja_jedan_dokument",
    "pitanje": "Objasnite postupak i uvjete za odgodu temeljnog vojnog osposobljavanja prema Zakonu o obrani.",
    "ocekivani_odgovor": "POSTUPAK. Zahtjev za odgodu podnosi se nadležnom područnom odjelu za poslove obrane u roku od osam dana od dana primitka poziva na temeljno vojno osposobljavanje. Može se podnijeti osobno, preporučenom pošiljkom ili elektroničkim putem. Uz zahtjev se prilažu odgovarajući dokazi (npr. dokaz o nezaposlenosti ostalih članova obitelji, potvrda o datumu sklapanja braka, izvadak iz matice umrlih, dokaz o trudnoći, potvrda o registraciji obrta). RAZLOZI ZA ODGODU. 1. ŠKOLOVANJE. Novak upisan na visoko učilište dostavlja potvrdu o upisu najkasnije do 31. listopada tekuće godine, a odgoda traje najdulje do 30. rujna godine u kojoj navršava 29 godina. 2. OSOBNI I OBITELJSKI RAZLOZI. Odgoda se može odobriti ako u kućanstvu nema drugog člana koji privređuje (najdulje godinu dana), ako je novak vježbenik ili se prvi put zaposlio (do isteka staža/probnog rada), ako u kućanstvu ima članove kojima je prijeko potrebna tuđa pomoć i njega, ako se iz istog kućanstva istodobno upućuju dva ili više članova, ako ima određen datum sklapanja braka (najdulje tri mjeseca), ako očekuje rođenje djeteta (najdulje godinu dana), ako je nastupila smrt u užoj obitelji (do idućeg roka za upućivanje) te ako je otvorio obrt ili samostalnu djelatnost (najdulje godinu dana). 3. SPORTAŠI. Zbog sudjelovanja na svjetskim i europskim prvenstvima te državnim prvenstvima odgoda se može odobriti najdulje do jedne godine. ODLUČIVANJE. O zahtjevu odlučuje nadležni područni odjel za poslove obrane odlukom. Kod odgode zbog školovanja i sporta (čl. 21.k) odluka mora sadržavati elemente rješenja prema Zakonu o općem upravnom postupku; protiv nje nije dopuštena žalba, ali se može pokrenuti upravni spor pred Visokim upravnim sudom RH, koji odlučuje u roku od 90 dana. Odluka o odgodi sadrži dan, mjesec i godinu do kada se osposobljavanje odgađa",
    "vanilla_odgovor": "Prema **Zakonu o obrani** (Narodne novine broj 76/05 i izmjene), postupak i uvjeti za odgodu temeljnog vojnog osposobljavanja regulirani su člancima 89., 90. i 91.  \n\n### **Postupak za odgodu:**  \n1. **Članak 89.** – Osoba koja želi odgodu mora podnijeti zahtjev nadležnom tijelu najkasnije **30 dana prije roka za polazak na osposobljavanje**.  \n2. **Članak 90.** – Zahtjev se prosljeđuje zapovjedniku postrojbe ili ustanove gdje bi se trebalo provesti osposobljavanje.  \n3. **Članak 91.** – Povjerenstvo osniva zapovjednik postrojbe radi ocjenjivanja opravdanosti odgođenog razloga (npr. obrazovanje, zdravstveno stanje).  \n\n### **Uvjeti za odgodu:**  \n- **Obrazovanje:** Ako osoba pohađa fakultet, strukovnu školu ili poslijediplomski studij, može zatražiti odgodu dok završi studij.  \n- **Zdravstveni razlozi:** Ako postoji medicinska indikacija (npr. kronična bolest), potrebna je potvrda liječnika.  \n- **Društveni razlozi:** Npr. skrb o teškoj bolesnoj osobi ili skrbi o maloljetnoj djeci.  \n\n### **Nadležno tijelo:**  \n- **Zapovjednik postrojbe** donosi odluku nakon preporuke povjerenstva.  \n\nNapomena: Ova informacija temelji se na člancima Zakona o obrani koji reguliraju odgodu osposobljavanja. Za detaljnije upute preporučuje se kontaktirati **Hrvatske oružane snage** ili **MUP RH**.",
    "rag_odgovor": "Prema **Zakonu o obrani** (NN 136/25), postupak i uvjeti za odgodu temeljnog vojnog osposobljavanja regulirani su u **Članku 21.**  \n\n### **Postupak:**  \n1. **Podnošenje zahtjeva:**  \n   - Zahtjev za odgodu podnosi se **nadležnom područnom odjelu za poslove obrane** u roku od **osam dana** od dana primitka poziva za temeljno vojno osposobljavanje.  \n   - Može se podnijeti **osobno, preporučenom pošiljkom ili elektroničkim putem**.  \n\n2. **Potrebni prilozi:**  \n   - Dokaz o **nezaposlenosti ostalih članova obitelji** (npr. potvrde o zapošljavanju).  \n   - Ugovor o radu / rješenje o radnom odnosu / potvrda o osiguranju (ako se odgoda traži zbog zaposlenja kao vježbenik).  \n   - Potvrda nadležnog tijela za socijalnu skrb (ako su u kućanstvu ovisni članovi).  \n   - Izvadak iz matice umrlih (ako je došlo do smrti u obitelji).  \n   - Potvrda o registraciji obrta / djelatnosti (ako je otvoren obrt).  \n\n### **Uvjeti za odgodu:**  \n- **Smrt u užoj obitelji** – odgoda do sljedećeg roka za upućivanje.  \n- **Otvaranje obrta / samostalne djelatnosti** – odgoda do godinu dana od registracije.  \n- **Zapošljavanje kao vježbenik / prvo zaposlenje** – odgoda do završetka vježbeničkog staža / isteka probnog rada.  \n- **Dijete u kućanstvu** – odgoda do godinu dana od dolaska na osposobljavanje.  \n- **Bračni savez** – odgoda do tri mjeseca.  \n- **Trudnoća / rađanje djeteta** – odgoda do godinu dana.  \n- **Visoko obrazovanje** – odgoda ako je student, do 30. rujna godine kad navrši 29 godina.  \n- **Sportska natjecanja** – odgoda do godinu dana, ako postoji zahtjev Hrvatskog olimpijskog odbora.  \n\n### **Odluka:**  \nNadležno tijelo donosi odluku u roku od osam dana od podnošenja zahtjeva.  \n\nNapomena: Informacije su preuzete iz dostupnih dijelova Zakona o obrani (NN 136/25). Za detaljnije informacije preporučuje se konzultiranje cjelovitih tekstova zakona.",
    "graph_rag_odgovor": "Prema **Zakonu o obrani** (NN 136/25), članak 25.a definira uvjete i postupak za odgodu temeljnog vojnog osposobljavanja. Evo ključnih elemenata:  \n\n### **1. Opći uvjeti za odgodu**  \nRočnik može dobiti odgodu ako ispunjava barem jedno sljedeće:  \n- **Bolest** – do oporavka (potrebna liječnička potvrda).  \n- **Situacija u kućanstvu** – npr. smrt člana obitelji, teška bolest člana kućanstva, neodgodivi poslovi (npr. poljoprivreda) itd. (potrebni dokazi poput potvrde škole, certifikata za poljoprivredu).  \n- **Akademsko obrazovanje** – ako je sprečan polaganje ispita ili završetak godine (potvrda fakulteta).  \n- **Planirano vjenčanje** – do datuma vjenčanja.  \n- **Rodiljni/roditeljski dopust** – za muškarce (potvrda HZZO-a).  \n\n### **2. Postupak za dobivanje odgode**  \n1. **Podnesite zahtjev** – putem obrasca dostupnog na područnom odjelu za poslove obrane.  \n2. **Priložite dokaze** – ovisno o razlogu (liječnička potvrva, potvrda fakulteta, certifikat poljoprivrede itd.).  \n3. **Prihvata odluka** – Ministarstvo obrane donosi odluku najkasnije 40 dana prije roka osposobljavanja (članak 7. Pravilnika o temeljnom vojnom osposobljavanju).  \n\n### **3. Trajanje odgode**  \nTrajanje ovisi o razlogu:  \n- Do oporavka (bolest).  \n- Dok traje situacija u kućanstvu (npr. do kraja godine za studente).  \n- Do datuma vjenčanja.  \n\nZa detaljnije informacije pogledajte **članak 25.a Zakona o obrani** i **pravilnik o temeljnom vojnom osposobljavanju**."
  },
  {
    "rbr": 9,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Kada nastaje vojna obveza za državljane Republike Hrvatske?",
    "ocekivani_odgovor": "Vojna obveza nastaje u kalendarskoj godini u kojoj državljanin Republike Hrvatske navršava 18 godina života.",
    "vanilla_odgovor": "Vojna obveza za građane Republike Hrvatske počinje rođenjem djeteta muškog spola (muškarci). Prema članku **6.** Zakona o vojnoj obvezi (Narodne novine br. 98/07), muškarci su dužni služiti vojnu obvezu od 18. do 30. godine života. Međutim, prema članku **7.** istog zakona, rok započinjanja vojne obaveze može se produžiti ili skratiti ovisno o potrebama vojske.  \n\nZa dodatne informacije pogledajte članak **1.** Pravilnika o provedbi Zakona o vojnoj obvezi (NN br. 112/07) koji detaljnije regulira postupak utvrđivanja početka vojne obaveze.  \n\nNapomena: Ova informacija temelji se na Zakonu o vojnoj obvezi i pripadajućim pravilnicima. U slučaju promjene zakona, potrebno je provjeriti najnoviju verziju propisa.",
    "rag_odgovor": "Vojna obveza za državljane Republike Hrvatske **nastupa u kalendarskoj godini u kojoj navršavaju 18 godina života**, prema članku 19. Zakona o obrani (NN 73/13, 30/18, 136/25).  \n\nNapomena: Ova informacija temelji se isključivo na dostupnom kontekstu.",
    "graph_rag_odgovor": "Vojna obveza za državljane Republike Hrvatske **nastupa u kalendarskoj godini u kojoj navršavaju 18 godina života** [Zakon o obrani 2025, Članak 19].  \n\nNapomena: Ova informacija temelji se isključivo na dostupnim dokumentima."
  },
  {
    "rbr": 10,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Koliko traje temeljno vojno osposobljavanje?",
    "ocekivani_odgovor": "Temeljno vojno osposobljavanje traje dva mjeseca.",
    "vanilla_odgovor": "Temeljno vojno osposobljavanje u Hrvatskoj traje **60 dana**.  \n\nIzvor: *Zakon o vojnim obvezama* (čl. 78).  \nDodatno, Pravilnik o provedbi Zakona o vojnim obvezama (NN 9/04) detaljnije regulira trajanje i sadržaj osposobljavanja.  \n\nNapomena: ako se radi o profesionalcima ili pričuvnicima, rok može varirati ovisno o kategoriji.",
    "rag_odgovor": "Temeljno vojno osposobljavanje traje dva mjeseca. (izvor: Zakon_o_obrani_2025.",
    "graph_rag_odgovor": "Temeljno vojno osposobljavanje traje **30 dana**.  \n\nIzvor: [Pravilnik o temeljnom vojnom osposobljavanju, Članak 20](https://pravilnikik.pravactv."
  },
  {
    "rbr": 11,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Tko je vrhovni zapovjednik Oružanih snaga Republike Hrvatske?",
    "ocekivani_odgovor": "Predsjednik Republike Hrvatske je vrhovni zapovjednik Oružanih snaga Republike Hrvatske.",
    "vanilla_odgovor": "Prema **Zakonu o obrani** (Narodne novine br. 97/02), **Sabor Republike Hrvatske** ima ulogu vrhovnog zapovjednika Oružanih snaga RH. Međutim, u praksi, predsjednik Vlade RH obavlja funkciju vrhovnog zapovjednika kada Sabor ne zasjeda ili prema odluci Sabora.  \n\nDetaljnije:  \n- Članak 6. Zakona o obrani: *\"Vrhovno zapovjedništvo Oružanih snaga Republike Hrvatske obavlja Vlada Republike Hrvatske.\"*  \n- Prema Ustavu RH (čl. 89.), predsjednik Vlade može biti imenovan vrhovnim zapovjednikom po odluci Sabora.  \n\nNapomena: Ova informacija temelji se na zakonskim odredbama, a ne na trenutnoj političkoj praksi.",
    "rag_odgovor": "Prema **Članku 100.** **Ustava Republike Hrvatske 2018**, vrhovni zapovjednik Oružanih snaga Republike Hrvatske je **Predsjednik Republike**. On imenuje i razrješuje vojne zapovjednike, a u slučaju neposredne ugroženosti neovisnosti, jedinstvenosti i opstojnosti države može, uz supotpis predsjednika Vlade, narediti uporabu oružanih snaga čak i ako nije proglašeno ratno stanje.  \n\nDetaljnije, prema **Zakonu o obrani 2025**, **Članak 47.** dodatno definira ulogu Predsjednika Republike kao onoga tko \"naređuje uporabu i zapovijeda Oružanim snagama u ratnom stanju\".  \n\nIzvor:  \n- [Ustav Republike Hrvatske 2018](https://www.hins.hr/) – **Članak 100.**  \n- [Zakon o obrani 2025](https://pravosudni.portal.hr/) – **Članak 45., 46., 47.**  \n\nNapomena: Ova informacija temelji se isključivo na dostupnim ustavnim i zakonskim izvorima.",
    "graph_rag_odgovor": "Vrhovni zapovjednik Oružanih snaga Republike Hrvatske je Predsjednik Republike Hrvatske. Ova informacija proizlazi iz Ustava Republike Hrvatske iz 2018., Članak 100, koji navodi da \"Predsjednik Republike vrhovni je zapovjednik oružanih snaga Republike Hrvatske."
  },
  {
    "rbr": 12,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Koje su tri grane Oružanih snaga Republike Hrvatske?",
    "ocekivani_odgovor": "Tri grane Oružanih snaga Republike Hrvatske su: Hrvatska kopnena vojska, Hrvatska ratna mornarica i Hrvatsko ratno zrakoplovstvo.",
    "vanilla_odgovor": "Tri glavne grane Oružanih snaga Republike Hrvatske su:  \n\n1. **Hrvatska kopnena vojska** (HRZ) – regulirana člankom 6. Zakona o obrani.  \n2. **Hrvatska ratna mornarica** (HRM) – regulirana člankom 7. istog zakona.  \n3. **Hrvatsko ratno zrakoplovstvo i protuzračna obrana** (HRZ i PZO) – regulirana člankom 8. Zakona o obrani.  \n\nSve tri grane zajedno čine jedinstveni sustav Oružanih snaga RH, a svaka ima svoje specifične zadaće i ustrojbene jedinice. Nadležno tijelo za upravljanje tim snagama je Ministarstvo obrane RH.",
    "rag_odgovor": "Tri grane Oružanih snaga Republike Hrvatske su:  \n1. **Hrvatska kopnena vojska**  \n2. **Hrvatska ratna mornarica**  \n3. **Hrvatsko ratno zrakoplovstvo**  \n\n(Izvor: [Zakon o obrani 2025], Članak 43.",
    "graph_rag_odgovor": "Tri grane Oružanih snaga Republike Hrvatske su:\n\n1. **Hrvatska kopnena vojska** (Clanak 41, Stavak 3)\n2. **Hrvatska ratna mornarica** (Clanak 41, Stavak 3)\n3."
  },
  {
    "rbr": 13,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Kada prestaje vojna obveza za muškarce?",
    "ocekivani_odgovor": "Vojna obveza za muškarce prestaje na kraju kalendarske godine u kojoj navršavaju 55 godina života.",
    "vanilla_odgovor": "Vojna obveza za muškarce u Republici Hrvatskoj prestaje nakon izvršene osnovne vojne službe ili alternativne službe (npr. civilne službe). Prema **Zakonu o službi u Oružanim snagama RH** (NN br. 97/06), trajanje osnovne vojne službe iznosi 6 mjeseci, a nakon toga osoba prelazi u pričuvu.  \n\nMeđutim, prema **Narodnoj odluci o vojnom obvezniku** (NN br. 81/06), pojedinci mogu biti pozvani na osposobljavanje tijekom godina koje su u pričuvnom statusu (npr. godišnje osposobljavanje traje do 10 dana). Vojno-redarstveni rok (priča) može se produžiti ovisno o potrebama države.  \n\nZa točne podatke o pojedincu (npr. datum završetka služe) potrebno je konzultirati evidencije MORH-a ili Vojnog upisa.  \n\nNapomena: Ova informacija temelji se na općem znanju o hrvatskom zakonu o vojnoj obvezi. Za specifične slučajeve preporučuje se provjera službenih izvora.",
    "rag_odgovor": "Vojna obveza za muškarce prestaje prema članku 20. Zakona o obrani 2025:  \n- Na kraju kalendarske godine u kojoj navršavaju **55 godina** života.  \n- Ako su ocijenjeni nesposobnima za vojnu službu.  \n- Na temelju otpusta iz hrvatskog državljanstva.  \n\nIznimno, prema članku 20. stavku 2., vojna obveza prestaje za viših časnika i generale/admirale posljednjeg dana kalendarske godine u kojoj navršavaju **65 godina** života.  \n\nIzvor: [Zakon o obrani 2025](https://www.narodne-novine.hr/), članci 20. i 21.",
    "graph_rag_odgovor": "Vojna obveza za muškarce prestaje prema **Zakonu o obrani** (Clanak 20):  \n- Na kraju kalendarske godine u kojoj navršavaju **55 godina života**, ako su ocijenjeni nesposobnima za vojnu službu.  \n- Posebno za **više časnike i generale/admirale**, vojna obveza prestaje posljednjeg dana kalendarske godine u kojoj navršavaju **65 godina života**.  \n\nDodatno, prema **Zakonu o službi u Oružanim snagama RH** (Clanak 210), vojni rok započinje u kalendarskoj godini u kojoj građanin navršava **18 godina života**.  \n\nNapomena: Informacije su preuzete isključivo iz navedenih članaka zakona."
  },
  {
    "rbr": 14,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Tko imenuje načelnika Glavnog stožera Oružanih snaga?",
    "ocekivani_odgovor": "Načelnika Glavnog stožera Oružanih snaga imenuje Predsjednik Republike Hrvatske na prijedlog Vlade Republike Hrvatske i nakon pribavljenog mišljenja Odbora za obranu Hrvatskoga sabora.",
    "vanilla_odgovor": "Načelnika Glavnog stožera Oružanih snaga Republike Hrvatske imenuje Vlada Republike Hrvatske na prijedlog ministra obrane.  \n\n**Temeljno pravo:**  \n- **Zakon o obrani (Narodne novine broj 97/02)** – Članak 68.  \n- **Zakon o službi u Oružanim snagama RH (NN br. 109/02)** – Ne sadrži izravnu odredbu o imenovanju načelnika GS OSRH, ali se odnosi na hijerarhiju zapovjedništva.  \n\nNapomena: Prema Ustavu RH (NN br. 1/90), Vlada ima ovlast predlaganja kandidata za visoke vojne dužnosti nakon savjetovanja s relevantnim odborom Sabora.",
    "rag_odgovor": "Načelnik Glavnog stožera Oružanih snaga imenuje se na razdoblje od četiri godine i ne može biti ponovno imenovan. Prema članku 4. Pravilnika o načinu i postupku imenovanja načelnika Glavnog stožera Oružanih snaga Republike Hrvatske, koji je donesen temeljem članka 49. Zakona o obrani, načelnik Glavnog stožera imenuje se na način i po postupku koji se utvrđuje Pravilnikom. Međutim, prema članku 49. Zakona o obrani, ustroj Glavnog stožera propisuje Predsjednik Republike na prijedlog načelnika Glavnog stožera i uz suglasnost ministra obrane. Dakle, iako Pravilnik određuje detaljnije procedure, Zakon o obrani daje ključne ovlasti predsjedniku republike i ministru obrane u procesu imenovanja načelnika Glavnog stožera.",
    "graph_rag_odgovor": "Načelnik Glavnog stožera Oružanih snaga imenuje se na razdoblje od četiri godine i ne može biti ponovno imenovan. Načelnik Glavnog stožera imenuje se na razdoblje od četiri godine i ne može biti ponovno imenovan.  \n\n**Izvor:** [Zakon o obrani 2025, Članak 4](https://www.narodne-novine."
  },
  {
    "rbr": 15,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Koliko traje mandat načelnika Glavnog stožera?",
    "ocekivani_odgovor": "Načelnik Glavnog stožera imenuje se na razdoblje od četiri godine i bez mogućnosti reizbora.",
    "vanilla_odgovor": "Mandat načelnika Glavnog stožera Oružanih snaga Republike Hrvatske traje **4 godine** (članak 70. Zakona o obrani).  \n\nNapomena: Ova informacija temelji se na Zakonu o obrani (Narodne novine 89/06) i ne zahtijeva dodatnu potvrdu iz konteksta pitanja.",
    "rag_odgovor": "Mandat načelnika Glavnog stožera traje **4 godine**, kako je navedeno u **Članku 15. stavku 4.** Zakona o obrani 2025.  \n\nNapomena: Ova informacija nije pronađena u dostupnim dokumentima.",
    "graph_rag_odgovor": "Mandat načelnika Glavnog stožera traje **4 godine**.  \n\nIzvor: [Zakon o obrani 2025, Članak 14](https://www.zakonyprolidi."
  },
  {
    "rbr": 16,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Što je temeljna svrha obrane Republike Hrvatske?",
    "ocekivani_odgovor": "Temeljna svrha obrane je očuvanje suvereniteta, neovisnosti i teritorijalne cjelovitosti Republike Hrvatske.",
    "vanilla_odgovor": "Temeljna svrha obrane Republike Hrvatske definirana je u **Zakonu o obrani** (Narodne novine br. 76/05). Prema članku 1., svrha obrane jest \"zaštita suvereniteta, teritorijalne cjelovitosti i političke neovisnosti Republike Hrvatske te očuvanje mira i stabilnosti\".  \n\nDodatno, prema članku 2. istog zakona, obrana uključuje i zaštitu građana, imovine i ključnih infrastrukturnih objekata od vanjskih i unutarnjih prijetnji. Nadležno tijelo za provedbu ove politike je **Ministarstvo obrane RH**.  \n\nNapomena: ova informacija temelji se isključivo na Zakonu o obrani.",
    "rag_odgovor": "Temeljna svrha obrane Republike Hrvatske jest očuvanje suvereniteta, neovisnosti i teritorijalne cjelovitosti Republike Hrvatske. Ova svrha je definirana u **Članku 2. stavku 1.** **Zakona o obrani 2025.**  \n\nNapomena: ako postoji dodatni kontekst koji treba uzeti u obzir, molimo pošalji ga.",
    "graph_rag_odgovor": "Temeljna svrha obrane Republike Hrvatske jest osigurati suverenitet, neovisnost i teritorijalnu cjelovitost zemlje, kao i zaštitu građana i njihovog života, slobode i imovine. Ova svrha je definirana u članku 3. Zakona o obrani, gdje se navodi da obrana uključuje pripremu, uporabu i korištenje snaga i sredstava u ratnom stanju, stanju neposredne ugroženosti neovisnosti, jedinstvenosti i opstojnosti Republike Hrvatske i miru."
  },
  {
    "rbr": 17,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Do koje dobi novak može biti upućen na temeljno vojno osposobljavanje?",
    "ocekivani_odgovor": "Novak može biti upućen na temeljno vojno osposobljavanje do isteka 30 godina života.",
    "vanilla_odgovor": "Prema **Zakonu o službi u Oružanim snagama Republike Hrvatske** (Narodne novine br. 97/06), članku 8., novaci mogu biti upućeni na temeljno vojno osposobljavanje do navršene 30. godine života. Međutim, postoje iznimke za pripadnike pričuve ili dragovoljce koji se regrutiraju nakon te dobne granice.  \n\nNadležno tijelo za provedbu ovog postupka je **Ministarstvo obrane RH** putem ustanova poput **Kralješnice vojne škole \"Ban Josip Jelačić\"**.  \n\nNapomena: Informacija temelji se na važećem zakonu, a dodatne pojedinosti o izuzecima mogu se utvrditi kod nadležnog vojnog centra.",
    "rag_odgovor": "Novak može biti upućen na temeljno vojno osposobljavanje do isteka 30 godina života. To je definirano u **Članku 21.** stavku (3) **Zakona o obrani 2025**, gdje je navedeno da se \"Iznimno od stavka 1. ovoga članka, na temeljno vojno osposobljavanje upućuju se i novaci stariji od 19 godina, a najkasnije do isteka 30 godina života...\"  \n\nDodatno, prema istom članku, područjački odjeli za poslove obrane moraju osigurati da se novaci koji su dužni pristupiti vojsci to učine prije nego što navrše 30 godina.  \n\nAko postoji dodatni kontekst (npr. pravila o produženju roka), molimo vas da ga dostavite kako bih mogao ažurirati odgovor.",
    "graph_rag_odgovor": "Novak može biti upućen na temeljno vojno osposobljavanje do navršenih **29 godina** starosti. Ova granica je definirana u članku 24.k Zakona o obrani 2025. godine.  \n\nAko postoji dodatni kontekst ili pitanja vezana uz ovu temu, slobodno pitajte!"
  },
  {
    "rbr": 18,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Tko donosi odluku o mobilizaciji Oružanih snaga?",
    "ocekivani_odgovor": "Odluku o mobilizaciji Oružanih snaga donosi Predsjednik Republike na prijedlog ministra obrane.",
    "vanilla_odgovor": "Prema **Zakonu o obrani** (Narodne novine br. 97/02., 86/04., 133/06., 149/08., 132/10., 149/10., 132/11., 149/11., 132/12., 149/12., 132/13., 149/13., 132/14., 149/14., 132/15., 149/15., 132/16., 149/16.) i **Zakonu o službi u Oružanim snagama RH** (NN br. 132/11.), odluku o mobilizaciji donosi **Vlada Republike Hrvatske**.  \n\nSpecifični članci:  \n- Članak 10. Zakona o obrani definira ovlasti Vlade u području obrane.  \n- Pravilnik o provedbi Zakona o službi u OSRH (NN br. 149/11.) dodatno regulira postupke mobilizacije.  \n\nNapomena: Ova informacija temelji se na važećim zakonskim aktima.",
    "rag_odgovor": "Prema **Zakonu o obrani** (Članak 46., stavak 1.), odluku o uporabi Oružanih snaga donose sljedeća tijela:  \n- **Hrvatski sabor**  \n- **Predsjednik Republike**  \n- **Predsjednik Vlade**  \n- **Ministar obrane**  \n\nTo uključuje i odluku o mobilizaciji, koja se temelji na ustavnim ovlastima Predsjednika Republike kao vrhovnog zapovjednika (**Ustav RH, Članak 100.**).  \n\nDetaljnije, prema **Zakonu o obrani** (Članak 58.), Vlada ili ministar obrane također mogu donositi odluke o korištenju Oružanih snaga, uključujući mobilizaciju.  \n\nAko postoji izvanredna situacija (npr. neposredna ugroženost države), Predsjednik Republike može samostalno naručiti uporabu snaga (**Ustav RH, Članak 100.**).  \n\nKrajnja nadležnost za provođenje mobilizacije ostaje kod **Glavnog stožera Oružanih snaga** (**Zakon o obrani, Članci 46. i 58.**).",
    "graph_rag_odgovor": "Odluku o mobilizaciji Oružanih snaga donosi **Vlada** ili **ministar obrane** u skladu s odredbama Zakona o obrani.  \n\nIzvor: [Zakon o obrani 2025, Članak 74.](https://www.novo-zakonodavstvo."
  },
  {
    "rbr": 19,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Kada prestaje vojna obveza za žene?",
    "ocekivani_odgovor": "Vojna obveza za žene prestaje na kraju kalendarske godine u kojoj navršavaju 50 godina života.",
    "vanilla_odgovor": "Žene u Republici Hrvatskoj imaju pravo na odbijanje vojne službe zbog vjerskih ili uvjerenja, prema članku **6. stavak 1.** Zakona o vojnoj obvezi (Narodne novine br. 97/08). Međutim, ako se ženska osoba odluči prijaviti za vojnu službu, njezina vojna obveza traje dok joj to dopušta zdravstveno stanje i zakonski rok.  \n\nZa razliku od muškaraca, koji su dužni odslužiti vojni rok do određene dobi (obično do 30 godina), žene mogu biti pozvane na služenje samo ako se prijave. Prema članku **10.** istog zakona, rok služenja za žene može varirati ovisno o potrebama vojske.  \n\nNapomena: Ova informacija nije pronađena u dostupnim dokumentima.",
    "rag_odgovor": "Prema Zakonu o obrani 2025., članku 20.:  \n**Žene prestaju imati vojnu obvezu nakon što navrše 50 godina života.**  \n\nTo znači da se njihova vojna obveza automatski ukida na kraju kalendarske godine u kojoj napune 50 godina.  \n\nOstale mogućnosti prestanka vojne obveze uključuju:  \n- Prestanak zbog nesposobnosti za vojnu službu,  \n- Prestanak zbog gubitka hrvatskog državljanstva,  \n- Za visoke časnike i generale/admirale, rok produžuje se do 65. godine života.  \n\nIzvor: *Zakon o obrani 2025*, članak 20.",
    "graph_rag_odgovor": "Prema Zakonu o obrani 2025., vojna obveza za žene prestaje kada navrše **50 godina** života.  \n\nIzvor: [Zakon o obrani 2025, Članak 20](https://www.nacionalno-sigurnosno-pravodavno-informaciono-podrstavanje.hr/documents/zakon_o_obrani_2025.pdf), stavak (1)."
  },
  {
    "rbr": 20,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "U kojoj godini života se državljanin RH uvodi u vojnu evidenciju?",
    "ocekivani_odgovor": "Državljanin Republike Hrvatske uvodi se u vojnu evidenciju u kalendarskoj godini kada navrši 18 godina života.",
    "vanilla_odgovor": "Glede pitanja o godini života u kojoj se građanin RH upisuje u vojnu evidenciju, valja napomenuti da se to obično događa nakon navršenog 18. godine života. Međutim, detaljnije odredbe o tome nalaze se u Zakonu o obveznim vojnim vježbama (NN br. 9/07) te Pravilniku o provedbi Zakona o obveznim vojnim vježbama (NN br. 6/08).  \n\nPrema članku 1. stavku 1. Pravilnika, osobe koje su obvezne na vojne vježbe moraju biti stare između 18 i 30 godina u trenutku početka vježbi. Dakle, u vojnu evidenciju građani RH ulaze najranije s navršenih 18 godina, ali aktivno sudjelovanje započinje po završetku školovanja ili kad ih nadležno tijelo pozove na vojne vježbe.  \n\nZa dodatne informacije preporučujem kontaktiranje Hrvatskog ratnog doma ili nadležnog županijskog inspektorata za obavezne vojne vježbe.",
    "rag_odgovor": "Državljanin Republike Hrvatske uvodi se u vojnu evidenciju u kalendarskoj godini kada navrši **18 godina** života.  \n\nAko iz bilo kojeg razloga to ne učini u toj godini, može se unijeti do prestanka vojne obveze prema članku 20. Zakona o obrani.  \n\nIzvor: [Zakon o obrani 2025], članak 21.(1).",
    "graph_rag_odgovor": "Građanin Republike Hrvatske uvodi se u vojnu evidenciju u kalendarskoj godini u kojoj navršava **18 godina** života.  \n\nIzvor: [Zakon o obrani 2025, Članak 19](https://www.narodnonovine."
  },
  {
    "rbr": 21,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Tko proglašava ratno stanje u Republici Hrvatskoj?",
    "ocekivani_odgovor": "Ratno stanje u Republici Hrvatskoj proglašava Hrvatski sabor.",
    "vanilla_odgovor": "Predsjednik Republike Hrvatske proglašava ratno stanje u Republici Hrvatskoj sukladno članku **98.** Ustava Republike Hrvatske.  \n\nNapomena: Ova informacija temelji se na ustavnom pravu, a dodatne procedure i ovlasti utvrđene su posebnim zakonskim aktima (npr. Zakonom o obrani).",
    "rag_odgovor": "Hrvatski Sabor proglašava ratno stanje u Republici Hrvatskoj.  (izvor: Ustav Republike Hrvatske 2018.docx - Članak 100.",
    "graph_rag_odgovor": "Ratno stanje u Republici Hrvatskoj proglašava Hrvatski sabor. Međutim, prema Ustavu Republike Hrvatske (Članak 100), u slučaju neposredne ugroženosti neovisnosti, jedinstvenosti i opstojnosti države, Predsjednik Republike može, uz supotpis predsjednika Vlade, narediti uporabu oružanih snaga iako nije proglašeno ratno stanje."
  },
  {
    "rbr": 22,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Koliko dana prije upućivanja ministar obrane donosi odluku o upućivanju kandidata na temeljno vojno osposobljavanje?",
    "ocekivani_odgovor": "Ministar obrane donosi odluku o upućivanju kandidata na temeljno vojno osposobljavanje u pravilu 40 dana prije upućivanja kandidata.",
    "vanilla_odgovor": "Napomena: ova informacija nije pronađena u dostupnim dokumentima.  \nPrema općem znanju, odluka ministra obrane o upućivanju kandidata na temeljno vojno osposobljavanje obično se donosi najkasnije **7 dana** prije početka osposobljavanja, kako bi se omogućio adekvatan vremenski rok za pripreme i obavještavanje kandidata.  \nDetaljnije odredbe mogu se naći u Pravilniku o provedbi Zakona o službi u Oružanim snagama RH (npr. članak 60.).",
    "rag_odgovor": "Ministar obrane donosi odluku o upućivanju kandidata na temeljno vojno osposobljavanje najkasnije **25 dana** prije upućivanja.  \n\nIzvor: [Pravilnik o temeljnom vojnom osposobljavanju], Članak 20., Stavak 2.",
    "graph_rag_odgovor": "Ministar obrane donosi odluku o upućivanju kandidata na temeljno vojno osposobljavanje najkasnije 25 dana prije datuma upućivanja. Ova informacija temelji se na članku 20. Pravilnika o temeljnom vojnom osposobljavanju."
  },
  {
    "rbr": 23,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Tko donosi program obuke ročnika na temeljnom vojnom osposobljavanju?",
    "ocekivani_odgovor": "Program obuke ročnika na temeljnom vojnom osposobljavanju donosi načelnik Glavnog stožera Oružanih snaga Republike Hrvatske.",
    "vanilla_odgovor": "Program obuke ročnika na temeljnom vojnom osposobljavanju donosi Ministarstvo obrane Republike Hrvatske, a točnije Glavno zapovjedništvo Oružanih snaga RH (GZ OSRH) kroz svoje ustrojbene jedinice, kao što su Vojne škole i ustanove zadužene za obuku.  \n\nOsnovu programa definiraju propisi poput **Zakona o službi u Oružanim snagama RH** (čl. 67.) te **Pravilnika o provedbi temeljnog vojnog osposobljavanja**. Nadležno tijelo za usklađivanje i provođenje programa je **Glavno stožerno vojno učilište \"Blago Zadro\"**.  \n\nNapomena: Ova informacija temelji se na općem znanju o strukturi OSRH, a detaljniji dokumenti mogu biti dostupni samo putem službenih izvora.",
    "rag_odgovor": "Program obuke ročnika na temeljnom vojnom osposobljavanju donosi Ministarstvo obrane. (izvor: Zakon_o_sluzbi_u_Oruzanim_snagama_Republike_Hrvatske_2025.",
    "graph_rag_odgovor": "Program obuke ročnika na temeljnom vojnom osposobljavanju donosi **načelnik Glavnog stožera Oružanih snaga Republike Hrvatske**, prema članku 2. Pravilnika o temeljnom vojnom osposobljavanju.  \n\nNapomena: Ova informacija temelji se na članku 2. navedenog pravilnika."
  },
  {
    "rbr": 24,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Pred kim ročnici daju svečanu prisegu?",
    "ocekivani_odgovor": "Ročnici daju svečanu prisegu pred ministrom obrane ili osobom koju on za to odredi.",
    "vanilla_odgovor": "Ročnici (vojnici) u Hrvatskoj Oružanim snagama daju svečanu prisegu pred zapovjednikom postrojbe ili ustrojbene jedinice u kojoj služe. Prema **Zakonu o službi u Oružanim snagama RH** (čl. 60.), svečana prisega sastoji se od riječi:  \n*\"Svećano obećavam da ću vjerno služiti Republici Hrvatskoj, poštovati Ustav i zakone te čuvati čast oružanih snaga.\"*  \n\nNadležno tijelo za provođenje ceremonije je zapovjednik postrojbe, a prisega se ponavlja svake godine tijekom vojne službe.",
    "rag_odgovor": "Ročnici daju svečanu prisegu pred nadležno vojno tijelo ili zapovjednika postrojbe, prema članku 7. stavku 5. **Zakona o službi u Oružanim snagama Republike Hrvatske** (2025).  \n\n*Napomena: Ova informacija nije pronađena u dostupnim dokumentima.",
    "graph_rag_odgovor": "Ročnici daju svečanu prisegu pred ministrom obrane ili osobom koju on za to odredi."
  },
  {
    "rbr": 25,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Za koju vojnostručnu specijalnost se ročnici osposobljavaju na temeljnom vojnom osposobljavanju?",
    "ocekivani_odgovor": "Ročnici se osposobljavaju u temeljnim vojnim znanjima i sposobnostima u rodu pješaštva za streljačku specijalnost 11A, dužnost strijelca.",
    "vanilla_odgovor": "Na temeljnom vojnom osposobljavanju (TvOS) ročnici se osposobljavaju za osnovne vojnosnurajne specijalnosti kao što su:  \n- **Mehanizirana pješačka postrojba** (mehanizirane bojne),  \n- **Raketno-topničke postrojbe** (raketne i topničke jedinice),  \n- **Zrakoplovne postrojbe** (zrakoplovi i helikopteri),  \n- **Graničarske postrojbe** (granične jedinice).  \n\nOvisno o potrebama OSRH, mogu se uključiti i druge specijalnosti poput inženjerije ili komunikacija. Osnovu čini članak **6. Zakona o službi u Oružanim snagama RH** koji definiše vojne stručne poslove.  \n\nNapomena: Ova informacija temelji se na općem znanju o TvOS-u, a točan popis može varirati prema godišnjim planovima OSRH.",
    "rag_odgovor": "Ročnici se na temeljnom vojnom osposobljavanju osposobljavaju za vojnostručnu specijalnost **strijalac** (11A), dužnost strijelca, prema zadatcima i standardima definiranima u programu obuke ročnika na temeljnom vojnom osposobljavanju.  \n\nIzvor: [Pravilnik o temeljnom vojnom osposobljavanju], Članak 9. (1).",
    "graph_rag_odgovor": "Na temeljnom vojnom osposobljavanju, ročnici se osposobljavaju za vojnostručnu specijalnost \"strijelac\" (specijalnost 11A), prema zadatcima i standardima definiranima u programu obuke ročnika."
  },
  {
    "rbr": 26,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Što čini mirnodopski sastav Oružanih snaga?",
    "ocekivani_odgovor": "Mirnodopski sastav Oružanih snaga čine: djelatne vojne osobe, službenici i namještenici, pričuvnici pozvani na službu u Oružane snage, ugovorni pričuvnici, kadeti te ročnici koji su pristupili temeljnom vojnom osposobljavanju.",
    "vanilla_odgovor": "Mirnodopski sastav Oružanih snaga Republike Hrvatske (OSRH) čini osoblje koje se bavi svakodnevnim aktivnostima i zadaćama izvan stanja rata ili neposredne opasnosti od rata. Ovaj sastav uključuje:  \n\n1. **Redovni kadar** – Vojnici, dočasnici i časnici koji su stalno zaposleni u OSRH. Njihove aktivnosti uključuju obuku, održavanje opreme, planiranje i provođenje redovnih vježbi te sudjelovanje u međunarodnim misijama.  \n2. **Reservisti** – Osobe s vojnom osnovom koje se regrutiraju tijekom kriza ili posebnih potreba.  \n3. **Civilno osoblje** – Građevinari, tehničari, administrativni radnici i drugi civili koji podržavaju funkcije OSRH.  \n\nNadležno tijelo za organizaciju i upravljanje mirnodopskim sastavom je **Ministarstvo obrane RH**, a detalji su regulirani člancima **Zakona o obrani** (npr. članci 6., 7.) i **Pravilnika o ustroju OSRH**.  \n\nNapomena: Ova informacija temelji se na općem znanju o strukturi OSRH, a točni brojčani podaci mogu varirati ovisno o trenutnoj reorganizaciji.",
    "rag_odgovor": "Mirnodopski sastav Oružanih snaga čini:  \n- **djelatne vojne osobe**,  \n- **državni službenici i namještenici** raspoređeni u Oružane snage,  \n- **pričuvnici pozvani na obuku**,  \n- **ugovorni pričuvnici**,  \n- **kadeti**, kao i  \n- **osobe koje su pristupile temeljnom vojnom osposobljavanju**.  \n\nIzvor: [Zakon o obrani 2025], Članak 43., Stavak 2. (NN 136/25).",
    "graph_rag_odgovor": "Mirnodopski sastav Oružanih snaga čini:  \n- **Djelatne vojne osobe** – profesionalni časnici i dočasnici.  \n- **Službenici i namještenici** – civilni zaposlenici u vojsci.  \n- **Pričuvnici pozvani na obuku** – obveznik koji prolazi redovitu obuku.  \n- **Ugovorni pričuvnici** – dobrovoljno regrutirani civili s vojnim ugovorom.  \n- **Kadeti** – polaznici vojne škole.  \n- **Ročnici** – građani koji su završili temeljno vojno osposobljavanje.  \n\nIzvor: [Zakon o obrani 2025, Članak 43](https://www.zakonyproljudi."
  },
  {
    "rbr": 27,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Tko utvrđuje mirnodopski i ratni ustroj Oružanih snaga?",
    "ocekivani_odgovor": "Predsjednik Republike utvrđuje mirnodopski i ratni ustroj Oružanih snaga te strukturu činova u mirnodopskom i ratnom ustroju Oružanih snaga.",
    "vanilla_odgovor": "Mirnodopski i ratni ustroj Oružanih snaga Republike Hrvatske utvrđuje Vlada Republike Hrvatske.  \n\nOsnovu za to daje **Zakon o obrani** (Narodne novine, broj 76/02 i izmjene), a konkretno se odnosi na članak **8.**  \n\nNapomena: Ova informacija temelji se na hrvatskom zakonu, a ne na dostupnom kontekstu pitanja.",
    "rag_odgovor": "Prema članku 4. Zakona o obrani (NN 136/25), **mirnodopski i ratni ustroj Oružanih snaga** utvrđuje **Predsjednik Republike**.  \n\nDetaljnije, prema članku 44. istog Zakona, Predsjednik Republike ima ovlast da \"utvrdi mirnodopski i ratni ustroj Oružanih snaga te strukturu činova u mirnodopskom i ratnom ustroju Oružanih snaga\".  \n\nIzvor: *Zakon o obrani 2025* (članci 43., 44.) – vidi priložene dokumente.",
    "graph_rag_odgovor": "Mirnodopski i ratni ustroj Oružanih snaga utvrđuje Predsjednik Republike Hrvatske. Ova informacija proizlazi iz **Članka 45.** Zakona o obrani 2025., gdje je navedeno da Predsjednik Republike utvrđuje mirnodopski i ratni ustroj Oružanih snaga te strukturu činova u mirnodopskom i ratnom ustroju Oružanih snaga.  \n\nNapomena: ova informacija nije pronađena u dostupnim dokumentima."
  },
  {
    "rbr": 28,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Koliko traje minimalno godišnji odmor djelatne vojne osobe?",
    "ocekivani_odgovor": "Djelatna vojna osoba ima pravo na godišnji odmor u trajanju od najmanje četiri tjedna.",
    "vanilla_odgovor": "Minimalno trajanje godišnjeg odmora djelatne vojne osobe određeno je člankom **80.** Zakona o službi u Oružanim snagama RH (Narodne novine br. 97/16). Prema tom članku, djelatna vojna osoba ima pravo na godišnji odmor u trajanju od najmanje **20 radnih dana** po kalendarskoj godini.  \n\nDodatne pojedinosti o ostvarivanju prava na godišnji odmor regulirane su Pravilnikom o ostvarivanju prava na godišnji odmor djelatnika MORH-a (NN br. 112/16), koji detaljnije definira uvjete i rokove za isplatu naknade za godišnji odmor.  \n\nNapomena: ako se radi o vojnim osobama u pričuvnom sastavu ili pričuvnicima, pravo na godišnji odmor može biti drugačije uređeno ovisno o statusu i vrsti posla.",
    "rag_odgovor": "Djelatna vojna osoba ima pravo na minimalni godišnji odmor u trajanju od **četiri tjedna** (20 radnih dana), kako je navedeno u **Članku 156. stavku 1.** Zakona o službi u Oružanim snagama Republike Hrvatske 2025.  \n\nNapomena: Ova informacija temelji se isključivo na dostupnom zakonu.",
    "graph_rag_odgovor": "Minimalno trajanje godišnjeg odmora djelatne vojne osobe iznosi **četiri tjedna** (16 radnih dana), kako je definirano u **Članku 156. stavku 1.** Zakona o službi u Oružanim snagama Republike Hrvatske 2025.  \n\nIako se u istom članku dopušta povećanje trajanja odmora prema određenim kriterijima (npr. radni staž, dužnost, zdravlje), minimalna granica ostaje nepromijenjena."
  },
  {
    "rbr": 29,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Koliko dana plaćenog dopusta pripada djelatnoj vojnoj osobi u slučaju rođenja djeteta?",
    "ocekivani_odgovor": "Djelatna vojna osoba ima pravo na plaćeni dopust od sedam radnih dana u slučaju rođenja djeteta.",
    "vanilla_odgovor": "Djelatna vojna osoba ima pravo na **plaćeni roditeljski dopust** od **8 tjedana** nakon rođenja djeteta (članak 70. Pravilnika o ostvarivanju prava na roditeljski dopust).  \n\nAko se radi o aktivnom sudioniku u službi (npr. časniku), dodatno može imati pravo na dodatni dopust prema članku 69. istog Pravilnika. Nadležno tijelo za izdavanje potvrda je **Zapovjednik postrojbe** ili **HRM** ovisno o statusu osobe.  \n\nNapomena: Informacije su preuzete iz Pravilnika o ostvarivanju prava na roditeljski dopust (NN 1/2019) koji se primjenjuje i na vojne osobe.",
    "rag_odgovor": "Djelatnoj vojnoj osobi u slučaju rođenja djeteta pripada **sedam radnih dana** plaćenog dopusta, prema članku 159. stavku 1. točki a) Zakona o službi u Oružanim snagama Republike Hrvatske 2025.",
    "graph_rag_odgovor": "Djelatnoj vojnoj osobi u slučaju rođenja djeteta pripada **sedam radnih dana** plaćenog dopusta, kako je definirano u [Zakon o službi u Oružanim snagama Republike Hrvatske 2025, Članak 159](https://www.narodne-novine.hr/#_133086). Ovaj se broj dana odnosi na osnove poput rođenja djeteta, gdje je točno navedeno \"rođenja djeteta\" sa sedmodnevnim trajanjem."
  },
  {
    "rbr": 30,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Koliko dana plaćenog dopusta pripada djelatnoj vojnoj osobi u slučaju zaključenja braka?",
    "ocekivani_odgovor": "Djelatna vojna osoba ima pravo na plaćeni dopust od sedam radnih dana u slučaju zaključenja braka.",
    "vanilla_odgovor": "Djelatna vojna osoba ima pravo na **7 dana** plaćenog dopusta u slučaju zaključenja braka, sukladno članku **80. stavku 1. točki a)** Pravilnika o ostvarivanju prava na godišnji odmor i druge oblike odmora u Oružanim snagama Republike Hrvatske (NN br. 9/16).  \n\nNapomena: Ova informacija temelji se na važećim propisima koji reguliraju prava vojnog osoblja u Republici Hrvatskoj.",
    "rag_odgovor": "Djelatna vojna osoba ima pravo na **sedam radnih dana** plaćenog dopusta u slučaju zaključenja braka, prema članku 159. stavku 1. točki a) Zakona o službi u Oružanim snagama Republike Hrvatske 2025.",
    "graph_rag_odgovor": "Djelatnoj vojnoj osobi u slučaju zaključenja braka pripada **sedam radnih dana** plaćenog dopusta, kako je definirano u **Članku 159.** Zakona o službi u Oružanim snagama Republike Hrvatske.  \n\nAko okolnost nastupi u vrijeme korištenja godišnjeg odmora, privremene nesposobnosti ili odsutnosti iz službe iz drugih razloga, pravo na plaćeni dopust se ne ostvaruje."
  },
  {
    "rbr": 31,
    "kategorija": "jednostavna_pitanja",
    "pitanje": "Što je vojna iskaznica i tko ju izdaje?",
    "ocekivani_odgovor": "Vojna iskaznica je javna isprava kojom vojni obveznik dokazuje identitet dok izvršava vojnu obvezu. Izdaje ju nadležni područni odjel za poslove obrane koji vojnog obveznika vodi u evidenciji.",
    "vanilla_odgovor": "Vojna iskaznica (VI) je osobna iskaznica vojnog obveznika koja potvrđuje njegovo pravo na služenje vojne službe te sadrži podatke o obveznim vojnim rokovanjima i statusu u sustavu Oružanih snaga Republike Hrvatske.  \n\n**Izdaje se od strane Ministarstva obrane RH** putem nadležnih jedinica, a to su:  \n- **Zapovjedništva postrojbi** (npr. pješačke brigade, topničke brigade itd.)  \n- **Regionalni centri za obuku i mobilizaciju**  \n- **Središnja uprava MORH-a** (za posebne slučajeve)  \n\nIskaznica se izdaju nakon prijave na vojni rok ili u slučaju poziva na osposobljavanje/mobilizaciju. Za dodatne informacije pogledajte **Zakon o službi u Oružanim snagama RH (čl. 8–9)** i Pravilnik o vojnoj iskaznici (NN br. 107/20 od 2020.).",
    "rag_odgovor": "Vojna iskaznica je javna isprava kojom vojni obveznik dokazuje identitet dok izvršava vojnu obvezu.  \n**Izdaje je:**  \n- **Nadležni područni odjel za poslove obrane** (članak 25., stavak 3. Zakona o obrani 2025).  \n- **Iznimno, postrojba Oružanih snaga razine samostalne bojne, njoj ravne ili više razine** ako ročnik ili pričuvnik izgube vojnu iskaznicu (članak 25., stavak 4.).  \n\nDodatno, vojna iskaznica se izdaje:  \n- **Novaku pri pozivanju na temeljno vojno osposobljavanje** (članak 25., stavak 5.).  \n- **Kadetu i stipendistu nakon sklapanja ugovora** (članak 25., stavak 5.).  \n\n*Napomena: Ova informacija temelji se isključivo na članku 25. Zakona o obrani 2025.",
    "graph_rag_odgovor": "Vojna iskaznica je identifikacijski dokument koji dokazuje pripadnost Oružanim snagama Republike Hrvatske. Izdaje se vojnim osobama, službenicima i namještenicima u skladu sa Zakonom o obrani (članak 24). Ministar obrane propisuje oblik i sadržaj ove iskaznice pravilnikom. Ročnicima i pričuvnicima također se izdaje vojna iskaznica, ali prema posebnim propisima."
  }
];

/**
 * Glavna funkcija koja kreira Google Formu iz ugrađenih podataka
 */
function createEvaluationForm() {
  var formTitle = "Evaluacija Odgovora Chatbot Modela (Vanilla vs RAG vs GraphRAG)";
  var form = FormApp.create(formTitle);
  
  // Postavke forme
  form.setAllowResponseEdits(false);
  form.setCollectEmail(false);
  
  // ------------------------------------------------------------------------
  // PRVA STRANICA: UVOD I UPUTE ZA OCJENJIVANJE
  // ------------------------------------------------------------------------
  var introDescription = 
    "SVRHA EVALUACIJE:\n" +
    "Cilj ovog istraživanja je usporediti i ocijeniti kvalitetu odgovora triju verzija chatbot sustava (Vanilla, RAG i GraphRAG) " +
    "u odnosu na postavljenja pitanja i definireni 'Zlatni standard' (očekivani točni odgovor).\n\n" +
    "Upute za ocjenjivanje:\n" +
    "Za svako pitanje prikazan je očekivani odgovor (Zlatni standard), te odgovori modela Vanilla, RAG i GraphRAG.\n" +
    "Svaki odgovor ocjenjuje se na skali od 1 do 3 prema sljedeća tri kriterija:\n\n" +
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
    "1. FAKTIČNA TOČNOST — je li tvrdnja u skladu s izvornim aktima i zlatnim standardom.\n" +
    "   3 = Točno; jezgra i ključni detalji odgovaraju izvoru/zlatnom standardu.\n" +
    "   2 = Djelomično točno; jezgra dobra, ali dio detalja krivi (npr. krivi broj članka, jedan pogrešan podatak).\n" +
    "   1 = Pretežno netočno; kriva jezgra, krivi brojevi/rokovi ili krivo tijelo.\n\n" +
    "2. KORISNOST (RELEVANTNOST) — odgovara li na POSTAVLJENO pitanje.\n" +
    "   (Ocjenjuje se NEOVISNO o točnosti — odgovor može biti točan a nekoristan ako priča o nečem drugom, ili koristan a netočan).\n" +
    "   3 = Izravno i potpuno odgovara na pitanje.\n" +
    "   2 = Dotiče temu, ali nepotpuno, razvučeno ili djelomično promašuje fokus.\n" +
    "   1 = Promašuje pitanje, odgovara na nešto drugo ili je prekinut/nečitljiv.\n\n" +
    "3. HALUCINACIJE — prisutnost izmišljenog sadržaja (izmišljeni članci, brojevi NN-a, URL-ovi, institucije, citati kojih nema u izvoru).\n" +
    "   3 = Bez izmišljotina; sve provjerljivo u izvoru.\n" +
    "   2 = Manja izmišljotina; točna jezgra, ali jedan izmišljen detalj (npr. lažni broj članka ili URL uz inače točan sadržaj).\n" +
    "   1 = Halucinira; sadrži izmišljene činjenice, nepostojeće članke/zakone ili lažne izvore.\n" +
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
    "Molimo vas da pažljivo pročitate svaki odgovor i dodijelite ocjene od 1 do 3 za svaki model.";

  form.setDescription(introDescription);

  // Opcionalno skupljanje imena ili ID-a evaluatora na prvoj stranici
  var evaluatorItem = form.addTextItem();
  evaluatorItem.setTitle("Ime / ID Evaluatora")
               .setHelpText("Unesite svoje ime, inicijale ili dodijeljeni ID radi evidencije.")
               .setRequired(true);

  // ------------------------------------------------------------------------
  // GENERIRANJE STRANICA ZA SVAKO PITANJE
  // ------------------------------------------------------------------------
  for (var i = 0; i < DATASET.length; i++) {
    var item = DATASET[i];
    
    // Nova stranica za svako pitanje
    var pageBreak = form.addPageBreakItem();
    pageBreak.setTitle("Pitanje " + item.rbr + "/" + DATASET.length + " (" + item.kategorija + ")");
    
    // Prikaz Pitanja i Zlatnog standarda
    var qHeader = form.addSectionHeaderItem();
    qHeader.setTitle("PITANJE " + item.rbr);
    qHeader.setHelpText(
      item.pitanje + "\n\n" +
      "ZLATNI STANDARD (OČEKIVANI ODGOVOR):\n" +
      item.ocekivani_odgovor
    );
    
    // --- 1. VANILLA ODGOVOR I OCJENJIVANJE ---
    var vHeader = form.addSectionHeaderItem();
    vHeader.setTitle("1. VANILLA ODGOVOR");
    vHeader.setHelpText(item.vanilla_odgovor);
    
    addEvaluationGrid(form, "Vanilla", item.rbr);
    
    // --- 2. RAG ODGOVOR I OCJENJIVANJE ---
    var rHeader = form.addSectionHeaderItem();
    rHeader.setTitle("2. RAG ODGOVOR");
    rHeader.setHelpText(item.rag_odgovor);
    
    addEvaluationGrid(form, "RAG", item.rbr);
    
    // --- 3. GRAPHRAG ODGOVOR I OCJENJIVANJE ---
    var gHeader = form.addSectionHeaderItem();
    gHeader.setTitle("3. GraphRAG ODGOVOR");
    gHeader.setHelpText(item.graph_rag_odgovor);
    
    addEvaluationGrid(form, "GraphRAG", item.rbr);
  }

  Logger.log("Obrazac je uspješno kreiran!");
  Logger.log("Poveznica za uređivanje (Edit URL): " + form.getEditUrl());
  Logger.log("Poveznica za ispunjavanje (Published URL): " + form.getPublishedUrl());
}

/**
 * Pomoćna funkcija za dodavanje mrežnog pitanja (Grid Item) za ocjenjivanje
 */
function addEvaluationGrid(form, modelName, questionNum) {
  var grid = form.addGridItem();
  grid.setTitle("Ocjena za " + modelName + " (Pitanje " + questionNum + ")");
  grid.setRows([
    "1. Faktična točnost",
    "2. Korisnost (Relevantnost)",
    "3. Halucinacije"
  ]);
  grid.setColumns(["1", "2", "3"]);
  grid.setRequired(true);
}

/**
 * ALTERNATIVNA FUNKCIJA: Ako elite pokrenuti skriptu direktno iz Google Tablice (Google Sheets)
 * Gdje su podaci uvoženi iz rezultati.csv na aktivni radni list.
 */
function createFormFromActiveSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  
  var form = FormApp.create("Evaluacija Odgovora Chatbot Modela (iz Tablice)");
  
  // Postavljanje opisa s uputama
  form.setDescription(
    "SVRHA EVALUACIJE:\n" +
    "Ocjenjuju se odgovori chatbot modela (Vanilla, RAG, GraphRAG) u odnosu na Zlatni standard na skali 1-3.\n\n" +
    "KRITERIJI:\n" +
    "1. FAKTIČNA TOČNOST (3 = točno, 2 = djelomično, 1 = netočno)\n" +
    "2. KORISNOST / RELEVANTNOST (3 = izravno/potpuno, 2 = djelomično, 1 = promašuje)\n" +
    "3. HALUCINACIJE (3 = bez izmišljotina, 2 = manja izmišljotina, 1 = halucinira)"
  );
  
  var evalItem = form.addTextItem();
  evalItem.setTitle("Ime / ID Evaluatora").setRequired(true);

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var rbr = row[0];
    var kategorija = row[1];
    var pitanje = row[2];
    var ocekivani = row[3];
    var vanilla = row[4];
    var rag = row[6];
    var graphrag = row[8];

    var pageBreak = form.addPageBreakItem();
    pageBreak.setTitle("Pitanje " + rbr + " (" + kategorija + ")");
    
    var qHeader = form.addSectionHeaderItem();
    qHeader.setTitle("PITANJE " + rbr);
    qHeader.setHelpText(pitanje + "\n\nZLATNI STANDARD:\n" + ocekivani);
    
    // Vanilla
    form.addSectionHeaderItem().setTitle("1. VANILLA ODGOVOR").setHelpText(vanilla);
    addEvaluationGrid(form, "Vanilla", rbr);
    
    // RAG
    form.addSectionHeaderItem().setTitle("2. RAG ODGOVOR").setHelpText(rag);
    addEvaluationGrid(form, "RAG", rbr);

    // GraphRAG
    form.addSectionHeaderItem().setTitle("3. GraphRAG ODGOVOR").setHelpText(graphrag);
    addEvaluationGrid(form, "GraphRAG", rbr);
  }
  
  Logger.log("Obrazac je uspješno kreiran iz Google Tablice! Edit URL: " + form.getEditUrl());
}
