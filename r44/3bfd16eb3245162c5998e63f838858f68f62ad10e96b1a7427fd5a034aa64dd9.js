// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const bambooMat = new THREE.MeshStandardMaterial({
    color: 0xd8a64f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const end_grainMat = new THREE.MeshStandardMaterial({
    color: 0xb87932,
    metalness: 0.0,
    roughness: 0.6,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x9d6427,
    metalness: 0.0,
    roughness: 0.6,
  });
  const light_grainMat = new THREE.MeshStandardMaterial({
    color: 0xf0c36c,
    metalness: 0.0,
    roughness: 0.6,
  });
  const grooveMat = new THREE.MeshStandardMaterial({
    color: 0x603715,
    metalness: 0.0,
    roughness: 0.6,
  });
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x120905,
    metalness: 0.0,
    roughness: 0.8,
  });
  const hole_rimMat = new THREE.MeshStandardMaterial({
    color: 0x4b260f,
    metalness: 0.0,
    roughness: 0.6,
  });

  const lower_footProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.12, 0.00),
    new THREE.Vector2(0.20, 0.025),
    new THREE.Vector2(0.255, 0.09),
    new THREE.Vector2(0.285, 0.18),
    new THREE.Vector2(0.295, 0.30),
    new THREE.Vector2(0.285, 0.43),
  ];
  const lower_footGeom = new THREE.LatheGeometry(lower_footProfile, 48);
  const lower_foot = new THREE.Mesh(lower_footGeom, end_grainMat);
  root.add(lower_foot);

  const lower_bodyProfile = [
    new THREE.Vector2(0.285, 0.38),
    new THREE.Vector2(0.275, 0.52),
    new THREE.Vector2(0.255, 0.72),
    new THREE.Vector2(0.245, 1.02),
    new THREE.Vector2(0.248, 1.34),
    new THREE.Vector2(0.265, 1.58),
    new THREE.Vector2(0.295, 1.75),
    new THREE.Vector2(0.315, 1.82),
  ];
  const lower_bodyGeom = new THREE.LatheGeometry(lower_bodyProfile, 48);
  const lower_body = new THREE.Mesh(lower_bodyGeom, bambooMat);
  root.add(lower_body);

  const main_bodyProfile = [
    new THREE.Vector2(0.315, 1.76),
    new THREE.Vector2(0.305, 1.91),
    new THREE.Vector2(0.300, 2.30),
    new THREE.Vector2(0.296, 2.80),
    new THREE.Vector2(0.292, 3.35),
    new THREE.Vector2(0.290, 3.90),
    new THREE.Vector2(0.292, 4.45),
    new THREE.Vector2(0.298, 4.95),
    new THREE.Vector2(0.305, 5.25),
  ];
  const main_bodyGeom = new THREE.LatheGeometry(main_bodyProfile, 48);
  const main_body = new THREE.Mesh(main_bodyGeom, bambooMat);
  root.add(main_body);

  const upper_jointProfile = [
    new THREE.Vector2(0.305, 5.18),
    new THREE.Vector2(0.325, 5.24),
    new THREE.Vector2(0.340, 5.34),
    new THREE.Vector2(0.345, 5.50),
    new THREE.Vector2(0.340, 5.67),
    new THREE.Vector2(0.325, 5.78),
  ];
  const upper_jointGeom = new THREE.LatheGeometry(upper_jointProfile, 48);
  const upper_joint = new THREE.Mesh(upper_jointGeom, bambooMat);
  root.add(upper_joint);

  const upper_bodyProfile = [
    new THREE.Vector2(0.325, 5.72),
    new THREE.Vector2(0.310, 5.84),
    new THREE.Vector2(0.292, 6.08),
    new THREE.Vector2(0.282, 6.40),
    new THREE.Vector2(0.285, 6.75),
    new THREE.Vector2(0.300, 7.08),
    new THREE.Vector2(0.325, 7.38),
    new THREE.Vector2(0.355, 7.62),
    new THREE.Vector2(0.382, 7.75),
  ];
  const upper_bodyGeom = new THREE.LatheGeometry(upper_bodyProfile, 48);
  const upper_body = new THREE.Mesh(upper_bodyGeom, bambooMat);
  root.add(upper_body);

  const top_capProfile = [
    new THREE.Vector2(0.382, 7.70),
    new THREE.Vector2(0.405, 7.75),
    new THREE.Vector2(0.415, 7.82),
    new THREE.Vector2(0.405, 7.89),
    new THREE.Vector2(0.370, 7.95),
    new THREE.Vector2(0.275, 7.99),
    new THREE.Vector2(0.00, 8.00),
  ];
  const top_capGeom = new THREE.LatheGeometry(top_capProfile, 48);
  const top_cap = new THREE.Mesh(top_capGeom, end_grainMat);
  root.add(top_cap);

  const groove_ringGeom = new THREE.TorusGeometry(1, 0.026, 8, 48);
  const groove_rings = new THREE.InstancedMesh(groove_ringGeom, grooveMat, 7);
  const grooveData = [
    [1.76, 0.316],
    [1.83, 0.319],
    [5.22, 0.326],
    [5.30, 0.341],
    [5.75, 0.326],
    [7.73, 0.393],
    [7.82, 0.411],
  ];
  const ringDummy = new THREE.Object3D();
  for (let i = 0; i < grooveData.length; i++) {
    ringDummy.position.set(0, grooveData[i][0], 0);
    ringDummy.rotation.set(Math.PI / 2, 0, 0);
    ringDummy.scale.setScalar(grooveData[i][1]);
    ringDummy.updateMatrix();
    groove_rings.setMatrixAt(i, ringDummy.matrix);
  }
  groove_rings.instanceMatrix.needsUpdate = true;
  root.add(groove_rings);

  function bodyRadiusAt(y) {
    if (y < 0.43) return 0.29;
    if (y < 1.75) return 0.285 + (y - 0.43) * 0.018;
    if (y < 5.22) return 0.305 - (y - 1.75) * 0.003;
    if (y < 5.76) return 0.34 - (y - 5.22) * 0.025;
    if (y < 6.40) return 0.327 - (y - 5.76) * 0.072;
    if (y < 7.72) return 0.282 + (y - 6.40) * 0.033;
    return 0.39;
  }

  const holeData = [
    [5.50, 0.345, 0.105],
    [4.25, 0.294, 0.112],
    [3.55, 0.292, 0.110],
    [2.82, 0.295, 0.108],
    [2.08, 0.303, 0.112],
  ];

  const finger_holesGeom = new THREE.CylinderGeometry(1, 1, 0.018, 28);
  const finger_holes = new THREE.InstancedMesh(
    finger_holesGeom,
    holeMat,
    holeData.length
  );
  const holeDummy = new THREE.Object3D();
  for (let i = 0; i < holeData.length; i++) {
    const y = holeData[i][0];
    const radius = holeData[i][1];
    const size = holeData[i][2];
    holeDummy.position.set(0, y, radius - 0.004);
    holeDummy.rotation.set(Math.PI / 2, 0, 0);
    holeDummy.scale.set(size, 1, size);
    holeDummy.updateMatrix();
    finger_holes.setMatrixAt(i, holeDummy.matrix);
  }
  finger_holes.instanceMatrix.needsUpdate = true;
  root.add(finger_holes);

  const hole_rimsGeom = new THREE.TorusGeometry(0.86, 0.14, 8, 28);
  const hole_rims = new THREE.InstancedMesh(
    hole_rimsGeom,
    hole_rimMat,
    holeData.length
  );
  const rimDummy = new THREE.Object3D();
  for (let i = 0; i < holeData.length; i++) {
    const y = holeData[i][0];
    const radius = holeData[i][1];
    const size = holeData[i][2];
    rimDummy.position.set(0, y, radius + 0.004);
    rimDummy.rotation.set(0, 0, 0);
    rimDummy.scale.setScalar(size);
    rimDummy.updateMatrix();
    hole_rims.setMatrixAt(i, rimDummy.matrix);
  }
  hole_rims.instanceMatrix.needsUpdate = true;
  root.add(hole_rims);

  const grain_lines = new THREE.Group();
  root.add(grain_lines);

  function addGrainPath(points, material, radius) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(12, points.length * 4),
      radius,
      5,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    grain_lines.add(mesh);
    return mesh;
  }

  for (let i = 0; i < 18; i++) {
    const baseAngle = (i / 18) * Math.PI * 2;
    const yStart = 0.46 + (i % 3) * 0.08;
    const yEnd = 7.66 - (i % 4) * 0.07;
    const points = [];
    for (let j = 0; j <= 12; j++) {
      const t = j / 12;
      const y = yStart + (yEnd - yStart) * t;
      const angle =
        baseAngle +
        Math.sin(t * Math.PI * 2 + i * 0.73) * 0.008 +
        Math.sin(t * Math.PI * 5 + i * 0.31) * 0.003;
      const radius = bodyRadiusAt(y) + 0.003;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        )
      );
    }
    const material = i % 5 === 0 ? light_grainMat : grainMat;
    const radius = i % 5 === 0 ? 0.0022 : 0.0028;
    addGrainPath(points, material, radius);
  }

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + 0.18;
    const points = [];
    for (let j = 0; j <= 5; j++) {
      const t = j / 5;
      const y = 0.07 + t * 0.34;
      const radius = 0.255 + Math.sin(t * Math.PI) * 0.035 + 0.003;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        )
      );
    }
    addGrainPath(points, grainMat, 0.0028);
  }

  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2 + 0.12;
    const points = [];
    for (let j = 0; j <= 4; j++) {
      const t = j / 4;
      const y = 7.74 + t * 0.20;
      const radius = 0.397 - t * 0.055 + 0.003;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        )
      );
    }
    addGrainPath(points, grainMat, 0.0026);
  }

  const wood_specksGeom = new THREE.SphereGeometry(0.012, 8, 6);
  const wood_specks = new THREE.InstancedMesh(
    wood_specksGeom,
    grooveMat,
    14
  );
  const speckDummy = new THREE.Object3D();
  for (let i = 0; i < 14; i++) {
    const y = 0.72 + i * 0.45;
    const angle = 0.35 + (i % 5) * 0.52;
    const radius = bodyRadiusAt(y) + 0.005;
    speckDummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    speckDummy.scale.set(
      0.45 + (i % 3) * 0.12,
      0.85 + (i % 4) * 0.22,
      0.22
    );
    speckDummy.updateMatrix();
    wood_specks.setMatrixAt(i, speckDummy.matrix);
  }
  wood_specks.instanceMatrix.needsUpdate = true;
  root.add(wood_specks);

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