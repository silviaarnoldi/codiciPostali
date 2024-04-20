const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Middleware per il parsing del corpo delle richieste in JSON
app.use(bodyParser.json());

// Connessione al database MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Sostituisci con il nome utente del tuo database
    password: 'password', // Sostituisci con la password del tuo database
    database: 'codiciPostali'
});

// Connessione al database
connection.connect(err => {
    if (err) {
        console.error('Errore durante la connessione al database:', err);
        return;
    }
    console.log('Connessione al database MySQL riuscita');
});

// Rotte per le operazioni CRUD sui comuni
// Aggiungi un nuovo comune
app.post('/comuni', (req, res) => {
    const nuovoComune = req.body;
    connection.query('INSERT INTO comuni SET ?', nuovoComune, (error, results, fields) => {
        if (error) {
            console.error('Errore durante l\'inserimento del comune:', error);
            res.status(500).json({ message: 'Errore durante l\'inserimento del comune' });
            return;
        }
        res.status(201).json({ message: 'Comune aggiunto con successo', comune: nuovoComune });
    });
});

// Leggi tutti i comuni
app.get('/comuni', (req, res) => {
    connection.query('SELECT * FROM comuni', (error, results, fields) => {
        if (error) {
            console.error('Errore durante la lettura dei comuni:', error);
            res.status(500).json({ message: 'Errore durante la lettura dei comuni' });
            return;
        }
        res.json(results);
    });
});

// Leggi un singolo comune per ID
app.get('/comuni/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM comuni WHERE id = ?', id, (error, results, fields) => {
        if (error) {
            console.error('Errore durante la lettura del comune:', error);
            res.status(500).json({ message: 'Errore durante la lettura del comune' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Comune non trovato' });
            return;
        }
        res.json(results[0]);
    });
});

// Aggiorna i dettagli di un comune
app.put('/comuni/:id', (req, res) => {
    const id = req.params.id;
    const nuoviDettagli = req.body;
    connection.query('UPDATE comuni SET ? WHERE id = ?', [nuoviDettagli, id], (error, results, fields) => {
        if (error) {
            console.error('Errore durante l\'aggiornamento del comune:', error);
            res.status(500).json({ message: 'Errore durante l\'aggiornamento del comune' });
            return;
        }
        res.json({ message: 'Comune aggiornato con successo' });
    });
});

// Cancella un comune
app.delete('/comuni/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM comuni WHERE id = ?', id, (error, results, fields) => {
        if (error) {
            console.error('Errore durante l\'eliminazione del comune:', error);
            res.status(500).json({ message: 'Errore durante l\'eliminazione del comune' });
            return;
        }
        res.json({ message: 'Comune eliminato con successo' });
    });
});

// Avvio del server
const port = 3000;
app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});