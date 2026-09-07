# Setup Instructions

## Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/BleixRayz/student-course-registration-system.git
cd student-course-registration-system
```

### 2. Install Dependencies
```bash
# Install all dependencies
npm run install-all
```

### 3. Database Setup

#### Using PostgreSQL
```bash
# Create database
createdb course_registration

# Initialize schema
psql -U postgres -d course_registration -f server/config/database.sql
```

#### Using Docker Compose (Easiest)
```bash
docker-compose up -d
```

### 4. Environment Variables

Create `.env` file in the root directory:
```bash
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/course_registration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=course_registration

# Server
NODE_ENV=development
PORT=5000

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:5000/api
```

### 5. Start Development Server

#### Option A: Run Both Frontend & Backend Together
```bash
npm run dev
```

#### Option B: Run Separately
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

### 6. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Database**: localhost:5432

---

## Testing Credentials

### Student Account
```
Email: student@test.com
Password: password123
Student ID: STU001
```

### Admin Account
```
Email: admin@test.com
Password: admin123
```

**To create admin account:**
```bash
curl -X POST http://localhost:5000/api/auth/admin-register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@test.com",
    "password": "admin123",
    "admin_key": "your_admin_key"
  }'
```

---

## Project Structure

```
student-course-registration-system/
├── server/
│   ├── config/
│   │   ├── database.js
│   │   └── database.sql
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── registrations.js
│   │   ├── students.js
│   │   └── admin.js
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── PrivateRoute.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── StudentDashboard.js
│   │   │   ├── CourseCatalog.js
│   │   │   ├── MyRegistrations.js
│   │   │   └── AdminDashboard.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├─��� Dockerfile
├── DEPLOYMENT.md
├── SETUP.md
├── README.md
├── .env.example
└── .gitignore
```

---

## Troubleshooting

### Database Connection Error
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Dependencies Installation Error
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
Update `FRONTEND_URL` in `.env` to match your frontend URL.

---

## API Documentation

See API endpoints in each route file under `server/routes/`.

---

## Deployment

For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## License

MIT License - See LICENSE file for details
