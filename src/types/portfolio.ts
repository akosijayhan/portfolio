export interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    imageUrl?: string;
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
}

export interface Experience {
    role: string;
    organization: string;
    period: string;
    description: string;
}

export interface SkillCategory {
    category: string;
    skills: string[];
}

export interface StudentProfile {
    name: string;
    title: string;
    degree: string;
    university: string;
    bio: string;
    email: string;
    github: string;
    facebook: string;
    instagram: string;
    location: string;
    avatarUrl?: string;
}
export interface Certificate {
    id: number;
    title: string;
    issuer: string;
    date: string;
    imageUrl: string;
    credentialUrl?: string;
}