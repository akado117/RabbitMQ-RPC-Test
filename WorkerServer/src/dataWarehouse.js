class DataWarehouse {
  constructor() {
    this.users = {}
  }

  saveUser(user) {
    const oldUser =  this.users[user.uuid] || {}
    Object.assign(oldUser, user);
    this.users[user.uuid] = oldUser
  }

  getUsers(userId) {
    if (userId) return { [userId]: this.users[userId] }
    return this.users;
  }
}

const DW = new DataWarehouse();

module.exports = DW;