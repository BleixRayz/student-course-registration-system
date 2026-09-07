# Student Course Registration System

## 🚀 Live Deployment Guide

This guide will help you deploy the Student Course Registration System to production.

### Prerequisites
- Node.js (v14+)
- PostgreSQL database
- Git account
- Deployment service account (Vercel, Railway, or Heroku)

---

## Deployment Options

### Option 1: Deploy to Railway (Recommended - Full Stack)

**Backend + Database on Railway**

1. Create a Railway account at https://railway.app
2. Connect your GitHub repository
3. Create a new project
4. Add PostgreSQL service
5. Add Node.js service for the backend
6. Set environment variables:
   ```
   DATABASE_URL=postgresql://...
   JWT_SECRET=your_secret_key
   NODE_ENV=production
   PORT=5000
   ```
7. Deploy!

**Frontend on Vercel**

1. Create a Vercel account at https://vercel.com
2. Import your GitHub repository
3. Set build command: `cd client && npm run build`
4. Set output directory: `client/build`
5. Set environment variable:
   ```
   REACT_APP_API_URL=https://your-railway-backend-url.com/api
   ```
6. Deploy!

---

### Option 2: Deploy to Heroku (Full Stack)

1. Create Heroku account
2. Install Heroku CLI
3. Run these commands:

```bash
heroku login
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production
git push heroku main
```

---

### Option 3: Deploy with Docker

1. Install Docker and Docker Compose
2. Build and run:

```bash
docker-compose up -d
```

3. Database will initialize automatically
4. Access at `http://localhost:3000`

---

## Environment Variables Required

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@host:5432/course_registration
DB_HOST=your_db_host
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=course_registration
NODE_ENV=production
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-url.com
API_URL=https://your-backend-url.com/api
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## Testing the Live Deployment

### 1. Test Backend API
```bash
curl https://your-backend-url.com/api/health
```

### 2. Test Registration
```bash
curl -X POST https://your-backend-url.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "student_id": "STU001"
  }'
```

### 3. Test Login
```bash
curl -X POST https://your-backend-url.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

## Database Setup

The database schema will be automatically created from `server/config/database.sql`.

To manually initialize:

```bash
psql -U postgres -d course_registration -f server/config/database.sql
```

---

## Features Deployed

✅ Student Registration & Login
✅ Browse Available Courses
✅ Register for Courses
✅ View My Registrations
✅ Cancel Course Registrations
✅ Admin Dashboard
✅ Course Management
✅ Student Management
✅ Enrollment Reports
✅ Student Course Reports

---

## Monitoring & Maintenance

- Monitor server logs on your deployment platform
- Check database performance regularly
- Update dependencies periodically
- Backup database daily
- Monitor API response times

---

## Support

For issues:
1. Check server logs
2. Verify environment variables
3. Ensure database connection
4. Check API endpoints

---

## Next Steps

1. Deploy backend to Railway/Heroku
2. Deploy frontend to Vercel
3. Configure custom domain
4. Set up SSL certificates
5. Enable monitoring and logging
6. Create admin account
7. Add sample courses
8. Test all features

**Your application will be live! 🎉**
