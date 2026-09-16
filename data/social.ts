import { links } from "./links";

export type SocialPost = {
  href: string;
  image: string;
  alt: string;
};

export const socialProfileUrl = links.instagram;

// Selected embeds shown in the current landing page carousel, in display order.
export const socialPosts = [
  { href: "https://www.instagram.com/p/DJY3QjgOAQ2/?img_index=1" },
  { href: "https://www.instagram.com/p/DKg9XMxAZaA/" },
  { href: "https://www.instagram.com/p/DKO7ztrIEoE/" },
  { href: "https://www.instagram.com/p/DPOOgO3idSg/" },
  { href: "https://www.instagram.com/p/DJrAKEIBXrc/" },
  { href: "https://www.instagram.com/p/DIQ35yQtEPh/" }
];

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
