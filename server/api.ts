import express from 'express';
import TrainDatabase from './dbms';

const api = express.Router();
const DB = new TrainDatabase('./tdb.json');

api.get('/all-trains', async(req, res) => {
    const dbResponse = await DB.getAllRecords();

    if (!dbResponse) {
        res.status(500).send();
    } else {
        const trains = dbResponse.map(t => ({ id: t.id, trainName: t.trainName, trainClass: t.trainClass }));
        res.status(200).json(trains);
    }
});

api.get('/get-train/:id', async(req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).send('missing ID parameter');
        return;
    }

    const dbResponse = await DB.getRecordById(id);

    if (!dbResponse) {
        res.status(500).send();
    } else {
        res.status(200).json(dbResponse);
    }
})

export default api;