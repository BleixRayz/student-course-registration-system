# Student Course Registration System

A comprehensive web-based platform for managing student course registrations with secure authentication, course management, and administrative features.

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
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Deployment**: Vercel/Railway

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
├── server/                 # Express backend
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── controllers/
│   └── index.js
├── .env.example
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)

### Installation

1. Clone the repository
```bash
git clone https://github.com/BleixRayz/student-course-registration-system.git
cd student-course-registration-system
```

2. Install dependencies
```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

3. Create `.env` file
```bash
cp .env.example .env
```

4. Configure environment variables
```
DATABASE_URL=postgresql://user:password@localhost:5432/course_registration
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
PORT=5000
```

5. Run the application
```bash
npm run dev
```

## Deployment

### Deploy to Vercel (Frontend)
```bash
cd client
npm install -g vercel
vercel
```

### Deploy to Railway (Backend + Database)
1. Connect GitHub repository to Railway
2. Set environment variables
3. Deploy

## License

MIT License
