import { links } from "./links";

export type SocialPost = {
  href: string;
  image: string;
  alt: string;
};

export const socialProfileUrl = links.instagram;

export const socialPosts: SocialPost[] = [
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
