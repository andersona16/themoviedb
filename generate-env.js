require('dotenv').config();
const fs = require('fs');
const path = require('path');

console.log('API_URL:', process.env.apiUrl);
console.log('API_KEY:', process.env.apiKey);

const envProdContent = `
export const environment = {
  production: true,
  apiUrl: '${process.env.apiUrl || 'https://api.themoviedb.org/3'}',
  apiKey: '${process.env.apiKey || 'sua-chave-de-desenvolvimento'}'
};
`;

fs.writeFileSync(
  path.join(__dirname, 'src/environments/environment.prod.ts'),
  envProdContent.trim()
);

console.log('Arquivo environment.prod.ts gerado com sucesso!');
