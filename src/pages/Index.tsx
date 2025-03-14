
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Layers, Move, Pen } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="container py-6">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold tracking-tight">PagiNote</div>
          <nav className="hidden sm:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Fonctionnalités
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              À propos
            </a>
            <Link to="/editor" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Commencer
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />
          <div className="container flex flex-col items-center text-center space-y-10 px-4 md:px-6">
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl leading-tight">
                Éditeur de texte avec pagination
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Une solution élégante et intuitive pour rédiger des documents professionnels avec une navigation facile entre les pages.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/editor"
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-md bg-primary px-8",
                  "text-sm font-medium text-primary-foreground shadow transition-colors",
                  "hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1",
                  "focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                Essayer maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="w-full max-w-4xl border rounded-lg overflow-hidden shadow-lg bg-white animate-scale-in">
              <img
                src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Éditeur de texte avec pagination"
                width={1200}
                height={680}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                Fonctionnalités
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Tout ce dont vous avez besoin
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Un éditeur de texte puissant avec une interface minimaliste pour vous aider à rester concentré sur votre contenu.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
              {features.map((feature, i) => (
                <div key={i} className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-12 md:py-24 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                À propos
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                PagiNote
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                PagiNote est un éditeur de texte open source avec pagination conçu pour être intégré facilement dans vos projets React. 
                Notre objectif est de fournir une solution élégante et performante pour la création de documents, en mettant l'accent 
                sur la simplicité et l'expérience utilisateur.
              </p>

              <Link
                to="/editor"
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 mt-8",
                  "text-sm font-medium text-primary-foreground shadow transition-colors",
                  "hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1",
                  "focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                Commencer à rédiger
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="container py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
              <div className="text-xl font-semibold tracking-tight mb-2">PagiNote</div>
              <p className="text-sm text-muted-foreground">Un éditeur de texte avec pagination open source</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} PagiNote. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    title: "Formatage avancé",
    description: "Tout le formatage dont vous avez besoin avec une interface intuitive.",
    icon: <Pen className="h-6 w-6" />,
  },
  {
    title: "Navigation paginée",
    description: "Naviguez facilement entre les pages de votre document.",
    icon: <FileText className="h-6 w-6" />,
  },
  {
    title: "Organisation",
    description: "Ajoutez, supprimez et réorganisez vos pages comme vous le souhaitez.",
    icon: <Layers className="h-6 w-6" />,
  },
  {
    title: "Exportation",
    description: "Exportez vos documents dans différents formats pour les partager.",
    icon: <Move className="h-6 w-6" />,
  },
];

export default Index;
