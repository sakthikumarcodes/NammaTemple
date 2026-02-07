export type Language = 'ta' | 'en';

export const translations = {
  ta: {
    // Common
    home: 'முகப்பு',
    pangali: 'பங்காளிகள்',
    analytics: 'பகுப்பாய்வு',
    relatives: 'உறவினர்கள்',
    expenses: 'செலவுகள்',
    family: 'குடும்பம்',
    donate: 'திருக்கொடை',
    
    // Home page
    templeName: 'ஸ்ரீ அன்னலூஞ்சல் பாப்பாத்தி அம்மன் கோயில்',
    subtitle: 'திருப்பணிகள் – நிதி நிலவரம்',
    templeAddress: 'கோயில் முகவரி:',
    address: 'கண்ணனூர் பாளையம், துறையூர் தாலுகா, திருச்சி மாவட்டம், தமிழ்நாடு',
    viewOnGoogleMaps: 'Google Maps இல் பார்க்க',
    
    // Tiles
    overallPending: 'மொத்த நிலுவை (செலவு - பெற்றது)',
    expectedExpenses: 'எதிர்பார்க்கும் செலவு',
    committed: 'உறுதி தொகை',
    paid: 'பெறப்பட்டது',
    balance: 'மீதம் (உறுதி - பெற்றது)',
    totalProgress: 'மொத்த முன்னேற்றம்',
    
    // Actions
    viewPangali: 'பங்காளிகள் விவரம் →',
    viewExpenses: 'செலவு விவரம் →',
    disclaimer: 'இந்தப் பக்கம் நம் உறவினர்களுக்காக மட்டுமே. வெளியில் பகிர வேண்டாம். 🙏',
    
    // Pangali page
    pangaliTitle: 'பங்காளிகள் – திருக்கொடை நிலவரம்',
    searchPlaceholder: 'பெயரை தேடவும்…',
    filterAll: 'அனைத்தும்',
    filterCompleted: 'முடிந்தது',
    filterPartial: 'பகுதி',
    filterYetToGive: 'இன்னும் கொடுக்கவில்லை',
    sortBy: 'வரிசைப்படுத்து',
    sortHighestPending: 'மீதம் (அதிகம்)',
    sortName: 'பெயர் (A-Z)',
    viewTable: 'அட்டவணையில் பார்க்க',
    viewCards: 'அட்டைகளில் பார்க்க',
    name: 'பெயர்',
    place: 'ஊர்',
    committedAmount: 'உறுதி',
    paidAmount: 'கொடுத்தது',
    balanceAmount: 'மீதம்',
    status: 'நிலை',
    completed: 'முடிந்தது',
    partial: 'பகுதி',
    yetToGive: 'இன்னும் கொடுக்கவில்லை',
    
    // Analytics page
    analyticsTitle: 'பகுப்பாய்வு',
    analyticsSubtitle: 'திருக்கொடை புள்ளிவிவரங்கள்',
    committedVsReceived: 'உறுதி vs பெறப்பட்டது',
    pangaliStatus: 'பங்காளிகள்',
    pendingByPerson: 'பங்காளி வாரியான நிலுவை தொகை (Pending)',
    topPendingNote: '* Top 8 நிலுவை தொகை கொண்டவர்கள் தனியாக காட்டப்படுகின்றனர்',
    others: 'மற்றவர்கள்',
    
    // Relatives page
    relativesTitle: 'உறவினர்கள் – விருப்ப பங்களிப்பு',
    relativesSubtitle: '*இவை முழுவதும் விருப்பத்தின் அடிப்படையில் மட்டுமே*',
    totalForecast: 'மொத்த கணிப்பு',
    totalGiven: 'வழங்கியது',
    totalRemaining: 'மீதம்',
    searchRelatives: 'பெயர் அல்லது உறவை தேடவும்…',
    sortRemaining: 'மீதம் (அதிகம்)',
    sortForecast: 'கணிப்பு (அதிகம்)',
    sortGiven: 'வழங்கியது (அதிகம்)',
    sortHighest: 'அதிகம்',
    relation: 'உறவு',
    forecast: 'கணிப்பு',
    given: 'வழங்கியது',
    remaining: 'மீதம்',
    
    // Expenses page
    expensesTitle: 'எதிர்பார்க்கப்படும் செலவுகள்',
    expensesSubtitle: 'Forecast / Expected expenses (Excel sheet)',
    searchExpenses: 'செலவு வகையை தேடவும்…',
    expenseType: 'செலவு வகை',
    amount: 'தொகை (₹)',
    spent: 'இதுவரை செலவு',
    remainingExpense: 'மீதம்',
    progress: 'முன்னேற்றம்',
    totalForecastExpenses: 'மொத்த கணிப்பு',
    totalSpent: 'இதுவரை செலவு',
    totalRemainingExpenses: 'மீதம்',
    items: 'பொருட்கள்',
    
    // Family page
    familyTitle: 'குடும்ப / குல மரம்',
    familySubtitle: 'Family / Clan Tree - கலந்துடை மகரிஷி கோத்திர மக்கள்',
    expandAll: 'அனைத்தையும் விரிக்க',
    collapseAll: 'அனைத்தையும் மூட',
    totalFamilies: 'மொத்த குடும்பங்கள்',
    members: 'members',
    expand: 'விரிக்க',
    collapse: 'மூட',
    father: 'தந்தை',
    mother: 'தாய்',
    sons: 'மகன்கள்',
    daughters: 'மகள்கள்',
    allFamiliesTable: 'அனைத்து குடும்பங்களின் அட்டவணை',
    groupName: 'குழு பெயர்',
    
    // Donate modal
    donateTitle: 'திருக்கொடை வழங்க',
    donateSubtitle: 'Donate to support temple renovation',
    googlePay: 'Google Pay (Quick Payment)',
    payWithGooglePay: 'Pay with Google Pay',
    instantPayment: 'Click to open Google Pay app and pay instantly',
    upiPayment: 'UPI Payment',
    scanQRCode: 'Scan QR code or use UPI ID above',
    scanQRCodeToPay: 'Scan QR Code to Pay',
    alternativeOption: 'Alternative Option',
    sendToManiAnna: 'Send money to Pudupalayam Mani Anna via UPI',
    informWhatsApp: 'After payment, please inform in the WhatsApp channel with your name and amount',
    note: 'Note: Please mention your name in the payment reference or WhatsApp message. Your contribution will be updated in the dashboard.',
    
    // Common messages
    noMatches: 'பொருந்தும் பதிவுகள் இல்லை',
    noData: 'விவரங்கள் இல்லை',
    copy: 'நகலெடு',
    payNow: 'இப்போது செலுத்த',
    instantPaymentShort: 'உடனடி பணம்',
    useInAnyUPI: 'எந்த UPI பயன்பாட்டிலும் பயன்படுத்த',
    print: 'அச்சிடு',
  },
  en: {
    // Common
    home: 'Home',
    pangali: 'Pangali',
    analytics: 'Analytics',
    relatives: 'Relatives',
    expenses: 'Expenses',
    family: 'Family',
    donate: 'Donate',
    
    // Home page
    templeName: 'Sri Annallunjal Pappathi Amman Temple',
    subtitle: 'Renovation – Financial Status',
    templeAddress: 'Temple Address:',
    address: 'Kannannur Palayam, Thuraiyur Taluk, Trichy District, Tamil Nadu',
    viewOnGoogleMaps: 'View on Google Maps',
    
    // Tiles
    overallPending: 'Overall Pending (Expenses - Received)',
    expectedExpenses: 'Expected Expenses',
    committed: 'Committed Amount',
    paid: 'Received',
    balance: 'Balance (Committed - Received)',
    totalProgress: 'Total Progress',
    
    // Actions
    viewPangali: 'View Pangali Details →',
    viewExpenses: 'View Expenses Details →',
    disclaimer: 'This page is only for our relatives. Please do not share outside. 🙏',
    
    // Pangali page
    pangaliTitle: 'Pangali – Donation Status',
    searchPlaceholder: 'Search by name…',
    filterAll: 'All',
    filterCompleted: 'Completed',
    filterPartial: 'Partial',
    filterYetToGive: 'Yet to Give',
    sortBy: 'Sort by',
    sortHighestPending: 'Highest Pending',
    sortName: 'Name (A-Z)',
    viewTable: 'View as Table',
    viewCards: 'View as Cards',
    name: 'Name',
    place: 'Place',
    committedAmount: 'Committed',
    paidAmount: 'Paid',
    balanceAmount: 'Balance',
    status: 'Status',
    completed: 'Completed',
    partial: 'Partial',
    yetToGive: 'Yet to Give',
    
    // Analytics page
    analyticsTitle: 'Analytics',
    analyticsSubtitle: 'Donation Statistics',
    committedVsReceived: 'Committed vs Received',
    pangaliStatus: 'Pangali Status',
    pendingByPerson: 'Pending Amount by Person',
    topPendingNote: '* Top 8 people with highest pending amounts are shown separately',
    others: 'Others',
    
    // Relatives page
    relativesTitle: 'Relatives – Optional Contribution',
    relativesSubtitle: '*These are entirely optional*',
    totalForecast: 'Total Forecast',
    totalGiven: 'Total Given',
    totalRemaining: 'Total Remaining',
    searchRelatives: 'Search by name or relation…',
    sortRemaining: 'Remaining (Highest)',
    sortForecast: 'Forecast (Highest)',
    sortGiven: 'Given (Highest)',
    sortHighest: 'Highest',
    relation: 'Relation',
    forecast: 'Forecast',
    given: 'Given',
    remaining: 'Remaining',
    progress: 'Progress',
    
    // Expenses page
    expensesTitle: 'Expected Expenses',
    expensesSubtitle: 'Forecast / Expected expenses (Excel sheet)',
    searchExpenses: 'Search expense type…',
    expenseType: 'Expense Type',
    amount: 'Amount (₹)',
    spent: 'Spent So Far',
    remainingExpense: 'Remaining',
    totalForecastExpenses: 'Total Forecast',
    totalSpent: 'Total Spent',
    totalRemainingExpenses: 'Total Remaining',
    items: 'Items',
    
    // Family page
    familyTitle: 'Family / Clan Tree',
    familySubtitle: 'Family / Clan Tree - Kalandudai Magarishi Gothra People',
    expandAll: 'Expand All',
    collapseAll: 'Collapse All',
    totalFamilies: 'Total Families',
    members: 'members',
    expand: 'Expand',
    collapse: 'Collapse',
    father: 'Father',
    mother: 'Mother',
    sons: 'Sons',
    daughters: 'Daughters',
    allFamiliesTable: 'All Families Table',
    groupName: 'Group Name',
    
    // Donate modal
    donateTitle: 'Donate',
    donateSubtitle: 'Donate to support temple renovation',
    googlePay: 'Google Pay (Quick Payment)',
    payWithGooglePay: 'Pay with Google Pay',
    instantPayment: 'Click to open Google Pay app and pay instantly',
    upiPayment: 'UPI Payment',
    scanQRCode: 'Scan QR code or use UPI ID above',
    scanQRCodeToPay: 'Scan QR Code to Pay',
    alternativeOption: 'Alternative Option',
    sendToManiAnna: 'Send money to Pudupalayam Mani Anna via UPI',
    informWhatsApp: 'After payment, please inform in the WhatsApp channel with your name and amount',
    note: 'Note: Please mention your name in the payment reference or WhatsApp message. Your contribution will be updated in the dashboard.',
    
    // Common messages
    noMatches: 'No matching records found',
    noData: 'No data available',
    copy: 'Copy',
    payNow: 'Pay Now',
    instantPaymentShort: 'Instant payment',
    useInAnyUPI: 'Use in any UPI app',
    print: 'Print',
  },
};

export function getTranslation(lang: Language, key: keyof typeof translations.ta): string {
  return translations[lang][key] || translations.ta[key];
}

