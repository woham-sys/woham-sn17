function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "antique_thermometer";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  root.add(base_group);

  const dial_group = new THREE.Group();
  dial_group.name = "dial_group";
  root.add(dial_group);

  const stem_group = new THREE.Group();
  stem_group.name = "stem_group";
  root.add(stem_group);

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a3c,
    metalness: 0.65,
    roughness: 0.32
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x705522,
    metalness: 0.55,
    roughness: 0.42
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d2,
    metalness: 0.55,
    roughness: 0.28
  });
  const blackMetalMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.45,
    roughness: 0.35
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0xe8dfbd,
    metalness: 0.0,
    roughness: 0.85
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x171716,
    metalness: 0.0,
    roughness: 0.9
  });
  const redInkMat = new THREE.MeshStandardMaterial({
    color: 0x8b1f1f,
    metalness: 0.0,
    roughness: 0.8
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
    metalness: 0.0,
    roughness: 0.15,
    depthWrite: false
  });
  const liquidMat = new THREE.MeshStandardMaterial({
    color: 0x7a2525,
    metalness: 0.0,
    roughness: 0.35
  });
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.28,
    depthWrite: false
  });

  const baseProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.48, 0.00),
    new THREE.Vector2(0.55, 0.015),
    new THREE.Vector2(0.585, 0.045),
    new THREE.Vector2(0.59, 0.075),
    new THREE.Vector2(0.565, 0.105),
    new THREE.Vector2(0.49, 0.13),
    new THREE.Vector2(0.00, 0.13)
  ];
  const baseGeom = new THREE.LatheGeometry(baseProfile, 64);
  const base = new THREE.Mesh(baseGeom, brassMat);
  base.name = "base";
  base_group.add(base);

  const base_edge_ringGeom = new THREE.TorusGeometry(0.565, 0.012, 10, 64);
  const base_edge_ring = new THREE.Mesh(base_edge_ringGeom, darkBrassMat);
  base_edge_ring.name = "base_edge_ring";
  base_edge_ring.rotation.x = Math.PI / 2;
  base_edge_ring.position.y = 0.055;
  base_group.add(base_edge_ring);

  const pedestalGeom = new THREE.CylinderGeometry(0.24, 0.27, 0.10, 48);
  const pedestal = new THREE.Mesh(pedestalGeom, darkBrassMat);
  pedestal.name = "pedestal";
  pedestal.position.y = 0.17;
  base_group.add(pedestal);

  const pedestal_ringGeom = new THREE.TorusGeometry(0.245, 0.018, 10, 48);
  const pedestal_ring = new THREE.Mesh(pedestal_ringGeom, brassMat);
  pedestal_ring.name = "pedestal_ring";
  pedestal_ring.rotation.x = Math.PI / 2;
  pedestal_ring.position.y = 0.215;
  base_group.add(pedestal_ring);

  const dialY = 0.62;

  const dial_caseGeom = new THREE.CylinderGeometry(0.43, 0.43, 0.16, 64);
  const dial_case = new THREE.Mesh(dial_caseGeom, darkBrassMat);
  dial_case.name = "dial_case";
  dial_case.rotation.x = Math.PI / 2;
  dial_case.position.set(0, dialY, 0);
  dial_group.add(dial_case);

  const dial_faceGeom = new THREE.CircleGeometry(0.355, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, dialMat);
  dial_face.name = "dial_face";
  dial_face.position.set(0, dialY, 0.083);
  dial_group.add(dial_face);

  const outer_bezelGeom = new THREE.TorusGeometry(0.385, 0.045, 16, 72);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, brassMat);
  outer_bezel.name = "outer_bezel";
  outer_bezel.position.set(0, dialY, 0.105);
  dial_group.add(outer_bezel);

  const inner_bezelGeom = new THREE.TorusGeometry(0.348, 0.008, 8, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, darkBrassMat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.set(0, dialY, 0.119);
  dial_group.add(inner_bezel);

  const minor_tickGeom = new THREE.BoxGeometry(0.0045, 0.026, 0.004);
  const major_tickGeom = new THREE.BoxGeometry(0.007, 0.047, 0.005);
  const minor_ticks = new THREE.InstancedMesh(minor_tickGeom, inkMat, 48);
  const major_ticks = new THREE.InstancedMesh(major_tickGeom, inkMat, 12);
  minor_ticks.name = "minor_ticks";
  major_ticks.name = "major_ticks";

  const tickDummy = new THREE.Object3D();
  let minorIndex = 0;
  let majorIndex = 0;
  for (let i = 0; i < 60; i++) {
    const angle = i / 60 * Math.PI * 2;
    const isMajor = i % 5 === 0;
    const radius = isMajor ? 0.316 : 0.326;
    tickDummy.position.set(
      Math.sin(angle) * radius,
      dialY + Math.cos(angle) * radius,
      0.091
    );
    tickDummy.rotation.set(0, 0, -angle);
    tickDummy.updateMatrix();
    if (isMajor) {
      major_ticks.setMatrixAt(majorIndex++, tickDummy.matrix);
    } else {
      minor_ticks.setMatrixAt(minorIndex++, tickDummy.matrix);
    }
  }
  minor_ticks.instanceMatrix.needsUpdate = true;
  major_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(minor_ticks, major_ticks);

  const digitMap = {
    "0": ["a", "b", "c", "d", "e", "f"],
    "1": ["b", "c"],
    "2": ["a", "b", "g", "e", "d"],
    "3": ["a", "b", "c", "d", "g"],
    "4": ["f", "g", "b", "c"],
    "5": ["a", "f", "g", "c", "d"],
    "6": ["a", "f", "g", "e", "c", "d"],
    "7": ["a", "b", "c"],
    "8": ["a", "b", "c", "d", "e", "f", "g"],
    "9": ["a", "b", "c", "d", "f", "g"]
  };
  const segmentData = {
    a: [0, 0.018, 1],
    b: [0.011, 0.009, 0],
    c: [0.011, -0.009, 0],
    d: [0, -0.018, 1],
    e: [-0.011, -0.009, 0],
    f: [-0.011, 0.009, 0],
    g: [0, 0, 1]
  };
  const labelSpecs = [
    ["10", -Math.PI / 2],
    ["20", -0.78],
    ["30", -0.38],
    ["40", 0.00],
    ["50", 0.38],
    ["60", 0.78],
    ["70", Math.PI / 2],
    ["80", Math.PI],
    ["90", -2.76],
    ["0", -2.36]
  ];
  const numeralSegments = [];
  const digitSpacing = 0.027;
  for (const spec of labelSpecs) {
    const text = spec[0];
    const angle = spec[1];
    const radialX = Math.sin(angle);
    const radialY = Math.cos(angle);
    const tangentX = Math.cos(angle);
    const tangentY = -Math.sin(angle);
    for (let digitIndex = 0; digitIndex < text.length; digitIndex++) {
      const digit = text[digitIndex];
      const digitOffset = (digitIndex - (text.length - 1) / 2) * digitSpacing;
      const segments = digitMap[digit];
      for (const segmentName of segments) {
        const segment = segmentData[segmentName];
        const localU = digitOffset + segment[0];
        const localV = segment[1];
        numeralSegments.push({
          x: radialX * (0.255 + localV) + tangentX * localU,
          y: dialY + radialY * (0.255 + localV) + tangentY * localU,
          rotation: segment[2] ? -angle : Math.PI / 2 - angle,
          length: segment[2] ? 0.018 : 0.014
        });
      }
    }
  }

  const numeral_segmentGeom = new THREE.BoxGeometry(1, 1, 1);
  const numeral_segments = new THREE.InstancedMesh(
    numeral_segmentGeom,
    inkMat,
    numeralSegments.length
  );
  numeral_segments.name = "numeral_segments";
  const numeralDummy = new THREE.Object3D();
  for (let i = 0; i < numeralSegments.length; i++) {
    const segment = numeralSegments[i];
    numeralDummy.position.set(segment.x, segment.y, 0.093);
    numeralDummy.rotation.set(0, 0, segment.rotation);
    numeralDummy.scale.set(segment.length, 0.0035, 0.003);
    numeralDummy.updateMatrix();
    numeral_segments.setMatrixAt(i, numeralDummy.matrix);
  }
  numeral_segments.instanceMatrix.needsUpdate = true;
  dial_group.add(numeral_segments);

  const red_scale_markGeom = new THREE.BoxGeometry(0.035, 0.004, 0.003);
  const red_scale_marks = new THREE.InstancedMesh(red_scale_markGeom, redInkMat, 3);
  red_scale_marks.name = "red_scale_marks";
  const redMarkDummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    redMarkDummy.position.set(0.075 + i * 0.012, dialY + 0.115 - i * 0.004, 0.095);
    redMarkDummy.rotation.set(0, 0, -0.15);
    redMarkDummy.scale.set(1 - i * 0.22, 1, 1);
    redMarkDummy.updateMatrix();
    red_scale_marks.setMatrixAt(i, redMarkDummy.matrix);
  }
  red_scale_marks.instanceMatrix.needsUpdate = true;
  dial_group.add(red_scale_marks);

  const maker_markGeom = new THREE.BoxGeometry(0.018, 0.003, 0.003);
  const maker_marks = new THREE.InstancedMesh(maker_markGeom, inkMat, 4);
  maker_marks.name = "maker_marks";
  const makerDummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    makerDummy.position.set(-0.055 + i * 0.012, dialY - 0.105 - i * 0.003, 0.095);
    makerDummy.rotation.set(0, 0, i % 2 === 0 ? 0 : 0.25);
    makerDummy.scale.set(0.65 + i * 0.1, 1, 1);
    makerDummy.updateMatrix();
    maker_marks.setMatrixAt(i, makerDummy.matrix);
  }
  maker_marks.instanceMatrix.needsUpdate = true;
  dial_group.add(maker_marks);

  const needleShape = new THREE.Shape();
  needleShape.moveTo(-0.012, -0.055);
  needleShape.lineTo(0.012, -0.055);
  needleShape.lineTo(0.006, 0.245);
  needleShape.lineTo(0.000, 0.285);
  needleShape.lineTo(-0.006, 0.245);
  needleShape.closePath();
  const needleGeom = new THREE.ShapeGeometry(needleShape);
  const needle = new THREE.Mesh(needleGeom, inkMat);
  needle.name = "needle";
  needle.position.set(0, dialY, 0.101);
  needle.rotation.z = 0.62;
  dial_group.add(needle);

  const center_hub_outerGeom = new THREE.CylinderGeometry(0.043, 0.043, 0.018, 32);
  const center_hub_outer = new THREE.Mesh(center_hub_outerGeom, blackMetalMat);
  center_hub_outer.name = "center_hub_outer";
  center_hub_outer.rotation.x = Math.PI / 2;
  center_hub_outer.position.set(0, dialY, 0.108);
  dial_group.add(center_hub_outer);

  const center_hub_innerGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.021, 24);
  const center_hub_inner = new THREE.Mesh(center_hub_innerGeom, brassMat);
  center_hub_inner.name = "center_hub_inner";
  center_hub_inner.rotation.x = Math.PI / 2;
  center_hub_inner.position.set(0, dialY, 0.119);
  dial_group.add(center_hub_inner);

  const center_pinGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.024, 16);
  const center_pin = new THREE.Mesh(center_pinGeom, silverMat);
  center_pin.name = "center_pin";
  center_pin.rotation.x = Math.PI / 2;
  center_pin.position.set(0, dialY, 0.132);
  dial_group.add(center_pin);

  const lower_portGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.012, 20);
  const lower_port = new THREE.Mesh(lower_portGeom, blackMetalMat);
  lower_port.name = "lower_port";
  lower_port.rotation.x = Math.PI / 2;
  lower_port.position.set(0, dialY - 0.19, 0.101);
  dial_group.add(lower_port);

  const dial_glassGeom = new THREE.CircleGeometry(0.342, 64);
  const dial_glass = new THREE.Mesh(dial_glassGeom, glassMat);
  dial_glass.name = "dial_glass";
  dial_glass.position.set(0, dialY, 0.137);
  dial_group.add(dial_glass);

  const glass_highlightGeom = new THREE.TorusGeometry(0.285, 0.004, 6, 32, 1.05);
  const glass_highlight = new THREE.Mesh(glass_highlightGeom, highlightMat);
  glass_highlight.name = "glass_highlight";
  glass_highlight.position.set(0, dialY, 0.141);
  glass_highlight.rotation.z = 1.72;
  dial_group.add(glass_highlight);

  const socket_baseGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.045, 40);
  const socket_base = new THREE.Mesh(socket_baseGeom, brassMat);
  socket_base.name = "socket_base";
  socket_base.position.y = 1.045;
  stem_group.add(socket_base);

  const socket_ringGeom = new THREE.TorusGeometry(0.075, 0.012, 10, 40);
  const socket_ring = new THREE.Mesh(socket_ringGeom, darkBrassMat);
  socket_ring.name = "socket_ring";
  socket_ring.rotation.x = Math.PI / 2;
  socket_ring.position.y = 1.075;
  stem_group.add(socket_ring);

  const lower_tubeGeom = new THREE.CylinderGeometry(0.047, 0.052, 2.18, 40);
  const lower_tube = new THREE.Mesh(lower_tubeGeom, silverMat);
  lower_tube.name = "lower_tube";
  lower_tube.position.y = 2.16;
  stem_group.add(lower_tube);

  const lower_tube_highlightGeom = new THREE.BoxGeometry(0.009, 2.02, 0.004);
  const lower_tube_highlight = new THREE.Mesh(lower_tube_highlightGeom, highlightMat);
  lower_tube_highlight.name = "lower_tube_highlight";
  lower_tube_highlight.position.set(-0.018, 2.16, 0.047);
  stem_group.add(lower_tube_highlight);

  const upper_collarGeom = new THREE.CylinderGeometry(0.052, 0.072, 0.12, 40);
  const upper_collar = new THREE.Mesh(upper_collarGeom, blackMetalMat);
  upper_collar.name = "upper_collar";
  upper_collar.position.y = 3.285;
  stem_group.add(upper_collar);

  const collar_bandGeom = new THREE.TorusGeometry(0.058, 0.007, 8, 32);
  const collar_band = new THREE.Mesh(collar_bandGeom, silverMat);
  collar_band.name = "collar_band";
  collar_band.rotation.x = Math.PI / 2;
  collar_band.position.y = 3.34;
  stem_group.add(collar_band);

  const upper_tubeGeom = new THREE.CylinderGeometry(0.030, 0.034, 0.72, 36);
  const upper_tube = new THREE.Mesh(upper_tubeGeom, silverMat);
  upper_tube.name = "upper_tube";
  upper_tube.position.y = 3.70;
  stem_group.add(upper_tube);

  const upper_tube_highlightGeom = new THREE.BoxGeometry(0.006, 0.66, 0.003);
  const upper_tube_highlight = new THREE.Mesh(upper_tube_highlightGeom, highlightMat);
  upper_tube_highlight.name = "upper_tube_highlight";
  upper_tube_highlight.position.set(-0.011, 3.70, 0.031);
  stem_group.add(upper_tube_highlight);

  const top_capGeom = new THREE.SphereGeometry(0.032, 28, 14);
  const top_cap = new THREE.Mesh(top_capGeom, silverMat);
  top_cap.name = "top_cap";
  top_cap.position.y = 4.06;
  top_cap.scale.set(1, 0.72, 1);
  stem_group.add(top_cap);

  const top_insetGeom = new THREE.CircleGeometry(0.010, 16);
  const top_inset = new THREE.Mesh(top_insetGeom, blackMetalMat);
  top_inset.name = "top_inset";
  top_inset.position.set(0, 4.065, 0.031);
  stem_group.add(top_inset);

  const liquid_columnGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.16, 12);
  const liquid_column = new THREE.Mesh(liquid_columnGeom, liquidMat);
  liquid_column.name = "liquid_column";
  liquid_column.position.set(0, 1.18, 0.012);
  stem_group.add(liquid_column);

  const liquid_bulbGeom = new THREE.SphereGeometry(0.018, 16, 8);
  const liquid_bulb = new THREE.Mesh(liquid_bulbGeom, liquidMat);
  liquid_bulb.name = "liquid_bulb";
  liquid_bulb.position.set(0, 1.095, 0.012);
  liquid_bulb.scale.set(0.8, 1.25, 0.8);
  stem_group.add(liquid_bulb);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.98 / maxDim;
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
