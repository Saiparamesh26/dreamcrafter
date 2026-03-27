import { Briefcase, ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";

interface Role {
  title: string;
  department: string;
  location: string;
  type: string;
  url: string;
}

const DEPT_COLORS: Record<string, string> = {
  Engineering: "#22D3EE",
  Product: "#A78BFA",
  Design: "#F472B6",
  Research: "#34D399",
  Policy: "#FBBF24",
  Sales: "#FB923C",
};

const CAREERS: Record<string, string> = {
  GitHub: "https://github.com/about/careers",
  Stripe: "https://stripe.com/jobs",
  Notion: "https://www.notion.so/about#careers",
  Linear: "https://linear.app/careers",
  Vercel: "https://vercel.com/careers",
  Figma: "https://www.figma.com/careers/",
  Atlassian: "https://www.atlassian.com/company/careers",
  Slack: "https://slack.com/careers",
  OpenAI: "https://openai.com/careers",
  Anthropic: "https://www.anthropic.com/careers",
  GitLab: "https://about.gitlab.com/jobs/",
  HashiCorp: "https://www.hashicorp.com/careers",
  // India IT Giants
  TCS: "https://www.tcs.com/careers",
  Tata: "https://www.tata.com/careers",
  Infosys: "https://www.infosys.com/careers.html",
  Wipro: "https://careers.wipro.com/",
  HCLTech: "https://www.hcltech.com/careers",
  TechMahindra: "https://careers.techmahindra.com/",
  // India Startups
  Zomato: "https://www.zomato.com/careers",
  Razorpay: "https://razorpay.com/jobs/",
  Freshworks: "https://www.freshworks.com/company/careers/",
  Swiggy: "https://careers.swiggy.com/",
  Paytm: "https://jobs.lever.co/paytm",
  // Global Tech Giants
  Microsoft: "https://careers.microsoft.com/",
  Google: "https://careers.google.com/",
  Apple: "https://jobs.apple.com/",
  Meta: "https://www.metacareers.com/",
  Amazon: "https://amazon.jobs/",
  Netflix: "https://jobs.netflix.com/",
  Spotify: "https://www.lifeatspotify.com/jobs",
  Zoom: "https://careers.zoom.us/",
  Salesforce: "https://careers.salesforce.com/",
  Adobe: "https://careers.adobe.com/",
  Cloudflare: "https://www.cloudflare.com/careers/",
  Datadog: "https://careers.datadoghq.com/",
  Accenture: "https://www.accenture.com/careers",
  AMD: "https://careers.amd.com/",
  Broadcom: "https://www.broadcom.com/company/careers",
  Bosch: "https://www.bosch.com/careers/",
  Cognizant: "https://careers.cognizant.com/",
  Capgemini: "https://www.capgemini.com/careers/",
  Cisco: "https://jobs.cisco.com/",
  "Dell Technologies": "https://jobs.dell.com/",
  Deloitte: "https://careers2.deloitte.com/",
  "Epic Systems": "https://www.epic.com/careers",
  Epson: "https://www.epson.com/cgi-bin/ceStore/jsps/careers",
  Foxconn: "https://careers.foxconn.com/",
  Gigabyte: "https://www.gigabyte.com/about/JobOpportunities",
  HP: "https://jobs.hp.com/",
  IBM: "https://www.ibm.com/employment/",
  Intel: "https://jobs.intel.com/",
  "Juniper Networks": "https://careers.juniper.net/",
  Kaspersky: "https://careers.kaspersky.com/",
  "Kingston Technology": "https://www.kingston.com/company/careers",
  LinkedIn: "https://careers.linkedin.com/",
  Lenovo: "https://jobs.lenovo.com/",
  "Micron Technology": "https://www.micron.com/careers",
  Nvidia: "https://www.nvidia.com/en-us/about-nvidia/careers/",
  Oracle: "https://careers.oracle.com/",
  "ON Semiconductor": "https://www.onsemi.com/careers",
  PayPal: "https://careers.pypl.com/",
  Panasonic: "https://careers.panasonic.com/",
  Qualcomm: "https://www.qualcomm.com/company/careers",
  "Red Hat": "https://www.redhat.com/en/jobs",
  "Raspberry Pi Foundation": "https://www.raspberrypi.org/jobs/",
  SAP: "https://jobs.sap.com/",
  "Samsung Electronics": "https://sec.samsung.com/careers/",
  "Texas Instruments": "https://careers.ti.com/",
  Uber: "https://www.uber.com/us/en/careers/",
  VMware: "https://careers.vmware.com/",
  Virtusa: "https://careers.virtusa.com/",
  ViewSonic: "https://www.viewsonic.com/us/about/career.html",
  "Western Digital": "https://jobs.westerndigital.com/",
  Xilinx: "https://careers.amd.com/careers/xilinx",
  Yahoo: "https://yahooinc.com/careers",
  Yokogawa: "https://www.yokogawa.com/careers/",
  "Zebra Technologies": "https://careers.zebra.com/",
  Zotac: "https://www.zotac.com/us/page/careers",
  "63 Moons Technologies": "https://www.63moons.com/careers",
  "Acko General Insurance": "https://www.acko.com/careers/",
  "Adani Group": "https://careers.adani.com/",
  "Adani Power": "https://careers.adani.com/",
  "Aditya Birla Group": "https://www.adityabirla.com/careers",
  "Alkem Laboratories": "https://www.alkemlabs.com/careers",
  Amul: "https://www.amul.com/m/amul-career.php",
  "Angel One": "https://www.angelone.in/careers",
  "Apollo Hospitals": "https://careers.apollohospitals.com/",
  "Apollo Tyres": "https://www.apollotyres.com/en-in/corporate/careers/",
  "Ashok Leyland": "https://www.ashokleyland.com/careers",
  "Asian Paints": "https://www.asianpaints.com/corporate/careers.html",
  "Axis Bank": "https://www.axisbank.com/careers",
  "Bajaj Auto": "https://www.bajajauto.com/careers",
  "Bank of Baroda": "https://www.bankofbaroda.in/careers",
  "Bank of India": "https://www.bankofindia.co.in/careers",
  "Bharti Airtel": "https://www.airtel.in/careers/",
  Biocon: "https://www.biocon.com/careers/",
  "Blue Star": "https://www.bluestarindia.com/careers",
  "Britannia Industries": "https://www.britannia.co.in/careers",
  "Canara Bank": "https://www.canarabank.com/careers",
  Cipla: "https://www.cipla.com/careers",
  "Coal India": "https://www.coalindia.in/careers",
  "Cochin Shipyard": "https://cochinshipyard.in/careers",
  Cyient: "https://www.cyient.com/careers",
  Dabur: "https://www.dabur.com/about-dabur/careers",
  "Dixon Technologies": "https://www.dixoninfo.com/career.html",
  DLF: "https://www.dlf.in/careers",
  DMart: "https://www.dmartindia.com/careers",
  "Dr. Reddy's Laboratories": "https://www.drreddys.com/careers",
  EaseMyTrip: "https://www.easemytrip.com/careers.html",
  "Eicher Motors": "https://www.royalenfield.com/in/en/careers/",
  Emami: "https://www.emamiltd.in/careers",
  "Exide Industries": "https://www.exideindustries.com/careers",
  "Federal Bank": "https://www.federalbank.co.in/careers",
  Flipkart: "https://www.flipkartcareers.com/",
  "Fortis Healthcare": "https://www.fortishealthcare.com/careers",
  GAIL: "https://www.gail.nic.in/career.html",
  "Godrej Group": "https://careers.godrej.com/",
  Havells: "https://www.havells.com/careers",
  "HDFC Bank": "https://www.hdfcbank.com/htdocs/aboutus/careers",
  "Hero MotoCorp": "https://www.heromotocorp.com/en-in/careers/",
  "Hindalco Industries": "https://www.hindalco.com/careers",
  "Hindustan Aeronautics Limited": "https://hal-india.co.in/careers",
  "Hindustan Petroleum": "https://hindustanpetroleum.com/careers",
  "Hindustan Zinc": "https://www.hzlindia.com/careers",
  "ICICI Bank": "https://www.icicicareers.com/",
  "IDBI Bank": "https://www.idbibank.in/careers-idbi.aspx",
  "IDFC First Bank": "https://www.idfcfirstbank.com/careers",
  "Indian Hotels Company Limited": "https://www.ihcltata.com/careers",
  "Indian Oil Corporation": "https://www.iocl.com/career.aspx",
  "Indian Railways": "https://www.rrcb.gov.in/",
  IndiGo: "https://careers.goindigo.in/",
  "IndusInd Bank": "https://www.indusind.com/in/en/careers.html",
  "ITC Limited": "https://www.itcportal.com/careers/",
  ISRO: "https://www.isro.gov.in/Careers.html",
  Jio: "https://www.jio.com/careers",
  "Jio Platforms": "https://www.jio.com/careers",
  "Jindal Steel and Power": "https://www.jindalsteelpower.com/careers",
  "JSW Steel": "https://careers.jsw.in/",
  "JSW Group": "https://careers.jsw.in/",
  "Jubilant FoodWorks": "https://www.jubilantfoodworks.com/careers",
  "Kotak Mahindra Bank": "https://careers.kotak.com/",
  "KPIT Technologies": "https://www.kpit.com/about/careers/",
  "Larsen & Toubro": "https://www.larsentoubro.com/career/",
  "Life Insurance Corporation": "https://licindia.in/careers",
  "Mahindra & Mahindra": "https://careers.mahindra.com/",
  MakeMyTrip: "https://www.makemytrip.com/career.html",
  Marico: "https://careers.marico.com/",
  "Maruti Suzuki": "https://www.marutisuzuki.com/corporate/careers",
  "Max Healthcare": "https://www.maxhealthcare.in/careers",
  Mphasis: "https://careers.mphasis.com/",
  "Muthoot Finance": "https://www.muthootfinance.com/careers",
  Myntra: "https://careers.myntra.com/",
  "National Payments Corporation of India": "https://www.npci.org.in/careers",
  "NTPC Limited": "https://www.ntpc.co.in/en/careers",
  Nykaa: "https://careers.nykaa.com/",
  "Oil and Natural Gas Corporation": "https://ongcindia.com/careers",
  "Ola Electric": "https://www.olaelectric.com/careers",
  "One97 Communications": "https://jobs.lever.co/paytm",
  "Patanjali Ayurved": "https://www.patanjaliayurved.net/careers",
  "Persistent Systems": "https://www.persistent.com/careers/",
  "Pidilite Industries": "https://www.pidilite.com/careers",
  "Pine Labs": "https://pinelabs.com/careers",
  "Piramal Group": "https://www.piramal.com/careers/",
  "Power Grid Corporation of India": "https://www.powergrid.in/careers",
  "Punjab National Bank": "https://www.pnbindia.in/careers",
  "Raymond Group": "https://www.raymond.in/careers",
  "Reliance Industries": "https://www.ril.com/careers",
  "Reliance Retail": "https://www.relianceretail.com/careers",
  "Royal Enfield": "https://www.royalenfield.com/in/en/careers/",
  "Serum Institute of India": "https://www.seruminstitute.com/career.php",
  "Shree Cement": "https://www.shreecement.com/career",
  "Shriram Group": "https://www.shriramfinance.in/about-us/careers",
  SpiceJet: "https://careers.spicejet.com/",
  "State Bank of India": "https://bank.sbi/web/guest/careers",
  "Steel Authority of India Limited": "https://www.sail.co.in/career",
  "Sun Pharma": "https://www.sunpharma.com/careers",
  Suzlon: "https://www.suzlon.com/careers",
  "Tata Chemicals": "https://www.tatachemicals.com/careers",
  "Tata Communications": "https://www.tatacommunications.com/careers/",
  "Tata Consultancy Services": "https://www.tcs.com/careers",
  "Tata Consumer Products": "https://www.tataconsumer.com/careers",
  "Tata Group": "https://www.tata.com/careers",
  "Tata Motors": "https://www.tatamotors.com/careers/",
  "Tata Power": "https://www.tatapower.com/careers",
  "Tata Steel": "https://www.tatasteel.com/careers/",
  "Tata Technologies": "https://www.tatatechnologies.com/careers/",
  "Tech Mahindra": "https://careers.techmahindra.com/",
  Thermax: "https://www.thermaxglobal.com/careers/",
  "Titan Company": "https://www.titancompany.in/careers",
  "Torrent Group": "https://www.torrentpower.com/careers",
  "TVS Motor Company": "https://www.tvsmotor.com/careers/",
  "UCO Bank": "https://www.ucobank.com/careers",
  "UltraTech Cement": "https://www.ultratechcement.com/about-us/careers",
  "Union Bank of India":
    "https://www.unionbankofindia.co.in/english/careers.aspx",
  "Vedanta Limited": "https://www.vedantalimited.com/careers",
  "Vodafone Idea": "https://www.myvi.in/about-vi/careers",
  Voltas: "https://www.voltas.com/careers",
  "Welspun Corp": "https://www.welspuncorp.com/careers",
  "Yes Bank": "https://www.yesbank.in/about-us/careers",
  "Zee Entertainment Enterprises": "https://www.zee.com/careers",
  "Zee News": "https://zeenews.india.com/india/zee-news-career",
  "Zensar Technologies": "https://www.zensar.com/careers",
  "Zoho Corporation": "https://www.zoho.com/careers.html",
  "Zydus Lifesciences": "https://www.zyduslife.com/careers/",
};

const ROLES: Record<string, Role[]> = {
  OpenAI: [
    {
      title: "Research Scientist, Safety",
      department: "Research",
      location: "San Francisco, CA · Remote",
      type: "Full-time",
      url: "https://openai.com/careers",
    },
    {
      title: "PM, API Platform",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      url: "https://openai.com/careers",
    },
    {
      title: "Policy Analyst",
      department: "Policy",
      location: "Washington, D.C. · Remote",
      type: "Full-time",
      url: "https://openai.com/careers",
    },
    {
      title: "Senior Software Engineer, Infrastructure",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      url: "https://openai.com/careers",
    },
    {
      title: "Data Scientist, Evaluations",
      department: "Research",
      location: "San Francisco, CA · Hybrid",
      type: "Full-time",
      url: "https://openai.com/careers",
    },
    {
      title: "Software Engineer, ML Infra",
      department: "Engineering",
      location: "Bengaluru, India · Remote",
      type: "Full-time",
      url: "https://openai.com/careers",
    },
    {
      title: "Research Analyst",
      department: "Research",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://openai.com/careers",
    },
  ],
  Anthropic: [
    {
      title: "Research Engineer, Claude",
      department: "Research",
      location: "San Francisco, CA",
      type: "Full-time",
      url: "https://www.anthropic.com/careers",
    },
    {
      title: "PM, Enterprise",
      department: "Product",
      location: "San Francisco, CA · Remote",
      type: "Full-time",
      url: "https://www.anthropic.com/careers",
    },
    {
      title: "Policy Lead",
      department: "Policy",
      location: "Washington, D.C.",
      type: "Full-time",
      url: "https://www.anthropic.com/careers",
    },
    {
      title: "Staff Engineer, Safety",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      url: "https://www.anthropic.com/careers",
    },
    {
      title: "Designer, Product",
      department: "Design",
      location: "San Francisco, CA · Hybrid",
      type: "Full-time",
      url: "https://www.anthropic.com/careers",
    },
    {
      title: "Software Engineer, Safety",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.anthropic.com/careers",
    },
    {
      title: "Data Scientist",
      department: "Research",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.anthropic.com/careers",
    },
  ],
  GitHub: [
    {
      title: "Staff Engineer, Copilot",
      department: "Engineering",
      location: "Remote · Global",
      type: "Full-time",
      url: "https://github.com/about/careers",
    },
    {
      title: "PM, Actions",
      department: "Product",
      location: "San Francisco, CA · Remote",
      type: "Full-time",
      url: "https://github.com/about/careers",
    },
    {
      title: "Security Engineer",
      department: "Engineering",
      location: "Remote · Americas",
      type: "Full-time",
      url: "https://github.com/about/careers",
    },
    {
      title: "DevEx Designer",
      department: "Design",
      location: "San Francisco, CA · Remote",
      type: "Full-time",
      url: "https://github.com/about/careers",
    },
    {
      title: "Enterprise Sales Lead",
      department: "Sales",
      location: "New York, NY",
      type: "Full-time",
      url: "https://github.com/about/careers",
    },
    {
      title: "Senior Engineer, Copilot",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://github.com/about/careers",
    },
    {
      title: "Solutions Engineer",
      department: "Sales",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://github.com/about/careers",
    },
  ],
  Stripe: [
    {
      title: "Software Engineer, Payments",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      url: "https://stripe.com/jobs",
    },
    {
      title: "PM, Financial Infrastructure",
      department: "Product",
      location: "San Francisco, CA · Remote",
      type: "Full-time",
      url: "https://stripe.com/jobs",
    },
    {
      title: "Enterprise Account Executive",
      department: "Sales",
      location: "New York, NY",
      type: "Full-time",
      url: "https://stripe.com/jobs",
    },
    {
      title: "Data Engineer",
      department: "Engineering",
      location: "Dublin, Ireland · Remote",
      type: "Full-time",
      url: "https://stripe.com/jobs",
    },
    {
      title: "Software Engineer, Payments",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://stripe.com/jobs",
    },
    {
      title: "Risk Analyst",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://stripe.com/jobs",
    },
  ],
  Figma: [
    {
      title: "Staff Engineer, Dev Mode",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      url: "https://www.figma.com/careers/",
    },
    {
      title: "PM, AI Features",
      department: "Product",
      location: "San Francisco, CA · Hybrid",
      type: "Full-time",
      url: "https://www.figma.com/careers/",
    },
    {
      title: "Senior Brand Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Full-time",
      url: "https://www.figma.com/careers/",
    },
    {
      title: "Enterprise Sales",
      department: "Sales",
      location: "New York, NY · Remote",
      type: "Full-time",
      url: "https://www.figma.com/careers/",
    },
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India · Hybrid",
      type: "Full-time",
      url: "https://www.figma.com/careers/",
    },
  ],
  Notion: [
    {
      title: "Software Engineer, AI",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      url: "https://www.notion.so/about#careers",
    },
    {
      title: "PM, Collaboration",
      department: "Product",
      location: "San Francisco, CA · Hybrid",
      type: "Full-time",
      url: "https://www.notion.so/about#careers",
    },
    {
      title: "Designer, Growth",
      department: "Design",
      location: "San Francisco, CA · Remote",
      type: "Full-time",
      url: "https://www.notion.so/about#careers",
    },
    {
      title: "Enterprise CSM",
      department: "Sales",
      location: "New York, NY",
      type: "Full-time",
      url: "https://www.notion.so/about#careers",
    },
    {
      title: "Software Engineer, Platform",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.notion.so/about#careers",
    },
  ],
  Linear: [
    {
      title: "Senior Engineer",
      department: "Engineering",
      location: "Remote · Global",
      type: "Full-time",
      url: "https://linear.app/careers",
    },
    {
      title: "Designer",
      department: "Design",
      location: "Remote · Global",
      type: "Full-time",
      url: "https://linear.app/careers",
    },
    {
      title: "Customer Success",
      department: "Sales",
      location: "San Francisco, CA · Remote",
      type: "Full-time",
      url: "https://linear.app/careers",
    },
    {
      title: "Senior Engineer",
      department: "Engineering",
      location: "Bengaluru, India · Remote",
      type: "Full-time",
      url: "https://linear.app/careers",
    },
  ],
  Slack: [
    {
      title: "Engineer, Slack AI",
      department: "Engineering",
      location: "San Francisco, CA · Remote",
      type: "Full-time",
      url: "https://slack.com/careers",
    },
    {
      title: "PM, Workflows",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      url: "https://slack.com/careers",
    },
    {
      title: "Enterprise AE",
      department: "Sales",
      location: "New York, NY · Remote",
      type: "Full-time",
      url: "https://slack.com/careers",
    },
    {
      title: "Engineer, Platform",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://slack.com/careers",
    },
  ],
  Atlassian: [
    {
      title: "Software Engineer, Jira",
      department: "Engineering",
      location: "Sydney, Australia · Remote",
      type: "Full-time",
      url: "https://www.atlassian.com/company/careers",
    },
    {
      title: "PM, Confluence AI",
      department: "Product",
      location: "Remote · APAC",
      type: "Full-time",
      url: "https://www.atlassian.com/company/careers",
    },
    {
      title: "Designer, Loom",
      department: "Design",
      location: "San Francisco, CA · Remote",
      type: "Full-time",
      url: "https://www.atlassian.com/company/careers",
    },
    {
      title: "Enterprise Sales",
      department: "Sales",
      location: "New York, NY",
      type: "Full-time",
      url: "https://www.atlassian.com/company/careers",
    },
    {
      title: "Software Engineer, Jira",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.atlassian.com/company/careers",
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.atlassian.com/company/careers",
    },
  ],
  GitLab: [
    {
      title: "Engineer, GitLab Duo",
      department: "Engineering",
      location: "Remote · Global",
      type: "Full-time",
      url: "https://about.gitlab.com/jobs/",
    },
    {
      title: "PM, DevSecOps",
      department: "Product",
      location: "Remote · Americas",
      type: "Full-time",
      url: "https://about.gitlab.com/jobs/",
    },
    {
      title: "Security Engineer",
      department: "Engineering",
      location: "Remote · Global",
      type: "Full-time",
      url: "https://about.gitlab.com/jobs/",
    },
    {
      title: "Backend Engineer",
      department: "Engineering",
      location: "Bengaluru, India · Remote",
      type: "Full-time",
      url: "https://about.gitlab.com/jobs/",
    },
  ],
  Vercel: [
    {
      title: "Engineer, Edge Network",
      department: "Engineering",
      location: "Remote · Global",
      type: "Full-time",
      url: "https://vercel.com/careers",
    },
    {
      title: "PM, AI SDK",
      department: "Product",
      location: "San Francisco, CA · Remote",
      type: "Full-time",
      url: "https://vercel.com/careers",
    },
    {
      title: "Developer Advocate",
      department: "Engineering",
      location: "Remote · Global",
      type: "Full-time",
      url: "https://vercel.com/careers",
    },
    {
      title: "Engineer, Frontend",
      department: "Engineering",
      location: "Bengaluru, India · Remote",
      type: "Full-time",
      url: "https://vercel.com/careers",
    },
  ],
  HashiCorp: [
    {
      title: "Engineer, Terraform",
      department: "Engineering",
      location: "Remote · Americas",
      type: "Full-time",
      url: "https://www.hashicorp.com/careers",
    },
    {
      title: "PM, Vault",
      department: "Product",
      location: "San Francisco, CA · Remote",
      type: "Full-time",
      url: "https://www.hashicorp.com/careers",
    },
    {
      title: "Solutions Architect",
      department: "Sales",
      location: "Remote · Americas",
      type: "Full-time",
      url: "https://www.hashicorp.com/careers",
    },
    {
      title: "Engineer, Consul",
      department: "Engineering",
      location: "Pune, India · Remote",
      type: "Full-time",
      url: "https://www.hashicorp.com/careers",
    },
  ],
  // ─── India IT Giants ───────────────────────────────────────────────────────
  TCS: [
    {
      title: "Java Developer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.tcs.com/careers",
    },
    {
      title: "SAP Consultant",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.tcs.com/careers",
    },
    {
      title: "Data Engineer",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://www.tcs.com/careers",
    },
    {
      title: "Cloud Architect",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.tcs.com/careers",
    },
    {
      title: "Business Analyst",
      department: "Product",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.tcs.com/careers",
    },
    {
      title: "AI/ML Engineer",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.tcs.com/careers",
    },
    {
      title: "Senior Consultant",
      department: "Sales",
      location: "New York, NY · Remote",
      type: "Full-time",
      url: "https://www.tcs.com/careers",
    },
  ],
  Tata: [
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.tata.com/careers",
    },
    {
      title: "Digital Strategy Analyst",
      department: "Product",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.tata.com/careers",
    },
    {
      title: "Business Development Manager",
      department: "Sales",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.tata.com/careers",
    },
    {
      title: "Data Scientist",
      department: "Research",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.tata.com/careers",
    },
    {
      title: "Cloud Solutions Architect",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://www.tata.com/careers",
    },
  ],
  Infosys: [
    {
      title: "Technology Analyst",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.infosys.com/careers.html",
    },
    {
      title: "System Engineer",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.infosys.com/careers.html",
    },
    {
      title: "Senior Associate",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://www.infosys.com/careers.html",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.infosys.com/careers.html",
    },
    {
      title: "Data Scientist",
      department: "Research",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.infosys.com/careers.html",
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Mysuru, India",
      type: "Full-time",
      url: "https://www.infosys.com/careers.html",
    },
    {
      title: "Client Partner",
      department: "Sales",
      location: "New York, NY",
      type: "Full-time",
      url: "https://www.infosys.com/careers.html",
    },
  ],
  Wipro: [
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.wipro.com/",
    },
    {
      title: "SAP S/4HANA Consultant",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://careers.wipro.com/",
    },
    {
      title: "Cloud Engineer (Azure)",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://careers.wipro.com/",
    },
    {
      title: "Business Analyst",
      department: "Product",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://careers.wipro.com/",
    },
    {
      title: "AI/ML Specialist",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.wipro.com/",
    },
    {
      title: "Account Manager",
      department: "Sales",
      location: "London, UK · Remote",
      type: "Full-time",
      url: "https://careers.wipro.com/",
    },
  ],
  HCLTech: [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Noida, India",
      type: "Full-time",
      url: "https://www.hcltech.com/careers",
    },
    {
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.hcltech.com/careers",
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.hcltech.com/careers",
    },
    {
      title: "Cloud Architect",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.hcltech.com/careers",
    },
    {
      title: "Data Analyst",
      department: "Research",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://www.hcltech.com/careers",
    },
    {
      title: "Business Development",
      department: "Sales",
      location: "San Jose, CA · Remote",
      type: "Full-time",
      url: "https://www.hcltech.com/careers",
    },
  ],
  TechMahindra: [
    {
      title: "Software Developer",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://careers.techmahindra.com/",
    },
    {
      title: "Network Engineer",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://careers.techmahindra.com/",
    },
    {
      title: "AI Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.techmahindra.com/",
    },
    {
      title: "Product Analyst",
      department: "Product",
      location: "Noida, India",
      type: "Full-time",
      url: "https://careers.techmahindra.com/",
    },
    {
      title: "Data Scientist",
      department: "Research",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://careers.techmahindra.com/",
    },
  ],
  // ─── India Startups / Growth ──────────────────────────────────────────────
  Zomato: [
    {
      title: "Software Engineer, Platform",
      department: "Engineering",
      location: "Gurugram, India",
      type: "Full-time",
      url: "https://www.zomato.com/careers",
    },
    {
      title: "ML Engineer",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.zomato.com/careers",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Gurugram, India",
      type: "Full-time",
      url: "https://www.zomato.com/careers",
    },
    {
      title: "Backend Engineer",
      department: "Engineering",
      location: "Gurugram, India",
      type: "Full-time",
      url: "https://www.zomato.com/careers",
    },
    {
      title: "Growth Manager",
      department: "Sales",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.zomato.com/careers",
    },
  ],
  Razorpay: [
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://razorpay.com/jobs/",
    },
    {
      title: "Backend Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://razorpay.com/jobs/",
    },
    {
      title: "PM, Payments",
      department: "Product",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://razorpay.com/jobs/",
    },
    {
      title: "Data Scientist",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://razorpay.com/jobs/",
    },
    {
      title: "Enterprise Sales",
      department: "Sales",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://razorpay.com/jobs/",
    },
  ],
  Freshworks: [
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.freshworks.com/company/careers/",
    },
    {
      title: "ML Engineer",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.freshworks.com/company/careers/",
    },
    {
      title: "PM, CRM",
      department: "Product",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.freshworks.com/company/careers/",
    },
    {
      title: "Frontend Engineer",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.freshworks.com/company/careers/",
    },
    {
      title: "Account Executive",
      department: "Sales",
      location: "San Mateo, CA",
      type: "Full-time",
      url: "https://www.freshworks.com/company/careers/",
    },
  ],
  Swiggy: [
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.swiggy.com/",
    },
    {
      title: "Data Scientist",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.swiggy.com/",
    },
    {
      title: "PM, Instamart",
      department: "Product",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.swiggy.com/",
    },
    {
      title: "Backend Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.swiggy.com/",
    },
    {
      title: "Operations Manager",
      department: "Sales",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.swiggy.com/",
    },
  ],
  Paytm: [
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Noida, India",
      type: "Full-time",
      url: "https://jobs.lever.co/paytm",
    },
    {
      title: "ML Engineer",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://jobs.lever.co/paytm",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Noida, India",
      type: "Full-time",
      url: "https://jobs.lever.co/paytm",
    },
    {
      title: "Android Developer",
      department: "Engineering",
      location: "Noida, India",
      type: "Full-time",
      url: "https://jobs.lever.co/paytm",
    },
  ],
  // ─── Global Tech Giants ───────────────────────────────────────────────────
  Microsoft: [
    {
      title: "Software Engineer II",
      department: "Engineering",
      location: "Redmond, WA",
      type: "Full-time",
      url: "https://careers.microsoft.com/",
    },
    {
      title: "PM, Azure AI",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      url: "https://careers.microsoft.com/",
    },
    {
      title: "Senior Engineer, Copilot",
      department: "Engineering",
      location: "Remote · Americas",
      type: "Full-time",
      url: "https://careers.microsoft.com/",
    },
    {
      title: "Software Engineer, Azure",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://careers.microsoft.com/",
    },
    {
      title: "Cloud Solution Architect",
      department: "Sales",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.microsoft.com/",
    },
    {
      title: "Research Scientist",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.microsoft.com/",
    },
  ],
  Google: [
    {
      title: "Software Engineer, L4",
      department: "Engineering",
      location: "Mountain View, CA",
      type: "Full-time",
      url: "https://careers.google.com/",
    },
    {
      title: "PM, Search",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      url: "https://careers.google.com/",
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Full-time",
      url: "https://careers.google.com/",
    },
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://careers.google.com/",
    },
    {
      title: "Research Scientist, AI",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.google.com/",
    },
    {
      title: "Account Executive",
      department: "Sales",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.google.com/",
    },
  ],
  Apple: [
    {
      title: "iOS Engineer",
      department: "Engineering",
      location: "Cupertino, CA",
      type: "Full-time",
      url: "https://jobs.apple.com/",
    },
    {
      title: "ML Engineer, Siri",
      department: "Research",
      location: "Seattle, WA",
      type: "Full-time",
      url: "https://jobs.apple.com/",
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Cupertino, CA",
      type: "Full-time",
      url: "https://jobs.apple.com/",
    },
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://jobs.apple.com/",
    },
    {
      title: "Site Reliability Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://jobs.apple.com/",
    },
  ],
  Meta: [
    {
      title: "Software Engineer, AI",
      department: "Engineering",
      location: "Menlo Park, CA",
      type: "Full-time",
      url: "https://www.metacareers.com/",
    },
    {
      title: "PM, Reality Labs",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      url: "https://www.metacareers.com/",
    },
    {
      title: "Research Scientist, Llama",
      department: "Research",
      location: "New York, NY",
      type: "Full-time",
      url: "https://www.metacareers.com/",
    },
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.metacareers.com/",
    },
    {
      title: "Data Scientist",
      department: "Research",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://www.metacareers.com/",
    },
  ],
  Amazon: [
    {
      title: "Software Dev Engineer II",
      department: "Engineering",
      location: "Seattle, WA",
      type: "Full-time",
      url: "https://amazon.jobs/",
    },
    {
      title: "PM, AWS",
      department: "Product",
      location: "Seattle, WA",
      type: "Full-time",
      url: "https://amazon.jobs/",
    },
    {
      title: "SDE, Alexa AI",
      department: "Engineering",
      location: "Remote · Americas",
      type: "Full-time",
      url: "https://amazon.jobs/",
    },
    {
      title: "Software Dev Engineer",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://amazon.jobs/",
    },
    {
      title: "Applied Scientist",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://amazon.jobs/",
    },
    {
      title: "Business Analyst",
      department: "Product",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://amazon.jobs/",
    },
  ],
  Netflix: [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Los Gatos, CA",
      type: "Full-time",
      url: "https://jobs.netflix.com/",
    },
    {
      title: "PM, Streaming Infra",
      department: "Product",
      location: "Los Angeles, CA",
      type: "Full-time",
      url: "https://jobs.netflix.com/",
    },
    {
      title: "Data Scientist",
      department: "Research",
      location: "Los Gatos, CA · Remote",
      type: "Full-time",
      url: "https://jobs.netflix.com/",
    },
    {
      title: "Software Engineer, CDN",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://jobs.netflix.com/",
    },
  ],
  Spotify: [
    {
      title: "Backend Engineer",
      department: "Engineering",
      location: "Stockholm, Sweden · Remote",
      type: "Full-time",
      url: "https://www.lifeatspotify.com/jobs",
    },
    {
      title: "PM, Discovery",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      url: "https://www.lifeatspotify.com/jobs",
    },
    {
      title: "ML Engineer",
      department: "Research",
      location: "Remote · Global",
      type: "Full-time",
      url: "https://www.lifeatspotify.com/jobs",
    },
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India · Remote",
      type: "Full-time",
      url: "https://www.lifeatspotify.com/jobs",
    },
  ],
  Zoom: [
    {
      title: "Software Engineer, AI Companion",
      department: "Engineering",
      location: "San Jose, CA · Remote",
      type: "Full-time",
      url: "https://careers.zoom.us/",
    },
    {
      title: "PM, Phone",
      department: "Product",
      location: "San Jose, CA",
      type: "Full-time",
      url: "https://careers.zoom.us/",
    },
    {
      title: "Solutions Engineer",
      department: "Sales",
      location: "Remote · APAC",
      type: "Full-time",
      url: "https://careers.zoom.us/",
    },
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.zoom.us/",
    },
  ],
  Salesforce: [
    {
      title: "Senior Engineer, Agentforce",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      url: "https://careers.salesforce.com/",
    },
    {
      title: "PM, Slack",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      url: "https://careers.salesforce.com/",
    },
    {
      title: "Enterprise AE",
      department: "Sales",
      location: "New York, NY",
      type: "Full-time",
      url: "https://careers.salesforce.com/",
    },
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://careers.salesforce.com/",
    },
    {
      title: "Solution Architect",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.salesforce.com/",
    },
  ],
  Adobe: [
    {
      title: "Senior Engineer, Firefly",
      department: "Engineering",
      location: "San Jose, CA",
      type: "Full-time",
      url: "https://careers.adobe.com/",
    },
    {
      title: "PM, Creative Cloud",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      url: "https://careers.adobe.com/",
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Seattle, WA",
      type: "Full-time",
      url: "https://careers.adobe.com/",
    },
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.adobe.com/",
    },
    {
      title: "ML Engineer, Firefly",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.adobe.com/",
    },
  ],
  Cloudflare: [
    {
      title: "Systems Engineer, Network",
      department: "Engineering",
      location: "San Francisco, CA · Remote",
      type: "Full-time",
      url: "https://www.cloudflare.com/careers/",
    },
    {
      title: "PM, Zero Trust",
      department: "Product",
      location: "Remote · Global",
      type: "Full-time",
      url: "https://www.cloudflare.com/careers/",
    },
    {
      title: "Solutions Engineer",
      department: "Sales",
      location: "Remote · APAC",
      type: "Full-time",
      url: "https://www.cloudflare.com/careers/",
    },
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India · Remote",
      type: "Full-time",
      url: "https://www.cloudflare.com/careers/",
    },
  ],
  Datadog: [
    {
      title: "Engineer, APM",
      department: "Engineering",
      location: "New York, NY",
      type: "Full-time",
      url: "https://careers.datadoghq.com/",
    },
    {
      title: "PM, Observability",
      department: "Product",
      location: "New York, NY · Remote",
      type: "Full-time",
      url: "https://careers.datadoghq.com/",
    },
    {
      title: "Solutions Engineer",
      department: "Sales",
      location: "Remote · APAC",
      type: "Full-time",
      url: "https://careers.datadoghq.com/",
    },
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India · Remote",
      type: "Full-time",
      url: "https://careers.datadoghq.com/",
    },
  ],
  Accenture: [
    {
      title: "Technology Analyst",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.accenture.com/careers",
    },
    {
      title: "Management Consultant",
      department: "Consulting",
      location: "New York, NY",
      type: "Full-time",
      url: "https://www.accenture.com/careers",
    },
    {
      title: "Cloud Engineer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.accenture.com/careers",
    },
  ],
  AMD: [
    {
      title: "CPU Design Engineer",
      department: "Engineering",
      location: "Santa Clara, CA",
      type: "Full-time",
      url: "https://careers.amd.com/",
    },
    {
      title: "GPU Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.amd.com/",
    },
    {
      title: "Product Manager, Radeon",
      department: "Product",
      location: "Santa Clara, CA",
      type: "Full-time",
      url: "https://careers.amd.com/",
    },
  ],
  Broadcom: [
    {
      title: "ASIC Design Engineer",
      department: "Engineering",
      location: "San Jose, CA",
      type: "Full-time",
      url: "https://www.broadcom.com/company/careers",
    },
    {
      title: "Software Engineer, Networking",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.broadcom.com/company/careers",
    },
    {
      title: "Product Manager, Storage",
      department: "Product",
      location: "San Jose, CA",
      type: "Full-time",
      url: "https://www.broadcom.com/company/careers",
    },
  ],
  Bosch: [
    {
      title: "Embedded Systems Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.bosch.com/careers/",
    },
    {
      title: "Automotive Software Developer",
      department: "Engineering",
      location: "Gerlingen, Germany",
      type: "Full-time",
      url: "https://www.bosch.com/careers/",
    },
    {
      title: "Data Scientist, IoT",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.bosch.com/careers/",
    },
  ],
  Cognizant: [
    {
      title: "Java Developer",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://careers.cognizant.com/",
    },
    {
      title: "Business Analyst",
      department: "Product",
      location: "Pune, India",
      type: "Full-time",
      url: "https://careers.cognizant.com/",
    },
    {
      title: "Cloud Architect",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://careers.cognizant.com/",
    },
  ],
  Capgemini: [
    {
      title: "SAP Consultant",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.capgemini.com/careers/",
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.capgemini.com/careers/",
    },
    {
      title: "Project Manager",
      department: "Product",
      location: "Paris, France",
      type: "Full-time",
      url: "https://www.capgemini.com/careers/",
    },
  ],
  Cisco: [
    {
      title: "Network Software Engineer",
      department: "Engineering",
      location: "San Jose, CA",
      type: "Full-time",
      url: "https://jobs.cisco.com/",
    },
    {
      title: "Cybersecurity Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://jobs.cisco.com/",
    },
    {
      title: "Product Manager, Webex",
      department: "Product",
      location: "San Jose, CA",
      type: "Full-time",
      url: "https://jobs.cisco.com/",
    },
  ],
  "Dell Technologies": [
    {
      title: "Software Engineer, Cloud",
      department: "Engineering",
      location: "Austin, TX",
      type: "Full-time",
      url: "https://jobs.dell.com/",
    },
    {
      title: "Storage Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://jobs.dell.com/",
    },
    {
      title: "Product Manager, Servers",
      department: "Product",
      location: "Austin, TX",
      type: "Full-time",
      url: "https://jobs.dell.com/",
    },
  ],
  Deloitte: [
    {
      title: "Technology Consultant",
      department: "Consulting",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://careers2.deloitte.com/",
    },
    {
      title: "Audit Associate",
      department: "Finance",
      location: "New York, NY",
      type: "Full-time",
      url: "https://careers2.deloitte.com/",
    },
    {
      title: "AI Strategy Analyst",
      department: "Product",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers2.deloitte.com/",
    },
  ],
  "Epic Systems": [
    {
      title: "Technical Project Manager",
      department: "Product",
      location: "Verona, WI",
      type: "Full-time",
      url: "https://www.epic.com/careers",
    },
    {
      title: "Software Developer",
      department: "Engineering",
      location: "Verona, WI",
      type: "Full-time",
      url: "https://www.epic.com/careers",
    },
    {
      title: "Implementation Consultant",
      department: "Consulting",
      location: "Remote · US",
      type: "Full-time",
      url: "https://www.epic.com/careers",
    },
  ],
  Epson: [
    {
      title: "Embedded Software Engineer",
      department: "Engineering",
      location: "Suwa, Japan",
      type: "Full-time",
      url: "https://www.epson.com/cgi-bin/ceStore/jsps/careers",
    },
    {
      title: "Product Manager, Printers",
      department: "Product",
      location: "Los Alamitos, CA",
      type: "Full-time",
      url: "https://www.epson.com/cgi-bin/ceStore/jsps/careers",
    },
  ],
  Foxconn: [
    {
      title: "Manufacturing Engineer",
      department: "Engineering",
      location: "Shenzhen, China",
      type: "Full-time",
      url: "https://careers.foxconn.com/",
    },
    {
      title: "EV Systems Engineer",
      department: "Engineering",
      location: "Taiwan",
      type: "Full-time",
      url: "https://careers.foxconn.com/",
    },
  ],
  Gigabyte: [
    {
      title: "Hardware Engineer, Motherboards",
      department: "Engineering",
      location: "Zhonghe, Taiwan",
      type: "Full-time",
      url: "https://www.gigabyte.com/about/JobOpportunities",
    },
    {
      title: "BIOS/Firmware Engineer",
      department: "Engineering",
      location: "Zhonghe, Taiwan",
      type: "Full-time",
      url: "https://www.gigabyte.com/about/JobOpportunities",
    },
  ],
  HP: [
    {
      title: "Software Engineer, Print",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://jobs.hp.com/",
    },
    {
      title: "Product Manager, PC",
      department: "Product",
      location: "Palo Alto, CA",
      type: "Full-time",
      url: "https://jobs.hp.com/",
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://jobs.hp.com/",
    },
  ],
  IBM: [
    {
      title: "Cloud Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.ibm.com/employment/",
    },
    {
      title: "AI Research Scientist",
      department: "Research",
      location: "New York, NY",
      type: "Full-time",
      url: "https://www.ibm.com/employment/",
    },
    {
      title: "Mainframe Engineer",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://www.ibm.com/employment/",
    },
  ],
  Intel: [
    {
      title: "CPU Architect",
      department: "Engineering",
      location: "Santa Clara, CA",
      type: "Full-time",
      url: "https://jobs.intel.com/",
    },
    {
      title: "Process Technology Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://jobs.intel.com/",
    },
    {
      title: "AI Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://jobs.intel.com/",
    },
  ],
  "Juniper Networks": [
    {
      title: "Network Engineer",
      department: "Engineering",
      location: "Sunnyvale, CA",
      type: "Full-time",
      url: "https://careers.juniper.net/",
    },
    {
      title: "Software Engineer, Junos OS",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.juniper.net/",
    },
  ],
  Kaspersky: [
    {
      title: "Malware Analyst",
      department: "Research",
      location: "Moscow, Russia",
      type: "Full-time",
      url: "https://careers.kaspersky.com/",
    },
    {
      title: "Security Researcher",
      department: "Research",
      location: "Remote",
      type: "Full-time",
      url: "https://careers.kaspersky.com/",
    },
  ],
  "Kingston Technology": [
    {
      title: "Memory Design Engineer",
      department: "Engineering",
      location: "Fountain Valley, CA",
      type: "Full-time",
      url: "https://www.kingston.com/company/careers",
    },
    {
      title: "Product Manager, SSDs",
      department: "Product",
      location: "Fountain Valley, CA",
      type: "Full-time",
      url: "https://www.kingston.com/company/careers",
    },
  ],
  LinkedIn: [
    {
      title: "Software Engineer, Feed",
      department: "Engineering",
      location: "Sunnyvale, CA",
      type: "Full-time",
      url: "https://careers.linkedin.com/",
    },
    {
      title: "Product Manager, Recruiter",
      department: "Product",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.linkedin.com/",
    },
    {
      title: "Data Scientist",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.linkedin.com/",
    },
  ],
  Lenovo: [
    {
      title: "PC Product Engineer",
      department: "Engineering",
      location: "Beijing, China",
      type: "Full-time",
      url: "https://jobs.lenovo.com/",
    },
    {
      title: "Software Engineer, Solutions",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://jobs.lenovo.com/",
    },
    {
      title: "Product Manager, ThinkPad",
      department: "Product",
      location: "Hong Kong",
      type: "Full-time",
      url: "https://jobs.lenovo.com/",
    },
  ],
  "Micron Technology": [
    {
      title: "DRAM Design Engineer",
      department: "Engineering",
      location: "Boise, ID",
      type: "Full-time",
      url: "https://www.micron.com/careers",
    },
    {
      title: "AI Infrastructure Engineer",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://www.micron.com/careers",
    },
    {
      title: "Product Manager, NAND",
      department: "Product",
      location: "Boise, ID",
      type: "Full-time",
      url: "https://www.micron.com/careers",
    },
  ],
  Nvidia: [
    {
      title: "GPU Architect",
      department: "Engineering",
      location: "Santa Clara, CA",
      type: "Full-time",
      url: "https://www.nvidia.com/en-us/about-nvidia/careers/",
    },
    {
      title: "AI/ML Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.nvidia.com/en-us/about-nvidia/careers/",
    },
    {
      title: "CUDA Software Engineer",
      department: "Engineering",
      location: "Santa Clara, CA",
      type: "Full-time",
      url: "https://www.nvidia.com/en-us/about-nvidia/careers/",
    },
  ],
  Oracle: [
    {
      title: "Java Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.oracle.com/",
    },
    {
      title: "Cloud Architect, OCI",
      department: "Engineering",
      location: "Austin, TX",
      type: "Full-time",
      url: "https://careers.oracle.com/",
    },
    {
      title: "Product Manager, Database",
      department: "Product",
      location: "Redwood City, CA",
      type: "Full-time",
      url: "https://careers.oracle.com/",
    },
  ],
  "ON Semiconductor": [
    {
      title: "Power IC Design Engineer",
      department: "Engineering",
      location: "Scottsdale, AZ",
      type: "Full-time",
      url: "https://www.onsemi.com/careers",
    },
    {
      title: "SiC Applications Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.onsemi.com/careers",
    },
  ],
  PayPal: [
    {
      title: "Software Engineer, Payments",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://careers.pypl.com/",
    },
    {
      title: "Product Manager, Checkout",
      department: "Product",
      location: "San Jose, CA",
      type: "Full-time",
      url: "https://careers.pypl.com/",
    },
    {
      title: "Risk Analyst",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://careers.pypl.com/",
    },
  ],
  Panasonic: [
    {
      title: "Battery Engineer, EV",
      department: "Engineering",
      location: "Osaka, Japan",
      type: "Full-time",
      url: "https://careers.panasonic.com/",
    },
    {
      title: "IoT Software Developer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.panasonic.com/",
    },
  ],
  Qualcomm: [
    {
      title: "5G Modem Engineer",
      department: "Engineering",
      location: "San Diego, CA",
      type: "Full-time",
      url: "https://www.qualcomm.com/company/careers",
    },
    {
      title: "AI Software Engineer",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://www.qualcomm.com/company/careers",
    },
    {
      title: "Product Manager, Snapdragon",
      department: "Product",
      location: "San Diego, CA",
      type: "Full-time",
      url: "https://www.qualcomm.com/company/careers",
    },
  ],
  "Red Hat": [
    {
      title: "Software Engineer, OpenShift",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.redhat.com/en/jobs",
    },
    {
      title: "Solutions Architect",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.redhat.com/en/jobs",
    },
    {
      title: "Technical Writer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      url: "https://www.redhat.com/en/jobs",
    },
  ],
  "Raspberry Pi Foundation": [
    {
      title: "Embedded Linux Engineer",
      department: "Engineering",
      location: "Cambridge, UK",
      type: "Full-time",
      url: "https://www.raspberrypi.org/jobs/",
    },
    {
      title: "Education Specialist",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      url: "https://www.raspberrypi.org/jobs/",
    },
  ],
  SAP: [
    {
      title: "ABAP Developer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://jobs.sap.com/",
    },
    {
      title: "S/4HANA Consultant",
      department: "Consulting",
      location: "Pune, India",
      type: "Full-time",
      url: "https://jobs.sap.com/",
    },
    {
      title: "Product Manager, S/4HANA",
      department: "Product",
      location: "Walldorf, Germany",
      type: "Full-time",
      url: "https://jobs.sap.com/",
    },
  ],
  "Samsung Electronics": [
    {
      title: "AI Research Scientist",
      department: "Research",
      location: "Suwon, South Korea",
      type: "Full-time",
      url: "https://sec.samsung.com/careers/",
    },
    {
      title: "Semiconductor Process Engineer",
      department: "Engineering",
      location: "Noida, India",
      type: "Full-time",
      url: "https://sec.samsung.com/careers/",
    },
    {
      title: "Mobile UX Designer",
      department: "Design",
      location: "Suwon, South Korea",
      type: "Full-time",
      url: "https://sec.samsung.com/careers/",
    },
  ],
  "Texas Instruments": [
    {
      title: "Analog Design Engineer",
      department: "Engineering",
      location: "Dallas, TX",
      type: "Full-time",
      url: "https://careers.ti.com/",
    },
    {
      title: "Embedded Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.ti.com/",
    },
  ],
  Uber: [
    {
      title: "Backend Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.uber.com/us/en/careers/",
    },
    {
      title: "Product Manager, Maps",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      url: "https://www.uber.com/us/en/careers/",
    },
    {
      title: "Data Scientist",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.uber.com/us/en/careers/",
    },
  ],
  VMware: [
    {
      title: "vSphere Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.vmware.com/",
    },
    {
      title: "Cloud Architect",
      department: "Engineering",
      location: "Palo Alto, CA",
      type: "Full-time",
      url: "https://careers.vmware.com/",
    },
  ],
  Virtusa: [
    {
      title: "Java Architect",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://careers.virtusa.com/",
    },
    {
      title: "Business Analyst, Banking",
      department: "Product",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.virtusa.com/",
    },
  ],
  ViewSonic: [
    {
      title: "Display Firmware Engineer",
      department: "Engineering",
      location: "Brea, CA",
      type: "Full-time",
      url: "https://www.viewsonic.com/us/about/career.html",
    },
    {
      title: "Product Manager, Monitors",
      department: "Product",
      location: "Brea, CA",
      type: "Full-time",
      url: "https://www.viewsonic.com/us/about/career.html",
    },
  ],
  "Western Digital": [
    {
      title: "Storage Firmware Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://jobs.westerndigital.com/",
    },
    {
      title: "Flash Memory Engineer",
      department: "Engineering",
      location: "San Jose, CA",
      type: "Full-time",
      url: "https://jobs.westerndigital.com/",
    },
  ],
  Xilinx: [
    {
      title: "FPGA Design Engineer",
      department: "Engineering",
      location: "San Jose, CA",
      type: "Full-time",
      url: "https://careers.amd.com/careers/xilinx",
    },
    {
      title: "RTL Verification Engineer",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://careers.amd.com/careers/xilinx",
    },
  ],
  Yahoo: [
    {
      title: "Backend Software Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://yahooinc.com/careers",
    },
    {
      title: "Product Manager, Finance",
      department: "Product",
      location: "Sunnyvale, CA",
      type: "Full-time",
      url: "https://yahooinc.com/careers",
    },
  ],
  Yokogawa: [
    {
      title: "Control Systems Engineer",
      department: "Engineering",
      location: "Tokyo, Japan",
      type: "Full-time",
      url: "https://www.yokogawa.com/careers/",
    },
    {
      title: "Field Instrumentation Specialist",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.yokogawa.com/careers/",
    },
  ],
  "Zebra Technologies": [
    {
      title: "Android Software Engineer",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://careers.zebra.com/",
    },
    {
      title: "Product Manager, RFID",
      department: "Product",
      location: "Lincolnshire, IL",
      type: "Full-time",
      url: "https://careers.zebra.com/",
    },
  ],
  Zotac: [
    {
      title: "Hardware Engineer, Mini PC",
      department: "Engineering",
      location: "Zhongshan, China",
      type: "Full-time",
      url: "https://www.zotac.com/us/page/careers",
    },
    {
      title: "GPU Quality Engineer",
      department: "Engineering",
      location: "Zhongshan, China",
      type: "Full-time",
      url: "https://www.zotac.com/us/page/careers",
    },
  ],
  "63 Moons Technologies": [
    {
      title: "Software Engineer, Fintech",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.63moons.com/careers",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.63moons.com/careers",
    },
  ],
  "Acko General Insurance": [
    {
      title: "Backend Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.acko.com/careers/",
    },
    {
      title: "Data Scientist",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.acko.com/careers/",
    },
  ],
  "Adani Group": [
    {
      title: "Power Systems Engineer",
      department: "Engineering",
      location: "Ahmedabad, India",
      type: "Full-time",
      url: "https://careers.adani.com/",
    },
    {
      title: "Project Manager, Infrastructure",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.adani.com/",
    },
    {
      title: "Finance Analyst",
      department: "Finance",
      location: "Ahmedabad, India",
      type: "Full-time",
      url: "https://careers.adani.com/",
    },
  ],
  "Adani Power": [
    {
      title: "Electrical Engineer",
      department: "Engineering",
      location: "Gujarat, India",
      type: "Full-time",
      url: "https://careers.adani.com/",
    },
    {
      title: "Operations Manager",
      department: "Product",
      location: "Mundra, India",
      type: "Full-time",
      url: "https://careers.adani.com/",
    },
  ],
  "Aditya Birla Group": [
    {
      title: "Management Trainee",
      department: "Consulting",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.adityabirla.com/careers",
    },
    {
      title: "Digital Transformation Lead",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.adityabirla.com/careers",
    },
  ],
  "Alkem Laboratories": [
    {
      title: "Medical Representative",
      department: "Sales",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.alkemlabs.com/careers",
    },
    {
      title: "Quality Assurance Analyst",
      department: "Engineering",
      location: "Daman, India",
      type: "Full-time",
      url: "https://www.alkemlabs.com/careers",
    },
  ],
  Amul: [
    {
      title: "Marketing Manager",
      department: "Sales",
      location: "Anand, India",
      type: "Full-time",
      url: "https://www.amul.com/m/amul-career.php",
    },
    {
      title: "Supply Chain Analyst",
      department: "Engineering",
      location: "Anand, India",
      type: "Full-time",
      url: "https://www.amul.com/m/amul-career.php",
    },
  ],
  "Angel One": [
    {
      title: "Software Engineer, Trading",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.angelone.in/careers",
    },
    {
      title: "Data Analyst",
      department: "Research",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.angelone.in/careers",
    },
  ],
  "Apollo Hospitals": [
    {
      title: "Software Engineer, Health IT",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://careers.apollohospitals.com/",
    },
    {
      title: "Data Scientist, Clinical",
      department: "Research",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://careers.apollohospitals.com/",
    },
    {
      title: "Hospital Administrator",
      department: "Product",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://careers.apollohospitals.com/",
    },
  ],
  "Apollo Tyres": [
    {
      title: "Mechanical Engineer",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.apollotyres.com/en-in/corporate/careers/",
    },
    {
      title: "R&D Engineer, Compounds",
      department: "Research",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.apollotyres.com/en-in/corporate/careers/",
    },
  ],
  "Ashok Leyland": [
    {
      title: "Vehicle Dynamics Engineer",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.ashokleyland.com/careers",
    },
    {
      title: "Software Engineer, EV",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.ashokleyland.com/careers",
    },
  ],
  "Asian Paints": [
    {
      title: "R&D Chemist",
      department: "Research",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.asianpaints.com/corporate/careers.html",
    },
    {
      title: "Software Engineer, Digital",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.asianpaints.com/corporate/careers.html",
    },
    {
      title: "Sales Manager",
      department: "Sales",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.asianpaints.com/corporate/careers.html",
    },
  ],
  "Axis Bank": [
    {
      title: "Software Engineer, Digital Banking",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.axisbank.com/careers",
    },
    {
      title: "Risk Analyst",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.axisbank.com/careers",
    },
    {
      title: "Relationship Manager",
      department: "Sales",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.axisbank.com/careers",
    },
  ],
  "Bajaj Auto": [
    {
      title: "EV Powertrain Engineer",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.bajajauto.com/careers",
    },
    {
      title: "Digital Marketing Manager",
      department: "Sales",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.bajajauto.com/careers",
    },
  ],
  "Bank of Baroda": [
    {
      title: "IT Officer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.bankofbaroda.in/careers",
    },
    {
      title: "Probationary Officer",
      department: "Finance",
      location: "Various, India",
      type: "Full-time",
      url: "https://www.bankofbaroda.in/careers",
    },
  ],
  "Bank of India": [
    {
      title: "IT Specialist Officer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.bankofindia.co.in/careers",
    },
    {
      title: "Credit Analyst",
      department: "Finance",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.bankofindia.co.in/careers",
    },
  ],
  "Bharti Airtel": [
    {
      title: "Software Engineer, 5G",
      department: "Engineering",
      location: "Gurgaon, India",
      type: "Full-time",
      url: "https://www.airtel.in/careers/",
    },
    {
      title: "Network Engineer",
      department: "Engineering",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.airtel.in/careers/",
    },
    {
      title: "Product Manager, B2B",
      department: "Product",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.airtel.in/careers/",
    },
  ],
  Biocon: [
    {
      title: "Research Scientist, Biosimilars",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.biocon.com/careers/",
    },
    {
      title: "QA Engineer, Biologics",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.biocon.com/careers/",
    },
  ],
  "Blue Star": [
    {
      title: "HVAC Design Engineer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.bluestarindia.com/careers",
    },
    {
      title: "Product Manager, ACs",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.bluestarindia.com/careers",
    },
  ],
  "Britannia Industries": [
    {
      title: "Food Technologist",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.britannia.co.in/careers",
    },
    {
      title: "Sales Officer",
      department: "Sales",
      location: "Various, India",
      type: "Full-time",
      url: "https://www.britannia.co.in/careers",
    },
  ],
  "Canara Bank": [
    {
      title: "IT Officer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.canarabank.com/careers",
    },
    {
      title: "Probationary Officer",
      department: "Finance",
      location: "Various, India",
      type: "Full-time",
      url: "https://www.canarabank.com/careers",
    },
  ],
  Cipla: [
    {
      title: "Research Scientist",
      department: "Research",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.cipla.com/careers",
    },
    {
      title: "Software Engineer, Pharma IT",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.cipla.com/careers",
    },
    {
      title: "QA Analyst",
      department: "Engineering",
      location: "Goa, India",
      type: "Full-time",
      url: "https://www.cipla.com/careers",
    },
  ],
  "Coal India": [
    {
      title: "Mining Engineer",
      department: "Engineering",
      location: "Dhanbad, India",
      type: "Full-time",
      url: "https://www.coalindia.in/careers",
    },
    {
      title: "IT Manager",
      department: "Engineering",
      location: "Kolkata, India",
      type: "Full-time",
      url: "https://www.coalindia.in/careers",
    },
  ],
  "Cochin Shipyard": [
    {
      title: "Naval Architect",
      department: "Engineering",
      location: "Kochi, India",
      type: "Full-time",
      url: "https://cochinshipyard.in/careers",
    },
    {
      title: "Mechanical Engineer",
      department: "Engineering",
      location: "Kochi, India",
      type: "Full-time",
      url: "https://cochinshipyard.in/careers",
    },
  ],
  Cyient: [
    {
      title: "Aerospace Design Engineer",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://www.cyient.com/careers",
    },
    {
      title: "Embedded Systems Engineer",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://www.cyient.com/careers",
    },
  ],
  Dabur: [
    {
      title: "R&D Scientist, Ayurveda",
      department: "Research",
      location: "Gurugram, India",
      type: "Full-time",
      url: "https://www.dabur.com/about-dabur/careers",
    },
    {
      title: "Digital Marketing Manager",
      department: "Sales",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.dabur.com/about-dabur/careers",
    },
  ],
  "Dixon Technologies": [
    {
      title: "Electronics Manufacturing Engineer",
      department: "Engineering",
      location: "Noida, India",
      type: "Full-time",
      url: "https://www.dixoninfo.com/career.html",
    },
    {
      title: "Quality Engineer",
      department: "Engineering",
      location: "Noida, India",
      type: "Full-time",
      url: "https://www.dixoninfo.com/career.html",
    },
  ],
  DLF: [
    {
      title: "Project Manager, Real Estate",
      department: "Product",
      location: "Gurugram, India",
      type: "Full-time",
      url: "https://www.dlf.in/careers",
    },
    {
      title: "Civil Engineer",
      department: "Engineering",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.dlf.in/careers",
    },
  ],
  DMart: [
    {
      title: "Store Manager",
      department: "Sales",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.dmartindia.com/careers",
    },
    {
      title: "Supply Chain Analyst",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.dmartindia.com/careers",
    },
  ],
  "Dr. Reddy's Laboratories": [
    {
      title: "Research Scientist, APIs",
      department: "Research",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://www.drreddys.com/careers",
    },
    {
      title: "Software Engineer, Pharma IT",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://www.drreddys.com/careers",
    },
  ],
  EaseMyTrip: [
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.easemytrip.com/careers.html",
    },
    {
      title: "Product Manager, Flights",
      department: "Product",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.easemytrip.com/careers.html",
    },
  ],
  "Eicher Motors": [
    {
      title: "Motorcycle Design Engineer",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.royalenfield.com/in/en/careers/",
    },
    {
      title: "Product Manager, RE",
      department: "Product",
      location: "Gurugram, India",
      type: "Full-time",
      url: "https://www.royalenfield.com/in/en/careers/",
    },
  ],
  Emami: [
    {
      title: "Brand Manager",
      department: "Sales",
      location: "Kolkata, India",
      type: "Full-time",
      url: "https://www.emamiltd.in/careers",
    },
    {
      title: "R&D Scientist",
      department: "Research",
      location: "Kolkata, India",
      type: "Full-time",
      url: "https://www.emamiltd.in/careers",
    },
  ],
  "Exide Industries": [
    {
      title: "Battery Engineer",
      department: "Engineering",
      location: "Kolkata, India",
      type: "Full-time",
      url: "https://www.exideindustries.com/careers",
    },
    {
      title: "EV Lithium Specialist",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.exideindustries.com/careers",
    },
  ],
  "Federal Bank": [
    {
      title: "Software Engineer, Banking",
      department: "Engineering",
      location: "Kochi, India",
      type: "Full-time",
      url: "https://www.federalbank.co.in/careers",
    },
    {
      title: "Relationship Manager, NRI",
      department: "Sales",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.federalbank.co.in/careers",
    },
  ],
  Flipkart: [
    {
      title: "Software Engineer, Search",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.flipkartcareers.com/",
    },
    {
      title: "Data Scientist",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.flipkartcareers.com/",
    },
    {
      title: "Product Manager, Commerce",
      department: "Product",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.flipkartcareers.com/",
    },
  ],
  "Fortis Healthcare": [
    {
      title: "Healthcare IT Engineer",
      department: "Engineering",
      location: "Gurugram, India",
      type: "Full-time",
      url: "https://www.fortishealthcare.com/careers",
    },
    {
      title: "Clinical Data Analyst",
      department: "Research",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.fortishealthcare.com/careers",
    },
  ],
  GAIL: [
    {
      title: "Pipeline Engineer",
      department: "Engineering",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.gail.nic.in/career.html",
    },
    {
      title: "IT Officer",
      department: "Engineering",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.gail.nic.in/career.html",
    },
  ],
  "Godrej Group": [
    {
      title: "Brand Manager",
      department: "Sales",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.godrej.com/",
    },
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.godrej.com/",
    },
    {
      title: "Project Manager, Real Estate",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.godrej.com/",
    },
  ],
  Havells: [
    {
      title: "Electrical Engineer, R&D",
      department: "Research",
      location: "Noida, India",
      type: "Full-time",
      url: "https://www.havells.com/careers",
    },
    {
      title: "Product Manager, ACs",
      department: "Product",
      location: "Noida, India",
      type: "Full-time",
      url: "https://www.havells.com/careers",
    },
  ],
  "HDFC Bank": [
    {
      title: "Software Engineer, Payments",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.hdfcbank.com/htdocs/aboutus/careers",
    },
    {
      title: "Data Scientist, Risk",
      department: "Research",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.hdfcbank.com/htdocs/aboutus/careers",
    },
    {
      title: "Relationship Manager",
      department: "Sales",
      location: "Various, India",
      type: "Full-time",
      url: "https://www.hdfcbank.com/htdocs/aboutus/careers",
    },
  ],
  "Hero MotoCorp": [
    {
      title: "EV Powertrain Engineer",
      department: "Engineering",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.heromotocorp.com/en-in/careers/",
    },
    {
      title: "Software Engineer, Connected Bikes",
      department: "Engineering",
      location: "Gurugram, India",
      type: "Full-time",
      url: "https://www.heromotocorp.com/en-in/careers/",
    },
  ],
  "Hindalco Industries": [
    {
      title: "Metallurgical Engineer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.hindalco.com/careers",
    },
    {
      title: "Process Engineer, Aluminum",
      department: "Engineering",
      location: "Renukoot, India",
      type: "Full-time",
      url: "https://www.hindalco.com/careers",
    },
  ],
  "Hindustan Aeronautics Limited": [
    {
      title: "Aeronautical Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://hal-india.co.in/careers",
    },
    {
      title: "Avionics Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://hal-india.co.in/careers",
    },
  ],
  "Hindustan Petroleum": [
    {
      title: "Petroleum Engineer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://hindustanpetroleum.com/careers",
    },
    {
      title: "IT Systems Engineer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://hindustanpetroleum.com/careers",
    },
  ],
  "Hindustan Zinc": [
    {
      title: "Mining Engineer",
      department: "Engineering",
      location: "Udaipur, India",
      type: "Full-time",
      url: "https://www.hzlindia.com/careers",
    },
    {
      title: "Process Metallurgist",
      department: "Engineering",
      location: "Rajasthan, India",
      type: "Full-time",
      url: "https://www.hzlindia.com/careers",
    },
  ],
  "ICICI Bank": [
    {
      title: "Software Engineer, Digital",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.icicicareers.com/",
    },
    {
      title: "Data Scientist, AI",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.icicicareers.com/",
    },
    {
      title: "Relationship Manager",
      department: "Sales",
      location: "Various, India",
      type: "Full-time",
      url: "https://www.icicicareers.com/",
    },
  ],
  "IDBI Bank": [
    {
      title: "IT Officer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.idbibank.in/careers-idbi.aspx",
    },
    {
      title: "Probationary Officer",
      department: "Finance",
      location: "Various, India",
      type: "Full-time",
      url: "https://www.idbibank.in/careers-idbi.aspx",
    },
  ],
  "IDFC First Bank": [
    {
      title: "Software Engineer, Fintech",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.idfcfirstbank.com/careers",
    },
    {
      title: "Product Manager, Mobile",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.idfcfirstbank.com/careers",
    },
  ],
  "Indian Hotels Company Limited": [
    {
      title: "Hotel Technology Manager",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.ihcltata.com/careers",
    },
    {
      title: "Revenue Manager",
      department: "Sales",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.ihcltata.com/careers",
    },
  ],
  "Indian Oil Corporation": [
    {
      title: "Chemical Engineer",
      department: "Engineering",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.iocl.com/career.aspx",
    },
    {
      title: "IT Officer",
      department: "Engineering",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.iocl.com/career.aspx",
    },
  ],
  "Indian Railways": [
    {
      title: "Junior Engineer, Signal",
      department: "Engineering",
      location: "Various, India",
      type: "Full-time",
      url: "https://www.rrcb.gov.in/",
    },
    {
      title: "Software Engineer, IRCTC",
      department: "Engineering",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.rrcb.gov.in/",
    },
  ],
  IndiGo: [
    {
      title: "Software Engineer, Airline IT",
      department: "Engineering",
      location: "Gurugram, India",
      type: "Full-time",
      url: "https://careers.goindigo.in/",
    },
    {
      title: "Data Analyst, Revenue",
      department: "Research",
      location: "Gurugram, India",
      type: "Full-time",
      url: "https://careers.goindigo.in/",
    },
    {
      title: "Product Manager, App",
      department: "Product",
      location: "Gurugram, India",
      type: "Full-time",
      url: "https://careers.goindigo.in/",
    },
  ],
  "IndusInd Bank": [
    {
      title: "Software Engineer, Banking",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.indusind.com/in/en/careers.html",
    },
    {
      title: "Product Manager, Fintech",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.indusind.com/in/en/careers.html",
    },
  ],
  "ITC Limited": [
    {
      title: "FMCG Brand Manager",
      department: "Sales",
      location: "Kolkata, India",
      type: "Full-time",
      url: "https://www.itcportal.com/careers/",
    },
    {
      title: "Software Engineer, IT",
      department: "Engineering",
      location: "Kolkata, India",
      type: "Full-time",
      url: "https://www.itcportal.com/careers/",
    },
  ],
  ISRO: [
    {
      title: "Scientist/Engineer, Electronics",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.isro.gov.in/Careers.html",
    },
    {
      title: "Research Scientist, Propulsion",
      department: "Research",
      location: "Thiruvananthapuram, India",
      type: "Full-time",
      url: "https://www.isro.gov.in/Careers.html",
    },
  ],
  Jio: [
    {
      title: "Software Engineer, Telecom",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.jio.com/careers",
    },
    {
      title: "Network Engineer, 5G",
      department: "Engineering",
      location: "Navi Mumbai, India",
      type: "Full-time",
      url: "https://www.jio.com/careers",
    },
    {
      title: "Product Manager, Jio Apps",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.jio.com/careers",
    },
  ],
  "Jio Platforms": [
    {
      title: "AI/ML Engineer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.jio.com/careers",
    },
    {
      title: "Platform Architect",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.jio.com/careers",
    },
  ],
  "Jindal Steel and Power": [
    {
      title: "Metallurgical Engineer",
      department: "Engineering",
      location: "Raigarh, India",
      type: "Full-time",
      url: "https://www.jindalsteelpower.com/careers",
    },
    {
      title: "Software Engineer, Steel Tech",
      department: "Engineering",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.jindalsteelpower.com/careers",
    },
  ],
  "JSW Steel": [
    {
      title: "Steel Process Engineer",
      department: "Engineering",
      location: "Vijayanagar, India",
      type: "Full-time",
      url: "https://careers.jsw.in/",
    },
    {
      title: "IT Engineer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.jsw.in/",
    },
  ],
  "JSW Group": [
    {
      title: "Business Development Manager",
      department: "Sales",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.jsw.in/",
    },
    {
      title: "Digital Transformation Lead",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.jsw.in/",
    },
  ],
  "Jubilant FoodWorks": [
    {
      title: "Technology Manager, POS",
      department: "Engineering",
      location: "Noida, India",
      type: "Full-time",
      url: "https://www.jubilantfoodworks.com/careers",
    },
    {
      title: "Data Analyst, Supply Chain",
      department: "Research",
      location: "Noida, India",
      type: "Full-time",
      url: "https://www.jubilantfoodworks.com/careers",
    },
  ],
  "Kotak Mahindra Bank": [
    {
      title: "Software Engineer, Digital Banking",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.kotak.com/",
    },
    {
      title: "Data Scientist",
      department: "Research",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.kotak.com/",
    },
    {
      title: "Relationship Manager, Wealth",
      department: "Sales",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.kotak.com/",
    },
  ],
  "KPIT Technologies": [
    {
      title: "Automotive Software Engineer",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.kpit.com/about/careers/",
    },
    {
      title: "AUTOSAR Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.kpit.com/about/careers/",
    },
  ],
  "Larsen & Toubro": [
    {
      title: "Civil Engineer, Infrastructure",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.larsentoubro.com/career/",
    },
    {
      title: "Software Engineer, L&T Technology",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.larsentoubro.com/career/",
    },
    {
      title: "Project Manager",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.larsentoubro.com/career/",
    },
  ],
  "Life Insurance Corporation": [
    {
      title: "IT Manager",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://licindia.in/careers",
    },
    {
      title: "Actuary Analyst",
      department: "Research",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://licindia.in/careers",
    },
  ],
  "Mahindra & Mahindra": [
    {
      title: "EV Engineer",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://careers.mahindra.com/",
    },
    {
      title: "Data Scientist, Automotive",
      department: "Research",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.mahindra.com/",
    },
    {
      title: "Product Manager, SUVs",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.mahindra.com/",
    },
  ],
  MakeMyTrip: [
    {
      title: "Software Engineer, Flights",
      department: "Engineering",
      location: "Gurugram, India",
      type: "Full-time",
      url: "https://www.makemytrip.com/career.html",
    },
    {
      title: "Data Scientist",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.makemytrip.com/career.html",
    },
  ],
  Marico: [
    {
      title: "R&D Scientist, FMCG",
      department: "Research",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.marico.com/",
    },
    {
      title: "Digital Marketing Manager",
      department: "Sales",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.marico.com/",
    },
  ],
  "Maruti Suzuki": [
    {
      title: "Software Engineer, Connected Cars",
      department: "Engineering",
      location: "Gurugram, India",
      type: "Full-time",
      url: "https://www.marutisuzuki.com/corporate/careers",
    },
    {
      title: "EV Engineer",
      department: "Engineering",
      location: "Rohtak, India",
      type: "Full-time",
      url: "https://www.marutisuzuki.com/corporate/careers",
    },
  ],
  "Max Healthcare": [
    {
      title: "Healthcare IT Engineer",
      department: "Engineering",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.maxhealthcare.in/careers",
    },
    {
      title: "Clinical Data Analyst",
      department: "Research",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.maxhealthcare.in/careers",
    },
  ],
  Mphasis: [
    {
      title: "Java Developer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.mphasis.com/",
    },
    {
      title: "Cloud Engineer, AWS",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://careers.mphasis.com/",
    },
  ],
  "Muthoot Finance": [
    {
      title: "Software Engineer, NBFC",
      department: "Engineering",
      location: "Kochi, India",
      type: "Full-time",
      url: "https://www.muthootfinance.com/careers",
    },
    {
      title: "Branch Manager",
      department: "Sales",
      location: "Various, India",
      type: "Full-time",
      url: "https://www.muthootfinance.com/careers",
    },
  ],
  Myntra: [
    {
      title: "Software Engineer, Fashion Tech",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.myntra.com/",
    },
    {
      title: "Data Scientist, Recommendations",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.myntra.com/",
    },
  ],
  "National Payments Corporation of India": [
    {
      title: "Software Engineer, UPI",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.npci.org.in/careers",
    },
    {
      title: "Product Manager, Payments",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.npci.org.in/careers",
    },
  ],
  "NTPC Limited": [
    {
      title: "Electrical Engineer, Power",
      department: "Engineering",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.ntpc.co.in/en/careers",
    },
    {
      title: "Software Engineer, SCADA",
      department: "Engineering",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.ntpc.co.in/en/careers",
    },
  ],
  Nykaa: [
    {
      title: "Software Engineer, E-commerce",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.nykaa.com/",
    },
    {
      title: "Product Manager, Beauty Tech",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://careers.nykaa.com/",
    },
    {
      title: "Data Scientist",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.nykaa.com/",
    },
  ],
  "Oil and Natural Gas Corporation": [
    {
      title: "Petroleum Engineer",
      department: "Engineering",
      location: "Dehradun, India",
      type: "Full-time",
      url: "https://ongcindia.com/careers",
    },
    {
      title: "Geophysicist",
      department: "Research",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://ongcindia.com/careers",
    },
  ],
  "Ola Electric": [
    {
      title: "Battery Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.olaelectric.com/careers",
    },
    {
      title: "Software Engineer, EV Software",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.olaelectric.com/careers",
    },
    {
      title: "Product Manager, S1",
      department: "Product",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.olaelectric.com/careers",
    },
  ],
  "One97 Communications": [
    {
      title: "Software Engineer, Payments",
      department: "Engineering",
      location: "Noida, India",
      type: "Full-time",
      url: "https://jobs.lever.co/paytm",
    },
    {
      title: "Data Scientist",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://jobs.lever.co/paytm",
    },
    {
      title: "Product Manager, UPI",
      department: "Product",
      location: "Noida, India",
      type: "Full-time",
      url: "https://jobs.lever.co/paytm",
    },
  ],
  "Patanjali Ayurved": [
    {
      title: "Food Scientist",
      department: "Research",
      location: "Haridwar, India",
      type: "Full-time",
      url: "https://www.patanjaliayurved.net/careers",
    },
    {
      title: "Marketing Manager",
      department: "Sales",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.patanjaliayurved.net/careers",
    },
  ],
  "Persistent Systems": [
    {
      title: "Software Engineer, Cloud",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.persistent.com/careers/",
    },
    {
      title: "Data Engineer",
      department: "Engineering",
      location: "Nagpur, India",
      type: "Full-time",
      url: "https://www.persistent.com/careers/",
    },
  ],
  "Pidilite Industries": [
    {
      title: "R&D Chemist, Adhesives",
      department: "Research",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.pidilite.com/careers",
    },
    {
      title: "Sales Manager",
      department: "Sales",
      location: "Various, India",
      type: "Full-time",
      url: "https://www.pidilite.com/careers",
    },
  ],
  "Pine Labs": [
    {
      title: "Software Engineer, Payments",
      department: "Engineering",
      location: "Noida, India",
      type: "Full-time",
      url: "https://pinelabs.com/careers",
    },
    {
      title: "Product Manager, POS",
      department: "Product",
      location: "Noida, India",
      type: "Full-time",
      url: "https://pinelabs.com/careers",
    },
  ],
  "Piramal Group": [
    {
      title: "Research Scientist, CDMO",
      department: "Research",
      location: "Ahmedabad, India",
      type: "Full-time",
      url: "https://www.piramal.com/careers/",
    },
    {
      title: "Software Engineer, Pharma",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.piramal.com/careers/",
    },
  ],
  "Power Grid Corporation of India": [
    {
      title: "Electrical Engineer, Transmission",
      department: "Engineering",
      location: "Gurugram, India",
      type: "Full-time",
      url: "https://www.powergrid.in/careers",
    },
    {
      title: "IT Officer",
      department: "Engineering",
      location: "Gurugram, India",
      type: "Full-time",
      url: "https://www.powergrid.in/careers",
    },
  ],
  "Punjab National Bank": [
    {
      title: "IT Officer",
      department: "Engineering",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.pnbindia.in/careers",
    },
    {
      title: "Probationary Officer",
      department: "Finance",
      location: "Various, India",
      type: "Full-time",
      url: "https://www.pnbindia.in/careers",
    },
  ],
  "Raymond Group": [
    {
      title: "Fashion Designer",
      department: "Design",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.raymond.in/careers",
    },
    {
      title: "Software Engineer, Retail",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.raymond.in/careers",
    },
  ],
  "Reliance Industries": [
    {
      title: "Software Engineer, JioTech",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.ril.com/careers",
    },
    {
      title: "Data Scientist, O2C",
      department: "Research",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.ril.com/careers",
    },
    {
      title: "Project Manager, New Energy",
      department: "Product",
      location: "Jamnagar, India",
      type: "Full-time",
      url: "https://www.ril.com/careers",
    },
  ],
  "Reliance Retail": [
    {
      title: "Software Engineer, E-commerce",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.relianceretail.com/careers",
    },
    {
      title: "Product Manager, JioMart",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.relianceretail.com/careers",
    },
  ],
  "Royal Enfield": [
    {
      title: "Motorcycle Design Engineer",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.royalenfield.com/in/en/careers/",
    },
    {
      title: "EV Powertrain Engineer",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.royalenfield.com/in/en/careers/",
    },
  ],
  "Serum Institute of India": [
    {
      title: "Research Scientist, Vaccines",
      department: "Research",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.seruminstitute.com/career.php",
    },
    {
      title: "Manufacturing Engineer",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.seruminstitute.com/career.php",
    },
  ],
  "Shree Cement": [
    {
      title: "Process Engineer, Cement",
      department: "Engineering",
      location: "Beawar, India",
      type: "Full-time",
      url: "https://www.shreecement.com/career",
    },
    {
      title: "IT Officer",
      department: "Engineering",
      location: "Kolkata, India",
      type: "Full-time",
      url: "https://www.shreecement.com/career",
    },
  ],
  "Shriram Group": [
    {
      title: "Software Engineer, NBFC",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.shriramfinance.in/about-us/careers",
    },
    {
      title: "Credit Analyst",
      department: "Finance",
      location: "Various, India",
      type: "Full-time",
      url: "https://www.shriramfinance.in/about-us/careers",
    },
  ],
  SpiceJet: [
    {
      title: "Software Engineer, Airline IT",
      department: "Engineering",
      location: "Gurugram, India",
      type: "Full-time",
      url: "https://careers.spicejet.com/",
    },
    {
      title: "Revenue Analyst",
      department: "Research",
      location: "Gurugram, India",
      type: "Full-time",
      url: "https://careers.spicejet.com/",
    },
  ],
  "State Bank of India": [
    {
      title: "IT Officer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://bank.sbi/web/guest/careers",
    },
    {
      title: "Probationary Officer",
      department: "Finance",
      location: "Various, India",
      type: "Full-time",
      url: "https://bank.sbi/web/guest/careers",
    },
    {
      title: "Data Scientist",
      department: "Research",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://bank.sbi/web/guest/careers",
    },
  ],
  "Steel Authority of India Limited": [
    {
      title: "Metallurgical Engineer",
      department: "Engineering",
      location: "Bhilai, India",
      type: "Full-time",
      url: "https://www.sail.co.in/career",
    },
    {
      title: "IT Officer",
      department: "Engineering",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://www.sail.co.in/career",
    },
  ],
  "Sun Pharma": [
    {
      title: "Research Scientist",
      department: "Research",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.sunpharma.com/careers",
    },
    {
      title: "Software Engineer, Pharma IT",
      department: "Engineering",
      location: "Baroda, India",
      type: "Full-time",
      url: "https://www.sunpharma.com/careers",
    },
  ],
  Suzlon: [
    {
      title: "Wind Turbine Engineer",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.suzlon.com/careers",
    },
    {
      title: "Software Engineer, SCADA",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.suzlon.com/careers",
    },
  ],
  "Tata Chemicals": [
    {
      title: "Chemical Engineer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.tatachemicals.com/careers",
    },
    {
      title: "R&D Scientist",
      department: "Research",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.tatachemicals.com/careers",
    },
  ],
  "Tata Communications": [
    {
      title: "Network Engineer, Global",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.tatacommunications.com/careers/",
    },
    {
      title: "Software Engineer, Cloud",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.tatacommunications.com/careers/",
    },
  ],
  "Tata Consultancy Services": [
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.tcs.com/careers",
    },
    {
      title: "AI/ML Engineer",
      department: "Research",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://www.tcs.com/careers",
    },
    {
      title: "Cloud Architect",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.tcs.com/careers",
    },
  ],
  "Tata Consumer Products": [
    {
      title: "Digital Marketing Manager",
      department: "Sales",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.tataconsumer.com/careers",
    },
    {
      title: "Data Analyst",
      department: "Research",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.tataconsumer.com/careers",
    },
  ],
  "Tata Group": [
    {
      title: "Management Trainee",
      department: "Consulting",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.tata.com/careers",
    },
    {
      title: "Digital Innovation Lead",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.tata.com/careers",
    },
  ],
  "Tata Motors": [
    {
      title: "EV Software Engineer",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.tatamotors.com/careers/",
    },
    {
      title: "Battery Systems Engineer",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.tatamotors.com/careers/",
    },
    {
      title: "Product Manager, Nexon",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.tatamotors.com/careers/",
    },
  ],
  "Tata Power": [
    {
      title: "Solar Engineer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.tatapower.com/careers",
    },
    {
      title: "EV Charging Network Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.tatapower.com/careers",
    },
  ],
  "Tata Steel": [
    {
      title: "Metallurgical Engineer",
      department: "Engineering",
      location: "Jamshedpur, India",
      type: "Full-time",
      url: "https://www.tatasteel.com/careers/",
    },
    {
      title: "Software Engineer, Steel Tech",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.tatasteel.com/careers/",
    },
  ],
  "Tata Technologies": [
    {
      title: "Automotive Engineer, CAD",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.tatatechnologies.com/careers/",
    },
    {
      title: "Software Engineer, PLM",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.tatatechnologies.com/careers/",
    },
  ],
  "Tech Mahindra": [
    {
      title: "Software Engineer, 5G",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://careers.techmahindra.com/",
    },
    {
      title: "Network Engineer",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://careers.techmahindra.com/",
    },
    {
      title: "Data Scientist",
      department: "Research",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://careers.techmahindra.com/",
    },
  ],
  Thermax: [
    {
      title: "Process Engineer, Boilers",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.thermaxglobal.com/careers/",
    },
    {
      title: "Software Engineer, IoT",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.thermaxglobal.com/careers/",
    },
  ],
  "Titan Company": [
    {
      title: "Product Designer, Watches",
      department: "Design",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.titancompany.in/careers",
    },
    {
      title: "Software Engineer, Retail",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.titancompany.in/careers",
    },
  ],
  "Torrent Group": [
    {
      title: "Electrical Engineer, Power",
      department: "Engineering",
      location: "Ahmedabad, India",
      type: "Full-time",
      url: "https://www.torrentpower.com/careers",
    },
    {
      title: "Pharma Research Scientist",
      department: "Research",
      location: "Ahmedabad, India",
      type: "Full-time",
      url: "https://www.torrentpower.com/careers",
    },
  ],
  "TVS Motor Company": [
    {
      title: "EV Engineer, iQube",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.tvsmotor.com/careers/",
    },
    {
      title: "Software Engineer, Connected",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.tvsmotor.com/careers/",
    },
  ],
  "UCO Bank": [
    {
      title: "IT Officer",
      department: "Engineering",
      location: "Kolkata, India",
      type: "Full-time",
      url: "https://www.ucobank.com/careers",
    },
    {
      title: "Credit Officer",
      department: "Finance",
      location: "Various, India",
      type: "Full-time",
      url: "https://www.ucobank.com/careers",
    },
  ],
  "UltraTech Cement": [
    {
      title: "Process Engineer, Cement",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.ultratechcement.com/about-us/careers",
    },
    {
      title: "SAP Consultant",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.ultratechcement.com/about-us/careers",
    },
  ],
  "Union Bank of India": [
    {
      title: "IT Officer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.unionbankofindia.co.in/english/careers.aspx",
    },
    {
      title: "Probationary Officer",
      department: "Finance",
      location: "Various, India",
      type: "Full-time",
      url: "https://www.unionbankofindia.co.in/english/careers.aspx",
    },
  ],
  "Vedanta Limited": [
    {
      title: "Mining Engineer",
      department: "Engineering",
      location: "Rajasthan, India",
      type: "Full-time",
      url: "https://www.vedantalimited.com/careers",
    },
    {
      title: "Data Analyst, Operations",
      department: "Research",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.vedantalimited.com/careers",
    },
  ],
  "Vodafone Idea": [
    {
      title: "Network Engineer, 4G/5G",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.myvi.in/about-vi/careers",
    },
    {
      title: "Software Engineer, OSS/BSS",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.myvi.in/about-vi/careers",
    },
  ],
  Voltas: [
    {
      title: "HVAC Design Engineer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.voltas.com/careers",
    },
    {
      title: "Product Manager, ACs",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.voltas.com/careers",
    },
  ],
  "Welspun Corp": [
    {
      title: "Mechanical Engineer, Pipes",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.welspuncorp.com/careers",
    },
    {
      title: "Quality Engineer",
      department: "Engineering",
      location: "Anjar, India",
      type: "Full-time",
      url: "https://www.welspuncorp.com/careers",
    },
  ],
  "Yes Bank": [
    {
      title: "Software Engineer, Digital",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.yesbank.in/about-us/careers",
    },
    {
      title: "Product Manager, API Banking",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.yesbank.in/about-us/careers",
    },
  ],
  "Zee Entertainment Enterprises": [
    {
      title: "Software Engineer, OTT",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.zee.com/careers",
    },
    {
      title: "Product Manager, ZEE5",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      url: "https://www.zee.com/careers",
    },
  ],
  "Zee News": [
    {
      title: "Journalist / News Anchor",
      department: "Product",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://zeenews.india.com/india/zee-news-career",
    },
    {
      title: "Software Engineer, CMS",
      department: "Engineering",
      location: "New Delhi, India",
      type: "Full-time",
      url: "https://zeenews.india.com/india/zee-news-career",
    },
  ],
  "Zensar Technologies": [
    {
      title: "Java Developer",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      url: "https://www.zensar.com/careers",
    },
    {
      title: "Cloud Architect",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      url: "https://www.zensar.com/careers",
    },
  ],
  "Zoho Corporation": [
    {
      title: "Software Engineer, SaaS",
      department: "Engineering",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.zoho.com/careers.html",
    },
    {
      title: "Product Manager, CRM",
      department: "Product",
      location: "Chennai, India",
      type: "Full-time",
      url: "https://www.zoho.com/careers.html",
    },
    {
      title: "Data Engineer",
      department: "Engineering",
      location: "Bengaluru, India",
      type: "Full-time",
      url: "https://www.zoho.com/careers.html",
    },
  ],
  "Zydus Lifesciences": [
    {
      title: "Research Scientist, Vaccines",
      department: "Research",
      location: "Ahmedabad, India",
      type: "Full-time",
      url: "https://www.zyduslife.com/careers/",
    },
    {
      title: "Software Engineer, Pharma IT",
      department: "Engineering",
      location: "Ahmedabad, India",
      type: "Full-time",
      url: "https://www.zyduslife.com/careers/",
    },
  ],
};

type LocationFilter = "All" | "India" | "US" | "Remote";

const FILTER_BUTTONS: LocationFilter[] = ["All", "India", "US", "Remote"];

function matchesFilter(location: string, filter: LocationFilter): boolean {
  if (filter === "All") return true;
  if (filter === "India") return location.includes("India");
  if (filter === "Remote") return location.toLowerCase().includes("remote");
  if (filter === "US") {
    const usPatterns = [
      ", CA",
      ", NY",
      ", TX",
      ", WA",
      "D.C.",
      "New York",
      "San Francisco",
      "Seattle",
      "Austin",
      "Boston",
      ", MA",
    ];
    return usPatterns.some((p) => location.includes(p));
  }
  return true;
}

function findRoles(company: string): Role[] | undefined {
  if (ROLES[company]) return ROLES[company];
  const key = Object.keys(ROLES).find(
    (k) => k.toLowerCase() === company.toLowerCase(),
  );
  return key ? ROLES[key] : undefined;
}

function findCareersUrl(company: string): string | undefined {
  if (CAREERS[company]) return CAREERS[company];
  const key = Object.keys(CAREERS).find(
    (k) => k.toLowerCase() === company.toLowerCase(),
  );
  if (key) return CAREERS[key];
  return `https://www.${company.toLowerCase().replace(/\s+/g, "")}.com/careers`;
}

interface JobDescriptionsProps {
  company: string;
}

export default function JobDescriptions({ company }: JobDescriptionsProps) {
  const [activeFilter, setActiveFilter] = useState<LocationFilter>("All");
  const roles = findRoles(company);
  const careersUrl = findCareersUrl(company);

  // Fallback card when no dedicated roles exist
  if (!roles) {
    return (
      <div
        className="animate-fade-up rounded-2xl overflow-hidden"
        style={{
          background: "#0F1B2A",
          border: "1px solid rgba(139,92,246,0.2)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.05)",
        }}
        data-ocid="jobs.card"
      >
        <div
          className="px-8 py-5 flex items-center gap-3"
          style={{
            background:
              "linear-gradient(90deg, rgba(139,92,246,0.08) 0%, rgba(34,211,238,0.06) 100%)",
            borderBottom: "1px solid rgba(139,92,246,0.12)",
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#A78BFA,#8B5CF6)" }}
          >
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2
              className="text-lg font-bold"
              style={{
                background: "linear-gradient(90deg,#A78BFA,#22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Open Roles
            </h2>
            <p className="text-xs" style={{ color: "#64748B" }}>
              Careers at {company}
            </p>
          </div>
        </div>
        <div
          className="p-8 flex flex-col items-center gap-4"
          data-ocid="jobs.empty_state"
        >
          <p className="text-sm" style={{ color: "#94A3B8" }}>
            Explore open positions directly on the {company} careers page.
          </p>
          <a
            href={careersUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg,rgba(139,92,246,0.15),rgba(34,211,238,0.15))",
              border: "1px solid rgba(139,92,246,0.3)",
              color: "#A78BFA",
            }}
            data-ocid="jobs.careers.link"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Careers at {company}
          </a>
        </div>
      </div>
    );
  }

  const filteredRoles = roles.filter((r) =>
    matchesFilter(r.location, activeFilter),
  );

  return (
    <div
      className="animate-fade-up rounded-2xl overflow-hidden"
      style={{
        background: "#0F1B2A",
        border: "1px solid rgba(139,92,246,0.2)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.05)",
      }}
      data-ocid="jobs.card"
    >
      {/* Header */}
      <div
        className="px-8 py-5 flex items-center justify-between"
        style={{
          background:
            "linear-gradient(90deg, rgba(139,92,246,0.08) 0%, rgba(34,211,238,0.06) 100%)",
          borderBottom: "1px solid rgba(139,92,246,0.12)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#A78BFA,#8B5CF6)" }}
          >
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2
              className="text-lg font-bold"
              style={{
                background: "linear-gradient(90deg,#A78BFA,#22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Open Roles
            </h2>
            <p className="text-xs" style={{ color: "#64748B" }}>
              {filteredRoles.length} of {roles.length} positions at {company}
            </p>
          </div>
        </div>
        <span
          className="text-xs font-bold px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(139,92,246,0.15)",
            color: "#A78BFA",
            border: "1px solid rgba(139,92,246,0.3)",
          }}
        >
          {filteredRoles.length} OPEN
        </span>
      </div>

      {/* Location Filter */}
      <div
        className="px-6 pt-5 pb-1 flex items-center gap-2 flex-wrap"
        data-ocid="jobs.filter.tab"
      >
        {FILTER_BUTTONS.map((f) => {
          const isActive = activeFilter === f;
          return (
            <button
              type="button"
              key={f}
              onClick={() => setActiveFilter(f)}
              className="text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-200"
              style={{
                background: isActive
                  ? "linear-gradient(135deg,rgba(139,92,246,0.4),rgba(34,211,238,0.3))"
                  : "rgba(255,255,255,0.04)",
                border: isActive
                  ? "1px solid rgba(139,92,246,0.6)"
                  : "1px solid rgba(255,255,255,0.08)",
                color: isActive ? "#E2E8F0" : "#64748B",
                boxShadow: isActive ? "0 0 12px rgba(139,92,246,0.25)" : "none",
              }}
              data-ocid="jobs.tab"
            >
              {f === "India" ? "🇮🇳 India" : f}
            </button>
          );
        })}
      </div>

      {/* Roles list */}
      <div className="p-6">
        <div className="flex flex-col gap-3">
          {filteredRoles.length === 0 ? (
            <div
              className="text-center py-10 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#64748B",
              }}
              data-ocid="jobs.empty_state"
            >
              <p className="text-sm">No roles found for this filter.</p>
            </div>
          ) : (
            filteredRoles.map((role, i) => (
              <div
                key={`${role.title}-${role.location}-${i}`}
                className="flex items-center justify-between gap-4 rounded-xl px-5 py-4 transition-all duration-200 group"
                style={{
                  background: role.location.includes("India")
                    ? "rgba(255,165,0,0.04)"
                    : "rgba(255,255,255,0.03)",
                  border: role.location.includes("India")
                    ? "1px solid rgba(255,165,0,0.12)"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
                data-ocid={`jobs.item.${i + 1}`}
              >
                <div className="flex items-start gap-4 min-w-0">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-lg flex-shrink-0 mt-0.5"
                    style={{
                      background: `${DEPT_COLORS[role.department] ?? "#94A3B8"}18`,
                      color: DEPT_COLORS[role.department] ?? "#94A3B8",
                      border: `1px solid ${DEPT_COLORS[role.department] ?? "#94A3B8"}33`,
                    }}
                  >
                    {role.department}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className="text-sm font-semibold truncate"
                        style={{ color: "#E2E8F0" }}
                      >
                        {role.title}
                      </p>
                      {role.location.includes("India") && (
                        <span className="text-xs flex-shrink-0">🇮🇳</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin
                        className="w-3 h-3 flex-shrink-0"
                        style={{ color: "#64748B" }}
                      />
                      <p
                        className="text-xs truncate"
                        style={{ color: "#64748B" }}
                      >
                        {role.location} · {role.type}
                      </p>
                    </div>
                  </div>
                </div>
                <a
                  href={role.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold flex-shrink-0 transition-all duration-200 hover:opacity-80"
                  style={{
                    background: "rgba(34,211,238,0.08)",
                    border: "1px solid rgba(34,211,238,0.2)",
                    color: "#22D3EE",
                  }}
                  data-ocid={`jobs.link.${i + 1}`}
                >
                  View Role
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))
          )}
        </div>

        {careersUrl && (
          <div className="mt-5 flex justify-center">
            <a
              href={careersUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{
                background:
                  "linear-gradient(135deg,rgba(139,92,246,0.15),rgba(34,211,238,0.15))",
                border: "1px solid rgba(139,92,246,0.3)",
                color: "#A78BFA",
              }}
              data-ocid="jobs.careers.link"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View All Jobs at {company}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
