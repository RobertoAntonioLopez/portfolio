  const translations = {
    es: {
      title: 'Roberto Antonio López García — Desarrollador',
      description: 'Portafolio de Roberto Antonio López García, desarrollador full-stack.',
      role: 'Desarrollador de software',
      intro: 'Desarrollo aplicaciones web con JavaScript, Node.js y PostgreSQL. Me interesa construir herramientas útiles y entender bien cómo funcionan.',
      viewProjects: 'Ver proyectos',
      aboutTitle: 'Sobre mí',
      aboutBody: 'Soy desarrollador de software y me interesan especialmente el backend y las bases de datos. Trabajo con JavaScript, Express y SQL para crear aplicaciones completas, desde la API hasta la interfaz.',
      aboutNote: 'Busco una oportunidad de pasantía para aprender de un equipo y aportar lo que he practicado en mis proyectos: validación de datos, pruebas y despliegue.',
      projectsTitle: 'Proyectos',
      projectsNote: 'Cada uno resuelto de punta a punta: interfaz, lógica y datos.',
      noDemo: 'sin demo pública',
      demoAvailable: 'demo disponible',
      tackleDescription: 'Plataforma de gestión de tickets de soporte técnico. Permite crear, consultar, editar y eliminar incidencias, buscarlas y filtrarlas por estado o prioridad. Incluye validación del lado del servidor, estadísticas de carga de trabajo y pruebas de integración para la API.',
      countryDescription: 'Plataforma ciudadana para reportar problemas de la comunidad y darles seguimiento. Busca ofrecer una forma sencilla y transparente de comunicar situaciones que necesitan atención.',
      payrollDescription: 'Sistema básico para administrar empleados y procesar pagos mensuales. Permite crear, editar, buscar y eliminar empleados, configurar porcentajes de deducción, calcular salario bruto y neto, y consultar el historial de nóminas procesadas.',
      todoDescription: 'Aplicación para organizar tareas y pendientes diarios. Permite mantener el trabajo ordenado mediante una experiencia sencilla, rápida y enfocada en lo esencial.',
      viewRepository: 'Ver repositorio',
      viewDemo: 'Ver demo',
      skillsTitle: 'Habilidades',
      interface: 'Interfaz',
      server: 'Servidor',
      data: 'Datos',
      practice: 'Práctica',
      validation: 'Validación de formularios',
      testing: 'Pruebas de integración',
      apiDesign: 'Diseño de APIs',
      contactTitle: 'Hablemos de tu próximo proyecto',
      contactBody: 'Estoy abierto a oportunidades de pasantía y colaboraciones en desarrollo de software.',
      emailMe: 'Escríbeme',
      home: 'Inicio',
      contactLabel: 'Contacto',
      languageAction: 'Cambiar a inglés',
      themeAction: 'Modo oscuro',
      themeToDark: 'Cambiar a modo oscuro',
      themeToLight: 'Cambiar a modo claro',
      location: 'República Dominicana',
      featured: 'Proyecto principal',
      postulaDescription: 'Gestor de postulaciones laborales con seguimiento por etapas, filtros y próxima entrevista. API con Express, datos en PostgreSQL con Neon e interfaz con Flexbox. Desplegado en Cloudflare Workers.',
      tools: 'Herramientas',
      skip: 'Saltar al contenido',
      backTop: 'Volver al inicio',
    },
    en: {
      title: 'Roberto Antonio López García — Developer',
      description: 'Portfolio of Roberto Antonio López García, a full-stack developer.',
      role: 'Software developer',
      intro: 'I build web applications with JavaScript, Node.js and PostgreSQL. I enjoy making useful tools and understanding how they work.',
      viewProjects: 'View projects',
      aboutTitle: 'About me',
      aboutBody: 'I am a software developer with a particular interest in backend development and databases. I use JavaScript, Express and SQL to build complete applications, from the API to the interface.',
      aboutNote: 'I am looking for an internship where I can learn from a team and contribute the skills I practice in my projects: data validation, testing and deployment.',
      projectsTitle: 'Projects',
      projectsNote: 'Each one built end to end: interface, logic and data.',
      noDemo: 'no public demo',
      demoAvailable: 'live demo',
      tackleDescription: 'A technical support ticket management platform. It lets users create, view, edit and delete issues, as well as search and filter them by status or priority. It includes server-side validation, workload statistics and API integration tests.',
      countryDescription: 'A civic platform for reporting community problems and tracking their progress. It offers a simple and transparent way to communicate situations that need attention.',
      payrollDescription: 'A basic system for managing employees and processing monthly payments. It supports employee records, configurable deductions, gross and net salary calculations, and payroll history.',
      todoDescription: 'An application for organizing everyday tasks and responsibilities. It keeps work structured through a simple, fast experience focused on what matters.',
      viewRepository: 'View repository',
      viewDemo: 'View demo',
      skillsTitle: 'Skills',
      interface: 'Interface',
      server: 'Server',
      data: 'Data',
      practice: 'Practice',
      validation: 'Form validation',
      testing: 'Integration testing',
      apiDesign: 'API design',
      contactTitle: 'Let’s talk about your next project',
      contactBody: 'I am open to software development internships and collaborations.',
      emailMe: 'Email me',
      home: 'Home',
      contactLabel: 'Contact',
      languageAction: 'Cambiar a español',
      themeAction: 'Dark mode',
      themeToDark: 'Switch to dark mode',
      themeToLight: 'Switch to light mode',
      location: 'Dominican Republic',
      featured: 'Featured project',
      postulaDescription: 'Job application tracker with stages, filters and upcoming interviews. Express API, PostgreSQL data hosted on Neon and a Flexbox interface. Deployed on Cloudflare Workers.',
      tools: 'Tools',
      skip: 'Skip to content',
      backTop: 'Back to top',
    },
  };


const languageButton = document.querySelector('#language-toggle');
const themeButton = document.querySelector('#theme-toggle');
const themePreference = matchMedia('(prefers-color-scheme: dark)');
let language = 'es';

function readPreference(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}

function savePreference(key, value) {
  try { localStorage.setItem(key, value); } catch { /* La página también funciona sin almacenamiento. */ }
}

function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  const label = translations[language][dark ? 'themeToLight' : 'themeToDark'];
  themeButton.setAttribute('aria-label', label);
  themeButton.title = label;
  themeButton.setAttribute('aria-pressed', String(dark));
  document.querySelector('meta[name="theme-color"]').content = dark ? '#141217' : '#ffffff';
}

function applyLanguage(value) {
  language = Object.hasOwn(translations, value) ? value : 'es';
  const copy = translations[language];
  document.documentElement.lang = language;
  document.title = copy.title;
  document.querySelector('meta[name="description"]').content = copy.description;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const text = copy[element.dataset.i18n];
    if (text) element.textContent = text;
  });
  languageButton.querySelector('strong').textContent = language === 'es' ? 'EN' : 'ES';
  languageButton.setAttribute('aria-label', copy.languageAction);
  updateThemeButton();
}

languageButton.addEventListener('click', () => {
  applyLanguage(language === 'es' ? 'en' : 'es');
  savePreference('roberto-portfolio-language', language);
});

themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  savePreference('roberto-portfolio-theme', theme);
  updateThemeButton();
});

themePreference.addEventListener('change', (event) => {
  if (!['dark', 'light'].includes(readPreference('roberto-portfolio-theme'))) {
    document.documentElement.dataset.theme = event.matches ? 'dark' : 'light';
    updateThemeButton();
  }
});

applyLanguage(readPreference('roberto-portfolio-language'));
