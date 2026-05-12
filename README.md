# Manobseba - Fund Management System

A sophisticated Fund Management System built with React (Frontend), Tailwind CSS, and Laravel (Backend API). Designed specifically for community fund management with donations, distributions, member tracking, and announcements.

## 🎨 Design Specifications

### Color Palette
- **Primary Green**: #2D8A56
- **Light Mint Background**: #F0F9F4
- **White Cards**: #FFFFFF
- **Slate Gray Text**: #64748B

### Typography
- **Font**: Inter or Outfit (Modern Sans-serif)
- **Weight Variations**: 300, 400, 500, 600, 700

### UI Style
- Minimalist design
- Soft shadows (shadow-soft)
- Rounded corners (rounded-xl)
- High-quality Lucide icons

## 📁 Project Structure

```
manobsheba/
├── frontend/                 # React Frontend Application
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── layouts/         # Layout components
│   │   ├── api/             # API client
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json         # Frontend dependencies
│   ├── tailwind.config.js   # Tailwind configuration
│   ├── vite.config.js       # Vite configuration
│   └── index.html           # HTML template
│
└── backend/                  # Laravel Backend API
    ├── app/
    │   ├── Models/          # Database models
    │   └── Http/Controllers/Api/  # API controllers
    ├── database/
    │   └── migrations/      # Database migrations
    ├── routes/
    │   └── api.php          # API routes
    ├── composer.json        # PHP dependencies
    ├── .env.example         # Environment example
    └── config/              # Configuration files
```

## 🚀 Frontend Setup

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser

### Installation

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Backend Setup

### Prerequisites
- PHP 8.1+
- Composer
- MySQL 5.7+
- Git

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Generate application key:
```bash
php artisan key:generate
```

4. Configure database in `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=manobseba
DB_USERNAME=root
DB_PASSWORD=
```

5. Install PHP dependencies:
```bash
composer install
```

6. Run migrations:
```bash
php artisan migrate
```

7. Start Laravel development server:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

## 📋 Core Features

### 1. Authentication Page
- **Split-screen layout**
- Left side: Solid green with branding and features
- Right side: Clean white login card
- "Sign in as Member" action
- Password visibility toggle
- Error handling

### 2. Main Dashboard
- **Sidebar**: Fixed navigation with active state highlighting
- **Top Navbar**: Search bar, notifications, user profile with avatar
- **Stats Row**: 4 summary cards
  - Total Fund (৳) = Total Donations - Total Distributions
  - Total Members
  - Monthly Donation (৳)
  - Total Distribution (৳)
- **Charts**: Income vs Expense area chart
- **Quick Actions**: Common tasks
- **Recent Activities**: Full-width table with status badges

### 3. Members Page
- Data table with filtering
- Filter by village and status (Active/Inactive)
- Search functionality
- Sortable columns
- View member details

### 4. Donations Page
- **Left**: "Record New Donation" form
  - Member selection
  - Amount input
  - Payment method (Cash, bKash, Nagad)
  - Date picker
  - Notes
- **Right**: "Donation History" table
  - Receipt IDs
  - Donor names
  - Amounts
  - Payment methods
  - Dates
  - Search and filter options

### 5. Distributions Page
- Program list with collapsible details
- Status badges (Pending, In Progress, Completed)
- Progress bars showing spend status
- Total budget and spent display
- Recipient drill-down list
- Action buttons for editing

### 6. Notice Board
- **Form**: Post new announcements
  - Title input
  - Content textarea
  - Priority levels (High, Medium, Low)
- **Feed**: Active announcements with colors by priority
- Archive section for inactive notices
- Delete functionality

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register         - Register new user
POST   /api/auth/login            - Login user
POST   /api/auth/logout           - Logout user (Protected)
GET    /api/auth/me               - Get current user (Protected)
PUT    /api/auth/profile          - Update profile (Protected)
```

### Members
```
GET    /api/members               - List all members (Protected)
POST   /api/members               - Create member (Protected)
GET    /api/members/{id}          - Get member details (Protected)
PUT    /api/members/{id}          - Update member (Protected)
DELETE /api/members/{id}          - Delete member (Protected)
GET    /api/members/village/{village} - Filter by village (Protected)
GET    /api/statistics/active-members  - Get active count (Protected)
```

### Donations
```
GET    /api/donations             - List all donations (Protected)
POST   /api/donations             - Record donation (Protected)
GET    /api/donations/{id}        - Get donation details (Protected)
PUT    /api/donations/{id}        - Update donation (Protected)
DELETE /api/donations/{id}        - Delete donation (Protected)
GET    /api/donations/method/{method} - Filter by method (Protected)
GET    /api/statistics/total-donations - Total amount (Protected)
GET    /api/statistics/monthly-donations - Monthly breakdown (Protected)
```

### Distributions
```
GET    /api/distributions         - List all programs (Protected)
POST   /api/distributions         - Create program (Protected)
GET    /api/distributions/{id}    - Get program details (Protected)
PUT    /api/distributions/{id}    - Update program (Protected)
DELETE /api/distributions/{id}    - Delete program (Protected)
POST   /api/distributions/{id}/recipients - Add recipient (Protected)
GET    /api/statistics/total-distributed - Total spent (Protected)
GET    /api/statistics/fund-calculation  - Calculate total fund (Protected)
```

### Notices
```
GET    /api/notices               - List all notices (Protected)
POST   /api/notices               - Post notice (Protected)
GET    /api/notices/{id}          - Get notice details (Protected)
PUT    /api/notices/{id}          - Update notice (Protected)
DELETE /api/notices/{id}          - Delete notice (Protected)
GET    /api/notices/active/list   - Get active notices (Protected)
PATCH  /api/notices/{id}/toggle-active - Toggle active status (Protected)
```

## 📊 Database Schema

### Users Table
- id, name, email, password, role, is_active, email_verified_at, remember_token, timestamps

### Members Table
- id, user_id, name, email, phone, village, address, status, join_date, total_contribution, notes, timestamps

### Donations Table
- id, member_id, receipt_id, amount, payment_method, notes, donation_date, recorded_by, timestamps

### Distributions Table
- id, program_name, description, status, total_budget, total_spent, total_recipients, start_date, end_date, created_by, timestamps

### Distribution Recipients Table
- id, distribution_id, member_id, amount_distributed, remarks, distributed_date, distributed_by, timestamps

### Notices Table
- id, title, content, priority, is_active, posted_by, published_date, expires_at, timestamps

## 🔐 Authentication

The system uses Laravel Sanctum for API authentication:
- Login returns a bearer token
- Token must be included in `Authorization: Bearer {token}` header
- Tokens are stored in localStorage on the frontend
- Auto-logout on 401 responses

## 📱 Responsive Design

All components are fully responsive:
- Mobile-first approach
- Tailwind CSS breakpoints (sm, md, lg, xl)
- Mobile sidebar toggle
- Touch-friendly UI elements

## 🎯 Key Business Logic

### Total Fund Calculation
```
Total Fund = Total Donations - Total Distributions
```

This is calculated in real-time through the `/api/statistics/fund-calculation` endpoint.

### Member Contribution Tracking
- Automatically updated when donations are recorded
- Updated when donations are modified or deleted
- Visible in member profile

### Distribution Progress
- Percentage calculated: (total_spent / total_budget) × 100
- Remaining budget calculated: total_budget - total_spent
- Progress bar color changes based on spend percentage

## 🔒 Security Features

- CORS enabled for frontend domain
- API token-based authentication
- Role-based authorization (Admin/Member)
- Password hashing with Laravel's Hash facade
- CSRF protection (for web routes)
- Email validation
- Input validation on all endpoints

## 📦 Dependencies

### Frontend
- react@18.2.0
- react-router-dom@6.20.0
- axios@1.6.0
- tailwindcss@3.3.0
- lucide-react@0.294.0
- vite@5.0.0

### Backend
- Laravel@11.0
- laravel/sanctum@4.0
- PHP@8.1+
- MySQL@5.7+

## 🚦 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced reporting and analytics
- [ ] PDF receipt generation
- [ ] SMS notifications
- [ ] Multi-language support
- [ ] Two-factor authentication
- [ ] Audit logging
- [ ] Monthly statements export
- [ ] Mobile app

## 📝 License

This project is proprietary and built for Manobseba Fund Management.

## 👥 Contributing

For contributions and suggestions, please contact the development team.

## 📧 Support

For issues and support, please reach out to the support team.

---

**Made with ❤️ for community fund management**
