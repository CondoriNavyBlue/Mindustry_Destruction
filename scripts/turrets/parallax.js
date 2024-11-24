const Parallax = extend(TractorBeamTurret, "Destructor_Parallax", {});
Parallax.unitSort = (u, x, y) => u.maxHealth + Mathf.dst2(u.x, u.y, x, y) / 6400;
