import type { Language } from "../types";

export type LegalBlock = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type LegalDocument = {
  title: string;
  intro: string;
  sections: LegalBlock[];
};

export const LEGAL_LAST_UPDATED = "2026-10-06";

export const privacy: Record<Language, LegalDocument> = {
  en: {
    title: "Privacy Policy",
    intro:
      "Your privacy matters to us. This policy explains what information TravelMate collects when you use the site, why we collect it and what choices you have.",
    sections: [
      {
        id: "information-we-collect",
        title: "Information we collect",
        paragraphs: [
          "You can browse TravelMate without creating an account or telling us who you are. We only collect personal information when you choose to give it to us, or when it is needed to remember your settings.",
        ],
        list: [
          "Contact form: your name, email address, the subject you choose and your message.",
          "Preferences: your chosen language and whether you use light or dark mode.",
        ],
      },
      {
        id: "how-we-use-it",
        title: "How we use your information",
        paragraphs: [
          "We use the information from the contact form only to read and answer your message, for example to look into a destination you suggest or a mistake you report.",
          "We never sell your information, share it with advertisers or use it for marketing.",
        ],
      },
      {
        id: "stored-on-your-device",
        title: "Stored on your device",
        paragraphs: [
          "TravelMate does not use tracking or advertising cookies. To remember your settings between visits, we save your chosen language and theme in your browser’s local storage.",
          "This information stays on your device and is never sent to us. You can remove it at any time by clearing your browser data.",
        ],
      },
      {
        id: "third-party-services",
        title: "Third-party services",
        paragraphs: [
          "To show you destinations, TravelMate loads content and files from a few trusted services. When your browser connects to them, they may receive technical information such as your IP address and browser type.",
        ],
        list: [
          "Sanity stores and delivers our destinations, texts and images.",
          "OpenStreetMap shows the maps on destination pages.",
          "Flagpedia (flagcdn.com) provides the country flags.",
          "Google Fonts provides the font used on the site.",
        ],
      },
      {
        id: "how-long-we-keep-it",
        title: "How long we keep it",
        paragraphs: [
          "We keep messages from the contact form only as long as we need them to answer you. After that, we delete them.",
        ],
      },
      {
        id: "your-rights",
        title: "Your rights",
        paragraphs: [
          "Under the GDPR, you have the right to see the personal information we hold about you, to have it corrected or deleted, and to object to how we use it.",
          "If you think we handle your information in the wrong way, you can complain to your national data protection authority. In Denmark, this is Datatilsynet.",
        ],
      },
      {
        id: "questions",
        title: "Questions",
        paragraphs: [
          "If you have questions about this policy or want to use your rights, send us a message through the contact page.",
        ],
      },
    ],
  },
  da: {
    title: "Privatlivspolitik",
    intro:
      "Dit privatliv er vigtigt for os. Denne politik forklarer, hvilke oplysninger TravelMate indsamler, når du bruger siden, hvorfor vi indsamler dem, og hvilke valg du har.",
    sections: [
      {
        id: "information-we-collect",
        title: "Oplysninger vi indsamler",
        paragraphs: [
          "Du kan bruge TravelMate uden at oprette en konto eller fortælle os, hvem du er. Vi indsamler kun personoplysninger, når du selv vælger at give dem til os, eller når det er nødvendigt for at huske dine indstillinger.",
        ],
        list: [
          "Kontaktformular: dit navn, din e-mailadresse, det emne, du vælger, og din besked.",
          "Indstillinger: dit valgte sprog, og om du bruger lyst eller mørkt tema.",
        ],
      },
      {
        id: "how-we-use-it",
        title: "Sådan bruger vi dine oplysninger",
        paragraphs: [
          "Vi bruger oplysningerne fra kontaktformularen udelukkende til at læse og besvare din besked, for eksempel til at undersøge en destination, du foreslår, eller en fejl, du rapporterer.",
          "Vi sælger aldrig dine oplysninger, deler dem ikke med annoncører og bruger dem ikke til markedsføring.",
        ],
      },
      {
        id: "stored-on-your-device",
        title: "Gemt på din enhed",
        paragraphs: [
          "TravelMate bruger ikke cookies til sporing eller annoncering. For at huske dine indstillinger mellem besøg gemmer vi dit valgte sprog og tema i din browsers lokale lager (local storage).",
          "Oplysningerne bliver på din enhed og sendes aldrig til os. Du kan til enhver tid fjerne dem ved at rydde dine browserdata.",
        ],
      },
      {
        id: "third-party-services",
        title: "Tredjepartstjenester",
        paragraphs: [
          "For at vise dig destinationer henter TravelMate indhold og filer fra nogle få betroede tjenester. Når din browser forbinder til dem, kan de modtage tekniske oplysninger som din IP-adresse og browsertype.",
        ],
        list: [
          "Sanity gemmer og leverer vores destinationer, tekster og billeder.",
          "OpenStreetMap viser kortene på destinationssiderne.",
          "Flagpedia (flagcdn.com) leverer landenes flag.",
          "Google Fonts leverer den skrifttype, siden bruger.",
        ],
      },
      {
        id: "how-long-we-keep-it",
        title: "Hvor længe vi gemmer dem",
        paragraphs: [
          "Vi gemmer kun beskeder fra kontaktformularen, så længe vi har brug for dem for at kunne svare dig. Derefter sletter vi dem.",
        ],
      },
      {
        id: "your-rights",
        title: "Dine rettigheder",
        paragraphs: [
          "Efter GDPR har du ret til at se de personoplysninger, vi har om dig, til at få dem rettet eller slettet og til at gøre indsigelse mod, hvordan vi bruger dem.",
          "Hvis du mener, at vi behandler dine oplysninger forkert, kan du klage til Datatilsynet.",
        ],
      },
      {
        id: "questions",
        title: "Spørgsmål",
        paragraphs: [
          "Hvis du har spørgsmål til denne politik eller vil gøre brug af dine rettigheder, så send os en besked via kontaktsiden.",
        ],
      },
    ],
  },
  es: {
    title: "Política de privacidad",
    intro:
      "Tu privacidad es importante para nosotros. Esta política explica qué información recopila TravelMate cuando usas el sitio, por qué la recopilamos y qué opciones tienes.",
    sections: [
      {
        id: "information-we-collect",
        title: "Información que recopilamos",
        paragraphs: [
          "Puedes usar TravelMate sin crear una cuenta ni decirnos quién eres. Solo recopilamos datos personales cuando decides dárnoslos o cuando es necesario para recordar tus preferencias.",
        ],
        list: [
          "Formulario de contacto: tu nombre, tu correo electrónico, el asunto que elijas y tu mensaje.",
          "Preferencias: el idioma que eliges y si usas el modo claro u oscuro.",
        ],
      },
      {
        id: "how-we-use-it",
        title: "Cómo usamos tu información",
        paragraphs: [
          "Usamos la información del formulario de contacto únicamente para leer y responder a tu mensaje, por ejemplo para revisar un destino que nos sugieras o un error que nos comuniques.",
          "Nunca vendemos tu información, no la compartimos con anunciantes ni la usamos con fines de marketing.",
        ],
      },
      {
        id: "stored-on-your-device",
        title: "Guardado en tu dispositivo",
        paragraphs: [
          "TravelMate no usa cookies de seguimiento ni de publicidad. Para recordar tus preferencias entre visitas, guardamos el idioma y el tema que eliges en el almacenamiento local (local storage) de tu navegador.",
          "Esta información se queda en tu dispositivo y nunca se nos envía. Puedes eliminarla en cualquier momento borrando los datos de tu navegador.",
        ],
      },
      {
        id: "third-party-services",
        title: "Servicios de terceros",
        paragraphs: [
          "Para mostrarte los destinos, TravelMate carga contenido y archivos desde algunos servicios de confianza. Cuando tu navegador se conecta a ellos, pueden recibir información técnica como tu dirección IP y el tipo de navegador.",
        ],
        list: [
          "Sanity almacena y entrega nuestros destinos, textos e imágenes.",
          "OpenStreetMap muestra los mapas en las páginas de destinos.",
          "Flagpedia (flagcdn.com) proporciona las banderas de los países.",
          "Google Fonts proporciona la tipografía del sitio.",
        ],
      },
      {
        id: "how-long-we-keep-it",
        title: "Cuánto tiempo la conservamos",
        paragraphs: [
          "Conservamos los mensajes del formulario de contacto solo el tiempo necesario para responderte. Después, los eliminamos.",
        ],
      },
      {
        id: "your-rights",
        title: "Tus derechos",
        paragraphs: [
          "Según el RGPD, tienes derecho a acceder a los datos personales que tenemos sobre ti, a corregirlos o eliminarlos y a oponerte a cómo los usamos.",
          "Si crees que tratamos tu información de forma incorrecta, puedes presentar una reclamación ante la autoridad de protección de datos de tu país. En España, es la Agencia Española de Protección de Datos (AEPD).",
        ],
      },
      {
        id: "questions",
        title: "Preguntas",
        paragraphs: [
          "Si tienes preguntas sobre esta política o quieres ejercer tus derechos, envíanos un mensaje a través de la página de contacto.",
        ],
      },
    ],
  },
};

export const terms: Record<Language, LegalDocument> = {
  en: {
    title: "Terms of Use",
    intro:
      "These terms apply when you use TravelMate. By using the site, you accept them. If you do not agree, please do not use the site.",
    sections: [
      {
        id: "about-the-service",
        title: "About the service",
        paragraphs: [
          "TravelMate is a free travel guide with information about countries, cities and attractions. The site is meant for inspiration and planning, and you do not need an account to use it.",
        ],
      },
      {
        id: "accuracy",
        title: "Accuracy of information",
        paragraphs: [
          "We work hard to keep descriptions, addresses, maps and other details correct and up to date, but we cannot guarantee that everything is complete or accurate at all times.",
          "Opening hours, prices and travel rules can change, so always check important details with the attraction or official sources before you travel.",
        ],
      },
      {
        id: "using-the-site",
        title: "Using the site",
        paragraphs: [
          "You are welcome to use TravelMate for your own personal, non-commercial travel planning. You agree not to:",
        ],
        list: [
          "copy or republish content from the site without our permission",
          "use automated tools to collect data from the site",
          "try to disrupt the site or get into parts of it you are not meant to reach",
          "send messages through the contact form that are unlawful, offensive or spam",
        ],
      },
      {
        id: "content-and-copyright",
        title: "Content and copyright",
        paragraphs: [
          "Texts, images, the logo and the design of TravelMate belong to TravelMate or to the people who created them, and are protected by copyright.",
          "Maps are provided by OpenStreetMap and its contributors, and country flags by Flagpedia.",
        ],
      },
      {
        id: "links",
        title: "Links to other websites",
        paragraphs: [
          "TravelMate links to other websites, such as the official pages of attractions and larger maps on OpenStreetMap. We are not responsible for the content or privacy practices of those websites.",
        ],
      },
      {
        id: "liability",
        title: "Limitation of liability",
        paragraphs: [
          "TravelMate is provided as it is. We are not responsible for losses or problems that come from using the site or relying on its information, such as a closed attraction or a changed travel plan.",
          "These terms are governed by Danish law.",
        ],
      },
      {
        id: "changes",
        title: "Changes to these terms",
        paragraphs: [
          "We may update these terms when the service changes. The date at the top shows when they were last updated. If you keep using TravelMate after a change, you accept the new terms.",
        ],
      },
      {
        id: "questions",
        title: "Questions",
        paragraphs: [
          "If you have questions about these terms, send us a message through the contact page.",
        ],
      },
    ],
  },
  da: {
    title: "Vilkår for brug",
    intro:
      "Disse vilkår gælder, når du bruger TravelMate. Ved at bruge siden accepterer du dem. Hvis du ikke er enig, beder vi dig lade være med at bruge siden.",
    sections: [
      {
        id: "about-the-service",
        title: "Om tjenesten",
        paragraphs: [
          "TravelMate er en gratis rejseguide med information om lande, byer og seværdigheder. Siden er tænkt til inspiration og planlægning, og du behøver ikke en konto for at bruge den.",
        ],
      },
      {
        id: "accuracy",
        title: "Oplysningernes nøjagtighed",
        paragraphs: [
          "Vi gør meget for at holde beskrivelser, adresser, kort og andre detaljer korrekte og opdaterede, men vi kan ikke garantere, at alt altid er fuldstændigt eller nøjagtigt.",
          "Åbningstider, priser og rejseregler kan ændre sig, så tjek altid vigtige detaljer hos seværdigheden eller officielle kilder, før du rejser.",
        ],
      },
      {
        id: "using-the-site",
        title: "Brug af siden",
        paragraphs: [
          "Du er velkommen til at bruge TravelMate til din egen personlige, ikke-kommercielle rejseplanlægning. Du accepterer ikke at:",
        ],
        list: [
          "kopiere eller genudgive indhold fra siden uden vores tilladelse",
          "bruge automatiske værktøjer til at indsamle data fra siden",
          "forsøge at forstyrre siden eller få adgang til dele af den, du ikke skal have adgang til",
          "sende beskeder via kontaktformularen, der er ulovlige, stødende eller spam",
        ],
      },
      {
        id: "content-and-copyright",
        title: "Indhold og ophavsret",
        paragraphs: [
          "Tekster, billeder, logo og design på TravelMate tilhører TravelMate eller dem, der har skabt dem, og er beskyttet af ophavsret.",
          "Kort leveres af OpenStreetMap og dets bidragydere, og landeflag af Flagpedia.",
        ],
      },
      {
        id: "links",
        title: "Links til andre hjemmesider",
        paragraphs: [
          "TravelMate linker til andre hjemmesider, for eksempel seværdighedernes officielle sider og større kort på OpenStreetMap. Vi er ikke ansvarlige for indholdet eller privatlivspraksis på de hjemmesider.",
        ],
      },
      {
        id: "liability",
        title: "Ansvarsbegrænsning",
        paragraphs: [
          "TravelMate leveres, som den er. Vi er ikke ansvarlige for tab eller problemer, der opstår ved brug af siden eller ved at stole på dens oplysninger, for eksempel en lukket seværdighed eller en ændret rejseplan.",
          "Disse vilkår er underlagt dansk ret.",
        ],
      },
      {
        id: "changes",
        title: "Ændringer af vilkårene",
        paragraphs: [
          "Vi kan opdatere disse vilkår, når tjenesten ændrer sig. Datoen øverst viser, hvornår de sidst blev opdateret. Hvis du fortsætter med at bruge TravelMate efter en ændring, accepterer du de nye vilkår.",
        ],
      },
      {
        id: "questions",
        title: "Spørgsmål",
        paragraphs: [
          "Hvis du har spørgsmål til disse vilkår, så send os en besked via kontaktsiden.",
        ],
      },
    ],
  },
  es: {
    title: "Términos de uso",
    intro:
      "Estos términos se aplican cuando usas TravelMate. Al usar el sitio, los aceptas. Si no estás de acuerdo, te pedimos que no uses el sitio.",
    sections: [
      {
        id: "about-the-service",
        title: "Sobre el servicio",
        paragraphs: [
          "TravelMate es una guía de viajes gratuita con información sobre países, ciudades y atracciones. El sitio está pensado para inspirarte y planificar, y no necesitas una cuenta para usarlo.",
        ],
      },
      {
        id: "accuracy",
        title: "Exactitud de la información",
        paragraphs: [
          "Nos esforzamos por mantener las descripciones, direcciones, mapas y demás detalles correctos y actualizados, pero no podemos garantizar que todo sea completo o exacto en todo momento.",
          "Los horarios, precios y normas de viaje pueden cambiar, así que comprueba siempre los detalles importantes con la atracción o con fuentes oficiales antes de viajar.",
        ],
      },
      {
        id: "using-the-site",
        title: "Uso del sitio",
        paragraphs: [
          "Puedes usar TravelMate para planificar tus propios viajes de forma personal y no comercial. Te comprometes a no:",
        ],
        list: [
          "copiar ni volver a publicar contenido del sitio sin nuestro permiso",
          "usar herramientas automáticas para recopilar datos del sitio",
          "intentar interrumpir el sitio o acceder a partes a las que no deberías acceder",
          "enviar mensajes a través del formulario de contacto que sean ilegales, ofensivos o spam",
        ],
      },
      {
        id: "content-and-copyright",
        title: "Contenido y derechos de autor",
        paragraphs: [
          "Los textos, las imágenes, el logotipo y el diseño de TravelMate pertenecen a TravelMate o a quienes los crearon, y están protegidos por derechos de autor.",
          "Los mapas los proporcionan OpenStreetMap y sus colaboradores, y las banderas de los países, Flagpedia.",
        ],
      },
      {
        id: "links",
        title: "Enlaces a otros sitios web",
        paragraphs: [
          "TravelMate enlaza a otros sitios web, como las páginas oficiales de las atracciones y mapas más grandes en OpenStreetMap. No somos responsables del contenido ni de las prácticas de privacidad de esos sitios.",
        ],
      },
      {
        id: "liability",
        title: "Limitación de responsabilidad",
        paragraphs: [
          "TravelMate se ofrece tal cual. No somos responsables de pérdidas o problemas derivados del uso del sitio o de confiar en su información, como una atracción cerrada o un cambio en tus planes de viaje.",
          "Estos términos se rigen por la legislación danesa.",
        ],
      },
      {
        id: "changes",
        title: "Cambios en estos términos",
        paragraphs: [
          "Podemos actualizar estos términos cuando el servicio cambie. La fecha de arriba indica cuándo se actualizaron por última vez. Si sigues usando TravelMate después de un cambio, aceptas los nuevos términos.",
        ],
      },
      {
        id: "questions",
        title: "Preguntas",
        paragraphs: [
          "Si tienes preguntas sobre estos términos, envíanos un mensaje a través de la página de contacto.",
        ],
      },
    ],
  },
};
