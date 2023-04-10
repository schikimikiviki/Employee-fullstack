const express = require('express');
const router = express.Router();

const Employee = require('../db/employee.model');

router.get('/statistics', async (req, res, next) => {
  try {
    let totalCount = await Employee.countDocuments();
    let juniorCount = await Employee.find({ level: 'Junior' }).countDocuments();
    let mediorCount = await Employee.find({ level: 'Medior' }).countDocuments();
    let seniorCount = await Employee.find({ level: 'Senior' }).countDocuments();
    let expertCount = await Employee.find({ level: 'Expert' }).countDocuments();
    let godlikeCount = await Employee.find({
      level: 'Godlike',
    }).countDocuments();

    res.json({
      total: totalCount,
      byLevel: {
        Junior: juniorCount,
        Medior: mediorCount,
        Senior: seniorCount,
        Expert: expertCount,
        Godlike: godlikeCount,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/superheros', async (req, res) => {
  let heros = await Employee.find({ position: 'Superhero' });
  res.json(heros);
});

router.get('/:search', async (req, res) => {
  let searchName = req.params.search.replace(/%20/g, ' ');

  let regex = new RegExp(searchName, 'i');
  let foundName = await Employee.find({ name: { $regex: regex } });
  res.json(foundName);
});

module.exports = router;
