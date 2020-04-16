const app = require('../app');
const supertest = require('supertest');
const request = supertest.agent(app);

describe('Joi Test for Rutes Login',() => {
    describe('Test joi for the routes Login Api',() => {
        it('Seuccess joi test Requered email', done => {
            var data ={
                email:""
            }
            request
            .post('/api/login')
            .send(data)
            .then(res => {
                expect(res.status).toEqual(404);
                expect(res.body.message).toBe("\"email\" is not allowed to be empty")
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done(); 
            });
        });

        it('Seuccess joi test for must be email', done => {
            var data ={
                email:"rafi"
            }
            request
            .post('/api/login')
            .send(data)
            .then(res => {
                expect(res.status).toEqual(404);
                expect(res.body.message).toBe("\"email\" must be a valid email")
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done(); 
            });
        });

        it('Seuccess joi test for Required password', done => {
            var data ={
                email:"rafi@yahoo.com",
                password:""
            }
            request
            .post('/api/login')
            .send(data)
            .then(res => {
                expect(res.status).toEqual(404);
                expect(res.body.message).toBe("\"password\" is not allowed to be empty")
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done(); 
            });
        });

        it('Seuccess joi test for password panjang harus min 3', done => {
            var data ={
                email:"rafi@yahoo.com",
                password:"1",
            }
            request
            .post('/api/login')
            .send(data)
            .then(res => {
                expect(res.status).toEqual(404);
                expect(res.body.message).toBe("\"password\" length must be at least 3 characters long")
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done(); 
            });
        });
        it('Seuccess joi test for password panjang harus mix 8', done => {
            var data ={
                email:"rafi@yahoo.com",
                password:"123456789",
            }
            request
            .post('/api/login')
            .send(data)
            .then(res => {
                expect(res.status).toEqual(404);
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

describe('Test for Rutes Login',() => {
    describe('Test for the routes Login Api',() => {
        it('Email tidak terdaftar', done => {
            var data ={
                email:"rafi@gmail.com",
                password:"123",
            }
            request
            .post('/api/login')
            .send(data)
            .then(res => {
                expect(res.status).toEqual(400);
                expect(res.body.message).toBe(
                    'Email salah'
                )
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done(); 
            });
        });

        it('Password Salah', done => {
            var data ={
                email:"rafi@yahoo.com",
                password:"1234",
            }
            request
            .post('/api/login')
            .send(data)
            .then(res => {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe(
                    "Password Salah"
                )
                done();
            })
            .catch(err => {
                console.log(`Error ${err}`)
                done(); 
            });
        });

        it('Berhasil Login', done => {
            var data ={
                email:"rafi@yahoo.com",
                password:"123",
            }
            request
            .post('/api/login')
            .send(data)
            .then(res => {
                expect(res.status).toEqual(200);
                expect(res.body.message).toBe(
                    "Berhasil Login"
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
    
        