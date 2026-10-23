// Unit One Grammar Questions & Explanations
// Present Perfect Simple & Present Perfect Continuous
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
    answer: 1,
    category: "Stative Verbs",
    ruleTag: "أفعال الحالة (لا تأتي في الاستمرار)",
    explanation_en: "'know' is a stative verb (cognition/state) and CANNOT be used in continuous tenses ('have been knowing' is incorrect). Since the relationship started in the past and still continues ('for a long time'), we use Present Perfect Simple.",
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
    answer: 0,
    category: "Keywords",
    ruleTag: "استخدام yet في السؤال والمنفي",
    explanation_en: "'yet' is placed at the end of questions or negative sentences to ask whether an expected event has occurred up to this point. Speaker B says they will arrive in 5 minutes, confirming it hasn't happened yet.",
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
    answer: 0,
    category: "Cause & Effect",
    ruleTag: "روابط السبب والنتيجة (since = because)",
    explanation_en: "'since' here functions as a causal conjunction meaning 'because' or 'as'. It connects a present result ('can’t take part') with its cause in the Present Perfect ('has broken his leg').",
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
    answer: 2,
    category: "Time Clauses",
    ruleTag: "روابط الزمن مع المستقبل",
    explanation_en: "Time conjunctions (as soon as, when, after) referring to future events require either Present Simple ('arrives') or Present Perfect ('has arrived'). Past tenses cannot be followed by a future clause. With subject 'he', 'arrive' is ungrammatical, leaving 'has arrived'.",
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
    answer: 1,
    category: "Been vs Gone",
    ruleTag: "have been to (ذهب وعاد)",
    explanation_en: "'has been to' means he went to the beach and has returned. We know he is back because we can see him right now and observe that his skin is sun-tanned ('His skin looks dark'). If he had 'gone', he would still be at the beach.",
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
    answer: 1,
    category: "Been vs Gone",
    ruleTag: "الفرق بين been to و gone to و been in",
    explanation_en: "'has been to' explicitly indicates that someone visited a place and returned, meaning they are no longer there. In contrast, 'has gone to' means still there, and 'has been in' means currently residing there.",
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
    answer: 2,
    category: "Ever vs Never",
    ruleTag: "صيغة التعجب والخبرات: never + such a/an",
    explanation_en: "The standard pattern is: Subject + have/has + never + p.p. + such (a/an) + adj + noun. 'haven't never' is an incorrect double negative. 'ever' is reserved for questions or after superlatives.",
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
    answer: 1,
    category: "Simple vs Continuous",
    ruleTag: "ذكر عدد أو كمية الإنجاز (يمتنع المستمر)",
    explanation_en: "When the count, quantity, or total number of completed objects is stated ('all Adel Emam films'), we MUST use Present Perfect Simple, NEVER continuous.",
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
    answer: 3,
    category: "Tricky Clues",
    ruleTag: "حدث استمر وانتهى قبل نقطة في الماضي",
    explanation_en: "Crucial clue: 'She retired a month ago.' Her guitar playing stopped in the past before her retirement. An activity that continued for a period up to a past event uses the Past Perfect Continuous ('had been playing'), NOT present perfect.",
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
    answer: 2,
    category: "Simple vs Continuous",
    ruleTag: "حدث بدأ في الماضي ومستمر حتى الآن",
    explanation_en: "Unlike question 9, there is no mention of retirement or cessation. The activity started in 2012 and is still continuing up to now with 'since 2012', so Present Perfect Continuous ('has been playing') is the natural choice.",
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
    answer: 3,
    category: "Past Simple vs Present Perfect",
    ruleTag: "فترة ماضية محددة ومنتهية (last month)",
    explanation_en: "'last month' specifies a closed, finished past time period. Even though 'several times' mentions frequency, any action occurring in a finished time period must use Past Simple ('emailed'), never present perfect.",
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
    answer: 0,
    category: "Keywords & Experience",
    ruleTag: "تجارب وخبرات الحياة مع عدد المرات",
    explanation_en: "Life experience up to the present moment with a frequency/count ('twice before') takes Present Perfect Simple ('have been'). 'have been being' is ungrammatical.",
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
    answer: 3,
    category: "Stative & Clause Rules",
    ruleTag: "المبنى الصحيح: تام مستمر + since + ماضي بسيط",
    explanation_en: "'contain' and 'taste' (describing quality) are stative verbs and cannot take continuous aspect. Sentence C wrongly uses present perfect for a completed childhood stage. Sentence D correctly pairs Present Perfect Continuous ('has been doing') with 'since + past simple clause'.",
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
    answer: 2,
    category: "Interchangeable Verbs",
    ruleTag: "أفعال المعيشة والعمل (work / live)",
    explanation_en: "Verbs of duration such as 'work' and 'live' can be expressed in either Present Perfect Simple OR Present Perfect Continuous with 'since' without any essential change in meaning. Thus both (a) and (b) are correct.",
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
    answer: 2,
    category: "Present Result",
    ruleTag: "حدث في الماضي له أثر مشاهد في الحاضر",
    explanation_en: "The visible consequence is in the present: 'You look scared' (Present Simple). The past action causing this current emotional state is expressed in Present Perfect: 'Have you seen anything frightening?'",
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
    answer: 3,
    category: "Ever vs Never",
    ruleTag: "نفي التجربة طوال الحياة (has never)",
    explanation_en: "A declarative statement expressing that someone has not experienced this in their life up to the present uses 'has never met'. 'ever' is used in questions or after superlatives.",
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
    answer: 1,
    category: "Keywords & Quantity",
    ruleTag: "استخدام so far مع الكميات المنجزة حتى الآن",
    explanation_en: "'so far' (or 'up till now') is used in affirmative sentences with Present Perfect to indicate an accumulated quantity or number achieved up to the present moment ('five coffees so far').",
    explanation_ar: "تُستخدم (so far / up till now) في الجمل المثبتة مع المضارع التام للتعبير عما تم إنجازه أو استهلاكه من عدد أو كمية حتى الآن (شرب 5 فناجين قهوة حتى الآن)."
  }
];

// Time expressions for the Since vs For Interactive Sorting Game
const TIME_EXPRESSIONS = [
  { text: "yesterday", type: "since", hint: "نقطة زمنية محددة" },
  { text: "3 weeks", type: "for", hint: "مدة زمنية كاملة" },
  { text: "2016", type: "since", hint: "سنة محددة البداية" },
  { text: "a long time", type: "for", hint: "فترة زمنية غير محددة البداية" },
  { text: "his graduation", type: "since", hint: "مرحلة أو حدث محدد" },
  { text: "two months", type: "for", hint: "عدد محدد من الشهور" },
  { text: "last Monday", type: "since", hint: "يوم محدد في الماضي" },
  { text: "ages", type: "for", hint: "فترة طويلة ممتدة" },
  { text: "5 o'clock", type: "since", hint: "ساعة محددة" },
  { text: "three hours", type: "for", hint: "فترة زمنية مستغرقة" },
  { text: "childhood", type: "since", hint: "اسم يدل على مرحلة عمرية" },
  { text: "as long as I can remember", type: "for", hint: "فترة زمنية ممتدة" }
];

// Dual-meaning verbs data (Stative vs Action)
const DUAL_VERBS_DATA = [
  {
    verb: "think",
    stative: { meaning: "يعتقد (رأي / قناعة)", example: "I have thought he was honest.", canIng: false },
    action: { meaning: "يفكر في (نشاط ذهني مستمر)", example: "I have been thinking about your job offer all day.", canIng: true }
  },
  {
    verb: "have",
    stative: { meaning: "يمتلك (ملكية)", example: "I have had this car for five years.", canIng: false },
    action: { meaning: "يتناول / يقضي / يأخذ", example: "He has been having lunch for thirty minutes.", canIng: true }
  },
  {
    verb: "see",
    stative: { meaning: "يرى / يفهم (إدراك بالحواس)", example: "I have seen the new building.", canIng: false },
    action: { meaning: "يقابل / يستشير / يواعد", example: "She has been seeing a doctor regularly.", canIng: true }
  },
  {
    verb: "taste",
    stative: { meaning: "ذو مذاق (صفة للمذاق)", example: "This soup has tasted delicious.", canIng: false },
    action: { meaning: "يتذوق (فعل التذوق باللسان)", example: "The chef has been tasting the soup to check the salt.", canIng: true }
  },
  {
    verb: "smell",
    stative: { meaning: "ذو رائحة (يبث رائحة)", example: "The perfume has smelled wonderful.", canIng: false },
    action: { meaning: "يشم (فعل الشم بالأنف)", example: "The girl has been smelling the roses in the garden.", canIng: true }
  },
  {
    verb: "feel",
    stative: { meaning: "يعتقد / له ملمس معين", example: "I have felt that this decision was wrong.", canIng: false },
    action: { meaning: "يشعر جسدياً / يتحسس باليد", example: "I have been feeling exhausted lately.", canIng: true }
  },
  {
    verb: "look",
    stative: { meaning: "يبدو (مظهر خارجي)", example: "You have looked very cheerful today.", canIng: false },
    action: { meaning: "ينظر إلى (توجيه البصر)", example: "He has been looking at the painting for twenty minutes.", canIng: true }
  },
  {
    verb: "weigh",
    stative: { meaning: "يبلغ وزنه (قيمة الوزن)", example: "The bag has weighed 20 kilograms.", canIng: false },
    action: { meaning: "يزن (عملية وزن الشيء بالميزان)", example: "The butcher has been weighing the meat.", canIng: true }
  },
  {
    verb: "measure",
    stative: { meaning: "يبلغ مقاسه / أبعاده", example: "The room has measured 4 meters by 5 meters.", canIng: false },
    action: { meaning: "يقيس (عملية أخذ القياس بالمتر)", example: "The carpenter has been measuring the door.", canIng: true }
  },
  {
    verb: "be",
    stative: { meaning: "يكون (طبيعة دائمة)", example: "He has been very generous all his life.", canIng: false },
    action: { meaning: "يتصرف بشكل مؤقت غير معتاد", example: "He is being silly / He has been being ridiculous today.", canIng: true }
  }
];
