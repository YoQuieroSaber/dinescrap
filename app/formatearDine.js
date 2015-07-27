var fs = require('fs');

var Estados = {
    inicio      : /^\s*AGRUPACIONES\sY\sLISTAS$/,
    lista: /^(\d+)\s-\s(.+),\sLISTA:(.+)\.\s(.+)*$/,
    candidato   : /^\s+(\d{1,3})\.\s+(.+)$/,
    vacio       : /^\s*$/
};

var analyzer = function(lines,prov){

    var actual = {
        numero_lista:'',
        nombre_lista: "",
        partido: '',
        lista: "",
        cargo: "",
        distrito: prov

    }

    var resp    = [[ '"' + "Partido","Numero Lista", "Nombre Lista", "Distrito", "Cargo",
         "Nombre", "Posicion"].join('","') + '"'];
         
    function inicio(actual, i){
        console.log(lines[i+1] == undefined);
        while(! lines[i++].match(Estados.inicio));
        console.log(lines[i+1] == undefined,Estados.provincia);
        //while(! lines[i++].match(Estados.provincia));
        console.log(lines[i+1] == undefined);
        console.log(actual,i);
        return i;
    }

    function lista(actual, i){
        while(!lines[i++].match(Estados.lista));
        actual.lista = lines[i -1].match(Estados.lista);

        actual.numero_lista = actual.lista[1];
        actual.partido = actual.lista[2];
        actual.nombre_lista = actual.lista[3];
        actual.cargo = actual.lista[4];
        return i;
    }

    function imprimirFila(actual){
        var linea = [actual.partido, actual.numero_lista, actual.nombre_lista, actual.distrito,
        actual.cargo, 
            actual.nombre, actual.posicion]
        resp.push('"'+ linea.join('","') + '"');
    }

    function candidatos(actual, i){
        var salir;
        if (salir) {
            console.log("saliendo",i);
        }
        while(!salir){
            // Primero busco cargos
            var isLista = lines[i].match(Estados.lista);
            var isCandidato = lines[i].match(Estados.candidato);
            var salir = lines[i].match(Estados.inicio);

            //console.log(isLista,isCandidato);
            if(isLista){
                actual.numero_lista = isLista[1].trim();
                actual.partido = isLista[2].trim();
                actual.nombre_lista = isLista[3].trim();
                actual.cargo = isLista[4].trim();

            } else if(isCandidato){
                actual.posicion    = isCandidato[1];
                actual.nombre    = isCandidato[2].replace(/\"/g,"'").replace("volver","").trim();
                imprimirFila(actual);
            }
            i++;
        }
        return i;
    }

    var i       = 0;

    Estados.provincia =     new RegExp("/^\s*"+prov.replace(/\s/g,"\\s")+"\s*$/");


    while(i < lines.length){
        try{
            i = inicio(actual, i);
            console.log(i);
            i = lista(actual, i);
            i = candidatos(actual, i);
        } catch(e) {
            console.error(i,e);
            break; // Ver como evitar esto!
        }
    }

    return resp;
}


textFolder = "../textos/";
fs.readdir(textFolder, function(err,data) {
    for (d in data) {
        prov = data[d].split("-")[1].split(".pdf")[0];
        parseProv(prov,textFolder+data[d]);
    }
});

function parseProv(prov,ifile) {


        fs.readFile(ifile, 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }

          var resp = analyzer(data.split('\n'),prov);

          ofile = "../salida/"+prov+".csv";
          fs.writeFile(ofile, resp.join('\n'), function(err) {
              ofile = "../salida/"+prov+".csv";
                if(err) {
                    return console.log(err);
                }

                console.log("La salida fue guardada en "+ofile);
            }); 
        });
}

// prov = "BUENOS\ AIRES";
// ifile = '../textos/text-'+prov+'.pdf.txt';
// ofile = "../salida/"+prov+".csv";

// fs.readFile(ifile, 'utf8', function (err,data) {
//   if (err) {
//     return console.log(err);
//   }

//   var resp = analyzer(data.split('\n'));


//   fs.writeFile(ofile, resp.join('\n'), function(err) {
//         if(err) {
//             return console.log(err);
//         }

//         console.log("La salida fue guardada en "+ofile);
//     }); 
// });



