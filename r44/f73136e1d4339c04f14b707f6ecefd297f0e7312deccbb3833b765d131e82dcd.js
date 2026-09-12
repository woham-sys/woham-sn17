// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const black_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x18191b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const dark_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x090a0b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x020303,
    metalness: 0.0,
    roughness: 0.8,
  });
  const clipMat = new THREE.MeshStandardMaterial({
    color: 0x35383c,
    metalness: 0.6,
    roughness: 0.5,
  });
  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const barrelGeom = new THREE.CylinderGeometry(0.17, 0.23, 1.55, 48);
  const barrel = new THREE.Mesh(barrelGeom, black_plasticMat);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.z = 0.25;
  root.add(barrel);

  const front_nose_ringGeom = new THREE.TorusGeometry(0.171, 0.009, 10, 48);
  const front_nose_ring = new THREE.Mesh(front_nose_ringGeom, dark_plasticMat);
  front_nose_ring.position.z = 1.025;
  root.add(front_nose_ring);

  const rear_bandGeom = new THREE.CylinderGeometry(0.235, 0.235, 0.065, 48);
  const rear_band = new THREE.Mesh(rear_bandGeom, dark_plasticMat);
  rear_band.rotation.x = Math.PI / 2;
  rear_band.position.z = -0.525;
  root.add(rear_band);

  const rear_band_ringGeom = new THREE.TorusGeometry(0.226, 0.009, 10, 48);
  const rear_band_ring = new THREE.Mesh(rear_band_ringGeom, recessMat);
  rear_band_ring.position.z = -0.557;
  root.add(rear_band_ring);

  const cap_bodyGeom = new THREE.CylinderGeometry(0.255, 0.255, 0.72, 48);
  const cap_body = new THREE.Mesh(cap_bodyGeom, black_plasticMat);
  cap_body.rotation.x = Math.PI / 2;
  cap_body.position.z = -0.91;
  root.add(cap_body);

  const cap_top_bevelGeom = new THREE.CylinderGeometry(0.215, 0.255, 0.16, 48);
  const cap_top_bevel = new THREE.Mesh(cap_top_bevelGeom, black_plasticMat);
  cap_top_bevel.rotation.x = Math.PI / 2;
  cap_top_bevel.position.z = -0.51;
  root.add(cap_top_bevel);

  const cap_end_bevelGeom = new THREE.CylinderGeometry(0.255, 0.19, 0.18, 48);
  const cap_end_bevel = new THREE.Mesh(cap_end_bevelGeom, black_plasticMat);
  cap_end_bevel.rotation.x = Math.PI / 2;
  cap_end_bevel.position.z = -1.35;
  root.add(cap_end_bevel);

  const cap_end_discGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.025, 48);
  const cap_end_disc = new THREE.Mesh(cap_end_discGeom, dark_plasticMat);
  cap_end_disc.rotation.x = Math.PI / 2;
  cap_end_disc.position.z = -1.452;
  root.add(cap_end_disc);

  const cap_seam_ringGeom = new THREE.TorusGeometry(0.249, 0.007, 8, 48);
  const cap_seam_ring = new THREE.Mesh(cap_seam_ringGeom, dark_plasticMat);
  cap_seam_ring.position.z = -1.255;
  root.add(cap_seam_ring);

  const cap_top_panelGeom = new THREE.SphereGeometry(1, 32, 16);
  const cap_top_panel = new THREE.Mesh(cap_top_panelGeom, black_plasticMat);
  cap_top_panel.scale.set(0.18, 0.027, 0.31);
  cap_top_panel.position.set(0, 0.247, -0.86);
  root.add(cap_top_panel);

  const clip_recessGeom = new THREE.SphereGeometry(1, 32, 16);
  const clip_recess = new THREE.Mesh(clip_recessGeom, recessMat);
  clip_recess.scale.set(0.014, 0.105, 0.285);
  clip_recess.position.set(0.258, 0.015, -0.88);
  root.add(clip_recess);

  const clipShape = new THREE.Shape();
  clipShape.moveTo(0.245, -0.27);
  clipShape.bezierCurveTo(0.29, -0.29, 0.35, -0.24, 0.36, -0.17);
  clipShape.lineTo(0.36, 0.17);
  clipShape.bezierCurveTo(0.35, 0.24, 0.29, 0.29, 0.245, 0.27);
  clipShape.lineTo(0.245, -0.27);

  const clipGeom = new THREE.ExtrudeGeometry(clipShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2,
  });
  const clip = new THREE.Mesh(clipGeom, clipMat);
  clip.rotation.x = Math.PI / 2;
  clip.position.set(0, 0.018, -0.88);
  root.add(clip);

  const clip_anchorGeom = new THREE.SphereGeometry(1, 24, 12);
  const clip_anchor = new THREE.Mesh(clip_anchorGeom, clipMat);
  clip_anchor.scale.set(0.055, 0.025, 0.065);
  clip_anchor.position.set(0.27, 0.005, -0.59);
  root.add(clip_anchor);

  const clip_tipGeom = new THREE.SphereGeometry(1, 20, 10);
  const clip_tip = new THREE.Mesh(clip_tipGeom, dark_plasticMat);
  clip_tip.scale.set(0.04, 0.018, 0.045);
  clip_tip.position.set(0.285, -0.002, -1.16);
  root.add(clip_tip);

  const logo_markGeom = new THREE.BoxGeometry(0.012, 0.006, 0.075);
  const logo_marks = new THREE.InstancedMesh(logo_markGeom, dark_plasticMat, 5);
  const logo_dummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    logo_dummy.position.set(-0.045 + i * 0.0225, 0.274, -0.86);
    logo_dummy.rotation.set(0, (i - 2) * 0.08, 0);
    logo_dummy.updateMatrix();
    logo_marks.setMatrixAt(i, logo_dummy.matrix);
  }
  logo_marks.instanceMatrix.needsUpdate = true;
  root.add(logo_marks);

  const nib_collarGeom = new THREE.CylinderGeometry(0.105, 0.145, 0.18, 40);
  const nib_collar = new THREE.Mesh(nib_collarGeom, dark_plasticMat);
  nib_collar.rotation.x = Math.PI / 2;
  nib_collar.position.z = 1.09;
  root.add(nib_collar);

  const nib_collar_ringGeom = new THREE.TorusGeometry(0.108, 0.008, 8, 40);
  const nib_collar_ring = new THREE.Mesh(nib_collar_ringGeom, polished_metalMat);
  nib_collar_ring.position.z = 1.178;
  root.add(nib_collar_ring);

  const metal_nibGeom = new THREE.CylinderGeometry(0.025, 0.112, 0.36, 40);
  const metal_nib = new THREE.Mesh(metal_nibGeom, polished_metalMat);
  metal_nib.rotation.x = Math.PI / 2;
  metal_nib.position.z = 1.35;
  root.add(metal_nib);

  const nib_slitGeom = new THREE.BoxGeometry(0.008, 0.006, 0.22);
  const nib_slit = new THREE.Mesh(nib_slitGeom, recessMat);
  nib_slit.position.set(0, 0.066, 1.36);
  root.add(nib_slit);

  const breather_holeGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.007, 20);
  const breather_hole = new THREE.Mesh(breather_holeGeom, recessMat);
  breather_hole.position.set(0, 0.087, 1.255);
  root.add(breather_hole);

  const left_nib_groovePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.073, 0.071, 1.205),
    new THREE.Vector3(-0.052, 0.068, 1.31),
    new THREE.Vector3(-0.027, 0.047, 1.43),
  ]);
  const left_nib_grooveGeom = new THREE.TubeGeometry(
    left_nib_groovePath,
    16,
    0.003,
    6,
    false
  );
  const left_nib_groove = new THREE.Mesh(left_nib_grooveGeom, dark_plasticMat);
  root.add(left_nib_groove);

  const right_nib_groovePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.073, 0.071, 1.205),
    new THREE.Vector3(0.052, 0.068, 1.31),
    new THREE.Vector3(0.027, 0.047, 1.43),
  ]);
  const right_nib_grooveGeom = new THREE.TubeGeometry(
    right_nib_groovePath,
    16,
    0.003,
    6,
    false
  );
  const right_nib_groove = new THREE.Mesh(right_nib_grooveGeom, dark_plasticMat);
  root.add(right_nib_groove);

  const nib_ballGeom = new THREE.SphereGeometry(0.018, 16, 8);
  const nib_ball = new THREE.Mesh(nib_ballGeom, polished_metalMat);
  nib_ball.position.set(0, 0.014, 1.535);
  root.add(nib_ball);

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