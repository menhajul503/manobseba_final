# Architecture Documentation

## System Architecture

Manobseba is built with a modern, scalable architecture using:

### Frontend (React + Tailwind CSS)
- **Framework**: React 18 with Functional Components
- **Styling**: Tailwind CSS with custom configuration
- **Routing**: React Router v6
- **State Management**: React Hooks (useState, useContext)
- **HTTP Client**: Custom Axios-based API client
- **Build Tool**: Vite for fast development

### Backend (Laravel)
- **Framework**: Laravel 11
- **API**: RESTful API with JSON responses
- **Authentication**: Laravel Sanctum (Token-based)
- **Database**: MySQL 5.7+
- **ORM**: Eloquent

## Directory Structure

### Frontend Structure
```
src/
├── pages/              # Full-page components
│   ├── LoginPage.jsx   # Authentication page
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Members.jsx     # Members management
│   ├── Donations.jsx   # Donations tracking
│   ├── Distributions.jsx # Distribution programs
│   └── NoticeBoard.jsx # Announcements
│
├── components/         # Reusable UI components
│   ├── Sidebar.jsx     # Navigation sidebar
│   ├── Navbar.jsx      # Top navigation bar
│   ├── StatCard.jsx    # Statistics card
│   ├── RecentActivities.jsx
│   ├── IncomeVsExpenseChart.jsx
│   └── QuickActions.jsx
│
├── layouts/           # Layout wrappers
│   ├── AuthLayout.jsx
│   └── DashboardLayout.jsx
│
├── api/
│   └── client.js      # API client configuration
│
├── hooks/
│   └── useApi.js      # Custom API hook
│
├── utils/
│   └── helpers.js     # Utility functions
│
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

### Backend Structure
```
app/
├── Models/            # Database models
│   ├── User.php
│   ├── Member.php
│   ├── Donation.php
│   ├── Distribution.php
│   ├── DistributionRecipient.php
│   └── Notice.php
│
└── Http/Controllers/Api/
    ├── AuthController.php
    ├── MemberController.php
    ├── DonationController.php
    ├── DistributionController.php
    └── NoticeController.php

database/
├── migrations/        # Database structure
│   ├── 2024_01_01_000001_create_users_table.php
│   ├── 2024_01_01_000002_create_members_table.php
│   ├── 2024_01_01_000003_create_donations_table.php
│   ├── 2024_01_01_000004_create_distributions_table.php
│   ├── 2024_01_01_000005_create_distribution_recipients_table.php
│   └── 2024_01_01_000006_create_notices_table.php
│
└── seeders/
    └── DatabaseSeeder.php

routes/
├── api.php            # API routes
└── web.php            # Web routes
```

## Data Flow

### Authentication Flow
```
1. User submits login form
   ↓
2. Frontend sends POST /api/auth/login
   ↓
3. Backend validates credentials
   ↓
4. Backend returns Bearer token
   ↓
5. Frontend stores token in localStorage
   ↓
6. Redirect to Dashboard
```

### API Request Flow
```
1. Component calls useApi() or apiClient.get()
   ↓
2. Request includes Authorization: Bearer {token}
   ↓
3. Backend validates token with Sanctum
   ↓
4. Controller processes request
   ↓
5. Database query via Eloquent
   ↓
6. Response returned as JSON
   ↓
7. Frontend updates component state
```

## Database Schema

### Users Table
Stores user accounts with roles and permissions.
```
- id (PK)
- name
- email (UNIQUE)
- password (hashed)
- role (admin/member)
- is_active
- timestamps
```

### Members Table
Community members information.
```
- id (PK)
- user_id (FK → Users)
- name
- email
- phone
- village
- address
- status (Active/Inactive)
- join_date
- total_contribution
- notes
- timestamps
```

### Donations Table
Fund donations tracking.
```
- id (PK)
- member_id (FK → Members)
- receipt_id (UNIQUE)
- amount
- payment_method (Cash/bKash/Nagad)
- notes
- donation_date
- recorded_by (FK → Users)
- timestamps
```

### Distributions Table
Distribution programs.
```
- id (PK)
- program_name
- description
- status (Pending/In Progress/Completed)
- total_budget
- total_spent
- total_recipients
- start_date
- end_date
- created_by (FK → Users)
- timestamps
```

### Distribution Recipients Table
Tracks who receives distributions.
```
- id (PK)
- distribution_id (FK → Distributions)
- member_id (FK → Members)
- amount_distributed
- remarks
- distributed_date
- distributed_by (FK → Users)
- timestamps
```

### Notices Table
Announcements and notices.
```
- id (PK)
- title
- content
- priority (Low/Medium/High)
- is_active
- posted_by (FK → Users)
- published_date
- expires_at
- timestamps
```

## API Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": {
    "data": [],
    "links": {},
    "meta": {
      "current_page": 1,
      "per_page": 15,
      "total": 100
    }
  }
}
```

## Authentication & Authorization

### Token-Based Authentication
- Uses Laravel Sanctum
- Tokens are stored in HTTP-only cookies or localStorage
- Token included in Authorization header: `Authorization: Bearer {token}`
- Tokens automatically revoked on logout

### Role-Based Access Control
- **Admin**: Full system access
- **Member**: Limited access (own profile, donations, notices)

## Key Business Logic

### Total Fund Calculation
```
Total Fund = ∑(Donations.amount) - ∑(Distributions.total_spent)
```
Calculated in real-time via `/api/statistics/fund-calculation`

### Donation Recording
1. User selects member and enters amount
2. Frontend calls `POST /api/donations`
3. Backend creates donation record
4. Member's `total_contribution` is automatically updated
5. Response includes receipt ID

### Distribution Management
1. Admin creates distribution program
2. Sets budget and start date
3. Adds members as recipients with amounts
4. Tracks spending and updates status
5. Shows progress percentage

### Member Contribution Tracking
- Automatically updated when donations are added/modified/deleted
- Visible in member profile
- Used for statistics and reporting

## Frontend Components

### StatCard Component
Displays key metrics with icon and trend.
- Props: title, value, currency, change, icon, colors
- Shows percentage change from previous period

### RecentActivities Component
Table displaying recent transactions.
- Props: activities array
- Shows type, description, amount, date, status
- Color-coded badges for different types

### IncomeVsExpenseChart Component
Bar chart showing income vs expense trends.
- Displays last 5 months
- Shows percentage and amounts
- Responsive design

## Performance Optimization

### Frontend
- Code splitting with React Router
- Lazy loading of components
- Memoization of expensive computations
- Debounced search inputs

### Backend
- Database indexing on frequently queried columns
- Pagination for large datasets (15-20 items per page)
- Query optimization with eager loading
- Response caching where applicable

## Security Considerations

### Frontend
- XSS protection through React's built-in escaping
- CSRF token in CORS requests
- Secure token storage
- Input validation on forms

### Backend
- Input validation and sanitization
- SQL injection prevention via Eloquent
- Password hashing with bcrypt
- Rate limiting on auth endpoints
- CORS configuration for specific domains

## Deployment

### Frontend Deployment
1. Build: `npm run build`
2. Output: `dist/` folder
3. Deploy to static hosting (Netlify, Vercel, etc.)
4. Update API_BASE_URL in production

### Backend Deployment
1. Install dependencies: `composer install --no-dev`
2. Run migrations: `php artisan migrate --force`
3. Set up environment variables
4. Cache configuration: `php artisan config:cache`
5. Deploy to server (AWS, DigitalOcean, Heroku, etc.)

## Development Workflow

### Feature Development
1. Create feature branch
2. Implement backend API
3. Test with Postman/Insomnia
4. Implement frontend components
5. Test E2E
6. Create pull request

### Code Style
- Frontend: Standard JavaScript (Prettier/ESLint ready)
- Backend: PSR-12 PHP standard
- Both use 2-space indentation

## Monitoring & Logging

### Frontend
- Console logs for debugging
- Error boundaries for crash handling
- Network tab in DevTools

### Backend
- Laravel logs: `storage/logs/laravel.log`
- Query debugging: Laravel Debugbar
- Request/Response logging via middleware

## Future Enhancements

- [ ] Real-time notifications with WebSockets
- [ ] Advanced analytics dashboard
- [ ] PDF report generation
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Two-factor authentication
- [ ] Audit logging
- [ ] SMS/Email notifications
- [ ] Automated monthly statements
- [ ] Budget forecasting

---

This architecture ensures scalability, maintainability, and optimal performance for the Manobseba Fund Management System.
