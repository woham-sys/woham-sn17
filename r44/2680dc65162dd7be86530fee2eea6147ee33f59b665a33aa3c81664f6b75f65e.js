// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "double_handled_chisel";

  const brushed_metal_mat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const silver_mat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const wood_mat = new THREE.MeshStandardMaterial({
    color: 0x765f4d,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wood_grain_mat = new THREE.MeshStandardMaterial({
    color: 0x49382f,
    metalness: 0.0,
    roughness: 0.9,
  });
  const engraving_mat = new THREE.MeshStandardMaterial({
    color: 0x292929,
    metalness: 0.0,
    roughness: 0.7,
  });

  function makeExtrudedGeometry(shape, depth, bevelSize, bevelThickness) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize,
      bevelThickness,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function makeCylinderBetween(start, end, radius, material, segments) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      length,
      segments
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return mesh;
  }

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-0.13, 0.10);
  bladeShape.lineTo(0.13, 0.10);
  bladeShape.lineTo(0.13, 0.29);
  bladeShape.lineTo(0.22, 0.40);
  bladeShape.lineTo(0.22, 1.64);
  bladeShape.lineTo(-0.22, 1.64);
  bladeShape.lineTo(-0.22, 0.40);
  bladeShape.lineTo(-0.13, 0.29);
  bladeShape.closePath();

  const bladeGeom = makeExtrudedGeometry(bladeShape, 0.055, 0.008, 0.008);
  const blade = new THREE.Mesh(bladeGeom, brushed_metal_mat);
  blade.name = "blade";
  root.add(blade);

  const blade_faceShape = new THREE.Shape();
  blade_faceShape.moveTo(-0.105, 0.31);
  blade_faceShape.lineTo(0.105, 0.31);
  blade_faceShape.lineTo(0.195, 0.42);
  blade_faceShape.lineTo(0.195, 1.595);
  blade_faceShape.lineTo(-0.195, 1.595);
  blade_faceShape.lineTo(-0.195, 0.42);
  blade_faceShape.closePath();

  const blade_faceGeom = new THREE.ShapeGeometry(blade_faceShape);
  const blade_face = new THREE.Mesh(blade_faceGeom, silver_mat);
  blade_face.name = "blade_face";
  blade_face.position.z = 0.038;
  root.add(blade_face);

  const cutting_edgeGeom = new THREE.BoxGeometry(0.45, 0.028, 0.075);
  const cutting_edge = new THREE.Mesh(cutting_edgeGeom, silver_mat);
  cutting_edge.name = "cutting_edge";
  cutting_edge.position.set(0, 1.645, 0);
  root.add(cutting_edge);

  const center_shankShape = new THREE.Shape();
  center_shankShape.moveTo(-0.18, 0.43);
  center_shankShape.lineTo(0.18, 0.43);
  center_shankShape.bezierCurveTo(0.15, 0.34, 0.08, 0.27, 0.075, 0.17);
  center_shankShape.lineTo(0.075, -0.07);
  center_shankShape.lineTo(-0.075, -0.07);
  center_shankShape.lineTo(-0.075, 0.17);
  center_shankShape.bezierCurveTo(-0.08, 0.27, -0.15, 0.34, -0.18, 0.43);
  center_shankShape.closePath();

  const center_shankGeom = makeExtrudedGeometry(
    center_shankShape,
    0.075,
    0.008,
    0.008
  );
  const center_shank = new THREE.Mesh(center_shankGeom, silver_mat);
  center_shank.name = "center_shank";
  center_shank.position.z = 0.006;
  root.add(center_shank);

  const right_shankPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.10, 0.37, 0.005),
      new THREE.Vector3(0.18, 0.31, 0.005),
      new THREE.Vector3(0.27, 0.23, 0.005),
      new THREE.Vector3(0.36, 0.14, 0.005),
    ],
    false,
    "centripetal"
  );
  const right_shankGeom = new THREE.TubeGeometry(
    right_shankPath,
    24,
    0.058,
    12,
    false
  );
  const right_shank = new THREE.Mesh(right_shankGeom, silver_mat);
  right_shank.name = "right_shank";
  root.add(right_shank);

  const right_shank_collar = makeCylinderBetween(
    new THREE.Vector3(0.345, 0.155, 0.005),
    new THREE.Vector3(0.405, 0.095, 0.005),
    0.073,
    silver_mat,
    20
  );
  right_shank_collar.name = "right_shank_collar";
  root.add(right_shank_collar);

  const center_ferruleGeom = new THREE.CylinderGeometry(
    0.108,
    0.122,
    0.13,
    28
  );
  const center_ferrule = new THREE.Mesh(center_ferruleGeom, silver_mat);
  center_ferrule.name = "center_ferrule";
  center_ferrule.position.set(0, -0.105, 0);
  root.add(center_ferrule);

  const center_handleProfile = [
    new THREE.Vector2(0.000, -1.075),
    new THREE.Vector2(0.070, -1.068),
    new THREE.Vector2(0.125, -1.025),
    new THREE.Vector2(0.145, -0.940),
    new THREE.Vector2(0.142, -0.720),
    new THREE.Vector2(0.136, -0.420),
    new THREE.Vector2(0.128, -0.140),
    new THREE.Vector2(0.118, 0.000),
    new THREE.Vector2(0.000, 0.000),
  ];
  const center_handleGeom = new THREE.LatheGeometry(
    center_handleProfile,
    36
  );
  const center_handle = new THREE.Mesh(center_handleGeom, wood_mat);
  center_handle.name = "center_handle";
  center_handle.position.set(0, -0.16, 0);
  root.add(center_handle);

  const center_end_capGeom = new THREE.SphereGeometry(0.122, 28, 14);
  const center_end_cap = new THREE.Mesh(center_end_capGeom, silver_mat);
  center_end_cap.name = "center_end_cap";
  center_end_cap.position.set(0, -1.235, 0);
  center_end_cap.scale.set(1, 0.48, 1);
  root.add(center_end_cap);

  const rightHandleStart = new THREE.Vector3(0.39, 0.11, 0.005);
  const rightHandleEnd = new THREE.Vector3(0.82, -0.50, 0.005);
  const rightHandleDirection = new THREE.Vector3()
    .subVectors(rightHandleEnd, rightHandleStart)
    .normalize();
  const rightHandleLength = rightHandleStart.distanceTo(rightHandleEnd);

  const right_handle_group = new THREE.Group();
  right_handle_group.name = "right_handle_group";
  right_handle_group.position
    .copy(rightHandleStart)
    .add(rightHandleEnd)
    .multiplyScalar(0.5);
  right_handle_group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    rightHandleDirection
  );
  root.add(right_handle_group);

  const right_handleProfile = [
    new THREE.Vector2(0.000, -rightHandleLength / 2),
    new THREE.Vector2(0.075, -rightHandleLength / 2 + 0.012),
    new THREE.Vector2(0.115, -rightHandleLength / 2 + 0.055),
    new THREE.Vector2(0.132, -rightHandleLength / 2 + 0.135),
    new THREE.Vector2(0.128, 0.020),
    new THREE.Vector2(0.112, rightHandleLength / 2 - 0.100),
    new THREE.Vector2(0.095, rightHandleLength / 2),
    new THREE.Vector2(0.000, rightHandleLength / 2),
  ];
  const right_handleGeom = new THREE.LatheGeometry(
    right_handleProfile,
    36
  );
  const right_handle = new THREE.Mesh(right_handleGeom, wood_mat);
  right_handle.name = "right_handle";
  right_handle_group.add(right_handle);

  const right_end_capGeom = new THREE.SphereGeometry(0.098, 28, 14);
  const right_end_cap = new THREE.Mesh(right_end_capGeom, silver_mat);
  right_end_cap.name = "right_end_cap";
  right_end_cap.position.y = -rightHandleLength / 2;
  right_end_cap.scale.set(1, 0.48, 1);
  right_handle_group.add(right_end_cap);

  const center_handle_grainGeom = new THREE.CylinderGeometry(
    0.0022,
    0.0022,
    0.10,
    6
  );
  const center_handle_grain = new THREE.InstancedMesh(
    center_handle_grainGeom,
    wood_grain_mat,
    22
  );
  center_handle_grain.name = "center_handle_grain";

  const grainMatrix = new THREE.Matrix4();
  const grainQuaternion = new THREE.Quaternion();
  const grainPosition = new THREE.Vector3();
  const grainScale = new THREE.Vector3();

  for (let i = 0; i < 22; i++) {
    const angle = i * 2.3999632297;
    const radius = 0.139;
    const y = -1.105 + (i % 11) * 0.096;
    grainPosition.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    grainQuaternion.setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      ((i % 5) - 2) * 0.025
    );
    grainScale.set(1, 0.55 + (i % 4) * 0.18, 1);
    grainMatrix.compose(grainPosition, grainQuaternion, grainScale);
    center_handle_grain.setMatrixAt(i, grainMatrix);
  }
  center_handle_grain.instanceMatrix.needsUpdate = true;
  root.add(center_handle_grain);

  const right_handle_grainGeom = new THREE.CylinderGeometry(
    0.0018,
    0.0018,
    0.075,
    6
  );
  const right_handle_grain = new THREE.InstancedMesh(
    right_handle_grainGeom,
    wood_grain_mat,
    14
  );
  right_handle_grain.name = "right_handle_grain";

  for (let i = 0; i < 14; i++) {
    const angle = i * 2.3999632297 + 0.45;
    const radius = 0.126;
    const y = -0.205 + (i % 7) * 0.064;
    grainPosition.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    grainQuaternion.setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      ((i % 5) - 2) * 0.022
    );
    grainScale.set(1, 0.55 + (i % 3) * 0.22, 1);
    grainMatrix.compose(grainPosition, grainQuaternion, grainScale);
    right_handle_grain.setMatrixAt(i, grainMatrix);
  }
  right_handle_grain.instanceMatrix.needsUpdate = true;
  right_handle_group.add(right_handle_grain);

  const maker_mark_ringGeom = new THREE.TorusGeometry(
    0.018,
    0.0022,
    6,
    18
  );
  const maker_mark_ring = new THREE.Mesh(
    maker_mark_ringGeom,
    engraving_mat
  );
  maker_mark_ring.name = "maker_mark_ring";
  maker_mark_ring.position.set(-0.035, 0.455, 0.043);
  root.add(maker_mark_ring);

  const maker_mark_stemGeom = new THREE.BoxGeometry(
    0.004,
    0.035,
    0.004
  );
  const maker_mark_stem = new THREE.Mesh(
    maker_mark_stemGeom,
    engraving_mat
  );
  maker_mark_stem.name = "maker_mark_stem";
  maker_mark_stem.position.set(-0.035, 0.455, 0.044);
  root.add(maker_mark_stem);

  const maker_mark_textGeom = new THREE.BoxGeometry(
    0.030,
    0.004,
    0.004
  );
  const maker_mark_text = new THREE.InstancedMesh(
    maker_mark_textGeom,
    engraving_mat,
    3
  );
  maker_mark_text.name = "maker_mark_text";

  const textScales = [1.0, 0.72, 0.88];
  for (let i = 0; i < 3; i++) {
    grainPosition.set(0.025, 0.468 - i * 0.012, 0.044);
    grainQuaternion.identity();
    grainScale.set(textScales[i], 1, 1);
    grainMatrix.compose(grainPosition, grainQuaternion, grainScale);
    maker_mark_text.setMatrixAt(i, grainMatrix);
  }
  maker_mark_text.instanceMatrix.needsUpdate = true;
  root.add(maker_mark_text);

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