module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    taxID: {
      type: Sequelize.STRING
    },
    tag: {
      type: Sequelize.STRING
    },
  });

  return Customer;
};
