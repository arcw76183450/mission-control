const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Launches API',()=>{
    beforeAll(async()=>{
        await mongoConnect();
    });

    afterAll(async()=>{
        await mongoDisconnect();
    })

    describe('Test GET /launches', () => {
        test('It should respond with 200 success', async() => {
            const response = await request(app)
            .get('/v1/launches')
            .expect('Content-Type', /json/)
            .expect(200);
        });
    });
    
    describe('Test POST /launches', () => {
    
        const completeLaunch = {
            mission: 'USS Enterprise',
            rocket: 'NCSS 17 Enterprise',
            target: 'Kepler-186 f',
            launchDate: 'January 20, 2028'
        };
    
        const launchWithoutDate = {
            mission: 'USS Enterprise',
            rocket: 'NCSS 17 Enterprise',
            target: 'Kepler-186 f',
        };
    
        const launchWithInvalidDate = {
            mission: 'USS Enterprise',
            rocket: 'NCSS 17 Enterprise',
            target: 'Kepler-186 f',
            launchDate: 'hello'
        };
    
        test('It should respond with 201 created',async() => {
            const response = await request(app)
            .post('/v1/launches')
            .send(completeLaunch)
            .expect('Content-Type', /json/)
            .expect(201);
    
            const requestDate = new Date(completeLaunch.launchDate).toISOString();
            const responseDate = response.body.launchDate;
            expect(responseDate).toBe(requestDate);
            expect(response.body).toMatchObject(launchWithoutDate);
        });
    
        test('It should catch missing required fields', async() => {
            const response = await request(app)
            .post('/v1/launches')
            .send(launchWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({"error": "Missing required launch properties"});
        });
    
        test('It should catch invalid dates', async() => {
            const response = await request(app)
            .post('/v1/launches')
            .send(launchWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({"error": "Enter a valid date"});
        });
    });
});