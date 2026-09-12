// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  const pencil_assembly = new THREE.Group();
  pencil_assembly.rotation.z = -Math.PI / 4;
  root.add(pencil_assembly);

  const bodyR = 0.18;
  const bodyTop = 1.15;
  const bodyBottom = -1.20;
  const bodyLength = bodyTop - bodyBottom;

  const pencil_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.3,
  });
  const body_highlightMat = new THREE.MeshStandardMaterial({
    color: 0x343434,
    metalness: 0.0,
    roughness: 0.3,
  });
  const exposed_woodMat = new THREE.MeshStandardMaterial({
    color: 0xd8ad78,
    metalness: 0.0,
    roughness: 0.9,
    flatShading: true,
  });
  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x9b6b42,
    metalness: 0.0,
    roughness: 0.9,
  });
  const graphite_tipMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rear_capMat = new THREE.MeshStandardMaterial({
    color: 0x101010,
    metalness: 0.0,
    roughness: 0.3,
  });

  const pencil_bodyGeom = new THREE.CylinderGeometry(
    bodyR,
    bodyR,
    bodyLength,
    6,
    1,
    false
  );
  const pencil_body = new THREE.Mesh(pencil_bodyGeom, pencil_bodyMat);
  pencil_body.position.y = (bodyTop + bodyBottom) / 2;
  pencil_body.rotation.y = Math.PI / 6;
  pencil_assembly.add(pencil_body);

  const body_highlightGeom = new THREE.BoxGeometry(0.026, 2.12, 0.004);
  const body_highlight = new THREE.Mesh(body_highlightGeom, body_highlightMat);
  body_highlight.position.set(-0.052, 0.02, 0.160);
  pencil_assembly.add(body_highlight);

  const woodTop = bodyBottom;
  const woodBottom = -1.68;
  const woodLength = woodTop - woodBottom;
  const woodTopR = bodyR;
  const woodBottomR = 0.065;

  const exposed_woodGeom = new THREE.CylinderGeometry(
    woodTopR,
    woodBottomR,
    woodLength,
    6,
    1,
    false
  );
  const exposed_wood = new THREE.Mesh(exposed_woodGeom, exposed_woodMat);
  exposed_wood.position.y = (woodTop + woodBottom) / 2;
  exposed_wood.rotation.y = Math.PI / 6;
  pencil_assembly.add(exposed_wood);

  const graphite_tipGeom = new THREE.CylinderGeometry(
    0.067,
    0,
    0.25,
    12,
    1,
    false
  );
  const graphite_tip = new THREE.Mesh(graphite_tipGeom, graphite_tipMat);
  graphite_tip.position.y = -1.805;
  pencil_assembly.add(graphite_tip);

  const graphite_pointGeom = new THREE.SphereGeometry(0.018, 12, 8);
  const graphite_point = new THREE.Mesh(graphite_pointGeom, graphite_tipMat);
  graphite_point.scale.set(0.8, 1.2, 0.8);
  graphite_point.position.y = -1.935;
  pencil_assembly.add(graphite_point);

  const rear_capProfile = [
    new THREE.Vector2(0.000, 1.10),
    new THREE.Vector2(0.170, 1.10),
    new THREE.Vector2(0.180, 1.15),
    new THREE.Vector2(0.195, 1.20),
    new THREE.Vector2(0.215, 1.27),
    new THREE.Vector2(0.225, 1.35),
    new THREE.Vector2(0.225, 1.43),
    new THREE.Vector2(0.215, 1.50),
    new THREE.Vector2(0.190, 1.56),
    new THREE.Vector2(0.150, 1.61),
    new THREE.Vector2(0.090, 1.65),
    new THREE.Vector2(0.000, 1.67),
  ];
  const rear_capGeom = new THREE.LatheGeometry(rear_capProfile, 32);
  const rear_cap = new THREE.Mesh(rear_capGeom, rear_capMat);
  pencil_assembly.add(rear_cap);

  const ridgeGeom = new THREE.TorusGeometry(0.205, 0.022, 8, 32);
  const ridgeYs = [1.18, 1.25, 1.32, 1.39, 1.46];
  const ridgeScales = [0.94, 1.00, 1.04, 1.05, 1.02];
  const rib_ridges = new THREE.InstancedMesh(
    ridgeGeom,
    rear_capMat,
    ridgeYs.length
  );
  const ridge_dummy = new THREE.Object3D();
  for (let i = 0; i < ridgeYs.length; i++) {
    ridge_dummy.position.set(0, ridgeYs[i], 0);
    ridge_dummy.rotation.set(Math.PI / 2, 0, 0);
    ridge_dummy.scale.setScalar(ridgeScales[i]);
    ridge_dummy.updateMatrix();
    rib_ridges.setMatrixAt(i, ridge_dummy.matrix);
  }
  rib_ridges.instanceMatrix.needsUpdate = true;
  pencil_assembly.add(rib_ridges);

  const wood_grain = new THREE.Group();
  const grainBases = [-0.045, 0.0, 0.045];
  for (let lineIndex = 0; lineIndex < grainBases.length; lineIndex++) {
    const points = [];
    for (let i = 0; i <= 5; i++) {
      const t = i / 5;
      const y = -1.59 + t * 0.36;
      const radius = woodBottomR + (woodTopR - woodBottomR) * t;
      const x =
        grainBases[lineIndex] +
        Math.sin(t * Math.PI * 2 + lineIndex * 0.8) * 0.005;
      const z =
        Math.sqrt(Math.max(radius * radius - x * x, 0)) + 0.002;
      points.push(new THREE.Vector3(x, y, z));
    }
    const grain_curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const grain_lineGeom = new THREE.TubeGeometry(
      grain_curve,
      10,
      0.0022,
      5,
      false
    );
    const grain_line = new THREE.Mesh(grain_lineGeom, wood_grainMat);
    wood_grain.add(grain_line);
  }
  pencil_assembly.add(wood_grain);

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