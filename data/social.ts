import { links } from "./links";
import { sitePath } from "@/lib/site-path";

export type SocialPost = {
  href: string;
  image: string;
  alt: string;
};

export const socialProfileUrl = links.instagram;

// Covers from the six posts selected by the project owner. Stored locally so
// Instagram's expiring image URLs do not break the curated story carousel.
const socialPostEntries = [
  { id: "DJY3QjgOAQ2", href: "https://www.instagram.com/p/DJY3QjgOAQ2/?img_index=1", image: "/instagram/DJY3QjgOAQ2.jpg", title: { pl: "Poznaj Ailis", en: "Meet Ailis" }, description: { pl: "Polska innowacja i nowe spojrzenie na profilaktykę zdrowia piersi.", en: "A Polish innovation and a fresh perspective on breast health screening." } },
  { id: "DKg9XMxAZaA", href: "https://www.instagram.com/p/DKg9XMxAZaA/", image: "/instagram/DKg9XMxAZaA.jpg", title: { pl: "Endometrioza", en: "Endometriosis" }, description: { pl: "Nowe możliwości leczenia. Przyglądamy się zmianom w brytyjskiej opiece zdrowotnej.", en: "New treatment options. A closer look at changes in UK healthcare." } },
  { id: "DKO7ztrIEoE", href: "https://www.instagram.com/p/DKO7ztrIEoE/", image: "/instagram/DKO7ztrIEoE.jpg", title: { pl: "Cykl i serce", en: "Cycles & heart health" }, description: { pl: "Co łączy zdrowie menstruacyjne i serce? Pytania, które warto stawiać.", en: "How are menstrual and heart health connected? Questions worth asking." } },
  { id: "DPOOgO3idSg", href: "https://www.instagram.com/p/DPOOgO3idSg/", image: "/instagram/DPOOgO3idSg.jpg", title: { pl: "Polska w liczbach", en: "Poland in numbers" }, description: { pl: "Zdrowie kobiet w światowym rankingu. Co kryje się za miejscem Polski?", en: "Women’s health in the global rankings. What lies behind Poland’s position?" } },
  { id: "DJrAKEIBXrc", href: "https://www.instagram.com/p/DJrAKEIBXrc/", image: "/instagram/DJrAKEIBXrc.jpg", title: { pl: "Menopauza bez tabu", en: "Rethinking menopause" }, description: { pl: "Psychoterapia, dobrostan i menopauza. Rozmawiamy o tym, co mówią badania.", en: "Psychotherapy, wellbeing and menopause. Exploring what the research says." } },
  { id: "DIQ35yQtEPh", href: "https://www.instagram.com/p/DIQ35yQtEPh/", image: "/instagram/DIQ35yQtEPh.jpg", title: { pl: "Dama Health", en: "Dama Health" }, description: { pl: "Personalizacja w zdrowiu hormonalnym. Poznaj rozwiązanie stworzone z myślą o kobietach.", en: "Personalisation in hormonal health. Meet a solution designed around women." } }
];

export const socialPosts = socialPostEntries.map(post => ({
  ...post,
  image: sitePath(post.image)
}));

// Older homepage artwork is kept separately so its images and alt text
// remain paired with the posts they actually describe.
export const legacySocialPosts: SocialPost[] = [
  {
    href: "https://www.instagram.com/p/DPOuEE3CHb-/",
    image:
      "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/1760994761929-OD82XBI23YURJY2OERXT/image-asset.jpeg",
    alt: "Post FemTech po Polsku z wrześniowym przeglądem wiadomości o FemTechu i zdrowiu kobiet."
  },
  {
    href: "https://www.instagram.com/p/DPOOgO3idSg/",
    image:
      "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/1760994763544-3IIIXSHQO3FAVSI97RXS/image-asset.jpeg",
    alt: "Post FemTech po Polsku o miejscu Polski w rankingu zdrowia kobiet."
  },
  {
    href: "https://www.instagram.com/p/DPLwauoDhTK/",
    image:
      "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/1760994764687-HZNXQPS32LBGCTHRMHDG/image-asset.jpeg",
    alt: "Post FemTech po Polsku zapowiadający powrót jesiennych treści i newsletter."
  },
  {
    href: "https://www.instagram.com/p/DKg9XMxAZaA/",
    image:
      "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/1760994765645-F0OJAILHYMCC3P39EY7S/image-asset.jpeg",
    alt: "Post FemTech po Polsku o terapii endometriozy zatwierdzonej przez NHS."
  },
  {
    href: "https://www.instagram.com/p/DKO7ztrIEoE/",
    image:
      "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/1760994766626-IO61L2AI5U55FJ07CZ48/image-asset.jpeg",
    alt: "Post FemTech po Polsku o badaniach dotyczących miesiączki i chorób serca."
  },
  {
    href: "https://www.instagram.com/p/DJ86N3btwfd/",
    image:
      "https://images.squarespace-cdn.com/content/v1/68dfd93a8422050f7761b738/1760994767458-M64SK3ZW5NULZBPFFTOY/image-asset.jpeg",
    alt: "Post FemTech po Polsku o zanieczyszczeniu powietrza i cyklu menstruacyjnym."
  }
];
