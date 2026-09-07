# 🎓 Student Course Registration System - Complete Setup Guide

## 📊 Project Overview

Your **Student Course Registration System** is now fully built and ready for deployment!

### ✨ What's Included

**Frontend (React.js)**
- ✅ Student login & registration
- ✅ Browse available courses
- ✅ Register for courses
- ✅ View registered courses
- ✅ Cancel course registrations
- ✅ Admin dashboard with reports
- ✅ Responsive UI with Tailwind CSS

**Backend (Node.js/Express)**
- ✅ JWT authentication
- ✅ Secure password hashing (bcrypt)
- ✅ Course management API
- ✅ Student registration API
- ✅ Admin endpoints with role-based access
- ✅ Comprehensive reporting

**Database (PostgreSQL)**
- ✅ Complete schema with relationships
- ✅ Indexes for performance
- ✅ Automatic initialization

**DevOps**
- ✅ Docker & Docker Compose setup
- ✅ Environment configuration
- ✅ Production-ready Dockerfile

---

## 🚀 Quick Start (5 minutes)

### Using Docker (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/BleixRayz/student-course-registration-system.git
cd student-course-registration-system

# 2. Start with Docker Compose
docker-compose up -d

# 3. Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# Database: localhost:5432
```

### Manual Setup

```bash
# 1. Clone repository
git clone https://github.com/BleixRayz/student-course-registration-system.git
cd student-course-registration-system

# 2. Create .env file
cp .env.example .env

# 3. Install dependencies
npm run install-all

# 4. Setup database
createdb course_registration
psql -U postgres -d course_registration -f server/config/database.sql

# 5. Start development servers
npm run dev
```

---

## 📁 Project Structure

```
student-course-registration-system/
├── server/                    # Express backend
│   ├── config/               # Database configuration
│   ├── routes/               # API endpoints
│   ├── middleware/           # Authentication middleware
│   ├── index.js              # Server entry point
│   └── package.json
│
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   └── App.js            # Main app component
│   └── package.json
│
├── docker-compose.yml        # Docker orchestration
├── Dockerfile                # Production build
├── SETUP.md                  # Setup instructions
├── DEPLOYMENT.md             # Deployment guide
└── README.md                 # Project documentation
```

---

## 🔐 Key Features

### Student Functions
1. **Create Account** - Secure registration with validation
2. **Login** - JWT-based authentication
3. **Browse Courses** - View all available courses with details
4. **Register** - Register for one or multiple courses
5. **Prevent Duplicates** - System prevents double registrations
6. **View Registrations** - See all registered courses
7. **Cancel Registration** - Drop courses when needed

### Administrator Functions
1. **Student Management** - Add, update, delete students
2. **Course Management** - Create and manage courses
3. **Department Management** - Organize courses by department
4. **View Registrations** - See all student registrations
5. **Generate Reports** - 
   - Enrollment by course
   - Courses per student
   - Enrollment statistics

---

## 🔑 Default Test Credentials

### Student Login
```
Email: student@example.com
Password: password123
Student ID: STU001
```

### Admin Login
```
Email: admin@example.com
Password: admin123
```

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Student registration
- `POST /api/auth/admin-register` - Admin registration
- `POST /api/auth/login` - Login (returns JWT token)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `GET /api/courses/:id/enrollment` - Get enrollment info

### Registrations (Student)
- `POST /api/registrations/register` - Register for course
- `GET /api/registrations/my-courses` - Get student's courses
- `POST /api/registrations/cancel/:id` - Cancel registration

### Admin
- `POST /api/admin/courses` - Create course
- `PUT /api/admin/courses/:id` - Update course
- `DELETE /api/admin/courses/:id` - Delete course
- `GET /api/admin/registrations/all` - View all registrations
- `GET /api/admin/reports/enrollment` - Enrollment report
- `GET /api/admin/reports/student-courses` - Student courses report

---

## 🌐 Deployment Options

### Option 1: Railway (Recommended)
**Best for:** Full-stack applications
- Backend: Deploy to Railway Node.js service
- Database: Railway PostgreSQL add-on
- Frontend: Deploy to Vercel
- **Estimated Cost:** $5-10/month
- **Setup Time:** 15 minutes

### Option 2: Heroku
**Best for:** Quick deployment
- Deploy entire stack to single dyno
- PostgreSQL add-on included
- **Cost:** $7-50/month
- **Setup Time:** 10 minutes

### Option 3: Docker on Cloud
**Best for:** Complete control
- AWS ECS, Google Cloud Run, or DigitalOcean App Platform
- Use provided Dockerfile
- **Cost:** Variable
- **Setup Time:** 20-30 minutes

---

## 📋 Deployment Checklist

- [ ] Clone repository
- [ ] Set up database on chosen platform
- [ ] Configure environment variables
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Test all features
- [ ] Set up custom domain
- [ ] Enable HTTPS/SSL
- [ ] Set up monitoring
- [ ] Create backup strategy

---

## 🔧 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@host:5432/course_registration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=course_registration
NODE_ENV=production
PORT=5000
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-api-url.com/api
```

---

## 🧪 Testing the Application

### Test Student Flow
1. Visit http://localhost:3000
2. Click "Register"
3. Create new student account
4. Login with credentials
5. Browse courses
6. Register for a course
7. View registered courses
8. Cancel a registration

### Test Admin Flow
1. Login with admin account
2. Access admin dashboard
3. View enrollment reports
4. View student courses report
5. View all registrations

### API Testing with cURL
```bash
# Health check
curl http://localhost:5000/api/health

# Get all courses
curl http://localhost:5000/api/courses

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"password123"}'
```

---

## 📚 Technology Stack

| Component | Technology | Version |
|-----------|-----------|----------|
| Frontend | React.js | 18.2.0 |
| Styling | Tailwind CSS | 3.3.0 |
| Backend | Node.js/Express | 18/4.18.2 |
| Database | PostgreSQL | 15 |
| Authentication | JWT | 9.0.0 |
| Password Hashing | bcryptjs | 2.4.3 |
| Containerization | Docker | Latest |

---

## 🔐 Security Features

✅ JWT token-based authentication
✅ Password hashing with bcryptjs
✅ CORS protection
✅ Helmet security headers
✅ SQL injection prevention
✅ Role-based access control
✅ Input validation
✅ Environment variable protection

---

## 📊 Database Schema

**Users Table**
- id, name, email, password, role, created_at

**Students Table**
- id, user_id, student_id, created_at

**Departments Table**
- id, name, code, created_at

**Courses Table**
- id, code, name, description, credits, capacity, instructor, department_id, created_at

**Registrations Table**
- id, student_id, course_id, registration_date, status

---

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Port Already in Use
```bash
# Find process on port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### CORS Issues
- Update `FRONTEND_URL` in backend `.env`
- Ensure frontend URL matches CORS configuration

### Dependencies Not Installing
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📈 Next Steps

1. **Local Testing** - Run locally and test all features
2. **Deploy Backend** - Deploy to Railway/Heroku
3. **Deploy Frontend** - Deploy to Vercel
4. **Configure Domain** - Set up custom domain
5. **Enable HTTPS** - Automatic with most platforms
6. **Setup Monitoring** - Monitor logs and performance
7. **Create Backups** - Daily database backups
8. **Add More Features** - Extend as needed

---

## 📖 Documentation Files

- **README.md** - Project overview
- **SETUP.md** - Detailed setup instructions
- **DEPLOYMENT.md** - Production deployment guide
- **This file** - Complete quick reference

---

## 🤝 Support & Contributing

For issues or questions:
1. Check the documentation files
2. Review GitHub issues
3. Check API endpoints
4. Test with provided credentials

---

## 📝 License

MIT License - Feel free to use this project for learning and production!

---

## 🎉 You're All Set!

Your **Student Course Registration System** is complete and ready to deploy!

### Quick Links:
- 📦 Repository: https://github.com/BleixRayz/student-course-registration-system
- 🚀 Deploy Now: Follow DEPLOYMENT.md
- 📚 Learn More: Read SETUP.md and README.md

**Happy Coding! 🚀**
