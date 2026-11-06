# RODO — działania administratora Poppy Project

Stan przeglądu: 6 listopada 2026 r. Administrator wskazany przez prowadzącą projekt: **Sandra Machoń**, osoba fizyczna, kontakt: **joinpoppypl@gmail.com**.

To dokument wewnętrzny, nie jest publikowany jako podstrona. Opisuje również czynności, których nie wykonuje dodanie polityki do repozytorium. Nie stanowi potwierdzenia pełnej zgodności prawnej.

## Wdrożone w kodzie

- Polityka prywatności i cookies: `/polityka-prywatnosci/` i `/en/privacy-policy/`, linki w stopce na każdej aktywnej stronie.
- Administrator, kontakt, cele, podstawy prawne, odbiorcy, kryteria retencji, prawa, informacja o transferach i newsletterze na Substacku.
- Informacja przy formularzu firmy, bez obowiązkowej zgody na zwykłą obsługę zgłoszenia. Zgłoszenie zawiera wersję udostępnionej klauzuli; nie oznacza zgody na marketing.
- Informacja o newsletterze i link do polityki przed uruchomieniem formularza Supascribe.
- Google Analytics i GoatCounter wymagają akceptacji. Zgody reklamowe pozostają wyłączone. Google signals i sygnały personalizacji reklam są wyłączone w konfiguracji tagu.
- Cookies GA mają w kodzie ważność 180 dni bez odnawiania okresu przy każdej wizycie. To osobne ustawienie od retencji danych na serwerach Google.
- Niezależne wybory „Analityka” i „Treści zewnętrzne” zawierają wersję klauzuli i datę, są ważne 180 dni. Zapis ma klucz `poppy-cookie-consent-v3` i wersję `2026-11-06.1`. Zmiana wersji wymaga ponownego wyboru w banerze. Starsza zgoda obejmująca tylko analitykę nie jest automatycznie rozszerzana na Spotify i Supascribe.
- Odmowa jest równie dostępna jak akceptacja. Wycofanie zgody jest dostępne w stopce. Nie ma zgody przez przewijanie.
- Baner udostępnia „Akceptuj wszystko”, „Odrzuć opcjonalne” i ustawienia kategorii. Spotify i Supascribe uruchamiają się po zgodzie na „Treści zewnętrzne”, również na kolejnych podstronach. Zgodę można wycofać niezależnie od analityki. Zgoda na osadzenie formularza nie zapisuje do newslettera.

## Konieczne do zweryfikowania na kontach dostawców

1. **Google Analytics:** potwierdź właściwość `G-ECRT7MG1R3`; sprawdź warunki przetwarzania danych, retencję danych zdarzeń/użytkowników (zalecane minimum potrzebne projektowi, np. 2 miesiące), wyłącz zbędne udostępnianie danych, funkcje reklamowe i pomiar interakcji z formularzami. Uzupełnij politykę o konkretny zweryfikowany okres retencji danych u Google. Aktualna polityka nie deklaruje niezweryfikowanego ustawienia konta.
2. **GoatCounter:** sprawdź ustawienia retencji, lokalizację przetwarzania i czy rejestrowanie indywidualnych odsłon jest wyłączone. Ustal, czy drugie narzędzie analityczne obok GA jest nadal potrzebne.
3. **FormSubmit:** zweryfikuj warunki, tożsamość dostawcy, rolę, retencję, podwykonawców, możliwość zawarcia umowy powierzenia i podstawę ewentualnego transferu. Podczas przeglądu nie udało się odczytać dokumentacji prywatności z serwisu. Nie ma podstaw, by twierdzić, że umowa powierzenia została zawarta. Jeżeli nie można uzyskać wystarczających informacji i zabezpieczeń, należy zmienić dostawcę formularza.
4. **Supascribe:** jego polityka określa wydawcę jako administratora danych adresów e-mail z widgetu, a Supascribe jako procesora. Uzyskaj DPA z dostawcą i sprawdź transfery oraz usuwanie adresów. Nie zakładaj, że umowa została zawarta przez samo dodanie widgetu.
5. **Substack:** sprawdź warunki dla wydawcy, role stron, potwierdzanie subskrypcji, rezygnację, śledzenie otwarć/kliknięć i eksport/usuwanie danych. Zgłoszenie firmy nie uprawnia do dopisania adresu do newslettera. Włącz potwierdzenie adresu (double opt-in), jeśli dostępne; zachowuj dowód treści zapisu, daty i potwierdzenia. Włączenie widgetu nie jest zgodą na newsletter.
6. **Hosting i poczta:** sprawdź warunki GitHub Pages i używanego konta Gmail, w tym podstawy korzystania z nich do danych projektu. Konto konsumenckie Gmail nie musi oferować takich samych umów jak Google Workspace.
7. **Transfery poza EOG:** dla każdego procesu ustal faktycznego odbiorcę i podstawę: decyzja adekwatności (DPF tylko dla objętego i aktualnie certyfikowanego odbiorcy), SCC i wymagane środki uzupełniające lub inna właściwa podstawa. Sam link do polityki dostawcy ani zgoda na cookies nie wystarczą.

## Organizacja obsługi danych

- Ustal, kto ma dostęp do poczty, Substacka, analityki i zgłoszeń. Jeżeli Karolina uzyskuje dostęp w imieniu Sandry, określ upoważnienie i poufność. Jeżeli obie osoby faktycznie wspólnie określają cele i sposoby przetwarzania, samo wskazanie Sandry w polityce nie przesądza roli — trzeba ocenić współadministrowanie i art. 26 RODO.
- Ustal konkretne okresy retencji wiadomości, nieprzyjętych zgłoszeń, danych o współpracy i dowodów zgód. Obecna polityka posługuje się kryteriami celu i przedawnienia; usuń dane, gdy cel ustaje. Usuwanie z poczty i kont dostawców nie jest wykonywane automatycznie przez tę stronę.
- Dokumentuj podstawy prawne i ocenę uzasadnionego interesu dla korespondencji oraz danych osobowych w katalogu. Dane spółki nie zawsze są osobowe; dane przedsiębiorcy-osoby fizycznej i imienne adresy kontaktowe mogą nimi być.
- Jeśli dane osoby pozyskujecie z innego źródła niż od niej, oceń obowiązek indywidualnego poinformowania zgodnie z art. 14 RODO. Samo opublikowanie polityki nie zastępuje tego obowiązku.
- Prowadź odpowiedni rejestr czynności przetwarzania; wyjątek dla małych organizacji nie jest automatyczny, zwłaszcza przy regularnym przetwarzaniu.
- Zabezpiecz konta uwierzytelnianiem wieloskładnikowym, ogranicz dostęp i nie umieszczaj zgłoszeń ani list subskrybentów w publicznym repozytorium.
- Obsługuj żądania praw co do zasady w ciągu miesiąca. Weryfikuj tożsamość proporcjonalnie; nie żądaj automatycznie skanu dowodu.
- Przygotuj procedurę naruszeń: ocena ryzyka, dokumentowanie, ewentualne zgłoszenie do UODO w ciągu 72 godzin od stwierdzenia, gdy spełnione są przesłanki, oraz zawiadomienie osób przy wysokim ryzyku.
- Nie zbieraj danych medycznych przez formularz firmy. Informacyjny charakter FemTech sam w sobie nie oznacza potrzeby zbierania danych szczególnej kategorii.
- Samo prowadzenie takiego projektu nie oznacza automatycznie obowiązku wyznaczenia IOD czy przeprowadzenia DPIA; oceń przesłanki z art. 35 i 37 RODO, jeśli zakres działalności się zmieni.

## Dokumentowanie zgody

Obecne rozwiązanie zapisuje decyzję tylko lokalnie, w przeglądarce odwiedzającej osoby. Nie tworzy centralnego, odpornego na zmianę rejestru zgód. Wersjonowanie klauzuli ułatwia porządkowanie informacji, ale nie jest pełnym dowodem zgody administratora. Oceń z prawnikiem lub specjalistą ochrony danych, jaki sposób wykazania zgody jest adekwatny: CMP lub własny rejestr z ograniczoną retencją i minimalizacją danych. Strona na GitHub Pages nie ma własnego backendu do takiego rejestru. Nie wdrażaj dodatkowego śledzenia wyłącznie po to, by zapisywać dowody.

## Kontrola po publikacji

Kontrola lokalna w izolowanej przeglądarce Chromium: po `npm.cmd run build` uruchom `node scripts/test-privacy.mjs`. Test sprawdza decyzje cookies, wycofanie zgody, odnośniki, język i mobilną widoczność przycisków. Żądania do zewnętrznych usług są zastępowane pustymi odpowiedziami: test nie wysyła prawdziwej analityki ani zgłoszeń i nie zastępuje kontroli rzeczywistego tagu w Tag Assistant.

- W nowej sesji sprawdź w panelu Network: brak ładowania GA, GoatCounter, Spotify i Supascribe przed odpowiednim wyborem. Zewnętrzne okładki artykułów Substacka mogą nadal być pobierane; opisuje je polityka.
- Odrzuć opcjonalne usługi, przejdź na kolejne strony i sprawdź, czy skrypty pozostają wyłączone. Następnie sprawdź każdy wybór osobno: treści zewnętrzne bez analityki oraz analitykę bez osadzeń.
- Zaakceptuj analitykę, sprawdź jeden `page_view` i aktualny Consent Mode w Google Tag Assistant; ustawienia reklamowe mają pozostać `denied`.
- Wycofaj zgodę w stopce: następuje przeładowanie strony i usunięcie dostępnych cookies `_ga`. Nie oznacza to usunięcia danych wcześniej przesłanych do Google.
- Sprawdź formularz, zapis i wypis z newslettera na kontrolnym adresie. Nie wysyłaj cudzych danych do testów.
- Sprawdź treści i linki polityki po polsku i angielsku, na telefonie i komputerze.

## Źródła

- [RODO — rozporządzenie 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj): w szczególności art. 5–7, 12–14, 21, 26, 28, 30, 32–37 i 44–49.
- [Prawo komunikacji elektronicznej](https://eli.gov.pl/api/acts/DU/2024/1221/text.html): art. 398–400; przed przeglądem prawnym sprawdź aktualne zmiany ustawy.
- [Wytyczne EROD o zgodzie](https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_en).
- [Google — podstawowy i zaawansowany Consent Mode](https://developers.google.com/tag-platform/security/concepts/consent-mode).
- [Google — cookies GA4](https://support.google.com/analytics/answer/11397207?hl=en).
- [Google — retencja danych](https://support.google.com/analytics/answer/7667196?hl=en).
- [Supascribe — polityka i informacja o DPA](https://supascribe.com/resources/privacy-policy).
- [Substack — polityka prywatności](https://substack.com/privacy).
- [GoatCounter — prywatność](https://www.goatcounter.com/help/privacy).

Dokumentacja na stronie i ten wykaz wymagają okresowej aktualizacji po zmianie dostawcy, funkcji lub organizacji projektu. Nie można potwierdzić pełnej zgodności z RODO wyłącznie na podstawie kodu strony.
