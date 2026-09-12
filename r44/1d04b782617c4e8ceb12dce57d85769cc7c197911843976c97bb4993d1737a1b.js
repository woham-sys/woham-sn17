// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "engraved_plaque";

  const plaque_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xb8ad98,
    metalness: 0.6,
    roughness: 0.5,
  });
  const front_panelMat = new THREE.MeshStandardMaterial({
    color: 0xc5baa2,
    metalness: 0.6,
    roughness: 0.5,
  });
  const edge_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xd4cbb5,
    metalness: 0.6,
    roughness: 0.2,
  });
  const edge_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x8f846f,
    metalness: 0.6,
    roughness: 0.5,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x403526,
    metalness: 0.0,
    roughness: 0.7,
  });
  const brushed_grainMat = new THREE.LineBasicMaterial({
    color: 0xe1d8c7,
    transparent: true,
    opacity: 0.18,
  });

  function roundedRectShape(width, height, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    return shape;
  }

  const plaque_bodyGeom = new THREE.ExtrudeGeometry(
    roundedRectShape(1.60, 1.00, 0.045),
    {
      depth: 0.055,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 3,
      curveSegments: 10,
    }
  );
  const plaque_body = new THREE.Mesh(plaque_bodyGeom, plaque_bodyMat);
  plaque_body.name = "plaque_body";
  plaque_body.position.z = -0.0275;
  root.add(plaque_body);

  const front_panelGeom = new THREE.ExtrudeGeometry(
    roundedRectShape(1.52, 0.92, 0.032),
    {
      depth: 0.006,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.006,
      bevelSegments: 2,
      curveSegments: 10,
    }
  );
  const front_panel = new THREE.Mesh(front_panelGeom, front_panelMat);
  front_panel.name = "front_panel";
  front_panel.position.z = 0.039;
  root.add(front_panel);

  const brushed_grain_positions = [];
  for (let i = 0; i < 180; i++) {
    const y = -0.425 + (i / 179) * 0.85;
    const x0 = -0.70 + (((i * 37) % 101) / 100) * 1.25;
    const length = 0.025 + ((i * 19) % 9) * 0.006;
    const x1 = Math.min(0.71, x0 + length);
    const tilt = (((i * 13) % 7) - 3) * 0.0015;
    brushed_grain_positions.push(x0, y, 0.0505, x1, y + tilt, 0.0505);
  }
  const brushed_grainGeom = new THREE.BufferGeometry();
  brushed_grainGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(brushed_grain_positions, 3)
  );
  const brushed_grain = new THREE.LineSegments(
    brushed_grainGeom,
    brushed_grainMat
  );
  brushed_grain.name = "brushed_grain";
  root.add(brushed_grain);

  const top_edge_highlightGeom = new THREE.BoxGeometry(1.43, 0.010, 0.008);
  const top_edge_highlight = new THREE.Mesh(
    top_edge_highlightGeom,
    edge_highlightMat
  );
  top_edge_highlight.name = "top_edge_highlight";
  top_edge_highlight.position.set(0, 0.473, 0.043);
  root.add(top_edge_highlight);

  const left_edge_highlightGeom = new THREE.BoxGeometry(0.010, 0.86, 0.008);
  const left_edge_highlight = new THREE.Mesh(
    left_edge_highlightGeom,
    edge_highlightMat
  );
  left_edge_highlight.name = "left_edge_highlight";
  left_edge_highlight.position.set(-0.758, 0, 0.043);
  root.add(left_edge_highlight);

  const bottom_edge_shadowGeom = new THREE.BoxGeometry(1.43, 0.012, 0.010);
  const bottom_edge_shadow = new THREE.Mesh(
    bottom_edge_shadowGeom,
    edge_shadowMat
  );
  bottom_edge_shadow.name = "bottom_edge_shadow";
  bottom_edge_shadow.position.set(0, -0.486, 0.035);
  root.add(bottom_edge_shadow);

  const right_edge_shadowGeom = new THREE.BoxGeometry(0.012, 0.86, 0.010);
  const right_edge_shadow = new THREE.Mesh(
    right_edge_shadowGeom,
    edge_shadowMat
  );
  right_edge_shadow.name = "right_edge_shadow";
  right_edge_shadow.position.set(0.758, 0, 0.035);
  root.add(right_edge_shadow);

  const glyphs = {
    " ": [],
    "A": [
      [0, 0, 0.5, 1], [0.5, 1, 1, 0], [0.22, 0.45, 0.78, 0.45],
    ],
    "B": [
      [0, 0, 0, 1], [0, 1, 0.62, 1], [0.62, 1, 0.86, 0.82],
      [0.86, 0.82, 0.86, 0.62], [0.86, 0.62, 0.62, 0.50],
      [0, 0.50, 0.62, 0.50], [0.62, 0.50, 0.90, 0.35],
      [0.90, 0.35, 0.90, 0.16], [0.90, 0.16, 0.62, 0],
      [0.62, 0, 0, 0],
    ],
    "C": [
      [0.90, 0.88, 0.70, 1], [0.70, 1, 0.20, 1],
      [0.20, 1, 0, 0.78], [0, 0.78, 0, 0.22],
      [0, 0.22, 0.20, 0], [0.20, 0, 0.75, 0],
      [0.75, 0, 0.92, 0.13],
    ],
    "D": [
      [0, 0, 0, 1], [0, 1, 0.60, 1], [0.60, 1, 0.90, 0.75],
      [0.90, 0.75, 0.90, 0.25], [0.90, 0.25, 0.60, 0],
      [0.60, 0, 0, 0],
    ],
    "E": [
      [0, 0, 0, 1], [0, 1, 1, 1],
      [0, 0.50, 0.82, 0.50], [0, 0, 1, 0],
    ],
    "F": [
      [0, 0, 0, 1], [0, 1, 1, 1],
      [0, 0.50, 0.82, 0.50],
    ],
    "G": [
      [0.90, 0.86, 0.72, 1], [0.72, 1, 0.20, 1],
      [0.20, 1, 0, 0.78], [0, 0.78, 0, 0.22],
      [0, 0.22, 0.20, 0], [0.20, 0, 0.78, 0],
      [0.78, 0, 0.92, 0.18], [0.92, 0.18, 0.92, 0.48],
      [0.92, 0.48, 0.55, 0.48],
    ],
    "H": [
      [0, 0, 0, 1], [1, 0, 1, 1],
      [0, 0.50, 1, 0.50],
    ],
    "I": [
      [0, 1, 1, 1], [0.5, 1, 0.5, 0], [0, 0, 1, 0],
    ],
    "J": [
      [0.15, 1, 1, 1], [0.78, 1, 0.78, 0.20],
      [0.78, 0.20, 0.60, 0], [0.60, 0, 0.22, 0],
      [0.22, 0, 0.06, 0.18],
    ],
    "K": [
      [0, 0, 0, 1], [0, 0.48, 1, 1],
      [0, 0.48, 1, 0],
    ],
    "L": [
      [0, 1, 0, 0], [0, 0, 1, 0],
    ],
    "M": [
      [0, 0, 0, 1], [0, 1, 0.5, 0.48],
      [0.5, 0.48, 1, 1], [1, 1, 1, 0],
    ],
    "N": [
      [0, 0, 0, 1], [0, 1, 1, 0], [1, 0, 1, 1],
    ],
    "O": [
      [0.22, 0, 0.78, 0], [0.78, 0, 1, 0.22],
      [1, 0.22, 1, 0.78], [1, 0.78, 0.78, 1],
      [0.78, 1, 0.22, 1], [0.22, 1, 0, 0.78],
      [0, 0.78, 0, 0.22], [0, 0.22, 0.22, 0],
    ],
    "P": [
      [0, 0, 0, 1], [0, 1, 0.68, 1],
      [0.68, 1, 0.90, 0.80], [0.90, 0.80, 0.90, 0.62],
      [0.90, 0.62, 0.68, 0.48], [0.68, 0.48, 0, 0.48],
    ],
    "Q": [
      [0.22, 0, 0.78, 0], [0.78, 0, 1, 0.22],
      [1, 0.22, 1, 0.78], [1, 0.78, 0.78, 1],
      [0.78, 1, 0.22, 1], [0.22, 1, 0, 0.78],
      [0, 0.78, 0, 0.22], [0, 0.22, 0.22, 0],
      [0.58, 0.30, 1.02, -0.08],
    ],
    "R": [
      [0, 0, 0, 1], [0, 1, 0.68, 1],
      [0.68, 1, 0.90, 0.80], [0.90, 0.80, 0.90, 0.62],
      [0.90, 0.62, 0.68, 0.48], [0.68, 0.48, 0, 0.48],
      [0.52, 0.48, 1, 0],
    ],
    "S": [
      [0.90, 0.86, 0.72, 1], [0.72, 1, 0.20, 1],
      [0.20, 1, 0, 0.80], [0, 0.80, 0.20, 0.55],
      [0.20, 0.55, 0.78, 0.45], [0.78, 0.45, 1, 0.20],
      [1, 0.20, 0.80, 0], [0.80, 0, 0.20, 0],
      [0.20, 0, 0, 0.14],
    ],
    "T": [
      [0, 1, 1, 1], [0.5, 1, 0.5, 0],
    ],
    "U": [
      [0, 1, 0, 0.22], [0, 0.22, 0.22, 0],
      [0.22, 0, 0.78, 0], [0.78, 0, 1, 0.22],
      [1, 0.22, 1, 1],
    ],
    "V": [
      [0, 1, 0.5, 0], [0.5, 0, 1, 1],
    ],
    "W": [
      [0, 1, 0.22, 0], [0.22, 0, 0.5, 0.55],
      [0.5, 0.55, 0.78, 0], [0.78, 0, 1, 1],
    ],
    "X": [
      [0, 1, 1, 0], [1, 1, 0, 0],
    ],
    "Y": [
      [0, 1, 0.5, 0.52], [1, 1, 0.5, 0.52],
      [0.5, 0.52, 0.5, 0],
    ],
    "Z": [
      [0, 1, 1, 1], [1, 1, 0, 0], [0, 0, 1, 0],
    ],
    "0": [
      [0.20, 0, 0.80, 0], [0.80, 0, 1, 0.20],
      [1, 0.20, 1, 0.80], [1, 0.80, 0.80, 1],
      [0.80, 1, 0.20, 1], [0.20, 1, 0, 0.80],
      [0, 0.80, 0, 0.20], [0, 0.20, 0.20, 0],
    ],
    "1": [
      [0.25, 0.78, 0.5, 1], [0.5, 1, 0.5, 0],
      [0.20, 0, 0.80, 0],
    ],
    "2": [
      [0, 0.80, 0.20, 1], [0.20, 1, 0.80, 1],
      [0.80, 1, 1, 0.80], [1, 0.80, 0, 0],
      [0, 0, 1, 0],
    ],
    "3": [
      [0, 1, 0.80, 1], [0.80, 1, 1, 0.80],
      [1, 0.80, 0.75, 0.52], [0.75, 0.52, 1, 0.25],
      [1, 0.25, 0.80, 0], [0.80, 0, 0, 0],
      [0.48, 0.50, 0.88, 0.50],
    ],
    "4": [
      [0.78, 0, 0.78, 1], [0.78, 1, 0, 0.35],
      [0, 0.35, 1, 0.35],
    ],
    "5": [
      [1, 1, 0, 1], [0, 1, 0, 0.52],
      [0, 0.52, 0.78, 0.52], [0.78, 0.52, 1, 0.30],
      [1, 0.30, 1, 0.18], [1, 0.18, 0.78, 0],
      [0.78, 0, 0, 0],
    ],
    "6": [
      [0.92, 0.90, 0.72, 1], [0.72, 1, 0.20, 1],
      [0.20, 1, 0, 0.75], [0, 0.75, 0, 0.20],
      [0, 0.20, 0.20, 0], [0.20, 0, 0.78, 0],
      [0.78, 0, 1, 0.20], [1, 0.20, 1, 0.38],
      [1, 0.38, 0.78, 0.50], [0.78, 0.50, 0, 0.50],
    ],
    "7": [
      [0, 1, 1, 1], [1, 1, 0.32, 0],
    ],
    "8": [
      [0.20, 0, 0.80, 0], [0.80, 0, 1, 0.20],
      [1, 0.20, 0.82, 0.50], [0.82, 0.50, 1, 0.78],
      [1, 0.78, 0.80, 1], [0.80, 1, 0.20, 1],
      [0.20, 1, 0, 0.78], [0, 0.78, 0.18, 0.50],
      [0.18, 0.50, 0, 0.22], [0, 0.22, 0.20, 0],
      [0.18, 0.50, 0.82, 0.50],
    ],
    "9": [
      [0.20, 1, 0.80, 1], [0.80, 1, 1, 0.80],
      [1, 0.80, 1, 0.20], [1, 0.20, 0.78, 0],
      [0.78, 0, 0.20, 0], [0.20, 0, 0, 0.20],
      [0, 0.20, 0.18, 0.50], [0.18, 0.50, 1, 0.50],
    ],
    "'": [
      [0.58, 1, 0.42, 0.72],
    ],
    ",": [
      [0.52, 0.12, 0.38, -0.08],
    ],
    ".": [
      [0.40, 0.02, 0.60, 0.02],
    ],
    "-": [
      [0, 0.50, 1, 0.50],
    ],
    ":": [
      [0.40, 0.68, 0.60, 0.68], [0.40, 0.32, 0.60, 0.32],
    ],
  };

  function createStrokeText(
    text,
    height,
    aspect,
    thickness,
    depth,
    material,
    centerX,
    baselineY,
    z,
    name
  ) {
    const advance = 1.22;
    const spaceAdvance = 0.68;
    let totalAdvance = 0;
    let count = 0;

    for (let i = 0; i < text.length; i++) {
      const character = text[i];
      totalAdvance += character === " " ? spaceAdvance : advance;
      const segments = glyphs[character] || glyphs[" "];
      count += segments.length;
    }

    totalAdvance -= characterAdvance(text[text.length - 1]);
    const startX = centerX - totalAdvance * height * aspect / 2;
    const strokeGeom = new THREE.BoxGeometry(1, 1, 1);
    const stroke_text = new THREE.InstancedMesh(
      strokeGeom,
      material,
      count
    );
    stroke_text.name = name;

    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    const zAxis = new THREE.Vector3(0, 0, 1);
    let cursor = 0;
    let instanceIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const character = text[i];
      const segments = glyphs[character] || glyphs[" "];
      const characterWidth =
        (character === " " ? spaceAdvance : advance) * height * aspect;

      for (let j = 0; j < segments.length; j++) {
        const segment = segments[j];
        const x1 = startX + (cursor + segment[0]) * height * aspect;
        const y1 = baselineY + segment[1] * height;
        const x2 = startX + (cursor + segment[2]) * height * aspect;
        const y2 = baselineY + segment[3] * height;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);

        position.set((x1 + x2) / 2, (y1 + y2) / 2, z);
        quaternion.setFromAxisAngle(zAxis, Math.atan2(dy, dx));
        scale.set(length + thickness * 0.35, thickness, depth);
        matrix.compose(position, quaternion, scale);
        stroke_text.setMatrixAt(instanceIndex, matrix);
        instanceIndex++;
      }
      cursor += character === " " ? spaceAdvance : advance;
    }

    stroke_text.instanceMatrix.needsUpdate = true;
    return stroke_text;
  }

  function characterAdvance(character) {
    return character === " " ? 0.68 : 1.22;
  }

  const title_engraving = createStrokeText(
    "WINNER' ENON FER",
    0.115,
    0.72,
    0.006,
    0.004,
    engravingMat,
    0,
    0.155,
    0.050,
    "title_engraving"
  );
  root.add(title_engraving);

  const date_engraving = createStrokeText(
    "2:00-1",
    0.082,
    0.72,
    0.005,
    0.004,
    engravingMat,
    0,
    -0.005,
    0.050,
    "date_engraving"
  );
  root.add(date_engraving);

  const subtitle_engraving = createStrokeText(
    "YARK YTOO PAERTI EVERL, SIOEC-AIDT",
    0.043,
    0.72,
    0.0032,
    0.003,
    engravingMat,
    0,
    -0.285,
    0.050,
    "subtitle_engraving"
  );
  root.add(subtitle_engraving);

  const fine_print_line_one = createStrokeText(
    "FAEM CTNRABASHEEM",
    0.030,
    0.72,
    0.0024,
    0.0025,
    engravingMat,
    0.02,
    -0.333,
    0.050,
    "fine_print_line_one"
  );
  root.add(fine_print_line_one);

  const fine_print_line_two = createStrokeText(
    "EIFIMIGKNG RE 183. 208 00132.",
    0.030,
    0.72,
    0.0024,
    0.0025,
    engravingMat,
    0,
    -0.373,
    0.050,
    "fine_print_line_two"
  );
  root.add(fine_print_line_two);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}