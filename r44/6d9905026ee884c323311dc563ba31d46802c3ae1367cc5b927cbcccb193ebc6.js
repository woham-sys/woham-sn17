// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a55,
    metalness: 0.6,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const brightBrassMat = new THREE.MeshStandardMaterial({
    color: 0xc39a58,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const innerBrassMat = new THREE.MeshStandardMaterial({
    color: 0x76562d,
    metalness: 0.5,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x4d3820,
    metalness: 0.5,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x30271d,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.32,
    side: THREE.DoubleSide,
  });

  const base_group = new THREE.Group();
  root.add(base_group);

  const base_bottom_discGeom = new THREE.CylinderGeometry(0.405, 0.405, 0.045, 64);
  const base_bottom_disc = new THREE.Mesh(base_bottom_discGeom, brassMat);
  base_bottom_disc.position.y = 0.035;
  base_group.add(base_bottom_disc);

  const base_bottom_ringGeom = new THREE.TorusGeometry(0.385, 0.018, 10, 64);
  const base_bottom_ring = new THREE.Mesh(base_bottom_ringGeom, brightBrassMat);
  base_bottom_ring.rotation.x = Math.PI / 2;
  base_bottom_ring.position.y = 0.055;
  base_group.add(base_bottom_ring);

  const base_domeProfile = [
    new THREE.Vector2(0.000, 0.055),
    new THREE.Vector2(0.360, 0.055),
    new THREE.Vector2(0.390, 0.080),
    new THREE.Vector2(0.395, 0.140),
    new THREE.Vector2(0.395, 0.270),
    new THREE.Vector2(0.380, 0.360),
    new THREE.Vector2(0.340, 0.440),
    new THREE.Vector2(0.270, 0.500),
    new THREE.Vector2(0.180, 0.535),
    new THREE.Vector2(0.000, 0.545),
  ];
  const base_domeGeom = new THREE.LatheGeometry(base_domeProfile, 64);
  const base_dome = new THREE.Mesh(base_domeGeom, brassMat);
  base_group.add(base_dome);

  const base_top_plateGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.035, 64);
  const base_top_plate = new THREE.Mesh(base_top_plateGeom, brightBrassMat);
  base_top_plate.position.y = 0.555;
  base_group.add(base_top_plate);

  const base_top_ringGeom = new THREE.TorusGeometry(0.190, 0.012, 8, 64);
  const base_top_ring = new THREE.Mesh(base_top_ringGeom, darkBrassMat);
  base_top_ring.rotation.x = Math.PI / 2;
  base_top_ring.position.y = 0.574;
  base_group.add(base_top_ring);

  const pedestal_stemProfile = [
    new THREE.Vector2(0.000, 0.555),
    new THREE.Vector2(0.170, 0.555),
    new THREE.Vector2(0.180, 0.580),
    new THREE.Vector2(0.145, 0.610),
    new THREE.Vector2(0.105, 0.640),
    new THREE.Vector2(0.085, 0.690),
    new THREE.Vector2(0.085, 0.735),
    new THREE.Vector2(0.105, 0.770),
    new THREE.Vector2(0.145, 0.795),
    new THREE.Vector2(0.145, 0.815),
    new THREE.Vector2(0.000, 0.815),
  ];
  const pedestal_stemGeom = new THREE.LatheGeometry(pedestal_stemProfile, 48);
  const pedestal_stem = new THREE.Mesh(pedestal_stemGeom, brassMat);
  root.add(pedestal_stem);

  const stem_lower_collarGeom = new THREE.TorusGeometry(0.145, 0.012, 8, 48);
  const stem_lower_collar = new THREE.Mesh(stem_lower_collarGeom, darkBrassMat);
  stem_lower_collar.rotation.x = Math.PI / 2;
  stem_lower_collar.position.y = 0.595;
  root.add(stem_lower_collar);

  const stem_upper_collarGeom = new THREE.TorusGeometry(0.132, 0.012, 8, 48);
  const stem_upper_collar = new THREE.Mesh(stem_upper_collarGeom, brightBrassMat);
  stem_upper_collar.rotation.x = Math.PI / 2;
  stem_upper_collar.position.y = 0.795;
  root.add(stem_upper_collar);

  const bowl_group = new THREE.Group();
  bowl_group.position.set(0, 0.79, 0);
  bowl_group.rotation.set(0.18, 0, -0.28);
  root.add(bowl_group);

  const outer_bowlProfile = new THREE.SplineCurve([
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.100, 0.015),
    new THREE.Vector2(0.220, 0.070),
    new THREE.Vector2(0.340, 0.180),
    new THREE.Vector2(0.430, 0.360),
    new THREE.Vector2(0.490, 0.580),
    new THREE.Vector2(0.515, 0.780),
    new THREE.Vector2(0.505, 0.900),
  ]).getSpacedPoints(40);
  const outer_bowlGeom = new THREE.LatheGeometry(outer_bowlProfile, 64);
  const outer_bowl = new THREE.Mesh(outer_bowlGeom, brassMat);
  bowl_group.add(outer_bowl);

  const inner_bowlProfile = new THREE.SplineCurve([
    new THREE.Vector2(0.000, 0.105),
    new THREE.Vector2(0.120, 0.115),
    new THREE.Vector2(0.250, 0.180),
    new THREE.Vector2(0.360, 0.320),
    new THREE.Vector2(0.435, 0.520),
    new THREE.Vector2(0.475, 0.720),
    new THREE.Vector2(0.482, 0.895),
  ]).getSpacedPoints(36);
  const inner_bowlGeom = new THREE.LatheGeometry(inner_bowlProfile, 64);
  const inner_bowl = new THREE.Mesh(inner_bowlGeom, innerBrassMat);
  bowl_group.add(inner_bowl);

  const upper_rim_bandProfile = [
    new THREE.Vector2(0.493, 0.735),
    new THREE.Vector2(0.515, 0.775),
    new THREE.Vector2(0.525, 0.850),
    new THREE.Vector2(0.520, 0.910),
  ];
  const upper_rim_bandGeom = new THREE.LatheGeometry(upper_rim_bandProfile, 64);
  const upper_rim_band = new THREE.Mesh(upper_rim_bandGeom, brightBrassMat);
  bowl_group.add(upper_rim_band);

  const rim_shadowGeom = new THREE.TorusGeometry(0.505, 0.010, 8, 64);
  const rim_shadow = new THREE.Mesh(rim_shadowGeom, darkBrassMat);
  rim_shadow.rotation.x = Math.PI / 2;
  rim_shadow.position.y = 0.745;
  bowl_group.add(rim_shadow);

  const rolled_rimGeom = new THREE.TorusGeometry(0.505, 0.018, 12, 72);
  const rolled_rim = new THREE.Mesh(rolled_rimGeom, brightBrassMat);
  rolled_rim.rotation.x = Math.PI / 2;
  rolled_rim.position.y = 0.910;
  bowl_group.add(rolled_rim);

  const inner_rimGeom = new THREE.TorusGeometry(0.478, 0.008, 8, 64);
  const inner_rim = new THREE.Mesh(inner_rimGeom, darkBrassMat);
  inner_rim.rotation.x = Math.PI / 2;
  inner_rim.position.y = 0.892;
  bowl_group.add(inner_rim);

  const inner_grooveGeom = new THREE.TorusGeometry(0.365, 0.006, 6, 64);
  const inner_groove = new THREE.Mesh(inner_grooveGeom, darkBrassMat);
  inner_groove.rotation.x = Math.PI / 2;
  inner_groove.position.y = 0.610;
  bowl_group.add(inner_groove);

  const handle_mountGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.026, 24);
  const handle_mount = new THREE.Mesh(handle_mountGeom, darkBrassMat);
  handle_mount.rotation.z = Math.PI / 2;
  handle_mount.position.set(0.505, 0.735, 0.035);
  bowl_group.add(handle_mount);

  const handle_pinGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.075, 20);
  const handle_pin = new THREE.Mesh(handle_pinGeom, brightBrassMat);
  handle_pin.rotation.z = Math.PI / 2;
  handle_pin.position.set(0.535, 0.735, 0.035);
  bowl_group.add(handle_pin);

  const handle_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.500, 0.775, 0.045),
    new THREE.Vector3(0.555, 0.755, 0.055),
    new THREE.Vector3(0.590, 0.690, 0.060),
    new THREE.Vector3(0.585, 0.625, 0.055),
    new THREE.Vector3(0.545, 0.585, 0.045),
    new THREE.Vector3(0.505, 0.610, 0.035),
  ], false, "centripetal");
  const handle_strapGeom = new THREE.TubeGeometry(handle_path, 32, 0.014, 8, false);
  const handle_strap = new THREE.Mesh(handle_strapGeom, darkBrassMat);
  bowl_group.add(handle_strap);

  const handle_gripGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.105, 20);
  const handle_grip = new THREE.Mesh(handle_gripGeom, brightBrassMat);
  handle_grip.position.set(0.575, 0.650, 0.058);
  handle_grip.rotation.z = -0.20;
  bowl_group.add(handle_grip);

  const handle_lower_mountGeom = new THREE.SphereGeometry(0.035, 20, 12);
  const handle_lower_mount = new THREE.Mesh(handle_lower_mountGeom, darkBrassMat);
  handle_lower_mount.position.set(0.505, 0.610, 0.035);
  handle_lower_mount.scale.set(0.55, 1.0, 0.75);
  bowl_group.add(handle_lower_mount);

  function outerRadiusAt(y) {
    if (y < 0.18) return 0.12 + y * 1.25;
    if (y < 0.45) return 0.345 + (y - 0.18) * 0.48;
    if (y < 0.72) return 0.474 + (y - 0.45) * 0.12;
    return 0.506;
  }

  const scratch_marks = new THREE.Group();
  const scratch_specs = [
    [1.18, 0.25, 0.070, 0.018],
    [1.48, 0.39, 0.095, -0.012],
    [1.82, 0.52, 0.060, 0.020],
    [1.05, 0.61, 0.050, -0.015],
    [2.05, 0.31, 0.045, 0.012],
    [1.62, 0.68, 0.038, -0.010],
  ];
  for (let i = 0; i < scratch_specs.length; i++) {
    const spec = scratch_specs[i];
    const points = [];
    for (let j = 0; j <= 4; j++) {
      const t = j / 4 - 0.5;
      const angle = spec[0] + t * spec[2];
      const y = spec[1] + t * spec[3];
      const radius = outerRadiusAt(y) + 0.004;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      ));
    }
    const scratchGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      8,
      0.0022,
      5,
      false
    );
    const scratch = new THREE.Mesh(scratchGeom, patinaMat);
    scratch_marks.add(scratch);
  }
  bowl_group.add(scratch_marks);

  const patina_spotsGeom = new THREE.CircleGeometry(0.018, 14);
  const patina_spots = new THREE.InstancedMesh(patina_spotsGeom, patinaMat, 8);
  const patina_specs = [
    [1.25, 0.30, 1.2, 0.45],
    [1.55, 0.47, 0.7, 0.35],
    [1.90, 0.58, 0.9, 0.30],
    [0.98, 0.52, 0.6, 0.40],
    [2.12, 0.38, 0.8, 0.28],
    [1.38, 0.66, 0.55, 0.30],
    [1.72, 0.22, 0.65, 0.25],
    [2.28, 0.61, 0.45, 0.22],
  ];
  const patina_dummy = new THREE.Object3D();
  const decal_forward = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < patina_specs.length; i++) {
    const spec = patina_specs[i];
    const angle = spec[0];
    const y = spec[1];
    const radius = outerRadiusAt(y) + 0.006;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();
    patina_dummy.position.set(normal.x * radius, y, normal.z * radius);
    patina_dummy.quaternion.setFromUnitVectors(decal_forward, normal);
    patina_dummy.scale.set(spec[2], spec[3], 1);
    patina_dummy.updateMatrix();
    patina_spots.setMatrixAt(i, patina_dummy.matrix);
  }
  patina_spots.instanceMatrix.needsUpdate = true;
  bowl_group.add(patina_spots);

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