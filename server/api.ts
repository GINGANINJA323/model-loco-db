import express from 'express';
import TrainDatabase from './dbms';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';


const getImageForTrain = async(filename: string) => {
    try {
        const file = await fs.readFile(__dirname + '/images/' + filename);
        return file;
    } catch (e) {
        console.log('Failed to get image:', e);
        return false;
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/images/`)
    },
    filename: (_, file, cb) => {
        const newFileName = `${uuidv4()}.${file.mimetype.split('/')[1]}`;

        cb(null, newFileName);
    }
});

const fileFilter = (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const accepts = ['image/jpeg', 'image/png'];

    if (!accepts.includes(file.mimetype)) {
        cb(null, false);
        return;
    }

    cb(null, true);
}

const uploadToDest = multer({ storage, fileFilter });
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
});

api.get('/train-image/:id', async(req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).send('missing ID parameter');
        return;
    }

    const dbResponse = await DB.getRecordById(id);

    if (!dbResponse) {
        res.status(500).send();
    } else {
        const image = await getImageForTrain(dbResponse.trainImage);

        if (!image) {
            res.status(500).send();
            return;
        }

        res.write(image);
        res.status(200).send();
    }
});

api.post('/new-train', async(req, res) => {
    if (!req.body) {
        res.status(400).send();
        return;
    }
    
    const dbResult = await DB.addNewRecord(req.body);

    if (!dbResult) {
        res.status(500).send();
    } else {
        res.status(200).send(dbResult);
    }
});

api.post('/edit-train', async(req, res) => {
    if (!req.body) {
        res.status(400).send();
        return;
    }

    const dbResult = await DB.editRecord(req.body.id, req.body);

    if (!dbResult) {
        res.status(500).send();
    } else {
        res.status(200).send();
    }
});

api.post('/upload-image/:id', uploadToDest.single('image'), async(req, res) => {
    console.log('Image:', req.file, req.params);
    if (!req.file || !req.params.id) {
        res.status(400).send();
        return;
    }

    const dbResult = await DB.addImageForTrain(req.params.id, req.file.filename);

    if (!dbResult) {
        res.status(500).send();
    } else {
        res.status(200).send();
    }
});

api.get('/delete-train/:id', async(req, res) => {
    if (!req.params.id) {
        res.status(400).send();
        return;
    }

    const dbResult = await DB.deleteRecord(req.params.id);

    if (!dbResult) {
        res.status(500).send();
    } else {
        res.status(200).send();
    }
})

export default api;