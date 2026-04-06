const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Alias motion to _motion in imports
            content = content.replace(/import\s*\{\s*motion\s*\}\s*from/g, 'import { motion as _motion } from');
            content = content.replace(/import\s*\{\s*motion\s*,\s*(.*?)\}\s*from/g, 'import { motion as _motion, $1} from');
            content = content.replace(/import\s*\{\s*(.*?),\s*motion\s*\}\s*from/g, 'import { $1, motion as _motion } from');
            
            // Replace <motion. and </motion.
            content = content.replace(/<motion\./g, '<_motion.');
            content = content.replace(/<\/motion\./g, '</_motion.');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed', fullPath);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
console.log("Done");
