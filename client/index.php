<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Client REST</title>
</head>
<body>
    <div id="container">
        <div>
            <h1>Client REST</h1>
            <button onclick="getAll()">Get tutto</button> <br>
            <button onclick="getByPostalCode()">Get dal codice postale</button><br>
            <button onclick="getByCity()">Get dalla città</button><br>
            <button onclick="addPostalCode()">aggiungi codice postale</button><br>
            <button onclick="updatePostalCode()">modifica codice postale</button><br>
            <button onclick="deletePostalCode()">cancella codice postale</button><br>
            <div id="output"></div>
        </div>
    </div>
    <script>
        function sendRequest(method, url, data = null, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        var responseData = JSON.parse(xhr.responseText);
                        callback(responseData);
                    } else {
                        console.error('Request failed with status', xhr.status);
                    }
                }
            };
            xhr.send(JSON.stringify(data));
        }

        function handleResponse(responseData) {
            var outputDiv = document.getElementById('output');
            outputDiv.innerHTML = ''; // Clear previous content

            if (responseData.message) {
                // If response contains only a message
                outputDiv.textContent = responseData.message;
            } else {
                // If response contains data to display
                var table = document.createElement('table');
                var headerRow = table.insertRow();
                for (var key in responseData[0]) {
                    if (responseData[0].hasOwnProperty(key)) {
                        var headerCell = headerRow.insertCell();
                        headerCell.textContent = key;
                    }
                }

                // Add data rows to the table
                responseData.forEach(function(rowData) {
                    var row = table.insertRow();
                    for (var key in rowData) {
                        if (rowData.hasOwnProperty(key)) {
                            var cell = row.insertCell();
                            cell.textContent = rowData[key];
                        }
                    }
                });

                // Add the table to the output div
                outputDiv.appendChild(table);
            }
        }

        function getAll() {
            sendRequest('GET', '/server/', null, handleResponse);
        }

        function getByPostalCode() {
            var postalCode = prompt('inserisci  codice postale:');
            if (postalCode !== null && postalCode.trim() !== '') {
                sendRequest('GET', '/server/CAP/' + postalCode.trim(), null, handleResponse);
            }
        }

        function getByCity() {
            var city = prompt('Enter City:');
            if (city !== null && city.trim() !== '') {
                sendRequest('GET', '/server/Comune/' + city.trim(), null, handleResponse);
            }
        }

        function addPostalCode() {
            var postalCode = prompt('inserisci  codice postale::');
            var city = prompt('Enter City:');
            if (postalCode !== null && postalCode.trim() !== '' && city !== null && city.trim() !== "") {
                var data = { "CodicePostale": postalCode.trim(), "Comune": city.trim() };
                sendRequest('POST', '/server/ADD', data, handleResponse);
            }
        }

        function updatePostalCode() {
            var postalCode = prompt('Inserisci il codice postale da aggiornare:');
            var city = prompt('Enter New City:');
            if (postalCode !== null && postalCode.trim() !== '' && city !== null && city.trim() !== "") {
                var data = { "Comune": city.trim() };
                sendRequest('PUT', '/server/EDIT/' + postalCode.trim(), data, handleResponse);
            }
        }

        function deletePostalCode() {
            var postalCode = prompt('Inserisci il codice postale da eliminare');
            if (postalCode !== null && postalCode.trim() !== "") {
                sendRequest('DELETE', '/server/DEL/' + postalCode.trim(), null, handleResponse);
            }
        }
    </script>
</body>
</html>