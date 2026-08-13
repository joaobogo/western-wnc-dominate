import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Phone } from "lucide-react";
import logoCertainteed from "@/assets/logo-certainteed-vendor.webp";
import logoVelux from "@/assets/logo-velux-vendor.png";
import logoSenox from "@/assets/logo-senox-vendor.png";
import logoQxo from "@/assets/logo-qxo.png";

const EASE = [0.22, 1, 0.36, 1] as const;

type Vendor = {
  name: string;
  logo: string;
  badge: string;
  body: string;
  href: string;
  ariaLabel: string;
  logoMaxH: string;
};

const vendors: Vendor[] = [
  {
    name: "CertainTeed",
    logo: logoCertainteed,
    badge: "CertainTeed ShingleMaster Credentialed Contractor",
    body: "CertainTeed residential roofing products support dependable roof systems for homeowners who want proven materials and a professional installation process.",
    href: "https://www.certainteed.com/products/residential-roofing-products?zip=28734",
    ariaLabel: "Visit CertainTeed residential roofing products (opens in a new tab)",
    logoMaxH: "max-h-12 md:max-h-14",
  },
  {
    name: "VELUX Skylights",
    logo: logoVelux,
    badge: "VELUX Certified Installer",
    body: "VELUX skylight products bring natural light and fresh air into homes, installed by a VELUX Certified Installer team at Highlander.",
    href: "https://www.veluxusa.com/",
    ariaLabel: "Visit VELUX Skylights (opens in a new tab)",
    logoMaxH: "max-h-10 md:max-h-12",
  },
  {
    name: "Senox",
    logo: logoSenox,
    badge: "Gutter Material Distributor",
    body: "Senox supports Highlander's gutter and water-management work with gutter materials designed for dependable protection around the home.",
    href: "https://senox.com/",
    ariaLabel: "Visit Senox (opens in a new tab)",
    logoMaxH: "max-h-12 md:max-h-14",
  },
  {
    name: "QXO",
    logo: logoQxo,
    badge: "Frequently Used Material Distributor",
    body: "QXO helps support access to roofing, construction, and exterior building materials used across Highlander projects.",
    href: "https://www.qxo.com/",
    ariaLabel: "Visit QXO (opens in a new tab)",
    logoMaxH: "max-h-10 md:max-h-12",
  },
];

const TrustedMaterials = () => {
  return (
    <section className="section-padding section-dark relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "url('/tartan.png')",
          backgroundSize: "400px auto",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="container-tight relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: EASE }}
          className="max-w-3xl mb-12 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[hsl(var(--highland-gold))]" />
            <span className="text-caption md:text-caption font-body font-semibold uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))]">
              Product Partners &amp; Material Suppliers
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-5 text-balance">
            The Right Materials Matter
          </h2>
          <p className="text-dark-section-foreground/90 text-body-sm md:text-body leading-relaxed">
            Highlander does not treat materials as an afterthought. Our team works with trusted product manufacturers and material distributors so each project can be planned with stronger options, clearer guidance, and products suited for mountain homes and changing Western North Carolina conditions.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {vendors.map((v, i) => (
            <motion.a
              key={v.name}
              href={v.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={v.ariaLabel}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
              className="group bg-white p-6 md:p-7 flex flex-col border border-white/10 hover:border-[hsl(var(--highland-gold)/0.6)] hover:-translate-y-1 transition-all duration-300 shadow-raised"
            >
              <div className="h-16 md:h-20 w-full flex items-center justify-center mb-5 border-b border-foreground/10 pb-5">
                <img decoding="async"
                  src={v.logo}
                  alt={`${v.name} logo`}
                  loading="lazy"
                  className={`${v.logoMaxH} w-auto max-w-[180px] object-contain`}
                />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2 inline-flex items-center gap-1.5">
                {v.name}
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-[hsl(var(--gold-ink))] transition-colors" />
              </h3>
              <span className="inline-block text-caption font-body font-semibold uppercase tracking-[0.18em] text-[hsl(var(--heritage-green))] mb-3">
                {v.badge}
              </span>
              <p className="text-muted-foreground text-body-xs leading-relaxed">{v.body}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
          className="mt-12 md:mt-16 border-t border-dark-section-foreground/10 pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="max-w-xl">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2">
              Want to talk through the best materials for your home?
            </h3>
            <p className="text-dark-section-foreground/90 text-body-sm md:text-body">
              Warranty details vary by product and project and can be reviewed during the estimate or consultation process.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              to="/consultation"
              className="btn btn-primary btn-lg"
            >
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+18285247773"
              className="btn btn-secondary btn-md btn-on-dark"
            >
              <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.7)]" /> (828) 524-7773
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedMaterials;