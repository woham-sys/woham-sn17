// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  const magnifier = new THREE.Group();
  magnifier.rotation.set(-0.08, -0.38, -0.06);
  root.add(magnifier);

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a45,
    metalness: 0.6,
    roughness: 0.2,
  });
  const brassHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xd4b66f,
    metalness: 0.6,
    roughness: 0.2,
  });
  const brassDarkMat = new THREE.MeshStandardMaterial({
    color: 0x80632f,
    metalness: 0.6,
    roughness: 0.25,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const glassTintMat = new THREE.MeshBasicMaterial({
    color: 0xdce8e8,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide,
  });
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
  });

  const lensR = 0.405;
  const rimR = 0.49;
  const rimTube = 0.075;
  const rimZ = 0.01;

  const lensGeom = new THREE.SphereGeometry(lensR, 64, 32);
  const lens = new THREE.Mesh(lensGeom, glassMat);
  lens.scale.set(1, 1, 0.075);
  magnifier.add(lens);

  const lens_tintGeom = new THREE.CircleGeometry(lensR * 0.985, 64);
  const lens_tint = new THREE.Mesh(lens_tintGeom, glassTintMat);
  lens_tint.position.z = 0.002;
  magnifier.add(lens_tint);

  const rear_lens_tint = new THREE.Mesh(lens_tintGeom, glassTintMat);
  rear_lens_tint.position.z = -0.002;
  rear_lens_tint.rotation.y = Math.PI;
  magnifier.add(rear_lens_tint);

  const rim_bandGeom = new THREE.CylinderGeometry(
    rimR,
    rimR,
    0.11,
    64,
    1,
    true
  );
  const rim_band = new THREE.Mesh(rim_bandGeom, brassMat);
  rim_band.rotation.x = Math.PI / 2;
  magnifier.add(rim_band);

  const front_rimGeom = new THREE.TorusGeometry(rimR, rimTube, 18, 72);
  const front_rim = new THREE.Mesh(front_rimGeom, brassMat);
  front_rim.position.z = rimZ;
  magnifier.add(front_rim);

  const rear_rim = new THREE.Mesh(front_rimGeom, brassDarkMat);
  rear_rim.position.z = -rimZ;
  magnifier.add(rear_rim);

  const inner_bezelGeom = new THREE.TorusGeometry(0.413, 0.014, 12, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, brassDarkMat);
  inner_bezel.position.z = 0.068;
  magnifier.add(inner_bezel);

  const outer_bezelGeom = new THREE.TorusGeometry(0.472, 0.011, 10, 64);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, brassHighlightMat);
  outer_bezel.position.z = 0.084;
  magnifier.add(outer_bezel);

  const rim_highlightGeom = new THREE.TorusGeometry(
    rimR,
    0.012,
    8,
    28,
    Math.PI * 0.72
  );
  const rim_highlight = new THREE.Mesh(rim_highlightGeom, brassHighlightMat);
  rim_highlight.rotation.z = 0.55;
  rim_highlight.position.z = 0.086;
  magnifier.add(rim_highlight);

  const handle_neckGeom = new THREE.CylinderGeometry(
    0.078,
    0.098,
    0.18,
    32
  );
  const handle_neck = new THREE.Mesh(handle_neckGeom, brassMat);
  handle_neck.position.set(0, -0.555, -0.018);
  magnifier.add(handle_neck);

  const neck_collarGeom = new THREE.TorusGeometry(0.083, 0.014, 10, 36);
  const neck_collar = new THREE.Mesh(neck_collarGeom, brassHighlightMat);
  neck_collar.rotation.x = Math.PI / 2;
  neck_collar.position.set(0, -0.625, -0.018);
  magnifier.add(neck_collar);

  const handle_gripProfile = [
    new THREE.Vector2(0.0, -1.08),
    new THREE.Vector2(0.055, -1.08),
    new THREE.Vector2(0.075, -1.055),
    new THREE.Vector2(0.087, -1.0),
    new THREE.Vector2(0.092, -0.92),
    new THREE.Vector2(0.092, -0.82),
    new THREE.Vector2(0.088, -0.72),
    new THREE.Vector2(0.08, -0.65),
    new THREE.Vector2(0.068, -0.61),
    new THREE.Vector2(0.0, -0.61),
  ];
  const handle_gripGeom = new THREE.LatheGeometry(handle_gripProfile, 40);
  const handle_grip = new THREE.Mesh(handle_gripGeom, brassMat);
  handle_grip.position.z = -0.018;
  magnifier.add(handle_grip);

  const handle_end_capGeom = new THREE.SphereGeometry(0.075, 28, 16);
  const handle_end_cap = new THREE.Mesh(handle_end_capGeom, brassDarkMat);
  handle_end_cap.scale.set(1, 0.55, 1);
  handle_end_cap.position.set(0, -1.075, -0.018);
  magnifier.add(handle_end_cap);

  const handle_groovesGeom = new THREE.TorusGeometry(0.084, 0.005, 8, 32);
  const handle_grooves = new THREE.InstancedMesh(
    handle_groovesGeom,
    brassDarkMat,
    3
  );
  const groove_dummy = new THREE.Object3D();
  const groove_heights = [-0.7, -0.82, -0.94];
  for (let i = 0; i < groove_heights.length; i++) {
    groove_dummy.position.set(0, groove_heights[i], -0.018);
    groove_dummy.rotation.set(Math.PI / 2, 0, 0);
    groove_dummy.updateMatrix();
    handle_grooves.setMatrixAt(i, groove_dummy.matrix);
  }
  handle_grooves.instanceMatrix.needsUpdate = true;
  magnifier.add(handle_grooves);

  const lens_highlightGeom = new THREE.CircleGeometry(0.1, 32);
  const lens_highlight = new THREE.Mesh(lens_highlightGeom, highlightMat);
  lens_highlight.scale.set(1.65, 0.28, 1);
  lens_highlight.rotation.z = -0.55;
  lens_highlight.position.set(-0.13, 0.16, 0.035);
  magnifier.add(lens_highlight);

  const lens_glintGeom = new THREE.CircleGeometry(0.035, 20);
  const lens_glint = new THREE.Mesh(lens_glintGeom, highlightMat);
  lens_glint.scale.set(1.5, 0.55, 1);
  lens_glint.position.set(0.18, -0.12, 0.036);
  magnifier.add(lens_glint);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
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