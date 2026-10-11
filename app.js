'use strict';
(() => {
const root = document.documentElement;
const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
const save = (key,value) => { try { localStorage.setItem(key,value); } catch {} };
const en = {
skip:'Skip to content',aboutTitle:'About me',projectsTitle:'Projects',skillsTitle:'Skills',contactLabel:'Contact',location:'Dominican Republic',role:'Software developer',intro:'I’m a final-term ITLA student and software developer. I build web applications with JavaScript, Node.js and PostgreSQL, with a particular interest in backend development and databases.',viewProjects:'View projects',emailMe:'Email me',workNote:'From a problem to an application you can try.',imageCaption:'VeriQ · Verification dashboard with test data.',featured:'Latest project',veriqDescription:'A place to define what to test, record results and track defects through to closure. Express API, PostgreSQL on Neon and a shared demo on Cloudflare Workers.',challengeLabel:'The challenge',challengeText:'Edit a test case without losing evidence of what was tested.',decisionLabel:'The decision',decisionText:'Save a copy of the case with each execution and protect its history.',evidenceLabel:'The evidence',evidenceText:'47 passing tests and documented results ↗',viewDemo:'View demo',viewRepository:'View repository',demoAvailable:'demo available',postulaDescription:'A job application tracker with stage tracking, filters and upcoming interviews. Express API, PostgreSQL on Neon and a Flexbox interface. Deployed on Cloudflare Workers.',tackleDescription:'A technical support ticket management platform. Create, view, edit and delete issues, and search and filter them by status or priority. Includes server-side validation, workload statistics and API integration tests.',moreProjects:'More projects and exercises',noDemo:'no public demo',countryDescription:'A civic platform for reporting community problems and tracking their progress. A simple, transparent way to communicate situations that need attention.',payrollDescription:'A basic system for managing employees and processing monthly payments. Create, edit, search and delete employees, configure deduction rates, calculate gross and net pay, and consult payroll history.',todoDescription:'An application for organizing daily tasks and to-dos. Keep work organized with a simple, fast experience focused on the essentials.',aboutNote:'I’m looking for an internship where I can learn from a team and contribute what I’ve practiced in my projects: data validation, testing and deployment.',data:'Data',tools:'Tools',contactHeading:'Looking for someone to join your team?',contactBody:'I’m open to internship opportunities and collaborations in software development.',backTop:'Back to top',imageMissing:'Preview not included. Explore VeriQ in the demo ↗'
};
const translated = [...document.querySelectorAll('[data-i18n]')];
const spanish = new Map(translated.map(el => [el,el.textContent]));
let language = read('roberto-portfolio-language') === 'en' ? 'en' : 'es';
const shell = document.querySelector('.shell');
const menu = document.getElementById('sidebar-content');
const toggle = document.getElementById('sidebar-toggle');
const mobile = matchMedia('(max-width: 900px)');
let collapsed = mobile.matches || read('roberto-portfolio-sidebar') === 'collapsed';
function labels() {
 const english = language === 'en';
 const dark = root.dataset.theme === 'dark';
 document.getElementById('theme-toggle').setAttribute('aria-pressed',String(dark));
 document.querySelector('meta[name="theme-color"]').content=dark?'#0a100d':'#f3f5f1';
 document.getElementById('language-toggle').innerHTML = `<strong>${english?'ES':'EN'}</strong>`;
 document.getElementById('language-toggle').setAttribute('aria-label',english?'Switch to Spanish':'Cambiar a inglés');
 document.getElementById('theme-toggle').setAttribute('aria-label',english?(dark?'Switch to light mode':'Switch to dark mode'):(dark?'Cambiar a modo claro':'Cambiar a modo oscuro'));
 toggle.setAttribute('aria-label',english?(collapsed?'Expand menu':'Collapse menu'):(collapsed?'Expandir menú':'Colapsar menú'));
 document.querySelector('nav').setAttribute('aria-label',english?'Main navigation':'Navegación principal');
 document.querySelector('.brand').setAttribute('aria-label',english?'Roberto López, home':'Roberto López, inicio');
}
function renderMenu() {
 shell.classList.toggle('is-collapsed',collapsed);
 menu.hidden = collapsed;
 toggle.setAttribute('aria-expanded',String(!collapsed));
 labels();
}
function translate() {
 root.lang=language;
 document.title=language==='en'?'Roberto Antonio López García — Software developer':'Roberto Antonio López García — Desarrollador de software';
 document.querySelector('meta[name="description"]').content=language==='en'?'Portfolio of Roberto Antonio López García, software developer in the Dominican Republic.':'Portafolio de Roberto Antonio López García, desarrollador de software en República Dominicana.';
 translated.forEach(el=>el.textContent=language==='en' ? en[el.dataset.i18n] ?? spanish.get(el) : spanish.get(el));
 document.querySelectorAll('[data-es][data-en]').forEach(el=>el.textContent=el.dataset[language]);
 document.querySelector('.project-visual img').alt=language==='en'?'VeriQ dashboard showing test cases, results and defects':'Dashboard de VeriQ con casos, resultados de pruebas y defectos';
 labels();
}
document.getElementById('language-toggle').addEventListener('click',()=>{language=language==='es'?'en':'es';save('roberto-portfolio-language',language);translate();});
document.getElementById('theme-toggle').addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';save('roberto-portfolio-theme',root.dataset.theme);labels();});
toggle.addEventListener('click',()=>{collapsed=!collapsed;if(!mobile.matches)save('roberto-portfolio-sidebar',collapsed?'collapsed':'expanded');renderMenu();});
mobile.addEventListener('change',()=>{collapsed=mobile.matches || read('roberto-portfolio-sidebar')==='collapsed';renderMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!collapsed){collapsed=true;toggle.focus();renderMenu();}});
const links=[...document.querySelectorAll('nav a')];
links.forEach(link=>link.addEventListener('click',()=>{if(mobile.matches){collapsed=true;renderMenu();const target=document.querySelector(link.hash);target.tabIndex=-1;target.focus({preventScroll:true});}}));
function currentSection() {
 let active=null;
 links.forEach(link=>{const section=document.querySelector(link.hash);if(section.getBoundingClientRect().top<=innerHeight*.4)active=link;});
 links.forEach(link=>{if(link===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
}
let scheduled=false;
addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{currentSection();scheduled=false;});}},{passive:true});
const img=document.querySelector('.project-visual img');
function missingImage(){img.hidden=true;img.parentElement.hidden=true;document.querySelector('.project-visual figcaption').hidden=true;document.querySelector('.image-fallback').hidden=false;}
img.addEventListener('error',missingImage);
if(img.complete&&!img.naturalWidth)missingImage();
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',event=>{if(!['light','dark'].includes(read('roberto-portfolio-theme'))){root.dataset.theme=event.matches?'dark':'light';labels();}});
translate();renderMenu();currentSection();
})();
