// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ramen_bowl";

  const bowl_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x101112,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const broth_surfaceMat = new THREE.MeshStandardMaterial({
    color: 0x5b2d18,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const broth_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x8a4b22,
    metalness: 0.0,
    roughness: 0.4,
  });
  const noodleMat = new THREE.MeshStandardMaterial({
    color: 0xf1d9a8,
    metalness: 0.0,
    roughness: 0.6,
  });
  const noodle_shadowMat = new THREE.MeshStandardMaterial({
    color: 0xd9b77a,
    metalness: 0.0,
    roughness: 0.65,
  });
  const green_garnishMat = new THREE.MeshStandardMaterial({
    color: 0x527b3d,
    metalness: 0.0,
    roughness: 0.75,
  });
  const pale_garnishMat = new THREE.MeshStandardMaterial({
    color: 0xb9c783,
    metalness: 0.0,
    roughness: 0.75,
  });
  const exterior_noodle_decorationMat = new THREE.MeshStandardMaterial({
    color: 0xc9a873,
    metalness: 0.0,
    roughness: 0.45,
  });
  const exterior_noodle_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xe2cfa3,
    metalness: 0.0,
    roughness: 0.4,
  });
  const exterior_noodle_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x9d784d,
    metalness: 0.0,
    roughness: 0.5,
  });

  const bowl_bodyProfile = [
    new THREE.Vector2(0.000, 0.110),
    new THREE.Vector2(0.180, 0.110),
    new THREE.Vector2(0.270, 0.135),
    new THREE.Vector2(0.360, 0.205),
    new THREE.Vector2(0.450, 0.335),
    new THREE.Vector2(0.530, 0.500),
    new THREE.Vector2(0.590, 0.640),
    new THREE.Vector2(0.615, 0.680),
    new THREE.Vector2(0.625, 0.695),
    new THREE.Vector2(0.615, 0.710),
    new THREE.Vector2(0.590, 0.715),
    new THREE.Vector2(0.570, 0.690),
    new THREE.Vector2(0.545, 0.610),
    new THREE.Vector2(0.490, 0.470),
    new THREE.Vector2(0.400, 0.340),
    new THREE.Vector2(0.290, 0.250),
    new THREE.Vector2(0.150, 0.205),
    new THREE.Vector2(0.000, 0.200),
  ];
  const bowl_bodyGeom = new THREE.LatheGeometry(bowl_bodyProfile, 64);
  const bowl_body = new THREE.Mesh(bowl_bodyGeom, bowl_bodyMat);
  bowl_body.name = "bowl_body";
  root.add(bowl_body);

  const rimGeom = new THREE.TorusGeometry(0.603, 0.017, 12, 64);
  const rim = new THREE.Mesh(rimGeom, bowl_bodyMat);
  rim.name = "rim";
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.704;
  root.add(rim);

  const pedestal_footProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.215, 0.000),
    new THREE.Vector2(0.245, 0.012),
    new THREE.Vector2(0.260, 0.040),
    new THREE.Vector2(0.260, 0.090),
    new THREE.Vector2(0.245, 0.120),
    new THREE.Vector2(0.200, 0.140),
    new THREE.Vector2(0.000, 0.140),
  ];
  const pedestal_footGeom = new THREE.LatheGeometry(pedestal_footProfile, 48);
  const pedestal_foot = new THREE.Mesh(pedestal_footGeom, bowl_bodyMat);
  pedestal_foot.name = "pedestal_foot";
  root.add(pedestal_foot);

  const foot_ringGeom = new THREE.TorusGeometry(0.235, 0.008, 8, 48);
  const foot_ring = new THREE.Mesh(foot_ringGeom, bowl_bodyMat);
  foot_ring.name = "foot_ring";
  foot_ring.rotation.x = Math.PI / 2;
  foot_ring.position.y = 0.012;
  root.add(foot_ring);

  const broth_surfaceGeom = new THREE.CircleGeometry(0.515, 64);
  const broth_surface = new THREE.Mesh(broth_surfaceGeom, broth_surfaceMat);
  broth_surface.name = "broth_surface";
  broth_surface.rotation.x = -Math.PI / 2;
  broth_surface.position.y = 0.625;
  root.add(broth_surface);

  const broth_edgeGeom = new THREE.TorusGeometry(0.505, 0.006, 8, 64);
  const broth_edge = new THREE.Mesh(broth_edgeGeom, broth_edgeMat);
  broth_edge.name = "broth_edge";
  broth_edge.rotation.x = Math.PI / 2;
  broth_edge.position.y = 0.629;
  root.add(broth_edge);

  const green_garnishGeom = new THREE.SphereGeometry(0.035, 12, 8);
  const green_garnish = new THREE.InstancedMesh(
    green_garnishGeom,
    green_garnishMat,
    7
  );
  green_garnish.name = "green_garnish";
  const garnish_dummy = new THREE.Object3D();
  const green_garnish_data = [
    [-0.36, 0.642, -0.22, 1.25, 0.28, 0.70, 0.2],
    [-0.25, 0.643, -0.34, 0.90, 0.24, 0.55, 1.1],
    [0.34, 0.642, -0.24, 1.15, 0.25, 0.62, 2.2],
    [0.40, 0.643, 0.02, 0.85, 0.22, 0.50, 0.7],
    [-0.42, 0.642, 0.08, 0.75, 0.22, 0.48, 1.8],
    [0.25, 0.643, 0.30, 0.95, 0.24, 0.52, 2.6],
    [-0.10, 0.642, -0.40, 0.70, 0.20, 0.45, 0.4],
  ];
  for (let i = 0; i < green_garnish_data.length; i++) {
    const d = green_garnish_data[i];
    garnish_dummy.position.set(d[0], d[1], d[2]);
    garnish_dummy.rotation.set(0, d[6], 0);
    garnish_dummy.scale.set(d[3], d[4], d[5]);
    garnish_dummy.updateMatrix();
    green_garnish.setMatrixAt(i, garnish_dummy.matrix);
  }
  green_garnish.instanceMatrix.needsUpdate = true;
  root.add(green_garnish);

  const pale_garnishGeom = new THREE.SphereGeometry(0.028, 12, 8);
  const pale_garnish = new THREE.InstancedMesh(
    pale_garnishGeom,
    pale_garnishMat,
    4
  );
  pale_garnish.name = "pale_garnish";
  const pale_garnish_data = [
    [-0.31, 0.646, -0.18, 1.20, 0.25, 0.65],
    [0.31, 0.646, -0.13, 0.90, 0.22, 0.55],
    [-0.20, 0.646, 0.31, 0.75, 0.20, 0.48],
    [0.16, 0.646, -0.35, 0.85, 0.22, 0.52],
  ];
  for (let i = 0; i < pale_garnish_data.length; i++) {
    const d = pale_garnish_data[i];
    garnish_dummy.position.set(d[0], d[1], d[2]);
    garnish_dummy.rotation.set(0, i * 0.8, 0);
    garnish_dummy.scale.set(d[3], d[4], d[5]);
    garnish_dummy.updateMatrix();
    pale_garnish.setMatrixAt(i, garnish_dummy.matrix);
  }
  pale_garnish.instanceMatrix.needsUpdate = true;
  root.add(pale_garnish);

  const broth_noodles = new THREE.Group();
  broth_noodles.name = "broth_noodles";
  for (let i = 0; i < 7; i++) {
    const points = [];
    const z_base = -0.255 + i * 0.085;
    for (let j = 0; j <= 12; j++) {
      const t = j / 12;
      const x = -0.405 + t * 0.81;
      const z =
        z_base +
        Math.sin(t * Math.PI * 2 + i * 0.72) * 0.035 +
        Math.sin(t * Math.PI * 4 + i * 0.31) * 0.012;
      const y = 0.646 + Math.sin(t * Math.PI * 3 + i) * 0.003;
      points.push(new THREE.Vector3(x, y, z));
    }
    const broth_noodleGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      36,
      0.010,
      7,
      false
    );
    const broth_noodle = new THREE.Mesh(
      broth_noodleGeom,
      i % 2 === 0 ? noodleMat : noodle_shadowMat
    );
    broth_noodle.name = "broth_noodle_" + i;
    broth_noodles.add(broth_noodle);
  }
  root.add(broth_noodles);

  const front_noodles = new THREE.Group();
  front_noodles.name = "front_noodles";
  for (let i = 0; i < 8; i++) {
    const points = [];
    const z_base = -0.075 + i * 0.035;
    for (let j = 0; j <= 14; j++) {
      const t = j / 14;
      const x = -0.355 + t * 0.71;
      const z =
        z_base +
        Math.sin(t * Math.PI * 2 + i * 0.63) * 0.045 +
        Math.sin(t * Math.PI * 4 + i * 0.28) * 0.014;
      const y = 0.654 + Math.cos(t * Math.PI * 3 + i * 0.5) * 0.004;
      points.push(new THREE.Vector3(x, y, z));
    }
    const front_noodleGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      40,
      0.011,
      8,
      false
    );
    const front_noodle = new THREE.Mesh(
      front_noodleGeom,
      i % 3 === 0 ? noodle_shadowMat : noodleMat
    );
    front_noodle.name = "front_noodle_" + i;
    front_noodles.add(front_noodle);
  }
  root.add(front_noodles);

  const curled_noodles = new THREE.Group();
  curled_noodles.name = "curled_noodles";
  const curled_noodle_data = [
    [-0.25, -0.20, 0.14, 0.10, 0.2],
    [0.02, -0.29, 0.15, 0.09, 1.0],
    [0.28, -0.19, 0.13, 0.10, 2.0],
    [-0.34, 0.02, 0.11, 0.08, 2.7],
  ];
  for (let i = 0; i < curled_noodle_data.length; i++) {
    const d = curled_noodle_data[i];
    const points = [];
    for (let j = 0; j <= 18; j++) {
      const t = j / 18;
      const angle = d[4] + t * Math.PI * 2.15;
      const radius_x = d[2] * (1 - t * 0.18);
      const radius_z = d[3] * (1 - t * 0.12);
      points.push(
        new THREE.Vector3(
          d[0] + Math.cos(angle) * radius_x,
          0.651 + Math.sin(t * Math.PI) * 0.004,
          d[1] + Math.sin(angle) * radius_z
        )
      );
    }
    const curled_noodleGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      42,
      0.009,
      7,
      false
    );
    const curled_noodle = new THREE.Mesh(curled_noodleGeom, noodleMat);
    curled_noodle.name = "curled_noodle_" + i;
    curled_noodles.add(curled_noodle);
  }
  root.add(curled_noodles);

  function outerRadiusAt(y) {
    if (y <= 0.135) return 0.27;
    if (y <= 0.205) return 0.27 + ((y - 0.135) / 0.07) * 0.09;
    if (y <= 0.335) return 0.36 + ((y - 0.205) / 0.13) * 0.09;
    if (y <= 0.500) return 0.45 + ((y - 0.335) / 0.165) * 0.08;
    if (y <= 0.640) return 0.53 + ((y - 0.500) / 0.14) * 0.06;
    return 0.59 + ((y - 0.640) / 0.05) * 0.025;
  }

  function surfacePoint(angle, y, extra) {
    const radius = outerRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function makeSurfaceTube(points, radius, material, name) {
    const geometry = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      48,
      radius,
      7,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    return mesh;
  }

  const exterior_noodle_decoration = new THREE.Group();
  exterior_noodle_decoration.name = "exterior_noodle_decoration";

  for (let i = 0; i < 8; i++) {
    const points = [];
    const phase = i * 0.58;
    for (let j = 0; j <= 28; j++) {
      const t = j / 28;
      const angle = 2.72 - t * 2.25;
      const y =
        0.205 +
        t * 0.275 +
        Math.sin(t * Math.PI * 2 + phase) * 0.043 +
        Math.sin(t * Math.PI * 4 + phase * 0.7) * 0.014;
      points.push(surfacePoint(angle, y, 0.007));
    }
    const exterior_noodle = makeSurfaceTube(
      points,
      i % 3 === 0 ? 0.007 : 0.0055,
      i % 3 === 0
        ? exterior_noodle_highlightMat
        : i % 3 === 1
          ? exterior_noodle_decorationMat
          : exterior_noodle_shadowMat,
      "exterior_noodle_" + i
    );
    exterior_noodle_decoration.add(exterior_noodle);
  }

  for (let i = 0; i < 4; i++) {
    const points = [];
    const phase = i * 0.9;
    for (let j = 0; j <= 24; j++) {
      const t = j / 24;
      const angle = 2.58 - t * 1.92;
      const y =
        0.175 +
        t * 0.185 +
        Math.sin(t * Math.PI * 2 + phase) * 0.035;
      points.push(surfacePoint(angle, y, 0.008));
    }
    const exterior_lower_noodle = makeSurfaceTube(
      points,
      0.005,
      i % 2 === 0
        ? exterior_noodle_decorationMat
        : exterior_noodle_shadowMat,
      "exterior_lower_noodle_" + i
    );
    exterior_noodle_decoration.add(exterior_lower_noodle);
  }
  root.add(exterior_noodle_decoration);

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