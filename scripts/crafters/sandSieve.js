const SSM = extend(Separator, "Sand_Sieve_Machine", {});
const sand = Items.sand;
const items = require("items");
SSM.buildType = () => extend(Separator.SeparatorBuild, SSM, {
	draw(){
		Draw.rect(SSM.region, this.x, this.y);
		Draw.color();
		var A = this.items.get(sand) / 10;
		if(A>1){
			A=1;
		}
		Draw.alpha(A * 0.8);
		Draw.rect(Core.atlas.find(SSM.name + "-sand"), this.x, this.y, this.totalProgress*0.5);
		Draw.color();
		Draw.rect(Core.atlas.find(SSM.name + "-spinner"), this.x, this.y, this.totalProgress * 2);
		Draw.reset();
	},
});
SSM.results = ItemStack.with(items.iron, 5, items.gold, 2);