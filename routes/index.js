const express  = require('express');
const router   = express.Router();
const nodemailer = require('nodemailer');

// ── Nodemailer transporter (Gmail) ───────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Data - Dixson's Portfolio Info
const profile = {
  name: 'Dixson Yonay Apaza Quilla',
  title: 'Backend Developer Jr',
  subtitle: 'APIs REST | Django | Node.js',
  location: 'Arequipa, Perú',
  phone: '+51 955724530',
  email: 'dixson.apaza@tecsup.edu.pe',
  linkedin: 'https://www.linkedin.com/in/yonay',
  github: 'https://github.com/dixsonapaza-ui',
  portfolio: 'https://portfolio.com',
  bio: 'Desarrollador Backend Junior con experiencia en diseño, desarrollo y despliegue de APIs REST utilizando Python (Django) y Node.js (Express). He implementado arquitecturas cliente-servidor con frontend y backend desacoplados, desplegados en la nube. Manejo de bases de datos SQL, control de versiones con Git/GitHub y pruebas de endpoints con Postman.',
  highlights: [
    'Experiencia utilizando herramientas de inteligencia artificial para optimización del desarrollo',
    'Perfil orientado a resultados, resolución de problemas y aprendizaje continuo',
    'Arquitecturas cliente-servidor con deploy en cloud (Render + Vercel)',
    'Control de versiones con Git/GitHub y testing con Postman'
  ]
};

const skills = {
  languages: [
    { name: 'Python',      label: 'Avanzado' },
    { name: 'JavaScript',  label: 'Avanzado' },
    { name: 'HTML/CSS',    label: 'Avanzado' },
    { name: 'SQL',         label: 'Medio' }
  ],
  backend: [
    { name: 'Django',   label: 'Avanzado' },
    { name: 'Node.js',  label: 'Avanzado' },
    { name: 'Express',  label: 'Medio' },
    { name: 'Laravel',  label: 'Básico' }
  ],
  databases: [
    { name: 'MySQL',   label: 'Medio' },
    { name: 'SQLite',  label: 'Avanzado' }
  ],
  tools: [
    { name: 'Git/GitHub', label: 'Avanzado' },
    { name: 'Postman',    label: 'Avanzado' },
    { name: 'Linux',      label: 'Medio' },
    { name: 'Power BI',   label: 'Básico' }
  ],
  categories: [
    { title: 'Lenguajes', icon: '💻', items: ['Python', 'JavaScript', 'HTML', 'CSS'] },
    { title: 'Backend', icon: '⚙️', items: ['Django', 'Node.js', 'Express', 'Laravel'] },
    { title: 'APIs', icon: '🔌', items: ['REST APIs', 'JSON', 'Postman', 'Endpoints'] },
    { title: 'Bases de Datos', icon: '🗄️', items: ['MySQL', 'SQLite'] },
    { title: 'Cloud & Deploy', icon: '☁️', items: ['Render', 'Vercel', 'Cold Start'] },
    { title: 'Herramientas', icon: '🛠️', items: ['Git', 'GitHub', 'Postman'] },
    { title: 'Data & ERP', icon: '📊', items: ['Power BI', 'Excel', 'SAP ERP (básico)'] },
    { title: 'IA Aplicada', icon: '🤖', items: ['Claude', 'Antigravity', 'Automatización'] },
    { title: 'Sistemas', icon: '🖥️', items: ['Windows', 'Linux'] }
  ]
};


const projects = [
  {
    title: 'E-commerce Florería',
    subtitle: 'Arquitectura Cliente-Servidor',
    tags: ['Django', 'Python', 'SQLite', 'Render', 'Vercel'],
    description: 'Plataforma e-commerce completa con API REST para gestión de productos, usuarios y pedidos. Backend desplegado en Render e integrado con frontend en Vercel.',
    bullets: [
      'API REST para gestión de productos, usuarios y pedidos',
      'Deploy del backend en cloud (Render) con manejo de cold start',
      'Integración con frontend desplegado en Vercel',
      'Pruebas de endpoints con Postman y validación JSON',
      'Control de versiones con Git y gestión en GitHub'
    ],
    link: 'https://floreria-ecommerce.vercel.app/',
    color: 'project-green',
    icon: '🌸',
    featured: true
  },
  {
    title: 'Re-Laptop Landing Page',
    subtitle: 'Startup Institucional',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: 'Landing page responsiva para startup de laptops reacondicionadas. Proyecto destacado en concurso institutcional alcanzando Top 5.',
    bullets: [
      'Landing page responsiva con diseño moderno',
      'Presentación clara del modelo de negocio',
      'Top 5 en concurso institucional de startups'
    ],
    link: 'https://re-laptop-nksm.vercel.app/',
    color: 'project-blue',
    icon: '💻',
    featured: false
  }
];

const experience = [
  {
    company: 'CubyxSur',
    location: 'Juliaca, Perú',
    role: 'Soporte Técnico TI',
    period: '2024',
    type: 'Presencial',
    bullets: [
      'Diagnóstico, mantenimiento y reparación de equipos informáticos',
      'Instalación de sistemas operativos y configuración de redes',
      'Resolución de incidencias técnicas en entornos reales de usuario'
    ],
    icon: '🔧'
  },
  {
    company: "Hotel Tikary's",
    location: 'Arequipa, Perú',
    role: 'Asistente Operativo',
    period: '2023',
    type: 'Presencial',
    bullets: [
      'Atención al cliente y resolución de incidencias en entorno dinámico',
      'Coordinación de operaciones y soporte al equipo',
      'Gestión eficiente en entornos de alta demanda'
    ],
    icon: '🏨'
  }
];

const education = [
  {
    institution: 'TECSUP',
    location: 'Arequipa, Perú',
    degree: 'Diseño y Desarrollo de Software',
    period: '2024 – 2026',
    status: 'En curso',
    description: 'Formación técnica superior en desarrollo de software con enfoque práctico en tecnologías backend, bases de datos y despliegue en la nube.',
    highlights: ['Backend Development', 'APIs REST', 'Bases de Datos SQL', 'Cloud Deploy'],
    icon: '🎓'
  }
];

// ─── Routes ─────────────────────────────────────────────────────────────────

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Inicio | Dixson Apaza – Backend Developer',
    page: 'home',
    profile,
    projects: projects.filter(p => p.featured)
  });
});

router.get('/sobre-mi', (req, res) => {
  res.render('about', {
    title: 'Sobre Mí | Dixson Apaza',
    page: 'about',
    profile,
    skills
  });
});

router.get('/experiencia', (req, res) => {
  res.render('experience', {
    title: 'Experiencia | Dixson Apaza',
    page: 'experience',
    experience
  });
});

router.get('/educacion', (req, res) => {
  res.render('education', {
    title: 'Educación | Dixson Apaza',
    page: 'education',
    education
  });
});

router.get('/habilidades', (req, res) => {
  res.render('skills', {
    title: 'Habilidades | Dixson Apaza',
    page: 'skills',
    skills
  });
});

router.get('/proyectos', (req, res) => {
  res.render('projects', {
    title: 'Proyectos | Dixson Apaza',
    page: 'projects',
    projects
  });
});

router.get('/contactame', (req, res) => {
  res.render('contact', {
    title: 'Contáctame | Dixson Apaza',
    page: 'contact',
    profile
  });
});

router.post('/contactame', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: `"${name}" <${process.env.MAIL_USER}>`,
    to:   process.env.MAIL_TO || 'dixson.apaza@tecsup.edu.pe',
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#13131f;color:#f0f0f8;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#7c5cfc,#06b6d4);padding:28px 32px;">
          <h1 style="margin:0;font-size:22px;color:#fff;">📬 Nuevo mensaje desde tu portafolio</h1>
        </div>
        <div style="padding:32px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;color:#9898b8;font-size:13px;width:120px;">👤 Nombre</td><td style="padding:10px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:10px 0;color:#9898b8;font-size:13px;">✉️ Email</td><td style="padding:10px 0;"><a href="mailto:${email}" style="color:#7c5cfc;">${email}</a></td></tr>
            <tr><td style="padding:10px 0;color:#9898b8;font-size:13px;">📌 Asunto</td><td style="padding:10px 0;">${subject}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:20px 0;" />
          <h3 style="color:#9898b8;font-size:13px;margin-bottom:10px;">💬 Mensaje</h3>
          <p style="line-height:1.7;white-space:pre-wrap;background:rgba(255,255,255,0.04);padding:16px;border-radius:10px;">${message}</p>
          <p style="margin-top:28px;font-size:12px;color:#5a5a7a;">Responde directamente a este correo para contestar a ${name}.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.redirect('/confirmacion');
  } catch (err) {
    console.error('❌ Error enviando correo:', err.message);
    res.render('contact', {
      title: 'Contáctame | Dixson Apaza',
      page: 'contact',
      profile,
      error: 'Ocurrió un error al enviar tu mensaje. Por favor contáctame directamente a dixson.apaza@tecsup.edu.pe'
    });
  }
});

router.get('/confirmacion', (req, res) => {
  res.render('confirmation', {
    title: 'Mensaje Enviado | Dixson Apaza',
    page: 'contact'
  });
});

module.exports = router;
