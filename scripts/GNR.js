const GNR = extend(NuclearReactor, "G_Thorium_Reactor", {});
GNR.consumeLiquid(Liquids.cryofluid, 10/60);
const rand = new Rand();
const rv = new Vec2();
const reactorExplosionRed = new Effect(30, 500, b => {
    var intensity = 6.8;
    var baseLifetime = 25 + intensity * 11;
    b.lifetime = 50 + intensity * 65;
    Draw.color(Color.valueOf("C6738A"));
    Draw.alpha(0.7);
    for(var i = 0; i < 4; i++){
        rand.setSeed(b.id*2 + i);
        var lenScl = rand.random(0.4, 1);
        var fi = i;
        b.scaled(b.lifetime * lenScl, e => {
            Angles.randLenVectors(e.id + fi -1, 20, 149.6*e.fin(Interp.pow10Out), (x, y) => {
                var fout = e.fout(Interp.pow5Out) * rand.random(0.5, 1);
                var rad = fout * ((2 + intensity) * 2.35);

                Fill.circle(e.x + x, e.y + y, rad);
                Drawf.light(e.x + x, e.y + y, rad * 2.5, Color.valueOf("F9BF92"), 0.5);
            });
        });
    }
    b.scaled(baseLifetime, e => {
        Draw.color();
        e.scaled(5 + intensity * 2, i => {
            Lines.stroke((3.1 + intensity/5) * i.fout());
            Lines.circle(e.x, e.y, (3 + i.fin() * 14) * intensity);
            Drawf.light(e.x, e.y, i.fin() * 14 * 2 * intensity, Color.white, 0.9 * e.fout());
        });

        Draw.color(Pal.lighterOrange, Color.valueOf("F9BF92"), e.fin());
        Lines.stroke((2 * e.fout()));

        Draw.z(Layer.effect + 0.001);
        Angles.randLenVectors(e.id + 1, 54, 190.4*e.finpow(), (x, y, out) => {
            Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), 1 + out * 4 * (4 + intensity));
            Drawf.light(e.x + x, e.y + y, (out * 4 * (3 + intensity)) * 3.5, Draw.getColor(), 0.8);
        });
    });
});
GNR.explodeEffect = reactorExplosionRed;