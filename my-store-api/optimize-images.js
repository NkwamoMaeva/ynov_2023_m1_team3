const AWS = require('aws-sdk');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');


// Configure le SDK AWS avec tes informations d'identification
AWS.config.update({
  accessKeyId: 'AKIA46KHDXOCKAQD34XT',
  secretAccessKey: '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',
  region: 'eu-west-3', 
});

const s3 = new AWS.S3();

// Fonction pour optimiser et uploader une image
const optimizeAndUploadImage = (localImagePath, s3Key) => {
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
          }
        });
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
        const s3Key = file; //la logique de nommage
        optimizeAndUploadImage(localImagePath, s3Key);
      });
    }
  });
};

// Chemin dossier local image
const directoryPath = 'src/public/uploads/';

processImagesInDirectory(directoryPath);

// Planification de la tâche toutes les heures
cron.schedule('0 * * * *', () => {
    processImagesInDirectory(directoryPath);
  });