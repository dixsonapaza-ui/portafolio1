const express  = require('express');
const router   = express.Router();
const { Resend } = require('resend');
const nodemailer = require('nodemailer');

// ── Nodemailer transporter (Gmail) ───────────────────────────────────────────
let transporter = null;
if (process.env.MAIL_USER && process.env.MAIL_PASS) {
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,          // SSL en puerto 465
    auth: {
      user: process.env.MAIL_USER,
      pass: (process.env.MAIL_PASS || '').replace(/\s/g, ''), // elimina espacios del App Password
    },
    connectionTimeout: 10000,  // 10s máx para conectar
    greetingTimeout:   5000,   // 5s máx para saludo SMTP
    socketTimeout:     15000,  // 15s máx total
  });
  console.log('✉️  Nodemailer (Gmail) configurado correctamente');
}

// ── Resend email client ───────────────────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');
console.log('✉️  Resend inicializado correctamente');

// Data - Dixson's Portfolio Info
const profile = {
  name: 'Dixson Yonay Apaza Quilla',
  title: 'QA Tester Junior | Full Stack Developer',
  subtitle: 'QA Testing | REST APIs | Node.js',
  location: 'Arequipa, Perú',
  phone: '+51 955724530',
  email: 'dixson.apaza@tecsup.edu.pe',
  linkedin: 'https://www.linkedin.com/in/yonay',
  github: 'https://github.com/dixsonapaza-ui',
  instagram: 'https://www.instagram.com/yonaydixson/',
  whatsapp: 'https://wa.me/51955724530?text=Hola%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20contactarte%20para%20conversar%20sobre%20una%20propuesta%20de%20trabajo.',
  portfolio: 'https://portfolio.com',
  bio: 'Me apasiona desarrollar software y garantizar su calidad mediante pruebas funcionales, validación de APIs REST y automatización de pruebas. Combino conocimientos de desarrollo Full Stack con metodologías ágiles para crear aplicaciones confiables, escalables y centradas en el usuario.',
  highlights: [
    'Experiencia utilizando herramientas de inteligencia artificial para optimización del desarrollo',
    'Perfil orientado a resultados, resolución de problemas y aprendizaje continuo',
    'Automatización de pruebas and validación de endpoints con Postman/k6',
    'Control de versiones con Git/GitHub y metodologías ágiles'
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
    { title: 'Lenguajes', icon: 'fas fa-code', items: ['Python', 'JavaScript', 'HTML', 'CSS'] },
    { title: 'Backend', icon: 'fas fa-server', items: ['Django', 'Node.js', 'Express', 'Laravel'] },
    { title: 'APIs', icon: 'fas fa-plug', items: ['REST APIs', 'JSON', 'Postman', 'Endpoints'] },
    { title: 'Bases de Datos', icon: 'fas fa-database', items: ['MySQL', 'SQLite'] },
    { title: 'Cloud & Deploy', icon: 'fas fa-cloud', items: ['Render', 'Vercel', 'Cold Start'] },
    { title: 'Herramientas', icon: 'fas fa-toolbox', items: ['Git', 'GitHub', 'Postman'] },
    { title: 'Data & ERP', icon: 'fas fa-chart-bar', items: ['Power BI', 'Excel', 'SAP ERP (básico)'] },
    { title: 'IA Aplicada', icon: 'fas fa-robot', items: ['Claude', 'Antigravity', 'Automatización'] },
    { title: 'Sistemas', icon: 'fas fa-desktop', items: ['Windows', 'Linux'] }
  ]
};


const projects = [
  {
    title: 'Tecnilink',
    subtitle: 'Plataforma de Soporte Técnico',
    tags: ['React', 'Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    description: 'Plataforma web académica para la gestión y resolución de solicitudes de soporte técnico. Permite la comunicación fluida entre clientes, técnicos y administradores con control de roles.',
    bullets: [
      'Arquitectura cliente-servidor desacoplada con frontend React y backend Express',
      'Base de datos relacional PostgreSQL (Neon) integrada con ORM Prisma',
      'Autenticación robusta y autorización basada en roles utilizando JWT',
      'Pruebas de carga y estrés ejecutadas con k6 (smoke tests y simulaciones de usuarios virtuales)'
    ],
    link: 'https://tecnilink-frontend.vercel.app/',
    github: 'https://github.com/dixsonapaza-ui/Tecnilink-Dixson',
    color: 'project-purple',
    icon: 'fas fa-tools',
    featured: true,
    image: '/images/project-tecnilink.png',
    year: '2026',
    cat: 'Full Stack · React · Node.js'
  },
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
    icon: 'fas fa-shopping-bag',
    featured: true,
    image: '/images/project-floreria.png',
    year: '2025',
    cat: 'Backend · Django · Cloud'
  },
  {
    title: 'Re-Laptop',
    subtitle: 'Startup Institucional',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: 'Landing page responsiva para startup de laptops reacondicionadas. Proyecto destacado en concurso institucional alcanzando Top 5.',
    bullets: [
      'Landing page responsiva con diseño moderno',
      'Presentación clara del modelo de negocio',
      'Top 5 en concurso institucional de startups'
    ],
    link: 'https://re-laptop-nksm.vercel.app/',
    color: 'project-blue',
    icon: 'fas fa-laptop',
    featured: false,
    image: '/images/project-relaptop.png',
    year: '2024',
    cat: 'Frontend · Landing · Startup'
  }
];

const experience = [
  {
    company: 'Tecnilink',
    location: 'Arequipa, Perú',
    role: 'Desarrollador Full Stack (Proyecto Académico)',
    period: '2026',
    type: 'Remoto',
    bullets: [
      'Diseño y desarrollo de una plataforma web para la gestión y resolución de solicitudes de soporte técnico.',
      'Implementación de una arquitectura desacoplada con frontend en React y backend con Node.js y Express.',
      'Configuración de bases de datos PostgreSQL con Prisma ORM y autenticación robusta mediante JWT.',
      'Optimización de endpoints realizando pruebas de carga y estrés con k6.'
    ],
    icon: 'fas fa-tools',
    link: 'https://tecnilink-frontend.vercel.app/',
    image: '/images/project-tecnilink.png'
  },
  {
    company: 'Florería',
    location: 'Arequipa, Perú',
    role: 'Desarrollador Backend (E-commerce)',
    period: '2025',
    type: 'Remoto',
    bullets: [
      'Desarrollo de API REST para la gestión de productos, usuarios y pedidos utilizando Django y Python.',
      'Despliegue de backend en Render y optimización del cold start.',
      'Integración del backend con el frontend desplegado en Vercel.',
      'Pruebas y documentación de endpoints utilizando Postman y validación de formatos JSON.'
    ],
    icon: 'fas fa-shopping-bag',
    link: 'https://floreria-ecommerce.vercel.app/',
    image: '/images/project-floreria.png'
  },
  {
    company: 'Re laptop',
    location: 'Arequipa, Perú',
    role: 'Desarrollador Frontend (Startup)',
    period: '2024',
    type: 'Presencial',
    bullets: [
      'Diseño y desarrollo de landing page responsiva utilizando HTML, CSS y JavaScript.',
      'Presentación interactiva y clara del modelo de negocio para concurso institucional.',
      'Destacado en el Top 5 del concurso de startups de base tecnológica.'
    ],
    icon: 'fas fa-laptop',
    link: 'https://re-laptop-nksm.vercel.app/',
    image: '/images/project-relaptop.png'
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
    icon: 'fas fa-graduation-cap'
  }
];

// ─── Routes ─────────────────────────────────────────────────────────────────

// Main single-page portfolio
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Dixson Apaza — QA Tester Junior | Full Stack Developer',
    page: 'home',
    profile,
    projects,
    skills,
    experience,
    education
  });
});

// Keep legacy routes as redirects to the SPA sections
router.get('/sobre-mi', (req, res) => res.redirect('/#about'));
router.get('/experiencia', (req, res) => res.redirect('/#experience'));
router.get('/educacion', (req, res) => res.redirect('/#experience'));
router.get('/habilidades', (req, res) => res.redirect('/#skills'));
router.get('/proyectos', (req, res) => res.redirect('/#work'));

router.get('/contactame', (req, res) => {
  res.render('contact', {
    title: 'Contáctame | Dixson Apaza',
    page: 'contact',
    profile
  });
});

router.post('/contactame', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const htmlBody = `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0D1A1C;color:#F5EDD8;border-radius:16px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#E8621A,#4DAA8C);padding:28px 32px;">
        <h1 style="margin:0;font-size:22px;color:#fff;">📬 Nuevo mensaje desde tu portafolio</h1>
      </div>
      <div style="padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;color:#A89E8A;font-size:13px;width:120px;">👤 Nombre</td><td style="padding:10px 0;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:10px 0;color:#A89E8A;font-size:13px;">✉️ Email</td><td style="padding:10px 0;"><a href="mailto:${email}" style="color:#E8621A;">${email}</a></td></tr>
          <tr><td style="padding:10px 0;color:#A89E8A;font-size:13px;">📌 Asunto</td><td style="padding:10px 0;">${subject}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:20px 0;" />
        <h3 style="color:#A89E8A;font-size:13px;margin-bottom:10px;">💬 Mensaje</h3>
        <p style="line-height:1.7;white-space:pre-wrap;background:rgba(255,255,255,0.04);padding:16px;border-radius:10px;">${message}</p>
        <p style="margin-top:28px;font-size:12px;color:#5a5a7a;">Responde directamente a este correo para contestar a ${name}.</p>
      </div>
    </div>
  `;

  try {
    // 1. Intentamos usar Nodemailer si las credenciales de Gmail están en el .env
    if (transporter) {
      const mailOptions = {
        from: `"${name}" <${process.env.MAIL_USER}>`,
        to:   process.env.MAIL_TO || 'dixson.apaza@tecsup.edu.pe',
        replyTo: email,
        subject: `[Portfolio] ${subject}`,
        html: htmlBody,
      };
      await transporter.sendMail(mailOptions);
      console.log('✅ Correo enviado con éxito usando Nodemailer (Gmail)');
      return res.redirect('/confirmacion');
    }

    // 2. Si no hay Nodemailer, intentamos usar Resend si hay una key real
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_dummy_key' && process.env.RESEND_API_KEY.trim() !== '') {
      const { error } = await resend.emails.send({
        from: 'Portfolio Dixson <onboarding@resend.dev>',
        to:   [process.env.MAIL_TO || 'dixson.apaza@tecsup.edu.pe'],
        replyTo: email,
        subject: `[Portfolio] ${subject}`,
        html: htmlBody,
      });

      if (error) throw new Error(error.message);
      console.log('✅ Correo enviado con éxito usando Resend');
      return res.redirect('/confirmacion');
    }

    // 3. Si no hay ninguna configuración real, hacemos fallback simulado en desarrollo
    console.log('\n⚠️  [ENVÍO SIMULADO] Detalle del mensaje enviado:');
    console.log('--------------------------------------------------');
    console.log('Remitente (Email):', email);
    console.log('Nombre:', name);
    console.log('Asunto:', subject);
    console.log('Mensaje:', message);
    console.log('--------------------------------------------------\n');
    return res.redirect('/confirmacion');
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

// ── SISTEMA OCULTO DE GESTIÓN DE CVS ─────────────────────────────────────────
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Asegurar que existe el directorio de uploads de CV
const cvUploadDir = path.join(__dirname, '../public/uploads/cv');
if (!fs.existsSync(cvUploadDir)) {
  fs.mkdirSync(cvUploadDir, { recursive: true });
}

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, cvUploadDir);
  },
  filename: function (req, file, cb) {
    const cvType = req.body.cvType || 'fullstack';
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `cv-${cvType}${ext}`);
  }
});

// Filtro de tipos de archivo permitidos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Formato de archivo no válido. Solo se permiten PDF, DOC y DOCX.'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Obtener valor de cookie manualmente
const getCookie = (req, name) => {
  const list = {};
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
  }
  return list[name];
};

// Contraseña por defecto o cargada de .env
const CV_ADMIN_PASS = process.env.CV_MANAGER_PASSWORD || 'dixson2026';

const requireCvAuth = (req, res, next) => {
  const token = getCookie(req, 'cv_admin_token');
  if (token === CV_ADMIN_PASS) {
    next();
  } else {
    res.render('cv-login', { title: 'Acceso Privado | Dixson Apaza', page: 'contact' });
  }
};

const getCvStatus = () => {
  const status = {
    fullstack: { exists: false, ext: '', size: 0, mtime: null },
    qatester: { exists: false, ext: '', size: 0, mtime: null }
  };
  
  if (fs.existsSync(cvUploadDir)) {
    const files = fs.readdirSync(cvUploadDir);
    
    const fsFile = files.find(f => f.startsWith('cv-fullstack.'));
    if (fsFile) {
      const filePath = path.join(cvUploadDir, fsFile);
      const stat = fs.statSync(filePath);
      status.fullstack = {
        exists: true,
        ext: path.extname(fsFile).replace('.', ''),
        size: stat.size,
        mtime: stat.mtime
      };
    }
    
    const qaFile = files.find(f => f.startsWith('cv-qatester.'));
    if (qaFile) {
      const filePath = path.join(cvUploadDir, qaFile);
      const stat = fs.statSync(filePath);
      status.qatester = {
        exists: true,
        ext: path.extname(qaFile).replace('.', ''),
        size: stat.size,
        mtime: stat.mtime
      };
    }
  }
  return status;
};

// Rutas del Panel Secreto
router.get('/dixson-cv-manager', requireCvAuth, (req, res) => {
  const status = getCvStatus();
  res.render('cv-manager', {
    title: 'Gestor de CVs | Dixson Apaza',
    page: 'contact',
    status
  });
});

router.post('/dixson-cv-manager/login', (req, res) => {
  const { password } = req.body;
  if (password === CV_ADMIN_PASS) {
    res.cookie('cv_admin_token', CV_ADMIN_PASS, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    res.redirect('/dixson-cv-manager');
  } else {
    res.render('cv-login', { 
      title: 'Acceso Privado | Dixson Apaza', 
      page: 'contact',
      error: 'Contraseña incorrecta. Por favor, intenta de nuevo.' 
    });
  }
});

router.post('/dixson-cv-manager/logout', (req, res) => {
  res.clearCookie('cv_admin_token');
  res.redirect('/dixson-cv-manager');
});

router.post('/dixson-cv-manager/upload', requireCvAuth, (req, res) => {
  upload.single('cvFile')(req, res, function (err) {
    const status = getCvStatus();
    
    if (err) {
      return res.render('cv-manager', {
        title: 'Gestor de CVs | Dixson Apaza',
        page: 'contact',
        status,
        error: err.message
      });
    }

    if (!req.file) {
      return res.render('cv-manager', {
        title: 'Gestor de CVs | Dixson Apaza',
        page: 'contact',
        status,
        error: 'Por favor, selecciona un archivo válido.'
      });
    }

    const cvType = req.body.cvType;
    const ext = path.extname(req.file.originalname).toLowerCase();

    // Eliminar otros archivos del mismo cvType con diferente extensión para evitar duplicados
    try {
      const files = fs.readdirSync(cvUploadDir);
      files.forEach(file => {
        if (file.startsWith(`cv-${cvType}.`) && !file.endsWith(ext)) {
          fs.unlinkSync(path.join(cvUploadDir, file));
        }
      });
    } catch (e) {
      console.error('Error eliminando archivos antiguos:', e);
    }

    // Volver a leer el status actualizado
    const updatedStatus = getCvStatus();
    res.render('cv-manager', {
      title: 'Gestor de CVs | Dixson Apaza',
      page: 'contact',
      status: updatedStatus,
      success: `El CV de ${cvType === 'fullstack' ? 'Full Stack Developer' : 'QA Tester'} se actualizó con éxito.`
    });
  });
});

// Ruta Pública de Vista Previa del CV
router.get('/cv-preview/:type', (req, res) => {
  const type = req.params.type; // 'fullstack' o 'qatester'
  if (type !== 'fullstack' && type !== 'qatester') {
    return res.status(404).send('Tipo de CV no válido.');
  }

  const status = getCvStatus();
  const cvInfo = status[type];

  res.render('cv-preview', {
    title: `Vista Previa CV - ${type === 'fullstack' ? 'Full Stack' : 'QA Tester'} | Dixson Apaza`,
    page: 'contact',
    type,
    exists: cvInfo.exists,
    ext: cvInfo.ext,
    size: cvInfo.size,
    mtime: cvInfo.mtime,
    profile
  });
});

// Ruta Pública de Descarga / Servir archivo
router.get('/descargar-cv/:type', (req, res) => {
  const type = req.params.type; // 'fullstack' o 'qatester'
  const forceDownload = req.query.download === 'true';

  if (type !== 'fullstack' && type !== 'qatester') {
    return res.status(404).send('Tipo de CV no válido.');
  }

  if (!fs.existsSync(cvUploadDir)) {
    return res.status(404).send('Aún no se han subido CVs.');
  }

  const files = fs.readdirSync(cvUploadDir);
  const matchedFile = files.find(f => f.startsWith(`cv-${type}.`));

  if (!matchedFile) {
    return res.status(404).send('El CV solicitado aún no está disponible.');
  }

  const filePath = path.join(cvUploadDir, matchedFile);
  const ext = path.extname(matchedFile).toLowerCase();

  // Si se solicita la descarga forzada o es Word, forzamos descarga
  if (forceDownload || ext !== '.pdf') {
    return res.download(filePath, `CV_Dixson_Apaza_${type === 'fullstack' ? 'FullStack' : 'QATester'}${ext}`);
  }

  // Por defecto para PDF, lo servimos inline para el visualizador iframe
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="CV_Dixson_Apaza_' + (type === 'fullstack' ? 'FullStack' : 'QATester') + '.pdf"');
  res.sendFile(filePath);
});

module.exports = router;
