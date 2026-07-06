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
  Fingerprint
} from 'lucide-react'

// Doctor list
const DOCTORS = [
  { n: "ანი ჩოგოვაძე", s: "იმპლანტოლოგია · ყბა-სახის ქირურგია · კონსულტაცია" },
  { n: "დიმიტრი გვარჯალაძე", s: "თერაპია · ორთოდონტია · კონსულტაცია" },
  { n: "ნატო შენგელია", s: "ბავშვთა სტომატოლოგია · კონსულტაცია" },
  { n: "ლიკა დავლიანიძე", s: "ყბა-სახის ქირურგია · ქირურგია / ყბა-სახე · კონსულტაცია" },
  { n: "ოთარ ჩაკვეტაძე", s: "თერაპია · პაროდონტოლოგია · კონსულტაცია" },
  { n: "შორენა შიოშვილი", s: "ბავშვთა სტომატოლოგია · თერაპია · კონსულტაცია" },
  { n: "ანა ოყუჯავა", s: "თერაპია · ქირურგია / ყბა-სახე · კონსულტაცია" },
  { n: "თეა ბერიძე", s: "ბავშვთა სტომატოლოგია · თერაპია · კონსულტაცია" },
  { n: "ჯენი ფირცხალავა", s: "ბავშვთა სტომატოლოგია · თერაპია · კონსულტაცია" },
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

const BOT_RESPONSES = {
  welcome: 'გამარჯობა! მე ვარ SmileBot. რით შემიძლია დაგეხმაროთ დღეს? აირჩიეთ კითხვა ან მოგვწერეთ:',
  services: 'ღიმილის სააგენტოში გთავაზობთ სრულ სტომატოლოგიურ მომსახურებას: თერაპია (კარიესის მკურნალობა), ორთოპედია (პროთეზირება, გვირგვინები), ორთოდონტია (ბრეკეტები, ელაინერებით სწორება), ქირურგია და იმპლანტაცია, პაროდონტოლოგია და ციფრული რენტგენოგრაფია. დეტალური ინფორმაციისთვის შეგიძლიათ ეწვიოთ საიტზე სერვისების განყოფილებას.',
  prices: 'კლინიკაში მოქმედებს ხელმისაწვდომი ფასები. კონსულტაცია უფასოა იმპლანტაციისა და პროტეზირების მკურნალობის გეგმის შედგენისას. დეტალური ფასები განისაზღვრება ექიმთან ვიზიტისას.',
  contact: 'კლინიკა მდებარეობს თბილისში, მელიტონ და ანდრია ბალანჩივაძეების ქ. 14. სამუშაო საათები: ყოველდღე 9:00 - 22:00. ტელეფონი: 555 58 53 56.'
}

const MONTHS = ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"]
const WDS = ["ორ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ", "კვ"]
const TIMES = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]

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

const getDoctorDetailsByName = (name) => {
  const cleanName = name.replace(/\s+/g, '').toLowerCase();
  for (const key of Object.keys(DOCTORS_DETAILS)) {
    const doc = DOCTORS_DETAILS[key];
    const docCleanName = doc.name.replace(/\s+/g, '').toLowerCase();
    if (docCleanName === cleanName) {
      return { ...doc, key };
    }
  }
  return null;
}

const playClickSound = () => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05);
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
  // Navigation states
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Doctor filtering states
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('ყველა')
  const categories = ['ყველა', 'თერაპია', 'ორთოდონტია', 'ორთოპედია', 'ქირურგია', 'იმპლანტოლოგია', 'ბავშვთა სტომატოლოგია', 'პაროდონტოლოგია', 'ასისტენტი']

  // Floating chatbot states
  const [showChat, setShowChat] = useState(false)
  const [chatUnread, setChatUnread] = useState(1)
  const [customMessage, setCustomMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: BOT_RESPONSES.welcome }
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
  const [activeServiceDetail, setActiveServiceDetail] = useState(null)
  const [activeDoctorDetail, setActiveDoctorDetail] = useState(null)
  const [showMapModal, setShowMapModal] = useState(false)
  const [activeEnamelDetail, setActiveEnamelDetail] = useState(null)

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

  const handleRateDoctor = async (name, score) => {
    const newRatings = { ...doctorRatings, [name]: score };
    setDoctorRatings(newRatings);
    try {
      localStorage.setItem('smile_doctor_ratings', JSON.stringify(newRatings));
    } catch (e) {}
    
    const text = `⭐️ <b>ახალი შეფასება!</b>\n👨‍⚕️ ექიმი: <b>${name}</b>\n🌟 შეფასება: <b>${score} / 5 ვარსკვლავი</b>`;
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
    
    const userMsg = `💬 <b>SmileBot ჩატი</b>\n👤 <b>პაციენტი:</b> ${userText}`
    sendTelegramMessage(userMsg)

    setTimeout(() => {
      let botText = ''
      if (queryType === 'services') botText = BOT_RESPONSES.services
      else if (queryType === 'prices') botText = BOT_RESPONSES.prices
      else if (queryType === 'contact') botText = BOT_RESPONSES.contact
      
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botText }])
      
      const botMsg = `💬 <b>SmileBot ჩატი</b>\n🤖 <b>ბოტი:</b> ${botText}`
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
    
    const userMsg = `💬 <b>SmileBot ჩატი (ახალი კითხვა)</b>\n👤 <b>პაციენტი:</b> ${userText}`
    sendTelegramMessage(userMsg)

    setTimeout(() => {
      const botText = "გმადლობთ შეტყობინებისთვის! თქვენი შეკითხვა გადაეცა ადმინისტრატორს და უახლოეს დროში დაგიკავშირდებით ტელეფონით."
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botText }])
      
      const botMsg = `💬 <b>SmileBot ჩატი</b>\n🤖 <b>ბოტი:</b> ${botText}`
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
      alert('გთხოვთ შეავსოთ ყველა აუცილებელი ველი და აირჩიოთ თარიღი/საათი!')
      return
    }
    
    const dateStr = `${selectedDate.getDate()} ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
    
    const bookingMsg = `📅 <b>ახალი ჯავშანი Smile Agency-ში!</b>\n\n` +
                       `👤 <b>პაციენტი:</b> ${patientName}\n` +
                       `📞 <b>ტელეფონი:</b> ${patientPhone}\n` +
                       `🦷 <b>მიმართულება:</b> ${selectedService}\n` +
                       `👤 <b>ექიმი:</b> ${selectedDoctor || 'არ არის არჩეული'}\n` +
                       `📅 <b>თარიღი:</b> ${dateStr}\n` +
                       `⏰ <b>საათი:</b> ${selectedTime}`
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
            <img src="/images/logo.png?v=2" alt="Smile Agency Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            ღიმილის სააგენტო
          </a>
          <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} id="navLinks">
            <a href="#dashboard" onClick={() => setMobileMenuOpen(false)} className="active">მთავარი</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>სერვისები</a>
            <a href="#doctors-portal" onClick={() => setMobileMenuOpen(false)}>ექიმები</a>
            <a href="#booking" onClick={() => setMobileMenuOpen(false)}>დაჯავშნა</a>
          </nav>
          <a href="#booking" className="nav-cta">
            <CalendarIcon className="w-4 h-4" />
            დაჯავშნე ვიზიტი
          </a>
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
                <source src="/images/ქავერი.mp4?v=5" type="video/mp4" />
              </video>
            </div>
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <h2 className="phone-onboarding-title" style={{ fontSize: '2rem' }}>გაიღიმეთ თავდაჯერებულად!</h2>
              <p className="phone-onboarding-subtitle" style={{ fontSize: '1.05rem', maxWidth: '800px', marginInline: 'auto', marginBottom: '32px' }}>სრული სტომატოლოგიური მომსახურება, თანამედროვე აღჭურვილობა და 18 პროფესიონალი ექიმის გუნდი ერთ სივრცეში.</p>
            </div>
            <div className="phone-onboarding-actions" style={{ maxWidth: '480px', marginInline: 'auto' }}>
              <a href="#booking" className="phone-onboarding-btn">დაჯავშნე ვიზიტი</a>
              <a href="tel:+995555585356" className="phone-onboarding-btn-secondary">დარეკე კლინიკაში</a>
            </div>
          </div>
        </div>
      </section>

      {/* COMPACT SERVICES */}
      <section className="block" id="services" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head text-left">
            <span className="eyebrow">მიმართულებები</span>
            <h2>სრულყოფილი სტომატოლოგიური სერვისები</h2>
            <p>დიაგნოსტიკიდან რთულ ქირურგიულ ჩარევამდე — მკურნალობის სრული ციკლი ერთ სივრცეში.</p>
          </div>
          <div className="svc-grid">
            <article className="svc" onClick={() => setActiveServiceDetail({ ...SERVICES_DETAILS.therapy, key: 'therapy' })}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 3c2.5 0 3.2 1 5 1s2.6-.8 3.7.2C22 5.5 21.5 9 20.4 12.8 19.5 15.8 19 19 17.3 19c-1.4 0-1.6-2.2-2.8-3.5-.7-.8-2.3-.8-3 0C10.3 16.8 10.1 19 8.7 19 7 19 6.5 15.8 5.6 12.8 4.5 9 4 5.5 5.3 4.2 6.4 3.2 7.3 4 9 4s2.5-1 3-1Z"/>
                </svg>
              </div>
              <h3>თერაპია</h3>
              <p>კარიესისა და გართულებების მკურნალობა კბილის შენარჩუნებით.</p>
            </article>

            <article className="svc" onClick={() => setActiveServiceDetail({ ...SERVICES_DETAILS.orthopedics, key: 'orthopedics' })}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 10h16M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M8 10v8a2 2 0 0 1-4 0M16 10v8a2 2 0 0 0 4 0"/>
                </svg>
              </div>
              <h3>ორთოპედია</h3>
              <p>გვიგვინები, ხიდები და პროტეზირება დაკარგული კბილებისთვის.</p>
            </article>

            <article className="svc" onClick={() => setActiveServiceDetail({ ...SERVICES_DETAILS.orthodontics, key: 'orthodontics' })}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 7h16M4 12h16M4 17h16"/>
                  <circle cx="8" cy="7" r="1.5" fill="currentColor"/>
                  <circle cx="14" cy="12" r="1.5" fill="currentColor"/>
                  <circle cx="10" cy="17" r="1.5" fill="currentColor"/>
                </svg>
              </div>
              <h3>ორთოდონტია</h3>
              <p>კბილების სწორება ბრეკეტებითა და გამჭვირვალე ელაინერებით.</p>
            </article>

            <article className="svc" onClick={() => setActiveServiceDetail({ ...SERVICES_DETAILS.surgery, key: 'surgery' })}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="m14.5 4.5 5 5L9 20l-5 1 1-5L15.5 5.5"/>
                  <path d="M13 6l5 5"/>
                </svg>
              </div>
              <h3>ქირურგია</h3>
              <p>კბილის ამოღება, რეზექცია და ქირურგიული მანიპულაციები.</p>
            </article>

            <article className="svc" onClick={() => setActiveServiceDetail({ ...SERVICES_DETAILS.pediatrics, key: 'pediatrics' })}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9.5 9.5c.3-.3.7-.5 1.1-.5.4 0 .8.2 1.1.5.3.3.5.7.5 1.1s-.2.8-.5 1.1"/><path d="M14.5 9.5c.3-.3.7-.5 1.1-.5.4 0 .8.2 1.1.5.3.3.5.7.5 1.1s-.2.8-.5 1.1M8 15s1.5 2 4 2 4-2 4-2"/>
                </svg>
              </div>
              <h3>ბავშვთა სტომატოლოგია</h3>
              <p>პატარა პაციენტების მკურნალობა მეგობრულ, უმტკივნეულო გარემოში.</p>
            </article>

            <article className="svc" onClick={() => setActiveServiceDetail({ ...SERVICES_DETAILS.maxillofacial, key: 'maxillofacial' })}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                  <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/>
                </svg>
              </div>
              <h3>ყბა-სახის ქირურგია</h3>
              <p>ყბა-სახის სისტემის რთული ოპერაციები და რეკონსტრუქცია.</p>
            </article>

            <article className="svc" onClick={() => setActiveServiceDetail({ ...SERVICES_DETAILS.endodontics, key: 'endodontics' })}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m9.5 9.5 5 5M14.5 9.5l-5 5"/>
                </svg>
              </div>
              <h3>ენდოდონტია</h3>
              <p>კბილის ფესვის არხების მაღალი სიზუსტის მკურნალობა მიკროსკოპით.</p>
            </article>

            <article className="svc" onClick={() => setActiveServiceDetail({ ...SERVICES_DETAILS.aesthetics, key: 'aesthetics' })}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="m12 3-1.912 5.886H3.894l4.948 3.596L6.93 18.368 12 14.772l5.07 3.596-1.912-5.886 4.948-3.596h-6.194L12 3Z"/>
                </svg>
              </div>
              <h3>ესთეტიკური სტომატოლოგია</h3>
              <p>ვინირები, კბილების გათეთრება და ღიმილის სრული დიზაინი.</p>
            </article>

            <article className="svc" onClick={() => setActiveServiceDetail({ ...SERVICES_DETAILS.implantology, key: 'implantology' })}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
                </svg>
              </div>
              <h3>იმპლანტოლოგია</h3>
              <p>დაკარგული კბილების აღდგენა თანამედროვე პრემიუმ იმპლანტებით.</p>
            </article>

            <article className="svc" onClick={() => setActiveServiceDetail({ ...SERVICES_DETAILS.periodontology, key: 'periodontology' })}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8M12 12c0 2.2-1.8 4-4 4s-4-1.8-4-4"/>
                </svg>
              </div>
              <h3>პაროდონტოლოგია</h3>
              <p>ღრძილების მკურნალობა, გაჯანსაღება და დაავადებების პრევენცია.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ACTIVE DOCTORS PORTAL SECTION */}
      <section className="block" id="doctors-portal" style={{ paddingTop: 0 }}>
        <div className="wrap text-left">
          <div className="glass-neu">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#E08A79] mb-2 block">
              ✦ რჩეული ექიმები და სერვისები
            </span>
            <h2 className="font-serif font-bold text-2xl text-[#33353A] mb-5">აირჩიე მიმართულება</h2>
            
            {/* Category Pill Filters */}
            <div className="service-track">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`service-chip ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Dynamic Doctor Search bar */}
            <div className="search-container">
              <Search className="search-icon w-5 h-5" />
              <input 
                type="text" 
                placeholder="მოძებნე ექიმი ან სპეციალობა..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Dynamic Doctors Grid */}
            <div className="doctor-app-grid">
              {filteredDoctors.slice(0, 6).map((d, i) => {
                const init = d.n.split(" ").map(w => w[0]).join("")
                const details = getDoctorDetailsByName(d.n)
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
                          bio: "„ღიმილის სააგენტოს“ გამოცდილი სპეციალისტი.",
                          education: "უმაღლესი სამედიცინო განათლება, რეზიდენტურა და სერთიფიკატები."
                        });
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="doctor-app-top">
                      <div className="doctor-app-avatar" style={{ background: GRADS[i % GRADS.length], overflow: 'hidden' }}>
                        {details && details.image ? (
                          <img src={details.image} alt={d.n} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          init
                        )}
                      </div>
                      <div className="doctor-app-info">
                        <h3 title={d.n}>{d.n}</h3>
                        <p title={d.s}>{d.s}</p>
                      </div>
                    </div>
                    <div className="doctor-app-meta">
                      <span className="doctor-app-badge flex items-center gap-1" title={`${ratingInfo.count} შეფასება`}>
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
                        დაჯავშნა
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
            {filteredDoctors.length === 0 && (
              <div className="text-center py-12 text-[#8E8E93]">
                ექიმი მოცემული სპეციალობით ვერ მოიძებნა.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* REDESIGNED ENAMEL ENEMIES CARDS */}
      <section className="block" id="enamel" style={{paddingTop: 0}}>
        <div className="wrap">
          <div className="head text-left">
            <span className="eyebrow">პროფილაქტიკა</span>
            <h2>რა აზიანებს კბილის ემალს</h2>
            <p>ყოველდღიური ჩვევები, რომლებიც კბილს აფერადებს და ასუსტებს — და რასაც პროფესიული მოვლა აბალანსებს.</p>
          </div>
          
          <div className="enamel-layout">
            <div className="enamel-grid">
              <div className="enamel-card" onClick={() => { playTic(); setActiveEnamelDetail(ENAMEL_DETAILS.sweets); }} style={{ cursor: 'pointer' }}>
                <div className="enamel-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 9h16M9 5v14M14 5v14"/>
                  </svg>
                </div>
                <div className="enamel-card-content">
                  <h3>შოკოლადი & ტკბილეული</h3>
                  <p>შაქარი და მჟავები, რომლებიც ასუსტებენ კბილის მინანქარს და ზრდიან კარიესის რისკს.</p>
                </div>
              </div>

              <div className="enamel-card" onClick={() => { playTic(); setActiveEnamelDetail(ENAMEL_DETAILS.smoking); }} style={{ cursor: 'pointer' }}>
                <div className="enamel-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17 6c0-1.5-1-2-1-3M13 6c0-1.5-1-2-1-3M4 10h13a3 3 0 0 1 0 6h-1M4 10v4a5 5 0 0 0 5 5h3a5 5 0 0 0 5-5"/>
                  </svg>
                </div>
                <div className="enamel-card-content">
                  <h3>მოწევა</h3>
                  <p>ნიკოტინი და ტარი, რომლებიც იწვევენ კბილის გაყვითლებას, ნადებს და აზიანებენ ღრძილებს.</p>
                </div>
              </div>

              <div className="enamel-card" onClick={() => { playTic(); setActiveEnamelDetail(ENAMEL_DETAILS.coffee); }} style={{ cursor: 'pointer' }}>
                <div className="enamel-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M18 8h1a3 3 0 0 1 0 6h-1M4 8h14v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z"/><path d="M6 2v2M10 2v2M14 2v2"/>
                  </svg>
                </div>
                <div className="enamel-card-content">
                  <h3>ყავა & ჩაი</h3>
                  <p>ძლიერი პიგმენტები და ტანინები, რომლებიც ღრმად აღწევენ მინანქარში და ტოვებენ მუქ ლაქებს.</p>
                </div>
              </div>
            </div>

            <div className="enamel-info-pane">
              <div className="enamel-info-video">
                <video autoPlay loop muted playsInline>
                  <source src="/images/glass_tooth_nerves.mp4" type="video/mp4" />
                </video>
              </div>
              <h3>პროფესიული დაცვა</h3>
              <p>პროფესიული წმენდა, გათეთრება და პროფილაქტიკა ემალს იცავს — დაჯავშნე ჰიგიენის ვიზიტი წელიწადში ორჯერ.</p>
              <a href="#booking" className="btn btn-primary">დაჯავშნე ვიზიტი</a>
            </div>
          </div>
        </div>
      </section>

      {/* CLINICAL HUB PORTALS */}
      <section className="block" id="doctors" style={{paddingTop: 0}}>
        <div className="wrap text-left">
          <div className="head">
            <span className="eyebrow">კლინიკის მენიუ</span>
            <h2>გაეცანით დეტალებს</h2>
            <p>აირჩიეთ სასურველი სექცია კლინიკის შესახებ სრული ინფორმაციის მისაღებად.</p>
          </div>
          
          <div className="menu-hub-grid">
            
            <div className="menu-hub-card" onClick={() => setShowAboutModal(true)}>
              <div className="menu-hub-icon">
                <Award className="w-5 h-5" />
              </div>
              <h3>ჩვენს შესახებ</h3>
              <p>კლინიკის ისტორია და მიღწევები</p>
            </div>

            <div className="menu-hub-card" onClick={() => setShowTeamModal(true)}>
              <div className="menu-hub-icon">
                <Users className="w-5 h-5" />
              </div>
              <h3>ჩვენი გუნდი</h3>
              <p>გაიცანით 18 პროფესიონალი ექიმი</p>
            </div>

            <div className="menu-hub-card" onClick={() => setShowResultsModal(true)}>
              <div className="menu-hub-icon">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3>შედეგები</h3>
              <p>ჩვენი ნამუშევრები & ქეისები</p>
            </div>

            <div className="menu-hub-card" onClick={() => setShowPricesModal(true)}>
              <div className="menu-hub-icon">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3>ფასები</h3>
              <p>სერვისების ღირებულებების სია</p>
            </div>

            <div className="menu-hub-card" onClick={() => setShowBlogModal(true)}>
              <div className="menu-hub-icon">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3>ბლოგი</h3>
              <p>რჩევები ჯანსაღი ღიმილისთვის</p>
            </div>

          </div>
        </div>
      </section>

      {/* BOOKING CALENDAR */}
      <section className="block" id="booking" style={{paddingTop: 0}}>
        <div className="wrap text-left">
          <div className="head">
            <span className="eyebrow">ონლაინ დაჯავშნა</span>
            <h2>აირჩიე დღე და დრო</h2>
            <p>დაჯავშნე ვიზიტი კალენდარში — დაგიდასტურებთ ტელეფონით.</p>
          </div>
          
          <div className="booking">
            <div className="cal-pane">
              <div className="cal-top">
                <div className="m">
                  {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
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
                {WDS.map((w, idx) => (
                  <div key={idx} className="wd">{w}</div>
                ))}
                {daysList.map((day, idx) => {
                  if (!day) return <div key={`empty-${idx}`} className="day empty"></div>
                  const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString()
                  const isPast = day < today
                  const isSunday = day.getDay() === 0
                  const isDisabled = isPast || isSunday
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedDate(day)
                        setSelectedTime(null)
                      }}
                      disabled={isDisabled}
                      className={`day ${isSelected ? 'sel' : ''}`}
                      style={isSunday ? { opacity: 0.35, cursor: 'not-allowed', color: '#8A8E98' } : {}}
                    >
                      {day.getDate()}
                    </button>
                  )
                })}
              </div>

              <div className="slots-label">აირჩიე დრო</div>
              <div className="slots">
                {TIMES.map((time, idx) => {
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
              <h3>ვიზიტის დეტალები</h3>
              <p className="hint">შეავსე ველები და დაადასტურე.</p>
              
              <div className="picked">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/>
                </svg>
                <span>
                  {selectedDate && selectedTime 
                    ? `${selectedDate.getDate()} ${MONTHS[selectedDate.getMonth()]} · ${selectedTime}`
                    : 'ჯერ აირჩიე დღე და დრო'
                  }
                </span>
              </div>

              {bookingSuccess ? (
                <div className="text-center py-6 text-white">
                  <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto mb-3">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-sm mb-1">მოთხოვნა გაიგზავნა!</h4>
                  <p className="text-xs opacity-80">მალე დაგიკავშირდებით დასადასტურებლად.</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit}>
                  <div className="field">
                    <label>სახელი</label>
                    <input 
                      type="text" 
                      placeholder="თქვენი სახელი"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      onInvalid={(e) => e.target.setCustomValidity('გთხოვთ შეავსოთ ეს ველი')}
                      onInput={(e) => e.target.setCustomValidity('')}
                      required
                    />
                  </div>
                  
                  <div className="field">
                    <label>ტელეფონი</label>
                    <input 
                      type="tel" 
                      placeholder="5xx xx xx xx"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      onInvalid={(e) => e.target.setCustomValidity('გთხოვთ შეავსოთ ეს ველი')}
                      onInput={(e) => e.target.setCustomValidity('')}
                      required
                    />
                  </div>

                  <div className="field">
                    <label>მიმართულება</label>
                    <select 
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      <option>თერაპია</option>
                      <option>ორთოპედია</option>
                      <option>ორთოდონტია</option>
                      <option>ქირურგია / ყბა-სახე</option>
                      <option>პაროდონტოლოგია</option>
                      <option>რადიოლოგია</option>
                      <option>კონსულტაცია</option>
                    </select>
                  </div>

                  {selectedDoctor && (
                    <div className="field">
                      <label>არჩეული ექიმი</label>
                      <input 
                        type="text" 
                        value={selectedDoctor} 
                        disabled 
                        className="opacity-75"
                      />
                    </div>
                  )}

                  <button className="btn btn-primary" type="submit">
                    ვიზიტის დადასტურება
                  </button>
                </form>
              )}
              <small>დაჭერით გაიხსნება წერილი · ან დარეკე: 555 585 356</small>
            </div>
          </div>

          <div className="cstrip">
            <div className="citem">
              <span className="ic"><Phone className="w-5 h-5" /></span>
              <div>
                <div className="lab">დარეკე</div>
                <a className="val" href="tel:+995555585356">555 585 356</a>
              </div>
            </div>

            <div className="citem" onClick={() => setShowMapModal(true)} style={{ cursor: 'pointer' }}>
              <span className="ic"><MapPin className="w-5 h-5" /></span>
              <div>
                <div className="lab">მისამართი</div>
                <button className="val" style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', textAlign: 'left', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>ბალანჩივაძეების 14, თბილისი</button>
              </div>
            </div>

            <div className="citem">
              <span className="ic"><Mail className="w-5 h-5" /></span>
              <div>
                <div className="lab">ელ. ფოსტა</div>
                <a className="val" href="mailto:Smileagency2020@gmail.com">Smileagency2020@gmail.com</a>
              </div>
            </div>

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
                <div className="lab">საათები</div>
                <div className="val">ორშ – შაბ: 9:00–22:00 · კვ: დაკეტილი</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
       <footer>
        <div className="wrap">
          <a href="#top" className="brand">
            <img src="/images/logo.png?v=2" alt="Smile Agency Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            ღიმილის სააგენტო
          </a>
          <div className="foot-links">
            <a href="#dashboard">მთავარი</a>
            <a href="#services">სერვისები</a>
            <a href="#doctors">ექიმები</a>
            <a href="https://www.facebook.com/SmileAgency.ge/" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
          <p>© 2026 ღიმილის სააგენტო · სტომატოლოგიური კლინიკა · თბილისი</p>
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
              <p>აქტიური დამხმარე</p>
              <button onClick={() => setShowChat(false)} className="chat-close-recipe" aria-label="დახურვა">
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
                <button onClick={() => handleBotQuery('services', 'სერვისები')} className="chat-quick-btn">
                  სერვისები
                </button>
                <button onClick={() => handleBotQuery('prices', 'ფასები')} className="chat-quick-btn">
                  ფასები
                </button>
                <button onClick={() => handleBotQuery('contact', 'მისამართი')} className="chat-quick-btn">
                  მისამართი
                </button>
              </div>
            </div>

            {/* Input Form with Airplane Icon */}
            <form onSubmit={handleCustomMessageSubmit} className="chat-input-form">
              <input 
                type="text" 
                placeholder="ჩაწერეთ შეტყობინება..." 
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
              onClick={() => setShowAboutModal(false)} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E08A79] mb-2 block">
                ✦ კლინიკის შესახებ
              </span>
              <h3 className="font-serif font-bold text-xl text-[#33353A] mb-4">ღიმილის სააგენტო — უმაღლესი სტანდარტის სტომატოლოგია</h3>
              <p className="text-sm leading-relaxed text-[#5A5D64] mb-3">
                „ღიმილის სააგენტო“ 2020 წლიდან ზრუნავს თქვენს ჯანსაღ და ესთეტიკურ ღიმილზე. ჩვენი გუნდი აერთიანებს 18 მაღალკვალიფიციურ, გამოცდილ სტომატოლოგს, რომლებიც მუდმივად ეუფლებიან მკურნალობის თანამედროვე, საერთაშორისო მეთოდებს.
              </p>
              <p className="text-sm leading-relaxed text-[#5A5D64] mb-6">
                კლინიკა აღჭურვილია ულტრათანამედროვე ციფრული სადიაგნოსტიკო აპარატურით, რაც უზრუნველყოფს მკურნალობის მაქსიმალურ სიზუსტეს, უსაფრთხოებას და კომფორტს ყოველი პაციენტისთვის. ჩვენი მიზანია შევქმნათ თბილი, უმტკივნეულო გარემო, სადაც პრემიუმ ხარისხის მომსახურება ხელმისაწვდომია მთელი ოჯახისთვის.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <div className="glass-neu p-4 text-center" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.1)' }}>
                  <div className="text-2xl font-bold text-[#E08A79] font-serif">5+</div>
                  <div className="text-[10px] font-bold text-[#8A8E98] uppercase mt-1">წელი ბაზარზე</div>
                </div>
                <div className="glass-neu p-4 text-center" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.1)' }}>
                  <div className="text-2xl font-bold text-[#E08A79] font-serif">18</div>
                  <div className="text-[10px] font-bold text-[#8A8E98] uppercase mt-1">ექიმის გუნდი</div>
                </div>
                <div className="glass-neu p-4 text-center" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.1)' }}>
                  <div className="text-2xl font-bold text-[#E08A79] font-serif">10K+</div>
                  <div className="text-[10px] font-bold text-[#8A8E98] uppercase mt-1">პაციენტი</div>
                </div>
                <div className="glass-neu p-4 text-center" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.1)' }}>
                  <div className="text-2xl font-bold text-[#E08A79] font-serif">7/7</div>
                  <div className="text-[10px] font-bold text-[#8A8E98] uppercase mt-1">ღიაა ყოველდღე</div>
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
              onClick={() => setShowTeamModal(false)} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E08A79] mb-2 block">
                ✦ კლინიკის გუნდი
              </span>
              <h3 className="font-serif font-bold text-xl text-[#33353A] mb-4">ჩვენი პროფესიონალი ექიმები</h3>
              
              {/* Category Pill Filters */}
              <div className="service-track">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCategory(cat)}
                    className={`service-chip ${activeCategory === cat ? 'active' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Dynamic Doctor Search bar */}
              <div className="search-container">
                <Search className="search-icon w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="მოძებნე ექიმი ან სპეციალობა..." 
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Doctors Grid */}
              <div className="doctor-app-grid" style={{ maxHeight: '50vh', overflowY: 'auto', paddingRight: '6px' }}>
                {filteredDoctors.map((d, i) => {
                  const init = d.n.split(" ").map(w => w[0]).join("")
                  const details = getDoctorDetailsByName(d.n)
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
                            bio: "„ღიმილის სააგენტოს“ გამოცდილი სპეციალისტი.",
                            education: "უმაღლესი სამედიცინო განათლება, რეზიდენტურა და სერთიფიკატები."
                          });
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="doctor-app-top">
                        <div className="doctor-app-avatar" style={{ background: GRADS[i % GRADS.length], overflow: 'hidden' }}>
                          {details && details.image ? (
                            <img src={details.image} alt={d.n} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            init
                          )}
                        </div>
                        <div className="doctor-app-info">
                          <h3 title={d.n}>{d.n}</h3>
                          <p title={d.s}>{d.s}</p>
                        </div>
                      </div>
                      <div className="doctor-app-meta">
                        <span className="doctor-app-badge flex items-center gap-1" title={`${ratingInfo.count} შეფასება`}>
                          <Star className="w-3.5 h-3.5 fill-current" style={{ color: '#FFB800' }} />
                          {ratingInfo.average} ({ratingInfo.count})
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowTeamModal(false);
                            handleSelectDoctorForBooking(d.n, d.s);
                          }}
                          className="doctor-app-btn"
                        >
                          დაჯავშნა
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
              {filteredDoctors.length === 0 && (
                <div className="text-center py-12 text-[#8A8E98]">
                  ექიმი მოცემული სპეციალობით ვერ მოიძებნა.
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
              onClick={() => setShowResultsModal(false)} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E08A79] mb-2 block">
                ✦ მკურნალობის შედეგები
              </span>
              <h3 className="font-serif font-bold text-xl text-[#33353A] mb-4">ჩვენი წარმატებული ქეისები</h3>
              <p className="text-sm text-[#5A5D64] mb-6">
                გაეცანით ჩვენი პაციენტების მკურნალობის შედეგებს. თითოეული ღიმილი ინდივიდუალური ზრუნვისა და მაღალი პროფესიონალიზმის შედეგია.
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm text-[#33353A] mb-1">იმპლანტაცია და ესთეტიკური პროტეზირება</h4>
                  <p className="text-xs text-[#5A5D64] mb-2">სრული რესტავრაცია ცირკონიუმის გვირგვინებით. პაციენტს აღუდგა ღეჭვითი ფუნქცია და სრულყოფილი ესთეტიკა.</p>
                  <span className="text-[10px] font-bold text-[#E08A79] uppercase">ხანგრძლივობა: 3 კვირა</span>
                </div>

                <div className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm text-[#33353A] mb-1">კბილთა გასწორება (ორთოდონტია)</h4>
                  <p className="text-xs text-[#5A5D64] mb-2">კბილთა მწკრივისა და თანკბილვის გასწორება ლითონის თვითლიგირებადი ბრეკეტ-სისტემით.</p>
                  <span className="text-[10px] font-bold text-[#E08A79] uppercase">ხანგრძლივობა: 14 თვე</span>
                </div>

                <div className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm text-[#33353A] mb-1">პროფესიული წმენდა და გათეთრება</h4>
                  <p className="text-xs text-[#5A5D64] mb-2">ნადებისა და კბილის ქვების მოცილება ულტრაბგერითა და Air-Flow აპარატით, რასაც მოჰყვა კლინიკური გათეთრება 4 ტონით.</p>
                  <span className="text-[10px] font-bold text-[#E08A79] uppercase">ხანგრძლივობა: 1 სეანსი</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRICES MODAL OVERLAY */}
      {showPricesModal && (
        <div className="modal-overlay" onClick={() => setShowPricesModal(false)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowPricesModal(false)} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E08A79] mb-2 block">
                ✦ ფასების სია
              </span>
              <h3 className="font-serif font-bold text-xl text-[#33353A] mb-4">კლინიკის სერვისების ფასები</h3>
              <p className="text-sm text-[#5A5D64] mb-4">
                Smile Agency გთავაზობთ ხელმისაწვდომ და გამჭვირვალე ფასებს. კონსულტაცია უფასოა იმპლანტაციისა და ორთოდონტიის მკურნალობის გეგმის შედგენისას.
              </p>
              
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-white/40 pb-2">
                  <span className="text-xs font-semibold text-[#33353A]">კონსულტაცია & დიაგნოსტიკა</span>
                  <span className="text-xs font-bold text-[#E08A79]">უფასო</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/40 pb-2">
                  <span className="text-xs font-semibold text-[#33353A]">ჰიგიენური წმენდა (Air-Flow + ულტრაბგერა)</span>
                  <span className="text-xs font-bold text-[#E08A79]">80 ₾ -დან</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/40 pb-2">
                  <span className="text-xs font-semibold text-[#33353A]">კბილის დაბჟენვა (თერაპია, ჰელიოპლომბი)</span>
                  <span className="text-xs font-bold text-[#E08A79]">90 ₾ -დან</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/40 pb-2">
                  <span className="text-xs font-semibold text-[#33353A]">კბილის ამოღება (მარტივი / რთული)</span>
                  <span className="text-xs font-bold text-[#E08A79]">60 ₾ / 150 ₾</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/40 pb-2">
                  <span className="text-xs font-semibold text-[#33353A]">მეტალის ბრეკეტები (ერთი ყბა)</span>
                  <span className="text-xs font-bold text-[#E08A79]">800 ₾ -დან</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/40 pb-2">
                  <span className="text-xs font-semibold text-[#33353A]">კბილის იმპლანტაცია (პრემიუმ კლასი)</span>
                  <span className="text-xs font-bold text-[#E08A79]">750 ₾ -დან</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/40 pb-2">
                  <span className="text-xs font-semibold text-[#33353A]">მეტალო-კერამიკის გვირგვინი</span>
                  <span className="text-xs font-bold text-[#E08A79]">200 ₾ -დან</span>
                </div>
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
              onClick={() => setShowBlogModal(false)} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E08A79] mb-2 block">
                ✦ კლინიკის ბლოგი
              </span>
              <h3 className="font-serif font-bold text-xl text-[#33353A] mb-4">რჩევები ორალური ჰიგიენისთვის</h3>
              
              <div className="flex flex-col gap-4">
                <article className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm text-[#33353A] mb-1">როგორ მოვუაროთ ბრეკეტებს სწორად?</h4>
                  <p className="text-xs text-[#5A5D64] mb-2">გაიგეთ, როგორ გამოიყენოთ სპეციალური ორთოდონტიული ჯაგრისები და ფლოსი ბრეკეტებით მკურნალობის პერიოდში სრულყოფილი სისუფთავის შესანარჩუნებლად.</p>
                  <a href="#booking" onClick={() => setShowBlogModal(false)} className="text-[10px] font-bold text-[#E08A79] uppercase flex items-center gap-1">დაჯავშნე კონსულტაცია <ChevronRight className="w-3 h-3" /></a>
                </article>

                <article className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm text-[#33353A] mb-1">კბილის იმპლანტაციის 5 უპირატესობა</h4>
                  <p className="text-xs text-[#5A5D64] mb-2">რატომ არის იმპლანტი საუკეთესო და ყველაზე ბუნებრივი არჩევანი დაკარგული კბილების აღსადგენად. როგორ გვეხმარება ის მეზობელი კბილების შენარჩუნებაში.</p>
                  <a href="#booking" onClick={() => setShowBlogModal(false)} className="text-[10px] font-bold text-[#E08A79] uppercase flex items-center gap-1">დაჯავშნე კონსულტაცია <ChevronRight className="w-3 h-3" /></a>
                </article>

                <article className="glass-neu p-4" style={{ boxShadow: 'inset 2px 2px 5px rgba(166,160,146,0.05)' }}>
                  <h4 className="font-bold text-sm text-[#33353A] mb-1">როგორ ავიცილოთ თავიდან კარიესი?</h4>
                  <p className="text-xs text-[#5A5D64] mb-2">ყოველდღიური მარტივი რჩევები, კვების რაციონის კორექტირება და სწორი ჰიგიენური ჩვევები, რომლებიც დაიცავს თქვენს ემალს დაზიანებისგან.</p>
                  <a href="#booking" onClick={() => setShowBlogModal(false)} className="text-[10px] font-bold text-[#E08A79] uppercase flex items-center gap-1">დაჯავშნე კონსულტაცია <ChevronRight className="w-3 h-3" /></a>
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
              onClick={() => setActiveServiceDetail(null)} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E08A79] mb-2 flex items-center gap-2">
                ✦ {renderServiceIcon(activeServiceDetail.key)} სერვისის დეტალები
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#33353A] mb-4 mt-2">
                {activeServiceDetail.title}
              </h3>
              <p className="text-sm text-[#5A5D64] leading-relaxed mb-6">
                {activeServiceDetail.desc}
              </p>
              
              <h4 className="font-bold text-xs text-[#33353A] mb-3 uppercase tracking-wider">
                მანიპულაციები და პროცედურები:
              </h4>
              <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
                {activeServiceDetail.subs && activeServiceDetail.subs.map((sub, i) => (
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
                  ჩაეწერე კონსულტაციაზე
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
              onClick={() => setActiveEnamelDetail(null)} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E08A79] mb-2 flex items-center gap-2">
                ✦ პროფილაქტიკა & დაცვა
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#33353A] mb-4 mt-2">
                {activeEnamelDetail.title}
              </h3>
              
              <div className="glass-neu p-4 mb-4" style={{ background: 'rgba(224, 138, 121, 0.05)', border: '1px solid rgba(224, 138, 121, 0.15)', boxShadow: 'none' }}>
                <h4 className="font-bold text-xs text-[#E08A79] mb-2 uppercase tracking-wider">
                  როგორ აზიანებს ემალს:
                </h4>
                <p className="text-sm text-[#5A5D64] leading-relaxed">
                  {activeEnamelDetail.damage}
                </p>
              </div>

              <div className="glass-neu p-4" style={{ background: 'rgba(255, 255, 255, 0.25)', boxShadow: 'none' }}>
                <h4 className="font-bold text-xs text-[#33353A] mb-2 uppercase tracking-wider">
                  რეკომენდაცია / პრევენცია:
                </h4>
                <p className="text-sm text-[#5A5D64] leading-relaxed">
                  {activeEnamelDetail.tip}
                </p>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setActiveEnamelDetail(null);
                    const bookingSec = document.getElementById('booking');
                    if (bookingSec) {
                      bookingSec.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="phone-onboarding-btn"
                  style={{ width: 'auto', padding: '12px 24px' }}
                >
                  ჩაეწერე კონსულტაციაზე
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
              onClick={() => setActiveDoctorDetail(null)} 
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
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E08A79] mb-1 block">
                  ✦ პროფესიონალი ექიმი
                </span>
                <h3 className="font-serif font-bold text-2xl text-[#33353A] mb-1">
                  {activeDoctorDetail.name}
                </h3>
                <span className="text-xs font-bold text-[#8A8E98] block mb-3">
                  {activeDoctorDetail.role}
                </span>

                {/* 5-Star interactive rating system */}
                <div className="mb-4 glass-neu p-3" style={{ background: 'rgba(255, 255, 255, 0.25)', border: '1px solid rgba(224, 138, 121, 0.15)' }}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#E08A79] mb-0.5">შეფასება და რეიტინგი</h4>
                      <p className="text-xs text-[#5A5D64]" style={{ margin: 0 }}>
                        რეიტინგი: <strong className="text-[#33353A]">{getDoctorRating(activeDoctorDetail.name).average} / 5</strong> ({getDoctorRating(activeDoctorDetail.name).count} ხმა)
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
                            onClick={() => handleRateDoctor(activeDoctorDetail.name, star)}
                            onMouseEnter={() => setHoverRating(star)}
                            className="transition-transform hover:scale-125 focus:outline-none"
                            style={{ background: 'none', border: 'none', padding: '2px', cursor: 'pointer' }}
                            title={`შეაფასე ${star} ვარსკვლავით`}
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
                      ✦ გმადლობთ შეფასებისთვის! (თქვენ მიანიჭეთ {getDoctorRating(activeDoctorDetail.name).userRating} ვარსკვლავი)
                    </div>
                  )}
                </div>

                {activeDoctorDetail.bio && (
                  <div className="mb-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#E08A79] border-b border-[#E08A79]/10 pb-1 mb-2">მოკლე მიმოხილვა</h4>
                    <p className="text-xs text-[#5A5D64] leading-relaxed whitespace-pre-line">{activeDoctorDetail.bio}</p>
                  </div>
                )}

                {activeDoctorDetail.education && (
                  <div className="mb-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#E08A79] border-b border-[#E08A79]/10 pb-1 mb-2">განათლება და კურსები</h4>
                    <p className="text-xs text-[#5A5D64] leading-relaxed whitespace-pre-line">{activeDoctorDetail.education}</p>
                  </div>
                )}

                {activeDoctorDetail.specialization && (
                  <div className="mb-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#E08A79] border-b border-[#E08A79]/10 pb-1 mb-2">სპეციალიზაცია</h4>
                    <p className="text-xs text-[#5A5D64] leading-relaxed whitespace-pre-line">{activeDoctorDetail.specialization}</p>
                  </div>
                )}

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => {
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
                    ჩაეწერე ვიზიტზე
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GOOGLE MAPS MODAL OVERLAY */}
      {showMapModal && (
        <div className="modal-overlay" onClick={() => setShowMapModal(false)}>
          <div className="modal-card glass-neu" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', width: '92%', padding: '24px' }}>
            <button 
              onClick={() => setShowMapModal(false)} 
              className="chat-close-recipe" 
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              aria-label="დახურვა"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-left mb-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E08A79] mb-1 block">
                ✦ კლინიკის მდებარეობა
              </span>
              <h3 className="font-serif font-bold text-xl text-[#33353A]">გვიპოვეთ რუკაზე</h3>
              <p className="text-xs text-[#8A8E98] mt-1">მელიტონ და ანდრია ბალანჩივაძეების ქ. 14, თბილისი</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-inner border border-[#E08A79]/10" style={{ width: '100%', height: '400px' }}>
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
