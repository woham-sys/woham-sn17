// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "purple_fruit";

  const fruit_group = new THREE.Group();
  fruit_group.name = "fruit_group";
  root.add(fruit_group);

  const stem_group = new THREE.Group();
  stem_group.name = "stem_group";
  root.add(stem_group);

  const fruit_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x652784,
    metalness: 0.0,
    roughness: 0.3,
  });

  const skin_specklesMat = new THREE.MeshStandardMaterial({
    color: 0xb99452,
    metalness: 0.0,
    roughness: 0.7,
  });

  const darker_specklesMat = new THREE.MeshStandardMaterial({
    color: 0x765329,
    metalness: 0.0,
    roughness: 0.7,
  });

  const main_stemMat = new THREE.MeshStandardMaterial({
    color: 0x4f7427,
    metalness: 0.0,
    roughness: 0.7,
  });

  const stem_highlightMat = new THREE.MeshStandardMaterial({
    color: 0x718e3d,
    metalness: 0.0,
    roughness: 0.7,
  });

  const calyxMat = new THREE.MeshStandardMaterial({
    color: 0x586d2b,
    metalness: 0.0,
    roughness: 0.7,
  });

  const cut_endMat = new THREE.MeshStandardMaterial({
    color: 0xc8ad79,
    metalness: 0.0,
    roughness: 0.7,
  });

  const cut_coreMat = new THREE.MeshStandardMaterial({
    color: 0x6f5735,
    metalness: 0.0,
    roughness: 0.7,
  });

  const fruit_bottom = -0.78;
  const fruit_top = 0.58;
  const fruit_height = fruit_top - fruit_bottom;

  function fruitRadiusAt(y) {
    const t = Math.max(0, Math.min(1, (y - fruit_bottom) / fruit_height));
    const arch = Math.pow(Math.max(0, Math.sin(Math.PI * t)), 0.48);
    return 0.49 * arch * (0.72 + 0.30 * t);
  }

  const fruit_bodyProfile = [];
  for (let i = 0; i <= 64; i++) {
    const t = i / 64;
    const y = fruit_bottom + fruit_height * t;
    fruit_bodyProfile.push(new THREE.Vector2(fruitRadiusAt(y), y));
  }

  const fruit_bodyGeom = new THREE.LatheGeometry(fruit_bodyProfile, 64);
  const fruit_body = new THREE.Mesh(fruit_bodyGeom, fruit_bodyMat);
  fruit_body.name = "fruit_body";
  fruit_group.add(fruit_body);

  const skin_specklesGeom = new THREE.SphereGeometry(1, 8, 6);
  const skin_speckle_count = 190;
  const skin_speckles = new THREE.InstancedMesh(
    skin_specklesGeom,
    skin_specklesMat,
    skin_speckle_count
  );
  skin_speckles.name = "skin_speckles";

  const darker_specklesGeom = skin_specklesGeom;
  const darker_speckle_count = 34;
  const darker_speckles = new THREE.InstancedMesh(
    darker_specklesGeom,
    darker_specklesMat,
    darker_speckle_count
  );
  darker_speckles.name = "darker_speckles";

  const speckle_dummy = new THREE.Object3D();
  const speckle_normal = new THREE.Vector3();
  const speckle_position = new THREE.Vector3();
  const local_normal = new THREE.Vector3(0, 0, 1);
  const golden_angle = 2.399963229728653;

  function fillSpeckles(mesh, count, phase, size_factor) {
    for (let i = 0; i < count; i++) {
      const u = (i + 0.5) / count;
      const y =
        fruit_bottom +
        0.045 +
        u * (fruit_height - 0.09) +
        Math.sin(i * 1.73 + phase) * 0.006;

      const angle =
        i * golden_angle +
        phase +
        Math.sin(i * 0.91 + phase) * 0.16;

      const radius = fruitRadiusAt(y);
      const delta = 0.004;
      const slope =
        (fruitRadiusAt(y + delta) - fruitRadiusAt(y - delta)) /
        (delta * 2);

      speckle_normal
        .set(Math.cos(angle), -slope, Math.sin(angle))
        .normalize();

      speckle_position
        .set(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        )
        .addScaledVector(speckle_normal, 0.003);

      const variation =
        0.78 + 0.34 * (0.5 + 0.5 * Math.sin(i * 2.17 + phase));
      const sx = size_factor * variation;
      const sy =
        size_factor *
        variation *
        (0.78 + 0.18 * (0.5 + 0.5 * Math.cos(i * 1.31)));
      const sz = size_factor * 0.34;

      speckle_dummy.position.copy(speckle_position);
      speckle_dummy.quaternion.setFromUnitVectors(
        local_normal,
        speckle_normal
      );
      speckle_dummy.scale.set(sx, sy, sz);
      speckle_dummy.updateMatrix();
      mesh.setMatrixAt(i, speckle_dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
  }

  fillSpeckles(skin_speckles, skin_speckle_count, 0.2, 0.0115);
  fillSpeckles(darker_speckles, darker_speckle_count, 1.4, 0.009);
  fruit_group.add(skin_speckles, darker_speckles);

  const calyxGeom = new THREE.SphereGeometry(1, 12, 8);
  const calyx_count = 9;
  const calyx = new THREE.InstancedMesh(calyxGeom, calyxMat, calyx_count);
  calyx.name = "calyx";

  const calyx_dummy = new THREE.Object3D();
  for (let i = 0; i < calyx_count; i++) {
    const angle = (i / calyx_count) * Math.PI * 2;
    calyx_dummy.position.set(
      Math.cos(angle) * 0.038,
      0.579,
      Math.sin(angle) * 0.038
    );
    calyx_dummy.rotation.set(0, -angle, 0);
    calyx_dummy.scale.set(0.044, 0.007, 0.014);
    calyx_dummy.updateMatrix();
    calyx.setMatrixAt(i, calyx_dummy.matrix);
  }
  calyx.instanceMatrix.needsUpdate = true;
  calyx.frustumCulled = false;
  fruit_group.add(calyx);

  const top_calyxGeom = new THREE.SphereGeometry(0.045, 16, 8);
  const top_calyx = new THREE.Mesh(top_calyxGeom, calyxMat);
  top_calyx.name = "top_calyx";
  top_calyx.position.y = 0.582;
  top_calyx.scale.set(1, 0.34, 1);
  fruit_group.add(top_calyx);

  const bottom_scarGeom = new THREE.SphereGeometry(1, 10, 6);
  const bottom_scar = new THREE.Mesh(bottom_scarGeom, darker_specklesMat);
  bottom_scar.name = "bottom_scar";
  bottom_scar.position.y = -0.783;
  bottom_scar.scale.set(0.027, 0.008, 0.027);
  fruit_group.add(bottom_scar);

  const main_stemPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.0, 0.59, 0.0),
      new THREE.Vector3(-0.012, 0.72, 0.002),
      new THREE.Vector3(-0.015, 0.86, 0.003),
      new THREE.Vector3(0.005, 0.97, 0.002),
      new THREE.Vector3(0.055, 1.045, 0.0),
      new THREE.Vector3(0.16, 1.075, -0.002),
      new THREE.Vector3(0.34, 1.025, -0.004),
      new THREE.Vector3(0.55, 0.92, -0.006),
      new THREE.Vector3(0.76, 0.77, -0.008),
      new THREE.Vector3(0.96, 0.58, -0.01),
      new THREE.Vector3(1.14, 0.37, -0.012),
    ],
    false,
    "centripetal"
  );

  const main_stemGeom = new THREE.TubeGeometry(
    main_stemPath,
    72,
    0.026,
    10,
    false
  );
  const main_stem = new THREE.Mesh(main_stemGeom, main_stemMat);
  main_stem.name = "main_stem";
  stem_group.add(main_stem);

  const stem_highlightPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.004, 0.60, 0.024),
      new THREE.Vector3(-0.006, 0.73, 0.026),
      new THREE.Vector3(-0.008, 0.86, 0.027),
      new THREE.Vector3(0.012, 0.965, 0.027),
      new THREE.Vector3(0.058, 1.035, 0.025),
      new THREE.Vector3(0.16, 1.064, 0.022),
      new THREE.Vector3(0.34, 1.014, 0.018),
      new THREE.Vector3(0.55, 0.909, 0.014),
      new THREE.Vector3(0.76, 0.764, 0.009),
      new THREE.Vector3(0.96, 0.574, 0.004),
      new THREE.Vector3(1.14, 0.364, -0.002),
    ],
    false,
    "centripetal"
  );

  const stem_highlightGeom = new THREE.TubeGeometry(
    stem_highlightPath,
    72,
    0.0032,
    6,
    false
  );
  const stem_highlight = new THREE.Mesh(
    stem_highlightGeom,
    stem_highlightMat
  );
  stem_highlight.name = "stem_highlight";
  stem_group.add(stem_highlight);

  const stem_jointGeom = new THREE.SphereGeometry(0.041, 16, 10);
  const stem_joint = new THREE.Mesh(stem_jointGeom, main_stemMat);
  stem_joint.name = "stem_joint";
  stem_joint.position.set(0.052, 1.045, 0);
  stem_joint.scale.set(1.15, 0.82, 0.9);
  stem_group.add(stem_joint);

  const stem_tendrilPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.064, 1.025, 0.012),
      new THREE.Vector3(0.073, 0.985, 0.018),
      new THREE.Vector3(0.069, 0.947, 0.019),
      new THREE.Vector3(0.055, 0.925, 0.016),
    ],
    false,
    "centripetal"
  );

  const stem_tendrilGeom = new THREE.TubeGeometry(
    stem_tendrilPath,
    16,
    0.004,
    6,
    false
  );
  const stem_tendril = new THREE.Mesh(stem_tendrilGeom, main_stemMat);
  stem_tendril.name = "stem_tendril";
  stem_group.add(stem_tendril);

  const cut_endpoint = new THREE.Vector3(0, 1.105, 0.035);
  const cut_direction = new THREE.Vector3(-0.35, 0.88, 0.28).normalize();
  const cut_quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    cut_direction
  );

  const cut_stemGeom = new THREE.CylinderGeometry(
    0.037,
    0.032,
    0.11,
    16
  );
  const cut_stem = new THREE.Mesh(cut_stemGeom, main_stemMat);
  cut_stem.name = "cut_stem";
  cut_stem.position.copy(cut_endpoint).addScaledVector(cut_direction, -0.055);
  cut_stem.quaternion.copy(cut_quaternion);
  stem_group.add(cut_stem);

  const cut_endGeom = new THREE.CylinderGeometry(
    0.034,
    0.034,
    0.008,
    20
  );
  const cut_end = new THREE.Mesh(cut_endGeom, cut_endMat);
  cut_end.name = "cut_end";
  cut_end.position.copy(cut_endpoint).addScaledVector(cut_direction, 0.004);
  cut_end.quaternion.copy(cut_quaternion);
  stem_group.add(cut_end);

  const cut_coreGeom = new THREE.CylinderGeometry(
    0.014,
    0.014,
    0.009,
    16
  );
  const cut_core = new THREE.Mesh(cut_coreGeom, cut_coreMat);
  cut_core.name = "cut_core";
  cut_core.position.copy(cut_endpoint).addScaledVector(cut_direction, 0.006);
  cut_core.quaternion.copy(cut_quaternion);
  stem_group.add(cut_core);

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