# dinescrap
Scrapper del sitio de la Dirección Nacional Electoral. Contiene pre-candidatos a diputados nacionales, senadores nacionales y parlamentarios mercosur de todas las provincias
 para las PASO 2015.

Descargar datos en CSV: https://github.com/YoQuieroSaber/dinescrap/tree/master/salida

Los datos están basados en información de dominio público. Si se reutilizan solicitamos que nos informen para evitar duplicar esfuerzos.

Fuente: http://www.elecciones.gov.ar/articulo_sub_sub.php?secc=2&sub_secc=8&sub_sub_secc=63

**Requerimientos**

Para repetir manualmente este proceso es necesario un sistema linux con los siguientes paquetes instalados:
* pdftotext
* nodejs
* npm

**Pasos**

1) El primer paso para que funcione este scrapper es bajarse todos los PDFs.

2) Correr los scripts (ver más abajo)

----

Primero vamos a bajar los de las 8 secciones, que son los que tienen las candidaturas para diputados provinciales.
Bajamos primero los HTMLs de cada sección:
```bash
wget "http://www.elecciones.gov.ar/articulo_sub_sub.php?secc=2&sub_secc=8&sub_sub_secc=63"
```

Luego filtramos sólo las líneas que tengan URLs:

```bash
cat * | sed -n '/href=\"\//p' > urls.txt
```

En el archivo urls.txt nos van a quedar todas las líneas con links a PDFs, pero hay que borrar todo el HTML y agregarle la primer parte de la URL.

Eso se hace con las funciones de búsqueda y reemplazar de un editor de texto hasta que quedamos con las URLs completas, les ponemos comillas al principio y al final y generamos este comando:

```bash
wget "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/PRESIDENTE%20Y%20VICEPRESIDENTE.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/PARLAMENTARIO%20MERCOSUR%20DISTRITO%20NACIONAL(1).pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/BUENOS%20AIRES.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/CORRIENTES.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/MENDOZA.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/SAN%20LUIS.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/CAPITAL%20FEDERAL.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/ENTRE%20RIOS.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/MISIONES.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/SANTA%20CRUZ.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/CATAMARCA.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/FORMOSA.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/NEUQUEN.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/SANTA%20FE.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/CHACO.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/JUJUY.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/RIO%20NEGRO.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/SANTIAGO%20DEL%20ESTERO.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/CHUBUT.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/LA%20PAMPA.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/SALTA.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/TIERRA%20DEL%20FUEGO.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/CORDOBA.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/LA%20RIOJA.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/SAN%20JUAN.pdf" "http://www.elecciones.gov.ar/admin/ckfinder/userfiles/files/TUCUMAN.pdf"
```

Esto nos permite descargar los PDFs, y luego hay que convertir los PDFs a texto usando pdftotext

```bash
ls *.pdf | while read x y ; do pdftotext -layout $x text-$x.txt;  done
```

```bash
ls *.pdf | while read x y ; do pdftotext -layout $x $y text-$x $i.txt;  done
```

Ahora sólo queda correr el script para convertirlo en CSV



---

**Para correr los scripts**

```bash
npm install
cd app
node formatearDine.js
```

Esto genera archivos en la carpeta ./salida/