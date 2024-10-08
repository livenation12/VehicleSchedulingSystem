import express from 'express';
import cors from 'cors';
import database from './config/db.js';
import routers from './routes/index.js';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { requireAuth } from './middlewares/authMiddleware.js';
// Load environment variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

const app = express();
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
} else {
  app.use(cors({
    origin: process.env.CLIENT_URL
    , credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }));
}

app.use(express.json());
app.use(cookieParser());
// Initialize database connection
database();

// Use routes with BASE_URL from environment variable
app.use(process.env.BASE_URL, routers);

// Log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//static route for images
app.use('/images/vehicles', requireAuth, express.static(join(__dirname, 'images/vehicles')));
//deployment!!!!
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '/client/dist')));
  app.get('*', (req, res) => res.sendFile(join(__dirname, '/client/dist/index.html')))
} else {
  app.get('/', (req, res) => {
    res.send("API is running")
  })
}


//end of deployment




const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
