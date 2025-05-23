import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wine, Coffee, Dessert, UtensilsCrossed, ChefHat, Leaf } from 'lucide-react';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  isSignature?: boolean;
  dietary?: ('v' | 'vg' | 'gf' | 'n')[];
  pairings?: string[];
}

interface MenuSection {
  title: string;
  subtitle: string;
  items: MenuItem[];
}

const menu: MenuSection[] = [
  {
    title: "Les Entrées",
    subtitle: "First Course",
    items: [
      {
        name: "Caviar Royale",
        description: "Premium Osetra caviar served with traditional garnishes, blinis, and crème fraîche",
        price: 95,
        isSignature: true,
        pairings: ["Krug Grande Cuvée"]
      },
      {
        name: "Foie Gras au Torchon",
        description: "House-made foie gras terrine, brioche toast, seasonal fruit compote, fleur de sel",
        price: 48,
        pairings: ["Sauternes, Château Suduiraut 2010"]
      },
      {
        name: "Tartare de Thon",
        description: "Yellow fin tuna tartare, wasabi cream, pickled daikon, sesame tuile",
        price: 42,
        dietary: ['gf'],
        pairings: ["Chablis 1er Cru Montée de Tonnerre"]
      }
    ]
  },
  {
    title: "Les Plats Principaux",
    subtitle: "Main Course",
    items: [
      {
        name: "Côte de Boeuf pour Deux",
        description: "45-day dry-aged ribeye for two, bone marrow crust, sauce bordelaise, pommes dauphinoise",
        price: 185,
        isSignature: true,
        pairings: ["Château Palmer 2015, Margaux"]
      },
      {
        name: "Homard Bleu",
        description: "Butter-poached blue lobster, vanilla-scented potato purée, coral bisque",
        price: 125,
        dietary: ['gf'],
        pairings: ["Meursault 1er Cru Charmes"]
      },
      {
        name: "Risotto aux Truffes Noires",
        description: "Carnaroli risotto, fresh black winter truffles, aged parmesan",
        price: 78,
        dietary: ['v', 'gf'],
        pairings: ["Barolo, Giacomo Conterno"]
      }
    ]
  },
  {
    title: "Les Desserts",
    subtitle: "Desserts",
    items: [
      {
        name: "Soufflé au Chocolat",
        description: "Valrhona chocolate soufflé, vanilla bean ice cream, warm chocolate sauce",
        price: 32,
        dietary: ['v', 'n'],
        isSignature: true,
        pairings: ["Taylor's 20 Year Old Tawny Port"]
      },
      {
        name: "Mille-Feuille à la Vanille",
        description: "Caramelized puff pastry, Madagascar vanilla cream, fresh berries",
        price: 28,
        dietary: ['v'],
        pairings: ["Château d'Yquem 2015"]
      }
    ]
  }
];

const Menu = () => {
  const [selectedSection, setSelectedSection] = useState<string>(menu[0].title);

  const dietaryLabels = {
    v: 'Vegetarian',
    vg: 'Vegan',
    gf: 'Gluten-Free',
    n: 'Contains Nuts'
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E8E3D9] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <ChefHat className="h-12 w-12 text-[#C9A959]" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4 text-[#C9A959]">
            L'Essence
          </h1>
          <p className="text-lg text-[#8B8178] font-light tracking-wider">
            CONTEMPORARY FRENCH CUISINE
          </p>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-center space-x-8 mb-16 overflow-x-auto pb-4">
          {menu.map((section) => (
            <button
              key={section.title}
              onClick={() => setSelectedSection(section.title)}
              className={`flex flex-col items-center px-4 py-2 border-b-2 transition-colors ${
                selectedSection === section.title
                  ? 'border-[#C9A959] text-[#C9A959]'
                  : 'border-transparent text-[#8B8178] hover:text-[#C9A959]'
              }`}
            >
              {section.title === "Les Entrées" && <UtensilsCrossed className="h-5 w-5 mb-2" />}
              {section.title === "Les Plats Principaux" && <ChefHat className="h-5 w-5 mb-2" />}
              {section.title === "Les Desserts" && <Dessert className="h-5 w-5 mb-2" />}
              <span className="text-sm font-light tracking-wider whitespace-nowrap">
                {section.subtitle}
              </span>
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-16">
          {menu.map((section) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: selectedSection === section.title ? 1 : 0,
                display: selectedSection === section.title ? 'block' : 'none'
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-8">
                {section.items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 border border-[#2A2A2A] rounded-lg ${
                      item.isSignature ? 'bg-[#1E1E1E]' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-serif text-[#C9A959]">
                        {item.name}
                        {item.isSignature && (
                          <span className="ml-2 text-xs uppercase tracking-wider text-[#8B8178]">
                            Signature
                          </span>
                        )}
                      </h3>
                      <span className="text-xl font-light">${item.price}</span>
                    </div>
                    <p className="text-[#8B8178] mb-4 font-light leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      {item.dietary && (
                        <div className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-[#8B8178]" />
                          {item.dietary.map((diet) => (
                            <span
                              key={diet}
                              className="text-[#8B8178] text-xs uppercase tracking-wider"
                            >
                              {dietaryLabels[diet]}
                            </span>
                          ))}
                        </div>
                      )}
                      {item.pairings && (
                        <div className="flex items-center gap-2">
                          <Wine className="h-4 w-4 text-[#8B8178]" />
                          <span className="text-[#8B8178] text-xs italic">
                            Suggested: {item.pairings[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-16 pt-8 border-t border-[#2A2A2A] text-center"
        >
          <p className="text-sm text-[#8B8178]">
            Please inform your server of any allergies or dietary restrictions.
            <br />
            A discretionary service charge of 18% will be added to parties of 6 or more.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;