'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('roles', null, {
      truncate: true,
      cascade: true,
    });
    
    return queryInterface.bulkInsert('roles', [
      {
        id : 1,
        name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id : 2,
        name: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {
      truncate: true,
      cascade: true,
    });
  }
};
