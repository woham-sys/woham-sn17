// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_hook_stand";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x8a4f2c,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodLightMat = new THREE.MeshStandardMaterial({
    color: 0xa16438,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodDarkMat = new THREE.MeshStandardMaterial({
    color: 0x63351f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x3d2117,
    metalness: 0.0,
    roughness: 0.9,
  });
  const blackMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.2,
  });

  function createRoundedSlabGeometry(width, depth, height, radius, bevel) {
    const halfW = width / 2;
    const halfD = depth / 2;
    const shape = new THREE.Shape();

    shape.moveTo(-halfW + radius, -halfD);
    shape.lineTo(halfW - radius, -halfD);
    shape.quadraticCurveTo(halfW, -halfD, halfW, -halfD + radius);
    shape.lineTo(halfW, halfD - radius);
    shape.quadraticCurveTo(halfW, halfD, halfW - radius, halfD);
    shape.lineTo(-halfW + radius, halfD);
    shape.quadraticCurveTo(-halfW, halfD, -halfW, halfD - radius);
    shape.lineTo(-halfW, -halfD + radius);
    shape.quadraticCurveTo(-halfW, -halfD, -halfW + radius, -halfD);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
      curveSegments: 8,
    });
    geometry.translate(0, 0, -height / 2);
    return geometry;
  }

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  root.add(base_group);

  const base_bottomGeom = createRoundedSlabGeometry(
    1.0,
    0.72,
    0.1,
    0.055,
    0.012
  );
  const base_bottom = new THREE.Mesh(base_bottomGeom, woodDarkMat);
  base_bottom.name = "base_bottom";
  base_bottom.rotation.x = -Math.PI / 2;
  base_bottom.position.y = 0.062;
  base_group.add(base_bottom);

  const base_moldingGeom = createRoundedSlabGeometry(
    0.94,
    0.66,
    0.055,
    0.045,
    0.018
  );
  const base_molding = new THREE.Mesh(base_moldingGeom, woodMat);
  base_molding.name = "base_molding";
  base_molding.rotation.x = -Math.PI / 2;
  base_molding.position.y = 0.135;
  base_group.add(base_molding);

  const base_topGeom = createRoundedSlabGeometry(
    0.84,
    0.57,
    0.045,
    0.025,
    0.009
  );
  const base_top = new THREE.Mesh(base_topGeom, woodLightMat);
  base_top.name = "base_top";
  base_top.rotation.x = -Math.PI / 2;
  base_top.position.y = 0.18;
  base_group.add(base_top);

  const base_front_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const base_front_grain = new THREE.InstancedMesh(
    base_front_grainGeom,
    grainMat,
    12
  );
  base_front_grain.name = "base_front_grain";

  const grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const row = i % 4;
    const x = -0.37 + (((i * 7) % 13) / 12) * 0.74;
    const length = 0.08 + ((i * 5) % 7) * 0.025;
    grain_dummy.position.set(x, 0.035 + row * 0.022, 0.374);
    grain_dummy.rotation.set(0, 0, 0);
    grain_dummy.scale.set(length, 0.003, 0.003);
    grain_dummy.updateMatrix();
    base_front_grain.setMatrixAt(i, grain_dummy.matrix);
  }
  base_front_grain.instanceMatrix.needsUpdate = true;
  base_group.add(base_front_grain);

  const base_top_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const base_top_grain = new THREE.InstancedMesh(
    base_top_grainGeom,
    grainMat,
    10
  );
  base_top_grain.name = "base_top_grain";

  for (let i = 0; i < 10; i++) {
    const x = -0.31 + (((i * 9) % 11) / 10) * 0.62;
    const length = 0.1 + ((i * 3) % 6) * 0.035;
    grain_dummy.position.set(x, 0.211, 0.01);
    grain_dummy.rotation.set(0, Math.PI / 2, 0);
    grain_dummy.scale.set(length, 0.003, 0.004);
    grain_dummy.updateMatrix();
    base_top_grain.setMatrixAt(i, grain_dummy.matrix);
  }
  base_top_grain.instanceMatrix.needsUpdate = true;
  base_group.add(base_top_grain);

  const upright_group = new THREE.Group();
  upright_group.name = "upright_group";
  upright_group.position.y = 0.207;
  upright_group.rotation.x = -0.1;
  root.add(upright_group);

  const uprightH = 1.0;
  const uprightD = 0.22;
  const uprightBottomW = 0.3;
  const uprightTopW = 0.24;

  const upright_bodyShape = new THREE.Shape();
  upright_bodyShape.moveTo(-uprightBottomW / 2, 0);
  upright_bodyShape.lineTo(uprightBottomW / 2, 0);
  upright_bodyShape.lineTo(uprightTopW / 2, uprightH);
  upright_bodyShape.lineTo(-uprightTopW / 2, uprightH);
  upright_bodyShape.lineTo(-uprightBottomW / 2, 0);

  const upright_bodyGeom = new THREE.ExtrudeGeometry(upright_bodyShape, {
    depth: uprightD,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
    curveSegments: 4,
  });
  upright_bodyGeom.translate(0, 0, -uprightD / 2);

  const upright_body = new THREE.Mesh(upright_bodyGeom, woodMat);
  upright_body.name = "upright_body";
  upright_group.add(upright_body);

  const upright_front_faceShape = new THREE.Shape();
  upright_front_faceShape.moveTo(-0.132, 0.025);
  upright_front_faceShape.lineTo(0.132, 0.025);
  upright_front_faceShape.lineTo(0.103, 0.975);
  upright_front_faceShape.lineTo(-0.103, 0.975);
  upright_front_faceShape.lineTo(-0.132, 0.025);

  const upright_front_faceGeom = new THREE.ShapeGeometry(
    upright_front_faceShape,
    8
  );
  const upright_front_face = new THREE.Mesh(
    upright_front_faceGeom,
    woodLightMat
  );
  upright_front_face.name = "upright_front_face";
  upright_front_face.position.z = 0.124;
  upright_group.add(upright_front_face);

  const upright_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const upright_grain = new THREE.InstancedMesh(
    upright_grainGeom,
    grainMat,
    24
  );
  upright_grain.name = "upright_grain";

  for (let i = 0; i < 24; i++) {
    const y = 0.1 + (((i * 11) % 25) / 24) * 0.78;
    const halfWidth =
      0.132 + (0.104 - 0.132) * (y / uprightH);
    const x =
      -halfWidth * 0.78 +
      (((i * 7) % 19) / 18) * halfWidth * 1.56;
    const length = 0.035 + ((i * 5) % 9) * 0.012;
    grain_dummy.position.set(x, y, 0.127);
    grain_dummy.rotation.set(0, 0, ((i % 5) - 2) * 0.012);
    grain_dummy.scale.set(0.003, length, 0.0025);
    grain_dummy.updateMatrix();
    upright_grain.setMatrixAt(i, grain_dummy.matrix);
  }
  upright_grain.instanceMatrix.needsUpdate = true;
  upright_group.add(upright_grain);

  const upright_side_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const upright_side_grain = new THREE.InstancedMesh(
    upright_side_grainGeom,
    grainMat,
    12
  );
  upright_side_grain.name = "upright_side_grain";

  for (let i = 0; i < 12; i++) {
    const y = 0.12 + (((i * 7) % 13) / 12) * 0.72;
    const halfWidth =
      0.132 + (0.104 - 0.132) * (y / uprightH);
    const z = -0.075 + (((i * 5) % 11) / 10) * 0.15;
    const length = 0.045 + ((i * 3) % 6) * 0.014;
    grain_dummy.position.set(halfWidth + 0.014, y, z);
    grain_dummy.rotation.set(0, 0, ((i % 3) - 1) * 0.015);
    grain_dummy.scale.set(0.0025, length, 0.004);
    grain_dummy.updateMatrix();
    upright_side_grain.setMatrixAt(i, grain_dummy.matrix);
  }
  upright_side_grain.instanceMatrix.needsUpdate = true;
  upright_group.add(upright_side_grain);

  const upright_collarGeom = createRoundedSlabGeometry(
    0.36,
    0.27,
    0.045,
    0.045,
    0.008
  );
  const upright_collar = new THREE.Mesh(
    upright_collarGeom,
    blackMetalMat
  );
  upright_collar.name = "upright_collar";
  upright_collar.rotation.x = -Math.PI / 2;
  upright_collar.position.y = 0.018;
  upright_group.add(upright_collar);

  const pivot_buttonGeom = new THREE.CylinderGeometry(
    0.043,
    0.043,
    0.018,
    24
  );
  const pivot_button = new THREE.Mesh(
    pivot_buttonGeom,
    blackMetalMat
  );
  pivot_button.name = "pivot_button";
  pivot_button.rotation.x = Math.PI / 2;
  pivot_button.position.set(-0.065, 0.84, 0.136);
  upright_group.add(pivot_button);

  const pivot_rimGeom = new THREE.TorusGeometry(
    0.037,
    0.004,
    8,
    24
  );
  const pivot_rim = new THREE.Mesh(pivot_rimGeom, blackMetalMat);
  pivot_rim.name = "pivot_rim";
  pivot_rim.position.set(-0.065, 0.84, 0.147);
  upright_group.add(pivot_rim);

  const hook_mountGeom = new THREE.CylinderGeometry(
    0.031,
    0.031,
    0.025,
    20
  );
  const hook_mount = new THREE.Mesh(hook_mountGeom, blackMetalMat);
  hook_mount.name = "hook_mount";
  hook_mount.rotation.x = Math.PI / 2;
  hook_mount.position.set(-0.055, 0.985, 0.125);
  upright_group.add(hook_mount);

  const hookPath = [
    new THREE.Vector3(-0.055, 0.985, 0.13),
    new THREE.Vector3(-0.035, 1.07, 0.13),
    new THREE.Vector3(0.025, 1.17, 0.13),
    new THREE.Vector3(0.13, 1.25, 0.13),
    new THREE.Vector3(0.25, 1.27, 0.13),
    new THREE.Vector3(0.36, 1.22, 0.13),
    new THREE.Vector3(0.43, 1.12, 0.13),
    new THREE.Vector3(0.46, 1.0, 0.13),
    new THREE.Vector3(0.46, 0.89, 0.13),
    new THREE.Vector3(0.42, 0.8, 0.13),
    new THREE.Vector3(0.35, 0.75, 0.13),
    new THREE.Vector3(0.28, 0.76, 0.13),
    new THREE.Vector3(0.23, 0.82, 0.13),
    new THREE.Vector3(0.22, 0.9, 0.13),
    new THREE.Vector3(0.25, 0.97, 0.13),
    new THREE.Vector3(0.31, 1.0, 0.13),
    new THREE.Vector3(0.36, 0.98, 0.13),
  ];

  const hookCurve = new THREE.CatmullRomCurve3(
    hookPath,
    false,
    "centripetal",
    0.5
  );
  const hookGeom = new THREE.TubeGeometry(
    hookCurve,
    96,
    0.022,
    10,
    false
  );
  const hook = new THREE.Mesh(hookGeom, blackMetalMat);
  hook.name = "hook";
  upright_group.add(hook);

  const hook_tipGeom = new THREE.SphereGeometry(0.029, 18, 12);
  const hook_tip = new THREE.Mesh(hook_tipGeom, blackMetalMat);
  hook_tip.name = "hook_tip";
  hook_tip.position.copy(hookPath[hookPath.length - 1]);
  hook_tip.scale.set(1.15, 0.9, 1.0);
  upright_group.add(hook_tip);

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

  fitToUnitCube(THREE, root);
  return root;
}