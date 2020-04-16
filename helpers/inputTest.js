const faker = require('faker');
let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let emailSalah = faker.name.findName();
let email = faker.internet.email();

module.exports = {
    emptyNama_depan: () => {
        return {
          nama_depan: '',
        };
      },
    emptyNama_belakang: () => {
        return {
          nama_depan: firstName,
          nama_belakang:''
        };
    },
    emptyNama_level: () => {
        return {
          nama_depan: firstName,
          nama_belakang: lastName,
          level:''
        };
    },
    emptyEmail: () => {
        return {
            nama_depan: firstName,
            nama_belakang: lastName,
            level:'user',
            email:''
        };
    },
    formatEmailSalah: () => {
        return {
            nama_depan: firstName,
            nama_belakang: lastName,
            level:'user',
            email:emailSalah,
        };
    },
    emptyPassword: () => {
        return {
            nama_depan: firstName,
            nama_belakang: lastName,
            level:'user',
            email:email,
            password:''
        };
    },
    passwordMin: () => {
        return {
            nama_depan: firstName,
            nama_belakang: lastName,
            level:'user',
            email:email,
            password:'1a'
        };
    },
    passwordMax: () => {
        return {
            nama_depan: firstName,
            nama_belakang: lastName,
            level:'user',
            email:email,
            password:'123456789'
        };
    },

};