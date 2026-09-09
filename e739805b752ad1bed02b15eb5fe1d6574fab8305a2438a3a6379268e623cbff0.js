function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "cracked_gold_speckled_vase";

  const vase_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xf1e4d8,
    metalness: 0.0,
    roughness: 0.22,
    clearcoat: 0.85,
    clearcoatRoughness: 0.16,
    emissive: 0x3a2d24,
    emissiveIntensity: 0.22
  });

  const inner_wallMat = new THREE.MeshStandardMaterial({
    color: 0xd8c8ba,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });

  const dark_openingMat = new THREE.MeshStandardMaterial({
    color: 0x8c7b6d,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });

  const gold_glazeMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.5,
    roughness: 0.28,
    side: THREE.DoubleSide
  });

  const crack_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x2b1d08,
    metalness: 0.0,
    roughness: 0.85
  });

  const crack_coreMat = new THREE.MeshStandardMaterial({
    color: 0xb98516,
    metalness: 0.5,
    roughness: 0.32
  });

  const vase_bodyProfile = [
    new THREE.Vector2(0.00, -0.58),
    new THREE.Vector2(0.23, -0.58),
    new THREE.Vector2(0.28, -0.56),
    new THREE.Vector2(0.34, -0.50),
    new THREE.Vector2(0.40, -0.39),
    new THREE.Vector2(0.45, -0.22),
    new THREE.Vector2(0.48, -0.02),
    new THREE.Vector2(0.47, 0.16),
    new THREE.Vector2(0.42, 0.30),
    new THREE.Vector2(0.35, 0.40),
    new THREE.Vector2(0.285, 0.48),
    new THREE.Vector2(0.255, 0.55),
    new THREE.Vector2(0.265, 0.60),
    new THREE.Vector2(0.295, 0.625)
  ];
  const vase_bodyGeom = new THREE.LatheGeometry(vase_bodyProfile, 64);
  const vase_body = new THREE.Mesh(vase_bodyGeom, vase_bodyMat);
  vase_body.name = "vase_body";
  root.add(vase_body);

  const rolled_rimGeom = new THREE.TorusGeometry(0.265, 0.035, 16, 64);
  const rolled_rim = new THREE.Mesh(rolled_rimGeom, vase_bodyMat);
  rolled_rim.name = "rolled_rim";
  rolled_rim.rotation.x = Math.PI / 2;
  rolled_rim.position.y = 0.625;
  root.add(rolled_rim);

  const inner_wallGeom = new THREE.CylinderGeometry(
    0.23, 0.205, 0.15, 48, 1, true
  );
  const inner_wall = new THREE.Mesh(inner_wallGeom, inner_wallMat);
  inner_wall.name = "inner_wall";
  inner_wall.position.y = 0.545;
  root.add(inner_wall);

  const dark_openingGeom = new THREE.CircleGeometry(0.205, 48);
  const dark_opening = new THREE.Mesh(dark_openingGeom, dark_openingMat);
  dark_opening.name = "dark_opening";
  dark_opening.rotation.x = -Math.PI / 2;
  dark_opening.position.y = 0.468;
  root.add(dark_opening);

  const foot_ringGeom = new THREE.TorusGeometry(0.235, 0.012, 10, 48);
  const foot_ring = new THREE.Mesh(foot_ringGeom, vase_bodyMat);
  foot_ring.name = "foot_ring";
  foot_ring.rotation.x = Math.PI / 2;
  foot_ring.position.y = -0.575;
  root.add(foot_ring);

  const radius_samples = [
    [-0.58, 0.23],
    [-0.56, 0.28],
    [-0.50, 0.34],
    [-0.39, 0.40],
    [-0.22, 0.45],
    [-0.02, 0.48],
    [0.16, 0.47],
    [0.30, 0.42],
    [0.40, 0.35],
    [0.48, 0.285],
    [0.55, 0.255],
    [0.60, 0.265],
    [0.625, 0.295]
  ];

  function vaseRadiusAt(y) {
    if (y <= radius_samples[0][0]) return radius_samples[0][1];
    for (let i = 0; i < radius_samples.length - 1; i++) {
      const a = radius_samples[i];
      const b = radius_samples[i + 1];
      if (y <= b[0]) {
        const t = (y - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * t;
      }
    }
    return radius_samples[radius_samples.length - 1][1];
  }

  function surfacePoint(angle, y, extra) {
    const r = vaseRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.cos(angle) * r,
      y,
      Math.sin(angle) * r
    );
  }

  const gold_patchShape = new THREE.Shape();
  gold_patchShape.moveTo(-0.055, 0.295);
  gold_patchShape.lineTo(-0.015, 0.255);
  gold_patchShape.lineTo(-0.035, 0.205);
  gold_patchShape.lineTo(0.005, 0.155);
  gold_patchShape.lineTo(-0.015, 0.105);
  gold_patchShape.lineTo(0.020, 0.055);
  gold_patchShape.lineTo(0.000, 0.000);
  gold_patchShape.lineTo(0.045, -0.080);
  gold_patchShape.lineTo(0.075, -0.170);
  gold_patchShape.lineTo(0.105, -0.270);
  gold_patchShape.lineTo(0.120, -0.390);
  gold_patchShape.lineTo(0.085, -0.535);
  gold_patchShape.lineTo(0.015, -0.565);
  gold_patchShape.lineTo(-0.070, -0.555);
  gold_patchShape.lineTo(-0.125, -0.470);
  gold_patchShape.lineTo(-0.150, -0.355);
  gold_patchShape.lineTo(-0.165, -0.245);
  gold_patchShape.lineTo(-0.145, -0.135);
  gold_patchShape.lineTo(-0.115, -0.035);
  gold_patchShape.lineTo(-0.095, 0.080);
  gold_patchShape.lineTo(-0.085, 0.180);
  gold_patchShape.closePath();

  const patch_center_angle = 1.72;
  const patch_center_y = -0.08;
  const patch_radius = vaseRadiusAt(patch_center_y);
  const gold_patchGeom = new THREE.ShapeGeometry(gold_patchShape);
  const gold_patch_uv = gold_patchGeom.attributes.uv;
  const gold_patch_pos = gold_patchGeom.attributes.position;
  for (let i = 0; i < gold_patch_pos.count; i++) {
    const localX = gold_patch_pos.getX(i);
    const localY = gold_patch_pos.getY(i);
    gold_patch_uv.setXY(
      i,
      (localX + patch_radius) / (patch_radius * 2),
      (localY + 0.30) / 0.62
    );
  }
  gold_patch_uv.needsUpdate = true;
  gold_patchGeom.computeVertexNormals();

  const gold_patch = new THREE.Mesh(gold_patchGeom, gold_glazeMat);
  gold_patch.name = "gold_patch";
  gold_patch.rotation.y = Math.PI / 2 - patch_center_angle;
  gold_patch.position.set(
    Math.cos(patch_center_angle) * patch_radius,
    patch_center_y,
    Math.sin(patch_center_angle) * patch_radius
  );
  root.add(gold_patch);

  const speckle_count = 1800;
  const gold_specklesGeom = new THREE.CircleGeometry(1, 7);
  const gold_speckles = new THREE.InstancedMesh(
    gold_specklesGeom,
    gold_glazeMat,
    speckle_count
  );
  gold_speckles.name = "gold_speckles";

  const speckle_dummy = new THREE.Object3D();
  const speckle_normal = new THREE.Vector3();
  const speckle_quat = new THREE.Quaternion();
  const decal_forward = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < speckle_count; i++) {
    const u = ((i * 73) % 1801) / 1800;
    const v = ((i * 97) % 1799) / 1798;
    let y;

    if (i % 5 === 0) {
      y = -0.54 + u * 1.08;
    } else if (i % 3 === 0) {
      y = -0.52 + u * 0.78;
    } else {
      y = -0.48 + u * 0.92;
    }

    let angle = v * Math.PI * 2 + (i % 9) * 0.017;
    const patch_dx = angle - patch_center_angle;
    const patch_dy = y - patch_center_y;
    if (
      Math.abs(patch_dx) < 0.38 &&
      patch_dy > -0.58 &&
      patch_dy < 0.34
    ) {
      angle += patch_dx < 0 ? -0.48 : 0.48;
    }

    const size = 0.0018 + (((i * 29) % 19) / 18) * 0.0048;
    speckle_normal.set(Math.cos(angle), 0, Math.sin(angle)).normalize();
    speckle_quat.setFromUnitVectors(decal_forward, speckle_normal);

    speckle_dummy.position.copy(surfacePoint(angle, y, 0.006));
    speckle_dummy.quaternion.copy(speckle_quat);
    speckle_dummy.rotateZ(((i * 17) % 31) / 31 * Math.PI);
    speckle_dummy.scale.set(
      size,
      size * (0.55 + ((i * 13) % 11) / 22),
      1
    );
    speckle_dummy.updateMatrix();
    gold_speckles.setMatrixAt(i, speckle_dummy.matrix);
  }
  gold_speckles.instanceMatrix.needsUpdate = true;
  root.add(gold_speckles);

  function createSurfaceCrack(name, coords, thickness) {
    const crack_group = new THREE.Group();
    crack_group.name = name;

    const shadow_points = [];
    const core_points = [];
    for (let i = 0; i < coords.length; i++) {
      shadow_points.push(surfacePoint(coords[i][0], coords[i][1], 0.006));
      core_points.push(surfacePoint(coords[i][0], coords[i][1], 0.012));
    }

    const shadow_curve = new THREE.CatmullRomCurve3(
      shadow_points,
      false,
      "centripetal"
    );
    const core_curve = new THREE.CatmullRomCurve3(
      core_points,
      false,
      "centripetal"
    );

    const shadow_geom = new THREE.TubeGeometry(
      shadow_curve,
      Math.max(16, coords.length * 5),
      thickness,
      7,
      false
    );
    const shadow = new THREE.Mesh(shadow_geom, crack_shadowMat);
    shadow.name = name + "_shadow";
    crack_group.add(shadow);

    const core_geom = new THREE.TubeGeometry(
      core_curve,
      Math.max(16, coords.length * 5),
      thickness * 0.38,
      6,
      false
    );
    const core = new THREE.Mesh(core_geom, crack_coreMat);
    core.name = name + "_core";
    crack_group.add(core);

    return crack_group;
  }

  const main_crack = createSurfaceCrack("main_crack", [
    [2.18, 0.54],
    [2.10, 0.45],
    [2.04, 0.36],
    [1.98, 0.27],
    [1.91, 0.18],
    [1.98, 0.10],
    [1.92, 0.02],
    [1.99, -0.06],
    [1.93, -0.13],
    [1.98, -0.20]
  ], 0.0105);
  root.add(main_crack);

  const left_branch_crack = createSurfaceCrack("left_branch_crack", [
    [1.98, -0.20],
    [2.05, -0.29],
    [2.12, -0.38],
    [2.18, -0.47],
    [2.23, -0.56],
    [2.25, -0.62]
  ], 0.0085);
  root.add(left_branch_crack);

  const right_branch_crack = createSurfaceCrack("right_branch_crack", [
    [1.98, -0.20],
    [1.84, -0.27],
    [1.69, -0.35],
    [1.54, -0.43],
    [1.40, -0.51],
    [1.31, -0.59],
    [1.28, -0.63]
  ], 0.0085);
  root.add(right_branch_crack);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.98 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
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
