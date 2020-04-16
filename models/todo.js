'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    title: DataTypes.STRING,
    iduser: DataTypes.INTEGER
  }, {});
  todo.associate = function(models) {
    todo.belongsTo(models.user,{
      foreignKey:'iduser',
      as: 'user',
    });
  };
  return todo;
};