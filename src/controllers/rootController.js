import User from '../models/User.js';
import Exercise from '../models/Exercise.js';

export async function getAllUsers(req, res) {
  const allUsers = await User.find({});
  res.json(allUsers);
}

export async function postUser(req, res) {
  const username = req.body.username;

  try {
    const newUser = await new User({
      username: username
    }).save();
    res.json({
      username: username,
      _id: newUser._id
    });
  } catch (error) {
    if (error.code == 11000) {
      res.send("Username already taken");
    } else {
      res.json(error);
    }
  }
}

export async function postExercise(req, res) {
  const id = req.params._id;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date;

  let formatedDate = new Date(Date.now());

  if (date) {
    try {
      const newDate = new Date(date);
      formatedDate = newDate;
    } catch (error) {
      formatedDate = error
    }
  }

  try {
    const findUser = await User.findOne({
      _id: id
    });
    const newExercise = await new Exercise({
      user: findUser._id,
      description: description,
      duration: duration,
      date: formatedDate
    }).save();
    const exerciseJson = {
      username: findUser.username,
      description: newExercise.description,
      duration: newExercise.duration,
      _id: findUser._id,
      date: new Date(newExercise.date).toDateString()
    }
    res.json(exerciseJson);
  } catch (error) {
    res.json(error.message);
  }
}

export async function getExercises(req, res) {
  const id = req.params._id;
  let fromQuery = req.query.from;
  let toQuery = req.query.to;
  let limit = req.query.limit;
  let count = 0

  try {
    let Query = {
      user: id
    }
    if (fromQuery || toQuery) {
      Query.date = {}
    }
    if (fromQuery) {
      Query.date.$gte = new Date(fromQuery).toDateString()
    }
    if (toQuery) {
      Query.date.$lte = new Date(toQuery).toDateString()
    }

    const findUser = await User.findOne({
      _id: id
    });
    const singleExercise = await Exercise.find(Query).sort({
      date: -1
    });
    const ExerciseObj = {
      _id: findUser._id,
      username: findUser.username,
      count: count,
      log: []
    };
    if (limit > singleExercise.length || !limit) {
      limit = singleExercise.length
    }
    for (let i = 0; i < limit; i++) {
      ExerciseObj.count = i + 1;
      ExerciseObj.log.push({
        description: singleExercise[i].description,
        duration: singleExercise[i].duration,
        date: new Date(singleExercise[i].date).toDateString()
      });
    }
    res.json(ExerciseObj);
  } catch (error) {
    res.json(error.message);
  }
}