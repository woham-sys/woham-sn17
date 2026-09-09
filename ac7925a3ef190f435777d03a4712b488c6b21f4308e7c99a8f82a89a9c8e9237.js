function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_wooden_cabinet";

  const cabinetW = 3.4;
  const cabinetD = 1.05;
  const bodyTop = 2.34;
  const bodyBottom = 0.42;

  const woodMat = new THREE.MeshStandardMaterial({ color: 0x704326, roughness: 0.55 });
  const panelWoodMat = new THREE.MeshStandardMaterial({ color: 0x5d351f, roughness: 0.6 });
  const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x2b170f, roughness: 0.75 });
  const carvedWoodMat = new THREE.MeshStandardMaterial({ color: 0x4a2818, roughness: 0.65 });
  const grainMat = new THREE.LineBasicMaterial({ color: 0x1d100b, transparent: true, opacity: 0.38 });
  const shadowMat = new THREE.MeshStandardMaterial({ color: 0x120906, roughness: 0.9 });
  const hardwareMat = new THREE.MeshStandardMaterial({ color: 0x3a3028, metalness: 0.55, roughness: 0.5 });

  function addBox(name, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addFrontPanelFrame(name, x, y, w, h, t) {
    const frame = new THREE.Group();
    frame.name = name;
    frame.position.set(x, y, 0.585);

    const top = new THREE.Mesh(new THREE.BoxGeometry(w, t, 0.045), woodMat);
    top.name = name + "_top";
    top.position.set(0, h / 2 - t / 2, 0);
    frame.add(top);

    const bottom = new THREE.Mesh(new THREE.BoxGeometry(w, t, 0.045), woodMat);
    bottom.name = name + "_bottom";
    bottom.position.set(0, -h / 2 + t / 2, 0);
    frame.add(bottom);

    const left = new THREE.Mesh(new THREE.BoxGeometry(t, h, 0.045), woodMat);
    left.name = name + "_left";
    left.position.set(-w / 2 + t / 2, 0, 0);
    frame.add(left);

    const right = new THREE.Mesh(new THREE.BoxGeometry(t, h, 0.045), woodMat);
    right.name = name + "_right";
    right.position.set(w / 2 - t / 2, 0, 0);
    frame.add(right);

    root.add(frame);
    return frame;
  }

  function addFrontShadowGroove(name, x, y, w, h) {
    const groove = new THREE.Group();
    groove.name = name;
    groove.position.set(x, y, 0.61);
    const inset = 0.035;
    const top = new THREE.Mesh(new THREE.BoxGeometry(w - inset * 2, 0.018, 0.018), shadowMat);
    top.name = name + "_top";
    top.position.set(0, h / 2 - inset, 0);
    groove.add(top);
    const bottom = new THREE.Mesh(new THREE.BoxGeometry(w - inset * 2, 0.018, 0.018), shadowMat);
    bottom.name = name + "_bottom";
    bottom.position.set(0, -h / 2 + inset, 0);
    groove.add(bottom);
    const left = new THREE.Mesh(new THREE.BoxGeometry(0.018, h - inset * 2, 0.018), shadowMat);
    left.name = name + "_left";
    left.position.set(-w / 2 + inset, 0, 0);
    groove.add(left);
    const right = new THREE.Mesh(new THREE.BoxGeometry(0.018, h - inset * 2, 0.018), shadowMat);
    right.name = name + "_right";
    right.position.set(w / 2 - inset, 0, 0);
    groove.add(right);
    root.add(groove);
    return groove;
  }

  function addTube(name, points, radius, mat) {
    const curve = new THREE.CatmullRomCurve3(points);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 32, radius, 8, false), mat);
    tube.name = name;
    root.add(tube);
    return tube;
  }

  const back_panel = addBox("back_panel", 3.12, 1.82, 0.08, panelWoodMat, 0, 1.38, -0.49);
  const left_side_panel = addBox("left_side_panel", 0.08, 1.82, 0.92, panelWoodMat, -1.64, 1.38, -0.02);
  const right_side_panel = addBox("right_side_panel", 0.08, 1.82, 0.92, panelWoodMat, 1.64, 1.38, -0.02);
  const front_shadow_recess = addBox("front_shadow_recess", 3.02, 1.82, 0.035, darkWoodMat, 0, 1.38, 0.49);

  const left_front_post = addBox("left_front_post", 0.18, 1.92, 0.16, woodMat, -1.58, 1.38, 0.53);
  const right_front_post = addBox("right_front_post", 0.18, 1.92, 0.16, woodMat, 1.58, 1.38, 0.53);
  const left_back_post = addBox("left_back_post", 0.18, 1.92, 0.16, woodMat, -1.58, 1.38, -0.47);
  const right_back_post = addBox("right_back_post", 0.18, 1.92, 0.16, woodMat, 1.58, 1.38, -0.47);

  const top_slab = addBox("top_slab", 3.62, 0.13, 1.18, woodMat, 0, 2.43, 0);
  const top_edge_bead = addBox("top_edge_bead", 3.68, 0.055, 1.22, woodMat, 0, 2.355, 0);
  const top_front_roundover = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 3.62, 24), woodMat);
  top_front_roundover.name = "top_front_roundover";
  top_front_roundover.rotation.z = Math.PI / 2;
  top_front_roundover.position.set(0, 2.385, 0.595);
  root.add(top_front_roundover);

  const upper_front_rail = addBox("upper_front_rail", 3.08, 0.12, 0.13, woodMat, 0, 2.29, 0.54);
  const drawer_separator_rail = addBox("drawer_separator_rail", 3.08, 0.11, 0.13, woodMat, 0, 1.61, 0.54);
  const lower_front_rail = addBox("lower_front_rail", 3.08, 0.13, 0.13, woodMat, 0, 0.49, 0.54);
  const center_stile = addBox("center_stile", 0.12, 1.72, 0.13, woodMat, 0, 1.05, 0.54);

  const left_drawer = addBox("left_drawer", 1.42, 0.55, 0.11, woodMat, -0.72, 1.95, 0.55);
  const right_drawer = addBox("right_drawer", 1.42, 0.55, 0.11, woodMat, 0.72, 1.95, 0.55);
  const left_drawer_inset_panel = addBox("left_drawer_inset_panel", 1.22, 0.38, 0.035, panelWoodMat, -0.72, 1.95, 0.625);
  const right_drawer_inset_panel = addBox("right_drawer_inset_panel", 1.22, 0.38, 0.035, panelWoodMat, 0.72, 1.95, 0.625);

  const left_door = addBox("left_door", 1.42, 1.02, 0.11, woodMat, -0.72, 1.05, 0.55);
  const right_door = addBox("right_door", 1.42, 1.02, 0.11, woodMat, 0.72, 1.05, 0.55);
  const left_door_inset_panel = addBox("left_door_inset_panel", 1.18, 0.78, 0.035, panelWoodMat, -0.72, 1.05, 0.625);
  const right_door_inset_panel = addBox("right_door_inset_panel", 1.18, 0.78, 0.035, panelWoodMat, 0.72, 1.05, 0.625);

  const left_drawer_frame = addFrontPanelFrame("left_drawer_frame", -0.72, 1.95, 1.38, 0.51, 0.055);
  const right_drawer_frame = addFrontPanelFrame("right_drawer_frame", 0.72, 1.95, 1.38, 0.51, 0.055);
  const left_door_frame = addFrontPanelFrame("left_door_frame", -0.72, 1.05, 1.38, 0.98, 0.07);
  const right_door_frame = addFrontPanelFrame("right_door_frame", 0.72, 1.05, 1.38, 0.98, 0.07);

  const left_drawer_groove = addFrontShadowGroove("left_drawer_groove", -0.72, 1.95, 1.28, 0.42);
  const right_drawer_groove = addFrontShadowGroove("right_drawer_groove", 0.72, 1.95, 1.28, 0.42);
  const left_door_groove = addFrontShadowGroove("left_door_groove", -0.72, 1.05, 1.25, 0.82);
  const right_door_groove = addFrontShadowGroove("right_door_groove", 0.72, 1.05, 1.25, 0.82);

  const left_bottom_foot = addBox("left_bottom_foot", 0.34, 0.42, 0.34, woodMat, -1.48, 0.21, 0.38);
  const right_bottom_foot = addBox("right_bottom_foot", 0.34, 0.42, 0.34, woodMat, 1.48, 0.21, 0.38);
  const left_rear_foot = addBox("left_rear_foot", 0.3, 0.34, 0.28, woodMat, -1.48, 0.17, -0.38);
  const right_rear_foot = addBox("right_rear_foot", 0.3, 0.34, 0.28, woodMat, 1.48, 0.17, -0.38);
  const front_plinth = addBox("front_plinth", 3.18, 0.18, 0.18, woodMat, 0, 0.43, 0.55);
  const front_lower_bead = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 3.18, 18), woodMat);
  front_lower_bead.name = "front_lower_bead";
  front_lower_bead.rotation.z = Math.PI / 2;
  front_lower_bead.position.set(0, 0.535, 0.65);
  root.add(front_lower_bead);

  const left_side_inset_panel = addBox("left_side_inset_panel", 0.035, 1.48, 0.72, panelWoodMat, -1.69, 1.35, -0.02);
  const right_side_inset_panel = addBox("right_side_inset_panel", 0.035, 1.48, 0.72, panelWoodMat, 1.69, 1.35, -0.02);

  const left_side_top_trim = addBox("left_side_top_trim", 0.045, 0.07, 0.82, woodMat, -1.72, 2.08, -0.02);
  const left_side_bottom_trim = addBox("left_side_bottom_trim", 0.045, 0.07, 0.82, woodMat, -1.72, 0.62, -0.02);
  const left_side_front_trim = addBox("left_side_front_trim", 0.045, 1.52, 0.07, woodMat, -1.72, 1.35, 0.38);
  const left_side_back_trim = addBox("left_side_back_trim", 0.045, 1.52, 0.07, woodMat, -1.72, 1.35, -0.42);
  const right_side_top_trim = addBox("right_side_top_trim", 0.045, 0.07, 0.82, woodMat, 1.72, 2.08, -0.02);
  const right_side_bottom_trim = addBox("right_side_bottom_trim", 0.045, 0.07, 0.82, woodMat, 1.72, 0.62, -0.02);
  const right_side_front_trim = addBox("right_side_front_trim", 0.045, 1.52, 0.07, woodMat, 1.72, 1.35, 0.38);
  const right_side_back_trim = addBox("right_side_back_trim", 0.045, 1.52, 0.07, woodMat, 1.72, 1.35, -0.42);

  const left_hinge_upper = addBox("left_hinge_upper", 0.035, 0.16, 0.035, hardwareMat, -1.46, 1.35, 0.64);
  const left_hinge_lower = addBox("left_hinge_lower", 0.035, 0.16, 0.035, hardwareMat, -1.46, 0.75, 0.64);
  const right_hinge_upper = addBox("right_hinge_upper", 0.035, 0.16, 0.035, hardwareMat, 1.46, 1.35, 0.64);
  const right_hinge_lower = addBox("right_hinge_lower", 0.035, 0.16, 0.035, hardwareMat, 1.46, 0.75, 0.64);

  const knobGeom = new THREE.SphereGeometry(0.075, 24, 12);
  const left_knob = new THREE.Mesh(knobGeom, hardwareMat);
  left_knob.name = "left_knob";
  left_knob.scale.set(1, 1, 0.65);
  left_knob.position.set(-0.08, 1.05, 0.7);
  root.add(left_knob);

  const right_knob = new THREE.Mesh(knobGeom, hardwareMat);
  right_knob.name = "right_knob";
  right_knob.scale.set(1, 1, 0.65);
  right_knob.position.set(0.08, 1.05, 0.7);
  root.add(right_knob);

  const knobBaseGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.035, 18);
  const left_knob_base = new THREE.Mesh(knobBaseGeom, hardwareMat);
  left_knob_base.name = "left_knob_base";
  left_knob_base.rotation.x = Math.PI / 2;
  left_knob_base.position.set(-0.08, 1.05, 0.65);
  root.add(left_knob_base);

  const right_knob_base = new THREE.Mesh(knobBaseGeom, hardwareMat);
  right_knob_base.name = "right_knob_base";
  right_knob_base.rotation.x = Math.PI / 2;
  right_knob_base.position.set(0.08, 1.05, 0.65);
  root.add(right_knob_base);

  function addDrawerScrollwork(name, centerX) {
    const scrollwork = new THREE.Group();
    scrollwork.name = name;
    root.add(scrollwork);

    const mainVine = addTube(name + "_main_vine", [
      new THREE.Vector3(centerX - 0.52, 1.91, 0.665),
      new THREE.Vector3(centerX - 0.38, 2.02, 0.665),
      new THREE.Vector3(centerX - 0.2, 1.88, 0.665),
      new THREE.Vector3(centerX, 2.0, 0.665),
      new THREE.Vector3(centerX + 0.2, 1.88, 0.665),
      new THREE.Vector3(centerX + 0.38, 2.02, 0.665),
      new THREE.Vector3(centerX + 0.52, 1.91, 0.665)
    ], 0.018, carvedWoodMat);
    scrollwork.add(mainVine);

    const leftCurl = addTube(name + "_left_curl", [
      new THREE.Vector3(centerX - 0.48, 1.92, 0.665),
      new THREE.Vector3(centerX - 0.55, 2.02, 0.665),
      new THREE.Vector3(centerX - 0.45, 2.08, 0.665),
      new THREE.Vector3(centerX - 0.36, 2.01, 0.665),
      new THREE.Vector3(centerX - 0.43, 1.94, 0.665)
    ], 0.016, carvedWoodMat);
    scrollwork.add(leftCurl);

    const rightCurl = addTube(name + "_right_curl", [
      new THREE.Vector3(centerX + 0.48, 1.92, 0.665),
      new THREE.Vector3(centerX + 0.55, 2.02, 0.665),
      new THREE.Vector3(centerX + 0.45, 2.08, 0.665),
      new THREE.Vector3(centerX + 0.36, 2.01, 0.665),
      new THREE.Vector3(centerX + 0.43, 1.94, 0.665)
    ], 0.016, carvedWoodMat);
    scrollwork.add(rightCurl);

    const centerLoop = addTube(name + "_center_loop", [
      new THREE.Vector3(centerX - 0.12, 1.94, 0.665),
      new THREE.Vector3(centerX - 0.08, 2.05, 0.665),
      new THREE.Vector3(centerX, 2.08, 0.665),
      new THREE.Vector3(centerX + 0.08, 2.05, 0.665),
      new THREE.Vector3(centerX + 0.12, 1.94, 0.665)
    ], 0.017, carvedWoodMat);
    scrollwork.add(centerLoop);

    return scrollwork;
  }

  const left_drawer_scrollwork = addDrawerScrollwork("left_drawer_scrollwork", -0.72);
  const right_drawer_scrollwork = addDrawerScrollwork("right_drawer_scrollwork", 0.72);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, -0.12);
  leafShape.bezierCurveTo(0.075, -0.075, 0.085, 0.055, 0, 0.13);
  leafShape.bezierCurveTo(-0.085, 0.055, -0.075, -0.075, 0, -0.12);
  const leafGeom = new THREE.ExtrudeGeometry(leafShape, { depth: 0.022, steps: 1 });

  function createLeafInstances(name, specs, z) {
    const leaves = new THREE.InstancedMesh(leafGeom, carvedWoodMat, specs.length);
    leaves.name = name;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < specs.length; i++) {
      const s = specs[i];
      dummy.position.set(s[0], s[1], z);
      dummy.rotation.set(0, 0, s[2]);
      dummy.scale.set(s[3], s[4], 1);
      dummy.updateMatrix();
      leaves.setMatrixAt(i, dummy.matrix);
    }
    leaves.instanceMatrix.needsUpdate = true;
    root.add(leaves);
    return leaves;
  }

  const doorLeafSpecs = [];
  for (const centerX of [-0.72, 0.72]) {
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2 + 0.18;
      const r = 0.27 + (i % 2) * 0.035;
      doorLeafSpecs.push([
        centerX + Math.cos(a) * r,
        1.05 + Math.sin(a) * r,
        a - Math.PI / 2,
        0.82,
        0.92
      ]);
    }
    doorLeafSpecs.push([centerX - 0.42, 1.34, -0.75, 0.72, 0.82]);
    doorLeafSpecs.push([centerX + 0.42, 1.34, 0.75, 0.72, 0.82]);
    doorLeafSpecs.push([centerX - 0.42, 0.76, -2.35, 0.72, 0.82]);
    doorLeafSpecs.push([centerX + 0.42, 0.76, 2.35, 0.72, 0.82]);
  }
  const door_carved_leaves = createLeafInstances("door_carved_leaves", doorLeafSpecs, 0.655);

  const drawerLeafSpecs = [];
  for (const centerX of [-0.72, 0.72]) {
    for (let i = 0; i < 5; i++) {
      const x = centerX - 0.38 + i * 0.19;
      drawerLeafSpecs.push([x, 1.98 + (i % 2) * 0.035, (i % 2 === 0 ? -0.7 : 0.7), 0.42, 0.5]);
      drawerLeafSpecs.push([x, 1.91 - (i % 2) * 0.035, (i % 2 === 0 ? 0.7 : -0.7), 0.42, 0.5]);
    }
  }
  const drawer_carved_leaves = createLeafInstances("drawer_carved_leaves", drawerLeafSpecs, 0.655);

  const postLeafSpecs = [];
  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      const y = 1.88 - i * 0.12;
      postLeafSpecs.push([side * 1.58 - 0.035, y, side * -0.75, 0.34, 0.48]);
      postLeafSpecs.push([side * 1.58 + 0.035, y + 0.035, side * 0.75, 0.34, 0.48]);
    }
  }
  const post_carved_leaves = createLeafInstances("post_carved_leaves", postLeafSpecs, 0.62);

  const petalGeom = new THREE.CircleGeometry(0.075, 24);
  const flowerCenterGeom = new THREE.CircleGeometry(0.075, 24);
  const flowerDotGeom = new THREE.CircleGeometry(0.012, 12);

  function addFlowerCarving(name, centerX, centerY, size) {
    const flower = new THREE.Group();
    flower.name = name;
    flower.position.set(centerX, centerY, 0.67);
    root.add(flower);

    const outerPetals = new THREE.InstancedMesh(petalGeom, carvedWoodMat, 12);
    outerPetals.name = name + "_outer_petals";
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      dummy.position.set(Math.cos(a) * 0.145 * size, Math.sin(a) * 0.145 * size, 0);
      dummy.rotation.set(0, 0, a - Math.PI / 2);
      dummy.scale.set(0.72 * size, 1.35 * size, 1);
      dummy.updateMatrix();
      outerPetals.setMatrixAt(i, dummy.matrix);
    }
    outerPetals.instanceMatrix.needsUpdate = true;
    flower.add(outerPetals);

    const innerPetals = new THREE.InstancedMesh(petalGeom, carvedWoodMat, 8);
    innerPetals.name = name + "_inner_petals";
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      dummy.position.set(Math.cos(a) * 0.085 * size, Math.sin(a) * 0.085 * size, 0.004);
      dummy.rotation.set(0, 0, a - Math.PI / 2);
      dummy.scale.set(0.5 * size, 0.82 * size, 1);
      dummy.updateMatrix();
      innerPetals.setMatrixAt(i, dummy.matrix);
    }
    innerPetals.instanceMatrix.needsUpdate = true;
    flower.add(innerPetals);

    const center = new THREE.Mesh(flowerCenterGeom, carvedWoodMat);
    center.name = name + "_center";
    center.scale.setScalar(size);
    center.position.z = 0.008;
    flower.add(center);

    const dots = new THREE.InstancedMesh(flowerDotGeom, darkWoodMat, 13);
    dots.name = name + "_seed_dots";
    for (let i = 0; i < 13; i++) {
      const a = i * 2.399963229728653;
      const r = i === 0 ? 0 : (0.018 + i * 0.004) * size;
      dummy.position.set(Math.cos(a) * r, Math.sin(a) * r, 0.014);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      dots.setMatrixAt(i, dummy.matrix);
    }
    dots.instanceMatrix.needsUpdate = true;
    flower.add(dots);

    return flower;
  }

  const left_flower_carving = addFlowerCarving("left_flower_carving", -0.72, 1.05, 1.0);
  const right_flower_carving = addFlowerCarving("right_flower_carving", 0.72, 1.05, 1.0);

  const left_flower_stem = addTube("left_flower_stem", [
    new THREE.Vector3(-0.72, 1.05, 0.66),
    new THREE.Vector3(-0.86, 0.88, 0.66),
    new THREE.Vector3(-1.02, 0.72, 0.66),
    new THREE.Vector3(-1.18, 0.62, 0.66)
  ], 0.014, carvedWoodMat);
  const right_flower_stem = addTube("right_flower_stem", [
    new THREE.Vector3(0.72, 1.05, 0.66),
    new THREE.Vector3(0.86, 0.88, 0.66),
    new THREE.Vector3(1.02, 0.72, 0.66),
    new THREE.Vector3(1.18, 0.62, 0.66)
  ], 0.014, carvedWoodMat);

  const left_flower_branch = addTube("left_flower_branch", [
    new THREE.Vector3(-0.72, 1.05, 0.66),
    new THREE.Vector3(-0.9, 1.2, 0.66),
    new THREE.Vector3(-1.08, 1.34, 0.66),
    new THREE.Vector3(-1.2, 1.43, 0.66)
  ], 0.012, carvedWoodMat);
  const right_flower_branch = addTube("right_flower_branch", [
    new THREE.Vector3(0.72, 1.05, 0.66),
    new THREE.Vector3(0.9, 1.2, 0.66),
    new THREE.Vector3(1.08, 1.34, 0.66),
    new THREE.Vector3(1.2, 1.43, 0.66)
  ], 0.012, carvedWoodMat);

  const grainPositions = [];
  function pushGrainSegment(x1, y1, z1, x2, y2, z2) {
    grainPositions.push(x1, y1, z1, x2, y2, z2);
  }

  for (let i = 0; i < 18; i++) {
    const y = 2.495;
    const z = -0.5 + i * 0.058;
    const x0 = -1.65 + (i % 3) * 0.08;
    const x1 = 1.65 - ((i + 1) % 4) * 0.07;
    pushGrainSegment(x0, y, z, x1, y, z + 0.012 * Math.sin(i));
  }

  for (let i = 0; i < 12; i++) {
    const y = 0.51 + i * 0.012;
    pushGrainSegment(-1.45, y, 0.645, 1.45, y + 0.006 * Math.sin(i * 1.7), 0.645);
  }

  for (let i = 0; i < 10; i++) {
    const y = 2.31 + i * 0.012;
    pushGrainSegment(-1.45, y, 0.615, 1.45, y + 0.004 * Math.sin(i), 0.615);
  }

  for (const side of [-1, 1]) {
    for (let i = 0; i < 8; i++) {
      const x = side * 1.58 + (i - 3.5) * 0.018;
      pushGrainSegment(x, 0.55, 0.62, x + 0.008 * Math.sin(i), 2.22, 0.62);
    }
  }

  for (let i = 0; i < 8; i++) {
    const y = 1.72 + i * 0.055;
    pushGrainSegment(-1.35, y, 0.64, -0.08, y + 0.006 * Math.sin(i), 0.64);
    pushGrainSegment(0.08, y, 0.64, 1.35, y + 0.006 * Math.sin(i + 0.5), 0.64);
  }

  for (let i = 0; i < 10; i++) {
    const y = 0.62 + i * 0.075;
    pushGrainSegment(-1.35, y, 0.64, -0.08, y + 0.008 * Math.sin(i), 0.64);
    pushGrainSegment(0.08, y, 0.64, 1.35, y + 0.008 * Math.sin(i + 0.4), 0.64);
  }

  for (const side of [-1, 1]) {
    for (let i = 0; i < 10; i++) {
      const z = -0.38 + i * 0.075;
      pushGrainSegment(side * 1.705, 0.62, z, side * 1.705, 2.08, z + 0.01 * Math.sin(i));
    }
  }

  const wood_grain_lines = new THREE.BufferGeometry();
  wood_grain_lines.setAttribute("position", new THREE.Float32BufferAttribute(grainPositions, 3));
  const wood_grain = new THREE.LineSegments(wood_grain_lines, grainMat);
  wood_grain.name = "wood_grain";
  root.add(wood_grain);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);
  root.position.sub(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.98 / maxDim;
  root.scale.setScalar(scale);
}


export default function generate(THREE) {
  const obj = __sn17_user(THREE);
  if (obj === null || obj === undefined) return obj;
  const root = new THREE.Group();
  const inner = new THREE.Group();
  inner.add(obj);
  root.add(inner);
  const box = new THREE.Box3().setFromObject(inner);
  const size = new THREE.Vector3(); box.getSize(size);
  const ctr = new THREE.Vector3(); box.getCenter(ctr);
  if (isFinite(ctr.x) && isFinite(ctr.y) && isFinite(ctr.z)) inner.position.sub(ctr);
  const m = Math.max(size.x, size.y, size.z);
  if (isFinite(m) && m > 0) root.scale.setScalar(0.98 / m);
  return root;
}
