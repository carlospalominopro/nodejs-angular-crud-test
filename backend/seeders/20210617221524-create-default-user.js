'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('users', null, {
      truncate: true,
      cascade: true,
    });

    return queryInterface.bulkInsert('users', [
      {
        id : 1,
        username: 'admin',
        password: '$2b$10$Q08DZg63gT.vm5oJOzF0TeS8h5TGvah8qJ9piEVHqM/uYubxoyAJ6' /* contraseña :  123123 */,
        firstName: 'Admin',
        lastName: 'User',
        job: 'Admin',
        salary: 9999,
        entryDate: null,
        roleId: 1,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {
      truncate: true,
      cascade: true,
    });
  }
};
