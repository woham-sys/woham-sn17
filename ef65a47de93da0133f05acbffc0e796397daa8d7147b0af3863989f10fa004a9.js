function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "necklace";

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d5,
    metalness: 0.65,
    roughness: 0.2,
  });
  const darkSilverMat = new THREE.MeshStandardMaterial({
    color: 0x9fa1a3,
    metalness: 0.55,
    roughness: 0.28,
  });
  const centralGemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    flatShading: true,
    side: THREE.DoubleSide,
  });
  const sideGemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    flatShading: true,
    side: THREE.DoubleSide,
  });
  const diamondMat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf8ff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.06,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  function createFacetedPearGeometry(outline, palette, depth) {
    const positions = [];
    const colors = [];
    const color = new THREE.Color();

    function addTriangle(a, b, c, shade) {
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2]
      );
      color.setHex(palette[shade % palette.length]);
      for (let i = 0; i < 3; i++) {
        colors.push(color.r, color.g, color.b);
      }
    }

    const outerFront = [];
    const outerBack = [];
    const inner = [];

    for (let i = 0; i < outline.length; i++) {
      const x = outline[i][0];
      const y = outline[i][1];
      outerFront.push([x, y, 0]);
      outerBack.push([x, y, -depth * 0.12]);
      inner.push([
        x * 0.52,
        y * 0.52 + depth * 0.025,
        depth * (0.48 + (i % 2 === 0 ? 0.035 : -0.02)),
      ]);
    }

    const center = [0.015, -0.08, depth * 0.72];
    const count = outline.length;

    for (let i = 0; i < count; i++) {
      const j = (i + 1) % count;
      addTriangle(outerFront[i], outerFront[j], inner[j], i * 5 + 1);
      addTriangle(outerFront[i], inner[j], inner[i], i * 3 + 4);
      addTriangle(inner[i], inner[j], center, i * 7 + 2);
      addTriangle(outerFront[i], outerBack[i], outerBack[j], i + 6);
      addTriangle(outerFront[i], outerBack[j], outerFront[j], i + 8);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geometry.computeVertexNormals();
    return geometry;
  }

  function createRoundDiamondGeometry(radius, depth, segments, palette) {
    const positions = [];
    const colors = [];
    const color = new THREE.Color();

    function addTriangle(a, b, c, shade) {
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2]
      );
      color.setHex(palette[shade % palette.length]);
      for (let i = 0; i < 3; i++) {
        colors.push(color.r, color.g, color.b);
      }
    }

    const outer = [];
    const crown = [];
    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      outer.push([
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0,
      ]);
      crown.push([
        Math.cos(angle) * radius * 0.52,
        Math.sin(angle) * radius * 0.52,
        depth,
      ]);
    }

    const table = [0, 0, depth * 1.08];
    const pavilion = [0, 0, -depth * 0.55];

    for (let i = 0; i < segments; i++) {
      const j = (i + 1) % segments;
      addTriangle(table, crown[i], crown[j], i * 3);
      addTriangle(crown[i], outer[i], outer[j], i * 5 + 1);
      addTriangle(crown[i], outer[j], crown[j], i * 7 + 2);
      addTriangle(pavilion, outer[j], outer[i], i + 4);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geometry.computeVertexNormals();
    return geometry;
  }

  function createPearShape(scaleX, scaleY) {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.30 * scaleY);
    shape.bezierCurveTo(
      -0.12 * scaleX, 0.23 * scaleY,
      -0.25 * scaleX, 0.05 * scaleY,
      -0.24 * scaleX, -0.12 * scaleY
    );
    shape.bezierCurveTo(
      -0.23 * scaleX, -0.28 * scaleY,
      -0.10 * scaleX, -0.40 * scaleY,
      0, -0.46 * scaleY
    );
    shape.bezierCurveTo(
      0.10 * scaleX, -0.40 * scaleY,
      0.23 * scaleX, -0.28 * scaleY,
      0.24 * scaleX, -0.12 * scaleY
    );
    shape.bezierCurveTo(
      0.25 * scaleX, 0.05 * scaleY,
      0.12 * scaleX, 0.23 * scaleY,
      0, 0.30 * scaleY
    );
    return shape;
  }

  const chainLinkGeom = new THREE.TorusGeometry(0.027, 0.006, 8, 24);
  const chainCountPerSide = 18;
  const chain_links = new THREE.InstancedMesh(
    chainLinkGeom,
    silverMat,
    chainCountPerSide * 2
  );
  chain_links.name = "chain_links";

  const chainDummy = new THREE.Object3D();
  let chainIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < chainCountPerSide; i++) {
      const t = i / (chainCountPerSide - 1);
      const x = side * (0.34 + 0.38 * t + 0.025 * Math.sin(t * Math.PI));
      const y = 0.34 + 0.72 * t;
      const dx = side * (
        0.38 + 0.025 * Math.PI * Math.cos(t * Math.PI)
      );
      const dy = 0.72;
      const tangentAngle = Math.atan2(dy, dx);
      const tilt = i % 2 === 0 ? 0.22 : -0.22;

      chainDummy.position.set(x, y, -0.035);
      chainDummy.rotation.set(tilt, 0, tangentAngle - Math.PI / 2);
      chainDummy.scale.set(0.72, 1.28, 1.0);
      chainDummy.updateMatrix();
      chain_links.setMatrixAt(chainIndex++, chainDummy.matrix);
    }
  }
  chain_links.instanceMatrix.needsUpdate = true;
  root.add(chain_links);

  const bailGeom = new THREE.TorusGeometry(0.045, 0.008, 10, 28);

  const left_bail = new THREE.Mesh(bailGeom, silverMat);
  left_bail.name = "left_bail";
  left_bail.position.set(-0.34, 0.335, -0.025);
  left_bail.rotation.z = 0.42;
  left_bail.scale.set(0.72, 1.18, 1);
  root.add(left_bail);

  const right_bail = new THREE.Mesh(bailGeom, silverMat);
  right_bail.name = "right_bail";
  right_bail.position.set(0.34, 0.335, -0.025);
  right_bail.rotation.z = -0.42;
  right_bail.scale.set(0.72, 1.18, 1);
  root.add(right_bail);

  const connectorGeom = new THREE.TorusGeometry(0.032, 0.007, 8, 24);

  const left_connector = new THREE.Mesh(connectorGeom, silverMat);
  left_connector.name = "left_connector";
  left_connector.position.set(-0.305, 0.275, -0.018);
  left_connector.rotation.z = 0.55;
  left_connector.scale.set(0.72, 1.12, 1);
  root.add(left_connector);

  const right_connector = new THREE.Mesh(connectorGeom, silverMat);
  right_connector.name = "right_connector";
  right_connector.position.set(0.305, 0.275, -0.018);
  right_connector.rotation.z = -0.55;
  right_connector.scale.set(0.72, 1.12, 1);
  root.add(right_connector);

  const left_side_setting = new THREE.Mesh(
    new THREE.ExtrudeGeometry(createPearShape(1.08, 1.08), {
      step: 1,
      curveSegments: 24,
      depth: 0.025,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.006,
      bevelSegments: 2,
    }),
    silverMat
  );
  left_side_setting.name = "left_side_setting";
  left_side_setting.position.set(-0.245, 0.095, -0.025);
  left_side_setting.rotation.z = 0.48;
  root.add(left_side_setting);

  const right_side_setting = new THREE.Mesh(
    new THREE.ExtrudeGeometry(createPearShape(1.08, 1.08), {
      step: 1,
      curveSegments: 24,
      depth: 0.025,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.006,
      bevelSegments: 2,
    }),
    silverMat
  );
  right_side_setting.name = "right_side_setting";
  right_side_setting.position.set(0.245, 0.095, -0.025);
  right_side_setting.rotation.z = -0.48;
  root.add(right_side_setting);

  const left_side_gemstone = new THREE.Mesh(
    createFacetedPearGeometry(
      [
        [0, 0.27],
        [-0.10, 0.20],
        [-0.19, 0.07],
        [-0.20, -0.08],
        [-0.15, -0.20],
        [-0.06, -0.27],
        [0, -0.30],
        [0.06, -0.27],
        [0.15, -0.20],
        [0.20, -0.08],
        [0.19, 0.07],
        [0.10, 0.20],
      ],
      [0x062b70, 0x124ea8, 0x237bd0, 0x69bdf0, 0x173d8c],
      0.055
    ),
    sideGemstoneMat
  );
  left_side_gemstone.name = "left_side_gemstone";
  left_side_gemstone.position.set(-0.245, 0.095, 0.005);
  left_side_gemstone.rotation.z = 0.48;
  root.add(left_side_gemstone);

  const right_side_gemstone = new THREE.Mesh(
    createFacetedPearGeometry(
      [
        [0, 0.27],
        [-0.10, 0.20],
        [-0.19, 0.07],
        [-0.20, -0.08],
        [-0.15, -0.20],
        [-0.06, -0.27],
        [0, -0.30],
        [0.06, -0.27],
        [0.15, -0.20],
        [0.20, -0.08],
        [0.19, 0.07],
        [0.10, 0.20],
      ],
      [0x062b70, 0x124ea8, 0x237bd0, 0x69bdf0, 0x173d8c],
      0.055
    ),
    sideGemstoneMat
  );
  right_side_gemstone.name = "right_side_gemstone";
  right_side_gemstone.position.set(0.245, 0.095, 0.005);
  right_side_gemstone.rotation.z = -0.48;
  root.add(right_side_gemstone);

  const central_setting = new THREE.Mesh(
    new THREE.ExtrudeGeometry(createPearShape(1.07, 1.07), {
      step: 1,
      curveSegments: 32,
      depth: 0.035,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 2,
    }),
    silverMat
  );
  central_setting.name = "central_setting";
  central_setting.position.set(0, -0.22, -0.04);
  central_setting.scale.set(1.25, 1.25, 1);
  root.add(central_setting);

  const central_gemstone = new THREE.Mesh(
    createFacetedPearGeometry(
      [
        [0, 0.30],
        [-0.09, 0.25],
        [-0.18, 0.15],
        [-0.25, 0.02],
        [-0.28, -0.13],
        [-0.25, -0.28],
        [-0.17, -0.40],
        [-0.07, -0.49],
        [0, -0.53],
        [0.07, -0.49],
        [0.17, -0.40],
        [0.25, -0.28],
        [0.28, -0.13],
        [0.25, 0.02],
        [0.18, 0.15],
        [0.09, 0.25],
      ],
      [
        0x041b4d,
        0x0b3985,
        0x1458a8,
        0x2b84c9,
        0x65bdd8,
        0x102763,
        0x1f63b5,
      ],
      0.085
    ),
    centralGemstoneMat
  );
  central_gemstone.name = "central_gemstone";
  central_gemstone.position.set(0, -0.22, 0);
  central_gemstone.scale.set(1.25, 1.25, 1);
  root.add(central_gemstone);

  const left_diamond_setting = new THREE.Mesh(
    new THREE.CylinderGeometry(0.068, 0.068, 0.028, 20),
    silverMat
  );
  left_diamond_setting.name = "left_diamond_setting";
  left_diamond_setting.rotation.x = Math.PI / 2;
  left_diamond_setting.position.set(-0.335, -0.19, -0.002);
  root.add(left_diamond_setting);

  const right_diamond_setting = new THREE.Mesh(
    new THREE.CylinderGeometry(0.068, 0.068, 0.028, 20),
    silverMat
  );
  right_diamond_setting.name = "right_diamond_setting";
  right_diamond_setting.rotation.x = Math.PI / 2;
  right_diamond_setting.position.set(0.335, -0.19, -0.002);
  root.add(right_diamond_setting);

  const left_diamond = new THREE.Mesh(
    createRoundDiamondGeometry(
      0.052,
      0.034,
      12,
      [0xffffff, 0xd9f2ff, 0xbddfff, 0xf7fdff, 0xccecff]
    ),
    diamondMat
  );
  left_diamond.name = "left_diamond";
  left_diamond.position.set(-0.335, -0.19, 0.014);
  root.add(left_diamond);

  const right_diamond = new THREE.Mesh(
    createRoundDiamondGeometry(
      0.052,
      0.034,
      12,
      [0xffffff, 0xd9f2ff, 0xbddfff, 0xf7fdff, 0xccecff]
    ),
    diamondMat
  );
  right_diamond.name = "right_diamond";
  right_diamond.position.set(0.335, -0.19, 0.014);
  root.add(right_diamond);

  const prongGeom = new THREE.SphereGeometry(0.027, 16, 10);
  const prongPositions = [
    [0, 0.385, 0.072],
    [-0.35, 0.075, 0.072],
    [0.35, 0.075, 0.072],
    [-0.35, -0.19, 0.072],
    [0.35, -0.19, 0.072],
    [-0.32, -0.60, 0.072],
    [0.32, -0.60, 0.072],
    [0, -0.875, 0.072],
    [-0.405, 0.285, 0.058],
    [-0.405, -0.085, 0.058],
    [0.405, 0.285, 0.058],
    [0.405, -0.085, 0.058],
  ];
  const prongs = new THREE.InstancedMesh(
    prongGeom,
    silverMat,
    prongPositions.length
  );
  prongs.name = "prongs";

  const prongDummy = new THREE.Object3D();
  for (let i = 0; i < prongPositions.length; i++) {
    prongDummy.position.set(
      prongPositions[i][0],
      prongPositions[i][1],
      prongPositions[i][2]
    );
    prongDummy.rotation.set(0, 0, 0);
    prongDummy.scale.set(1, 1, 0.82);
    prongDummy.updateMatrix();
    prongs.setMatrixAt(i, prongDummy.matrix);
  }
  prongs.instanceMatrix.needsUpdate = true;
  root.add(prongs);

  const left_lower_gallery_rail = new THREE.Mesh(
    new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.31, -0.17, 0.035),
        new THREE.Vector3(-0.34, -0.36, 0.035),
        new THREE.Vector3(-0.29, -0.57, 0.035),
        new THREE.Vector3(-0.16, -0.73, 0.035),
      ]),
      24,
      0.009,
      8,
      false
    ),
    darkSilverMat
  );
  left_lower_gallery_rail.name = "left_lower_gallery_rail";
  root.add(left_lower_gallery_rail);

  const right_lower_gallery_rail = new THREE.Mesh(
    new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.31, -0.17, 0.035),
        new THREE.Vector3(0.34, -0.36, 0.035),
        new THREE.Vector3(0.29, -0.57, 0.035),
        new THREE.Vector3(0.16, -0.73, 0.035),
      ]),
      24,
      0.009,
      8,
      false
    ),
    darkSilverMat
  );
  right_lower_gallery_rail.name = "right_lower_gallery_rail";
  root.add(right_lower_gallery_rail);

  const left_upper_gallery_rail = new THREE.Mesh(
    new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.13, 0.13, 0.03),
        new THREE.Vector3(-0.23, 0.17, 0.03),
        new THREE.Vector3(-0.31, 0.24, 0.03),
      ]),
      12,
      0.008,
      8,
      false
    ),
    darkSilverMat
  );
  left_upper_gallery_rail.name = "left_upper_gallery_rail";
  root.add(left_upper_gallery_rail);

  const right_upper_gallery_rail = new THREE.Mesh(
    new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.13, 0.13, 0.03),
        new THREE.Vector3(0.23, 0.17, 0.03),
        new THREE.Vector3(0.31, 0.24, 0.03),
      ]),
      12,
      0.008,
      8,
      false
    ),
    darkSilverMat
  );
  right_upper_gallery_rail.name = "right_upper_gallery_rail";
  root.add(right_upper_gallery_rail);

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
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.98 / maxDim;
  root.scale.setScalar(scale);
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
