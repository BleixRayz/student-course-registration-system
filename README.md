# <span style="color: green;">Kampala International University</span> Student Course Registration System

A comprehensive web-based platform for managing student course registrations with secure authentication, course management, and administrative features.

---

## 🚀 Live Application

| Platform | Link |
|----------|------|
| **Frontend (Vercel)** | Coming Soon - [Deploy Now](https://vercel.com/new/clone?repository-url=https://github.com/BleixRayz/student-course-registration-system) |
| **Backend (Railway)** | Coming Soon - [Deploy Now](https://railway.app/new/template?repo=https://github.com/BleixRayz/student-course-registration-system) |
| **GitHub Repository** | [BleixRayz/student-course-registration-system](https://github.com/BleixRayz/student-course-registration-system) |

---

## Features

### Student Functions
- Secure account creation and login
- View available courses
- Register for one or more courses
- Prevent duplicate course registrations
- View registered courses
- Cancel course registrations

### Administrator Functions
- Manage student records (add, update, delete)
- Manage courses (add, update, delete)
- Manage academic departments
- View all student registrations
- Generate comprehensive reports

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Python, Flask
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Deployment**: Vercel (Frontend) / Railway (Backend)

## Project Structure

```
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── App.js
│   ├── Dockerfile
│   └── package.json
├── backend/                # Python Flask backend
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── tests/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── Procfile
│   └── config.py
├── .github/
│   └── workflows/          # CI/CD workflows
├── docker-compose.yml
├── .env.example
├── DEPLOYMENT.md
├── GITHUB_SECRETS.md
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.9+)
- PostgreSQL (v12+)
- Docker (optional)

### Local Installation

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Backend will run at: `http://localhost:5000`

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

Frontend will run at: `http://localhost:3000`

### Docker Setup
```bash
docker-compose up
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 5000
- Frontend app on port 3000

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/change-password` - Change password

### Student Endpoints
- `GET /api/students` - Get all students (admin only)
- `GET /api/students/<id>` - Get specific student
- `POST /api/students` - Create student (admin only)
- `PUT /api/students/<id>` - Update student (admin only)
- `DELETE /api/students/<id>` - Delete student (admin only)

### Course Endpoints
- `GET /api/courses` - Get all courses
- `GET /api/courses/<id>` - Get specific course
- `POST /api/courses` - Create course (admin only)
- `PUT /api/courses/<id>` - Update course (admin only)
- `DELETE /api/courses/<id>` - Delete course (admin only)

### Registration Endpoints
- `GET /api/registrations` - Get user's registrations
- `POST /api/registrations` - Register for course
- `DELETE /api/registrations/<id>` - Drop course
- `PUT /api/registrations/<id>/grade` - Update grade (admin only)

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

### Quick Deploy to Vercel (Frontend)
```bash
cd frontend
npm install -g vercel
vercel
```

### Quick Deploy to Railway (Backend)
1. Go to [Railway](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Connect your repository
5. Follow the setup wizard

### GitHub Secrets Configuration

For automated deployment, see [GITHUB_SECRETS.md](GITHUB_SECRETS.md)

## Database Schema

The system uses the following main tables:
- **users** - Authentication users
- **students** - Student information
- **courses** - Course catalog
- **registrations** - Course registrations

## Environment Variables

See `.env.example` for all required environment variables:
```
FLASK_ENV=development
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:password@localhost:5432/student_registration
REACT_APP_API_URL=http://localhost:5000/api
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and support:
- Open an issue on [GitHub Issues](https://github.com/BleixRayz/student-course-registration-system/issues)
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- See [GITHUB_SECRETS.md](GITHUB_SECRETS.md) for CI/CD setup

---

**Built with ❤️ for Kampala International University**
