'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    nama_depan: DataTypes.STRING,
    nama_belakang: DataTypes.STRING,
    level: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  user.associate = function(models) {
    // associations can be defined here
    };

  return user;
};