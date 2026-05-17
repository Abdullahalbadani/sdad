import type { FormEvent, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  Cpu,
  Eye,
  Factory,
  FileCheck2,
  FileText,
  Globe2,
  Handshake,
  Headphones,
  Home,
  Landmark,
  Lightbulb,
  ListChecks,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  Users,
  X,
} from 'lucide-react';

type Language = 'ar' | 'en';
type RouteKey = 'home' | 'about' | 'services' | 'process' | 'sectors' | 'faq' | 'contact' | 'privacy' | 'terms';

type CardItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

const company = {
  ar: {
    name: 'سداد كوم المحدودة',
    enName: 'SADAD COM LIMITED',
    slogan: 'حلول احترافية متكاملة بخبرة وجودة عالية',
    phoneDisplay: '0545372137',
    phoneLink: '966545372137',
    email: 'sadacomo@gmail.com',
    website: 'www.sadadcom.com',
    location: 'الرياض، المملكة العربية السعودية',
    workingHours: 'يتم استقبال طلبات التواصل والرد عليها خلال أوقات العمل الرسمية',
  },
  en: {
    name: 'SADAD COM LIMITED',
    enName: 'سداد كوم المحدودة',
    slogan: 'Integrated professional solutions with high expertise and quality',
    phoneDisplay: '0545372137',
    phoneLink: '966545372137',
    email: 'sadacomo@gmail.com',
    website: 'www.sadadcom.com',
    location: 'Riyadh, Kingdom of Saudi Arabia',
    workingHours: 'Contact requests are received and answered during official working hours',
  },
};

const navLinks: { route: RouteKey; icon: LucideIcon; ar: string; en: string }[] = [
  { route: 'home', icon: Home, ar: 'الرئيسية', en: 'Home' },
  { route: 'about', icon: Building2, ar: 'من نحن', en: 'About Us' },
  { route: 'services', icon: BriefcaseBusiness, ar: 'خدماتنا', en: 'Services' },
  { route: 'process', icon: ListChecks, ar: 'آلية العمل', en: 'Workflow' },
  { route: 'sectors', icon: Landmark, ar: 'القطاعات', en: 'Sectors' },
  { route: 'faq', icon: FileCheck2, ar: 'الأسئلة الشائعة', en: 'FAQ' },
  { route: 'contact', icon: Mail, ar: 'تواصل معنا', en: 'Contact' },
];

const routeLabels: Record<Language, Record<RouteKey, string>> = {
  ar: {
    home: 'الرئيسية',
    about: 'من نحن',
    services: 'خدماتنا',
    process: 'آلية العمل',
    sectors: 'القطاعات التي نخدمها',
    faq: 'الأسئلة الشائعة',
    contact: 'تواصل معنا',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الاستخدام',
  },
  en: {
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    process: 'Workflow',
    sectors: 'Sectors We Serve',
    faq: 'FAQ',
    contact: 'Contact Us',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
  },
};

const content = {
  ar: {
    ui: {
      requestConsultation: 'اطلب استشارة',
      requestInitial: 'اطلب استشارة أولية',
      exploreServices: 'استعرض خدماتنا',
      downloadProfile: 'تحميل الملف التعريفي',
     downloadAr: 'البروفايل بالعربي',
downloadEn: 'English Profile',
      learnMore: 'معرفة المزيد',
      moreServices: 'المزيد من الخدمات',
      viewWorkflow: 'عرض آلية العمل',
      whatsapp: 'واتساب مباشر',
      sendRequest: 'إرسال الطلب عبر واتساب',
      backHome: 'العودة للرئيسية',
      menu: 'فتح القائمة',
      close: 'إغلاق القائمة',
      switchLanguage: 'English',
      languageLabel: 'تبديل اللغة',
      footerNote: 'حلول احترافية متكاملة بخبرة وجودة عالية نحو مستقبل أكثر تطورًا وابتكارًا.',
    },
    hero: {
      eyebrow: 'حلول مهنية متكاملة للأعمال والتحصيل',
      title: 'سداد كوم المحدودة شريكك التشغيلي لإدارة المطالبات وتطوير الأعمال.',
      subtitle:
        'نقدم منظومة خدمات احترافية تجمع بين تحصيل الديون، الدعم والتشغيل، الاستشارات، إدارة المشاريع، والمتابعة المستمرة، لمساعدة عملائنا على تحقيق كفاءة أعلى ونتائج أكثر وضوحًا.',
      sidebarTitle: 'محاور الخدمة',
      sidebarSubtitle: 'تنظيم، متابعة، جودة، وشراكات طويلة المدى.',
      pillars: ['تحصيل الديون', 'إدارة المطالبات', 'حلول تشغيلية', 'متابعة وتقارير'],
      trust: ['خبرة موثوقة', 'جودة عالية', 'شراكة دائمة', 'ابتكار مستمر'],
    },
    trustStrip: ['سرية تامة للبيانات', 'إجراءات منظمة', 'متابعة مهنية', 'حلول للقطاعات المختلفة'],
    aboutPreview: {
      eyebrow: 'مرحبًا بكم في سداد كوم',
      title: 'نقدم خدمات احترافية مبنية على الجودة والابتكار والالتزام.',
      subtitle:
        'نسعى دائمًا لتقديم أفضل الحلول التي تلبي احتياجات عملائنا وتواكب التطورات الحديثة في السوق، مع بناء علاقات طويلة المدى تعتمد على الثقة والكفاءة والعمل المتخصص.',
      bullets: ['فريق متخصص', 'جودة واحترافية', 'ثقة وشراكات'],
    },
    visionMission: {
      visionTitle: 'رؤيتنا',
      vision:
        'الريادة على المستوى المحلي والإقليمي، والمساهمة في تطوير الأعمال من خلال الابتكار والجودة والاحترافية.',
      missionTitle: 'رسالتنا',
      mission:
        'تقديم خدمات عالية الجودة تعتمد على الكفاءة والخبرة والتطوير المستمر، بما يحقق رضا العملاء ويعزز قيمة أعمالهم ويضمن بناء شراكات استراتيجية طويلة المدى.',
      goalsTitle: 'أهدافنا الاستراتيجية',
    },
    sectionText: {
      valuesEyebrow: 'المبادئ التوجيهية',
      valuesTitle: 'قيمنا الأساسية',
      valuesSubtitle: 'قيم واضحة تحكم طريقة العمل، وتمنح العميل تجربة مهنية قائمة على الشفافية والجودة والالتزام.',
      servicesEyebrow: 'منظومة الخدمات المتكاملة',
      servicesTitle: 'خدمات مصممة لتطوير أعمالك واستدامة الأداء',
      servicesSubtitle:
        'تقدم سداد كوم المحدودة خدمات احترافية تساعد العملاء على تحسين الأداء، تنظيم المطالبات، وتطوير الأعمال وفق أعلى المعايير.',
      methodologyEyebrow: 'منهجية التنفيذ',
      methodologyTitle: 'آلية عمل واضحة من التحليل حتى ضمان الجودة',
      methodologySubtitle: 'نبدأ بفهم احتياج العميل، ثم نصمم الحل المناسب وننفذه ضمن مسار منظم قابل للمتابعة والقياس.',
      excellenceEyebrow: 'التميز التشغيلي وتحصيل الديون',
      excellenceTitle: 'منظومة تشغيل متكاملة لتحسين معدلات الاسترداد',
      excellenceSubtitle:
        'نعتمد على ممارسات معيارية وحلول ذكية تساعد على تسريع الإجراءات وتحسين الأداء التشغيلي بفاعلية واستدامة.',
      whyEyebrow: 'لماذا نحن؟',
      whyTitle: 'قوة رأس المال البشري تصنع الفرق',
      whySubtitle: 'فريق متخصص، إدارة احترافية، سرعة في التنفيذ، وجودة عالية تجعل الخدمة أكثر وضوحًا وكفاءة.',
      sectorsEyebrow: 'النطاق والتأثير',
      sectorsTitle: 'القطاعات التي نخدمها',
      sectorsSubtitle: 'نخدم نطاقًا واسعًا من القطاعات التي تحتاج إلى حلول متابعة وتشغيل وتحصيل منظمة.',
      governanceEyebrow: 'السرية وحوكمة البيانات',
      governanceTitle: 'نتعامل مع بياناتك كأصل حساس',
      governanceSubtitle:
        'في خدمات التحصيل والمتابعة، الثقة تبدأ من حماية المعلومات وتنظيم الوصول إليها واستخدامها في نطاق الخدمة فقط.',
      ctaTitle: 'ابدأ شراكتك الاستراتيجية معنا',
      ctaSubtitle: 'تواصل مع فريق سداد كوم لدراسة احتياجك وتحديد المسار الأنسب لخدمة أعمالك.',
    },
    values: [
      { icon: Eye, title: 'الشفافية', description: 'نؤمن بالوضوح والمصداقية في جميع تعاملاتنا.' },
      { icon: Users, title: 'الاحترافية', description: 'نعمل وفق منهج احترافي يضمن الدقة والكفاءة.' },
      { icon: Clock3, title: 'الالتزام', description: 'نحرص على تنفيذ الأعمال ضمن الجداول الزمنية المحددة.' },
      { icon: ShieldCheck, title: 'الجودة', description: 'نلتزم بأعلى معايير الأداء والتميز المؤسسي.' },
      { icon: Handshake, title: 'رضا العملاء', description: 'رضا العميل من أولوياتنا الأساسية في كل خدمة.' },
      { icon: Lightbulb, title: 'الابتكار', description: 'نسعى دائمًا لتطوير حلول حديثة ومبتكرة.' },
    ],
    services: [
      {
        icon: Banknote,
        title: 'تحصيل الديون وإدارة المطالبات',
        description: 'متابعة ملفات المديونيات والمطالبات المالية ضمن إجراءات منظمة وواضحة تراعي طبيعة كل قطاع.',
        fit: 'مناسبة للجهات التي لديها مطالبات أو فواتير متأخرة وتحتاج إلى متابعة احترافية.',
        outcome: 'يحصل العميل على مسار متابعة أوضح، تصنيف للملفات، وتواصل منظم يدعم تحسين معدلات الاسترداد.',
        points: ['فرز وتصنيف المطالبات', 'متابعة التواصل والتسوية', 'تقارير ومخرجات واضحة'],
      },
      {
        icon: ClipboardCheck,
        title: 'الحلول والخدمات المتكاملة',
        description: 'حلول احترافية تلبي احتياجات العملاء وفق أعلى المعايير وتساعد على تطوير الأداء.',
        fit: 'مناسبة للمنشآت التي تبحث عن شريك يساعدها على تنظيم العمل ورفع جودة الإجراءات.',
        outcome: 'يحصل العميل على حلول قابلة للتطبيق ومبنية على فهم احتياجه التشغيلي.',
        points: ['تحليل الاحتياج', 'تصميم حلول مناسبة', 'تحسين جودة الأداء'],
      },
      {
        icon: Users,
        title: 'خدمات الدعم والتشغيل',
        description: 'خدمات تشغيل ودعم فعالة لضمان استمرارية الأعمال بكفاءة عالية.',
        fit: 'مناسبة للشركات التي تحتاج إلى فرق مساندة أو تنظيم يومي للعمليات.',
        outcome: 'تنظيم أفضل للمهام، متابعة أوضح للمسؤوليات، واستمرارية تشغيلية أكثر كفاءة.',
        points: ['دعم العمليات اليومية', 'تنظيم فرق العمل', 'رفع كفاءة التشغيل'],
      },
      {
        icon: Lightbulb,
        title: 'الاستشارات والتطوير',
        description: 'مساعدة العملاء في تطوير أعمالهم من خلال استشارات احترافية وحلول عملية.',
        fit: 'مناسبة للجهات التي تريد مراجعة أساليب العمل أو تطوير آلياتها الحالية.',
        outcome: 'خطة تطوير واضحة تساعد على تحسين الأداء وتقليل التحديات التشغيلية.',
        points: ['مراجعة الإجراءات', 'اقتراح حلول تطويرية', 'دعم قرارات التحسين'],
      },
      {
        icon: BriefcaseBusiness,
        title: 'إدارة وتنفيذ المشاريع',
        description: 'إدارة وتنفيذ المشاريع باحترافية عالية وفق خطط مدروسة ومراحل واضحة.',
        fit: 'مناسبة للمشاريع التشغيلية والإدارية التي تحتاج إلى متابعة وتنفيذ منظم.',
        outcome: 'تنفيذ أكثر انضباطًا، متابعة مستمرة، ومخرجات مرتبطة بخطة واضحة.',
        points: ['تحديد نطاق المشروع', 'إدارة مراحل التنفيذ', 'ضمان جودة النتائج'],
      },
      {
        icon: Headphones,
        title: 'خدمات المتابعة والصيانة',
        description: 'متابعة وصيانة مستمرة لضمان جودة الأداء واستقرار الحلول المعتمدة.',
        fit: 'مناسبة للجهات التي تحتاج إلى متابعة مستمرة بعد التشغيل أو التطوير.',
        outcome: 'استقرار أعلى في الأداء ومعالجة أسرع للملاحظات وتحسين مستمر للخدمة.',
        points: ['متابعة الأداء', 'رصد الملاحظات', 'تحسين مستمر'],
      },
    ],
    methodology: [
      { number: '01', title: 'دراسة احتياجات العميل', description: 'تحليل عميق للوضع الحالي وتحديد المتطلبات والتحديات التشغيلية الخاصة بكل عميل.' },
      { number: '02', title: 'إعداد الحلول المناسبة', description: 'تصميم استراتيجيات وأنظمة متكاملة تتوافق مع طبيعة القطاع واحتياج العميل.' },
      { number: '03', title: 'التخطيط والتنفيذ', description: 'تطبيق الحلول بواسطة فرق متخصصة بسرعة وانضباط واضح ضمن الجداول المحددة.' },
      { number: '04', title: 'المتابعة وضمان الجودة', description: 'متابعة مستمرة لضمان أعلى مستويات الأداء وتحسين معدلات الاسترداد والنتائج.' },
    ],
    excellence: [
      { icon: ShieldCheck, title: 'الممارسات المعيارية', description: 'نطبق أفضل الممارسات التشغيلية لتحقيق أهداف التحصيل وفق أعلى معايير الجودة والدقة.' },
      { icon: BarChart3, title: 'معدلات الاسترداد', description: 'نركز استراتيجيًا على رفع نسب الاسترداد وتحقيق نتائج تشغيلية فعالة.' },
      { icon: Cpu, title: 'الذكاء والأتمتة', description: 'نوفر حلولًا ذكية وحديثة تساهم في تسريع الإجراءات وتحسين الأداء التشغيلي.' },
    ],
    whyUs: [
      { icon: ShieldCheck, title: 'خبرات متخصصة', description: 'يمتلك فريقنا خبرات واسعة في مجال التحصيل وإدارة الديون لتحقيق أفضل النتائج.' },
      { icon: Users, title: 'فريق إداري احترافي', description: 'فريق منظم يتميز بالسرعة والدقة والقدرة على معالجة التحديات وتقديم الحلول.' },
      { icon: Handshake, title: 'سرعة في التنفيذ', description: 'ننجز المهام بكفاءة فائقة وفي الوقت المحدد دون المساومة على الدقة.' },
      { icon: Target, title: 'جودة عالية', description: 'نلتزم بتقديم خدمات صارمة وفق أعلى وأحدث معايير الجودة العالمية.' },
    ],
    sectors: [
      { icon: Building2, title: 'قطاع الأعمال والمؤسسات', description: 'حلول متابعة وتشغيل تساعد الشركات على تنظيم المطالبات والعمليات.' },
      { icon: Banknote, title: 'قطاع البنوك', description: 'خدمات دقيقة للجهات المصرفية التي تتطلب سرية وانضباطًا في الإجراءات.' },
      { icon: Headphones, title: 'قطاع الاتصالات', description: 'حلول مناسبة لمحافظ الاتصالات والفواتير وعقود الخدمات.' },
      { icon: BriefcaseBusiness, title: 'القطاع التجاري والخاص', description: 'متابعة مطالبات وخدمات تشغيلية مناسبة للشركات والمنشآت الخاصة.' },
      { icon: Landmark, title: 'القطاع الحكومي', description: 'خدمات منظمة تراعي متطلبات الجهات الحكومية وآليات العمل المؤسسي.' },
      { icon: Factory, title: 'القطاع الصناعي', description: 'دعم المنشآت الصناعية في متابعة الالتزامات والمطالبات المرتبطة بالتشغيل.' },
      { icon: ShieldCheck, title: 'قطاع التأمين', description: 'متابعة دقيقة للملفات ذات الطبيعة التأمينية والمالية.' },
      { icon: Store, title: 'قطاع التجزئة', description: 'متابعة الفواتير والمستحقات المتكررة وتنظيم إجراءات التحصيل.' },
    ],
    governance: [
      { icon: LockKeyhole, title: 'تنظيم الوصول للمعلومات', description: 'تتم إدارة البيانات وفق الحاجة التشغيلية وبما يحافظ على سرية الملفات.' },
      { icon: ShieldCheck, title: 'استخدام البيانات لغرض الخدمة', description: 'لا تستخدم بيانات العملاء إلا في نطاق المراجعة والمتابعة المتفق عليها.' },
      { icon: FileCheck2, title: 'توثيق الإجراءات', description: 'التوثيق يرفع جودة المتابعة ويمنح العميل صورة أوضح عن مراحل العمل.' },
      { icon: Handshake, title: 'تواصل مهني ومسؤول', description: 'نركز على الوضوح والهدوء وحفظ السمعة في جميع مراحل التواصل.' },
    ],
    faqs: [
      { question: 'ما طبيعة عمل سداد كوم المحدودة؟', answer: 'تقدم الشركة منظومة خدمات متكاملة تشمل تحصيل الديون، الدعم والتشغيل، الاستشارات، إدارة المشاريع، والمتابعة والصيانة.' },
      { question: 'هل تقدم الشركة خدمات باللغة العربية والإنجليزية؟', answer: 'نعم، تم تجهيز الموقع والبروفايل باللغتين العربية والإنجليزية لتسهيل التواصل مع مختلف العملاء والقطاعات.' },
      { question: 'ما القطاعات التي تخدمها الشركة؟', answer: 'تخدم الشركة قطاع الأعمال والمؤسسات، البنوك، الاتصالات، القطاع التجاري والخاص، القطاع الحكومي، الصناعي، والتأمين.' },
      { question: 'كيف تبدأ آلية العمل؟', answer: 'تبدأ بدراسة احتياجات العميل، ثم إعداد الحلول المناسبة، وبعدها التخطيط والتنفيذ، ثم المتابعة وضمان الجودة.' },
      { question: 'هل يتم التعامل مع البيانات بسرية؟', answer: 'نعم، تتعامل الشركة مع بيانات العملاء باعتبارها معلومات حساسة وتستخدمها ضمن نطاق الخدمة فقط.' },
      { question: 'كيف يمكن طلب الخدمة؟', answer: 'يمكن التواصل عبر الهاتف أو البريد أو نموذج الموقع الذي يفتح واتساب برسالة مرتبة تحتوي بيانات الطلب.' },
    ],
    contactForm: {
      title: 'أرسل طلبك الأولي',
      subtitle: 'اترك بياناتك وسيتواصل معك فريق سداد كوم لمراجعة احتياجك وتحديد المسار الأنسب.',
      name: 'الاسم الكامل',
      organization: 'اسم الجهة أو الشركة',
      phone: 'رقم الجوال',
      service: 'نوع الخدمة المطلوبة',
      message: 'اكتب ملخصًا مختصرًا عن احتياجك',
      serviceOptions: ['تحصيل الديون وإدارة المطالبات', 'الدعم والتشغيل', 'الاستشارات والتطوير', 'إدارة وتنفيذ المشاريع', 'المتابعة والصيانة', 'أخرى'],
      whatsappMessage: 'مرحبًا سداد كوم، أود طلب استشارة أولية.',
    },
    legal: {
      privacyTitle: 'سياسة الخصوصية',
      privacySubtitle: 'توضح هذه الصفحة طريقة التعامل مع بيانات التواصل والمعلومات الأولية التي يرسلها الزائر عبر الموقع.',
      privacyPoints: [
        'تستخدم بيانات التواصل للرد على الطلبات وتحديد احتياج العميل فقط.',
        'لا يتم مشاركة البيانات مع أطراف غير مخولة إلا عند الحاجة النظامية أو بموافقة العميل.',
        'ننصح بعدم إرسال مستندات حساسة عبر النموذج قبل التواصل الرسمي مع فريق الشركة.',
        'يتم التعامل مع البيانات بما يحافظ على السرية والمهنية.',
      ],
      termsTitle: 'شروط الاستخدام',
      termsSubtitle: 'استخدامك للموقع يعني موافقتك على هذه الشروط العامة الخاصة بالتصفح والتواصل.',
      termsPoints: [
        'المحتوى الموجود في الموقع تعريفي ولا يعد عرضًا ملزمًا إلا بعد الاتفاق الرسمي.',
        'تحدد تفاصيل الخدمات بعد دراسة احتياج العميل وطبيعة الملفات أو المشروع.',
        'لا يجوز استخدام محتوى الموقع أو الهوية البصرية دون إذن من الشركة.',
        'تحتفظ الشركة بحق تحديث محتوى الموقع عند الحاجة.',
      ],
    },
  },
  en: {
    ui: {
      requestConsultation: 'Request Consultation',
      requestInitial: 'Request Initial Consultation',
      exploreServices: 'Explore Services',
      downloadProfile: 'Download Company Profile',
  downloadAr: 'Arabic Profile',
downloadEn: 'English Profile',
      learnMore: 'Learn More',
      moreServices: 'More Services',
      viewWorkflow: 'View Workflow',
      whatsapp: 'WhatsApp Direct',
      sendRequest: 'Send Request via WhatsApp',
      backHome: 'Back to Home',
      menu: 'Open menu',
      close: 'Close menu',
      switchLanguage: 'العربية',
      languageLabel: 'Switch language',
      footerNote: 'Integrated professional solutions with high expertise and quality towards a more advanced and innovative future.',
    },
    hero: {
      eyebrow: 'Integrated Professional Business & Collection Solutions',
      title: 'Sadad Com Limited is your operational partner for claims management and business development.',
      subtitle:
        'We provide an integrated professional service ecosystem covering debt collection, support and operations, consulting, project execution, and continuous follow-up to help clients achieve better efficiency and clearer results.',
      sidebarTitle: 'Service Pillars',
      sidebarSubtitle: 'Organization, follow-up, quality, and lasting partnerships.',
      pillars: ['Debt Collection', 'Claims Management', 'Operational Solutions', 'Follow-up & Reports'],
      trust: ['Reliable Expertise', 'High Quality', 'Lasting Partnership', 'Continuous Innovation'],
    },
    trustStrip: ['Full Data Confidentiality', 'Organized Procedures', 'Professional Follow-up', 'Multi-Sector Solutions'],
    aboutPreview: {
      eyebrow: 'Welcome to Sadad Com',
      title: 'We offer professional services built on quality, innovation, and commitment.',
      subtitle:
        'We constantly strive to provide the best solutions that meet our clients’ needs and keep pace with the latest market developments, while building long-term relationships based on trust, efficiency, and specialized work.',
      bullets: ['Specialized Team', 'Quality & Professionalism', 'Trust & Partnerships'],
    },
    visionMission: {
      visionTitle: 'Our Vision',
      vision: 'Leadership at the local and regional levels, and contributing to business development through innovation, quality, and professionalism.',
      missionTitle: 'Our Mission',
      mission:
        'Providing high-quality services based on efficiency, expertise, and continuous improvement to achieve customer satisfaction, enhance the value of their businesses, and build long-term strategic partnerships.',
      goalsTitle: 'Our Strategic Goals',
    },
    sectionText: {
      valuesEyebrow: 'Guiding Principles',
      valuesTitle: 'Our Core Values',
      valuesSubtitle: 'Clear principles that shape how we work and deliver a professional experience based on transparency, quality, and commitment.',
      servicesEyebrow: 'Integrated Service Ecosystem',
      servicesTitle: 'Services designed to develop your business and sustain performance',
      servicesSubtitle:
        'Sadad Com Limited provides professional services that help clients improve performance, organize claims, and develop business according to high standards.',
      methodologyEyebrow: 'Implementation Methodology',
      methodologyTitle: 'A clear workflow from analysis to quality assurance',
      methodologySubtitle: 'We begin by understanding client needs, then design and execute the right solution through an organized and measurable workflow.',
      excellenceEyebrow: 'Operational Excellence & Debt Collection',
      excellenceTitle: 'An integrated operational ecosystem to improve recovery performance',
      excellenceSubtitle:
        'We rely on standard practices and smart solutions that accelerate procedures and improve operational performance efficiently and sustainably.',
      whyEyebrow: 'Why Us?',
      whyTitle: 'The power of human capital makes the difference',
      whySubtitle: 'Specialized expertise, professional management, speed in execution, and high quality make the service clearer and more efficient.',
      sectorsEyebrow: 'Scope & Impact',
      sectorsTitle: 'Sectors We Serve',
      sectorsSubtitle: 'We serve a broad range of sectors that require organized follow-up, operations, and collection solutions.',
      governanceEyebrow: 'Confidentiality & Data Governance',
      governanceTitle: 'We treat your data as a sensitive asset',
      governanceSubtitle:
        'In collection and follow-up services, trust begins with protecting information, organizing access, and using data only within the service scope.',
      ctaTitle: 'Start Your Strategic Partnership With Us',
      ctaSubtitle: 'Contact Sadad Com to review your needs and identify the most suitable service path for your business.',
    },
    values: [
      { icon: Eye, title: 'Transparency', description: 'We believe in clarity and credibility in all our dealings.' },
      { icon: Users, title: 'Professionalism', description: 'We operate with a professional approach that ensures accuracy and efficiency.' },
      { icon: Clock3, title: 'Commitment', description: 'We are dedicated to executing tasks within defined timelines.' },
      { icon: ShieldCheck, title: 'Quality', description: 'We adhere to high standards of performance and institutional excellence.' },
      { icon: Handshake, title: 'Customer Satisfaction', description: 'Client satisfaction is one of our top fundamental priorities.' },
      { icon: Lightbulb, title: 'Innovation', description: 'We continuously seek to develop modern and innovative solutions.' },
    ],
    services: [
      {
        icon: Banknote,
        title: 'Debt Collection & Claims Management',
        description: 'Managing debt and financial claim files through organized procedures that respect each sector’s requirements.',
        fit: 'Suitable for organizations with overdue claims or invoices that need professional follow-up.',
        outcome: 'Clients receive a clearer follow-up path, file classification, and organized communication that supports recovery performance.',
        points: ['Claim sorting and classification', 'Follow-up and settlement support', 'Clear reports and outputs'],
      },
      {
        icon: ClipboardCheck,
        title: 'Integrated Solutions & Services',
        description: 'Professional solutions that meet client needs according to high standards and support performance development.',
        fit: 'Suitable for organizations seeking a partner to organize work and improve procedures.',
        outcome: 'Practical solutions designed around the client’s operational needs.',
        points: ['Needs analysis', 'Tailored solution design', 'Performance quality improvement'],
      },
      {
        icon: Users,
        title: 'Support & Operations Services',
        description: 'Effective operational and support services to ensure business continuity with efficiency.',
        fit: 'Suitable for companies needing support teams or daily process organization.',
        outcome: 'Better task organization, clearer responsibilities, and more efficient operational continuity.',
        points: ['Daily operations support', 'Team organization', 'Operational efficiency'],
      },
      {
        icon: Lightbulb,
        title: 'Consulting & Development',
        description: 'Helping clients develop their businesses through professional consultations and practical solutions.',
        fit: 'Suitable for entities wanting to review current practices or develop existing workflows.',
        outcome: 'A clear development plan that improves performance and reduces operational challenges.',
        points: ['Procedure review', 'Development solutions', 'Improvement decisions support'],
      },
      {
        icon: BriefcaseBusiness,
        title: 'Project Management & Execution',
        description: 'Managing and executing projects with high professionalism according to well-studied plans.',
        fit: 'Suitable for operational and administrative projects that require organized execution and follow-up.',
        outcome: 'More disciplined execution, continuous follow-up, and outputs linked to a clear plan.',
        points: ['Project scope definition', 'Execution management', 'Quality assurance'],
      },
      {
        icon: Headphones,
        title: 'Follow-up & Maintenance Services',
        description: 'Continuous follow-up and maintenance to ensure performance quality and solution stability.',
        fit: 'Suitable for organizations needing continuous follow-up after operation or development.',
        outcome: 'Higher performance stability, faster issue handling, and continuous service improvement.',
        points: ['Performance follow-up', 'Issue tracking', 'Continuous improvement'],
      },
    ],
    methodology: [
      { number: '01', title: 'Analyzing Client Needs', description: 'Deep analysis of the current situation, requirements, and specific operational challenges.' },
      { number: '02', title: 'Developing Appropriate Solutions', description: 'Designing strategies and integrated systems tailored to the sector and client needs.' },
      { number: '03', title: 'Planning & Execution', description: 'Deploying solutions through specialized teams with speed and strict adherence to timelines.' },
      { number: '04', title: 'Follow-up & Quality Assurance', description: 'Continuous monitoring to ensure high performance and improved recovery results.' },
    ],
    excellence: [
      { icon: ShieldCheck, title: 'Standard Practices', description: 'We apply best operational practices to achieve collection goals according to high standards of quality and accuracy.' },
      { icon: BarChart3, title: 'Recovery Rates', description: 'We strategically focus on increasing recovery rates and achieving effective operational results.' },
      { icon: Cpu, title: 'Automation & Intelligence', description: 'We provide smart, modern electronic solutions that accelerate procedures and improve operational performance.' },
    ],
    whyUs: [
      { icon: ShieldCheck, title: 'Specialized Expertise', description: 'Our team possesses extensive experience in collection and debt management to achieve better results.' },
      { icon: Users, title: 'Professional Management Team', description: 'Our team is organized, fast, accurate, and capable of addressing challenges and providing solutions.' },
      { icon: Handshake, title: 'Speed in Execution', description: 'We accomplish tasks efficiently and on time without compromising accuracy.' },
      { icon: Target, title: 'High Quality', description: 'We are committed to providing rigorous services according to high and modern quality standards.' },
    ],
    sectors: [
      { icon: Building2, title: 'Business & Corporate Sector', description: 'Follow-up and operational solutions that help companies organize claims and processes.' },
      { icon: Banknote, title: 'Banking Sector', description: 'Precise services for banking entities requiring confidentiality and procedural discipline.' },
      { icon: Headphones, title: 'Telecommunications Sector', description: 'Solutions suitable for telecom portfolios, invoices, and service contracts.' },
      { icon: BriefcaseBusiness, title: 'Commercial & Private Sector', description: 'Claims follow-up and operational services for private companies and organizations.' },
      { icon: Landmark, title: 'Government Sector', description: 'Organized services that respect government requirements and institutional workflows.' },
      { icon: Factory, title: 'Industrial Sector', description: 'Supporting industrial entities in following up obligations and operation-related claims.' },
      { icon: ShieldCheck, title: 'Insurance Sector', description: 'Precise follow-up for insurance and finance-related files.' },
      { icon: Store, title: 'Retail Sector', description: 'Following up recurring invoices, receivables, and collection procedures.' },
    ],
    governance: [
      { icon: LockKeyhole, title: 'Access Control', description: 'Data is managed according to operational need while maintaining file confidentiality.' },
      { icon: ShieldCheck, title: 'Service-Scope Use', description: 'Client data is used only within the agreed review and follow-up scope.' },
      { icon: FileCheck2, title: 'Procedure Documentation', description: 'Documentation improves follow-up quality and gives clients a clearer view of the workflow.' },
      { icon: Handshake, title: 'Professional Communication', description: 'We focus on clarity, calm, and reputation preservation throughout communication stages.' },
    ],
    faqs: [
      { question: 'What does Sadad Com Limited do?', answer: 'The company provides an integrated service ecosystem covering debt collection, support and operations, consulting, project management, follow-up, and maintenance.' },
      { question: 'Does the company provide Arabic and English materials?', answer: 'Yes, the website and company profiles are prepared in both Arabic and English to support different clients and sectors.' },
      { question: 'Which sectors does the company serve?', answer: 'Sadad Com serves the business and corporate sector, banking, telecommunications, commercial and private sector, government, industrial, and insurance sectors.' },
      { question: 'How does the workflow begin?', answer: 'It starts with analyzing client needs, then developing appropriate solutions, planning and execution, and finally follow-up and quality assurance.' },
      { question: 'Is client data handled confidentially?', answer: 'Yes, client data is treated as sensitive information and used only within the service scope.' },
      { question: 'How can I request a service?', answer: 'You can contact us by phone, email, or the website form, which opens WhatsApp with an organized request message.' },
    ],
    contactForm: {
      title: 'Send Your Initial Request',
      subtitle: 'Leave your details and the Sadad Com team will review your needs and suggest the most suitable service path.',
      name: 'Full Name',
      organization: 'Organization / Company Name',
      phone: 'Mobile Number',
      service: 'Required Service',
      message: 'Write a brief summary of your needs',
      serviceOptions: ['Debt Collection & Claims Management', 'Support & Operations', 'Consulting & Development', 'Project Management & Execution', 'Follow-up & Maintenance', 'Other'],
      whatsappMessage: 'Hello Sadad Com, I would like to request an initial consultation.',
    },
    legal: {
      privacyTitle: 'Privacy Policy',
      privacySubtitle: 'This page explains how contact details and initial information submitted through the website are handled.',
      privacyPoints: [
        'Contact details are used to respond to requests and understand client needs only.',
        'Data is not shared with unauthorized parties except when legally required or with client approval.',
        'We recommend not sending sensitive documents through the form before official communication with the company team.',
        'Data is handled in a way that preserves confidentiality and professionalism.',
      ],
      termsTitle: 'Terms of Use',
      termsSubtitle: 'Using this website means you agree to these general terms for browsing and communication.',
      termsPoints: [
        'The website content is informational and does not constitute a binding offer until a formal agreement is made.',
        'Service details are determined after reviewing the client’s needs and the nature of the files or project.',
        'Website content and visual identity may not be used without company permission.',
        'The company reserves the right to update website content when needed.',
      ],
    },
  },
} satisfies Record<Language, unknown>;

function hrefFor(route: RouteKey) {
  return route === 'home' ? '#/' : `#/${route}`;
}

function getRouteFromHash(): RouteKey {
  const value = window.location.hash.replace(/^#\/?/, '') || 'home';
  const routes: RouteKey[] = ['home', 'about', 'services', 'process', 'sectors', 'faq', 'contact', 'privacy', 'terms'];
  return routes.includes(value as RouteKey) ? (value as RouteKey) : 'home';
}

function useRoute() {
  const [route, setRoute] = useState<RouteKey>(() => getRouteFromHash());

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}

function useLanguage() {
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem('sadad-lang');
    return stored === 'en' ? 'en' : 'ar';
  });

  useEffect(() => {
    localStorage.setItem('sadad-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  return { lang, setLang };
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function ArrowIcon({ lang, className = 'h-4 w-4' }: { lang: Language; className?: string }) {
  return lang === 'ar' ? <ArrowLeft className={className} /> : <ArrowRight className={className} />;
}

function RouteLink({
  route,
  children,
  className = '',
  onClick,
  ariaLabel,
}: {
  route: RouteKey;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <a href={hrefFor(route)} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </a>
  );
}

function BrandMark({ lang, compact = false }: { lang: Language; compact?: boolean }) {
  const c = company[lang];
  return (
    <div className="flex min-w-0 items-center gap-3">
    <div className={`${compact ? 'h-12 w-12' : 'h-16 w-16'} flex flex-shrink-0 items-center justify-center overflow-visible bg-transparent`}>
  <img
    src="./images/logo-symbol.png"
    alt="Sadad Com logo"
    className="h-full w-full object-contain"
  />
</div>
      <div className="min-w-0">
        <p className="truncate text-lg font-extrabold text-slate-950">{c.name}</p>
        <p className="hidden text-xs font-semibold tracking-[0.18em] text-slate-500 sm:block">{c.enName}</p>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      <span className="section-eyebrow">
        <Sparkles className="h-4 w-4" />
        {eyebrow}
      </span>
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle">{subtitle}</p>
    </Reveal>
  );
}

function ProfileDownloadButtons({ lang, variant = 'light' }: { lang: Language; variant?: 'light' | 'dark' }) {
  const t = content[lang].ui;
  const base = variant === 'dark' ? 'profile-button-dark' : 'secondary-button';
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a href="./profile-ar.pdf" download className={base}>
        <FileText className="h-5 w-5" />
        {t.downloadAr}
      </a>
      <a href="./profile-en.pdf" download className={base}>
        <FileText className="h-5 w-5" />
        {t.downloadEn}
      </a>
    </div>
  );
}

function FloatingLanguageButton({ lang, setLang }: { lang: Language; setLang: (lang: Language) => void }) {
  const t = content[lang].ui;
  const nextLang = lang === 'ar' ? 'en' : 'ar';
  return (
    <button
      type="button"
      onClick={() => setLang(nextLang)}
      className="fixed bottom-5 z-[60] inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-4 py-3 text-sm font-extrabold text-slate-950 shadow-2xl shadow-cyan-950/20 backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-900 ltr:right-5 rtl:left-5"
      aria-label={t.languageLabel}
    >
      <Globe2 className="h-5 w-5 text-cyan-700" />
      {t.switchLanguage}
    </button>
  );
}

function Navigation({ activeRoute, lang }: { activeRoute: RouteKey; lang: Language }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = content[lang].ui;
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 animate-nav border-b border-white/60 bg-white/90 backdrop-blur-xl">
      <div className="section-container flex h-20 items-center justify-between">
        <RouteLink route="home" onClick={closeMenu} className="flex min-w-0 items-center gap-3" ariaLabel={routeLabels[lang].home}>
          <BrandMark lang={lang} />
        </RouteLink>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = activeRoute === link.route;
            return (
              <RouteLink
                key={link.route}
                route={link.route}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  isActive ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-600 hover:bg-cyan-50 hover:text-cyan-900'
                }`}
              >
                {link[lang]}
              </RouteLink>
            );
          })}
        </nav>

        <div className="hidden xl:block">
          <RouteLink route="contact" className="primary-button">
            {t.requestConsultation}
            <ArrowIcon lang={lang} />
          </RouteLink>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800 xl:hidden"
          aria-label={isOpen ? t.close : t.menu}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="mobile-menu border-t border-slate-100 bg-white xl:hidden">
          <div className="section-container grid gap-2 py-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeRoute === link.route;
              return (
                <RouteLink
                  key={link.route}
                  route={link.route}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                    isActive ? 'bg-slate-950 text-white' : 'text-slate-700 hover:bg-cyan-50 hover:text-cyan-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link[lang]}
                </RouteLink>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Hero({ lang }: { lang: Language }) {
  const c = company[lang];
  const hero = content[lang].hero;
  const t = content[lang].ui;

  return (
    <section className="premium-hero relative overflow-hidden py-16 text-white sm:py-20 lg:py-24">
      <div className="hero-bg absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="section-container grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100 shadow-sm backdrop-blur">
              <ShieldCheck className="h-4 w-4" />
              {c.name} — {c.enName}
            </span>
          </Reveal>
          <Reveal delay={90}>
<h1 className="mt-5 max-w-4xl font-extrabold tracking-tight text-white">
  {lang === 'ar' ? (
    <>
      <span className="block text-4xl leading-[1.15] sm:text-5xl lg:text-6xl">
        سداد كوم المحدودة
      </span>
      <span className="mt-3 block text-2xl leading-[1.45] sm:text-3xl lg:text-4xl">
        شريكك التشغيلي لإدارة المطالبات وتطوير الأعمال.
      </span>
    </>
  ) : (
    <span className="block text-4xl leading-[1.18] sm:text-5xl lg:text-6xl">
      {hero.title}
    </span>
  )}
</h1>          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-cyan-50/90">{hero.subtitle}</p>
          </Reveal>

          <Reveal delay={230} className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <RouteLink route="contact" className="hero-button-primary">
                {t.requestInitial}
                <ArrowIcon lang={lang} />
              </RouteLink>
              <RouteLink route="services" className="hero-button-secondary">
                {t.exploreServices}
                <BriefcaseBusiness className="h-4 w-4" />
              </RouteLink>
            </div>
          </Reveal>

          

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
            {hero.trust.map((item, index) => (
              <Reveal key={item} delay={320 + index * 70}>
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-sm backdrop-blur">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-cyan-200" />
                  <span className="text-sm font-extrabold text-white">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={140} className="relative">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/30 backdrop-blur">
            <img src="./images/city-skyline.svg" alt="City skyline" className="h-[330px] w-full rounded-[1.75rem] object-cover opacity-95 sm:h-[450px]" />
            <div className="absolute inset-x-7 bottom-7 rounded-3xl border border-white/15 bg-slate-950/78 p-5 shadow-xl backdrop-blur-xl">
              <p className="text-xs font-extrabold tracking-[0.22em] text-cyan-200">{c.name}</p>
              <p className="mt-2 text-xl font-extrabold text-white">{hero.sidebarSubtitle}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {hero.pillars.map((item) => (
                  <p key={item} className="flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-sm font-extrabold text-white">
                    <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
<div
  className={`absolute top-36 scale-[0.92] rounded-3xl border border-cyan-100/40 bg-white/10 p-4 shadow-xl backdrop-blur-md sm:top-7 sm:scale-100 ${
    lang === 'en'
      ? 'right-4 left-auto origin-top-right text-left sm:right-7 sm:left-auto'
      : 'left-4 right-auto origin-top-left text-right sm:left-7 sm:right-auto'
  }`}
><p className="text-xs font-bold text-cyan-200">
    {hero.sidebarTitle}
  </p>

  <div className="mt-3 space-y-2">
    {hero.pillars.map((item) => (
      <p
        key={item}
        className="flex items-center gap-2 text-sm font-extrabold text-white"
      >
        <CheckCircle2 className="h-4 w-4 text-cyan-200" />
        {item}
      </p>
    ))}
  </div>
</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TrustStrip({ lang }: { lang: Language }) {
  const icons = [ShieldCheck, ClipboardCheck, Headphones, Building2];
  return (
    <section className="relative z-10 -mt-8 pb-8">
      <div className="section-container">
        <div className="grid gap-3 rounded-[2rem] border border-white/80 bg-white/90 p-3 shadow-2xl shadow-cyan-950/10 backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
          {content[lang].trustStrip.map((label, index) => {
            const Icon = icons[index];
            return (
              <Reveal key={label} delay={index * 70}>
                <div className="flex h-full items-center gap-3 rounded-3xl border border-cyan-900/10 bg-white px-5 py-4 shadow-sm">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-cyan-900/10 text-cyan-800">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-extrabold text-slate-800">{label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PreviewAbout({ lang }: { lang: Language }) {
  const about = content[lang].aboutPreview;
  const t = content[lang].ui;
  return (
    <section className="py-20 sm:py-24">
      <div className="section-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
<div className="relative overflow-hidden rounded-[2rem] border border-cyan-100/60 bg-cyan-50/40 p-3 shadow-xl shadow-cyan-950/5"><img src="./images/logo-full.png" alt="Sadad Com visual identity" className="mx-auto h-auto max-h-[360px] w-full object-contain px-3" />          </div>
        </Reveal>
        <div>
          <Reveal>
            <span className="section-eyebrow">{about.eyebrow}</span>
            <h2 className="section-title">{about.title}</h2>
            <p className="section-subtitle">{about.subtitle}</p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {about.bullets.map((item, index) => (
              <Reveal key={item} delay={index * 90}>
                <div className="rounded-3xl border border-cyan-100 bg-white p-5 text-center shadow-sm">
                  <CheckCircle2 className="mx-auto mb-3 h-7 w-7 text-cyan-700" />
                  <p className="font-extrabold text-slate-900">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <RouteLink route="about" className="secondary-button">
              {t.learnMore}
              <ArrowIcon lang={lang} />
            </RouteLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CardGrid({ items, columns = 'lg:grid-cols-3' }: { items: CardItem[]; columns?: string }) {
  return (
    <div className={`grid gap-5 md:grid-cols-2 ${columns}`}>
      {items.map((item, index) => (
        <Reveal key={item.title} delay={index * 75}>
<article className="h-full rounded-[28px] border border-cyan-200/70 bg-white p-7 shadow-xl shadow-cyan-950/10 transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-2xl">            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-900/10 text-cyan-800">
              <item.icon className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-extrabold leading-8 text-slate-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-8 text-slate-600">{item.description}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

function ServicesPreview({ lang }: { lang: Language }) {
  const t = content[lang].sectionText;
  const ui = content[lang].ui;
  return (
    <section className="bg-white/70 py-20 sm:py-24">
      <div className="section-container">
        <SectionHeading eyebrow={t.servicesEyebrow} title={t.servicesTitle} subtitle={t.servicesSubtitle} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {content[lang].services.slice(0, 6).map((service, index) => (
            <Reveal key={service.title} delay={index * 80}>
<article className="h-full rounded-[28px] border border-cyan-200/70 bg-white p-7 shadow-xl shadow-cyan-950/10 transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-2xl">                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/20">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-extrabold leading-8 text-slate-950">{service.title}</h3>
                <p className="mt-3 text-sm leading-8 text-slate-600">{service.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center">
          <RouteLink route="services" className="primary-button">
            {ui.moreServices}
            <ArrowIcon lang={lang} />
          </RouteLink>
        </Reveal>
      </div>
    </section>
  );
}

function MethodologyPreview({ lang }: { lang: Language }) {
  const t = content[lang].sectionText;
  const ui = content[lang].ui;
  return (
    <section className="py-20 sm:py-24">
      <div className="section-container">
        <SectionHeading eyebrow={t.methodologyEyebrow} title={t.methodologyTitle} subtitle={t.methodologySubtitle} />
        <div className="grid gap-5 lg:grid-cols-4">
          {content[lang].methodology.map((step: ProcessStep, index) => (
            <Reveal key={step.number} delay={index * 90}>
<div className="h-full rounded-[28px] border border-cyan-200/70 bg-white p-6 shadow-xl shadow-cyan-950/10 transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-2xl">                <div className="mb-5 inline-flex rounded-2xl bg-slate-950 px-4 py-2 text-lg font-extrabold text-white">{step.number}</div>
                <h3 className="text-lg font-extrabold text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center">
          <RouteLink route="process" className="secondary-button">
            {ui.viewWorkflow}
            <ArrowIcon lang={lang} />
          </RouteLink>
        </Reveal>
      </div>
    </section>
  );
}

function GovernanceSection({ lang }: { lang: Language }) {
  const t = content[lang].sectionText;
  return (
    <section className="governance-section py-20 text-white sm:py-24">
      <div className="section-container grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <Reveal>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100">
            <LockKeyhole className="h-4 w-4" />
            {t.governanceEyebrow}
          </span>
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{t.governanceTitle}</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">{t.governanceSubtitle}</p>
         
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {content[lang].governance.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-cyan-800">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-extrabold">{item.title}</h3>
                <p className="mt-3 text-sm leading-8 text-slate-300">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA({ lang }: { lang: Language }) {
  const t = content[lang].sectionText;
  const ui = content[lang].ui;
  return (
    <section className="py-16 sm:py-20">
      <div className="section-container">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-cyan-950/20 sm:p-10 lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.28),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(14,116,144,0.24),transparent_34%)]" />
            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{t.ctaTitle}</h2>
                <p className="mt-4 text-base leading-8 text-slate-300">{t.ctaSubtitle}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <RouteLink route="contact" className="hero-button-primary">
                  {ui.requestConsultation}
                  <ArrowIcon lang={lang} />
                </RouteLink>
                <a href={`https://wa.me/${company[lang].phoneLink}`} target="_blank" rel="noreferrer" className="hero-button-secondary">
                  {ui.whatsapp}
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PageHero({ lang: _lang, eyebrow, title, subtitle, icon: Icon }: { lang: Language; eyebrow: string; title: string; subtitle: string; icon: LucideIcon }) {  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.28),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="section-container relative">
        <Reveal className="max-w-4xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100">
            <Icon className="h-4 w-4" />
            {eyebrow}
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{subtitle}</p>
         
        </Reveal>
      </div>
    </section>
  );
}

function HomePage({ lang }: { lang: Language }) {
  const t = content[lang].sectionText;
  return (
    <main>
      <Hero lang={lang} />
      <TrustStrip lang={lang} />
      <PreviewAbout lang={lang} />
      <ServicesPreview lang={lang} />
      <MethodologyPreview lang={lang} />
      <section className="bg-white/70 py-20 sm:py-24">
        <div className="section-container">
          <SectionHeading eyebrow={t.whyEyebrow} title={t.whyTitle} subtitle={t.whySubtitle} />
          <CardGrid items={content[lang].whyUs} columns="lg:grid-cols-4" />
        </div>
      </section>
      <GovernanceSection lang={lang} />
      <section className="py-20 sm:py-24">
        <div className="section-container">
          <SectionHeading eyebrow={t.sectorsEyebrow} title={t.sectorsTitle} subtitle={t.sectorsSubtitle} />
          <CardGrid items={content[lang].sectors.slice(0, 7)} columns="lg:grid-cols-4" />
        </div>
      </section>
      <CTA lang={lang} />
    </main>
  );
}

function AboutPage({ lang }: { lang: Language }) {
  const t = content[lang].sectionText;
  const vm = content[lang].visionMission;
  return (
    <main>
      <PageHero lang={lang} icon={Building2} eyebrow={content[lang].aboutPreview.eyebrow} title={content[lang].aboutPreview.title} subtitle={content[lang].aboutPreview.subtitle} />
      <section className="py-20 sm:py-24">
        <div className="section-container grid gap-8 lg:grid-cols-2">
          <Reveal>
            <article className="card h-full p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-900/10 text-cyan-800">
                <Target className="h-7 w-7" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-950">{vm.visionTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{vm.vision}</p>
            </article>
          </Reveal>
          <Reveal delay={100}>
            <article className="card h-full p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-900/10 text-cyan-800">
                <Mail className="h-7 w-7" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-950">{vm.missionTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{vm.mission}</p>
            </article>
          </Reveal>
        </div>
      </section>
      <section className="bg-white/70 py-20 sm:py-24">
        <div className="section-container">
          <SectionHeading eyebrow={t.valuesEyebrow} title={t.valuesTitle} subtitle={t.valuesSubtitle} />
          <CardGrid items={content[lang].values} columns="lg:grid-cols-3" />
        </div>
      </section>
      <section className="py-20 sm:py-24">
        <div className="section-container">
          <SectionHeading eyebrow={vm.goalsTitle} title={vm.goalsTitle} subtitle={t.servicesSubtitle} />
          <CardGrid
            items={[
              { icon: BarChart3, title: lang === 'ar' ? 'توسيع نطاق الأعمال والخدمات' : 'Expanding business and services', description: lang === 'ar' ? 'تطوير نطاق الخدمات لتلبية احتياجات قطاعات متعددة.' : 'Developing the scope of services to meet the needs of multiple sectors.' },
              { icon: Handshake, title: lang === 'ar' ? 'تعزيز ثقة العملاء ورضاهم' : 'Strengthening client trust and satisfaction', description: lang === 'ar' ? 'بناء علاقة مستمرة مع العملاء تعتمد على جودة الخدمة ووضوح النتائج.' : 'Building lasting client relationships based on service quality and clear results.' },
              { icon: Cpu, title: lang === 'ar' ? 'مواكبة التقنيات والحلول الحديثة' : 'Keeping pace with modern technologies', description: lang === 'ar' ? 'تطوير أساليب العمل بما يناسب احتياجات السوق والتحول التشغيلي.' : 'Developing working methods that fit market needs and operational transformation.' },
              { icon: Building2, title: lang === 'ar' ? 'بناء شراكات استراتيجية' : 'Building strategic partnerships', description: lang === 'ar' ? 'تعزيز الشراكات والقدرات التشغيلية لدعم النمو المستدام.' : 'Enhancing partnerships and operational capabilities to support sustainable growth.' },
            ]}
            columns="lg:grid-cols-4"
          />
        </div>
      </section>
      <section className="pb-20">
  <div className="section-container">
    <Reveal>
      <div className="rounded-[2rem] border border-cyan-200/70 bg-white p-8 text-center shadow-xl shadow-cyan-950/10">
        <h2 className="text-2xl font-extrabold text-slate-950">
          {lang === 'ar' ? 'الملف التعريفي للشركة' : 'Company Profile'}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-8 text-slate-600">
          {lang === 'ar'
            ? 'يمكنك الاطلاع على الملف التعريفي لسداد كوم المحدودة باللغتين العربية والإنجليزية.'
            : 'You can view Sadad Com Limited company profile in both Arabic and English.'}
        </p>
        <div className="mt-6 flex justify-center">
          <ProfileDownloadButtons lang={lang} />
        </div>
      </div>
    </Reveal>
  </div>
</section>
      <CTA lang={lang} />
    </main>
  );
}

function ServicesPage({ lang }: { lang: Language }) {
  const t = content[lang].sectionText;
  return (
    <main>
      <PageHero lang={lang} icon={BriefcaseBusiness} eyebrow={t.servicesEyebrow} title={t.servicesTitle} subtitle={t.servicesSubtitle} />
      <section className="py-20 sm:py-24">
        <div className="section-container grid gap-6 lg:grid-cols-2">
          {content[lang].services.map((service, index) => (
            <Reveal key={service.title} delay={index * 75}>
<article className="h-full rounded-[28px] border border-cyan-200/70 bg-white p-7 shadow-xl shadow-cyan-950/10 transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-2xl sm:p-8">                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <service.icon className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-extrabold leading-9 text-slate-950">{service.title}</h2>
                <p className="mt-3 text-sm leading-8 text-slate-600">{service.description}</p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl bg-cyan-50 p-5">
                    <p className="text-sm font-extrabold text-cyan-950">{lang === 'ar' ? 'لمن تناسب؟' : 'Best for'}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{service.fit}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm font-extrabold text-slate-950">{lang === 'ar' ? 'ماذا يحصل العميل؟' : 'Client outcome'}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{service.outcome}</p>
                  </div>
                </div>
                <ul className="mt-5 grid gap-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-cyan-700" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA lang={lang} />
    </main>
  );
}

function ProcessPage({ lang }: { lang: Language }) {
  const t = content[lang].sectionText;
  return (
    <main>
      <PageHero lang={lang} icon={ListChecks} eyebrow={t.methodologyEyebrow} title={t.methodologyTitle} subtitle={t.methodologySubtitle} />
      <section className="py-20 sm:py-24">
        <div className="section-container">
          <div className="relative grid gap-5 lg:grid-cols-4">
            {content[lang].methodology.map((step, index) => (
              <Reveal key={step.number} delay={index * 90}>
                <article className="method-card h-full p-7 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-600 to-slate-950 text-white shadow-lg shadow-cyan-950/20">
                    <span className="font-black">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-8 text-slate-600">{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white/70 py-20 sm:py-24">
        <div className="section-container">
          <SectionHeading eyebrow={t.excellenceEyebrow} title={t.excellenceTitle} subtitle={t.excellenceSubtitle} />
          <CardGrid items={content[lang].excellence} columns="lg:grid-cols-3" />
        </div>
      </section>
      <CTA lang={lang} />
    </main>
  );
}

function SectorsPage({ lang }: { lang: Language }) {
  const t = content[lang].sectionText;
  return (
    <main>
      <PageHero lang={lang} icon={Landmark} eyebrow={t.sectorsEyebrow} title={t.sectorsTitle} subtitle={t.sectorsSubtitle} />
      <section className="py-20 sm:py-24">
        <div className="section-container">
          <CardGrid items={content[lang].sectors} columns="lg:grid-cols-4" />
        </div>
      </section>
      <CTA lang={lang} />
    </main>
  );
}

function FAQPage({ lang }: { lang: Language }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <main>
      <PageHero lang={lang} icon={FileCheck2} eyebrow={routeLabels[lang].faq} title={routeLabels[lang].faq} subtitle={lang === 'ar' ? 'إجابات مختصرة على أهم الأسئلة حول طبيعة الخدمات وآلية التواصل.' : 'Short answers to key questions about the services and communication process.'} />
      <section className="py-20 sm:py-24">
        <div className="section-container mx-auto max-w-4xl">
          <div className="grid gap-4">
            {content[lang].faqs.map((item: FaqItem, index) => {
              const isOpen = openIndex === index;
              return (
                <Reveal key={item.question} delay={index * 65}>
                  <article className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <button type="button" onClick={() => setOpenIndex(isOpen ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-6 text-start">
                      <span className="text-lg font-extrabold text-slate-950">{item.question}</span>
                      <ChevronDown className={`h-5 w-5 flex-shrink-0 text-cyan-800 transition ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                      <p className="px-6 pb-6 text-sm leading-8 text-slate-600">{item.answer}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <CTA lang={lang} />
    </main>
  );
}

function ContactPage({ lang }: { lang: Language }) {
  const f = content[lang].contactForm;
  const t = content[lang].ui;
  const c = company[lang];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const details = [
      `${f.name}: ${form.get('name') || ''}`,
      `${f.organization}: ${form.get('organization') || ''}`,
      `${f.phone}: ${form.get('phone') || ''}`,
      `${f.service}: ${form.get('service') || ''}`,
      `${f.message}: ${form.get('message') || ''}`,
    ];
    const text = encodeURIComponent(`${f.whatsappMessage}\n\n${details.join('\n')}`);
    window.open(`https://wa.me/${c.phoneLink}?text=${text}`, '_blank', 'noopener,noreferrer');
  }

  const contacts = [
    { icon: Phone, label: lang === 'ar' ? 'الهاتف' : 'Phone', value: c.phoneDisplay, href: `tel:${c.phoneDisplay}` },
    { icon: Mail, label: lang === 'ar' ? 'البريد الإلكتروني' : 'Email', value: c.email, href: `mailto:${c.email}` },
    { icon: Globe2, label: lang === 'ar' ? 'الموقع الإلكتروني' : 'Website', value: c.website, href: `https://${c.website}` },
    { icon: MapPin, label: lang === 'ar' ? 'العنوان' : 'Address', value: c.location, href: undefined },
  ];

  return (
    <main>
      <PageHero lang={lang} icon={Mail} eyebrow={routeLabels[lang].contact} title={content[lang].sectionText.ctaTitle} subtitle={content[lang].sectionText.ctaSubtitle} />
      <section className="py-20 sm:py-24">
        <div className="section-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {contacts.map((item, index) => (
              <Reveal key={item.label} delay={index * 80}>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined} className="contact-card">
                    <span className="contact-icon"><item.icon className="h-6 w-6" /></span>
                    <span>
                      <span className="block text-sm font-bold text-slate-500">{item.label}</span>
                      <span className="block text-lg font-extrabold text-slate-950">{item.value}</span>
                    </span>
                  </a>
                ) : (
                  <div className="contact-card">
                    <span className="contact-icon"><item.icon className="h-6 w-6" /></span>
                    <span>
                      <span className="block text-sm font-bold text-slate-500">{item.label}</span>
                      <span className="block text-lg font-extrabold text-slate-950">{item.value}</span>
                    </span>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
          <Reveal>
            <form onSubmit={handleSubmit} className="card grid gap-4 p-6 sm:p-8">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-950">{f.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{f.subtitle}</p>
              </div>
              <input className="input-field" name="name" placeholder={f.name} required />
              <input className="input-field" name="organization" placeholder={f.organization} required />
              <input className="input-field" name="phone" placeholder={f.phone} required />
              <select className="input-field" name="service" required defaultValue="">
                <option value="" disabled>{f.service}</option>
                {f.serviceOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <textarea className="input-field min-h-32 resize-y" name="message" placeholder={f.message} required />
              <button type="submit" className="primary-button">
                {t.sendRequest}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function LegalPage({ lang, type }: { lang: Language; type: 'privacy' | 'terms' }) {
  const legal = content[lang].legal;
  const title = type === 'privacy' ? legal.privacyTitle : legal.termsTitle;
  const subtitle = type === 'privacy' ? legal.privacySubtitle : legal.termsSubtitle;
  const points = type === 'privacy' ? legal.privacyPoints : legal.termsPoints;
  return (
    <main>
      <PageHero lang={lang} icon={type === 'privacy' ? LockKeyhole : FileText} eyebrow={title} title={title} subtitle={subtitle} />
      <section className="py-20 sm:py-24">
        <div className="section-container mx-auto max-w-4xl">
          <div className="card p-8">
            <ul className="grid gap-4">
              {points.map((point, index) => (
                <Reveal key={point} delay={index * 70}>
                  <li className="flex gap-3 rounded-3xl bg-slate-50 p-5 text-sm leading-8 text-slate-700">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-700" />
                    <span>{point}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CTA lang={lang} />
    </main>
  );
}

function Footer({ lang }: { lang: Language }) {
  const c = company[lang];
  const ui = content[lang].ui;
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="section-container grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <BrandMark lang={lang} />
          <p className="mt-5 max-w-xl text-sm leading-8 text-slate-600">{ui.footerNote}</p>
         
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-slate-950">{lang === 'ar' ? 'روابط الموقع' : 'Site Links'}</h3>
          <div className="mt-4 grid gap-3">
            {navLinks.map((link) => (
              <RouteLink key={link.route} route={link.route} className="text-sm font-semibold text-slate-600 transition hover:text-cyan-800">
                {link[lang]}
              </RouteLink>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-slate-950">{routeLabels[lang].contact}</h3>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600">
            <p>{c.phoneDisplay}</p>
            <p>{c.email}</p>
            <p>{c.website}</p>
            <p>{c.location}</p>
          </div>
          <div className="mt-5 flex gap-3">
            <RouteLink route="privacy" className="text-sm font-bold text-cyan-800 hover:text-slate-950">{routeLabels[lang].privacy}</RouteLink>
            <RouteLink route="terms" className="text-sm font-bold text-cyan-800 hover:text-slate-950">{routeLabels[lang].terms}</RouteLink>
          </div>
        </div>
      </div>
      <div className="section-container mt-10 border-t border-slate-100 pt-6 text-center text-xs font-semibold text-slate-500">
        © 2026 {c.name}. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
      </div>
    </footer>
  );
}

function App() {
  const route = useRoute();
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${routeLabels[lang][route]} | ${company[lang].name}`;
    const description =
      lang === 'ar'
        ? 'سداد كوم المحدودة تقدم حلولًا احترافية متكاملة في تحصيل الديون والدعم والتشغيل والاستشارات وإدارة المشاريع.'
        : 'Sadad Com Limited provides integrated professional solutions in debt collection, support, operations, consulting, and project management.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [route, lang]);

  return (
    <div className="min-h-screen">
      <Navigation activeRoute={route} lang={lang} />
      {route === 'home' ? <HomePage lang={lang} /> : null}
      {route === 'about' ? <AboutPage lang={lang} /> : null}
      {route === 'services' ? <ServicesPage lang={lang} /> : null}
      {route === 'process' ? <ProcessPage lang={lang} /> : null}
      {route === 'sectors' ? <SectorsPage lang={lang} /> : null}
      {route === 'faq' ? <FAQPage lang={lang} /> : null}
      {route === 'contact' ? <ContactPage lang={lang} /> : null}
      {route === 'privacy' ? <LegalPage lang={lang} type="privacy" /> : null}
      {route === 'terms' ? <LegalPage lang={lang} type="terms" /> : null}
      <Footer lang={lang} />
      <FloatingLanguageButton lang={lang} setLang={setLang} />
    </div>
  );
}

export default App;
