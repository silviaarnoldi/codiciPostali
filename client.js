class RestClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async get(resource) {
        const url = `${this.baseURL}/${resource}`;
        const headers = new Headers({
            'Accept': 'application/json'
        });

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });

            this.handleResponse(response);

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Errore durante la richiesta:", error);
            return null;
        }
    }

    async getWithParams(resource, params) {
        const url = `${this.baseURL}/${resource}?${new URLSearchParams(params)}`;
        const headers = new Headers({
            'Accept': 'application/json'
        });

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });

            this.handleResponse(response);

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Errore durante la richiesta:", error);
            return null;
        }
    }

    async post(resource, data) {
        const url = `${this.baseURL}/${resource}`;
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });

            this.handleResponse(response);

            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error("Errore durante la richiesta:", error);
            return null;
        }
    }

    async put(resource, data) {
        const url = `${this.baseURL}/${resource}`;
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            });

            this.handleResponse(response);

            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error("Errore durante la richiesta:", error);
            return null;
        }
    }

    async delete(resource, params) {
        const url = `${this.baseURL}/${resource}?${new URLSearchParams(params)}`;
        const headers = new Headers({
            'Accept': 'application/json'
        });

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: headers
            });

            this.handleResponse(response);

            return true;
        } catch (error) {
            console.error("Errore durante la richiesta:", error);
            return false;
        }
    }

    handleResponse(response) {
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }
    }
}

// Esempio di utilizzo del client
const baseURL = 'http://url-del-servizio';
const client = new RestClient(baseURL);

// Esempio di richiesta GET
client.get('resource')
    .then(data => {
        console.log('GET:', data);
        // Implementa la rappresentazione grafica dei dati
    });

// Esempio di richiesta GET con parametri
const params = { param1: 'value1', param2: 'value2' };
client.getWithParams('resource', params)
    .then(data => {
        console.log('GET with params:', data);
        // Implementa la rappresentazione grafica dei dati
    });

// Esempio di richiesta POST
const postData = { key: 'value' };
client.post('resource', postData)
    .then(data => {
        console.log('POST:', data);
    });

// Esempio di richiesta PUT
const putData = { key: 'updatedValue' };
client.put('resource', putData)
    .then(data => {
        console.log('PUT:', data);
    });

// Esempio di richiesta DELETE
const deleteParams = { id: '123' };
client.delete('resource', deleteParams)
    .then(success => {
        if (success) {
            console.log('DELETE: Success');
        } else {
            console.log('DELETE: Failure');
        }
    });