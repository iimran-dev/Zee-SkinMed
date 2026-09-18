/* ============================================================
   Dr Zee's SKINMED — Editorial image library
   Hosted on ZAI OSS CDN (z-cdn.chatglm.cn) — verified reachable.
   ============================================================ */

const HOST = "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt";

export const IMG = {
  hero: `${HOST}/9e1e2a2f3a7b.jpg`,              // woman with radiant glowing skin
  heroAlt:
    "Close-up of healthy, radiant facial skin — Dr Zee's SKINMED hero visual",

  doctor: `${HOST}/8cc04928d0da.jpg`,             // female dermatologist portrait
  doctorAlt: "Portrait of Dr. Zeenath Begum, dermatologist",

  // Treatments
  acne: `${HOST}/fefcb964deda.jpg`,               // clear healthy facial skin
  laser: `${HOST}/72024b002d70.jpg`,              // laser skin treatment in progress
  pigmentation: `${HOST}/22393552861f.jpg`,       // even-toned bright complexion
  hair: `${HOST}/7504d17b32e4.jpg`,               // healthy full hair
  antiaging: `${HOST}/1f6774fad3e6.jpg`,           // mature woman smooth youthful skin
  rejuvenation: `${HOST}/1905e4917cdb.jpg`,       // glowing rejuvenated facial skin

  // Advanced care / story
  advancedCare: `${HOST}/7302927f22ef.jpg`,        // facial treatment close-up

  // Before / After slider
  before: `${HOST}/f169db80d0aa.png`,             // before: skin with concerns
  after: `${HOST}/46b33a6b127a.jpg`,              // after: radiant skin

  // AI Skin Analysis face
  aiFace: `${HOST}/79bffd6f135d.jpg`,             // face close-up skin texture

  // Clinic gallery
  reception: `${HOST}/db02609e3f00.jpg`,          // luxury reception interior
  treatmentRoom: `${HOST}/f71c217990ce.jpeg`,      // modern treatment room
  consult: `${HOST}/5dbbaab80cc6.jpg`,            // private consultation room
  equipment: `${HOST}/26af368445e5.jpeg`,         // aesthetic equipment
  studio: `${HOST}/4a0072592171.jpg`,             // skin studio interior

  // Testimonials
  patient1: `${HOST}/39ee8c0b7a55.jpg`,
  patient2: `${HOST}/5ca860254eb5.jpg`,
  patient3: `${HOST}/6d9bda4c0534.jpg`,

  // Final CTA
  finalCta: `${HOST}/322359ca084b.jpg`,           // extreme close-up flawless skin
} as const;
