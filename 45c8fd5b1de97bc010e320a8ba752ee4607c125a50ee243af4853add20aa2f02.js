function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "windmill";

  const tower_group = new THREE.Group();
  tower_group.name = "tower_group";
  root.add(tower_group);

  const roof_group = new THREE.Group();
  roof_group.name = "roof_group";
  root.add(roof_group);

  const rotor_group = new THREE.Group();
  rotor_group.name = "rotor_group";
  root.add(rotor_group);

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  root.add(base_group);

  const towerMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1eb,
    roughness: 0.9
  });
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0xe8e9e5,
    roughness: 0.9
  });
  const sailMat = new THREE.MeshStandardMaterial({
    color: 0xf7f7f2,
    roughness: 0.85
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0xd8d9d4,
    roughness: 0.75
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xc9cac5,
    roughness: 0.85
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x3b291d,
    roughness: 0.9
  });
  const doorMat = new THREE.MeshStandardMaterial({
    color: 0x090807,
    roughness: 0.95
  });
  const foundationMat = new THREE.MeshStandardMaterial({
    color: 0x777872,
    roughness: 0.95
  });
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0xbfc0bb,
    roughness: 0.55,
    metalness: 0.35
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0x8d1717,
    roughness: 0.7
  });

  const towerBottomY = 0.12;
  const towerTopY = 1.34;
  const towerBottomR = 0.48;
  const towerTopR = 0.31;

  function towerRadiusAt(y) {
    const t = Math.max(0, Math.min(1, (y - towerBottomY) / (towerTopY - towerBottomY)));
    return towerBottomR + (towerTopR - towerBottomR) * t;
  }

  const tower_bodyGeom = new THREE.CylinderGeometry(
    towerTopR,
    towerBottomR,
    towerTopY - towerBottomY,
    64,
    1,
    false
  );
  const tower_body = new THREE.Mesh(tower_bodyGeom, towerMat);
  tower_body.name = "tower_body";
  tower_body.position.y = (towerBottomY + towerTopY) * 0.5;
  tower_group.add(tower_body);

  const tower_seamGeom = new THREE.TorusGeometry(1, 0.006, 6, 64);
  const tower_seams = new THREE.InstancedMesh(tower_seamGeom, seamMat, 8);
  tower_seams.name = "tower_seams";
  const seamMatrix = new THREE.Matrix4();
  const seamQuat = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    Math.PI / 2
  );
  for (let i = 0; i < 8; i++) {
    const y = 0.27 + i * 0.125;
    const r = towerRadiusAt(y) + 0.004;
    seamMatrix.compose(
      new THREE.Vector3(0, y, 0),
      seamQuat,
      new THREE.Vector3(r, r, r)
    );
    tower_seams.setMatrixAt(i, seamMatrix);
  }
  tower_seams.instanceMatrix.needsUpdate = true;
  tower_group.add(tower_seams);

  const roof_coneGeom = new THREE.ConeGeometry(0.57, 0.68, 64, 1, false);
  const roof_cone = new THREE.Mesh(roof_coneGeom, roofMat);
  roof_cone.name = "roof_cone";
  roof_cone.position.y = 1.64;
  roof_group.add(roof_cone);

  const roof_eaveGeom = new THREE.TorusGeometry(0.565, 0.014, 8, 64);
  const roof_eave = new THREE.Mesh(roof_eaveGeom, seamMat);
  roof_eave.name = "roof_eave";
  roof_eave.rotation.x = Math.PI / 2;
  roof_eave.position.y = 1.30;
  roof_group.add(roof_eave);

  const roof_seamGeom = new THREE.BoxGeometry(0.008, 1, 0.008);
  const roof_seams = new THREE.InstancedMesh(roof_seamGeom, seamMat, 24);
  roof_seams.name = "roof_seams";
  const roofSeamMatrix = new THREE.Matrix4();
  const roofSeamScale = new THREE.Vector3(1, 0.59, 1);
  for (let i = 0; i < 24; i++) {
    const angle = i / 24 * Math.PI * 2;
    const dir = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir
    );
    roofSeamMatrix.compose(
      new THREE.Vector3(dir.x * 0.292, 1.64, dir.z * 0.292),
      quat,
      roofSeamScale
    );
    roof_seams.setMatrixAt(i, roofSeamMatrix);
  }
  roof_seams.instanceMatrix.needsUpdate = true;
  roof_group.add(roof_seams);

  const roof_courseGeom = new THREE.TorusGeometry(1, 0.006, 6, 64);
  const roof_courses = new THREE.InstancedMesh(roof_courseGeom, seamMat, 4);
  roof_courses.name = "roof_courses";
  const courseMatrix = new THREE.Matrix4();
  const courseQuat = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    Math.PI / 2
  );
  for (let i = 0; i < 4; i++) {
    const y = 1.40 + i * 0.125;
    const t = (y - 1.30) / 0.68;
    const r = 0.57 * (1 - t) + 0.008;
    courseMatrix.compose(
      new THREE.Vector3(0, y, 0),
      courseQuat,
      new THREE.Vector3(r, r, r)
    );
    roof_courses.setMatrixAt(i, courseMatrix);
  }
  roof_courses.instanceMatrix.needsUpdate = true;
  roof_group.add(roof_courses);

  const roof_capGeom = new THREE.SphereGeometry(0.035, 16, 8);
  const roof_cap = new THREE.Mesh(roof_capGeom, hubMat);
  roof_cap.name = "roof_cap";
  roof_cap.position.y = 1.99;
  roof_group.add(roof_cap);

  const eave_bracketGeom = new THREE.BoxGeometry(0.012, 0.055, 0.012);
  const eave_brackets = new THREE.InstancedMesh(eave_bracketGeom, frameMat, 28);
  eave_brackets.name = "eave_brackets";
  const bracketMatrix = new THREE.Matrix4();
  const identityQuat = new THREE.Quaternion();
  for (let i = 0; i < 28; i++) {
    const angle = i / 28 * Math.PI * 2;
    bracketMatrix.compose(
      new THREE.Vector3(Math.sin(angle) * 0.57, 1.275, Math.cos(angle) * 0.57),
      identityQuat,
      new THREE.Vector3(1, 1, 1)
    );
    eave_brackets.setMatrixAt(i, bracketMatrix);
  }
  eave_brackets.instanceMatrix.needsUpdate = true;
  roof_group.add(eave_brackets);

  const doorY = 0.36;
  const doorZ = towerRadiusAt(doorY) + 0.012;

  const door_openingGeom = new THREE.BoxGeometry(0.205, 0.47, 0.018);
  const door_opening = new THREE.Mesh(door_openingGeom, doorMat);
  door_opening.name = "door_opening";
  door_opening.position.set(0, doorY, doorZ);
  tower_group.add(door_opening);

  const door_frame_leftGeom = new THREE.BoxGeometry(0.035, 0.51, 0.035);
  const door_frame_left = new THREE.Mesh(door_frame_leftGeom, darkWoodMat);
  door_frame_left.name = "door_frame_left";
  door_frame_left.position.set(-0.12, 0.38, doorZ + 0.012);
  tower_group.add(door_frame_left);

  const door_frame_rightGeom = new THREE.BoxGeometry(0.035, 0.51, 0.035);
  const door_frame_right = new THREE.Mesh(door_frame_rightGeom, darkWoodMat);
  door_frame_right.name = "door_frame_right";
  door_frame_right.position.set(0.12, 0.38, doorZ + 0.012);
  tower_group.add(door_frame_right);

  const door_lintelGeom = new THREE.BoxGeometry(0.275, 0.045, 0.04);
  const door_lintel = new THREE.Mesh(door_lintelGeom, darkWoodMat);
  door_lintel.name = "door_lintel";
  door_lintel.position.set(0, 0.625, doorZ + 0.013);
  tower_group.add(door_lintel);

  const door_canopyGeom = new THREE.BoxGeometry(0.34, 0.055, 0.13);
  const door_canopy = new THREE.Mesh(door_canopyGeom, towerMat);
  door_canopy.name = "door_canopy";
  door_canopy.position.set(0, 0.67, doorZ + 0.045);
  tower_group.add(door_canopy);

  const door_thresholdGeom = new THREE.BoxGeometry(0.23, 0.035, 0.08);
  const door_threshold = new THREE.Mesh(door_thresholdGeom, foundationMat);
  door_threshold.name = "door_threshold";
  door_threshold.position.set(0, 0.125, doorZ + 0.025);
  tower_group.add(door_threshold);

  const foundation_ringGeom = new THREE.CylinderGeometry(0.505, 0.515, 0.12, 64);
  const foundation_ring = new THREE.Mesh(foundation_ringGeom, foundationMat);
  foundation_ring.name = "foundation_ring";
  foundation_ring.position.y = 0.06;
  base_group.add(foundation_ring);

  const foundation_blockGeom = new THREE.BoxGeometry(0.13, 0.14, 0.075);
  const foundation_blocks = new THREE.InstancedMesh(foundation_blockGeom, foundationMat, 16);
  foundation_blocks.name = "foundation_blocks";
  const blockMatrix = new THREE.Matrix4();
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    const quat = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      angle
    );
    blockMatrix.compose(
      new THREE.Vector3(Math.sin(angle) * 0.515, 0.07, Math.cos(angle) * 0.515),
      quat,
      new THREE.Vector3(1, 1, 1)
    );
    foundation_blocks.setMatrixAt(i, blockMatrix);
  }
  foundation_blocks.instanceMatrix.needsUpdate = true;
  base_group.add(foundation_blocks);

  const postAngles = [-1.25, -0.55, 0.55, 1.25];
  const perimeter_postGeom = new THREE.BoxGeometry(0.045, 0.20, 0.045);
  const perimeter_posts = new THREE.InstancedMesh(perimeter_postGeom, foundationMat, postAngles.length);
  perimeter_posts.name = "perimeter_posts";
  const postMatrix = new THREE.Matrix4();
  for (let i = 0; i < postAngles.length; i++) {
    const angle = postAngles[i];
    postMatrix.compose(
      new THREE.Vector3(Math.sin(angle) * 0.56, 0.13, Math.cos(angle) * 0.56),
      identityQuat,
      new THREE.Vector3(1, 1, 1)
    );
    perimeter_posts.setMatrixAt(i, postMatrix);
  }
  perimeter_posts.instanceMatrix.needsUpdate = true;
  base_group.add(perimeter_posts);

  const axle_rodGeom = new THREE.CylinderGeometry(0.022, 0.022, 1.52, 16);
  const axle_rod = new THREE.Mesh(axle_rodGeom, darkWoodMat);
  axle_rod.name = "axle_rod";
  axle_rod.rotation.x = Math.PI / 2;
  axle_rod.position.set(0, 1.50, 0.40);
  rotor_group.add(axle_rod);

  const axle_endGeom = new THREE.CylinderGeometry(0.032, 0.032, 0.045, 16);
  const axle_ends = new THREE.InstancedMesh(axle_endGeom, hubMat, 2);
  axle_ends.name = "axle_ends";
  const axleEndMatrix = new THREE.Matrix4();
  const axleQuat = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    Math.PI / 2
  );
  for (let i = 0; i < 2; i++) {
    axleEndMatrix.compose(
      new THREE.Vector3(0, 1.50, i === 0 ? -0.38 : 0.78),
      axleQuat,
      new THREE.Vector3(1, 1, 1)
    );
    axle_ends.setMatrixAt(i, axleEndMatrix);
  }
  axle_ends.instanceMatrix.needsUpdate = true;
  rotor_group.add(axle_ends);

  const tail_finShape = new THREE.Shape();
  tail_finShape.moveTo(0, 0);
  tail_finShape.lineTo(0.16, 0.045);
  tail_finShape.lineTo(0.16, 0.13);
  tail_finShape.lineTo(0, 0.105);
  tail_finShape.closePath();
  const tail_finGeom = new THREE.ExtrudeGeometry(tail_finShape, {
    steps: 1,
    depth: 0.018,
    bevelEnabled: false
  });
  const tail_fin = new THREE.Mesh(tail_finGeom, redMat);
  tail_fin.name = "tail_fin";
  tail_fin.position.set(0.27, 1.43, 0.25);
  rotor_group.add(tail_fin);

  const tail_supportGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.24, 8);
  const tail_support = new THREE.Mesh(tail_supportGeom, frameMat);
  tail_support.name = "tail_support";
  tail_support.position.set(0.43, 1.56, 0.255);
  rotor_group.add(tail_support);

  const bladeCount = 4;
  const bladeBaseOffset = 0.08;
  const bladeLength = 1.0;
  const bladeStartY = 0.14;
  const bladeTaper = 0.68;
  const bladePitch = 0.11;
  const hubY = 1.50;
  const hubZ = 0.62;

  function bladeLocalToRoot(u, v, angle) {
    const radial = bladeBaseOffset + v;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const x = u * c - radial * s;
    const y = hubY + u * s + radial * c;
    const z = hubZ - v * bladePitch;
    return new THREE.Vector3(x, y, z);
  }

  function bladeLocalQuaternion(angle) {
    const radialQuat = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      angle
    );
    const pitchQuat = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      -bladePitch
    );
    return radialQuat.multiply(pitchQuat);
  }

  function setBeamInstance(instanced, index, p1, p2, thickness) {
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    const dir = new THREE.Vector3().subVectors(p2, p1);
    const len = dir.length();
    dir.normalize();
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir
    );
    const matrix = new THREE.Matrix4();
    matrix.compose(mid, quat, new THREE.Vector3(thickness, len, thickness));
    instanced.setMatrixAt(index, matrix);
  }

  const sail_panelGeom = new THREE.BoxGeometry(1, 1, 1);
  const sail_panels = new THREE.InstancedMesh(sail_panelGeom, sailMat, bladeCount * 2);
  sail_panels.name = "sail_panels";
  const panelMatrix = new THREE.Matrix4();
  let panelIndex = 0;
  for (let b = 0; b < bladeCount; b++) {
    const angle = Math.PI / 4 + b * Math.PI / 2;
    const quat = bladeLocalQuaternion(angle);
    for (let row = 0; row < 2; row++) {
      const v0 = row * 0.5;
      const v1 = v0 + 0.5;
      const width0 = 0.17 + (0.17 - 0.17) * v0;
      const width1 = 0.17 + (0.17 - 0.17) * v1;
      const width = (width0 + width1) * 0.5;
      const centerV = (v0 + v1) * 0.5;
      const pos = bladeLocalToRoot(0, centerV, angle);
      panelMatrix.compose(pos, quat, new THREE.Vector3(width, 0.49, 0.026));
      sail_panels.setMatrixAt(panelIndex++, panelMatrix);
    }
  }
  sail_panels.instanceMatrix.needsUpdate = true;
  rotor_group.add(sail_panels);

  const blade_spineGeom = new THREE.BoxGeometry(1, 1, 1);
  const blade_spines = new THREE.InstancedMesh(blade_spineGeom, frameMat, bladeCount);
  blade_spines.name = "blade_spines";
  const spineMatrix = new THREE.Matrix4();
  for (let b = 0; b < bladeCount; b++) {
    const angle = Math.PI / 4 + b * Math.PI / 2;
    const p1 = bladeLocalToRoot(0, 0.01, angle);
    const p2 = bladeLocalToRoot(0, bladeLength + 0.025, angle);
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    const dir = new THREE.Vector3().subVectors(p2, p1);
    const len = dir.length();
    dir.normalize();
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir
    );
    spineMatrix.compose(mid, quat, new THREE.Vector3(0.038, len, 0.04));
    blade_spines.setMatrixAt(b, spineMatrix);
  }
  blade_spines.instanceMatrix.needsUpdate = true;
  rotor_group.add(blade_spines);

  const crossbarCount = 9;
  const blade_crossbarGeom = new THREE.BoxGeometry(1, 1, 1);
  const blade_crossbars = new THREE.InstancedMesh(
    blade_crossbarGeom,
    frameMat,
    bladeCount * crossbarCount
  );
  blade_crossbars.name = "blade_crossbars";
  const crossbarMatrix = new THREE.Matrix4();
  let crossbarIndex = 0;
  for (let b = 0; b < bladeCount; b++) {
    const angle = Math.PI / 4 + b * Math.PI / 2;
    const quat = bladeLocalQuaternion(angle);
    for (let i = 0; i < crossbarCount; i++) {
      const v = 0.08 + i * 0.112;
      const width = 0.17 + (0.17 - 0.17) * v + 0.012;
      const pos = bladeLocalToRoot(0, v, angle);
      crossbarMatrix.compose(pos, quat, new THREE.Vector3(width, 0.022, 0.038));
      blade_crossbars.setMatrixAt(crossbarIndex++, crossbarMatrix);
    }
  }
  blade_crossbars.instanceMatrix.needsUpdate = true;
  rotor_group.add(blade_crossbars);

  const outer_railGeom = new THREE.BoxGeometry(1, 1, 1);
  const outer_rails = new THREE.InstancedMesh(outer_railGeom, frameMat, bladeCount * 2);
  outer_rails.name = "outer_rails";
  let railIndex = 0;
  for (let b = 0; b < bladeCount; b++) {
    const angle = Math.PI / 4 + b * Math.PI / 2;
    for (const u of [-0.158, 0.158]) {
      const p1 = bladeLocalToRoot(u, 0.02, angle);
      const p2 = bladeLocalToRoot(u, bladeLength, angle);
      setBeamInstance(outer_rails, railIndex++, p1, p2, 0.022);
    }
  }
  outer_rails.instanceMatrix.needsUpdate = true;
  rotor_group.add(outer_rails);

  const diagonal_stays = new THREE.InstancedMesh(outer_railGeom, frameMat, bladeCount * 2);
  diagonal_stays.name = "diagonal_stays";
  let stayIndex = 0;
  for (let b = 0; b < bladeCount; b++) {
    const angle = Math.PI / 4 + b * Math.PI / 2;
    const p1 = bladeLocalToRoot(-0.145, 0.04, angle);
    const p2 = bladeLocalToRoot(0.145, 0.50, angle);
    setBeamInstance(diagonal_stays, stayIndex++, p1, p2, 0.014);

    const p3 = bladeLocalToRoot(0.145, 0.50, angle);
    const p4 = bladeLocalToRoot(-0.145, 0.96, angle);
    setBeamInstance(diagonal_stays, stayIndex++, p3, p4, 0.014);
  }
  diagonal_stays.instanceMatrix.needsUpdate = true;
  rotor_group.add(diagonal_stays);

  const tip_capGeom = new THREE.SphereGeometry(0.018, 12, 8);
  const tip_caps = new THREE.InstancedMesh(tip_capGeom, hubMat, bladeCount * 3);
  tip_caps.name = "tip_caps";
  const tipMatrix = new THREE.Matrix4();
  let tipIndex = 0;
  for (let b = 0; b < bladeCount; b++) {
    const angle = Math.PI / 4 + b * Math.PI / 2;
    const endpoints = [
      bladeLocalToRoot(-0.158, bladeLength, angle),
      bladeLocalToRoot(0.158, bladeLength, angle),
      bladeLocalToRoot(0, bladeLength + 0.025, angle)
    ];
    for (const p of endpoints) {
      tipMatrix.compose(p, identityQuat, new THREE.Vector3(1, 1, 1));
      tip_caps.setMatrixAt(tipIndex++, tipMatrix);
    }
  }
  tip_caps.instanceMatrix.needsUpdate = true;
  rotor_group.add(tip_caps);

  const hub_backplateGeom = new THREE.CylinderGeometry(0.115, 0.115, 0.045, 32);
  const hub_backplate = new THREE.Mesh(hub_backplateGeom, darkWoodMat);
  hub_backplate.name = "hub_backplate";
  hub_backplate.rotation.x = Math.PI / 2;
  hub_backplate.position.set(0, hubY, 0.565);
  rotor_group.add(hub_backplate);

  const central_hubGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.10, 32);
  const central_hub = new THREE.Mesh(central_hubGeom, hubMat);
  central_hub.name = "central_hub";
  central_hub.rotation.x = Math.PI / 2;
  central_hub.position.set(0, hubY, hubZ);
  rotor_group.add(central_hub);

  const hub_boltGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.012, 12);
  const hub_bolts = new THREE.InstancedMesh(hub_boltGeom, darkWoodMat, 4);
  hub_bolts.name = "hub_bolts";
  const boltMatrix = new THREE.Matrix4();
  const boltQuat = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    Math.PI / 2
  );
  for (let i = 0; i < 4; i++) {
    const angle = i / 4 * Math.PI * 2 + Math.PI / 4;
    boltMatrix.compose(
      new THREE.Vector3(Math.cos(angle) * 0.055, hubY + Math.sin(angle) * 0.055, hubZ + 0.056),
      boltQuat,
      new THREE.Vector3(1, 1, 1)
    );
    hub_bolts.setMatrixAt(i, boltMatrix);
  }
  hub_bolts.instanceMatrix.needsUpdate = true;
  rotor_group.add(hub_bolts);

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
  const maxDim = Math.max(size.x, size.y, size.z);
  if (maxDim > 0) {
    const scale = 0.98 / maxDim;
    root.scale.setScalar(scale);
  }
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
