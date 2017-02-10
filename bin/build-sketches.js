import rollupConfig from '../rollup.config.js';
import { rollup } from 'rollup';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import mkdirp from 'mkdirp';
import copy from 'copy';

const processSketches = (err, sketchPaths) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  let rollupCache;
  Promise.all(sketchPaths.map(sketchPath => {
    const sketchName = path.basename(sketchPath, '.js');
    const sketchDist = `dist/sketches/${sketchName}`;
    return rollup({
      ...rollupConfig,
      entry: sketchPath,
      cache: rollupCache
    }).then(bundle => new Promise((resolve, reject) => {
      mkdirp(sketchDist, err => {
        if (err) { return reject(err); }
        copy(['index.html', 'index.css'], `../${sketchDist}`, {cwd: 'src'},
          (err, files) => err ? reject(err) : resolve(bundle));
      });
    })).then(bundle => bundle.write({
      format: rollupConfig.format,
      dest: `dist/sketches/${sketchName}/index.js`
    }));
  })).then(result => {
   console.log(`Built ${result.length} sketches`);
  }).catch(err => {
   console.error('err', err);
  })
};

if (process.argv.length > 2) {
  processSketches(null, process.argv.slice(2));
} else {
  glob('./src/sketches/*js', {}, processSketches);
}
