import React, { useState, useEffect, useRef } from 'react'
import { 
  Calendar as CalendarIcon, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  X, 
  Search, 
  Sparkles, 
  Menu,
  Check,
  Star,
  Award,
  ChevronRight,
  Users,
  DollarSign,
  TrendingUp,
  BookOpen,
  Fingerprint,
  Cpu,
  Cigarette
} from 'lucide-react'

// Doctor list
const DOCTORS = [
  { n: "ჯენი ფირცხალავა", s: "ბავშვთა სტომატოლოგია · თერაპია · კონსულტაცია" },
  { n: "ანი ჩოგოვაძე", s: "იმპლანტოლოგია · ყბა-სახის ქირურგია · კონსულტაცია" },
  { n: "დიმიტრი გვარჯალაძე", s: "თერაპია · ორთოდონტია · კონსულტაცია" },
  { n: "ნატო შენგელია", s: "ბავშვთა სტომატოლოგია · კონსულტაცია" },
  { n: "ლიკა დავლიანიძე", s: "ყბა-სახის ქირურგია · ქირურგია / ყბა-სახე · კონსულტაცია" },
  { n: "ოთარ ჩაკვეტაძე", s: "თერაპია · პაროდონტოლოგია · კონსულტაცია" },
  { n: "შორენა შიოშვილი", s: "ბავშვთა სტომატოლოგია · თერაპია · კონსულტაცია" },
  { n: "ანა ოყუჯავა", s: "თერაპია · ქირურგია / ყბა-სახე · კონსულტაცია" },
  { n: "თეა ბერიძე", s: "ბავშვთა სტომატოლოგია · თერაპია · კონსულტაცია" },
  { n: "თამარ ჩაფიძე", s: "ბავშვთა სტომატოლოგია · თერაპია · კონსულტაცია" },
  { n: "მეგი ფუტკარაძე", s: "თერაპია · ესთეტიკური სტომატოლოგია · კონსულტაცია" },
  { n: "აზა ჯიქია", s: "ასისტენტი · კონსულტაცია" },
  { n: "ქეთევან სურმავა", s: "ასისტენტი · კონსულტაცია" },
  { n: "მარიამ ნამიჩეიშვილი", s: "ასისტენტი · კონსულტაცია" }
]

// Gradient list for doctor avatars
const GRADS = [
  "linear-gradient(135deg, #007AFF, #0056B3)",
  "linear-gradient(135deg, #34C759, #28A745)",
  "linear-gradient(135deg, #AF52DE, #8E44AD)",
  "linear-gradient(135deg, #FF9500, #E67E22)"
]


const BOT_RESPONSES_EN = {
  welcome: 'Hello! I am SmileBot. How can I help you today? Choose a question or write to us:',
  services: 'At Smile Agency we offer full dental services: Therapy (caries treatment), Orthopedics (prosthetics, crowns), Orthodontics (braces, aligner alignment), Surgery and Implantation, Periodontology, and Digital X-ray. For detailed info, visit the Services section.',
  prices: 'The clinic has affordable prices. Consultation is free when compiling an implant and prosthetics treatment plan. Detailed prices are determined during the visit.',
  contact: 'The clinic is located at 14 Meliton and Andria Balanchivadze St, Tbilisi. Working hours: Mon - Sat: 9:00-22:00 · Sun: 11:00-18:00. Phone: 555 58 53 56.'
};

const BOT_RESPONSES = {
  welcome: 'გამარჯობა! მე ვარ SmileBot. რით შემიძლია დაგეხმაროთ დღეს? აირჩიეთ კითხვა ან მოგვწერეთ:',
  services: 'ღიმილის სააგენტოში გთავაზობთ სრულ სტომატოლოგიურ მომსახურებას: თერაპია (კარიესის მკურნალობა), ორთოპედია (პროთეზირება, გვირგვინები), ორთოდონტია (ბრეკეტები, ელაინერებით სწორება), ქირურგია და იმპლანტაცია, პაროდონტოლოგია და ციფრული რენტგენოგრაფია. დეტალური ინფორმაციისთვის შეგიძლიათ ეწვიოთ საიტზე სერვისების განყოფილებას.',
  prices: 'კლინიკაში მოქმედებს ხელმისაწვდომი ფასები. კონსულტაცია უფასოა იმპლანტაციისა და პროტეზირების მკურნალობის გეგმის შედგენისას. დეტალური ფასები განისაზღვრება ექიმთან ვიზიტისას.',
  contact: 'კლინიკა მდებარეობს თბილისში, მელიტონ და ანდრია ბალანჩივაძეების ქ. 14. სამუშაო საათები: ორშ – შაბ: 9:00–22:00 · კვ: 11:00–18:00. ტელეფონი: 555 58 53 56.'
}



const getServiceDetailTranslated = (activeDetail, currentLang) => {
  if (!activeDetail) return null;
  if (currentLang === 'ka') return activeDetail;
  const enDetail = SERVICES_DETAILS_EN[activeDetail.key];
  if (enDetail) {
    return { ...enDetail, key: activeDetail.key };
  }
  return activeDetail;
};

const getEnamelDetailTranslated = (activeDetail, currentLang) => {
  if (!activeDetail) return null;
  if (currentLang === 'ka') return activeDetail;
  const enDetail = ENAMEL_DETAILS_EN[activeDetail.key];
  if (enDetail) {
    return { ...enDetail, key: activeDetail.key };
  }
  return activeDetail;
};

const getDoctorSpecialty = (s) => {
  return s
    .replace(/ბავშვთა სტომატოლოგია/g, "Pediatric Dentistry")
    .replace(/თერაპია/g, "Therapy")
    .replace(/კონსულტაცია/g, "Consultation")
    .replace(/იმპლანტოლოგია/g, "Implantology")
    .replace(/ყბა-სახის ქირურგია/g, "Maxillofacial Surgery")
    .replace(/ორთოდონტია/g, "Orthodontics")
    .replace(/ქირურგია \/ ყბა-სახე/g, "Surgery / Maxillofacial")
    .replace(/ქირურგია/g, "Surgery")
    .replace(/პაროდონტოლოგია/g, "Periodontology")
    .replace(/ესთეტიკური სტომატოლოგია/g, "Aesthetic Dentistry")
    .replace(/ასისტენტი/g, "Assistant");
};

const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHS = ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"]
const WDS = ["ორ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ", "კვ"]
const TIMES = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]



const SERVICES_DETAILS_EN = {
  therapy: {
    title: "Therapy",
    desc: "Therapeutic treatment includes caries prevention, diagnosis, and dental restoration using modern filling materials.",
    subs: [
      { title: "Caries Treatment", text: "Restoration of hard dental tissues using high-quality composite fillings (Asteria, Estelite, Gradia)." },
      { title: "Aesthetic Restoration", text: "High-precision restoration of natural anatomical tooth shape and aesthetics." },
      { title: "Professional Cleaning", text: "Plaque and dental calculus removal using ultrasound and Air-Flow device." }
    ]
  },
  orthopedics: {
    title: "Orthopedics",
    desc: "Orthopedics is a dentistry branch focusing on diagnosis and treatment of jaw/dental system functional disorders via prosthetics.",
    subs: [
      { title: "Ceramic Veneers", text: "Veneers are thin porcelain plates (0.3-0.5 mm) bonded to the front tooth surface." },
      { title: "Veneer 360 (Crown)", text: "Complete coverage of all tooth surfaces for maximum protection." },
      { title: "Ceramic Inlay", text: "Porcelain filling fabricated in the laboratory." }
    ]
  },
  orthodontics: {
    title: "Orthodontics",
    desc: "Orthodontics corrects tooth alignment using braces, aligners, and other specialized appliances.",
    subs: [
      { title: "Braces", text: "Metal, ceramic, and sapphire bracket systems." },
      { title: "Aligners", text: "Teeth straightening using comfortable, clear transparent aligner trays." }
    ]
  },
  surgery: {
    title: "Surgery",
    desc: "Surgical dentistry covers painless tooth extraction, root resection, and other outpatient oral surgeries.",
    subs: [
      { title: "Tooth Extraction", text: "Simple and complex extractions under modern local anesthesia." },
      { title: "Wisdom Tooth Removal", text: "Atraumatic extraction of impacted and displaced wisdom teeth." }
    ]
  },
  pediatrics: {
    title: "Pediatric Dentistry",
    desc: "Our clinic pays special attention to young patients. Prevention of early childhood caries is our top priority.",
    subs: [
      { title: "Early Caries", text: "Prevention of early childhood caries and painless treatments." },
      { title: "Prevention", text: "Brushing teeth is recommended from the arrival of the very first tooth." }
    ]
  },
  maxillofacial: {
    title: "Maxillofacial Surgery",
    desc: "Oral and maxillofacial surgery includes complex surgical interventions and extractions of all difficulty levels.",
    subs: [
      { title: "Complex Surgeries", text: "Complex oral/maxillofacial operations and pre-implantation plastic preparation." },
      { title: "Sinus Lift", text: "Lifting the maxillary sinus floor and increasing bone volume for implantation." }
    ]
  },
  endodontics: {
    title: "Endodontics",
    desc: "Endodontics covers root canal treatment and rehabilitation using advanced modern technologies.",
    subs: [
      { title: "Root Canal Treatment", text: "Cleaning, shaping, and hermetic filling of root canals." },
      { title: "Rehabilitation", text: "Restoring and preserving damaged root canal systems." }
    ]
  },
  aesthetics: {
    title: "Aesthetic Dentistry",
    desc: "Dental aesthetics involves artistic smile design and restoring the natural beauty of your teeth.",
    subs: [
      { title: "Smile Design", text: "Artistic creation of a personalized, beautiful smile." },
      { title: "Teeth Whitening", text: "Teeth whitening using safe, modern clinical methods." }
    ]
  },
  implantology: {
    title: "Implantology",
    desc: "A dental implant is the most advanced modern method for replacing a missing tooth.",
    subs: [
      { title: "Implantation", text: "Dental implantation using leading world brands (Israel, Germany, Switzerland, Korea)." },
      { title: "Advantages", text: "Natural appearance and fully restored chewing function." }
    ]
  },
  periodontology: {
    title: "Periodontology",
    desc: "Periodontology includes the treatment of gum diseases and professional oral hygiene maintenance.",
    subs: [
      { title: "Gum Treatment", text: "Prevention and treatment of inflammatory periodontal diseases." },
      { title: "Hygiene", text: "Professional hygienic cleaning, scale removal, and polishing." }
    ]
  }
};


const ENAMEL_DETAILS_EN = {
  sweets: {
    title: "Sweets & Chocolate",
    damage: "When consuming sweets, bacteria in the mouth feed on sugar and release aggressive acids. These acids attack the tooth enamel, causing its demineralization (loss of minerals) and eventually leading to tooth decay.",
    tip: "Be sure to rinse your mouth with warm water after eating sweets to wash away residual sugars. Brushing teeth is recommended 30 minutes after eating, as brushing enamel weakened by acid can damage it immediately."
  },
  smoking: {
    title: "Smoking",
    damage: "Nicotine and tar in tobacco smoke immediately stick to the enamel surface, giving teeth a yellow or brown tint. Additionally, nicotine constricts blood vessels in the gums, leading to periodontitis, tooth mobility, and dry mouth.",
    tip: "The best solution is to quit smoking. To maintain tooth color and gum health, professional cleaning is necessary twice a year using ultrasonic scalers and the Air-Flow system in our clinic."
  },
  coffee: {
    title: "Coffee & Tea",
    damage: "Coffee and tea are rich in organic pigments - tannins. Tannins easily penetrate the microscopic pores of the tooth enamel and cause persistent pigmentation (darkening) of teeth. Also, the acids and hot temperature weaken the enamel.",
    tip: "Try drinking coffee or tea with a straw to minimize liquid contact with teeth. Rinse your mouth with water 15-20 minutes after drinking."
  }
};

const DOCTORS_DETAILS_EN = {
  "ani-chogovadze": {
    name: "Ani Chogovadze",
    role: "Head of Clinic / Implantologist",
    specialization: "Dental implantation, maxillofacial surgery, complex oral rehabilitation.",
    education: "Higher medical education, certified implantologist.",
    bio: "Head of the clinic and lead implantologist. Dedicated to implementing the highest standards of treatment."
  },
  "dimitri-gvarjaladze": {
    name: "Dimitri Gvarjaladze",
    role: "Therapist / Orthodontist",
    specialization: "Therapeutic treatment, orthodontics, primary emergency care.",
    education: "Faculty of Stomatology, Tbilisi State Medical University (2011-2016).\nResidency (Pediatric and Adult Therapy): Unident (2017-2018).\nOral Surgery: Dentiveri XXI Residency (2024).",
    bio: "• Dr. Karol Babinski 'From Stress to Success' (2023)\n• 61th Edsa meeting, Amsterdam (2018)\n• Dr. Sergey Radlinsky 'Biomechanic of Teeth' (2017)"
  },
  "nato-shengelia": {
    name: "Nato Shengelia",
    role: "Pediatric Dentist",
    specialization: "Pediatric and adolescent therapeutic dentistry, preventive procedures.",
    education: "Higher medical education, specialized courses in pediatric dentistry.",
    bio: "Known for an exceptional psychological approach to children, making dental treatment comfortable for young patients."
  },
  "lika-davlianidze": {
    name: "Lika Davlianidze",
    role: "Maxillofacial Surgeon / Manager",
    specialization: "Maxillofacial surgery, clinical management.",
    education: "Higher medical education in maxillofacial surgery.",
    bio: "Clinic manager and maxillofacial surgeon. Ensures smooth administrative and medical operations of the clinic."
  },
  "otar-chakvetadze": {
    name: "Otar Chakvetadze",
    role: "Therapist / Periodontologist",
    specialization: "Gum disease treatment, periodontal therapy.",
    education: "Higher medical education, residency in therapeutic dentistry.",
    bio: "Dr. Otar Chakvetadze helps patients effectively manage periodontitis and other gum issues."
  },
  "shorena-shioshvili": {
    name: "Shorena Shioshvili",
    role: "Pediatric and Adolescent Therapist",
    specialization: "Pediatric and adolescent therapy, treatment with microscope, aesthetic restorations.",
    education: "Specialization course in pediatric dentistry (2019).\nTSMU Stomatological Faculty (2005).\nTSMU Faculty of Translator-Referent - German Language (2004).\nResidency at State Medical Academy of Georgia (2005-2006).\nGoethe Institute (2006).",
    bio: "• Pediatric Dentistry Association Congress (2019)\n• Direct Restoration - Kaplan Sheudzhen (2020)\n• Direct Aesthetic Restorations - Dr. Tea Chubinidze (2022)\n• Effective Problem Solving In Endodontics (2023)\n• Practical Endodontics in Yerevan - Dr. Arnaldo Castellucci (2024)\n• Aesthetic Dentistry with Dr. Shiraz Khan (2025)\n• Microscope Hands-on Course - New Vision University (2025)"
  },
  "ana-okujava": {
    name: "Ana Oqujava",
    role: "Therapist / Surgeon",
    specialization: "Oral therapy, primary surgical care.",
    education: "Residency in Oral Surgery - Dentiveri (2023-2024).\nResidency in Therapeutic Dentistry - Unident (2022-2023).\nStomatology Program, Faculty of Medicine - Caucasus International University (2017-2021).",
    bio: "• Human Rights in Dental Practice (2024)\n• Integration of color and morphology (2025)\n• Emergency management in pediatric dentistry (2025)\n• First Aid training course (2024)"
  },
  "tea-beridze": {
    name: "Tea Beridze",
    role: "Pediatric and Adolescent Therapist",
    specialization: "Pediatric and adolescent therapy",
    education: "Higher medical education, residency in therapeutic dentistry.",
    bio: "Distinguished by extensive experience in treating children and teenagers."
  },
  "jenny-firtskhalava": {
    name: "Jenny Pirtskhalava",
    role: "Pediatric and Adolescent Therapist",
    specialization: "Therapeutic dentistry, pediatric therapy, periodontology.",
    education: "Medical College - Nursing (2004-2007).\nTbilisi Medical Teaching University 'Hippocrates' - Stomatology (2007-2012).\nResidency in Therapeutic Dentistry (2012-2013).\nResidency in Oral Surgery (2016).\nPractical Phyxology - IDC (2019-2020).\nPediatric Therapeutic Dentistry (2020-2021).\nInjection Cosmetology - Genesis Training Center (2019-2020).\nPeriodontology - Peri-Implant Studio.\nComputer Phyxotherapy - IDC (2022-2023).",
    bio: "Possesses versatile experience in pediatric and adolescent therapy, rubber dam application, and periodontal treatment."
  },
  "tamar-chafidze": {
    name: "Tamar Chapidze",
    role: "Pediatric and Adolescent Therapist",
    specialization: "Therapeutic dentistry, oral hygiene.",
    education: "Specialized courses in pediatric and adolescent dentistry.",
    bio: "Distinguished by great patience and a warm approach in treating pediatric oral therapeutic issues."
  },
  "megi-futkaradze": {
    name: "Megi Futkaradze",
    role: "Therapist / Aesthetic Dentist",
    specialization: "Aesthetic dentistry, root canal treatment.",
    education: "Higher medical education in stomatology.",
    bio: "Specializes in aesthetic restorations and endodontic root canal treatment."
  },
  "aza-jiqia": {
    name: "Aza Jikia",
    role: "Assistant",
    specialization: "Nursing support, hygiene control.",
    education: "Medical education in nursing.",
    bio: "Assists doctors during various procedures and ensures patient comfort."
  },
  "ketevan-surmava": {
    name: "Ketevan Surmava",
    role: "Assistant",
    specialization: "Dentist assistant, instrument sterilization.",
    education: "Relevant professional education.",
    bio: "Ensures full readiness of the cabinet and nursing support during treatment."
  },
  "mariam-namicheishvili": {
    name: "Mariam Namicheishvili",
    role: "Assistant",
    specialization: "Dentist assistant, cabinet organization.",
    education: "Professional education in nursing.",
    bio: "Assists doctors during treatment and is responsible for work environment cleanliness."
  }
};

const DOCTORS_DETAILS = {
  "ani-chogovadze": {
    name: "ანი ჩოგოვაძე",
    role: "კლინიკის ხელმძღვანელი / იმპლანტოლოგი",
    image: "https://i.postimg.cc/43MvFkpR/image.jpg",
    specialization: "დენტალური იმპლანტაცია, ყბა-სახის ქირურგია, პირის ღრუს კომპლექსური რეაბილიტაცია.",
    education: "უმაღლესი სამედიცინო განათლება, დიპლომირებული იმპლანტოლოგი.",
    bio: "კლინიკის ხელმძღვანელი და წამყვანი იმპლანტოლოგი. ზრუნავს მკურნალობის უმაღლესი სტანდარტების დანერგვაზე."
  },
  "dimitri-gvarjaladze": {
    name: "დიმიტრი გვარჯალაძე",
    role: "თერაპევტი / ორთოდონტი",
    image: "https://i.postimg.cc/wT0mGYpz/34.png",
    specialization: "თერაპიული მკურნალობა, ორთოდონტია, პირველადი გადაუდებელი დახმარება.",
    education: "სტომატოლოგიის ფაკულტეტი, თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი (2011-2016).\nრეზიდენტურა (ბავშვთა და მოზრდილთა თერაპია): უნიდენტი (2017-2018).\nპირის ღრუს ქირურგია: დენტივერი XXI რეზიდენტურა (2024).",
    bio: "• Dr. Karol Babinski 'From Stress to Success' (2023)\n• 61th Edsa meeting, Amsterdam (2018)\n• Dr. Sergey Radlinsky 'Biomechanic of Teeth' (2017)"
  },
  "nato-shengelia": {
    name: "ნატო შენგელია",
    role: "ბავშვთა სტომატოლოგი",
    image: "https://i.postimg.cc/y6nxVhrB/66.png",
    specialization: "ბავშვთა და მოზარდთა თერაპიული სტომატოლოგია, პრევენციული პროცედურები.",
    education: "უმაღლესი სამედიცინო განათლება, პედიატრიული სტომატოლოგიის სპეციალიზებული კურსები.",
    bio: "გამოირჩევა ბავშვებთან განსაკუთრებული ფსიქოლოგიური მიდგომით, რაც სტომატოლოგიურ მკურნალობას კომფორტულს ხდის პატარა პაციენტებისთვის."
  },
  "lika-davlianidze": {
    name: "ლიკა დავლიანიძე",
    role: "ყბა-სახის ქირურგი / მენეჯერი",
    image: "https://i.postimg.cc/504JGTJn/6266.png",
    specialization: "ყბა-სახის ქირურგია, კლინიკური მენეჯმენტი.",
    education: "უმაღლესი სამედიცინო განათლება ყბა-სახის ქირურგიის მიმართულებით.",
    bio: "კლინიკის მენეჯერი და ყბა-სახის ქირურგი. უზრუნველყოფს კლინიკის შეუფერხებელ ადმინისტრაციულ და სამედიცინო მუშაობას."
  },
  "otar-chakvetadze": {
    name: "ოთარ ჩაკვეტაძე",
    role: "თერაპევტი / პაროდონტოლოგი",
    image: "https://i.postimg.cc/gkSK6Zrr/5155555.png",
    specialization: "ღრძილების დაავადებების მკურნალობა, პაროდონტის თერაპია.",
    education: "უმაღლესი სამედიცინო განათლება, რეზიდენტურა თერაპიულ სტომატოლოგიაში.",
    bio: "ექიმი ოთარ ჩაკვეტაძე ეხმარება პაციენტებს პაროდონტიტისა და სხვა ღრძილოვანი პრობლემების ეფექტურად მართვაში."
  },
  "shorena-shioshvili": {
    name: "შორენა შიოშვილი",
    role: "ბავშვთა და მოზარდთა თერაპევტი",
    image: "https://i.postimg.cc/8zLjg22y/Untitled-1-Recovered.jpg",
    specialization: "ბავშვთა და მოზარდთა თერაპია, მიკროსკოპით მკურნალობა, ესთეტიკური რესტავრაციები.",
    education: "სპეციალიზაციის კურსი პედიატრიულ სტომატოლოგიაში (2019).\nქ.თბილისის სახელმწიფო-სამედიცინო უნივერსიტეტის სტომატოლოგიური ფაკულტეტი (2005).\nთბილისის სახელმწიფო-სამედიცინო უნივერსიტეტის მთარგმნელ-რეფერანტის ფაკულტეტი - გერმანული ენა (2004).\nსაქართველოს სახელმწიფო-სამედიცინო აკადემიის რეზიდენტურა (2005-2006).\nგოეთეს ინსტიტუტი (2006).",
    bio: "• Pediatric Dentistry Association Congress (2019)\n• Direct Restoration - Kaplan Sheudzhen (2020)\n• Direct Aesthetic Restorations - Dr. Tea Chubinidze (2022)\n• Effective Problem Solving In Endodontics (2023)\n• Practical Endodontics in Yerevan - Dr. Arnaldo Castellucci (2024)\n• Aesthetic Dentistry with Dr. Shiraz Khan (2025)\n• Microscope Hands-on Course - New Vision University (2025)"
  },
  "ana-okujava": {
    name: "ანა ოყუჯავა",
    role: "თერაპევტი / ქირურგი",
    image: "https://i.postimg.cc/YC2qTvxW/Untitled-2.png",
    specialization: "პირის ღრუს თერაპია, პირველადი ქირურგიული დახმარება.",
    education: "პირის ღრუს ქირურგიის რეზიდენტურა - დენტივერი (2023-2024).\nთერაპიული სტომატოლოგიის რეზიდენტურა - უნიდენტი (2022-2023).\nმედიცინის ფაკულტეტის სტომატოლოგიის პროგრამა - კავკასიის საერთაშორისო უნივერსიტეტი (2017-2021).",
    bio: "• ადამიანის უფლებები სტომატოლოგიურ პრაქტიკაში (2024)\n• Integration of color and morphology (2025)\n• გადაუდებელი მდგომარეობის მართვა პედიატრიულ სტომატოლოგიაში (2025)\n• პირველადი გადაუდებელი დახმარების შემსწავლელი კურსი (2024)"
  },
  "tea-beridze": {
    name: "თეა ბერიძე",
    role: "ბავშვთა და მოზარდთა თერაპევტი",
    image: "https://i.postimg.cc/SQw90fXV/Untitled-1-Recovered.png",
    specialization: "ბავშვთა და მოზარდთა თერაპევტი",
    education: "უმაღლესი სამედიცინო განათლება, რეზიდენტურა თერაპიულ სტომატოლოგიაში.",
    bio: "გამოირჩევა დიდი გამოცდილებით ბავშვთა და მოზარდთა მკურნალობაში."
  },
  "jenny-firtskhalava": {
    name: "ჯენი ფირცხალავა",
    role: "ბავშვთა და მოზარდთა თერაპევტი",
    image: "https://i.postimg.cc/TYJgg9Mj/646155281-4364040750537479-3140880621018257445-n.jpg",
    specialization: "თერაპიული სტომატოლოგია, ბავშვთა თერაპია, პაროდონტოლოგია.",
    education: "სამედიცინო კოლეჯი - საექთნო საქმე (2004-2007).\nთბილისის სამედიცინო სასწავლო უნივერსიტეტი „ჰიპოკრატე“ - სტომატოლოგია (2007-2012).\nრეზიდენტურა თერაპიულ სტომატოლოგიაში (2012-2013).\nრეზიდენტურა პირის ღრუს ქირურგიაში (2016).\nპრაქტიკული ფიქსოლოგია - IDC (2019-2020).\nბავშვთა თერაპიული სტომატოლოგია (2020-2021).\nინექციური კოსმეტოლოგია - Genesis Training Center (2019-2020).\nპაროდონტოლოგია - Peri-Implant Studio.\nკომპიუტერული ფიქსოთერაპია - IDC (2022-2023).",
    bio: "ფლობს მრავალმხრივ გამოცდილებას ბავშვთა და მოზარდთა თერაპიაში, კოფერდამის სისტემის გამოყენებასა და პაროდონტოლოგიურ მკურნალობაში."
  },
  "tamar-chafidze": {
    name: "თამარ ჩაფიძე",
    role: "ბავშვთა და მოზარდთა თერაპევტი",
    image: "https://i.postimg.cc/9fzK72WX/77373.png",
    specialization: "თერაპიული სტომატოლოგია, პირის ღრუს ჰიგიენა.",
    education: "სპეციალიზებული კურსები ბავშვთა და მოზარდთა სტომატოლოგიაში.",
    bio: "გამოირჩევა დიდი მოთმინებითა და თბილი მიდგომით ბავშვთა პირის ღრუს თერაპიული პრობლემების მკურნალობისას."
  },
  "megi-futkaradze": {
    name: "მეგი ფუტკარაძე",
    role: "თერაპევტი / ესთეტიკური სტომატოლოგი",
    image: "https://i.postimg.cc/cLmZ4kpH/KT7A1188.jpg",
    specialization: "ესთეტიკური სტომატოლოგია, არხების მკურნალობა.",
    education: "უმაღლესი სამედიცინო განათლება სტომატოლოგიის მიმართულებით.",
    bio: "სპეციალიზებულია მხატვრულ რესტავრაციასა და არხების ენდოდონტიურ მკურნალობაზე."
  },
  "aza-jiqia": {
    name: "აზა ჯიქია",
    role: "ასისტენტი",
    image: "https://i.postimg.cc/Kc7q4jnB/632636.png",
    specialization: "საექთნო მხარდაჭერა, ჰიგიენური ნორმების კონტროლი.",
    education: "სამედიცინო განათლება საექთნო საქმის მიმართულებით.",
    bio: "ეხმარება ექიმებს სხვადასხვა მანიპულაციების დროს და ზრუნავს პაციენტის კომფორტზე."
  },
  "ketevan-surmava": {
    name: "ქეთევან სურმავა",
    role: "ასისტენტი",
    image: "https://i.postimg.cc/kGjW80J0/7373737.jpg",
    specialization: "სტომატოლოგის ასისტენტი, ხელსაწყოების სტერილიზაცია.",
    education: "შესაბამისი პროფესიული განათლება.",
    bio: "უზრუნველყოფს კაბინეტის სრულ მზადყოფნას და საექთნო მხარდაჭერას მკურნალობის პროცესში."
  },
  "mariam-namicheishvili": {
    name: "მარიამ ნამიჩეიშვილი",
    role: "ასისტენტი",
    image: "https://i.postimg.cc/Vk2pnT5f/74777.jpg",
    specialization: "სტომატოლოგის ასისტენტი, კაბინეტის ორგანიზება.",
    education: "პროფესიული განათლება საექთნო საქმის მიმართულებით.",
    bio: "ეხმარება ექიმებს მკურნალობის პროცესში და პასუხისმგებელია სამუშაო გარემოს სისუფთავეზე."
  }
}

const getDoctorDetailsByName = (name, currentLang = 'ka') => {
  const cleanName = name.replace(/\s+/g, '').toLowerCase();
  let foundKey = null;
  for (const key of Object.keys(DOCTORS_DETAILS)) {
    const doc = DOCTORS_DETAILS[key];
    const docCleanName = doc.name.replace(/\s+/g, '').toLowerCase();
    if (docCleanName === cleanName) {
      foundKey = key;
      break;
    }
  }
  if (!foundKey) {
    for (const key of Object.keys(DOCTORS_DETAILS_EN)) {
      const doc = DOCTORS_DETAILS_EN[key];
      const docCleanName = doc.name.replace(/\s+/g, '').toLowerCase();
      if (docCleanName === cleanName) {
        foundKey = key;
        break;
      }
    }
  }
  if (foundKey) {
    if (currentLang === 'ka') {
      return { ...DOCTORS_DETAILS[foundKey], key: foundKey };
    } else {
      return { ...DOCTORS_DETAILS_EN[foundKey], image: DOCTORS_DETAILS[foundKey].image, key: foundKey };
    }
  }
  return null;
}

const playClickSound = () => {
  try {
    const audio = new Audio(`${import.meta.env.BASE_URL}click.mp3`);
    audio.volume = 0.25;
    audio.play().catch(() => {});
  } catch (e) {
    // Silently catch autoplay/activation blocks
  }
}

const ENAMEL_DETAILS = {
  sweets: {
    title: "შოკოლადი & ტკბილეული",
    damage: "ტკბილეულის მიღებისას პირის ღრუში არსებული ბაქტერიები იკვებებიან შაქრით და გამოყოფენ აგრესიულ მჟავებს. ეს მჟავები უტევს კბილის ემალს, იწვევს მის დემინერალიზაციას (მინერალების დაკარგვას) და დროთა განმავლობაში აჩენს კარიესს.",
    tip: "ტკბილეულის მიღების შემდეგ აუცილებლად გამოივლეთ თბილი წყალი, რათა ჩამოირეცხოს შაქრის ნარჩენები. კბილების გახეხვა რეკომენდებულია ჭამიდან 30 წუთის შემდეგ, რადგან მჟავით დასუსტებული ემალის გახეხვა მყისვე აზიანებს მას."
  },
  smoking: {
    title: "მოწევა",
    damage: "თამბაქოს კვამლში შემავალი ნიკოტინი და ფისები (ტარი) მყისიერად ეკვრის ემალის ზედაპირს, რის გამოც კბილები იღებს ყვითელ ან ყავისფერ ელფერს. გარდა ამისა, ნიკოტინი ავიწროებს სისხლძარღვებს ღრძილებში, რაც იწვევს პაროდონტიტს, კბილების მორყევას და პირის ღრუს სიმშრალეს.",
    tip: "საუკეთესო გამოსავალი თამბაქოსთვის თავის დანებებაა. კბილის ფერისა და ღრძილების სიჯანსაღის შესანარჩუნებლად აუცილებელია წელიწადში ორჯერ პროფესიული წმენდა კლინიკაში ულტრაბგერითი სკალერითა და Air-Flow სისტემით."
  },
  coffee: {
    title: "ყავა & ჩაი",
    damage: "ყავა და ჩაი მდიდარია ორგანული საღებავებით - ტანინებით. ტანინები მარტივად აღწევს კბილის ემალის მიკროსკოპულ ფორებში და იწვევს კბილების მდგრად პიგმენტაციას (გამუქებას). ასევე, მათში შემავალი მჟავები და ცხელი ტემპერატურა ასუსტებს მინანქარს.",
    tip: "შეეცადეთ ყავა ან ჩაი მიირთვათ საწრუპით, რათა მინიმუმამდე დაიყვანოთ სითხის კონტაქტი კბილებთან. დალევიდან 15-20 წუთში კი გამოივლეთ წყალი პირის ღრუში."
  }
}

const SERVICES_DETAILS = {
  therapy: {
    title: "თერაპია",
    desc: "თერაპიული მკურნალობა მოიცავს კარიესის პრევენციას, დიაგნოსტიკასა და კბილების რესტავრაციას თანამედროვე ბჟენებით.",
    subs: [
      { title: "კარიესის მკურნალობა", text: "კბილის მაგარი ქსოვილის აღდგენა უმაღლესი ხარისხის ჰელიობჟენებით (Asteria, Estelite, Gradia)." },
      { title: "მხატვრული რესტავრაცია", text: "კბილის ბუნებრივი ანატომიური ფორმისა და ესთეტიკის აღდგენა მაღალი სიზუსტით." },
      { title: "პროფესიული წმენდა", text: "ქვებისა და ნადების მოცილება ულტრაბგერითა და Air-Flow აპარატით." }
    ]
  },
  orthopedics: {
    title: "ორთოპედია",
    desc: "ორთოპედია სტომატოლოგიის მიმართულებაა, რომელიც გულისხმობს ყბა-სახისა და კბილთა სისტემის ჯანსაღი ფუნქციის დარღვევის დიაგნოსტიკას და მკურნალობას პროტეზირების საშუალებით.",
    subs: [
      { title: "კერამიკული ვინირები", text: "ვინირები წარმოადგენს ფაიფურის თხელ ფირფიტებს 0.3-0.5 მმ სისქის, რომლებიც მაგრდება კბილის წინა ზედაპირზე." },
      { title: "ვინირი 360 (გვირგვინი)", text: "იფარება კბილის მთლიანი ზედაპირი ყველა მხრიდან მაქსიმალური დაცვისთვის." },
      { title: "კერამიკული ჩანართი", text: "ფაიფურის ბჟენი, რომელიც მზადდება ლაბორატორიაში." }
    ]
  },
  orthodontics: {
    title: "ორთოდონტია",
    desc: "ორთოდონტია ემსახურება კბილების განლაგების კორექციას ბრეკეტების, კაპების და სხვა აპარატების საშუალებით.",
    subs: [
      { title: "ბრეკეტები", text: "მეტალის, კერამიკული და საფირის ბრეკეტ სისტემები." },
      { title: "ელაინერები", text: "კბილების გასწორება გამჭვირვალე კაპების საშუალებით." }
    ]
  },
  surgery: {
    title: "ქირურგია",
    desc: "ქირურგიული სტომატოლოგია მოიცავს კბილის ამოღებას (ექსტრაქციას), რეზექციას და სხვადასხვა ამბულატორიულ ოპერაციას მაქსიმალური უმტკივნეულობით.",
    subs: [
      { title: "კბილის ამოღება", text: "მარტივი და რთული ექსტრაქცია თანამედროვე ანესთეზიით." },
      { title: "სიბრძნის კბილის ამოღება", text: "რეტინირებული და დისტოპირებული სიბრძნის კბილების ატრავმული ამოღება." }
    ]
  },
  pediatrics: {
    title: "ბავშვთა სტომატოლოგია",
    desc: "ჩვენი კლინიკა განსაკუთრებულ ყურადღებას უთმობს პატარა პაციენტებს. ადრეული ბავშვობის კარიესის პრევენცია ჩვენი ერთ-ერთი პრიორიტეტია.",
    subs: [
      { title: "ადრეული კარიესი", text: "ნაადრევი კარიესის პრევენცია და უმტკივნეულო მკურნალობა." },
      { title: "პრევენცია", text: "რეკომენდებულია კბილების გახეხვა პირველი კბილის ამოსვლისთანავე." }
    ]
  },
  maxillofacial: {
    title: "ყბა-სახის ქირურგია",
    desc: "პირისა და ყბა-სახის ქირურგია მოიცავს რთულ ქირურგიულ ინტერვენციებს და კბილების ამოღებას ყველა სირთულის დონეზე.",
    subs: [
      { title: "რთული ოპერაციები", text: "პირის ღრუსა და ყბა-სახის რთული ოპერაციები და იმპლანტაციის წინა მოსამზადებელი პლასტიკა." },
      { title: "სინუს ლიფტი", text: "ჰაიმორის წიაღის ფსკერის აწევა და ძვლის მოცულობის გაზრდა იმპლანტაციისთვის." }
    ]
  },
  endodontics: {
    title: "ენდოდონტია",
    desc: "ენდოდონტია გულისხმობს ფესვის არხების მკურნალობას და რეაბილიტაციას თანამედროვე ტექნოლოგიებით.",
    subs: [
      { title: "არხების მკურნალობა", text: "ფესვის არხების გაწმენდა, ფორმირება და ჰერმეტული დაბჟენა." },
      { title: "რეაბილიტაცია", text: "დაზიანებული არხების აღდგენა და შენარჩუნება." }
    ]
  },
  aesthetics: {
    title: "ესთეტიკური სტომატოლოგია",
    desc: "დენტალური ესთეტიკა გულისხმობს ღიმილის მხატვრულ ფორმირებას და კბილების ბუნებრივი სილამაზის აღდგენას.",
    subs: [
      { title: "ღიმილის დიზაინი", text: "ინდივიდუალური ღიმილის მხატვრული ფორმირება." },
      { title: "გათეთრება", text: "კბილების გათეთრება თანამედროვე და უსაფრთხო მეთოდებით." }
    ]
  },
  implantology: {
    title: "იმპლანტოლოგია",
    desc: "დენტალური იმპლანტი არის დაკარგული კბილის აღდგენის ყველაზე თანამედროვე საშუალება.",
    subs: [
      { title: "იმპლანტაცია", text: "დენტალური იმპლანტირება მსოფლიოს წამყვანი ბრენდებით (ისრაელი, გერმანია, შვეიცარია, კორეა)." },
      { title: "უპირატესობები", text: "ბუნებრივი გარეგნობა და სრულფასოვანი ღეჭვითი ფუნქცია." }
    ]
  },
  periodontology: {
    title: "პაროდონტოლოგია",
    desc: "პაროდონტოლოგია მოიცავს ღრძილების დაავადებების მკურნალობას და პირის ღრუს ჰიგიენის მოწესრიგებას.",
    subs: [
      { title: "ღრძილების მკურნალობა", text: "ღრძილების ანთებითი დაავადებების პრევენცია და მკურნალობა." },
      { title: "ჰიგიენა", text: "პროფესიონალური ჰიგიენური წმენდა და გაპრიალება." }
    ]
  }
}

const renderServiceIcon = (key) => {
  switch (key) {
    case 'therapy':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3c2.5 0 3.2 1 5 1s2.6-.8 3.7.2C22 5.5 21.5 9 20.4 12.8 19.5 15.8 19 19 17.3 19c-1.4 0-1.6-2.2-2.8-3.5-.7-.8-2.3-.8-3 0C10.3 16.8 10.1 19 8.7 19 7 19 6.5 15.8 5.6 12.8 4.5 9 4 5.5 5.3 4.2 6.4 3.2 7.3 4 9 4s2.5-1 3-1Z"/>
        </svg>
      )
    case 'orthopedics':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 10h16M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M8 10v8a2 2 0 0 1-4 0M16 10v8a2 2 0 0 0 4 0"/>
        </svg>
      )
    case 'orthodontics':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 7h16M4 12h16M4 17h16"/>
          <circle cx="8" cy="7" r="1.5" fill="currentColor"/>
          <circle cx="14" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="10" cy="17" r="1.5" fill="currentColor"/>
        </svg>
      )
    case 'surgery':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m14.5 4.5 5 5L9 20l-5 1 1-5L15.5 5.5"/>
          <path d="M13 6l5 5"/>
        </svg>
      )
    case 'pediatrics':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9.5 9.5c.3-.3.7-.5 1.1-.5.4 0 .8.2 1.1.5.3.3.5.7.5 1.1s-.2.8-.5 1.1"/><path d="M14.5 9.5c.3-.3.7-.5 1.1-.5.4 0 .8.2 1.1.5.3.3.5.7.5 1.1s-.2.8-.5 1.1M8 15s1.5 2 4 2 4-2 4-2"/>
        </svg>
      )
    case 'maxillofacial':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
          <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/>
        </svg>
      )
    case 'endodontics':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10"/>
          <path d="m9.5 9.5 5 5M14.5 9.5l-5 5"/>
        </svg>
      )
    case 'aesthetics':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m12 3-1.912 5.886H3.894l4.948 3.596L6.93 18.368 12 14.772l5.07 3.596-1.912-5.886 4.948-3.596h-6.194L12 3Z"/>
        </svg>
      )
    case 'implantology':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
        </svg>
      )
    case 'periodontology':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8M12 12c0 2.2-1.8 4-4 4s-4-1.8-4-4"/>
        </svg>
      )
    default:
      return null
  }
}

export default function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('site-lang') || 'ka';
  });

  const toggleLanguage = () => {
    playClickSound();
    setLang(prev => prev === 'ka' ? 'en' : 'ka');
  };

  useEffect(() => {
    localStorage.setItem('site-lang', lang);
  }, [lang]);

  // Navigation states
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#dashboard')
  const [expandedEnamel, setExpandedEnamel] = useState(null)
  const [expandedService, setExpandedService] = useState(null)

  // Doctor filtering states
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('ყველა')
  const categories = ['ყველა', 'თერაპია', 'ორთოდონტია', 'ორთოპედია', 'ქირურგია', 'იმპლანტოლოგია', 'ბავშვთა სტომატოლოგია', 'პაროდონტოლოგია', 'ასისტენტი']

  // Floating chatbot states
  const [showChat, setShowChat] = useState(false)
  const [chatUnread, setChatUnread] = useState(1)
  const [customMessage, setCustomMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: (lang === 'ka' ? BOT_RESPONSES.welcome : BOT_RESPONSES_EN.welcome) }
  ])

  // Calendar states
  const [today] = useState(() => {
    const d = new Date()
    d.setHours(0,0,0,0)
    return d
  })
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('site-theme') || 'coral';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'teal') {
      root.classList.add('theme-teal');
    } else {
      root.classList.remove('theme-teal');
    }
    localStorage.setItem('site-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    playClickSound();
    setTheme(prev => prev === 'coral' ? 'teal' : 'coral');
  };

  // Form inputs
  const [patientName, setPatientName] = useState('')
  const [patientPhone, setPatientPhone] = useState('')
  const [selectedService, setSelectedService] = useState('თერაპია')
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [showResultsModal, setShowResultsModal] = useState(false)
  const [showPricesModal, setShowPricesModal] = useState(false)
  const [showBlogModal, setShowBlogModal] = useState(false)
  const [showEquipModal, setShowEquipModal] = useState(false)
  const [activeServiceDetail, setActiveServiceDetail] = useState(null)
  const [activeDoctorDetail, setActiveDoctorDetail] = useState(null)
  const [showMapModal, setShowMapModal] = useState(false)
  const [activeEnamelDetail, setActiveEnamelDetail] = useState(null)
  const [activePriceCategory, setActivePriceCategory] = useState(null)

  // Doctor rating authentication states
  const [authUser, setAuthUser] = useState(() => {
    try {
      const saved = localStorage.getItem('smile_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [pendingRating, setPendingRating] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authError, setAuthError] = useState('');

  // Doctor ratings state loaded from localStorage
  const [doctorRatings, setDoctorRatings] = useState(() => {
    try {
      const saved = localStorage.getItem('smile_doctor_ratings')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  // State to track temporary rating star hover values
  const [hoverRating, setHoverRating] = useState(0)

  const getDoctorRating = (name) => {
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baseCount = (hash % 15) + 12;
    const baseRatingSum = baseCount * 5.0;
    
    const userRating = doctorRatings[name];
    const totalCount = userRating ? baseCount + 1 : baseCount;
    const totalSum = userRating ? baseRatingSum + userRating : baseRatingSum;
    const avgRating = (totalSum / totalCount).toFixed(1);
    
    return {
      average: avgRating,
      count: totalCount,
      userRating: userRating || null
    };
  }

  const handleRateDoctor = async (name, score, userObject) => {
    const finalUser = userObject || authUser;
    const newRatings = { ...doctorRatings, [name]: score };
    setDoctorRatings(newRatings);
    try {
      localStorage.setItem('smile_doctor_ratings', JSON.stringify(newRatings));
    } catch (e) {}
    
    const text = lang === 'ka'
      ? `⭐️ <b>ახალი შეფასება!</b>\n` +
        `👨‍⚕️ ექიმი: <b>${name}</b>\n` +
        `🌟 შეფასება: <b>${score} / 5 ვარსკვლავი</b>\n` +
        `👤 შემფასებელი: <b>${finalUser ? finalUser.name : 'ანონიმური'}</b>\n` +
        `📞 ტელეფონი: <b>${finalUser ? finalUser.phone : 'არ არის'}</b>`
      : `⭐️ <b>New Rating!</b>\n` +
        `👨‍⚕️ Doctor: <b>${name}</b>\n` +
        `🌟 Rating: <b>${score} / 5 Stars</b>\n` +
        `👤 Reviewer: <b>${finalUser ? finalUser.name : 'Anonymous'}</b>\n` +
        `📞 Phone: <b>${finalUser ? finalUser.phone : 'None'}</b>`;
    await sendTelegramMessage(text);
  }

  // Telegram credentials
  const TG_TOKEN = '8954093567:AAH3woxKpRbvQ68w5OlHdhvUIzVvmkAqN8E'
  const TG_CHAT_ID = '443575738'

  // Telegram messaging helper
  const sendTelegramMessage = async (text) => {
    const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`
    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TG_CHAT_ID,
          text: text,
          parse_mode: 'HTML'
        })
      })
    } catch (error) {
      console.error('Telegram send failed:', error)
    }
  }

  // Tactile tic sound click handler
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target.closest('button, a, .svc, .doctor-app-card, .menu-hub-card, .service-chip, .slot, .day, .chat-quick-btn');
      if (target) {
        playClickSound();
        return;
      }
      
      let cur = e.target;
      while (cur && cur !== document.body) {
        if (cur.style && (cur.style.cursor === 'pointer' || window.getComputedStyle(cur).cursor === 'pointer')) {
          playClickSound();
          break;
        }
        cur = cur.parentElement;
      }
    };
    
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-open chatbot with 1.2s delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChat(true)
      setChatUnread(0)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  // Chat scroll anchor
  const chatEndRef = useRef(null)
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Filtered doctors list
  const filteredDoctors = DOCTORS.filter(d => {
    const matchesSearch = d.n.toLowerCase().includes(searchQuery.toLowerCase()) || d.s.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'ყველა' || d.s.toLowerCase().includes(activeCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  // Handle chatbot options
  const handleBotQuery = (queryType, userText) => {
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userText }])
    
    const userMsg = lang === 'ka'
      ? `💬 <b>SmileBot ჩატი</b>\n👤 <b>პაციენტი:</b> ${userText}`
      : `💬 <b>SmileBot Chat</b>\n👤 <b>Patient:</b> ${userText}`;
    sendTelegramMessage(userMsg)

    setTimeout(() => {
      let botText = ''
      if (queryType === 'services') botText = lang === 'ka' ? BOT_RESPONSES.services : BOT_RESPONSES_EN.services
      else if (queryType === 'prices') botText = lang === 'ka' ? BOT_RESPONSES.prices : BOT_RESPONSES_EN.prices
      else if (queryType === 'contact') botText = lang === 'ka' ? BOT_RESPONSES.contact : BOT_RESPONSES_EN.contact
      
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botText }])
      
      const botMsg = lang === 'ka'
        ? `💬 <b>SmileBot ჩატი</b>\n🤖 <b>ბოტი:</b> ${botText}`
        : `💬 <b>SmileBot Chat</b>\n🤖 <b>Bot:</b> ${botText}`;
      sendTelegramMessage(botMsg)
    }, 600)
  }

  // Handle custom typed message submit
  const handleCustomMessageSubmit = (e) => {
    e.preventDefault()
    if (!customMessage.trim()) return
    
    const userText = customMessage.trim()
    setCustomMessage('')
    
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userText }])
    
    const userMsg = lang === 'ka'
      ? `💬 <b>SmileBot ჩატი (ახალი კითხვა)</b>\n👤 <b>პაციენტი:</b> ${userText}`
      : `💬 <b>SmileBot Chat (New Question)</b>\n👤 <b>Patient:</b> ${userText}`;
    sendTelegramMessage(userMsg)

    setTimeout(() => {
      const botText = lang === 'ka'
        ? "გმადლობთ შეტყობინებისთვის! თქვენი შეკითხვა გადაეცა ადმინისტრატორს და უახლოეს დროში დაგიკავშირდებით ტელეფონით."
        : "Thank you for your message! Your question has been forwarded to the administrator, and we will contact you shortly by phone.";
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botText }])
      
      const botMsg = lang === 'ka'
        ? `💬 <b>SmileBot ჩატი</b>\n🤖 <b>ბოტი:</b> ${botText}`
        : `💬 <b>SmileBot Chat</b>\n🤖 <b>Bot:</b> ${botText}`;
      sendTelegramMessage(botMsg)
    }, 800)
  }

  // Handle calendar month change
  const handleMonthChange = (direction) => {
    const newMonth = viewDate.getMonth() + direction
    setViewDate(new Date(viewDate.getFullYear(), newMonth, 1))
  }

  const getDaysInMonth = () => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const offset = firstDay === 0 ? 6 : firstDay - 1
    const totalDays = new Date(year, month + 1, 0).getDate()
    
    const days = []
    for (let i = 0; i < offset; i++) {
      days.push(null)
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const daysList = getDaysInMonth()

  // Form submit handler
  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !patientName || !patientPhone) {
      alert(lang === 'ka' ? 'გთხოვთ შეავსოთ ყველა აუცილებელი ველი და აირჩიოთ თარიღი/საათი!' : 'Please fill out all required fields and choose date/time!')
      return
    }
    
    const dateStr = lang === 'ka'
      ? `${selectedDate.getDate()} ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
      : `${MONTHS_EN[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;
    
    const bookingMsg = lang === 'ka'
      ? `📅 <b>ახალი ჯავშანი Smile Agency-ში!</b>\n\n` +
        `👤 <b>პაციენტი:</b> ${patientName}\n` +
        `📞 <b>ტელეფონი:</b> ${patientPhone}\n` +
        `🦷 <b>მიმართულება:</b> ${selectedService}\n` +
        `👤 <b>ექიმი:</b> ${selectedDoctor || 'არ არის არჩეული'}\n` +
        `📅 <b>თარიღი:</b> ${dateStr}\n` +
        `⏰ <b>საათი:</b> ${selectedTime}`
      : `📅 <b>New Booking at Smile Agency!</b>\n\n` +
        `👤 <b>Patient:</b> ${patientName}\n` +
        `📞 <b>Phone:</b> ${patientPhone}\n` +
        `🦷 <b>Specialty:</b> ${selectedService}\n` +
        `👤 <b>Doctor:</b> ${selectedDoctor || 'None Selected'}\n` +
        `📅 <b>Date:</b> ${dateStr}\n` +
        `⏰ <b>Time:</b> ${selectedTime}`;
    sendTelegramMessage(bookingMsg)

    setBookingSuccess(true)
    setTimeout(() => {
      setBookingSuccess(false)
      setSelectedDate(null)
      setSelectedTime(null)
      setPatientName('')
      setPatientPhone('')
      setSelectedDoctor('')
    }, 4000)
  }

  // Auto-fill doctor and scroll to booking
  const handleSelectDoctorForBooking = (docName, specialty) => {
    setSelectedDoctor(docName)
    // Extract main category
    if (specialty.includes('თერაპია')) setSelectedService('თერაპია')
    else if (specialty.includes('ორთოდონტია')) setSelectedService('ორთოდონტია')
    else if (specialty.includes('ორთოპედია')) setSelectedService('ორთოპედია')
    else if (specialty.includes('ქირურგია')) setSelectedService('ქირურგია / ყბა-სახე')
    
    const bookingSec = document.getElementById('booking')
    if (bookingSec) {
      bookingSec.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen font-sans pb-16">
      
      {/* HEADER */}
      <header className={headerScrolled ? 'scrolled' : ''}>
        <div className="wrap nav">
          <a href="#top" className="brand">
            <img src={`${import.meta.env.BASE_URL}images/logo.webp?v=4`} alt="Smile Agency Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            {lang === 'ka' ? 'ღიმილის სააგენტო' : 'Smile Agency'}
          </a>
          <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} id="navLinks">
            <a href="#dashboard" onClick={() => { setMobileMenuOpen(false); setActiveLink('#dashboard'); }} className={activeLink === '#dashboard' ? 'active' : ''}>{lang === 'ka' ? 'მთავარი' : 'Home'}</a>
            <a href="#services" onClick={() => { setMobileMenuOpen(false); setActiveLink('#services'); }} className={activeLink === '#services' ? 'active' : ''}>{lang === 'ka' ? 'სერვისები' : 'Services'}</a>
            <a href="#doctors" onClick={() => { setMobileMenuOpen(false); setActiveLink('#doctors'); }} className={activeLink === '#doctors' ? 'active' : ''}>{lang === 'ka' ? 'ექიმები' : 'Doctors'}</a>
            <a href="#booking" onClick={() => { setMobileMenuOpen(false); setActiveLink('#booking'); }} className={activeLink === '#booking' ? 'active' : ''}>{lang === 'ka' ? 'დაჯავშნა' : 'Booking'}</a>
          </nav>
          <div className="nav-right">
            <button 
              onClick={toggleLanguage}
              className="lang-toggle-btn"
              title={lang === 'ka' ? 'Change Language to English' : 'ენის შეცვლა ქართულად'}
              aria-label="ენა"
            >
              {lang === 'ka' ? 'EN' : 'KA'}
            </button>
            <button 
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title="ფერის შეცვლა"
              aria-label="ფერის შეცვლა"
            >
              <span className="color-preview-circle"></span>
            </button>
            <a href="#booking" className="nav-cta">
              <CalendarIcon className="w-4 h-4" />
              {lang === 'ka' ? 'დაჯავშნე ვიზიტი' : 'Book Visit'}
            </a>
          </div>
          <button className="burger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="მენიუ">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* HERO / ONBOARDING VIDEO SECTION */}
      <section className="block" id="dashboard">
        <div className="wrap">
          <div className="phone-onboarding-card" style={{ maxWidth: '100%', width: '100%', padding: '32px' }}>
            <div className="phone-onboarding-media" style={{ width: '100%', aspectRatio: '21 / 8', height: 'auto', borderRadius: '16px' }}>
              <video autoPlay loop muted playsInline className="rounded-2xl" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={`${import.meta.env.BASE_URL}images/ქავერი.mp4?v=5`} type="video/mp4" />
              </video>
            </div>
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <h2 className="phone-onboarding-title" style={{ fontSize: '2rem' }}>{lang === 'ka' ? 'გაიღიმეთ თავდაჯერებულად!' : 'Smile Confidently!'}</h2>
              <p className="phone-onboarding-subtitle" style={{ fontSize: '1.05rem', maxWidth: '800px', marginInline: 'auto', marginBottom: '32px' }}>{lang === 'ka' ? 'სრული სტომატოლოგიური მომსახურება, თანამედროვე აღჭურვილობა და 18 პროფესიონალი ექიმის გუნდი ერთ სივრცეში.' : 'Complete dental care, modern equipment and a team of 18 professional doctors in one space.'}</p>
            </div>
            <div className="phone-onboarding-actions" style={{ maxWidth: '480px', marginInline: 'auto' }}>
              <a href="#booking" className="phone-onboarding-btn">{lang === 'ka' ? 'დაჯავშნე ვიზიტი' : 'Book Visit'}</a>
              <a href="tel:+995555585356" className="phone-onboarding-btn-secondary">{lang === 'ka' ? 'დარეკე კლინიკაში' : 'Call Clinic'}</a>
            </div>
          </div>
        </div>
      </section>

      {/* COMPACT SERVICES */}
      <section className="block" id="services" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head text-left">
            <span className="eyebrow">{lang === 'ka' ? 'მიმართულებები' : 'Specialties'}</span>
            <h2>{lang === 'ka' ? 'სრულყოფილი სტომატოლოგიური სერვისები' : 'Perfect Dental Services'}</h2>
            <p>{lang === 'ka' ? 'დიაგნოსტიკიდან რთულ ქირურგიულ ჩარევამდე — მკურნალობის სრული ციკლი ერთ სივრცეში.' : 'From diagnostics to complex surgical interventions — a complete treatment cycle in one space.'}</p>
          </div>
          <div className="svc-grid">
            <article className="svc" onClick={() => {
              if (window.innerWidth <= 768) {
                if (expandedService === 'therapy') {
                  setActiveServiceDetail({ ...SERVICES_DETAILS.therapy, key: 'therapy' });
                } else {
                  setExpandedService('therapy');
                }
              } else {
                setActiveServiceDetail({ ...SERVICES_DETAILS.therapy, key: 'therapy' });
              }
            }} style={{ cursor: 'pointer' }}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 3c2.5 0 3.2 1 5 1s2.6-.8 3.7.2C22 5.5 21.5 9 20.4 12.8 19.5 15.8 19 19 17.3 19c-1.4 0-1.6-2.2-2.8-3.5-.7-.8-2.3-.8-3 0C10.3 16.8 10.1 19 8.7 19 7 19 6.5 15.8 5.6 12.8 4.5 9 4 5.5 5.3 4.2 6.4 3.2 7.3 4 9 4s2.5-1 3-1Z"/>
                </svg>
              </div>
              <h3>{lang === 'ka' ? 'თერაპია' : 'Therapy'}</h3>
              <p className={`svc-desc ${expandedService === 'therapy' ? 'expanded' : ''}`}>{lang === 'ka' ? 'კარიესისა და გართულებების მკურნალობა კბილის შენარჩუნებით.' : 'Treatment of caries and complications while preserving the tooth.'}</p>
            </article>

            <article className="svc" onClick={() => {
              if (window.innerWidth <= 768) {
                if (expandedService === 'orthopedics') {
                  setActiveServiceDetail({ ...SERVICES_DETAILS.orthopedics, key: 'orthopedics' });
                } else {
                  setExpandedService('orthopedics');
                }
              } else {
                setActiveServiceDetail({ ...SERVICES_DETAILS.orthopedics, key: 'orthopedics' });
              }
            }} style={{ cursor: 'pointer' }}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 10h16M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M8 10v8a2 2 0 0 1-4 0M16 10v8a2 2 0 0 0 4 0"/>
                </svg>
              </div>
              <h3>{lang === 'ka' ? 'ორთოპედია' : 'Orthopedics'}</h3>
              <p className={`svc-desc ${expandedService === 'orthopedics' ? 'expanded' : ''}`}>{lang === 'ka' ? 'გვიგვინები, ხიდები და პროტეზირება დაკარგული კბილებისთვის.' : 'Crowns, bridges and prosthetics for missing teeth.'}</p>
            </article>

            <article className="svc" onClick={() => {
              if (window.innerWidth <= 768) {
                if (expandedService === 'orthodontics') {
                  setActiveServiceDetail({ ...SERVICES_DETAILS.orthodontics, key: 'orthodontics' });
                } else {
                  setExpandedService('orthodontics');
                }
              } else {
                setActiveServiceDetail({ ...SERVICES_DETAILS.orthodontics, key: 'orthodontics' });
              }
            }} style={{ cursor: 'pointer' }}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 7h16M4 12h16M4 17h16"/>
                  <circle cx="8" cy="7" r="1.5" fill="currentColor"/>
                  <circle cx="14" cy="12" r="1.5" fill="currentColor"/>
                  <circle cx="10" cy="17" r="1.5" fill="currentColor"/>
                </svg>
              </div>
              <h3>{lang === 'ka' ? 'ორთოდონტია' : 'Orthodontics'}</h3>
              <p className={`svc-desc ${expandedService === 'orthodontics' ? 'expanded' : ''}`}>{lang === 'ka' ? 'კბილების სწორება ბრეკეტებითა და გამჭვირვალე ელაინერებით.' : 'Teeth straightening with braces and clear aligners.'}</p>
            </article>

            <article className="svc" onClick={() => {
              if (window.innerWidth <= 768) {
                if (expandedService === 'surgery') {
                  setActiveServiceDetail({ ...SERVICES_DETAILS.surgery, key: 'surgery' });
                } else {
                  setExpandedService('surgery');
                }
              } else {
                setActiveServiceDetail({ ...SERVICES_DETAILS.surgery, key: 'surgery' });
              }
            }} style={{ cursor: 'pointer' }}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="m14.5 4.5 5 5L9 20l-5 1 1-5L15.5 5.5"/>
                  <path d="M13 6l5 5"/>
                </svg>
              </div>
              <h3>{lang === 'ka' ? 'ქირურგია' : 'Surgery'}</h3>
              <p className={`svc-desc ${expandedService === 'surgery' ? 'expanded' : ''}`}>{lang === 'ka' ? 'კბილის ამოღება, რეზექცია და ქირურგიული მანიპულაციები.' : 'Tooth extraction, resection and surgical procedures.'}</p>
            </article>

            <article className="svc" onClick={() => {
              if (window.innerWidth <= 768) {
                if (expandedService === 'pediatrics') {
                  setActiveServiceDetail({ ...SERVICES_DETAILS.pediatrics, key: 'pediatrics' });
                } else {
                  setExpandedService('pediatrics');
                }
              } else {
                setActiveServiceDetail({ ...SERVICES_DETAILS.pediatrics, key: 'pediatrics' });
              }
            }} style={{ cursor: 'pointer' }}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9.5 9.5c.3-.3.7-.5 1.1-.5.4 0 .8.2 1.1.5.3.3.5.7.5 1.1s-.2.8-.5 1.1"/><path d="M14.5 9.5c.3-.3.7-.5 1.1-.5.4 0 .8.2 1.1.5.3.3.5.7.5 1.1s-.2.8-.5 1.1M8 15s1.5 2 4 2 4-2 4-2"/>
                </svg>
              </div>
              <h3>{lang === 'ka' ? 'ბავშვთა სტომატოლოგია' : 'Pediatric Dentistry'}</h3>
              <p className={`svc-desc ${expandedService === 'pediatrics' ? 'expanded' : ''}`}>{lang === 'ka' ? 'პატარა პაციენტების მკურნალობა მეგობრულ, უმტკივნეულო გარემოში.' : 'Treatment of young patients in a friendly, painless environment.'}</p>
            </article>

            <article className="svc" onClick={() => {
              if (window.innerWidth <= 768) {
                if (expandedService === 'maxillofacial') {
                  setActiveServiceDetail({ ...SERVICES_DETAILS.maxillofacial, key: 'maxillofacial' });
                } else {
                  setExpandedService('maxillofacial');
                }
              } else {
                setActiveServiceDetail({ ...SERVICES_DETAILS.maxillofacial, key: 'maxillofacial' });
              }
            }} style={{ cursor: 'pointer' }}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                  <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/>
                </svg>
              </div>
              <h3>{lang === 'ka' ? 'ყბა-სახის ქირურგია' : 'Maxillofacial Surgery'}</h3>
              <p className={`svc-desc ${expandedService === 'maxillofacial' ? 'expanded' : ''}`}>{lang === 'ka' ? 'ყბა-სახის სისტემის რთული ოპერაციები და რეკონსტრუქცია.' : 'Complex surgeries and reconstruction of the jaw-face system.'}</p>
            </article>

            <article className="svc" onClick={() => {
              if (window.innerWidth <= 768) {
                if (expandedService === 'endodontics') {
                  setActiveServiceDetail({ ...SERVICES_DETAILS.endodontics, key: 'endodontics' });
                } else {
                  setExpandedService('endodontics');
                }
              } else {
                setActiveServiceDetail({ ...SERVICES_DETAILS.endodontics, key: 'endodontics' });
              }
            }} style={{ cursor: 'pointer' }}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m9.5 9.5 5 5M14.5 9.5l-5 5"/>
                </svg>
              </div>
              <h3>{lang === 'ka' ? 'ენდოდონტია' : 'Endodontics'}</h3>
              <p className={`svc-desc ${expandedService === 'endodontics' ? 'expanded' : ''}`}>{lang === 'ka' ? 'კბილის ფესვის არხების მაღალი სიზუსტის მკურნალობა მიკროსკოპით.' : 'High-precision treatment of root canals under microscope.'}</p>
            </article>

            <article className="svc" onClick={() => {
              if (window.innerWidth <= 768) {
                if (expandedService === 'aesthetics') {
                  setActiveServiceDetail({ ...SERVICES_DETAILS.aesthetics, key: 'aesthetics' });
                } else {
                  setExpandedService('aesthetics');
                }
              } else {
                setActiveServiceDetail({ ...SERVICES_DETAILS.aesthetics, key: 'aesthetics' });
              }
            }} style={{ cursor: 'pointer' }}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="m12 3-1.912 5.886H3.894l4.948 3.596L6.93 18.368 12 14.772l5.07 3.596-1.912-5.886 4.948-3.596h-6.194L12 3Z"/>
                </svg>
              </div>
              <h3>{lang === 'ka' ? 'ესთეტიკური სტომატოლოგია' : 'Aesthetic Dentistry'}</h3>
              <p className={`svc-desc ${expandedService === 'aesthetics' ? 'expanded' : ''}`}>{lang === 'ka' ? 'ვინირები, კბილების გათეთრება და ღიმილის სრული დიზაინი.' : 'Veneers, teeth whitening, and complete smile design.'}</p>
            </article>

            <article className="svc" onClick={() => {
              if (window.innerWidth <= 768) {
                if (expandedService === 'implantology') {
                  setActiveServiceDetail({ ...SERVICES_DETAILS.implantology, key: 'implantology' });
                } else {
                  setExpandedService('implantology');
                }
              } else {
                setActiveServiceDetail({ ...SERVICES_DETAILS.implantology, key: 'implantology' });
              }
            }} style={{ cursor: 'pointer' }}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
                </svg>
              </div>
              <h3>{lang === 'ka' ? 'იმპლანტოლოგია' : 'Implantology'}</h3>
              <p className={`svc-desc ${expandedService === 'implantology' ? 'expanded' : ''}`}>{lang === 'ka' ? 'დაკარგული კბილების აღდგენა თანამედროვე პრემიუმ იმპლანტებით.' : 'Replacing missing teeth with modern premium implants.'}</p>
            </article>

            <article className="svc" onClick={() => {
              if (window.innerWidth <= 768) {
                if (expandedService === 'periodontology') {
                  setActiveServiceDetail({ ...SERVICES_DETAILS.periodontology, key: 'periodontology' });
                } else {
                  setExpandedService('periodontology');
                }
              } else {
                setActiveServiceDetail({ ...SERVICES_DETAILS.periodontology, key: 'periodontology' });
              }
            }} style={{ cursor: 'pointer' }}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8M12 12c0 2.2-1.8 4-4 4s-4-1.8-4-4"/>
                </svg>
              </div>
              <h3>{lang === 'ka' ? 'პაროდონტოლოგია' : 'Periodontology'}</h3>
              <p className={`svc-desc ${expandedService === 'periodontology' ? 'expanded' : ''}`}>{lang === 'ka' ? 'ღრძილების მკურნალობა, გაჯანსაღება და დაავადებების პრევენცია.' : 'Gum treatment, healing, and disease prevention.'}</p>
            </article>
          </div>
        </div>
      </section>

      {/* ACTIVE DOCTORS PORTAL SECTION */}
      <section className="block" id="doctors" style={{ paddingTop: 0 }}>
        <div className="wrap text-left">
          <div className="glass-neu">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent-color)] mb-2 block">
              {lang === 'ka' ? '✦ რჩეული ექიმები და სერვისები' : '✦ Featured Doctors & Services'}
            </span>
            <h2 className="font-serif font-bold text-2xl text-[#33353A] mb-5">{lang === 'ka' ? 'აირჩიე მიმართულება' : 'Choose Specialty'}</h2>
            
            {/* Category Pill Filters */}
            <div className="service-track">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`service-chip ${activeCategory === cat ? 'active' : ''}`}
                >
                  {lang === 'ka' ? cat : ({ 'ყველა': 'All', 'თერაპია': 'Therapy', 'ორთოდონტია': 'Orthodontics', 'ორთოპედია': 'Orthopedics', 'ქირურგია': 'Surgery', 'იმპლანტოლოგია': 'Implantology', 'ბავშვთა სტომატოლოგია': 'Pediatric Dentistry', 'პაროდონტოლოგია': 'Periodontology', 'ასისტენტი': 'Assistant' }[cat] || cat)}
                </button>
              ))}
            </div>

            {/* Dynamic Doctor Search bar */}
            <div className="search-container">
              <Search className="search-icon w-5 h-5" />
              <input 
                type="text" 
                placeholder={lang === 'ka' ? "მოძებნე ექიმი ან სპეციალობა..." : "Search doctor or specialty..."} 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Dynamic Doctors Grid */}
            <div className="doctor-app-grid">
              {filteredDoctors.slice(0, 6).map((d, i) => {
                const init = d.n.split(" ").map(w => w[0]).join("")
                const details = getDoctorDetailsByName(d.n, lang)
                const ratingInfo = getDoctorRating(d.n)
                return (
                  <article 
                    key={i} 
                    className="doctor-app-card"
                    onClick={() => {
                      if (details) {
                        setActiveDoctorDetail(details);
                      } else {
                        setActiveDoctorDetail({
                          name: d.n,
                          role: d.s,
                          image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
                          specialization: d.s,
                          bio: lang === 'ka' ? "„ღიმილის სააგენტოს“ გამოცდილი სპეციალისტი." : "Experienced specialist at Smile Agency.",
                          education: lang === 'ka' ? "უმაღლესი სამედიცინო განათლება, რეზიდენტურა და სერთიფიკატები." : "Higher medical education, residency and certificates."
                        });
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="doctor-app-top">
                      <div className="doctor-app-avatar" style={{ background: GRADS[i % GRADS.length], overflow: 'hidden' }}>
                        {details && details.image ? (
                          <img src={details.image} alt={lang === 'ka' ? d.n : (getDoctorDetailsByName(d.n, 'en') ? getDoctorDetailsByName(d.n, 'en').name : d.n)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          init
                        )}
                      </div>
                      <div className="doctor-app-info">
                        <h3 title={lang === 'ka' ? d.n : (getDoctorDetailsByName(d.n, 'en') ? getDoctorDetailsByName(d.n, 'en').name : d.n)}>{lang === 'ka' ? d.n : (getDoctorDetailsByName(d.n, 'en') ? getDoctorDetailsByName(d.n, 'en').name : d.n)}</h3>
                        <p title={details ? details.role : d.s}>{details ? details.role : d.s}</p>
                        <span className="doctor-profile-link">{lang === 'ka' ? 'დეტალურად ➔' : 'Details ➔'}</span>
                      </div>
                    </div>
                    <div className="doctor-app-meta">
                      <span className="doctor-app-badge flex items-center gap-1" title={lang === 'ka' ? `${ratingInfo.count} შეფასება` : `${ratingInfo.count} reviews`}>
                        <Star className="w-3.5 h-3.5 fill-current" style={{ color: '#FFB800' }} />
                        {ratingInfo.average} ({ratingInfo.count})
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectDoctorForBooking(d.n, d.s);
                        }}
                        className="doctor-app-btn"
                      >
                        {lang === 'ka' ? 'დაჯავშნა' : 'Book'}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
            {filteredDoctors.length === 0 && (
              <div className="text-center py-12 text-[#8E8E93]">
                {lang === 'ka' ? 'ექიმი მოცემული სპეციალობით ვერ მოიძებნა.' : 'No doctor found with the selected specialty.'}
              </div>
            )}

            {/* View All Doctors Button */}
            <div className="doctor-view-all-container" style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '40px', paddingLeft: '8px', paddingBottom: '8px' }}>
              <button 
                onClick={() => setShowTeamModal(true)} 
                className="glass-neu"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '8px', 
                  width: 'auto', 
                  flex: 'none',
                  padding: '12px 28px',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  backgroundColor: 'var(--accent-color)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '3px 3px 8px var(--shadow-dark), -3px -3px 8px var(--shadow-light)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Users className="w-4 h-4" />
                {lang === 'ka' ? 'ყველას ნახვა' : 'View All'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CLINICAL HUB PORTALS */}
      <section className="block" id="clinical-menu" style={{paddingTop: 0}}>
        <div className="wrap text-left">
          <div className="head">
            <span className="eyebrow">{lang === 'ka' ? 'კლინიკის მენიუ' : 'Clinical Menu'}</span>
            <h2>{lang === 'ka' ? 'გაეცანით დეტალებს' : 'Explore Details'}</h2>
            <p>{lang === 'ka' ? 'აირჩიეთ სასურველი სექცია კლინიკის შესახებ სრული ინფორმაციის მისაღებად.' : 'Select a section to find complete information about our clinic.'}</p>
          </div>
          
          <div className="menu-hub-grid">
            
            <div className="menu-hub-card" onClick={() => setShowAboutModal(true)}>
              <div className="menu-hub-icon">
                <Award className="w-5 h-5" />
              </div>
              <h3>{lang === 'ka' ? 'ჩვენს შესახებ' : 'About Us'}</h3>
              <p>{lang === 'ka' ? 'კლინიკის ისტორია და მიღწევები' : 'Clinic history and achievements'}</p>
            </div>

            <div className="menu-hub-card" onClick={() => setShowTeamModal(true)}>
              <div className="menu-hub-icon">
                <Users className="w-5 h-5" />
              </div>
              <h3>{lang === 'ka' ? 'ჩვენი გუნდი' : 'Our Team'}</h3>
              <p>{lang === 'ka' ? 'გაიცანით 18 პროფესიონალი ექიმი' : 'Meet 18 professional doctors'}</p>
            </div>

            <div className="menu-hub-card" onClick={() => setShowEquipModal(true)}>
              <div className="menu-hub-icon">
                <Cpu className="w-5 h-5" />
              </div>
              <h3>{lang === 'ka' ? 'ჩვენი აპარატურა' : 'Our Equipment'}</h3>
              <p>{lang === 'ka' ? 'ჩვენი საუკეთესო აპარატურა' : 'Our premium equipment'}</p>
            </div>

            <div className="menu-hub-card" onClick={() => setShowResultsModal(true)}>
              <div className="menu-hub-icon">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3>{lang === 'ka' ? 'შედეგები' : 'Results'}</h3>
              <p>{lang === 'ka' ? 'ჩვენი ნამუშევრები & ქეისები' : 'Our portfolio & cases'}</p>
            </div>

            <div className="menu-hub-card" onClick={() => setShowPricesModal(true)}>
              <div className="menu-hub-icon">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3>{lang === 'ka' ? 'ფასები' : 'Prices'}</h3>
              <p>{lang === 'ka' ? 'სერვისების ღირებულებების სია' : 'Service price list'}</p>
            </div>

          </div>
        </div>
      </section>

      {/* REDESIGNED ENAMEL ENEMIES CARDS */}
      <section className="block" id="enamel" style={{paddingTop: 0}}>
        <div className="wrap">
          <div className="head text-left">
            <span className="eyebrow">{lang === 'ka' ? 'პროფილაქტიკა' : 'Prevention'}</span>
            <h2>{lang === 'ka' ? 'რა აზიანებს კბილის ემალს' : 'What Damages Tooth Enamel'}</h2>
            <p>{lang === 'ka' ? 'ყოველდღიური ჩვევები, რომლებიც კბილს აფერადებს და ასუსტებს — და რასაც პროფესიული მოვლა აბალანსებს.' : 'Daily habits that stain and weaken teeth — which professional care balances.'}</p>
          </div>
          
          <div className="enamel-layout">
            <div className="enamel-grid">
              <div className="enamel-card" onClick={() => {
                if (window.innerWidth <= 768) {
                  setExpandedEnamel(expandedEnamel === 'sweets' ? null : 'sweets');
                } else {
                  setActiveEnamelDetail(ENAMEL_DETAILS.sweets);
                }
              }} style={{ cursor: 'pointer' }}>
                <div className="enamel-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 9h16M9 5v14M14 5v14"/>
                  </svg>
                </div>
                <div className="enamel-card-content">
                  <h3>{lang === 'ka' ? 'შოკოლადი & ტკბილეული' : 'Sweets & Chocolates'}</h3>
                  <p className={`enamel-desc ${expandedEnamel === 'sweets' ? 'expanded' : ''}`}>{lang === 'ka' ? 'შაქარი და მჟავები, რომლებიც ასუსტებენ კბილის მინანქარს და ზრდიან კარიესის რისკს.' : 'Sugar and acids that weaken tooth enamel and increase risk of caries.'}</p>
                </div>
              </div>

              <div className="enamel-card" onClick={() => {
                if (window.innerWidth <= 768) {
                  setExpandedEnamel(expandedEnamel === 'smoking' ? null : 'smoking');
                } else {
                  setActiveEnamelDetail(ENAMEL_DETAILS.smoking);
                }
              }} style={{ cursor: 'pointer' }}>
                <div className="enamel-card-icon">
                  <Cigarette className="w-5.5 h-5.5" strokeWidth={1.8} />
                </div>
                <div className="enamel-card-content">
                  <h3>{lang === 'ka' ? 'მოწევა' : 'Smoking'}</h3>
                  <p className={`enamel-desc ${expandedEnamel === 'smoking' ? 'expanded' : ''}`}>{lang === 'ka' ? 'ნიკოტინი და ტარი, რომლებიც იწვევენ კბილის გაყვითლებას, ნადებს და აზიანებენ ღრძილებს.' : 'Nicotine and tar that cause yellowing, plaque and damage gums.'}</p>
                </div>
              </div>

              <div className="enamel-card" onClick={() => {
                if (window.innerWidth <= 768) {
                  setExpandedEnamel(expandedEnamel === 'coffee' ? null : 'coffee');
                } else {
                  setActiveEnamelDetail(ENAMEL_DETAILS.coffee);
                }
              }} style={{ cursor: 'pointer' }}>
                <div className="enamel-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M18 8h1a3 3 0 0 1 0 6h-1M4 8h14v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z"/><path d="M6 2v2M10 2v2M14 2v2"/>
                  </svg>
                </div>
                <div className="enamel-card-content">
                  <h3>{lang === 'ka' ? 'ყავა & ჩაი' : 'Coffee & Tea'}</h3>
                  <p className={`enamel-desc ${expandedEnamel === 'coffee' ? 'expanded' : ''}`}>{lang === 'ka' ? 'ძლიერი პიგმენტები და ტანინები, რომლებიც ღრმად აღწევენ მინანქარში და ტოვებენ მუქ ლაქებს.' : 'Strong pigments and tannins that penetrate deep into the enamel leaving dark stains.'}</p>
                </div>
              </div>
            </div>

            <div className="enamel-info-pane">
              <div className="enamel-info-video">
                <video autoPlay loop muted playsInline>
                  <source src={`${import.meta.env.BASE_URL}images/glass_tooth_nerves.mp4`} type="video/mp4" />
                </video>
              </div>
              <h3>{lang === 'ka' ? 'პროფესიული დაცვა' : 'Professional Protection'}</h3>
              <p>{lang === 'ka' ? 'პროფესიული წმენდა, გათეთრება და პროფილაქტიკა ემალს იცავს — დაჯავშნე ჰიგიენის ვიზიტი წელიწადში ორჯერ.' : 'Professional cleaning, whitening and prevention protects enamel — book a hygiene visit twice a year.'}</p>
              <a href="#booking" className="btn btn-primary">{lang === 'ka' ? 'დაჯავშნე ვიზიტი' : 'Book Visit'}</a>
            </div>
          </div>
        </div>
      </section>

      {/* WIDE BLOG BANNER */}
      <div className="wrap text-left" style={{ marginTop: '-20px', marginBottom: '40px' }}>
        <div className="menu-hub-blog-wide animate-on-scroll" onClick={() => setShowBlogModal(true)}>
          <div className="menu-hub-icon">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="text-left flex-1">
            <h3>{lang === 'ka' ? 'ბლოგი' : 'Blog'}</h3>
            <p>{lang === 'ka' ? 'საინტერესო სტატიები & რჩევები ჯანსაღი ღიმილისთვის' : 'Interesting articles & tips for a healthy smile'}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-[var(--accent-color)] shrink-0" />
        </div>
      </div>

      {/* BOOKING CALENDAR */}
      <section className="block" id="booking" style={{paddingTop: 0}}>
        <div className="wrap text-left">
          <div className="head">
            <span className="eyebrow">{lang === 'ka' ? 'ონლაინ დაჯავშნა' : 'Online Booking'}</span>
            <h2>{lang === 'ka' ? 'აირჩიე დღე და დრო' : 'Choose Date & Time'}</h2>
            <p>{lang === 'ka' ? 'დაჯავშნე ვიზიტი კალენდარში — დაგიდასტურებთ ტელეფონით.' : 'Book your visit in the calendar — we will confirm by phone.'}</p>
          </div>
          
          <div className="booking">
            <div className="cal-pane">
              <div className="cal-top">
                <div className="m">
                  {lang === 'ka' ? MONTHS[viewDate.getMonth()] : MONTHS_EN[viewDate.getMonth()]} {viewDate.getFullYear()}
                </div>
                <div className="cal-nav">
                  <button 
                    onClick={() => handleMonthChange(-1)} 
                    disabled={viewDate.getFullYear() === today.getFullYear() && viewDate.getMonth() <= today.getMonth()}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleMonthChange(1)} 
                    disabled={viewDate.getFullYear() === today.getFullYear() && viewDate.getMonth() >= today.getMonth() + 2}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="cal-grid">
                {(lang === 'ka' ? WDS : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]).map((w, idx) => (
                  <div key={idx} className="wd">{w}</div>
                ))}
                {daysList.map((day, idx) => {
                  if (!day) return <div key={`empty-${idx}`} className="day empty"></div>
                  const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString()
                  const isPast = day < today
                  const isDisabled = isPast
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedDate(day)
                        setSelectedTime(null)
                      }}
                      disabled={isDisabled}
                      className={`day ${isSelected ? 'sel' : ''}`}
                    >
                      {day.getDate()}
                    </button>
                  )
                })}
              </div>

              <div className="slots-label">{lang === 'ka' ? 'აირჩიე დრო' : 'Select Time'}</div>
              <div className="slots">
                {TIMES.map((time, idx) => {
                  // Filter out Sunday hours: Sunday working hours are 11:00 to 18:00
                  const isDateSunday = selectedDate && selectedDate.getDay() === 0;
                  if (isDateSunday) {
                    const hour = parseInt(time.split(':')[0]);
                    if (hour < 11 || hour > 18) return null;
                  }
                  const isSelected = selectedTime === time
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedTime(time)}
                      className={`slot ${isSelected ? 'sel' : ''}`}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Sum Pane */}
            <div className="sum-pane">
              <h3>{lang === 'ka' ? 'ვიზიტის დეტალები' : 'Visit Details'}</h3>
              <p className="hint">{lang === 'ka' ? 'შეავსე ველები და დაადასტურე.' : 'Fill fields and confirm.'}</p>
              
              <div className="picked">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/>
                </svg>
                <span>
                  {selectedDate && selectedTime 
                    ? `${selectedDate.getDate()} ${MONTHS[selectedDate.getMonth()]} · ${selectedTime}`
                    : (lang === 'ka' ? 'ჯერ აირჩიე დღე და დრო' : 'Select date & time first')
                  }
                </span>
              </div>

              {bookingSuccess ? (
                <div className="text-center py-6 text-white">
                  <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto mb-3">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-sm mb-1">{lang === 'ka' ? 'მოთხოვნა გაიგზავნა!' : 'Request Sent!'}</h4>
                  <p className="text-xs opacity-80">{lang === 'ka' ? 'მალე დაგიკავშირდებით დასადასტურებლად.' : 'We will contact you soon to confirm.'}</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit}>
                  <div className="field">
                    <label>{lang === 'ka' ? 'სახელი' : 'Name'}</label>
                    <input 
                      type="text" 
                      placeholder={lang === 'ka' ? "თქვენი სახელი" : "Your Name"}
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      onInvalid={(e) => e.target.setCustomValidity(lang === 'ka' ? 'გთხოვთ შეავსოთ ეს ველი' : 'Please fill out this field')}
                      onInput={(e) => e.target.setCustomValidity('')}
                      required
                    />
                  </div>
                  
                  <div className="field">
                    <label>{lang === 'ka' ? 'ტელეფონი' : 'Phone'}</label>
                    <input 
                      type="tel" 
                      placeholder="5xx xx xx xx"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      onInvalid={(e) => e.target.setCustomValidity(lang === 'ka' ? 'გთხოვთ შეავსოთ ეს ველი' : 'Please fill out this field')}
                      onInput={(e) => e.target.setCustomValidity('')}
                      required
                    />
                  </div>

                  <div className="field">
                    <label>{lang === 'ka' ? 'მიმართულება' : 'Specialty'}</label>
                    <select 
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      <option value="თერაპია">{lang === 'ka' ? 'თერაპია' : 'Therapy'}</option>
                      <option value="ორთოპედია">{lang === 'ka' ? 'ორთოპედია' : 'Orthopedics'}</option>
                      <option value="ორთოდონტია">{lang === 'ka' ? 'ორთოდონტია' : 'Orthodontics'}</option>
                      <option value="ქირურგია / ყბა-სახე">{lang === 'ka' ? 'ქირურგია / ყბა-სახე' : 'Surgery / Maxillofacial'}</option>
                      <option value="პაროდონტოლოგია">{lang === 'ka' ? 'პაროდონტოლოგია' : 'Periodontology'}</option>
                      <option value="რადიოლოგია">{lang === 'ka' ? 'რადიოლოგია' : 'Radiology'}</option>
                      <option value="კონსულტაცია">{lang === 'ka' ? 'კონსულტაცია' : 'Consultation'}</option>
                    </select>
                  </div>

                  {selectedDoctor && (
                    <div className="field">
                      <label>{lang === 'ka' ? 'არჩეული ექიმი' : 'Selected Doctor'}</label>
                      <input 
                        type="text" 
                        value={selectedDoctor} 
                        disabled 
                        className="opacity-75"
                      />
                    </div>
                  )}

                  <button className="btn btn-primary" type="submit">
                    {lang === 'ka' ? 'ვიზიტის დადასტურება' : 'Confirm Visit'}
                  </button>
                </form>
              )}
              <small>{lang === 'ka' ? 'დაჭერით გაიხსნება წერილი · ან დარეკე: 555 585 356' : 'Click opens email client · Or call: 555 585 356'}</small>
            </div>
          </div>

          <div className="cstrip">
            <a className="citem" href="tel:+995555585356" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              <span className="ic"><Phone className="w-5 h-5" /></span>
              <div>
                <div className="lab">{lang === 'ka' ? 'დარეკე' : 'Call'}</div>
                <div className="val">555 585 356</div>
              </div>
            </a>

            <div className="citem" onClick={() => setShowMapModal(true)} style={{ cursor: 'pointer' }}>
              <span className="ic"><MapPin className="w-5 h-5" /></span>
              <div>
                <div className="lab">{lang === 'ka' ? 'მისამართი' : 'Address'}</div>
                <button className="val" style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', textAlign: 'left', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>{lang === 'ka' ? 'ბალანჩივაძეების 14, თბილისი' : '14 Balanchivadze St, Tbilisi'}</button>
              </div>
            </div>

            <a className="citem" href="mailto:Smileagency2020@gmail.com" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              <span className="ic"><Mail className="w-5 h-5" /></span>
              <div>
                <div className="lab">{lang === 'ka' ? 'ელ. ფოსტა' : 'Email'}</div>
                <div className="val">Smileagency2020@gmail.com</div>
              </div>
            </a>

            <div 
              className="citem" 
              onClick={() => {
                const bookingSec = document.getElementById('booking');
                if (bookingSec) {
                  bookingSec.scrollIntoView({ behavior: 'smooth' });
                }
              }} 
              style={{ cursor: 'pointer' }}
            >
              <span className="ic"><Clock className="w-5 h-5" /></span>
              <div>
                <div className="lab">{lang === 'ka' ? 'საათები' : 'Hours'}</div>
                <div className="val">{lang === 'ka' ? 'ორშ – შაბ: 9:00–22:00 · კვ: 11:00–18:00' : 'Mon - Sat: 9:00-22:00 · Sun: 11:00-18:00'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
       <footer>
        <div className="wrap">
          <a href="#top" className="brand">
            <img src={`${import.meta.env.BASE_URL}images/logo.webp?v=4`} alt="Smile Agency Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            {lang === 'ka' ? 'ღიმილის სააგენტო' : 'Smile Agency'}
          </a>
          <div className="foot-links">
            <a href="#dashboard">{lang === 'ka' ? 'მთავარი' : 'Home'}</a>
            <a href="#services">{lang === 'ka' ? 'სერვისები' : 'Services'}</a>
            <a href="#doctors">{lang === 'ka' ? 'ექიმები' : 'Doctors'}</a>
            <a href="https://www.facebook.com/SmileAgency.ge/" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
          <p>{lang === 'ka' ? '© 2026 ღიმილის სააგენტო · სტომატოლოგიური კლინიკა · თბილისი' : '© 2026 Smile Agency · Dental Clinic · Tbilisi'}</p>
        </div>
      </footer>

      {/* RECIPEVERSE STYLE GLOWING CHATBOT WIDGET */}
      <div className="floating-container">
        
        {showChat && (
          <div className="chat-window">
            {/* Header with Glowing Sphere */}
            <div className="chat-header-recipe">
              <div className="chat-sphere" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Fingerprint className="w-5 h-5 text-white/80" style={{ mixBlendMode: 'overlay', pointerEvents: 'none' }} />
              </div>
              <h4>SmileBot</h4>
              <p>{lang === 'ka' ? 'აქტიური დამხმარე' : 'Active Assistant'}</p>
              <button onClick={() => { playClickSound(); setShowChat(false); }} className="chat-close-recipe" aria-label="დახურვა">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Viewport */}
            <div className="chat-viewport">
              {messages.map((m) => (
                <div key={m.id} className={`chat-msg-row ${m.sender === 'user' ? 'user' : 'bot'}`}>
                  <div className={`chat-msg ${m.sender === 'user' ? 'user' : 'bot'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions / Chips */}
            <div className="chat-quick-actions">
              <div className="chat-quick-btns">
                <button onClick={() => handleBotQuery('services', lang === 'ka' ? 'სერვისები' : 'Services')} className="chat-quick-btn">
                  {lang === 'ka' ? 'სერვისები' : 'Services'}
                </button>
                <button onClick={() => handleBotQuery('prices', lang === 'ka' ? 'ფასები' : 'Prices')} className="chat-quick-btn">
                  {lang === 'ka' ? 'ფასები' : 'Prices'}
                </button>
                <button onClick={() => handleBotQuery('contact', lang === 'ka' ? 'მისამართი' : 'Address')} className="chat-quick-btn">
                  {lang === 'ka' ? 'მისამართი' : 'Address'}
                </button>
              </div>
            </div>

            {/* Input Form with Airplane Icon */}
            <form onSubmit={handleCustomMessageSubmit} className="chat-input-form">
              <input 
                type="text" 
                placeholder={lang === 'ka' ? 'ჩაწერეთ შეტყობინება...' : 'Type a message...'} 
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="chat-input"
              />
              <button type="submit" className="chat-send-btn" aria-label="გაგზავნა">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        <button 
          onClick={() => {
            setShowChat(!showChat)
            setChatUnread(0)
          }}
          className={`float-btn ${showChat ? 'active' : ''}`}
        >
          {showChat ? <X className="w-5 h-5" /> : (
            <>
              <MessageSquare className="w-5 h-5" />
              {chatUnread > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {chatUnread}
                </span>
              )}
            </>
          )}
        </button>

      </div>

      {/* ABOUT US MODAL OVERLAY */}
      {showAboutModal && (
        <div className="modal-overlay" onClick={() => setShowAboutModal(false)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => { playClickSound(); setShowAboutModal(false); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent-color)] mb-2 block">
                {lang === 'ka' ? '✦ კლინიკის შესახებ' : '✦ About Clinic'}
              </span>
              <h3 className="font-serif font-bold text-xl text-[#33353A] mb-4">
                {lang === 'ka' ? 'ღიმილის სააგენტო — უმაღლესი სტანდარტის სტომატოლოგია' : 'Smile Agency — Dental Care of Highest Standards'}
              </h3>
              <p className="text-sm leading-relaxed text-[#5A5D64] mb-3">
                {lang === 'ka' 
                  ? '„ღიმილის სააგენტო“ 2020 წლიდან ზრუნავს თქვენს ჯანსაღ და ესთეტიკურ ღიმილზე. ჩვენი გუნდი აერთიანებს 18 მაღალკვალიფიციურ, გამოცდილ სტომატოლოგს, რომლებიც მუდმივად ეუფლებიან მკურნალობის თანამედროვე, საერთაშორისო მეთოდებს.'
                  : 'Since 2020, Smile Agency has been caring for your healthy and beautiful smile. Our team brings together 18 highly qualified, experienced dentists who continuously master modern, international treatment methods.'}
              </p>
              <p className="text-sm leading-relaxed text-[#5A5D64] mb-6">
                {lang === 'ka'
                  ? 'კლინიკა აღჭურვილია ულტრათანამედროვე ციფრული სადიაგნოსტიკო აპარატურით, რაც უზრუნველყოფს მკურნალობის მაქსიმალურ სიზუსტეს, უსაფრთხოებას და კომფორტს ყოველი პაციენტისთვის. ჩვენი მიზანია შევქმნათ თბილი, უმტკივნეულო გარემო, სადაც პრემიუმ ხარისხის მომსახურება ხელმისაწვდომია მთელი ოჯახისთვის.'
                  : 'The clinic is equipped with state-of-the-art digital diagnostic equipment, ensuring maximum precision, safety, and comfort for every patient. Our goal is to create a warm, painless environment where premium quality services are accessible to the whole family.'}
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <div className="glass-neu p-4 text-center" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.1)' }}>
                  <div className="text-2xl font-bold text-[var(--accent-color)] font-serif">2020</div>
                  <div className="text-[10px] font-bold text-[#8A8E98] uppercase mt-1">
                    {lang === 'ka' ? 'წლიდან ბაზარზე' : 'Since 2020 on Market'}
                  </div>
                </div>
                <div className="glass-neu p-4 text-center" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.1)' }}>
                  <div className="text-2xl font-bold text-[var(--accent-color)] font-serif">18</div>
                  <div className="text-[10px] font-bold text-[#8A8E98] uppercase mt-1">
                    {lang === 'ka' ? 'ექიმის გუნდი' : 'Doctors Team'}
                  </div>
                </div>
                <div className="glass-neu p-4 text-center" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.1)' }}>
                  <div className="text-2xl font-bold text-[var(--accent-color)] font-serif">10K+</div>
                  <div className="text-[10px] font-bold text-[#8A8E98] uppercase mt-1">
                    {lang === 'ka' ? 'პაციენტი' : 'Patients'}
                  </div>
                </div>
                <div className="glass-neu p-4 text-center" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.1)' }}>
                  <div className="text-2xl font-bold text-[var(--accent-color)] font-serif">7/7</div>
                  <div className="text-[10px] font-bold text-[#8A8E98] uppercase mt-1">
                    {lang === 'ka' ? 'ღიაა ყოველდღე' : 'Open Daily'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TEAM MODAL OVERLAY */}
      {showTeamModal && (
        <div className="modal-overlay" onClick={() => setShowTeamModal(false)}>
          <div className="modal-card wide glass-neu" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => { playClickSound(); setShowTeamModal(false); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent-color)] mb-2 block">
                ✦ {lang === 'ka' ? 'კლინიკის გუნდი' : 'Clinic Team'}
              </span>
              <h3 className="font-serif font-bold text-xl text-[#33353A] mb-4">{lang === 'ka' ? 'ჩვენი პროფესიონალი ექიმები' : 'Our Professional Doctors'}</h3>
              
              {/* Category Pill Filters */}
              <div className="service-track">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => { playClickSound(); setActiveCategory(cat); }}
                    className={`service-chip ${activeCategory === cat ? 'active' : ''}`}
                  >
                    {lang === 'ka' ? cat : ({ 'ყველა': 'All', 'თერაპია': 'Therapy', 'ორთოდონტია': 'Orthodontics', 'ორთოპედია': 'Orthopedics', 'ქირურგია': 'Surgery', 'იმპლანტოლოგია': 'Implantology', 'ბავშვთა სტომატოლოგია': 'Pediatric Dentistry', 'პაროდონტოლოგია': 'Periodontology', 'ასისტენტი': 'Assistant' }[cat] || cat)}
                  </button>
                ))}
              </div>

              {/* Dynamic Doctor Search bar */}
              <div className="search-container">
                <Search className="search-icon w-5 h-5" />
                <input 
                  type="text" 
                  placeholder={lang === 'ka' ? "მოძებნე ექიმი ან სპეციალობა..." : "Search doctor or specialty..."} 
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Doctors Grid */}
              <div className="doctor-app-grid" style={{ maxHeight: '50vh', overflowY: 'auto', paddingRight: '6px' }}>
                {filteredDoctors.map((d, i) => {
                  const init = d.n.split(" ").map(w => w[0]).join("")
                  const details = getDoctorDetailsByName(d.n, lang)
                  const ratingInfo = getDoctorRating(d.n)
                  return (
                    <article 
                      key={i} 
                      className="doctor-app-card"
                      onClick={() => {
                        playClickSound();
                        if (details) {
                          setActiveDoctorDetail(details);
                        } else {
                          setActiveDoctorDetail({
                            name: d.n,
                            role: d.s,
                            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
                            specialization: d.s,
                            bio: lang === 'ka' ? "„ღიმილის სააგენტოს“ გამოცდილი სპეციალისტი." : "Experienced specialist at Smile Agency.",
                            education: lang === 'ka' ? "უმაღლესი სამედიცინო განათლება, რეზიდენტურა და სერთიფიკატები." : "Higher medical education, residency and certificates."
                          });
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="doctor-app-top">
                        <div className="doctor-app-avatar" style={{ background: GRADS[i % GRADS.length], overflow: 'hidden' }}>
                          {details && details.image ? (
                            <img src={details.image} alt={lang === 'ka' ? d.n : (getDoctorDetailsByName(d.n, 'en') ? getDoctorDetailsByName(d.n, 'en').name : d.n)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            init
                          )}
                        </div>
                        <div className="doctor-app-info">
                          <h3 title={lang === 'ka' ? d.n : (getDoctorDetailsByName(d.n, 'en') ? getDoctorDetailsByName(d.n, 'en').name : d.n)}>{lang === 'ka' ? d.n : (getDoctorDetailsByName(d.n, 'en') ? getDoctorDetailsByName(d.n, 'en').name : d.n)}</h3>
                          <p title={details ? details.role : d.s}>{details ? details.role : d.s}</p>
                          <span className="doctor-profile-link">{lang === 'ka' ? 'დეტალურად ➔' : 'Details ➔'}</span>
                        </div>
                      </div>
                      <div className="doctor-app-meta">
                        <span className="doctor-app-badge flex items-center gap-1" title={lang === 'ka' ? `${ratingInfo.count} შეფასება` : `${ratingInfo.count} reviews`}>
                          <Star className="w-3.5 h-3.5 fill-current" style={{ color: '#FFB800' }} />
                          {ratingInfo.average} ({ratingInfo.count})
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            playClickSound();
                            setShowTeamModal(false);
                            handleSelectDoctorForBooking(d.n, d.s);
                          }}
                          className="doctor-app-btn"
                        >
                          {lang === 'ka' ? 'დაჯავშნა' : 'Book'}
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
              {filteredDoctors.length === 0 && (
                <div className="text-center py-12 text-[#8A8E98]">
                  {lang === 'ka' ? 'ექიმი მოცემული სპეციალობით ვერ მოიძებნა.' : 'No doctor found with the selected specialty.'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* RESULTS MODAL OVERLAY */}
      {showResultsModal && (
        <div className="modal-overlay" onClick={() => setShowResultsModal(false)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => { playClickSound(); setShowResultsModal(false); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent-color)] mb-2 block">
                ✦ {lang === 'ka' ? 'მკურნალობის შედეგები' : 'Treatment Results'}
              </span>
              <h3 className="font-serif font-bold text-xl text-[#33353A] mb-4">{lang === 'ka' ? 'ჩვენი წარმატებული ქეისები' : 'Our Successful Cases'}</h3>
              <p className="text-sm text-[#5A5D64] mb-6">
                {lang === 'ka' ? 'გაეცანით ჩვენი პაციენტების მკურნალობის შედეგებს. თითოეული ღიმილი ინდივიდუალური ზრუნვისა და მაღალი პროფესიონალიზმის შედეგია.' : 'Explore our patient treatment outcomes. Every smile is a result of individual care and high professionalism.'}
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm text-[#33353A] mb-1">{lang === 'ka' ? 'იმპლანტაცია და ესთეტიკური პროტეზირება' : 'Implantation & Aesthetic Prosthetics'}</h4>
                  <p className="text-xs text-[#5A5D64] mb-2">{lang === 'ka' ? 'სრული რესტავრაცია ცირკონიუმის გვირგვინებით. პაციენტს აღუდგა ღეჭვითი ფუნქცია და სრულყოფილი ესთეტიკა.' : 'Full restoration with zirconia crowns. Patient restored chewing function and perfect aesthetics.'}</p>
                  <span className="text-[10px] font-bold text-[var(--accent-color)] uppercase">{lang === 'ka' ? 'ხანგრძლივობა: 3 კვირა' : 'Duration: 3 Weeks'}</span>
                </div>

                <div className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm text-[#33353A] mb-1">{lang === 'ka' ? 'კბილთა გასწორება (ორთოდონტია)' : 'Teeth Straightening (Orthodontics)'}</h4>
                  <p className="text-xs text-[#5A5D64] mb-2">{lang === 'ka' ? 'კბილთა მწკრივისა და თანკბილვის გასწორება ლითონის თვითლიგირებადი ბრეკეტ-სისტემით.' : 'Teeth alignment and bite correction with self-ligating metal braces.'}</p>
                  <span className="text-[10px] font-bold text-[var(--accent-color)] uppercase">{lang === 'ka' ? 'ხანგრძლივობა: 14 თვე' : 'Duration: 14 Months'}</span>
                </div>

                <div className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm text-[#33353A] mb-1">{lang === 'ka' ? 'პროფესიული წმენდა და გათეთრება' : 'Professional Cleaning & Whitening'}</h4>
                  <p className="text-xs text-[#5A5D64] mb-2">{lang === 'ka' ? 'ნადებისა და კბილის ქვების მოცილება ულტრაბგერითა და Air-Flow აპარატით, რასაც მოჰყვა კლინიკური გათეთრება 4 ტონით.' : 'Removal of calculus and plaque using ultrasound and Air-Flow, followed by 4-shade clinical whitening.'}</p>
                  <span className="text-[10px] font-bold text-[var(--accent-color)] uppercase">{lang === 'ka' ? 'ხანგრძლივობა: 1 სეანსი' : 'Duration: 1 Session'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRICES MODAL OVERLAY */}
      {showPricesModal && (
        <div className="modal-overlay" onClick={() => setShowPricesModal(false)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px', width: '90%', maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '32px 24px 24px 24px' }}>
            <button 
              onClick={() => { playClickSound(); setShowPricesModal(false); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 10 }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
              <div style={{ paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.4)', flexShrink: 0 }}>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent-color)] mb-1 block">
                  ✦ {lang === 'ka' ? 'ფასების კატალოგი' : 'Price Catalog'}
                </span>
                <h3 className="font-serif font-bold text-xl text-[#33353A] mb-1">{lang === 'ka' ? 'კლინიკის სერვისების ფასები' : 'Clinical Service Prices'}</h3>
                <p className="text-xs text-[#5A5D64]">
                  {lang === 'ka' ? 'Smile Agency გთავაზობთ გამჭვირვალე ფასებს. მკურნალობის საბოლოო გეგმა დგინდება ექიმთან კონსულტაციისას.' : 'Smile Agency offers transparent pricing. The final treatment plan is set during consultation.'}
                </p>
              </div>

              {/* Tab Category Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                overflowX: 'auto', 
                padding: '12px 0', 
                flexShrink: 0, 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }} className="no-scrollbar">
                {[
                  "ზოგადი მომსახურება",
                  "აღდგენითი თერაპია",
                  "ენდოდონტია (არხების მკურნალობა)",
                  "პაროდონტოლოგია და ჰიგიენა",
                  "ბავშვთა სტომატოლოგია",
                  "ქირურგია",
                  "იმპლანტოლოგია",
                  "ორთოპედია",
                  "ორთოდონტია",
                  "კბილის სამკაული"
                ].map((categoryName) => {
                  const isActive = (activePriceCategory || "ზოგადი მომსახურება") === categoryName;
                  return (
                    <button
                      key={categoryName}
                      onClick={() => setActivePriceCategory(categoryName)}
                      className={`phone-onboarding-btn-secondary ${isActive ? 'active-price-tab' : ''}`}
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.75rem',
                        whiteSpace: 'nowrap',
                        borderRadius: '20px',
                        backgroundColor: isActive ? 'var(--accent-color)' : 'rgba(255,255,255,0.5)',
                        color: isActive ? '#fff' : 'var(--text-color)',
                        boxShadow: isActive ? 'inset 1px 1px 3px rgba(0,0,0,0.15)' : '1px 1px 3px rgba(0,0,0,0.05)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {categoryName}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Area */}
              <div style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '4px', marginBlock: '8px' }} className="custom-scrollbar">
                {(() => {
                  const currentCatName = activePriceCategory || "ზოგადი მომსახურება";
                  const pricingData = {
                    "ზოგადი მომსახურება": [
                      { n: "პროფესიონალური ჰიგიენა", p: "150₾ - 270₾" },
                      { n: "კოფერდამი", p: "20₾" },
                      { n: "ვიზიოგრაფია", p: "10₾" },
                      { n: "კბილების გათეთრება", p: "700₾ - 1700₾" }
                    ],
                    "აღდგენითი თერაპია": [
                      { n: "Estelite", p: "150₾" },
                      { n: "Gradia", p: "180₾" },
                      { n: "Asteria", p: "210₾" },
                      { n: "Omnichroma", p: "230₾" },
                      { n: "მხატვრული რესტავრაცია", p: "250₾" },
                      { n: "ზედაპირული კარიესი", p: "120₾ - 180₾" },
                      { n: "საშუალო კარიესი", p: "180₾ - 250₾" },
                      { n: "ღრმა კარიესი", p: "170₾ - 250₾" },
                      { n: "მერილენდის ხიდი", p: "600₾" }
                    ],
                    "ენდოდონტია (არხების მკურნალობა)": [
                      { n: "Guttafusion - ერთი არხი", p: "220₾" },
                      { n: "Guttafusion - რთული არხები", p: "300₾ - 400₾" },
                      { n: "Endobunic - ერთი არხი", p: "160₾" },
                      { n: "Endobunic - რთული არხები", p: "200₾ - 230₾" },
                      { n: "Reciproc - ერთი არხი", p: "180₾" },
                      { n: "Reciproc - რთული არხები", p: "300₾" },
                      { n: "შიდა გათეთრება", p: "100₾" },
                      { n: "არხის დაბჟენის მოხსნა", p: "70₾" },
                      { n: "წკირი მოხსნა", p: "60₾" },
                      { n: "მინა-ბოჭკოვანი წკირი", p: "70₾" },
                      { n: "ლითონის წკირი", p: "40₾" },
                      { n: "პერფორაციის დახურვა", p: "100₾" }
                    ],
                    "პაროდონტოლოგია და ჰიგიენა": [
                      { n: "ქვების და ნადების მოცილება", p: "150₾" },
                      { n: "Kavo აპარატით წმენდა", p: "170₾" },
                      { n: "აბრაზიული პასტით გაპრიალება", p: "90₾" },
                      { n: "Air-flow წმენდა", p: "170₾" },
                      { n: "KAVO Air-flow წმენდა", p: "230₾" },
                      { n: "პაროდონტოლოგიური სტატუსი", p: "70₾" },
                      { n: "ღრძილის მკურნალობა / კორექცია", p: "60₾ - 70₾" },
                      { n: "ფრენექტომია", p: "120₾" },
                      { n: "ფტორირება", p: "50₾" },
                      { n: "არტაშანირება", p: "140₾" }
                    ],
                    "ბავშვთა სტომატოლოგია": [
                      { n: "ექსტრაქცია (ნემსის გარეშე)", p: "40₾" },
                      { n: "ექსტრაქცია (ანესთეზიით)", p: "60₾" },
                      { n: "ფისურების ჰერმეტიზაცია", p: "60₾" },
                      { n: "სარძევე კბილის კარიესი", p: "70₾ - 120₾" },
                      { n: "პულპიტი, პერიოდონტიტი", p: "130₾ - 150₾" },
                      { n: "ბავშვთა ჰიგიენური წმენდა", p: "100₾" }
                    ],
                    "ქირურგია": [
                      { n: "ანესთეზია", p: "20₾ - 30₾" },
                      { n: "კბილის ამოღება", p: "30₾ - 70₾" },
                      { n: "ფესვის ამოღება", p: "50₾ - 150₾" },
                      { n: "სიბრძნის კბილის ამოღება", p: "300₾" },
                      { n: "რეტინირებული კბილის ამოღება", p: "150₾ - 350₾" },
                      { n: "ფესვის მწვერვალის რეზექცია", p: "250₾ - 300₾" },
                      { n: "სინუს ლიფტი", p: "800₾ - 2000₾" },
                      { n: "აუგმენტაცია (ძვლის გადანერგვა)", p: "400₾ - 2000₾" }
                    ],
                    "იმპლანტოლოგია": [
                      { n: "MIS (ისრაელი)", p: "1000₾" },
                      { n: "Neobiotech (კორეა)", p: "1000₾" },
                      { n: "MIS C1 (ისრაელი)", p: "1500₾" },
                      { n: "Schutz (გერმანია)", p: "2000₾" },
                      { n: "Straumann (შვეიცარია)", p: "2500₾" }
                    ],
                    "ორთოპედია": [
                      { n: "ცირკონო-კერამიკის გვირგვინი", p: "350₾ - 500₾" },
                      { n: "მეტალო-კერამიკის გვირგვინი", p: "180₾" },
                      { n: "პრეს-კერამიკის ვინირი", p: "700₾ - 750₾" },
                      { n: "ბრუქსიზმის კაპა", p: "220₾" },
                      { n: "მოსახსნელი პროტეზი", p: "500₾ - 1000₾" },
                      { n: "პროტეზი იმპლანტებზე", p: "2200₾ - 3200₾" }
                    ],
                    "ორთოდონტია": [
                      { n: "მეტალის ბრეკეტები", p: "1500₾" },
                      { n: "კერამიკული ბრეკეტები", p: "2500₾" },
                      { n: "საფირის ბრეკეტები", p: "3000₾ - 3500₾" },
                      { n: "თვითლიგირებადი ბრეკეტები", p: "3500₾ - 5500₾" },
                      { n: "ელაინერები", p: "1800$ - 6000$" },
                      { n: "სპლინტ თერაპია", p: "500₾ - 1700₾" }
                    ],
                    "კბილის სამკაული": [
                      { n: "ცირკონი", p: "50₾" },
                      { n: "სვაროვსკი", p: "70₾" },
                      { n: "ბრილიანტი", p: "150₾" }
                    ]
                  };
                  return (
                    <div className="flex flex-col gap-2">
                      {(pricingData[currentCatName] || []).map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2 border-b border-[#33353A]/10" style={{ gap: '12px' }}>
                          <span className="text-xs font-semibold text-[#33353A]">{lang === 'ka' ? item.n : ({
  "პროფესიონალური ჰიგიენა": "Professional Hygiene",
  "კოფერდამი": "Rubber Dam",
  "ვიზიოგრაფია": "Radiography / RVG",
  "კბილების გათეთრება": "Teeth Whitening",
  "მხატვრული რესტავრაცია": "Artistic Restoration",
  "ზედაპირული კარიესი": "Superficial Caries",
  "საშუალო კარიესი": "Medium Caries",
  "ღრმა კარიესი": "Deep Caries",
  "მერილენდის ხიდი": "Maryland Bridge",
  "Guttafusion - ერთი არხი": "Guttafusion - One Canal",
  "Guttafusion - რთული არხები": "Guttafusion - Complex Canals",
  "Endobunic - ერთი არხი": "Endobunic - One Canal",
  "Endobunic - რთული არხები": "Endobunic - Complex Canals",
  "Reciproc - ერთი არხი": "Reciproc - One Canal",
  "Reciproc - რთული არხები": "Reciproc - Complex Canals",
  "შიდა გათეთრება": "Internal Bleaching",
  "არხის დაბჟენის მოხსნა": "Root Canal Unfilling",
  "წკირი მოხსნა": "Post Removal",
  "მინა-ბოჭკოვანი წკირი": "Glass Fiber Post",
  "ლითონის წკირი": "Metal Post",
  "პერფორაციის დახურვა": "Perforation Closure",
  "ქვების და ნადების მოცილება": "Scaling & Plaque Removal",
  "Kavo აპარატით წმენდა": "KaVo Device Cleaning",
  "აბრაზიული პასტით გაპრიალება": "Abrasive Paste Polishing",
  "Air-flow წმენდა": "Air-Flow Cleaning",
  "KAVO Air-flow წმენდა": "KaVo Air-Flow Cleaning",
  "პაროდონტოლოგიური სტატუსი": "Periodontal Status Chart",
  "ღრძილის მკურნალობა / კორექცია": "Gum Treatment / Contouring",
  "ფრენექტომია": "Frenectomy",
  "ფტორირება": "Fluoridation",
  "არტაშანირება": "Tooth Splinting",
  "ექსტრაქცია (ნემსის გარეშე)": "Extraction (Without Needle)",
  "ექსტრაქცია (ანესთეზიით)": "Extraction (With Anesthesia)",
  "ფისურების ჰერმეტიზაცია": "Fissure Sealant",
  "სარძევე კბილის კარიესი": "Primary Tooth Caries Treatment",
  "პულპიტი, პერიოდონტიტი": "Primary Tooth Pulpitis/Periodontitis",
  "ბავშვთა ჰიგიენური წმენდა": "Pediatric Prophylaxis",
  "ანესთეზია": "Local Anesthesia",
  "კბილის ამოღება": "Tooth Extraction",
  "ფესვის ამოღება": "Root Fragment Removal",
  "სიბრძნის კბილის ამოღება": "Wisdom Tooth Extraction",
  "რეტინირებული კბილის ამოღება": "Impacted Tooth Extraction",
  "ფესვის მწვერვალის რეზექცია": "Apicoectomy (Root Resection)",
  "სინუს ლიფტი": "Sinus Lift Surgery",
  "აუგმენტაცია (ძვლის გადანერგვა)": "Bone Augmentation",
  "MIS (ისრაელი)": "MIS Implants (Israel)",
  "Neobiotech (კორეა)": "Neobiotech Implants (Korea)",
  "MIS C1 (ისრაელი)": "MIS C1 Premium (Israel)",
  "Schutz (გერმანია)": "Schütz Dental (Germany)",
  "Straumann (შვეიცარია)": "Straumann Premium (Switzerland)",
  "ცირკონო-კერამიკის გვირგვინი": "Zirconia Ceramic Crown",
  "მეტალო-კერამიკის გვიგვინი": "Metal Ceramic Crown",
  "მეტალო-კერამიკის გვირგვინი": "Metal Ceramic Crown",
  "პრეს-კერამიკის ვინირი": "E-max Press Veneer",
  "ბრუქსიზმის კაპა": "Bruxism Night Guard",
  "მოსახსნელი პროტეზი": "Removable Denture",
  "პროტეზი იმპლანტებზე": "Overdenture on Implants",
  "მეტალის ბრეკეტები": "Metal Braces",
  "კერამიკული ბრეკეტები": "Ceramic Braces",
  "საფირის ბრეკეტები": "Sapphire Braces",
  "თვითლიგირებადი ბრეკეტები": "Self-Ligating Braces",
  "ელაინერები": "Clear Aligners",
  "სპლინტ თერაპია": "Splint Therapy",
  "ცირკონი": "Zircon Tooth Gem",
  "სვაროვსკი": "Swarovski Crystal",
  "ბრილიანტი": "Diamond Tooth Gem"
}[item.n] || item.n)}</span>
                          <div style={{ flexGrow: 1, borderBottom: '1px dotted rgba(51, 53, 58, 0.2)', marginInline: '8px', height: '8px' }} />
                          <span className="text-xs font-black text-[var(--accent-color)] px-3 py-1" style={{ backgroundColor: 'rgba(var(--accent-color-rgb), 0.12)', borderRadius: '12px', whiteSpace: 'nowrap' }}>
                            {item.p}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              <div style={{ flexShrink: 0, marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.4)', paddingTop: '12px', textAlign: 'center' }}>
                <a 
                  href="#booking" 
                  onClick={() => setShowPricesModal(false)}
                  className="phone-onboarding-btn" 
                  style={{ display: 'inline-flex', width: 'auto', padding: '10px 24px', fontSize: '0.85rem' }}
                >
                  {lang === 'ka' ? 'უფასო კონსულტაციის დაჯავშნა' : 'Book Free Consultation'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BLOG MODAL OVERLAY */}
      {showBlogModal && (
        <div className="modal-overlay" onClick={() => setShowBlogModal(false)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => { playClickSound(); setShowBlogModal(false); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent-color)] mb-2 block">
                ✦ {lang === 'ka' ? 'კლინიკის ბლოგი' : 'Clinic Blog'}
              </span>
              <h3 className="font-serif font-bold text-xl text-[#33353A] mb-4">{lang === 'ka' ? 'რჩევები ორალური ჰიგიენისთვის' : 'Tips for Oral Hygiene'}</h3>
              
              <div className="flex flex-col gap-4">
                <article className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm text-[#33353A] mb-1">{lang === 'ka' ? 'როგორ მოვუაროთ ბრეკეტებს სწორად?' : 'How to care for braces correctly?'}</h4>
                  <p className="text-xs text-[#5A5D64] mb-2">{lang === 'ka' ? 'გაიგეთ, როგორ გამოიყენოთ სპეციალური ორთოდონტიული ჯაგრისები და ფლოსი ბრეკეტებით მკურნალობის პერიოდში სრულყოფილი სისუფთავის შესანარჩუნებლად.' : 'Learn how to use special orthodontic brushes and floss during braces treatment to maintain perfect cleanliness.'}</p>
                  <a href="#booking" onClick={() => { playClickSound(); setShowBlogModal(false); }} className="text-[10px] font-bold text-[var(--accent-color)] uppercase flex items-center gap-1">{lang === 'ka' ? 'დაჯავშნე კონსულტაცია' : 'Book Consultation'} <ChevronRight className="w-3 h-3" /></a>
                </article>

                <article className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm text-[#33353A] mb-1">{lang === 'ka' ? 'კბილის იმპლანტაციის 5 უპირატესობა' : '5 Advantages of Dental Implants'}</h4>
                  <p className="text-xs text-[#5A5D64] mb-2">{lang === 'ka' ? 'რატომ არის იმპლანტი საუკეთესო და ყველაზე ბუნებრივი არჩევანი დაკარგული კბილების აღსადგენად. როგორ გვეხმარება ის მეზობელი კბილების შენარჩუნებაში.' : 'Why implants are the best and most natural choice for replacing missing teeth. How they help preserve adjacent teeth.'}</p>
                  <a href="#booking" onClick={() => { playClickSound(); setShowBlogModal(false); }} className="text-[10px] font-bold text-[var(--accent-color)] uppercase flex items-center gap-1">{lang === 'ka' ? 'დაჯავშნე კონსულტაცია' : 'Book Consultation'} <ChevronRight className="w-3 h-3" /></a>
                </article>

                <article className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm text-[#33353A] mb-1">{lang === 'ka' ? 'როგორ ავიცილოთ თავიდან კარიესი?' : 'How to Avoid Caries?'}</h4>
                  <p className="text-xs text-[#5A5D64] mb-2">{lang === 'ka' ? 'ყოველდღიური მარტივი რჩევები, კვების რაციონის კორექტირება და სწორი ჰიგიენური ჩვევები, რომლებიც დაიცავს თქვენს ემალს დაზიანებისგან.' : 'Simple daily tips, diet adjustments, and correct hygiene habits that protect your enamel from damage.'}</p>
                  <a href="#booking" onClick={() => { playClickSound(); setShowBlogModal(false); }} className="text-[10px] font-bold text-[var(--accent-color)] uppercase flex items-center gap-1">{lang === 'ka' ? 'დაჯავშნე კონსულტაცია' : 'Book Consultation'} <ChevronRight className="w-3 h-3" /></a>
                </article>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EQUIPMENT MODAL OVERLAY */}
      {showEquipModal && (
        <div className="modal-overlay" onClick={() => setShowEquipModal(false)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', width: '92%', maxHeight: '85vh', overflowY: 'auto' }}>
            <button 
              onClick={() => { playClickSound(); setShowEquipModal(false); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent-color)] mb-2 block">
                ✦ {lang === 'ka' ? 'უახლესი ტექნოლოგიები' : 'Latest Technologies'}
              </span>
              <h3 className="font-serif font-bold text-xl text-[#33353A] mb-4">{lang === 'ka' ? 'ჩვენი საუკეთესო აპარატურა' : 'Our Premium Equipment'}</h3>
              <p className="text-xs text-[#5A5D64] mb-6">
                {lang === 'ka' ? 'ღიმილის სააგენტო აღჭურვილია წამყვანი ევროპული და ამერიკული ბრენდების ულტრათანამედროვე აპარატურით, რაც მკურნალობის მაქსიმალურ სიზუსტეს, უსაფრთხოებასა და უმტკივნეულო პროცესს გარანტირებს.' : 'Smile Agency is equipped with state-of-the-art instruments from leading European and American brands, ensuring maximum precision, safety, and a painless treatment experience.'}
              </p>
              
              <div className="flex flex-col gap-4">
                <article className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm text-[#33353A] mb-1">{lang === 'ka' ? 'სტომატოლოგიური მიკროსკოპი (Leica / Zeiss)' : 'Dental Microscope (Leica / Zeiss)'}</h4>
                  <p className="text-xs text-[#5A5D64] mb-2">{lang === 'ka' ? 'კბილის ფესვის არხების მკურნალობისას უზრუნველყოფს 30-ჯერად გადიდებას. გვეხმარება ყველაზე რთულად შესამჩნევი ანატომიური დეტალების დანახვასა და მკურნალობაში.' : 'Provides 30x magnification during root canal treatments, helping us see and treat the most complex anatomical details.'}</p>
                  <a href="#booking" onClick={() => { playClickSound(); setSelectedService('კონსულტაცია'); setShowEquipModal(false); }} className="text-[10px] font-bold text-[var(--accent-color)] uppercase flex items-center gap-1">{lang === 'ka' ? 'დაჯავშნე კონსულტაცია' : 'Book Consultation'} <ChevronRight className="w-3 h-3" /></a>
                </article>

                <article className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm text-[#33353A] mb-1">{lang === 'ka' ? '3D კომპიუტერული ტომოგრაფი (CBCT)' : '3D Computer Tomography (CBCT)'}</h4>
                  <p className="text-xs text-[#5A5D64] mb-2">{lang === 'ka' ? 'ულტრა-დაბალი გამოსხივების ციფრული 3D დიაგნოსტიკა. წამებში ვიღებთ ყბა-კბილთა სისტემის უზუსტეს სამგანზომილებიან სურათს მკურნალობის უშეცდომო დაგეგმვისთვის.' : 'Digital 3D diagnostics with ultra-low radiation. We obtain a precise 3D image of the jaw system within seconds for error-free planning.'}</p>
                  <a href="#booking" onClick={() => { playClickSound(); setSelectedService('კონსულტაცია'); setShowEquipModal(false); }} className="text-[10px] font-bold text-[var(--accent-color)] uppercase flex items-center gap-1">{lang === 'ka' ? 'დაჯავშნე კონსულტაცია' : 'Book Consultation'} <ChevronRight className="w-3 h-3" /></a>
                </article>

                <article className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm text-[#33353A] mb-1">{lang === 'ka' ? 'შიდა პირის ღრუს 3D სკანერი (3Shape TRIOS)' : 'Intraoral 3D Scanner (3Shape TRIOS)'}</h4>
                  <p className="text-xs text-[#5A5D64] mb-2">{lang === 'ka' ? 'ტრადიციული, უსიამოვნო ანაბეჭდების მასების ნაცვლად, პირის ღრუს სწრაფი, კომფორტული და ზუსტი ციფრული სკანირება ვინირებისა და გვირგვინების დასამზადებლად.' : 'Instead of messy traditional impressions, fast and highly comfortable digital intraoral scanning is used to fabricate veneers and crowns.'}</p>
                  <a href="#booking" onClick={() => { playClickSound(); setSelectedService('კონსულტაცია'); setShowEquipModal(false); }} className="text-[10px] font-bold text-[var(--accent-color)] uppercase flex items-center gap-1">{lang === 'ka' ? 'დაჯავშნე კონსულტაცია' : 'Book Consultation'} <ChevronRight className="w-3 h-3" /></a>
                </article>

                <article className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm text-[#33353A] mb-1">{lang === 'ka' ? 'სტომატოლოგიური ლაზერი (Biolase)' : 'Dental Laser (Biolase)'}</h4>
                  <p className="text-xs text-[#5A5D64] mb-2">{lang === 'ka' ? 'რბილი ქსოვილების უმტკივნეულო, უსისხლო და ნაკლებად ინვაზიური მკურნალობისთვის. გამოიყენება ღრძილების პლასტიკაში, სტერილიზაციასა და თერაპიაში.' : 'Painless, bloodless, and less invasive treatments of soft tissues. Used in gum contouring, root canal sterilization, and therapy.'}</p>
                  <a href="#booking" onClick={() => { playClickSound(); setSelectedService('კონსულტაცია'); setShowEquipModal(false); }} className="text-[10px] font-bold text-[var(--accent-color)] uppercase flex items-center gap-1">{lang === 'ka' ? 'დაჯავშნე კონსულტაცია' : 'Book Consultation'} <ChevronRight className="w-3 h-3" /></a>
                </article>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SERVICE DETAILS MODAL OVERLAY */}
      {activeServiceDetail && (
        <div className="modal-overlay" onClick={() => setActiveServiceDetail(null)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', width: '92%' }}>
            <button 
              onClick={() => { playClickSound(); setActiveServiceDetail(null); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent-color)] mb-2 flex items-center gap-2">
                ✦ {renderServiceIcon(activeServiceDetail.key)} {lang === 'ka' ? 'სერვისის დეტალები' : 'Service Details'}
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#33353A] mb-4 mt-2">
                {getServiceDetailTranslated(activeServiceDetail, lang).title}
              </h3>
              <p className="text-sm text-[#5A5D64] leading-relaxed mb-6">
                {getServiceDetailTranslated(activeServiceDetail, lang).desc}
              </p>
              
              <h4 className="font-bold text-xs text-[#33353A] mb-3 uppercase tracking-wider">
                {lang === 'ka' ? 'მანიპულაციები და პროცედურები:' : 'Treatments & Procedures:'}
              </h4>
              <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
                {activeServiceDetail.subs && getServiceDetailTranslated(activeServiceDetail, lang).subs.map((sub, i) => (
                  <div key={i} className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)', background: 'rgba(255, 255, 255, 0.25)' }}>
                    <h5 className="font-bold text-sm text-[#33353A] mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-color)' }}></span>
                      {sub.title}
                    </h5>
                    <p className="text-xs text-[#5A5D64] leading-relaxed">{sub.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    playClickSound();
                    let formService = activeServiceDetail.title;
                    if (formService === 'ქირურგია' || formService === 'ყბა-სახის ქირურგია') {
                      formService = 'ქირურგია / ყბა-სახე';
                    } else if (formService === 'ბავშვთა სტომატოლოგია' || formService === 'ესთეტიკური სტომატოლოგია' || formService === 'იმპლანტოლოგია' || formService === 'ენდოდონტია') {
                      formService = 'კონსულტაცია';
                    }
                    setSelectedService(formService);
                    setActiveServiceDetail(null);
                    const bookingSec = document.getElementById('booking');
                    if (bookingSec) {
                      bookingSec.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="phone-onboarding-btn"
                  style={{ width: 'auto', padding: '12px 24px' }}
                >
                  {lang === 'ka' ? 'ჩაეწერე კონსულტაციაზე' : 'Book Consultation'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ENAMEL DETAILS MODAL OVERLAY */}
      {activeEnamelDetail && (
        <div className="modal-overlay" onClick={() => setActiveEnamelDetail(null)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px', width: '92%' }}>
            <button 
              onClick={() => { playClickSound(); setActiveEnamelDetail(null); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent-color)] mb-2 flex items-center gap-2">
                ✦ {lang === 'ka' ? 'პროფილაქტიკა & დაცვა' : 'Prophylaxis & Protection'}
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#33353A] mb-4 mt-2">
                {getEnamelDetailTranslated(activeEnamelDetail, lang).title}
              </h3>
              
              <div className="glass-neu p-4 mb-4" style={{ background: 'rgba(var(--accent-color-rgb), 0.05)', border: '1px solid rgba(var(--accent-color-rgb), 0.15)', boxShadow: 'none' }}>
                <h4 className="font-bold text-xs text-[var(--accent-color)] mb-2 uppercase tracking-wider">
                  {lang === 'ka' ? 'როგორ აზიანებს ემალს:' : 'How it damages enamel:'}
                </h4>
                <p className="text-sm text-[#5A5D64] leading-relaxed">
                  {getEnamelDetailTranslated(activeEnamelDetail, lang).damage}
                </p>
              </div>

              <div className="glass-neu p-4" style={{ background: 'rgba(255, 255, 255, 0.25)', boxShadow: 'none' }}>
                <h4 className="font-bold text-xs text-[#33353A] mb-2 uppercase tracking-wider">
                  {lang === 'ka' ? 'რეკომენდაცია / პრევენცია:' : 'Recommendation / Prevention:'}
                </h4>
                <p className="text-sm text-[#5A5D64] leading-relaxed">
                  {getEnamelDetailTranslated(activeEnamelDetail, lang).tip}
                </p>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    playClickSound();
                    setSelectedService('კონსულტაცია');
                    setActiveEnamelDetail(null);
                    const bookingSec = document.getElementById('booking');
                    if (bookingSec) {
                      bookingSec.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="phone-onboarding-btn"
                  style={{ width: 'auto', padding: '12px 24px' }}
                >
                  {lang === 'ka' ? 'ჩაეწერე კონსულტაციაზე' : 'Book Consultation'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DOCTOR DETAILS MODAL OVERLAY */}
      {activeDoctorDetail && (
        <div className="modal-overlay" onClick={() => setActiveDoctorDetail(null)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px', width: '92%' }}>
            <button 
              onClick={() => { playClickSound(); setActiveDoctorDetail(null); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left items-start">
              {/* Left Column: Doctor Avatar */}
              <div className="md:col-span-5 flex justify-center">
                <img 
                  src={activeDoctorDetail.image} 
                  alt={activeDoctorDetail.name} 
                  className="rounded-3xl shadow-lg object-cover" 
                  style={{ width: '100%', aspectRatio: '4/5', maxWidth: '240px' }}
                />
              </div>

              {/* Right Column: Info */}
              <div className="md:col-span-7">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent-color)] mb-1 block">
                  ✦ {lang === 'ka' ? 'პროფესიონალი ექიმი' : 'Professional Doctor'}
                </span>
                <h3 className="font-serif font-bold text-2xl text-[#33353A] mb-1">
                  {activeDoctorDetail.name}
                </h3>
                <span className="text-xs font-bold text-[#8A8E98] block mb-3">
                  {activeDoctorDetail.role}
                </span>

                {/* 5-Star interactive rating system */}
                <div className="mb-4 glass-neu p-3" style={{ background: 'rgba(255, 255, 255, 0.25)', border: '1px solid rgba(var(--accent-color-rgb), 0.15)' }}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-color)] mb-0.5">{lang === 'ka' ? 'შეფასება და რეიტინგი' : 'Ratings & Reviews'}</h4>
                      <p className="text-xs text-[#5A5D64]" style={{ margin: 0 }}>
                        <span>{lang === 'ka' ? 'რეიტინგი:' : 'Rating:'}</span> <strong className="text-[#33353A]">{getDoctorRating(activeDoctorDetail.name).average} / 5</strong> ({getDoctorRating(activeDoctorDetail.name).count} {lang === 'ka' ? 'ხმა' : 'votes'})
                      </p>
                    </div>
                    <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
                      {[1, 2, 3, 4, 5].map((star) => {
                        const userRating = getDoctorRating(activeDoctorDetail.name).userRating;
                        // Fill if hovered, or if not hovering, fill if rating exists
                        const isGold = hoverRating > 0 ? star <= hoverRating : (userRating ? star <= userRating : false);
                        return (
                          <button
                            key={star}
                            onClick={() => {
                              if (authUser) {
                                handleRateDoctor(activeDoctorDetail.name, star);
                              } else {
                                setPendingRating({ doctorName: activeDoctorDetail.name, score: star });
                                setShowAuthModal(true);
                              }
                            }}
                            onMouseEnter={() => setHoverRating(star)}
                            className="transition-transform hover:scale-125 focus:outline-none"
                            style={{ background: 'none', border: 'none', padding: '2px', cursor: 'pointer' }}
                            title={lang === 'ka' ? `შეაფასე ${star} ვარსკვლავით` : `Rate ${star} Stars`}
                          >
                            <Star 
                              className="w-4 h-4 transition-colors" 
                              style={{ 
                                color: isGold ? '#FFB800' : '#D1D1D6', 
                                fill: isGold ? '#FFB800' : 'none' 
                              }} 
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {getDoctorRating(activeDoctorDetail.name).userRating && (
                    <div className="text-[10px] text-[#28A745] font-bold mt-1.5 flex items-center gap-1">
                      lang === 'ka' ? `✦ გმადლობთ შეფასებისთვის! (თქვენ მიანიჭეთ ${getDoctorRating(activeDoctorDetail.name).userRating} ვარსკვლავი)` : `✦ Thank you for rating! (You gave ${getDoctorRating(activeDoctorDetail.name).userRating} stars)`
                    </div>
                  )}
                </div>

                {activeDoctorDetail.bio && (
                  <div className="mb-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-color)] border-b border-[var(--accent-color)]/10 pb-1 mb-2">{lang === 'ka' ? 'მოკლე მიმოხილვა' : 'Brief Overview'}</h4>
                    <p className="text-xs text-[#5A5D64] leading-relaxed whitespace-pre-line">{activeDoctorDetail.bio}</p>
                  </div>
                )}

                {activeDoctorDetail.education && (
                  <div className="mb-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-color)] border-b border-[var(--accent-color)]/10 pb-1 mb-2">{lang === 'ka' ? 'განათლება და კურსები' : 'Education & Courses'}</h4>
                    <p className="text-xs text-[#5A5D64] leading-relaxed whitespace-pre-line">{activeDoctorDetail.education}</p>
                  </div>
                )}

                {activeDoctorDetail.specialization && (
                  <div className="mb-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-color)] border-b border-[var(--accent-color)]/10 pb-1 mb-2">{lang === 'ka' ? 'სპეციალიზაცია' : 'Specialization'}</h4>
                    <p className="text-xs text-[#5A5D64] leading-relaxed whitespace-pre-line">{activeDoctorDetail.specialization}</p>
                  </div>
                )}

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      playClickSound();
                      setSelectedDoctor(activeDoctorDetail.name);
                      setActiveDoctorDetail(null);
                      setShowTeamModal(false);
                      const bookingSec = document.getElementById('booking');
                      if (bookingSec) {
                        bookingSec.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="phone-onboarding-btn"
                    style={{ width: 'auto', padding: '10px 20px', fontSize: '12px' }}
                  >
                    {lang === 'ka' ? 'ჩაეწერე ვიზიტზე' : 'Book Visit'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RATING AUTHENTICATION MODAL */}
      {showAuthModal && (
        <div className="modal-overlay" style={{ zIndex: 3000 }} onClick={() => {
          setShowAuthModal(false);
          setPendingRating(null);
          setAuthError('');
        }}>
          <div className="modal-card glass-neu text-left" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', width: '90%', padding: '28px' }}>
            <button 
              onClick={() => {
                playClickSound();
                setShowAuthModal(false);
                setPendingRating(null);
                setAuthError('');
              }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            
            <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent-color)] mb-1.5 block">
              ✦ {lang === 'ka' ? 'ვერიფიკაცია' : 'Verification'}
            </span>
            <h3 className="font-serif font-bold text-lg text-[#33353A] mb-2">{lang === 'ka' ? 'შეფასების დადასტურება' : 'Confirm Rating'}</h3>
            <p className="text-xs text-[#5A5D64] mb-4">
              {lang === 'ka' ? 'ექიმის შესაფასებლად გთხოვთ მიუთითოთ თქვენი სახელი, გვარი და ნამდვილი ტელეფონის ნომერი.' : 'To rate the doctor, please specify your full name and valid phone number.'}
            </p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              
              // Validate mobile number: must start with 5 and be exactly 9 digits
              const cleanPhone = authPhone.replace(/\s+/g, '').replace('+995', '');
              const georgianMobileRegex = /^5\d{8}$/;
              
              if (!authName.trim() || authName.trim().split(/\s+/).length < 2) {
                setAuthError(lang === 'ka' ? 'გთხოვთ მიუთითოთ სახელი და გვარი (მაგ: გიორგი მაისურაძე)' : 'Please enter full name (e.g. John Doe)');
                return;
              }
              
              if (!georgianMobileRegex.test(cleanPhone)) {
                setAuthError(lang === 'ka' ? 'მიუთითეთ ნამდვილი მობილურის ნომერი (მაგ: 599 xx xx xx)' : 'Please enter valid phone number (e.g. 599 xx xx xx)');
                return;
              }
              
              const verifiedUser = {
                name: authName.trim(),
                phone: '+995 ' + cleanPhone.slice(0, 3) + ' ' + cleanPhone.slice(3, 5) + ' ' + cleanPhone.slice(5, 7) + ' ' + cleanPhone.slice(7, 9)
              };
              
              setAuthUser(verifiedUser);
              localStorage.setItem('smile_auth_user', JSON.stringify(verifiedUser));
              setAuthError('');
              setShowAuthModal(false);
              
              if (pendingRating) {
                handleRateDoctor(pendingRating.doctorName, pendingRating.score, verifiedUser);
                setPendingRating(null);
              }
            }}>
              <div className="field mb-3">
                <label className="text-xs font-bold text-[#33353A] mb-1 block">სახელი და გვარი</label>
                <input 
                  type="text" 
                  placeholder={lang === 'ka' ? "მაგ: გიორგი მაისურაძე" : "e.g., John Doe"}
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', fontSize: '12px' }}
                />
              </div>
              
              <div className="field mb-3">
                <label className="text-xs font-bold text-[#33353A] mb-1 block">ტელეფონის ნომერი</label>
                <input 
                  type="tel" 
                  placeholder="5xx xx xx xx"
                  value={authPhone}
                  onChange={(e) => setAuthPhone(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', fontSize: '12px' }}
                />
              </div>
              
              {authError && (
                <div className="text-xs font-bold text-red-500 mb-3" style={{ color: '#E74C3C' }}>
                  ⚠️ {authError}
                </div>
              )}
              
              <button 
                type="submit" 
                className="phone-onboarding-btn mt-2" 
                style={{ width: '100%', padding: '12px', fontSize: '12px' }}
              >
                {lang === 'ka' ? 'შესვლის დადასტურება' : 'Confirm & Login'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* GOOGLE MAPS MODAL OVERLAY */}
      {showMapModal && (
        <div className="modal-overlay" onClick={() => setShowMapModal(false)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', width: '92%', padding: '24px' }}>
            <button 
              onClick={() => { playClickSound(); setShowMapModal(false); }} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left mb-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent-color)] mb-1 block">
                ✦ {lang === 'ka' ? 'კლინიკის მდებარეობა' : 'Clinic Location'}
              </span>
              <h3 className="font-serif font-bold text-xl text-[#33353A]">{lang === 'ka' ? 'გვიპოვეთ რუკაზე' : 'Find Us on Map'}</h3>
              <p className="text-xs text-[#8A8E98] mt-1">{lang === 'ka' ? 'მელიტონ და ანდრია ბალანჩივაძეების ქ. 14, თბილისი' : '14 Meliton & Andria Balanchivadze St, Tbilisi'}</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-inner border border-[var(--accent-color)]/10" style={{ width: '100%', height: '400px' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.8966209593453!2d44.77977467667475!3d41.72274467125368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440ccdb692b67f%3A0xc3b8fb3286f0d8bd!2s14%20Meliton%20and%20Andria%20Balanchivadze%20St%2C%20Tbilisi!5e0!3m2!1sen!2sge!4v1714500000000!5m2!1sen!2sge" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
