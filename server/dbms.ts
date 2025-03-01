import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

interface Database {
    trains: Record[];
}

interface Record {
    id: string;
    trainClass: string;
    trainName: string;
    trainManufacturer: string;
    trainCode: string;
    trainDccAddress: string;
    trainLivery: string;
    trainDccStatus: string;
    trainGauge: string;
    trainWhyteDesignation: string;
    trainManufacturerCode: string;
    trainLastServiced: string;
    trainRunningTime: string;
    trainImage: string;
}

class TrainDatabase {
    path: string;
    db: Database

    constructor(path: string) {
        this.path = path;
        this.db = { trains: [] };

        this.initDatabase();
    }

    reloadDb = async() => {
        try {
            this.db = JSON.parse(await fs.readFile(this.path, { encoding: 'utf-8' }));
        } catch (e) {
            throw new Error('Failed to load DB');
        }
    }

    initDatabase = async() => {
        console.log('[DB]: Checking DB file');
        try {
            await this.reloadDb();
            console.log('[DB]: File found');
        } catch (e) {
            console.log('Error loading DB:', e);
            console.log('Attempting to generate new one');
            const exampleDb = JSON.stringify(this.db);

            try {
                await fs.writeFile(this.path, exampleDb);
                await this.reloadDb();
                console.log('New DB written to', this.path);
            } catch (e) {
                console.log('Failed to initialise new DB:', e);
            }
        }
    }

    getAllRecords = async() => {
        console.log('[DB]: Getting all records');
        return this.db.trains;
    }

    getRecordById = async(id: string) => {
        console.log('[DB]: Getting record for ID:', id);
        return this.db.trains.find(t => t.id === id);
    }

    deleteRecord = async(id: string) => {
        console.log('[DB]: Deleting record:', id);

        if (!this.db.trains.find(t => t.id === id)) return false;
        const imageId = this.db.trains.find(t => t.id === id)?.trainImage;

        const newTrains = this.db.trains.filter(t => t.id !== id);

        try {
            await fs.writeFile(this.path, JSON.stringify({ trains: newTrains }));
            this.reloadDb();
            if (imageId) {
                await fs.rm(__dirname + '/images/' + imageId);
            }
            return true;
        } catch (e) {
            console.log('Failed to delete record:', e);
            return false;
        }
    }

    editRecord = async(id: string, newRecord: Record) => {
        console.log('[DB]: Editing record:', id);

        if (!this.db.trains.find(t => t.id === id)) return false;

        const newTrains = this.db.trains.filter(t => t.id !== id);
        newTrains.push(newRecord);

        try {
            await fs.writeFile(this.path, JSON.stringify({ trains: newTrains }));
            this.reloadDb();
            return true;
        } catch (e) {
            console.log('Failed to edit record:', e);
            return false;
        }
    }

    addImageForTrain = async(id: string, filename: string) => {
        console.log('[DB]: attaching image to record:', id);

        if (!this.db.trains.find(t => t.id === id)) return false;

        const newRecord = { ...this.db.trains.find(t => t.id === id), trainImage: filename }
        const newTrains = this.db.trains.filter(t => t.id !== id);
        // @ts-ignore - we've checked the train exists before hand, so the Record types won't be optional as TS has inferred.
        newTrains.push(newRecord);

        try {
            await fs.writeFile(this.path, JSON.stringify({ trains: newTrains }));
            this.reloadDb();
            return true;
        } catch (e) {
            console.log('Failed to edit record:', e);
            return false;
        }
    }

    addNewRecord = async(newRecord: Record) => {
        console.log('[DB]: Adding new record');
        const newId = uuidv4();

        const newTrain = {
            ...newRecord,
            id: newId
        }

        const newTrains = [...this.db.trains, newTrain];

        try {
            await fs.writeFile(this.path, JSON.stringify({ trains: newTrains }));
            this.reloadDb();
            return newId;
        } catch (e) {
            console.log('Failed to write new record:', e);
            return false;
        }
    }
}

export default TrainDatabase;