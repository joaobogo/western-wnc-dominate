import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import logoCertainteed from "@/assets/logo-certainteed-vendor.webp";
import logoVelux from "@/assets/logo-velux-vendor.png";
import logoQxo from "@/assets/logo-qxo.png";
import logoSenox from "@/assets/logo-senox-vendor.png";

type Vendor = {
  name: string;
  href: string;
  image?: string;
  description: string;
};

const vendors: Vendor[] = [
  {
    name: "CertainTeed",
    href: "https://www.certainteed.com/products/residential-roofing-products?zip=28734",
    image: logoCertainteed,
    description:
      "Premium shingle and roofing systems manufacturer. Highlander installs CertainTeed roofing products and is credentialed to unlock their enhanced warranty coverage.",
  },
  {
    name: "VELUX",
    href: "https://www.veluxusa.com/",
    image: logoVelux,
    description:
      "Global leader in skylights, sun tunnels, and roof windows. Highlander is a VELUX Certified Installer for deck-mounted units, replacements, and leak repairs across Western NC.",
  },
  {
    name: "Senox",
    href: "https://senox.com/",
    image: logoSenox,
    description:
      "Specialty gutter and rainware supplier. Highlander uses Senox coil and seamless gutter machinery for on-site fabrication of aluminum and copper gutters.",
  },
  {
    name: "QXO",
    href: "https://www.qxo.com/",
    image: logoQxo,
    description:
      "National building products distributor and supplier of roofing, siding, and exterior materials sourced for Highlander projects across the mountains.",
  },
];

const VendorPartners = ({ heading = "Trusted Manufacturer & Supplier Partners", eyebrow = "Our Partners" }: { heading?: string; eyebrow?: string }) => {
  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <div className="text-center mb-12 md:mb-14">
          <span className="eyebrow mb-3 block">{eyebrow}</span>
          <h2 className="section-heading mb-4">{heading}</h2>
          <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Highlander partners with the manufacturers and suppliers behind the strongest roofing, skylight, gutter, and exterior building systems available — so every project is built with materials and warranties we can stand behind.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {vendors.map((v, i) => (
            <motion.a
              key={v.name}
              href={v.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group card-premium p-6 md:p-7 flex flex-col items-center text-center hover:shadow-lg transition-all"
              aria-label={`Visit ${v.name} (opens in a new tab)`}
            >
              <div className="h-16 md:h-20 w-full flex items-center justify-center mb-5">
                {v.image ? (
                  <img decoding="async"
                    src={v.image}
                    alt={`${v.name} logo`}
                    loading="lazy"
                    className="max-h-full max-w-[180px] object-contain"
                  />
                ) : (
                  <span className="font-heading font-bold text-3xl md:text-4xl tracking-tight text-foreground">
                    {v.name}
                  </span>
                )}
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2 inline-flex items-center gap-1.5">
                {v.name}
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VendorPartners;