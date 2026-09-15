import fandzaImage from '../assets/img/May.jpeg'
import tressageImage from '../assets/img/tr.jpg'
import artisteImage from '../assets/img/art.png'
import festivalImage from '../assets/img/mbiwi.jpeg'
import mariageImage from '../assets/img/myt.jpeg'
import soireeImage from '../assets/img/chigoma.png'
const traditionImage = fandzaImage
const heroImage = tressageImage

export const navigationLinks = [
  { id: 'accueil', label: 'Accueil' }, { id: 'explorer', label: 'Explorer' }, { id: 'evenements', label: 'Événements' }, { id: 'quiz', label: 'Quiz' }, { id: 'profil', label: 'Profil' },
]

export const themes = ['Tous', 'Traditions', 'Histoires', 'Savoir-faire', 'Arts', 'Musique']

export const stats = [
  { value: '+50', label: 'Traditions partagees', icon: '✦' },
  { value: '+30', label: 'Lieux culturels', icon: '⌖' },
  { value: '+40', label: 'Evenements', icon: '◷' },
  { value: '+120', label: 'Contributeurs', icon: '♧' },
]

export const articles = [
  { id: 1, category: 'Traditions', title: 'Le deba, une danse pleine de grace', theme: 'Traditions', village: 'Pamandzi', generation: 'Transmission familiale', type: 'Video & recit', image: traditionImage, description: 'Une pratique collective ou les voix et les gestes racontent la memoire des femmes de Mayotte.', excerpt: 'Une pratique collective ou les voix et les gestes racontent la memoire des femmes de Mayotte.', content: 'Le deba rassemble les generations autour du chant, du rythme et de la transmission.' },
  { id: 2, category: 'Savoir-faire', title: "L'art du tressage en feuilles de cocotier", theme: 'Savoir-faire', village: 'Mtsamboro', generation: 'Savoir des anciens', type: 'Photo & temoignage', image: heroImage, description: 'Des gestes precis et patients pour transformer les fibres locales en objets du quotidien.', excerpt: 'Des gestes precis et patients pour transformer les fibres locales en objets du quotidien.', content: 'Le tressage est un savoir-faire qui demande observation, patience et precision.' },
  { id: 3, category: 'Musique', title: 'Les rythmes du m’godro', theme: 'Musique', village: 'Mamoudzou', generation: 'Creation contemporaine', type: 'Audio & portrait', image: traditionImage, description: 'Rencontre avec une nouvelle generation de musiciens qui fait dialoguer heritage et creation.', excerpt: 'Rencontre avec une nouvelle generation de musiciens qui fait dialoguer heritage et creation.', content: 'Le m’godro accompagne les fetes et les moments de partage.' },
]

export const events = [
  { id: 1, date: '24 juillet 2026', shortDate: '24 JUIL', start: '2026-09-24', end: '2026-09-24', category: 'festival', title: 'Festival des arts de Mayotte', place: 'Dzaoudzi', location: 'Dzaoudzi', theme: 'Arts', image: festivalImage, description: 'Une scene ouverte aux artistes, danseurs et conteurs de l’ile.' },
  { id: 2, date: '15 aout 2026', shortDate: '15 AOU', start: '2026-10-15', end: '2026-10-15', category: 'ceremonie', title: 'Celebration du mariage traditionnel', place: 'Koungou', location: 'Koungou', theme: 'Traditions', image: mariageImage, description: 'Une journee pour decouvrir les rites, les chants et les parures du mariage mahorais.' },
  { id: 3, date: '05 septembre 2026', shortDate: '05 SEP', start: '2026-11-05', end: '2026-11-05', category: 'tradition', title: 'Soiree traditionnelle', place: 'Mamoudzou', location: 'Mamoudzou', theme: 'Musique', image: soireeImage, description: 'Une soiree de chants et de rythmes traditionnels au cœur de la capitale.' },
]

export const places = [
  { name: 'Musee de Mayotte', village: 'Dzaoudzi', type: 'Patrimoine', access: 'Ouvert' },
  { name: "Maison de l'artisanat", village: 'Mamoudzou', type: 'Savoir-faire', access: 'Ouvert' },
  { name: 'Mediateque de Bandraboua', village: 'Bandraboua', type: 'Transmission', access: 'Sur reservation' },
  { name: 'Place de la mairie', village: 'Koungou', type: 'Evenementiel', access: 'Libre acces' },
]

export const quizQuestions = [
  { question: 'Quelle pratique est associee au chant et a la danse collective ?', options: ['Le deba', 'Le tressage', 'Le pilou'], answer: 0 },
  { question: 'Quel materiau est souvent utilise dans le tressage traditionnel ?', options: ['La feuille de cocotier', 'Le cuivre', 'Le verre'], answer: 0 },
  { question: 'Que permet principalement la transmission orale ?', options: ['Faire vivre la memoire', 'Remplacer les evenements', 'Creer une meteo'], answer: 0 },
  { question: 'Quel est le nom du pate cosmetique traditionnel utilise a Mayotte ?', options: ['Le msindzano', 'Le henne', 'Le karite'], answer: 1 },
  { question: 'Quelle est la langue locale la plus parlee a Mayotte, avec le mahorais ?', options: ['Le shimaore', 'Le shibushi', 'Le malgache classique'], answer: 1 },
  { question: 'Quel type d\'evenement rassemble traditionnellement plusieurs villages a Mayotte ?', options: ['Le carnaval', 'Le mariage traditionnel (manzaraka)', 'La foire agricole'], answer: 1 },
  { question: 'Quel instrument accompagne souvent le deba ?', options: ['Le piano', 'La guitare electrique', 'Le tambourin'], answer: 2 },
  { question: 'Quel savoir-faire artisanal est traditionnellement transmis de mere en fille a Mayotte ?', options: ['La forge', 'Le tressage de nattes', 'La poterie tournee'], answer: 1 },
  { question: 'A quoi sert principalement le msindzano ?', options: ['Teinture des vetements', 'Conservation des aliments', 'Protection et beaute de la peau'], answer: 2 },
  { question: 'Quel plat est emblematique de la cuisine mahoraise ?', options: ['Le riz au coco', 'La choucroute', 'La paella'], answer: 0 },
  { question: 'Quel fruit tropical est particulierement cultive et consomme a Mayotte ?', options: ['La banane', 'L\'ylang-ylang', 'La cannelle'], answer: 0 },
  { question: 'Comment appelle-t-on le tissu traditionnel porte par les femmes mahoraises ?', options: ['Le kimono', 'Le salouva', 'Le boubou'], answer: 1 },
  { question: 'Quelle fleur est cultivee a Mayotte pour la parfumerie ?', options: ['La rose', 'L\'ylang-ylang', 'Le jasmin'], answer: 1 },
  { question: 'Quel role jouent les "grands-meres" (bibi) dans la transmission culturelle ?', options: ['Aucun role particulier', 'Elles transmettent contes et savoirs traditionnels', 'Elles gerent uniquement l\'agriculture'], answer: 1 },
  { question: 'Quelle danse traditionnelle est souvent pratiquee lors des fetes a Mayotte ?', options: ['Le mgodro', 'La salsa', 'Le tango'], answer: 0 },
  { question: 'Quel materiau est traditionnellement utilise pour construire les cases mahoraises ?', options: ['Le beton', 'La terre et les feuilles de cocotier', 'Le metal'], answer: 1 },
  { question: 'Quelle ceremonie marque traditionnellement le passage a l\'age adulte pour les garcons ?', options: ['La circoncision', 'Le baptismal', 'Le mariage'], answer: 0 },
];

export const artists = [
  { id: 21, name: 'Amina Madi', kind: 'Artiste · Danse', town: 'Mamoudzou', image: traditionImage, description: 'Chorégraphe et passeuse de mémoire, elle crée des ponts entre debaa et scène contemporaine.' },
  { id: 22, name: 'Collectif M’biwi', kind: 'Association culturelle', town: 'Bandrélé', image: soireeImage, description: 'Ateliers, veillées et transmissions autour des chants traditionnels.' },
  { id: 23, name: 'Atelier Nyora', kind: 'Artisanat', town: 'Sada', image: heroImage, description: 'Un atelier qui valorise le tressage et les matières naturelles de Mayotte.' },
]
export const moderationItems = [
  { id: 31, title: 'Souvenir de ma grand-mère à Pamandzi', author: 'Nassuf', type: 'Récit', status: 'À relire' },
  { id: 32, title: 'Fabrication d’une natte en raphia', author: 'Siti', type: 'Photo', status: 'À valider' },
]
export const categoryLabels = { festival: 'Festival', tradition: 'Tradition', ceremonie: 'Cérémonie' }

export const contributors = [
  { name: 'Amina M.', role: 'Conteuse, Mamoudzou', initials: 'AM' },
  { name: 'Collectif Moya', role: 'Arts & transmission', initials: 'CM' },
  { name: 'Salim H.', role: 'Musicien, Dzaoudzi', initials: 'SH' },
]