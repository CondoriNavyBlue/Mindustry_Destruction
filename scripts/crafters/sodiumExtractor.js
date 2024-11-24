const NaExtractor = extend(GenericCrafter, "Sodium_Extractor", {});
const water = Liquids.water;
const liquids = require("liquids");
NaExtractor.buildType = () => extend(GenericCrafter.GenericCrafterBuild, NaExtractor, {
	draw(){
		Draw.rect(NaExtractor.region, this.x, this.y);
		Draw.color(water.color);
		Draw.alpha(this.liquids.get(water) / NaExtractor.liquidCapacity);
		Draw.rect(Core.atlas.find(NaExtractor.name + "-lquid"), this.x, this.y);
		Draw.color(liquids.wasteWater.color);
		Draw.alpha(this.liquids.get(liquids.wasteWater) / NaExtractor.liquidCapacity);
		Draw.rect(Core.atlas.find(NaExtractor.name+ "-lquid2"), this.x, this.y);
		Draw.color();
		Draw.rect(Core.atlas.find(NaExtractor.name + "-top"), this.x, this.y);
		Draw.reset();
	},
});
