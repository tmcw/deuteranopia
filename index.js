if (typeof module !== 'undefined') module.exports = deuteranopia;

var gamma = 1.8,
    by = 127,
    k = [9591, 23173, -730];

for (var luts = {}, invluts = {}, i = 0; i < 256; i++) {
    luts[i] = 0.992052 * Math.pow(i / 255, gamma) + 0.003974;
    invluts[i] = 255 * Math.pow(i / 255, 1 / 1.8);
}

// http://vision.psychol.cam.ac.uk/jdmollon/papers/colourmaps.pdf
// https://github.com/nvkelso/color-oracle/blob/master/AppController.m
function deuteranopia(r, g, b) {
    if (g === undefined) {
        g = r[1];
        b = r[2];
        r = r[0];
    }

    var r_lin = luts[r],
        g_lin = luts[g],
        b_lin = luts[b],
        r_blind = ((k[0] * r_lin) + (k[1] * g_lin)) / by,
        b_blind = ((k[2] * r_lin) - (k[2] * g_lin) + 32768 * b_lin) / by;

    if (r_blind < 0) r_blind = 0;
    else if (r_blind > 255) r_blind = 255;

    if (b_blind < 0) b_blind = 0;
    else if (b_blind > 255) b_blind = 255;

    var red = invluts[Math.round(r_blind)],
        blue = invluts[Math.round(b_blind)];

    return [red, red, blue];
}
