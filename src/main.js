import { route, start } from './router.js';
import { Home } from './pages/Home.js';
import { Services } from './pages/Services.js';
import { ServiceDetail } from './pages/ServiceDetail.js';
import { Doctors } from './pages/Doctors.js';
import { DoctorDetail } from './pages/DoctorDetail.js';
import { Videos } from './pages/Videos.js';
import { Course } from './pages/Course.js';
import { Feedback } from './pages/Feedback.js';

import './styles/shared.css';
import './styles/home.css';
import './styles/services.css';
import './styles/doctors.css';
import './styles/videos.css';
import './styles/course.css';
import './styles/feedback.css';

// Telegram Web App
const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

// Routes
route('/', Home);
route('/services', Services);
route('/services/:id', ServiceDetail);
route('/doctors', Doctors);
route('/doctors/:id', DoctorDetail);
route('/videos', Videos);
route('/course', Course);
route('/feedback', Feedback);

// Start
start(document.getElementById('root'));
