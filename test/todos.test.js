const app = require('../app');
const supertest = require('supertest');
const request = supertest.agent(app);


describe('TEST SUITE FOR ROUTE', () => {
    describe('This is a test for the routes API todo', () => {
        it('successfully access route :get /api/todos', done => {
            request
            .get('/api/todos')
            .then(response => {
                expect(response.status).toEqual(200);
                expect(response.body.message).toBe("Semua Data todos");
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done();
            });
        });

        it('successfully access route :get /api/todo/:id', done => {
            request
            .get('/api/todo/1')
            .expect(200)
            .then(response =>{
                    expect(response.status).toEqual(200);
                    expect(response.body.message).toBe("Data todos anda")
                    done();
            })
            .catch(err => {
                    console.log(`Error ${err}`)
                    done();
            });
        });

        it('successfully access route :post /api/todos', done => {
            var data ={
                title:"Belajar Jest Test Todos",
                iduser:1
            }
            request
            .post('/api/todos')
            .send(data) // Data Akan ditambahkan ke Database
            .then(response =>{
                expect(response.status).toEqual(200);
                expect(response.body.message).toBe("Data Todo Berhasil Disimpan")
                done();
            })
            .catch(err => {
                    console.log(`Error ${err}`)
                    done()
            });
        });
        it('successfully access route :put /api/todo/:id', done => {
            var data ={
                title:"Belajar Edit",
                iduser:1
            }
            request
            .put('/api/todo/14')
            .send(data) // Data Dari Database Akan Di Edit
            .expect(200)
            .then(response =>{
                expect(response.status).toEqual(200);
                expect(response.body.message).toBe("Data Berhasil Diedit")
                done();
            })
            .catch(err => {
                    console.log(`Error ${err}`)
                    done()
            });
        });
        it('successfully access route :delete /api/todo/:id', done => {
            request
            .delete('/api/todo/15')
            .expect(200) // Data Dari Database Akan Di Edit
            .then(response =>{
                expect(response.status).toEqual(200);
                expect(response.body.message).toBe("Data Berhasil Dihapus")
                done();
            })
            .catch(err => {
                    console.log(`Error ${err}`)
                    done()
            });
        });
    });
});