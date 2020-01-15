import bcrypt from 'bcryptjs';
import db from '../../data/db-config';

// find
const find = () => {
  return db('users').select('id', 'username');
}

// findBy
const findBy = (filter) => {
  return db('users')
    .where(filter)
    .select('id', 'username', 'password');
}

// add
const add = async (user) => {
  user.password = await bcrypt.hash(user.password, 13);

  const [id] = await db('users')
    .insert(user);

  return findById(id);
}

// findById
const findById = (id) => {
  return db('users')
    .where({ id })
    .first('id', 'username');
}

module.exports = {
  find,
  findBy,
  add,
  findById
}