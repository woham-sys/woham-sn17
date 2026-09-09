function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "faceted_crystal_heart";

  const crystal_body = new THREE.Group();
  crystal_body.name = "crystal_body";
  root.add(crystal_body);

  const facet_palette = [
    new THREE.Color(0xffffff),
    new THREE.Color(0xe7edf2),
    new THREE.Color(0xcfdadd),
    new THREE.Color(0xf7f2e8),
    new THREE.Color(0xb8c5cc),
    new THREE.Color(0xf4fbff),
    new THREE.Color(0xd6dfe5),
    new THREE.Color(0xfff7e8),
    new THREE.Color(0xaebbc3),
    new THREE.Color(0xf8f9fa),
    new THREE.Color(0xccecff),
    new THREE.Color(0x9faab3),
  ];

  function makeHeartShape(scale) {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.55 * scale);
    shape.bezierCurveTo(
      -0.08 * scale, -0.47 * scale,
      -0.50 * scale, -0.16 * scale,
      -0.52 * scale, 0.17 * scale
    );
    shape.bezierCurveTo(
      -0.54 * scale, 0.43 * scale,
      -0.31 * scale, 0.58 * scale,
      -0.11 * scale, 0.52 * scale
    );
    shape.bezierCurveTo(
      -0.04 * scale, 0.50 * scale,
      -0.01 * scale, 0.43 * scale,
      0, 0.39 * scale
    );
    shape.bezierCurveTo(
      0.01 * scale, 0.43 * scale,
      0.04 * scale, 0.50 * scale,
      0.11 * scale, 0.52 * scale
    );
    shape.bezierCurveTo(
      0.31 * scale, 0.58 * scale,
      0.54 * scale, 0.43 * scale,
      0.52 * scale, 0.17 * scale
    );
    shape.bezierCurveTo(
      0.50 * scale, -0.16 * scale,
      0.08 * scale, -0.47 * scale,
      0, -0.55 * scale
    );
    shape.closePath();
    return shape;
  }

  function makeRing(shape, scale, z, colorOffset) {
    const points = shape.getSpacedPoints(48);
    if (points.length > 1) points.pop();

    const ring = [];
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      ring.push({
        x: point.x * scale,
        y: point.y * scale,
        z: z,
        colorIndex: (i * 5 + colorOffset) % facet_palette.length,
      });
    }
    return ring;
  }

  function createFacetGeometry(faces, palette) {
    const positions = [];
    const colors = [];

    for (const face of faces) {
      const color = palette[face.colorIndex % palette.length];
      for (let i = 0; i < 3; i++) {
        const point = face.points[i];
        positions.push(point.x, point.y, point.z);
        colors.push(color.r, color.g, color.b);
      }
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
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function connectFrontRings(outerRing, innerRing, faces, colorOffset) {
    for (let i = 0; i < innerRing.length; i++) {
      const j = (i + 1) % innerRing.length;
      const outerA = outerRing[(i * 2) % outerRing.length];
      const outerB = outerRing[(i * 2 + 1) % outerRing.length];
      const outerC = outerRing[(i * 2 + 2) % outerRing.length];
      const innerA = innerRing[i];
      const innerB = innerRing[j];

      faces.push({
        points: [outerA, outerB, innerA],
        colorIndex: colorOffset + i * 3,
      });
      faces.push({
        points: [outerB, outerC, innerB],
        colorIndex: colorOffset + i * 3 + 1,
      });
      faces.push({
        points: [outerC, innerA, innerB],
        colorIndex: colorOffset + i * 3 + 2,
      });
    }
  }

  function connectBackRings(outerRing, innerRing, faces, colorOffset) {
    for (let i = 0; i < innerRing.length; i++) {
      const j = (i + 1) % innerRing.length;
      const outerA = outerRing[(i * 2) % outerRing.length];
      const outerB = outerRing[(i * 2 + 1) % outerRing.length];
      const outerC = outerRing[(i * 2 + 2) % outerRing.length];
      const innerA = innerRing[i];
      const innerB = innerRing[j];

      faces.push({
        points: [outerA, innerA, outerB],
        colorIndex: colorOffset + i * 5,
      });
      faces.push({
        points: [outerB, innerA, innerB],
        colorIndex: colorOffset + i * 5 + 2,
      });
      faces.push({
        points: [outerB, innerB, outerC],
        colorIndex: colorOffset + i * 5 + 5,
      });
    }
  }

  function createPointFan(ring, point, faces, colorOffset, reverse) {
    for (let i = 0; i < ring.length; i++) {
      const next = (i + 1) % ring.length;
      const first = reverse ? ring[next] : ring[i];
      const second = reverse ? ring[i] : ring[next];

      faces.push({
        points: [point, first, second],
        colorIndex: colorOffset + i * 7,
      });
    }
  }

  const heart_shape = makeHeartShape(1);
  const outer_front_ring = makeRing(heart_shape, 1.00, 0.015, 0);
  const middle_front_ring = makeRing(heart_shape, 0.82, 0.125, 4);
  const table_front_ring = makeRing(heart_shape, 0.60, 0.215, 8);
  const outer_back_ring = makeRing(heart_shape, 1.00, -0.045, 6);
  const middle_back_ring = makeRing(heart_shape, 0.78, -0.155, 2);
  const table_back_ring = makeRing(heart_shape, 0.52, -0.225, 9);

  const front_outer_faces = [];
  const front_middle_faces = [];
  const front_table_faces = [];
  const back_outer_faces = [];
  const back_middle_faces = [];
  const back_table_faces = [];

  connectFrontRings(
    outer_front_ring,
    middle_front_ring,
    front_outer_faces,
    0
  );
  connectFrontRings(
    middle_front_ring,
    table_front_ring,
    front_middle_faces,
    5
  );

  const front_table_center = {
    x: 0,
    y: -0.015,
    z: 0.215,
    colorIndex: 0,
  };
  createPointFan(
    table_front_ring,
    front_table_center,
    front_table_faces,
    2,
    false
  );

  connectBackRings(
    outer_back_ring,
    middle_back_ring,
    back_outer_faces,
    7
  );
  connectBackRings(
    middle_back_ring,
    table_back_ring,
    back_middle_faces,
    3
  );

  const back_table_center = {
    x: 0,
    y: -0.015,
    z: -0.225,
    colorIndex: 8,
  };
  createPointFan(
    table_back_ring,
    back_table_center,
    back_table_faces,
    6,
    true
  );

  const girdle_faces = [];
  for (let i = 0; i < outer_front_ring.length; i++) {
    const next = (i + 1) % outer_front_ring.length;
    girdle_faces.push({
      points: [
        outer_front_ring[i],
        outer_back_ring[i],
        outer_front_ring[next],
      ],
      colorIndex: 4 + (i % 5),
    });
    girdle_faces.push({
      points: [
        outer_front_ring[next],
        outer_back_ring[i],
        outer_back_ring[next],
      ],
      colorIndex: 9 + (i % 3),
    });
  }

  const front_outer_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    opacity: 0.56,
    thickness: 0.32,
    attenuationColor: 0xeaf6ff,
    attenuationDistance: 1.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    specularIntensity: 1.0,
    side: THREE.DoubleSide,
    flatShading: true,
    depthWrite: false,
  });
  const front_outer_facets = new THREE.Mesh(
    createFacetGeometry(front_outer_faces, facet_palette),
    front_outer_facetsMat
  );
  front_outer_facets.name = "front_outer_facets";
  front_outer_facets.renderOrder = 4;
  crystal_body.add(front_outer_facets);

  const front_middle_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    opacity: 0.50,
    thickness: 0.28,
    attenuationColor: 0xf1f7fa,
    attenuationDistance: 1.6,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    specularIntensity: 1.0,
    side: THREE.DoubleSide,
    flatShading: true,
    depthWrite: false,
  });
  const front_middle_facets = new THREE.Mesh(
    createFacetGeometry(front_middle_faces, facet_palette),
    front_middle_facetsMat
  );
  front_middle_facets.name = "front_middle_facets";
  front_middle_facets.renderOrder = 5;
  crystal_body.add(front_middle_facets);

  const front_table_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    opacity: 0.43,
    thickness: 0.22,
    attenuationColor: 0xf5fbff,
    attenuationDistance: 1.4,
    clearcoat: 1.0,
    clearcoatRoughness: 0.025,
    specularIntensity: 1.0,
    side: THREE.DoubleSide,
    flatShading: true,
    depthWrite: false,
  });
  const front_table_facets = new THREE.Mesh(
    createFacetGeometry(front_table_faces, facet_palette),
    front_table_facetsMat
  );
  front_table_facets.name = "front_table_facets";
  front_table_facets.renderOrder = 6;
  crystal_body.add(front_table_facets);

  const back_outer_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    opacity: 0.48,
    thickness: 0.32,
    attenuationColor: 0xddeeff,
    attenuationDistance: 1.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    specularIntensity: 1.0,
    side: THREE.DoubleSide,
    flatShading: true,
    depthWrite: false,
  });
  const back_outer_facets = new THREE.Mesh(
    createFacetGeometry(back_outer_faces, facet_palette),
    back_outer_facetsMat
  );
  back_outer_facets.name = "back_outer_facets";
  back_outer_facets.renderOrder = 1;
  crystal_body.add(back_outer_facets);

  const back_middle_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    opacity: 0.42,
    thickness: 0.28,
    attenuationColor: 0xe4f0f6,
    attenuationDistance: 1.6,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    specularIntensity: 1.0,
    side: THREE.DoubleSide,
    flatShading: true,
    depthWrite: false,
  });
  const back_middle_facets = new THREE.Mesh(
    createFacetGeometry(back_middle_faces, facet_palette),
    back_middle_facetsMat
  );
  back_middle_facets.name = "back_middle_facets";
  back_middle_facets.renderOrder = 2;
  crystal_body.add(back_middle_facets);

  const back_table_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    opacity: 0.36,
    thickness: 0.22,
    attenuationColor: 0xe8f3f9,
    attenuationDistance: 1.4,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    specularIntensity: 1.0,
    side: THREE.DoubleSide,
    flatShading: true,
    depthWrite: false,
  });
  const back_table_facets = new THREE.Mesh(
    createFacetGeometry(back_table_faces, facet_palette),
    back_table_facetsMat
  );
  back_table_facets.name = "back_table_facets";
  back_table_facets.renderOrder = 3;
  crystal_body.add(back_table_facets);

  const girdle_bandMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    opacity: 0.52,
    thickness: 0.30,
    attenuationColor: 0xdcecff,
    attenuationDistance: 1.7,
    clearcoat: 1.0,
    clearcoatRoughness: 0.035,
    specularIntensity: 1.0,
    side: THREE.DoubleSide,
    flatShading: true,
    depthWrite: false,
  });
  const girdle_band = new THREE.Mesh(
    createFacetGeometry(girdle_faces, facet_palette),
    girdle_bandMat
  );
  girdle_band.name = "girdle_band";
  girdle_band.renderOrder = 0;
  crystal_body.add(girdle_band);

  function fitToUnitCube(object) {
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

  fitToUnitCube(root);
  return root;
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
