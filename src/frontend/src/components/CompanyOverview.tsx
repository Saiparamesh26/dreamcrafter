import { Building2, ExternalLink, MapPin, Users } from "lucide-react";

interface CompanyData {
  description: string;
  founded: number;
  hq: string;
  ceo: string;
  employees: string;
  website: string;
  type: string;
  industry: string;
}

const COMPANY_DATA: Record<string, CompanyData> = {
  OpenAI: {
    description:
      "OpenAI is an AI safety company and creator of GPT-4, ChatGPT, and DALL-E. Founded as a non-profit, it has transitioned to a capped-profit model. OpenAI's mission is to ensure artificial general intelligence benefits all of humanity.",
    founded: 2015,
    hq: "San Francisco, CA",
    ceo: "Sam Altman",
    employees: "3,500+",
    website: "https://openai.com",
    type: "Private",
    industry: "AI Research",
  },
  Anthropic: {
    description:
      "Anthropic is an AI safety company focused on building reliable, interpretable, and steerable AI systems. Creators of Claude, the AI assistant. Backed by Amazon and Google with a focus on responsible AI development.",
    founded: 2021,
    hq: "San Francisco, CA",
    ceo: "Dario Amodei",
    employees: "2,500+",
    website: "https://anthropic.com",
    type: "Private",
    industry: "AI Safety",
  },
  GitHub: {
    description:
      "GitHub is the world's leading software development platform with over 100 million developers. Owned by Microsoft, it hosts Git repositories and provides CI/CD, code review, and collaboration tools including GitHub Copilot.",
    founded: 2008,
    hq: "San Francisco, CA",
    ceo: "Thomas Dohmke",
    employees: "3,000+",
    website: "https://github.com",
    type: "Subsidiary (Microsoft)",
    industry: "Developer Tools",
  },
  Stripe: {
    description:
      "Stripe is a global payment infrastructure company that enables businesses of all sizes to accept payments and manage their revenue online. Processes over $1 trillion in total payment volume annually.",
    founded: 2010,
    hq: "San Francisco, CA",
    ceo: "Patrick Collison",
    employees: "8,000+",
    website: "https://stripe.com",
    type: "Private",
    industry: "Fintech / Payments",
  },
  Figma: {
    description:
      "Figma is a collaborative interface design tool used by millions of designers and developers worldwide. Known for its real-time collaboration, Figma AI, and developer handoff capabilities through Dev Mode.",
    founded: 2012,
    hq: "San Francisco, CA",
    ceo: "Dylan Field",
    employees: "1,400+",
    website: "https://figma.com",
    type: "Private",
    industry: "Design Tools",
  },
  Notion: {
    description:
      "Notion is an all-in-one workspace for notes, docs, databases, and project management. It combines the functionality of multiple tools into a single collaborative platform with powerful AI capabilities.",
    founded: 2016,
    hq: "San Francisco, CA",
    ceo: "Ivan Zhao",
    employees: "800+",
    website: "https://notion.so",
    type: "Private",
    industry: "Productivity",
  },
  Linear: {
    description:
      "Linear is a streamlined project management tool built for high-performance engineering teams. Known for its speed, keyboard-first design, and opinionated workflow that keeps teams focused on building.",
    founded: 2019,
    hq: "San Francisco, CA",
    ceo: "Karri Saarinen",
    employees: "100+",
    website: "https://linear.app",
    type: "Private",
    industry: "Project Management",
  },
  Slack: {
    description:
      "Slack is a business communication platform owned by Salesforce, offering channels, direct messaging, and deep integrations with enterprise tools. Slack AI brings intelligent summaries and search to workplace communication.",
    founded: 2013,
    hq: "San Francisco, CA",
    ceo: "Denise Dresser",
    employees: "2,000+",
    website: "https://slack.com",
    type: "Subsidiary (Salesforce)",
    industry: "Communication",
  },
  Atlassian: {
    description:
      "Atlassian is a public company that builds collaboration software including Jira, Confluence, and Trello. Serving 300,000+ customers worldwide with a fully distributed workforce under the TEAM Anywhere model.",
    founded: 2002,
    hq: "Sydney, Australia",
    ceo: "Scott Farquhar",
    employees: "12,000+",
    website: "https://atlassian.com",
    type: "Public (NASDAQ:TEAM)",
    industry: "Collaboration",
  },
  GitLab: {
    description:
      "GitLab is a complete DevSecOps platform delivering the entire software development lifecycle in a single application. A fully remote company with a strong open-source community and enterprise security focus.",
    founded: 2011,
    hq: "San Francisco, CA",
    ceo: "Sid Sijbrandij",
    employees: "2,100+",
    website: "https://gitlab.com",
    type: "Public (NASDAQ:GTLB)",
    industry: "DevOps",
  },
  Vercel: {
    description:
      "Vercel is the platform for frontend developers, creators of Next.js. It provides instant deployments, global edge networking, and a serverless infrastructure optimized for modern web applications.",
    founded: 2015,
    hq: "San Francisco, CA",
    ceo: "Guillermo Rauch",
    employees: "700+",
    website: "https://vercel.com",
    type: "Private",
    industry: "Cloud Infrastructure",
  },
  HashiCorp: {
    description:
      "HashiCorp provides infrastructure automation software including Terraform and Vault. Acquired by IBM in 2024 for $6.4B, its tools are widely used for cloud infrastructure provisioning and secrets management.",
    founded: 2012,
    hq: "San Francisco, CA",
    ceo: "Armon Dadgar",
    employees: "2,500+",
    website: "https://hashicorp.com",
    type: "Subsidiary (IBM)",
    industry: "Infrastructure",
  },
  // ─── India IT Giants ───────────────────────────────────────────────────────
  TCS: {
    description:
      "Tata Consultancy Services (TCS) is India's largest IT services company and a global leader in IT, consulting, and business solutions. Part of the Tata Group, TCS serves clients across 46 countries with over 600,000 employees and is listed on BSE and NSE.",
    founded: 1968,
    hq: "Mumbai, India",
    ceo: "K Krithivasan",
    employees: "600,000+",
    website: "https://www.tcs.com",
    type: "Public (BSE/NSE: TCS)",
    industry: "IT Services",
  },
  Tata: {
    description:
      "Tata Group is one of India's largest and most respected conglomerates, operating across 100+ countries in sectors including IT, steel, automotive, hospitality, and consumer goods. With over 935,000 employees worldwide, Tata is synonymous with Indian enterprise on the global stage.",
    founded: 1868,
    hq: "Mumbai, India",
    ceo: "N Chandrasekaran",
    employees: "935,000+",
    website: "https://www.tata.com",
    type: "Private/Public subsidiaries",
    industry: "Conglomerate",
  },
  Infosys: {
    description:
      "Infosys is a global leader in next-generation digital services and consulting with over 340,000 employees. It enables clients across 56 countries to navigate digital transformation and operates with a focus on cloud, AI, and sustainability.",
    founded: 1981,
    hq: "Bengaluru, India",
    ceo: "Salil Parekh",
    employees: "340,000+",
    website: "https://www.infosys.com",
    type: "Public (NYSE: INFY)",
    industry: "IT Services",
  },
  Wipro: {
    description:
      "Wipro is a leading global IT, consulting and business process services company. With over 250,000 employees serving clients across 65 countries, Wipro drives transformation through cloud, AI, engineering, and digital services.",
    founded: 1945,
    hq: "Bengaluru, India",
    ceo: "Srinivas Pallia",
    employees: "250,000+",
    website: "https://www.wipro.com",
    type: "Public (NYSE: WIT)",
    industry: "IT Services",
  },
  HCLTech: {
    description:
      "HCL Technologies is a next-generation global technology company that helps enterprises reimagine their businesses for the digital age. With a presence in 60 countries and 230,000+ employees, HCLTech delivers IT and business services.",
    founded: 1976,
    hq: "Noida, India",
    ceo: "C Vijayakumar",
    employees: "230,000+",
    website: "https://www.hcltech.com",
    type: "Public (NSE: HCLTECH)",
    industry: "IT Services",
  },
  TechMahindra: {
    description:
      "Tech Mahindra is part of the Mahindra Group and is a $6.5 billion company with 160,000+ professionals across 90 countries. It delivers digital transformation, consulting, and re-engineering services across sectors.",
    founded: 1986,
    hq: "Pune, India",
    ceo: "Mohit Joshi",
    employees: "160,000+",
    website: "https://www.techmahindra.com",
    type: "Public (NSE: TECHM)",
    industry: "IT Services",
  },
  // ─── India Startups / Growth ──────────────────────────────────────────────
  Zomato: {
    description:
      "Zomato (now Eternal Ltd) is India's leading food delivery and quick-commerce platform, operating in 800+ cities. It also runs Blinkit (10-minute grocery delivery) and Hyperpure (B2B ingredient supply).",
    founded: 2008,
    hq: "Gurugram, India",
    ceo: "Deepinder Goyal",
    employees: "15,000+",
    website: "https://www.zomato.com",
    type: "Public (NSE: ZOMATO)",
    industry: "Food Tech",
  },
  Razorpay: {
    description:
      "Razorpay is India's leading full-stack payments and financial services platform, powering payments for over 8 million businesses. It offers payment gateway, neo-banking, lending, and payroll solutions.",
    founded: 2014,
    hq: "Bengaluru, India",
    ceo: "Harshil Mathur",
    employees: "3,000+",
    website: "https://razorpay.com",
    type: "Private",
    industry: "Fintech",
  },
  Freshworks: {
    description:
      "Freshworks is a global SaaS company making business software that's refreshingly easy to use. Its AI-powered suite includes CRM, ITSM, and customer support tools used by 68,000+ companies worldwide.",
    founded: 2010,
    hq: "San Mateo, CA",
    ceo: "Dennis Woodside",
    employees: "5,000+",
    website: "https://www.freshworks.com",
    type: "Public (NASDAQ: FRSH)",
    industry: "SaaS / CRM",
  },
  Swiggy: {
    description:
      "Swiggy is India's leading on-demand convenience platform for food delivery, grocery (Instamart), and more. Operating in 580+ cities, Swiggy connects millions of consumers with restaurants and stores daily.",
    founded: 2014,
    hq: "Bengaluru, India",
    ceo: "Sriharsha Majety",
    employees: "15,000+",
    website: "https://www.swiggy.com",
    type: "Public (NSE: SWIGGY)",
    industry: "Food Tech",
  },
  Paytm: {
    description:
      "Paytm (One97 Communications) is India's pioneering digital payments and financial services company. It offers mobile payments, banking, insurance, lending, and commerce solutions to millions of Indian consumers.",
    founded: 2010,
    hq: "Noida, India",
    ceo: "Vijay Shekhar Sharma",
    employees: "10,000+",
    website: "https://paytm.com",
    type: "Public (NSE: PAYTM)",
    industry: "Fintech",
  },
  // ─── Global Tech Giants ───────────────────────────────────────────────────
  Microsoft: {
    description:
      "Microsoft is a global technology leader building platforms and productivity tools that empower every person and organization. Creator of Windows, Azure, Microsoft 365, GitHub, and Xbox. The world's most valuable company.",
    founded: 1975,
    hq: "Redmond, WA",
    ceo: "Satya Nadella",
    employees: "220,000+",
    website: "https://microsoft.com",
    type: "Public (NASDAQ: MSFT)",
    industry: "Enterprise Tech",
  },
  Google: {
    description:
      "Google (Alphabet) is the world's leading search engine, cloud computing, and digital advertising company. Products include Search, Android, Chrome, YouTube, Google Cloud, Google Workspace, and Gemini AI.",
    founded: 1998,
    hq: "Mountain View, CA",
    ceo: "Sundar Pichai",
    employees: "180,000+",
    website: "https://google.com",
    type: "Public (NASDAQ: GOOGL)",
    industry: "Internet / AI",
  },
  Apple: {
    description:
      "Apple designs and builds iPhone, iPad, Mac, Apple Watch, and Apple TV. Its ecosystem spans hardware, software, and services including the App Store, Apple Music, iCloud, and Apple Intelligence AI features.",
    founded: 1976,
    hq: "Cupertino, CA",
    ceo: "Tim Cook",
    employees: "160,000+",
    website: "https://apple.com",
    type: "Public (NASDAQ: AAPL)",
    industry: "Consumer Tech",
  },
  Meta: {
    description:
      "Meta Platforms builds social technologies and the metaverse through Facebook, Instagram, WhatsApp, and Threads. Meta is investing heavily in AI, AR/VR hardware (Ray-Ban smart glasses, Quest headsets), and Llama open-source AI models.",
    founded: 2004,
    hq: "Menlo Park, CA",
    ceo: "Mark Zuckerberg",
    employees: "70,000+",
    website: "https://about.meta.com",
    type: "Public (NASDAQ: META)",
    industry: "Social Media / AI",
  },
  Amazon: {
    description:
      "Amazon is the world's largest e-commerce and cloud computing company. AWS leads global cloud infrastructure, while Amazon Prime, Alexa, and Kindle define consumer tech. Amazon also leads in AI investment and logistics automation.",
    founded: 1994,
    hq: "Seattle, WA",
    ceo: "Andy Jassy",
    employees: "1,500,000+",
    website: "https://amazon.com",
    type: "Public (NASDAQ: AMZN)",
    industry: "E-commerce / Cloud",
  },
  Netflix: {
    description:
      "Netflix is the world's leading streaming entertainment service with 270M+ paid memberships in 190 countries. Known for original content, password-sharing crackdown, and its ad-supported tier that now drives significant revenue growth.",
    founded: 1997,
    hq: "Los Gatos, CA",
    ceo: "Ted Sarandos & Greg Peters",
    employees: "13,000+",
    website: "https://netflix.com",
    type: "Public (NASDAQ: NFLX)",
    industry: "Streaming / Entertainment",
  },
  Spotify: {
    description:
      "Spotify is the world's largest audio streaming platform with 600M+ users and 240M+ paid subscribers in 180+ markets. It offers music, podcasts, and audiobooks powered by personalized AI recommendations.",
    founded: 2006,
    hq: "Stockholm, Sweden",
    ceo: "Daniel Ek",
    employees: "9,000+",
    website: "https://spotify.com",
    type: "Public (NYSE: SPOT)",
    industry: "Audio Streaming",
  },
  Zoom: {
    description:
      "Zoom is a leading unified communications platform offering video meetings, phone, webinars, chat, and AI Companion. Widely adopted post-pandemic, Zoom continues expanding into AI-powered collaboration and contact center solutions.",
    founded: 2011,
    hq: "San Jose, CA",
    ceo: "Eric Yuan",
    employees: "8,000+",
    website: "https://zoom.us",
    type: "Public (NASDAQ: ZM)",
    industry: "Communication",
  },
  Salesforce: {
    description:
      "Salesforce is the world's #1 CRM platform and enterprise cloud leader. Its AI CRM suite (Agentforce), Slack, MuleSoft, and Tableau combine to deliver AI-first customer success solutions for 150,000+ companies.",
    founded: 1999,
    hq: "San Francisco, CA",
    ceo: "Marc Benioff",
    employees: "70,000+",
    website: "https://salesforce.com",
    type: "Public (NYSE: CRM)",
    industry: "Enterprise CRM",
  },
  Adobe: {
    description:
      "Adobe is a global leader in creative software and digital experience platforms. Products include Photoshop, Illustrator, Premiere Pro, Acrobat, and Adobe Experience Cloud. Adobe Firefly is its generative AI platform for creatives.",
    founded: 1982,
    hq: "San Jose, CA",
    ceo: "Shantanu Narayen",
    employees: "30,000+",
    website: "https://adobe.com",
    type: "Public (NASDAQ: ADBE)",
    industry: "Creative Software",
  },
  Cloudflare: {
    description:
      "Cloudflare is a global network security and performance company running one of the world's largest networks (330+ cities, 13,000+ networks). Its Zero Trust, CDN, Workers, and AI Gateway products protect and accelerate millions of internet properties.",
    founded: 2009,
    hq: "San Francisco, CA",
    ceo: "Matthew Prince",
    employees: "4,000+",
    website: "https://cloudflare.com",
    type: "Public (NYSE: NET)",
    industry: "Network Security",
  },
  Datadog: {
    description:
      "Datadog is a monitoring and analytics platform for cloud-scale applications. It provides infrastructure monitoring, APM, log management, and security monitoring, used by thousands of organizations to observe their entire tech stack.",
    founded: 2010,
    hq: "New York, NY",
    ceo: "Olivier Pomel",
    employees: "5,000+",
    website: "https://datadoghq.com",
    type: "Public (NASDAQ: DDOG)",
    industry: "Observability",
  },
  Accenture: {
    description:
      "Accenture is a global professional services company specializing in IT, consulting, and outsourcing. With 700,000+ employees across 200+ countries, it is a leader in digital transformation, cloud migration, and AI-driven enterprise solutions.",
    founded: 1989,
    hq: "Dublin, Ireland",
    ceo: "Julie Sweet",
    employees: "700,000+",
    website: "https://www.accenture.com",
    type: "Public (NYSE: ACN)",
    industry: "IT Services",
  },
  AMD: {
    description:
      "Advanced Micro Devices (AMD) designs high-performance CPUs, GPUs, and adaptive computing solutions. Its Ryzen, EPYC, and Radeon product lines compete directly with Intel and Nvidia, powering PCs, servers, and AI workloads.",
    founded: 1969,
    hq: "Santa Clara, CA",
    ceo: "Lisa Su",
    employees: "25,000+",
    website: "https://www.amd.com",
    type: "Public (NASDAQ: AMD)",
    industry: "Semiconductors",
  },
  Broadcom: {
    description:
      "Broadcom is a global semiconductor and infrastructure software company. It designs chips for data centers, networking, storage, broadband, and wireless connectivity. Its acquisition of VMware in 2023 made it a major enterprise software player.",
    founded: 1991,
    hq: "San Jose, CA",
    ceo: "Hock Tan",
    employees: "20,000+",
    website: "https://www.broadcom.com",
    type: "Public (NASDAQ: AVGO)",
    industry: "Semiconductors",
  },
  Bosch: {
    description:
      "Bosch is one of the world's largest engineering companies, supplying automotive components, industrial technology, and consumer appliances. It is a pioneer in IoT, electric mobility, and Industry 4.0 solutions.",
    founded: 1886,
    hq: "Gerlingen, Germany",
    ceo: "Stefan Hartung",
    employees: "421,000+",
    website: "https://www.bosch.com",
    type: "Private",
    industry: "Engineering & Technology",
  },
  Cognizant: {
    description:
      "Cognizant is a multinational IT and consulting company providing digital transformation, cloud, and AI solutions. Headquartered in the US with a large workforce in India, it serves Fortune 500 clients globally.",
    founded: 1994,
    hq: "Teaneck, NJ",
    ceo: "Ravi Kumar S",
    employees: "350,000+",
    website: "https://www.cognizant.com",
    type: "Public (NASDAQ: CTSH)",
    industry: "IT Services",
  },
  Capgemini: {
    description:
      "Capgemini is a global IT services and consulting company operating in 50+ countries. It delivers technology, transformation, and outsourcing services with expertise in cloud, AI, data, and digital engineering.",
    founded: 1967,
    hq: "Paris, France",
    ceo: "Aiman Ezzat",
    employees: "350,000+",
    website: "https://www.capgemini.com",
    type: "Public (EPA: CAP)",
    industry: "IT Services",
  },
  Cisco: {
    description:
      "Cisco is the worldwide leader in networking hardware, software, and cybersecurity. Its routers, switches, and Webex collaboration platform underpin the internet and enterprise communications globally.",
    founded: 1984,
    hq: "San Jose, CA",
    ceo: "Chuck Robbins",
    employees: "85,000+",
    website: "https://www.cisco.com",
    type: "Public (NASDAQ: CSCO)",
    industry: "Networking",
  },
  "Dell Technologies": {
    description:
      "Dell Technologies is a global leader in PCs, servers, storage, and IT infrastructure. Through Dell, EMC, VMware, and other brands, it offers end-to-end enterprise hardware and cloud solutions.",
    founded: 1984,
    hq: "Round Rock, TX",
    ceo: "Michael Dell",
    employees: "120,000+",
    website: "https://www.dell.com",
    type: "Public (NYSE: DELL)",
    industry: "Hardware & IT",
  },
  Deloitte: {
    description:
      "Deloitte is one of the Big Four accounting firms, offering audit, consulting, tax, and advisory services. It is a leader in digital transformation, risk management, and sustainability consulting globally.",
    founded: 1845,
    hq: "London, UK",
    ceo: "Joe Ucuzoglu",
    employees: "415,000+",
    website: "https://www.deloitte.com",
    type: "Private (Partnership)",
    industry: "Professional Services",
  },
  "Epic Systems": {
    description:
      "Epic Systems is the dominant electronic health records (EHR) provider in the US, serving major hospitals and health systems. Its software manages clinical, administrative, and financial workflows for healthcare organizations.",
    founded: 1979,
    hq: "Verona, WI",
    ceo: "Judy Faulkner",
    employees: "10,000+",
    website: "https://www.epic.com",
    type: "Private",
    industry: "Healthcare IT",
  },
  Epson: {
    description:
      "Epson is a Japanese technology company known for printers, projectors, and wearable devices. It is a global leader in inkjet printing technology and industrial automation systems.",
    founded: 1942,
    hq: "Suwa, Japan",
    ceo: "Yasunori Ogawa",
    employees: "73,000+",
    website: "https://www.epson.com",
    type: "Public (TYO: 6724)",
    industry: "Hardware",
  },
  Foxconn: {
    description:
      "Foxconn (Hon Hai Precision) is the world's largest electronics contract manufacturer, assembling products for Apple, Sony, and Microsoft. It operates massive factories in China and is expanding into EV manufacturing.",
    founded: 1974,
    hq: "New Taipei, Taiwan",
    ceo: "Young Liu",
    employees: "800,000+",
    website: "https://www.foxconn.com",
    type: "Public (TPE: 2317)",
    industry: "Electronics Manufacturing",
  },
  Gigabyte: {
    description:
      "Gigabyte Technology is a leading manufacturer of motherboards, graphics cards, laptops, and servers. It supplies hardware components to PC builders and data centers worldwide.",
    founded: 1986,
    hq: "Zhonghe, Taiwan",
    ceo: "Yeh Pei-Cheng",
    employees: "6,000+",
    website: "https://www.gigabyte.com",
    type: "Public (TPE: 2376)",
    industry: "Hardware",
  },
  HP: {
    description:
      "HP Inc. is a global provider of personal computers, printers, and related supplies. It separated from Hewlett Packard Enterprise in 2015 and focuses on consumer and commercial hardware, 3D printing, and digital manufacturing.",
    founded: 1939,
    hq: "Palo Alto, CA",
    ceo: "Enrique Lores",
    employees: "50,000+",
    website: "https://www.hp.com",
    type: "Public (NYSE: HPQ)",
    industry: "Hardware & IT",
  },
  IBM: {
    description:
      "IBM is a century-old technology giant known for hybrid cloud, AI (Watson/WatsonX), mainframes, and consulting. It has pivoted from hardware to high-value enterprise IT services, with Red Hat at the center of its cloud strategy.",
    founded: 1911,
    hq: "Armonk, NY",
    ceo: "Arvind Krishna",
    employees: "280,000+",
    website: "https://www.ibm.com",
    type: "Public (NYSE: IBM)",
    industry: "IT Services & Cloud",
  },
  Intel: {
    description:
      "Intel is the world's largest semiconductor chip maker, producing CPUs for PCs, servers, and embedded devices. It is investing heavily in chip foundry (IFS) capabilities to compete with TSMC and Samsung in advanced manufacturing.",
    founded: 1968,
    hq: "Santa Clara, CA",
    ceo: "Pat Gelsinger",
    employees: "120,000+",
    website: "https://www.intel.com",
    type: "Public (NASDAQ: INTC)",
    industry: "Semiconductors",
  },
  "Juniper Networks": {
    description:
      "Juniper Networks provides high-performance networking solutions for enterprises and service providers. Its AI-driven enterprise platform (Mist AI) and routing/switching portfolio are widely deployed in global network infrastructure.",
    founded: 1996,
    hq: "Sunnyvale, CA",
    ceo: "Rami Rahim",
    employees: "10,000+",
    website: "https://www.juniper.net",
    type: "Public (NYSE: JNPR)",
    industry: "Networking",
  },
  Kaspersky: {
    description:
      "Kaspersky is a global cybersecurity company providing antivirus, endpoint protection, threat intelligence, and enterprise security solutions. It is known for detecting state-sponsored malware and APT attacks.",
    founded: 1997,
    hq: "Moscow, Russia",
    ceo: "Eugene Kaspersky",
    employees: "5,000+",
    website: "https://www.kaspersky.com",
    type: "Private",
    industry: "Cybersecurity",
  },
  "Kingston Technology": {
    description:
      "Kingston Technology is the world's largest independent manufacturer of memory products, including DRAM, SSDs, and flash storage. It serves both consumer and enterprise markets globally.",
    founded: 1987,
    hq: "Fountain Valley, CA",
    ceo: "John Tu",
    employees: "3,000+",
    website: "https://www.kingston.com",
    type: "Private",
    industry: "Memory & Storage",
  },
  LinkedIn: {
    description:
      "LinkedIn is the world's largest professional network with 1 billion+ members. Owned by Microsoft, it provides job search, talent acquisition, learning, and B2B advertising tools. LinkedIn Learning and Recruiter are key revenue drivers.",
    founded: 2003,
    hq: "Sunnyvale, CA",
    ceo: "Ryan Roslansky",
    employees: "20,000+",
    website: "https://www.linkedin.com",
    type: "Subsidiary (Microsoft)",
    industry: "Social / Professional Network",
  },
  Lenovo: {
    description:
      "Lenovo is the world's largest PC manufacturer, selling ThinkPad, IdeaPad, and Legion devices. It also produces servers, smartphones (Motorola), and smart devices, with a growing services and solutions business.",
    founded: 1984,
    hq: "Hong Kong / Beijing",
    ceo: "Yuanqing Yang",
    employees: "77,000+",
    website: "https://www.lenovo.com",
    type: "Public (HKG: 0992)",
    industry: "Hardware",
  },
  "Micron Technology": {
    description:
      "Micron Technology is a leading manufacturer of DRAM, NAND flash, and solid-state drives. Its memory products are used in data centers, mobile devices, automotive, and AI systems globally.",
    founded: 1978,
    hq: "Boise, ID",
    ceo: "Sanjay Mehrotra",
    employees: "48,000+",
    website: "https://www.micron.com",
    type: "Public (NASDAQ: MU)",
    industry: "Semiconductors",
  },
  Nvidia: {
    description:
      "Nvidia is the world's leading AI chip company, dominating the GPU market for AI training and inference. Its H100/H200 chips power the world's largest AI models. Nvidia's CUDA ecosystem and software stack create deep competitive moats.",
    founded: 1993,
    hq: "Santa Clara, CA",
    ceo: "Jensen Huang",
    employees: "36,000+",
    website: "https://www.nvidia.com",
    type: "Public (NASDAQ: NVDA)",
    industry: "AI / Semiconductors",
  },
  Oracle: {
    description:
      "Oracle is a global enterprise software and cloud infrastructure company. Known for its database technology, ERP (Fusion), and Oracle Cloud Infrastructure (OCI), it serves large enterprises and governments worldwide.",
    founded: 1977,
    hq: "Austin, TX",
    ceo: "Safra Catz",
    employees: "164,000+",
    website: "https://www.oracle.com",
    type: "Public (NYSE: ORCL)",
    industry: "Enterprise Software",
  },
  "ON Semiconductor": {
    description:
      "onsemi (ON Semiconductor) is a leader in intelligent power and sensing semiconductors for automotive, industrial, and cloud applications. Its SiC and power management chips are critical for EV adoption.",
    founded: 1999,
    hq: "Scottsdale, AZ",
    ceo: "Hassane El-Khoury",
    employees: "35,000+",
    website: "https://www.onsemi.com",
    type: "Public (NASDAQ: ON)",
    industry: "Semiconductors",
  },
  PayPal: {
    description:
      "PayPal is a global digital payments platform with 400M+ active accounts. It operates PayPal, Venmo, Braintree, and Honey, processing billions of transactions annually across 200+ countries.",
    founded: 1998,
    hq: "San Jose, CA",
    ceo: "Alex Chriss",
    employees: "27,000+",
    website: "https://www.paypal.com",
    type: "Public (NASDAQ: PYPL)",
    industry: "Fintech",
  },
  Panasonic: {
    description:
      "Panasonic is a Japanese multinational electronics corporation producing consumer electronics, automotive batteries, industrial equipment, and energy solutions. It is a major supplier of EV batteries to Tesla through Panasonic Energy.",
    founded: 1918,
    hq: "Kadoma, Japan",
    ceo: "Yuki Kusumi",
    employees: "240,000+",
    website: "https://www.panasonic.com",
    type: "Public (TYO: 6752)",
    industry: "Electronics",
  },
  Qualcomm: {
    description:
      "Qualcomm is the world's leading mobile chip company, designing Snapdragon processors that power Android smartphones and PCs. It dominates 5G modem technology and is expanding into automotive, IoT, and AI edge computing.",
    founded: 1985,
    hq: "San Diego, CA",
    ceo: "Cristiano Amon",
    employees: "51,000+",
    website: "https://www.qualcomm.com",
    type: "Public (NASDAQ: QCOM)",
    industry: "Semiconductors",
  },
  "Red Hat": {
    description:
      "Red Hat is the world's leading enterprise open source company, known for Red Hat Enterprise Linux (RHEL) and OpenShift (Kubernetes platform). Acquired by IBM in 2019, it is central to IBM's hybrid cloud strategy.",
    founded: 1993,
    hq: "Raleigh, NC",
    ceo: "Matt Hicks",
    employees: "19,000+",
    website: "https://www.redhat.com",
    type: "Subsidiary (IBM)",
    industry: "Open Source / Cloud",
  },
  "Raspberry Pi Foundation": {
    description:
      "The Raspberry Pi Foundation creates affordable, compact single-board computers used in education, hobbyist projects, and industrial IoT. The Raspberry Pi has sold over 50 million units, democratizing computing education globally.",
    founded: 2009,
    hq: "Cambridge, UK",
    ceo: "Eben Upton",
    employees: "500+",
    website: "https://www.raspberrypi.org",
    type: "Non-profit",
    industry: "Hardware / Education",
  },
  SAP: {
    description:
      "SAP is the world's leading enterprise resource planning (ERP) software company. Its S/4HANA cloud platform manages business processes for 80% of global transaction revenue. SAP serves 400,000+ customers in 180 countries.",
    founded: 1972,
    hq: "Walldorf, Germany",
    ceo: "Christian Klein",
    employees: "105,000+",
    website: "https://www.sap.com",
    type: "Public (NYSE: SAP)",
    industry: "Enterprise Software",
  },
  "Samsung Electronics": {
    description:
      "Samsung Electronics is a global technology conglomerate and the world's largest smartphone and memory chip manufacturer. It produces Galaxy devices, OLED displays, DRAM, NAND, and provides foundry services through Samsung Foundry.",
    founded: 1969,
    hq: "Suwon, South Korea",
    ceo: "Jong-Hee Han",
    employees: "270,000+",
    website: "https://www.samsung.com",
    type: "Public (KRX: 005930)",
    industry: "Electronics",
  },
  "Texas Instruments": {
    description:
      "Texas Instruments is a global leader in analog semiconductors and embedded processors. Its chips are used in industrial, automotive, and personal electronics, and its analog business generates highly predictable, high-margin revenue.",
    founded: 1951,
    hq: "Dallas, TX",
    ceo: "Haviv Ilan",
    employees: "34,000+",
    website: "https://www.ti.com",
    type: "Public (NASDAQ: TXN)",
    industry: "Semiconductors",
  },
  Uber: {
    description:
      "Uber is the world's largest ride-hailing and food delivery platform, operating in 70+ countries. Uber Eats, Freight, and autonomous vehicle partnerships position it for long-term platform growth beyond mobility.",
    founded: 2009,
    hq: "San Francisco, CA",
    ceo: "Dara Khosrowshahi",
    employees: "32,000+",
    website: "https://www.uber.com",
    type: "Public (NYSE: UBER)",
    industry: "Ride-hailing / Delivery",
  },
  VMware: {
    description:
      "VMware is a pioneer in server virtualization and cloud infrastructure, with its vSphere, vSAN, and NSX products widely deployed in enterprise data centers. Acquired by Broadcom in 2023, it now drives Broadcom's software business.",
    founded: 1998,
    hq: "Palo Alto, CA",
    ceo: "Hock Tan",
    employees: "35,000+",
    website: "https://www.vmware.com",
    type: "Subsidiary (Broadcom)",
    industry: "Virtualization / Cloud",
  },
  Virtusa: {
    description:
      "Virtusa is an IT services and digital engineering company specializing in banking, financial services, insurance, and healthcare. Owned by Polaris Inc., it serves global enterprises with digital transformation and product development.",
    founded: 1996,
    hq: "Southborough, MA",
    ceo: "Santosh Thomas",
    employees: "30,000+",
    website: "https://www.virtusa.com",
    type: "Private (Polaris)",
    industry: "IT Services",
  },
  ViewSonic: {
    description:
      "ViewSonic is a global display solutions brand offering monitors, projectors, digital whiteboards, and signage displays. It is a major player in the education technology and commercial display markets.",
    founded: 1987,
    hq: "Brea, CA",
    ceo: "Jeff Volpe",
    employees: "3,000+",
    website: "https://www.viewsonic.com",
    type: "Private",
    industry: "Display Technology",
  },
  "Western Digital": {
    description:
      "Western Digital is a leading manufacturer of hard disk drives (HDDs) and solid-state drives (SSDs). Its WD and SanDisk brands serve consumer, enterprise, and cloud storage markets worldwide.",
    founded: 1970,
    hq: "San Jose, CA",
    ceo: "David Goeckeler",
    employees: "65,000+",
    website: "https://www.westerndigital.com",
    type: "Public (NASDAQ: WDC)",
    industry: "Storage",
  },
  Xilinx: {
    description:
      "Xilinx is the pioneer of field-programmable gate arrays (FPGAs), acquired by AMD in 2022. Its Versal adaptive compute platforms are used in data centers, 5G, automotive, and aerospace applications.",
    founded: 1984,
    hq: "San Jose, CA",
    ceo: "Victor Peng",
    employees: "5,000+",
    website: "https://www.xilinx.com",
    type: "Subsidiary (AMD)",
    industry: "Semiconductors / FPGA",
  },
  Yahoo: {
    description:
      "Yahoo is an internet media and technology company operating Yahoo Finance, Yahoo News, Yahoo Mail, and other digital properties. Owned by Apollo Global Management, it reaches 900M+ users monthly.",
    founded: 1995,
    hq: "Sunnyvale, CA",
    ceo: "Jim Lanzone",
    employees: "8,600+",
    website: "https://www.yahoo.com",
    type: "Private (Apollo)",
    industry: "Media / Internet",
  },
  Yokogawa: {
    description:
      "Yokogawa Electric is a Japanese multinational corporation providing industrial automation, measurement, and control solutions. It serves oil & gas, chemicals, power, and life sciences industries with precision instrumentation.",
    founded: 1915,
    hq: "Tokyo, Japan",
    ceo: "Hitoshi Nara",
    employees: "18,000+",
    website: "https://www.yokogawa.com",
    type: "Public (TYO: 6841)",
    industry: "Industrial Automation",
  },
  "Zebra Technologies": {
    description:
      "Zebra Technologies provides enterprise mobile computing, barcode scanners, RFID, and printing solutions. Its hardware and software help businesses track assets, improve workflows, and manage field operations in retail, manufacturing, and healthcare.",
    founded: 1969,
    hq: "Lincolnshire, IL",
    ceo: "Bill Burns",
    employees: "10,000+",
    website: "https://www.zebra.com",
    type: "Public (NASDAQ: ZBRA)",
    industry: "Enterprise Mobility",
  },
  Zotac: {
    description:
      "Zotac is a manufacturer of mini PCs, gaming laptops, and graphics cards. Known for compact form-factor PCs and Nvidia GeForce-powered GPU cards, it serves PC gaming, digital signage, and embedded computing markets.",
    founded: 2006,
    hq: "Brea, CA",
    ceo: "N/A",
    employees: "500+",
    website: "https://www.zotac.com",
    type: "Subsidiary (PC Partner)",
    industry: "Hardware",
  },
  "63 Moons Technologies": {
    description:
      "63 Moons Technologies (formerly Financial Technologies India) is a fintech company that created India's first commodity exchange (MCX) and provides trading technology platforms. It has pivoted to financial and messaging technology services.",
    founded: 1995,
    hq: "Mumbai, India",
    ceo: "Venkat Chary",
    employees: "1,000+",
    website: "https://www.63moons.com",
    type: "Public (BSE)",
    industry: "Fintech",
  },
  "Aban Offshore": {
    description:
      "Aban Offshore is one of India's largest offshore drilling companies, operating jack-up rigs and drilling vessels. It serves global oil and gas exploration companies with offshore contract drilling services.",
    founded: 1986,
    hq: "Chennai, India",
    ceo: "Reji Abraham",
    employees: "5,000+",
    website: "https://www.aban.com",
    type: "Public (NSE: ABAN)",
    industry: "Oil & Gas",
  },
  ACC: {
    description:
      "ACC Limited is one of India's largest cement manufacturers, a subsidiary of Adani Group. It produces Portland cement, ready-mix concrete, and building materials with operations across India.",
    founded: 1936,
    hq: "Mumbai, India",
    ceo: "Sridhar Balakrishnan",
    employees: "9,000+",
    website: "https://www.acclimited.com",
    type: "Public (NSE: ACC)",
    industry: "Cement",
  },
  "Acko General Insurance": {
    description:
      "Acko is India's first digital-native insurance company, offering motor, health, and travel insurance entirely online. Backed by Amazon and Binny Bansal, it has transformed insurance distribution in India with instant, paperless policies.",
    founded: 2016,
    hq: "Bengaluru, India",
    ceo: "Varun Dua",
    employees: "3,500+",
    website: "https://www.acko.com",
    type: "Private",
    industry: "Insurtech",
  },
  "Adani Group": {
    description:
      "Adani Group is India's largest conglomerate with interests in ports, airports, energy, mining, cement, data centers, and media. Led by Gautam Adani, it is one of India's most ambitious infrastructure and energy companies.",
    founded: 1988,
    hq: "Ahmedabad, India",
    ceo: "Gautam Adani",
    employees: "25,000+",
    website: "https://www.adani.com",
    type: "Public (NSE: ADANIENT)",
    industry: "Conglomerate",
  },
  "Adani Power": {
    description:
      "Adani Power is India's largest private thermal power producer, operating coal and solar power plants across multiple states. Part of the Adani Group, it supplies electricity to state utilities across India.",
    founded: 2006,
    hq: "Ahmedabad, India",
    ceo: "S. B. Khyalia",
    employees: "8,000+",
    website: "https://www.adanipower.com",
    type: "Public (NSE: ADANIPOWER)",
    industry: "Power",
  },
  "Aditya Birla Group": {
    description:
      "Aditya Birla Group is one of India's largest conglomerates with businesses in metals, cement, telecom (Vodafone Idea), financial services, fashion retail, and carbon black. It operates in 36 countries with revenue exceeding $60B.",
    founded: 1857,
    hq: "Mumbai, India",
    ceo: "Kumar Mangalam Birla",
    employees: "180,000+",
    website: "https://www.adityabirla.com",
    type: "Private (Conglomerate)",
    industry: "Diversified",
  },
  "Alkem Laboratories": {
    description:
      "Alkem Laboratories is a top-10 Indian pharma company producing branded generics and specialty drugs. It is the market leader in antibiotics and gastroenterology in India, and exports to 50+ countries.",
    founded: 1973,
    hq: "Mumbai, India",
    ceo: "Basudeo Singh",
    employees: "20,000+",
    website: "https://www.alkemlabs.com",
    type: "Public (NSE: ALKEM)",
    industry: "Pharmaceuticals",
  },
  "Allcargo Logistics": {
    description:
      "Allcargo Logistics is India's largest integrated logistics company providing LCL consolidation, container freight stations, and warehousing. It operates through ECU Worldwide for international freight and operates pan-India inland logistics.",
    founded: 1993,
    hq: "Mumbai, India",
    ceo: "Shashi Kiran Shetty",
    employees: "12,000+",
    website: "https://www.allcargologistics.com",
    type: "Public (NSE: ALLCARGO)",
    industry: "Logistics",
  },
  "Ambuja Cements": {
    description:
      "Ambuja Cements is one of India's leading cement companies, acquired by the Adani Group in 2022. Known for quality Portland cement, it has a capacity of 31 MTPA and operates across India.",
    founded: 1983,
    hq: "Mumbai, India",
    ceo: "Ajay Kapur",
    employees: "7,000+",
    website: "https://www.ambujacement.com",
    type: "Public (NSE: AMBUJACEM)",
    industry: "Cement",
  },
  Amul: {
    description:
      "Amul (GCMMF) is India's largest food products organization and the country's most trusted dairy brand. A cooperative of 3.6 million farmers, it produces milk, butter, cheese, ice cream, and chocolates distributed across India.",
    founded: 1946,
    hq: "Anand, India",
    ceo: "R. S. Sodhi",
    employees: "750+",
    website: "https://www.amul.com",
    type: "Co-operative",
    industry: "Dairy / FMCG",
  },
  "Angel One": {
    description:
      "Angel One (formerly Angel Broking) is one of India's largest retail stock broking companies. It offers equity, commodity, and currency trading, mutual funds, and financial advisory services through a tech-first platform.",
    founded: 1996,
    hq: "Mumbai, India",
    ceo: "Ambarish Kenghe",
    employees: "4,000+",
    website: "https://www.angelone.in",
    type: "Public (NSE: ANGELONE)",
    industry: "Fintech / Broking",
  },
  "Apollo Hospitals": {
    description:
      "Apollo Hospitals is Asia's largest integrated healthcare group, operating 70+ hospitals with 10,000+ beds across India. It pioneered corporate healthcare in India and is known for complex surgeries, oncology, and cardiac care.",
    founded: 1983,
    hq: "Chennai, India",
    ceo: "Suneeta Reddy",
    employees: "70,000+",
    website: "https://www.apollohospitals.com",
    type: "Public (NSE: APOLLOHOSP)",
    industry: "Healthcare",
  },
  "Apollo Tyres": {
    description:
      "Apollo Tyres is one of India's largest tyre manufacturers, with operations in India, Netherlands (Vredestein), and Hungary. It produces tyres for passenger cars, trucks, buses, and bicycles sold in 100+ countries.",
    founded: 1972,
    hq: "Gurugram, India",
    ceo: "Neeraj Kanwar",
    employees: "16,000+",
    website: "https://www.apollotyres.com",
    type: "Public (NSE: APOLLOTYRE)",
    industry: "Automotive",
  },
  "Ashok Leyland": {
    description:
      "Ashok Leyland is India's second largest commercial vehicle manufacturer and the 4th largest bus maker globally. Part of the Hinduja Group, it produces trucks, buses, light commercial vehicles, and defense vehicles.",
    founded: 1948,
    hq: "Chennai, India",
    ceo: "Shenu Agarwal",
    employees: "15,000+",
    website: "https://www.ashokleyland.com",
    type: "Public (NSE: ASHOKLEY)",
    industry: "Automotive",
  },
  "Asian Paints": {
    description:
      "Asian Paints is India's largest paint company and the 9th largest in the world. It offers decorative and industrial paints under brands like Apex, Royale, and Tractor, operating in 15 countries.",
    founded: 1942,
    hq: "Mumbai, India",
    ceo: "Amit Syngle",
    employees: "7,000+",
    website: "https://www.asianpaints.com",
    type: "Public (NSE: ASIANPAINT)",
    industry: "Paints & Coatings",
  },
  "Axis Bank": {
    description:
      "Axis Bank is India's third largest private sector bank with 4,900+ branches. It offers retail banking, corporate banking, investment banking, and insurance products, and has a strong digital banking presence.",
    founded: 1993,
    hq: "Mumbai, India",
    ceo: "Amitabh Chaudhry",
    employees: "70,000+",
    website: "https://www.axisbank.com",
    type: "Public (NSE: AXISBANK)",
    industry: "Banking",
  },
  "Bajaj Auto": {
    description:
      "Bajaj Auto is India's largest exporter of two-wheelers and three-wheelers. Known for its Pulsar, Dominar, and Chetak electric scooter brands, it exports to 70+ countries and dominates India's three-wheeler market.",
    founded: 1945,
    hq: "Pune, India",
    ceo: "Rajiv Bajaj",
    employees: "10,000+",
    website: "https://www.bajajauto.com",
    type: "Public (NSE: BAJAJ-AUTO)",
    industry: "Automotive",
  },
  "Bank of Baroda": {
    description:
      "Bank of Baroda is one of India's largest public sector banks, operating 8,200+ branches domestically and internationally. Post-merger with Vijaya Bank and Dena Bank, it is India's second largest government bank.",
    founded: 1908,
    hq: "Vadodara, India",
    ceo: "Debadatta Chand",
    employees: "50,000+",
    website: "https://www.bankofbaroda.in",
    type: "Public (NSE: BANKBARODA)",
    industry: "Banking",
  },
  "Bank of India": {
    description:
      "Bank of India is a government-owned bank operating 5,100+ branches in India and internationally. It provides retail, corporate, and MSME banking services and has a significant presence in Africa and Southeast Asia.",
    founded: 1906,
    hq: "Mumbai, India",
    ceo: "Rajneesh Karnatak",
    employees: "50,000+",
    website: "https://www.bankofindia.co.in",
    type: "Public (NSE: BANKINDIA)",
    industry: "Banking",
  },
  BEML: {
    description:
      "BEML Limited (formerly Bharat Earth Movers) is a government defense and heavy machinery company. It manufactures metro rail coaches, mining equipment, defense vehicles, and aerospace components for Indian government projects.",
    founded: 1964,
    hq: "Bengaluru, India",
    ceo: "Shantanu Roy",
    employees: "9,000+",
    website: "https://www.bemlindia.in",
    type: "Public (NSE: BEML)",
    industry: "Defense & Heavy Machinery",
  },
  "Bharat Biotech": {
    description:
      "Bharat Biotech is a leading Indian biotechnology company, globally recognized for developing Covaxin (India's COVID-19 vaccine) and rotavirus vaccines. It produces 80+ vaccines and bio-therapeutics for global markets.",
    founded: 1996,
    hq: "Hyderabad, India",
    ceo: "Krishna Ella",
    employees: "4,500+",
    website: "https://www.bharatbiotech.com",
    type: "Private",
    industry: "Biotechnology",
  },
  "Bharat Electronics": {
    description:
      "Bharat Electronics Limited is India's leading defense electronics company, producing radar systems, communication equipment, electronic warfare systems, and smart city solutions for the Indian armed forces.",
    founded: 1954,
    hq: "Bengaluru, India",
    ceo: "Bhanu Prakash Srivastava",
    employees: "12,000+",
    website: "https://www.bel-india.in",
    type: "Public (NSE: BEL)",
    industry: "Defense Electronics",
  },
  "Bharat Forge": {
    description:
      "Bharat Forge is the world's largest forge company by capacity, producing drivetrain and chassis components for automotive, aerospace, and defense sectors. It is diversifying into EVs, defense, and aerospace.",
    founded: 1961,
    hq: "Pune, India",
    ceo: "Baba Kalyani",
    employees: "13,000+",
    website: "https://www.bharatforge.com",
    type: "Public (NSE: BHARATFORG)",
    industry: "Auto Components",
  },
  "Bharat Heavy Electricals Limited": {
    description:
      "BHEL is India's largest power equipment manufacturer and a Maharatna public sector enterprise. It manufactures boilers, turbines, generators, and transformers for thermal, hydro, and nuclear power plants.",
    founded: 1964,
    hq: "New Delhi, India",
    ceo: "Koppu Sadashiva Murthy",
    employees: "27,000+",
    website: "https://www.bhel.com",
    type: "Public (NSE: BHEL)",
    industry: "Power Equipment",
  },
  "Bharat Petroleum": {
    description:
      "Bharat Petroleum Corporation (BPCL) is one of India's largest oil PSUs, operating refineries, petrol stations, and LPG distribution networks. It is diversifying into renewable energy and petrochemicals.",
    founded: 1952,
    hq: "Mumbai, India",
    ceo: "G Krishnakumar",
    employees: "12,000+",
    website: "https://www.bharatpetroleum.in",
    type: "Public (NSE: BPCL)",
    industry: "Oil & Gas",
  },
  "Bharat Sanchar Nigam Limited": {
    description:
      "BSNL is India's largest government-owned telecommunications company, providing broadband, mobile, and landline services across India. It is undergoing modernization with 4G/5G network rollout.",
    founded: 1953,
    hq: "New Delhi, India",
    ceo: "Robert J. Ravi",
    employees: "65,000+",
    website: "https://www.bsnl.co.in",
    type: "Government (PSU)",
    industry: "Telecom",
  },
  "Bharti Airtel": {
    description:
      "Bharti Airtel is India's largest telecommunications company by revenue, serving 500M+ customers across mobile, broadband, and DTH services. Airtel Africa and Airtel Payments Bank are key growth pillars.",
    founded: 1995,
    hq: "New Delhi, India",
    ceo: "Gopal Vittal",
    employees: "20,000+",
    website: "https://www.airtel.in",
    type: "Public (NSE: BHARTIARTL)",
    industry: "Telecom",
  },
  Biocon: {
    description:
      "Biocon is India's largest biopharmaceutical company, manufacturing biosimilars for global markets. It produces biosimilar insulin, oncology drugs, and generics through Biocon Biologics, its global biosimilars division.",
    founded: 1978,
    hq: "Bengaluru, India",
    ceo: "Kiran Mazumdar-Shaw",
    employees: "13,000+",
    website: "https://www.biocon.com",
    type: "Public (NSE: BIOCON)",
    industry: "Biopharmaceuticals",
  },
  "Blue Star": {
    description:
      "Blue Star is India's largest central air conditioning company and a major commercial refrigeration player. It serves commercial, industrial, and residential markets with ACs, chillers, cold storage, and water purifiers.",
    founded: 1943,
    hq: "Mumbai, India",
    ceo: "B Thiagarajan",
    employees: "8,000+",
    website: "https://www.bluestarindia.com",
    type: "Public (NSE: BLUESTARCO)",
    industry: "HVAC & Cooling",
  },
  "Britannia Industries": {
    description:
      "Britannia Industries is one of India's most trusted food companies, known for Good Day, Marie Gold, and Tiger biscuits. It also produces dairy products, cakes, and rusk, sold across India and exported globally.",
    founded: 1892,
    hq: "Kolkata, India",
    ceo: "Rajneet Singh Kohli",
    employees: "4,000+",
    website: "https://www.britannia.co.in",
    type: "Public (NSE: BRITANNIA)",
    industry: "FMCG / Food",
  },
  "Canara Bank": {
    description:
      "Canara Bank is one of India's largest public sector banks with 9,500+ branches. After its merger with Syndicate Bank, it serves millions of retail, MSME, and corporate customers across India.",
    founded: 1906,
    hq: "Bengaluru, India",
    ceo: "Satyanarayana Prasad",
    employees: "90,000+",
    website: "https://www.canarabank.com",
    type: "Public (NSE: CANBK)",
    industry: "Banking",
  },
  CEAT: {
    description:
      "CEAT is one of India's leading tyre companies, part of RPG Group. It manufactures tyres for two-wheelers, passenger cars, trucks, and off-highway vehicles, with operations in India, Sri Lanka, and Bangladesh.",
    founded: 1958,
    hq: "Mumbai, India",
    ceo: "Arnab Banerjee",
    employees: "10,000+",
    website: "https://www.ceat.com",
    type: "Public (NSE: CEATLTD)",
    industry: "Automotive / Tyres",
  },
  "Central Bank of India": {
    description:
      "Central Bank of India is one of the oldest public sector banks in India with 4,700+ branches. It offers retail banking, agriculture loans, MSME financing, and government banking services.",
    founded: 1911,
    hq: "Mumbai, India",
    ceo: "M. V. Rao",
    employees: "33,000+",
    website: "https://www.centralbankofindia.co.in",
    type: "Public (NSE: CENTRALBK)",
    industry: "Banking",
  },
  Cipla: {
    description:
      "Cipla is one of India's largest pharmaceutical companies, known for affordable generic medicines. A pioneer in anti-retroviral drugs for HIV treatment in Africa, it operates in 80+ countries with a strong respiratory portfolio.",
    founded: 1935,
    hq: "Mumbai, India",
    ceo: "Umang Vohra",
    employees: "25,000+",
    website: "https://www.cipla.com",
    type: "Public (NSE: CIPLA)",
    industry: "Pharmaceuticals",
  },
  "Coal India": {
    description:
      "Coal India is the world's largest coal mining company and a Maharatna public sector enterprise. It produces over 700 million tonnes of coal annually, supplying fuel to India's power plants and industries.",
    founded: 1975,
    hq: "Kolkata, India",
    ceo: "P. M. Prasad",
    employees: "250,000+",
    website: "https://www.coalindia.in",
    type: "Public (NSE: COALINDIA)",
    industry: "Mining",
  },
  "Cochin Shipyard": {
    description:
      "Cochin Shipyard is the largest shipbuilding and maintenance facility in India. It builds aircraft carriers, tankers, passenger vessels, and maintains ships for Indian Navy and commercial clients.",
    founded: 1972,
    hq: "Kochi, India",
    ceo: "Madhu S Nair",
    employees: "2,500+",
    website: "https://cochinshipyard.in",
    type: "Public (NSE: COCHINSHIP)",
    industry: "Shipbuilding",
  },
  Cyient: {
    description:
      "Cyient is a global engineering services and digital technology company serving aerospace, rail, utilities, and semiconductor industries. It provides design, manufacture, and embedded technology solutions.",
    founded: 1991,
    hq: "Hyderabad, India",
    ceo: "Krishna Bodanapu",
    employees: "15,000+",
    website: "https://www.cyient.com",
    type: "Public (NSE: CYIENT)",
    industry: "Engineering Services",
  },
  Dabur: {
    description:
      "Dabur India is one of the world's largest Ayurvedic and natural healthcare companies. Known for Dabur Chyawanprash, Hajmola, and Real juices, it operates in 100+ countries and leads India's herbal healthcare segment.",
    founded: 1884,
    hq: "Gurugram, India",
    ceo: "Mohit Malhotra",
    employees: "9,000+",
    website: "https://www.dabur.com",
    type: "Public (NSE: DABUR)",
    industry: "FMCG / Healthcare",
  },
  "Dixon Technologies": {
    description:
      "Dixon Technologies is India's largest electronics manufacturing services (EMS) company. It manufactures TVs, washing machines, lighting, smartphones, and set-top boxes for major global and domestic brands under India's PLI scheme.",
    founded: 2000,
    hq: "Noida, India",
    ceo: "Atul B Lall",
    employees: "6,000+",
    website: "https://www.dixoninfo.com",
    type: "Public (NSE: DIXON)",
    industry: "Electronics Manufacturing",
  },
  DLF: {
    description:
      "DLF is India's largest real estate developer by area, building residential complexes, commercial offices, malls, and luxury hotels across India. It pioneered organized real estate in India and remains the leader in NCR.",
    founded: 1946,
    hq: "New Delhi, India",
    ceo: "Ashok Tyagi",
    employees: "3,000+",
    website: "https://www.dlf.in",
    type: "Public (NSE: DLF)",
    industry: "Real Estate",
  },
  DMart: {
    description:
      "DMart (Avenue Supermarts) is India's fastest-growing retail chain, known for its no-frills, EDLP (everyday low price) model. It operates 370+ stores and is one of India's most profitable listed retailers.",
    founded: 2002,
    hq: "Mumbai, India",
    ceo: "Neville Noronha",
    employees: "14,000+",
    website: "https://www.dmartindia.com",
    type: "Public (NSE: DMART)",
    industry: "Retail",
  },
  "Dr. Reddy's Laboratories": {
    description:
      "Dr. Reddy's Laboratories is a global pharmaceutical company manufacturing active pharmaceutical ingredients (APIs), generics, and branded drugs. It is India's second largest pharma company by market cap and exports to 66+ countries.",
    founded: 1984,
    hq: "Hyderabad, India",
    ceo: "Erez Israeli",
    employees: "22,000+",
    website: "https://www.drreddys.com",
    type: "Public (NSE: DRREDDY)",
    industry: "Pharmaceuticals",
  },
  EaseMyTrip: {
    description:
      "EaseMyTrip is India's second largest online travel platform, providing flight, hotel, holiday, and bus bookings. It is profitable since inception and is expanding into corporate travel, fintech, and international markets.",
    founded: 2008,
    hq: "New Delhi, India",
    ceo: "Nishant Pitti",
    employees: "1,500+",
    website: "https://www.easemytrip.com",
    type: "Public (NSE: EASEMYTRIP)",
    industry: "Travel / OTA",
  },
  "Eicher Motors": {
    description:
      "Eicher Motors is the maker of Royal Enfield motorcycles and heavy commercial vehicles (through VE Commercial Vehicles with Volvo). Royal Enfield dominates India's mid-size motorcycle segment and is growing globally.",
    founded: 1948,
    hq: "New Delhi, India",
    ceo: "Siddhartha Lal",
    employees: "3,500+",
    website: "https://www.eichermotors.com",
    type: "Public (NSE: EICHERMOT)",
    industry: "Automotive",
  },
  Emami: {
    description:
      "Emami is a leading Indian FMCG company known for ayurvedic health and beauty brands like Boroplus, Navratna, and Fair and Handsome. It operates in 60+ countries and is expanding in international markets.",
    founded: 1974,
    hq: "Kolkata, India",
    ceo: "Harsha V. Agarwal",
    employees: "3,000+",
    website: "https://www.emamiltd.in",
    type: "Public (NSE: EMAMILTD)",
    industry: "FMCG",
  },
  "Exide Industries": {
    description:
      "Exide Industries is India's largest storage battery manufacturer, producing automotive, industrial, and solar batteries. It is entering the lithium-ion battery space through Exide Energy Solutions to capitalize on the EV boom.",
    founded: 1947,
    hq: "Kolkata, India",
    ceo: "Subir Chakraborty",
    employees: "7,000+",
    website: "https://www.exideindustries.com",
    type: "Public (NSE: EXIDEIND)",
    industry: "Batteries",
  },
  "Federal Bank": {
    description:
      "Federal Bank is a leading private sector bank headquartered in Kerala, India. It has a strong NRI customer base and is rapidly expanding its digital banking, fintech partnerships, and retail banking services.",
    founded: 1931,
    hq: "Aluva, India",
    ceo: "KVS Manian",
    employees: "14,000+",
    website: "https://www.federalbank.co.in",
    type: "Public (NSE: FEDERALBNK)",
    industry: "Banking",
  },
  Flipkart: {
    description:
      "Flipkart is India's largest e-commerce company, owned by Walmart. It operates Flipkart, Myntra, and PhonePe (fintech), and is the market leader in electronics and fashion categories. Planning an IPO in coming years.",
    founded: 2007,
    hq: "Bengaluru, India",
    ceo: "Kalyan Krishnamurthy",
    employees: "30,000+",
    website: "https://www.flipkart.com",
    type: "Private (Walmart)",
    industry: "E-Commerce",
  },
  "Force Motors": {
    description:
      "Force Motors manufactures a range of commercial vehicles, SUVs, and specialty vehicles in India. It produces Gurkha SUVs, Traveller vans, and is the exclusive manufacturer of Mercedes-Benz and BMW axles for India.",
    founded: 1958,
    hq: "Pune, India",
    ceo: "Abhay Firodia",
    employees: "7,000+",
    website: "https://www.forcemotors.com",
    type: "Public (NSE: FORCEMOT)",
    industry: "Automotive",
  },
  "Fortis Healthcare": {
    description:
      "Fortis Healthcare is one of India's largest hospital networks with 27+ hospitals and 4,500+ beds. It offers tertiary and quaternary care in cardiac sciences, oncology, orthopedics, and neuroscience.",
    founded: 2001,
    hq: "New Delhi, India",
    ceo: "Ashutosh Raghuvanshi",
    employees: "23,000+",
    website: "https://www.fortishealthcare.com",
    type: "Public (NSE: FORTIS)",
    industry: "Healthcare",
  },
  GAIL: {
    description:
      "GAIL (Gas Authority of India Limited) is India's largest natural gas distributor and pipeline company. It operates 16,000 km of gas pipelines, gas processing plants, and is investing in renewable energy and green hydrogen.",
    founded: 1984,
    hq: "New Delhi, India",
    ceo: "Sandeep Kumar Gupta",
    employees: "5,000+",
    website: "https://www.gail.nic.in",
    type: "Public (NSE: GAIL)",
    industry: "Oil & Gas / Energy",
  },
  "Godrej Group": {
    description:
      "Godrej Group is one of India's oldest and most trusted conglomerates with businesses in FMCG (Godrej Consumer Products), real estate (Godrej Properties), agriculture, storage, and aerospace across 18 countries.",
    founded: 1897,
    hq: "Mumbai, India",
    ceo: "Nadir Godrej",
    employees: "30,000+",
    website: "https://www.godrej.com",
    type: "Private (Conglomerate)",
    industry: "Diversified",
  },
  Havells: {
    description:
      "Havells is India's leading electrical equipment company producing switchgear, cables, motors, fans, lighting, and consumer appliances. It owns Lloyd (ACs and appliances) and operates in 50+ countries.",
    founded: 1958,
    hq: "Noida, India",
    ceo: "Anil Rai Gupta",
    employees: "8,000+",
    website: "https://www.havells.com",
    type: "Public (NSE: HAVELLS)",
    industry: "Electrical Equipment",
  },
  "HDFC Bank": {
    description:
      "HDFC Bank is India's largest private sector bank by assets and market cap. Following its merger with HDFC Ltd., it serves 85M+ customers through 8,300+ branches with strong retail, corporate, and digital banking capabilities.",
    founded: 1994,
    hq: "Mumbai, India",
    ceo: "Sashidhar Jagdishan",
    employees: "180,000+",
    website: "https://www.hdfcbank.com",
    type: "Public (NSE: HDFCBANK)",
    industry: "Banking",
  },
  "Hero MotoCorp": {
    description:
      "Hero MotoCorp is the world's largest two-wheeler manufacturer by volume, producing over 8 million motorcycles and scooters annually. It dominates India's entry-level motorcycle segment and is expanding EVs through Vida brand.",
    founded: 2011,
    hq: "New Delhi, India",
    ceo: "Niranjan Gupta",
    employees: "9,000+",
    website: "https://www.heromotocorp.com",
    type: "Public (NSE: HEROMOTOCO)",
    industry: "Automotive",
  },
  "Hindalco Industries": {
    description:
      "Hindalco Industries is the world's largest recycler of aluminum and a major copper producer. Through Novelis (acquired in 2007), it is the global leader in rolled aluminum products used in automotive and packaging.",
    founded: 1958,
    hq: "Mumbai, India",
    ceo: "Satish Pai",
    employees: "22,000+",
    website: "https://www.hindalco.com",
    type: "Public (NSE: HINDALCO)",
    industry: "Metals & Mining",
  },
  "Hindustan Aeronautics Limited": {
    description:
      "HAL is India's premier aerospace and defense company, manufacturing fighter jets, helicopters, aero engines, and avionics. It produces Tejas (LCA), Dhruv helicopters, and is developing the AMCA fifth-generation fighter.",
    founded: 1940,
    hq: "Bengaluru, India",
    ceo: "C B Ananthakrishnan",
    employees: "30,000+",
    website: "https://hal-india.co.in",
    type: "Public (NSE: HAL)",
    industry: "Aerospace & Defense",
  },
  "Hindustan Petroleum": {
    description:
      "Hindustan Petroleum Corporation (HPCL) is a Maharatna oil PSU operating refineries and a nationwide distribution network of petrol stations and LPG cylinders. It is investing in refinery expansion and clean energy.",
    founded: 1952,
    hq: "Mumbai, India",
    ceo: "Pushp Kumar Joshi",
    employees: "10,000+",
    website: "https://www.hindustanpetroleum.com",
    type: "Public (NSE: HINDPETRO)",
    industry: "Oil & Gas",
  },
  "Hindustan Zinc": {
    description:
      "Hindustan Zinc is the world's second largest integrated zinc-lead miner, a subsidiary of Vedanta Group. It produces zinc, lead, silver, and cadmium from mines in Rajasthan and is a major silver producer in Asia.",
    founded: 1966,
    hq: "Udaipur, India",
    ceo: "Arun Misra",
    employees: "7,000+",
    website: "https://www.hzlindia.com",
    type: "Public (NSE: HINDZINC)",
    industry: "Mining / Metals",
  },
  "ICICI Bank": {
    description:
      "ICICI Bank is India's second largest private bank, offering retail, SME, and corporate banking with 6,400+ branches. Its digital platform iMobile Pay and merchant ecosystem make it a fintech-forward bank.",
    founded: 1994,
    hq: "Mumbai, India",
    ceo: "Sandeep Bakhshi",
    employees: "130,000+",
    website: "https://www.icicibank.com",
    type: "Public (NSE: ICICIBANK)",
    industry: "Banking",
  },
  "IDBI Bank": {
    description:
      "IDBI Bank is a government bank undergoing privatization, offering retail and corporate banking services. It has 1,900+ branches and is backed by LIC with the government seeking to divest its majority stake.",
    founded: 1964,
    hq: "Mumbai, India",
    ceo: "Rakesh Sharma",
    employees: "19,000+",
    website: "https://www.idbibank.in",
    type: "Public (NSE: IDBI)",
    industry: "Banking",
  },
  "IDFC First Bank": {
    description:
      "IDFC First Bank is a fast-growing new-age private bank formed from the merger of IDFC Bank and Capital First. It focuses on retail banking, microfinance, and SME lending with a strong digital platform.",
    founded: 2015,
    hq: "Mumbai, India",
    ceo: "V Vaidyanathan",
    employees: "40,000+",
    website: "https://www.idfcfirstbank.com",
    type: "Public (NSE: IDFCFIRSTB)",
    industry: "Banking",
  },
  "Indian Hotels Company Limited": {
    description:
      "IHCL (Taj Hotels) is India's largest hospitality company, operating Taj, SeleQtions, Vivanta, and Ginger brands with 250+ hotels globally. Part of Tata Group, it is known for iconic luxury properties.",
    founded: 1902,
    hq: "Mumbai, India",
    ceo: "Puneet Chhatwal",
    employees: "25,000+",
    website: "https://www.ihcltata.com",
    type: "Public (NSE: INDHOTEL)",
    industry: "Hospitality",
  },
  "Indian Oil Corporation": {
    description:
      "Indian Oil Corporation (IOC) is India's largest company by revenue, operating refineries, pipelines, and the widest petrol station network in India. It is diversifying into petrochemicals, natural gas, and renewable energy.",
    founded: 1964,
    hq: "New Delhi, India",
    ceo: "Shrikant Madhav Vaidya",
    employees: "32,000+",
    website: "https://www.iocl.com",
    type: "Public (NSE: IOC)",
    industry: "Oil & Gas",
  },
  "Indian Railways": {
    description:
      "Indian Railways is the world's largest railway network under single management and India's largest employer. It operates 22,000+ trains daily, transporting 8 billion passengers annually and is undergoing a massive modernization program.",
    founded: 1853,
    hq: "New Delhi, India",
    ceo: "Jaya Verma Sinha",
    employees: "1,200,000+",
    website: "https://www.indianrailways.gov.in",
    type: "Government",
    industry: "Transportation",
  },
  IndiGo: {
    description:
      "IndiGo is India's largest airline by market share (60%+), operating 300+ aircraft on 100+ domestic and international routes. Known for its low-cost, on-time operations, it is rapidly expanding to long-haul international routes.",
    founded: 2006,
    hq: "Gurugram, India",
    ceo: "Pieter Elbers",
    employees: "30,000+",
    website: "https://www.goindigo.in",
    type: "Public (NSE: INDIGO)",
    industry: "Aviation",
  },
  "IndusInd Bank": {
    description:
      "IndusInd Bank is a leading private sector bank in India known for its vehicle finance, microfinance (Bharat Financial), and corporate banking. It has 2,600+ branches and a strong fintech and digital banking focus.",
    founded: 1994,
    hq: "Pune, India",
    ceo: "Sumant Kathpalia",
    employees: "35,000+",
    website: "https://www.indusind.com",
    type: "Public (NSE: INDUSINDBK)",
    industry: "Banking",
  },
  "ITC Limited": {
    description:
      "ITC is a diversified conglomerate with businesses in FMCG (cigarettes, Sunfeast, Aashirvaad), hotels, paperboards, agribusiness, and IT. It is one of India's most profitable companies with strong brand equity.",
    founded: 1910,
    hq: "Kolkata, India",
    ceo: "Sanjiv Puri",
    employees: "35,000+",
    website: "https://www.itcportal.com",
    type: "Public (NSE: ITC)",
    industry: "Diversified / FMCG",
  },
  ISRO: {
    description:
      "ISRO (Indian Space Research Organisation) is India's national space agency, known for cost-effective missions including Chandrayaan (Moon), Mangalyaan (Mars), and Aditya-L1 (Sun). It operates PSLV, GSLV, and LVM3 rockets.",
    founded: 1969,
    hq: "Bengaluru, India",
    ceo: "S. Somanath",
    employees: "16,000+",
    website: "https://www.isro.gov.in",
    type: "Government",
    industry: "Space Research",
  },
  Jio: {
    description:
      "Jio disrupted Indian telecom in 2016 by offering free data and voice services, acquiring 400M+ subscribers. The Reliance subsidiary also operates JioCinema, JioSaavn, JioMart, and JioFiber broadband services.",
    founded: 2016,
    hq: "Mumbai, India",
    ceo: "Akash Ambani",
    employees: "10,000+",
    website: "https://www.jio.com",
    type: "Private (Reliance)",
    industry: "Telecom",
  },
  "Jio Platforms": {
    description:
      "Jio Platforms is the technology holding company of Reliance Industries, housing Jio telecom, Jio apps, and digital services. Valued at $65B+, it has received investments from Facebook (Meta), Google, and global PE funds.",
    founded: 2019,
    hq: "Mumbai, India",
    ceo: "Akash Ambani",
    employees: "15,000+",
    website: "https://www.jio.com",
    type: "Private (Reliance)",
    industry: "Technology",
  },
  "Jindal Steel and Power": {
    description:
      "Jindal Steel and Power (JSPL) is one of India's largest steel producers with integrated plants in Jharkhand and Odisha. It is diversifying into green steel and renewable energy.",
    founded: 1952,
    hq: "New Delhi, India",
    ceo: "V.R. Sharma",
    employees: "15,000+",
    website: "https://www.jindalsteelpower.com",
    type: "Public (NSE: JINDALSTEL)",
    industry: "Steel",
  },
  "JSW Steel": {
    description:
      "JSW Steel is India's largest private steel company with a capacity of 28 MTPA. Part of JSW Group, it produces flat and long products for automotive, infrastructure, and consumer segments, and is expanding internationally.",
    founded: 1982,
    hq: "Mumbai, India",
    ceo: "Jayant Acharya",
    employees: "20,000+",
    website: "https://www.jsw.in/steel",
    type: "Public (NSE: JSWSTEEL)",
    industry: "Steel",
  },
  "JSW Group": {
    description:
      "JSW Group is a leading Indian conglomerate with businesses in steel, cement, energy, paints (JSW Paints), and sports. Led by Sajjan Jindal, it has a combined revenue exceeding $18B and operates across 16 countries.",
    founded: 1982,
    hq: "Mumbai, India",
    ceo: "Sajjan Jindal",
    employees: "40,000+",
    website: "https://www.jsw.in",
    type: "Private (Conglomerate)",
    industry: "Diversified",
  },
  "Jubilant FoodWorks": {
    description:
      "Jubilant FoodWorks operates Domino's Pizza and Popeyes in India, Sri Lanka, and Bangladesh. It is India's largest food service company with 2,000+ Domino's outlets and is expanding into new QSR categories.",
    founded: 1995,
    hq: "Noida, India",
    ceo: "Sameer Khetarpal",
    employees: "40,000+",
    website: "https://www.jubilantfoodworks.com",
    type: "Public (NSE: JUBLFOOD)",
    industry: "Food / QSR",
  },
  "Kotak Mahindra Bank": {
    description:
      "Kotak Mahindra Bank is India's fourth largest private bank by assets, founded by Uday Kotak. Known for its Kotak 811 digital bank and wealth management, it serves retail and corporate customers with premium services.",
    founded: 1985,
    hq: "Mumbai, India",
    ceo: "Ashok Vaswani",
    employees: "100,000+",
    website: "https://www.kotak.com",
    type: "Public (NSE: KOTAKBANK)",
    industry: "Banking",
  },
  "KPIT Technologies": {
    description:
      "KPIT Technologies is a pure-play automotive technology company providing software solutions for electric vehicles, autonomous driving, and connected vehicles. It serves global OEMs and Tier-1 automotive suppliers.",
    founded: 1990,
    hq: "Pune, India",
    ceo: "Kishor Patil",
    employees: "12,000+",
    website: "https://www.kpit.com",
    type: "Public (NSE: KPITTECH)",
    industry: "Automotive IT",
  },
  "Larsen & Toubro": {
    description:
      "Larsen & Toubro is India's largest engineering and construction conglomerate. It builds infrastructure (metros, highways, defense systems, power plants) and operates in IT, financial services, and heavy industries.",
    founded: 1938,
    hq: "Mumbai, India",
    ceo: "S. N. Subrahmanyan",
    employees: "50,000+",
    website: "https://www.larsentoubro.com",
    type: "Public (NSE: LT)",
    industry: "Engineering & Construction",
  },
  "Life Insurance Corporation": {
    description:
      "LIC is India's largest insurance company and financial institution by assets. It manages ₹44 trillion+ in investments and serves 290M+ policyholders. Its 2022 IPO was India's largest ever.",
    founded: 1956,
    hq: "Mumbai, India",
    ceo: "Siddhartha Mohanty",
    employees: "100,000+",
    website: "https://www.licindia.in",
    type: "Public (NSE: LICI)",
    industry: "Insurance",
  },
  "Mahindra & Mahindra": {
    description:
      "Mahindra & Mahindra is India's largest SUV manufacturer and a global agricultural tractor leader. The Mahindra Group spans IT (Tech Mahindra), aerospace, real estate, hospitality, and financial services.",
    founded: 1945,
    hq: "Mumbai, India",
    ceo: "Anish Shah",
    employees: "80,000+",
    website: "https://www.mahindra.com",
    type: "Public (NSE: M&M)",
    industry: "Automotive / Conglomerate",
  },
  MakeMyTrip: {
    description:
      "MakeMyTrip is India's largest online travel company, operating MakeMyTrip, Goibibo, and redBus. It dominates Indian online flight and hotel bookings and has expanded into Southeast Asia and the Middle East.",
    founded: 2000,
    hq: "Gurugram, India",
    ceo: "Rajesh Magow",
    employees: "6,000+",
    website: "https://www.makemytrip.com",
    type: "Public (NASDAQ: MMYT)",
    industry: "Travel / OTA",
  },
  Marico: {
    description:
      "Marico is a leading FMCG company known for Parachute (coconut oil), Saffola (edible oil), and hair care brands. Present in 25+ countries, it generates 25% of revenue from international markets including MENA and Southeast Asia.",
    founded: 1988,
    hq: "Mumbai, India",
    ceo: "Saugata Gupta",
    employees: "9,000+",
    website: "https://marico.com",
    type: "Public (NSE: MARICO)",
    industry: "FMCG",
  },
  "Maruti Suzuki": {
    description:
      "Maruti Suzuki is India's largest passenger car manufacturer with 40%+ market share. A joint venture with Suzuki Japan, it sells Alto, Swift, Baleno, and Ertiga models and is launching EVs for India's market.",
    founded: 1981,
    hq: "New Delhi, India",
    ceo: "Hisashi Takeuchi",
    employees: "22,000+",
    website: "https://www.marutisuzuki.com",
    type: "Public (NSE: MARUTI)",
    industry: "Automotive",
  },
  "Max Healthcare": {
    description:
      "Max Healthcare is one of India's largest hospital networks with 17+ hospitals. Known for oncology, orthopedics, and organ transplants, it is expanding aggressively in Delhi NCR, Mumbai, and other major cities.",
    founded: 2000,
    hq: "New Delhi, India",
    ceo: "Abhay Soi",
    employees: "15,000+",
    website: "https://www.maxhealthcare.in",
    type: "Public (NSE: MAXHEALTH)",
    industry: "Healthcare",
  },
  Mphasis: {
    description:
      "Mphasis is an IT solutions company backed by Blackstone, specializing in banking, financial services, logistics, and telecom. It is known for cloud and cognitive services and serves Fortune 500 clients globally.",
    founded: 2000,
    hq: "Bengaluru, India",
    ceo: "Nitin Rakesh",
    employees: "35,000+",
    website: "https://www.mphasis.com",
    type: "Public (NSE: MPHASIS)",
    industry: "IT Services",
  },
  MRF: {
    description:
      "MRF (Madras Rubber Factory) is India's largest tyre company, producing tyres for cars, trucks, motorcycles, and aircraft. It is also the most expensive stock on Indian exchanges and has the highest brand recall for sports (cricket).",
    founded: 1946,
    hq: "Chennai, India",
    ceo: "KM Mammen",
    employees: "18,000+",
    website: "https://www.mrftyres.com",
    type: "Public (NSE: MRF)",
    industry: "Automotive / Tyres",
  },
  "Muthoot Finance": {
    description:
      "Muthoot Finance is India's largest gold loan NBFC, providing secured loans against gold jewelry. With 5,500+ branches, it serves millions of low-income and MSME customers across India.",
    founded: 1939,
    hq: "Kochi, India",
    ceo: "George Alexander Muthoot",
    employees: "26,000+",
    website: "https://www.muthootfinance.com",
    type: "Public (NSE: MUTHOOTFIN)",
    industry: "Financial Services",
  },
  Myntra: {
    description:
      "Myntra is India's largest fashion e-commerce platform, owned by Flipkart (Walmart). It hosts 5,000+ brands and uses AI-powered styling and sustainability-focused initiatives to serve India's growing online fashion market.",
    founded: 2007,
    hq: "Bengaluru, India",
    ceo: "Nishna Biyani",
    employees: "5,000+",
    website: "https://www.myntra.com",
    type: "Private (Flipkart)",
    industry: "E-Commerce / Fashion",
  },
  "National Payments Corporation of India": {
    description:
      "NPCI operates India's national payment infrastructure including UPI, RuPay, IMPS, and FASTag. UPI processes 10 billion+ transactions monthly, making NPCI's platforms the backbone of India's digital payment revolution.",
    founded: 2008,
    hq: "Mumbai, India",
    ceo: "Dilip Asbe",
    employees: "2,000+",
    website: "https://www.npci.org.in",
    type: "Non-profit / Government",
    industry: "Fintech / Payments",
  },
  "NTPC Limited": {
    description:
      "NTPC is India's largest power generation company and a Maharatna PSU. It operates 70+ power stations with 73 GW capacity and is aggressively expanding into renewable energy targeting 60 GW of green capacity by 2032.",
    founded: 1975,
    hq: "New Delhi, India",
    ceo: "Gurdeep Singh",
    employees: "18,000+",
    website: "https://www.ntpc.co.in",
    type: "Public (NSE: NTPC)",
    industry: "Power Generation",
  },
  Nykaa: {
    description:
      "Nykaa is India's leading beauty and personal care e-commerce platform with 3,500+ brands. Founded by Falguni Nayar, it also operates Nykaa Fashion and has 150+ physical stores, combining online and offline retail.",
    founded: 2012,
    hq: "Mumbai, India",
    ceo: "Falguni Nayar",
    employees: "3,000+",
    website: "https://www.nykaa.com",
    type: "Public (NSE: NYKAA)",
    industry: "E-Commerce / Beauty",
  },
  "Oil and Natural Gas Corporation": {
    description:
      "ONGC is India's largest crude oil and gas producer, a Maharatna PSU producing 70% of India's domestic oil output. It operates offshore and onshore blocks across India and internationally through ONGC Videsh.",
    founded: 1956,
    hq: "Dehradun, India",
    ceo: "Arun Kumar Singh",
    employees: "34,000+",
    website: "https://www.ongcindia.com",
    type: "Public (NSE: ONGC)",
    industry: "Oil & Gas",
  },
  "Ola Electric": {
    description:
      "Ola Electric is India's largest electric two-wheeler company, producing S1 scooters at the world's largest EV factory in Tamil Nadu. It is building its own cell manufacturing (Ola Gigafactory) to achieve vertical integration.",
    founded: 2017,
    hq: "Bengaluru, India",
    ceo: "Bhavish Aggarwal",
    employees: "8,000+",
    website: "https://www.olaelectric.com",
    type: "Public (NSE: OLAELEC)",
    industry: "Electric Vehicles",
  },
  "One97 Communications": {
    description:
      "Paytm (One97 Communications) is India's largest digital payments and financial services company. It operates Paytm UPI, Paytm Payments Bank, Paytm Money (investing), and merchant payment devices for 35M+ merchants.",
    founded: 2000,
    hq: "Noida, India",
    ceo: "Vijay Shekhar Sharma",
    employees: "8,000+",
    website: "https://www.paytm.com",
    type: "Public (NSE: PAYTM)",
    industry: "Fintech",
  },
  "Patanjali Ayurved": {
    description:
      "Patanjali Ayurved is one of India's fastest-growing FMCG companies, founded by yoga guru Baba Ramdev and Balkrishna. It produces ayurvedic medicines, food products, personal care, and dairy under the Patanjali brand.",
    founded: 2006,
    hq: "Haridwar, India",
    ceo: "Balkrishna Acharya",
    employees: "10,000+",
    website: "https://www.patanjaliayurved.net",
    type: "Private",
    industry: "FMCG / Ayurveda",
  },
  "Persistent Systems": {
    description:
      "Persistent Systems is a fast-growing Indian IT company specializing in software product engineering, digital transformation, and enterprise modernization. It is growing faster than industry peers and serves ISVs, banks, and healthcare companies.",
    founded: 1990,
    hq: "Pune, India",
    ceo: "Sandeep Kalra",
    employees: "23,000+",
    website: "https://www.persistent.com",
    type: "Public (NSE: PERSISTENT)",
    industry: "IT Services",
  },
  "Pidilite Industries": {
    description:
      "Pidilite is India's leading adhesives and sealants company, maker of Fevicol, Dr. Fixit, and M-Seal. These iconic brands dominate their respective categories and Pidilite is expanding internationally with strong brand extensions.",
    founded: 1959,
    hq: "Mumbai, India",
    ceo: "Sudhanshu Vats",
    employees: "6,000+",
    website: "https://www.pidilite.com",
    type: "Public (NSE: PIDILITIND)",
    industry: "Adhesives / Chemicals",
  },
  "Pine Labs": {
    description:
      "Pine Labs is India's leading merchant commerce platform, providing smart POS terminals, unified payments, and BNPL solutions. It processes $60B+ annually across 660,000 merchant touchpoints in Asia and the Middle East.",
    founded: 2000,
    hq: "Noida, India",
    ceo: "Amrish Rau",
    employees: "2,500+",
    website: "https://www.pinelabs.com",
    type: "Private",
    industry: "Fintech / POS",
  },
  "Piramal Group": {
    description:
      "Piramal Group has transformed from textiles to pharma and financial services. Piramal Pharma is a CDMO and specialty pharma company, while Piramal Capital provides housing and enterprise finance across India.",
    founded: 1947,
    hq: "Mumbai, India",
    ceo: "Ajay Piramal",
    employees: "10,000+",
    website: "https://www.piramal.com",
    type: "Public (NSE: PEL)",
    industry: "Pharma / Finance",
  },
  "Power Grid Corporation of India": {
    description:
      "Power Grid Corporation is India's central power transmission utility, operating 170,000+ km of transmission lines and 250+ substations. A Maharatna PSU, it is expanding into telecom, EV charging, and data centers.",
    founded: 1989,
    hq: "Gurugram, India",
    ceo: "Ramesh Babu Mynampati",
    employees: "10,000+",
    website: "https://www.powergrid.in",
    type: "Public (NSE: POWERGRID)",
    industry: "Power Transmission",
  },
  "Punjab National Bank": {
    description:
      "Punjab National Bank is India's second largest public sector bank with 10,000+ branches. Post merger with OBC and United Bank, it serves millions of retail and corporate customers with digital banking expansion.",
    founded: 1894,
    hq: "New Delhi, India",
    ceo: "Atul Kumar Goel",
    employees: "100,000+",
    website: "https://www.pnbindia.in",
    type: "Public (NSE: PNB)",
    industry: "Banking",
  },
  "Raymond Group": {
    description:
      "Raymond Group is India's largest branded fabric and apparel company. It sells suiting, shirting, and readymade garments through 1,500+ stores under Raymond, Park Avenue, and ColorPlus brands.",
    founded: 1925,
    hq: "Mumbai, India",
    ceo: "Gautam Singhania",
    employees: "30,000+",
    website: "https://www.raymond.in",
    type: "Public (NSE: RAYMOND)",
    industry: "Textiles / Retail",
  },
  "Reliance Industries": {
    description:
      "Reliance Industries is India's most valuable company with businesses spanning oil-to-chemicals (O2C), Jio telecom, Reliance Retail, and new energy. Led by Mukesh Ambani, it generates $100B+ in revenue annually.",
    founded: 1973,
    hq: "Mumbai, India",
    ceo: "Mukesh Ambani",
    employees: "236,000+",
    website: "https://www.ril.com",
    type: "Public (NSE: RELIANCE)",
    industry: "Conglomerate",
  },
  "Reliance Retail": {
    description:
      "Reliance Retail is India's largest retailer, operating 18,800+ stores across grocery, electronics, fashion (AJIO), and wholesale. It is building an integrated commerce platform combining digital and physical retail.",
    founded: 2006,
    hq: "Mumbai, India",
    ceo: "Isha Ambani",
    employees: "200,000+",
    website: "https://www.relianceretail.com",
    type: "Private (Reliance)",
    industry: "Retail",
  },
  "Royal Enfield": {
    description:
      "Royal Enfield is the world's oldest motorcycle brand in continuous production. It dominates India's mid-size motorcycle segment (250-750cc) with Bullet, Classic, Himalayan, and Meteor models, and is expanding globally.",
    founded: 1901,
    hq: "Chennai, India",
    ceo: "B. Govindarajan",
    employees: "5,000+",
    website: "https://www.royalenfield.com",
    type: "Subsidiary (Eicher)",
    industry: "Automotive / Motorcycles",
  },
  "Serum Institute of India": {
    description:
      "Serum Institute of India is the world's largest vaccine manufacturer by doses, producing 1.5 billion+ doses annually. It manufactures COVID-19 (Covishield), polio, measles, and other vaccines for 170+ countries.",
    founded: 1966,
    hq: "Pune, India",
    ceo: "Adar Poonawalla",
    employees: "7,000+",
    website: "https://www.seruminstitute.com",
    type: "Private",
    industry: "Vaccines / Biologicals",
  },
  "Shree Cement": {
    description:
      "Shree Cement is India's third largest cement producer with 47 MTPA capacity. Known for its energy efficiency and operational excellence, it operates in 11 states and is expanding aggressively in Eastern and Southern India.",
    founded: 1979,
    hq: "Kolkata, India",
    ceo: "Neeraj Akhoury",
    employees: "7,000+",
    website: "https://www.shreecement.com",
    type: "Public (NSE: SHREECEM)",
    industry: "Cement",
  },
  "Shriram Group": {
    description:
      "Shriram Group is a leading Indian financial services conglomerate providing vehicle loans, housing finance, insurance, and chit funds. After the Shriram Transport-City Union Bank merger, it is India's largest retail NBFC.",
    founded: 1974,
    hq: "Chennai, India",
    ceo: "Y. S. Chakravarti",
    employees: "20,000+",
    website: "https://www.shriramgroup.com",
    type: "Public (NSE: SHRIRAMFIN)",
    industry: "Financial Services",
  },
  SpiceJet: {
    description:
      "SpiceJet is India's second largest budget airline, operating domestic and international routes. It has faced financial turbulence but remains operationally significant in India's aviation sector.",
    founded: 2005,
    hq: "Gurugram, India",
    ceo: "Ajay Singh",
    employees: "9,000+",
    website: "https://www.spicejet.com",
    type: "Public (NSE: SPICEJET)",
    industry: "Aviation",
  },
  "State Bank of India": {
    description:
      "State Bank of India is India's largest bank by assets and deposits, operating 22,500+ branches. A Maharatna PSU, it dominates government banking, home loans, and MSME financing, and is rapidly expanding digital banking.",
    founded: 1955,
    hq: "Mumbai, India",
    ceo: "Dinesh Kumar Khara",
    employees: "230,000+",
    website: "https://www.sbi.co.in",
    type: "Public (NSE: SBIN)",
    industry: "Banking",
  },
  "Steel Authority of India Limited": {
    description:
      "SAIL is India's largest steel maker and a Maharatna PSU. It operates five integrated steel plants producing flat, long, and railway products used in infrastructure, automotive, and construction sectors.",
    founded: 1973,
    hq: "New Delhi, India",
    ceo: "Amarendu Prakash",
    employees: "65,000+",
    website: "https://www.sail.co.in",
    type: "Public (NSE: SAIL)",
    industry: "Steel",
  },
  "Sun Pharma": {
    description:
      "Sun Pharmaceutical is India's largest pharmaceutical company and the 4th largest specialty generic pharma company globally. It focuses on complex generics and specialty products including dermatology and ophthalmology.",
    founded: 1983,
    hq: "Mumbai, India",
    ceo: "Dilip Shanghvi",
    employees: "36,000+",
    website: "https://www.sunpharma.com",
    type: "Public (NSE: SUNPHARMA)",
    industry: "Pharmaceuticals",
  },
  Suzlon: {
    description:
      "Suzlon Energy is India's largest renewable energy solutions provider, manufacturing wind turbines and providing end-to-end wind energy solutions. It has commissioned 20+ GW of wind capacity globally.",
    founded: 1995,
    hq: "Pune, India",
    ceo: "J.P. Morgan",
    employees: "8,000+",
    website: "https://www.suzlon.com",
    type: "Public (NSE: SUZLON)",
    industry: "Renewable Energy",
  },
  "Tata Chemicals": {
    description:
      "Tata Chemicals is a leading specialty chemicals company in the Tata Group. It produces soda ash, salt (Tata Salt - India's most trusted brand), silica, and specialty nutrition products sold globally.",
    founded: 1939,
    hq: "Mumbai, India",
    ceo: "R. Mukundan",
    employees: "3,000+",
    website: "https://www.tatachemicals.com",
    type: "Public (NSE: TATACHEM)",
    industry: "Chemicals",
  },
  "Tata Communications": {
    description:
      "Tata Communications is a global digital infrastructure company owned by Tata Group, providing cloud connectivity, IoT, and digital platforms. It owns one of the world's largest subsea cable networks.",
    founded: 2008,
    hq: "Mumbai, India",
    ceo: "A. S. Lakshminarayanan",
    employees: "10,000+",
    website: "https://www.tatacommunications.com",
    type: "Public (NSE: TATACOMM)",
    industry: "Telecom / IT",
  },
  "Tata Consultancy Services": {
    description:
      "TCS is India's largest IT company and the world's second largest IT services company by market cap. It serves 56 of the world's top 100 companies, offering IT, consulting, and business process services across 150+ countries.",
    founded: 1968,
    hq: "Mumbai, India",
    ceo: "K Krithivasan",
    employees: "600,000+",
    website: "https://www.tcs.com",
    type: "Public (NSE: TCS)",
    industry: "IT Services",
  },
  "Tata Consumer Products": {
    description:
      "Tata Consumer Products is the FMCG arm of Tata Group, housing Tata Tea, Tata Salt, Tata Sampann, Tetley, and Eight O'Clock Coffee. It is India's second largest branded food & beverages company.",
    founded: 2020,
    hq: "Kolkata, India",
    ceo: "Sunil D'Souza",
    employees: "3,000+",
    website: "https://www.tataconsumer.com",
    type: "Public (NSE: TATACONSUM)",
    industry: "FMCG",
  },
  "Tata Group": {
    description:
      "Tata Group is India's most respected conglomerate with 100+ companies across IT (TCS), steel, automotive (Jaguar Land Rover), telecom, chemicals, and consumer products. Revenue exceeds $150B with operations in 100+ countries.",
    founded: 1868,
    hq: "Mumbai, India",
    ceo: "N Chandrasekaran",
    employees: "900,000+",
    website: "https://www.tata.com",
    type: "Private (Conglomerate)",
    industry: "Diversified",
  },
  "Tata Motors": {
    description:
      "Tata Motors is India's largest automobile company, producing commercial vehicles, Nexon EV (India's top-selling EV), and Jaguar Land Rover luxury vehicles through its UK subsidiary. It is a pioneer in electric mobility in India.",
    founded: 1945,
    hq: "Mumbai, India",
    ceo: "Shailesh Chandra",
    employees: "80,000+",
    website: "https://www.tatamotors.com",
    type: "Public (NSE: TATAMOTORS)",
    industry: "Automotive",
  },
  "Tata Power": {
    description:
      "Tata Power is India's largest integrated private power company, generating electricity from thermal, hydro, solar, and wind sources. It is the leader in rooftop solar (Tata Power Solar) and EV charging infrastructure in India.",
    founded: 1919,
    hq: "Mumbai, India",
    ceo: "Praveer Sinha",
    employees: "8,000+",
    website: "https://www.tatapower.com",
    type: "Public (NSE: TATAPOWER)",
    industry: "Power",
  },
  "Tata Steel": {
    description:
      "Tata Steel is one of the world's largest steel companies operating in India, UK (Tata Steel UK), and Netherlands. It produces 21 MTPA of steel for automotive, construction, and packaging industries.",
    founded: 1907,
    hq: "Mumbai, India",
    ceo: "T V Narendran",
    employees: "75,000+",
    website: "https://www.tatasteel.com",
    type: "Public (NSE: TATASTEEL)",
    industry: "Steel",
  },
  "Tata Technologies": {
    description:
      "Tata Technologies provides engineering and product development IT services to global automotive, aerospace, and industrial companies. Listed in 2023, it is Tata Group's engineering services arm.",
    founded: 1994,
    hq: "Pune, India",
    ceo: "Warren Harris",
    employees: "12,000+",
    website: "https://www.tatatechnologies.com",
    type: "Public (NSE: TATATECH)",
    industry: "Engineering IT",
  },
  "Tech Mahindra": {
    description:
      "Tech Mahindra is a leading IT services company in the Mahindra Group, specializing in telecom, media, and enterprise digital transformation. It is a major player in 5G network services and digital engineering.",
    founded: 1986,
    hq: "Pune, India",
    ceo: "Mohit Joshi",
    employees: "150,000+",
    website: "https://www.techmahindra.com",
    type: "Public (NSE: TECHM)",
    industry: "IT Services",
  },
  Thermax: {
    description:
      "Thermax is India's leading energy and environment solutions company, providing industrial boilers, waste heat recovery systems, air pollution control, and water treatment plants for global industries.",
    founded: 1966,
    hq: "Pune, India",
    ceo: "M. S. Unnikrishnan",
    employees: "12,000+",
    website: "https://www.thermaxglobal.com",
    type: "Public (NSE: THERMAX)",
    industry: "Industrial Equipment",
  },
  "Titan Company": {
    description:
      "Titan Company (Tata Group) is India's largest lifestyle products company, operating Titan (watches), Tanishq (jewellery), Fastrack, and Skinn (fragrances). Tanishq is India's most trusted jewellery brand.",
    founded: 1984,
    hq: "Bengaluru, India",
    ceo: "C K Venkataraman",
    employees: "12,000+",
    website: "https://www.titancompany.in",
    type: "Public (NSE: TITAN)",
    industry: "Retail / Watches",
  },
  "Torrent Group": {
    description:
      "Torrent Group has major businesses in power distribution (Torrent Power) and pharmaceuticals (Torrent Pharma). Torrent Power distributes electricity in Ahmedabad, Surat, and other cities, while Torrent Pharma is a top-10 Indian pharma company.",
    founded: 1959,
    hq: "Ahmedabad, India",
    ceo: "Sudhir Mehta",
    employees: "15,000+",
    website: "https://www.torrentpower.com",
    type: "Public (NSE: TORNTPOWER)",
    industry: "Power / Pharma",
  },
  "TVS Motor Company": {
    description:
      "TVS Motor Company is India's third largest two-wheeler manufacturer, producing Apache, Jupiter, Ntorq, and TVS iQube EV. It owns Norton Motorcycles (UK) and is rapidly growing internationally.",
    founded: 1978,
    hq: "Chennai, India",
    ceo: "K N Radhakrishnan",
    employees: "10,000+",
    website: "https://www.tvsmotor.com",
    type: "Public (NSE: TVSMOTOR)",
    industry: "Automotive",
  },
  "UCO Bank": {
    description:
      "UCO Bank is a government-owned bank with origins in Kolkata, providing retail, MSME, and corporate banking. It gained prominence as a key bank for India-Russia trade settlement using rupee payments.",
    founded: 1943,
    hq: "Kolkata, India",
    ceo: "Ashwini Kumar",
    employees: "23,000+",
    website: "https://www.ucobank.com",
    type: "Public (NSE: UCOBANK)",
    industry: "Banking",
  },
  "UltraTech Cement": {
    description:
      "UltraTech Cement is India's and Asia's largest cement company by capacity (137 MTPA), a subsidiary of Aditya Birla Group. It manufactures Portland, blended, and white cement and RMC across India and UAE.",
    founded: 2004,
    hq: "Mumbai, India",
    ceo: "Kailash Jhanwar",
    employees: "15,000+",
    website: "https://www.ultratechcement.com",
    type: "Public (NSE: ULTRACEMCO)",
    industry: "Cement",
  },
  "Union Bank of India": {
    description:
      "Union Bank of India is a large public sector bank formed through the merger with Andhra Bank and Corporation Bank. It serves 150M+ customers through 8,700+ branches across India.",
    founded: 1919,
    hq: "Mumbai, India",
    ceo: "A. Manimekhalai",
    employees: "75,000+",
    website: "https://www.unionbankofindia.co.in",
    type: "Public (NSE: UNIONBANK)",
    industry: "Banking",
  },
  "Vedanta Limited": {
    description:
      "Vedanta is a diversified natural resources company producing zinc, lead, silver, iron ore, oil & gas, aluminum, copper, and steel. It is the largest zinc producer outside China (through Hindustan Zinc) and has major mining operations globally.",
    founded: 1976,
    hq: "Mumbai, India",
    ceo: "Anil Agarwal",
    employees: "65,000+",
    website: "https://www.vedantalimited.com",
    type: "Public (NSE: VEDL)",
    industry: "Mining / Metals",
  },
  "Vodafone Idea": {
    description:
      "Vodafone Idea (Vi) is India's third largest telecom operator formed from the merger of Vodafone India and Idea Cellular. It is implementing 4G upgrades and 5G rollout with government equity support.",
    founded: 2018,
    hq: "Mumbai, India",
    ceo: "Akshaya Moondra",
    employees: "17,000+",
    website: "https://www.myvi.in",
    type: "Public (NSE: IDEA)",
    industry: "Telecom",
  },
  Voltas: {
    description:
      "Voltas is India's leading room air conditioner brand and a Tata Group company. It provides HVAC, cold storage, water coolers, and electro-mechanical projects for commercial and industrial clients.",
    founded: 1954,
    hq: "Mumbai, India",
    ceo: "Pradeep Bakshi",
    employees: "7,000+",
    website: "https://www.voltas.com",
    type: "Public (NSE: VOLTAS)",
    industry: "HVAC / Engineering",
  },
  "Welspun Corp": {
    description:
      "Welspun Corp is India's largest and the world's 2nd largest manufacturer of large-diameter pipes used in oil, gas, and water infrastructure. It also produces steel plates and coils for industrial use.",
    founded: 1985,
    hq: "Mumbai, India",
    ceo: "Vipul Mathur",
    employees: "8,000+",
    website: "https://www.welspuncorp.com",
    type: "Public (NSE: WELSPUNIND)",
    industry: "Steel Pipes",
  },
  "Yes Bank": {
    description:
      "Yes Bank is a private sector bank that underwent a government-led reconstruction in 2020. It is rebuilding its franchise with focus on retail banking, SME financing, and digital banking under new management.",
    founded: 2004,
    hq: "Mumbai, India",
    ceo: "Prashant Kumar",
    employees: "28,000+",
    website: "https://www.yesbank.in",
    type: "Public (NSE: YESBANK)",
    industry: "Banking",
  },
  "Zee Entertainment Enterprises": {
    description:
      "Zee Entertainment is one of India's largest media conglomerates, operating Zee TV, Zee Cinema, Zee News, and OTT platform ZEE5. It operates 50+ TV channels in 173 countries reaching 1.3 billion viewers.",
    founded: 1992,
    hq: "Mumbai, India",
    ceo: "Punit Goenka",
    employees: "4,000+",
    website: "https://www.zee.com",
    type: "Public (NSE: ZEEL)",
    industry: "Media / Entertainment",
  },
  "Zee News": {
    description:
      "Zee News is India's leading Hindi news channel, part of Zee Media Corporation. It provides 24-hour news coverage across politics, business, sports, and international affairs.",
    founded: 1999,
    hq: "New Delhi, India",
    ceo: "N/A",
    employees: "2,000+",
    website: "https://zeenews.india.com",
    type: "Public (NSE: ZEEL)",
    industry: "News Media",
  },
  "Zensar Technologies": {
    description:
      "Zensar Technologies is an RPG Group company providing IT services in retail, banking, and manufacturing. It specializes in digital transformation, cloud, and data analytics for mid-size global enterprises.",
    founded: 1991,
    hq: "Pune, India",
    ceo: "Manish Tandon",
    employees: "10,000+",
    website: "https://www.zensar.com",
    type: "Public (NSE: ZENSAR)",
    industry: "IT Services",
  },
  "Zoho Corporation": {
    description:
      "Zoho Corporation is a global SaaS company offering 55+ business applications including CRM, HR, finance, and collaboration tools. Bootstrapped and profitable, it serves 100M+ users across 150+ countries.",
    founded: 1996,
    hq: "Chennai, India",
    ceo: "Sridhar Vembu",
    employees: "15,000+",
    website: "https://www.zoho.com",
    type: "Private",
    industry: "SaaS",
  },
  "Zydus Lifesciences": {
    description:
      "Zydus Lifesciences (formerly Cadila Healthcare) is a top-10 Indian pharma company. It has developed NovaDNA, India's first DNA-based COVID-19 vaccine, and is a leader in vaccines, biosimilars, and US generics.",
    founded: 1952,
    hq: "Ahmedabad, India",
    ceo: "Sharvil Patel",
    employees: "25,000+",
    website: "https://www.zyduslife.com",
    type: "Public (NSE: ZYDUSLIFE)",
    industry: "Pharmaceuticals",
  },
};

function getCompanyData(company: string): CompanyData {
  // Try exact match first
  if (COMPANY_DATA[company]) return COMPANY_DATA[company];
  // Try case-insensitive match
  const key = Object.keys(COMPANY_DATA).find(
    (k) => k.toLowerCase() === company.toLowerCase(),
  );
  if (key) return COMPANY_DATA[key];
  // Generic fallback so overview always shows
  const slug = company.toLowerCase().replace(/\s+/g, "");
  return {
    description: `${company} is a technology company. Search for the latest updates and intelligence signals using the sources below.`,
    founded: 0,
    hq: "Global",
    ceo: "N/A",
    employees: "N/A",
    website: `https://www.${slug}.com`,
    type: "Private",
    industry: "Technology",
  };
}

interface CompanyOverviewProps {
  company: string;
}

export default function CompanyOverview({ company }: CompanyOverviewProps) {
  const data = getCompanyData(company);

  const pills = [
    { label: "Founded", value: data.founded > 0 ? String(data.founded) : "—" },
    { label: "HQ", value: data.hq, icon: <MapPin className="w-3 h-3" /> },
    { label: "CEO", value: data.ceo },
    {
      label: "Employees",
      value: data.employees,
      icon: <Users className="w-3 h-3" />,
    },
    { label: "Type", value: data.type },
    { label: "Industry", value: data.industry },
  ];

  return (
    <div
      className="animate-fade-up rounded-2xl overflow-hidden"
      style={{
        background: "#0F1B2A",
        border: "1px solid rgba(34,211,238,0.2)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(34,211,238,0.05)",
      }}
      data-ocid="overview.card"
    >
      {/* Header */}
      <div
        className="px-8 py-5 flex items-center gap-3"
        style={{
          background:
            "linear-gradient(90deg, rgba(34,211,238,0.08) 0%, rgba(139,92,246,0.06) 100%)",
          borderBottom: "1px solid rgba(34,211,238,0.12)",
        }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#22D3EE,#34D399)" }}
        >
          <Building2 className="w-4 h-4 text-black" />
        </div>
        <div>
          <h2
            className="text-lg font-bold"
            style={{
              background: "linear-gradient(90deg,#22D3EE,#A78BFA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Company Overview
          </h2>
          <p className="text-xs" style={{ color: "#64748B" }}>
            {data.industry} · {data.type}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "#CBD5E1" }}
        >
          {data.description}
        </p>

        {/* Info grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {pills.map((pill) => (
            <div
              key={pill.label}
              className="rounded-xl px-4 py-3"
              style={{
                background: "rgba(34,211,238,0.05)",
                border: "1px solid rgba(34,211,238,0.12)",
              }}
            >
              <p className="text-xs mb-1" style={{ color: "#64748B" }}>
                {pill.label}
              </p>
              <div className="flex items-center gap-1">
                {pill.icon && (
                  <span style={{ color: "#22D3EE" }}>{pill.icon}</span>
                )}
                <p
                  className="text-sm font-semibold truncate"
                  style={{ color: "#E2E8F0" }}
                >
                  {pill.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Website link */}
        <a
          href={data.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
          style={{
            background:
              "linear-gradient(135deg,rgba(34,211,238,0.15),rgba(139,92,246,0.15))",
            border: "1px solid rgba(34,211,238,0.3)",
            color: "#22D3EE",
          }}
          data-ocid="overview.link"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Visit {data.website.replace("https://", "")}
        </a>
      </div>
    </div>
  );
}
