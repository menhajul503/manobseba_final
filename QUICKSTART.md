# Quick Start Guide - Manobseba

This guide will help you get the Manobseba Fund Management System up and running quickly.

## ⚡ Quick Start (5 minutes)

### Frontend Setup

```bash
# 1. Navigate to frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

✅ Frontend running at: `http://localhost:5173`

### Backend Setup

```bash
# 1. Navigate to backend folder
cd backend

# 2. Copy environment file
cp .env.example .env

# 3. Install dependencies
composer install

# 4. Generate app key
php artisan key:generate

# 5. Create database (MySQL must be running)
# Edit .env first and set DB_DATABASE=manobseba, DB_USERNAME, DB_PASSWORD

# 6. Run migrations to create tables
php artisan migrate

# 7. Start Laravel server
php artisan serve
```

✅ Backend running at: `http://localhost:8000`

## 🔧 Database Setup

### Create MySQL Database

```sql
CREATE DATABASE manobseba;
CREATE USER 'manobseba'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON manobseba.* TO 'manobseba'@'localhost';
FLUSH PRIVILEGES;
```

### Configure .env

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=manobseba
DB_USERNAME=manobseba
DB_PASSWORD=password
```

## 🧪 Test the Setup

### 1. Frontend Check
- Open `http://localhost:5173`
- You should see the Manobseba login page
- Check if styles are loaded (green theme visible)

### 2. Backend Check
- Visit `http://localhost:8000/api/health`
- Should return: `{"status":"ok"}`

### 3. Test API
```bash
# Test login endpoint
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

## 📚 Project Structure

```
manobsheba/
├── frontend/
│   ├── src/
│   │   ├── pages/           (Dashboard, Members, Donations, etc.)
│   │   ├── components/      (Reusable UI components)
│   │   ├── layouts/         (Page layouts)
│   │   └── api/             (API client)
│   └── package.json
│
└── backend/
    ├── app/
    │   ├── Models/          (Database models)
    │   └── Http/Controllers/(API logic)
    ├── database/
    │   └── migrations/      (Database structure)
    ├── routes/
    │   └── api.php          (API endpoints)
    └── composer.json
```

## 🎯 Default Pages

### Frontend Routes
- `/login` - Authentication
- `/` - Dashboard
- `/members` - Members management
- `/donations` - Donations tracking
- `/distributions` - Distribution programs
- `/notices` - Notice board

## 🔑 API Base URL

The frontend is configured to call:
```
http://localhost:8000/api
```

This is set in `frontend/src/api/client.js`

## 📱 Login

### Sample Credentials
After running migrations, you can create a user:

```bash
# Access Laravel Tinker
php artisan tinker

# Create a user
User::create([
    'name' => 'Admin User',
    'email' => 'admin@example.com',
    'password' => Hash::make('password'),
    'role' => 'admin',
    'is_active' => true
]);
```

Then login with:
- **Email**: admin@example.com
- **Password**: password

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Frontend using different port
npm run dev -- --port 3000

# Backend using different port
php artisan serve --port 8001
```

### CORS Errors
The backend already has CORS configured for `localhost:5173`. If you change the port:
1. Edit `backend/.env`
2. Update `SANCTUM_STATEFUL_DOMAINS=localhost:5173` to your frontend URL

### Database Connection Failed
```bash
# Test MySQL connection
mysql -u root -p manobseba

# Check .env file
cat .env | grep DB_
```

### Migrations Not Running
```bash
# Reset database (WARNING: deletes all data)
php artisan migrate:fresh

# See migration status
php artisan migrate:status
```

## 📖 Next Steps

1. **Explore Dashboard** - See all features
2. **Create Members** - Add community members
3. **Record Donations** - Track fund contributions
4. **Create Programs** - Set up distribution programs
5. **Post Notices** - Share announcements

## 🚀 Production Deployment

### Frontend Build
```bash
cd frontend
npm run build
# Output: dist/ folder ready for deployment
```

### Backend Deployment
```bash
cd backend
composer install --no-dev
php artisan migrate --force
php artisan config:cache
php artisan route:cache
```

## 📞 Support

For issues:
1. Check the error message
2. Review console logs (Frontend Dev Tools)
3. Check Laravel logs: `storage/logs/laravel.log`
4. Run tests and migrations again

## 🎨 Customization

### Change Colors
Edit `frontend/tailwind.config.js`:
```js
colors: {
  primary: {
    green: "#YOUR_COLOR",
    light: "#YOUR_COLOR",
    dark: "#YOUR_COLOR"
  }
}
```

### Change API URL
Edit `frontend/src/api/client.js`:
```js
const API_BASE_URL = 'http://your-api-url/api'
```

---

**You're all set! Happy coding! 🎉**
