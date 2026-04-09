// ── Run once to create the admin user ──
// Usage: node server/seedAdmin.js

import mongoose from 'mongoose'
import bcrypt   from 'bcryptjs'
import dotenv   from 'dotenv'
import Student  from './models/Student.js'

dotenv.config()

await mongoose.connect(process.env.MONGO_URI)
console.log('Connected to MongoDB')

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'   // change this!

const existing = await Student.findOne({ username: ADMIN_USERNAME })

if (existing) {
  await Student.updateOne({ username: ADMIN_USERNAME }, { $set: { role: 'admin' } })
  console.log(`✅ "${ADMIN_USERNAME}" promoted to admin`)
} else {
  await Student.create({
    name:     'Admin',
    username: ADMIN_USERNAME,
    password: await bcrypt.hash(ADMIN_PASSWORD, 10),
    role:     'admin',
  })
  console.log(`✅ Admin created — username: ${ADMIN_USERNAME}  password: ${ADMIN_PASSWORD}`)
}

await mongoose.disconnect()
console.log('Done.')
