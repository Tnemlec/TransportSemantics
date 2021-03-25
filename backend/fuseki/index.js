const { default: axios } = require("axios");

class FusekiClient{
    URL_DB = 'http://localhost:3030/transport'

    HEADERS = {'Content-type': 'application/sparql-query'}

    queryHeader(query) {
        return `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX ns: <http://www.semanticweb.org/transport#>
            PREFIX sch: <http://schema.org/>

            ${query}
        `
    }

    getAll(){
        return new Promise((resolve, reject) => {
            let req = `
                SELECT ?subject ?predicate ?object
                WHERE {
                    ?subject ?predicate ?object
                }
            `
            let payload = this.queryHeader(req)
            this.makeQuery(payload).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    getAllStationName(){
        return new Promise((resolve, reject) => {
            let req = `
                SELECT ?subject ?object
                WHERE {
                    ?subject sch:givenName ?object
                }
            `
            let payload = this.queryHeader(req)
            this.makeQuery(payload).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })    
        })
    }

    getAllById(id){
        return new Promise((resolve, reject) => {
            let req = `
                SELECT ?subject ?predicate ?object
                WHERE {
                    ?subject ?predicate ?object .
                    FILTER(?subject = <http://www.semanticweb.org/${id}>)
                }
            `
            let payload = this.queryHeader(req)
            this.makeQuery(payload).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    formatAll(data){
        let formatedData = []
        for(let i = 0; i < data.results.bindings.length; i++){
            formatedData.push({
                id: data.results.bindings[i].subject.value.split('/')[3],
                predicate: data.results.bindings[i].predicate.value.split('#')[1],
                object: data.results.bindings[i].object.value
            })
        }
        return formatedData
    }

    formatStationName(data){
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

    makeQuery(payload){
        return new Promise((resolve, reject) => {
            axios.post(this.URL_DB, payload, {
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