'use strict';
const DayJS = require('dayjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('approvers', [
      {
        // user_id: 0,
        mobile_number: "09856346185",
        first_name: "DEVTESTQD",
        middle_name: "",
        last_name: "QDTEST",
        suffix: "",
        email: "jonalyn.mobilla@mlhuillier.com",
        level: 1,
        role_id: 0,
        createdAt: DayJS(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: DayJS(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        // user_id: 0,
        mobile_number: "09071152272",
        first_name: "JONALYN",
        middle_name: "MOBILLA",
        last_name: "TAKAHASHI",
        suffix: "",
        email: "jonalyn.mobilla@mlhuillier.com",
        level: 2,
        role_id: 0,
        createdAt: DayJS(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: DayJS(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
     ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('approvers', null, {});
  }
};
