// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "bottle_with_cork";

  const bottle_group = new THREE.Group();
  bottle_group.name = "bottle_group";
  root.add(bottle_group);

  const label_group = new THREE.Group();
  label_group.name = "label_group";
  bottle_group.add(label_group);

  const cork_group = new THREE.Group();
  cork_group.name = "cork_group";
  bottle_group.add(cork_group);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde8e5,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xdceaf2,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });

  const cloud_outlineMat = new THREE.MeshStandardMaterial({
    color: 0x3f7193,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });

  const cloud_fillMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1e9,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });

  const cloud_shadowMat = new THREE.MeshStandardMaterial({
    color: 0xa9c8d8,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const cork_stopperMat = new THREE.MeshStandardMaterial({
    color: 0xc99055,
    metalness: 0.0,
    roughness: 0.9
  });

  const cork_topMat = new THREE.MeshStandardMaterial({
    color: 0xd3a064,
    metalness: 0.0,
    roughness: 0.9
  });

  const cork_poreMat = new THREE.MeshStandardMaterial({
    color: 0x704326,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });

  const glass_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.22,
    depthWrite: false
  });

  const bottle_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.48, 0.00),
    new THREE.Vector2(0.56, 0.025),
    new THREE.Vector2(0.61, 0.08),
    new THREE.Vector2(0.635, 0.18),
    new THREE.Vector2(0.64, 0.34),
    new THREE.Vector2(0.64, 1.95),
    new THREE.Vector2(0.63, 2.08),
    new THREE.Vector2(0.59, 2.20),
    new THREE.Vector2(0.53, 2.34),
    new THREE.Vector2(0.45, 2.47),
    new THREE.Vector2(0.36, 2.58),
    new THREE.Vector2(0.30, 2.66),
    new THREE.Vector2(0.285, 2.76),
    new THREE.Vector2(0.285, 3.08),
    new THREE.Vector2(0.34, 3.095),
    new THREE.Vector2(0.375, 3.14),
    new THREE.Vector2(0.375, 3.23),
    new THREE.Vector2(0.34, 3.285),
    new THREE.Vector2(0.285, 3.30),
    new THREE.Vector2(0.255, 3.275),
    new THREE.Vector2(0.255, 2.78),
    new THREE.Vector2(0.27, 2.70),
    new THREE.Vector2(0.33, 2.61),
    new THREE.Vector2(0.42, 2.50),
    new THREE.Vector2(0.50, 2.37),
    new THREE.Vector2(0.56, 2.22),
    new THREE.Vector2(0.595, 2.07),
    new THREE.Vector2(0.60, 1.95),
    new THREE.Vector2(0.60, 0.34),
    new THREE.Vector2(0.585, 0.23),
    new THREE.Vector2(0.54, 0.16),
    new THREE.Vector2(0.46, 0.13),
    new THREE.Vector2(0.00, 0.13)
  ];
  const bottle_bodyGeom = new THREE.LatheGeometry(bottle_bodyProfile, 64);
  const bottle_body = new THREE.Mesh(bottle_bodyGeom, glassMat);
  bottle_body.name = "bottle_body";
  bottle_group.add(bottle_body);

  const bottom_glass_ringGeom = new THREE.TorusGeometry(0.535, 0.026, 10, 64);
  const bottom_glass_ring = new THREE.Mesh(bottom_glass_ringGeom, glassMat);
  bottom_glass_ring.name = "bottom_glass_ring";
  bottom_glass_ring.rotation.x = Math.PI / 2;
  bottom_glass_ring.position.y = 0.075;
  bottle_group.add(bottom_glass_ring);

  const neck_lipGeom = new THREE.TorusGeometry(0.335, 0.045, 12, 64);
  const neck_lip = new THREE.Mesh(neck_lipGeom, glassMat);
  neck_lip.name = "neck_lip";
  neck_lip.rotation.x = Math.PI / 2;
  neck_lip.position.y = 3.18;
  bottle_group.add(neck_lip);

  const neck_inner_ringGeom = new THREE.TorusGeometry(0.267, 0.012, 8, 48);
  const neck_inner_ring = new THREE.Mesh(neck_inner_ringGeom, glassMat);
  neck_inner_ring.name = "neck_inner_ring";
  neck_inner_ring.rotation.x = Math.PI / 2;
  neck_inner_ring.position.y = 3.275;
  bottle_group.add(neck_inner_ring);

  const labelRadius = 0.648;
  const labelHeight = 1.64;
  const labelCenterY = 1.27;
  const labelGeom = new THREE.CylinderGeometry(
    labelRadius,
    labelRadius,
    labelHeight,
    64,
    1,
    true
  );
  const label = new THREE.Mesh(labelGeom, labelMat);
  label.name = "label";
  label.position.y = labelCenterY;
  label_group.add(label);

  function makeCurvedShapeGeometry(shape, radius, yOffset, offset) {
    const geometry = new THREE.ShapeGeometry(shape, 24);
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i) + yOffset;
      const radial = Math.sqrt(Math.max(0, radius * radius - x * x));
      positions.setXYZ(i, x, y, radial + offset);
    }
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const cloud_outlineShape = new THREE.Shape();
  cloud_outlineShape.moveTo(-0.44, -0.18);
  cloud_outlineShape.bezierCurveTo(-0.53, -0.12, -0.53, 0.00, -0.46, 0.08);
  cloud_outlineShape.bezierCurveTo(-0.53, 0.16, -0.48, 0.30, -0.37, 0.33);
  cloud_outlineShape.bezierCurveTo(-0.39, 0.47, -0.24, 0.58, -0.08, 0.54);
  cloud_outlineShape.bezierCurveTo(0.02, 0.66, 0.22, 0.67, 0.31, 0.54);
  cloud_outlineShape.bezierCurveTo(0.45, 0.60, 0.55, 0.48, 0.49, 0.36);
  cloud_outlineShape.bezierCurveTo(0.61, 0.31, 0.60, 0.16, 0.49, 0.08);
  cloud_outlineShape.bezierCurveTo(0.56, -0.03, 0.48, -0.14, 0.36, -0.14);
  cloud_outlineShape.bezierCurveTo(0.29, -0.27, 0.12, -0.28, 0.04, -0.18);
  cloud_outlineShape.bezierCurveTo(-0.07, -0.30, -0.24, -0.29, -0.30, -0.18);
  cloud_outlineShape.bezierCurveTo(-0.36, -0.25, -0.43, -0.25, -0.44, -0.18);
  cloud_outlineShape.closePath();

  const cloud_outlineGeom = makeCurvedShapeGeometry(
    cloud_outlineShape,
    labelRadius,
    labelCenterY,
    0.007
  );
  const cloud_outline = new THREE.Mesh(cloud_outlineGeom, cloud_outlineMat);
  cloud_outline.name = "cloud_outline";
  label_group.add(cloud_outline);

  const cloud_fillShape = new THREE.Shape();
  cloud_fillShape.moveTo(-0.405, -0.165);
  cloud_fillShape.bezierCurveTo(-0.485, -0.105, -0.485, 0.005, -0.42, 0.075);
  cloud_fillShape.bezierCurveTo(-0.485, 0.16, -0.44, 0.285, -0.34, 0.31);
  cloud_fillShape.bezierCurveTo(-0.35, 0.44, -0.22, 0.54, -0.07, 0.51);
  cloud_fillShape.bezierCurveTo(0.035, 0.62, 0.205, 0.625, 0.29, 0.505);
  cloud_fillShape.bezierCurveTo(0.415, 0.56, 0.505, 0.455, 0.455, 0.35);
  cloud_fillShape.bezierCurveTo(0.565, 0.30, 0.555, 0.17, 0.455, 0.10);
  cloud_fillShape.bezierCurveTo(0.52, -0.005, 0.45, -0.11, 0.345, -0.115);
  cloud_fillShape.bezierCurveTo(0.275, -0.235, 0.115, -0.245, 0.035, -0.15);
  cloud_fillShape.bezierCurveTo(-0.075, -0.265, -0.225, -0.255, -0.285, -0.16);
  cloud_fillShape.bezierCurveTo(-0.34, -0.225, -0.39, -0.225, -0.405, -0.165);
  cloud_fillShape.closePath();

  const cloud_fillGeom = makeCurvedShapeGeometry(
    cloud_fillShape,
    labelRadius,
    labelCenterY,
    0.011
  );
  const cloud_fill = new THREE.Mesh(cloud_fillGeom, cloud_fillMat);
  cloud_fill.name = "cloud_fill";
  label_group.add(cloud_fill);

  const cloud_shadowShape = new THREE.Shape();
  cloud_shadowShape.moveTo(-0.34, -0.10);
  cloud_shadowShape.bezierCurveTo(-0.30, -0.20, -0.17, -0.22, -0.08, -0.14);
  cloud_shadowShape.bezierCurveTo(0.00, -0.22, 0.14, -0.22, 0.20, -0.12);
  cloud_shadowShape.bezierCurveTo(0.30, -0.15, 0.39, -0.08, 0.37, 0.02);
  cloud_shadowShape.bezierCurveTo(0.45, 0.08, 0.43, 0.18, 0.34, 0.20);
  cloud_shadowShape.bezierCurveTo(0.28, 0.15, 0.20, 0.17, 0.16, 0.24);
  cloud_shadowShape.bezierCurveTo(0.08, 0.20, 0.02, 0.25, -0.02, 0.31);
  cloud_shadowShape.bezierCurveTo(-0.12, 0.27, -0.18, 0.31, -0.23, 0.24);
  cloud_shadowShape.bezierCurveTo(-0.31, 0.18, -0.37, 0.08, -0.34, -0.10);
  cloud_shadowShape.closePath();

  const cloud_shadowGeom = makeCurvedShapeGeometry(
    cloud_shadowShape,
    labelRadius,
    labelCenterY,
    0.015
  );
  const cloud_shadow = new THREE.Mesh(cloud_shadowGeom, cloud_shadowMat);
  cloud_shadow.name = "cloud_shadow";
  label_group.add(cloud_shadow);

  const droplet_outlineGeom = new THREE.RingGeometry(0.012, 0.022, 16);
  const droplet_fillGeom = new THREE.CircleGeometry(0.011, 16);

  function placeDroplet(mesh, x, y, offset) {
    const radial = Math.sqrt(Math.max(0, labelRadius * labelRadius - x * x));
    const normal = new THREE.Vector3(x / labelRadius, 0, radial / labelRadius).normalize();
    mesh.position.set(x, labelCenterY + y, radial + offset);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  }

  const large_droplet_outline = new THREE.Mesh(droplet_outlineGeom, cloud_outlineMat);
  large_droplet_outline.name = "large_droplet_outline";
  placeDroplet(large_droplet_outline, -0.585, 0.055, 0.008);
  label_group.add(large_droplet_outline);

  const large_droplet_fill = new THREE.Mesh(droplet_fillGeom, cloud_fillMat);
  large_droplet_fill.name = "large_droplet_fill";
  placeDroplet(large_droplet_fill, -0.585, 0.055, 0.012);
  label_group.add(large_droplet_fill);

  const upper_droplet_outline = new THREE.Mesh(droplet_outlineGeom, cloud_outlineMat);
  upper_droplet_outline.name = "upper_droplet_outline";
  upper_droplet_outline.scale.setScalar(0.72);
  placeDroplet(upper_droplet_outline, -0.55, 0.255, 0.008);
  label_group.add(upper_droplet_outline);

  const upper_droplet_fill = new THREE.Mesh(droplet_fillGeom, cloud_fillMat);
  upper_droplet_fill.name = "upper_droplet_fill";
  upper_droplet_fill.scale.setScalar(0.72);
  placeDroplet(upper_droplet_fill, -0.55, 0.255, 0.012);
  label_group.add(upper_droplet_fill);

  const corkBottomY = 3.02;
  const corkTopY = 3.72;
  const corkHeight = corkTopY - corkBottomY;
  const corkBottomRadius = 0.255;
  const corkTopRadius = 0.315;

  const cork_stopperGeom = new THREE.CylinderGeometry(
    corkTopRadius,
    corkBottomRadius,
    corkHeight,
    48,
    2
  );
  const cork_stopper = new THREE.Mesh(cork_stopperGeom, cork_stopperMat);
  cork_stopper.name = "cork_stopper";
  cork_stopper.position.y = (corkBottomY + corkTopY) / 2;
  cork_group.add(cork_stopper);

  const cork_topGeom = new THREE.CylinderGeometry(0.315, 0.315, 0.018, 48);
  const cork_top = new THREE.Mesh(cork_topGeom, cork_topMat);
  cork_top.name = "cork_top";
  cork_top.position.y = corkTopY + 0.004;
  cork_group.add(cork_top);

  const cork_poreGeom = new THREE.CircleGeometry(1, 10);
  const corkPoreCount = 54;
  const cork_pores = new THREE.InstancedMesh(
    cork_poreGeom,
    cork_poreMat,
    corkPoreCount
  );
  cork_pores.name = "cork_pores";

  const poreMatrix = new THREE.Matrix4();
  const porePosition = new THREE.Vector3();
  const poreQuaternion = new THREE.Quaternion();
  const poreScale = new THREE.Vector3();
  const poreNormal = new THREE.Vector3();
  const poreForward = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < corkPoreCount; i++) {
    const angle = i * 2.399963229728653;
    const fraction = ((i * 19) % 53) / 52;
    const y = corkBottomY + 0.035 + fraction * (corkHeight - 0.07);
    const radius = corkBottomRadius +
      (corkTopRadius - corkBottomRadius) *
      ((y - corkBottomY) / corkHeight) +
      0.002;

    poreNormal.set(Math.cos(angle), 0, Math.sin(angle)).normalize();
    porePosition.set(
      poreNormal.x * radius,
      y,
      poreNormal.z * radius
    );
    poreQuaternion.setFromUnitVectors(poreForward, poreNormal);
    poreScale.set(
      0.012 + ((i * 7) % 6) * 0.003,
      0.008 + ((i * 11) % 5) * 0.003,
      1
    );
    poreMatrix.compose(porePosition, poreQuaternion, poreScale);
    cork_pores.setMatrixAt(i, poreMatrix);
  }
  cork_pores.instanceMatrix.needsUpdate = true;
  cork_group.add(cork_pores);

  const cork_top_poreGeom = new THREE.CircleGeometry(1, 10);
  const corkTopPoreCount = 18;
  const cork_top_pores = new THREE.InstancedMesh(
    cork_top_poreGeom,
    cork_poreMat,
    corkTopPoreCount
  );
  cork_top_pores.name = "cork_top_pores";

  const topPoreQuaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 1, 0)
  );

  for (let i = 0; i < corkTopPoreCount; i++) {
    const angle = i * 2.399963229728653;
    const radialFraction = ((i * 13) % 17) / 16;
    const radius = 0.035 + radialFraction * 0.245;
    porePosition.set(
      Math.cos(angle) * radius,
      corkTopY + 0.014,
      Math.sin(angle) * radius
    );
    poreScale.set(
      0.010 + ((i * 5) % 5) * 0.003,
      0.008 + ((i * 7) % 4) * 0.003,
      1
    );
    poreMatrix.compose(porePosition, topPoreQuaternion, poreScale);
    cork_top_pores.setMatrixAt(i, poreMatrix);
  }
  cork_top_pores.instanceMatrix.needsUpdate = true;
  cork_group.add(cork_top_pores);

  function bottleRadiusAt(y) {
    if (y <= 2.05) return 0.64;
    if (y <= 2.20) return 0.64 - (y - 2.05) / 0.15 * 0.05;
    if (y <= 2.47) return 0.59 - (y - 2.20) / 0.27 * 0.14;
    if (y <= 2.66) return 0.45 - (y - 2.47) / 0.19 * 0.15;
    return 0.285;
  }

  function makeSurfacePath(angle, yStart, yEnd, count, offset) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const y = yStart + (yEnd - yStart) * t;
      const radius = bottleRadiusAt(y) + offset;
      points.push(new THREE.Vector3(
        Math.sin(angle) * radius,
        y,
        Math.cos(angle) * radius
      ));
    }
    return points;
  }

  const left_glass_highlightPath = makeSurfacePath(-0.72, 0.28, 2.62, 12, 0.008);
  const left_glass_highlightGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(left_glass_highlightPath),
    32,
    0.012,
    6,
    false
  );
  const left_glass_highlight = new THREE.Mesh(
    left_glass_highlightGeom,
    glass_highlightMat
  );
  left_glass_highlight.name = "left_glass_highlight";
  bottle_group.add(left_glass_highlight);

  const right_glass_highlightPath = makeSurfacePath(0.78, 0.35, 2.12, 9, 0.008);
  const right_glass_highlightGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(right_glass_highlightPath),
    24,
    0.009,
    6,
    false
  );
  const right_glass_highlight = new THREE.Mesh(
    right_glass_highlightGeom,
    glass_highlightMat
  );
  right_glass_highlight.name = "right_glass_highlight";
  bottle_group.add(right_glass_highlight);

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