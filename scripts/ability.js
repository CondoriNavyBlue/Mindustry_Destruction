const SelfRegenerationAbility = extend(Ability,{
    update(unit){
        this.super$update(unit);
        if(unit.damaged()){
            unit.heal(10);
        }
    },
    draw(unit){
        this.super$draw(unit);
        let angle, angle3;
        let color = unit.damaged() ? unit.team.color : Color.valueOf("c0c0c060");
        let white = unit.damaged() ? Color.white : Color.valueOf("ffffff60");
        let OR = unit.hitSize+4*unit.hitSize/36 + Math.cos(Time.time*1.5*Math.PI/180)*2*unit.hitSize/36;
        let IR = unit.hitSize-4*unit.hitSize/36 + Math.sin(Time.time*1.5*Math.PI/180)*2*unit.hitSize/36;
        Draw.z(109);
        Draw.color(color);
        Lines.stroke(1.5*unit.hitSize/36);
        Lines.circle(unit.x, unit.y, IR);
        Draw.color(white);
        Lines.stroke(0.75*unit.hitSize/36);
        Lines.circle(unit.x, unit.y, IR);
        for(let i = 0; i < 8; i++){
            angle = i* 360 / 8 + Time.time * 1;
            angle3 = i* 360 / 8 + Time.time * 0.5;
            Draw.color(color);
            Fill.circle(unit.x + Angles.trnsx(angle3, IR), unit.y + Angles.trnsy(angle3, IR), 3*unit.hitSize/36);
            Drawf.tri(unit.x + Angles.trnsx(angle3, IR), unit.y + Angles.trnsy(angle3, IR), 3*unit.hitSize/36, -8*unit.hitSize/36, angle3);
            Draw.color(white);
            Fill.circle(unit.x + Angles.trnsx(angle3, IR), unit.y + Angles.trnsy(angle3, IR), 1.5*unit.hitSize/36);
            Drawf.tri(unit.x + Angles.trnsx(angle3, IR), unit.y + Angles.trnsy(angle3, IR), 1.5*unit.hitSize/36, -6*unit.hitSize/36, angle3);
        }
        Draw.color(color);
        Lines.stroke(2*unit.hitSize/36);
        Lines.circle(unit.x, unit.y, OR);
        Draw.color(white);
        Lines.stroke(1*unit.hitSize/36);
        Lines.circle(unit.x, unit.y, OR);
        for(let i = 0; i < 8; i++){
            angle = i* 360 / 8 + Time.time * 1;
            angle3 = i* 360 / 8 + Time.time * 0.5;
            Draw.color(color);
            Fill.circle(unit.x + Angles.trnsx(angle, OR), unit.y + Angles.trnsy(angle, OR), 4*unit.hitSize/36);
            Drawf.tri(unit.x + Angles.trnsx(angle, OR), unit.y + Angles.trnsy(angle, OR), 4*unit.hitSize/36, -16*unit.hitSize/36, angle);
            Draw.color(white);
            Fill.circle(unit.x + Angles.trnsx(angle, OR), unit.y + Angles.trnsy(angle, OR), 2*unit.hitSize/36);
            Drawf.tri(unit.x + Angles.trnsx(angle, OR), unit.y + Angles.trnsy(angle, OR), 2*unit.hitSize/36, -14*unit.hitSize/36, angle);
        }
        Draw.reset();
    }
});
SelfRegenerationAbility.localizedName = "Self Regeneration";
module.exports = {
    selfreg: SelfRegenerationAbility,
}