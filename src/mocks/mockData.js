// Mock data for development
export const mockJobs = [
    {
        id: 1,
        title: "Social Media Assistant",
        company: "Nomad",
        location: "Paris, France",
        type: "Full-time",
        salary: "€2,000 - €3,000",
        description: "We are looking for a Social Media Assistant to join our team. You will be responsible for managing our social media accounts and creating engaging content.",
        tags: ["Marketing", "Design", "Social Media"],
        logo: "N",
        isFeatured: true,
        applied: 5,
        capacity: 10
    },
    {
        id: 2,
        title: "Brand Designer",
        company: "Dropbox",
        location: "San Francisco, USA",
        type: "Full-time",
        salary: "$4,000 - $6,000",
        description: "We are looking for a Brand Designer to join our team. You will be responsible for creating visual designs and brand guidelines.",
        tags: ["Design", "Branding", "Creative"],
        logo: "D",
        isFeatured: false,
        applied: 8,
        capacity: 12
    },
    {
        id: 3,
        title: "Interactive Developer",
        company: "Toggl",
        location: "Remote",
        type: "Full-time",
        salary: "$3,000 - $5,000",
        description: "We are looking for an Interactive Developer to join our team. You will be responsible for developing interactive web applications.",
        tags: ["Development", "JavaScript", "React"],
        logo: "T",
        isFeatured: true,
        applied: 3,
        capacity: 8
    },
    {
        id: 4,
        title: "Product Designer",
        company: "Apple",
        location: "Cupertino, USA",
        type: "Full-time",
        salary: "$5,000 - $8,000",
        description: "We are looking for a Product Designer to join our team. You will be responsible for designing user experiences and interfaces.",
        tags: ["Design", "UX", "UI"],
        logo: "A",
        isFeatured: false,
        applied: 12,
        capacity: 15
    },
    {
        id: 5,
        title: "Frontend Developer",
        company: "Google",
        location: "Mountain View, USA",
        type: "Full-time",
        salary: "$6,000 - $10,000",
        description: "We are looking for a Frontend Developer to join our team. You will be responsible for developing user-facing features.",
        tags: ["Development", "React", "JavaScript"],
        logo: "G",
        isFeatured: true,
        applied: 15,
        capacity: 20
    },
    {
        id: 6,
        title: "UX Researcher",
        company: "Microsoft",
        location: "Seattle, USA",
        type: "Full-time",
        salary: "$4,500 - $7,000",
        description: "We are looking for a UX Researcher to join our team. You will be responsible for conducting user research and usability testing.",
        tags: ["Research", "UX", "Analytics"],
        logo: "M",
        isFeatured: false,
        applied: 7,
        capacity: 12
    },
    {
        id: 7,
        title: "Product Designer",
        company: "Apple",
        location: "Cupertino, USA",
        type: "Full-time",
        salary: "$5,000 - $8,000",
        description: "We are looking for a Product Designer to join our team. You will be responsible for designing user experiences and interfaces.",
        tags: ["Design", "UX", "UI"],
        logo: "A",
        isFeatured: false,
        applied: 12,
        capacity: 15
    },
    {
        id: 8,
        title: "Frontend Developer",
        company: "Google",
        location: "Mountain View, USA",
        type: "Full-time",
        salary: "$6,000 - $10,000",
        description: "We are looking for a Frontend Developer to join our team. You will be responsible for developing user-facing features.",
        tags: ["Development", "React", "JavaScript"],
        logo: "G",
        isFeatured: true,
        applied: 15,
        capacity: 20
    },
    {
        id: 9,
        title: "UX Researcher",
        company: "Microsoft",
        location: "Seattle, USA",
        type: "Full-time",
        salary: "$4,500 - $7,000",
        description: "We are looking for a UX Researcher to join our team. You will be responsible for conducting user research and usability testing.",
        tags: ["Research", "UX", "Analytics"],
        logo: "M",
        isFeatured: false,
        applied: 7,
        capacity: 12
    }
];

export const mockCompanies = [
    {
        id: 1,
        name: "Nomad",
        logo: "N",
        location: "Paris, France",
        industry: "Technology",
        size: "10-50 employees",
        description: "We are a technology company focused on creating innovative solutions for remote work.",
        jobsCount: 5,
        isHiring: true
    },
    {
        id: 2,
        name: "Dropbox",
        logo: "D",
        location: "San Francisco, USA",
        industry: "Cloud Storage",
        size: "1000+ employees",
        description: "Dropbox is a file hosting service that offers cloud storage, file synchronization, and client software.",
        jobsCount: 12,
        isHiring: true
    },
    {
        id: 3,
        name: "Toggl",
        logo: "T",
        location: "Remote",
        industry: "Productivity",
        size: "50-200 employees",
        description: "Toggl is a time tracking and productivity tool that helps teams and individuals track their time.",
        jobsCount: 8,
        isHiring: true
    },
    {
        id: 4,
        name: "Apple",
        logo: "A",
        location: "Cupertino, USA",
        industry: "Technology",
        size: "1000+ employees",
        description: "Apple Inc. is an American multinational technology company that specializes in consumer electronics.",
        jobsCount: 25,
        isHiring: true
    },
    {
        id: 5,
        name: "Google",
        logo: "G",
        location: "Mountain View, USA",
        industry: "Technology",
        size: "1000+ employees",
        description: "Google is a multinational technology company specializing in Internet-related services and products.",
        jobsCount: 50,
        isHiring: true
    },
    {
        id: 6,
        name: "Microsoft",
        logo: "M",
        location: "Seattle, USA",
        industry: "Technology",
        size: "1000+ employees",
        description: "Microsoft Corporation is an American multinational technology corporation which produces computer software.",
        jobsCount: 30,
        isHiring: true
    }
];

export const mockCategories = [
    { id: 1, name: "Design", count: 235, icon: "Palette" },
    { id: 2, name: "Sales", count: 756, icon: "BusinessCenter" },
    { id: 3, name: "Marketing", count: 140, icon: "TrendingUp" },
    { id: 4, name: "Finance", count: 325, icon: "AttachMoney" },
    { id: 5, name: "Technology", count: 436, icon: "Computer" },
    { id: 6, name: "Engineering", count: 542, icon: "Engineering" },
    { id: 7, name: "Business", count: 211, icon: "Lightbulb" },
    { id: 8, name: "Human Resource", count: 346, icon: "Groups" }
];

export const mockPopularSearches = [
    "React Native",
    "Objective C",
    "Swift",
    "CI/CD",
    "Android",
    "iOS",
    "Flutter",
    "Kotlin"
];
