// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const clayMat = new THREE.MeshStandardMaterial({
    color: 0xb8734f,
    metalness: 0.0,
    roughness: 0.9,
  });
  const clayReliefMat = new THREE.MeshStandardMaterial({
    color: 0xa96343,
    metalness: 0.0,
    roughness: 0.9,
  });
  const clayVeinMat = new THREE.MeshStandardMaterial({
    color: 0x8f5037,
    metalness: 0.0,
    roughness: 0.9,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x24120d,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const darkSpeckleMat = new THREE.MeshStandardMaterial({
    color: 0x30251f,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const lightSpeckleMat = new THREE.MeshStandardMaterial({
    color: 0xd8c3a4,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.25, 0.00),
    new THREE.Vector2(0.29, 0.03),
    new THREE.Vector2(0.31, 0.08),
    new THREE.Vector2(0.30, 0.13),
    new THREE.Vector2(0.35, 0.18),
    new THREE.Vector2(0.42, 0.28),
    new THREE.Vector2(0.48, 0.42),
    new THREE.Vector2(0.51, 0.58),
    new THREE.Vector2(0.50, 0.72),
    new THREE.Vector2(0.46, 0.84),
    new THREE.Vector2(0.39, 0.94),
    new THREE.Vector2(0.31, 1.01),
    new THREE.Vector2(0.27, 1.08),
    new THREE.Vector2(0.25, 1.17),
    new THREE.Vector2(0.25, 1.27),
    new THREE.Vector2(0.27, 1.32),
    new THREE.Vector2(0.31, 1.34),
    new THREE.Vector2(0.32, 1.37),
    new THREE.Vector2(0.30, 1.40),
    new THREE.Vector2(0.25, 1.41),
    new THREE.Vector2(0.22, 1.39),
    new THREE.Vector2(0.21, 1.35),
    new THREE.Vector2(0.21, 1.24),
    new THREE.Vector2(0.20, 1.16),
    new THREE.Vector2(0.00, 1.12),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, clayMat);
  root.add(body);

  const foot_ringGeom = new THREE.TorusGeometry(0.285, 0.018, 10, 48);
  const foot_ring = new THREE.Mesh(foot_ringGeom, clayReliefMat);
  foot_ring.rotation.x = Math.PI / 2;
  foot_ring.position.y = 0.065;
  root.add(foot_ring);

  const neck_collarGeom = new THREE.TorusGeometry(0.255, 0.012, 8, 48);
  const neck_collar = new THREE.Mesh(neck_collarGeom, clayReliefMat);
  neck_collar.rotation.x = Math.PI / 2;
  neck_collar.position.y = 1.305;
  root.add(neck_collar);

  const mouth_rimGeom = new THREE.TorusGeometry(0.275, 0.045, 16, 64);
  const mouth_rim = new THREE.Mesh(mouth_rimGeom, clayMat);
  mouth_rim.rotation.x = Math.PI / 2;
  mouth_rim.position.y = 1.37;
  root.add(mouth_rim);

  const mouth_inner_wallGeom = new THREE.CylinderGeometry(0.207, 0.207, 0.19, 48, 1, true);
  const mouth_inner_wall = new THREE.Mesh(mouth_inner_wallGeom, interiorMat);
  mouth_inner_wall.position.y = 1.265;
  root.add(mouth_inner_wall);

  const mouth_cavityGeom = new THREE.CircleGeometry(0.202, 48);
  const mouth_cavity = new THREE.Mesh(mouth_cavityGeom, interiorMat);
  mouth_cavity.rotation.x = -Math.PI / 2;
  mouth_cavity.position.y = 1.165;
  root.add(mouth_cavity);

  function bodyRadiusAt(y) {
    if (y < 0.13) return 0.30;
    if (y < 0.30) return 0.30 + (y - 0.13) / 0.17 * 0.13;
    if (y < 0.58) return 0.43 + (y - 0.30) / 0.28 * 0.08;
    if (y < 0.72) return 0.51 - (y - 0.58) / 0.14 * 0.01;
    if (y < 0.84) return 0.50 - (y - 0.72) / 0.12 * 0.04;
    if (y < 0.94) return 0.46 - (y - 0.84) / 0.10 * 0.07;
    if (y < 1.08) return 0.39 - (y - 0.94) / 0.14 * 0.12;
    return 0.25;
  }

  function surfacePoint(angle, y, extra) {
    const radius = bodyRadiusAt(y) + extra;
    return new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
  }

  function surfacePose(angle, y, extra) {
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();
    const position = surfacePoint(angle, y, extra);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return { position, quaternion };
  }

  const reliefPetalShape = new THREE.Shape();
  reliefPetalShape.moveTo(0.000, -0.060);
  reliefPetalShape.bezierCurveTo(-0.038, -0.045, -0.055, 0.025, 0.000, 0.095);
  reliefPetalShape.bezierCurveTo(0.055, 0.025, 0.038, -0.045, 0.000, -0.060);

  const reliefPetalGeom = new THREE.ExtrudeGeometry(reliefPetalShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const reliefCenterGeom = new THREE.SphereGeometry(1, 16, 8);

  function addReliefFlower(angle, y, size, petalCount) {
    const flower_group = new THREE.Group();
    const petals = new THREE.InstancedMesh(reliefPetalGeom, clayReliefMat, petalCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < petalCount; i++) {
      const a = i / petalCount * Math.PI * 2;
      const localX = Math.cos(a) * 0.060 * size;
      const localY = Math.sin(a) * 0.060 * size;
      const petalY = y + localY;
      const petalAngle = angle - localX / bodyRadiusAt(petalY);
      const pose = surfacePose(petalAngle, petalY, 0.006);

      dummy.position.copy(pose.position);
      dummy.quaternion.copy(pose.quaternion);
      dummy.rotateZ(a - Math.PI / 2);
      dummy.scale.set(size, size, 1);
      dummy.updateMatrix();
      petals.setMatrixAt(i, dummy.matrix);
    }
    petals.instanceMatrix.needsUpdate = true;
    flower_group.add(petals);

    const centerPose = surfacePose(angle, y, 0.014);
    const flower_center = new THREE.Mesh(reliefCenterGeom, clayReliefMat);
    flower_center.position.copy(centerPose.position);
    flower_center.quaternion.copy(centerPose.quaternion);
    flower_center.scale.set(0.034 * size, 0.034 * size, 0.009);
    flower_group.add(flower_center);

    root.add(flower_group);
    return flower_group;
  }

  function addSurfaceVein(localPoints, centerAngle, centerY, size) {
    const points = [];
    for (const point of localPoints) {
      const y = centerY + point.y * size;
      const angle = centerAngle - point.x * size / bodyRadiusAt(y);
      points.push(surfacePoint(angle, y, 0.014));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(curve, 12, 0.0025 * size, 6, false);
    const vein = new THREE.Mesh(geometry, clayVeinMat);
    root.add(vein);
    return vein;
  }

  const main_flower = addReliefFlower(1.92, 0.80, 1.0, 8);
  const left_flower = addReliefFlower(2.34, 0.87, 0.72, 7);
  const right_flower = addReliefFlower(1.43, 0.84, 0.70, 7);
  const lower_flower = addReliefFlower(1.22, 0.25, 0.48, 6);

  const main_flower_vein_left = addSurfaceVein([
    new THREE.Vector2(-0.010, 0.000),
    new THREE.Vector2(-0.045, 0.025),
    new THREE.Vector2(-0.085, 0.050),
  ], 1.92, 0.80, 1.0);

  const main_flower_vein_right = addSurfaceVein([
    new THREE.Vector2(0.010, 0.000),
    new THREE.Vector2(0.045, 0.025),
    new THREE.Vector2(0.085, 0.050),
  ], 1.92, 0.80, 1.0);

  const main_flower_vein_lower = addSurfaceVein([
    new THREE.Vector2(0.000, -0.010),
    new THREE.Vector2(0.000, -0.050),
    new THREE.Vector2(0.000, -0.090),
  ], 1.92, 0.80, 1.0);

  const side_hole_group = new THREE.Group();
  const sideHoleAngle = 1.02;
  const sideHoleY = 0.57;
  const sideHoleNormal = new THREE.Vector3(Math.cos(sideHoleAngle), 0, Math.sin(sideHoleAngle)).normalize();
  side_hole_group.position.copy(surfacePoint(sideHoleAngle, sideHoleY, 0.004));
  side_hole_group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), sideHoleNormal);
  root.add(side_hole_group);

  const side_hole_cavityGeom = new THREE.CircleGeometry(0.158, 48);
  const side_hole_cavity = new THREE.Mesh(side_hole_cavityGeom, interiorMat);
  side_hole_cavity.position.z = 0.006;
  side_hole_group.add(side_hole_cavity);

  const side_hole_rimGeom = new THREE.TorusGeometry(0.184, 0.035, 14, 56);
  const side_hole_rim = new THREE.Mesh(side_hole_rimGeom, clayMat);
  side_hole_rim.position.z = 0.012;
  side_hole_group.add(side_hole_rim);

  const side_hole_inner_shadowGeom = new THREE.TorusGeometry(0.153, 0.009, 8, 48);
  const side_hole_inner_shadow = new THREE.Mesh(side_hole_inner_shadowGeom, clayVeinMat);
  side_hole_inner_shadow.position.z = 0.014;
  side_hole_group.add(side_hole_inner_shadow);

  const speckleGeom = new THREE.CircleGeometry(1, 8);

  function createSpeckles(count, material, phase, baseSize) {
    const speckles = new THREE.InstancedMesh(speckleGeom, material, count);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const angleFraction = ((i * 37 + phase * 13) % 101) / 100;
      const heightFraction = ((i * 53 + phase * 17) % 97) / 96;
      const angle = angleFraction * Math.PI * 2;
      const y = 0.14 + heightFraction * 1.10;
      const pose = surfacePose(angle, y, 0.008);
      const variation = 0.55 + ((i * 19 + phase) % 7) * 0.10;
      const stretch = 0.65 + ((i * 11 + phase) % 5) * 0.10;
      const size = baseSize * variation;

      dummy.position.copy(pose.position);
      dummy.quaternion.copy(pose.quaternion);
      dummy.rotateZ(((i * 29 + phase) % 31) / 31 * Math.PI);
      dummy.scale.set(size, size * stretch, 1);
      dummy.updateMatrix();
      speckles.setMatrixAt(i, dummy.matrix);
    }

    speckles.instanceMatrix.needsUpdate = true;
    root.add(speckles);
    return speckles;
  }

  const dark_speckles = createSpeckles(34, darkSpeckleMat, 2, 0.006);
  const light_speckles = createSpeckles(24, lightSpeckleMat, 5, 0.008);

  function fitToUnitCube(THREE, object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }

  fitToUnitCube(THREE, root);
  return root;
}