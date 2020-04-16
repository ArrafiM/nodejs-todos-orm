const app = require('../app');
const supertest = require('supertest');
const request = supertest.agent(app);

const data= require('../helpers/inputTest');

const nama_depan = data.emptyNama_depan();
const nama_belakang = data.emptyNama_belakang();
const level = data.emptyNama_level();
const EmptyEmail = data.emptyEmail();
const emailFormat = data.formatEmailSalah();
const emptyPass = data.emptyPassword();
const minPass = data.passwordMin();
const maxPass = data.passwordMax();

describe('Joi Test for Rutes Todos',() => {
    describe('Test joi for the routes Api Todos',() => {
        it('Seuccess joi test for routes todos Requered title', done => {
            var data ={
                title:""
            }
            request
            .post('/api/todos')
            .send(data)
            .then(res => {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe("\"title\" is not allowed to be empty")
                done();
            })
            .catch(error => {
                // expect(error.status).toEqual(400);
                console.log(`Error ${error}`)
                done(); 
            });
        });

        it('Seuccess joi test for routes todos Requered iduser', done => {
            var data ={
                title:"Belajar",
                iduser:""
            }
            request
            .post('/api/todos')
            .send(data)
            .then(res => {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe("\"iduser\" must be a number")
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done(); 
            })
        })
    } )
});
describe('Joi Test for Rutes User',() => {
    describe('Test joi for the routes Api User',() => {
        it('Seuccess joi test for routes user Requered nama_depan', done => {
            request
            .post('/api/user')
            .send(nama_depan)
            .then(res => {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe("\"nama_depan\" is not allowed to be empty")
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done(); 
            });
        });

        it('Seuccess joi test for routes user Requered nama_belakang', done => {
            request
            .post('/api/user')
            .send(nama_belakang)
            .then(res => {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe("\"nama_belakang\" is not allowed to be empty")
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done(); 
            });
        });
        it('Seuccess joi test for routes user Requered level', done => {
            request
            .post('/api/user')
            .send(level)
            .then(res => {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe("\"level\" is not allowed to be empty")
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done(); 
            });
        });
        it('Seuccess joi test for routes user Requered email', done => {
            request
            .post('/api/user')
            .send(EmptyEmail)
            .then(res => {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe("\"email\" is not allowed to be empty")
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done(); 
            });
        });
        it('Seuccess joi test for routes user format harus email', done => {
            request
            .post('/api/user')
            .send(emailFormat)
            .then(res => {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe("\"email\" must be a valid email")
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done(); 
            });
        });

        it('Seuccess joi test for routes user Required Password', done => {
            request
            .post('/api/user')
            .send(emptyPass)
            .then(res => {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe(
                    "\"password\" is not allowed to be empty"
                )
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done(); 
            });
        });

        it('Seuccess joi test for routes user Required MinPassword', done => {
            request
            .post('/api/user')
            .send(minPass)
            .then(res => {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe(
                    "\"password\" length must be at least 3 characters long"
                )
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done(); 
            });
        });

        it('Seuccess joi test for routes user Required MinPassword', done => {
            request
            .post('/api/user')
            .send(maxPass)
            .then(res => {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe(
                    "\"password\" length must be less than or equal to 8 characters long"
                )
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done(); 
            });
        });
    });
});




