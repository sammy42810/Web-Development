import bcrypt from 'bcryptjs';
import {users} from '../config/mongoCollections.js';
import {checkName, checkUsername, checkPassword} from '../helpers.js';

const SALT_ROUNDS = 12;

const withoutPassword = (user) => {
  return {
    _id: user._id.toString(),
    name: user.name,
    username: user.username
  };
};

export const createUser = async (name, username, password) => {
  name = checkName(name);
  username = checkUsername(username);
  password = checkPassword(password);

  const userCollection = await users();

  const existing = await userCollection.findOne({username});
  if (existing) throw {status: 400, error: 'A user with that username already exists'};

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = {name, username, password: hashed};

  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw {status: 500, error: 'Could not create user'};

  return withoutPassword({...newUser, _id: insertInfo.insertedId});
};

export const checkUserLogin = async (username, password) => {
  username = checkUsername(username);
  password = checkPassword(password);

  const userCollection = await users();
  const user = await userCollection.findOne({username});

  if (!user) throw {status: 400, error: 'Either the username or password is invalid'};

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw {status: 400, error: 'Either the username or password is invalid'};

  return withoutPassword(user);
};
