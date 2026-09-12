// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "incandescent_bulb";

  const glass_envelopeMat = new THREE.MeshPhysicalMaterial({
    color: 0xffb36f,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const metal_collarMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  const screw_shellMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });

  const polished_rimMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });

  const terminal_contactMat = new THREE.MeshStandardMaterial({
    color: 0x171419,
    metalness: 0.0,
    roughness: 0.8
  });

  const copper_wireMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.5,
    roughness: 0.35
  });

  const filamentMat = new THREE.MeshStandardMaterial({
    color: 0xffffdc,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xffffb0,
    emissiveIntensity: 1.0
  });

  const filament_glowMat = new THREE.MeshStandardMaterial({
    color: 0xff8a18,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xff6a10,
    emissiveIntensity: 1.0
  });

  const glass_envelopeProfile = [
    new THREE.Vector2(0.00, -2.30),
    new THREE.Vector2(0.20, -2.27),
    new THREE.Vector2(0.39, -2.16),
    new THREE.Vector2(0.51, -1.98),
    new THREE.Vector2(0.56, -1.76),
    new THREE.Vector2(0.56, -1.45),
    new THREE.Vector2(0.54, -1.05),
    new THREE.Vector2(0.50, -0.60),
    new THREE.Vector2(0.45, 0.00),
    new THREE.Vector2(0.40, 0.65),
    new THREE.Vector2(0.36, 1.18),
    new THREE.Vector2(0.34, 1.42),
    new THREE.Vector2(0.00, 1.48)
  ];
  const glass_envelopeGeom = new THREE.LatheGeometry(glass_envelopeProfile, 48);
  const glass_envelope = new THREE.Mesh(glass_envelopeGeom, glass_envelopeMat);
  glass_envelope.name = "glass_envelope";
  glass_envelope.rotation.z = -Math.PI / 2;
  root.add(glass_envelope);

  const internal_support_rodGeom = new THREE.CylinderGeometry(0.018, 0.018, 1.55, 10);
  const internal_support_rod = new THREE.Mesh(internal_support_rodGeom, copper_wireMat);
  internal_support_rod.name = "internal_support_rod";
  internal_support_rod.rotation.z = -Math.PI / 2;
  internal_support_rod.position.set(0.58, 0, 0);
  root.add(internal_support_rod);

  const filament_mountGeom = new THREE.CylinderGeometry(0.085, 0.085, 0.18, 20);
  const filament_mount = new THREE.Mesh(filament_mountGeom, copper_wireMat);
  filament_mount.name = "filament_mount";
  filament_mount.rotation.z = -Math.PI / 2;
  filament_mount.position.set(1.28, 0, 0);
  root.add(filament_mount);

  const upper_lead_wirePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.25, 0.045, 0),
    new THREE.Vector3(0.95, 0.075, 0),
    new THREE.Vector3(0.55, 0.135, 0),
    new THREE.Vector3(0.10, 0.205, 0),
    new THREE.Vector3(-0.30, 0.235, 0)
  ], false, "centripetal");
  const upper_lead_wireGeom = new THREE.TubeGeometry(upper_lead_wirePath, 24, 0.018, 8, false);
  const upper_lead_wire = new THREE.Mesh(upper_lead_wireGeom, copper_wireMat);
  upper_lead_wire.name = "upper_lead_wire";
  root.add(upper_lead_wire);

  const lower_lead_wirePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.25, -0.045, 0),
    new THREE.Vector3(0.95, -0.075, 0),
    new THREE.Vector3(0.55, -0.135, 0),
    new THREE.Vector3(0.10, -0.205, 0),
    new THREE.Vector3(-0.30, -0.235, 0)
  ], false, "centripetal");
  const lower_lead_wireGeom = new THREE.TubeGeometry(lower_lead_wirePath, 24, 0.018, 8, false);
  const lower_lead_wire = new THREE.Mesh(lower_lead_wireGeom, copper_wireMat);
  lower_lead_wire.name = "lower_lead_wire";
  root.add(lower_lead_wire);

  const upper_return_wirePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.03, 0.22, 0),
    new THREE.Vector3(-1.86, 0.20, 0),
    new THREE.Vector3(-1.70, 0.11, 0),
    new THREE.Vector3(-1.48, 0.045, 0),
    new THREE.Vector3(-1.20, 0.025, 0)
  ], false, "centripetal");
  const upper_return_wireGeom = new THREE.TubeGeometry(upper_return_wirePath, 24, 0.017, 8, false);
  const upper_return_wire = new THREE.Mesh(upper_return_wireGeom, filament_glowMat);
  upper_return_wire.name = "upper_return_wire";
  root.add(upper_return_wire);

  const lower_return_wirePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.03, -0.22, 0),
    new THREE.Vector3(-1.86, -0.20, 0),
    new THREE.Vector3(-1.70, -0.11, 0),
    new THREE.Vector3(-1.48, -0.045, 0),
    new THREE.Vector3(-1.20, -0.025, 0)
  ], false, "centripetal");
  const lower_return_wireGeom = new THREE.TubeGeometry(lower_return_wirePath, 24, 0.017, 8, false);
  const lower_return_wire = new THREE.Mesh(lower_return_wireGeom, filament_glowMat);
  lower_return_wire.name = "lower_return_wire";
  root.add(lower_return_wire);

  const filament_glowPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.96, 0.22, 0),
    new THREE.Vector3(-1.45, 0.21, 0),
    new THREE.Vector3(-0.70, 0.19, 0),
    new THREE.Vector3(0.10, 0.17, 0),
    new THREE.Vector3(0.72, 0.14, 0),
    new THREE.Vector3(1.12, 0.10, 0)
  ], false, "centripetal");
  const filament_glowGeom = new THREE.TubeGeometry(filament_glowPath, 40, 0.065, 10, false);
  const filament_glow = new THREE.Mesh(filament_glowGeom, filament_glowMat);
  filament_glow.name = "filament_glow";
  root.add(filament_glow);

  const filament_corePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.96, 0.22, 0),
    new THREE.Vector3(-1.45, 0.21, 0),
    new THREE.Vector3(-0.70, 0.19, 0),
    new THREE.Vector3(0.10, 0.17, 0),
    new THREE.Vector3(0.72, 0.14, 0),
    new THREE.Vector3(1.12, 0.10, 0)
  ], false, "centripetal");
  const filament_coreGeom = new THREE.TubeGeometry(filament_corePath, 40, 0.032, 10, false);
  const filament_core = new THREE.Mesh(filament_coreGeom, filamentMat);
  filament_core.name = "filament_core";
  root.add(filament_core);

  const lower_filament_glowPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.96, -0.22, 0),
    new THREE.Vector3(-1.45, -0.21, 0),
    new THREE.Vector3(-0.70, -0.19, 0),
    new THREE.Vector3(0.10, -0.17, 0),
    new THREE.Vector3(0.72, -0.14, 0),
    new THREE.Vector3(1.12, -0.10, 0)
  ], false, "centripetal");
  const lower_filament_glowGeom = new THREE.TubeGeometry(lower_filament_glowPath, 40, 0.065, 10, false);
  const lower_filament_glow = new THREE.Mesh(lower_filament_glowGeom, filament_glowMat);
  lower_filament_glow.name = "lower_filament_glow";
  root.add(lower_filament_glow);

  const lower_filament_corePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.96, -0.22, 0),
    new THREE.Vector3(-1.45, -0.21, 0),
    new THREE.Vector3(-0.70, -0.19, 0),
    new THREE.Vector3(0.10, -0.17, 0),
    new THREE.Vector3(0.72, -0.14, 0),
    new THREE.Vector3(1.12, -0.10, 0)
  ], false, "centripetal");
  const lower_filament_coreGeom = new THREE.TubeGeometry(lower_filament_corePath, 40, 0.032, 10, false);
  const lower_filament_core = new THREE.Mesh(lower_filament_coreGeom, filamentMat);
  lower_filament_core.name = "lower_filament_core";
  root.add(lower_filament_core);

  const filament_end_capsGeom = new THREE.SphereGeometry(0.04, 12, 8);
  const filament_end_caps = new THREE.InstancedMesh(filament_end_capsGeom, filamentMat, 4);
  filament_end_caps.name = "filament_end_caps";
  const filament_cap_dummy = new THREE.Object3D();
  const filament_cap_positions = [
    [-1.96, 0.22, 0],
    [1.12, 0.10, 0],
    [-1.96, -0.22, 0],
    [1.12, -0.10, 0]
  ];
  for (let i = 0; i < filament_cap_positions.length; i++) {
    const p = filament_cap_positions[i];
    filament_cap_dummy.position.set(p[0], p[1], p[2]);
    filament_cap_dummy.updateMatrix();
    filament_end_caps.setMatrixAt(i, filament_cap_dummy.matrix);
  }
  filament_end_caps.instanceMatrix.needsUpdate = true;
  root.add(filament_end_caps);

  const metal_collarGeom = new THREE.CylinderGeometry(0.47, 0.47, 0.78, 40);
  const metal_collar = new THREE.Mesh(metal_collarGeom, metal_collarMat);
  metal_collar.name = "metal_collar";
  metal_collar.rotation.z = -Math.PI / 2;
  metal_collar.position.set(1.75, 0, 0);
  root.add(metal_collar);

  const collar_front_ringGeom = new THREE.TorusGeometry(0.435, 0.035, 10, 40);
  const collar_front_ring = new THREE.Mesh(collar_front_ringGeom, polished_rimMat);
  collar_front_ring.name = "collar_front_ring";
  collar_front_ring.rotation.y = Math.PI / 2;
  collar_front_ring.position.set(1.37, 0, 0);
  root.add(collar_front_ring);

  const collar_rear_ringGeom = new THREE.TorusGeometry(0.435, 0.035, 10, 40);
  const collar_rear_ring = new THREE.Mesh(collar_rear_ringGeom, polished_rimMat);
  collar_rear_ring.name = "collar_rear_ring";
  collar_rear_ring.rotation.y = Math.PI / 2;
  collar_rear_ring.position.set(2.13, 0, 0);
  root.add(collar_rear_ring);

  const collar_shadow_bandGeom = new THREE.TorusGeometry(0.445, 0.018, 8, 40);
  const collar_shadow_band = new THREE.Mesh(collar_shadow_bandGeom, dark_metalMat);
  collar_shadow_band.name = "collar_shadow_band";
  collar_shadow_band.rotation.y = Math.PI / 2;
  collar_shadow_band.position.set(2.16, 0, 0);
  root.add(collar_shadow_band);

  const screw_shellGeom = new THREE.CylinderGeometry(0.37, 0.31, 0.78, 40);
  const screw_shell = new THREE.Mesh(screw_shellGeom, screw_shellMat);
  screw_shell.name = "screw_shell";
  screw_shell.rotation.z = -Math.PI / 2;
  screw_shell.position.set(2.52, 0, 0);
  root.add(screw_shell);

  const screw_threadPoints = [];
  const screw_thread_steps = 112;
  for (let i = 0; i <= screw_thread_steps; i++) {
    const t = i / screw_thread_steps;
    const angle = t * Math.PI * 2 * 4.25;
    const radius = 0.385 - t * 0.055;
    const x = 2.18 + t * 0.68;
    screw_threadPoints.push(new THREE.Vector3(
      x,
      Math.cos(angle) * radius,
      Math.sin(angle) * radius
    ));
  }
  const screw_threadCurve = new THREE.CatmullRomCurve3(screw_threadPoints, false, "centripetal");
  const screw_threadGeom = new THREE.TubeGeometry(screw_threadCurve, 128, 0.035, 8, false);
  const screw_thread = new THREE.Mesh(screw_threadGeom, polished_rimMat);
  screw_thread.name = "screw_thread";
  root.add(screw_thread);

  const terminal_insulatorGeom = new THREE.CylinderGeometry(0.28, 0.23, 0.24, 32);
  const terminal_insulator = new THREE.Mesh(terminal_insulatorGeom, terminal_contactMat);
  terminal_insulator.name = "terminal_insulator";
  terminal_insulator.rotation.z = -Math.PI / 2;
  terminal_insulator.position.set(2.98, 0, 0);
  root.add(terminal_insulator);

  const terminal_contactGeom = new THREE.SphereGeometry(0.23, 28, 16);
  const terminal_contact = new THREE.Mesh(terminal_contactGeom, terminal_contactMat);
  terminal_contact.name = "terminal_contact";
  terminal_contact.position.set(3.13, 0, 0);
  terminal_contact.scale.set(0.72, 1.0, 1.0);
  root.add(terminal_contact);

  fitToUnitCube(root);
  return root;

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
}