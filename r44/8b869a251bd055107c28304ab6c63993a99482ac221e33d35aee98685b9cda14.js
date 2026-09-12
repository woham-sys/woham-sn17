// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const bookW = 1.05;
  const bookH = 1.48;
  const pageW = 0.91;
  const pageH = 1.39;
  const pageD = 0.18;
  const coverT = 0.035;
  const coverZ = pageD / 2 + coverT / 2;
  const spineR = 0.145;
  const spineX = -bookW / 2 + 0.015;

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x681824,
    metalness: 0.0,
    roughness: 0.7,
  });
  const darkLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x4b1019,
    metalness: 0.0,
    roughness: 0.75,
  });
  const pageMat = new THREE.MeshStandardMaterial({
    color: 0xf1e7cf,
    metalness: 0.0,
    roughness: 0.9,
  });
  const pageLineMat = new THREE.MeshStandardMaterial({
    color: 0xc9b994,
    metalness: 0.0,
    roughness: 0.9,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd6b85a,
    metalness: 0.5,
    roughness: 0.25,
  });
  const embossMat = new THREE.MeshStandardMaterial({
    color: 0x54121c,
    metalness: 0.0,
    roughness: 0.75,
  });

  function roundedRectShape(w, h, r) {
    const x = -w / 2;
    const y = -h / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    return shape;
  }

  const page_blockGeom = new THREE.BoxGeometry(pageW, pageH, pageD);
  const page_block = new THREE.Mesh(page_blockGeom, pageMat);
  page_block.position.set(0.035, 0, 0);
  root.add(page_block);

  const front_coverGeom = new THREE.ExtrudeGeometry(
    roundedRectShape(bookW, bookH, 0.045),
    {
      depth: coverT,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.006,
      bevelSegments: 2,
      curveSegments: 8,
    }
  );
  const front_cover = new THREE.Mesh(front_coverGeom, leatherMat);
  front_cover.position.z = pageD / 2;
  root.add(front_cover);

  const back_cover = new THREE.Mesh(front_coverGeom, leatherMat);
  back_cover.position.z = -pageD / 2 - coverT;
  root.add(back_cover);

  const spineGeom = new THREE.CylinderGeometry(spineR, spineR, bookH - 0.035, 32);
  const spine = new THREE.Mesh(spineGeom, leatherMat);
  spine.position.set(spineX, 0, 0);
  spine.scale.x = 0.58;
  root.add(spine);

  const front_hingeGeom = new THREE.CylinderGeometry(0.014, 0.014, bookH - 0.08, 16);
  const front_hinge = new THREE.Mesh(front_hingeGeom, darkLeatherMat);
  front_hinge.position.set(-0.405, 0, coverZ + 0.018);
  root.add(front_hinge);

  const back_hinge = new THREE.Mesh(front_hingeGeom, darkLeatherMat);
  back_hinge.position.set(-0.405, 0, -coverZ - 0.018);
  root.add(back_hinge);

  const top_page_lineGeom = new THREE.BoxGeometry(pageW - 0.035, 0.0025, 0.003);
  const top_page_lines = new THREE.InstancedMesh(top_page_lineGeom, pageLineMat, 12);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    dummy.position.set(0.035, pageH / 2 + 0.002, -pageD / 2 + pageD * (i + 0.5) / 12);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    top_page_lines.setMatrixAt(i, dummy.matrix);
  }
  root.add(top_page_lines);

  const fore_edge_lineGeom = new THREE.BoxGeometry(0.003, 0.0025, pageD - 0.018);
  const fore_edge_lines = new THREE.InstancedMesh(fore_edge_lineGeom, pageLineMat, 18);
  for (let i = 0; i < 18; i++) {
    dummy.position.set(0.035 + pageW / 2 + 0.002, -pageH / 2 + pageH * (i + 0.5) / 18, 0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    fore_edge_lines.setMatrixAt(i, dummy.matrix);
  }
  root.add(fore_edge_lines);

  const headbandGeom = new THREE.CylinderGeometry(0.012, 0.012, pageD + 0.01, 12);
  const top_headband = new THREE.Mesh(headbandGeom, goldMat);
  top_headband.rotation.x = Math.PI / 2;
  top_headband.position.set(-0.385, pageH / 2 + 0.004, 0);
  root.add(top_headband);

  const bottom_headband = new THREE.Mesh(headbandGeom, goldMat);
  bottom_headband.rotation.x = Math.PI / 2;
  bottom_headband.position.set(-0.385, -pageH / 2 - 0.004, 0);
  root.add(bottom_headband);

  const glyphSegments = {
    A: [[0, 0, 0.5, 1], [0.5, 1, 1, 0], [0.22, 0.45, 0.78, 0.45]],
    B: [[0, 0, 0, 1], [0, 1, 0.72, 1], [0.72, 1, 1, 0.78], [1, 0.78, 0.72, 0.52], [0.72, 0.52, 0, 0.52], [0.72, 0.52, 1, 0.28], [1, 0.28, 0.72, 0], [0.72, 0, 0, 0]],
    C: [[1, 1, 0, 1], [0, 1, 0, 0], [0, 0, 1, 0]],
    D: [[0, 0, 0, 1], [0, 1, 0.72, 1], [0.72, 1, 1, 0.75], [1, 0.75, 1, 0.25], [1, 0.25, 0.72, 0], [0.72, 0, 0, 0]],
    E: [[0, 0, 0, 1], [0, 1, 1, 1], [0, 0.5, 0.82, 0.5], [0, 0, 1, 0]],
    F: [[0, 0, 0, 1], [0, 1, 1, 1], [0, 0.5, 0.82, 0.5]],
    G: [[1, 1, 0, 1], [0, 1, 0, 0], [0, 0, 1, 0], [1, 0, 1, 0.48], [1, 0.48, 0.55, 0.48]],
    H: [[0, 0, 0, 1], [1, 0, 1, 1], [0, 0.5, 1, 0.5]],
    I: [[0, 1, 1, 1], [0.5, 1, 0.5, 0], [0, 0, 1, 0]],
    J: [[0, 1, 1, 1], [0.78, 1, 0.78, 0.18], [0.78, 0.18, 0.55, 0], [0.55, 0, 0.12, 0], [0.12, 0, 0, 0.2]],
    K: [[0, 0, 0, 1], [0, 0.48, 1, 1], [0, 0.48, 1, 0]],
    L: [[0, 1, 0, 0], [0, 0, 1, 0]],
    M: [[0, 0, 0, 1], [0, 1, 0.5, 0.48], [0.5, 0.48, 1, 1], [1, 1, 1, 0]],
    N: [[0, 0, 0, 1], [0, 1, 1, 0], [1, 0, 1, 1]],
    O: [[0, 0, 0, 1], [0, 1, 1, 1], [1, 1, 1, 0], [1, 0, 0, 0]],
    P: [[0, 0, 0, 1], [0, 1, 0.78, 1], [0.78, 1, 1, 0.75], [1, 0.75, 0.78, 0.5], [0.78, 0.5, 0, 0.5]],
    Q: [[0, 0, 0, 1], [0, 1, 1, 1], [1, 1, 1, 0], [1, 0, 0, 0], [0.55, 0.28, 1.08, -0.12]],
    R: [[0, 0, 0, 1], [0, 1, 0.78, 1], [0.78, 1, 1, 0.75], [1, 0.75, 0.78, 0.5], [0.78, 0.5, 0, 0.5], [0.55, 0.5, 1, 0]],
    S: [[1, 1, 0, 1], [0, 1, 0, 0.52], [0, 0.52, 1, 0.52], [1, 0.52, 1, 0], [1, 0, 0, 0]],
    T: [[0, 1, 1, 1], [0.5, 1, 0.5, 0]],
    U: [[0, 1, 0, 0.18], [0, 0.18, 0.2, 0], [0.2, 0, 0.8, 0], [0.8, 0, 1, 0.18], [1, 0.18, 1, 1]],
    V: [[0, 1, 0.5, 0], [0.5, 0, 1, 1]],
    W: [[0, 1, 0.22, 0], [0.22, 0, 0.5, 0.55], [0.5, 0.55, 0.78, 0], [0.78, 0, 1, 1]],
    X: [[0, 1, 1, 0], [1, 1, 0, 0]],
    Y: [[0, 1, 0.5, 0.52], [1, 1, 0.5, 0.52], [0.5, 0.52, 0.5, 0]],
    Z: [[0, 1, 1, 1], [1, 1, 0, 0], [0, 0, 1, 0]],
  };

  function makeStrokeText(text, size, thickness, depth, mat) {
    let count = 0;
    for (const ch of text) {
      if (ch !== " " && glyphSegments[ch]) count += glyphSegments[ch].length;
    }
    const geom = new THREE.BoxGeometry(1, 1, 1);
    const mesh = new THREE.InstancedMesh(geom, mat, count);
    const advance = size * 1.22;
    let index = 0;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === " ") continue;
      const segs = glyphSegments[ch] || [];
      for (const seg of segs) {
        const x1 = i * advance + seg[0] * size;
        const y1 = seg[1] * size;
        const x2 = i * advance + seg[2] * size;
        const y2 = seg[3] * size;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.sqrt(dx * dx + dy * dy);
        dummy.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0);
        dummy.rotation.set(0, 0, Math.atan2(dy, dx));
        dummy.scale.set(len, thickness, depth);
        dummy.updateMatrix();
        mesh.setMatrixAt(index++, dummy.matrix);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const front_title = makeStrokeText("TERGEACK", 0.082, 0.009, 0.006, goldMat);
  front_title.position.set(-0.285, 0.245, coverZ + 0.027);
  root.add(front_title);

  const front_subtitle = makeStrokeText("EASABE LEAE", 0.041, 0.0055, 0.005, goldMat);
  front_subtitle.position.set(-0.205, 0.105, coverZ + 0.027);
  root.add(front_subtitle);

  const spine_title = makeStrokeText("HILE", 0.032, 0.0045, 0.005, goldMat);
  spine_title.rotation.y = -Math.PI / 2;
  spine_title.position.set(spineX - spineR * 0.58 - 0.008, 0.405, 0.015);
  root.add(spine_title);

  const spine_author = makeStrokeText("NICHIFAEY", 0.024, 0.0038, 0.005, goldMat);
  spine_author.rotation.y = -Math.PI / 2;
  spine_author.position.set(spineX - spineR * 0.58 - 0.008, 0.315, -0.075);
  root.add(spine_author);

  const spine_publisher = makeStrokeText("HIDU ONELIE", 0.021, 0.0035, 0.005, goldMat);
  spine_publisher.rotation.y = -Math.PI / 2;
  spine_publisher.position.set(spineX - spineR * 0.58 - 0.008, 0.155, -0.07);
  root.add(spine_publisher);

  const spine_mark = makeStrokeText("HNALE", 0.022, 0.0035, 0.005, goldMat);
  spine_mark.rotation.y = -Math.PI / 2;
  spine_mark.position.set(spineX - spineR * 0.58 - 0.008, -0.61, -0.045);
  root.add(spine_mark);

  const emblemGeom = new THREE.BoxGeometry(1, 1, 1);
  const emblemData = [
    [-0.045, 0.585, 0.075, 0.006, -0.72],
    [-0.015, 0.585, 0.075, 0.006, 0.72],
    [0.015, 0.585, 0.075, 0.006, -0.72],
    [0.045, 0.585, 0.075, 0.006, 0.72],
    [0.0, 0.545, 0.09, 0.005, Math.PI / 2],
    [0.0, 0.515, 0.07, 0.005, Math.PI / 2],
    [0.39, 0.585, 0.075, 0.006, -0.72],
    [0.42, 0.585, 0.075, 0.006, 0.72],
    [0.45, 0.585, 0.075, 0.006, -0.72],
    [0.48, 0.585, 0.075, 0.006, 0.72],
    [0.435, 0.545, 0.09, 0.005, Math.PI / 2],
    [0.435, 0.515, 0.07, 0.005, Math.PI / 2],
  ];
  const front_emboss_lines = new THREE.InstancedMesh(emblemGeom, embossMat, emblemData.length);
  for (let i = 0; i < emblemData.length; i++) {
    const e = emblemData[i];
    dummy.position.set(e[0], e[1], coverZ + 0.024);
    dummy.rotation.set(0, 0, e[4]);
    dummy.scale.set(e[2], e[3], 0.004);
    dummy.updateMatrix();
    front_emboss_lines.setMatrixAt(i, dummy.matrix);
  }
  root.add(front_emboss_lines);

  const spine_emblemGeom = new THREE.CircleGeometry(0.018, 12);
  const spine_emblem = new THREE.Mesh(spine_emblemGeom, goldMat);
  spine_emblem.rotation.y = -Math.PI / 2;
  spine_emblem.position.set(spineX - spineR * 0.58 - 0.01, -0.54, 0.0);
  root.add(spine_emblem);

  const spine_emblem_centerGeom = new THREE.CircleGeometry(0.007, 10);
  const spine_emblem_center = new THREE.Mesh(spine_emblem_centerGeom, goldMat);
  spine_emblem_center.rotation.y = -Math.PI / 2;
  spine_emblem_center.position.set(spineX - spineR * 0.58 - 0.011, -0.54, 0.0);
  root.add(spine_emblem_center);

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