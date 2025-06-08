import model from '../models/index.js';

const findById = async (userId) => {
  try {
    const user = await model.user.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
      throw new Error(error.message);
  }
}

const existsUsername = async (userName) => {
  try {
    const count = await models.user.countDocuments({ username: userName });
    return count > 0;
  } catch (error) {
    throw new Error('Error checking username existence: ' + error.message);
  }
};

const existsEmail = async (email) => {
  try {
    const count = await models.user.countDocuments({ email: email });
    return count > 0;
  } catch (error) {
    throw new Error('Error checking email existence: ' + error.message);
  }
};


const userService = {
  findById,
  existsUsername,
  existsEmail
};

export default userService;
