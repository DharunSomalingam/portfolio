import {FaChartLine, FaCloudSun, FaShieldAlt, FaSyncAlt, FaTerminal, FaTools} from "react-icons/fa";

const PROJECTS = [
    {
        id: "SYS-01", name: "CHRONIC CARE ECOSYSTEM", logo: <FaShieldAlt className="text-blue-600" />,
        short: "Agile medical platform for secure record management. Built with HIPAA-compliant architecture and real-time syncing.",
        images: ["/project1a.png", "/project1b.png", '/project1c.png'], tag: "System Arch",
        stack: "Flask / Socket.IO / SQLAlchemy", database: "PostgreSQL / SQLite",
        github:"https://github.com/DharunSomalingam/3403GroupProject.git",
        details: "Full-stack health tracking app built with Flask and SocketIO to handle real-time appointment updates and user alerts. Integrated Chart.js to turn patient logs into visual trends, helping users see which treatments or practitioners they visit most. Built a secure document manager using SQLAlchemy to organize medical records, referrals, and prescriptions. Used AJAX and jQuery to ensure the dashboard updates instantly without needing to refresh the page.",
        impact: "Cut down the time spent manually organising medical paperwork and appointments. Made it significantly faster to find specific test results or referrals through categorised storage. Improved data privacy for users by moving sensitive medical documents from local folders to a secure, authenticated database.",
        keyFeatures: ["Real-Time Reminders", "Medical Document Manager", "Health Trends Analytics", "Secure Document Sharing"]
    },
    {
        id: "DAT-02", name: "ROAD CRASH DW/ETL", logo: <FaChartLine className="text-red-600" />,
        short: "High-volume Star Schema mining for fatality modeling. Automated ETL pipelines processing millions of rows.",
        images: ["/project_1b.png", "/project_2b.png"], tag: "Data Eng",
        stack: "Python / Pandas / NumPy / R", database: "Star Schema / Snowflake DW",
        github:"https://github.com/DharunSomalingam/AUSTRALIAN-ROAD-CRASH-ANALYSIS-DATAWAREHOUSING-AND-MINING-TECHNIQUES.git",
        details: "Developed a data warehouse using Kimball’s four-step methodology to process over 2 million crash records from the Australian Road Deaths Database (ARDD). Designed a star schema with optimized fact and dimension tables to allow for complex querying of accident factors. Implemented association rule mining to detect patterns in road fatalities and used statistical modeling to compare Australian road safety performance against international benchmarks like Norway and Iceland.",
        impact: "Identified over 15 high-risk accident scenarios that help pinpoint where safety reforms are most needed. Provided a structured data framework that demonstrates how specific factors such speed and demographics contribute to the 10% year-on-year increase in road deaths. Created a foundation for evidence-based policy suggestions aimed at reducing fatality rates toward international standards.",
        keyFeatures: ["2M+ Record ETL Pipeline", "Kimball Star Schema", "Association Rule Mining", "International Safety Benchmarking"]
    },
    {
        id: "AI-03", name: "OCR CENSUS DIGITIZER USING LLMS", logo: <FaTerminal className="text-emerald-600" />,
        short: "Leveraging Mistral AI and OCR pipelines to digitize historical census data with 99.2% accuracy.",
        images: ["/project_1c.png", "/project_2c.png", "/ocr.png"], tag: "AI/ML",
        stack: "Mistral AI / Python / OCR", database: "Structured CSV / JSON",
        github:"https://github.com/Cooper-Thomas1/ClimateAnalysis.git",
        details: "Self-healing OCR pipeline with error detection and retry mechanisms. Dynamic page chunking adapting to varied formats across 200+ documents. AI post-processing using Mistral LLM to correct headers and standardize labels. Schema validation for machine-readable outputs.",
        impact: "Enables UN SDG 2030 research on climate migration. Data supports policy design for vulnerable communities facing displacement. Powers international climate mobility analyses.",
        keyFeatures: ["99.2% Accuracy", "Self-Healing", "AI Processing", "SDG Aligned"]
    },
    {
        id: "GEO-04", name: "GEOSPATIAL WEATHER", logo: <FaCloudSun className="text-purple-600" />,
        short: "Complex bounding-box API extraction for climate resilience modeling and geospatial visualisation.",
        images: ["/geo1.png", "/geo2.png","/geo3.png"], tag: "Geospatial",
        stack: "Python / Netatmo API / DPIRD", database: "PostgreSQL / PostGIS",
        details: "Authenticated workflows extracting climate data across 5 Australian cities. Geospatial bounding box queries with sub-kilometer precision. ETL/ELT processes with PostGIS extensions for spatial operations. Fine-grained urban heat analysis.",
        impact: "Data informs sustainable urban planning policies. Research contributes to climate resilience strategies. Findings support zoning decisions prioritising green space.",
        keyFeatures: ["5-City Coverage", "Sub-km Precision", "Spatial Indexing", "Heat Analysis"]
    },
    {
        id: "AUTO-05", name: "OBSIDIAN → NOTION", logo: <FaSyncAlt className="text-amber-600" />,
        short: "Metadata-preserving sync engine. Bridges the gap between local markdown notes and cloud databases.",
        images: ["/obs1.png", "/obs2.png","/obs3.png"], tag: "Automation",
        stack: "Python / Notion API / Shell Script", database: "Notion Database",
        github:"https://github.com/DharunSomalingam/Nortion_Script.git",
        details: "Bidirectional sync preserving YAML frontmatter and nested structures including files. QuickAdd workflow integration enabling seamless capture. Conflict resolution for concurrent edits.",
        impact: "Automated workflows saving 5+ hours weekly for knowledge workers. Eliminated manual operations across platforms. Enhanced collaboration through synchronized databases.",
        keyFeatures: ["Two-Way Sync", "Metadata Preservation", "AI Enhancement", "Ghost CMS"]
    },
    {
        id: "SRV-06", name: "IT SERVICES (CAB-WA)", logo: <FaTools className="text-slate-900"/>,
        short: "Scalable Flask tools for legal service reliability. Centralised management for multi-tenant IT support.",
        images: ["/cab1.png", "/cab2.png"], tag: "Backend",
        stack: "Flask / RESTful API / Python", database: "MySQL / PostgreSQL",
        details: "Led the database optimization and technical support strategy for a legal services environment, improving query performance 3x across existing PostgreSQL systems. Conducted a comprehensive technical evaluation of specialized legal practice management software, specifically analyzing Clio for data migration feasibility and case management alignment. Developed a centralized Flask-based support dashboard to manage IT requests for 500+ staff across multiple legal centers, ensuring role-based access for sensitive data.",
        impact: "Reduced IT resolution times by 40% through streamlined technical support workflows. Provided the analytical foundation for a major database transition to Clio, ensuring future scalability for legal case management. Supported the delivery of free legal advice to 100+ vulnerable community members by maintaining 99.9% uptime for critical internal systems.",
        keyFeatures: ["Database Performance Tuning", "Clio Software Evaluation", "Multi-Tenant Support Systems", "Legal Tech Modernization"]
    }
];
