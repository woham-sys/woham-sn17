// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "silver_glitter_fedora";

  const brimMat = new THREE.MeshStandardMaterial({
    color: 0xb8b8b8,
    metalness: 0.25,
    roughness: 0.5,
  });
  const crownMat = brimMat;
  const hat_bandMat = new THREE.MeshStandardMaterial({
    color: 0x111116,
    metalness: 0.0,
    roughness: 0.95,
  });
  const band_weaveMat = new THREE.MeshStandardMaterial({
    color: 0x292930,
    metalness: 0.0,
    roughness: 0.95,
  });
  const bow_foldMat = new THREE.MeshStandardMaterial({
    color: 0x08080b,
    metalness: 0.0,
    roughness: 0.95,
  });
  const gold_broochMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.2,
  });
  const brooch_grooveMat = new THREE.MeshStandardMaterial({
    color: 0x96691f,
    metalness: 0.5,
    roughness: 0.25,
  });
  const glitter_silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const glitter_whiteMat = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    metalness: 0.35,
    roughness: 0.2,
  });
  const glitter_darkMat = new THREE.MeshStandardMaterial({
    color: 0x686868,
    metalness: 0.35,
    roughness: 0.45,
  });

  const brimProfile = [
    new THREE.Vector2(0.00, 0.060),
    new THREE.Vector2(0.45, 0.060),
    new THREE.Vector2(0.68, 0.055),
    new THREE.Vector2(0.84, 0.035),
    new THREE.Vector2(0.92, 0.015),
    new THREE.Vector2(0.95, 0.000),
    new THREE.Vector2(0.945, -0.025),
    new THREE.Vector2(0.90, -0.040),
    new THREE.Vector2(0.72, -0.035),
    new THREE.Vector2(0.45, -0.020),
    new THREE.Vector2(0.00, -0.015),
  ];
  const brimGeom = new THREE.LatheGeometry(brimProfile, 96);
  const brim = new THREE.Mesh(brimGeom, brimMat);
  brim.name = "brim";
  brim.scale.set(1.12, 1, 0.84);
  root.add(brim);

  const brim_edgeGeom = new THREE.TorusGeometry(0.94, 0.012, 8, 96);
  const brim_edge = new THREE.Mesh(brim_edgeGeom, brimMat);
  brim_edge.name = "brim_edge";
  brim_edge.rotation.x = Math.PI / 2;
  brim_edge.position.y = -0.004;
  brim_edge.scale.set(1.12, 0.84, 1);
  root.add(brim_edge);

  const crownProfile = [
    new THREE.Vector2(0.00, 0.045),
    new THREE.Vector2(0.54, 0.045),
    new THREE.Vector2(0.59, 0.080),
    new THREE.Vector2(0.61, 0.160),
    new THREE.Vector2(0.605, 0.300),
    new THREE.Vector2(0.585, 0.500),
    new THREE.Vector2(0.555, 0.680),
    new THREE.Vector2(0.515, 0.790),
    new THREE.Vector2(0.465, 0.850),
    new THREE.Vector2(0.380, 0.885),
    new THREE.Vector2(0.280, 0.895),
    new THREE.Vector2(0.180, 0.875),
    new THREE.Vector2(0.090, 0.845),
    new THREE.Vector2(0.00, 0.835),
  ];
  const crownGeom = new THREE.LatheGeometry(crownProfile, 96);
  const crownPositions = crownGeom.attributes.position;

  for (let i = 0; i < crownPositions.count; i++) {
    let x = crownPositions.getX(i);
    let y = crownPositions.getY(i);
    let z = crownPositions.getZ(i);
    const radius = Math.sqrt(x * x + z * z);

    if (radius > 0.0001) {
      const angle = Math.atan2(z, x);
      const front = Math.max(0, Math.cos(angle));
      const side = Math.abs(Math.sin(angle));
      const heightFactor = Math.max(0, Math.min(1, (y - 0.08) / 0.78));
      const topFactor = Math.max(0, Math.min(1, (y - 0.62) / 0.24));
      const pinch = 0.055 * side * side * (0.35 + 0.65 * heightFactor);
      const frontSoftening = 0.018 * front * side * side * heightFactor;
      const radialScale = 1 - pinch - frontSoftening;

      x *= radialScale;
      z *= radialScale;

      if (y > 0.79 && radius < 0.43) {
        const creaseX = x / 0.43;
        const centerCrease = Math.exp(-(creaseX * creaseX) / 0.045);
        const sideRidges =
          0.018 *
          Math.sin((creaseX + 0.55) * Math.PI * 2) *
          Math.exp(-(creaseX * creaseX) / 0.22);
        y -= 0.045 * centerCrease + sideRidges;
      }
    }

    crownPositions.setXYZ(i, x, y, z);
  }

  crownPositions.needsUpdate = true;
  crownGeom.computeVertexNormals();

  const crown = new THREE.Mesh(crownGeom, crownMat);
  crown.name = "crown";
  root.add(crown);

  const hat_bandGeom = new THREE.CylinderGeometry(
    0.603,
    0.612,
    0.255,
    96,
    1,
    true
  );
  const hat_band = new THREE.Mesh(hat_bandGeom, hat_bandMat);
  hat_band.name = "hat_band";
  hat_band.position.y = 0.245;
  root.add(hat_band);

  const band_top_edgeGeom = new THREE.TorusGeometry(0.603, 0.006, 6, 96);
  const band_top_edge = new THREE.Mesh(band_top_edgeGeom, hat_bandMat);
  band_top_edge.name = "band_top_edge";
  band_top_edge.rotation.x = Math.PI / 2;
  band_top_edge.position.y = 0.372;
  root.add(band_top_edge);

  const band_bottom_edgeGeom = new THREE.TorusGeometry(0.612, 0.006, 6, 96);
  const band_bottom_edge = new THREE.Mesh(band_bottom_edgeGeom, hat_bandMat);
  band_bottom_edge.name = "band_bottom_edge";
  band_bottom_edge.rotation.x = Math.PI / 2;
  band_bottom_edge.position.y = 0.118;
  root.add(band_bottom_edge);

  const band_weaveGeom = new THREE.TorusGeometry(0.608, 0.0015, 5, 96);
  const band_weave = new THREE.InstancedMesh(
    band_weaveGeom,
    band_weaveMat,
    7
  );
  band_weave.name = "band_weave";
  const weaveQuaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    Math.PI / 2
  );
  const weaveScale = new THREE.Vector3(1, 1, 1);
  const weaveMatrix = new THREE.Matrix4();

  for (let i = 0; i < 7; i++) {
    weaveMatrix.compose(
      new THREE.Vector3(0, 0.145 + i * 0.032, 0),
      weaveQuaternion,
      weaveScale
    );
    band_weave.setMatrixAt(i, weaveMatrix);
  }
  band_weave.instanceMatrix.needsUpdate = true;
  root.add(band_weave);

  const bow_group = new THREE.Group();
  bow_group.name = "bow_group";
  const bowAngle = 0.78;
  const bowNormal = new THREE.Vector3(
    Math.sin(bowAngle),
    0,
    Math.cos(bowAngle)
  );
  bow_group.position.set(
    bowNormal.x * 0.612,
    0.245,
    bowNormal.z * 0.612
  );
  bow_group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    bowNormal
  );
  root.add(bow_group);

  const bow_left_loopShape = new THREE.Shape();
  bow_left_loopShape.moveTo(-0.015, 0.085);
  bow_left_loopShape.lineTo(-0.270, 0.125);
  bow_left_loopShape.quadraticCurveTo(-0.330, 0.110, -0.335, 0.055);
  bow_left_loopShape.lineTo(-0.320, -0.085);
  bow_left_loopShape.quadraticCurveTo(-0.290, -0.115, -0.245, -0.105);
  bow_left_loopShape.lineTo(-0.015, -0.060);
  bow_left_loopShape.closePath();

  const bow_left_loopGeom = new THREE.ExtrudeGeometry(bow_left_loopShape, {
    depth: 0.026,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2,
  });
  const bow_left_loop = new THREE.Mesh(bow_left_loopGeom, hat_bandMat);
  bow_left_loop.name = "bow_left_loop";
  bow_left_loop.position.z = 0.006;
  bow_group.add(bow_left_loop);

  const bow_right_loopShape = new THREE.Shape();
  bow_right_loopShape.moveTo(0.015, 0.080);
  bow_right_loopShape.lineTo(0.245, 0.110);
  bow_right_loopShape.quadraticCurveTo(0.300, 0.095, 0.305, 0.045);
  bow_right_loopShape.lineTo(0.285, -0.075);
  bow_right_loopShape.quadraticCurveTo(0.260, -0.100, 0.220, -0.090);
  bow_right_loopShape.lineTo(0.015, -0.055);
  bow_right_loopShape.closePath();

  const bow_right_loopGeom = new THREE.ExtrudeGeometry(bow_right_loopShape, {
    depth: 0.026,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2,
  });
  const bow_right_loop = new THREE.Mesh(bow_right_loopGeom, hat_bandMat);
  bow_right_loop.name = "bow_right_loop";
  bow_right_loop.position.z = 0.006;
  bow_group.add(bow_right_loop);

  const bow_knotGeom = new THREE.BoxGeometry(0.085, 0.205, 0.045);
  const bow_knot = new THREE.Mesh(bow_knotGeom, hat_bandMat);
  bow_knot.name = "bow_knot";
  bow_knot.position.z = 0.040;
  bow_group.add(bow_knot);

  const bow_left_foldGeom = new THREE.BoxGeometry(0.014, 0.145, 0.008);
  const bow_left_fold = new THREE.Mesh(bow_left_foldGeom, bow_foldMat);
  bow_left_fold.name = "bow_left_fold";
  bow_left_fold.position.set(-0.145, 0.005, 0.043);
  bow_left_fold.rotation.z = -0.16;
  bow_group.add(bow_left_fold);

  const bow_right_foldGeom = new THREE.BoxGeometry(0.013, 0.125, 0.008);
  const bow_right_fold = new THREE.Mesh(bow_right_foldGeom, bow_foldMat);
  bow_right_fold.name = "bow_right_fold";
  bow_right_fold.position.set(0.145, 0.005, 0.043);
  bow_right_fold.rotation.z = 0.18;
  bow_group.add(bow_right_fold);

  const gold_brooch_backingGeom = new THREE.CylinderGeometry(
    0.092,
    0.092,
    0.026,
    48
  );
  const gold_brooch_backing = new THREE.Mesh(
    gold_brooch_backingGeom,
    gold_broochMat
  );
  gold_brooch_backing.name = "gold_brooch_backing";
  gold_brooch_backing.rotation.x = Math.PI / 2;
  gold_brooch_backing.position.z = 0.066;
  bow_group.add(gold_brooch_backing);

  const gold_brooch_rimGeom = new THREE.TorusGeometry(
    0.078,
    0.009,
    8,
    48
  );
  const gold_brooch_rim = new THREE.Mesh(
    gold_brooch_rimGeom,
    gold_broochMat
  );
  gold_brooch_rim.name = "gold_brooch_rim";
  gold_brooch_rim.position.z = 0.083;
  bow_group.add(gold_brooch_rim);

  const gold_brooch_petalGeom = new THREE.SphereGeometry(1, 12, 8);
  const gold_brooch_petals = new THREE.InstancedMesh(
    gold_brooch_petalGeom,
    gold_broochMat,
    16
  );
  gold_brooch_petals.name = "gold_brooch_petals";
  const petalMatrix = new THREE.Matrix4();
  const petalPosition = new THREE.Vector3();
  const petalQuaternion = new THREE.Quaternion();
  const petalScale = new THREE.Vector3();
  const petalAxis = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    petalPosition.set(
      Math.cos(angle) * 0.043,
      Math.sin(angle) * 0.043,
      0.087
    );
    petalQuaternion.setFromAxisAngle(petalAxis, angle - Math.PI / 2);
    petalScale.set(0.012, 0.041, 0.008);
    petalMatrix.compose(petalPosition, petalQuaternion, petalScale);
    gold_brooch_petals.setMatrixAt(i, petalMatrix);
  }
  gold_brooch_petals.instanceMatrix.needsUpdate = true;
  bow_group.add(gold_brooch_petals);

  const gold_brooch_grooveGeom = new THREE.BoxGeometry(
    0.004,
    0.052,
    0.004
  );
  const gold_brooch_grooves = new THREE.InstancedMesh(
    gold_brooch_grooveGeom,
    brooch_grooveMat,
    16
  );
  gold_brooch_grooves.name = "gold_brooch_grooves";
  const grooveMatrix = new THREE.Matrix4();
  const groovePosition = new THREE.Vector3();
  const grooveQuaternion = new THREE.Quaternion();
  const grooveScale = new THREE.Vector3(1, 1, 1);

  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    groovePosition.set(
      Math.cos(angle) * 0.044,
      Math.sin(angle) * 0.044,
      0.097
    );
    grooveQuaternion.setFromAxisAngle(petalAxis, angle - Math.PI / 2);
    grooveMatrix.compose(groovePosition, grooveQuaternion, grooveScale);
    gold_brooch_grooves.setMatrixAt(i, grooveMatrix);
  }
  gold_brooch_grooves.instanceMatrix.needsUpdate = true;
  bow_group.add(gold_brooch_grooves);

  const gold_brooch_centerGeom = new THREE.SphereGeometry(0.027, 20, 12);
  const gold_brooch_center = new THREE.Mesh(
    gold_brooch_centerGeom,
    gold_broochMat
  );
  gold_brooch_center.name = "gold_brooch_center";
  gold_brooch_center.position.z = 0.100;
  gold_brooch_center.scale.set(1, 1, 0.55);
  bow_group.add(gold_brooch_center);

  const glitterGeom = new THREE.SphereGeometry(1, 6, 4);

  function createGlitter(count, material, phase, sizeMultiplier) {
    const mesh = new THREE.InstancedMesh(glitterGeom, material, count);
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      const u = ((i * 73 + phase * 19) % 257) / 256;
      const v = ((i * 47 + phase * 31) % 251) / 250;
      const w = ((i * 29 + phase * 11) % 239) / 238;
      const area = i % 10;

      if (area < 4) {
        const angle = u * Math.PI * 2;
        const radius = 0.625 + v * 0.310;
        position.set(
          Math.cos(angle) * radius * 1.12,
          0.064 - Math.max(0, radius - 0.68) * 0.075,
          Math.sin(angle) * radius * 0.84
        );
      } else if (area < 9) {
        const angle = u * Math.PI * 2;
        const y = 0.145 + v * 0.690;
        const radius = crownRadiusAt(y);
        position.set(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        );
      } else {
        const angle = u * Math.PI * 2;
        const y = 0.135 + v * 0.245;
        position.set(
          Math.cos(angle) * 0.616,
          y,
          Math.sin(angle) * 0.616
        );
      }

      const size =
        (0.0035 + w * 0.0065) *
        sizeMultiplier *
        (i % 23 === 0 ? 1.65 : 1);

      scale.set(size, size, size);
      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(i, matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  function crownRadiusAt(y) {
    if (y < 0.16) return 0.595;
    if (y < 0.30) return 0.610 - (y - 0.16) * 0.035;
    if (y < 0.50) return 0.605 - (y - 0.30) * 0.10;
    if (y < 0.68) return 0.585 - (y - 0.50) * 0.167;
    if (y < 0.79) return 0.555 - (y - 0.68) * 0.364;
    return 0.515 - (y - 0.79) * 0.70;
  }

  const glitter_silver = createGlitter(
    1100,
    glitter_silverMat,
    1,
    1.0
  );
  glitter_silver.name = "glitter_silver";
  root.add(glitter_silver);

  const glitter_white = createGlitter(
    700,
    glitter_whiteMat,
    2,
    1.12
  );
  glitter_white.name = "glitter_white";
  root.add(glitter_white);

  const glitter_dark = createGlitter(
    450,
    glitter_darkMat,
    3,
    0.82
  );
  glitter_dark.name = "glitter_dark";
  root.add(glitter_dark);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}