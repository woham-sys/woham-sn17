function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "woven_yarn_basket";

  const basket_body = new THREE.Group();
  basket_body.name = "basket_body";
  root.add(basket_body);

  const woven_strips = new THREE.Group();
  woven_strips.name = "woven_strips";
  root.add(woven_strips);

  const yarn_details = new THREE.Group();
  yarn_details.name = "yarn_details";
  root.add(yarn_details);

  const palette = [
    0x00aeea,
    0xff2f73,
    0xff6a22,
    0xf7d91e,
    0x18b86b,
    0xb832a8,
    0x00c8ff,
    0xff4b32,
    0x7ed33a,
    0xffa51d
  ];
  const paletteColors = palette.map((value) => new THREE.Color(value));

  const baseY = -0.38;
  const topY = 0.38;
  const bottomRadius = 0.48;
  const topRadius = 0.62;
  const courseCount = 10;
  const segmentCount = 36;
  const angularStep = Math.PI * 2 / segmentCount;

  function radiusAt(y) {
    const t = (y - baseY) / (topY - baseY);
    return bottomRadius + (topRadius - bottomRadius) * t;
  }

  function makeWeaveGeometry(phase) {
    const positions = [];
    const normals = [];
    const colors = [];
    const indices = [];
    const verticalSegments = 5;
    const widthSegments = 3;
    const halfHeight = 0.058;
    const halfWidth = 0.048;
    const color = new THREE.Color();

    for (let row = 0; row < courseCount; row++) {
      const centerY = baseY + (row + 0.5) * (topY - baseY) / courseCount;
      const rowOffset = (row % 2) * angularStep * 0.5;
      const vertexStart = positions.length / 3;

      for (let v = 0; v <= verticalSegments; v++) {
        const t = v / verticalSegments;
        const y = centerY + (t - 0.5) * halfHeight * 2;
        const r = radiusAt(y);

        for (let u = 0; u <= widthSegments; u++) {
          const s = u / widthSegments - 0.5;
          const angle = phase + rowOffset + s * angularStep * 1.08;
          const nx = Math.sin(angle);
          const nz = Math.cos(angle);
          const ridge = Math.sin((s + 0.5) * Math.PI * 2);
          const radialOffset = 0.010 + ridge * 0.008;

          positions.push(nx * (r + radialOffset), y, nz * (r + radialOffset));
          normals.push(nx, 0, nz);
          color.copy(paletteColors[(row * 3 + Math.floor(s * 10) + 100) % paletteColors.length]);
          colors.push(color.r, color.g, color.b);
        }
      }

      const rowSize = (verticalSegments + 1) * (widthSegments + 1);
      for (let i = 0; i < rowSize - 1; i++) {
        indices.push(vertexStart + i, vertexStart + i + 1);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function makeBraidedRimGeometry() {
    const positions = [];
    const normals = [];
    const colors = [];
    const indices = [];
    const up = new THREE.Vector3(0, 1, 0);
    const color = new THREE.Color();

    for (let strand = 0; strand < 3; strand++) {
      const phase = strand / 3 * Math.PI * 2;
      const vertexStart = positions.length / 3;

      for (let i = 0; i < segmentCount; i++) {
        const centerAngle = i * angularStep;
        const wave = Math.sin(centerAngle * 12 + phase);
        const cross = Math.cos(centerAngle * 12 + phase);
        const centerY = topY + wave * 0.026;
        const centerR = radiusAt(topY) + cross * 0.020;
        const tangent = new THREE.Vector3(Math.cos(centerAngle), 0, -Math.sin(centerAngle)).normalize();
        const radial = new THREE.Vector3(Math.sin(centerAngle), 0, Math.cos(centerAngle)).normalize();
        const basisA = new THREE.Vector3().crossVectors(tangent, up).normalize();
        const basisB = new THREE.Vector3().crossVectors(up, tangent).normalize();
        const offset = basisA.multiplyScalar(cross * 0.020).add(basisB.multiplyScalar(wave * 0.020));
        const center = new THREE.Vector3(radial.x * centerR, centerY, radial.z * centerR).add(offset);

        for (let p = 0; p < 4; p++) {
          const a = p / 4 * Math.PI * 2;
          const localOffset = basisA.clone().multiplyScalar(Math.cos(a) * 0.020).add(basisB.clone().multiplyScalar(Math.sin(a) * 0.020));
          const position = center.clone().add(localOffset);
          const normal = tangent.clone().cross(basisA.clone().multiplyScalar(Math.cos(a)).add(basisB.clone().multiplyScalar(Math.sin(a))).normalize()).normalize();

          positions.push(position.x, position.y, position.z);
          normals.push(normal.x, normal.y, normal.z);
          color.copy(paletteColors[(strand * 4 + i + 2) % paletteColors.length]);
          colors.push(color.r, color.g, color.b);
        }
      }

      for (let i = 0; i < segmentCount; i++) {
        const next = (i + 1) % segmentCount;
        const a = vertexStart + i * 4;
        const b = vertexStart + next * 4;
        for (let p = 0; p < 4; p++) {
          const q = (p + 1) % 4;
          indices.push(a + p, a + q, b + p);
          indices.push(a + q, b + q, b + p);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function makeTwistedCordGeometry(radius, y, phase, colorIndex, name) {
    const positions = [];
    const normals = [];
    const colors = [];
    const indices = [];
    const up = new THREE.Vector3(0, 1, 0);
    const pathSegments = 144;
    const tubeSegments = 8;
    const baseR = radiusAt(y);
    const color = paletteColors[colorIndex % paletteColors.length];

    for (let i = 0; i < pathSegments; i++) {
      const angle = i / pathSegments * Math.PI * 2;
      const wave = Math.sin(angle * 12 + phase);
      const cross = Math.cos(angle * 12 + phase);
      const centerY = y + wave * 0.018;
      const centerR = baseR + cross * 0.012;
      const tangent = new THREE.Vector3(Math.cos(angle), 0, -Math.sin(angle)).normalize();
      const radial = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle)).normalize();
      const basisA = new THREE.Vector3().crossVectors(tangent, up).normalize();
      const basisB = new THREE.Vector3().crossVectors(up, tangent).normalize();
      const center = new THREE.Vector3(radial.x * centerR, centerY, radial.z * centerR).add(
        basisA.clone().multiplyScalar(cross * 0.010).add(basisB.clone().multiplyScalar(wave * 0.010))
      );

      for (let p = 0; p < tubeSegments; p++) {
        const a = p / tubeSegments * Math.PI * 2;
        const localOffset = basisA.clone().multiplyScalar(Math.cos(a) * radius).add(basisB.clone().multiplyScalar(Math.sin(a) * radius));
        const position = center.clone().add(localOffset);
        const normal = tangent.clone().cross(basisA.clone().multiplyScalar(Math.cos(a)).add(basisB.clone().multiplyScalar(Math.sin(a))).normalize()).normalize();

        positions.push(position.x, position.y, position.z);
        normals.push(normal.x, normal.y, normal.z);
        colors.push(color.r, color.g, color.b);
      }
    }

    for (let i = 0; i < pathSegments; i++) {
      const next = (i + 1) % pathSegments;
      for (let p = 0; p < tubeSegments; p++) {
        const q = (p + 1) % tubeSegments;
        const a = i * tubeSegments + p;
        const b = next * tubeSegments + p;
        const c = i * tubeSegments + q;
        const d = next * tubeSegments + q;
        indices.push(a, c, b);
        indices.push(c, d, b);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      vertexColors: true,
      metalness: 0.0,
      roughness: 0.95
    });
    const cord = new THREE.Mesh(geometry, material);
    cord.name = name;
    return cord;
  }

  const diagonal_weave_a = new THREE.Mesh(makeWeaveGeometry(0), new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.95
  }));
  diagonal_weave_a.name = "diagonal_weave_a";
  woven_strips.add(diagonal_weave_a);

  const diagonal_weave_b = new THREE.Mesh(makeWeaveGeometry(Math.PI), new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.95
  }));
  diagonal_weave_b.name = "diagonal_weave_b";
  woven_strips.add(diagonal_weave_b);

  const braided_rim = new THREE.Mesh(makeBraidedRimGeometry(), new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.95
  }));
  braided_rim.name = "braided_rim";
  woven_strips.add(braided_rim);

  const upper_rim_cord_blue = makeTwistedCordGeometry(0.018, 0.397, 0, 0, "upper_rim_cord_blue");
  const upper_rim_cord_yellow = makeTwistedCordGeometry(0.018, 0.397, Math.PI * 2 / 3, 3, "upper_rim_cord_yellow");
  const upper_rim_cord_green = makeTwistedCordGeometry(0.018, 0.397, Math.PI * 4 / 3, 4, "upper_rim_cord_green");
  yarn_details.add(upper_rim_cord_blue, upper_rim_cord_yellow, upper_rim_cord_green);

  const lower_base_cord_magenta = makeTwistedCordGeometry(0.017, -0.372, 0, 1, "lower_base_cord_magenta");
  const lower_base_cord_orange = makeTwistedCordGeometry(0.017, -0.372, Math.PI * 2 / 3, 2, "lower_base_cord_orange");
  const lower_base_cord_blue = makeTwistedCordGeometry(0.017, -0.372, Math.PI * 4 / 3, 0, "lower_base_cord_blue");
  yarn_details.add(lower_base_cord_magenta, lower_base_cord_orange, lower_base_cord_blue);

  const fiberPositions = [];
  const fiberColors = [];
  const goldenAngle = 2.399963229728653;

  for (let i = 0; i < 90; i++) {
    const t = ((i * 37) % 97) / 96;
    const y = baseY + 0.035 + t * (topY - baseY - 0.070);
    const angle = i * goldenAngle + (i % 5) * 0.07;
    const r = radiusAt(y) + 0.026;
    const nx = Math.sin(angle);
    const nz = Math.cos(angle);
    const tangentX = Math.cos(angle);
    const tangentZ = -Math.sin(angle);
    const length = 0.018 + ((i * 11) % 7) * 0.003;
    const lift = ((i % 3) - 1) * 0.008;

    fiberPositions.push(nx * r, y, nz * r);
    fiberPositions.push(
      nx * (r + length * 0.55) + tangentX * length * 0.25,
      y + lift,
      nz * (r + length * 0.55) + tangentZ * length * 0.25
    );

    const c = paletteColors[(i * 7 + 4) % paletteColors.length];
    fiberColors.push(c.r, c.g, c.b, c.r, c.g, c.b);
  }

  const yarn_fibers = new THREE.LineSegments(
    new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(fiberPositions, 3)),
    new THREE.LineBasicMaterial({ color: 0xfff1d6, transparent: true, opacity: 0.42 })
  );
  yarn_fibers.name = "yarn_fibers";
  yarn_details.add(yarn_fibers);

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
