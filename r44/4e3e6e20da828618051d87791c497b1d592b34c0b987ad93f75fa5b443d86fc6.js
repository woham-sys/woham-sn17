// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "black_numbered_band";

  const outerR = 1.5;
  const innerR = 1.27;
  const bandH = 0.72;
  const bevel = 0.045;
  const decalR = outerR + bevel + 0.008;

  const band_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x0b0b0b,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });

  const band_bodyProfile = [
    new THREE.Vector2(innerR + bevel, -bandH / 2),
    new THREE.Vector2(outerR - bevel, -bandH / 2),
    new THREE.Vector2(outerR, -bandH / 2 + bevel),
    new THREE.Vector2(outerR, bandH / 2 - bevel),
    new THREE.Vector2(outerR - bevel, bandH / 2),
    new THREE.Vector2(innerR + bevel, bandH / 2),
    new THREE.Vector2(innerR, bandH / 2 - bevel),
    new THREE.Vector2(innerR, -bandH / 2 + bevel),
    new THREE.Vector2(innerR + bevel, -bandH / 2)
  ];
  const band_bodyGeom = new THREE.LatheGeometry(band_bodyProfile, 96);
  const band_body = new THREE.Mesh(band_bodyGeom, band_bodyMat);
  band_body.name = "band_body";
  root.add(band_body);

  const edge_rimMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.95
  });

  const top_outer_rimGeom = new THREE.TorusGeometry(
    outerR - bevel,
    bevel,
    10,
    96
  );
  const top_outer_rim = new THREE.Mesh(top_outer_rimGeom, edge_rimMat);
  top_outer_rim.name = "top_outer_rim";
  top_outer_rim.rotation.x = Math.PI / 2;
  top_outer_rim.position.y = bandH / 2 - bevel;
  root.add(top_outer_rim);

  const bottom_outer_rimGeom = top_outer_rimGeom;
  const bottom_outer_rim = new THREE.Mesh(bottom_outer_rimGeom, edge_rimMat);
  bottom_outer_rim.name = "bottom_outer_rim";
  bottom_outer_rim.rotation.x = Math.PI / 2;
  bottom_outer_rim.position.y = -bandH / 2 + bevel;
  root.add(bottom_outer_rim);

  const top_inner_rimGeom = new THREE.TorusGeometry(
    innerR + bevel,
    bevel,
    10,
    96
  );
  const top_inner_rim = new THREE.Mesh(top_inner_rimGeom, edge_rimMat);
  top_inner_rim.name = "top_inner_rim";
  top_inner_rim.rotation.x = Math.PI / 2;
  top_inner_rim.position.y = bandH / 2 - bevel;
  root.add(top_inner_rim);

  const bottom_inner_rimGeom = top_inner_rimGeom;
  const bottom_inner_rim = new THREE.Mesh(bottom_inner_rimGeom, edge_rimMat);
  bottom_inner_rim.name = "bottom_inner_rim";
  bottom_inner_rim.rotation.x = Math.PI / 2;
  bottom_inner_rim.position.y = -bandH / 2 + bevel;
  root.add(bottom_inner_rim);

  const printed_graphicsMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ee,
    metalness: 0.0,
    roughness: 0.95
  });

  const printed_graphics = new THREE.Group();
  printed_graphics.name = "printed_graphics";
  root.add(printed_graphics);

  const digit_strokeGeom = new THREE.BoxGeometry(1, 1, 1);
  const digitH = 0.56;
  const digitW = 0.23;
  const stroke = 0.046;
  const decalDepth = 0.012;

  const segmentDefs = {
    a: [0, digitH / 2, digitW, stroke],
    b: [digitW / 2, digitH / 4, stroke, digitH / 2],
    c: [digitW / 2, -digitH / 4, stroke, digitH / 2],
    d: [0, -digitH / 2, digitW, stroke],
    e: [-digitW / 2, -digitH / 4, stroke, digitH / 2],
    f: [-digitW / 2, digitH / 4, stroke, digitH / 2],
    g: [0, 0, digitW, stroke]
  };

  const digitSegments = {
    "1": ["b", "c"],
    "3": ["a", "b", "g", "c", "d"],
    "5": ["a", "f", "g", "c", "d"],
    "8": ["a", "b", "c", "d", "e", "f", "g"],
    "9": ["a", "b", "c", "d", "f", "g"]
  };

  function createDigit(character) {
    const digit = new THREE.Group();
    const segments = digitSegments[character];
    for (let i = 0; i < segments.length; i++) {
      const def = segmentDefs[segments[i]];
      const segment = new THREE.Mesh(digit_strokeGeom, printed_graphicsMat);
      segment.position.set(def[0], def[1], 0);
      segment.scale.set(def[2], def[3], decalDepth);
      digit.add(segment);
    }
    return digit;
  }

  function placeOnBand(part, angle, y) {
    part.position.set(
      Math.sin(angle) * decalR,
      y,
      Math.cos(angle) * decalR
    );
    part.rotation.y = angle;
    printed_graphics.add(part);
  }

  const emblem = new THREE.Group();
  emblem.name = "emblem";

  const emblem_outlinePoints = [
    new THREE.Vector3(-0.15, 0.22, 0),
    new THREE.Vector3(0.15, 0.22, 0),
    new THREE.Vector3(0.18, 0.16, 0),
    new THREE.Vector3(0.15, -0.16, 0),
    new THREE.Vector3(0, -0.27, 0),
    new THREE.Vector3(-0.15, -0.16, 0),
    new THREE.Vector3(-0.18, 0.16, 0)
  ];
  const emblem_outlineCurve = new THREE.CatmullRomCurve3(
    emblem_outlinePoints,
    true,
    "centripetal"
  );
  const emblem_outlineGeom = new THREE.TubeGeometry(
    emblem_outlineCurve,
    48,
    0.012,
    6,
    true
  );
  const emblem_outline = new THREE.Mesh(
    emblem_outlineGeom,
    printed_graphicsMat
  );
  emblem_outline.name = "emblem_outline";
  emblem.add(emblem_outline);

  const emblem_inner_outlinePoints = [
    new THREE.Vector3(-0.115, 0.165, 0.002),
    new THREE.Vector3(0.115, 0.165, 0.002),
    new THREE.Vector3(0.13, 0.12, 0.002),
    new THREE.Vector3(0.105, -0.12, 0.002),
    new THREE.Vector3(0, -0.205, 0.002),
    new THREE.Vector3(-0.105, -0.12, 0.002),
    new THREE.Vector3(-0.13, 0.12, 0.002)
  ];
  const emblem_inner_outlineCurve = new THREE.CatmullRomCurve3(
    emblem_inner_outlinePoints,
    true,
    "centripetal"
  );
  const emblem_inner_outlineGeom = new THREE.TubeGeometry(
    emblem_inner_outlineCurve,
    40,
    0.006,
    5,
    true
  );
  const emblem_inner_outline = new THREE.Mesh(
    emblem_inner_outlineGeom,
    printed_graphicsMat
  );
  emblem_inner_outline.name = "emblem_inner_outline";
  emblem.add(emblem_inner_outline);

  const emblem_tree_trunkGeom = new THREE.BoxGeometry(0.025, 0.17, 0.012);
  const emblem_tree_trunk = new THREE.Mesh(
    emblem_tree_trunkGeom,
    printed_graphicsMat
  );
  emblem_tree_trunk.name = "emblem_tree_trunk";
  emblem_tree_trunk.position.set(0, -0.075, 0.004);
  emblem.add(emblem_tree_trunk);

  const emblem_tree_left_branchGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(-0.004, -0.025, 0.004),
      new THREE.Vector3(-0.075, 0.075, 0.004)
    ),
    1,
    0.009,
    6,
    false
  );
  const emblem_tree_left_branch = new THREE.Mesh(
    emblem_tree_left_branchGeom,
    printed_graphicsMat
  );
  emblem_tree_left_branch.name = "emblem_tree_left_branch";
  emblem.add(emblem_tree_left_branch);

  const emblem_tree_right_branchGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(0.004, -0.02, 0.004),
      new THREE.Vector3(0.075, 0.075, 0.004)
    ),
    1,
    0.009,
    6,
    false
  );
  const emblem_tree_right_branch = new THREE.Mesh(
    emblem_tree_right_branchGeom,
    printed_graphicsMat
  );
  emblem_tree_right_branch.name = "emblem_tree_right_branch";
  emblem.add(emblem_tree_right_branch);

  const emblem_tree_crownGeom = new THREE.CircleGeometry(0.055, 3);
  const emblem_tree_crown = new THREE.Mesh(
    emblem_tree_crownGeom,
    printed_graphicsMat
  );
  emblem_tree_crown.name = "emblem_tree_crown";
  emblem_tree_crown.position.set(0, 0.095, 0.006);
  emblem_tree_crown.rotation.z = Math.PI / 2;
  emblem.add(emblem_tree_crown);

  const emblem_top_starShape = new THREE.Shape();
  emblem_top_starShape.moveTo(0, 0.04);
  emblem_top_starShape.lineTo(0.012, 0.012);
  emblem_top_starShape.lineTo(0.04, 0);
  emblem_top_starShape.lineTo(0.012, -0.012);
  emblem_top_starShape.lineTo(0, -0.04);
  emblem_top_starShape.lineTo(-0.012, -0.012);
  emblem_top_starShape.lineTo(-0.04, 0);
  emblem_top_starShape.lineTo(-0.012, 0.012);
  emblem_top_starShape.closePath();
  const emblem_top_starGeom = new THREE.ShapeGeometry(emblem_top_starShape);
  const emblem_top_star = new THREE.Mesh(
    emblem_top_starGeom,
    printed_graphicsMat
  );
  emblem_top_star.name = "emblem_top_star";
  emblem_top_star.position.set(0, 0.255, 0.004);
  emblem.add(emblem_top_star);

  placeOnBand(emblem, -0.98, -0.01);

  const dotGeom = new THREE.CircleGeometry(0.035, 18);

  const first_dot = new THREE.Mesh(dotGeom, printed_graphicsMat);
  first_dot.name = "first_dot";
  first_dot.scale.set(1.25, 0.65, 1);
  placeOnBand(first_dot, -0.78, -0.015);

  const digit_3 = createDigit("3");
  digit_3.name = "digit_3";
  placeOnBand(digit_3, -0.56, -0.005);

  const digit_1 = createDigit("1");
  digit_1.name = "digit_1";
  placeOnBand(digit_1, -0.29, -0.005);

  const digit_5 = createDigit("5");
  digit_5.name = "digit_5";
  placeOnBand(digit_5, -0.04, -0.005);

  const hyphen = new THREE.Mesh(digit_strokeGeom, printed_graphicsMat);
  hyphen.name = "hyphen";
  hyphen.scale.set(0.15, 0.038, decalDepth);
  placeOnBand(hyphen, 0.22, -0.005);

  const digit_8 = createDigit("8");
  digit_8.name = "digit_8";
  placeOnBand(digit_8, 0.46, -0.005);

  const digit_9 = createDigit("9");
  digit_9.name = "digit_9";
  placeOnBand(digit_9, 0.72, -0.005);

  const left_digit_3 = createDigit("3");
  left_digit_3.name = "left_digit_3";
  placeOnBand(left_digit_3, -1.28, -0.005);

  fitToUnitCube(root);
  return root;

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
}