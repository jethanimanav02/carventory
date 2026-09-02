# CARVENTORY — MASTER PROJECT CONTEXT & DEVELOPMENT PROMPT

## 0. HOW TO USE THIS FILE

This document is the single source of truth for the Carventory project.

Give this file to any AI coding assistant before asking it to work on the project. The AI must read and follow this document instead of repeatedly asking the user to explain the project.

IMPORTANT:
- Do not redesign the project randomly.
- Do not replace the agreed technology stack without a strong technical reason.
- Do not skip project milestones.
- Do not implement later milestones prematurely unless explicitly requested.
- Preserve existing working code when making changes.
- Explain important decisions in simple language because the developer is still learning.
- Prefer a clean, maintainable implementation over unnecessarily complicated architecture.
- The project must be useful as both a college project and a real dealership MVP.

---

# 1. PROJECT NAME

**Carventory**

Carventory is a vehicle inventory and customer-facing marketplace application for a car dealership.

The first intended business use is a dealership that mainly sells used cars but can also list new cars.

The application should eventually support:
- Public car browsing
- Search and filtering
- Detailed car pages
- Favourites
- Car comparison
- Recently viewed cars
- Customer enquiries
- WhatsApp contact
- EMI calculator
- Similar-car recommendations
- New-car notifications
- Admin inventory management
- Admin enquiry management
- Authentication and roles
- Real-time notifications
- Docker
- CI/CD

---

# 2. PROJECT GOAL

Build ONE complete application progressively through 10 college experiments.

The experiments are development milestones, not separate applications.

The roadmap is:

1. Responsive and interactive UI using Tailwind CSS
2. React Hooks
3. Redux / Context API
4. REST API + database
5. Secure REST APIs
6. JWT Authentication
7. Docker
8. WebSockets
9. Docker Compose
10. CI/CD

This document currently covers the implementation plan through **Experiment 4**.

Do NOT jump into Experiments 5–10 unless the user explicitly asks.

---

# 3. COLLEGE EXPERIMENT MAPPING

## Experiment 1 — Responsive Frontend

Goal:
Build the initial Carventory frontend using React and Tailwind CSS.

Pages/components should include:
- Home
- Cars / Inventory
- Car Details
- Login
- Register
- Compare
- Favourites
- Admin Dashboard shell

At this stage:
- Use mock/static car data.
- No real backend is required.
- No PostgreSQL integration yet.
- Focus on responsive UI, component structure, navigation and reusable components.

---

## Experiment 2 — React Hooks

Goal:
Make the frontend interactive using React Hooks.

Use appropriate hooks such as:
- useState
- useEffect
- useMemo when genuinely useful
- useRef when genuinely useful
- Custom Hooks where they improve reuse

Implement:
- Search
- Filtering
- Sorting
- Car forms
- Favourite functionality
- Compare functionality
- Recently viewed
- Basic data fetching abstraction
- Reusable UI/form logic

Do not overuse hooks just to demonstrate them.

---

## Experiment 3 — Context API / Global State

Goal:
Introduce global application state.

Preferred initial approach:
**React Context API**

Potential contexts:
- AuthContext
- FavouriteContext
- CompareContext
- Car/App state where genuinely needed

Do not introduce Redux unless the application complexity actually justifies it or the user specifically requests Redux.

The application should demonstrate why global state is useful rather than adding unnecessary state management.

---

## Experiment 4 — REST API + PostgreSQL

Goal:
Connect the React frontend to a real backend and PostgreSQL database.

Preferred backend:
- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- PostgreSQL
- Flyway for database migrations where appropriate

Architecture:

React
  ↓
REST API
  ↓
Spring Boot
  ↓
JPA / Hibernate
  ↓
PostgreSQL

Replace mock car data with real API/database data.

Initial REST functionality should include:
- Create car
- Read/list cars
- Read single car
- Update car
- Delete car
- Search/filter through API where appropriate

Also create a sensible backend structure using:
- Controller
- Service
- Repository
- Entity
- DTOs where appropriate
- Exception handling

Do not add JWT/security yet unless explicitly requested; that belongs primarily to Experiment 5/6.

---

# 4. AGREED TECHNOLOGY STACK

## Frontend

Preferred:
- React
- Vite
- Tailwind CSS
- React Router
- JavaScript unless TypeScript is explicitly requested later
- Fetch or Axios

Use simple, readable React.

## Backend

Preferred:
- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- PostgreSQL
- Flyway

## Authentication later

- Spring Security
- JWT

This is NOT part of the current Experiment 1–4 implementation unless required for a specific foundation.

## Real-time later

- WebSocket / STOMP as appropriate

## Deployment later

- Docker
- Docker Compose
- GitHub Actions

---

# 5. CAR DATA MODEL

Carventory mainly handles used cars but supports new cars.

Each car should support:

### Basic information
- condition: NEW / USED
- brand
- model
- variant
- year
- price
- kmDriven
- fuel
- transmission
- engine
- color
- numberOfOwners

### Registration / legal
- registrationNumber
- insuranceValidity

### Location
- location

### Description
- description

### Media
- multiple photos
- video

### Features
- specifications/features

### Inventory status

Recommended statuses:
- AVAILABLE
- RESERVED
- SOLD
- HIDDEN

The user initially requested AVAILABLE and RESERVED, but SOLD and HIDDEN are intentionally included because they are useful for a real dealership.

Public visibility rules can be finalized later.

---

# 6. CUSTOMER FEATURES

A guest/customer should eventually be able to:

- Browse cars
- Search cars
- Filter cars
- Sort cars
- Open detailed car page
- View multiple photos
- Contact dealer
- WhatsApp dealer
- Submit enquiry
- Favourite cars
- Compare cars
- View recently viewed cars
- Use price-range slider
- Use EMI calculator
- See similar cars
- Receive new-car notifications

Customer login is optional.

Guest users should still be able to browse inventory.

---

# 7. ADMIN FEATURES

Admin should eventually be able to:

## Dashboard
- Inventory overview
- Available cars
- Reserved cars
- Sold cars
- Enquiry overview

## Cars
- Add car
- Edit car
- Delete/remove car
- Upload photos
- Add video
- Change status
- Manage inventory

## Enquiries
Suggested statuses:
- NEW
- CONTACTED
- FOLLOW-UP
- CLOSED

## Notifications
Later:
- Real-time new enquiry notifications
- Other important inventory notifications

---

# 8. AUTHENTICATION MODEL

Eventually:

ADMIN
- Full inventory management
- Manage enquiries
- Dashboard
- Notifications

CUSTOMER
- Optional login
- Favourites
- Compare
- Recently viewed
- Enquiries
- Profile

GUEST
- Browse
- Search
- Filter
- View cars
- Contact dealer

JWT authentication and role-based access belong to later milestones.

---

# 9. IMPORTANT PRODUCT FEATURES

## WhatsApp

Every car should eventually be able to have:

"WhatsApp about this car"

The application should generate a useful message containing relevant car information.

Example:

"Hi, I'm interested in the 2022 Hyundai Creta SX listed on Carventory. Is it still available?"

Do not hard-code one vehicle's message.

---

## EMI Calculator

Eventually support:

Car Price
↓
Down Payment
↓
Loan Amount
↓
Interest Rate
↓
Loan Tenure
↓
Monthly EMI

Keep the calculation understandable and accurate.

---

## Similar Cars

For the first version, use rule-based recommendations, NOT AI/ML.

Possible matching criteria:
- Similar price range
- Same fuel type
- Same transmission
- Similar brand/model category
- Similar year
- Similar body type if added later

Do not introduce an AI recommendation system unless explicitly requested.

---

## New Car Notifications

Eventually support notifications when new inventory is added.

Start with simple in-app/browser notifications if appropriate.

Email/push services can be added later.

---

# 10. UI DIRECTION

The home page should include:

Carventory
Find Your Next Car
Search / filter area

Featured Cars
[Car] [Car] [Car]

Why Choose Us
...

The design should feel like a modern dealership marketplace.

Do NOT blindly copy Cars24, CarDekho, etc.
Use them only as general UX inspiration.

The interface must be:
- Responsive
- Clean
- Professional
- Easy to understand
- Mobile friendly
- Desktop friendly

Branding/colors/logo are NOT finalized yet.

Use a neutral, professional temporary visual identity until branding is decided.

---

# 11. DEVELOPMENT PRINCIPLES

## Build incrementally

Do not create the entire application in one giant step.

At each milestone:
1. Explain what we are building.
2. Show the folder/file changes.
3. Implement the feature.
4. Tell the user exactly how to run it.
5. Test it.
6. Fix errors.
7. Confirm the milestone before moving on.

## Do not overwhelm the user

The developer is learning and may need commands explained.

When giving terminal commands:
- State which folder the command should be run from.
- Give commands one group at a time.
- Explain what the command does when it matters.

## Don't assume tools are installed

Before depending on a tool, verify it or give an installation path.

Known environment at the time this document was created:
- Windows 11
- Java 21
- Maven 3.9.x
- Node.js 24.x
- npm 11.x
- PostgreSQL 18.x
- Git installed

Paths/configuration can change, so verify the current environment when necessary.

---

# 12. PROJECT STRUCTURE

Use a clean monorepo structure.

Recommended target structure:

Carventory/
│
├── apps/
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── layouts/
│   │   │   ├── hooks/
│   │   │   ├── context/
│   │   │   ├── services/
│   │   │   ├── data/
│   │   │   └── utils/
│   │   ├── public/
│   │   ├── package.json
│   │   └── ...
│   │
│   └── backend/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/com/carventory/
│       │   │   │   ├── controller/
│       │   │   │   ├── service/
│       │   │   │   ├── repository/
│       │   │   │   ├── entity/
│       │   │   │   ├── dto/
│       │   │   │   ├── exception/
│       │   │   │   └── config/
│       │   │   └── resources/
│       │   │       ├── application.properties
│       │   │       └── db/migration/
│       │   └── test/
│       ├── pom.xml
│       └── ...
│
├── docs/
│   ├── PROJECT_CONTEXT.md
│   └── ...
│
├── README.md
└── .gitignore

The exact structure may be adjusted when implementation reveals a better organization.

---

# 13. DATABASE DIRECTION

For Experiment 4, use PostgreSQL.

Initial entities/tables should be kept focused.

Likely first entity:

Car

Potential future entities:
- User
- Enquiry
- Favourite
- Notification
- Media
- Feature

Do NOT create every future table during Experiment 4.

Start with the minimum required to demonstrate:
React → REST → Spring Boot → PostgreSQL.

---

# 14. API DIRECTION FOR EXPERIMENT 4

Initial endpoint design can be:

GET    /api/cars
GET    /api/cars/{id}
POST   /api/cars
PUT    /api/cars/{id}
DELETE /api/cars/{id}

Possible query parameters later:

GET /api/cars?search=creta
GET /api/cars?fuel=PETROL
GET /api/cars?minPrice=500000&maxPrice=1000000
GET /api/cars?sort=priceAsc

The exact API design should be finalized after examining the frontend requirements.

---

# 15. IMAGE STORAGE

For the early version:
- Keep image handling simple.
- Local development storage is acceptable.

Do NOT require Cloudinary just to get the first application working.

Later, Cloudinary or another object-storage service can be introduced if required.

---

# 16. CURRENT DEVELOPMENT TARGET

CURRENT TARGET:
**Experiments 1 → 4**

Build the foundation in this order:

### EXP 1
Create React + Vite + Tailwind frontend.

Build:
- Navbar
- Home page
- Cars page
- Car card
- Car details page
- Login page
- Register page
- Favourites page
- Compare page
- Admin dashboard shell
- Responsive layouts
- Temporary mock car data

### EXP 2
Add:
- Search
- Filters
- Sorting
- Forms
- Favourites
- Compare
- Recently viewed
- Custom hooks
- Proper interactive behavior

### EXP 3
Add:
- Context API
- Global favourites
- Compare state
- Authentication state foundation
- Other genuinely global state

### EXP 4
Create:
- Spring Boot backend
- PostgreSQL database
- Car entity
- Repository
- Service
- Controller
- DTOs where appropriate
- REST CRUD APIs
- Validation
- Basic error handling
- Frontend API integration
- Replace mock cars with database data

Do NOT implement JWT yet unless specifically requested.

---

# 17. QUALITY CHECKS

Before declaring each experiment complete, verify:

## Experiment 1
- Desktop responsive
- Mobile responsive
- Navigation works
- Pages render
- Components are reusable
- No obvious console errors

## Experiment 2
- Search works
- Filter works
- Sort works
- Favourites work
- Compare works
- Recently viewed works
- Forms behave correctly

## Experiment 3
- Global state works
- Refresh behavior is considered
- No unnecessary prop drilling
- Contexts are sensibly separated

## Experiment 4
- PostgreSQL connection works
- CRUD works
- API responds correctly
- Frontend receives real database data
- Errors are handled
- Database schema is understandable
- No credentials are hard-coded into Git

---

# 18. ENVIRONMENT / SECURITY RULES

NEVER commit:
- Database passwords
- JWT secrets
- Cloudinary secrets
- API keys
- Email passwords
- Production credentials

Use environment variables/configuration.

Do not put real secrets into source code.

If the project needs example configuration, use placeholders such as:

DATABASE_URL=
DATABASE_USERNAME=
DATABASE_PASSWORD=

---

# 19. GIT RULES

Use Git throughout development.

Make logical commits such as:

experiment-1-ui
experiment-2-hooks
experiment-3-context
experiment-4-backend
experiment-4-postgres
experiment-4-api-integration

Do not make one giant commit containing the entire project if smaller logical commits are practical.

Before destructive Git commands, explain what they do.

Never delete/overwrite working code without warning.

---

# 20. AI ASSISTANT BEHAVIOR

When an AI receives this file, it should first understand:

"This is a progressive Carventory dealership application. The current objective is Experiments 1–4. I must build it incrementally and preserve the architecture."

If the user asks:
"continue"
"next"
"build this"
"fix this"
or provides an error:

The AI should use this document as the project context and continue from the current project state.

If files already exist, inspect them before creating replacements.

Do not assume a blank project if code already exists.

Do not blindly regenerate package.json, pom.xml, configuration, or database files.

---

# 21. IMPORTANT: ERROR DEBUGGING

When the user gives an error:

1. Identify the actual root cause.
2. Do not immediately suggest random fixes.
3. Ask for the relevant file/command output if required.
4. Give the smallest safe fix.
5. Explain why it happened.
6. Tell the user exactly how to verify the fix.

Do not repeatedly make the user explain the whole project.

Use this document as the baseline context.

---

# 22. STARTING INSTRUCTION FOR AN AI CODING ASSISTANT

When this document is provided, begin by:

1. Read this entire document.
2. Inspect the current Carventory repository.
3. Determine whether Experiments 1–4 have already been started.
4. Do NOT overwrite existing working code.
5. Report the current project state briefly.
6. Identify the next unfinished milestone.
7. Start with that milestone.

If the repository is empty/new:
- Start with Experiment 1.
- Create the React + Vite frontend.
- Configure Tailwind CSS using the current recommended setup for the installed versions.
- Build the initial responsive Carventory UI.
- Use mock data.
- Do not create the backend yet.

If Experiment 1 is already complete:
- Continue to Experiment 2.
- Do not redo Experiment 1.

If Experiments 1–3 are complete:
- Continue to Experiment 4.
- Inspect the backend/database configuration before changing anything.

---

# 23. FINAL PRODUCT VISION

The finished Carventory application should eventually feel like a small but professional dealership management + customer marketplace system.

Customer:

Home
→ Search
→ Filter
→ Car
→ Details
→ Favourite / Compare
→ Enquiry / WhatsApp

Admin:

Login
→ Dashboard
→ Inventory
→ Add/Edit Car
→ Manage Status
→ Enquiries
→ Notifications

Technical architecture:

React
→ REST
→ Spring Boot
→ PostgreSQL

Later:

JWT
→ WebSockets
→ Docker
→ Docker Compose
→ GitHub Actions
→ Deployment

The project should remain understandable enough for a college viva while being structured well enough to evolve into a real business application.

---

# 24. DO NOT FORGET

The user does NOT want to keep explaining Carventory to every AI.

This file exists specifically to prevent that.

Whenever possible, the AI should say what it found in the current project and continue from the existing state instead of asking the user to repeat requirements.

**Current priority: Build Experiments 1–4 correctly, incrementally, and test each stage before moving forward.**
