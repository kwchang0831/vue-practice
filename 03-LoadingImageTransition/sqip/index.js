import path from 'node:path';
import sqip from 'sqip';
import { readSync, writeSync } from 'to-vfile';
import { log } from './logger.js';
import convert from 'xml-js';

const INPUT = path.resolve('public/input.jpg', '.');
const OUTPUT = path.resolve('src/assets/input.json', '.');
// const NUM_PRIMITIVES = 120;

log('cyan', 'Generating SVG, Please wait...', INPUT);

// const svg = sqip({
//   filename: INPUT,
//   numberOfPrimitives: NUM_PRIMITIVES,
//   blur: 0,
// });
// const svgJson = convert.xml2json(svg.final_svg, { compact: false, spaces: 4 });

const svg = readSync('public/output.svg');
const svgJson = convert.xml2json(svg, { compact: false, spaces: 4 });

writeSync({
  path: OUTPUT,
  value: svgJson,
});

log('cyan', 'Done Generating SVG JSON ', OUTPUT);
