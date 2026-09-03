  const translations = {
    es: {
      title: 'Roberto Antonio López García — Desarrollador',
      description: 'Portafolio de Roberto Antonio López García, desarrollador full-stack.',
      role: 'Desarrollador full-stack',
      intro: '¡Hey! Soy Roberto. Desde muy chico me encantan la tecnología, la música y el fútbol. Como no pude ser cantante ni futbolista, aquí estoy: creando soluciones con código.',
      viewProjects: 'Ver proyectos',
      aboutTitle: 'Sobre mí',
      aboutBody: 'Me gusta entender cómo funcionan las cosas y encontrar formas de hacerlas más simples. Disfruto aprender, probar ideas nuevas y enfrentar problemas que me obliguen a pensar de manera diferente.',
      aboutNote: 'Todavía tengo mucho por aprender, pero esa es precisamente una de las cosas que más me entusiasma de este camino: siempre hay algo nuevo que descubrir y una mejor manera de hacer las cosas.',
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
      contactBody: 'Si tienes un problema que resolver con código, o simplemente quieres ver más de mi trabajo, aquí me encuentras.',
      emailMe: 'Escríbeme',
      home: 'Inicio',
      contactLabel: 'Contacto',
      languageAction: 'Cambiar a inglés',
      themeAction: 'Modo oscuro',
      themeToDark: 'Cambiar a modo oscuro',
      themeToLight: 'Cambiar a modo claro',
    },
    en: {
      title: 'Roberto Antonio López García — Developer',
      description: 'Portfolio of Roberto Antonio López García, a full-stack developer.',
      role: 'Full-stack developer',
      intro: "Hey! I'm Roberto. I've loved technology, music and football since I was a kid. I couldn't become a singer or a footballer, so here I am: building solutions with code.",
      viewProjects: 'View projects',
      aboutTitle: 'About me',
      aboutBody: 'I enjoy understanding how things work and finding ways to make them simpler. I like learning, trying new ideas and facing problems that challenge me to think differently.',
      aboutNote: 'I still have a lot to learn, but that is exactly what excites me about this path: there is always something new to discover and a better way to do things.',
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
      contactBody: 'If you have a problem that code can solve, or simply want to see more of my work, you can find me here.',
      emailMe: 'Email me',
      home: 'Home',
      contactLabel: 'Contact',
      languageAction: 'Cambiar a español',
      themeAction: 'Dark mode',
      themeToDark: 'Switch to dark mode',
      themeToLight: 'Switch to light mode',
    },
  };

  const preferenceKeys = {
    language: 'roberto-portfolio-language',
    theme: 'roberto-portfolio-theme',
  };

  const languageButton = document.getElementById('language-toggle');
  const themeButton = document.getElementById('theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  let currentLanguage = localStorage.getItem(preferenceKeys.language) || 'es';
  let currentTheme = localStorage.getItem(preferenceKeys.theme)
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  let languageChanging = false;

  function updateThemeControl() {
    const copy = translations[currentLanguage];
    const action = currentTheme === 'dark' ? copy.themeToLight : copy.themeToDark;
    const label = themeButton.querySelector('.tool-label');

    label.textContent = action;
    themeButton.setAttribute('aria-label', action);
  }

  function applyLanguage(language) {
    const copy = translations[language];
    currentLanguage = language;

    document.documentElement.lang = language;
    document.title = copy.title;
    document.querySelector('meta[name="description"]').content = copy.description;

    document.querySelectorAll('[data-i18n]').forEach(element => {
      element.textContent = copy[element.dataset.i18n];
    });

    languageButton.querySelector('strong').textContent = language === 'es' ? 'EN' : 'ES';
    languageButton.setAttribute('aria-label', copy.languageAction);
    localStorage.setItem(preferenceKeys.language, language);
    updateThemeControl();
  }

  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.dataset.theme = theme;
    themeColor.content = theme === 'dark' ? '#1b1a17' : '#efe7d6';
    localStorage.setItem(preferenceKeys.theme, theme);
    updateThemeControl();
  }

  function changeLanguage() {
    if (languageChanging) return;

    const nextLanguage = currentLanguage === 'es' ? 'en' : 'es';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      applyLanguage(nextLanguage);
      return;
    }

    languageChanging = true;
    document.body.classList.add('language-changing');

    window.setTimeout(() => {
      applyLanguage(nextLanguage);

      window.requestAnimationFrame(() => {
        document.body.classList.remove('language-changing');
        languageChanging = false;
      });
    }, 180);
  }

  languageButton.addEventListener('click', changeLanguage);

  themeButton.addEventListener('click', () => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  applyLanguage(currentLanguage);
  applyTheme(currentTheme);
