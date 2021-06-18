'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Role, {foreignKey: 'id', sourceKey : 'roleId'})      
    }
  };

  User.init({
    username : {
      type : DataTypes.STRING,
      unique : true
    },
    password: DataTypes.TEXT,
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    job: DataTypes.TEXT,
    salary: DataTypes.DECIMAL,
    entryDate: DataTypes.DATE,
    roleId: DataTypes.INTEGER,
    statusId : DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });

  User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }

  return User;
};