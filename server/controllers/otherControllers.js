import Employee from '../db/employee.model.js';

export const getStatistics = async (req, res, next) => {
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
};

export const getSuperheros = async (req, res, next) => {
  let heros = await Employee.find({ position: 'Superhero' });
  res.json(heros);
};

export const getSearchQuery = async (req, res, next) => {
  const userInput = req.params.query;
  const regex = new RegExp(userInput, 'i');
  const employees = await Employee.find({ name: regex });
  res.json(employees);
};
