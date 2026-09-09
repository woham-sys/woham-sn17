function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "emerald_pendant_necklace";

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xe5e8ea,
    metalness: 0.45,
    roughness: 0.18,
  });
  const darkSilverMat = new THREE.MeshStandardMaterial({
    color: 0x777d80,
    metalness: 0.35,
    roughness: 0.28,
  });
  const gemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0x00a84f,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.25,
    thickness: 0.12,
    transparent: true,
    opacity: 0.92,
    side: THREE.DoubleSide,
  });
  const facetMats = [
    new THREE.MeshStandardMaterial({ color: 0x00c85a, metalness: 0.0, roughness: 0.12, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ color: 0x008f45, metalness: 0.0, roughness: 0.14, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ color: 0x006b35, metalness: 0.0, roughness: 0.18, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ color: 0x1aa866, metalness: 0.0, roughness: 0.13, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ color: 0x5fd68b, metalness: 0.0, roughness: 0.1, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ color: 0x00a84f, metalness: 0.0, roughness: 0.11, side: THREE.DoubleSide }),
  ];

  function makeMarquiseShape(scaleX, scaleY) {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.48 * scaleY);
    shape.bezierCurveTo(-0.17 * scaleX, -0.34 * scaleY, -0.225 * scaleX, 0.16 * scaleY, 0, 0.48 * scaleY);
    shape.bezierCurveTo(0.225 * scaleX, 0.16 * scaleY, 0.17 * scaleX, -0.34 * scaleY, 0, -0.48 * scaleY);
    return shape;
  }

  const pendant_backingShape = makeMarquiseShape(1.18, 1.0);
  const pendant_backingGeom = new THREE.ExtrudeGeometry(pendant_backingShape, {
    steps: 1,
    curveSegments: 32,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 5,
  });
  const pendant_backing = new THREE.Mesh(pendant_backingGeom, silverMat);
  pendant_backing.name = "pendant_backing";
  pendant_backing.position.z = -0.045;
  root.add(pendant_backing);

  const outer_bezelShape = makeMarquiseShape(1.08, 1.0);
  const outer_bezelHole = new THREE.Path();
  outer_bezelHole.moveTo(0, -0.435);
  outer_bezelHole.bezierCurveTo(0.145, -0.31, 0.195, 0.15, 0, 0.435);
  outer_bezelHole.bezierCurveTo(-0.195, 0.15, -0.145, -0.31, 0, -0.435);
  outer_bezelShape.holes.push(outer_bezelHole);

  const outer_bezelGeom = new THREE.ExtrudeGeometry(outer_bezelShape, {
    steps: 1,
    curveSegments: 32,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 4,
  });
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, silverMat);
  outer_bezel.name = "outer_bezel";
  outer_bezel.position.z = -0.004;
  root.add(outer_bezel);

  const inner_shadowShape = makeMarquiseShape(1.0, 0.985);
  const inner_shadowGeom = new THREE.ExtrudeGeometry(inner_shadowShape, {
    steps: 1,
    curveSegments: 32,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 3,
  });
  const inner_shadow = new THREE.Mesh(inner_shadowGeom, darkSilverMat);
  inner_shadow.name = "inner_shadow";
  inner_shadow.position.z = 0.012;
  root.add(inner_shadow);

  const gemstoneShape = makeMarquiseShape(0.96, 0.96);
  const gemstoneGeom = new THREE.ExtrudeGeometry(gemstoneShape, {
    steps: 1,
    curveSegments: 32,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 4,
  });
  const gemstone = new THREE.Mesh(gemstoneGeom, gemstoneMat);
  gemstone.name = "gemstone";
  gemstone.position.z = 0.025;
  root.add(gemstone);

  const gemstone_facets = new THREE.Group();
  gemstone_facets.name = "gemstone_facets";
  root.add(gemstone_facets);

  const facetData = [
    [[0.000, 0.405], [-0.080, 0.245], [0.000, 0.155], 0],
    [[0.000, 0.405], [0.080, 0.245], [0.000, 0.155], 2],
    [[-0.080, 0.245], [-0.170, 0.090], [-0.075, -0.020], 1],
    [[-0.080, 0.245], [-0.075, -0.020], [0.000, 0.155], 4],
    [[0.080, 0.245], [0.000, 0.155], [0.075, -0.020], 3],
    [[0.080, 0.245], [0.075, -0.020], [0.170, 0.090], 1],
    [[-0.170, 0.090], [-0.145, -0.185], [-0.075, -0.020], 2],
    [[-0.145, -0.185], [0.000, -0.405], [-0.075, -0.020], 0],
    [[0.170, 0.090], [0.075, -0.020], [0.145, -0.185], 5],
    [[0.145, -0.185], [0.075, -0.020], [0.000, -0.405], 2],
    [[-0.075, -0.020], [0.000, -0.405], [0.075, -0.020], 1],
    [[-0.080, 0.245], [0.000, 0.155], [-0.075, -0.020], 5],
    [[0.080, 0.245], [0.075, -0.020], [0.000, 0.155], 4],
    [[-0.170, 0.090], [-0.075, -0.020], [-0.145, -0.185], 4],
    [[0.170, 0.090], [0.145, -0.185], [0.075, -0.020], 3],
    [[-0.145, -0.185], [-0.075, -0.020], [0.000, -0.405], 3],
    [[0.145, -0.185], [0.000, -0.405], [0.075, -0.020], 4],
  ];

  for (let i = 0; i < facetData.length; i++) {
    const f = facetData[i];
    const facetShape = new THREE.Shape();
    facetShape.moveTo(f[0][0], f[0][1]);
    facetShape.lineTo(f[1][0], f[1][1]);
    facetShape.lineTo(f[2][0], f[2][1]);
    facetShape.closePath();
    const facetGeom = new THREE.ShapeGeometry(facetShape);
    const facet = new THREE.Mesh(facetGeom, facetMats[f[3]]);
    facet.name = "gemstone_facet_" + i;
    facet.position.z = 0.052;
    gemstone_facets.add(facet);
  }

  const table_highlightShape = new THREE.Shape();
  table_highlightShape.moveTo(0.000, 0.185);
  table_highlightShape.lineTo(-0.055, 0.020);
  table_highlightShape.lineTo(0.000, -0.115);
  table_highlightShape.lineTo(0.055, 0.020);
  table_highlightShape.closePath();
  const table_highlightGeom = new THREE.ShapeGeometry(table_highlightShape);
  const table_highlight = new THREE.Mesh(table_highlightGeom, facetMats[4]);
  table_highlight.name = "table_highlight";
  table_highlight.position.z = 0.054;
  gemstone_facets.add(table_highlight);

  const bailGeom = new THREE.TorusGeometry(0.035, 0.008, 10, 28);
  const bail = new THREE.Mesh(bailGeom, silverMat);
  bail.name = "bail";
  bail.scale.set(0.72, 1.18, 1);
  bail.position.set(0, 0.505, 0.018);
  root.add(bail);

  const chain_linksGeom = new THREE.TorusGeometry(0.026, 0.0055, 8, 24);
  const chain_links = new THREE.InstancedMesh(chain_linksGeom, silverMat, 34);
  chain_links.name = "chain_links";
  const linkDummy = new THREE.Object3D();
  let linkIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 17; i++) {
      const t = i / 16;
      const x = side * (0.045 + 0.39 * t + 0.035 * Math.sin(Math.PI * t));
      const y = 0.535 + 0.72 * t;
      const dx = side * (0.39 + 0.035 * Math.PI * Math.cos(Math.PI * t));
      const dy = 0.72;
      const tangentAngle = Math.atan2(dy, dx);
      const tilt = i % 2 === 0 ? 0.55 : -0.55;
      linkDummy.position.set(x, y, 0.006);
      linkDummy.rotation.set(tilt, 0, tangentAngle - Math.PI / 2);
      linkDummy.scale.set(0.72, 1.18, 1);
      linkDummy.updateMatrix();
      chain_links.setMatrixAt(linkIndex++, linkDummy.matrix);
    }
  }
  chain_links.instanceMatrix.needsUpdate = true;
  root.add(chain_links);

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
