const Foreshadow = extend(ItemTurret, "Destructor_Foreshadow", {});
Foreshadow.unitSort = (u, x, y) => -u.maxHealth + Mathf.dst2(u.x, u.y, x, y) / 6400;
const items = require('items');
const instShootRed = new Effect(24, e => {
  e.scaled(10, b => {
      Draw.color(Color.white, Color.valueOf("ed655a"), b.fin());
      Lines.stroke(b.fout() * 3 + 0.2);
      Lines.circle(b.x, b.y, b.fin() * 50);
  });
  Draw.color(Color.valueOf("ed655a"));
  Drawf.tri(e.x, e.y, 13 * e.fout(), 85, e.rotation + 90);
  Drawf.tri(e.x, e.y, 13 * e.fout(), 50, e.rotation + 20);
  Drawf.tri(e.x, e.y, 13 * e.fout(), 85, e.rotation - 90);
  Drawf.tri(e.x, e.y, 13 * e.fout(), 50, e.rotation - 20);
  Drawf.light(e.x, e.y, 180, Color.valueOf("ed655a"), 0.9 * e.fout());
});
const instHitRed = new Effect(20, 200, e => {
  Draw.color(Color.valueOf("ed655a"));
  for(var i = 0; i < 2; i++){
      Draw.color(i == 0 ? Color.valueOf("ed655a") : Color.valueOf("eda096"));
      var m = i == 0 ? 1 : 0.5;
      for(var j = 0; j < 5; j++){
          var rot = e.rotation + Mathf.randomSeedRange(e.id + j, 50);
          var w = 23 * e.fout() * m;
          Drawf.tri(e.x, e.y, w, (80 + Mathf.randomSeedRange(e.id + j, 40)) * m, rot);
          Drawf.tri(e.x, e.y, w, 20 * m, rot + 180);
      }
  }
  e.scaled(10, c => {
      Draw.color(Color.valueOf("eda096"));
      Lines.stroke(c.fout() * 2 + 0.2);
      Lines.circle(e.x, e.y, c.fin() * 30);
  });
  e.scaled(12, c => {
      Draw.color(Color.valueOf("ed655a"));
      Angles.randLenVectors(e.id, 25, 5 + e.fin() * 80, e.rotation, 60, (x, y) => {
          Fill.square(e.x + x, e.y + y, c.fout() * 3, 45);
      });
  });
});
const instTrailRed = new Effect(30, e => {
  for(var i = 0; i < 2; i++){
      Draw.color(i == 0 ? Color.valueOf("ed655a") : Color.valueOf("eda096"));
      var m = i == 0 ? 1 : 0.5;
      var rot = e.rotation + 180;
      var w = 15 * e.fout() * m;
      Drawf.tri(e.x, e.y, w, (30 + Mathf.randomSeedRange(e.id, 15)) * m, rot);
      Drawf.tri(e.x, e.y, w, 10 * m, rot + 180);
  }
  Drawf.light(e.x, e.y, 60, Color.valueOf("ed655a"), 0.6 * e.fout());
});
const instBombRed = new Effect(15, 100, e => {
  Draw.color(Color.valueOf("ed655a"));
  Lines.stroke(e.fout() * 4);
  Lines.circle(e.x, e.y, 4 + e.finpow() * 20);
  for(var i = 0; i < 4; i++){
      Drawf.tri(e.x, e.y, 6, 80 * e.fout(), i*90 + 45);
  }
  Draw.color();
  for(var i = 0; i < 4; i++){
      Drawf.tri(e.x, e.y, 3, 30 * e.fout(), i*90 + 45);
  }
  Drawf.light(e.x, e.y, 150, Color.valueOf("ed655a"), 0.9 * e.fout());
});
const railShootDiamond = new Effect(48, e => {
  e.scaled(10, b => {
    Draw.color(Color.valueOf("00ffff"), Color.lightGray, b.fin());
    Lines.stroke(b.fout() * 3 + 0.2);
    Lines.circle(b.x, b.y, b.fin() * 50);
  });
  Draw.color(Color.valueOf("79f7f2"));
  Drawf.tri(e.x, e.y, 13 * e.fout(), 85, e.rotation + 90);
  Drawf.tri(e.x, e.y, 13 * e.fout(), 85, e.rotation - 90);
  Draw.color(Color.valueOf("ffffff"));
  Drawf.tri(e.x, e.y, 13*0.8 * e.fout(), 85*0.8, e.rotation + 90);
  Drawf.tri(e.x, e.y, 13*0.8 * e.fout(), 85*0.8, e.rotation - 90);
});

const railTrailDiamond = new Effect(32, e => {
  Draw.color(Color.valueOf("79f7f2"));
  Drawf.tri(e.x, e.y, 10 * e.fout(), 24, e.rotation + 180);
  Drawf.tri(e.x, e.y, 10 * e.fout(), 24, e.rotation);
  Draw.color(Color.valueOf("ffffff"));
  Drawf.tri(e.x, e.y, 10*0.8 * e.fout(), 24*0.8, e.rotation + 180);
  Drawf.tri(e.x, e.y, 10*0.8 * e.fout(), 24*0.8, e.rotation);
  Draw.color(Color.valueOf("79f7f2"));
  Drawf.light(e.x, e.y, 60 * e.fout(), Color.valueOf("00ffff"), 0.5);
});

const railHitDiamond = new Effect(18, 200, e => {
  Draw.color(Color.valueOf("79f7f2"));
  Drawf.tri(e.x, e.y, 10 * e.fout(), 60, e.rotation + 140);
  Drawf.tri(e.x, e.y, 10 * e.fout(), 60, e.rotation - 140);
  Draw.color(Color.valueOf("ffffff"));
  Drawf.tri(e.x, e.y, 10*0.8 * e.fout(), 60*0.8, e.rotation + 140);
  Drawf.tri(e.x, e.y, 10*0.8 * e.fout(), 60*0.8, e.rotation - 140);
});

const massiveExplosionDiamond = new Effect(30, e => {
  Draw.color(Color.valueOf("e7f7f6"));
  e.scaled(7, i => {
    Lines.stroke(3 * i.fout());
    Lines.circle(e.x, e.y, 4 + i.fin() * 30);
  });
  Draw.color(Color.gray);
  Angles.randLenVectors(e.id, 8, 2 + 30 * e.finpow(), (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 4 + 0.5);
  });
  Draw.color(Color.valueOf("79f7f2"));
  Lines.stroke(e.fout());
  Angles.randLenVectors(e.id + 1, 6, 1 + 29 * e.finpow(), (x, y) => {
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), 1 + e.fout() * 4);
  });
  Drawf.light(e.x, e.y, 50, Color.valueOf("00ffff"), 0.8 * e.fout());
});

const railDiamondDust = new Effect(60, 80, e => {
  Draw.color(Color.valueOf("79f7f2"), Color.white, e.fin());
  Angles.randLenVectors(e.id, 8, e.finpow() * 60, e.rotation, 360, (x, y) => {
      Fill.circle(e.x + x, e.y + y, 0.4 + e.fout() * 1.5);
  });
});

const surgeAlloyShoot = PointBulletType();
surgeAlloyShoot.damage = 2700;
surgeAlloyShoot.shootEffect = instShootRed;
surgeAlloyShoot.hitEffect = instHitRed;
surgeAlloyShoot.smokeEffect = Fx.smokeCloud;
surgeAlloyShoot.trailEffect = instTrailRed;
surgeAlloyShoot.despawnEffect = instBombRed;
surgeAlloyShoot.trailSpacing = 20;
surgeAlloyShoot.buildingDamageMultiplier = 0.2;
surgeAlloyShoot.speed = 600;
surgeAlloyShoot.hitShake = 6;
surgeAlloyShoot.ammoMultiplier = 1;
const DiamondShoot = RailBulletType();
DiamondShoot.shootEffect = railShootDiamond;
DiamondShoot.length = 600;
DiamondShoot.pointEffectSpace = 30;
DiamondShoot.pierceEffect = railHitDiamond;
DiamondShoot.pointEffect = new MultiEffect(railTrailDiamond, railDiamondDust);
DiamondShoot.hitEffect = massiveExplosionDiamond;
DiamondShoot.smokeEffect = Fx.shootBig2;
DiamondShoot.damage = 4050;
DiamondShoot.pierceDamageFactor = 0;
DiamondShoot.buildingDamageMultiplier = 0.2;
DiamondShoot.ammoMultiplier = 1;
Foreshadow.ammo(Items.surgeAlloy, surgeAlloyShoot, items.diamond, DiamondShoot);
