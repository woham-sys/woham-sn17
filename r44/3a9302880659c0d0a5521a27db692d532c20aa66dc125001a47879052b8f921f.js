// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "floral_teacup";

  const cup_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xf0f2ed,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const rimMat = new THREE.MeshPhysicalMaterial({
    color: 0xd8ddd5,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const floral_decorationMat = new THREE.MeshStandardMaterial({
    color: 0xaeb5ae,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.62,
    side: THREE.DoubleSide,
  });

  const cup_bodyProfile = [
    new THREE.Vector2(0.00, -0.48),
    new THREE.Vector2(0.34, -0.48),
    new THREE.Vector2(0.43, -0.45),
    new THREE.Vector2(0.51, -0.36),
    new THREE.Vector2(0.59, -0.20),
    new THREE.Vector2(0.66, 0.02),
    new THREE.Vector2(0.72, 0.25),
    new THREE.Vector2(0.75, 0.38),
    new THREE.Vector2(0.74, 0.43),
    new THREE.Vector2(0.70, 0.46),
    new THREE.Vector2(0.67, 0.41),
    new THREE.Vector2(0.65, 0.27),
    new THREE.Vector2(0.59, 0.04),
    new THREE.Vector2(0.51, -0.18),
    new THREE.Vector2(0.41, -0.32),
    new THREE.Vector2(0.25, -0.37),
    new THREE.Vector2(0.00, -0.37),
  ];
  const cup_bodyGeom = new THREE.LatheGeometry(cup_bodyProfile, 64);
  const cup_body = new THREE.Mesh(cup_bodyGeom, cup_bodyMat);
  cup_body.name = "cup_body";
  root.add(cup_body);

  const footProfile = [
    new THREE.Vector2(0.00, -0.66),
    new THREE.Vector2(0.35, -0.66),
    new THREE.Vector2(0.40, -0.64),
    new THREE.Vector2(0.43, -0.59),
    new THREE.Vector2(0.43, -0.52),
    new THREE.Vector2(0.39, -0.46),
    new THREE.Vector2(0.00, -0.45),
  ];
  const footGeom = new THREE.LatheGeometry(footProfile, 64);
  const foot = new THREE.Mesh(footGeom, cup_bodyMat);
  foot.name = "foot";
  root.add(foot);

  const rimGeom = new THREE.TorusGeometry(0.72, 0.026, 12, 64);
  const rim = new THREE.Mesh(rimGeom, rimMat);
  rim.name = "rim";
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.425;
  root.add(rim);

  const foot_ringGeom = new THREE.TorusGeometry(0.395, 0.012, 8, 48);
  const foot_ring = new THREE.Mesh(foot_ringGeom, rimMat);
  foot_ring.name = "foot_ring";
  foot_ring.rotation.x = Math.PI / 2;
  foot_ring.position.y = -0.64;
  root.add(foot_ring);

  const handlePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.68, 0.27, 0.00),
    new THREE.Vector3(0.84, 0.34, 0.00),
    new THREE.Vector3(1.03, 0.47, 0.00),
    new THREE.Vector3(1.22, 0.43, 0.00),
    new THREE.Vector3(1.34, 0.25, 0.00),
    new THREE.Vector3(1.34, 0.02, 0.00),
    new THREE.Vector3(1.23, -0.16, 0.00),
    new THREE.Vector3(1.02, -0.27, 0.00),
    new THREE.Vector3(0.78, -0.27, 0.00),
    new THREE.Vector3(0.57, -0.17, 0.00),
  ], false, "centripetal");

  const handleGeom = new THREE.TubeGeometry(handlePath, 64, 0.065, 14, false);
  const handle = new THREE.Mesh(handleGeom, cup_bodyMat);
  handle.name = "handle";
  root.add(handle);

  const handle_mountGeom = new THREE.SphereGeometry(0.09, 24, 12);

  const upper_handle_mount = new THREE.Mesh(handle_mountGeom, cup_bodyMat);
  upper_handle_mount.name = "upper_handle_mount";
  upper_handle_mount.position.set(0.69, 0.27, 0);
  upper_handle_mount.scale.set(1.35, 0.72, 1.0);
  root.add(upper_handle_mount);

  const lower_handle_mount = new THREE.Mesh(handle_mountGeom, cup_bodyMat);
  lower_handle_mount.name = "lower_handle_mount";
  lower_handle_mount.position.set(0.58, -0.17, 0);
  lower_handle_mount.scale.set(1.45, 0.72, 1.0);
  root.add(lower_handle_mount);

  const floral_decoration = new THREE.Group();
  floral_decoration.name = "floral_decoration";
  root.add(floral_decoration);

  function outerRadiusAt(y) {
    if (y <= -0.48) return 0.34;
    if (y < -0.45) return 0.34 + (y + 0.48) / 0.03 * 0.09;
    if (y < -0.36) return 0.43 + (y + 0.45) / 0.09 * 0.08;
    if (y < -0.20) return 0.51 + (y + 0.36) / 0.16 * 0.08;
    if (y < 0.02) return 0.59 + (y + 0.20) / 0.22 * 0.07;
    if (y < 0.25) return 0.66 + (y - 0.02) / 0.23 * 0.06;
    if (y < 0.38) return 0.72 + (y - 0.25) / 0.13 * 0.03;
    return 0.74;
  }

  function surfacePose(angle, y, extra) {
    const radius = outerRadiusAt(y) + extra;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();
    const position = new THREE.Vector3(normal.x * radius, y, normal.z * radius);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { position, quaternion };
  }

  function addSurfaceVine(name, controls, radius) {
    const points = [];
    for (let i = 0; i < controls.length; i++) {
      points.push(surfacePose(controls[i][0], controls[i][1], 0.008).position);
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(16, controls.length * 8),
      radius,
      6,
      false
    );
    const vine = new THREE.Mesh(geometry, floral_decorationMat);
    vine.name = name;
    floral_decoration.add(vine);
    return vine;
  }

  const main_vine = addSurfaceVine("main_vine", [
    [2.55, -0.20],
    [2.30, -0.15],
    [2.05, -0.08],
    [1.80, 0.01],
    [1.55, 0.08],
    [1.30, 0.12],
    [1.05, 0.17],
    [0.82, 0.25],
  ], 0.0045);

  const left_branch = addSurfaceVine("left_branch", [
    [2.25, -0.14],
    [2.35, -0.02],
    [2.42, 0.10],
    [2.46, 0.21],
  ], 0.0038);

  const upper_branch = addSurfaceVine("upper_branch", [
    [1.78, 0.01],
    [1.65, 0.13],
    [1.50, 0.23],
    [1.34, 0.29],
  ], 0.0038);

  const lower_branch = addSurfaceVine("lower_branch", [
    [1.55, 0.07],
    [1.43, -0.03],
    [1.28, -0.12],
    [1.10, -0.18],
  ], 0.0038);

  const right_branch = addSurfaceVine("right_branch", [
    [1.28, 0.12],
    [1.12, 0.06],
    [0.96, 0.02],
    [0.80, 0.03],
  ], 0.0035);

  const petal_outlineGeom = new THREE.RingGeometry(0.78, 1.0, 20);
  const flower_centerGeom = new THREE.CircleGeometry(1, 18);
  const flower_center_outlineGeom = new THREE.RingGeometry(0.58, 1.0, 18);

  function addFlower(name, angle, y, size, rotation) {
    const flower = new THREE.Group();
    flower.name = name;

    for (let i = 0; i < 5; i++) {
      const petalAngle = rotation + i / 5 * Math.PI * 2;
      const offsetX = Math.cos(petalAngle) * size * 0.43;
      const offsetY = Math.sin(petalAngle) * size * 0.43;
      const petalY = y + offsetY;
      const localRadius = outerRadiusAt(petalY);
      const petalAngleOnSurface = angle - offsetX / localRadius;
      const pose = surfacePose(petalAngleOnSurface, petalY, 0.009);

      const petal = new THREE.Mesh(petal_outlineGeom, floral_decorationMat);
      petal.name = name + "_petal_" + i;
      petal.position.copy(pose.position);
      petal.quaternion.copy(pose.quaternion);
      petal.rotateZ(petalAngle - Math.PI / 2);
      petal.scale.set(size * 0.34, size * 0.56, 1);
      flower.add(petal);
    }

    const centerPose = surfacePose(angle, y, 0.010);

    const center = new THREE.Mesh(flower_centerGeom, floral_decorationMat);
    center.name = name + "_center";
    center.position.copy(centerPose.position);
    center.quaternion.copy(centerPose.quaternion);
    center.scale.setScalar(size * 0.18);
    flower.add(center);

    const center_outline = new THREE.Mesh(
      flower_center_outlineGeom,
      floral_decorationMat
    );
    center_outline.name = name + "_center_outline";
    center_outline.position.copy(centerPose.position);
    center_outline.quaternion.copy(centerPose.quaternion);
    center_outline.scale.setScalar(size * 0.23);
    flower.add(center_outline);

    floral_decoration.add(flower);
    return flower;
  }

  const left_flower = addFlower("left_flower", 2.30, -0.04, 0.13, 0.25);
  const central_flower = addFlower("central_flower", 1.82, 0.04, 0.17, 0.10);
  const lower_flower = addFlower("lower_flower", 1.27, -0.12, 0.14, 0.45);
  const right_flower = addFlower("right_flower", 0.91, 0.20, 0.105, 0.20);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, -1);
  leafShape.bezierCurveTo(0.62, -0.48, 0.62, 0.48, 0, 1);
  leafShape.bezierCurveTo(-0.62, 0.48, -0.62, -0.48, 0, -1);

  const leaf_decalsGeom = new THREE.ShapeGeometry(leafShape, 12);
  const leafSpecs = [
    [2.42, -0.13, 0.055, 0.105, -0.80],
    [2.20, 0.08, 0.052, 0.105, 0.70],
    [2.03, -0.10, 0.050, 0.100, -1.00],
    [1.92, 0.18, 0.055, 0.115, 0.55],
    [1.67, 0.22, 0.052, 0.110, -0.55],
    [1.50, -0.02, 0.052, 0.105, 0.85],
    [1.38, 0.18, 0.047, 0.095, -0.70],
    [1.17, 0.06, 0.048, 0.100, 0.80],
    [1.04, -0.10, 0.045, 0.092, -0.65],
    [0.84, 0.11, 0.043, 0.088, 0.75],
    [2.50, 0.13, 0.043, 0.088, -0.55],
    [1.22, 0.27, 0.042, 0.088, 0.55],
  ];

  const leaf_decals = new THREE.InstancedMesh(
    leaf_decalsGeom,
    floral_decorationMat,
    leafSpecs.length
  );
  leaf_decals.name = "leaf_decals";

  const leaf_dummy = new THREE.Object3D();
  for (let i = 0; i < leafSpecs.length; i++) {
    const spec = leafSpecs[i];
    const pose = surfacePose(spec[0], spec[1], 0.009);
    leaf_dummy.position.copy(pose.position);
    leaf_dummy.quaternion.copy(pose.quaternion);
    leaf_dummy.rotateZ(spec[4]);
    leaf_dummy.scale.set(spec[2], spec[3], 1);
    leaf_dummy.updateMatrix();
    leaf_decals.setMatrixAt(i, leaf_dummy.matrix);
  }
  leaf_decals.instanceMatrix.needsUpdate = true;
  floral_decoration.add(leaf_decals);

  const leaf_veins = new THREE.Group();
  leaf_veins.name = "leaf_veins";
  floral_decoration.add(leaf_veins);

  for (let i = 0; i < leafSpecs.length; i++) {
    const spec = leafSpecs[i];
    const directionX = -Math.sin(spec[4]);
    const directionY = Math.cos(spec[4]);
    const veinPoints = [];

    for (let j = 0; j < 3; j++) {
      const t = -0.62 + j * 0.62;
      const angle = spec[0] - directionX * spec[3] * t / outerRadiusAt(spec[1]);
      const y = spec[1] + directionY * spec[3] * t;
      veinPoints.push(surfacePose(angle, y, 0.010).position);
    }

    const veinCurve = new THREE.CatmullRomCurve3(veinPoints, false, "centripetal");
    const veinGeom = new THREE.TubeGeometry(veinCurve, 6, 0.0018, 5, false);
    const vein = new THREE.Mesh(veinGeom, floral_decorationMat);
    vein.name = "leaf_vein_" + i;
    leaf_veins.add(vein);
  }

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