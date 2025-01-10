const db = require("../models");
const Customer = db.customers;
const Op = db.Sequelize.Op;

// Create and Save a new Customer

exports.dropTable = async (req, res) => {
  try {
    await Customer.drop(); // Drop the table associated with the model
    return res.status(200).send({message: 'Table dropped successfully'});
  } catch (error) {
    return res.status(400).send({message: 'Error dropping table:'});
  }
}
exports.create = (req, res) => {
  const { firstName, lastName, email, address, taxID, tag, userToken } = req.body;

  console.log(req.body);
  // Validate request
  if (!userToken) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Customer.findOne({
    where: { userToken: userToken },
  })
    .then((result) => {
      if (result) {
        // If customer exists, send response early
        return res.status(500).send({
          message: "Already Exists",
          id: result.dataValues.id,
        });
      }

      // If no customer exists, proceed with other logic
      // Create a Customer
      const customer = {
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "no_email",
        address: address || "no_address",
        taxID: taxID || "no_taxID",
        tag: tag || "",
        userToken: userToken ,
      };

      // Save Customer in the database
      Customer.create(customer)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Customer.",
          });
        });
      // Your other code for handling non-existence
      // For example, you might create a new customer here or other logic

      // Finally, you can send a success response if needed
      // res.status(200).send({...});
    })
    .catch((error) => {
      // Handle any unexpected errors
      console.error("Error finding customer:", error);
      res.status(500).send({
        message: "Internal Server Error",
      });
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  const tag = req.query.tag;
  var condition = tag ? { tag: { [Op.like]: `%${tag}%` } } : null;

  Customer.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Customer.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Customer with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Customer with id=" + id,
      });
    });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Customer.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id,
      });
    });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Customer.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Customer was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Customer with id=" + id,
      });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customer.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Customers were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers.",
      });
    });
};
