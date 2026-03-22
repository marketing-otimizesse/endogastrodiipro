const fs = require('fs');
const path = require('path');

const layoutsDir = path.join(__dirname, 'layouts');
const distDir = path.join(__dirname, 'dist');

const htmlFiles = [
    'index.html',
    'about.html',
    'blog.html',
    'blog-detail.html',
    'contact.html',
    'service.html',
    'team.html',
];

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Function to copy a directory recursively
function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    let entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
    }
}

// Function to adjust internal links for hash fragments based on the current file
const adjustLinksForBuild = (content, fileName) => {
    // For non-index pages, prepend "index.html" to hash links in header/footer
    if (fileName !== 'index.html') {
        content = content.replace(/href="#(sobre|cursos|especialistas)"/g, 'href="index.html#$1"');
    }

    // Special case for 'Home' link in header/footer to ensure it always points to root index.html
    content = content.replace(/href="index.html">Home/g, 'href="index.html">Home');

    // Adjust specific page links to index.html#anchor if they were simplified
    content = content.replace(/href="about.html"/g, 'href="index.html#sobre"');
    content = content.replace(/href="service.html"/g, 'href="index.html#cursos"');
    content = content.replace(/href="team.html"/g, 'href="index.html#especialistas"');

    // Ensure blog link in header always points to blog.html and not index.html#blog
    content = content.replace(/href="#blog"/g, 'href="blog.html"');


    return content;
};


try {
    const headerContent = fs.readFileSync(path.join(layoutsDir, '_header.html'), 'utf8');
    const footerContent = fs.readFileSync(path.join(layoutsDir, '_footer.html'), 'utf8');

    htmlFiles.forEach(file => {
        let fullPath = path.join(__dirname, file);
        if (fs.existsSync(fullPath)) {
            let fileContent = fs.readFileSync(fullPath, 'utf8');

            // Replace header placeholder (now a div)
            fileContent = fileContent.replace(
                /<div id="build-header-placeholder"><\/div>/,
                adjustLinksForBuild(headerContent, file)
            );

            // Replace footer placeholder (now a div)
            fileContent = fileContent.replace(
                /<div id="build-footer-placeholder"><\/div>/,
                adjustLinksForBuild(footerContent, file)
            );
            
            // Remove components.js script tag if it somehow lingered
            fileContent = fileContent.replace(/\s*<script src="assets\/js\/components\.js"><\/script>\s*/g, '');


            fs.writeFileSync(path.join(distDir, file), fileContent);
            console.log(`Processed: ${file}`);
        } else {
            console.warn(`File not found: ${file}`);
        }
    });

    // Copy static assets
    copyDir(path.join(__dirname, 'assets'), path.join(distDir, 'assets'));
    copyDir(path.join(__dirname, 'image'), path.join(distDir, 'image'));
    fs.copyFileSync(path.join(__dirname, 'style.css'), path.join(distDir, 'style.css'));
    fs.copyFileSync(path.join(__dirname, 'responsive.css'), path.join(distDir, 'responsive.css'));
    // copy also index2, style2, responsive2 if they exist, but they were deleted, so no need

    console.log('Build completed successfully in the "dist" directory!');

} catch (error) {
    console.error('Error during build process:', error);
}