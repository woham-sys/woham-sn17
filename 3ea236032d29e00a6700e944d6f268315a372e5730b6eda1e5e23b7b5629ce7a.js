function __sn17_user(THREE) {
  const root = new THREE.Group();
  const tool_group = new THREE.Group();
  root.add(tool_group);

  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0xb8b8b2,
    metalness: 0.7,
    roughness: 0.35,
  });
  const blade_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xe0e0dc,
    metalness: 0.8,
    roughness: 0.22,
    side: THREE.DoubleSide,
  });
  const tangMat = new THREE.MeshStandardMaterial({
    color: 0x777777,
    metalness: 0.7,
    roughness: 0.45,
  });
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.8,
  });
  const pivotMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0d0,
    metalness: 0.8,
    roughness: 0.25,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x555555,
    metalness: 0.5,
    roughness: 0.55,
  });

  function makeExtrudedGeometry(shape, depth, bevelSize, bevelThickness) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      curveSegments: 16,
      step: 1,
      depth,
      bevelEnabled: true,
      bevelSize,
      bevelThickness,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const tangShape = new THREE.Shape();
  tangShape.moveTo(-0.13, 0.17);
  tangShape.lineTo(0.13, 0.17);
  tangShape.lineTo(0.105, -0.34);
  tangShape.lineTo(-0.105, -0.34);
  tangShape.closePath();

  const tangGeom = makeExtrudedGeometry(tangShape, 0.045, 0.006, 0.006);
  const tang = new THREE.Mesh(tangGeom, tangMat);
  tang.position.z = -0.025;
  tool_group.add(tang);

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-0.125, -0.27);
  bladeShape.lineTo(-0.165, -0.10);
  bladeShape.lineTo(-0.17, 0.55);
  bladeShape.quadraticCurveTo(-0.16, 0.82, -0.105, 1.03);
  bladeShape.quadraticCurveTo(-0.065, 1.16, 0, 1.22);
  bladeShape.quadraticCurveTo(0.065, 1.16, 0.105, 1.03);
  bladeShape.quadraticCurveTo(0.16, 0.82, 0.17, 0.55);
  bladeShape.lineTo(0.165, -0.10);
  bladeShape.lineTo(0.125, -0.27);
  bladeShape.closePath();

  const bladeGeom = makeExtrudedGeometry(bladeShape, 0.032, 0.012, 0.01);
  const blade = new THREE.Mesh(bladeGeom, bladeMat);
  blade.position.z = 0.006;
  tool_group.add(blade);

  const blade_spineShape = new THREE.Shape();
  blade_spineShape.moveTo(-0.125, -0.26);
  blade_spineShape.lineTo(-0.165, -0.10);
  blade_spineShape.lineTo(-0.17, 0.55);
  blade_spineShape.quadraticCurveTo(-0.16, 0.82, -0.105, 1.03);
  blade_spineShape.quadraticCurveTo(-0.065, 1.16, 0, 1.22);
  blade_spineShape.lineTo(-0.018, 1.105);
  blade_spineShape.quadraticCurveTo(-0.055, 0.98, -0.075, 0.78);
  blade_spineShape.lineTo(-0.082, -0.18);
  blade_spineShape.closePath();

  const blade_spineGeom = new THREE.ShapeGeometry(blade_spineShape, 16);
  const blade_spine = new THREE.Mesh(blade_spineGeom, engravingMat);
  blade_spine.position.z = 0.034;
  tool_group.add(blade_spine);

  const blade_edgeShape = new THREE.Shape();
  blade_edgeShape.moveTo(0.125, -0.26);
  blade_edgeShape.lineTo(0.165, -0.10);
  blade_edgeShape.lineTo(0.17, 0.55);
  blade_edgeShape.quadraticCurveTo(0.16, 0.82, 0.105, 1.03);
  blade_edgeShape.quadraticCurveTo(0.065, 1.16, 0, 1.22);
  blade_edgeShape.lineTo(0.018, 1.105);
  blade_edgeShape.quadraticCurveTo(0.055, 0.98, 0.075, 0.78);
  blade_edgeShape.lineTo(0.082, -0.18);
  blade_edgeShape.closePath();

  const blade_edgeGeom = new THREE.ShapeGeometry(blade_edgeShape, 16);
  const blade_edge = new THREE.Mesh(blade_edgeGeom, blade_edgeMat);
  blade_edge.position.z = 0.035;
  tool_group.add(blade_edge);

  const handlePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.115, -0.29, -0.045),
      new THREE.Vector3(-0.18, -0.47, -0.045),
      new THREE.Vector3(-0.23, -0.72, -0.045),
      new THREE.Vector3(-0.22, -0.98, -0.045),
      new THREE.Vector3(-0.13, -1.18, -0.045),
      new THREE.Vector3(0, -1.27, -0.045),
      new THREE.Vector3(0.13, -1.18, -0.045),
      new THREE.Vector3(0.22, -0.98, -0.045),
      new THREE.Vector3(0.23, -0.72, -0.045),
      new THREE.Vector3(0.18, -0.47, -0.045),
      new THREE.Vector3(0.115, -0.29, -0.045),
    ],
    false,
    "centripetal"
  );

  const handle_loopGeom = new THREE.TubeGeometry(handlePath, 72, 0.052, 18, false);
  const handle_loop = new THREE.Mesh(handle_loopGeom, handleMat);
  tool_group.add(handle_loop);

  const left_handle_collarGeom = new THREE.CylinderGeometry(0.062, 0.055, 0.11, 18);
  const left_handle_collar = new THREE.Mesh(left_handle_collarGeom, handleMat);
  left_handle_collar.position.set(-0.115, -0.31, -0.045);
  left_handle_collar.rotation.z = -0.18;
  tool_group.add(left_handle_collar);

  const right_handle_collarGeom = left_handle_collarGeom;
  const right_handle_collar = new THREE.Mesh(right_handle_collarGeom, handleMat);
  right_handle_collar.position.set(0.115, -0.31, -0.045);
  right_handle_collar.rotation.z = 0.18;
  tool_group.add(right_handle_collar);

  const pivot_washerGeom = new THREE.CylinderGeometry(0.073, 0.073, 0.014, 32);
  const pivot_washer = new THREE.Mesh(pivot_washerGeom, engravingMat);
  pivot_washer.rotation.x = Math.PI / 2;
  pivot_washer.position.set(0, -0.055, 0.038);
  tool_group.add(pivot_washer);

  const pivot_rivetGeom = new THREE.SphereGeometry(0.066, 32, 16);
  const pivot_rivet = new THREE.Mesh(pivot_rivetGeom, pivotMat);
  pivot_rivet.scale.set(1, 1, 0.34);
  pivot_rivet.position.set(0, -0.055, 0.052);
  tool_group.add(pivot_rivet);

  const maker_mark = new THREE.Group();

  const maker_mark_stemGeom = new THREE.BoxGeometry(0.007, 0.045, 0.004);
  const maker_mark_stem = new THREE.Mesh(maker_mark_stemGeom, engravingMat);
  maker_mark_stem.position.set(-0.025, 0.075, 0.036);
  maker_mark.add(maker_mark_stem);

  const maker_mark_topGeom = new THREE.BoxGeometry(0.032, 0.006, 0.004);
  const maker_mark_top = new THREE.Mesh(maker_mark_topGeom, engravingMat);
  maker_mark_top.position.set(-0.012, 0.097, 0.036);
  maker_mark.add(maker_mark_top);

  const maker_mark_middleGeom = new THREE.BoxGeometry(0.025, 0.006, 0.004);
  const maker_mark_middle = new THREE.Mesh(maker_mark_middleGeom, engravingMat);
  maker_mark_middle.position.set(-0.015, 0.078, 0.036);
  maker_mark.add(maker_mark_middle);

  const maker_mark_slashGeom = new THREE.BoxGeometry(0.006, 0.038, 0.004);
  const maker_mark_slash = new THREE.Mesh(maker_mark_slashGeom, engravingMat);
  maker_mark_slash.position.set(0.018, 0.075, 0.036);
  maker_mark_slash.rotation.z = -0.48;
  maker_mark.add(maker_mark_slash);

  tool_group.add(maker_mark);

  tool_group.rotation.set(-0.08, 0.08, -0.72);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);
  root.position.sub(center);
  const maxDim = Math.max(size.x, size.y, size.z);
  if (maxDim > 0) {
    const scale = 0.98 / maxDim;
    root.scale.setScalar(scale);
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
