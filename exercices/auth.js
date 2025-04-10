export function generateToken(user) {
  const userString = JSON.stringify(user);
  const token = btoa(userString);
  return token;
}

export function verifyToken(token) {
  try {
    // Décoder le token base64
    const userString = atob(token);
    // Convertir la chaîne JSON en objet
    const user = JSON.parse(userString);
    return user;
  } catch (error) {
    console.error('Token invalide:', error);
    return null;
  }
}

// Exemple d'utilisation
const user = {
  id: 1,
  email: 'user@example.com',
  name: 'John Doe',
};

// Génération du token
const token = generateToken(user);
console.log('Token généré:', token);

// Vérification du token
const verifiedUser = verifyToken(token);
console.log('Utilisateur vérifié:', verifiedUser);

// Test avec un token invalide
const invalidToken = 'token.invalide';
const invalidUser = verifyToken(invalidToken);
console.log('Test token invalide:', invalidUser);
