export type Category =
  | "Books" | "Gadgets" | "Notes" | "Electronics"
  | "Cycles" | "Hostel Essentials" | "Lab Equipment" | "Furniture";

export type Product = {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: Category;
  condition: "New" | "Like New" | "Good" | "Fair";
  image: string;
  images?: string[];
  seller: { name: string; college: string; verified: boolean; rating: number; avatar: string };
  description: string;
  shortDescription?: string;
  usedFor?: string;
  itemAge?: string;
  negotiable?: boolean;
  pickupLocation?: string;
  department?: string;
  specs?: string[];
  tags?: string[];
  availability?: "Available" | "Reserved" | "Sold";
  forRent?: boolean;
  rentPerDay?: number;
  postedAgo: string;
};

const img = (q: string, seed: number) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=900&q=70&sig=${seed}`;

export const products: Product[] = [
  {
    id: "p1",
    title: "Engineering Mathematics — B.S. Grewal (44th Ed.)",
    price: 320, originalPrice: 720, category: "Books", condition: "Good",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Aarav Mehta", college: "IIT Delhi", verified: true, rating: 4.9,
      avatar: "https://i.pravatar.cc/120?img=12" },
    description: "Lightly used, no markings on inside pages. A few highlights in chapter 3.",
    shortDescription: "Clean pages with minimal highlights. Great for 1st year.",
    usedFor: "8 months",
    itemAge: "Bought last year",
    negotiable: true,
    pickupLocation: "Pickup near Central Library",
    department: "Mechanical Engineering",
    specs: ["Edition: 44th", "Binding: Paperback", "Language: English"],
    tags: ["Semester 1", "Maths", "Core"],
    availability: "Available",
    postedAgo: "2 days ago",
  },
  {
    id: "p2",
    title: "Apple MacBook Air M1 — 8GB / 256GB",
    price: 54999, originalPrice: 89900, category: "Electronics", condition: "Like New",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Riya Sharma", college: "BITS Pilani", verified: true, rating: 4.8,
      avatar: "https://i.pravatar.cc/120?img=47" },
    description: "Bought 14 months ago. Battery cycles under 90. Box and charger included.",
    shortDescription: "Battery health strong. Includes box + original charger.",
    usedFor: "14 months",
    itemAge: "2024 model",
    negotiable: false,
    pickupLocation: "Pickup near Hostel Block B",
    department: "CSE",
    specs: ["Chip: Apple M1", "RAM: 8GB", "Storage: 256GB SSD", "Battery cycles: < 90"],
    tags: ["Laptop", "Study", "Coding"],
    availability: "Available",
    postedAgo: "5 hours ago",
  },
  {
    id: "p3",
    title: "Casio FX-991ES Plus Scientific Calculator",
    price: 650, originalPrice: 1100, category: "Gadgets", condition: "Like New",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Karthik R.", college: "NIT Trichy", verified: true, rating: 5.0,
      avatar: "https://i.pravatar.cc/120?img=33" },
    description: "Used for one semester. Works perfectly. Cover included.",
    shortDescription: "Perfect for engineering exams. Cover included.",
    usedFor: "1 semester",
    itemAge: "Bought in 2025",
    negotiable: true,
    pickupLocation: "Pickup near Academic Block A",
    department: "EEE",
    specs: ["Model: FX-991ES Plus", "Cover: Included", "Keys: Like new"],
    tags: ["Exam", "Calculator", "Engineering"],
    availability: "Available",
    postedAgo: "1 day ago",
  },
  {
    id: "p4",
    title: "Hercules Roadeo Hybrid Cycle — 21 Speed",
    price: 4200, originalPrice: 9500, category: "Cycles", condition: "Good",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Devansh Kapoor", college: "VIT Vellore", verified: true, rating: 4.6,
      avatar: "https://i.pravatar.cc/120?img=14" },
    description: "Recently serviced. New brake pads and tyres.",
    forRent: true, rentPerDay: 80,
    shortDescription: "Smooth gears, recently serviced. Ideal for campus commute.",
    usedFor: "2 years",
    itemAge: "Purchased in 2024",
    negotiable: true,
    pickupLocation: "Pickup near Main Gate",
    department: "Civil Engineering",
    specs: ["Gears: 21 speed", "Servicing: done", "Tyres: new"],
    tags: ["Commute", "Cycle", "Hybrid"],
    availability: "Available",
    postedAgo: "3 days ago",
  },
  {
    id: "p5",
    title: "Hostel Study Lamp — Rechargeable LED",
    price: 380, category: "Hostel Essentials", condition: "New",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Meera Iyer", college: "IIT Bombay", verified: true, rating: 4.7,
      avatar: "https://i.pravatar.cc/120?img=20" },
    description: "Brand new, sealed. Brightness adjustable.",
    shortDescription: "Sealed pack. Adjustable brightness + rechargeable battery.",
    usedFor: "Unused",
    itemAge: "Bought this week",
    negotiable: false,
    pickupLocation: "Pickup near Hostel Block D",
    department: "ECE",
    specs: ["Brightness: 3 levels", "Battery: rechargeable", "Color temp: neutral white"],
    tags: ["Hostel", "Study", "LED"],
    availability: "Available",
    postedAgo: "6 hours ago",
  },
  {
    id: "p6",
    title: "Data Structures Hand-Written Notes (Sem 3)",
    price: 120, category: "Notes", condition: "Like New",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Ananya Singh", college: "DTU", verified: true, rating: 4.9,
      avatar: "https://i.pravatar.cc/120?img=45" },
    description: "Topper notes — covers full syllabus with diagrams.",
    shortDescription: "Complete syllabus + diagrams + quick revision sheets.",
    usedFor: "1 semester",
    itemAge: "Made in 2025",
    negotiable: true,
    pickupLocation: "Pickup near CS Department",
    department: "Computer Science",
    specs: ["Pages: ~140", "Includes: PYQs", "Format: handwritten"],
    tags: ["DSA", "Sem 3", "Topper notes"],
    availability: "Available",
    postedAgo: "1 week ago",
  },
  {
    id: "p7",
    title: "Sony WH-CH520 Wireless Headphones",
    price: 2800, originalPrice: 4499, category: "Gadgets", condition: "Like New",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Ishaan Verma", college: "IIIT Hyderabad", verified: true, rating: 4.8,
      avatar: "https://i.pravatar.cc/120?img=15" },
    description: "Used for 4 months. Excellent battery life.",
    shortDescription: "Lightweight, great battery. Perfect for classes and travel.",
    usedFor: "4 months",
    itemAge: "Bought in 2025",
    negotiable: true,
    pickupLocation: "Pickup near Cafeteria Block C",
    department: "IT",
    specs: ["Battery: 50h", "Bluetooth: 5.x", "Mic: built-in"],
    tags: ["Audio", "Wireless", "Sony"],
    availability: "Reserved",
    postedAgo: "2 days ago",
  },
  {
    id: "p8",
    title: "Foldable Study Table — Wood Finish",
    price: 950, category: "Furniture", condition: "Good",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Tanvi Patel", college: "MIT Manipal", verified: false, rating: 4.3,
      avatar: "https://i.pravatar.cc/120?img=22" },
    description: "Selling because moving out. Sturdy and clean.",
    shortDescription: "Sturdy foldable table. Fits hostel rooms easily.",
    usedFor: "1 year",
    itemAge: "Purchased in 2024",
    negotiable: true,
    pickupLocation: "Pickup near Girls Hostel",
    department: "Architecture",
    specs: ["Foldable: yes", "Material: engineered wood", "Size: medium"],
    tags: ["Hostel", "Furniture", "Study"],
    availability: "Available",
    postedAgo: "4 days ago",
  },
  {
    id: "p9",
    title: "Digital Multimeter — Lab Grade",
    price: 720, category: "Lab Equipment", condition: "Like New",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Rohan Das", college: "IIT Kharagpur", verified: true, rating: 4.9,
      avatar: "https://i.pravatar.cc/120?img=8" },
    description: "Used for 1 EE lab. Calibrated, pristine condition.",
    shortDescription: "Calibrated and clean. Great for EE labs.",
    usedFor: "1 lab",
    itemAge: "Bought this semester",
    negotiable: false,
    pickupLocation: "Pickup near EE Lab",
    department: "Electrical Engineering",
    specs: ["Accuracy: lab grade", "Leads: included", "Battery: new"],
    tags: ["Lab", "Multimeter", "EE"],
    availability: "Available",
    postedAgo: "12 hours ago",
  },
  {
    id: "p10",
    title: "iPad 9th Gen 64GB Wi-Fi + Apple Pencil",
    price: 19500, originalPrice: 33900, category: "Electronics", condition: "Good",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Sneha Rao", college: "NIT Surathkal", verified: true, rating: 4.7,
      avatar: "https://i.pravatar.cc/120?img=49" },
    description: "Perfect for note-taking. Comes with case and Pencil.",
    forRent: true, rentPerDay: 250,
    shortDescription: "Includes Pencil + case. Great for note-taking.",
    usedFor: "10 months",
    itemAge: "Bought in 2024",
    negotiable: true,
    pickupLocation: "Pickup near Admin Block",
    department: "Chemical Engineering",
    specs: ["Storage: 64GB", "Accessories: Pencil + case", "Condition: minor scratches"],
    tags: ["iPad", "Notes", "Apple Pencil"],
    availability: "Available",
    postedAgo: "1 day ago",
  },
  {
    id: "p11",
    title: "Resnick Halliday — Physics Vol. 1 & 2",
    price: 540, originalPrice: 1300, category: "Books", condition: "Good",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Aditya Joshi", college: "IIT Madras", verified: true, rating: 4.8,
      avatar: "https://i.pravatar.cc/120?img=11" },
    description: "Both volumes. Clean pages. Great for JEE & first-year physics.",
    shortDescription: "Both volumes set. Clean pages, strong binding.",
    usedFor: "1 year",
    itemAge: "Bought in 2024",
    negotiable: true,
    pickupLocation: "Pickup near Physics Department",
    department: "Engineering Physics",
    specs: ["Volumes: 2", "Binding: paperback", "Notes: minimal"],
    tags: ["Physics", "First year", "Core"],
    availability: "Available",
    postedAgo: "3 days ago",
  },
  {
    id: "p12",
    title: "Mini Refrigerator — 50L (Hostel Friendly)",
    price: 3800, originalPrice: 6800, category: "Hostel Essentials", condition: "Good",
    image: "https://images.unsplash.com/photo-1536353284924-9220c464e262?auto=format&fit=crop&w=900&q=70",
    seller: { name: "Kabir Shah", college: "BITS Goa", verified: true, rating: 4.6,
      avatar: "https://i.pravatar.cc/120?img=7" },
    description: "Compact, low power. Perfect for hostel rooms.",
    shortDescription: "Low power, compact. Keeps snacks and drinks chilled.",
    usedFor: "6 months",
    itemAge: "Bought in 2025",
    negotiable: false,
    pickupLocation: "Pickup near Hostel Block A",
    department: "MBA",
    specs: ["Capacity: 50L", "Power: low", "Noise: quiet"],
    tags: ["Hostel", "Appliance", "Mini fridge"],
    availability: "Available",
    postedAgo: "5 days ago",
  },
];

export const categories: { name: Category; count: number }[] = [
  { name: "Books", count: 312 },
  { name: "Gadgets", count: 184 },
  { name: "Notes", count: 421 },
  { name: "Electronics", count: 96 },
  { name: "Cycles", count: 58 },
  { name: "Hostel Essentials", count: 142 },
  { name: "Lab Equipment", count: 47 },
  { name: "Furniture", count: 73 },
];

export const testimonials = [
  { name: "Pranav S.", college: "IIT Delhi",
    quote: "Sold my old textbooks in 2 days. The verified-student badge made buyers trust me instantly.",
    avatar: "https://i.pravatar.cc/120?img=5" },
  { name: "Nikita J.", college: "BITS Pilani",
    quote: "I rented a cycle for the semester instead of buying one. Saved a fortune.",
    avatar: "https://i.pravatar.cc/120?img=32" },
  { name: "Aman G.", college: "VIT Vellore",
    quote: "The AI price suggestion was scary accurate. Listed and sold within 6 hours.",
    avatar: "https://i.pravatar.cc/120?img=17" },
];

export const conversations = [
  { id: "c1", name: "Aarav Mehta", lastMsg: "Sure, we can meet at the library at 5.",
    time: "2m", online: true, unread: 2, avatar: "https://i.pravatar.cc/120?img=12",
    product: "B.S. Grewal Maths" },
  { id: "c2", name: "Riya Sharma", lastMsg: "Is the MacBook still available?",
    time: "1h", online: true, unread: 0, avatar: "https://i.pravatar.cc/120?img=47",
    product: "MacBook Air M1" },
  { id: "c3", name: "Karthik R.", lastMsg: "Cool, I'll bring the calculator tomorrow.",
    time: "3h", online: false, unread: 0, avatar: "https://i.pravatar.cc/120?img=33",
    product: "Casio FX-991ES" },
  { id: "c4", name: "Meera Iyer", lastMsg: "Thanks! Leaving a review now.",
    time: "1d", online: false, unread: 0, avatar: "https://i.pravatar.cc/120?img=20",
    product: "Study Lamp" },
];

export const sampleMessages = [
  { from: "them", text: "Hey! Is the book still available?", time: "10:32" },
  { from: "me", text: "Yes it is — only one copy left though.", time: "10:33" },
  { from: "them", text: "Great! Can we meet today?", time: "10:34" },
  { from: "me", text: "Sure, library entrance at 5 PM works?", time: "10:35" },
  { from: "them", text: "Perfect. See you there 👍", time: "10:36" },
];

export type ItemRequest = {
  id: string;
  itemName: string;
  category: Category;
  budgetMin: number;
  budgetMax: number;
  condition: string;
  description: string;
  urgency: "Low" | "Medium" | "High" | "Urgent";
  campus: string;
  department: string;
  postedAgo: string;
  student: { name: string; avatar: string; verified: boolean };
};

export const itemRequests: ItemRequest[] = [
  {
    id: "r1",
    itemName: "Engineering Drawing Kit (Drafter Set)",
    category: "Lab Equipment",
    budgetMin: 200,
    budgetMax: 500,
    condition: "Good or better",
    description: "Need a complete drafter set with T-square, set squares, protractor and compass for ED lab starting next week.",
    urgency: "High",
    campus: "LNCT",
    department: "Mechanical",
    postedAgo: "20 min ago",
    student: { name: "Rahul Verma", avatar: "https://i.pravatar.cc/120?img=52", verified: true },
  },
  {
    id: "r2",
    itemName: "Hostel Room Cooler (Desert/Personal)",
    category: "Hostel Essentials",
    budgetMin: 1500,
    budgetMax: 3500,
    condition: "Any working condition",
    description: "Desperately need a portable cooler for the summer. My room doesn't have AC. Even a table fan works.",
    urgency: "Urgent",
    campus: "Technocrats",
    department: "CSE",
    postedAgo: "1 hour ago",
    student: { name: "Priya Nair", avatar: "https://i.pravatar.cc/120?img=44", verified: true },
  },
  {
    id: "r3",
    itemName: "Dell/HP 24\" Monitor (1080p)",
    category: "Electronics",
    budgetMin: 4000,
    budgetMax: 8000,
    condition: "Like New",
    description: "Looking for a decent external monitor for coding and design work. HDMI input preferred. No dead pixels.",
    urgency: "Medium",
    campus: "MANIT",
    department: "CSE",
    postedAgo: "3 hours ago",
    student: { name: "Arjun Khanna", avatar: "https://i.pravatar.cc/120?img=18", verified: true },
  },
  {
    id: "r4",
    itemName: "DSA + OS Handwritten Notes (Sem 4)",
    category: "Notes",
    budgetMin: 80,
    budgetMax: 250,
    condition: "Any",
    description: "Need topper notes for Data Structures and Operating Systems. Diagrams and PYQ solutions preferred.",
    urgency: "High",
    campus: "SIRT",
    department: "CSE",
    postedAgo: "45 min ago",
    student: { name: "Kavya Joshi", avatar: "https://i.pravatar.cc/120?img=41", verified: false },
  },
  {
    id: "r5",
    itemName: "Casio FX-991EX Scientific Calculator",
    category: "Gadgets",
    budgetMin: 400,
    budgetMax: 800,
    condition: "Good",
    description: "My calculator broke before exams. Need a replacement ASAP. Casio EX or ES Plus model preferred.",
    urgency: "Urgent",
    campus: "RGPV",
    department: "ECE",
    postedAgo: "30 min ago",
    student: { name: "Siddharth Rao", avatar: "https://i.pravatar.cc/120?img=60", verified: true },
  },
  {
    id: "r6",
    itemName: "Foldable Study Table",
    category: "Furniture",
    budgetMin: 500,
    budgetMax: 1200,
    condition: "Good or better",
    description: "Need a compact foldable study table for my hostel room. Wood or metal frame, doesn't matter. Must fit near bed.",
    urgency: "Low",
    campus: "Oriental",
    department: "MBA",
    postedAgo: "5 hours ago",
    student: { name: "Nisha Agarwal", avatar: "https://i.pravatar.cc/120?img=25", verified: true },
  },
];
