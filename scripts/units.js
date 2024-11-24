//const Snd = require("sounds");
const abi = require("ability");
const items = require('items');
const rand = new Rand();
const v = new Vec2();
const MoveEffect = new Effect(25, e => {
    Draw.color(Color.valueOf("ed655a"));
    Fill.circle(e.x, e.y, e.rotation * e.fout());
});
//gamma
const Gamma = extend(UnitType, "Destructor_Gamma", {});
Gamma.constructor = () => extend(UnitEntity, {});
Gamma.aiController = () => extend(BuilderAI, {});
Gamma.abilities.add(abi.selfreg);

//dagger
const Dagger = extend(UnitType, "Destructor_Dagger", {});
Dagger.constructor = () => extend(MechUnit, {});
Blocks.groundFactory.plans.add(new UnitFactory.UnitPlan(Dagger, 60 * 25, ItemStack.with(Items.silicon, 25, Items.lead, 20, items.iron, 15)));
Dagger.abilities.add(abi.selfreg);

//mace
const Mace = extend(UnitType, "Destructor_Mace", {});
Mace.constructor = () => extend(MechUnit, {});
const MaceShootSmallFlame2 = new Effect(32, 80, e => {
    Draw.color(Pal.lightFlame, Pal.darkFlame, Color.gray, e.fin());
    Angles.randLenVectors(e.id, 16, e.finpow() * 72.5, e.rotation, 10, (x, y) => {
        Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 1.5);
    });
});
const MaceFire = BulletType(4.666666666666667,50);
MaceFire.ammoMultiplier = 3;
MaceFire.hitSize = 7;
MaceFire.lifetime = 15;
MaceFire.pierce = true;
MaceFire.pierceBuilding = true;
MaceFire.pierceCap = 2;
MaceFire.statusDuration = 60 * 8;
MaceFire.shootEffect = MaceShootSmallFlame2;
MaceFire.hitEffect = Fx.hitFlameSmall;
MaceFire.despawnEffect = Fx.none;
MaceFire.status = StatusEffects.burning;
MaceFire.keepVelocity = false;
MaceFire.hittable = false;
const MaceWeapon = Weapon("gup-Destructor_Flamethrower")
MaceWeapon.top = false;
MaceWeapon.shootSound = Sounds.flame;
MaceWeapon.shootY = 2;
MaceWeapon.reload = 10;
MaceWeapon.recoil = 1;
MaceWeapon.ejectEffect = Fx.none;
MaceWeapon.bullet = MaceFire;
Mace.weapons.add(MaceWeapon);
Mace.abilities.add(abi.selfreg);

//fortress
const Fortress = extend(UnitType, "Destructor_Fortress", {});
Fortress.constructor = () => extend(MechUnit, {});
Fortress.abilities.add(abi.selfreg);

//scepter
const Scepter = extend(UnitType, "Destructor_Scepter", {});
Scepter.constructor = () => extend(MechUnit, {});
Scepter.abilities.add(abi.selfreg);

//reign
const Reign = extend(UnitType, "Destructor_Reign", {});
Reign.constructor = () => extend(MechUnit, {});
Reign.abilities.add(abi.selfreg);

//nova
const Nova = extend(UnitType, "Destructor_Nova", {});
Nova.constructor = () => extend(MechUnit, {});
const NovahitLaserRed = new Effect(8, e => {
    Draw.color(Color.white, Color.valueOf("ff0000"), e.fin());
    Lines.stroke(0.5 + e.fout());
    Lines.circle(e.x, e.y, e.fin() * 5);
    Drawf.light(e.x, e.y, 23, Color.valueOf("ff0000"), e.fout() * 0.7);
});
const NovaBolt = LaserBoltBulletType(6,30);
NovaBolt.lifetime = 32;
NovaBolt.backColor = Color.valueOf("ff8060");
NovaBolt.frontColor = Color.valueOf("ffffff");
NovaBolt.lightColor = Color.valueOf("ff0000");
NovaBolt.smokeEffect = NovahitLaserRed;
NovaBolt.hitEffect = NovahitLaserRed;
NovaBolt.despawnEffect = NovahitLaserRed;
const NovaWeapon = Weapon("gup-Destructor_Heal_Weapon")
NovaWeapon.top = false;
NovaWeapon.shootY = 2;
NovaWeapon.reload = 24;
NovaWeapon.x = 4.5;
NovaWeapon.alternate = false;
NovaWeapon.ejectEffect = Fx.none;
NovaWeapon.recoil = 2;
NovaWeapon.shootSound = Sounds.lasershoot;
NovaWeapon.shoot.shots = 3;
NovaWeapon.shoot.shotDelay = 2.5;
NovaWeapon.bullet = NovaBolt;
Nova.weapons.add(NovaWeapon);
Blocks.groundFactory.plans.add(new UnitFactory.UnitPlan(Nova, 60 * 45, ItemStack.with(Items.silicon, 35, Items.lead, 25, items.iron, 20)));
Nova.abilities.add(RepairFieldAbility(10,200,70));
Nova.abilities.add(abi.selfreg);

//pulsar
const Pulsar = extend(UnitType, "Destructor_Pulsar", {});
Pulsar.constructor = () => extend(MechUnit, {});
const PulsarShootRed = new Effect(8, e => {
    Draw.color(Color.valueOf("ed655a"));
    var w = 1 + 5 * e.fout();
    Drawf.tri(e.x, e.y, w, 17 * e.fout(), e.rotation);
    Drawf.tri(e.x, e.y, w, 4 * e.fout(), e.rotation + 180);
});
const PulsarLightningType = BulletType(0.0001,0);
PulsarLightningType.lifetime = Fx.lightning.lifetime;
PulsarLightningType.hitEffect = Fx.hitLancer;
PulsarLightningType.despawnEffect = Fx.none;
PulsarLightningType.status = StatusEffects.shocked;
PulsarLightningType.statusDuration = 30;
PulsarLightningType.hittable = false;
const PulsarLightning = LightningBulletType();
PulsarLightning.lightningColor = PulsarLightning.hitColor = Color.valueOf("ed655a");
PulsarLightning.damage = 36;
PulsarLightning.lightningLength = 8;
PulsarLightning.lightningLengthRand = 8;
PulsarLightning.shootEffect = PulsarShootRed;
PulsarLightning.lightningType = PulsarLightningType;
const PulsarWeapon = Weapon("gup-Destructor_Heal_Shotgun_Weapon");
PulsarWeapon.top = false;
PulsarWeapon.x = 5;
PulsarWeapon.shake = 2.2;
PulsarWeapon.y = 0.5;
PulsarWeapon.shootY = 2.5;
PulsarWeapon.reload = 28;
PulsarWeapon.inaccuracy = 35;
PulsarWeapon.shoot.shots = 5;
PulsarWeapon.shoot.shotDelay = 1;
PulsarWeapon.ejectEffect = Fx.none;
PulsarWeapon.recoil = 2.5
PulsarWeapon.shootSound = Sounds.spark;
PulsarWeapon.bullet = PulsarLightning;
Pulsar.weapons.add(PulsarWeapon);
Pulsar.abilities.add(ShieldRegenFieldAbility(30,120,300,80));
Pulsar.abilities.add(abi.selfreg);

//quasar
const Quasar = extend(UnitType, "Destructor_Quasar", {});
Quasar.constructor = () => extend(MechUnit, {});
Quasar.abilities.add(ForceFieldAbility(80,24,4550,300,5,0));
Quasar.abilities.add(abi.selfreg);

//vela
const Vela = extend(UnitType, "Destructor_Vela", {});
Vela.constructor = () => extend(MechUnit, {});
const VelaHitMeltRed = new Effect(12, e => {
    Draw.color(Color.valueOf("ed655a"));
    Lines.stroke(e.fout() * 2);

    Angles.randLenVectors(e.id, 6, e.finpow() * 18, (x, y) => {
        var ang = Mathf.angle(x, y);
        Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 4 + 1);
    });
});
const VelaRedLaserChargeSmall = new Effect(40, 100, e => {
    Draw.color(Color.valueOf("ed655a"));
    Lines.stroke(e.fin() * 2);
    Lines.circle(e.x, e.y, e.fout() * 50);
});
const VelaLaser = ContinuousLaserBulletType(50);
VelaLaser.length = 245;
VelaLaser.hitEffect = VelaHitMeltRed;
VelaLaser.drawSize = 420;
VelaLaser.lifetime = 280;
VelaLaser.shake = 1;
VelaLaser.despawnEffect = Fx.smokeCloud;
VelaLaser.smokeEffect = Fx.none;
VelaLaser.chargeEffect = VelaRedLaserChargeSmall;
VelaLaser.incendChance = 0.25;
VelaLaser.incendSpread = 0.6;
VelaLaser.incendAmount = 2;
VelaLaser.colors = [Color.valueOf("ff0000aa"),Color.valueOf("ff000075"),Color.valueOf("ff0000"),Color.white];
const VelaWeapon = Weapon("gup-Destructor_Vela_Weapon");
VelaWeapon.mirror = false;
VelaWeapon.top = false;
VelaWeapon.shake = 4;
VelaWeapon.shootY = 14;
VelaWeapon.x = VelaWeapon.y = 0;
VelaWeapon.shoot.firstShotDelay = VelaRedLaserChargeSmall.lifetime - 1;
VelaWeapon.parentizeEffects = true;
VelaWeapon.reload = 155;
VelaWeapon.recoil = 0;
VelaWeapon.chargeSound = Sounds.lasercharge2;
VelaWeapon.shootSound = Sounds.beam;
VelaWeapon.continuous = true;
VelaWeapon.cooldownTime = 200;
VelaWeapon.bullet = VelaLaser;
VelaWeapon.heatColor = Color.red;
const VelaRepairWeapon = RepairBeamWeapon("gup-Destructor_Repair_Beam_Weapon_Center_Large");
VelaRepairWeapon.x = 11;
VelaRepairWeapon.y = -7.5;
VelaRepairWeapon.shootY = 6;
VelaRepairWeapon.beamWidth = 0.8;
VelaRepairWeapon.repairSpeed = 2;
VelaRepairWeapon.laserColor = Color.valueOf("e242ff");
VelaRepairWeapon.bullet = BulletType();
VelaRepairWeapon.bullet.maxRange = 120;
Vela.weapons.add(VelaWeapon);
Vela.weapons.add(VelaRepairWeapon);
Vela.abilities.add(abi.selfreg);

//corvus
const Corvus = extend(UnitType, "Destructor_Corvus", {});
Corvus.constructor = () => extend(LegsUnit, {});
const CorvusRedLaserCharge = new Effect(80, 100, e => {
    Draw.color(Color.valueOf("ff0000"));
    Lines.stroke(e.fin() * 2);
    Lines.circle(e.x, e.y, 4 + e.fout() * 100);
    Fill.circle(e.x, e.y, e.fin() * 20);
    Angles.randLenVectors(e.id, 20, 40 * e.fout(), (x, y) => {
        Fill.circle(e.x + x, e.y + y, e.fin() * 5);
        Drawf.light(e.x + x, e.y + y, e.fin() * 15, Color.valueOf("ff0000"), 0.7);
    });
    Draw.color();
    Fill.circle(e.x, e.y, e.fin() * 10);
    Drawf.light(e.x, e.y, e.fin() * 20, Color.valueOf("ff0000"), 0.7);
});
const CorvusTrailEf = new Effect(8, e => {
    Draw.color(Color.valueOf("ed655a"));
    Drawf.tri(e.x, e.y, 2, 15 * e.fslope(), e.rotation + 90);
    Drawf.tri(e.x, e.y, 2, 15 * e.fslope(), e.rotation - 90);
});
const CorvusHitEf = new Effect(50, 100, e => {
    e.scaled(7, b => {
        Draw.color(Color.valueOf("ed655a"), b.fout());
        Fill.circle(e.x, e.y, 50);
    });
    Draw.color(Color.valueOf("ed655a"));
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, 50);
    var offset = Mathf.randomSeed(e.id, 360);
    for(var i = 0; i < 10; i++){
        var angle = i* 360 / 10 + offset;
        Drawf.tri(e.x + Angles.trnsx(angle, 50), e.y + Angles.trnsy(angle, 50), 6, 25 * e.fout(), angle);
    }
    Fill.circle(e.x, e.y, 12 * e.fout());
    Draw.color();
    Fill.circle(e.x, e.y, 6 * e.fout());
    Drawf.light(e.x, e.y, 50 * 1.6, Color.valueOf("ed655a"), e.fout());
});
const CorvusHitEmpSparkRed = new Effect(40, e => {
    Draw.color(Color.valueOf("ed655a"));
    Lines.stroke(e.fout() * 1.6);
    Angles.randLenVectors(e.id, 18, e.finpow() * 27, e.rotation, 360, (x, y) => {
        var ang = Mathf.angle(x, y);
        Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 6 + 1);
    });
});
const CorvusElectrifiedRedEffect = new Effect(40, e => {
    Draw.color(Color.valueOf("ed655a"));
    Angles.randLenVectors(e.id, 2, 1 + e.fin() * 2, (x, y) => {
        Fill.square(e.x + x, e.y + y, e.fslope() * 1.1, 45);
    });
});
const CorvusElectrifiedRed =  extend(StatusEffect,"CorvusElectrifiedRed", {});
CorvusElectrifiedRed.color = Color.valueOf("ed655a");
CorvusElectrifiedRed.speedMultiplier = 0.9;
CorvusElectrifiedRed.reloadMultiplier = 0.75;
CorvusElectrifiedRed.effect = CorvusElectrifiedRedEffect;
CorvusElectrifiedRed.effectChance = 0.15;
const CorvusEmp = extend(EmpBulletType, {});
CorvusEmp.hitPowerEffect = CorvusHitEmpSparkRed;
CorvusEmp.scaleLife = true;
CorvusEmp.lightOpacity = 0.7;
CorvusEmp.powerSclDecrease = 0.05;
CorvusEmp.unitDamageScl = 2;
CorvusEmp.timeIncrease = 3;
CorvusEmp.timeDuration = 1200;
CorvusEmp.powerDamageScl = 3;
CorvusEmp.damage = 200;
CorvusEmp.hitColor = CorvusEmp.lightColor = Color.valueOf("ed655a");
CorvusEmp.lightRadius = 60;
CorvusEmp.clipSize = 250;
CorvusEmp.shootEffect = CorvusHitEmpSparkRed;
CorvusEmp.smokeEffect = Fx.shootBigSmoke2;
CorvusEmp.lifetime = 28;
CorvusEmp.sprite = "circle-bullet";
CorvusEmp.backColor = Color.valueOf("ed655a");
CorvusEmp.frontColor = Color.white;
CorvusEmp.width = CorvusEmp.height = 6;
CorvusEmp.shrinkY = 0;
CorvusEmp.speed = 10;
CorvusEmp.trailLength = 10;
CorvusEmp.trailWidth = 3;
CorvusEmp.trailColor = Color.valueOf("ed655a");
CorvusEmp.trailInterval = 3;
CorvusEmp.splashDamage = 300;
CorvusEmp.splashDamageRadius = 50;
CorvusEmp.hitShake = 2;
CorvusEmp.trailRotation = true;
CorvusEmp.status = CorvusElectrifiedRed;
CorvusEmp.hitSound = Sounds.plasmaboom;
CorvusEmp.trailEffect = CorvusTrailEf;
CorvusEmp.hitEffect = CorvusHitEf;
const CorvusLaser = LaserBulletType();
CorvusLaser.length = 500;
CorvusLaser.damage = 5000;
CorvusLaser.width = 75;
CorvusLaser.lifetime = 65;
CorvusLaser.lightningSpacing = 35;
CorvusLaser.lightningLength = 5;
CorvusLaser.lightningDelay = 1.1;
CorvusLaser.lightningLengthRand = 15;
CorvusLaser.lightningDamage = 300;
CorvusLaser.lightningAngleRand = 40;
CorvusLaser.largeHit = true;
CorvusLaser.lightColor = Color.valueOf("ff0000");
CorvusLaser.lightningColor = Color.valueOf("ff0000");
CorvusLaser.chargeEffect = CorvusRedLaserCharge;
CorvusLaser.sideAngle = 15;
CorvusLaser.sideWidth = 0;
CorvusLaser.sideLength = 0;
CorvusLaser.colors = [Color.valueOf("ff000066"), Color.valueOf("ff0000"), Color.white];
const CorvusWeapon = Weapon("gup-Destructor_Corvus_Weapon");
CorvusWeapon.shootSound = Sounds.laserblast;
CorvusWeapon.chargeSound = Sounds.lasercharge;
CorvusWeapon.soundPitchMin = 1;
CorvusWeapon.top = false;
CorvusWeapon.mirror = false;
CorvusWeapon.shake = 14;
CorvusWeapon.shootY = 5;
CorvusWeapon.x = CorvusWeapon.y = 0;
CorvusWeapon.reload = 300;
CorvusWeapon.recoil = 0;
CorvusWeapon.cooldownTime = 300;
CorvusWeapon.shootStatusDuration = 120;
CorvusWeapon.shootStatus = StatusEffects.unmoving;
CorvusWeapon.shoot.firstShotDelay = 80;
CorvusWeapon.parentizeEffects = true;
CorvusWeapon.heatColor = Color.red;
CorvusWeapon.bullet = CorvusLaser;
const CorvusWeapon2 = Weapon("gup-Destructor_Plasma_Laser_Mount");
CorvusWeapon2.rotate = true;
CorvusWeapon2.x = 14;
CorvusWeapon2.y = -4;
CorvusWeapon2.reload = 60;
CorvusWeapon2.shake = 3;
CorvusWeapon2.rotateSpeed = 3;
CorvusWeapon2.shadow = 15;
CorvusWeapon2.shootY = 7;
CorvusWeapon2.recoil = 4
CorvusWeapon2.cooldownTime = 40;
CorvusWeapon2.shoot.shots = 3;
CorvusWeapon2.shoot.shotDelay = 4;
CorvusWeapon2.shootSound = Sounds.laser;
CorvusWeapon2.bullet = CorvusEmp;
Corvus.weapons.add(CorvusWeapon,CorvusWeapon2);
Corvus.abilities.add(abi.selfreg);

//crawler
const Crawler = extend(UnitType, "Destructor_Crawler", {});
Crawler.constructor = () => extend(MechUnit, {});
Crawler.aiController = () => extend(SuicideAI, {});
Blocks.groundFactory.plans.add(new UnitFactory.UnitPlan(Crawler, 60 * 15, ItemStack.with(Items.silicon, 15, Items.blastCompound, 5)));
Crawler.abilities.add(abi.selfreg);

//atrax
const Atrax = extend(UnitType, "Destructor_Atrax", {});
Atrax.constructor = () => extend(LegsUnit, {});
Atrax.abilities.add(abi.selfreg);

//spiroct
const Spiroct = extend(UnitType, "Destructor_Spiroct", {});
Spiroct.constructor = () => extend(LegsUnit, {});
Spiroct.abilities.add(abi.selfreg);

//arkyid
const Arkyid = extend(UnitType, "Destructor_Arkyid", {});
Arkyid.constructor = () => extend(LegsUnit, {});
Arkyid.abilities.add(abi.selfreg);

//toxopid
const Toxopid = extend(UnitType, "Destructor_Toxopid", {});
Toxopid.constructor = () => extend(LegsUnit, {});
Toxopid.abilities.add(abi.selfreg);

//flare
const Flare = extend(UnitType, "Destructor_Flare", {});
Flare.constructor = () => extend(UnitEntity, {});
Blocks.airFactory.plans.add(new UnitFactory.UnitPlan(Flare, 60 * 20, ItemStack.with(Items.silicon, 10, items.iron, 10)));
Flare.abilities.add(abi.selfreg);

//horizon
const Horizon = extend(UnitType, "Destructor_Horizon", {});
Horizon.constructor = () => extend(UnitEntity, {});
Horizon.abilities.add(abi.selfreg);

//zenith
const Zenith = extend(UnitType, "Destructor_Zenith", {});
Zenith.constructor = () => extend(UnitEntity, {});
Zenith.abilities.add(abi.selfreg);

//antumbra
const Antumbra = extend(UnitType, "Destructor_Antumbra", {});
Antumbra.constructor = () => extend(UnitEntity, {});
Antumbra.abilities.add(abi.selfreg);

//eclipse
const Eclipse = extend(UnitType, "Destructor_Eclipse", {});
Eclipse.constructor = () => extend(UnitEntity, {});
Eclipse.abilities.add(UnitSpawnAbility(Flare,600,0,12));
Eclipse.abilities.add(UnitSpawnAbility(Flare,600,0,12));
Eclipse.abilities.add(UnitSpawnAbility(Flare,600,0,12));
Eclipse.abilities.add(abi.selfreg);

//mono
const Mono = extend(UnitType, "Miner_Mono", {});
Mono.constructor = () => extend(UnitEntity, {});
Mono.controller = u => extend(MinerAI, {});
Mono.defaultCommand = UnitCommand.mineCommand;
Blocks.airFactory.plans.add(new UnitFactory.UnitPlan(Mono, 60 * 40, ItemStack.with(Items.silicon, 50, Items.lead, 30, items.iron, 25)));
Mono.abilities.add(abi.selfreg);

//poly
const Poly = extend(UnitType, "Builder_Poly", {});
Poly.constructor = () => extend(UnitEntity, {});
Poly.defaultCommand = UnitCommand.rebuildCommand;
const PolyShootRed = new Effect(8, e => {
    Draw.color(Color.valueOf("ed655a"));
    var w = 1 + 5 * e.fout();
    Drawf.tri(e.x, e.y, w, 17 * e.fout(), e.rotation);
    Drawf.tri(e.x, e.y, w, 4 * e.fout(), e.rotation + 180);
});
const PolyhitLaserRed = new Effect(8, e => {
    Draw.color(Color.white, Color.valueOf("ff0000"), e.fin());
    Lines.stroke(0.5 + e.fout());
    Lines.circle(e.x, e.y, e.fin() * 5);
    Drawf.light(e.x, e.y, 23, Color.valueOf("ff0000"), e.fout() * 0.7);
});
const PolyMissile = MissileBulletType(5,32);
PolyMissile.homingPower = 0.08;
PolyMissile.weaveMag = 4;
PolyMissile.weaveScale = 4;
PolyMissile.lifetime = 60;
PolyMissile.keepVelocity = false;
PolyMissile.shootEffect = PolyShootRed;
PolyMissile.smokeEffect = PolyhitLaserRed;
PolyMissile.hitEffect = PolyhitLaserRed;
PolyMissile.despawnEffect = PolyhitLaserRed;
PolyMissile.frontColor = Color.white;
PolyMissile.hitSound = Sounds.none;
PolyMissile.backColor = Color.valueOf("ff8060");
PolyMissile.trailColor = Color.valueOf("ff8060");
const PolyWeapon = Weapon("gup-Destructor_Poly_Weapon");
PolyWeapon.top = false;
PolyWeapon.y = -2.5;
PolyWeapon.x = 3.75;
PolyWeapon.reload = 20;
PolyWeapon.ejectEffect = Fx.none;
PolyWeapon.recoil = 2;
PolyWeapon.shootSound = Sounds.missile;
PolyWeapon.shoot.shots = 2;
PolyWeapon.velocityRnd = 0.5;
PolyWeapon.inaccuracy = 15;
PolyWeapon.alternate = true;
PolyWeapon.bullet = PolyMissile;
Poly.weapons.add(PolyWeapon);
Poly.abilities.add(RepairFieldAbility(10,300,75));
Poly.abilities.add(abi.selfreg);

//mega
const Mega = extend(UnitType, "Destructor_Mega", {});
Mega.constructor = () => extend(PayloadUnit, {});
const MegaHitLaserRed = new Effect(8, e => {
    Draw.color(Color.white, Color.valueOf("ff0000"), e.fin());
    Lines.stroke(0.5 + e.fout());
    Lines.circle(e.x, e.y, e.fin() * 5);
    Drawf.light(e.x, e.y, 23, Color.valueOf("ff0000"), e.fout() * 0.7);
});
const MegaHitLaserBlue = new Effect(8, e => {
    Draw.color(Color.white, Color.valueOf("0000ff"), e.fin());
    Lines.stroke(0.5 + e.fout());
    Lines.circle(e.x, e.y, e.fin() * 5);
    Drawf.light(e.x, e.y, 23, Color.valueOf("0000ff"), e.fout() * 0.7);
});
const MegaBlueBullet = LaserBoltBulletType(6,32);
MegaBlueBullet.smokeEffect = MegaHitLaserBlue;
MegaBlueBullet.hitEffect = MegaHitLaserBlue;
MegaBlueBullet.despawnEffect = MegaHitLaserBlue;
MegaBlueBullet.lifetime = 41.8333333333333333
MegaBlueBullet.backColor = Color.valueOf("6080ff");
MegaBlueBullet.lightColor = Color.valueOf("0000ff");
MegaBlueBullet.frontColor = Color.white;
MegaBlueBullet.fragBullets = 3;
MegaBlueBullet.fragBullet = LaserBoltBulletType(6,16);
MegaBlueBullet.fragBullet.lifetime = 8;
MegaBlueBullet.fragBullet.backColor = Color.valueOf("6080ff");
MegaBlueBullet.fragBullet.frontColor = Color.white;
MegaBlueBullet.fragBullet.lightColor = Color.valueOf("0000ff");
MegaBlueBullet.fragBullet.smokeEffect = MegaHitLaserBlue;
MegaBlueBullet.fragBullet.hitEffect = MegaHitLaserBlue;
MegaBlueBullet.fragBullet.despawnEffect = MegaHitLaserBlue;
const MegaRedBullet = LaserBoltBulletType(6,32);
MegaRedBullet.smokeEffect = MegaHitLaserRed;
MegaRedBullet.hitEffect = MegaHitLaserRed;
MegaRedBullet.despawnEffect = MegaHitLaserRed;
MegaRedBullet.lifetime = 40;
MegaRedBullet.backColor = Color.valueOf("ff8060");
MegaRedBullet.frontColor = Color.valueOf("ffffff");
MegaRedBullet.lightColor = Color.valueOf("ff0000");
MegaRedBullet.fragBullets = 3;
MegaRedBullet.fragBullet = LaserBoltBulletType(6,32);
MegaRedBullet.fragBullet.lifetime = 8;
MegaRedBullet.fragBullet.backColor = Color.valueOf("ff8060");
MegaRedBullet.fragBullet.frontColor = Color.white;
MegaRedBullet.fragBullet.frontColor = Color.valueOf("ffffff");
MegaRedBullet.fragBullet.lightColor = Color.valueOf("ff0000");
MegaRedBullet.fragBullet.smokeEffect = MegaHitLaserRed;
MegaRedBullet.fragBullet.hitEffect = MegaHitLaserRed;
MegaRedBullet.fragBullet.despawnEffect = MegaHitLaserRed;
const MegaWeapon1 = Weapon("gup-Destructor_Heal_Weapon_Mount");
MegaWeapon1.shootSound = Sounds.lasershoot;
MegaWeapon1.reload = 12;
MegaWeapon1.x = 8;
MegaWeapon1.y = -6;
MegaWeapon1.rotate = true;
MegaWeapon1.bullet = MegaBlueBullet;
const MegaWeapon2 = Weapon("gup-Destructor_Heal_Weapon_Mount");
MegaWeapon2.shootSound = Sounds.lasershoot;
MegaWeapon2.reload = 12;
MegaWeapon2.x = 4;
MegaWeapon2.y = 5;
MegaWeapon2.rotate = true;
MegaWeapon2.bullet = MegaRedBullet;
Mega.weapons.add(MegaWeapon1);
Mega.weapons.add(MegaWeapon2);
Mega.abilities.add(abi.selfreg);

//quad
const Quad = extend(UnitType, "Destructor_Quad", {});
Quad.constructor = () => extend(PayloadUnit, {});
const QuadRedBomb = new Effect(40, 100, e => {
    Draw.color(Color.valueOf("ed655a"));
    Lines.stroke(e.fout() * 2);
    var circleRad = 4 + e.finpow() * 65;
    Lines.circle(e.x, e.y, circleRad);
    Draw.color(Color.valueOf("ed655a"));
    for(var i = 0; i < 4; i++){
        Drawf.tri(e.x, e.y, 6, 100 * e.fout(), i*90);
    }
    Draw.color();
    for(var i = 0; i < 4; i++){
        Drawf.tri(e.x, e.y, 3, 35 * e.fout(), i*90);
    }

    Drawf.light(e.x, e.y, circleRad * 1.6, Color.valueOf("ed655a"), e.fout());
});
const QuadBomb = BasicBulletType(0,1,"large-bomb");
QuadBomb.width = QuadBomb.height = 30;
QuadBomb.backColor = Color.valueOf("ed655a");
QuadBomb.frontColor = QuadBomb.mixColorTo = Color.white;
QuadBomb.hitSound = Sounds.plasmaboom;
QuadBomb.hitShake = 4;
QuadBomb.collidesAir = false;
QuadBomb.lifetime = 70;
QuadBomb.despawnEffect = QuadRedBomb;
QuadBomb.hitEffect = Fx.massiveExplosion;
QuadBomb.keepVelocity = false;
QuadBomb.spin = -2;
QuadBomb.shrinkX = QuadBomb.shrinkY = 0.7;
QuadBomb.collides = false;
QuadBomb.splashDamage = 400;
QuadBomb.splashDamageRadius = 100;
QuadBomb.maxRange = 30;
const QuadWeapon = Weapon();
QuadWeapon.x = QuadWeapon.y = 0;
QuadWeapon.mirror = false;
QuadWeapon.reload = 120;
QuadWeapon.minShootVelocity = 0.01;
QuadWeapon.soundPitchMin = 1;
QuadWeapon.shootSound = Sounds.plasmadrop;
QuadWeapon.shootCone = 180;
QuadWeapon.ignoreRotation = true;
QuadWeapon.ejectEffect = Fx.none;
QuadWeapon.shoot.shots = 3;
QuadWeapon.shoot.shotDelay = 12;
QuadWeapon.bullet = QuadBomb;
Quad.weapons.add(QuadWeapon);
Quad.abilities.add(abi.selfreg);

//oct
const Oct = extend(UnitType, "Patron_Oct", {});
Oct.constructor = () => extend(PayloadUnit, {});
Oct.aiController = () => extend(DefenderAI, {});
Oct.abilities.add(ForceFieldAbility(200,64,35000,720,10,0));
Oct.abilities.add(abi.selfreg);

//risso
const Risso = extend(UnitType, "Destructor_Risso", {});
Risso.constructor = () => extend(UnitWaterMove, {});
Blocks.navalFactory.plans.add(new UnitFactory.UnitPlan(Risso, 60 * 55, ItemStack.with(Items.silicon, 30, Items.metaglass, 40, items.iron, 15)));
Risso.abilities.add(abi.selfreg);

//minke
const Minke = extend(UnitType, "Destructor_Minke", {});
Minke.constructor = () => extend(UnitWaterMove, {});
Minke.abilities.add(StatusFieldAbility(StatusEffects.overclock,600,360,60));
Minke.abilities.add(abi.selfreg);

//bryde
const Bryde = extend(UnitType, "Destructor_Bryde", {});
Bryde.constructor = () => extend(UnitWaterMove, {});
Bryde.abilities.add(ShieldRegenFieldAbility(50,500,180,80));
Bryde.abilities.add(abi.selfreg);

//sei
const Sei = extend(UnitType, "Destructor_Sei", {});
Sei.constructor = () => extend(UnitWaterMove, {});
Sei.abilities.add(abi.selfreg);

//omura
const Omura = extend(UnitType, "Destructor_Omura", {});
Omura.constructor = () => extend(UnitWaterMove, {});
const OmuraRailShootRed = new Effect(24, e => {
    e.scaled(10, b => {
        Draw.color(Color.red, Color.lightGray, b.fin());
        Lines.stroke(b.fout() * 3 + 0.2);
        Lines.circle(b.x, b.y, b.fin() * 50);
    });
    Draw.color(Color.valueOf("ed655a"));
    Drawf.tri(e.x, e.y, 13 * e.fout(), 85, e.rotation + 90);
    Drawf.tri(e.x, e.y, 13 * e.fout(), 85, e.rotation - 90);
});
const OmuraRailTrailRed = new Effect(16, e => {
    Draw.color(Color.valueOf("ed655a"));
    Drawf.tri(e.x, e.y, 10 * e.fout(), 24, e.rotation + 180);
    Drawf.tri(e.x, e.y, 10 * e.fout(), 24, e.rotation);
    Drawf.light(e.x, e.y, 60 * e.fout(), Color.valueOf("ed655a"), 0.5);
});
const OmuraRailHitRed = new Effect(18, 200, e => {
    Draw.color(Color.valueOf("ed655a"));
    Drawf.tri(e.x, e.y, 10 * e.fout(), 60, e.rotation + 140);
    Drawf.tri(e.x, e.y, 10 * e.fout(), 60, e.rotation - 140);
});
const OmuraMassiveExplosionRed = new Effect(30, e => {
    Draw.color(Color.valueOf("ed655a"));
    e.scaled(7, i => {
        Lines.stroke(3 * i.fout());
        Lines.circle(e.x, e.y, 4 + i.fin() * 30);
    });
    Draw.color(Color.gray);
    Angles.randLenVectors(e.id, 8, 2 + 30 * e.finpow(), (x, y) => {
        Fill.circle(e.x + x, e.y + y, e.fout() * 4 + 0.5);
    });
    Draw.color(Color.valueOf("ed655a"));
    Lines.stroke(e.fout());
    Angles.randLenVectors(e.id + 1, 6, 1 + 29 * e.finpow(), (x, y) => {
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), 1 + e.fout() * 4);
    });
    Drawf.light(e.x, e.y, 50, Color.valueOf("ed655a"), 0.8 * e.fout());
});
const OmuraRail = RailBulletType();
OmuraRail.shootEffect = OmuraRailShootRed;
OmuraRail.length = 600;
OmuraRail.pointEffectSpace = 40;
OmuraRail.pierceEffect = OmuraRailHitRed;
OmuraRail.pointEffect = OmuraRailTrailRed;
OmuraRail.hitEffect = OmuraMassiveExplosionRed;
OmuraRail.smokeEffect = Fx.shootBig2;
OmuraRail.damage = 3600;
OmuraRail.pierceDamageFactor = 1/3;
const OmuraRail2 = RailBulletType();
OmuraRail2.shootEffect = OmuraRailShootRed;
OmuraRail2.length = 300;
OmuraRail2.pointEffectSpace = 40;
OmuraRail2.pierceEffect = OmuraRailHitRed;
OmuraRail2.pointEffect = OmuraRailTrailRed;
OmuraRail2.hitEffect = OmuraMassiveExplosionRed;
OmuraRail2.smokeEffect = Fx.shootBig2;
OmuraRail2.damage = 1800;
OmuraRail2.pierceDamageFactor = 1/3;
const OmuraMissile = MissileBulletType(6,250);
OmuraMissile.homingPower = 0.07;
OmuraMissile.sprite = "missile-large";
OmuraMissile.width = 14;
OmuraMissile.height = 14;
OmuraMissile.shrinkY = 0;
OmuraMissile.drag = -0.003;
OmuraMissile.homingRange = 100;
OmuraMissile.keepVelocity = false;
OmuraMissile.splashDamage = 100;
OmuraMissile.splashDamageRadius = 40;
OmuraMissile.lifetime = 60;
OmuraMissile.trailColor = Color.valueOf("d06b53");
OmuraMissile.backColor = Color.valueOf("d06b53");
OmuraMissile.frontColor = Color.valueOf("ffa665");
OmuraMissile.hitEffect = Fx.blastExplosion;
OmuraMissile.despawnEffect = Fx.blastExplosion;
OmuraMissile.weaveScale = 8;
OmuraMissile.weaveMag = 3;
const OmuraBullet = BasicBulletType(10, 100);
OmuraBullet.hitSize = 5;
OmuraBullet.width = 16;
OmuraBullet.height = 23;
OmuraBullet.shootEffect = Fx.shootBig;
OmuraBullet.pierceCap = 2;
OmuraBullet.pierceBuilding = true;
OmuraBullet.knockback = 0.7;
OmuraBullet.lifetime = 17.5;
const OmuraWeapon = Weapon("gup-Destructor_Omura_Cannon");
OmuraWeapon.reload = 120;
OmuraWeapon.cooldownTime = 90;
OmuraWeapon.mirror = false;
OmuraWeapon.x = 0;
OmuraWeapon.y = -3.5;
OmuraWeapon.rotateSpeed = 1.65;
OmuraWeapon.rotate = true;
OmuraWeapon.shootY = 23;
OmuraWeapon.shake = 6;
OmuraWeapon.recoil = 10.5;
OmuraWeapon.shadow = 50;
OmuraWeapon.shootSound = Vars.tree.loadSound("railgun_D");
OmuraWeapon.ejectEffect = Fx.none;
OmuraWeapon.bullet = OmuraRail;
OmuraWeapon.heatColor = Color.red;
const OmuraWeaponR = Weapon();
OmuraWeaponR.reload = 240;
OmuraWeaponR.cooldownTime = 90;
OmuraWeaponR.mirror = false;
OmuraWeaponR.x = 0;
OmuraWeaponR.y = 0;
OmuraWeaponR.rotateSpeed = 1.65;
OmuraWeaponR.rotate = true;
OmuraWeaponR.shootY = 0;
OmuraWeaponR.shoot = new ShootSpread(10,360/20)
OmuraWeaponR.shake = 8;
OmuraWeaponR.recoil = 10.5;
OmuraWeaponR.shadow = 0;
OmuraWeaponR.shootSound = Sounds.railgun;
OmuraWeaponR.ejectEffect = Fx.none;
OmuraWeaponR.bullet = OmuraRail2;
const OmuraWeapon2 = Weapon("gup-Destructor_Big_Missile");
OmuraWeapon2.x = 22;
OmuraWeapon2.y = 2;
OmuraWeapon2.reload = 24;
OmuraWeapon2.ejectEffect = Fx.casing3;
OmuraWeapon2.recoil = 1.2;
OmuraWeapon2.shake = 0;
OmuraWeapon2.rotateSpeed = 2;
OmuraWeapon2.rotate = true;
OmuraWeapon2.shadow = 10;
OmuraWeapon2.shootSound = Sounds.missile;
OmuraWeapon2.shoot.shots = 2;
OmuraWeapon2.shoot.shotDelay = 7.5;
OmuraWeapon2.inaccuracy = 15;
OmuraWeapon2.bullet = OmuraMissile;
const OmuraWeapon3 = Weapon("gup-Destructor_Large_Artillery");
OmuraWeapon3.y = -18;
OmuraWeapon3.x = 18;
OmuraWeapon3.reload = 4;
OmuraWeapon3.ejectEffect = Fx.casing3
OmuraWeapon3.recoil = 0.33;
OmuraWeapon3.shake = 0.12;
OmuraWeapon3.rotateSpeed = 8;
OmuraWeapon3.rotate = true;
OmuraWeapon3.shootSound = Sounds.shootBig;
OmuraWeapon3.inaccuracy = 1.5;
OmuraWeapon3.bullet = OmuraBullet;
OmuraWeapon3.controllable = false;
OmuraWeapon3.autoTarget = true;
const OmuraWeapon4 = Weapon("gup-Destructor_Large_Artillery");
OmuraWeapon4.y = 20;
OmuraWeapon4.x = 12;
OmuraWeapon4.reload = 4;
OmuraWeapon4.ejectEffect = Fx.casing3;
OmuraWeapon4.recoil = 0.33;
OmuraWeapon4.shake = 0.12;
OmuraWeapon4.rotateSpeed = 8;
OmuraWeapon4.rotate = true;
OmuraWeapon4.shootSound = Sounds.shootBig;
OmuraWeapon4.inaccuracy = 1.5;
OmuraWeapon4.bullet = OmuraBullet;
OmuraWeapon4.controllable = false;
OmuraWeapon4.autoTarget = true;
Omura.weapons.add(OmuraWeapon3);
Omura.weapons.add(OmuraWeapon4);
Omura.weapons.add(OmuraWeapon2);
Omura.weapons.add(OmuraWeapon);
Omura.weapons.add(OmuraWeaponR);
Omura.abilities.add(UnitSpawnAbility(Horizon,1000,19.25,-31.75));
Omura.abilities.add(UnitSpawnAbility(Horizon,1000,-19.25,-31.75));
Omura.abilities.add(abi.selfreg);

//retusa
const Retusa = extend(UnitType, "Destructor_Retusa", {});
Retusa.constructor = () => extend(UnitWaterMove, {});
const RetusaRedCloud = new Effect(80, e => {
    Draw.color(Color.valueOf("ed655a"));
    Angles.randLenVectors(e.id, 7, e.fin() * 9, (x, y) => {
        Fill.circle(e.x + x, e.y + y, 5 * e.fout());
    });
});
const RetusaBlastExplosionRed = new Effect(22, e => {
    Draw.color(Color.valueOf("ed655a"));
    e.scaled(6, i => {
        Lines.stroke(3 * i.fout());
        Lines.circle(e.x, e.y, 3 + i.fin() * 15);
    });
    Draw.color(Color.gray);
    Angles.randLenVectors(e.id, 5, 2 + 23 * e.finpow(), (x, y) => {
        Fill.circle(e.x + x, e.y + y, e.fout() * 4 + 0.5);
    });
    Draw.color(Color.valueOf("ed655a"));
    Lines.stroke(e.fout());
    Angles.randLenVectors(e.id + 1, 4, 1 + 23 * e.finpow(), (x, y) => {
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), 1 + e.fout() * 3);
    });
    Drawf.light(e.x, e.y, 45, Color.valueOf("ed655a"), 0.8 * e.fout());
});
const RetusaBeam = BulletType();
RetusaBeam.maxRange = 120;
const RetusaBullet = BasicBulletType(1,50);
RetusaBullet.sprite = "mine-bullet";
RetusaBullet.width = RetusaBullet.height = 12;
RetusaBullet.layer = 10;
RetusaBullet.shootEffect = RetusaBullet.smokeEffect = Fx.none;
RetusaBullet.maxRange = 75;
RetusaBullet.backColor = Color.valueOf("ed655a");
RetusaBullet.frontColor = Color.white;
RetusaBullet.mixColorTo = Color.white;
RetusaBullet.hitSound = Sounds.plasmaboom;
RetusaBullet.hitSize = 24;
RetusaBullet.collidesAir = false;
RetusaBullet.lifetime = 120;
RetusaBullet.hitEffect = new MultiEffect(RetusaBlastExplosionRed, RetusaRedCloud);
RetusaBullet.keepVelocity = false;
RetusaBullet.shrinkX = RetusaBullet.shrinkY = 0;
RetusaBullet.inaccuracy = 2;
RetusaBullet.weaveMag = 5;
RetusaBullet.weaveScale = 4;
RetusaBullet.drag = -0.015;
RetusaBullet.homingPower = 0.05;
RetusaBullet.collideFloor = true;
RetusaBullet.trailColor = Color.valueOf("ed655a");;
RetusaBullet.trailWidth = 3;
RetusaBullet.trailLength = 8;
RetusaBullet.splashDamage = 66;
RetusaBullet.splashDamageRadius = 44;
const RetusaRepairWeapon = RepairBeamWeapon("gup-Destructor_Repair_Beam_Weapon_Center");
RetusaRepairWeapon.x = 0;
RetusaRepairWeapon.y = -5.5;
RetusaRepairWeapon.shootY = 6;
RetusaRepairWeapon.beamWidth = 0.8;
RetusaRepairWeapon.mirror = false;
RetusaRepairWeapon.repairSpeed = 1.5;
RetusaRepairWeapon.laserColor = Color.valueOf("e242ff");
RetusaRepairWeapon.bullet = RetusaBeam;
const RetusaWeapon = Weapon();
RetusaWeapon.mirror = false;
RetusaWeapon.rotate = true;
RetusaWeapon.reload = 90;
RetusaWeapon.ejectEffect = Fx.none;
RetusaWeapon.ignoreRotation = true;
RetusaWeapon.x = RetusaWeapon.y = RetusaWeapon.shootX = RetusaWeapon.shootY = 0;
RetusaWeapon.shootSound = Sounds.mineDeploy;
RetusaWeapon.rotateSpeed = 180;
RetusaWeapon.shoot.shots = 5;
RetusaWeapon.shoot.shotDelay = 5;
RetusaWeapon.bullet = RetusaBullet;
Retusa.weapons.add(RetusaWeapon);
Retusa.weapons.add(RetusaRepairWeapon);
Blocks.navalFactory.plans.add(new UnitFactory.UnitPlan(Retusa, 60 * 55, ItemStack.with(Items.silicon, 25, Items.metaglass, 30, items.iron, 20)));
Retusa.abilities.add(abi.selfreg);

//oxynoe
const Oxynoe = extend(UnitType, "Destructor_Oxynoe", {});
Oxynoe.constructor = () => extend(UnitWaterMove, {});
const OxynoehitFlameRed = new Effect(14, e => {
    Draw.color(Color.white, Color.valueOf("ff0000"), e.fin());
    Lines.stroke(0.5 + e.fout());
    Angles.randLenVectors(e.id, 2, 1 + e.fin() * 15, e.rotation, 50, (x, y) => {
        var ang = Mathf.angle(x, y);
        Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 3 + 1);
    });
});
const OxnoeShootEf = new Effect(32, 80, e => {
    Draw.color(Color.white, Color.valueOf("ff0000"), Color.gray, e.fin());
    Angles.randLenVectors(e.id, 12, e.finpow() * 78, e.rotation, 10, (x, y) => {
        Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 1.5);
        Drawf.light(e.x + x, e.y + y, 16 * e.fout(), Color.valueOf("ff0000"), 0.6);
    });
});
const OxynoeFire = BulletType(4,40);
OxynoeFire.ammoMultiplier = 3;
OxynoeFire.hitSize = 7;
OxynoeFire.lifetime = 18;
OxynoeFire.pierce = true;
OxynoeFire.pierceBuilding = true;
OxynoeFire.pierceCap = 2;
OxynoeFire.collidesAir = false;
OxynoeFire.statusDuration = 60 * 8;
OxynoeFire.hitEffect = OxynoehitFlameRed;
OxynoeFire.despawnEffect = Fx.none;
OxynoeFire.status = StatusEffects.burning;
OxynoeFire.keepVelocity = false;
OxynoeFire.hittable = false;
OxynoeFire.shootEffect = OxnoeShootEf;
const OxynoeDefenseBullet = new BulletType(1,60);
OxynoeDefenseBullet.shootEffect = Fx.sparkShoot;
OxynoeDefenseBullet.hitEffect = Fx.pointHit;
OxynoeDefenseBullet.maxRange = 150;
const OxynoeWeapon = Weapon("gup-Destructor_Plasma_Mount_Weapon");
OxynoeWeapon.reload = 5;
OxynoeWeapon.x = 4.5;
OxynoeWeapon.y = 6.5;
OxynoeWeapon.rotate = true;
OxynoeWeapon.rotateSpeed = 5.5;
OxynoeWeapon.inaccuracy = 10;
OxynoeWeapon.ejectEffect = Fx.casing1;
OxynoeWeapon.shootSound = Sounds.flame;
OxynoeWeapon.shootCone = 30;
OxynoeWeapon.ejectEffect = Fx.none;
OxynoeWeapon.bullet = OxynoeFire;
const OxynoeDefenseWeapon = PointDefenseWeapon("gup-Destructor_Point_Defense_Mount");
OxynoeDefenseWeapon.mirror = false;
OxynoeDefenseWeapon.x = 0;
OxynoeDefenseWeapon.y = 1;
OxynoeDefenseWeapon.reload = 5;
OxynoeDefenseWeapon.targetInterval = 10;
OxynoeDefenseWeapon.targetSwitchInterval = 15;
OxynoeDefenseWeapon.bullet = OxynoeDefenseBullet;
Oxynoe.weapons.add(OxynoeWeapon);
Oxynoe.weapons.add(OxynoeDefenseWeapon);
Oxynoe.abilities.add(StatusFieldAbility(StatusEffects.overclock,600,600,80));
Oxynoe.abilities.add(abi.selfreg);

//cyerce
const Cyerce = extend(UnitType, "Destructor_Cyerce", {});
Cyerce.constructor = () => extend(UnitWaterMove, {});
const CyerceShootRed = new Effect(8, e => {
    Draw.color(Color.valueOf("ed655a"));
    var w = 1 + 5 * e.fout();
    Drawf.tri(e.x, e.y, w, 17 * e.fout(), e.rotation);
    Drawf.tri(e.x, e.y, w, 4 * e.fout(), e.rotation + 180);
});
const CyerceMissileFrag = MissileBulletType(3.9,11);
CyerceMissileFrag.homingPower = 0.2;
CyerceMissileFrag.weaveMag = 4;
CyerceMissileFrag.weaveScale = 4;
CyerceMissileFrag.lifetime = 60;
CyerceMissileFrag.keepVelocity = false;
CyerceMissileFrag.shootEffect = CyerceShootRed;
CyerceMissileFrag.smokeEffect = Fx.hitLaser;
CyerceMissileFrag.splashDamage = 33;
CyerceMissileFrag.splashDamageRadius = 24;
CyerceMissileFrag.frontColor = Color.white;
CyerceMissileFrag.hitSound = Sounds.none;
CyerceMissileFrag.lightColor = Color.valueOf("ed655a");
CyerceMissileFrag.lightRadius = 40;
CyerceMissileFrag.lightOpacity = 0.7;
CyerceMissileFrag.trailColor = Color.valueOf("ed655a");
CyerceMissileFrag.trailWidth = 2.5;
CyerceMissileFrag.trailLength = 20;
CyerceMissileFrag.trailChance = -1;
CyerceMissileFrag.backColor = Color.valueOf("ed655a");
CyerceMissileFrag.despawnEffect = Fx.none;
CyerceMissileFrag.hitEffect = new ExplosionEffect();
CyerceMissileFrag.hitEffect.lifetime = 20;
CyerceMissileFrag.hitEffect.waveStroke = 2;
CyerceMissileFrag.hitEffect.waveColor = Color.valueOf("ed655a");
CyerceMissileFrag.hitEffect.waveRad = 12;
CyerceMissileFrag.hitEffect.smokeSize = 0;
CyerceMissileFrag.hitEffect.smokeSizeBase = 0;
CyerceMissileFrag.hitEffect.sparkColor = Color.valueOf("ed655a");
CyerceMissileFrag.hitEffect.sparks = 9;
CyerceMissileFrag.hitEffect.sparkRad = 35;
CyerceMissileFrag.hitEffect.sparkLen = 4;
CyerceMissileFrag.hitEffect.sparkStroke = 1.5;
const CyerceMissile = FlakBulletType(2.5, 50);
CyerceMissile.sprite = "missile-large";
CyerceMissile.collidesGround = CyerceMissile.collidesAir = true;
CyerceMissile.explodeRange = 40;
CyerceMissile.width = CyerceMissile.height = 14;
CyerceMissile.shrinkY = 0;
CyerceMissile.drag = -0.003;
CyerceMissile.homingRange = 60;
CyerceMissile.keepVelocity = false;
CyerceMissile.lightRadius = 60;
CyerceMissile.lightOpacity = 0.7;
CyerceMissile.lightColor = Color.valueOf("ff0000");
CyerceMissile.splashDamageRadius = 40;
CyerceMissile.splashDamage = 80
CyerceMissile.lifetime = 80;
CyerceMissile.backColor = Color.valueOf("ed655a");
CyerceMissile.frontColor = Color.white;
CyerceMissile.hitEffect = new ExplosionEffect();
CyerceMissile.hitEffect.lifetime = 28;
CyerceMissile.hitEffect.waveStroke = 6;
CyerceMissile.hitEffect.waveLife = 10;
CyerceMissile.hitEffect.waveRadBase = 7;
CyerceMissile.hitEffect.waveColor = Color.valueOf("ed655a");
CyerceMissile.hitEffect.waveRad = 30;
CyerceMissile.hitEffect.smokes = 6;
CyerceMissile.hitEffect.smokeColor = Color.white;
CyerceMissile.hitEffect.sparkColor = Color.valueOf("ed655a");
CyerceMissile.hitEffect.smokes = 6;
CyerceMissile.hitEffect.smokeColor = Color.white;
CyerceMissile.hitEffect.sparkColor = Color.valueOf("ed655a");
CyerceMissile.hitEffect.sparks = 6;
CyerceMissile.hitEffect.sparkRad = 35;
CyerceMissile.hitEffect.sparkStroke = 1.5;
CyerceMissile.hitEffect.sparkLen = 4;
CyerceMissile.weaveScale = 8
CyerceMissile.weaveMag = 1
CyerceMissile.trailColor = Color.valueOf("ed655a");
CyerceMissile.trailWidth = 4.5
CyerceMissile.trailLength = 29
CyerceMissile.fragBullets = 12;
CyerceMissile.fragVelocityMin = 0.5;
CyerceMissile.fragBullet = CyerceMissileFrag;
const CyerceRepairWeapon = RepairBeamWeapon("gup-Destructor_Repair_Beam_Weapon_Center");
CyerceRepairWeapon.x = 11;
CyerceRepairWeapon.y = -10;
CyerceRepairWeapon.shootY = 6;
CyerceRepairWeapon.beamWidth = 0.7;
CyerceRepairWeapon.repairSpeed = 1;
CyerceRepairWeapon.laserColor = Color.valueOf("e242ff");
CyerceRepairWeapon.bullet = BulletType();
CyerceRepairWeapon.bullet.maxRange = 130;
const CyerceWeapon = Weapon("gup-Destructor_Plasma_Missile_Mount");
CyerceWeapon.reload = 60;
CyerceWeapon.x = 9;
CyerceWeapon.y = 3;
CyerceWeapon.shadow = 5;
CyerceWeapon.rotateSpeed = 4;
CyerceWeapon.rotate = true;
CyerceWeapon.inaccuracy = 1;
CyerceWeapon.velocityRnd = 0.1;
CyerceWeapon.shootSound = Sounds.missile;
CyerceWeapon.ejectEffect = Fx.none;
CyerceWeapon.bullet = CyerceMissile;
Cyerce.weapons.add(CyerceRepairWeapon);
Cyerce.weapons.add(CyerceWeapon);
Cyerce.abilities.add(abi.selfreg);

//aegires
const Aegires = extend(UnitType, "Destructor_Aegires", {});
Aegires.constructor = () => extend(UnitWaterMove, {});
const AegiresAbility = EnergyFieldAbility(160,60,240);
AegiresAbility.color = Color.valueOf("ed655a");
AegiresAbility.statusDuration = 600;
AegiresAbility.maxTargets = 30;
Aegires.abilities.add(AegiresAbility);
Aegires.abilities.add(abi.selfreg);

//navanax
const Navanax = extend(UnitType, "Destructor_Navanax", {});
Navanax.constructor = () => extend(UnitWaterMove, {});
const NavanaxTrailEf = new Effect(16, e => {
    Draw.color(Color.valueOf("ed655a"));
    Drawf.tri(e.x, e.y, 4, 30 * e.fslope(), e.rotation + 90);
    Drawf.tri(e.x, e.y, 4, 30 * e.fslope(), e.rotation - 90);
});
const NavanaxHitEf = new Effect(50, 100, e => {
    e.scaled(7, b => {
        Draw.color(Color.valueOf("ed655a"), b.fout());
        Fill.circle(e.x, e.y, 150);
    });
    Draw.color(Color.valueOf("ed655a"));
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, 150);
    var offset = Mathf.randomSeed(e.id, 360);
    for(var i = 0; i < 10; i++){
        var angle = i* 360 / 10 + offset;
        Drawf.tri(e.x + Angles.trnsx(angle, 150), e.y + Angles.trnsy(angle, 150), 6, 50 * e.fout(), angle);
    }
    Fill.circle(e.x, e.y, 12 * e.fout());
    Draw.color();
    Fill.circle(e.x, e.y, 6 * e.fout());
    Drawf.light(e.x, e.y, 150 * 1.6, Color.valueOf("ed655a"), e.fout());
});
const NavanaxHitEmpSparkRed = new Effect(40, e => {
    Draw.color(Color.valueOf("ed655a"));
    Lines.stroke(e.fout() * 1.6);
    Angles.randLenVectors(e.id, 18, e.finpow() * 27, e.rotation, 360, (x, y) => {
        var ang = Mathf.angle(x, y);
        Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 6 + 1);
    });
});
const NavanaxElectrifiedRedEffect = new Effect(40, e => {
    Draw.color(Color.valueOf("ed655a"));
    Angles.randLenVectors(e.id, 2, 1 + e.fin() * 2, (x, y) => {
        Fill.square(e.x + x, e.y + y, e.fslope() * 1.1, 45);
    });
});
const NavanaxElectrifiedRed =  extend(StatusEffect,"NavanaxElectrifiedRed", {});
NavanaxElectrifiedRed.color = Color.valueOf("ed655a");
NavanaxElectrifiedRed.speedMultiplier = 0.7;
NavanaxElectrifiedRed.reloadMultiplier = 0.6;
NavanaxElectrifiedRed.effect = NavanaxElectrifiedRedEffect;
NavanaxElectrifiedRed.effectChance = 0.15;
const NavanaxEmp = extend(EmpBulletType, {});
NavanaxEmp.hitPowerEffect = NavanaxHitEmpSparkRed;
NavanaxEmp.scaleLife = true;
NavanaxEmp.lightOpacity = 0.7;
NavanaxEmp.powerSclDecrease = 0.05;
NavanaxEmp.unitDamageScl = 2;
NavanaxEmp.timeIncrease = 3;
NavanaxEmp.timeDuration = 1200;
NavanaxEmp.powerDamageScl = 3;
NavanaxEmp.damage = 800;
NavanaxEmp.hitColor = NavanaxEmp.lightColor = Color.valueOf("ed655a");
NavanaxEmp.lightRadius = 70;
NavanaxEmp.clipSize = 250;
NavanaxEmp.shootEffect = NavanaxHitEmpSparkRed;
NavanaxEmp.smokeEffect = Fx.shootBigSmoke2;
NavanaxEmp.lifetime = 75;
NavanaxEmp.sprite = "circle-bullet";
NavanaxEmp.backColor = Color.valueOf("ed655a");
NavanaxEmp.frontColor = Color.white;
NavanaxEmp.width = NavanaxEmp.height = 12;
NavanaxEmp.shrinkY = 0;
NavanaxEmp.speed = 5;
NavanaxEmp.trailLength = 20;
NavanaxEmp.trailWidth = 6;
NavanaxEmp.trailColor = Color.valueOf("ed655a");
NavanaxEmp.trailInterval = 3;
NavanaxEmp.splashDamage = 800;
NavanaxEmp.splashDamageRadius = 150;
NavanaxEmp.hitShake = 4;
NavanaxEmp.trailRotation = true;
NavanaxEmp.status = NavanaxElectrifiedRed;
NavanaxEmp.hitSound = Sounds.plasmaboom;
NavanaxEmp.trailEffect = NavanaxTrailEf;
NavanaxEmp.hitEffect = NavanaxHitEf;
const NavanaxLaser = ContinuousLaserBulletType();
NavanaxLaser.maxRange = 100;
NavanaxLaser.damage = 100;
NavanaxLaser.length = 110;
NavanaxLaser.hitEffect = Fx.hitMeltdown;
NavanaxLaser.drawSize = 200;
NavanaxLaser.lifetime = 160;
NavanaxLaser.shake = 1;
NavanaxLaser.shootEffect = Fx.shootBigSmoke2;
NavanaxLaser.smokeEffect = Fx.none;
NavanaxLaser.width = 4;
NavanaxLaser.largeHit = false;
NavanaxLaser.incendChance = 0.03;
NavanaxLaser.incendSpread = 5;
NavanaxLaser.incendAmount = 1;
NavanaxLaser.colors = [Color.valueOf("ff000033"),Color.valueOf("ff0000"),Color.white];
const NavanaxWeapon = Weapon("gup-Destructor_Emp_Cannon_Mount");
NavanaxWeapon.rotate = true;
NavanaxWeapon.x = 17.5;
NavanaxWeapon.y = -6.5;
NavanaxWeapon.reload = 60;
NavanaxWeapon.shake = 3;
NavanaxWeapon.rotateSpeed = 2.2;
NavanaxWeapon.shadow = 30;
NavanaxWeapon.shootY = 7;
NavanaxWeapon.recoil = 4
NavanaxWeapon.cooldownTime = 60;
NavanaxWeapon.shootSound = Sounds.laser;
NavanaxWeapon.bullet = NavanaxEmp;
const NavanaxAutoWeapon1 = Weapon("gup-Destructor_Plasma_Laser_Mount");
NavanaxAutoWeapon1.shadow = 20;
NavanaxAutoWeapon1.controllable = false;
NavanaxAutoWeapon1.autoTarget = true;
NavanaxAutoWeapon1.mirror = false;
NavanaxAutoWeapon1.x = 21;
NavanaxAutoWeapon1.y = -29.25;
NavanaxAutoWeapon1.shake = 3;
NavanaxAutoWeapon1.shootY = 7;
NavanaxAutoWeapon1.rotate = true;
NavanaxAutoWeapon1.targetInterval = 20;
NavanaxAutoWeapon1.targetSwitchInterval = 35;
NavanaxAutoWeapon1.rotateSpeed = 3.5
NavanaxAutoWeapon1.reload = 170;
NavanaxAutoWeapon1.recoil = 1;
NavanaxAutoWeapon1.shootSound = Sounds.beam;
NavanaxAutoWeapon1.continuous = true;
NavanaxAutoWeapon1.cooldownTime = 170;
NavanaxAutoWeapon1.bullet = NavanaxLaser;
const NavanaxAutoWeapon2 = Weapon("gup-Destructor_Plasma_Laser_Mount");
NavanaxAutoWeapon2.shadow = 20;
NavanaxAutoWeapon2.controllable = false;
NavanaxAutoWeapon2.autoTarget = true;
NavanaxAutoWeapon2.mirror = false;
NavanaxAutoWeapon2.x = -21;
NavanaxAutoWeapon2.y = -29.25;
NavanaxAutoWeapon2.shake = 3;
NavanaxAutoWeapon2.shootY = 7;
NavanaxAutoWeapon2.rotate = true;
NavanaxAutoWeapon2.targetInterval = 20;
NavanaxAutoWeapon2.targetSwitchInterval = 35;
NavanaxAutoWeapon2.rotateSpeed = 3.5
NavanaxAutoWeapon2.reload = 170;
NavanaxAutoWeapon2.recoil = 1;
NavanaxAutoWeapon2.shootSound = Sounds.beam;
NavanaxAutoWeapon2.continuous = true;
NavanaxAutoWeapon2.cooldownTime = 170;
NavanaxAutoWeapon2.bullet = NavanaxLaser;
const NavanaxAutoWeapon3 = Weapon("gup-Destructor_Plasma_Laser_Mount");
NavanaxAutoWeapon3.shadow = 20;
NavanaxAutoWeapon3.controllable = false;
NavanaxAutoWeapon3.autoTarget = true;
NavanaxAutoWeapon3.mirror = false;
NavanaxAutoWeapon3.x = 21;
NavanaxAutoWeapon3.y = 12.5;
NavanaxAutoWeapon3.shake = 3;
NavanaxAutoWeapon3.shootY = 7;
NavanaxAutoWeapon3.rotate = true;
NavanaxAutoWeapon3.targetInterval = 20;
NavanaxAutoWeapon3.targetSwitchInterval = 35;
NavanaxAutoWeapon3.rotateSpeed = 3.5
NavanaxAutoWeapon3.reload = 170;
NavanaxAutoWeapon3.recoil = 1;
NavanaxAutoWeapon3.shootSound = Sounds.beam;
NavanaxAutoWeapon3.continuous = true;
NavanaxAutoWeapon3.cooldownTime = 170;
NavanaxAutoWeapon3.bullet = NavanaxLaser;
const NavanaxAutoWeapon4 = Weapon("gup-Destructor_Plasma_Laser_Mount");
NavanaxAutoWeapon4.shadow = 20;
NavanaxAutoWeapon4.controllable = false;
NavanaxAutoWeapon4.autoTarget = true;
NavanaxAutoWeapon4.mirror = false;
NavanaxAutoWeapon4.x = -21;
NavanaxAutoWeapon4.y = 12.5;
NavanaxAutoWeapon4.shake = 3;
NavanaxAutoWeapon4.shootY = 7;
NavanaxAutoWeapon4.rotate = true;
NavanaxAutoWeapon4.targetInterval = 20;
NavanaxAutoWeapon4.targetSwitchInterval = 35;
NavanaxAutoWeapon4.rotateSpeed = 3.5
NavanaxAutoWeapon4.reload = 170;
NavanaxAutoWeapon4.recoil = 1;
NavanaxAutoWeapon4.shootSound = Sounds.beam;
NavanaxAutoWeapon4.continuous = true;
NavanaxAutoWeapon4.cooldownTime = 170;
NavanaxAutoWeapon4.bullet = NavanaxLaser;
Navanax.weapons.add(NavanaxAutoWeapon1);
Navanax.weapons.add(NavanaxAutoWeapon2);
Navanax.weapons.add(NavanaxAutoWeapon3);
Navanax.weapons.add(NavanaxAutoWeapon4);
Navanax.weapons.add(NavanaxWeapon);
Navanax.abilities.add(abi.selfreg);

//conquer
const Conquer = extend(TankUnitType, "Destructor_Conquer", {});
Conquer.constructor = () => extend(TankUnit, {});
Conquer.abilities.add(abi.selfreg);
Blocks.tankAssembler.plans.add(new UnitAssembler.AssemblerUnitPlan(Conquer,60*250,PayloadStack.list(UnitTypes.precept,6,Blocks.reinforcedSurgeWallLarge, 30)));

//disrupt
const Disrupt = extend(ErekirUnitType, "Destructor_Disrupt", {});
Disrupt.constructor = () => extend(PayloadUnit, {});
Disrupt.aiController = () => extend(FlyingFollowAI, {});
const DisruptBulletUnit = extend(MissileUnitType, "Destructor_Disrupt_Missile", {});
DisruptBulletUnit.constructor = () => extend(TimedKillUnit, {});
const DisruptBullet = BulletType();
DisruptBullet.shootEffect = Fx.sparkShoot;
DisruptBullet.smokeEffect = Fx.shootSmokeTitan;
DisruptBullet.hitColor = Color.valueOf("fff340");
DisruptBullet.hitShake = 1.25;
DisruptBullet.speed = 0;
DisruptBullet.keepVelocity = false;
DisruptBullet.spawnUnit = DisruptBulletUnit;
const DisruptWeaponParts = new RegionPart("-blade");
DisruptWeaponParts.heatProgress = p => p.warmup;
DisruptWeaponParts.progress = p => p.warmup;
DisruptWeaponParts.heatColor = Color.valueOf("fff340");
DisruptWeaponParts.x = 1.25;
DisruptWeaponParts.y = 0;
DisruptWeaponParts.moveRot = -33;
DisruptWeaponParts.moveX = -1;
DisruptWeaponParts.moveY = -1;
DisruptWeaponParts.under = true;
DisruptWeaponParts.mirror = true;
const DisruptWeapon = Weapon("gup-Destructor_Disrupt_Weapon");
DisruptWeapon.shootSound = Sounds.missileLarge;
DisruptWeapon.x = 19.5;
DisruptWeapon.y = -2.5;
DisruptWeapon.mirror = true;
DisruptWeapon.rotate = true;
DisruptWeapon.rotateSpeed = 1;
DisruptWeapon.reload = 30;
DisruptWeapon.layerOffset = -20;
DisruptWeapon.recoil = 1;
DisruptWeapon.rotationLimit = 22;
DisruptWeapon.minWarmup = 0.95;
DisruptWeapon.shootWarmupSpeed = 0.1;
DisruptWeapon.shootY = 2;
DisruptWeapon.shootCone = 40;
DisruptWeapon.shoot.shots = 2;
DisruptWeapon.shoot.shotDelay = 15;
DisruptWeapon.inaccuracy = 28;
DisruptWeapon.parts.add(DisruptWeaponParts);
DisruptWeapon.bullet = DisruptBullet;
const DisruptBulletUnit2 = extend(MissileUnitType, "Destructor_Disrupt_Missile_Mini", {});
DisruptBulletUnit2.constructor = () => extend(TimedKillUnit, {});
const DisruptBullet2 = BulletType();
DisruptBullet2.shootEffect = Fx.sparkShoot;
DisruptBullet2.smokeEffect = Fx.shootSmokeTitan;
DisruptBullet2.hitColor = Color.valueOf("fff340");
DisruptBullet2.hitShake = 1.25;
DisruptBullet2.speed = 0;
DisruptBullet2.keepVelocity = false;
DisruptBullet2.spawnUnit = DisruptBulletUnit2;
const DisruptWeapon2 = Weapon();
DisruptWeapon2.shootSound = Sounds.missileLarge;
DisruptWeapon2.x = 0;
DisruptWeapon2.y = 0;
DisruptWeapon2.mirror = false;
DisruptWeapon2.rotate = false;
DisruptWeapon2.reload = 7.5;
DisruptWeapon2.recoil = 1;
DisruptWeapon2.minWarmup = 0.95;
DisruptWeapon2.shootWarmupSpeed = 0.1;
DisruptWeapon2.shootY = 20;
DisruptWeapon2.shootCone = 40;
DisruptWeapon2.inaccuracy = 28;
DisruptWeapon2.bullet = DisruptBullet2;
Disrupt.weapons.add(DisruptWeapon);
Disrupt.weapons.add(DisruptWeapon2);
const DisruptAbility1 = extend(SuppressionFieldAbility,{});
DisruptAbility1.particleColor = Color.valueOf("fff340");
DisruptAbility1.color = Color.valueOf("fff340");
DisruptAbility1.orbRadius = 5;
DisruptAbility1.particleSize = 3;
DisruptAbility1.y = 10;
DisruptAbility1.particles = 10;
const DisruptAbility2 = extend(SuppressionFieldAbility,{});
DisruptAbility2.particleColor = Color.valueOf("fff340");
DisruptAbility2.color = Color.valueOf("fff340");
DisruptAbility2.orbRadius = 5;
DisruptAbility2.particleSize = 3;
DisruptAbility2.y = -8;
DisruptAbility2.x = 10.75;
DisruptAbility2.particles = 10;
DisruptAbility2.display = DisruptAbility2.active = false;
const DisruptAbility3 = extend(SuppressionFieldAbility,{});
DisruptAbility3.particleColor = Color.valueOf("fff340");
DisruptAbility3.color = Color.valueOf("fff340");
DisruptAbility3.orbRadius = 5;
DisruptAbility3.particleSize = 3;
DisruptAbility3.y = -8;
DisruptAbility3.x = -10.75;
DisruptAbility3.particles = 10;
DisruptAbility3.display = DisruptAbility3.active = false;
Disrupt.abilities.add(DisruptAbility1);
Disrupt.abilities.add(DisruptAbility2);
Disrupt.abilities.add(DisruptAbility3);
Disrupt.abilities.add(abi.selfreg);
Blocks.shipAssembler.plans.add(new UnitAssembler.AssemblerUnitPlan(Disrupt,60*250,PayloadStack.list(UnitTypes.obviate,6,Blocks.reinforcedSurgeWallLarge, 30)));

//collaris
const Collaris = extend(ErekirUnitType, "Destructor_Collaris", {});
Collaris.constructor = () => extend(LegsUnit, {});
Collaris.abilities.add(abi.selfreg);
Blocks.mechAssembler.plans.add(new UnitAssembler.AssemblerUnitPlan(Collaris,60*250,PayloadStack.list(UnitTypes.anthicus,6,Blocks.reinforcedSurgeWallLarge, 30)));