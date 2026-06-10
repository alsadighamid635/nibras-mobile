export const COURSES = [
  { id: "english", name: "اللغة الإنجليزية", nameEn: "English Language", icon: "🇬🇧", category: "لغات", duration: "3 أشهر", description: "تعلم الإنجليزية من الصفر حتى الاحتراف", members: 116 },
  { id: "computer-maintenance", name: "صيانة الكمبيوتر", nameEn: "Computer Maintenance", icon: "💻", category: "تقنية", duration: "2 شهر", description: "صيانة الأجهزة والبرمجيات والشبكات", members: 89 },
  { id: "ai", name: "الذكاء الاصطناعي", nameEn: "Artificial Intelligence", icon: "🤖", category: "تقنية", duration: "4 أشهر", description: "مفاهيم الذكاء الاصطناعي وتطبيقاته", members: 78 },
  { id: "digital-content", name: "صناعة المحتوى الرقمي", nameEn: "Digital Content Creation", icon: "🎬", category: "إبداع", duration: "2 شهر", description: "إنشاء المحتوى الرقمي للمنصات المختلفة", members: 63 },
  { id: "cs-basics", name: "أساسيات علوم الكمبيوتر", nameEn: "Computer Science Basics", icon: "🖥️", category: "تقنية", duration: "3 أشهر", description: "أسس وقواعد علوم الحاسوب للمبتدئين", members: 116 },
  { id: "personal-planning", name: "التخطيط الاستراتيجي الشخصي", nameEn: "Personal Strategic Planning", icon: "📊", category: "تطوير ذاتي", duration: "6 أسابيع", description: "بناء خطة حياة ناجحة ومستدامة", members: 93 },
  { id: "management", name: "إدارة المنظمات والتطوع", nameEn: "Management & Volunteer Organizations", icon: "🏢", category: "إدارة", duration: "2 شهر", description: "أسس إدارة المنظمات والعمل التطوعي", members: 59 },
  { id: "python", name: "برمجة Python", nameEn: "Python Programming", icon: "🐍", category: "برمجة", duration: "3 أشهر", description: "تعلم Python من الأساسيات للمتقدمين", members: 56 },
  { id: "tot", name: "ورشة TOT", nameEn: "Training of Trainers (TOT)", icon: "🎓", category: "تدريب", duration: "5 أيام", description: "برنامج تدريب المدربين المتخصص", members: 53 },
  { id: "cybersecurity", name: "الأمن السيبراني", nameEn: "Cybersecurity", icon: "🔐", category: "تقنية", duration: "4 أشهر", description: "حماية الأنظمة والشبكات من التهديدات", members: 48 },
  { id: "french", name: "اللغة الفرنسية", nameEn: "French Language", icon: "🇫🇷", category: "لغات", duration: "3 أشهر", description: "تعلم الفرنسية للمبتدئين والمتوسطين", members: 46 },
  { id: "osha", name: "OSHA - السلامة المهنية", nameEn: "OSHA - Occupational Safety", icon: "⛑️", category: "سلامة", duration: "1 شهر", description: "معايير السلامة والصحة المهنية الدولية", members: 42 },
  { id: "strategic-planning", name: "التخطيط الاستراتيجي", nameEn: "Strategic Planning", icon: "🎯", category: "إدارة", duration: "6 أسابيع", description: "أدوات وأساليب التخطيط الاستراتيجي", members: 42 },
  { id: "public-speaking", name: "فن الخطابة العامة", nameEn: "The Art of Public Speaking", icon: "🎤", category: "تطوير ذاتي", duration: "2 شهر", description: "مهارات التحدث أمام الجمهور والإلقاء", members: 41 },
];

export const CATEGORIES = ["الكل", "تقنية", "لغات", "برمجة", "إدارة", "تطوير ذاتي", "إبداع", "تدريب", "سلامة"];

export const EDUCATION_LEVELS = ["أقل من الثانوية", "ثانوي", "دبلوم", "بكالوريوس", "ماجستير", "دكتوراه", "أخرى"];

export const GENDERS = ["ذكر", "أنثى"];

export type Course = typeof COURSES[0];
