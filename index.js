const gamma = 1.8;
const by = 127;
const k = [9591, 23173, -730];
const luts = {};
const invluts = {};

for (let i = 0; i < 256; i++) {
  luts[i] = 0.992052 * Math.pow(i / 255, gamma) + 0.003974;
  invluts[i] = 255 * Math.pow(i / 255, 1 / 1.8);
}

/**
 * Simulate deuteranopia, the common form of colorblindness.
 *
 * Based heavily off of [Color Oracle](http://colororacle.org/), which is in
 * turn based off of [Digital Video Colourmaps for
 * Checking the Legibility of
 * Displays by Dichromats](http://vision.psychol.cam.ac.uk/jdmollon/papers/colourmaps.pdf)
 *
 * @param {[r, g, b]} rgb Input color
 * @param {number} rgb.0 red
 * @param {number} rgb.1 green
 * @param {number} rgb.2 blue
 * @return {[r, g, b]} simulated color
 * @example
 * deuteranopia([0, 20, 0]);
 */
export default function deuteranopia([r, g, b]) {
  const r_lin = luts[r];
  const g_lin = luts[g];
  const b_lin = luts[b];
  let r_blind = (k[0] * r_lin + k[1] * g_lin) / by;
  let b_blind = (k[2] * r_lin - k[2] * g_lin + 32768 * b_lin) / by;

  if (r_blind < 0) r_blind = 0;
  else if (r_blind > 255) r_blind = 255;

  if (b_blind < 0) b_blind = 0;
  else if (b_blind > 255) b_blind = 255;

  const red = invluts[Math.round(r_blind)];
  const blue = invluts[Math.round(b_blind)];

  return [red, red, blue];
}
