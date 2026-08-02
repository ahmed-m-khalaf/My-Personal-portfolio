import { getT } from '../../data/translations';

export const getHeroData = (lang = 'en') => {
    const t = getT(lang);
    const isArabic = lang === 'ar';
    
    return {
        name: t('hero.name', 'Ahmed M Khalaf'),
        title: t('hero.title', 'React Specialist'),
        roles: t('hero.roles', ["React Specialist", "UI/UX Engineer", "Web Optimizer"]),
        tagline: t('hero.tagline', 'Building fast, scalable and delightful web experiences.'),
        availability: isArabic ? "متاح للعمل" : "Available for work",
        buttons: {
            primary: { label: t('hero.ctas.viewWork', 'Explore Projects →'), href: "#projects" },
            secondary: { label: t('sections.downloadCv', 'Download Resume'), href: "/resume.pdf" }
        },
        stats: [
            { label: "React", value: isArabic ? "خبير" : "Expert", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
            { label: "Next.js", value: isArabic ? "متقدم" : "Advanced", color: "bg-white/5 text-gray-200 border-white/10" },
            { label: "TypeScript", value: isArabic ? "قوي" : "Strong", color: "bg-blue-600/10 text-blue-300 border-blue-600/20" },
            { label: isArabic ? "مشاريع" : "Projects", value: "10+", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" }
        ],
        socials: [
            { name: "Email", url: "mailto:ahmdalmhmwd939@gmail.com", icon: "email" },
            { name: "GitHub", url: "https://github.com/ahmed-m-khalaf", icon: "github" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/ahmed-m-khalaf-9157aa319", icon: "linkedin" },
            { name: "Facebook", url: "https://www.facebook.com/profile.php?id=100012536446096&locale=ar_AR", icon: "facebook" },
            { name: "Instagram", url: "https://www.instagram.com/ahmedmkhalaf1/", icon: "instagram" }
        ]
    };
};
