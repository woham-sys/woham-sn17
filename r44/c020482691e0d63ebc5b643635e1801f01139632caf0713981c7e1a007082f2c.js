// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rose_arch";

  const arch_frame = new THREE.Group();
  arch_frame.name = "arch_frame";
  root.add(arch_frame);

  const climbing_plants = new THREE.Group();
  climbing_plants.name = "climbing_plants";
  root.add(climbing_plants);

  const foliage = new THREE.Group();
  foliage.name = "foliage";
  root.add(foliage);

  const roses = new THREE.Group();
  roses.name = "roses";
  root.add(roses);

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a36,
    metalness: 0.6,
    roughness: 0.5
  });
  const vineMat = new THREE.MeshStandardMaterial({
    color: 0x40512b,
    metalness: 0.0,
    roughness: 0.9
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x354c25,
    metalness: 0.0,
    roughness: 0.9
  });
  const leaf_darkMat = new THREE.MeshStandardMaterial({
    color: 0x244526,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const leaf_midMat = new THREE.MeshStandardMaterial({
    color: 0x355b30,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const leaf_lightMat = new THREE.MeshStandardMaterial({
    color: 0x4c6d3c,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const red_roseMat = new THREE.MeshStandardMaterial({
    color: 0xc91538,
    metalness: 0.0,
    roughness: 0.8
  });
  const crimson_roseMat = new THREE.MeshStandardMaterial({
    color: 0x9f002d,
    metalness: 0.0,
    roughness: 0.8
  });
  const pink_roseMat = new THREE.MeshStandardMaterial({
    color: 0xd94b86,
    metalness: 0.0,
    roughness: 0.8
  });
  const coral_roseMat = new THREE.MeshStandardMaterial({
    color: 0xf06a45,
    metalness: 0.0,
    roughness: 0.8
  });
  const magenta_roseMat = new THREE.MeshStandardMaterial({
    color: 0xb00055,
    metalness: 0.0,
    roughness: 0.8
  });
  const rose_centerMat = new THREE.MeshStandardMaterial({
    color: 0x64102d,
    metalness: 0.0,
    roughness: 0.85
  });

  function createTube(points, radius, material, segments) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, segments || 32, radius, 8, false),
      material
    );
  }

  const outer_arch_points = [
    new THREE.Vector3(-1.08, 0.08, 0),
    new THREE.Vector3(-1.08, 0.75, 0),
    new THREE.Vector3(-1.04, 1.55, 0),
    new THREE.Vector3(-0.92, 2.15, 0),
    new THREE.Vector3(-0.62, 2.66, 0),
    new THREE.Vector3(0, 2.92, 0),
    new THREE.Vector3(0.62, 2.66, 0),
    new THREE.Vector3(0.92, 2.15, 0),
    new THREE.Vector3(1.04, 1.55, 0),
    new THREE.Vector3(1.08, 0.75, 0),
    new THREE.Vector3(1.08, 0.08, 0)
  ];
  const outer_archGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(outer_arch_points, false, "centripetal"),
    72,
    0.035,
    10,
    false
  );

  const inner_arch_points = [
    new THREE.Vector3(-0.93, 0.08, 0),
    new THREE.Vector3(-0.93, 0.72, 0),
    new THREE.Vector3(-0.90, 1.42, 0),
    new THREE.Vector3(-0.79, 1.94, 0),
    new THREE.Vector3(-0.53, 2.38, 0),
    new THREE.Vector3(0, 2.61, 0),
    new THREE.Vector3(0.53, 2.38, 0),
    new THREE.Vector3(0.79, 1.94, 0),
    new THREE.Vector3(0.90, 1.42, 0),
    new THREE.Vector3(0.93, 0.72, 0),
    new THREE.Vector3(0.93, 0.08, 0)
  ];
  const inner_archGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(inner_arch_points, false, "centripetal"),
    64,
    0.032,
    10,
    false
  );

  const left_outer_arch = new THREE.Mesh(outer_archGeom, frameMat);
  left_outer_arch.name = "left_outer_arch";
  left_outer_arch.position.z = -0.22;
  arch_frame.add(left_outer_arch);

  const right_outer_arch = new THREE.Mesh(outer_archGeom, frameMat);
  right_outer_arch.name = "right_outer_arch";
  right_outer_arch.position.z = 0.22;
  arch_frame.add(right_outer_arch);

  const left_inner_arch = new THREE.Mesh(inner_archGeom, frameMat);
  left_inner_arch.name = "left_inner_arch";
  left_inner_arch.position.z = -0.11;
  arch_frame.add(left_inner_arch);

  const right_inner_arch = new THREE.Mesh(inner_archGeom, frameMat);
  right_inner_arch.name = "right_inner_arch";
  right_inner_arch.position.z = 0.11;
  arch_frame.add(right_inner_arch);

  const base_railGeom = new THREE.BoxGeometry(0.34, 0.055, 0.58);

  const left_base_rail = new THREE.Mesh(base_railGeom, frameMat);
  left_base_rail.name = "left_base_rail";
  left_base_rail.position.set(-1.005, 0.035, 0);
  arch_frame.add(left_base_rail);

  const right_base_rail = new THREE.Mesh(base_railGeom, frameMat);
  right_base_rail.name = "right_base_rail";
  right_base_rail.position.set(1.005, 0.035, 0);
  arch_frame.add(right_base_rail);

  const footGeom = new THREE.BoxGeometry(0.075, 0.07, 0.66);

  const left_front_foot = new THREE.Mesh(footGeom, frameMat);
  left_front_foot.name = "left_front_foot";
  left_front_foot.position.set(-1.08, 0.035, 0.29);
  arch_frame.add(left_front_foot);

  const left_rear_foot = new THREE.Mesh(footGeom, frameMat);
  left_rear_foot.name = "left_rear_foot";
  left_rear_foot.position.set(-1.08, 0.035, -0.29);
  arch_frame.add(left_rear_foot);

  const right_front_foot = new THREE.Mesh(footGeom, frameMat);
  right_front_foot.name = "right_front_foot";
  right_front_foot.position.set(1.08, 0.035, 0.29);
  arch_frame.add(right_front_foot);

  const right_rear_foot = new THREE.Mesh(footGeom, frameMat);
  right_rear_foot.name = "right_rear_foot";
  right_rear_foot.position.set(1.08, 0.035, -0.29);
  arch_frame.add(right_rear_foot);

  const braceGeom = new THREE.BoxGeometry(0.035, 1, 0.035);
  const up_axis = new THREE.Vector3(0, 1, 0);

  function addBrace(name, start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const brace = new THREE.Mesh(braceGeom, frameMat);
    brace.name = name;
    brace.position.copy(start).add(end).multiplyScalar(0.5);
    brace.quaternion.setFromUnitVectors(up_axis, direction.normalize());
    brace.scale.set(1, length, 1);
    arch_frame.add(brace);
    return brace;
  }

  const left_diagonal_brace = addBrace(
    "left_diagonal_brace",
    new THREE.Vector3(-1.08, 0.12, 0.25),
    new THREE.Vector3(-0.93, 1.18, -0.17)
  );
  const left_rear_brace = addBrace(
    "left_rear_brace",
    new THREE.Vector3(-1.08, 0.12, -0.25),
    new THREE.Vector3(-0.93, 1.18, 0.17)
  );
  const right_diagonal_brace = addBrace(
    "right_diagonal_brace",
    new THREE.Vector3(1.08, 0.12, -0.25),
    new THREE.Vector3(0.93, 1.18, 0.17)
  );
  const right_rear_brace = addBrace(
    "right_rear_brace",
    new THREE.Vector3(1.08, 0.12, 0.25),
    new THREE.Vector3(0.93, 1.18, -0.17)
  );

  const left_support_crossbar = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.04, 0.52),
    frameMat
  );
  left_support_crossbar.name = "left_support_crossbar";
  left_support_crossbar.position.set(-1.0, 0.68, 0);
  arch_frame.add(left_support_crossbar);

  const right_support_crossbar = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.04, 0.52),
    frameMat
  );
  right_support_crossbar.name = "right_support_crossbar";
  right_support_crossbar.position.set(1.0, 0.68, 0);
  arch_frame.add(right_support_crossbar);

  const left_front_vine = createTube([
    new THREE.Vector3(-1.03, 0.08, 0.25),
    new THREE.Vector3(-1.08, 0.72, 0.27),
    new THREE.Vector3(-1.02, 1.48, 0.25),
    new THREE.Vector3(-0.84, 2.18, 0.24),
    new THREE.Vector3(-0.48, 2.72, 0.22),
    new THREE.Vector3(0.02, 2.91, 0.20)
  ], 0.018, vineMat, 56);
  left_front_vine.name = "left_front_vine";
  climbing_plants.add(left_front_vine);

  const right_front_vine = createTube([
    new THREE.Vector3(1.03, 0.08, 0.25),
    new THREE.Vector3(1.08, 0.72, 0.27),
    new THREE.Vector3(1.02, 1.48, 0.25),
    new THREE.Vector3(0.84, 2.18, 0.24),
    new THREE.Vector3(0.48, 2.72, 0.22),
    new THREE.Vector3(-0.02, 2.91, 0.20)
  ], 0.018, vineMat, 56);
  right_front_vine.name = "right_front_vine";
  climbing_plants.add(right_front_vine);

  const left_rear_vine = createTube([
    new THREE.Vector3(-1.03, 0.08, -0.25),
    new THREE.Vector3(-1.08, 0.72, -0.27),
    new THREE.Vector3(-1.02, 1.48, -0.25),
    new THREE.Vector3(-0.84, 2.18, -0.24),
    new THREE.Vector3(-0.48, 2.72, -0.22),
    new THREE.Vector3(0.02, 2.91, -0.20)
  ], 0.017, vineMat, 56);
  left_rear_vine.name = "left_rear_vine";
  climbing_plants.add(left_rear_vine);

  const right_rear_vine = createTube([
    new THREE.Vector3(1.03, 0.08, -0.25),
    new THREE.Vector3(1.08, 0.72, -0.27),
    new THREE.Vector3(1.02, 1.48, -0.25),
    new THREE.Vector3(0.84, 2.18, -0.24),
    new THREE.Vector3(0.48, 2.72, -0.22),
    new THREE.Vector3(-0.02, 2.91, -0.20)
  ], 0.017, vineMat, 56);
  right_rear_vine.name = "right_rear_vine";
  climbing_plants.add(right_rear_vine);

  const center_crown_vine = createTube([
    new THREE.Vector3(-0.78, 2.35, 0.18),
    new THREE.Vector3(-0.42, 2.72, 0.16),
    new THREE.Vector3(0, 2.90, 0.14),
    new THREE.Vector3(0.42, 2.72, 0.16),
    new THREE.Vector3(0.78, 2.35, 0.18)
  ], 0.017, vineMat, 40);
  center_crown_vine.name = "center_crown_vine";
  climbing_plants.add(center_crown_vine);

  const left_side_tendril = createTube([
    new THREE.Vector3(-1.02, 1.15, 0.24),
    new THREE.Vector3(-1.15, 1.28, 0.28),
    new THREE.Vector3(-1.18, 1.43, 0.25),
    new THREE.Vector3(-1.10, 1.50, 0.22)
  ], 0.009, vineMat, 18);
  left_side_tendril.name = "left_side_tendril";
  climbing_plants.add(left_side_tendril);

  const right_side_tendril = createTube([
    new THREE.Vector3(1.02, 0.95, 0.24),
    new THREE.Vector3(1.15, 1.08, 0.28),
    new THREE.Vector3(1.18, 1.23, 0.25),
    new THREE.Vector3(1.10, 1.30, 0.22)
  ], 0.009, vineMat, 18);
  right_side_tendril.name = "right_side_tendril";
  climbing_plants.add(right_side_tendril);

  function makeArchCurve(z) {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.04, 0.12, z),
      new THREE.Vector3(-1.04, 0.85, z),
      new THREE.Vector3(-1.00, 1.55, z),
      new THREE.Vector3(-0.86, 2.15, z),
      new THREE.Vector3(-0.55, 2.62, z),
      new THREE.Vector3(0, 2.86, z),
      new THREE.Vector3(0.55, 2.62, z),
      new THREE.Vector3(0.86, 2.15, z),
      new THREE.Vector3(1.00, 1.55, z),
      new THREE.Vector3(1.04, 0.85, z),
      new THREE.Vector3(1.04, 0.12, z)
    ], false, "centripetal");
  }

  const vine_curves = [
    makeArchCurve(-0.29),
    makeArchCurve(-0.20),
    makeArchCurve(-0.10),
    makeArchCurve(0.00),
    makeArchCurve(0.10),
    makeArchCurve(0.20),
    makeArchCurve(0.29)
  ];

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, -0.5);
  leafShape.bezierCurveTo(-0.34, -0.30, -0.48, 0.12, 0, 0.5);
  leafShape.bezierCurveTo(0.48, 0.12, 0.34, -0.30, 0, -0.5);
  const leafGeom = new THREE.ShapeGeometry(leafShape, 8);

  const leaf_matrices = [[], [], []];
  const stem_matrices = [];
  const temp_matrix = new THREE.Matrix4();
  const temp_position = new THREE.Vector3();
  const temp_scale = new THREE.Vector3();
  const temp_quaternion = new THREE.Quaternion();
  const temp_euler = new THREE.Euler();

  function storeLeaf(bucket, x, y, z, rx, ry, rz, sx, sy) {
    temp_position.set(x, y, z);
    temp_euler.set(rx, ry, rz);
    temp_quaternion.setFromEuler(temp_euler);
    temp_scale.set(sx, sy, 1);
    temp_matrix.compose(temp_position, temp_quaternion, temp_scale);
    leaf_matrices[bucket].push(temp_matrix.clone());
  }

  function storeStem(x, y, z, rz, length_scale) {
    temp_position.set(x, y, z);
    temp_euler.set(0, 0, rz);
    temp_quaternion.setFromEuler(temp_euler);
    temp_scale.set(1, length_scale, 1);
    temp_matrix.compose(temp_position, temp_quaternion, temp_scale);
    stem_matrices.push(temp_matrix.clone());
  }

  for (let lane = 0; lane < vine_curves.length; lane++) {
    const curve = vine_curves[lane];
    for (let i = 0; i < 48; i++) {
      const t = (i + 0.35) / 48;
      const point = curve.getPoint(t);
      const tangent = curve.getTangent(t).normalize();
      const tangent_angle = Math.atan2(tangent.y, tangent.x);
      const side = i % 2 === 0 ? -1 : 1;
      const spread = 0.065 + 0.025 * ((i + lane) % 3);
      const leaf_x = point.x + tangent.y * side * spread;
      const leaf_y = point.y - tangent.x * side * spread;
      const leaf_z = point.z + 0.018 * (((i * 2 + lane) % 5) - 2);
      const size = 0.145 + 0.012 * ((i + lane * 2) % 4);

      storeStem(
        point.x + (leaf_x - point.x) * 0.48,
        point.y + (leaf_y - point.y) * 0.48,
        point.z + 0.004,
        tangent_angle - Math.PI / 2 + side * 0.38,
        0.15
      );
      storeLeaf(
        (i + lane) % 3,
        leaf_x,
        leaf_y,
        leaf_z,
        0.28 * (((i + lane) % 5) - 2),
        side * (0.18 + 0.04 * (i % 3)),
        tangent_angle - Math.PI / 2 + side * (0.58 + 0.08 * (i % 4)),
        size,
        size
      );

      if (i % 2 === 0) {
        const second_side = -side;
        const second_x = point.x - tangent.y * second_side * (0.045 + 0.012 * (i % 3));
        const second_y = point.y + tangent.x * second_side * (0.045 + 0.012 * (i % 3));
        storeStem(
          point.x + (second_x - point.x) * 0.45,
          point.y + (second_y - point.y) * 0.45,
          point.z - 0.006,
          tangent_angle - Math.PI / 2 + second_side * 0.5,
          0.12
        );
        storeLeaf(
          (i + lane + 1) % 3,
          second_x,
          second_y,
          point.z - 0.012 * ((i + lane) % 3),
          -0.22 * (((i + lane) % 4) - 1.5),
          second_side * 0.28,
          tangent_angle - Math.PI / 2 + second_side * 0.72,
          size * 0.9,
          size * 0.92
        );
      }
    }
  }

  const rose_data = [
    [-0.99, 0.38, 0.31, 0.105, 2, 0.15],
    [-0.94, 0.62, 0.32, 0.115, 0, -0.20],
    [-1.02, 0.86, 0.30, 0.105, 4, 0.25],
    [-0.96, 1.10, 0.33, 0.120, 1, -0.10],
    [-1.00, 1.34, 0.31, 0.110, 3, 0.20],
    [-0.92, 1.58, 0.33, 0.120, 2, -0.25],
    [-0.86, 1.82, 0.32, 0.115, 0, 0.15],
    [-0.79, 2.05, 0.33, 0.120, 4, -0.15],
    [-0.69, 2.27, 0.32, 0.115, 1, 0.25],
    [-0.55, 2.47, 0.33, 0.120, 3, -0.20],
    [-0.38, 2.64, 0.32, 0.115, 0, 0.10],
    [-0.20, 2.76, 0.33, 0.110, 2, -0.15],
    [0.00, 2.82, 0.33, 0.105, 4, 0.20],
    [0.20, 2.76, 0.33, 0.110, 1, -0.10],
    [0.38, 2.64, 0.32, 0.115, 3, 0.15],
    [0.55, 2.47, 0.33, 0.120, 0, -0.20],
    [0.69, 2.27, 0.32, 0.115, 2, 0.25],
    [0.79, 2.05, 0.33, 0.120, 4, -0.15],
    [0.86, 1.82, 0.32, 0.115, 1, 0.20],
    [0.92, 1.58, 0.33, 0.120, 3, -0.25],
    [1.00, 1.34, 0.31, 0.110, 0, 0.15],
    [0.96, 1.10, 0.33, 0.120, 2, -0.10],
    [1.02, 0.86, 0.30, 0.105, 4, 0.20],
    [0.94, 0.62, 0.32, 0.115, 1, -0.15],
    [0.99, 0.38, 0.31, 0.105, 3, 0.10],
    [-0.82, 2.36, 0.02, 0.115, 3, -0.10],
    [-0.62, 2.56, 0.04, 0.120, 1, 0.20],
    [-0.38, 2.70, 0.02, 0.115, 4, -0.20],
    [-0.12, 2.79, 0.04, 0.110, 0, 0.15],
    [0.14, 2.78, 0.02, 0.110, 2, -0.15],
    [0.38, 2.68, 0.04, 0.115, 3, 0.20],
    [0.62, 2.54, 0.02, 0.120, 1, -0.20],
    [0.82, 2.34, 0.04, 0.115, 4, 0.10],
    [-0.91, 1.92, -0.18, 0.110, 2, 0.20],
    [-0.82, 2.18, -0.20, 0.115, 0, -0.15],
    [-0.62, 2.42, -0.20, 0.115, 4, 0.20],
    [-0.34, 2.62, -0.20, 0.110, 1, -0.15],
    [-0.05, 2.73, -0.20, 0.105, 3, 0.10],
    [0.25, 2.70, -0.20, 0.108, 0, -0.20],
    [0.52, 2.55, -0.20, 0.115, 2, 0.20],
    [0.75, 2.32, -0.19, 0.115, 4, -0.15],
    [0.88, 2.05, -0.18, 0.110, 1, 0.20]
  ];

  const rose_matrices = [[], [], [], [], []];
  const center_matrices = [];

  for (let i = 0; i < rose_data.length; i++) {
    const rose = rose_data[i];
    const x = rose[0];
    const y = rose[1];
    const z = rose[2];
    const size = rose[3];
    const color_index = rose[4];
    const rotation = rose[5];

    temp_position.set(x, y, z);
    temp_euler.set(
      0.08 * (((i * 3) % 5) - 2),
      0.08 * (((i * 5) % 7) - 3),
      rotation
    );
    temp_quaternion.setFromEuler(temp_euler);
    temp_scale.set(size, size, size * 0.82);
    temp_matrix.compose(temp_position, temp_quaternion, temp_scale);
    rose_matrices[color_index].push(temp_matrix.clone());

    temp_position.set(x, y, z + size * 0.48);
    temp_euler.set(0, 0, rotation);
    temp_quaternion.setFromEuler(temp_euler);
    temp_scale.set(size * 0.30, size * 0.30, size * 0.18);
    temp_matrix.compose(temp_position, temp_quaternion, temp_scale);
    center_matrices.push(temp_matrix.clone());

    for (let p = 0; p < 3; p++) {
      const angle = rotation + p / 3 * Math.PI * 2 + (i % 2) * 0.25;
      const stem_x = x - Math.sin(angle) * size * 0.42;
      const stem_y = y - Math.cos(angle) * size * 0.42;
      storeStem(stem_x, stem_y, z - 0.012, angle, size * 1.12);

      const leaf_x = x - Math.sin(angle) * size * 0.82;
      const leaf_y = y - Math.cos(angle) * size * 0.82;
      storeLeaf(
        (i + p) % 3,
        leaf_x,
        leaf_y,
        z - 0.005,
        0.18 * (((i + p) % 3) - 1),
        0.12 * ((p % 2) * 2 - 1),
        angle,
        size * 0.92,
        size * 1.02
      );

      const second_angle = angle + 1.75;
      const second_x = x - Math.sin(second_angle) * size * 0.68;
      const second_y = y - Math.cos(second_angle) * size * 0.68;
      storeStem(
        x + (second_x - x) * 0.45,
        y + (second_y - y) * 0.45,
        z - 0.018,
        second_angle,
        size * 0.86
      );
      storeLeaf(
        (i + p + 1) % 3,
        second_x,
        second_y,
        z - 0.018,
        -0.16 * (((i + p) % 4) - 1.5),
        0.16 * ((p % 2) * 2 - 1),
        second_angle,
        size * 0.82,
        size * 0.90
      );
    }
  }

  const stemGeom = new THREE.CylinderGeometry(0.008, 0.006, 0.18, 6);
  const rose_stems = new THREE.InstancedMesh(
    stemGeom,
    stemMat,
    stem_matrices.length
  );
  rose_stems.name = "rose_stems";
  for (let i = 0; i < stem_matrices.length; i++) {
    rose_stems.setMatrixAt(i, stem_matrices[i]);
  }
  rose_stems.instanceMatrix.needsUpdate = true;
  foliage.add(rose_stems);

  const leaf_dark = new THREE.InstancedMesh(
    leafGeom,
    leaf_darkMat,
    leaf_matrices[0].length
  );
  leaf_dark.name = "leaf_dark";
  for (let i = 0; i < leaf_matrices[0].length; i++) {
    leaf_dark.setMatrixAt(i, leaf_matrices[0][i]);
  }
  leaf_dark.instanceMatrix.needsUpdate = true;
  foliage.add(leaf_dark);

  const leaf_mid = new THREE.InstancedMesh(
    leafGeom,
    leaf_midMat,
    leaf_matrices[1].length
  );
  leaf_mid.name = "leaf_mid";
  for (let i = 0; i < leaf_matrices[1].length; i++) {
    leaf_mid.setMatrixAt(i, leaf_matrices[1][i]);
  }
  leaf_mid.instanceMatrix.needsUpdate = true;
  foliage.add(leaf_mid);

  const leaf_light = new THREE.InstancedMesh(
    leafGeom,
    leaf_lightMat,
    leaf_matrices[2].length
  );
  leaf_light.name = "leaf_light";
  for (let i = 0; i < leaf_matrices[2].length; i++) {
    leaf_light.setMatrixAt(i, leaf_matrices[2][i]);
  }
  leaf_light.instanceMatrix.needsUpdate = true;
  foliage.add(leaf_light);

  const roseGeom = new THREE.IcosahedronGeometry(1, 2);

  const red_roses = new THREE.InstancedMesh(
    roseGeom,
    red_roseMat,
    rose_matrices[0].length
  );
  red_roses.name = "red_roses";
  for (let i = 0; i < rose_matrices[0].length; i++) {
    red_roses.setMatrixAt(i, rose_matrices[0][i]);
  }
  red_roses.instanceMatrix.needsUpdate = true;
  roses.add(red_roses);

  const crimson_roses = new THREE.InstancedMesh(
    roseGeom,
    crimson_roseMat,
    rose_matrices[1].length
  );
  crimson_roses.name = "crimson_roses";
  for (let i = 0; i < rose_matrices[1].length; i++) {
    crimson_roses.setMatrixAt(i, rose_matrices[1][i]);
  }
  crimson_roses.instanceMatrix.needsUpdate = true;
  roses.add(crimson_roses);

  const pink_roses = new THREE.InstancedMesh(
    roseGeom,
    pink_roseMat,
    rose_matrices[2].length
  );
  pink_roses.name = "pink_roses";
  for (let i = 0; i < rose_matrices[2].length; i++) {
    pink_roses.setMatrixAt(i, rose_matrices[2][i]);
  }
  pink_roses.instanceMatrix.needsUpdate = true;
  roses.add(pink_roses);

  const coral_roses = new THREE.InstancedMesh(
    roseGeom,
    coral_roseMat,
    rose_matrices[3].length
  );
  coral_roses.name = "coral_roses";
  for (let i = 0; i < rose_matrices[3].length; i++) {
    coral_roses.setMatrixAt(i, rose_matrices[3][i]);
  }
  coral_roses.instanceMatrix.needsUpdate = true;
  roses.add(coral_roses);

  const magenta_roses = new THREE.InstancedMesh(
    roseGeom,
    magenta_roseMat,
    rose_matrices[4].length
  );
  magenta_roses.name = "magenta_roses";
  for (let i = 0; i < rose_matrices[4].length; i++) {
    magenta_roses.setMatrixAt(i, rose_matrices[4][i]);
  }
  magenta_roses.instanceMatrix.needsUpdate = true;
  roses.add(magenta_roses);

  const rose_centerGeom = new THREE.SphereGeometry(1, 12, 8);
  const rose_centers = new THREE.InstancedMesh(
    rose_centerGeom,
    rose_centerMat,
    center_matrices.length
  );
  rose_centers.name = "rose_centers";
  for (let i = 0; i < center_matrices.length; i++) {
    rose_centers.setMatrixAt(i, center_matrices[i]);
  }
  rose_centers.instanceMatrix.needsUpdate = true;
  roses.add(rose_centers);

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