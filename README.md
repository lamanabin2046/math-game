# Math Game 🎮

A full-stack MERN math quiz game for students in grades 6–10. Players answer math questions, earn scores, and compete across difficulty levels.

---

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **Auth:** JWT (JSON Web Tokens)
- **Deployment:** AWS EC2 + Nginx + PM2

---

## Features

- Math questions for grades 6 to 10
- User authentication (register / login)
- Role-based access (admin / student)
- Score tracking per level
- Admin seeding tools for question data
- Responsive UI with sound effects

---

## Project Structure

```
math-game/
├── client/               # React frontend (Vite)
│   ├── src/
│   │   ├── services/     # Axios API calls
│   │   └── ...
│   └── dist/             # Production build output
├── server/               # Express backend
│   ├── controllers/      # Route logic
│   ├── middleware/        # Auth middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── generators/       # Question generators
│   ├── index.js          # Entry point
│   └── seed*.js          # Database seed scripts
└── README.md
```

---

## Getting Started (Local Development)

### Prerequisites

- Node.js v20+
- MongoDB Atlas account
- Git

### 1. Clone the repo

```bash
git clone https://github.com/lamanabin2046/math-game.git
cd math-game
```

### 2. Setup the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mathgame
PORT=5000
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

Start the server:

```bash
node index.js
```

### 3. Setup the frontend

```bash
cd ../client
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Seeding the Database

Run these scripts from the `server/` folder to populate question data:

```bash
node seed.js
node seedAdmin.js
node seedAllLevels.js
node seed_grade6.js
node seed_grade7.js
node seed_grade8.js
node seed_grade9.js
node seed_grade10.js
```

---

## Deployment (AWS EC2)

### Server Setup

```bash
# Install dependencies
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git nginx
sudo npm install -g pm2
```

### Deploy the App

```bash
# Clone repo
git clone https://github.com/lamanabin2046/math-game.git
cd math-game

# Install & build
cd server && npm install
cd ../client && npm install && npm run build

# Create .env in server/
nano server/.env

# Start backend
cd server
pm2 start index.js --name "math-game-backend"
pm2 save && pm2 startup
```

### Nginx Configuration

```nginx
server {
    listen 80;

    location / {
        root /home/ubuntu/math-game/client/dist;
        index index.html;
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo nginx -t
sudo systemctl restart nginx
```

### Update Deployment

```bash
cd ~/math-game
git pull origin main
cd client && npm run build
pm2 restart all
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `PORT` | Express server port (default: 5000) |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `CLIENT_URL` | Frontend URL for CORS |

---

## License

MIT
