// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "glazed_fish_roll";

  const fish_roll = new THREE.Group();
  fish_roll.name = "fish_roll";
  root.add(fish_roll);

  const bodyW = 1.22;
  const bodyL = 2.02;
  const bodyH = 0.32;
  const topY = 0.235;

  const fish_fleshMat = new THREE.MeshStandardMaterial({
    color: 0xe8cbb5,
    metalness: 0.0,
    roughness: 0.7
  });
  const pale_fleshMat = new THREE.MeshStandardMaterial({
    color: 0xf3dfcd,
    metalness: 0.0,
    roughness: 0.7
  });
  const muscle_striationMat = new THREE.MeshStandardMaterial({
    color: 0xc99f8b,
    metalness: 0.0,
    roughness: 0.7
  });
  const skinMat = new THREE.MeshStandardMaterial({
    color: 0x20282d,
    metalness: 0.0,
    roughness: 0.3
  });
  const skin_ridgeMat = new THREE.MeshStandardMaterial({
    color: 0x465159,
    metalness: 0.0,
    roughness: 0.3
  });
  const sauceMat = new THREE.MeshStandardMaterial({
    color: 0x5b1f0d,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const amber_glazeMat = new THREE.MeshStandardMaterial({
    color: 0xa94d0b,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide
  });
  const glaze_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xd8b994,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.42,
    side: THREE.DoubleSide
  });
  const charMat = new THREE.MeshStandardMaterial({
    color: 0x26120b,
    metalness: 0.0,
    roughness: 0.7
  });
  const sesame_seedMat = new THREE.MeshStandardMaterial({
    color: 0xf2e5bd,
    metalness: 0.0,
    roughness: 0.7
  });
  const scallionMat = new THREE.MeshStandardMaterial({
    color: 0x65a91f,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const scallion_lightMat = new THREE.MeshStandardMaterial({
    color: 0x87bd31,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const scallion_cutMat = new THREE.MeshStandardMaterial({
    color: 0xa9c957,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const scallion_hollowMat = new THREE.MeshStandardMaterial({
    color: 0x26380d,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  function makeRoundedRectShape(width, length, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const z0 = -length / 2;
    const z1 = length / 2;

    shape.moveTo(x0 + radius, z0);
    shape.lineTo(x1 - radius, z0);
    shape.quadraticCurveTo(x1, z0, x1, z0 + radius);
    shape.lineTo(x1, z1 - radius);
    shape.quadraticCurveTo(x1, z1, x1 - radius, z1);
    shape.lineTo(x0 + radius, z1);
    shape.quadraticCurveTo(x0, z1, x0, z1 - radius);
    shape.lineTo(x0, z0 + radius);
    shape.quadraticCurveTo(x0, z0, x0 + radius, z0);
    return shape;
  }

  function makeHorizontalExtrude(shape, depth, bevelSize) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      bevelEnabled: bevelSize > 0,
      bevelThickness: bevelSize,
      bevelSize: bevelSize,
      bevelSegments: 2,
      curveSegments: 8
    });
    geometry.rotateX(Math.PI / 2);
    return geometry;
  }

  function makeOrganicSauceShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.56, -0.93);
    shape.bezierCurveTo(-0.25, -1.00, 0.22, -0.96, 0.55, -0.91);
    shape.bezierCurveTo(0.61, -0.72, 0.57, -0.49, 0.60, -0.27);
    shape.bezierCurveTo(0.63, -0.04, 0.56, 0.18, 0.59, 0.42);
    shape.bezierCurveTo(0.61, 0.65, 0.53, 0.84, 0.43, 0.91);
    shape.bezierCurveTo(0.15, 0.96, -0.12, 0.92, -0.38, 0.95);
    shape.bezierCurveTo(-0.55, 0.88, -0.59, 0.69, -0.57, 0.48);
    shape.bezierCurveTo(-0.61, 0.25, -0.55, 0.04, -0.59, -0.18);
    shape.bezierCurveTo(-0.63, -0.43, -0.55, -0.70, -0.56, -0.93);
    return shape;
  }

  const fish_bodyShape = makeRoundedRectShape(bodyW, bodyL, 0.13);
  const fish_bodyGeom = makeHorizontalExtrude(fish_bodyShape, bodyH, 0.025);
  const fish_body = new THREE.Mesh(fish_bodyGeom, fish_fleshMat);
  fish_body.name = "fish_body";
  fish_body.position.y = topY;
  fish_roll.add(fish_body);

  const bottom_glazeShape = makeRoundedRectShape(1.18, 1.96, 0.12);
  const bottom_glazeGeom = makeHorizontalExtrude(bottom_glazeShape, 0.035, 0.008);
  const bottom_glaze = new THREE.Mesh(bottom_glazeGeom, sauceMat);
  bottom_glaze.name = "bottom_glaze";
  bottom_glaze.position.y = -0.075;
  fish_roll.add(bottom_glaze);

  const skin_capShape = makeRoundedRectShape(1.20, 1.99, 0.12);
  const skin_capGeom = makeHorizontalExtrude(skin_capShape, 0.035, 0.008);
  const skin_cap = new THREE.Mesh(skin_capGeom, skinMat);
  skin_cap.name = "skin_cap";
  skin_cap.position.y = 0.268;
  fish_roll.add(skin_cap);

  const sauce_layerShape = makeOrganicSauceShape();
  const sauce_layerGeom = makeHorizontalExtrude(sauce_layerShape, 0.018, 0.006);
  const sauce_layer = new THREE.Mesh(sauce_layerGeom, sauceMat);
  sauce_layer.name = "sauce_layer";
  sauce_layer.position.y = 0.287;
  fish_roll.add(sauce_layer);

  const amber_glazeShape = makeOrganicSauceShape();
  const amber_glazeGeom = new THREE.ShapeGeometry(amber_glazeShape, 8);
  amber_glazeGeom.rotateX(-Math.PI / 2);
  const amber_glaze = new THREE.Mesh(amber_glazeGeom, amber_glazeMat);
  amber_glaze.name = "amber_glaze";
  amber_glaze.position.set(-0.025, 0.292, 0.015);
  amber_glaze.scale.set(0.91, 1, 0.90);
  fish_roll.add(amber_glaze);

  const skin_ridgeGeom = new THREE.BoxGeometry(0.012, 0.006, 1.70);
  const skin_ridges = new THREE.InstancedMesh(skin_ridgeGeom, skin_ridgeMat, 11);
  skin_ridges.name = "skin_ridges";
  const skin_ridge_dummy = new THREE.Object3D();
  for (let i = 0; i < 11; i++) {
    const x = -0.49 + i * 0.098;
    skin_ridge_dummy.position.set(x, 0.277, -0.025);
    skin_ridge_dummy.rotation.set(0, (i % 3 - 1) * 0.012, 0);
    skin_ridge_dummy.scale.set(1, 1, 0.92 + (i % 4) * 0.025);
    skin_ridge_dummy.updateMatrix();
    skin_ridges.setMatrixAt(i, skin_ridge_dummy.matrix);
  }
  skin_ridges.instanceMatrix.needsUpdate = true;
  fish_roll.add(skin_ridges);

  const side_muscle_striationGeom = new THREE.BoxGeometry(0.009, 0.205, 0.014);
  const side_muscle_striations = new THREE.InstancedMesh(
    side_muscle_striationGeom,
    muscle_striationMat,
    24
  );
  side_muscle_striations.name = "side_muscle_striations";
  const side_striation_dummy = new THREE.Object3D();
  let side_striation_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 12; i++) {
      side_striation_dummy.position.set(
        side * (bodyW / 2 + 0.012),
        0.055,
        -0.82 + i * 0.149
      );
      side_striation_dummy.rotation.set((i % 3 - 1) * 0.075, 0, 0);
      side_striation_dummy.scale.set(1, 0.88 + (i % 4) * 0.045, 1);
      side_striation_dummy.updateMatrix();
      side_muscle_striations.setMatrixAt(side_striation_index++, side_striation_dummy.matrix);
    }
  }
  side_muscle_striations.instanceMatrix.needsUpdate = true;
  fish_roll.add(side_muscle_striations);

  const end_muscle_striationGeom = new THREE.BoxGeometry(0.014, 0.19, 0.009);
  const end_muscle_striations = new THREE.InstancedMesh(
    end_muscle_striationGeom,
    muscle_striationMat,
    18
  );
  end_muscle_striations.name = "end_muscle_striations";
  const end_striation_dummy = new THREE.Object3D();
  let end_striation_index = 0;
  for (const end of [-1, 1]) {
    for (let i = 0; i < 9; i++) {
      end_striation_dummy.position.set(
        -0.45 + i * 0.1125,
        0.055,
        end * (bodyL / 2 + 0.012)
      );
      end_striation_dummy.rotation.set(0, 0, (i % 3 - 1) * 0.07);
      end_striation_dummy.scale.set(1, 0.9 + (i % 3) * 0.05, 1);
      end_striation_dummy.updateMatrix();
      end_muscle_striations.setMatrixAt(end_striation_index++, end_striation_dummy.matrix);
    }
  }
  end_muscle_striations.instanceMatrix.needsUpdate = true;
  fish_roll.add(end_muscle_striations);

  const roll_slice = new THREE.Group();
  roll_slice.name = "roll_slice";
  roll_slice.position.set(0.23, 0.055, bodyL / 2 + 0.016);
  fish_roll.add(roll_slice);

  const roll_cross_sectionGeom = new THREE.CylinderGeometry(0.225, 0.225, 0.035, 40);
  const roll_cross_section = new THREE.Mesh(roll_cross_sectionGeom, pale_fleshMat);
  roll_cross_section.name = "roll_cross_section";
  roll_cross_section.rotation.x = Math.PI / 2;
  roll_slice.add(roll_cross_section);

  const roll_inner_fleshGeom = new THREE.CylinderGeometry(0.178, 0.178, 0.012, 36);
  const roll_inner_flesh = new THREE.Mesh(roll_inner_fleshGeom, fish_fleshMat);
  roll_inner_flesh.name = "roll_inner_flesh";
  roll_inner_flesh.rotation.x = Math.PI / 2;
  roll_inner_flesh.position.z = 0.021;
  roll_slice.add(roll_inner_flesh);

  const roll_outer_ringGeom = new THREE.TorusGeometry(0.198, 0.014, 8, 40);
  const roll_outer_ring = new THREE.Mesh(roll_outer_ringGeom, muscle_striationMat);
  roll_outer_ring.name = "roll_outer_ring";
  roll_outer_ring.position.z = 0.031;
  roll_slice.add(roll_outer_ring);

  const roll_inner_ringGeom = new THREE.TorusGeometry(0.118, 0.009, 8, 36);
  const roll_inner_ring = new THREE.Mesh(roll_inner_ringGeom, muscle_striationMat);
  roll_inner_ring.name = "roll_inner_ring";
  roll_inner_ring.position.set(0.012, -0.006, 0.033);
  roll_slice.add(roll_inner_ring);

  const roll_spiral_points = [];
  for (let i = 0; i <= 28; i++) {
    const t = i / 28;
    const angle = t * Math.PI * 3.45;
    const radius = 0.025 + t * 0.135;
    roll_spiral_points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius + 0.012,
        Math.sin(angle) * radius - 0.006,
        0.039
      )
    );
  }
  const roll_spiralCurve = new THREE.CatmullRomCurve3(
    roll_spiral_points,
    false,
    "centripetal"
  );
  const roll_spiralGeom = new THREE.TubeGeometry(
    roll_spiralCurve,
    48,
    0.008,
    7,
    false
  );
  const roll_spiral = new THREE.Mesh(roll_spiralGeom, muscle_striationMat);
  roll_spiral.name = "roll_spiral";
  roll_slice.add(roll_spiral);

  const roll_centerGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.012, 18);
  const roll_center = new THREE.Mesh(roll_centerGeom, muscle_striationMat);
  roll_center.name = "roll_center";
  roll_center.rotation.x = Math.PI / 2;
  roll_center.position.set(0.012, -0.006, 0.041);
  roll_slice.add(roll_center);

  const glaze_patchGeom = new THREE.CircleGeometry(0.12, 24);
  const glaze_patches = new THREE.InstancedMesh(glaze_patchGeom, amber_glazeMat, 7);
  glaze_patches.name = "glaze_patches";
  const glaze_patch_data = [
    [-0.38, -0.67, 1.35, 0.55, 0.20],
    [0.31, -0.58, 0.95, 0.42, -0.35],
    [-0.43, -0.18, 0.82, 0.38, 0.55],
    [0.39, -0.05, 1.10, 0.48, -0.15],
    [-0.34, 0.37, 1.25, 0.52, -0.42],
    [0.34, 0.55, 0.92, 0.40, 0.30],
    [-0.08, 0.78, 1.45, 0.46, -0.08]
  ];
  const glaze_patch_dummy = new THREE.Object3D();
  for (let i = 0; i < glaze_patch_data.length; i++) {
    const patch = glaze_patch_data[i];
    glaze_patch_dummy.position.set(patch[0], 0.296, patch[1]);
    glaze_patch_dummy.rotation.set(-Math.PI / 2, 0, patch[4]);
    glaze_patch_dummy.scale.set(patch[2], patch[3], 1);
    glaze_patch_dummy.updateMatrix();
    glaze_patches.setMatrixAt(i, glaze_patch_dummy.matrix);
  }
  glaze_patches.instanceMatrix.needsUpdate = true;
  fish_roll.add(glaze_patches);

  const glaze_highlights = new THREE.InstancedMesh(
    glaze_patchGeom,
    glaze_highlightMat,
    5
  );
  glaze_highlights.name = "glaze_highlights";
  const glaze_highlight_data = [
    [-0.23, -0.52, 1.55, 0.16, 0.12],
    [0.18, -0.31, 1.10, 0.13, -0.28],
    [-0.39, 0.12, 1.20, 0.14, 0.42],
    [0.25, 0.32, 1.45, 0.15, -0.18],
    [-0.12, 0.67, 1.05, 0.12, 0.25]
  ];
  const glaze_highlight_dummy = new THREE.Object3D();
  for (let i = 0; i < glaze_highlight_data.length; i++) {
    const patch = glaze_highlight_data[i];
    glaze_highlight_dummy.position.set(patch[0], 0.299, patch[1]);
    glaze_highlight_dummy.rotation.set(-Math.PI / 2, 0, patch[4]);
    glaze_highlight_dummy.scale.set(patch[2], patch[3], 1);
    glaze_highlight_dummy.updateMatrix();
    glaze_highlights.setMatrixAt(i, glaze_highlight_dummy.matrix);
  }
  glaze_highlights.instanceMatrix.needsUpdate = true;
  fish_roll.add(glaze_highlights);

  const char_spotGeom = new THREE.SphereGeometry(0.018, 10, 6);
  const char_spots = new THREE.InstancedMesh(char_spotGeom, charMat, 12);
  char_spots.name = "char_spots";
  const char_spot_data = [
    [-0.43, -0.72, 1.0],
    [0.38, -0.63, 0.7],
    [-0.50, -0.28, 0.8],
    [0.47, -0.17, 0.65],
    [-0.34, 0.02, 0.75],
    [0.31, 0.12, 0.9],
    [-0.48, 0.34, 0.7],
    [0.43, 0.43, 0.8],
    [-0.22, 0.62, 0.65],
    [0.16, 0.74, 0.75],
    [-0.04, -0.82, 0.6],
    [0.02, 0.84, 0.55]
  ];
  const char_spot_dummy = new THREE.Object3D();
  for (let i = 0; i < char_spot_data.length; i++) {
    const spot = char_spot_data[i];
    char_spot_dummy.position.set(spot[0], 0.301, spot[1]);
    char_spot_dummy.rotation.set(0, i * 0.47, 0);
    char_spot_dummy.scale.set(spot[2], 0.18, spot[2] * 0.72);
    char_spot_dummy.updateMatrix();
    char_spots.setMatrixAt(i, char_spot_dummy.matrix);
  }
  char_spots.instanceMatrix.needsUpdate = true;
  fish_roll.add(char_spots);

  const sesame_seedGeom = new THREE.SphereGeometry(0.035, 12, 8);
  const sesame_seeds = new THREE.InstancedMesh(sesame_seedGeom, sesame_seedMat, 38);
  sesame_seeds.name = "sesame_seeds";
  const sesame_seed_dummy = new THREE.Object3D();
  for (let i = 0; i < 38; i++) {
    const u = ((i * 37 + 11) % 101) / 100;
    const v = ((i * 53 + 17) % 103) / 102;
    const x = (u - 0.5) * 1.02;
    const z = (v - 0.5) * 1.72 - 0.02;
    const angle = i * 2.399963229728653;
    const scale = 0.82 + (i % 5) * 0.045;
    sesame_seed_dummy.position.set(x, 0.313, z);
    sesame_seed_dummy.rotation.set(0, angle, 0);
    sesame_seed_dummy.scale.set(1.35 * scale, 0.25 * scale, 0.62 * scale);
    sesame_seed_dummy.updateMatrix();
    sesame_seeds.setMatrixAt(i, sesame_seed_dummy.matrix);
  }
  sesame_seeds.instanceMatrix.needsUpdate = true;
  fish_roll.add(sesame_seeds);

  const scallion_scatterGeom = new THREE.SphereGeometry(0.045, 12, 8);
  const scallion_scatter = new THREE.InstancedMesh(
    scallion_scatterGeom,
    scallion_cutMat,
    8
  );
  scallion_scatter.name = "scallion_scatter";
  const scallion_scatter_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = i * 2.17 + 0.3;
    const radius = 0.28 + (i % 3) * 0.055;
    scallion_scatter_dummy.position.set(
      Math.cos(angle) * radius,
      0.314,
      Math.sin(angle) * radius * 1.15 + 0.02
    );
    scallion_scatter_dummy.rotation.set(0, angle, 0);
    scallion_scatter_dummy.scale.set(1.15, 0.22, 0.68);
    scallion_scatter_dummy.updateMatrix();
    scallion_scatter.setMatrixAt(i, scallion_scatter_dummy.matrix);
  }
  scallion_scatter.instanceMatrix.needsUpdate = true;
  fish_roll.add(scallion_scatter);

  const scallion_garnish = new THREE.Group();
  scallion_garnish.name = "scallion_garnish";
  scallion_garnish.position.z = 0.02;
  fish_roll.add(scallion_garnish);

  const scallion_ringGeom = new THREE.TorusGeometry(0.075, 0.017, 8, 28);
  const scallion_rings = new THREE.InstancedMesh(scallion_ringGeom, scallionMat, 10);
  scallion_rings.name = "scallion_rings";
  const scallion_ring_data = [
    [-0.13, 0.345, 0.04, -1.52, 0.10, 1.00],
    [0.12, 0.350, 0.07, -1.25, -0.12, 0.95],
    [-0.24, 0.340, -0.05, -1.70, 0.16, 0.90],
    [0.24, 0.342, -0.04, -1.05, 0.12, 0.92],
    [-0.04, 0.365, -0.12, -1.42, -0.18, 1.05],
    [0.03, 0.390, 0.00, -1.58, 0.08, 0.92],
    [-0.16, 0.405, -0.06, -1.22, 0.15, 0.86],
    [0.17, 0.402, 0.02, -1.73, -0.10, 0.88],
    [-0.02, 0.445, -0.04, -1.48, 0.12, 0.82],
    [0.28, 0.335, 0.13, -1.12, 0.16, 0.80]
  ];
  const scallion_ring_dummy = new THREE.Object3D();
  for (let i = 0; i < scallion_ring_data.length; i++) {
    const ring = scallion_ring_data[i];
    scallion_ring_dummy.position.set(ring[0], ring[1], ring[2]);
    scallion_ring_dummy.rotation.set(ring[3], ring[4], i * 0.31);
    scallion_ring_dummy.scale.setScalar(ring[5]);
    scallion_ring_dummy.updateMatrix();
    scallion_rings.setMatrixAt(i, scallion_ring_dummy.matrix);
  }
  scallion_rings.instanceMatrix.needsUpdate = true;
  scallion_garnish.add(scallion_rings);

  const scallion_hollowGeom = new THREE.CircleGeometry(0.052, 24);
  const scallion_hollows = new THREE.InstancedMesh(
    scallion_hollowGeom,
    scallion_hollowMat,
    5
  );
  scallion_hollows.name = "scallion_hollows";
  const scallion_hollow_data = [
    [-0.13, 0.344, 0.04, -1.52, 0.10],
    [0.12, 0.349, 0.07, -1.25, -0.12],
    [-0.24, 0.339, -0.05, -1.70, 0.16],
    [0.24, 0.341, -0.04, -1.05, 0.12],
    [-0.04, 0.364, -0.12, -1.42, -0.18]
  ];
  const scallion_hollow_dummy = new THREE.Object3D();
  for (let i = 0; i < scallion_hollow_data.length; i++) {
    const hollow = scallion_hollow_data[i];
    scallion_hollow_dummy.position.set(hollow[0], hollow[1], hollow[2]);
    scallion_hollow_dummy.rotation.set(hollow[3], hollow[4], i * 0.31);
    scallion_hollow_dummy.scale.setScalar(0.95);
    scallion_hollow_dummy.updateMatrix();
    scallion_hollows.setMatrixAt(i, scallion_hollow_dummy.matrix);
  }
  scallion_hollows.instanceMatrix.needsUpdate = true;
  scallion_garnish.add(scallion_hollows);

  const scallion_ribbonShape = new THREE.Shape();
  scallion_ribbonShape.moveTo(-0.12, -0.035);
  scallion_ribbonShape.bezierCurveTo(-0.04, -0.075, 0.07, -0.055, 0.13, -0.015);
  scallion_ribbonShape.lineTo(0.11, 0.045);
  scallion_ribbonShape.bezierCurveTo(0.02, 0.075, -0.07, 0.060, -0.12, 0.035);
  scallion_ribbonShape.closePath();

  const scallion_ribbonGeom = new THREE.ExtrudeGeometry(scallion_ribbonShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
    curveSegments: 8
  });

  const scallion_ribbon_a = new THREE.Mesh(scallion_ribbonGeom, scallion_lightMat);
  scallion_ribbon_a.name = "scallion_ribbon_a";
  scallion_ribbon_a.position.set(-0.035, 0.405, -0.075);
  scallion_ribbon_a.rotation.set(-1.18, 0.28, 0.18);
  scallion_garnish.add(scallion_ribbon_a);

  const scallion_ribbon_b = new THREE.Mesh(scallion_ribbonGeom, scallionMat);
  scallion_ribbon_b.name = "scallion_ribbon_b";
  scallion_ribbon_b.position.set(0.055, 0.425, -0.015);
  scallion_ribbon_b.rotation.set(-1.42, -0.38, -0.22);
  scallion_ribbon_b.scale.set(0.92, 0.92, 0.92);
  scallion_garnish.add(scallion_ribbon_b);

  const scallion_ribbon_c = new THREE.Mesh(scallion_ribbonGeom, scallion_lightMat);
  scallion_ribbon_c.name = "scallion_ribbon_c";
  scallion_ribbon_c.position.set(-0.085, 0.445, 0.015);
  scallion_ribbon_c.rotation.set(-1.02, 0.62, 0.30);
  scallion_ribbon_c.scale.set(0.82, 0.82, 0.82);
  scallion_garnish.add(scallion_ribbon_c);

  const scallion_ribbon_d = new THREE.Mesh(scallion_ribbonGeom, scallionMat);
  scallion_ribbon_d.name = "scallion_ribbon_d";
  scallion_ribbon_d.position.set(0.105, 0.390, 0.075);
  scallion_ribbon_d.rotation.set(-1.56, -0.58, 0.16);
  scallion_ribbon_d.scale.set(0.78, 0.78, 0.78);
  scallion_garnish.add(scallion_ribbon_d);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}