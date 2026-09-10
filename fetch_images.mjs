import https from 'https';

https.get('https://temple-of-arts-3d.lovable.app/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // find the JS files linked
    const jsFiles = [...data.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
    console.log("JS files:", jsFiles);
    
    jsFiles.forEach(file => {
      const url = new URL(file, 'https://temple-of-arts-3d.lovable.app/').href;
      https.get(url, (res) => {
        let jsData = '';
        res.on('data', (chunk) => { jsData += chunk; });
        res.on('end', () => {
          // find unsplash URLs or lovable-uploads URLs
          const urls = [...jsData.matchAll(/https:\/\/(images\.unsplash\.com|lovable-uploads\.lovable\.app)[^"'\\]+/g)].map(m => m[0]);
          if(urls.length > 0) {
            console.log(`\nFound in ${url}:`);
            [...new Set(urls)].forEach(u => console.log(u));
          }
        });
      });
    });
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
