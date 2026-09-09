function __sn17_user(THREE) {
  const root = new THREE.Group();
  const scoop_group = new THREE.Group();
  root.add(scoop_group);

  const sphere_radius = 0.42;
  const scoop_center = new THREE.Vector3(-0.10, 0.18, 0.02);
  const handle_direction = new THREE.Vector3(0.58, -0.80, 0.14).normalize();

  const ice_cream_scoopMat = new THREE.MeshStandardMaterial({
    color: 0xff1738,
    metalness: false,
    roughness: 0.95,
    emissive: 0x4a000b,
    emissiveIntensity: 0.22,
  });
  const raised_ice_bandMat = new THREE.MeshStandardMaterial({
    color: 0xf41232,
    metalness: false,
    roughness: 0.95,
    emissive: 0x4a000b,
    emissiveIntensity: 0.22,
  });
  const surface_pitsMat = new THREE.MeshStandardMaterial({
    color: 0xd80c2b,
    metalness: false,
    roughness: 0.98,
    side: THREE.DoubleSide,
  });
  const surface_grainsMat = new THREE.MeshStandardMaterial({
    color: 0xff6573,
    metalness: false,
    roughness: 0.95,
  });
  const surface_scratchesMat = new THREE.MeshStandardMaterial({
    color: 0xc90b28,
    metalness: false,
    roughness: 0.98,
    side: THREE.DoubleSide,
  });
  const stickMat = new THREE.MeshStandardMaterial({
    color: 0xe5092d,
    metalness: false,
    roughness: 0.38,
    emissive: 0x4a000b,
    emissiveIntensity: 0.22,
  });

  const ice_cream_scoopGeom = new THREE.SphereGeometry(sphere_radius, 64, 40);
  const scoop_positions = ice_cream_scoopGeom.attributes.position;
  const scoop_vertex = new THREE.Vector3();

  for (let i = 0; i < scoop_positions.count; i++) {
    scoop_vertex.fromBufferAttribute(scoop_positions, i);
    const length = scoop_vertex.length() || 1;
    const nx = scoop_vertex.x / length;
    const ny = scoop_vertex.y / length;
    const nz = scoop_vertex.z / length;
    const fine_noise =
      Math.sin(nx * 31 + ny * 17 + nz * 13) *
      Math.sin(nx * 11 - ny * 29 + nz * 23);
    const broad_noise = Math.sin(nx * 7 - ny * 9 + nz * 5);
    const displaced_radius =
      sphere_radius * (1 + fine_noise * 0.0045 + broad_noise * 0.002);
    scoop_vertex.multiplyScalar(displaced_radius / length);
    scoop_positions.setXYZ(i, scoop_vertex.x, scoop_vertex.y, scoop_vertex.z);
  }
  scoop_positions.needsUpdate = true;
  ice_cream_scoopGeom.computeVertexNormals();

  const ice_cream_scoop = new THREE.Mesh(
    ice_cream_scoopGeom,
    ice_cream_scoopMat
  );
  ice_cream_scoop.position.copy(scoop_center);
  scoop_group.add(ice_cream_scoop);

  const band_normal = new THREE.Vector3(-0.22, 0.20, 0.95).normalize();
  const band_quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    band_normal
  );
  const band_offset = 0.078;
  const band_center_distance = Math.sqrt(
    sphere_radius * sphere_radius - band_offset * band_offset
  );

  const raised_ice_bandGeom = new THREE.TorusGeometry(
    band_center_distance,
    0.014,
    12,
    96
  );
  const raised_ice_band = new THREE.Mesh(
    raised_ice_bandGeom,
    raised_ice_bandMat
  );
  raised_ice_band.quaternion.copy(band_quaternion);
  raised_ice_band.position
    .copy(scoop_center)
    .addScaledVector(band_normal, band_offset);
  scoop_group.add(raised_ice_band);

  const lower_lip_points = [];
  const lower_lip_radius =
    Math.sqrt(sphere_radius * sphere_radius - 0.105 * 0.105) * 0.985;
  for (let i = 0; i < 32; i++) {
    const angle = (i / 32) * Math.PI * 2;
    const point = new THREE.Vector3(
      Math.cos(angle) * lower_lip_radius,
      Math.sin(angle) * lower_lip_radius,
      0
    );
    point.applyQuaternion(band_quaternion);
    point.addScaledVector(band_normal, -0.105);
    point.add(scoop_center);
    lower_lip_points.push(point);
  }
  const lower_ice_lipCurve = new THREE.CatmullRomCurve3(
    lower_lip_points,
    true,
    "centripetal"
  );
  const lower_ice_lipGeom = new THREE.TubeGeometry(
    lower_ice_lipCurve,
    96,
    0.012,
    8,
    true
  );
  const lower_ice_lip = new THREE.Mesh(
    lower_ice_lipGeom,
    raised_ice_bandMat
  );
  scoop_group.add(lower_ice_lip);

  const surface_pitsGeom = new THREE.CircleGeometry(1, 10);
  const pit_count = 112;
  const surface_pits = new THREE.InstancedMesh(
    surface_pitsGeom,
    surface_pitsMat,
    pit_count
  );
  const pit_dummy = new THREE.Object3D();
  const pit_normal = new THREE.Vector3();
  const pit_forward = new THREE.Vector3(0, 0, 1);
  const golden_angle = 2.399963229728653;

  for (let i = 0; i < pit_count; i++) {
    const y = 1 - (2 * (i + 0.5)) / pit_count;
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = i * golden_angle + 0.19;
    pit_normal.set(
      Math.cos(angle) * radial,
      y,
      Math.sin(angle) * radial
    ).normalize();

    const width = 0.0035 + ((i * 7) % 11) * 0.00085;
    const height = width * (0.45 + ((i * 5) % 7) * 0.08);
    pit_dummy.position
      .copy(scoop_center)
      .addScaledVector(pit_normal, sphere_radius + 0.0022);
    pit_dummy.quaternion.setFromUnitVectors(pit_forward, pit_normal);
    pit_dummy.rotateZ(((i * 29) % 31) / 31 * Math.PI);
    pit_dummy.scale.set(width, height, 1);
    pit_dummy.updateMatrix();
    surface_pits.setMatrixAt(i, pit_dummy.matrix);
  }
  surface_pits.instanceMatrix.needsUpdate = true;
  scoop_group.add(surface_pits);

  const surface_grainsGeom = new THREE.IcosahedronGeometry(1, 0);
  const grain_count = 150;
  const surface_grains = new THREE.InstancedMesh(
    surface_grainsGeom,
    surface_grainsMat,
    grain_count
  );
  const grain_dummy = new THREE.Object3D();
  const grain_normal = new THREE.Vector3();
  const grain_forward = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < grain_count; i++) {
    const y = 1 - (2 * (i + 0.35)) / grain_count;
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = i * golden_angle + 1.13;
    grain_normal.set(
      Math.cos(angle) * radial,
      y,
      Math.sin(angle) * radial
    ).normalize();

    const grain_size = 0.0018 + ((i * 11) % 9) * 0.00038;
    grain_dummy.position
      .copy(scoop_center)
      .addScaledVector(grain_normal, sphere_radius + grain_size * 0.25);
    grain_dummy.quaternion.setFromUnitVectors(grain_forward, grain_normal);
    grain_dummy.rotateZ(((i * 17) % 23) / 23 * Math.PI);
    grain_dummy.scale.set(
      grain_size,
      grain_size * (0.55 + ((i * 3) % 5) * 0.1),
      grain_size * 0.35
    );
    grain_dummy.updateMatrix();
    surface_grains.setMatrixAt(i, grain_dummy.matrix);
  }
  surface_grains.instanceMatrix.needsUpdate = true;
  scoop_group.add(surface_grains);

  const scratch_data = [
    [-0.36, 0.34, 0.055, 0.0060, 0.35],
    [-0.25, 0.48, 0.040, 0.0050, -0.20],
    [-0.10, 0.55, 0.060, 0.0065, 0.10],
    [0.05, 0.48, 0.045, 0.0050, -0.45],
    [0.18, 0.36, 0.050, 0.0055, 0.55],
    [-0.48, 0.08, 0.045, 0.0050, -0.30],
    [-0.34, 0.12, 0.060, 0.0060, 0.20],
    [-0.18, 0.18, 0.040, 0.0050, -0.60],
    [0.00, 0.20, 0.055, 0.0055, 0.40],
    [0.22, 0.12, 0.045, 0.0050, -0.15],
    [-0.42, -0.18, 0.050, 0.0055, 0.50],
    [-0.22, -0.12, 0.040, 0.0050, -0.25],
    [0.02, -0.08, 0.055, 0.0060, 0.15],
    [0.28, -0.14, 0.045, 0.0050, -0.50],
    [-0.12, 0.66, 0.035, 0.0045, 0.60],
    [0.34, 0.02, 0.038, 0.0048, 0.25],
  ];
  const surface_scratchesGeom = new THREE.CircleGeometry(1, 14);
  const surface_scratches = new THREE.InstancedMesh(
    surface_scratchesGeom,
    surface_scratchesMat,
    scratch_data.length
  );
  const scratch_dummy = new THREE.Object3D();
  const scratch_normal = new THREE.Vector3();
  const scratch_position = new THREE.Vector3();
  const scratch_tangent_x = new THREE.Vector3();
  const scratch_tangent_y = new THREE.Vector3();
  const scratch_basis = new THREE.Matrix4();
  const scratch_quaternion = new THREE.Quaternion();
  const scratch_roll = new THREE.Quaternion();
  const local_forward = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < scratch_data.length; i++) {
    const data = scratch_data[i];
    const dx = data[0];
    const dy = data[1];
    const dz = Math.sqrt(
      Math.max(0.01, sphere_radius * sphere_radius - dx * dx - dy * dy)
    ) - 0.014;

    scratch_normal.set(dx, dy, dz).normalize();
    scratch_position
      .copy(scoop_center)
      .addScaledVector(scratch_normal, sphere_radius);

    scratch_tangent_x.crossVectors(local_forward, scratch_normal).normalize();
    scratch_tangent_y.crossVectors(scratch_normal, scratch_tangent_x).normalize();
    scratch_basis.makeBasis(
      scratch_tangent_x,
      scratch_tangent_y,
      scratch_normal
    );
    scratch_quaternion.setFromRotationMatrix(scratch_basis);
    scratch_roll.setFromAxisAngle(local_forward, data[4]);
    scratch_quaternion.multiply(scratch_roll);

    scratch_dummy.position.copy(scratch_position);
    scratch_dummy.quaternion.copy(scratch_quaternion);
    scratch_dummy.scale.set(data[2], data[3], 1);
    scratch_dummy.updateMatrix();
    surface_scratches.setMatrixAt(i, scratch_dummy.matrix);
  }
  surface_scratches.instanceMatrix.needsUpdate = true;
  scoop_group.add(surface_scratches);

  const stick_start = scoop_center.clone().addScaledVector(
    handle_direction,
    sphere_radius * 0.76
  );
  const stick_end = stick_start.clone().addScaledVector(
    handle_direction,
    0.58
  );
  const stick_length = stick_start.distanceTo(stick_end);
  const stick_midpoint = stick_start.clone().add(stick_end).multiplyScalar(0.5);

  const stickGeom = new THREE.CapsuleGeometry(
    0.085,
    stick_length - 0.17,
    8,
    20
  );
  const stick = new THREE.Mesh(stickGeom, stickMat);
  stick.position.copy(stick_midpoint);
  stick.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    handle_direction
  );
  root.add(stick);

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
