function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "measuring_tape";

  const tapeLength = 5.0;
  const tapeWidth = 0.48;
  const tapeThickness = 0.035;
  const tapeY = 0.02;

  const yellowMat = new THREE.MeshStandardMaterial({
    color: 0xffd800,
    metalness: false,
    roughness: 0.3,
  });
  const darkYellowMat = new THREE.MeshStandardMaterial({
    color: 0xd9ad00,
    metalness: false,
    roughness: 0.35,
  });
  const tapeMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ee,
    metalness: false,
    roughness: 0.45,
  });
  const blackInkMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: false,
    roughness: 0.55,
  });
  const redInkMat = new THREE.MeshStandardMaterial({
    color: 0xe51f2a,
    metalness: false,
    roughness: 0.5,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xb8b8b0,
    metalness: true,
    roughness: 0.25,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x5f5f59,
    metalness: true,
    roughness: 0.35,
  });

  const tape_group = new THREE.Group();
  tape_group.name = "tape_group";
  root.add(tape_group);

  const tape_blade_geom = new THREE.BoxGeometry(tapeLength, tapeThickness, tapeWidth);
  const tape_blade = new THREE.Mesh(tape_blade_geom, tapeMat);
  tape_blade.name = "tape_blade";
  tape_blade.position.set(0, tapeY, 0);
  tape_group.add(tape_blade);

  const tape_edge_geom = new THREE.BoxGeometry(tapeLength, 0.012, 0.018);

  const front_tape_edge = new THREE.Mesh(tape_edge_geom, darkMetalMat);
  front_tape_edge.name = "front_tape_edge";
  front_tape_edge.position.set(0, tapeY + tapeThickness * 0.55, tapeWidth * 0.5 - 0.008);
  tape_group.add(front_tape_edge);

  const rear_tape_edge = new THREE.Mesh(tape_edge_geom, darkMetalMat);
  rear_tape_edge.name = "rear_tape_edge";
  rear_tape_edge.position.set(0, tapeY + tapeThickness * 0.55, -tapeWidth * 0.5 + 0.008);
  tape_group.add(rear_tape_edge);

  const tickCountPerSide = 121;
  const tick_marks_geom = new THREE.BoxGeometry(1, 1, 1);
  const tick_marks = new THREE.InstancedMesh(tick_marks_geom, blackInkMat, tickCountPerSide * 2);
  tick_marks.name = "tick_marks";

  const tickDummy = new THREE.Object3D();
  let tickIndex = 0;
  for (let i = 0; i < tickCountPerSide; i++) {
    const x = -tapeLength * 0.5 + 0.12 + (tapeLength - 0.24) * (i / (tickCountPerSide - 1));
    let tickLength = 0.07;
    if (i % 10 === 0) tickLength = 0.19;
    else if (i % 5 === 0) tickLength = 0.145;
    else if (i % 2 === 0) tickLength = 0.095;

    tickDummy.position.set(x, tapeY + tapeThickness * 0.58, tapeWidth * 0.5 - tickLength * 0.5 - 0.012);
    tickDummy.rotation.set(0, 0, 0);
    tickDummy.scale.set(0.009, 0.006, tickLength);
    tickDummy.updateMatrix();
    tick_marks.setMatrixAt(tickIndex++, tickDummy.matrix);

    tickDummy.position.set(x, tapeY + tapeThickness * 0.58, -tapeWidth * 0.5 + tickLength * 0.5 + 0.012);
    tickDummy.updateMatrix();
    tick_marks.setMatrixAt(tickIndex++, tickDummy.matrix);
  }
  tick_marks.instanceMatrix.needsUpdate = true;
  tape_group.add(tick_marks);

  const digitMap = {
    "0": ["a", "b", "c", "d", "e", "f"],
    "1": ["b", "c"],
    "2": ["a", "b", "g", "e", "d"],
    "3": ["a", "b", "g", "c", "d"],
    "4": ["f", "g", "b", "c"],
    "5": ["a", "f", "g", "c", "d"],
    "6": ["a", "f", "g", "e", "c", "d"],
    "7": ["a", "b", "c"],
    "8": ["a", "b", "c", "d", "e", "f", "g"],
    "9": ["a", "b", "c", "d", "f", "g"],
  };

  const blackSegmentData = [];
  const redSegmentData = [];
  const digitW = 0.058;
  const digitH = 0.112;
  const segmentT = 0.011;
  const verticalLength = 0.047;

  function addDigit(target, digit, centerX, centerZ) {
    const active = digitMap[digit];
    for (const segment of active) {
      let x = centerX;
      let z = centerZ;
      let sx = digitW;
      let sz = segmentT;

      if (segment === "a") z -= digitH * 0.5;
      if (segment === "g") z = centerZ;
      if (segment === "d") z += digitH * 0.5;

      if (segment === "b" || segment === "c" || segment === "e" || segment === "f") {
        sx = segmentT;
        sz = verticalLength;
        if (segment === "b") {
          x += digitW * 0.5;
          z -= digitH * 0.25;
        }
        if (segment === "c") {
          x += digitW * 0.5;
          z += digitH * 0.25;
        }
        if (segment === "e") {
          x -= digitW * 0.5;
          z += digitH * 0.25;
        }
        if (segment === "f") {
          x -= digitW * 0.5;
          z -= digitH * 0.25;
        }
      }
      target.push({ x, z, sx, sz });
    }
  }

  for (let number = 1; number <= 12; number++) {
    const x = -tapeLength * 0.5 + 0.42 + (number - 1) * ((tapeLength - 0.84) / 11);
    const label = String(number);
    for (let j = 0; j < label.length; j++) {
      const digitOffset = (j - (label.length - 1) * 0.5) * 0.083;
      const isRed = number % 3 === 0;
      addDigit(isRed ? redSegmentData : blackSegmentData, label[j], x + digitOffset, -0.015);
    }
  }

  const measurement_numbers_geom = new THREE.BoxGeometry(1, 1, 1);

  function createNumberMesh(data, material, name) {
    const mesh = new THREE.InstancedMesh(measurement_numbers_geom, material, data.length);
    mesh.name = name;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      dummy.position.set(item.x, tapeY + tapeThickness * 0.66, item.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(item.sx, 0.006, item.sz);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const black_measurement_numbers = createNumberMesh(blackSegmentData, blackInkMat, "black_measurement_numbers");
  tape_group.add(black_measurement_numbers);

  const red_measurement_numbers = createNumberMesh(redSegmentData, redInkMat, "red_measurement_numbers");
  tape_group.add(red_measurement_numbers);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(-0.30, -0.28);
  handleShape.bezierCurveTo(-0.43, -0.25, -0.49, -0.12, -0.50, 0.08);
  handleShape.bezierCurveTo(-0.51, 0.28, -0.38, 0.40, -0.18, 0.42);
  handleShape.lineTo(0.18, 0.42);
  handleShape.bezierCurveTo(0.38, 0.40, 0.51, 0.28, 0.50, 0.08);
  handleShape.bezierCurveTo(0.49, -0.12, 0.43, -0.25, 0.30, -0.28);
  handleShape.lineTo(0.18, -0.29);
  handleShape.lineTo(-0.18, -0.29);
  handleShape.closePath();

  const handleHole = new THREE.Path();
  handleHole.moveTo(-0.20, 0.02);
  handleHole.lineTo(0.20, 0.02);
  handleHole.quadraticCurveTo(0.28, 0.02, 0.28, 0.10);
  handleHole.lineTo(0.28, 0.20);
  handleHole.quadraticCurveTo(0.28, 0.28, 0.20, 0.28);
  handleHole.lineTo(-0.20, 0.28);
  handleHole.quadraticCurveTo(-0.28, 0.28, -0.28, 0.20);
  handleHole.lineTo(-0.28, 0.10);
  handleHole.quadraticCurveTo(-0.28, 0.02, -0.20, 0.02);
  handleHole.closePath();
  handleShape.holes.push(handleHole);

  const handle_body_geom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.13,
    steps: 1,
    curveSegments: 16,
  });

  const left_handle = new THREE.Mesh(handle_body_geom, yellowMat);
  left_handle.name = "left_handle";
  left_handle.rotation.x = Math.PI / 2;
  left_handle.position.set(-2.68, 0.14, 0);
  root.add(left_handle);

  const right_handle = new THREE.Mesh(handle_body_geom, yellowMat);
  right_handle.name = "right_handle";
  right_handle.rotation.x = Math.PI / 2;
  right_handle.scale.x = -1;
  right_handle.position.set(2.68, 0.14, 0);
  root.add(right_handle);

  const handle_lip_geom = new THREE.CapsuleGeometry(0.07, 0.50, 8, 20);

  const left_handle_lip = new THREE.Mesh(handle_lip_geom, yellowMat);
  left_handle_lip.name = "left_handle_lip";
  left_handle_lip.rotation.z = Math.PI / 2;
  left_handle_lip.scale.set(0.55, 1, 1);
  left_handle_lip.position.set(-2.68, 0.115, 0.34);
  root.add(left_handle_lip);

  const right_handle_lip = new THREE.Mesh(handle_lip_geom, yellowMat);
  right_handle_lip.name = "right_handle_lip";
  right_handle_lip.rotation.z = Math.PI / 2;
  right_handle_lip.scale.set(0.55, 1, 1);
  right_handle_lip.position.set(2.68, 0.115, 0.34);
  root.add(right_handle_lip);

  const handle_recess_geom = new THREE.BoxGeometry(0.43, 0.012, 0.20);

  const left_handle_recess = new THREE.Mesh(handle_recess_geom, darkYellowMat);
  left_handle_recess.name = "left_handle_recess";
  left_handle_recess.position.set(-2.68, 0.146, 0.15);
  root.add(left_handle_recess);

  const right_handle_recess = new THREE.Mesh(handle_recess_geom, darkYellowMat);
  right_handle_recess.name = "right_handle_recess";
  right_handle_recess.position.set(2.68, 0.146, 0.15);
  root.add(right_handle_recess);

  const rivet_base_geom = new THREE.CylinderGeometry(0.095, 0.095, 0.025, 24);
  const rivet_dome_geom = new THREE.SphereGeometry(0.068, 20, 10);
  const rivet_slot_geom = new THREE.BoxGeometry(0.075, 0.008, 0.014);

  function createRivet(name, x) {
    const rivet = new THREE.Group();
    rivet.name = name;
    rivet.position.set(x, 0, 0);

    const base = new THREE.Mesh(rivet_base_geom, silverMat);
    base.position.y = 0.158;
    rivet.add(base);

    const dome = new THREE.Mesh(rivet_dome_geom, silverMat);
    dome.scale.set(1, 0.34, 1);
    dome.position.y = 0.178;
    rivet.add(dome);

    const slot = new THREE.Mesh(rivet_slot_geom, darkMetalMat);
    slot.position.y = 0.201;
    rivet.add(slot);

    return rivet;
  }

  const left_rivet = createRivet("left_rivet", -2.53);
  root.add(left_rivet);

  const right_rivet = createRivet("right_rivet", 2.53);
  root.add(right_rivet);

  const end_mark_geom = new THREE.BoxGeometry(1, 1, 1);
  const red_end_marks = new THREE.InstancedMesh(end_mark_geom, redInkMat, 3);
  red_end_marks.name = "red_end_marks";
  const markDummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    markDummy.position.set(-2.39 + i * 0.035, tapeY + tapeThickness * 0.66, -0.075);
    markDummy.scale.set(0.012, 0.006, 0.105);
    markDummy.updateMatrix();
    red_end_marks.setMatrixAt(i, markDummy.matrix);
  }
  red_end_marks.instanceMatrix.needsUpdate = true;
  tape_group.add(red_end_marks);

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
