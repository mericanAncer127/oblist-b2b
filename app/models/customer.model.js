module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define('customer', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: true,  // Ensures the field is not null
      validate: {
        notEmpty: true,   // Ensures it's not an empty string
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,  // Ensures the email is unique
      validate: {
        isEmail: true,  // Validates if it's a valid email format
      }
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,  // Optional field
    },
    taxID: {
      type: Sequelize.STRING,
      allowNull: true,  // Optional field
      unique: true,  // Ensures the taxID is unique if provided
    },
    tag: {
      type: Sequelize.STRING,
      allowNull: true,  // Optional field
    },
    userToken: {
      type: Sequelize.STRING,
      allowNull: false,  // Optional field
    }
  }, {
    tableName: 'customers',  // Ensures the table name is plural (optional, Sequelize does this by default)
    timestamps: true,  // Sequelize will automatically manage createdAt and updatedAt
    underscored: true,  // Converts camelCase column names to snake_case (e.g., firstName -> first_name)
  });

  return Customer;
};
