function __sn17_user(THREE) {
  const root = new THREE.Group();
  const pendant_group = new THREE.Group();
  const gemstone_group = new THREE.Group();
  const hanger_group = new THREE.Group();
  root.add(pendant_group);
  pendant_group.add(gemstone_group);
  pendant_group.add(hanger_group);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xe6e6e2,
    metalness: 0.55,
    roughness: 0.18
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x111318,
    metalness: 0.25,
    roughness: 0.42
  });
  const blueGemMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.16,
    vertexColors: true
  });
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xdaf4ff,
    side: THREE.DoubleSide
  });

  function makeHeartShape(scale) {
    const s = scale;
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.72 * s);
    shape.bezierCurveTo(-0.10 * s, -0.62 * s, -0.62 * s, -0.20 * s, -0.68 * s, 0.22 * s);
    shape.bezierCurveTo(-0.72 * s, 0.52 * s, -0.50 * s, 0.70 * s, -0.28 * s, 0.68 * s);
    shape.bezierCurveTo(-0.12 * s, 0.67 * s, -0.04 * s, 0.56 * s, 0, 0.48 * s);
    shape.bezierCurveTo(0.04 * s, 0.56 * s, 0.12 * s, 0.67 * s, 0.28 * s, 0.68 * s);
    shape.bezierCurveTo(0.50 * s, 0.70 * s, 0.72 * s, 0.52 * s, 0.68 * s, 0.22 * s);
    shape.bezierCurveTo(0.62 * s, -0.20 * s, 0.10 * s, -0.62 * s, 0, -0.72 * s);
    shape.closePath();
    return shape;
  }

  const outer_heart_bodyGeom = new THREE.ExtrudeGeometry(makeHeartShape(1.0), {
    depth: 0.075,
    steps: 1,
    curveSegments: 32
  });
  const outer_heart_body = new THREE.Mesh(outer_heart_bodyGeom, silverMat);
  outer_heart_body.position.z = -0.0375;
  pendant_group.add(outer_heart_body);

  const recessed_heart_panelGeom = new THREE.ExtrudeGeometry(makeHeartShape(0.91), {
    depth: 0.018,
    steps: 1,
    curveSegments: 32
  });
  const recessed_heart_panel = new THREE.Mesh(recessed_heart_panelGeom, darkMat);
  recessed_heart_panel.position.z = 0.038;
  pendant_group.add(recessed_heart_panel);

  const outline2d = makeHeartShape(0.955).getPoints(96);
  if (outline2d.length > 1 && outline2d[0].distanceToSquared(outline2d[outline2d.length - 1]) < 0.000001) {
    outline2d.pop();
  }
  const outline3d = [];
  for (let i = 0; i < outline2d.length; i++) {
    outline3d.push(new THREE.Vector3(outline2d[i].x, outline2d[i].y, 0.066));
  }
  const raised_silver_outlineCurve = new THREE.CatmullRomCurve3(outline3d, true, "centripetal");
  const raised_silver_outlineGeom = new THREE.TubeGeometry(raised_silver_outlineCurve, 160, 0.014, 8, true);
  const raised_silver_outline = new THREE.Mesh(raised_silver_outlineGeom, silverMat);
  pendant_group.add(raised_silver_outline);

  const connector_ring_shadowGeom = new THREE.RingGeometry(0.073, 0.137, 48);
  const connector_ring_shadow = new THREE.Mesh(connector_ring_shadowGeom, darkMat);
  connector_ring_shadow.position.set(0, 0.69, 0.061);
  hanger_group.add(connector_ring_shadow);

  const connector_ringGeom = new THREE.TorusGeometry(0.105, 0.026, 12, 48);
  const connector_ring = new THREE.Mesh(connector_ringGeom, silverMat);
  connector_ring.position.set(0, 0.69, 0.071);
  hanger_group.add(connector_ring);

  const bail_loop_shadowGeom = new THREE.CircleGeometry(0.071, 40);
  const bail_loop_shadow = new THREE.Mesh(bail_loop_shadowGeom, darkMat);
  bail_loop_shadow.scale.set(0.72, 2.15, 1);
  bail_loop_shadow.position.set(0, 0.99, 0.064);
  hanger_group.add(bail_loop_shadow);

  const bail_loopGeom = new THREE.TorusGeometry(0.105, 0.035, 14, 56);
  const bail_loop = new THREE.Mesh(bail_loopGeom, silverMat);
  bail_loop.scale.set(0.72, 2.15, 1);
  bail_loop.position.set(0, 0.99, 0.078);
  hanger_group.add(bail_loop);

  const bail_inner_highlightGeom = new THREE.TorusGeometry(0.105, 0.008, 8, 48);
  const bail_inner_highlight = new THREE.Mesh(bail_inner_highlightGeom, silverMat);
  bail_inner_highlight.scale.set(0.72, 2.15, 1);
  bail_inner_highlight.position.set(0, 0.99, 0.113);
  hanger_group.add(bail_inner_highlight);

  const gem_data = [];
  const row_count = 15;
  const row_start = -0.58;
  const row_step = 0.087;

  function heartHalfWidth(y) {
    if (y <= -0.66 || y >= 0.68) return 0;
    if (y < -0.45) {
      const t = (y + 0.66) / 0.21;
      return 0.04 + 0.34 * t;
    }
    if (y < 0.25) {
      const t = (y + 0.45) / 0.70;
      return 0.38 + 0.25 * Math.sin(t * Math.PI * 0.5);
    }
    const t = (y - 0.25) / 0.43;
    return 0.63 * Math.sqrt(Math.max(0, 1 - t * t));
  }

  for (let r = 0; r < row_count; r++) {
    const baseY = row_start + r * row_step;
    const width = heartHalfWidth(baseY);
    const count = Math.max(1, Math.floor((width * 2) / 0.088));
    const step = (width * 2) / count;
    const offsetX = (r % 2 === 0 ? -0.25 : 0.25) * step;

    for (let c = 0; c < count; c++) {
      const x = -width + step * (c + 0.5) + offsetX;
      const y = baseY + (((r * 7 + c * 11) % 5) - 2) * 0.003;
      const radius = 0.034 + ((r * 13 + c * 7) % 5) * 0.0028;
      const boundary = Math.pow(x / 0.66, 4) + Math.pow((y + 0.02) / 0.70, 4);
      if (boundary < 1.0 && Math.abs(x) > 0.018 && y < 0.50) {
        gem_data.push({ x, y, radius });
      }
    }
  }

  const blue_gemstonesGeom = createFacetedGemGeometry(THREE);
  const blue_gemstones = new THREE.InstancedMesh(blue_gemstonesGeom, blueGemMat, gem_data.length);
  const dummy = new THREE.Object3D();
  const gem_palette = [
    new THREE.Color(0x174aa8),
    new THREE.Color(0x246bd0),
    new THREE.Color(0x347fdf),
    new THREE.Color(0x123b8c),
    new THREE.Color(0x4a91e8)
  ];

  for (let i = 0; i < gem_data.length; i++) {
    const gem = gem_data[i];
    dummy.position.set(gem.x, gem.y, 0.083);
    dummy.rotation.set(0, 0, ((i * 29) % 360) * Math.PI / 180);
    dummy.scale.setScalar(gem.radius / 0.04);
    dummy.updateMatrix();
    blue_gemstones.setMatrixAt(i, dummy.matrix);
    blue_gemstones.setColorAt(i, gem_palette[(i * 3 + Math.floor(i / 11)) % gem_palette.length]);
  }
  blue_gemstones.instanceMatrix.needsUpdate = true;
  if (blue_gemstones.instanceColor) blue_gemstones.instanceColor.needsUpdate = true;
  gemstone_group.add(blue_gemstones);

  const silver_spacer_beadsGeom = new THREE.SphereGeometry(1, 10, 6);
  const silver_spacer_beads = new THREE.InstancedMesh(silver_spacer_beadsGeom, silverMat, gem_data.length);
  for (let i = 0; i < gem_data.length; i++) {
    const gem = gem_data[i];
    const angle = ((i * 47) % 360) * Math.PI / 180;
    const offset = gem.radius * 0.92;
    dummy.position.set(
      gem.x + Math.cos(angle) * offset,
      gem.y + Math.sin(angle) * offset,
      0.086
    );
    dummy.rotation.set(0, 0, 0);
    dummy.scale.setScalar(0.0065 + (i % 3) * 0.0012);
    dummy.updateMatrix();
    silver_spacer_beads.setMatrixAt(i, dummy.matrix);
  }
  silver_spacer_beads.instanceMatrix.needsUpdate = true;
  gemstone_group.add(silver_spacer_beads);

  const highlight_data = [];
  for (let i = 0; i < gem_data.length; i += 3) {
    const gem = gem_data[i];
    if ((i * 5 + 2) % 9 < 6) {
      highlight_data.push(gem);
    }
  }

  const gemstone_highlightsGeom = new THREE.CircleGeometry(1, 12);
  const gemstone_highlights = new THREE.InstancedMesh(
    gemstone_highlightsGeom,
    highlightMat,
    highlight_data.length
  );
  for (let i = 0; i < highlight_data.length; i++) {
    const gem = highlight_data[i];
    dummy.position.set(
      gem.x - gem.radius * 0.22,
      gem.y + gem.radius * 0.24,
      0.111
    );
    dummy.rotation.set(0, 0, -0.45);
    dummy.scale.set(gem.radius * 0.13, gem.radius * 0.075, 1);
    dummy.updateMatrix();
    gemstone_highlights.setMatrixAt(i, dummy.matrix);
  }
  gemstone_highlights.instanceMatrix.needsUpdate = true;
  gemstone_group.add(gemstone_highlights);

  fitToUnitCube(THREE, root);
  return root;
}

function createFacetedGemGeometry(THREE) {
  const segmentCount = 12;
  const positions = [];
  const colors = [];

  function point(radius, angle, z) {
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, z];
  }

  function pushTriangle(a, b, c, shade) {
    positions.push(
      a[0], a[1], a[2],
      b[0], b[1], b[2],
      c[0], c[1], c[2]
    );
    for (let i = 0; i < 3; i++) {
      colors.push(shade, shade, shade);
    }
  }

  const center = [0, 0, 0.32];
  const back_center = [0, 0, -0.18];

  for (let i = 0; i < segmentCount; i++) {
    const a0 = i / segmentCount * Math.PI * 2;
    const a1 = (i + 1) / segmentCount * Math.PI * 2;
    const table0 = point(0.42, a0, 0.32);
    const table1 = point(0.42, a1, 0.32);
    const girdle0 = point(1.0, a0, 0.0);
    const girdle1 = point(1.0, a1, 0.0);
    const lower0 = point(0.96, a0, -0.12);
    const lower1 = point(0.96, a1, -0.12);
    const crownShade = i % 2 === 0 ? 1.0 : 0.78;
    const tableShade = i % 3 === 0 ? 0.82 : 1.0;

    pushTriangle(center, table0, table1, tableShade);
    pushTriangle(table0, girdle0, girdle1, crownShade);
    pushTriangle(table0, girdle1, table1, i % 2 === 0 ? 0.72 : 0.96);
    pushTriangle(girdle0, lower0, lower1, 0.58);
    pushTriangle(girdle0, lower1, girdle1, 0.68);
    pushTriangle(back_center, lower1, lower0, 0.45);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  return geometry;
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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
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
