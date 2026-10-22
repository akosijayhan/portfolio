import type {
    StudentProfile,
    Project,
    Experience,
    SkillCategory,
    Certificate,
} from '../types/portfolio'

// ========================================
// STUDENT PROFILE
// ========================================

export const profile: StudentProfile = {
    name: 'Jayhan B. Dayag ',
    title: 'Computer Engineering Student & Hardware/Software Developer',
    degree: 'Bachelor of Science in Computer Engineering',
    university: 'Cagayan State University – Carig Campus',
    bio: ' I am Mapagmahal',
    email: 'akosijayhan@gmail.com',
    github: 'https://github.com/akosijayhan',
    facebook: 'https://www.facebook.com/akosijayhan',
    instagram: 'https://www.instagram.com/jayhahahan/',
    location: 'Tuguegarao City, Cagayan, Philippines',
    avatarUrl: 'coe.jpg',
}


export const projects: Project[] = [
    {
        id: 1,
        title: 'PIC Development Kit Board',
        description:
            'All-in-one hardware platform designed to simplify prototyping and testing applications using Microchip PIC microcontrollers.',
        tags: [],
        githubUrl: 'https://github.com/akosijayhan',
        featured: true,
    },
    {
        id: 2,
        title: 'Custom DC-DC / AC-DC Power Supply',
        description:
            'End-to-end development of a custom power supply from schematic capture and simulation to multilayer PCB layout and hardware validation, achieving 100% efficiency.',
        tags: [],
        githubUrl: 'https://github.com/akosijayhan',
        featured: true,
    },
    {
        id: 3,
        title: 'Golden Harvest Subdivision Boarding House Finder',
        description:
            'A web-based rental management platform designed to help boarders find rental rooms while enabling landlords to post, manage, and monitor listings.',
        tags: [],
        githubUrl: 'https://github.com/akosijayhan',
        featured: true,
    },
    {
        id: 4,
        title: 'Eco-Charge',
        description:
            'An Arduino-based, sustainable charging system designed to detect and collect recyclable plastic bottles, providing mobile device charging in exchange for each accepted bottle while promoting proper waste disposal and environmental sustainability.',
        tags: [],
        githubUrl: '',
        featured: false,
    },
    {
        id: 5,
        title: 'Dinosaur Museum Management System',
        description:
            'A relational database and web-based system designed to manage dinosaur exhibits, track specimen activities, log visitor interactions, and streamline museum operations.',
        tags: [],
        githubUrl: 'https://github.com/akosijayhan',
        featured: false,
    },
];


export const experiences: Experience[] = [
    {
        role: 'Hardware',
        organization: 'Cagayan State University – Carig Campus',
        period: '2023 – Present',
        description:
            'Designed and developed a custom PCB power supply using Multisim for circuit design and simulation. Managed the hardware development lifecycle, including circuit layout, fabrication, testing, and performance validation. Gained hands-on experience in PIC microcontroller architecture by developing embedded projects using C and Assembly in MPLAB X IDE, utilizing PICKit for hardware debugging and system validation on development boards.',
    },
    {
        role: 'Software ',
        organization: 'Software Development Projects',
        period: '2025 – Present',
        description:
            'Created and executed test cases to identify bugs, system errors, and UI/UX inconsistencies. Documented and reported issues to the development team, verified implemented fixes, and performed regression testing to ensure system functionality, reliability, and usability.',
    },
    {
        role: 'On-the-Job Trainee ',
        organization: 'RBC Cable Master',
        period: 'OJT Period',
        description:
            'Gained hands-on experience in network installation, configuration, and troubleshooting. Assisted with NAP installation and testing, modem and router configuration, fiber optic splicing, and optical power meter testing. Developed practical skills in telecommunications infrastructure, network connectivity, equipment handling, and technical support.',
    },
    {
        role: 'Humanities and Social Sciences (HUMSS)',
        organization: 'Cataggaman National High School',
        period: '2017 – 2023',
        description:
            'Completed Senior High School education with a foundation in analytical thinking, public speaking, communication, and community research.',
    },
]

// ========================================
// SKILLS
// ========================================

export const skillCategories: SkillCategory[] = [
    {
        category: 'Hardware & Embedded Engineering',
        skills: [
            'PIC Microcontrollers',
            'MPLAB X IDE',
            'PICKit Debugging',
            'MULTISIM Simulation',
            'PCB Design & Layout',
            'Circuit Troubleshooting',
            'Hardware Diagnostics',
        ],
    },
    {
        category: 'Software & Web Development',
        skills: [
            'Embedded C',
            'Assembly',
            'Python',
            'JavaScript / TypeScript',
            'Vue.js',
            'Django REST Framework',
            'HTML5 / CSS3',
        ],
    },
    {
        category: 'Core Engineering Competencies',
        skills: [
            'Analytical & Problem Solving',
            'Team Collaboration',
            'System Architecture (Frontend-Backend-DB)',
            'QA Test Case Execution',
            'Bug Reporting & Regression Testing',
        ],
    },
]

// ========================================
// CERTIFICATES & ELIGIBILITY
// ========================================

export const certificates: Certificate[] = [
    {
        id: 1,
        title: 'Civil Service Professional Eligibility',
        issuer: 'Civil Service Commission (CSC)',
        date: 'March 2025',
        imageUrl: '/Dayag.png',
    },
    {
        id: 2,
        title: 'PIC Microcontroller & Embedded Systems Certification',
        issuer: 'Cagayan State University',
        date: '2024',
        imageUrl: '/img.png',
    },
]