const Fuse = extend(ItemTurret, "Destructor_Fuse", {});
const items = require("items");
const GoldShootEf = new Effect(12, e => {
  Draw.color(Color.white, Color.valueOf("ffff00"), e.fin());
  Lines.stroke(e.fout() * 1.2 + 0.5);
  Angles.randLenVectors(e.id, 7, 25 * e.finpow(), e.rotation, 50, (x, y) => {
      Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fin() * 5 + 2);
  });
});
const DiamondShootEf = new Effect(12, e => {
  Draw.color(Color.white, Color.valueOf("00ffff"), e.fin());
  Lines.stroke(e.fout() * 1.2 + 0.5);
  Angles.randLenVectors(e.id, 7, 25 * e.finpow(), e.rotation, 50, (x, y) => {
      Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fin() * 5 + 2);
  });
});
const TitaniumShoot = ShrapnelBulletType();
TitaniumShoot.length = 120;
TitaniumShoot.damage = 99;
TitaniumShoot.ammoMultiplier = 4;
TitaniumShoot.width = 17;
TitaniumShoot.reloadMultiplier = 1.25;
const ThoriumShoot = ShrapnelBulletType();
ThoriumShoot.length = 120;
ThoriumShoot.damage = 166;
ThoriumShoot.ammoMultiplier = 5;
ThoriumShoot.width = 17;
ThoriumShoot.toColor = Pal.thoriumPink;
ThoriumShoot.shootEffect = ThoriumShoot.smokeEffect = Fx.thoriumShoot;
const GoldShoot = ShrapnelBulletType();
GoldShoot.length = 120;
GoldShoot.damage = 225;
GoldShoot.ammoMultiplier = 5;
GoldShoot.width = 17;
GoldShoot.toColor = Color.valueOf("ffff00");
GoldShoot.shootEffect = GoldShoot.smokeEffect = GoldShootEf;
const DiamondShoot = ShrapnelBulletType();
DiamondShoot.length = 120;
DiamondShoot.damage = 315;
DiamondShoot.ammoMultiplier = 5;
DiamondShoot.width = 17;
DiamondShoot.toColor = Color.valueOf("00ffff");
DiamondShoot.shootEffect = DiamondShoot.smokeEffect = DiamondShootEf;
Fuse.ammo(Items.titanium, TitaniumShoot, Items.thorium, ThoriumShoot, items.gold, GoldShoot, items.diamond, DiamondShoot);
