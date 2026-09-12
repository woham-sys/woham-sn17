// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cheese_scraper";

  const handle_group = new THREE.Group();
  handle_group.name = "handle_group";
  root.add(handle_group);

  const head_group = new THREE.Group();
  head_group.name = "head_group";
  root.add(head_group);

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd6ad45,
    metalness: 0.6,
    roughness: 0.2,
  });
  const goldFaceMat = new THREE.MeshStandardMaterial({
    color: 0xf0cf73,
    metalness: 0.6,
    roughness: 0.2,
  });
  const goldDarkMat = new THREE.MeshStandardMaterial({
    color: 0x8f6818,
    metalness: 0.6,
    roughness: 0.2,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushedSilverMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const screwMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x252525,
    metalness: 0.0,
    roughness: 0.8,
  });

  function makeExtrudedGeometry(shape, depth, bevelSize, bevelThickness) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 16,
      bevelEnabled: bevelSize > 0,
      bevelSegments: 3,
      bevelSize,
      bevelThickness,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const handle_bodyShape = new THREE.Shape();
  handle_bodyShape.moveTo(-0.27, 0.34);
  handle_bodyShape.lineTo(-0.31, -1.96);
  handle_bodyShape.bezierCurveTo(-0.32, -2.17, -0.20, -2.34, 0.0, -2.37);
  handle_bodyShape.bezierCurveTo(0.20, -2.34, 0.32, -2.17, 0.31, -1.96);
  handle_bodyShape.lineTo(0.27, 0.34);
  handle_bodyShape.closePath();

  const handle_bodyGeom = makeExtrudedGeometry(
    handle_bodyShape,
    0.20,
    0.035,
    0.045
  );
  const handle_body = new THREE.Mesh(handle_bodyGeom, goldMat);
  handle_body.name = "handle_body";
  handle_group.add(handle_body);

  const handle_faceShape = new THREE.Shape();
  handle_faceShape.moveTo(-0.215, 0.22);
  handle_faceShape.lineTo(-0.255, -1.91);
  handle_faceShape.bezierCurveTo(-0.26, -2.07, -0.16, -2.20, 0.0, -2.22);
  handle_faceShape.bezierCurveTo(0.16, -2.20, 0.26, -2.07, 0.255, -1.91);
  handle_faceShape.lineTo(0.215, 0.22);
  handle_faceShape.closePath();

  const handle_faceGeom = makeExtrudedGeometry(
    handle_faceShape,
    0.018,
    0.012,
    0.006
  );
  const handle_face = new THREE.Mesh(handle_faceGeom, goldFaceMat);
  handle_face.name = "handle_face";
  handle_face.position.z = 0.151;
  handle_group.add(handle_face);

  const left_handle_groovePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.235, 0.17, 0.174),
    new THREE.Vector3(-0.255, -0.70, 0.174),
    new THREE.Vector3(-0.275, -1.62, 0.174),
    new THREE.Vector3(-0.225, -2.08, 0.174),
  ]);
  const left_handle_grooveGeom = new THREE.TubeGeometry(
    left_handle_groovePath,
    24,
    0.011,
    6,
    false
  );
  const left_handle_groove = new THREE.Mesh(
    left_handle_grooveGeom,
    goldDarkMat
  );
  left_handle_groove.name = "left_handle_groove";
  handle_group.add(left_handle_groove);

  const right_handle_groovePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.235, 0.17, 0.174),
    new THREE.Vector3(0.255, -0.70, 0.174),
    new THREE.Vector3(0.275, -1.62, 0.174),
    new THREE.Vector3(0.225, -2.08, 0.174),
  ]);
  const right_handle_grooveGeom = new THREE.TubeGeometry(
    right_handle_groovePath,
    24,
    0.011,
    6,
    false
  );
  const right_handle_groove = new THREE.Mesh(
    right_handle_grooveGeom,
    goldDarkMat
  );
  right_handle_groove.name = "right_handle_groove";
  handle_group.add(right_handle_groove);

  const rear_handle_bandGeom = new THREE.BoxGeometry(0.57, 0.026, 0.014);
  const rear_handle_band = new THREE.Mesh(rear_handle_bandGeom, goldDarkMat);
  rear_handle_band.name = "rear_handle_band";
  rear_handle_band.position.set(0, -1.82, 0.174);
  handle_group.add(rear_handle_band);

  const front_handle_bandGeom = new THREE.BoxGeometry(0.55, 0.026, 0.014);
  const front_handle_band = new THREE.Mesh(front_handle_bandGeom, goldDarkMat);
  front_handle_band.name = "front_handle_band";
  front_handle_band.position.set(0, 0.19, 0.174);
  handle_group.add(front_handle_band);

  const neck_collarShape = new THREE.Shape();
  neck_collarShape.moveTo(-0.27, 0.10);
  neck_collarShape.lineTo(-0.34, 0.48);
  neck_collarShape.bezierCurveTo(-0.37, 0.63, -0.49, 0.78, -0.55, 0.89);
  neck_collarShape.lineTo(0.55, 0.89);
  neck_collarShape.bezierCurveTo(0.49, 0.78, 0.37, 0.63, 0.34, 0.48);
  neck_collarShape.lineTo(0.27, 0.10);
  neck_collarShape.closePath();

  const neck_collarGeom = makeExtrudedGeometry(
    neck_collarShape,
    0.18,
    0.03,
    0.035
  );
  const neck_collar = new THREE.Mesh(neck_collarGeom, goldMat);
  neck_collar.name = "neck_collar";
  handle_group.add(neck_collar);

  const neck_faceShape = new THREE.Shape();
  neck_faceShape.moveTo(-0.22, 0.20);
  neck_faceShape.lineTo(-0.29, 0.50);
  neck_faceShape.bezierCurveTo(-0.32, 0.63, -0.41, 0.76, -0.46, 0.83);
  neck_faceShape.lineTo(0.46, 0.83);
  neck_faceShape.bezierCurveTo(0.41, 0.76, 0.32, 0.63, 0.29, 0.50);
  neck_faceShape.lineTo(0.22, 0.20);
  neck_faceShape.closePath();

  const neck_faceGeom = makeExtrudedGeometry(
    neck_faceShape,
    0.016,
    0.008,
    0.005
  );
  const neck_face = new THREE.Mesh(neck_faceGeom, goldFaceMat);
  neck_face.name = "neck_face";
  neck_face.position.z = 0.132;
  handle_group.add(neck_face);

  const brand_mark = new THREE.Group();
  brand_mark.name = "brand_mark";
  brand_mark.position.z = 0.151;

  const brand_stemGeom = new THREE.BoxGeometry(0.018, 0.13, 0.008);
  const brand_stem = new THREE.Mesh(brand_stemGeom, goldDarkMat);
  brand_stem.name = "brand_stem";
  brand_stem.position.set(-0.105, 0.55, 0);
  brand_mark.add(brand_stem);

  const brand_topGeom = new THREE.BoxGeometry(0.085, 0.016, 0.008);
  const brand_top = new THREE.Mesh(brand_topGeom, goldDarkMat);
  brand_top.name = "brand_top";
  brand_top.position.set(-0.065, 0.605, 0);
  brand_mark.add(brand_top);

  const brand_middleGeom = new THREE.BoxGeometry(0.068, 0.014, 0.008);
  const brand_middle = new THREE.Mesh(brand_middleGeom, goldDarkMat);
  brand_middle.name = "brand_middle";
  brand_middle.position.set(-0.072, 0.555, 0);
  brand_mark.add(brand_middle);

  const brand_bottomGeom = new THREE.BoxGeometry(0.085, 0.016, 0.008);
  const brand_bottom = new THREE.Mesh(brand_bottomGeom, goldDarkMat);
  brand_bottom.name = "brand_bottom";
  brand_bottom.position.set(-0.065, 0.50, 0);
  brand_mark.add(brand_bottom);

  const brand_letterGeom = new THREE.BoxGeometry(0.014, 0.075, 0.008);
  for (let i = 0; i < 4; i++) {
    const brand_letter = new THREE.Mesh(brand_letterGeom, goldDarkMat);
    brand_letter.name = "brand_letter_" + i;
    brand_letter.position.set(0.005 + i * 0.035, 0.55, 0);
    brand_mark.add(brand_letter);
  }
  handle_group.add(brand_mark);

  const screwGeom = new THREE.CylinderGeometry(0.078, 0.078, 0.026, 24);
  const screw_slot_verticalGeom = new THREE.BoxGeometry(0.014, 0.095, 0.008);
  const screw_slot_horizontalGeom = new THREE.BoxGeometry(0.095, 0.014, 0.008);

  const rear_screw = new THREE.Mesh(screwGeom, screwMat);
  rear_screw.name = "rear_screw";
  rear_screw.rotation.x = Math.PI / 2;
  rear_screw.position.set(0, -2.10, 0.171);
  handle_group.add(rear_screw);

  const rear_screw_slot_vertical = new THREE.Mesh(
    screw_slot_verticalGeom,
    recessMat
  );
  rear_screw_slot_vertical.name = "rear_screw_slot_vertical";
  rear_screw_slot_vertical.position.set(0, -2.10, 0.188);
  handle_group.add(rear_screw_slot_vertical);

  const rear_screw_slot_horizontal = new THREE.Mesh(
    screw_slot_horizontalGeom,
    recessMat
  );
  rear_screw_slot_horizontal.name = "rear_screw_slot_horizontal";
  rear_screw_slot_horizontal.position.set(0, -2.10, 0.189);
  handle_group.add(rear_screw_slot_horizontal);

  const front_screw = new THREE.Mesh(screwGeom, screwMat);
  front_screw.name = "front_screw";
  front_screw.rotation.x = Math.PI / 2;
  front_screw.position.set(0, 0.42, 0.158);
  handle_group.add(front_screw);

  const front_screw_slot_vertical = new THREE.Mesh(
    screw_slot_verticalGeom,
    recessMat
  );
  front_screw_slot_vertical.name = "front_screw_slot_vertical";
  front_screw_slot_vertical.position.set(0, 0.42, 0.175);
  handle_group.add(front_screw_slot_vertical);

  const front_screw_slot_horizontal = new THREE.Mesh(
    screw_slot_horizontalGeom,
    recessMat
  );
  front_screw_slot_horizontal.name = "front_screw_slot_horizontal";
  front_screw_slot_horizontal.position.set(0, 0.42, 0.176);
  handle_group.add(front_screw_slot_horizontal);

  const head_plateShape = new THREE.Shape();
  head_plateShape.moveTo(-0.43, 0.68);
  head_plateShape.bezierCurveTo(-0.57, 0.82, -0.72, 0.98, -0.84, 1.16);
  head_plateShape.lineTo(-1.03, 2.48);
  head_plateShape.bezierCurveTo(-1.07, 2.70, -0.91, 2.87, -0.69, 2.91);
  head_plateShape.bezierCurveTo(-0.30, 2.98, 0.30, 2.98, 0.69, 2.91);
  head_plateShape.bezierCurveTo(0.91, 2.87, 1.07, 2.70, 1.03, 2.48);
  head_plateShape.lineTo(0.84, 1.16);
  head_plateShape.bezierCurveTo(0.72, 0.98, 0.57, 0.82, 0.43, 0.68);
  head_plateShape.closePath();

  const head_opening = new THREE.Path();
  head_opening.moveTo(-0.48, 1.50);
  head_opening.lineTo(-0.58, 2.35);
  head_opening.bezierCurveTo(-0.60, 2.52, -0.49, 2.64, -0.31, 2.67);
  head_opening.lineTo(0.31, 2.67);
  head_opening.bezierCurveTo(0.49, 2.64, 0.60, 2.52, 0.58, 2.35);
  head_opening.lineTo(0.48, 1.50);
  head_opening.bezierCurveTo(0.45, 1.28, 0.25, 1.12, 0.0, 1.10);
  head_opening.bezierCurveTo(-0.25, 1.12, -0.45, 1.28, -0.48, 1.50);
  head_opening.closePath();
  head_plateShape.holes.push(head_opening);

  const head_plateGeom = makeExtrudedGeometry(
    head_plateShape,
    0.075,
    0.018,
    0.018
  );
  const head_plate = new THREE.Mesh(head_plateGeom, silverMat);
  head_plate.name = "head_plate";
  head_plate.position.z = 0.025;
  head_group.add(head_plate);

  const head_opening_rimPoints = [
    new THREE.Vector3(-0.48, 1.50, 0.091),
    new THREE.Vector3(-0.55, 1.82, 0.091),
    new THREE.Vector3(-0.58, 2.35, 0.091),
    new THREE.Vector3(-0.52, 2.55, 0.091),
    new THREE.Vector3(-0.31, 2.67, 0.091),
    new THREE.Vector3(0.0, 2.69, 0.091),
    new THREE.Vector3(0.31, 2.67, 0.091),
    new THREE.Vector3(0.52, 2.55, 0.091),
    new THREE.Vector3(0.58, 2.35, 0.091),
    new THREE.Vector3(0.55, 1.82, 0.091),
    new THREE.Vector3(0.48, 1.50, 0.091),
    new THREE.Vector3(0.34, 1.25, 0.091),
    new THREE.Vector3(0.0, 1.10, 0.091),
    new THREE.Vector3(-0.34, 1.25, 0.091),
  ];
  const head_opening_rimCurve = new THREE.CatmullRomCurve3(
    head_opening_rimPoints,
    true,
    "centripetal"
  );
  const head_opening_rimGeom = new THREE.TubeGeometry(
    head_opening_rimCurve,
    64,
    0.012,
    6,
    true
  );
  const head_opening_rim = new THREE.Mesh(
    head_opening_rimGeom,
    brushedSilverMat
  );
  head_opening_rim.name = "head_opening_rim";
  head_group.add(head_opening_rim);

  const toothShape = new THREE.Shape();
  toothShape.moveTo(-0.04, -0.035);
  toothShape.lineTo(0.13, 0.0);
  toothShape.lineTo(-0.04, 0.035);
  toothShape.closePath();

  const toothGeom = makeExtrudedGeometry(toothShape, 0.06, 0, 0);

  const side_teeth = new THREE.InstancedMesh(toothGeom, silverMat, 22);
  side_teeth.name = "side_teeth";
  side_teeth.position.z = 0.025;
  const side_tooth_dummy = new THREE.Object3D();
  let side_tooth_index = 0;

  for (const side of [-1, 1]) {
    for (let i = 0; i < 11; i++) {
      const t = i / 10;
      const y = 1.30 + t * 1.12;
      const x = side * (0.88 + t * 0.10);
      side_tooth_dummy.position.set(x, y, 0);
      side_tooth_dummy.rotation.set(0, 0, -side * Math.PI / 2);
      side_tooth_dummy.scale.set(1, 1, 1);
      side_tooth_dummy.updateMatrix();
      side_teeth.setMatrixAt(side_tooth_index, side_tooth_dummy.matrix);
      side_tooth_index++;
    }
  }
  side_teeth.instanceMatrix.needsUpdate = true;
  head_group.add(side_teeth);

  const top_teeth = new THREE.InstancedMesh(toothGeom, silverMat, 13);
  top_teeth.name = "top_teeth";
  top_teeth.position.z = 0.025;
  const top_tooth_dummy = new THREE.Object3D();

  for (let i = 0; i < 13; i++) {
    const t = i / 12;
    top_tooth_dummy.position.set(-0.45 + t * 0.90, 2.67, 0);
    top_tooth_dummy.rotation.set(0, 0, Math.PI);
    top_tooth_dummy.scale.set(0.92, 1, 1);
    top_tooth_dummy.updateMatrix();
    top_teeth.setMatrixAt(i, top_tooth_dummy.matrix);
  }
  top_teeth.instanceMatrix.needsUpdate = true;
  head_group.add(top_teeth);

  const inner_grooveGeom = new THREE.BoxGeometry(0.018, 0.92, 0.012);
  const inner_groove = new THREE.Mesh(inner_grooveGeom, recessMat);
  inner_groove.name = "inner_groove";
  inner_groove.position.set(0.515, 2.08, 0.091);
  head_group.add(inner_groove);

  const inner_toothShape = new THREE.Shape();
  inner_toothShape.moveTo(0.0, -0.034);
  inner_toothShape.lineTo(-0.105, 0.0);
  inner_toothShape.lineTo(0.0, 0.034);
  inner_toothShape.closePath();

  const inner_toothGeom = makeExtrudedGeometry(
    inner_toothShape,
    0.055,
    0,
    0
  );
  const inner_teeth = new THREE.InstancedMesh(
    inner_toothGeom,
    recessMat,
    12
  );
  inner_teeth.name = "inner_teeth";
  inner_teeth.position.z = 0.025;
  const inner_tooth_dummy = new THREE.Object3D();

  for (let i = 0; i < 12; i++) {
    inner_tooth_dummy.position.set(0.515, 1.65 + i * 0.078, 0);
    inner_tooth_dummy.rotation.set(0, 0, 0);
    inner_tooth_dummy.scale.set(1, 1, 1);
    inner_tooth_dummy.updateMatrix();
    inner_teeth.setMatrixAt(i, inner_tooth_dummy.matrix);
  }
  inner_teeth.instanceMatrix.needsUpdate = true;
  head_group.add(inner_teeth);

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