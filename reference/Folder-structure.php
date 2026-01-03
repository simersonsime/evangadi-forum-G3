<!-- 1. Root Project -->
evangadi-forum-G3/
│
├── backend/
├── frontend/
├── README.md
└── .gitignore


<!-- 2. Backend Structure (backend/) -->
backend/
│
├── node_modules/           
│
├── config/
│   └── db.js                  # MySQL connection config
│
├── controllers/
│   ├── authController.js      # login & signup logic
│   ├── questionController.js  # question logic
│   └── answerController.js    # answer logic
│
├── middleware/
│   └── authMiddleware.js      # JWT verification
│
├── routes/                    # define API endpoints and map them to controllers.
│   ├── authRoutes.js          # /api/register, /api/login
│   ├── questionRoutes.js      # /api/question
│   └── answerRoutes.js        # /api/answer
│
├── models/                    # handle database interactions.
│   ├── tables.sql             # create tables commands (sql command)
│   ├── userModel.js           # users table queries
│   ├── questionModel.js       # questions table queries
│   └── answerModel.js         # answers table queries
│
├── utils/
│   └── generateToken.js      # JWT helper
│
├── app.js                    # Express app setup
├── server.js                 # Start server
│
├── .env                      # DB credentials, JWT_SECRET
├── package.json             
└── package-lock.json

<!-- 3. Frontend Structure (frontend/) -->
frontend/
│
├── public/
│   └── evangadi-logo.png
│
├── src/
│   ├── assets/                # Images, icons
│   │
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   ├── Signup/
│   │   │   ├── Signup.jsx
│   │   │   └── Signup.css
│   │   ├── Question/
│   │   │   ├── Question.jsx
│   │   │   └── Question.css
│   │   ├── Answer/
│   │   │   ├── Answer.jsx
│   │   │   └── Answer.css
│   │   └── AskQuestion/
│   │       ├── AskQuestion.jsx
│   │       └── AskQuestion.css
│   │
│   ├── services/
│   │   └── api.js              # Axios instance
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── utils/
│   │   └── auth.js
│   │
│   ├── App.jsx
│   ├── main.jsx           
│   └── index.css
│
├── .env                        # VITE_API_BASE_URL
├── vite.config.js
├── package.json
└── package-lock.json
