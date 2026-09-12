// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.2,
  });
  const darkGoldMat = new THREE.MeshStandardMaterial({
    color: 0x76531f,
    metalness: 0.5,
    roughness: 0.25,
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xb00018,
    metalness: 0.0,
    roughness: 0.3,
  });
  const highlightMat = new THREE.MeshStandardMaterial({
    color: 0xff9aa5,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.45,
  });

  function makeHeartShape(scale) {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.55 * scale);
    shape.bezierCurveTo(
      -0.08 * scale, -0.48 * scale,
      -0.49 * scale, -0.18 * scale,
      -0.52 * scale, 0.16 * scale
    );
    shape.bezierCurveTo(
      -0.55 * scale, 0.43 * scale,
      -0.34 * scale, 0.58 * scale,
      -0.15 * scale, 0.55 * scale
    );
    shape.bezierCurveTo(
      -0.07 * scale, 0.54 * scale,
      -0.025 * scale, 0.43 * scale,
      0, 0.37 * scale
    );
    shape.bezierCurveTo(
      0.025 * scale, 0.43 * scale,
      0.07 * scale, 0.54 * scale,
      0.15 * scale, 0.55 * scale
    );
    shape.bezierCurveTo(
      0.34 * scale, 0.58 * scale,
      0.55 * scale, 0.43 * scale,
      0.52 * scale, 0.16 * scale
    );
    shape.bezierCurveTo(
      0.49 * scale, -0.18 * scale,
      0.08 * scale, -0.48 * scale,
      0, -0.55 * scale
    );
    shape.closePath();
    return shape;
  }

  const gold_backingGeom = new THREE.ExtrudeGeometry(makeHeartShape(1.04), {
    depth: 0.07,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
  });
  const gold_backing = new THREE.Mesh(gold_backingGeom, goldMat);
  gold_backing.position.z = -0.04;
  root.add(gold_backing);

  const dark_inner_borderGeom = new THREE.ExtrudeGeometry(makeHeartShape(0.985), {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2,
  });
  const dark_inner_border = new THREE.Mesh(dark_inner_borderGeom, darkGoldMat);
  dark_inner_border.position.z = 0.025;
  root.add(dark_inner_border);

  const red_enamelGeom = new THREE.ExtrudeGeometry(makeHeartShape(0.925), {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 4,
  });
  const red_enamel = new THREE.Mesh(red_enamelGeom, redMat);
  red_enamel.position.z = 0.045;
  root.add(red_enamel);

  const rimPoints = [
    new THREE.Vector3(0, -0.55, 0.095),
    new THREE.Vector3(-0.16, -0.39, 0.095),
    new THREE.Vector3(-0.38, -0.12, 0.095),
    new THREE.Vector3(-0.50, 0.16, 0.095),
    new THREE.Vector3(-0.46, 0.39, 0.095),
    new THREE.Vector3(-0.28, 0.53, 0.095),
    new THREE.Vector3(-0.12, 0.50, 0.095),
    new THREE.Vector3(0, 0.37, 0.095),
    new THREE.Vector3(0.12, 0.50, 0.095),
    new THREE.Vector3(0.28, 0.53, 0.095),
    new THREE.Vector3(0.46, 0.39, 0.095),
    new THREE.Vector3(0.50, 0.16, 0.095),
    new THREE.Vector3(0.38, -0.12, 0.095),
    new THREE.Vector3(0.16, -0.39, 0.095),
  ];
  const gold_rimCurve = new THREE.CatmullRomCurve3(rimPoints, true, "centripetal");
  const gold_rimGeom = new THREE.TubeGeometry(gold_rimCurve, 96, 0.018, 10, true);
  const gold_rim = new THREE.Mesh(gold_rimGeom, goldMat);
  root.add(gold_rim);

  const highlightGeom = new THREE.CircleGeometry(0.055, 24);

  const left_highlight = new THREE.Mesh(highlightGeom, highlightMat);
  left_highlight.position.set(-0.25, 0.31, 0.098);
  left_highlight.scale.set(1.7, 0.42, 1);
  left_highlight.rotation.z = -0.28;
  root.add(left_highlight);

  const right_highlight = new THREE.Mesh(highlightGeom, highlightMat);
  right_highlight.position.set(0.27, 0.31, 0.098);
  right_highlight.scale.set(1.45, 0.36, 1);
  right_highlight.rotation.z = 0.28;
  root.add(right_highlight);

  const center_glintGeom = new THREE.CircleGeometry(0.025, 18);
  const center_glint = new THREE.Mesh(center_glintGeom, highlightMat);
  center_glint.position.set(0.02, 0.23, 0.099);
  center_glint.scale.set(0.55, 1.25, 1);
  root.add(center_glint);

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