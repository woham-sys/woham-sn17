function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "chocolate_layer_cake";

  const cake_body = new THREE.Group();
  cake_body.name = "cake_body";
  root.add(cake_body);

  const cut_face_details = new THREE.Group();
  cut_face_details.name = "cut_face_details";
  root.add(cut_face_details);

  const chocolate_crumbMat = new THREE.MeshStandardMaterial({
    color: 0x5b2d1f,
    roughness: 0.95
  });
  const dark_chocolateMat = new THREE.MeshStandardMaterial({
    color: 0x321713,
    roughness: 0.88
  });
  const ganacheMat = new THREE.MeshStandardMaterial({
    color: 0x4b2925,
    roughness: 0.28
  });
  const cream_fillingMat = new THREE.MeshStandardMaterial({
    color: 0xe8c982,
    roughness: 0.78
  });
  const crumb_holeMat = new THREE.MeshStandardMaterial({
    color: 0x1f100d,
    roughness: 0.98,
    side: THREE.DoubleSide
  });
  const crumb_highlightMat = new THREE.MeshStandardMaterial({
    color: 0x75402a,
    roughness: 0.94
  });
  const cream_inclusionMat = new THREE.MeshStandardMaterial({
    color: 0xa86f35,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const ganache_speckleMat = new THREE.MeshStandardMaterial({
    color: 0xc9a48d,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const halfW = width * 0.5;
    const halfH = height * 0.5;
    const r = Math.min(radius, halfW, halfH);

    shape.moveTo(-halfW + r, -halfH);
    shape.lineTo(halfW - r, -halfH);
    shape.quadraticCurveTo(halfW, -halfH, halfW, -halfH + r);
    shape.lineTo(halfW, halfH - r);
    shape.quadraticCurveTo(halfW, halfH, halfW - r, halfH);
    shape.lineTo(-halfW + r, halfH);
    shape.quadraticCurveTo(-halfW, halfH, -halfW, halfH - r);
    shape.lineTo(-halfW, -halfH + r);
    shape.quadraticCurveTo(-halfW, -halfH, -halfW + r, -halfH);
    shape.closePath();
    return shape;
  }

  function createLayerGeometry(shape, depth) {
    const bevelSize = 0.012;
    const bevelThickness = 0.012;
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: bevelSize,
      bevelThickness: bevelThickness
    });
    geometry.translate(0, 0, -depth - bevelThickness);
    return geometry;
  }

  const bottom_chocolate_layerShape = new THREE.Shape();
  bottom_chocolate_layerShape.moveTo(-0.50, -0.36);
  bottom_chocolate_layerShape.lineTo(0.50, -0.36);
  bottom_chocolate_layerShape.lineTo(0.47, -0.17);
  bottom_chocolate_layerShape.lineTo(0.30, -0.155);
  bottom_chocolate_layerShape.lineTo(0.08, -0.17);
  bottom_chocolate_layerShape.lineTo(-0.14, -0.155);
  bottom_chocolate_layerShape.lineTo(-0.34, -0.17);
  bottom_chocolate_layerShape.lineTo(-0.47, -0.15);
  bottom_chocolate_layerShape.closePath();

  const bottom_chocolate_layerGeom = createLayerGeometry(bottom_chocolate_layerShape, 0.78);
  const bottom_chocolate_layer = new THREE.Mesh(bottom_chocolate_layerGeom, dark_chocolateMat);
  bottom_chocolate_layer.name = "bottom_chocolate_layer";
  cake_body.add(bottom_chocolate_layer);

  const cream_fillingShape = new THREE.Shape();
  cream_fillingShape.moveTo(-0.47, -0.18);
  cream_fillingShape.lineTo(-0.27, -0.165);
  cream_fillingShape.lineTo(-0.06, -0.18);
  cream_fillingShape.lineTo(0.12, -0.165);
  cream_fillingShape.lineTo(0.31, -0.18);
  cream_fillingShape.lineTo(0.47, -0.165);
  cream_fillingShape.lineTo(0.45, -0.025);
  cream_fillingShape.lineTo(0.28, -0.04);
  cream_fillingShape.lineTo(0.08, -0.025);
  cream_fillingShape.lineTo(-0.12, -0.04);
  cream_fillingShape.lineTo(-0.31, -0.025);
  cream_fillingShape.lineTo(-0.45, -0.04);
  cream_fillingShape.closePath();

  const cream_fillingGeom = createLayerGeometry(cream_fillingShape, 0.76);
  const cream_filling = new THREE.Mesh(cream_fillingGeom, cream_fillingMat);
  cream_filling.name = "cream_filling";
  cake_body.add(cream_filling);

  const middle_chocolate_layerShape = new THREE.Shape();
  middle_chocolate_layerShape.moveTo(-0.45, -0.045);
  middle_chocolate_layerShape.lineTo(-0.20, -0.025);
  middle_chocolate_layerShape.lineTo(0.02, -0.04);
  middle_chocolate_layerShape.lineTo(0.25, -0.025);
  middle_chocolate_layerShape.lineTo(0.45, -0.04);
  middle_chocolate_layerShape.lineTo(0.43, 0.105);
  middle_chocolate_layerShape.lineTo(0.22, 0.09);
  middle_chocolate_layerShape.lineTo(0.00, 0.105);
  middle_chocolate_layerShape.lineTo(-0.22, 0.09);
  middle_chocolate_layerShape.lineTo(-0.43, 0.105);
  middle_chocolate_layerShape.closePath();

  const middle_chocolate_layerGeom = createLayerGeometry(middle_chocolate_layerShape, 0.75);
  const middle_chocolate_layer = new THREE.Mesh(middle_chocolate_layerGeom, dark_chocolateMat);
  middle_chocolate_layer.name = "middle_chocolate_layer";
  cake_body.add(middle_chocolate_layer);

  const chocolate_crumb_layerShape = new THREE.Shape();
  chocolate_crumb_layerShape.moveTo(-0.43, 0.09);
  chocolate_crumb_layerShape.lineTo(-0.31, 0.105);
  chocolate_crumb_layerShape.lineTo(-0.18, 0.09);
  chocolate_crumb_layerShape.lineTo(-0.04, 0.11);
  chocolate_crumb_layerShape.lineTo(0.10, 0.095);
  chocolate_crumb_layerShape.lineTo(0.25, 0.11);
  chocolate_crumb_layerShape.lineTo(0.43, 0.09);
  chocolate_crumb_layerShape.lineTo(0.40, 0.29);
  chocolate_crumb_layerShape.lineTo(0.24, 0.275);
  chocolate_crumb_layerShape.lineTo(0.08, 0.295);
  chocolate_crumb_layerShape.lineTo(-0.08, 0.28);
  chocolate_crumb_layerShape.lineTo(-0.24, 0.295);
  chocolate_crumb_layerShape.lineTo(-0.40, 0.275);
  chocolate_crumb_layerShape.closePath();

  const chocolate_crumb_layerGeom = createLayerGeometry(chocolate_crumb_layerShape, 0.73);
  const chocolate_crumb_layer = new THREE.Mesh(chocolate_crumb_layerGeom, chocolate_crumbMat);
  chocolate_crumb_layer.name = "chocolate_crumb_layer";
  cake_body.add(chocolate_crumb_layer);

  const top_ganacheShape = roundedRectShape(1.02, 0.13, 0.055);
  const top_ganacheGeom = createLayerGeometry(top_ganacheShape, 0.80);
  const top_ganache = new THREE.Mesh(top_ganacheGeom, ganacheMat);
  top_ganache.name = "top_ganache";
  top_ganache.position.y = 0.325;
  cake_body.add(top_ganache);

  const front_ganache_lipShape = roundedRectShape(0.98, 0.035, 0.017);
  const front_ganache_lipGeom = createLayerGeometry(front_ganache_lipShape, 0.028);
  const front_ganache_lip = new THREE.Mesh(front_ganache_lipGeom, ganacheMat);
  front_ganache_lip.name = "front_ganache_lip";
  front_ganache_lip.position.set(0, 0.273, 0.405);
  cake_body.add(front_ganache_lip);

  const right_ganache_lipShape = roundedRectShape(0.76, 0.035, 0.017);
  const right_ganache_lipGeom = createLayerGeometry(right_ganache_lipShape, 0.028);
  const right_ganache_lip = new THREE.Mesh(right_ganache_lipGeom, ganacheMat);
  right_ganache_lip.name = "right_ganache_lip";
  right_ganache_lip.rotation.y = Math.PI / 2;
  right_ganache_lip.position.set(0.515, 0.273, 0);
  cake_body.add(right_ganache_lip);

  const ganache_dripGeom = new THREE.SphereGeometry(0.06, 20, 12);
  const ganache_drip = new THREE.Mesh(ganache_dripGeom, ganacheMat);
  ganache_drip.name = "ganache_drip";
  ganache_drip.position.set(0.17, 0.235, 0.423);
  ganache_drip.scale.set(0.72, 1.18, 0.28);
  cake_body.add(ganache_drip);

  const secondary_ganache_dripGeom = new THREE.SphereGeometry(0.04, 16, 10);
  const secondary_ganache_drip = new THREE.Mesh(secondary_ganache_dripGeom, ganacheMat);
  secondary_ganache_drip.name = "secondary_ganache_drip";
  secondary_ganache_drip.position.set(-0.34, 0.252, 0.419);
  secondary_ganache_drip.scale.set(0.62, 0.82, 0.24);
  cake_body.add(secondary_ganache_drip);

  const right_ganache_dripGeom = new THREE.SphereGeometry(0.045, 16, 10);
  const right_ganache_drip = new THREE.Mesh(right_ganache_dripGeom, ganacheMat);
  right_ganache_drip.name = "right_ganache_drip";
  right_ganache_drip.position.set(0.532, 0.245, 0.19);
  right_ganache_drip.scale.set(0.25, 0.9, 0.65);
  cake_body.add(right_ganache_drip);

  const front_edge_crumbsGeom = new THREE.DodecahedronGeometry(0.022, 0);
  const front_edge_crumbs = new THREE.InstancedMesh(front_edge_crumbsGeom, chocolate_crumbMat, 24);
  front_edge_crumbs.name = "front_edge_crumbs";
  const edge_dummy = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    const t = i / 23;
    edge_dummy.position.set(
      -0.49 + t * 0.98,
      -0.352 + ((i * 7) % 5) * 0.004,
      0.402 + ((i * 5) % 4) * 0.004
    );
    edge_dummy.rotation.set(i * 0.31, i * 0.47, i * 0.19);
    const s = 0.55 + ((i * 11) % 9) / 12;
    edge_dummy.scale.set(s, s * (0.75 + (i % 3) * 0.12), s);
    edge_dummy.updateMatrix();
    front_edge_crumbs.setMatrixAt(i, edge_dummy.matrix);
  }
  front_edge_crumbs.instanceMatrix.needsUpdate = true;
  cut_face_details.add(front_edge_crumbs);

  const right_edge_crumbsGeom = new THREE.DodecahedronGeometry(0.02, 0);
  const right_edge_crumbs = new THREE.InstancedMesh(right_edge_crumbsGeom, chocolate_crumbMat, 18);
  right_edge_crumbs.name = "right_edge_crumbs";
  for (let i = 0; i < 18; i++) {
    const t = i / 17;
    edge_dummy.position.set(
      0.512 + ((i * 3) % 4) * 0.004,
      -0.352 + ((i * 5) % 5) * 0.004,
      -0.37 + t * 0.74
    );
    edge_dummy.rotation.set(i * 0.23, i * 0.39, i * 0.17);
    const s = 0.55 + ((i * 7) % 8) / 11;
    edge_dummy.scale.set(s, s * (0.78 + (i % 3) * 0.1), s);
    edge_dummy.updateMatrix();
    right_edge_crumbs.setMatrixAt(i, edge_dummy.matrix);
  }
  right_edge_crumbs.instanceMatrix.needsUpdate = true;
  cut_face_details.add(right_edge_crumbs);

  const crumb_holes_frontGeom = new THREE.CircleGeometry(0.012, 10);
  const crumb_holes_front = new THREE.InstancedMesh(crumb_holes_frontGeom, crumb_holeMat, 72);
  crumb_holes_front.name = "crumb_holes_front";
  const detail_dummy = new THREE.Object3D();
  for (let i = 0; i < 72; i++) {
    const column = i % 12;
    const row = Math.floor(i / 12);
    detail_dummy.position.set(
      -0.40 + column * 0.073 + (((row * 5 + column * 3) % 7) - 3) * 0.004,
      -0.315 + row * 0.092 + (((column * 7 + row) % 5) - 2) * 0.004,
      0.407
    );
    detail_dummy.rotation.set(0, 0, ((i * 13) % 17) * 0.15);
    const sx = 0.55 + ((i * 7) % 11) / 8;
    const sy = 0.50 + ((i * 5) % 9) / 9;
    detail_dummy.scale.set(sx, sy, 1);
    detail_dummy.updateMatrix();
    crumb_holes_front.setMatrixAt(i, detail_dummy.matrix);
  }
  crumb_holes_front.instanceMatrix.needsUpdate = true;
  cut_face_details.add(crumb_holes_front);

  const crumb_holes_rightGeom = new THREE.CircleGeometry(0.011, 10);
  const crumb_holes_right = new THREE.InstancedMesh(crumb_holes_rightGeom, crumb_holeMat, 48);
  crumb_holes_right.name = "crumb_holes_right";
  for (let i = 0; i < 48; i++) {
    const column = i % 8;
    const row = Math.floor(i / 8);
    detail_dummy.position.set(
      0.519,
      -0.315 + row * 0.092 + (((column * 3 + row * 5) % 5) - 2) * 0.004,
      -0.33 + column * 0.095 + (((row * 7 + column) % 5) - 2) * 0.004
    );
    detail_dummy.rotation.set(0, Math.PI / 2, ((i * 11) % 15) * 0.14);
    const sx = 0.55 + ((i * 5) % 10) / 8;
    const sy = 0.50 + ((i * 7) % 8) / 9;
    detail_dummy.scale.set(sx, sy, 1);
    detail_dummy.updateMatrix();
    crumb_holes_right.setMatrixAt(i, detail_dummy.matrix);
  }
  crumb_holes_right.instanceMatrix.needsUpdate = true;
  cut_face_details.add(crumb_holes_right);

  const crumb_highlights_frontGeom = new THREE.DodecahedronGeometry(0.012, 0);
  const crumb_highlights_front = new THREE.InstancedMesh(crumb_highlights_frontGeom, crumb_highlightMat, 48);
  crumb_highlights_front.name = "crumb_highlights_front";
  for (let i = 0; i < 48; i++) {
    const column = i % 12;
    const row = Math.floor(i / 12);
    detail_dummy.position.set(
      -0.40 + column * 0.073 + (((row * 3 + column * 5) % 7) - 3) * 0.004,
      -0.315 + row * 0.092 + (((column * 2 + row * 7) % 5) - 2) * 0.004,
      0.411
    );
    detail_dummy.rotation.set(i * 0.21, i * 0.33, i * 0.41);
    const s = 0.55 + ((i * 13) % 9) / 10;
    detail_dummy.scale.set(s, s * (0.75 + (i % 3) * 0.12), s * 0.45);
    detail_dummy.updateMatrix();
    crumb_highlights_front.setMatrixAt(i, detail_dummy.matrix);
  }
  crumb_highlights_front.instanceMatrix.needsUpdate = true;
  cut_face_details.add(crumb_highlights_front);

  const crumb_highlights_rightGeom = new THREE.DodecahedronGeometry(0.011, 0);
  const crumb_highlights_right = new THREE.InstancedMesh(crumb_highlights_rightGeom, crumb_highlightMat, 30);
  crumb_highlights_right.name = "crumb_highlights_right";
  for (let i = 0; i < 30; i++) {
    const column = i % 6;
    const row = Math.floor(i / 6);
    detail_dummy.position.set(
      0.523,
      -0.315 + row * 0.092 + (((column * 5 + row * 3) % 5) - 2) * 0.004,
      -0.31 + column * 0.125 + (((row * 3 + column * 2) % 5) - 2) * 0.004
    );
    detail_dummy.rotation.set(i * 0.19, i * 0.29, i * 0.37);
    const s = 0.55 + ((i * 11) % 8) / 10;
    detail_dummy.scale.set(s * 0.45, s * (0.75 + (i % 3) * 0.12), s);
    detail_dummy.updateMatrix();
    crumb_highlights_right.setMatrixAt(i, detail_dummy.matrix);
  }
  crumb_highlights_right.instanceMatrix.needsUpdate = true;
  cut_face_details.add(crumb_highlights_right);

  const cream_inclusions_frontGeom = new THREE.CircleGeometry(0.011, 9);
  const cream_inclusions_front = new THREE.InstancedMesh(cream_inclusions_frontGeom, cream_inclusionMat, 18);
  cream_inclusions_front.name = "cream_inclusions_front";
  for (let i = 0; i < 18; i++) {
    const column = i % 9;
    const row = Math.floor(i / 9);
    detail_dummy.position.set(
      -0.39 + column * 0.098 + (((column * 5 + row * 3) % 5) - 2) * 0.005,
      -0.135 + row * 0.055 + (((column * 3 + row * 7) % 5) - 2) * 0.004,
      0.408
    );
    detail_dummy.rotation.set(0, 0, ((i * 7) % 13) * 0.17);
    const sx = 0.65 + ((i * 5) % 7) / 6;
    const sy = 0.55 + ((i * 3) % 6) / 7;
    detail_dummy.scale.set(sx, sy, 1);
    detail_dummy.updateMatrix();
    cream_inclusions_front.setMatrixAt(i, detail_dummy.matrix);
  }
  cream_inclusions_front.instanceMatrix.needsUpdate = true;
  cut_face_details.add(cream_inclusions_front);

  const cream_inclusions_rightGeom = new THREE.CircleGeometry(0.01, 9);
  const cream_inclusions_right = new THREE.InstancedMesh(cream_inclusions_rightGeom, cream_inclusionMat, 10);
  cream_inclusions_right.name = "cream_inclusions_right";
  for (let i = 0; i < 10; i++) {
    const column = i % 5;
    const row = Math.floor(i / 5);
    detail_dummy.position.set(
      0.52,
      -0.135 + row * 0.055 + (((column * 2 + row * 5) % 5) - 2) * 0.004,
      -0.32 + column * 0.16 + (((row * 3 + column * 5) % 5) - 2) * 0.004
    );
    detail_dummy.rotation.set(0, Math.PI / 2, ((i * 5) % 11) * 0.17);
    const sx = 0.65 + ((i * 3) % 7) / 6;
    const sy = 0.55 + ((i * 7) % 6) / 7;
    detail_dummy.scale.set(sx, sy, 1);
    detail_dummy.updateMatrix();
    cream_inclusions_right.setMatrixAt(i, detail_dummy.matrix);
  }
  cream_inclusions_right.instanceMatrix.needsUpdate = true;
  cut_face_details.add(cream_inclusions_right);

  const ganache_specklesGeom = new THREE.CircleGeometry(0.006, 8);
  const ganache_speckles = new THREE.InstancedMesh(ganache_specklesGeom, ganache_speckleMat, 14);
  ganache_speckles.name = "ganache_speckles";
  for (let i = 0; i < 14; i++) {
    const column = i % 7;
    const row = Math.floor(i / 7);
    detail_dummy.position.set(
      -0.39 + column * 0.13 + (((column * 5 + row * 3) % 5) - 2) * 0.008,
      0.305 + row * 0.035 + (((column * 2 + row * 7) % 5) - 2) * 0.004,
      0.418
    );
    detail_dummy.rotation.set(0, 0, ((i * 9) % 13) * 0.19);
    const s = 0.55 + ((i * 5) % 7) / 8;
    detail_dummy.scale.set(s, s * 0.75, 1);
    detail_dummy.updateMatrix();
    ganache_speckles.setMatrixAt(i, detail_dummy.matrix);
  }
  ganache_speckles.instanceMatrix.needsUpdate = true;
  cut_face_details.add(ganache_speckles);

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


export default function generate(THREE) {
  const obj = __sn17_user(THREE);
  if (obj === null || obj === undefined) return obj;
  const root = new THREE.Group();
  const inner = new THREE.Group();
  inner.add(obj);
  root.add(inner);
  const box = new THREE.Box3().setFromObject(inner);
  const size = new THREE.Vector3(); box.getSize(size);
  const ctr = new THREE.Vector3(); box.getCenter(ctr);
  if (isFinite(ctr.x) && isFinite(ctr.y) && isFinite(ctr.z)) inner.position.sub(ctr);
  const m = Math.max(size.x, size.y, size.z);
  if (isFinite(m) && m > 0) root.scale.setScalar(0.98 / m);
  return root;
}
