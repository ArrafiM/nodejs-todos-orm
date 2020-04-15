const app = require('../app');
const supertest = require('supertest');
const request = supertest.agent(app);

describe('Joi Test for Rutes',() => {
    describe('Test joi for the routes Api Todos',() => {
        it('Seuccess joi test for routes Requered title', done => {
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
            .catch(err => {
                console.log(`Error ${err}`)
                done(); 
            });
        });

        it('Seuccess joi test for routes Requered iduser', done => {
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




