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
cat * | sed -n '/href=g/p' > urls.txt
```

En el archivo urls.txt nos van a quedar todas las líneas con links a PDFs, pero hay que borrar todo el HTML y agregarle la primer parte de la URL.

Eso se hace con las funciones de búsqueda y reemplazar de un editor de texto hasta que quedamos con las URLs completas, les ponemos comillas al principio y al final y generamos este comando:

```bash
wget "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=1&n=9&p=5053" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=1&n=15&p=5055" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=1&n=86&p=5057" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=1&n=70&p=5058" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=1&n=72&p=5058" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=1&n=62&p=5059" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=1&n=76&p=5060" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=1&n=73&p=5062" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=1&n=75&p=5062" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=1&n=71&p=765" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=1&n=56&p=778" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=1&n=44&p=786" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=1&n=110&p=795" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=1&n=55&p=805" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=2&n=9&p=5053" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=2&n=15&p=5055" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=2&n=86&p=5057" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=2&n=70&p=5058" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=2&n=72&p=5058" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=2&n=62&p=5059" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=2&n=76&p=5060" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=2&n=73&p=5062" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=2&n=75&p=5062" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=2&n=56&p=778" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=2&n=44&p=786" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=2&n=55&p=805" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=3&n=9&p=5053" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=3&n=15&p=5055" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=3&n=86&p=5057" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=3&n=70&p=5058" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=3&n=72&p=5058" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=3&n=62&p=5059" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=3&n=76&p=5060" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=3&n=73&p=5062" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=3&n=75&p=5062" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=3&n=71&p=765" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=3&n=56&p=778" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=3&n=44&p=786" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=3&n=110&p=795" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=3&n=55&p=805" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=4&n=9&p=5053" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=4&n=15&p=5055" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=4&n=86&p=5057" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=4&n=70&p=5058" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=4&n=72&p=5058" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=4&n=62&p=5059" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=4&n=76&p=5060" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=4&n=73&p=5062" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=4&n=75&p=5062" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=4&n=56&p=778" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=4&n=44&p=786" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=4&n=55&p=805" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=5&n=21&p=128" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=5&n=9&p=5053" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=5&n=15&p=5055" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=5&n=86&p=5057" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=5&n=70&p=5058" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=5&n=72&p=5058" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=5&n=62&p=5059" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=5&n=76&p=5060" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=5&n=73&p=5062" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=5&n=75&p=5062" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=5&n=56&p=778" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=5&n=44&p=786" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=5&n=110&p=795" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=5&n=55&p=805" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=6&n=9&p=5053" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=6&n=15&p=5055" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=6&n=86&p=5057" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=6&n=70&p=5058" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=6&n=72&p=5058" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=6&n=62&p=5059" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=6&n=76&p=5060" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=6&n=73&p=5062" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=6&n=74&p=5062" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=6&n=56&p=778" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=6&n=44&p=786" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=6&n=55&p=805" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=7&n=9&p=5053" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=7&n=15&p=5055" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=7&n=86&p=5057" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=7&n=70&p=5058" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=7&n=72&p=5058" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=7&n=62&p=5059" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=7&n=76&p=5060" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=7&n=73&p=5062" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=7&n=56&p=778" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=7&n=44&p=786" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=7&n=55&p=805" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=9&p=5053" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=16&p=5055" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=17&p=5055" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=18&p=5055" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=19&p=5055" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=132&p=5055" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=86&p=5057" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=70&p=5058" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=72&p=5058" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=62&p=5059" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=76&p=5060" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=111&p=5060" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=73&p=5062" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=75&p=5062" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=71&p=765" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=56&p=778" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=44&p=786" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=110&p=795" "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/genera-pdf.php?d=000&s=8&n=55&p=805" 
```

Esto nos permite descargar los PDFs, y luego hay que convertir los PDFs a texto usando pdftotext

```bash
ls genera* | while read x y ; do pdftotext -layout $x text-$x.txt;  done
```

Y finalmente los compilamos en un sólo archivo:

```bash
cat text-* > texto.txt
```

Por ahora lo dejamos así, más abajo veremos cómo convertirlo en CSV corriendo los scripts.


---

Ahora para los municipales, primero se obtiene el listado de distritos que estáne en el html de la página:
http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/consulta-listas-x-nivel.php?accion=buscar&orden=1&posicion=1

Ahí lo que hacemos es buscar todos los <option> y tomar el value, eso genera el archivo ids-distritos.txt

Luego corremos esta línea que genera las URLs y y las baja:

```bash
cat ids-distritos.txt | while read x; do wget "http://www.juntaelectoral.gba.gob.ar/consulta/primarias/listas-registradas/consulta-listas-x-nivel.php?accion=requerir&orden=1&niveles=3&secciones=${x:0:1}&distri=${x:1:3}"; done;
```

Y repetimos el comando que convierte a texto todos los PDFs:

```bash
ls genera* | while read x y ; do pdftotext -layout $x text-$x.txt;  done
```

Y finalmente los compilamos en un sólo archivo:

```bash
cat text-* > texto-muni.txt
```

Ahora sólo queda correr el script para convertirlo en CSV



---

**Para correr los scripts**

Cada uno de estos scripts extrae una información diferente.

```bash
npm install
cd app
node formatearGobernadores.js
node formatearMunicipales.js
node formatearLegisladores.js
```

Esto genera archivos en la carpeta ./salida/:

 - formatearGobernadores.js genera el archivo ./salida/gobernadoresBA.csv con la info ordenada.
 - formatearLegisladores.js genera el archivo ./salida/legisladoresBA.csv con la info ordenada.
 - formatearMunicipales.js genera el archivo ./salida/municipalesBA.csv con la info ordenada.
