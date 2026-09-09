function __sn17_user(THREE) {
  const root = new THREE.Group();
  const plum_group = new THREE.Group();
  plum_group.rotation.set(-0.18, -0.08, -0.58);
  root.add(plum_group);

  const body_half_height = 0.62;
  const body_max_radius = 0.43;

  function bodyRadiusAt(y) {
    const t = Math.max(-1, Math.min(1, y / body_half_height));
    const roundness = Math.sqrt(Math.max(0, 1 - t * t));
    const asymmetry = 1 - 0.045 * t + 0.018 * (1 - t * t);
    return body_max_radius * roundness * asymmetry;
  }

  const body_profile = [];
  for (let i = 0; i <= 64; i++) {
    const t = -1 + (2 * i) / 64;
    const y = t * body_half_height;
    body_profile.push(new THREE.Vector2(bodyRadiusAt(y), y));
  }

  const body_texture_size = 128;
  const body_texture_data = new Uint8Array(
    body_texture_size * body_texture_size * 4
  );

  for (let py = 0; py < body_texture_size; py++) {
    for (let px = 0; px < body_texture_size; px++) {
      const u = px / (body_texture_size - 1);
      const v = py / (body_texture_size - 1);
      const broad =
        Math.sin(u * 13.7 + Math.sin(v * 8.3) * 1.8) * 0.42 +
        Math.sin(v * 19.1 - u * 5.9) * 0.31 +
        Math.sin((u + v) * 31.0) * 0.15;
      const fine =
        Math.sin(u * 71.0 + v * 17.0) * 0.55 +
        Math.sin(v * 83.0 - u * 23.0) * 0.45;
      const pore_signal =
        Math.sin(u * 113.0 + Math.sin(v * 29.0) * 3.0) *
        Math.sin(v * 107.0 - u * 19.0);
      const pore = Math.max(0, pore_signal - 0.72) / 0.28;
      const grain = Math.max(
        0,
        Math.sin(u * 157.0 + v * 41.0) *
          Math.sin(v * 149.0 - u * 37.0)
      );
      const tone = Math.max(
        0,
        Math.min(1, 0.5 + broad * 0.22 + fine * 0.07 - pore * 0.2 + grain * 0.035)
      );
      const index = (py * body_texture_size + px) * 4;
      body_texture_data[index] = Math.round(58 + tone * 72);
      body_texture_data[index + 1] = Math.round(24 + tone * 48);
      body_texture_data[index + 2] = Math.round(78 + tone * 88);
      body_texture_data[index + 3] = 255;
    }
  }

  const body_texture = new THREE.DataTexture(
    body_texture_data,
    body_texture_size,
    body_texture_size,
    THREE.RGBAFormat
  );
  body_texture.wrapS = THREE.RepeatWrapping;
  body_texture.wrapT = THREE.ClampToEdgeWrapping;
  body_texture.magFilter = THREE.LinearFilter;
  body_texture.minFilter = THREE.LinearFilter;
  body_texture.needsUpdate = true;

  const body_mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: body_texture,
    bumpMap: body_texture,
    bumpScale: 0.004,
    roughness: 0.34
  });

  const body_geo = new THREE.LatheGeometry(body_profile, 96);
  body_geo.computeVertexNormals();
  const body = new THREE.Mesh(body_geo, body_mat);
  plum_group.add(body);

  const dark_skin_patches_mat = new THREE.MeshStandardMaterial({
    color: 0x2b001d,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const dark_skin_patches_geo = new THREE.CircleGeometry(1, 18);
  const dark_patch_count = 34;
  const dark_skin_patches = new THREE.InstancedMesh(
    dark_skin_patches_geo,
    dark_skin_patches_mat,
    dark_patch_count
  );
  const patch_dummy = new THREE.Object3D();
  const patch_forward = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < dark_patch_count; i++) {
    const row = Math.floor(i / 10);
    let y = -0.36 + row * 0.25;
    y += (((i * 7) % 5) - 2) * 0.012;
    let angle =
      ((i * 137 + row * 31) % 360) * Math.PI / 180;
    angle += (((i * 5) % 7) - 3) * 0.025;

    const radius = bodyRadiusAt(y);
    const epsilon = 0.002;
    const derivative =
      (bodyRadiusAt(y + epsilon) - bodyRadiusAt(y - epsilon)) /
      (epsilon * 2);
    const normal = new THREE.Vector3(
      Math.cos(angle),
      -derivative,
      Math.sin(angle)
    ).normalize();

    patch_dummy.position
      .set(Math.cos(angle) * radius, y, Math.sin(angle) * radius)
      .addScaledVector(normal, 0.004);
    patch_dummy.quaternion.setFromUnitVectors(patch_forward, normal);
    patch_dummy.rotateZ(((i * 23) % 360) * Math.PI / 180);

    const width = 0.018 + ((i * 11) % 9) * 0.004;
    const height = 0.012 + ((i * 5) % 7) * 0.003;
    patch_dummy.scale.set(width, height, 1);
    patch_dummy.updateMatrix();
    dark_skin_patches.setMatrixAt(i, patch_dummy.matrix);
  }
  dark_skin_patches.instanceMatrix.needsUpdate = true;
  plum_group.add(dark_skin_patches);

  const skin_speckles_mat = new THREE.MeshStandardMaterial({
    color: 0x160010,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const skin_speckles_geo = new THREE.CircleGeometry(1, 8);
  const speckle_count = 120;
  const skin_speckles = new THREE.InstancedMesh(
    skin_speckles_geo,
    skin_speckles_mat,
    speckle_count
  );
  const speckle_dummy = new THREE.Object3D();

  for (let i = 0; i < speckle_count; i++) {
    const t = -0.88 + (1.76 * ((i * 37) % 100)) / 100;
    const y = t * body_half_height;
    const angle = ((i * 149 + 23) % 360) * Math.PI / 180;
    const radius = bodyRadiusAt(y);
    const epsilon = 0.002;
    const derivative =
      (bodyRadiusAt(y + epsilon) - bodyRadiusAt(y - epsilon)) /
      (epsilon * 2);
    const normal = new THREE.Vector3(
      Math.cos(angle),
      -derivative,
      Math.sin(angle)
    ).normalize();

    speckle_dummy.position
      .set(Math.cos(angle) * radius, y, Math.sin(angle) * radius)
      .addScaledVector(normal, 0.0045);
    speckle_dummy.quaternion.setFromUnitVectors(patch_forward, normal);
    speckle_dummy.rotateZ(((i * 41) % 360) * Math.PI / 180);

    const size = 0.0025 + ((i * 17) % 7) * 0.00055;
    speckle_dummy.scale.set(size * 1.25, size * 0.72, 1);
    speckle_dummy.updateMatrix();
    skin_speckles.setMatrixAt(i, speckle_dummy.matrix);
  }
  skin_speckles.instanceMatrix.needsUpdate = true;
  plum_group.add(skin_speckles);

  const stem_socket_mat = new THREE.MeshStandardMaterial({
    color: 0x4d681c,
    roughness: 0.72
  });
  const stem_socket_geo = new THREE.SphereGeometry(0.055, 24, 12);
  const stem_socket = new THREE.Mesh(stem_socket_geo, stem_socket_mat);
  stem_socket.position.set(0, body_half_height - 0.006, 0);
  stem_socket.scale.set(1, 0.34, 1);
  plum_group.add(stem_socket);

  const stem_points = [
    new THREE.Vector3(0, body_half_height - 0.005, 0),
    new THREE.Vector3(0.018, 0.69, 0.004),
    new THREE.Vector3(0.052, 0.78, 0.012),
    new THREE.Vector3(0.09, 0.87, 0.021)
  ];
  const stem_curve = new THREE.CatmullRomCurve3(
    stem_points,
    false,
    "centripetal"
  );
  const stem_mat = new THREE.MeshStandardMaterial({
    color: 0x668321,
    roughness: 0.68
  });
  const stem_geo = new THREE.TubeGeometry(stem_curve, 32, 0.023, 16, false);
  const stem = new THREE.Mesh(stem_geo, stem_mat);
  plum_group.add(stem);

  const stem_highlight_points = [
    new THREE.Vector3(0.006, body_half_height + 0.004, 0.02),
    new THREE.Vector3(0.026, 0.69, 0.025),
    new THREE.Vector3(0.058, 0.78, 0.033),
    new THREE.Vector3(0.093, 0.865, 0.04)
  ];
  const stem_highlight_curve = new THREE.CatmullRomCurve3(
    stem_highlight_points,
    false,
    "centripetal"
  );
  const stem_highlight_mat = new THREE.MeshStandardMaterial({
    color: 0x87a43a,
    roughness: 0.62
  });
  const stem_highlight_geo = new THREE.TubeGeometry(
    stem_highlight_curve,
    24,
    0.004,
    8,
    false
  );
  const stem_highlight = new THREE.Mesh(
    stem_highlight_geo,
    stem_highlight_mat
  );
  plum_group.add(stem_highlight);

  const stem_end_group = new THREE.Group();
  stem_end_group.position.copy(stem_points[stem_points.length - 1]);
  const stem_end_direction = stem_points[stem_points.length - 1]
    .clone()
    .sub(stem_points[stem_points.length - 2])
    .normalize();
  stem_end_group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    stem_end_direction
  );
  plum_group.add(stem_end_group);

  const stem_collar_mat = new THREE.MeshStandardMaterial({
    color: 0x6f5028,
    roughness: 0.9
  });
  const stem_collar_geo = new THREE.CylinderGeometry(
    0.035,
    0.028,
    0.03,
    12
  );
  const stem_collar = new THREE.Mesh(stem_collar_geo, stem_collar_mat);
  stem_collar.position.y = 0.012;
  stem_end_group.add(stem_collar);

  const stem_cap_mat = new THREE.MeshStandardMaterial({
    color: 0x76502d,
    roughness: 0.92
  });
  const stem_cap_geo = new THREE.CylinderGeometry(
    0.041,
    0.035,
    0.026,
    12
  );
  const stem_cap = new THREE.Mesh(stem_cap_geo, stem_cap_mat);
  stem_cap.position.y = 0.033;
  stem_end_group.add(stem_cap);

  const stem_ridges_mat = new THREE.MeshStandardMaterial({
    color: 0x49301d,
    roughness: 0.95
  });
  const stem_ridges_geo = new THREE.BoxGeometry(0.006, 0.026, 0.008);
  const stem_ridge_count = 10;
  const stem_ridges = new THREE.InstancedMesh(
    stem_ridges_geo,
    stem_ridges_mat,
    stem_ridge_count
  );
  const ridge_dummy = new THREE.Object3D();

  for (let i = 0; i < stem_ridge_count; i++) {
    const angle = (i / stem_ridge_count) * Math.PI * 2;
    ridge_dummy.position.set(
      Math.cos(angle) * 0.038,
      0.034,
      Math.sin(angle) * 0.038
    );
    ridge_dummy.rotation.set(0, -angle, 0);
    ridge_dummy.scale.set(1, 0.82 + (i % 3) * 0.08, 1);
    ridge_dummy.updateMatrix();
    stem_ridges.setMatrixAt(i, ridge_dummy.matrix);
  }
  stem_ridges.instanceMatrix.needsUpdate = true;
  stem_end_group.add(stem_ridges);

  const stem_top_mat = new THREE.MeshStandardMaterial({
    color: 0x5c3820,
    roughness: 0.94
  });
  const stem_top_geo = new THREE.CylinderGeometry(
    0.032,
    0.038,
    0.008,
    12
  );
  const stem_top = new THREE.Mesh(stem_top_geo, stem_top_mat);
  stem_top.position.y = 0.049;
  stem_end_group.add(stem_top);

  const blossom_socket_mat = new THREE.MeshStandardMaterial({
    color: 0x24130e,
    roughness: 0.9
  });
  const blossom_socket_geo = new THREE.SphereGeometry(0.034, 16, 8);
  const blossom_socket = new THREE.Mesh(
    blossom_socket_geo,
    blossom_socket_mat
  );
  blossom_socket.position.set(0, -body_half_height + 0.004, 0);
  blossom_socket.scale.set(0.9, 0.42, 0.9);
  plum_group.add(blossom_socket);

  const dried_sepal_mat = new THREE.MeshStandardMaterial({
    color: 0x2b1710,
    roughness: 0.92
  });
  const dried_sepals = new THREE.Group();
  const sepal_tip_positions = [
    new THREE.Vector3(-0.026, -body_half_height - 0.055, 0.012),
    new THREE.Vector3(0.022, -body_half_height - 0.052, -0.018),
    new THREE.Vector3(-0.008, -body_half_height - 0.064, -0.012),
    new THREE.Vector3(0.034, -body_half_height - 0.04, 0.018)
  ];

  for (let i = 0; i < sepal_tip_positions.length; i++) {
    const base = new THREE.Vector3(
      (i - 1.5) * 0.006,
      -body_half_height + 0.001,
      ((i % 3) - 1) * 0.006
    );
    const tip = sepal_tip_positions[i];
    const middle = base.clone().lerp(tip, 0.52);
    middle.x += (i % 2 === 0 ? 1 : -1) * 0.008;
    const sepal_curve = new THREE.CatmullRomCurve3(
      [base, middle, tip],
      false,
      "centripetal"
    );
    const sepal_geo = new THREE.TubeGeometry(
      sepal_curve,
      10,
      0.0045,
      6,
      false
    );
    const sepal = new THREE.Mesh(sepal_geo, dried_sepal_mat);
    dried_sepals.add(sepal);
  }
  plum_group.add(dried_sepals);

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
