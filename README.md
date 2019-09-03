# Spletna stran Akademije FRI
Dobrodošli na repozitoriju izvorne kode spletne strani Akademije FRI.

Spletna stran je izdelana z uporabo statičnega generatorja [Hugo](https://gohugo.io/).
Vsebina veje (*angl. branch*) `master` se samodejno objavi na spletnem naslovu [https://akademijafri.si](https://akademijafri.si) z uporabo [Netlify](https://app.netlify.com/sites/akademija-fri/deploys).


[![Netlify Status](https://api.netlify.com/api/v1/badges/9bfc7cc9-c2f2-4918-820d-4ccc5b5942c8/deploy-status)](https://app.netlify.com/sites/akademija-fri/deploys)

Build with ❤️ using [Hugo](https://gohugo.io/).

## Urejanje vsebine
Vsebino je možno urejati na dva načina.
1. Da kontaktirate vzdrževalca spletne strani ([Alenko Bone](https://fri.uni-lj.si/sl/o-fakulteti/osebje/alenka-bone))
2. Lastno, z uporabo GitHub Pull Request

### Kako poteka lastna sprememba vsebine?
Na kratko:
1. [Pripravite lokalno okolje](#Priprava-lokalnega-okolja)
2. Naredite *fork* repozitorija na GitHub
3. Z uporabo git, klonirajte fork repozitorija
4. Uredite vsebino ter lokalno preverite 
5. Z uporabo git, ustvarite commit ter ga potisnete na svoj fork repozitorija (`git push`)
6. Na GitHub strani vaše kopije (fork) repozitorija, ustvarite pull request (zahtevek za spremembo)
7. Vzdrževalec spletne strani bo vaše spremembe pregledal ter potrdil. O tem boste obveščeni preko emaila.


### Priprava lokalnega okolja
#### Zunanje programske odvisnosti
Programske pakete, ki jih boste potrebovali:
* [Hugo](https://gohugo.io/) ([navodila za namestitev](https://gohugo.io/getting-started/installing/))
* [GNU Make](https://www.gnu.org/software/make/)

**Samo za produkcijo:**
* [ImageMagick](https://imagemagick.org/index.php)

#### Lokalno zaganjanje strani
Odprite terminal in se primaknite v repozitorij (`cd <pot do repositorija>/akademija-fri-www`)

Z uporabo ukaza:
```bash
make
```
boste zagnali lokalni strežnik na `http://localhost:1313`. 
Spremembe vsebin spletne strani boste lahko v živo si ogledali na prejšnji povezavi. 

#### Struktura repozitorija
Hugo preslika datoteke Markdown v HTML za spletno stran. 
Lahko si pogledate [kratka navodila za sintakso Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

Vsebina spletne strani je v direktoriju `content`.

Zaradi večje fleksibilnosti, **ko se sklicujete na ostale vire spletne strani, spustite domeno _akademijafri.si_**. To seveda ne velja, ko se sklicujemo na zunanje spletne strani (e.g. _fri.uni-lj.si_). Torej **ne** `https://akademijafri.si/foo/bar`, ampak `/foo/bar`. Tako ohranimo pravilne poti povezav, ko prestavljamo spletno stran na različne domene (npr. lokalno, produkcija, testni strežnik itd.) in kadar Netlify ustvari predogledo stran.


##### Izobraževanja
Vsebina izobraževanj so razdeljena:
* `content/izobrazevanje` - izobraževanja, ki se izvajajo ob predpisanem terminu (na spletni strani so objavljena kot aktualna in pretekla)
* `content/za-podjetja` - izobraževanja namenjena za podjetja
* `content/za-sole` - izobraževanja namenjena za osnovnošolce ter dijake

##### Izvajalci
Direktorij `content/izvajalci` vsebuje strani izvajalcev. Če želite dodati izvajalca, ustvarite datoteko ter prepišite strukturo od enega izmed ostalih izvajalcev.

Obvezna polja so: `title`, `firstName`, `lastName`, `date`, `bgImage` ter `image`.

Za nalaganje svoje profile slike, sledite spodnjim navodilom.

##### Slike in datoteke
Če želite objavti slike ali ostale datoteke, jih lahko kopirajte v direktorij `static/uploads`. Končna povezavo na vir bo `<DOMENA_STRANI>/uploads/<POT_DATOTEKE>` (brez `static`!).

Kot smo že omenili, ko se sklicujemo na vir izpustimo domeno. Torej, se sklicujemo na povezavo do datoteke tako: `/uploads/<POT_DATOTEKE>`.

## Napredno
### CMS
Spletna stran uporablja [Netlify CMS](https://www.netlifycms.org/) za grafično urejanje vsebine.

URL CMS je na: `/admin`.

Zaradi tehničnih omejitev (omejeno število računov ter pomanjkanje možnosti določitev pravic) ima dostop do CMS samo vzdrževalec spletne strani.

### Ostali make ukazi
#### Produkcija
```bash
# Replace "http://example.com" with the base url of the site
make build-prod url=http://example.com 
```
Build produkcije bo nastavil ločljivost vseh .jpg slik v direktoriju `static/uploads` na
širino 1920px (razmerje ločljivosti se bo ohranilo).

Za ta proces je potreben [ImageMagick](https://imagemagick.org/index.php).

#### Ostalo
```bash
make clean  # run after "make build-dev" or "make build-prod"
```

Zbriše datoteke, ki jih `make build-prod` generira.
