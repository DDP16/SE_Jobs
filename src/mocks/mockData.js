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
        location: "Hà Nội, Việt Nam",
        industry: "Công nghệ",
        size: "10-50 nhân viên",
        description: `Nomad là công ty công nghệ hàng đầu chuyên cung cấp giải pháp làm việc từ xa.
        
        Chúng tôi tin rằng tương lai của công việc là linh hoạt và không giới hạn. Với đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi tạo ra các sản phẩm giúp kết nối đội ngũ từ xa hiệu quả hơn.
        
        Tại Nomad, chúng tôi luôn đề cao sự sáng tạo, tinh thần học hỏi và văn hóa làm việc tích cực. Mỗi thành viên đều được trao quyền để đóng góp ý tưởng và phát triển sự nghiệp.`,
        jobsCount: 5,
        isHiring: true
    },
    {
        id: 2,
        name: "Dropbox",
        logo: "D",
        location: "Hồ Chí Minh, Việt Nam",
        industry: "Lưu trữ đám mây",
        size: "1000+ nhân viên",
        description: `Dropbox là dịch vụ lưu trữ và chia sẻ file hàng đầu thế giới.
        
        Với hơn 700 triệu người dùng trên toàn cầu, Dropbox giúp mọi người làm việc hiệu quả hơn. Chúng tôi cung cấp nền tảng đám mây an toàn và đáng tin cậy.
        
        Tại Dropbox Việt Nam, chúng tôi tìm kiếm những tài năng đam mê công nghệ, có tư duy sáng tạo và mong muốn tạo ra sản phẩm phục vụ hàng triệu người dùng.`,
        jobsCount: 12,
        isHiring: true
    },
    {
        id: 3,
        name: "Toggl",
        logo: "T",
        location: "Làm việc từ xa",
        industry: "Năng suất",
        size: "50-200 nhân viên",
        description: `Toggl là công cụ quản lý thời gian và năng suất làm việc được tin dùng bởi hơn 5 triệu người.
        
        Sứ mệnh của chúng tôi là giúp mọi người làm việc thông minh hơn, không chỉ chăm chỉ hơn. Chúng tôi tin vào sự cân bằng giữa công việc và cuộc sống.
        
        Với văn hóa làm việc từ xa 100%, Toggl tạo cơ hội cho nhân tài từ mọi nơi trên thế giới có thể cùng nhau xây dựng sản phẩm tuyệt vời.`,
        jobsCount: 8,
        isHiring: true
    },
    {
        id: 4,
        name: "Apple",
        logo: "A",
        location: "Đà Nẵng, Việt Nam",
        industry: "Công nghệ",
        size: "1000+ nhân viên",
        description: `Apple là công ty công nghệ đa quốc gia hàng đầu thế giới chuyên về điện tử tiêu dùng.
        
        Chúng tôi tạo ra những sản phẩm đổi mới làm thay đổi cách con người sống và làm việc. Từ iPhone, iPad đến Mac, mỗi sản phẩm đều thể hiện sự hoàn hảo trong thiết kế và công nghệ.
        
        Apple Việt Nam đang tìm kiếm những kỹ sư, nhà thiết kế và chuyên gia tài năng để cùng nhau tạo ra những sản phẩm định hình tương lai.`,
        jobsCount: 25,
        isHiring: true
    },
    {
        id: 5,
        name: "Google",
        logo: "G",
        location: "Hà Nội, Việt Nam",
        industry: "Công nghệ",
        size: "1000+ nhân viên",
        description: `Google là công ty công nghệ hàng đầu thế giới với sứ mệnh tổ chức thông tin toàn cầu.
        
        Với các sản phẩm như Google Search, Gmail, Maps, YouTube, chúng tôi phục vụ hàng tỷ người dùng mỗi ngày. Chúng tôi luôn đổi mới và tìm kiếm những giải pháp công nghệ tiên tiến.
        
        Tại Google Việt Nam, bạn sẽ làm việc cùng những bộ óc xuất sắc nhất, giải quyết những thách thức lớn và tạo ra tác động toàn cầu.`,
        jobsCount: 50,
        isHiring: true
    },
    {
        id: 6,
        name: "Microsoft",
        logo: "M",
        location: "Hồ Chí Minh, Việt Nam",
        industry: "Công nghệ",
        size: "1000+ nhân viên",
        description: `Microsoft là tập đoàn công nghệ đa quốc gia với sứ mệnh giúp mọi người và tổ chức trên hành tinh đạt được nhiều hơn.
        
        Từ Windows, Office 365 đến Azure, chúng tôi cung cấp các giải pháp công nghệ toàn diện cho doanh nghiệp và cá nhân. Chúng tôi tin vào sức mạnh của công nghệ để thay đổi thế giới.
        
        Microsoft Việt Nam là nơi bạn có thể phát triển sự nghiệp, học hỏi từ những chuyên gia hàng đầu và đóng góp vào những dự án có tầm ảnh hưởng lớn.`,
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
