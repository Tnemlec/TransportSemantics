const { default: axios } = require("axios");

class FusekiClient{
    URL_DB_TRANSPORT = 'http://localhost:3030/transport'

    URL_DB_METRO_TRAM = 'http://localhost:3030/metro_tram'

    HEADERS = {'Content-type': 'application/sparql-query'}

    //TGV

    queryHeader(query) {
        return `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX ns: <http://www.semanticweb.org/transport#>
            PREFIX sch: <http://schema.org/>

            ${query}
        `
    }

    getAllTGV(){
        return new Promise((resolve, reject) => {
            let req = `
                SELECT ?subject ?predicate ?object
                WHERE {
                    ?subject ?predicate ?object
                }
            `
            let payload = this.queryHeader(req)
            this.makeQueryTGV(payload).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    getAllTGVStationName(){
        return new Promise((resolve, reject) => {
            let req = `
                SELECT ?subject ?object
                WHERE {
                    ?subject sch:givenName ?object
                }
            `
            let payload = this.queryHeader(req)
            this.makeQueryTGV(payload).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })    
        })
    }

    getAllTGVById(id){
        return new Promise((resolve, reject) => {
            let req = `
                SELECT ?subject ?predicate ?object
                WHERE {
                    ?subject ?predicate ?object .
                    FILTER(?subject = <http://www.semanticweb.org/${id}>)
                }
            `
            let payload = this.queryHeader(req)
            this.makeQueryTGV(payload).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    formatAll(data){
        let formatedData = []
        for(let i = 0; i < data.results.bindings.length; i++){
            let predicate = ''
            if(data.results.bindings[i].predicate.value.split('#')[1]){
                predicate = data.results.bindings[i].predicate.value.split('#')[1]
            }
            else{
                predicate = data.results.bindings[i].predicate.value.split('/')[3]
            }
            if(data.results.bindings[i].object.datatype == 'http://www.w3.org/2001/XMLSchema#integer' || data.results.bindings[i].object.datatype == 'http://www.w3.org/2001/XMLSchema#double'){
                data.results.bindings[i].object.value = parseFloat(data.results.bindings[i].object.value)
            }
            formatedData.push({
                id: data.results.bindings[i].subject.value.split('/')[3],
                predicate: predicate,
                object: data.results.bindings[i].object.value
            })
        }
        return formatedData
    }

    formatTGVStationName(data){
        let formatedData = []
        for(let i = 0; i < data.results.bindings.length; i++){
            formatedData.push({
                id: data.results.bindings[i].subject.value.split('/')[3],
                station_name: data.results.bindings[i].object.value
            })
        }
        return formatedData
    }

    formatIdData(data){
        let formatedData = {
            id: null,
            givenName: null,
            nomDepartement: null,
            numeroDepartement: null,
            nomRegion: null,
            numeroRegion: null,
            latitude: null,
            longitude: null
        }
        for(let i = 0; i < data.results.bindings.length; i++){
            switch(data.results.bindings[i].predicate.value){
                case 'http://schema.org/latitude':
                    formatedData['latitude'] = parseFloat(data.results.bindings[i].object.value)
                    formatedData['id'] = data.results.bindings[i].subject.value.split('/')[3]
                    break;
                
                case 'http://schema.org/longitude':
                    formatedData['longitude'] = parseFloat(data.results.bindings[i].object.value)
                    break;
                
                case 'http://www.semanticweb.org/transport#numeroRegion':
                    formatedData['numeroRegion'] = data.results.bindings[i].object.value
                    break;
                
                case 'http://www.semanticweb.org/transport#nomRegion':
                    formatedData['nomRegion'] = data.results.bindings[i].object.value
                    break;
                
                case 'http://schema.org/givenName':
                    formatedData['givenName'] = data.results.bindings[i].object.value
                    break;

                case 'http://www.semanticweb.org/transport#numeroDepartement':
                    formatedData['numeroDepartement'] = data.results.bindings[i].object.value
                    break;
                
                case 'http://www.semanticweb.org/transport#nomDepartement':
                    formatedData['nomDepartement'] = data.results.bindings[i].object.value
                    break;
            }
        }
        return formatedData
    }

    makeQueryTGV(payload){
        return new Promise((resolve, reject) => {
            axios.post(this.URL_DB_TRANSPORT, payload, {
                headers: this.HEADERS
            }).then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })            
        })

    }

    //TRAM_METRO

    queryHeaderMetroTram(query){
        return `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX ns: <http://www.semanticweb.org/transport#>
            PREFIX sch: <http://schema.org/>

            ${query}
        `
    }

    getMetroTramName(){
        return new Promise((resolve, reject) => {
            let req = `
                SELECT DISTINCT ?object
                WHERE {
                    ?subject sch:givenName ?object .
                }
            `
            let payload = this.queryHeader(req)
            this.makeQueryStation(payload).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    getMetroTramAllByName(name){
        return new Promise((resolve, reject) => {
            let req = `
                SELECT ?subject ?predicate ?object
                WHERE {
                    ?subject ?predicate ?object .
                    ?subject sch:givenName '${name}' .
                } 
            `
            let payload = this.queryHeader(req)
            this.makeQueryStation(payload).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    formatMetroTram(data){
        let formatedData = []
        for(let i = 0; i < data.results.bindings.length; i++){
            formatedData.push(data.results.bindings[i].object.value)
        }
        return formatedData
    }

    formatMetroTramAll(data){
        let result = {}
        for(let i = 0; i < data.results.bindings.length; i++){
            switch(data.results.bindings[i].predicate.value){
                case 'http://schema.org/givenName':
                    result['name'] = data.results.bindings[i].object.value
                    break;
                case 'http://www.semanticweb.org/transport#type_transportation':
                    if(result['ligne']){
                        result['ligne'].push(data.results.bindings[i].object.value)
                    }
                    else{
                        result['ligne'] = [data.results.bindings[i].object.value]
                    }
                    break;
                case 'http://www.semanticweb.org/transport#coordinate':
                    if(parseFloat(data.results.bindings[i].object.value) > 20){
                        result['longitude'] = parseFloat(data.results.bindings[i].object.value)
                    }
                    else{
                        result['latitude'] = parseFloat(data.results.bindings[i].object.value)
                    }   
                    break;
            }  
        }
        return result
    }

    makeQueryStation(payload){
        return new Promise((resolve, reject) => {
            axios.post(this.URL_DB_METRO_TRAM, payload, {
                headers: this.HEADERS
            }).then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })            
        })

    }
}

module.exports = FusekiClient;