import { NextResponse } from 'next/server';
import knowledge from '../../../../data/knowledge.json';
import { GoogleGenAI } from '@google/genai';

let ai = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

// Algorithme de correspondance amélioré
function getBestResponse(userInput) {
  const normalizedInput = userInput.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, "");
  const inputWords = normalizedInput.split(/\s+/).filter(w => w.length > 2);
  
  if (inputWords.length === 0) {
     return null;
  }

  // Liste de mots qui ne doivent rapporter aucun point (mots très communs)
  const STOP_WORDS = new Set([
    "que", "qui", "quoi", "comment", "faire", "fait", "fais", "avoir", "etre", 
    "mon", "ton", "son", "mes", "tes", "ses", "notre", "votre", "leur", 
    "une", "des", "les", "petit", "grand", "oui", "non", "pas", "avec", 
    "dans", "sur", "pour", "par", "jai", "est", "sont", "bonjour", "salut"
  ]);
  
  // Liste de mots informatiques trop vagues qui valent moins de points
  const WEAK_WORDS = new Set(["probleme", "souci", "marche", "aide", "moi", "besoin", "bug", "erreur"]);

  let bestMatch = null;
  let highestScore = 0;

  for (const item of knowledge) {
    const keywords = item.mots_cles.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/\s+/);
    let score = 0;
    
    for (const word of inputWords) {
      if (STOP_WORDS.has(word)) continue; // On ignore totalement les stop words
      
      if (keywords.includes(word)) {
        if (WEAK_WORDS.has(word)) {
          score += 0.5; // Mot vague = 0.5 point
        } else {
          score += 2.0; // Mot fort (ex: akwaprint, wifi, mot, passe, ecran) = 2 points
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // Il faut au moins 2 points pour valider une réponse locale (ex: 1 mot fort, ou 4 mots vagues)
  if (highestScore >= 2.0) {
    return bestMatch.reponse;
  } else {
    return null; // On force le passage à l'IA
  }
}

export async function POST(request) {
  try {
    const { message } = await request.json();
    if (!message) {
      return NextResponse.json({ reply: "Message vide." }, { status: 400 });
    }

    // 1. Simulation du délai de réflexion (1.5 secondes)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 2. Vérification locale stricte (Ecobank)
    const localReply = getBestResponse(message);
    if (localReply) {
      return NextResponse.json({ reply: localReply });
    }

    // 3. Repli sur l'IA (Gemini)
    if (ai) {
      try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Tu es J.A.R.V.I.S, l'assistant IT virtuel d'Ecobank. Un employé te dit : "${message}".

Directives STRICTES:
1. Si le message concerne un problème informatique ou technique : donne une solution courte, professionnelle, polie et étape par étape (moins de 100 mots). Ne sois pas trop bavard.
2. Si le message NE CONCERNE PAS l'informatique ou le travail (ex: santé, abdomen, cuisine, blagues, etc.) : refuse très poliment de répondre en expliquant que ton domaine d'expertise se limite strictement au support informatique d'Ecobank.
3. N'invente pas d'outils internes Ecobank. Si tu ne connais pas, donne une solution Windows ou générique.`
        });
        return NextResponse.json({ reply: response.text });
      } catch (err) {
        console.error("Erreur Gemini:", err);
        return NextResponse.json({ reply: "J'ai bien compris votre demande, mais mes serveurs distants sont inaccessibles pour le moment. Veuillez contacter le support technique." });
      }
    } else {
      // Pas de clé API configurée
      return NextResponse.json({ reply: "Je n'ai pas de solution pré-enregistrée pour ce problème et je ne suis pas connecté à mon module d'IA (Clé Gemini manquante) pour vous dépanner. Pouvez-vous reformuler ?" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ reply: "Erreur serveur." }, { status: 500 });
  }
}
