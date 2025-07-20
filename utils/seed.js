const bcrypt = require('bcrypt');
const { Admin } = require('../models');

const DEFAULT_ADMIN = {
  username: process.env.DEFAULT_ADMIN_USER || 'admin',
  password: process.env.DEFAULT_ADMIN_PASS || 'admin123'
};

async function createAdminUser() {
  try {
    const existing = await Admin.findOne({ where: { username: DEFAULT_ADMIN.username } });
    if (existing) {
      // Admin already exists
      return;
    }
    const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.password, 10);
    await Admin.create({
      username: DEFAULT_ADMIN.username,
      password: hashedPassword
    });
    console.log(`Default admin user created: ${DEFAULT_ADMIN.username}`);
    console.log(`(Change the password immediately in production!)`);
  } catch (err) {
    console.error('Error creating default admin user:', err);
  }
}

module.exports = { createAdminUser };
