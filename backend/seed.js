const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json"); // certifique-se que está correto

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const perguntas = [
  {
    pergunta: "Em que ano o Brasil foi descoberto?",
    opcoes: ["1500", "1492", "1530", "1522"],
    correta: "1500",
    categoria: "História",
  },
  {
    pergunta: "Qual a fórmula química da água?",
    opcoes: ["H₂O", "CO₂", "O₂", "NaCl"],
    correta: "H₂O",
    categoria: "Química",
  },
  {
    pergunta: "Qual é a raiz quadrada de 144?",
    opcoes: ["10", "12", "14", "16"],
    correta: "12",
    categoria: "Matemática",
  },
  {
    pergunta: "Qual é o rio mais longo do mundo?",
    opcoes: ["Nilo", "Amazonas", "Yangtzé", "Mississippi"],
    correta: "Nilo",
    categoria: "Geografia",
  },
  {
    pergunta: "Quem escreveu 'Os Lusíadas'?",
    opcoes: ["Camões", "Eça de Queirós", "Fernando Pessoa", "José Saramago"],
    correta: "Camões",
    categoria: "Literatura",
  },
  {
    pergunta: "Qual é a velocidade da luz no vácuo (aproximadamente)?",
    opcoes: ["300.000 km/s", "150.000 km/s", "450.000 km/s", "600.000 km/s"],
    correta: "300.000 km/s",
    categoria: "Física",
  },
  {
    pergunta: "Em inglês, qual a tradução de 'apple'?",
    opcoes: ["Banana", "Maçã", "Pêra", "Laranja"],
    correta: "Maçã",
    categoria: "Inglês",
  },
  {
    pergunta: "Qual é o elemento mais abundante na atmosfera terrestre?",
    opcoes: ["Oxigênio", "Nitrogênio", "Carbono", "Hélio"],
    correta: "Nitrogênio",
    categoria: "Ciências",
  },
  {
    pergunta: "Quem foi o primeiro homem a pisar na Lua?",
    opcoes: [
      "Buzz Aldrin",
      "Yuri Gagarin",
      "Neil Armstrong",
      "Michael Collins",
    ],
    correta: "Neil Armstrong",
    categoria: "História",
  },
  {
    pergunta: "Qual é o processo pelo qual as plantas produzem seu alimento?",
    opcoes: ["Respiração", "Fotossíntese", "Fermentação", "Digestão"],
    correta: "Fotossíntese",
    categoria: "Biologia",
  },
  {
    pergunta: "Qual o símbolo matemático para representar a soma?",
    opcoes: ["−", "×", "+", "÷"],
    correta: "+",
    categoria: "Matemática",
  },
  {
    pergunta: "Qual a capital da Austrália?",
    opcoes: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correta: "Canberra",
    categoria: "Geografia",
  },
  {
    pergunta: "Qual é a unidade de medida da resistência elétrica?",
    opcoes: ["Volt", "Ampere", "Ohm", "Watt"],
    correta: "Ohm",
    categoria: "Física",
  },
];

// Função para inserir
async function inserirPerguntas() {
  const batch = db.batch();

  perguntas.forEach((pergunta) => {
    const docRef = db.collection("perguntas").doc(); // ID automático
    batch.set(docRef, pergunta);
  });

  await batch.commit();
  console.log("✅ Perguntas inseridas com sucesso!");
}

inserirPerguntas().catch(console.error);
