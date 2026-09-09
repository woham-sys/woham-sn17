function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "knife";

  const knife_assembly = new THREE.Group();
  knife_assembly.name = "knife_assembly";
  root.add(knife_assembly);

  const blade_group = new THREE.Group();
  blade_group.name = "blade_group";
  knife_assembly.add(blade_group);

  const handle_group = new THREE.Group();
  handle_group.name = "handle_group";
  knife_assembly.add(handle_group);

  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0xd7d9da,
    metalness: 0.45,
    roughness: 0.28
  });

  const cutting_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xf0f1f1,
    metalness: 0.4,
    roughness: 0.2,
    side: THREE.DoubleSide
  });

  const bolsterMat = new THREE.MeshStandardMaterial({
    color: 0xcfd1d2,
    metalness: 0.5,
    roughness: 0.25
  });

  const bolster_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x343638,
    metalness: 0.3,
    roughness: 0.5
  });

  const handle_coreMat = new THREE.MeshStandardMaterial({
    color: 0x17191c,
    metalness: 0.0,
    roughness: 0.95
  });

  const handle_fuzzMat = new THREE.MeshStandardMaterial({
    color: 0x303238,
    metalness: 0.0,
    roughness: 0.95
  });

  const blade_logoMat = new THREE.LineBasicMaterial({
    color: 0x4b4b48
  });

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-3.0, -0.08);
  bladeShape.bezierCurveTo(-2.68, 0.04, -2.28, 0.20, -1.82, 0.31);
  bladeShape.bezierCurveTo(-1.05, 0.45, -0.30, 0.51, 0.16, 0.49);
  bladeShape.lineTo(0.36, 0.42);
  bladeShape.lineTo(0.36, -0.30);
  bladeShape.bezierCurveTo(0.12, -0.31, -0.06, -0.45, -0.34, -0.50);
  bladeShape.bezierCurveTo(-1.18, -0.48, -2.18, -0.29, -2.78, -0.12);
  bladeShape.bezierCurveTo(-2.91, -0.10, -2.98, -0.09, -3.0, -0.08);
  bladeShape.closePath();

  const bladeThickness = 0.075;
  const bladeOffsetY = 0.015;
  const bladeGeom = new THREE.ExtrudeGeometry(bladeShape, {
    curveSegments: 24,
    steps: 1,
    depth: bladeThickness,
    z: -bladeThickness / 2
  });
  bladeGeom.translate(0, 0, -bladeThickness / 2);
  bladeGeom.rotateX(Math.PI / 2);
  bladeGeom.computeVertexNormals();

  const blade = new THREE.Mesh(bladeGeom, bladeMat);
  blade.name = "blade";
  blade.position.y = bladeOffsetY;
  blade_group.add(blade);

  const cutting_edgeShape = new THREE.Shape();
  cutting_edgeShape.moveTo(-2.96, -0.085);
  cutting_edgeShape.bezierCurveTo(-2.35, -0.18, -1.35, -0.36, -0.36, -0.47);
  cutting_edgeShape.bezierCurveTo(-0.12, -0.49, 0.08, -0.40, 0.24, -0.31);
  cutting_edgeShape.lineTo(0.16, -0.235);
  cutting_edgeShape.bezierCurveTo(-0.04, -0.33, -0.20, -0.39, -0.39, -0.39);
  cutting_edgeShape.bezierCurveTo(-1.35, -0.37, -2.30, -0.19, -2.88, -0.075);
  cutting_edgeShape.closePath();

  const cutting_edgeGeom = new THREE.ShapeGeometry(cutting_edgeShape, 20);
  cutting_edgeGeom.rotateX(Math.PI / 2);

  const cutting_edge = new THREE.Mesh(cutting_edgeGeom, cutting_edgeMat);
  cutting_edge.name = "cutting_edge";
  cutting_edge.position.y = bladeOffsetY + bladeThickness / 2 + 0.004;
  blade_group.add(cutting_edge);

  const bolsterShape = new THREE.Shape();
  bolsterShape.moveTo(0.10, 0.42);
  bolsterShape.lineTo(0.38, 0.42);
  bolsterShape.quadraticCurveTo(0.47, 0.42, 0.47, 0.33);
  bolsterShape.lineTo(0.47, -0.29);
  bolsterShape.quadraticCurveTo(0.47, -0.37, 0.38, -0.38);
  bolsterShape.lineTo(0.12, -0.38);
  bolsterShape.quadraticCurveTo(0.04, -0.38, 0.04, -0.29);
  bolsterShape.lineTo(0.04, 0.33);
  bolsterShape.quadraticCurveTo(0.04, 0.42, 0.13, 0.42);
  bolsterShape.closePath();

  const bolsterThickness = 0.14;
  const bolsterGeom = new THREE.ExtrudeGeometry(bolsterShape, {
    curveSegments: 16,
    steps: 1,
    depth: bolsterThickness,
    z: -bolsterThickness / 2
  });
  bolsterGeom.translate(0, 0, -bolsterThickness / 2);
  bolsterGeom.rotateX(Math.PI / 2);
  bolsterGeom.computeVertexNormals();

  const bolster = new THREE.Mesh(bolsterGeom, bolsterMat);
  bolster.name = "bolster";
  bolster.position.y = 0.02;
  knife_assembly.add(bolster);

  const bolster_shadowGeom = new THREE.BoxGeometry(0.018, 0.012, 0.68);
  const bolster_shadow = new THREE.Mesh(bolster_shadowGeom, bolster_shadowMat);
  bolster_shadow.name = "bolster_shadow";
  bolster_shadow.position.set(0.478, 0.095, 0.01);
  knife_assembly.add(bolster_shadow);

  const handleLength = 1.85;
  const handleStart = 0.36;
  const handleCenter = handleStart + handleLength / 2;
  const handleEnd = handleStart + handleLength;
  const handleRadius = 0.36;

  const handle_tangGeom = new THREE.CylinderGeometry(0.27, 0.27, 0.22, 24);
  const handle_tang = new THREE.Mesh(handle_tangGeom, bolsterMat);
  handle_tang.name = "handle_tang";
  handle_tang.rotation.z = Math.PI / 2;
  handle_tang.position.set(0.42, 0.02, 0);
  handle_group.add(handle_tang);

  const handle_coreGeom = new THREE.CylinderGeometry(
    handleRadius,
    handleRadius,
    handleLength,
    32,
    1,
    false
  );
  const handle_core = new THREE.Mesh(handle_coreGeom, handle_coreMat);
  handle_core.name = "handle_core";
  handle_core.rotation.z = Math.PI / 2;
  handle_core.position.set(handleCenter, 0.02, 0);
  handle_group.add(handle_core);

  const handle_front_capGeom = new THREE.SphereGeometry(handleRadius, 32, 16);
  const handle_front_cap = new THREE.Mesh(handle_front_capGeom, handle_coreMat);
  handle_front_cap.name = "handle_front_cap";
  handle_front_cap.scale.set(0.50, 1.0, 1.0);
  handle_front_cap.position.set(handleStart, 0.02, 0);
  handle_group.add(handle_front_cap);

  const handle_end_capGeom = new THREE.SphereGeometry(handleRadius, 32, 16);
  const handle_end_cap = new THREE.Mesh(handle_end_capGeom, handle_coreMat);
  handle_end_cap.name = "handle_end_cap";
  handle_end_cap.scale.set(0.50, 1.0, 1.0);
  handle_end_cap.position.set(handleEnd, 0.02, 0);
  handle_group.add(handle_end_cap);

  const handle_front_seamGeom = new THREE.TorusGeometry(
    handleRadius * 0.985,
    0.012,
    8,
    32
  );
  const handle_front_seam = new THREE.Mesh(handle_front_seamGeom, handle_fuzzMat);
  handle_front_seam.name = "handle_front_seam";
  handle_front_seam.rotation.y = Math.PI / 2;
  handle_front_seam.position.set(handleStart + 0.012, 0.02, 0);
  handle_group.add(handle_front_seam);

  const handle_fuzzGeom = new THREE.CylinderGeometry(0.0035, 0.0035, 0.10, 5);
  const fuzzRows = 28;
  const fuzzAround = 20;
  const handle_fuzz = new THREE.InstancedMesh(
    handle_fuzzGeom,
    handle_fuzzMat,
    fuzzRows * fuzzAround
  );
  handle_fuzz.name = "handle_fuzz";

  const fuzzDummy = new THREE.Object3D();
  const fuzzAxis = new THREE.Vector3(0, 1, 0);
  const fuzzDirection = new THREE.Vector3();
  let fuzzIndex = 0;

  for (let row = 0; row < fuzzRows; row++) {
    const tx = (row + 0.5) / fuzzRows;
    const baseX = handleStart + 0.06 + tx * (handleLength - 0.12);

    for (let around = 0; around < fuzzAround; around++) {
      const angle =
        around / fuzzAround * Math.PI * 2 +
        row * 0.173;
      const radialY = Math.cos(angle);
      const radialZ = Math.sin(angle);
      const lean = (((row * 7 + around * 3) % 9) - 4) * 0.035;
      const lengthScale = 0.72 + ((row * 5 + around * 7) % 6) * 0.08;

      fuzzDirection.set(lean, radialY, radialZ).normalize();
      fuzzDummy.position.set(
        baseX,
        0.02 + radialY * (handleRadius + 0.025),
        radialZ * (handleRadius + 0.025)
      );
      fuzzDummy.quaternion.setFromUnitVectors(fuzzAxis, fuzzDirection);
      fuzzDummy.scale.set(1, lengthScale, 1);
      fuzzDummy.updateMatrix();
      handle_fuzz.setMatrixAt(fuzzIndex, fuzzDummy.matrix);
      fuzzIndex++;
    }
  }
  handle_fuzz.instanceMatrix.needsUpdate = true;
  handle_group.add(handle_fuzz);

  const logoPositions = [];
  const logoY = bladeOffsetY + bladeThickness / 2 + 0.011;

  function addLogoSegment(x1, z1, x2, z2) {
    logoPositions.push(x1, logoY, z1, x2, logoY, z2);
  }

  function addLogoLetter(letter, ox, oz, w, h) {
    const left = ox;
    const right = ox + w;
    const bottom = oz;
    const middle = oz + h * 0.5;
    const top = oz + h;

    if (letter === "D") {
      addLogoSegment(left, bottom, left, top);
      addLogoSegment(left, top, right - 0.15, top);
      addLogoSegment(right - 0.15, top, right, top - 0.18);
      addLogoSegment(right, top - 0.18, right, bottom + 0.18);
      addLogoSegment(right, bottom + 0.18, right - 0.15, bottom);
      addLogoSegment(right - 0.15, bottom, left, bottom);
    } else if (letter === "I") {
      addLogoSegment(left, top, right, top);
      addLogoSegment((left + right) * 0.5, top, (left + right) * 0.5, bottom);
      addLogoSegment(left, bottom, right, bottom);
    } else if (letter === "N") {
      addLogoSegment(left, bottom, left, top);
      addLogoSegment(left, top, right, bottom);
      addLogoSegment(right, bottom, right, top);
    } else if (letter === "O") {
      addLogoSegment(left, bottom, left, top);
      addLogoSegment(left, top, right, top);
      addLogoSegment(right, top, right, bottom);
      addLogoSegment(right, bottom, left, bottom);
    } else if (letter === "W") {
      addLogoSegment(left, top, left + w * 0.22, bottom);
      addLogoSegment(left + w * 0.22, bottom, left + w * 0.50, top - 0.12);
      addLogoSegment(left + w * 0.50, top - 0.12, left + w * 0.78, bottom);
      addLogoSegment(left + w * 0.78, bottom, right, top);
    } else if (letter === "E") {
      addLogoSegment(left, bottom, left, top);
      addLogoSegment(left, top, right, top);
      addLogoSegment(left, middle, right * 0.98 + left * 0.02, middle);
      addLogoSegment(left, bottom, right, bottom);
    }
  }

  const logoWord = ["D", "I", "N", "O", "W", "E"];
  const logoLetterWidth = 0.052;
  const logoGap = 0.012;
  const logoHeight = 0.105;
  const logoStartX = -0.34;
  const logoBaseZ = -0.10;

  for (let i = 0; i < logoWord.length; i++) {
    addLogoLetter(
      logoWord[i],
      logoStartX + i * (logoLetterWidth + logoGap),
      logoBaseZ,
      logoLetterWidth,
      logoHeight
    );
  }

  addLogoSegment(-0.31, -0.122, 0.10, -0.122);
  addLogoSegment(-0.27, -0.137, 0.06, -0.137);

  const blade_logoGeom = new THREE.BufferGeometry();
  blade_logoGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(logoPositions, 3)
  );
  const blade_logo = new THREE.LineSegments(blade_logoGeom, blade_logoMat);
  blade_logo.name = "blade_logo";
  blade_group.add(blade_logo);

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
