// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "crocheted_lamp";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  root.add(base_group);

  const lampshade_group = new THREE.Group();
  lampshade_group.name = "lampshade_group";
  root.add(lampshade_group);

  const baseMat = new THREE.MeshStandardMaterial({
    color: 0xb8783f,
    metalness: 0.0,
    roughness: 0.6
  });
  const baseProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.34, 0.00),
    new THREE.Vector2(0.40, 0.015),
    new THREE.Vector2(0.43, 0.055),
    new THREE.Vector2(0.44, 0.13),
    new THREE.Vector2(0.43, 0.24),
    new THREE.Vector2(0.39, 0.32),
    new THREE.Vector2(0.31, 0.37),
    new THREE.Vector2(0.24, 0.39),
    new THREE.Vector2(0.22, 0.48),
    new THREE.Vector2(0.21, 0.56),
    new THREE.Vector2(0.00, 0.56)
  ];
  const baseGeom = new THREE.LatheGeometry(baseProfile, 48);
  const base = new THREE.Mesh(baseGeom, baseMat);
  base.name = "base";
  base_group.add(base);

  const base_grainMat = new THREE.MeshStandardMaterial({
    color: 0x75421f,
    metalness: 0.0,
    roughness: 0.6
  });
  const base_grain = new THREE.Group();
  base_grain.name = "base_grain";
  const grainLevels = [
    { y: 0.075, r: 0.431 },
    { y: 0.145, r: 0.441 },
    { y: 0.225, r: 0.431 },
    { y: 0.295, r: 0.405 },
    { y: 0.345, r: 0.355 }
  ];
  for (let i = 0; i < grainLevels.length; i++) {
    const level = grainLevels[i];
    const grainGeom = new THREE.TorusGeometry(level.r, 0.0025, 5, 64);
    const grain = new THREE.Mesh(grainGeom, base_grainMat);
    grain.rotation.x = Math.PI / 2;
    grain.position.y = level.y;
    base_grain.add(grain);
  }
  base_group.add(base_grain);

  const base_bottom_ringMat = new THREE.MeshStandardMaterial({
    color: 0x33271f,
    metalness: 0.0,
    roughness: 0.8
  });
  const base_bottom_ringGeom = new THREE.TorusGeometry(0.397, 0.007, 8, 64);
  const base_bottom_ring = new THREE.Mesh(base_bottom_ringGeom, base_bottom_ringMat);
  base_bottom_ring.name = "base_bottom_ring";
  base_bottom_ring.rotation.x = Math.PI / 2;
  base_bottom_ring.position.y = 0.012;
  base_group.add(base_bottom_ring);

  const shadeBottom = 0.50;
  const shadeTop = 1.68;
  const shadeHeight = shadeTop - shadeBottom;
  const bottomRadius = 0.82;
  const topRadius = 0.31;

  function shadeRadiusAt(y) {
    const t = Math.max(0, Math.min(1, (y - shadeBottom) / shadeHeight));
    return bottomRadius + (topRadius - bottomRadius) * t + 0.035 * Math.sin(Math.PI * t);
  }

  const lampshadeMat = new THREE.MeshStandardMaterial({
    color: 0xff8a18,
    emissive: 0xff8a18,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.8,
    transparent: true,
    opacity: 0.20,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const lampshadeGeom = new THREE.CylinderGeometry(
    topRadius,
    bottomRadius,
    shadeHeight,
    64,
    1,
    true
  );
  const lampshade = new THREE.Mesh(lampshadeGeom, lampshadeMat);
  lampshade.name = "lampshade";
  lampshade.position.y = (shadeBottom + shadeTop) / 2;
  lampshade_group.add(lampshade);

  const inner_glowMat = new THREE.MeshStandardMaterial({
    color: 0xffb23a,
    emissive: 0xffb23a,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.8,
    transparent: true,
    opacity: 0.32,
    depthWrite: false
  });
  const inner_glowGeom = new THREE.SphereGeometry(0.27, 32, 20);
  const inner_glow = new THREE.Mesh(inner_glowGeom, inner_glowMat);
  inner_glow.name = "inner_glow";
  inner_glow.position.y = 1.04;
  inner_glow.scale.set(1.0, 1.55, 1.0);
  lampshade_group.add(inner_glow);

  const light_coreMat = new THREE.MeshStandardMaterial({
    color: 0xffffc0,
    emissive: 0xffffc0,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const light_coreGeom = new THREE.SphereGeometry(0.075, 24, 16);
  const light_core = new THREE.Mesh(light_coreGeom, light_coreMat);
  light_core.name = "light_core";
  light_core.position.y = 1.08;
  light_core.scale.set(1.0, 2.0, 1.0);
  lampshade_group.add(light_core);

  const top_opening_glowMat = new THREE.MeshStandardMaterial({
    color: 0xffb52e,
    emissive: 0xffb52e,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
    side: THREE.DoubleSide
  });
  const top_opening_glowGeom = new THREE.CircleGeometry(0.275, 48);
  const top_opening_glow = new THREE.Mesh(top_opening_glowGeom, top_opening_glowMat);
  top_opening_glow.name = "top_opening_glow";
  top_opening_glow.rotation.x = -Math.PI / 2;
  top_opening_glow.position.y = shadeTop - 0.004;
  lampshade_group.add(top_opening_glow);

  const yarn_redMat = new THREE.MeshStandardMaterial({
    color: 0xc92849,
    metalness: 0.0,
    roughness: 0.95
  });
  const yarn_magentaMat = new THREE.MeshStandardMaterial({
    color: 0xc33d79,
    metalness: 0.0,
    roughness: 0.95
  });
  const yarn_blueMat = new THREE.MeshStandardMaterial({
    color: 0x1689b5,
    metalness: 0.0,
    roughness: 0.95
  });
  const yarn_indigoMat = new THREE.MeshStandardMaterial({
    color: 0x5653a5,
    metalness: 0.0,
    roughness: 0.95
  });
  const yarn_greenMat = new THREE.MeshStandardMaterial({
    color: 0x318b58,
    metalness: 0.0,
    roughness: 0.95
  });
  const yarn_turquoiseMat = new THREE.MeshStandardMaterial({
    color: 0x259b91,
    metalness: 0.0,
    roughness: 0.95
  });
  const yarn_yellowMat = new THREE.MeshStandardMaterial({
    color: 0xd7c448,
    metalness: 0.0,
    roughness: 0.95
  });
  const yarn_orangeMat = new THREE.MeshStandardMaterial({
    color: 0xd87334,
    metalness: 0.0,
    roughness: 0.95
  });
  const yarnMaterials = [
    yarn_redMat,
    yarn_magentaMat,
    yarn_blueMat,
    yarn_indigoMat,
    yarn_greenMat,
    yarn_turquoiseMat,
    yarn_yellowMat,
    yarn_orangeMat
  ];

  const stitchPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.110, 0.026, 0.000),
    new THREE.Vector3(-0.078, 0.004, 0.004),
    new THREE.Vector3(-0.042, -0.026, 0.007),
    new THREE.Vector3(0.000, -0.038, 0.009),
    new THREE.Vector3(0.042, -0.026, 0.007),
    new THREE.Vector3(0.078, 0.004, 0.004),
    new THREE.Vector3(0.110, 0.026, 0.000)
  ], false, "centripetal");
  const stitchGeom = new THREE.TubeGeometry(stitchPath, 20, 0.016, 8, false);

  const yarn_stitches = new THREE.Group();
  yarn_stitches.name = "yarn_stitches";
  lampshade_group.add(yarn_stitches);

  const stitchTransforms = [];
  for (let i = 0; i < yarnMaterials.length; i++) stitchTransforms.push([]);

  const rowCount = 13;
  const stitchCount = 24;
  const rowStep = (shadeHeight - 0.14) / (rowCount - 1);

  for (let row = 0; row < rowCount; row++) {
    const y = shadeBottom + 0.07 + row * rowStep;
    const radius = shadeRadiusAt(y) + 0.014;
    const phase = row % 2 === 0 ? 0 : Math.PI / stitchCount;

    for (let i = 0; i < stitchCount; i++) {
      const angle = i / stitchCount * Math.PI * 2 + phase;
      const position = new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );
      const tangent = new THREE.Vector3(
        -Math.sin(angle),
        0,
        Math.cos(angle)
      );
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(1, 0, 0),
        tangent
      );
      const scale = new THREE.Vector3(
        0.96 + 0.04 * Math.sin(row * 1.7 + i * 0.9),
        1,
        1
      );
      const matrix = new THREE.Matrix4();
      matrix.compose(position, quaternion, scale);
      const colorIndex = (i * 3 + row * 5 + Math.floor(i / 4)) % yarnMaterials.length;
      stitchTransforms[colorIndex].push(matrix);
    }
  }

  for (let colorIndex = 0; colorIndex < yarnMaterials.length; colorIndex++) {
    const transforms = stitchTransforms[colorIndex];
    const yarn_stitch_instances = new THREE.InstancedMesh(
      stitchGeom,
      yarnMaterials[colorIndex],
      transforms.length
    );
    yarn_stitch_instances.name = "yarn_stitch_instances_" + colorIndex;
    for (let i = 0; i < transforms.length; i++) {
      yarn_stitch_instances.setMatrixAt(i, transforms[i]);
    }
    yarn_stitch_instances.instanceMatrix.needsUpdate = true;
    yarn_stitches.add(yarn_stitch_instances);
  }

  const yarn_fibersMat = new THREE.LineBasicMaterial({
    color: 0xffd7a0,
    transparent: true,
    opacity: 0.42
  });
  const fiberPositions = [];
  const fiberCount = 42;
  for (let i = 0; i < fiberCount; i++) {
    const row = 1 + (i * 5) % (rowCount - 2);
    const y = shadeBottom + 0.07 + row * rowStep;
    const radius = shadeRadiusAt(y) + 0.034;
    const angle = i * 2.3999632297;
    const direction = i % 2 === 0 ? 1 : -1;
    const tangentX = -Math.sin(angle);
    const tangentZ = Math.cos(angle);
    const radialX = Math.cos(angle);
    const radialZ = Math.sin(angle);
    const start = new THREE.Vector3(
      radialX * radius,
      y,
      radialZ * radius
    );
    const end = new THREE.Vector3(
      radialX * (radius + 0.018 * direction) + tangentX * 0.018,
      y + 0.025 * direction,
      radialZ * (radius + 0.018 * direction) + tangentZ * 0.018
    );
    fiberPositions.push(
      start.x, start.y, start.z,
      end.x, end.y, end.z
    );
  }
  const yarn_fibersGeom = new THREE.BufferGeometry();
  yarn_fibersGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(fiberPositions, 3)
  );
  const yarn_fibers = new THREE.LineSegments(yarn_fibersGeom, yarn_fibersMat);
  yarn_fibers.name = "yarn_fibers";
  lampshade_group.add(yarn_fibers);

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