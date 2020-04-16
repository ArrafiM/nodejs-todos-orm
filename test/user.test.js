const app = require('../app');
const supertest = require('supertest');
const request = supertest.agent(app);

const data= require('../helpers/inputTest');

const tambah = data.add();

describe('TEST SUITE FOR ROUTE', () => {
    describe('This is a test for the routes API user', () => {
        it('successfully access route :get /api/user', done => {
            request
            .get('/api/user')
            .then(response => {
                expect(response.status).toEqual(200);
                expect(response.body.message).toBe("Semua Data User");
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done();
            });
        });

        it('successfully access route :get /api/user/:id', done => {
            request
            .get('/api/user/1')
            .then(response => {
                expect(response.status).toEqual(200);
                expect(response.body.message).toBe("Data Anda");
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done();
            });
        });

        it('successfully access route :post /api/user', done => {
            request
            .post('/api/user')
            .send(tambah)
            .then(response => {
                expect(response.status).toEqual(200);
                expect(response.body.message).toBe("Data user Berhasil Disimpan");
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done();
            });
        });

        it('successfully access route :put /api/user/:id', done => {
            request
            .put('/api/user/2')
            .send(tambah)
            .then(response => {
                expect(response.status).toEqual(200);
                expect(response.body.message).toBe("Data Berhasil Diedit");
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done();
            });
        });

        it('successfully access route :delete /api/user/:id', done => {
            request
            .delete('/api/user/2')
            .send(tambah)
            .then(response => {
                expect(response.status).toEqual(200);
                expect(response.body.message).toBe("Data Berhasil Dihapus");
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done();
            });
        });
    });
});