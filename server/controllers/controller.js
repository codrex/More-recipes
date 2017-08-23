

module.exports = {
  // filters an object
  objectFilter: (outputFormat, jsonObject) => Object.keys(outputFormat)
  .reduce((acc, currentValue) => {
    if (currentValue in jsonObject) {
      return Object.assign(acc, { [currentValue]: jsonObject[currentValue] });
    }
    return acc;
  }, {}),

// checks if an email already exist in the database
  checkEmailExistance: (createUserRecord, req, res, objToReturn, model) => {
    model.findById(req.body.id)
  .then(returnObj => {
    if (returnObj !== null) {
      res.status(400).send({ error: 'Email is already in use' });
    }
    createUserRecord(req, res, objToReturn);
  })
  .catch(error => error);
  },
// creates a record in the database
  createRecord: (targetModel, jsonObject) =>
    new Promise((resolve, reject) => {
      targetModel.create(jsonObject)
    .then(createdModel => {
      resolve(createdModel);
    })
    .catch(error => reject(error));
    }),

// deletes a record from table
  deleteRecord: (targetModel, where) => new Promise((resolve, reject) => {
    targetModel.destroy({
      where,
    }).then(numOfDeletedRow => {
      if (numOfDeletedRow === 1) {
        resolve(true);
      }
    }).catch(reject(false));
  }),

// updates record in the database
  updateRecord: (targetModel, where) => new Promise((resolve, reject) => {
    targetModel.update({
      where,
    }).then(numOfDeletedRow => {
      if (numOfDeletedRow > 0) {
        resolve({ success: true });
      } else {
        resolve({ error: 'nothing to update' });
      }
    }).catch(reject({ error: false }));
  }),

};
