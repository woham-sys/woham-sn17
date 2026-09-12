// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "hydrangea_vase";

  const vase_group = new THREE.Group();
  vase_group.name = "vase_group";
  root.add(vase_group);

  const bouquet_group = new THREE.Group();
  bouquet_group.name = "bouquet_group";
  root.add(bouquet_group);

  const vase_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x355f93,
    metalness: 0.0,
    roughness: 0.4
  });
  const vase_footMat = vase_bodyMat;
  const vase_rimMat = vase_bodyMat;
  const vase_openingMat = new THREE.MeshStandardMaterial({
    color: 0x10294a,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const vase_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x315f35,
    metalness: 0.0,
    roughness: 0.8
  });
  const branchMat = stemMat;
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x426f43,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const leaf_veinMat = new THREE.MeshStandardMaterial({
    color: 0x294e2d,
    metalness: 0.0,
    roughness: 0.8
  });

  const blue_petalsMat = new THREE.MeshStandardMaterial({
    color: 0x7fa6df,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const pale_blue_petalsMat = new THREE.MeshStandardMaterial({
    color: 0xa9c8e9,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const white_petalsMat = new THREE.MeshStandardMaterial({
    color: 0xe8eee7,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const lavender_petalsMat = new THREE.MeshStandardMaterial({
    color: 0x929ed0,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const petal_veinMat = new THREE.MeshStandardMaterial({
    color: 0x668fc5,
    metalness: 0.0,
    roughness: 0.9
  });
  const flower_centerMat = new THREE.MeshStandardMaterial({
    color: 0x789b83,
    metalness: 0.0,
    roughness: 0.8
  });

  const vase_profile = [
    new THREE.Vector2(0.00, -0.78),
    new THREE.Vector2(0.25, -0.78),
    new THREE.Vector2(0.31, -0.75),
    new THREE.Vector2(0.34, -0.70),
    new THREE.Vector2(0.35, -0.65),
    new THREE.Vector2(0.33, -0.60),
    new THREE.Vector2(0.29, -0.56),
    new THREE.Vector2(0.34, -0.51),
    new THREE.Vector2(0.41, -0.42),
    new THREE.Vector2(0.46, -0.28),
    new THREE.Vector2(0.48, -0.08),
    new THREE.Vector2(0.47, 0.10),
    new THREE.Vector2(0.43, 0.24),
    new THREE.Vector2(0.37, 0.34),
    new THREE.Vector2(0.31, 0.40),
    new THREE.Vector2(0.29, 0.44),
    new THREE.Vector2(0.31, 0.48),
    new THREE.Vector2(0.36, 0.51)
  ];
  const vase_bodyGeom = new THREE.LatheGeometry(vase_profile, 64);
  const vase_body = new THREE.Mesh(vase_bodyGeom, vase_bodyMat);
  vase_body.name = "vase_body";
  vase_group.add(vase_body);

  const vase_footGeom = new THREE.TorusGeometry(0.30, 0.045, 16, 64);
  const vase_foot = new THREE.Mesh(vase_footGeom, vase_footMat);
  vase_foot.name = "vase_foot";
  vase_foot.rotation.x = Math.PI / 2;
  vase_foot.position.y = -0.705;
  vase_group.add(vase_foot);

  const vase_rimGeom = new THREE.TorusGeometry(0.335, 0.026, 14, 64);
  const vase_rim = new THREE.Mesh(vase_rimGeom, vase_rimMat);
  vase_rim.name = "vase_rim";
  vase_rim.rotation.x = Math.PI / 2;
  vase_rim.position.y = 0.505;
  vase_group.add(vase_rim);

  const vase_openingGeom = new THREE.CircleGeometry(0.31, 48);
  const vase_opening = new THREE.Mesh(vase_openingGeom, vase_openingMat);
  vase_opening.name = "vase_opening";
  vase_opening.rotation.x = -Math.PI / 2;
  vase_opening.position.y = 0.503;
  vase_group.add(vase_opening);

  const vase_highlightGeom = new THREE.CircleGeometry(0.05, 24);

  const vase_left_highlight = new THREE.Mesh(vase_highlightGeom, vase_highlightMat);
  vase_left_highlight.name = "vase_left_highlight";
  vase_left_highlight.position.set(-0.18, -0.08, 0.455);
  vase_left_highlight.scale.set(0.55, 2.0, 1);
  vase_left_highlight.rotation.z = -0.08;
  vase_group.add(vase_left_highlight);

  const vase_right_highlight = new THREE.Mesh(vase_highlightGeom, vase_highlightMat);
  vase_right_highlight.name = "vase_right_highlight";
  vase_right_highlight.position.set(0.20, -0.02, 0.445);
  vase_right_highlight.scale.set(0.42, 1.65, 1);
  vase_right_highlight.rotation.z = 0.08;
  vase_group.add(vase_right_highlight);

  const vase_foot_highlight = new THREE.Mesh(vase_highlightGeom, vase_highlightMat);
  vase_foot_highlight.name = "vase_foot_highlight";
  vase_foot_highlight.position.set(0.08, -0.705, 0.335);
  vase_foot_highlight.scale.set(1.5, 0.35, 1);
  vase_group.add(vase_foot_highlight);

  const stemGeom = new THREE.CylinderGeometry(0.012, 0.016, 1, 8);
  const stem_targets = [
    new THREE.Vector3(-0.58, 0.72, 0.02),
    new THREE.Vector3(-0.42, 1.02, -0.08),
    new THREE.Vector3(-0.20, 1.20, 0.02),
    new THREE.Vector3(0.02, 1.27, -0.04),
    new THREE.Vector3(0.24, 1.16, 0.04),
    new THREE.Vector3(0.46, 0.96, -0.04),
    new THREE.Vector3(0.60, 0.70, 0.02),
    new THREE.Vector3(0.00, 0.82, 0.30)
  ];
  const main_stems = new THREE.InstancedMesh(stemGeom, stemMat, stem_targets.length);
  main_stems.name = "main_stems";
  const stem_dummy = new THREE.Object3D();
  const stem_up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < stem_targets.length; i++) {
    const target = stem_targets[i];
    const start = new THREE.Vector3(target.x * 0.18, 0.43, target.z * 0.18);
    const direction = target.clone().sub(start);
    const length = direction.length();
    stem_dummy.position.copy(start).add(target).multiplyScalar(0.5);
    stem_dummy.quaternion.setFromUnitVectors(stem_up, direction.normalize());
    stem_dummy.scale.set(1, length, 1);
    stem_dummy.updateMatrix();
    main_stems.setMatrixAt(i, stem_dummy.matrix);
  }
  main_stems.instanceMatrix.needsUpdate = true;
  bouquet_group.add(main_stems);

  const branchGeom = new THREE.CylinderGeometry(0.006, 0.009, 1, 7);
  const branch_count = 24;
  const side_branches = new THREE.InstancedMesh(branchGeom, branchMat, branch_count);
  side_branches.name = "side_branches";
  const branch_dummy = new THREE.Object3D();
  for (let i = 0; i < branch_count; i++) {
    const angle = i / branch_count * Math.PI * 2 + (i % 3) * 0.17;
    const ring = 0.38 + (i % 4) * 0.065;
    const start = new THREE.Vector3(
      Math.cos(angle) * 0.08,
      0.50 + (i % 3) * 0.035,
      Math.sin(angle) * 0.08
    );
    const end = new THREE.Vector3(
      Math.cos(angle) * ring,
      0.62 + (i % 5) * 0.105,
      Math.sin(angle) * ring
    );
    const direction = end.clone().sub(start);
    const length = direction.length();
    branch_dummy.position.copy(start).add(end).multiplyScalar(0.5);
    branch_dummy.quaternion.setFromUnitVectors(stem_up, direction.normalize());
    branch_dummy.scale.set(1, length, 1);
    branch_dummy.updateMatrix();
    side_branches.setMatrixAt(i, branch_dummy.matrix);
  }
  side_branches.instanceMatrix.needsUpdate = true;
  bouquet_group.add(side_branches);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, 0);
  leafShape.bezierCurveTo(-0.045, 0.025, -0.075, 0.105, 0, 0.19);
  leafShape.bezierCurveTo(0.075, 0.105, 0.045, 0.025, 0, 0);

  const hydrangea_leavesGeom = new THREE.ShapeGeometry(leafShape, 10);
  const leaf_count = 28;
  const hydrangea_leaves = new THREE.InstancedMesh(
    hydrangea_leavesGeom,
    leafMat,
    leaf_count
  );
  hydrangea_leaves.name = "hydrangea_leaves";

  const leaf_veinsGeom = new THREE.CylinderGeometry(0.0025, 0.0035, 0.14, 5);
  const leaf_veins = new THREE.InstancedMesh(leaf_veinsGeom, leaf_veinMat, leaf_count);
  leaf_veins.name = "leaf_veins";

  const leaf_dummy = new THREE.Object3D();
  const vein_dummy = new THREE.Object3D();
  for (let i = 0; i < leaf_count; i++) {
    const angle = i / leaf_count * Math.PI * 2 + 0.11;
    const radius = 0.34 + (i % 4) * 0.045;
    const position = new THREE.Vector3(
      Math.cos(angle) * radius,
      0.50 + (i % 5) * 0.055,
      Math.sin(angle) * radius
    );
    const direction = new THREE.Vector3(
      Math.cos(angle),
      -0.22 + (i % 3) * 0.08,
      Math.sin(angle)
    ).normalize();
    const leaf_quaternion = new THREE.Quaternion().setFromUnitVectors(stem_up, direction);
    const leaf_scale = 0.72 + (i % 4) * 0.09;

    leaf_dummy.position.copy(position);
    leaf_dummy.quaternion.copy(leaf_quaternion);
    leaf_dummy.scale.setScalar(leaf_scale);
    leaf_dummy.updateMatrix();
    hydrangea_leaves.setMatrixAt(i, leaf_dummy.matrix);

    vein_dummy.position.copy(position).add(direction.clone().multiplyScalar(0.07 * leaf_scale));
    vein_dummy.quaternion.copy(leaf_quaternion);
    vein_dummy.scale.setScalar(leaf_scale);
    vein_dummy.updateMatrix();
    leaf_veins.setMatrixAt(i, vein_dummy.matrix);
  }
  hydrangea_leaves.instanceMatrix.needsUpdate = true;
  leaf_veins.instanceMatrix.needsUpdate = true;
  bouquet_group.add(hydrangea_leaves);
  bouquet_group.add(leaf_veins);

  const petalShape = new THREE.Shape();
  petalShape.moveTo(0, 0);
  petalShape.bezierCurveTo(-0.025, 0.012, -0.065, 0.055, -0.075, 0.105);
  petalShape.bezierCurveTo(-0.085, 0.155, -0.055, 0.205, 0, 0.215);
  petalShape.bezierCurveTo(0.055, 0.205, 0.085, 0.155, 0.075, 0.105);
  petalShape.bezierCurveTo(0.065, 0.055, 0.025, 0.012, 0, 0);

  const petalGeom = new THREE.ExtrudeGeometry(petalShape, {
    depth: 0.008,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
    curveSegments: 10
  });

  const petal_positions = petalGeom.attributes.position;
  for (let i = 0; i < petal_positions.count; i++) {
    const x = petal_positions.getX(i);
    const y = petal_positions.getY(i);
    const z = petal_positions.getZ(i);
    const t = Math.max(0, Math.min(1, y / 0.215));
    const arch = 0.012 * Math.sin(t * Math.PI) - 0.010 * t * t;
    const cup = 0.006 * (x * x / 0.006) * t;
    petal_positions.setZ(i, z + arch - cup);
  }
  petal_positions.needsUpdate = true;
  petalGeom.computeVertexNormals();

  const flower_data = [];
  const flower_colors = [];

  function addFlower(x, y, z, size, nx, ny, nz, color) {
    const normal = new THREE.Vector3(nx, ny, nz).normalize();
    flower_data.push({
      position: new THREE.Vector3(x, y, z),
      normal: normal,
      size: size
    });
    flower_colors.push(color);
  }

  const ring_specs = [
    [0.00, 0.96, 0.00, 1, 0],
    [0.22, 1.00, -0.02, 6, 1],
    [0.44, 0.94, 0.00, 10, 0],
    [0.62, 0.82, 0.00, 14, 1],
    [0.70, 0.64, 0.00, 16, 0],
    [0.64, 0.48, 0.00, 14, 1],
    [0.47, 0.38, 0.00, 10, 0]
  ];

  for (let r = 0; r < ring_specs.length; r++) {
    const spec = ring_specs[r];
    const radius = spec[0];
    const y = spec[1];
    const zOffset = spec[2];
    const count = spec[3];
    const phase = spec[4];

    for (let i = 0; i < count; i++) {
      const angle = count === 1 ? 0 : i / count * Math.PI * 2 + phase * 0.31;
      const radialVariation = 1 + (((i * 3 + r * 2) % 5) - 2) * 0.018;
      const size = 0.82 + ((i * 7 + r * 5) % 6) * 0.045;
      const x = Math.cos(angle) * radius * radialVariation;
      const z = zOffset + Math.sin(angle) * radius * radialVariation;
      const py = y + (((i * 5 + r) % 5) - 2) * 0.018;
      const normal = new THREE.Vector3(
        Math.cos(angle),
        0.10 + ((i + r) % 3) * 0.07,
        Math.sin(angle)
      ).normalize();
      const color = (i * 3 + r * 2 + phase) % 4;
      addFlower(x, py, z, size, normal.x, normal.y, normal.z, color);
    }
  }

  addFlower(0.00, 1.205, 0.00, 0.92, 0.00, 1.00, 0.00, 1);
  addFlower(-0.12, 1.16, 0.04, 0.88, -0.18, 0.98, 0.08, 0);
  addFlower(0.13, 1.15, -0.03, 0.88, 0.18, 0.98, -0.08, 2);
  addFlower(-0.28, 1.08, -0.04, 0.86, -0.35, 0.93, -0.08, 3);
  addFlower(0.29, 1.07, 0.05, 0.86, 0.35, 0.93, 0.10, 1);
  addFlower(0.02, 1.08, 0.25, 0.88, 0.04, 0.94, 0.34, 2);

  const blue_matrices = [];
  const pale_blue_matrices = [];
  const white_matrices = [];
  const lavender_matrices = [];
  const petal_vein_matrices = [];

  for (let i = 0; i < flower_data.length; i++) {
    const flower = flower_data[i];
    const base_quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      flower.normal
    );

    for (let p = 0; p < 4; p++) {
      const angle = p / 4 * Math.PI * 2 + 0.055 * ((i % 3) - 1);
      const petal_quaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 0, 1),
        angle
      );
      const cup_quaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        0.045 * ((i + p) % 3 - 1)
      );
      const final_quaternion = base_quaternion
        .clone()
        .multiply(petal_quaternion)
        .multiply(cup_quaternion);
      const petal_scale = flower.size * (0.96 + ((i + p * 2) % 4) * 0.025);
      const petal_position = flower.position.clone().add(
        flower.normal.clone().multiplyScalar(0.004 * ((i + p) % 3))
      );
      const petal_matrix = new THREE.Matrix4().compose(
        petal_position,
        final_quaternion,
        new THREE.Vector3(petal_scale, petal_scale, petal_scale)
      );

      if (flower_colors[i] === 0) blue_matrices.push(petal_matrix);
      else if (flower_colors[i] === 1) pale_blue_matrices.push(petal_matrix);
      else if (flower_colors[i] === 2) white_matrices.push(petal_matrix);
      else lavender_matrices.push(petal_matrix);

      const vein_local_matrix = new THREE.Matrix4().compose(
        new THREE.Vector3(0, 0.073 * petal_scale, 0.017),
        new THREE.Quaternion(),
        new THREE.Vector3(petal_scale, petal_scale, petal_scale)
      );
      petal_vein_matrices.push(
        new THREE.Matrix4().multiplyMatrices(petal_matrix, vein_local_matrix)
      );
    }
  }

  function applyMatrices(mesh, matrices) {
    for (let i = 0; i < matrices.length; i++) mesh.setMatrixAt(i, matrices[i]);
    mesh.instanceMatrix.needsUpdate = true;
  }

  const blue_petals = new THREE.InstancedMesh(
    petalGeom,
    blue_petalsMat,
    blue_matrices.length
  );
  blue_petals.name = "blue_petals";
  applyMatrices(blue_petals, blue_matrices);
  bouquet_group.add(blue_petals);

  const pale_blue_petals = new THREE.InstancedMesh(
    petalGeom,
    pale_blue_petalsMat,
    pale_blue_matrices.length
  );
  pale_blue_petals.name = "pale_blue_petals";
  applyMatrices(pale_blue_petals, pale_blue_matrices);
  bouquet_group.add(pale_blue_petals);

  const white_petals = new THREE.InstancedMesh(
    petalGeom,
    white_petalsMat,
    white_matrices.length
  );
  white_petals.name = "white_petals";
  applyMatrices(white_petals, white_matrices);
  bouquet_group.add(white_petals);

  const lavender_petals = new THREE.InstancedMesh(
    petalGeom,
    lavender_petalsMat,
    lavender_matrices.length
  );
  lavender_petals.name = "lavender_petals";
  applyMatrices(lavender_petals, lavender_matrices);
  bouquet_group.add(lavender_petals);

  const petal_veinsGeom = new THREE.CylinderGeometry(0.0017, 0.0023, 0.105, 5);
  const petal_veins = new THREE.InstancedMesh(
    petal_veinsGeom,
    petal_veinMat,
    petal_vein_matrices.length
  );
  petal_veins.name = "petal_veins";
  applyMatrices(petal_veins, petal_vein_matrices);
  bouquet_group.add(petal_veins);

  const flower_centersGeom = new THREE.SphereGeometry(0.018, 12, 8);
  const flower_centers = new THREE.InstancedMesh(
    flower_centersGeom,
    flower_centerMat,
    flower_data.length
  );
  flower_centers.name = "flower_centers";

  const flower_center_dummy = new THREE.Object3D();
  for (let i = 0; i < flower_data.length; i++) {
    const flower = flower_data[i];
    flower_center_dummy.position
      .copy(flower.position)
      .add(flower.normal.clone().multiplyScalar(0.022));
    flower_center_dummy.quaternion.identity();
    flower_center_dummy.scale.setScalar(flower.size);
    flower_center_dummy.updateMatrix();
    flower_centers.setMatrixAt(i, flower_center_dummy.matrix);
  }
  flower_centers.instanceMatrix.needsUpdate = true;
  bouquet_group.add(flower_centers);

  const stamen_matrices = [];
  for (let i = 0; i < flower_data.length; i++) {
    const flower = flower_data[i];
    const base_quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      flower.normal
    );
    for (let s = 0; s < 3; s++) {
      const angle = s / 3 * Math.PI * 2 + i * 0.19;
      const local_position = new THREE.Vector3(
        Math.cos(angle) * 0.021 * flower.size,
        Math.sin(angle) * 0.021 * flower.size,
        0.030
      );
      local_position.applyQuaternion(base_quaternion).add(flower.position);
      const stamen_scale = 0.75 + flower.size * 0.18;
      stamen_matrices.push(
        new THREE.Matrix4().compose(
          local_position,
          new THREE.Quaternion(),
          new THREE.Vector3(stamen_scale, stamen_scale, stamen_scale)
        )
      );
    }
  }

  const flower_stamensGeom = new THREE.SphereGeometry(0.007, 8, 6);
  const flower_stamens = new THREE.InstancedMesh(
    flower_stamensGeom,
    flower_centerMat,
    stamen_matrices.length
  );
  flower_stamens.name = "flower_stamens";
  applyMatrices(flower_stamens, stamen_matrices);
  bouquet_group.add(flower_stamens);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}