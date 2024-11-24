const launchPod = new Effect(50, e => {
  Draw.color(Pal.engine);

  e.scaled(25, f => {
      stroke(f.fout() * 2);
      Lines.circle(e.x, e.y, 4 + f.finpow() * 30);
  });

  Draw.stroke(e.fout() * 2);

  Angles.randLenVectors(e.id, 24, e.finpow() * 50, (x, y) => {
      var ang = Mathf.angle(x, y);
      Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 4 + 1);
  });
});
const DestLaunchPad = extend(LaunchPad, "Destruction_Launch_Pad", {
  updateTile(){
    if(!state.isCampaign()) return;

    //increment launchCounter then launch when full and base conditions are met
    if((launchCounter += edelta()) >= launchTime && items.total() >= itemCapacity){
        //if there are item requirements, use those.
        consume();
        launchSound.at(x, y);
        entity = LaunchPayload.create();
        items.each((item, amount) => entity.stacks.add(new ItemStack(item, amount)));
        entity.set(this);
        entity.lifetime(120);
        entity.team(team);
        entity.add();
        Fx.launchPod.at(this);
        items.clear();
        Effect.shake(3, 3, this);
        launchCounter = 0;
    }
}
});
