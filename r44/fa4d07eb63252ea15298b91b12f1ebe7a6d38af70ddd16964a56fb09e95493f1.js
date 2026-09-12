// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
 const plum_group = new THREE.Group();
 root.add(plum_group);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.3,
  });

  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x6f7f22,
    metalness: 0.0,
    roughness: 0.8,
  });

  const stem_highlightMat = new THREE.MeshStandardMaterial({
    color: 0x9aa63a,
    metalness: 0.0,
    roughness: 0.8,
  });

  const cut_endMat = new THREE.MeshStandardMaterial({
    color: 0x75462d,
    metalness: 0.0,
    roughness: 0.9,
  });

  const cut_faceMat = new THREE.MeshStandardMaterial({
    color: 0xa66b45,
    metalness: 0.0,
    roughness: 0.9,
  });

  const cut_coreMat = new THREE.MeshStandardMaterial({
    color: 0x382018,
    metalness: 0.0,
    roughness: 0.9,
  });

  const blossomMat = new THREE.MeshStandardMaterial({
    color: 0x352018,
    metalness: 0.0,
    roughness: 0.9,
  });

  const bodyProfile = new THREE.SplineCurve([
    new THREE.Vector2(0.00, -1.06),
    new THREE.Vector2(0.16, -1.02),
    new THREE.Vector2(0.42, -0.88),
    new THREE.Vector2(0.62, -0.62),
    new THREE.Vector2(0.72, -0.25),
    new THREE.Vector2(0.73, 0.15),
    new THREE.Vector2(0.66, 0.48),
    new THREE.Vector2(0.50, 0.75),
    new THREE.Vector2(0.28, 0.94),
    new THREE.Vector2(0.10, 1.02),
    new THREE.Vector2(0.00, 1.04),
  ]).getSpacedPoints(56);

  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const bodyPositions = bodyGeom.attributes.position;
  const bodyColors = new Float32Array(bodyPositions.count * 3);
  const darkPurple = new THREE.Color(0x321441);
  const midPurple = new THREE.Color(0x623274);
  const ripePurple = new THREE.Color(0x772160);
  const dustyPurple = new THREE.Color(0x81739a);
  const vertexColor = new THREE.Color();

  for (let i = 0; i < bodyPositions.count; i++) {
    let x = bodyPositions.getX(i);
    const y = bodyPositions.getY(i);
    let z = bodyPositions.getZ(i);
    const angle = Math.atan2(z, x);
    const t = Math.max(0, Math.min(1, (y + 1.06) / 2.10));
    const surfaceVariation =
      1 +
      0.008 * Math.sin(angle * 7 + y * 8) +
      0.005 * Math.sin(angle * 13 - y * 5);

    x *= surfaceVariation;
    z *= surfaceVariation;
    bodyPositions.setXYZ(i, x, y, z);

    const mottle =
      0.5 +
      0.5 *
        Math.sin(angle * 5.2 + y * 7.4) *
        Math.sin(angle * 9.1 - y * 4.7);
    const broadBlush =
      0.5 +
      0.5 *
        Math.sin(angle * 2.3 - y * 3.1 + 0.8) *
        Math.sin(angle * 4.7 + y * 2.2);
    const fineSpeckle = 0.5 + 0.5 * Math.sin(angle * 18 + y * 23);

    vertexColor.copy(darkPurple).lerp(midPurple, 0.38 + t * 0.28);
    vertexColor.lerp(ripePurple, Math.max(0, mottle - 0.43) * 0.82);
    vertexColor.lerp(dustyPurple, broadBlush * 0.20 + fineSpeckle * 0.045);
    vertexColor.multiplyScalar(0.94 + 0.06 * Math.max(0, Math.sin(angle)));

    bodyColors[i * 3] = vertexColor.r;
    bodyColors[i * 3 + 1] = vertexColor.g;
    bodyColors[i * 3 + 2] = vertexColor.b;
  }

  bodyGeom.setAttribute(
    "color",
    new THREE.BufferAttribute(bodyColors, 3)
  );
  bodyGeom.computeVertexNormals();

  const body = new THREE.Mesh(bodyGeom, bodyMat);
  plum_group.add(body);

  const stem_socketGeom = new THREE.SphereGeometry(0.085, 18, 10);
  const stem_socket = new THREE.Mesh(stem_socketGeom, stemMat);
  stem_socket.position.set(0, 1.005, 0);
  stem_socket.scale.set(0.9, 0.55, 0.9);
  plum_group.add(stem_socket);

  const stemPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.00, 0.98, 0.00),
      new THREE.Vector3(0.035, 1.10, 0.005),
      new THREE.Vector3(0.105, 1.23, 0.015),
      new THREE.Vector3(0.19, 1.37, 0.03),
      new THREE.Vector3(0.28, 1.49, 0.05),
    ],
    false,
    "centripetal"
  );
  const stemGeom = new THREE.TubeGeometry(stemPath, 28, 0.047, 10, false);
  const stem = new THREE.Mesh(stemGeom, stemMat);
  plum_group.add(stem);

  const stemHighlightPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.015, 1.02, 0.043),
      new THREE.Vector3(0.055, 1.13, 0.048),
      new THREE.Vector3(0.125, 1.26, 0.058),
      new THREE.Vector3(0.21, 1.39, 0.073),
      new THREE.Vector3(0.285, 1.48, 0.082),
    ],
    false,
    "centripetal"
  );
  const stem_highlightGeom = new THREE.TubeGeometry(
    stemHighlightPath,
    22,
    0.007,
    6,
    false
  );
  const stem_highlight = new THREE.Mesh(
    stem_highlightGeom,
    stem_highlightMat
  );
  plum_group.add(stem_highlight);

  const stemEnd = new THREE.Vector3(0.28, 1.49, 0.05);
  const stemDirection = new THREE.Vector3(0.09, 0.12, 0.02).normalize();
  const cylinderAxis = new THREE.Vector3(0, 1, 0);
  const stemQuaternion = new THREE.Quaternion().setFromUnitVectors(
    cylinderAxis,
    stemDirection
  );

  const cut_endGeom = new THREE.CylinderGeometry(0.073, 0.058, 0.05, 12);
  const cut_end = new THREE.Mesh(cut_endGeom, cut_endMat);
  cut_end.quaternion.copy(stemQuaternion);
  cut_end.position.copy(stemEnd).addScaledVector(stemDirection, 0.025);
  plum_group.add(cut_end);

  const cut_faceGeom = new THREE.CylinderGeometry(0.064, 0.064, 0.012, 12);
  const cut_face = new THREE.Mesh(cut_faceGeom, cut_faceMat);
  cut_face.quaternion.copy(stemQuaternion);
  cut_face.position.copy(stemEnd).addScaledVector(stemDirection, 0.055);
  plum_group.add(cut_face);

  const cut_coreGeom = new THREE.CylinderGeometry(0.022, 0.026, 0.014, 9);
  const cut_core = new THREE.Mesh(cut_coreGeom, cut_coreMat);
  cut_core.quaternion.copy(stemQuaternion);
  cut_core.position.copy(stemEnd).addScaledVector(stemDirection, 0.064);
  plum_group.add(cut_core);

  const cut_rimGeom = new THREE.TorusGeometry(0.052, 0.009, 6, 12);
  const cut_rim = new THREE.Mesh(cut_rimGeom, cut_coreMat);
  cut_rim.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    stemDirection
  );
  cut_rim.position.copy(stemEnd).addScaledVector(stemDirection, 0.063);
  plum_group.add(cut_rim);

  const blossom_nubGeom = new THREE.CylinderGeometry(
    0.022,
    0.047,
    0.075,
    8
  );
  const blossom_nub = new THREE.Mesh(blossom_nubGeom, blossomMat);
  blossom_nub.position.set(0, -1.085, 0);
  blossom_nub.rotation.z = 0.08;
  plum_group.add(blossom_nub);

  const blossom_sepalsGeom = new THREE.ConeGeometry(0.018, 0.085, 5);
  const blossom_sepals = new THREE.InstancedMesh(
    blossom_sepalsGeom,
    blossomMat,
    5
  );
  const sepalMatrix = new THREE.Matrix4();
  const sepalPosition = new THREE.Vector3();
  const sepalQuaternion = new THREE.Quaternion();
  const sepalScale = new THREE.Vector3();
  const sepalDirection = new THREE.Vector3();
  const sepalBase = new THREE.Vector3(0, -1.105, 0);

  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    sepalDirection
      .set(Math.cos(angle) * 0.42, -0.91, Math.sin(angle) * 0.42)
      .normalize();
    sepalPosition
      .copy(sepalBase)
      .addScaledVector(sepalDirection, 0.042);
    sepalQuaternion.setFromUnitVectors(cylinderAxis, sepalDirection);
    sepalScale.set(1, 0.82 + (i % 2) * 0.18, 1);
    sepalMatrix.compose(sepalPosition, sepalQuaternion, sepalScale);
    blossom_sepals.setMatrixAt(i, sepalMatrix);
  }
  blossom_sepals.instanceMatrix.needsUpdate = true;
  plum_group.add(blossom_sepals);

  plum_group.rotation.set(0.08, -0.12, -0.62);

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