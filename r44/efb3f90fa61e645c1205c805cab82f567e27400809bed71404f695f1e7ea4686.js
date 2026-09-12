// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_copper_pitcher";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x5a2f20,
    metalness: 0.5,
    roughness: 0.5,
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x6b3825,
    metalness: 0.5,
    roughness: 0.46,
  });
  const darkCopperMat = new THREE.MeshStandardMaterial({
    color: 0x321d17,
    metalness: 0.45,
    roughness: 0.62,
  });
  const openingMat = new THREE.MeshStandardMaterial({
    color: 0x17100d,
    metalness: 0.15,
    roughness: 0.85,
    side: THREE.DoubleSide,
  });
  const darkPatinaMat = new THREE.MeshStandardMaterial({
    color: 0x241916,
    metalness: 0.1,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const warmPatinaMat = new THREE.MeshStandardMaterial({
    color: 0x8b482d,
    metalness: 0.2,
    roughness: 0.82,
    side: THREE.DoubleSide,
  });

  const bodyProfile = [
    new THREE.Vector2(0.00, 0.25),
    new THREE.Vector2(0.28, 0.25),
    new THREE.Vector2(0.36, 0.28),
    new THREE.Vector2(0.43, 0.34),
    new THREE.Vector2(0.48, 0.43),
    new THREE.Vector2(0.515, 0.55),
    new THREE.Vector2(0.525, 0.68),
    new THREE.Vector2(0.515, 0.80),
    new THREE.Vector2(0.485, 0.91),
    new THREE.Vector2(0.435, 1.00),
    new THREE.Vector2(0.375, 1.07),
    new THREE.Vector2(0.335, 1.12),
    new THREE.Vector2(0.325, 1.18),
    new THREE.Vector2(0.325, 1.27),
    new THREE.Vector2(0.345, 1.31),
    new THREE.Vector2(0.350, 1.34),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  root.add(body);

  const pedestal_baseProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.38, 0.00),
    new THREE.Vector2(0.43, 0.015),
    new THREE.Vector2(0.46, 0.045),
    new THREE.Vector2(0.455, 0.075),
    new THREE.Vector2(0.42, 0.105),
    new THREE.Vector2(0.385, 0.135),
    new THREE.Vector2(0.36, 0.17),
    new THREE.Vector2(0.35, 0.205),
    new THREE.Vector2(0.32, 0.245),
    new THREE.Vector2(0.00, 0.255),
  ];
  const pedestal_baseGeom = new THREE.LatheGeometry(pedestal_baseProfile, 64);
  const pedestal_base = new THREE.Mesh(pedestal_baseGeom, bodyMat);
  pedestal_base.name = "pedestal_base";
  root.add(pedestal_base);

  const base_lower_ringGeom = new THREE.TorusGeometry(0.425, 0.012, 10, 64);
  const base_lower_ring = new THREE.Mesh(base_lower_ringGeom, darkCopperMat);
  base_lower_ring.name = "base_lower_ring";
  base_lower_ring.rotation.x = Math.PI / 2;
  base_lower_ring.position.y = 0.045;
  root.add(base_lower_ring);

  const base_middle_ringGeom = new THREE.TorusGeometry(0.392, 0.011, 10, 64);
  const base_middle_ring = new THREE.Mesh(base_middle_ringGeom, rimMat);
  base_middle_ring.name = "base_middle_ring";
  base_middle_ring.rotation.x = Math.PI / 2;
  base_middle_ring.position.y = 0.125;
  root.add(base_middle_ring);

  const base_upper_ringGeom = new THREE.TorusGeometry(0.342, 0.012, 10, 64);
  const base_upper_ring = new THREE.Mesh(base_upper_ringGeom, darkCopperMat);
  base_upper_ring.name = "base_upper_ring";
  base_upper_ring.rotation.x = Math.PI / 2;
  base_upper_ring.position.y = 0.225;
  root.add(base_upper_ring);

  const neck_seamGeom = new THREE.TorusGeometry(0.333, 0.009, 8, 64);
  const neck_seam = new THREE.Mesh(neck_seamGeom, darkCopperMat);
  neck_seam.name = "neck_seam";
  neck_seam.rotation.x = Math.PI / 2;
  neck_seam.position.y = 1.115;
  root.add(neck_seam);

  const rim_bandGeom = new THREE.CylinderGeometry(0.35, 0.335, 0.065, 64, 1, true);
  const rim_band = new THREE.Mesh(rim_bandGeom, rimMat);
  rim_band.name = "rim_band";
  rim_band.position.y = 1.305;
  root.add(rim_band);

  const rim_lower_ringGeom = new THREE.TorusGeometry(0.337, 0.014, 10, 64);
  const rim_lower_ring = new THREE.Mesh(rim_lower_ringGeom, darkCopperMat);
  rim_lower_ring.name = "rim_lower_ring";
  rim_lower_ring.rotation.x = Math.PI / 2;
  rim_lower_ring.position.y = 1.275;
  root.add(rim_lower_ring);

  const openingGeom = new THREE.CircleGeometry(0.305, 64);
  const opening = new THREE.Mesh(openingGeom, openingMat);
  opening.name = "opening";
  opening.rotation.x = -Math.PI / 2;
  opening.position.y = 1.337;
  root.add(opening);

  const pouring_lipShape = new THREE.Shape();
  pouring_lipShape.moveTo(-0.31, -0.11);
  pouring_lipShape.bezierCurveTo(-0.39, -0.10, -0.49, -0.055, -0.535, 0.015);
  pouring_lipShape.bezierCurveTo(-0.565, 0.075, -0.515, 0.135, -0.435, 0.155);
  pouring_lipShape.bezierCurveTo(-0.31, 0.185, -0.18, 0.145, -0.03, 0.135);
  pouring_lipShape.bezierCurveTo(0.13, 0.125, 0.27, 0.135, 0.35, 0.115);
  pouring_lipShape.bezierCurveTo(0.385, 0.105, 0.395, 0.075, 0.385, 0.035);
  pouring_lipShape.lineTo(0.37, -0.075);
  pouring_lipShape.bezierCurveTo(0.25, -0.105, 0.10, -0.105, -0.02, -0.105);
  pouring_lipShape.bezierCurveTo(-0.14, -0.105, -0.24, -0.115, -0.31, -0.11);
  pouring_lipShape.closePath();

  const pouring_lipGeom = new THREE.ExtrudeGeometry(pouring_lipShape, {
    depth: 0.055,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
  });
  const pouring_lip = new THREE.Mesh(pouring_lipGeom, rimMat);
  pouring_lip.name = "pouring_lip";
  pouring_lip.rotation.x = Math.PI / 2;
  pouring_lip.position.y = 1.365;
  root.add(pouring_lip);

  const handle_mountGeom = new THREE.SphereGeometry(1, 24, 16);

  const upper_handle_mount = new THREE.Mesh(handle_mountGeom, darkCopperMat);
  upper_handle_mount.name = "upper_handle_mount";
  upper_handle_mount.position.set(0.345, 1.17, 0.015);
  upper_handle_mount.scale.set(0.075, 0.105, 0.065);
  root.add(upper_handle_mount);

  const lower_handle_mount = new THREE.Mesh(handle_mountGeom, darkCopperMat);
  lower_handle_mount.name = "lower_handle_mount";
  lower_handle_mount.position.set(0.485, 0.47, 0.015);
  lower_handle_mount.scale.set(0.075, 0.115, 0.065);
  root.add(lower_handle_mount);

  const upper_mount_rivetGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.018, 20);
  const upper_mount_rivet = new THREE.Mesh(upper_mount_rivetGeom, rimMat);
  upper_mount_rivet.name = "upper_mount_rivet";
  upper_mount_rivet.rotation.x = Math.PI / 2;
  upper_mount_rivet.position.set(0.35, 1.17, 0.078);
  root.add(upper_mount_rivet);

  const upper_mount_rivet_centerGeom = new THREE.CylinderGeometry(0.010, 0.010, 0.021, 16);
  const upper_mount_rivet_center = new THREE.Mesh(upper_mount_rivet_centerGeom, darkCopperMat);
  upper_mount_rivet_center.name = "upper_mount_rivet_center";
  upper_mount_rivet_center.rotation.x = Math.PI / 2;
  upper_mount_rivet_center.position.set(0.35, 1.17, 0.087);
  root.add(upper_mount_rivet_center);

  const lower_mount_hookPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.475, 0.49, 0.02),
    new THREE.Vector3(0.515, 0.455, 0.025),
    new THREE.Vector3(0.555, 0.405, 0.025),
    new THREE.Vector3(0.590, 0.385, 0.020),
    new THREE.Vector3(0.610, 0.405, 0.015),
  ], false, "centripetal");
  const lower_mount_hookGeom = new THREE.TubeGeometry(
    lower_mount_hookPath,
    24,
    0.025,
    10,
    false
  );
  const lower_mount_hook = new THREE.Mesh(lower_mount_hookGeom, darkCopperMat);
  lower_mount_hook.name = "lower_mount_hook";
  root.add(lower_mount_hook);

  const handle_center_points = [
    new THREE.Vector3(0.355, 1.175, 0.020),
    new THREE.Vector3(0.455, 1.285, 0.020),
    new THREE.Vector3(0.610, 1.315, 0.020),
    new THREE.Vector3(0.735, 1.205, 0.020),
    new THREE.Vector3(0.790, 1.000, 0.020),
    new THREE.Vector3(0.785, 0.770, 0.020),
    new THREE.Vector3(0.720, 0.575, 0.020),
    new THREE.Vector3(0.610, 0.455, 0.020),
    new THREE.Vector3(0.490, 0.470, 0.020),
  ];
  const handle_center_curve = new THREE.CatmullRomCurve3(
    handle_center_points,
    false,
    "centripetal"
  );

  function createHandleStrand(phase, name) {
    const points = [];
    const sampleCount = 72;
    for (let i = 0; i <= sampleCount; i++) {
      const t = i / sampleCount;
      const point = handle_center_curve.getPoint(t);
      const tangent = handle_center_curve.getTangent(t).normalize();
      const normal = new THREE.Vector3(-tangent.y, tangent.x, 0).normalize();
      const binormal = new THREE.Vector3(0, 0, 1);
      const angle = t * Math.PI * 12 + phase;
      point.addScaledVector(normal, Math.cos(angle) * 0.024);
      point.addScaledVector(binormal, Math.sin(angle) * 0.024);
      points.push(point);
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geom = new THREE.TubeGeometry(curve, 144, 0.018, 10, false);
    const mesh = new THREE.Mesh(geom, phase < Math.PI ? rimMat : bodyMat);
    mesh.name = name;
    return mesh;
  }

  const handle_strand_1 = createHandleStrand(0, "handle_strand_1");
  const handle_strand_2 = createHandleStrand(Math.PI / 2, "handle_strand_2");
  const handle_strand_3 = createHandleStrand(Math.PI, "handle_strand_3");
  const handle_strand_4 = createHandleStrand(Math.PI * 1.5, "handle_strand_4");
  root.add(handle_strand_1, handle_strand_2, handle_strand_3, handle_strand_4);

  function bodyRadiusAt(y) {
    if (y < 0.34) return 0.36 + (y - 0.25) * 0.78;
    if (y < 0.55) return 0.43 + (y - 0.34) * 0.40;
    if (y < 0.80) return 0.515;
    if (y < 0.95) return 0.515 - (y - 0.80) * 0.27;
    if (y < 1.08) return 0.475 - (y - 0.95) * 0.62;
    return 0.335;
  }

  function setPatinaInstances(instanced, count, phase, minSize, maxSize, flatten) {
    const dummy = new THREE.Object3D();
    const localNormal = new THREE.Vector3(0, 0, 1);
    for (let i = 0; i < count; i++) {
      const angleFraction = ((i * 37 + phase * 11) % 101) / 100;
      const heightFraction = ((i * 53 + phase * 17) % 97) / 96;
      const angle = angleFraction * Math.PI * 2;
      const y = 0.34 + heightFraction * 0.72;
      const radius = bodyRadiusAt(y) + 0.004;
      const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();
      const sizeFraction = ((i * 29 + phase * 7) % 19) / 18;
      const size = minSize + (maxSize - minSize) * sizeFraction;
      const widthVariation = 0.65 + ((i * 13 + phase) % 9) / 12;

      dummy.position.set(normal.x * radius, y, normal.z * radius);
      dummy.quaternion.setFromUnitVectors(localNormal, normal);
      dummy.scale.set(size * widthVariation, size * flatten, 1);
      dummy.updateMatrix();
      instanced.setMatrixAt(i, dummy.matrix);
    }
    instanced.instanceMatrix.needsUpdate = true;
  }

  const dark_patinaGeom = new THREE.CircleGeometry(1, 14);
  const dark_patina = new THREE.InstancedMesh(dark_patinaGeom, darkPatinaMat, 34);
  dark_patina.name = "dark_patina";
  setPatinaInstances(dark_patina, 34, 3, 0.010, 0.034, 0.62);
  root.add(dark_patina);

  const warm_patinaGeom = new THREE.CircleGeometry(1, 14);
  const warm_patina = new THREE.InstancedMesh(warm_patinaGeom, warmPatinaMat, 24);
  warm_patina.name = "warm_patina";
  setPatinaInstances(warm_patina, 24, 11, 0.008, 0.026, 0.55);
  root.add(warm_patina);

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