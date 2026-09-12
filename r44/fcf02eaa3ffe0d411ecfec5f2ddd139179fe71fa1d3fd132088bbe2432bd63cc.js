// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_brass_vase";

  const vase_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc99a45,
    metalness: 0.6,
    roughness: 0.2,
  });
  const inner_bowlMat = new THREE.MeshStandardMaterial({
    color: 0x8f672b,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const reliefMat = new THREE.MeshStandardMaterial({
    color: 0xd8ad55,
    metalness: 0.6,
    roughness: 0.2,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x5b3d1d,
    metalness: 0.6,
    roughness: 0.5,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x4f3b24,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const vase_bodyProfile = [
    new THREE.Vector2(0.00, 0.18),
    new THREE.Vector2(0.30, 0.18),
    new THREE.Vector2(0.36, 0.22),
    new THREE.Vector2(0.42, 0.30),
    new THREE.Vector2(0.48, 0.42),
    new THREE.Vector2(0.52, 0.58),
    new THREE.Vector2(0.54, 0.76),
    new THREE.Vector2(0.53, 0.92),
    new THREE.Vector2(0.50, 1.08),
    new THREE.Vector2(0.45, 1.22),
    new THREE.Vector2(0.39, 1.35),
    new THREE.Vector2(0.36, 1.47),
    new THREE.Vector2(0.38, 1.59),
    new THREE.Vector2(0.43, 1.70),
    new THREE.Vector2(0.50, 1.79),
    new THREE.Vector2(0.58, 1.84),
  ];
  const vase_bodyGeom = new THREE.LatheGeometry(vase_bodyProfile, 64);
  const vase_body = new THREE.Mesh(vase_bodyGeom, vase_bodyMat);
  vase_body.name = "vase_body";
  root.add(vase_body);

  const inner_bowlProfile = [
    new THREE.Vector2(0.00, 1.625),
    new THREE.Vector2(0.14, 1.635),
    new THREE.Vector2(0.29, 1.675),
    new THREE.Vector2(0.42, 1.745),
    new THREE.Vector2(0.525, 1.825),
  ];
  const inner_bowlGeom = new THREE.LatheGeometry(inner_bowlProfile, 64);
  const inner_bowl = new THREE.Mesh(inner_bowlGeom, inner_bowlMat);
  inner_bowl.name = "inner_bowl";
  root.add(inner_bowl);

  const rolled_rimGeom = new THREE.TorusGeometry(0.55, 0.055, 16, 64);
  const rolled_rim = new THREE.Mesh(rolled_rimGeom, vase_bodyMat);
  rolled_rim.name = "rolled_rim";
  rolled_rim.rotation.x = Math.PI / 2;
  rolled_rim.position.y = 1.84;
  root.add(rolled_rim);

  const inner_rim_shadowGeom = new THREE.TorusGeometry(0.493, 0.012, 8, 64);
  const inner_rim_shadow = new THREE.Mesh(inner_rim_shadowGeom, engravingMat);
  inner_rim_shadow.name = "inner_rim_shadow";
  inner_rim_shadow.rotation.x = Math.PI / 2;
  inner_rim_shadow.position.y = 1.815;
  root.add(inner_rim_shadow);

  const pedestal_baseProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.38, 0.00),
    new THREE.Vector2(0.44, 0.025),
    new THREE.Vector2(0.47, 0.070),
    new THREE.Vector2(0.46, 0.115),
    new THREE.Vector2(0.41, 0.160),
    new THREE.Vector2(0.35, 0.190),
    new THREE.Vector2(0.00, 0.190),
  ];
  const pedestal_baseGeom = new THREE.LatheGeometry(pedestal_baseProfile, 64);
  const pedestal_base = new THREE.Mesh(pedestal_baseGeom, vase_bodyMat);
  pedestal_base.name = "pedestal_base";
  root.add(pedestal_base);

  const base_lower_ringGeom = new THREE.TorusGeometry(0.425, 0.025, 10, 64);
  const base_lower_ring = new THREE.Mesh(base_lower_ringGeom, vase_bodyMat);
  base_lower_ring.name = "base_lower_ring";
  base_lower_ring.rotation.x = Math.PI / 2;
  base_lower_ring.position.y = 0.055;
  root.add(base_lower_ring);

  const base_grooveGeom = new THREE.TorusGeometry(0.405, 0.009, 8, 64);
  const base_groove = new THREE.Mesh(base_grooveGeom, engravingMat);
  base_groove.name = "base_groove";
  base_groove.rotation.x = Math.PI / 2;
  base_groove.position.y = 0.145;
  root.add(base_groove);

  const base_upper_ringGeom = new THREE.TorusGeometry(0.355, 0.022, 10, 64);
  const base_upper_ring = new THREE.Mesh(base_upper_ringGeom, vase_bodyMat);
  base_upper_ring.name = "base_upper_ring";
  base_upper_ring.rotation.x = Math.PI / 2;
  base_upper_ring.position.y = 0.19;
  root.add(base_upper_ring);

  function radiusAt(y) {
    if (y < 0.22) return 0.34;
    if (y < 0.42) return 0.36 + (y - 0.22) * 0.60;
    if (y < 0.76) return 0.48 + (y - 0.42) * 0.176;
    if (y < 1.08) return 0.54 - (y - 0.76) * 0.125;
    if (y < 1.35) return 0.50 - (y - 1.08) * 0.407;
    if (y < 1.58) return 0.39 - (y - 1.35) * 0.13;
    return 0.36 + (y - 1.58) * 0.62;
  }

  const frontNormal = new THREE.Vector3(0, 0, 1);

  function surfacePose(angle, y, extra) {
    const radius = radiusAt(y) + extra;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();
    const position = new THREE.Vector3(normal.x * radius, y, normal.z * radius);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(frontNormal, normal);
    return { position, quaternion };
  }

  function makeSurfaceVine(specs, tubeRadius) {
    const points = [];
    for (let i = 0; i < specs.length; i++) {
      points.push(surfacePose(specs[i][0], specs[i][1], 0.012).position);
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(16, specs.length * 8),
      tubeRadius,
      7,
      false
    );
    return new THREE.Mesh(geometry, engravingMat);
  }

  const main_stem = makeSurfaceVine([
    [1.48, 0.34],
    [1.50, 0.50],
    [1.52, 0.68],
    [1.55, 0.88],
    [1.58, 1.08],
  ], 0.007);
  main_stem.name = "main_stem";
  root.add(main_stem);

  const left_branch = makeSurfaceVine([
    [1.51, 0.58],
    [1.70, 0.68],
    [1.90, 0.79],
    [2.10, 0.88],
  ], 0.006);
  left_branch.name = "left_branch";
  root.add(left_branch);

  const right_branch = makeSurfaceVine([
    [1.52, 0.67],
    [1.34, 0.77],
    [1.15, 0.88],
    [0.98, 0.98],
  ], 0.006);
  right_branch.name = "right_branch";
  root.add(right_branch);

  const lower_left_branch = makeSurfaceVine([
    [1.49, 0.43],
    [1.70, 0.39],
    [1.92, 0.42],
    [2.12, 0.48],
  ], 0.0055);
  lower_left_branch.name = "lower_left_branch";
  root.add(lower_left_branch);

  const lower_right_branch = makeSurfaceVine([
    [1.48, 0.38],
    [1.28, 0.35],
    [1.08, 0.39],
    [0.90, 0.47],
  ], 0.0055);
  lower_right_branch.name = "lower_right_branch";
  root.add(lower_right_branch);

  const upper_left_branch = makeSurfaceVine([
    [1.58, 1.02],
    [1.75, 1.10],
    [1.92, 1.18],
    [2.08, 1.25],
  ], 0.0055);
  upper_left_branch.name = "upper_left_branch";
  root.add(upper_left_branch);

  const upper_right_branch = makeSurfaceVine([
    [1.57, 1.04],
    [1.38, 1.12],
    [1.20, 1.20],
    [1.04, 1.27],
  ], 0.0055);
  upper_right_branch.name = "upper_right_branch";
  root.add(upper_right_branch);

  const petalShape = new THREE.Shape();
  petalShape.moveTo(0, -0.48);
  petalShape.bezierCurveTo(-0.42, -0.34, -0.55, 0.12, -0.28, 0.42);
  petalShape.bezierCurveTo(-0.14, 0.58, 0.14, 0.58, 0.28, 0.42);
  petalShape.bezierCurveTo(0.55, 0.12, 0.42, -0.34, 0, -0.48);

  const rose_petalGeom = new THREE.ExtrudeGeometry(petalShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.025,
    bevelSegments: 2,
    curveSegments: 8,
  });

  const rose_specs = [
    { angle: 1.57, y: 1.06, size: 0.235 },
    { angle: 2.10, y: 0.88, size: 0.205 },
    { angle: 0.98, y: 0.98, size: 0.215 },
    { angle: 1.50, y: 0.58, size: 0.195 },
    { angle: 2.55, y: 1.08, size: 0.170 },
    { angle: 0.58, y: 1.10, size: 0.170 },
    { angle: 2.62, y: 0.66, size: 0.150 },
    { angle: 0.52, y: 0.68, size: 0.150 },
  ];

  const petalCount = rose_specs.length * 9;
  const rose_petals = new THREE.InstancedMesh(rose_petalGeom, reliefMat, petalCount);
  rose_petals.name = "rose_petals";

  const rose_petal_outlines = new THREE.InstancedMesh(
    rose_petalGeom,
    engravingMat,
    petalCount
  );
  rose_petal_outlines.name = "rose_petal_outlines";

  const matrix = new THREE.Matrix4();
  let petalIndex = 0;

  for (let r = 0; r < rose_specs.length; r++) {
    const rose = rose_specs[r];

    for (let i = 0; i < 6; i++) {
      const angle = i / 6 * Math.PI * 2;
      const localX = Math.cos(angle) * rose.size * 0.34;
      const localY = Math.sin(angle) * rose.size * 0.34;
      const surfaceAngle = rose.angle - localX / radiusAt(rose.y + localY);
      const surfaceY = rose.y + localY;
      const rotation = angle - Math.PI / 2;

      const outlinePose = surfacePose(surfaceAngle, surfaceY, 0.006);
      const outlineQuat = outlinePose.quaternion.clone().multiply(
        new THREE.Quaternion().setFromAxisAngle(frontNormal, rotation)
      );
      matrix.compose(
        outlinePose.position,
        outlineQuat,
        new THREE.Vector3(rose.size * 1.08, rose.size * 1.08, 1)
      );
      rose_petal_outlines.setMatrixAt(petalIndex, matrix);

      const petalPose = surfacePose(surfaceAngle, surfaceY, 0.012);
      const petalQuat = petalPose.quaternion.clone().multiply(
        new THREE.Quaternion().setFromAxisAngle(frontNormal, rotation)
      );
      matrix.compose(
        petalPose.position,
        petalQuat,
        new THREE.Vector3(rose.size, rose.size, 1)
      );
      rose_petals.setMatrixAt(petalIndex, matrix);
      petalIndex++;
    }

    for (let i = 0; i < 3; i++) {
      const angle = i / 3 * Math.PI * 2 + 0.35;
      const localX = Math.cos(angle) * rose.size * 0.13;
      const localY = Math.sin(angle) * rose.size * 0.13;
      const surfaceAngle = rose.angle - localX / radiusAt(rose.y + localY);
      const surfaceY = rose.y + localY;
      const rotation = angle - Math.PI / 2;

      const innerOutlinePose = surfacePose(surfaceAngle, surfaceY, 0.022);
      const innerOutlineQuat = innerOutlinePose.quaternion.clone().multiply(
        new THREE.Quaternion().setFromAxisAngle(frontNormal, rotation)
      );
      matrix.compose(
        innerOutlinePose.position,
        innerOutlineQuat,
        new THREE.Vector3(rose.size * 0.62, rose.size * 0.62, 1)
      );
      rose_petal_outlines.setMatrixAt(petalIndex, matrix);

      const innerPose = surfacePose(surfaceAngle, surfaceY, 0.028);
      const innerQuat = innerPose.quaternion.clone().multiply(
        new THREE.Quaternion().setFromAxisAngle(frontNormal, rotation)
      );
      matrix.compose(
        innerPose.position,
        innerQuat,
        new THREE.Vector3(rose.size * 0.56, rose.size * 0.56, 1)
      );
      rose_petals.setMatrixAt(petalIndex, matrix);
      petalIndex++;
    }
  }

  rose_petal_outlines.instanceMatrix.needsUpdate = true;
  rose_petals.instanceMatrix.needsUpdate = true;
  root.add(rose_petal_outlines);
  root.add(rose_petals);

  const rose_centerGeom = new THREE.SphereGeometry(1, 20, 12);
  const rose_centers = new THREE.InstancedMesh(
    rose_centerGeom,
    reliefMat,
    rose_specs.length
  );
  rose_centers.name = "rose_centers";

  for (let i = 0; i < rose_specs.length; i++) {
    const rose = rose_specs[i];
    const pose = surfacePose(rose.angle, rose.y, 0.045);
    matrix.compose(
      pose.position,
      pose.quaternion,
      new THREE.Vector3(rose.size * 0.18, rose.size * 0.18, 0.018)
    );
    rose_centers.setMatrixAt(i, matrix);
  }
  rose_centers.instanceMatrix.needsUpdate = true;
  root.add(rose_centers);

  const spiralPoints = [];
  for (let i = 0; i <= 28; i++) {
    const t = i / 28;
    const angle = t * Math.PI * 4.5;
    const radius = 0.005 + t * 0.055;
    spiralPoints.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      )
    );
  }

  const rose_spiralGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(spiralPoints, false, "centripetal"),
    36,
    0.006,
    6,
    false
  );
  const rose_spirals = new THREE.InstancedMesh(
    rose_spiralGeom,
    engravingMat,
    rose_specs.length
  );
  rose_spirals.name = "rose_spirals";

  for (let i = 0; i < rose_specs.length; i++) {
    const rose = rose_specs[i];
    const pose = surfacePose(rose.angle, rose.y, 0.066);
    const scale = rose.size / 0.2;
    matrix.compose(
      pose.position,
      pose.quaternion,
      new THREE.Vector3(scale, scale, scale)
    );
    rose_spirals.setMatrixAt(i, matrix);
  }
  rose_spirals.instanceMatrix.needsUpdate = true;
  root.add(rose_spirals);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, -0.55);
  leafShape.bezierCurveTo(-0.28, -0.30, -0.34, 0.20, 0, 0.55);
  leafShape.bezierCurveTo(0.34, 0.20, 0.28, -0.30, 0, -0.55);

  const leafGeom = new THREE.ExtrudeGeometry(leafShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.015,
    bevelSegments: 2,
    curveSegments: 8,
  });

  const leaf_specs = [
    { angle: 1.18, y: 1.30, size: 0.205, rotation: -0.78 },
    { angle: 0.98, y: 1.20, size: 0.175, rotation: -1.05 },
    { angle: 1.12, y: 0.47, size: 0.205, rotation: -0.62 },
    { angle: 1.38, y: 0.34, size: 0.215, rotation: 0.52 },
    { angle: 1.82, y: 0.38, size: 0.205, rotation: -0.70 },
    { angle: 2.12, y: 0.48, size: 0.180, rotation: 0.82 },
    { angle: 2.02, y: 1.25, size: 0.175, rotation: 0.62 },
    { angle: 0.82, y: 0.73, size: 0.165, rotation: -0.90 },
    { angle: 2.50, y: 1.18, size: 0.155, rotation: 0.72 },
    { angle: 0.62, y: 1.18, size: 0.155, rotation: -0.72 },
    { angle: 2.58, y: 0.58, size: 0.150, rotation: 0.88 },
    { angle: 0.55, y: 0.60, size: 0.150, rotation: -0.88 },
  ];

  const leaf_outlines = new THREE.InstancedMesh(
    leafGeom,
    engravingMat,
    leaf_specs.length
  );
  leaf_outlines.name = "leaf_outlines";

  const leaves = new THREE.InstancedMesh(
    leafGeom,
    reliefMat,
    leaf_specs.length
  );
  leaves.name = "leaves";

  const leaf_veinGeom = new THREE.BoxGeometry(0.012, 0.78, 0.008);
  const leaf_veins = new THREE.InstancedMesh(
    leaf_veinGeom,
    engravingMat,
    leaf_specs.length
  );
  leaf_veins.name = "leaf_veins";

  const leaf_side_veinGeom = new THREE.BoxGeometry(0.008, 0.25, 0.007);
  const leaf_side_veins = new THREE.InstancedMesh(
    leaf_side_veinGeom,
    engravingMat,
    leaf_specs.length * 4
  );
  leaf_side_veins.name = "leaf_side_veins";

  let sideVeinIndex = 0;
  for (let i = 0; i < leaf_specs.length; i++) {
    const leaf = leaf_specs[i];
    const parentQuat = surfacePose(leaf.angle, leaf.y, 0).quaternion;
    const localQuat = new THREE.Quaternion().setFromAxisAngle(frontNormal, leaf.rotation);
    const leafQuat = parentQuat.clone().multiply(localQuat);

    const outlinePose = surfacePose(leaf.angle, leaf.y, 0.006);
    matrix.compose(
      outlinePose.position,
      leafQuat,
      new THREE.Vector3(leaf.size * 1.08, leaf.size * 1.08, 1)
    );
    leaf_outlines.setMatrixAt(i, matrix);

    const leafPose = surfacePose(leaf.angle, leaf.y, 0.012);
    matrix.compose(
      leafPose.position,
      leafQuat,
      new THREE.Vector3(leaf.size, leaf.size, 1)
    );
    leaves.setMatrixAt(i, matrix);

    const veinPose = surfacePose(leaf.angle, leaf.y, 0.031);
    matrix.compose(
      veinPose.position,
      leafQuat,
      new THREE.Vector3(leaf.size, leaf.size, leaf.size)
    );
    leaf_veins.setMatrixAt(i, matrix);

    for (let level = 0; level < 2; level++) {
      for (const side of [-1, 1]) {
        const localPosition = new THREE.Vector3(
          side * leaf.size * 0.09,
          (level === 0 ? -0.12 : 0.12) * leaf.size,
          0.036
        ).applyQuaternion(leafQuat);
        const sidePosition = surfacePose(leaf.angle, leaf.y, 0).position.clone().add(localPosition);
        const sideQuat = leafQuat.clone().multiply(
          new THREE.Quaternion().setFromAxisAngle(frontNormal, -side * 0.82)
        );
        matrix.compose(
          sidePosition,
          sideQuat,
          new THREE.Vector3(leaf.size, leaf.size, leaf.size)
        );
        leaf_side_veins.setMatrixAt(sideVeinIndex, matrix);
        sideVeinIndex++;
      }
    }
  }

  leaf_outlines.instanceMatrix.needsUpdate = true;
  leaves.instanceMatrix.needsUpdate = true;
  leaf_veins.instanceMatrix.needsUpdate = true;
  leaf_side_veins.instanceMatrix.needsUpdate = true;
  root.add(leaf_outlines);
  root.add(leaves);
  root.add(leaf_veins);
  root.add(leaf_side_veins);

  const patina_markGeom = new THREE.CircleGeometry(1, 10);
  const patina_marks = new THREE.InstancedMesh(patina_markGeom, patinaMat, 24);
  patina_marks.name = "patina_marks";

  for (let i = 0; i < 24; i++) {
    const angle = 0.72 + ((i * 11) % 25) / 24 * 1.72;
    const y = 0.28 + ((i * 7) % 23) / 22 * 1.28;
    const pose = surfacePose(angle, y, 0.008);
    const width = 0.008 + (i % 4) * 0.004;
    const height = width * (0.45 + (i % 3) * 0.25);
    const rotation = new THREE.Quaternion().setFromAxisAngle(
      frontNormal,
      (i % 7) * 0.43
    );
    const markQuat = pose.quaternion.clone().multiply(rotation);
    matrix.compose(
      pose.position,
      markQuat,
      new THREE.Vector3(width, height, 1)
    );
    patina_marks.setMatrixAt(i, matrix);
  }
  patina_marks.instanceMatrix.needsUpdate = true;
  root.add(patina_marks);

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