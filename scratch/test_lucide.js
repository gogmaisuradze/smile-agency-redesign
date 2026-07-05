import * as lucide from 'lucide-react';
console.log("Lucide loaded successfully!");
const imports = [
  'Calendar', 
  'MessageSquare', 
  'Phone', 
  'Mail', 
  'MapPin', 
  'Clock', 
  'ChevronRight', 
  'Plus', 
  'Minus', 
  'User', 
  'ShieldCheck', 
  'CheckCircle2', 
  'Send', 
  'X', 
  'ChevronDown', 
  'Sparkles', 
  'Award', 
  'HeartHandshake',
  'Menu',
  'Check'
];
for (const imp of imports) {
  if (lucide[imp]) {
    console.log(`- ${imp} is available`);
  } else {
    console.log(`- ERROR: ${imp} is NOT available!`);
  }
}
