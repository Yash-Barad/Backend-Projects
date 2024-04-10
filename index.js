// Node Js Program to Generate the QR Code

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
    .prompt([
        {
            message: 'Type in your URL to generate : ',
            name: 'URL',
        },
    ])
    .then((answers) => {
        const url = answers.URL;
        var qr_svg = qr.image(url, { type: 'png' }); // Added { type: 'png' } to specify the output file type
        qr_svg.pipe(fs.createWriteStream('qr_img.png'));

        fs.writeFile('URL.txt', url, (err) => {
            if (err) throw err;
            console.log('The File was successfully generated');
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.error("Prompt couldn't be rendered in the current environment");
    } else {
            console.error("Something else went wrong");
        }
    });
