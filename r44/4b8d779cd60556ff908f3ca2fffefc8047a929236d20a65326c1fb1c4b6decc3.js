// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "square_velvet_lounge";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  root.add(base_group);

  const frame_group = new THREE.Group();
  frame_group.name = "frame_group";
  root.add(frame_group);

  const center_group = new THREE.Group();
  center_group.name = "center_group";
  root.add(center_group);

  const velvetMat = new THREE.MeshStandardMaterial({
    color: 0x929496,
    metalness: 0.0,
    roughness: 0.95
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x707275,
    metalness: 0.0,
    roughness: 0.95
  });

  const undersideMat = new THREE.MeshStandardMaterial({
    color: 0x55575a,
    metalness: 0.0,
    roughness: 0.95
  });

  function createRoundedBoxGeometry(width, height, depth, radius, bevel) {
    const b = Math.min(bevel, width * 0.2, height * 0.2, depth * 0.2);
    const shapeWidth = width - b * 2;
    const shapeHeight = height - b * 2;
    const halfWidth = shapeWidth * 0.5;
    const halfHeight = shapeHeight * 0.5;
    const cornerRadius = Math.max(
      0.001,
      Math.min(radius - b, halfWidth - 0.001, halfHeight - 0.001)
    );

    const shape = new THREE.Shape();
    shape.moveTo(-halfWidth + cornerRadius, -halfHeight);
    shape.lineTo(halfWidth - cornerRadius, -halfHeight);
    shape.quadraticCurveTo(
      halfWidth,
      -halfHeight,
      halfWidth,
      -halfHeight + cornerRadius
    );
    shape.lineTo(halfWidth, halfHeight - cornerRadius);
    shape.quadraticCurveTo(
      halfWidth,
      halfHeight,
      halfWidth - cornerRadius,
      halfHeight
    );
    shape.lineTo(-halfWidth + cornerRadius, halfHeight);
    shape.quadraticCurveTo(
      -halfWidth,
      halfHeight,
      -halfWidth,
      halfHeight - cornerRadius
    );
    shape.lineTo(-halfWidth, -halfHeight + cornerRadius);
    shape.quadraticCurveTo(
      -halfWidth,
      -halfHeight,
      -halfWidth + cornerRadius,
      -halfHeight
    );

    const innerDepth = Math.max(0.002, depth - b * 2);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: innerDepth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: b,
      bevelSize: b,
      bevelSegments: 4
    });
    geometry.translate(0, 0, -innerDepth * 0.5);
    geometry.computeVertexNormals();
    return geometry;
  }

  const underside_plinthGeom = createRoundedBoxGeometry(
    2.66,
    0.08,
    2.66,
    0.07,
    0.025
  );
  const underside_plinth = new THREE.Mesh(underside_plinthGeom, undersideMat);
  underside_plinth.name = "underside_plinth";
  underside_plinth.position.y = 0.02;
  base_group.add(underside_plinth);

  const base_cushionGeom = createRoundedBoxGeometry(
    2.82,
    0.58,
    2.82,
    0.18,
    0.07
  );
  const base_cushion = new THREE.Mesh(base_cushionGeom, velvetMat);
  base_cushion.name = "base_cushion";
  base_cushion.position.y = 0.32;
  base_group.add(base_cushion);

  const base_vertical_seamsGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    0.4,
    8
  );
  const base_vertical_seams = new THREE.InstancedMesh(
    base_vertical_seamsGeom,
    seamMat,
    8
  );
  base_vertical_seams.name = "base_vertical_seams";

  const baseSeamPositions = [
    [-0.68, 0.32, 1.416],
    [0.68, 0.32, 1.416],
    [-0.68, 0.32, -1.416],
    [0.68, 0.32, -1.416],
    [1.416, 0.32, -0.68],
    [1.416, 0.32, 0.68],
    [-1.416, 0.32, -0.68],
    [-1.416, 0.32, 0.68]
  ];
  const instanceMatrix = new THREE.Matrix4();
  for (let i = 0; i < baseSeamPositions.length; i++) {
    const position = baseSeamPositions[i];
    instanceMatrix.makeTranslation(position[0], position[1], position[2]);
    base_vertical_seams.setMatrixAt(i, instanceMatrix);
  }
  base_vertical_seams.instanceMatrix.needsUpdate = true;
  base_group.add(base_vertical_seams);

  const front_back_frame_cushionGeom = createRoundedBoxGeometry(
    2.9,
    0.58,
    0.72,
    0.2,
    0.07
  );
  const side_frame_cushionGeom = createRoundedBoxGeometry(
    0.72,
    0.58,
    2.18,
    0.2,
    0.07
  );

  const front_frame_cushion = new THREE.Mesh(
    front_back_frame_cushionGeom,
    velvetMat
  );
  front_frame_cushion.name = "front_frame_cushion";
  front_frame_cushion.position.set(0, 0.78, 1.09);
  frame_group.add(front_frame_cushion);

  const back_frame_cushion = new THREE.Mesh(
    front_back_frame_cushionGeom,
    velvetMat
  );
  back_frame_cushion.name = "back_frame_cushion";
  back_frame_cushion.position.set(0, 0.78, -1.09);
  frame_group.add(back_frame_cushion);

  const left_frame_cushion = new THREE.Mesh(side_frame_cushionGeom, velvetMat);
  left_frame_cushion.name = "left_frame_cushion";
  left_frame_cushion.position.set(-1.09, 0.78, 0);
  frame_group.add(left_frame_cushion);

  const right_frame_cushion = new THREE.Mesh(side_frame_cushionGeom, velvetMat);
  right_frame_cushion.name = "right_frame_cushion";
  right_frame_cushion.position.set(1.09, 0.78, 0);
  frame_group.add(right_frame_cushion);

  const frame_segment_seamsGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    0.42,
    8
  );
  const frame_segment_seams = new THREE.InstancedMesh(
    frame_segment_seamsGeom,
    seamMat,
    12
  );
  frame_segment_seams.name = "frame_segment_seams";

  const frameSeamPositions = [
    [-0.72, 0.79, 1.456],
    [0.72, 0.79, 1.456],
    [-0.72, 0.79, -1.456],
    [0.72, 0.79, -1.456],
    [-1.456, 0.79, -0.72],
    [-1.456, 0.79, 0.72],
    [1.456, 0.79, -0.72],
    [1.456, 0.79, 0.72],
    [-0.72, 1.073, 1.09],
    [0.72, 1.073, 1.09],
    [-0.72, 1.073, -1.09],
    [0.72, 1.073, -1.09]
  ];
  for (let i = 0; i < frameSeamPositions.length; i++) {
    const position = frameSeamPositions[i];
    instanceMatrix.makeTranslation(position[0], position[1], position[2]);
    frame_segment_seams.setMatrixAt(i, instanceMatrix);
  }
  frame_segment_seams.instanceMatrix.needsUpdate = true;
  frame_group.add(frame_segment_seams);

  const center_supportGeom = createRoundedBoxGeometry(
    1.58,
    0.2,
    1.58,
    0.12,
    0.04
  );
  const center_support = new THREE.Mesh(center_supportGeom, velvetMat);
  center_support.name = "center_support";
  center_support.position.y = 0.55;
  center_group.add(center_support);

  const center_cushionGeom = createRoundedBoxGeometry(
    0.74,
    0.32,
    0.74,
    0.16,
    0.06
  );

  const center_front_left_cushion = new THREE.Mesh(
    center_cushionGeom,
    velvetMat
  );
  center_front_left_cushion.name = "center_front_left_cushion";
  center_front_left_cushion.position.set(-0.39, 0.75, 0.39);
  center_group.add(center_front_left_cushion);

  const center_front_right_cushion = new THREE.Mesh(
    center_cushionGeom,
    velvetMat
  );
  center_front_right_cushion.name = "center_front_right_cushion";
  center_front_right_cushion.position.set(0.39, 0.75, 0.39);
  center_group.add(center_front_right_cushion);

  const center_back_left_cushion = new THREE.Mesh(
    center_cushionGeom,
    velvetMat
  );
  center_back_left_cushion.name = "center_back_left_cushion";
  center_back_left_cushion.position.set(-0.39, 0.75, -0.39);
  center_group.add(center_back_left_cushion);

  const center_back_right_cushion = new THREE.Mesh(
    center_cushionGeom,
    velvetMat
  );
  center_back_right_cushion.name = "center_back_right_cushion";
  center_back_right_cushion.position.set(0.39, 0.75, -0.39);
  center_group.add(center_back_right_cushion);

  const center_horizontal_seamGeom = new THREE.BoxGeometry(
    1.52,
    0.012,
    0.025
  );
  const center_horizontal_seam = new THREE.Mesh(
    center_horizontal_seamGeom,
    seamMat
  );
  center_horizontal_seam.name = "center_horizontal_seam";
  center_horizontal_seam.position.set(0, 0.913, 0);
  center_group.add(center_horizontal_seam);

  const center_vertical_seamGeom = new THREE.BoxGeometry(
    0.025,
    0.012,
    1.52
  );
  const center_vertical_seam = new THREE.Mesh(
    center_vertical_seamGeom,
    seamMat
  );
  center_vertical_seam.name = "center_vertical_seam";
  center_vertical_seam.position.set(0, 0.914, 0);
  center_group.add(center_vertical_seam);

  const center_tuft_dimpleGeom = new THREE.CylinderGeometry(
    0.052,
    0.052,
    0.009,
    20
  );
  const center_tuft_dimple = new THREE.Mesh(
    center_tuft_dimpleGeom,
    seamMat
  );
  center_tuft_dimple.name = "center_tuft_dimple";
  center_tuft_dimple.position.set(0, 0.922, 0);
  center_group.add(center_tuft_dimple);

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