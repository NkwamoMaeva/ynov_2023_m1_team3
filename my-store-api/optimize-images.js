const AWS = require('aws-sdk');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

// Configure le SDK AWS avec informations d'identification
AWS.config.update({
  accessKeyId: 'AKIA46KHDXOCKAQD34XT',
  secretAccessKey: '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',
  region: 'eu-west-3', 
});

const s3 = new AWS.S3();

// Emplacement du fichier texte pour stocker les URLs
const urlFilePath = 'urls.txt';

// Vérifie si le fichier existe, sinon le crée
if (!fs.existsSync(urlFilePath)) {
  fs.writeFileSync(urlFilePath, '', (err) => {
    if (err) {
      console.error('Erreur lors de la création du fichier URLs :', err);
    } else {
      console.log('Fichier URLs créé avec succès.');
    }
  });
}

// Fonction pour optimiser et uploader une image
const optimizeAndUploadImage = (localImagePath, s3Key, callback) => {
    sharp(localImagePath)
      .webp({ quality: 80 })
      .toBuffer((err, buffer) => {
        if (err) {
          console.error('Erreur lors de l\'optimisation de l\'image :', err);
        } else {
          const uploadParams = {
            Bucket: 'mystoreapi',
            Key: s3Key,
            Body: buffer,
          };
  
          s3.upload(uploadParams, (uploadErr, data) => {
            if (uploadErr) {
              console.error('Erreur lors de l\'upload vers S3 :', uploadErr);
            } else {
              console.log('Upload réussi. Lien S3 :', data.Location);
              // Appelle le callback avec l'URL de l'image
              callback(data.Location);
            }
          });
        }
      });
};
  

// Fonction pour écrire le nom du fichier avec son URL dans un fichier texte
const writeUrlToFile = (fileName, url, filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Erreur lors de la lecture du fichier URLs :', err);
      } else {
        // Vérifie si l'URL existe déjà dans le fichier
        if (!data.includes(url)) {
          fs.appendFile(filePath, `${fileName} :: ${url}\n`, (appendErr) => {
            if (appendErr) {
              console.error('Erreur lors de l\'écriture de l\'URL dans le fichier :', appendErr);
            } else {
              console.log('Nom du fichier et URL écrites dans le fichier avec succès.');
            }
          });
        } else {
          console.log('L\'URL existe déjà dans le fichier.');
        }
      }
    });
};

// Fonction pour parcourir un dossier et optimiser chaque image
const processImagesInDirectory = (directoryPath) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Erreur lors de la lecture du dossier :', err);
    } else {
      files.forEach((file) => {
        const localImagePath = path.join(directoryPath, file);
        const fileNameWithoutExtension = path.parse(file).name; // La logique de nommage
        const s3Key = `${fileNameWithoutExtension}.webp`;

        // Appelle optimizeAndUploadImage avec une fonction de callback pour stocker l'URL
        optimizeAndUploadImage(localImagePath, s3Key, (imageUrl) => {
          // Stocke le nom du fichier et imageUrl dans le fichier texte
          writeUrlToFile(file, imageUrl, urlFilePath);
        });
      });
    }
  });
};

// Chemin dossier local image
const directoryPath = 'src/public/uploads/';

// Appelle la fonction pour traiter les images avec le chemin du fichier texte
processImagesInDirectory(directoryPath);

// Planification de la tâche toutes les heures
cron.schedule('0 * * * *', () => {
  processImagesInDirectory(directoryPath);
});
