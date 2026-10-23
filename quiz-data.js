// Unit One Grammar Masterclass: Questions, Options & Official Answer Key Notes
// Includes the exact user notes and comprehensive Arabic grammatical analysis

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "They _________ each other for a long time.",
    options: [
      "had known",
      "have known",
      "have been knowing",
      "knew"
    ],
    answer: 1, // (b)
    correctLetter: "b",
    correctText: "have known",
    category: "Stative Verbs",
    ruleTag: "Stative Verbs (No Continuous)",
    // Exact user note:
    officialNote: '"Know" is a stative verb describing a mental state, so it cannot be used in continuous forms (have been knowing is incorrect); the duration marker "for a long time" connecting the past to the present requires the present perfect simple.',
    explanation_ar: "فعل 'know' (يعرف) من أفعال الحالة والإدراك (Stative Verbs) التي لا تُستخدم في الأزمنة المستمرة إطلاقاً (فنستبعد have been knowing). وبما أن الفعل بدأ في الماضي وما زال قائماً مع وجود (for a long time)، نستخدم المضارع التام البسيط have known."
  },
  {
    id: 2,
    question: "A: Have you arrived home ______? \nB: No, but I’ll be there in 5 minutes.",
    options: [
      "yet",
      "just",
      "never",
      "ever"
    ],
    answer: 0, // (a)
    correctLetter: "a",
    correctText: "yet",
    category: "Keywords",
    ruleTag: "Placement of 'yet'",
    // Exact user note:
    officialNote: 'Used at the end of questions and negative statements in the present perfect tense to ask or indicate whether an expected action has taken place up to the moment of speaking.',
    explanation_ar: "تُستخدم (yet) في نهاية الأسئلة والجمل المنفية للتعبير عن حدث متوقع حدوثه حتى الآن. السائل يسأل عما إذا كان قد وصل، والطرف الآخر يرد بأنه سيصل بعد 5 دقائق."
  },
  {
    id: 3,
    question: "Omar can’t take part in the competition _____ he has broken his leg.",
    options: [
      "since",
      "yet",
      "so",
      "while"
    ],
    answer: 0, // (a)
    correctLetter: "a",
    correctText: "since",
    category: "Cause & Effect",
    ruleTag: "Conjunctions of Cause",
    // Exact user note:
    officialNote: 'Acts as a subordinating conjunction of cause meaning "because" or "as", introducing the explanation for why Omar cannot participate in the competition.',
    explanation_ar: "تأتي (since) هنا كرابط سببي بمعنى (لأن / because / as). فالقاعدة: [نتيجة في المضارع: can't take part] + [because / as / since] + [مضارع تام للسبب: has broken his leg]."
  },
  {
    id: 4,
    question: "As soon as he ______ home, he’s going to take a shower.",
    options: [
      "arrived",
      "had arrived",
      "has arrived",
      "arrive"
    ],
    answer: 2, // (c)
    correctLetter: "c",
    correctText: "has arrived",
    category: "Time Clauses",
    ruleTag: "Future Time Clauses",
    // Exact user note:
    officialNote: 'In time clauses referring to future events (introduced by connectors like as soon as, when, or after), English grammar requires a present tense (present simple or present perfect) rather than a past or future tense.',
    explanation_ar: "الروابط الزمنية (as soon as, after, when) إذا كان جوابها مستقبلاً (he is going to...)، يجب أن يتبعها مضارع بسيط أو مضارع تام. وبما أن الفاعل مفرد (he)، لا يصح 'arrive'، ولا يصح استخدام أزمنة الماضي، فالصواب المضارع التام 'has arrived'."
  },
  {
    id: 5,
    question: "He _____ to the beach. His skin looks dark.",
    options: [
      "has gone",
      "has been",
      "had gone",
      "was going"
    ],
    answer: 1, // (b)
    correctLetter: "b",
    correctText: "has been",
    category: "Been vs Gone",
    ruleTag: "Been to (Visited & Returned)",
    // Exact user note:
    officialNote: '"Has been to" indicates that a person visited a place and has already returned; his dark skin is the present evidence of a completed visit, whereas "has gone" would mean he is still at the beach.',
    explanation_ar: "نستخدم (has been to) لأن الشخص ذهب وعاد بالفعل. والدليل على عودته أننا نراه أمامنا في الحاضر ولون بشرته أسمر (His skin looks dark). أما (has gone) فتعني أنه ذهب وما زال هناك ولم يعد."
  },
  {
    id: 6,
    question: "Which sentence means Lean is no longer in New York?",
    options: [
      "Lean has gone to New York.",
      "Lean has been to New York.",
      "Lean has been in New York for nearly a month.",
      "Lean has just arrived in New York."
    ],
    answer: 1, // (b)
    correctLetter: "b",
    correctText: "Lean has been to New York.",
    category: "Been vs Gone",
    ruleTag: "Location & Return Status",
    // Exact user note:
    officialNote: '"Has been to" denotes a completed journey from which the subject has returned, confirming she is no longer there.',
    explanation_ar: "الجملة (Lean has been to New York) تعني أنها زارت نيويورك وعادت منها، أي أنها لم تعد موجودة هناك الآن. على العكس من (has gone to) التي تعني أنها هناك حتى الآن، و(has been in) التي تعني مقيمة هناك."
  },
  {
    id: 7,
    question: "Complete the sentence: “_______ such an intelligent student”.",
    options: [
      "I had ever seen",
      "We haven’t never known.",
      "Hala has never seen",
      "Malak has ever seen"
    ],
    answer: 2, // (c)
    correctLetter: "c",
    correctText: "Hala has never seen",
    category: "Ever vs Never",
    ruleTag: "Experiential 'never' Pattern",
    // Exact user note:
    officialNote: "Follows the standard present perfect experiential construction (subject + has/have never seen + such a/an + adjective + noun); option (b) contains an incorrect double negative (haven't never).",
    explanation_ar: "القاعدة الثابتة للتعبير عن عدم رؤية مثيل من قبل هي: (Subject + have/has + never + p.p. + such a/an + صفة + اسم). لاحظ أن 'haven't never' نفي مزدوج خاطئ، وأن 'ever' تأتي مع التفضيل أو السؤال."
  },
  {
    id: 8,
    question: "I _____ all Adel Emam films.",
    options: [
      "have been seeing",
      "have seen",
      "had seen",
      "a & b"
    ],
    answer: 1, // (b)
    correctLetter: "b",
    correctText: "have seen",
    category: "Simple vs Continuous",
    ruleTag: "Quantified Completion Rule",
    // Exact user note:
    officialNote: 'When stating the total number or quantity of items completed (here, all Adel Emam films), the present perfect simple must be used instead of the present perfect continuous.',
    explanation_ar: "عند تحديد كمية أو عدد مرات حدوث الفعل أو ذكر المفعول مسبوقاً بـ (all / several / numbers / three films)، يجب استخدام المضارع التام البسيط (have seen) ويمتنع التام المستمر تماماً لأن التركيز على اكتمال الإنجاز."
  },
  {
    id: 9,
    question: "She ______ the guitar since 2012. She retired a month ago.",
    options: [
      "plays",
      "was playing",
      "has been playing",
      "had been playing"
    ],
    answer: 3, // (d)
    correctLetter: "d",
    correctText: "had been playing",
    category: "Tricky Clues",
    ruleTag: "Past Completion Point",
    // Exact user note:
    officialNote: 'The past time marker "She retired a month ago" establishes a completed past event; an action that took place continuously over a period up to that specific point in the past requires the past perfect continuous.',
    explanation_ar: "مفتاح الحل الذكي: جملة (She retired a month ago) توضح أن العزف توقف وانتهى في الماضي قبل تقاعدها. الحدث الذي استمر لفترة في الماضي قبل وقوع حدث ماضٍ آخر يعبر عنه بالماضي التام المستمر (had been playing)."
  },
  {
    id: 10,
    question: "She _______ the guitar since 2012.",
    options: [
      "plays",
      "was playing",
      "has been playing",
      "had been playing"
    ],
    answer: 2, // (c)
    correctLetter: "c",
    correctText: "has been playing",
    category: "Simple vs Continuous",
    ruleTag: "Ongoing Activity to Present",
    // Exact user note:
    officialNote: 'Unlike question 9, there is no statement that she stopped playing, indicating the activity started in 2012 and is still continuing into the present moment.',
    explanation_ar: "بخلاف السؤال السابق، هنا لا يوجد أي دليل على توقف الحدث، بل هو مستمر من 2012 حتى اللحظة الحالية مع (since)، لذا نستخدم المضارع التام المستمر (has been playing)."
  },
  {
    id: 11,
    question: "I ________ my boss several times last month.",
    options: [
      "have emailed",
      "was emailing",
      "have been emailing",
      "emailed"
    ],
    answer: 3, // (d)
    correctLetter: "d",
    correctText: "emailed",
    category: "Past Simple vs Present Perfect",
    ruleTag: "Closed Past Time Marker",
    // Exact user note:
    officialNote: '"Last month" specifies a completed, closed time period in the past, which mandates the past simple tense.',
    explanation_ar: "وجود تعبير زمني منتهٍ ومحدد في الماضي مثل (last month) يوجب حتماً استخدام الماضي البسيط (emailed)، حتى لو ذكرت مرات التكرار (several times)، لأن الفترة الزمنية أغلقت بالكامل."
  },
  {
    id: 12,
    question: "I ________ to London twice before.",
    options: [
      "have been",
      "had been",
      "have been being",
      "go"
    ],
    answer: 0, // (a)
    correctLetter: "a",
    correctText: "have been",
    category: "Keywords & Experience",
    ruleTag: "Frequency of Life Experience",
    // Exact user note:
    officialNote: 'Counting the frequency of life experiences ("twice before") up to the current moment requires the present perfect simple.',
    explanation_ar: "للتعبير عن خبرات وتجارب الحياة حتى اللحظة الحالية مع ذكر عدد المرات ('twice before') نستخدم المضارع التام البسيط (have been). ولا توجد صيغة تسمى have been being هنا."
  },
  {
    id: 13,
    question: "Which sentence is grammatically correct?",
    options: [
      "The tank has been containing 50 liters of petrol.",
      "My mum’s food has been tasting delicious.",
      "When I was a child, I have been weak and skinny.",
      "Mum has been doing the housework since we left for school."
    ],
    answer: 3, // (d)
    correctLetter: "d",
    correctText: "Mum has been doing the housework since we left for school.",
    category: "Stative & Clause Rules",
    ruleTag: "Comprehensive Synthesis",
    // Exact user note:
    officialNote: '"Contain" and "taste" (describing quality) are stative verbs and cannot take the continuous form (ruling out a and b). A past time clause like "When I was a child" cannot pair with the present perfect (ruling out c). (d) correctly links an ongoing activity to a past starting point using since + past simple.',
    explanation_ar: "الأفعال (contain, taste) أفعال حالة تمنع الاستمرار. وجملة الطفولة (C) فترة ماضية منتهية تحتاج ماضي بسيط (I was weak). الجملة (D) هي الصحيحة تماماً: مضارع تام مستمر يعبر عن نشاط مستغرق للوقت مع رابط since يليه ماضي بسيط (left)."
  },
  {
    id: 14,
    question: "Complete the sentence: “Since 2014, ________”",
    options: [
      "I have worked with this team.",
      "I have been working with this team.",
      "a & b",
      "I had worked with this team."
    ],
    answer: 2, // (c)
    correctLetter: "c",
    correctText: "a & b",
    category: "Interchangeable Verbs",
    ruleTag: "Verbs of Prolonged Activity",
    // Exact user note:
    officialNote: 'Verbs representing long-term activities like work and live can be used in either the present perfect simple (have worked) or the present perfect continuous (have been working) with "since" to convey essentially the same meaning.',
    explanation_ar: "أفعال مثل (work, live, study) التي تدل بطبيعتها على الاستمرار يمكن استخدامها في المضارع التام البسيط أو المضارع التام المستمر مع (since / for) دون فارق في المعنى، لذا الإجابة الصحيحة هي (a & b)."
  },
  {
    id: 15,
    question: "You look scared. _______ anything frightening?",
    options: [
      "Had you seen",
      "Did you see",
      "Have you seen",
      "Do you see"
    ],
    answer: 2, // (c)
    correctLetter: "c",
    correctText: "Have you seen",
    category: "Present Result",
    ruleTag: "Visible Present State & Past Cause",
    // Exact user note:
    officialNote: 'The visible present effect or emotion ("You look scared") calls for the present perfect simple to ask about the recent past experience causing it.',
    explanation_ar: "الأثر الملاحظ أمامنا في المضارع: (You look scared - يبدو عليك الخوف الآن). الحدث الماضي الذي سبب هذا الأثر الحاضر يُسأل عنه بالمضارع التام (Have you seen)."
  },
  {
    id: 16,
    question: "Sama _____ met such a nice person.",
    options: [
      "had never",
      "has ever",
      "had ever",
      "has never"
    ],
    answer: 3, // (d)
    correctLetter: "d",
    correctText: "has never",
    category: "Ever vs Never",
    ruleTag: "Subject-Verb Agreement & Never",
    // Exact user note:
    officialNote: 'The subject Sama is third-person singular (requiring has), and the sentence expresses a lifetime experience using never with such a/an.',
    explanation_ar: "الجملة خبرية تعبر عن عدم مقابلة مثل هذا الشخص طوال الحياة حتى الآن، والصيغة الصحيحة هي (has never met). بينما 'ever' تستخدم في صيغ السؤال أو مع صفات التفضيل."
  },
  {
    id: 17,
    question: "Ayman has drunk five coffees _______. That’s too bad for his health.",
    options: [
      "yet",
      "so far",
      "ever",
      "never"
    ],
    answer: 1, // (b)
    correctLetter: "b",
    correctText: "so far",
    category: "Keywords & Quantity",
    ruleTag: "Quantifying Cumulative Results",
    // Exact user note:
    officialNote: 'Means "up until the present time" and is standardly used with the present perfect when quantifying results or actions completed up to now.',
    explanation_ar: "تُستخدم (so far / up till now) في الجمل المثبتة مع المضارع التام للتعبير عما تم إنجازه أو استهلاكه من عدد أو كمية حتى الآن (شرب 5 فناجين قهوة حتى الآن)."
  }
];

// Time expressions for Since vs For Sorter
const TIME_EXPRESSIONS = [
  { text: "yesterday", type: "since", hint: "نقطة زمنية محددة البداية" },
  { text: "3 weeks", type: "for", hint: "مدة زمنية كاملة ومحددة المدة" },
  { text: "2016", type: "since", hint: "سنة تقويمية محددة" },
  { text: "a long time", type: "for", hint: "فترة زمنية ممتدة" },
  { text: "his graduation", type: "since", hint: "حدث أو نقطة تحول في الحياة" },
  { text: "two months", type: "for", hint: "حساب عدد الشهور المستغرقة" },
  { text: "last Monday", type: "since", hint: "يوم محدد في الماضي" },
  { text: "ages", type: "for", hint: "فترة طويلة ممتدة غير محددة" },
  { text: "5 o'clock", type: "since", hint: "ساعة محددة بدقة" },
  { text: "three hours", type: "for", hint: "عدد الساعات المستغرقة" },
  { text: "childhood", type: "since", hint: "مرحلة عمرية محددة" },
  { text: "as long as I can remember", type: "for", hint: "فترة ممتدة منذ القدم" }
];

// Dual-meaning verbs data (Stative vs Action)
const DUAL_VERBS_DATA = [
  {
    verb: "think",
    stative: { meaning: "يعتقد (رأي قاطع وقناعة)", example: "I have thought he was honest.", note: "Stative = Opinion (No -ing)" },
    action: { meaning: "يفكر في (نشاط ذهني وتفكير مستمر)", example: "I have been thinking about your job offer all day.", note: "Action = Mental process (Continuous)" }
  },
  {
    verb: "have",
    stative: { meaning: "يمتلك (علاقة ملكية)", example: "I have had this car for five years.", note: "Stative = Possession (No -ing)" },
    action: { meaning: "يتناول / يقضي / يأخذ", example: "He has been having lunch for thirty minutes.", note: "Action = Eating / Spending time (Continuous)" }
  },
  {
    verb: "see",
    stative: { meaning: "يرى بالعين / يفهم فكرة", example: "I have seen what you mean.", note: "Stative = Perception / Comprehension" },
    action: { meaning: "يقابل / يستشير طبيباً / يواعد", example: "She has been seeing a specialist recently.", note: "Action = Meeting / Consulting (Continuous)" }
  },
  {
    verb: "taste",
    stative: { meaning: "ذو مذاق (صفة للمذاق)", example: "This soup has tasted delicious all along.", note: "Stative = Flavor property" },
    action: { meaning: "يتذوق (فعل التذوق باللسان)", example: "The chef has been tasting the sauce.", note: "Action = Physical sampling (Continuous)" }
  },
  {
    verb: "smell",
    stative: { meaning: "ذو رائحة (يبث رائحة معينة)", example: "The perfume has smelled wonderful.", note: "Stative = Scent emission" },
    action: { meaning: "يشم (فعل الشم بالأنف)", example: "She has been smelling the roses in the garden.", note: "Action = Sniffing (Continuous)" }
  },
  {
    verb: "feel",
    stative: { meaning: "يعتقد / له ملمس معين", example: "I have felt that this decision was wrong.", note: "Stative = Conviction / Texture" },
    action: { meaning: "يشعر جسدياً / يتحسس باليد", example: "I have been feeling exhausted lately.", note: "Action = Physical state / Touching" }
  },
  {
    verb: "look",
    stative: { meaning: "يبدو (مظهر وهيئة خارجية)", example: "You have looked very cheerful today.", note: "Stative = Appearance" },
    action: { meaning: "ينظر إلى (توجيه النظر)", example: "He has been looking at the painting for 20 minutes.", note: "Action = Directing gaze (Continuous)" }
  },
  {
    verb: "weigh",
    stative: { meaning: "يبلغ وزنه (قيمة الوزن)", example: "The luggage has weighed 25 kilograms.", note: "Stative = Fixed weight measure" },
    action: { meaning: "يزن الشيء (عملية الوزن بالميزان)", example: "The butcher has been weighing the meat.", note: "Action = Weighing activity (Continuous)" }
  },
  {
    verb: "measure",
    stative: { meaning: "يبلغ مقاسه أو أبعاده", example: "The room has measured 4 meters by 5 meters.", note: "Stative = Dimension specification" },
    action: { meaning: "يقيس (أخذ المقاس بالشريط)", example: "The carpenter has been measuring the door.", note: "Action = Measuring activity (Continuous)" }
  },
  {
    verb: "be",
    stative: { meaning: "يكون (طبيعة وسجية دائمة)", example: "He has been kind all his life.", note: "Stative = Permanent disposition" },
    action: { meaning: "يتصرف بشكل مؤقت غير مألوف", example: "He has been being silly this morning.", note: "Action = Temporary behavior (Continuous)" }
  }
];
