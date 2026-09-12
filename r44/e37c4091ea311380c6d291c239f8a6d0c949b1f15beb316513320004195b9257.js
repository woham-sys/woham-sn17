// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cheese_block";

  const blockW = 1.20;
  const blockH = 0.82;
  const blockD = 0.90;
  const cornerR = 0.13;
  const bevelSize = 0.045;
  const bevelThickness = 0.045;

  const halfW = blockW / 2;
  const halfH = blockH / 2;
  const halfD = blockD / 2;
  const frontZ = halfD + bevelThickness;
  const sideX = halfW + bevelSize;
  const topY = halfH + bevelSize;

  const cheese_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xd99a55,
    metalness: 0.0,
    roughness: 0.7
  });

  const cheese_bodyShape = new THREE.Shape();
  cheese_bodyShape.moveTo(-halfW + cornerR, -halfH);
  cheese_bodyShape.lineTo(halfW - cornerR, -halfH);
  cheese_bodyShape.quadraticCurveTo(halfW, -halfH, halfW, -halfH + cornerR);
  cheese_bodyShape.lineTo(halfW, halfH - cornerR);
  cheese_bodyShape.quadraticCurveTo(halfW, halfH, halfW - cornerR, halfH);
  cheese_bodyShape.lineTo(-halfW + cornerR, halfH);
  cheese_bodyShape.quadraticCurveTo(-halfW, halfH, -halfW, halfH - cornerR);
  cheese_bodyShape.lineTo(-halfW, -halfH + cornerR);
  cheese_bodyShape.quadraticCurveTo(-halfW, -halfH, -halfW + cornerR, -halfH);

  const cheese_bodyGeom = new THREE.ExtrudeGeometry(cheese_bodyShape, {
    depth: blockD,
    steps: 1,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness,
    bevelSize,
    bevelSegments: 5
  });
  cheese_bodyGeom.translate(0, 0, -halfD);

  const cheese_body = new THREE.Mesh(cheese_bodyGeom, cheese_bodyMat);
  cheese_body.name = "cheese_body";
  root.add(cheese_body);

  const front_cut_faceMat = new THREE.MeshStandardMaterial({
    color: 0xf1c77e,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });

  const front_cut_faceShape = new THREE.Shape();
  front_cut_faceShape.moveTo(-0.50, -0.355);
  front_cut_faceShape.lineTo(-0.31, -0.36);
  front_cut_faceShape.lineTo(-0.25, -0.382);
  front_cut_faceShape.lineTo(-0.17, -0.368);
  front_cut_faceShape.lineTo(0.08, -0.37);
  front_cut_faceShape.lineTo(0.16, -0.384);
  front_cut_faceShape.lineTo(0.27, -0.365);
  front_cut_faceShape.lineTo(0.50, -0.355);
  front_cut_faceShape.quadraticCurveTo(0.565, -0.34, 0.565, -0.27);
  front_cut_faceShape.lineTo(0.565, 0.27);
  front_cut_faceShape.quadraticCurveTo(0.565, 0.34, 0.50, 0.355);
  front_cut_faceShape.lineTo(-0.50, 0.355);
  front_cut_faceShape.quadraticCurveTo(-0.565, 0.34, -0.565, 0.27);
  front_cut_faceShape.lineTo(-0.565, -0.27);
  front_cut_faceShape.quadraticCurveTo(-0.565, -0.34, -0.50, -0.355);

  const front_cut_faceGeom = new THREE.ShapeGeometry(front_cut_faceShape, 10);
  const front_cut_face = new THREE.Mesh(front_cut_faceGeom, front_cut_faceMat);
  front_cut_face.name = "front_cut_face";
  front_cut_face.position.z = frontZ + 0.002;
  root.add(front_cut_face);

  const front_hole_data = [
    [-0.34, 0.035, 0.046, 0.052, -0.20],
    [0.045, 0.205, 0.012, 0.016, 0.20],
    [-0.085, -0.035, 0.013, 0.017, -0.40],
    [0.245, -0.085, 0.019, 0.026, 0.15],
    [0.385, 0.145, 0.011, 0.017, -0.20],
    [-0.285, -0.205, 0.010, 0.014, 0.30],
    [0.105, -0.245, 0.017, 0.021, -0.30],
    [0.445, -0.205, 0.009, 0.013, 0.10],
    [-0.455, 0.235, 0.008, 0.012, -0.10],
    [0.155, 0.035, 0.008, 0.011, 0.40],
    [-0.165, 0.275, 0.007, 0.010, 0.00],
    [0.315, 0.285, 0.007, 0.011, -0.30],
    [-0.475, -0.105, 0.007, 0.010, 0.20]
  ];

  const front_holesMat = new THREE.MeshStandardMaterial({
    color: 0xa96324,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const front_holesGeom = new THREE.CircleGeometry(1, 18);
  const front_holes = new THREE.InstancedMesh(
    front_holesGeom,
    front_holesMat,
    front_hole_data.length
  );
  front_holes.name = "front_holes";

  const front_hole_depthsMat = new THREE.MeshStandardMaterial({
    color: 0x854516,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const front_hole_depthsGeom = new THREE.CircleGeometry(1, 18);
  const front_hole_depths = new THREE.InstancedMesh(
    front_hole_depthsGeom,
    front_hole_depthsMat,
    front_hole_data.length
  );
  front_hole_depths.name = "front_hole_depths";

  const front_hole_rimsMat = new THREE.MeshStandardMaterial({
    color: 0xf7d795,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const front_hole_rimsGeom = new THREE.RingGeometry(0.72, 1, 18);
  const front_hole_rims = new THREE.InstancedMesh(
    front_hole_rimsGeom,
    front_hole_rimsMat,
    front_hole_data.length
  );
  front_hole_rims.name = "front_hole_rims";

  const front_dummy = new THREE.Object3D();
  for (let i = 0; i < front_hole_data.length; i++) {
    const hole = front_hole_data[i];

    front_dummy.position.set(hole[0], hole[1], frontZ + 0.006);
    front_dummy.rotation.set(0, 0, hole[4]);
    front_dummy.scale.set(hole[2], hole[3], 1);
    front_dummy.updateMatrix();
    front_holes.setMatrixAt(i, front_dummy.matrix);

    front_dummy.position.set(
      hole[0] + hole[2] * 0.16,
      hole[1] - hole[3] * 0.14,
      frontZ + 0.007
    );
    front_dummy.rotation.set(0, 0, hole[4]);
    front_dummy.scale.set(hole[2] * 0.56, hole[3] * 0.56, 1);
    front_dummy.updateMatrix();
    front_hole_depths.setMatrixAt(i, front_dummy.matrix);

    front_dummy.position.set(hole[0], hole[1], frontZ + 0.008);
    front_dummy.rotation.set(0, 0, hole[4]);
    front_dummy.scale.set(hole[2] * 1.18, hole[3] * 1.18, 1);
    front_dummy.updateMatrix();
    front_hole_rims.setMatrixAt(i, front_dummy.matrix);
  }
  front_holes.instanceMatrix.needsUpdate = true;
  front_hole_depths.instanceMatrix.needsUpdate = true;
  front_hole_rims.instanceMatrix.needsUpdate = true;
  root.add(front_hole_rims, front_holes, front_hole_depths);

  const side_hole_data = [
    [0.28, 0.14, 0.012, 0.018, -0.30],
    [0.17, 0.25, 0.009, 0.014, 0.20],
    [0.05, 0.08, 0.018, 0.026, -0.10],
    [-0.08, 0.18, 0.010, 0.016, 0.35],
    [-0.20, 0.02, 0.012, 0.019, -0.20],
    [-0.30, -0.14, 0.023, 0.034, 0.10],
    [-0.12, -0.25, 0.010, 0.015, -0.30],
    [0.12, -0.18, 0.008, 0.013, 0.20],
    [0.34, -0.05, 0.007, 0.012, -0.10],
    [-0.36, 0.23, 0.007, 0.011, 0.30],
    [0.02, -0.02, 0.007, 0.011, -0.20],
    [0.23, 0.31, 0.006, 0.010, 0.10]
  ];

  const side_holesMat = front_holesMat;
  const side_holesGeom = front_holesGeom;
  const side_holes = new THREE.InstancedMesh(
    side_holesGeom,
    side_holesMat,
    side_hole_data.length
  );
  side_holes.name = "side_holes";

  const side_hole_depthsMat = front_hole_depthsMat;
  const side_hole_depthsGeom = front_hole_depthsGeom;
  const side_hole_depths = new THREE.InstancedMesh(
    side_hole_depthsGeom,
    side_hole_depthsMat,
    side_hole_data.length
  );
  side_hole_depths.name = "side_hole_depths";

  const side_hole_rimsMat = front_hole_rimsMat;
  const side_hole_rimsGeom = front_hole_rimsGeom;
  const side_hole_rims = new THREE.InstancedMesh(
    side_hole_rimsGeom,
    side_hole_rimsMat,
    side_hole_data.length
  );
  side_hole_rims.name = "side_hole_rims";

  const side_quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(1, 0, 0)
  );
  const side_dummy = new THREE.Object3D();

  for (let i = 0; i < side_hole_data.length; i++) {
    const hole = side_hole_data[i];

    side_dummy.position.set(sideX + 0.004, hole[1], hole[0]);
    side_dummy.quaternion.copy(side_quaternion);
    side_dummy.rotateZ(hole[4]);
    side_dummy.scale.set(hole[2], hole[3], 1);
    side_dummy.updateMatrix();
    side_holes.setMatrixAt(i, side_dummy.matrix);

    side_dummy.position.set(sideX + 0.005, hole[1] - hole[3] * 0.12, hole[0]);
    side_dummy.quaternion.copy(side_quaternion);
    side_dummy.rotateZ(hole[4]);
    side_dummy.scale.set(hole[2] * 0.55, hole[3] * 0.55, 1);
    side_dummy.updateMatrix();
    side_hole_depths.setMatrixAt(i, side_dummy.matrix);

    side_dummy.position.set(sideX + 0.006, hole[1], hole[0]);
    side_dummy.quaternion.copy(side_quaternion);
    side_dummy.rotateZ(hole[4]);
    side_dummy.scale.set(hole[2] * 1.18, hole[3] * 1.18, 1);
    side_dummy.updateMatrix();
    side_hole_rims.setMatrixAt(i, side_dummy.matrix);
  }
  side_holes.instanceMatrix.needsUpdate = true;
  side_hole_depths.instanceMatrix.needsUpdate = true;
  side_hole_rims.instanceMatrix.needsUpdate = true;
  root.add(side_hole_rims, side_holes, side_hole_depths);

  const top_hole_data = [
    [-0.25, 0.08, 0.010, 0.014, 0.20],
    [0.08, -0.02, 0.008, 0.011, -0.30],
    [0.31, 0.15, 0.007, 0.010, 0.10],
    [-0.40, -0.16, 0.006, 0.009, -0.20],
    [0.20, -0.23, 0.006, 0.009, 0.30],
    [-0.08, 0.25, 0.005, 0.008, 0.00]
  ];

  const top_holesMat = front_holesMat;
  const top_holesGeom = front_holesGeom;
  const top_holes = new THREE.InstancedMesh(
    top_holesGeom,
    top_holesMat,
    top_hole_data.length
  );
  top_holes.name = "top_holes";

  const top_quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 1, 0)
  );
  const top_dummy = new THREE.Object3D();

  for (let i = 0; i < top_hole_data.length; i++) {
    const hole = top_hole_data[i];
    top_dummy.position.set(hole[0], topY + 0.003, hole[1]);
    top_dummy.quaternion.copy(top_quaternion);
    top_dummy.rotateZ(hole[4]);
    top_dummy.scale.set(hole[2], hole[3], 1);
    top_dummy.updateMatrix();
    top_holes.setMatrixAt(i, top_dummy.matrix);
  }
  top_holes.instanceMatrix.needsUpdate = true;
  root.add(top_holes);

  const surface_pitsMat = new THREE.MeshStandardMaterial({
    color: 0xb97332,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const surface_pitsGeom = new THREE.CircleGeometry(1, 10);
  const surface_pits = new THREE.InstancedMesh(
    surface_pitsGeom,
    surface_pitsMat,
    36
  );
  surface_pits.name = "surface_pits";

  const pit_dummy = new THREE.Object3D();
  let pit_index = 0;

  for (let i = 0; i < 18; i++) {
    const x = -0.47 + (((i * 7) % 19) / 18) * 0.94;
    const y = -0.29 + (((i * 11) % 19) / 18) * 0.58;
    const radius = 0.0028 + (i % 4) * 0.0011;
    pit_dummy.position.set(x, y, frontZ + 0.009);
    pit_dummy.rotation.set(0, 0, i * 0.37);
    pit_dummy.scale.set(radius * (1 + (i % 3) * 0.25), radius, 1);
    pit_dummy.updateMatrix();
    surface_pits.setMatrixAt(pit_index++, pit_dummy.matrix);
  }

  for (let i = 0; i < 12; i++) {
    const z = -0.35 + (((i * 5) % 13) / 12) * 0.70;
    const y = -0.29 + (((i * 7) % 13) / 12) * 0.58;
    const radius = 0.0028 + (i % 4) * 0.001;
    pit_dummy.position.set(sideX + 0.007, y, z);
    pit_dummy.quaternion.copy(side_quaternion);
    pit_dummy.rotateZ(i * 0.41);
    pit_dummy.scale.set(radius * 1.25, radius, 1);
    pit_dummy.updateMatrix();
    surface_pits.setMatrixAt(pit_index++, pit_dummy.matrix);
  }

  for (let i = 0; i < 6; i++) {
    const x = -0.42 + (((i * 5) % 7) / 6) * 0.84;
    const z = -0.32 + (((i * 3) % 7) / 6) * 0.64;
    const radius = 0.0028 + (i % 3) * 0.001;
    pit_dummy.position.set(x, topY + 0.005, z);
    pit_dummy.quaternion.copy(top_quaternion);
    pit_dummy.rotateZ(i * 0.43);
    pit_dummy.scale.set(radius * 1.25, radius, 1);
    pit_dummy.updateMatrix();
    surface_pits.setMatrixAt(pit_index++, pit_dummy.matrix);
  }
  surface_pits.instanceMatrix.needsUpdate = true;
  root.add(surface_pits);

  const powder_specksMat = new THREE.MeshStandardMaterial({
    color: 0xffe8bd,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const powder_specksGeom = new THREE.CircleGeometry(1, 8);
  const powder_specks = new THREE.InstancedMesh(
    powder_specksGeom,
    powder_specksMat,
    54
  );
  powder_specks.name = "powder_specks";

  const speck_dummy = new THREE.Object3D();
  let speck_index = 0;

  for (let i = 0; i < 24; i++) {
    const x = -0.49 + (((i * 11) % 25) / 24) * 0.98;
    const y = -0.31 + (((i * 13) % 25) / 24) * 0.62;
    const radius = 0.0035 + (i % 5) * 0.0012;
    speck_dummy.position.set(x, y, frontZ + 0.010);
    speck_dummy.rotation.set(0, 0, i * 0.51);
    speck_dummy.scale.set(radius * (1.1 + (i % 3) * 0.35), radius, 1);
    speck_dummy.updateMatrix();
    powder_specks.setMatrixAt(speck_index++, speck_dummy.matrix);
  }

  for (let i = 0; i < 18; i++) {
    const z = -0.37 + (((i * 7) % 19) / 18) * 0.74;
    const y = -0.31 + (((i * 9) % 19) / 18) * 0.62;
    const radius = 0.0035 + (i % 5) * 0.0011;
    speck_dummy.position.set(sideX + 0.008, y, z);
    speck_dummy.quaternion.copy(side_quaternion);
    speck_dummy.rotateZ(i * 0.47);
    speck_dummy.scale.set(radius * 1.35, radius, 1);
    speck_dummy.updateMatrix();
    powder_specks.setMatrixAt(speck_index++, speck_dummy.matrix);
  }

  for (let i = 0; i < 12; i++) {
    const x = -0.45 + (((i * 5) % 13) / 12) * 0.90;
    const z = -0.34 + (((i * 7) % 13) / 12) * 0.68;
    const radius = 0.0035 + (i % 4) * 0.0011;
    speck_dummy.position.set(x, topY + 0.006, z);
    speck_dummy.quaternion.copy(top_quaternion);
    speck_dummy.rotateZ(i * 0.49);
    speck_dummy.scale.set(radius * 1.4, radius, 1);
    speck_dummy.updateMatrix();
    powder_specks.setMatrixAt(speck_index++, speck_dummy.matrix);
  }
  powder_specks.instanceMatrix.needsUpdate = true;
  root.add(powder_specks);

  const side_scrape_data = [
    [-0.29, 0.17, 0.055, 0.004, -0.70],
    [-0.18, 0.08, 0.043, 0.004, -0.55],
    [-0.06, 0.20, 0.035, 0.0035, -0.80],
    [0.08, 0.12, 0.048, 0.0035, -0.60],
    [0.20, 0.02, 0.038, 0.0035, -0.75],
    [0.30, -0.10, 0.032, 0.003, -0.50],
    [-0.34, -0.04, 0.028, 0.003, -0.65],
    [0.02, -0.18, 0.030, 0.003, -0.45]
  ];

  const side_scrapesMat = new THREE.MeshStandardMaterial({
    color: 0x9d5723,
    metalness: 0.0,
    roughness: 0.7
  });
  const side_scrapesGeom = new THREE.BoxGeometry(0.004, 1, 1);
  const side_scrapes = new THREE.InstancedMesh(
    side_scrapesGeom,
    side_scrapesMat,
    side_scrape_data.length
  );
  side_scrapes.name = "side_scrapes";

  const scrape_dummy = new THREE.Object3D();
  for (let i = 0; i < side_scrape_data.length; i++) {
    const scrape = side_scrape_data[i];
    scrape_dummy.position.set(sideX + 0.006, scrape[1], scrape[0]);
    scrape_dummy.rotation.set(scrape[4], 0, 0);
    scrape_dummy.scale.set(1, scrape[2], scrape[3]);
    scrape_dummy.updateMatrix();
    side_scrapes.setMatrixAt(i, scrape_dummy.matrix);
  }
  side_scrapes.instanceMatrix.needsUpdate = true;
  root.add(side_scrapes);

  const wax_flakesMat = new THREE.MeshStandardMaterial({
    color: 0xffe4b5,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const wax_flakesGeom = new THREE.CircleGeometry(1, 10);
  const wax_flakes = new THREE.InstancedMesh(
    wax_flakesGeom,
    wax_flakesMat,
    18
  );
  wax_flakes.name = "wax_flakes";

  const flake_dummy = new THREE.Object3D();
  let flake_index = 0;

  for (let i = 0; i < 8; i++) {
    const x = -0.43 + (((i * 5) % 9) / 8) * 0.86;
    const y = -0.25 + (((i * 7) % 9) / 8) * 0.50;
    flake_dummy.position.set(x, y, frontZ + 0.011);
    flake_dummy.rotation.set(0, 0, i * 0.63);
    flake_dummy.scale.set(0.010 + (i % 3) * 0.004, 0.004 + (i % 2) * 0.003, 1);
    flake_dummy.updateMatrix();
    wax_flakes.setMatrixAt(flake_index++, flake_dummy.matrix);
  }

  for (let i = 0; i < 7; i++) {
    const z = -0.31 + (((i * 4) % 8) / 7) * 0.62;
    const y = -0.24 + (((i * 5) % 8) / 7) * 0.48;
    flake_dummy.position.set(sideX + 0.009, y, z);
    flake_dummy.quaternion.copy(side_quaternion);
    flake_dummy.rotateZ(i * 0.57);
    flake_dummy.scale.set(0.011 + (i % 3) * 0.004, 0.004 + (i % 2) * 0.003, 1);
    flake_dummy.updateMatrix();
    wax_flakes.setMatrixAt(flake_index++, flake_dummy.matrix);
  }

  for (let i = 0; i < 3; i++) {
    const x = -0.25 + i * 0.25;
    const z = -0.16 + i * 0.13;
    flake_dummy.position.set(x, topY + 0.007, z);
    flake_dummy.quaternion.copy(top_quaternion);
    flake_dummy.rotateZ(i * 0.70);
    flake_dummy.scale.set(0.013, 0.005, 1);
    flake_dummy.updateMatrix();
    wax_flakes.setMatrixAt(flake_index++, flake_dummy.matrix);
  }
  wax_flakes.instanceMatrix.needsUpdate = true;
  root.add(wax_flakes);

  function fitToUnitCube(THREE, object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(THREE, root);
  return root;
}