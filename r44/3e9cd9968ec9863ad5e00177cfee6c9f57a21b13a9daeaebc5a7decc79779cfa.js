// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "starfruit_slice";

  const fruit_body = new THREE.Group();
  fruit_body.name = "fruit_body";
  root.add(fruit_body);

  const surface_details = new THREE.Group();
  surface_details.name = "surface_details";
  root.add(surface_details);

  const outer_rindMat = new THREE.MeshStandardMaterial({
    color: 0x6f921f,
    metalness: 0.0,
    roughness: 0.42,
  });
  const inner_fleshMat = new THREE.MeshStandardMaterial({
    color: 0xf1d900,
    metalness: 0.0,
    roughness: 0.3,
  });
  const radial_membranesMat = new THREE.MeshStandardMaterial({
    color: 0xe8e58c,
    metalness: 0.0,
    roughness: 0.48,
  });
  const major_veinsMat = new THREE.MeshStandardMaterial({
    color: 0xd9c94a,
    metalness: 0.0,
    roughness: 0.55,
  });
  const center_cavityMat = new THREE.MeshStandardMaterial({
    color: 0x66521b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const center_coreMat = new THREE.MeshStandardMaterial({
    color: 0xb99a42,
    metalness: 0.0,
    roughness: 0.72,
  });
  const center_seedsMat = new THREE.MeshStandardMaterial({
    color: 0xe5d47b,
    metalness: 0.0,
    roughness: 0.68,
  });
  const skin_specklesMat = new THREE.MeshStandardMaterial({
    color: 0xc6d52b,
    metalness: 0.0,
    roughness: 0.42,
  });
  const rind_specklesMat = new THREE.MeshStandardMaterial({
    color: 0x527619,
    metalness: 0.0,
    roughness: 0.62,
  });

  function createStarShape(outerRadius, innerRadius, xScale, yScale) {
    const shape = new THREE.Shape();
    for (let i = 0; i < 10; i++) {
      const angle = Math.PI / 2 + i * Math.PI / 5;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius * xScale;
      const y = Math.sin(angle) * radius * yScale;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }

  const outer_rindShape = createStarShape(1.0, 0.56, 1.08, 1.0);
  const outer_rindGeom = new THREE.ExtrudeGeometry(outer_rindShape, {
    depth: 0.14,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 3,
  });
  const outer_rind = new THREE.Mesh(outer_rindGeom, outer_rindMat);
  outer_rind.name = "outer_rind";
  outer_rind.position.z = -0.07;
  fruit_body.add(outer_rind);

  const inner_fleshShape = createStarShape(0.965, 0.535, 1.08, 1.0);
  const inner_fleshGeom = new THREE.ExtrudeGeometry(inner_fleshShape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
  });
  const inner_flesh = new THREE.Mesh(inner_fleshGeom, inner_fleshMat);
  inner_flesh.name = "inner_flesh";
  inner_flesh.position.z = 0.095;
  fruit_body.add(inner_flesh);

  const radial_membranesShape = new THREE.Shape();
  radial_membranesShape.moveTo(-0.018, 0.035);
  radial_membranesShape.lineTo(-0.052, 0.57);
  radial_membranesShape.lineTo(-0.026, 0.80);
  radial_membranesShape.lineTo(0.0, 0.91);
  radial_membranesShape.lineTo(0.026, 0.80);
  radial_membranesShape.lineTo(0.052, 0.57);
  radial_membranesShape.lineTo(0.018, 0.035);
  radial_membranesShape.closePath();

  const radial_membranesGeom = new THREE.ExtrudeGeometry(
    radial_membranesShape,
    {
      depth: 0.008,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.003,
      bevelSegments: 1,
    }
  );
  const radial_membranes = new THREE.InstancedMesh(
    radial_membranesGeom,
    radial_membranesMat,
    5
  );
  radial_membranes.name = "radial_membranes";
  radial_membranes.frustumCulled = false;

  const transform = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    transform.position.set(0, 0, 0.134);
    transform.rotation.set(0, 0, i * Math.PI * 2 / 5);
    transform.scale.set(1, 1, 1);
    transform.updateMatrix();
    radial_membranes.setMatrixAt(i, transform.matrix);
  }
  radial_membranes.instanceMatrix.needsUpdate = true;
  surface_details.add(radial_membranes);

  const major_veinsGeom = new THREE.CylinderGeometry(
    0.004,
    0.007,
    1,
    6
  );
  const major_veins = new THREE.InstancedMesh(
    major_veinsGeom,
    major_veinsMat,
    15
  );
  major_veins.name = "major_veins";
  major_veins.frustumCulled = false;

  let majorIndex = 0;
  for (let i = 0; i < 5; i++) {
    const axis = Math.PI / 2 + i * Math.PI * 2 / 5;
    const veinData = [
      [0.055, 0.43, 0.0],
      [0.060, 0.36, 0.20],
      [0.060, 0.36, -0.20],
    ];
    for (const data of veinData) {
      const offset = data[2];
      const startRadius = data[0];
      const length = data[1];
      const direction = axis + offset;
      const centerX = Math.cos(direction) * (startRadius + length / 2);
      const centerY = Math.sin(direction) * (startRadius + length / 2);

      transform.position.set(centerX, centerY, 0.146);
      transform.rotation.set(0, 0, direction - Math.PI / 2);
      transform.scale.set(1, length, 1);
      transform.updateMatrix();
      major_veins.setMatrixAt(majorIndex++, transform.matrix);
    }
  }
  major_veins.instanceMatrix.needsUpdate = true;
  surface_details.add(major_veins);

  const secondary_veinsGeom = new THREE.BufferGeometry();
  const secondaryPositions = [];
  for (let i = 0; i < 5; i++) {
    const axis = Math.PI / 2 + i * Math.PI * 2 / 5;
    for (let level = 0; level < 3; level++) {
      const startRadius = 0.18 + level * 0.14;
      const reach = 0.17 - level * 0.012;
      for (const side of [-1, 1]) {
        const startAngle = axis + side * (0.035 + level * 0.008);
        const endAngle = axis + side * (0.20 + level * 0.035);
        const startX = Math.cos(startAngle) * startRadius;
        const startY = Math.sin(startAngle) * startRadius;
        const endX = Math.cos(endAngle) * (startRadius + reach);
        const endY = Math.sin(endAngle) * (startRadius + reach);
        secondaryPositions.push(
          startX, startY, 0.145,
          endX, endY, 0.145
        );
      }
    }
  }
  secondary_veinsGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(secondaryPositions, 3)
  );
  const secondary_veinsMat = new THREE.LineBasicMaterial({
    color: 0xcfc33d,
    transparent: true,
    opacity: 0.55,
  });
  const secondary_veins = new THREE.LineSegments(
    secondary_veinsGeom,
    secondary_veinsMat
  );
  secondary_veins.name = "secondary_veins";
  surface_details.add(secondary_veins);

  const skin_specklesGeom = new THREE.SphereGeometry(1, 8, 4);
  const skin_speckles = new THREE.InstancedMesh(
    skin_specklesGeom,
    skin_specklesMat,
    50
  );
  skin_speckles.name = "skin_speckles";
  skin_speckles.frustumCulled = false;

  let skinIndex = 0;
  for (let i = 0; i < 5; i++) {
    const axis = Math.PI / 2 + i * Math.PI * 2 / 5;
    for (let j = 0; j < 10; j++) {
      const fraction = ((i * 10 + j * 7) % 19) / 18;
      const radius = 0.18 + fraction * 0.62;
      const side = j % 2 === 0 ? -1 : 1;
      const offset =
        side * (0.10 + 0.025 * ((i * 3 + j * 5) % 5));
      const angle = axis + offset;
      const size = 0.009 + 0.002 * ((i + j * 2) % 4);

      transform.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0.146
      );
      transform.rotation.set(0, 0, angle + side * 0.35);
      transform.scale.set(size * 1.6, size, 0.0025);
      transform.updateMatrix();
      skin_speckles.setMatrixAt(skinIndex++, transform.matrix);
    }
  }
  skin_speckles.instanceMatrix.needsUpdate = true;
  surface_details.add(skin_speckles);

  const rind_specklesGeom = new THREE.SphereGeometry(1, 8, 4);
  const rind_speckles = new THREE.InstancedMesh(
    rind_specklesGeom,
    rind_specklesMat,
    30
  );
  rind_speckles.name = "rind_speckles";
  rind_speckles.frustumCulled = false;

  let rindIndex = 0;
  for (let i = 0; i < 5; i++) {
    const axis = Math.PI / 2 + i * Math.PI * 2 / 5;
    for (let j = 0; j < 6; j++) {
      const fraction = ((i * 6 + j * 5) % 11) / 10;
      const radius = 0.875 + fraction * 0.065;
      const offset =
        (j - 2.5) * 0.018 + (i % 2 === 0 ? -0.008 : 0.008);
      const angle = axis + offset;
      const size = 0.007 + 0.0015 * ((i + j) % 3);

      transform.position.set(
        Math.cos(angle) * radius * 1.08,
        Math.sin(angle) * radius,
        0.112
      );
      transform.rotation.set(0, 0, angle);
      transform.scale.set(size * 1.4, size, 0.002);
      transform.updateMatrix();
      rind_speckles.setMatrixAt(rindIndex++, transform.matrix);
    }
  }
  rind_speckles.instanceMatrix.needsUpdate = true;
  surface_details.add(rind_speckles);

  const center_cavityGeom = new THREE.CylinderGeometry(
    0.067,
    0.074,
    0.014,
    12
  );
  const center_cavity = new THREE.Mesh(center_cavityGeom, center_cavityMat);
  center_cavity.name = "center_cavity";
  center_cavity.rotation.x = Math.PI / 2;
  center_cavity.position.z = 0.151;
  surface_details.add(center_cavity);

  const center_coreGeom = new THREE.CylinderGeometry(
    0.034,
    0.041,
    0.012,
    10
  );
  const center_core = new THREE.Mesh(center_coreGeom, center_coreMat);
  center_core.name = "center_core";
  center_core.rotation.x = Math.PI / 2;
  center_core.position.z = 0.160;
  surface_details.add(center_core);

  const center_seedsGeom = new THREE.SphereGeometry(1, 8, 4);
  const center_seeds = new THREE.InstancedMesh(
    center_seedsGeom,
    center_seedsMat,
    8
  );
  center_seeds.name = "center_seeds";
  center_seeds.frustumCulled = false;

  for (let i = 0; i < 8; i++) {
    const angle = i * Math.PI * 2 / 8 + 0.18;
    const radius = i % 2 === 0 ? 0.025 : 0.043;
    transform.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.169
    );
    transform.rotation.set(0, 0, angle);
    transform.scale.set(0.008, 0.006, 0.0035);
    transform.updateMatrix();
    center_seeds.setMatrixAt(i, transform.matrix);
  }
  center_seeds.instanceMatrix.needsUpdate = true;
  surface_details.add(center_seeds);

  const top_rind_tipGeom = new THREE.SphereGeometry(1, 10, 5);
  const top_rind_tip = new THREE.Mesh(top_rind_tipGeom, rind_specklesMat);
  top_rind_tip.name = "top_rind_tip";
  top_rind_tip.position.set(0, 0.982, 0.116);
  top_rind_tip.scale.set(0.014, 0.009, 0.003);
  surface_details.add(top_rind_tip);

  function fitToUnitCube(object) {
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

  fitToUnitCube(root);
  return root;
}