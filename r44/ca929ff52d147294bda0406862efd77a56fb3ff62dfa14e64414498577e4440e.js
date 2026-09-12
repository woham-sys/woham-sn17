// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x087b85,
    metalness: 0.0,
    roughness: 0.7,
  });
  const leatherDarkMat = new THREE.MeshStandardMaterial({
    color: 0x075d66,
    metalness: 0.0,
    roughness: 0.7,
  });
  const leatherGrainMat = new THREE.MeshStandardMaterial({
    color: 0x0b858e,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const pageMat = new THREE.MeshStandardMaterial({
    color: 0xe8dfcd,
    metalness: 0.0,
    roughness: 0.9,
  });
  const pageLineMat = new THREE.MeshStandardMaterial({
    color: 0xb9ad99,
    metalness: 0.0,
    roughness: 0.9,
  });
  const stitchMat = new THREE.MeshStandardMaterial({
    color: 0x064c55,
    metalness: 0.0,
    roughness: 0.95,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd6ad55,
    metalness: 0.6,
    roughness: 0.2,
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);
    return shape;
  }

  function roundedRectPoints(width, height, radius, z, cornerSteps) {
    const points = [];
    const corners = [
      [width / 2 - radius, -height / 2 + radius, -Math.PI / 2, 0],
      [width / 2 - radius, height / 2 - radius, 0, Math.PI / 2],
      [-width / 2 + radius, height / 2 - radius, Math.PI / 2, Math.PI],
      [-width / 2 + radius, -height / 2 + radius, Math.PI, Math.PI * 1.5],
    ];
    for (const corner of corners) {
      for (let i = 0; i <= cornerSteps; i++) {
        const t = i / cornerSteps;
        const angle = corner[2] + (corner[3] - corner[2]) * t;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          corner[1] + Math.sin(angle) * radius,
          z
        ));
      }
    }
    return points;
  }

  const coverShape = roundedRectShape(1.0, 1.28, 0.065);
  const front_coverGeom = new THREE.ExtrudeGeometry(coverShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
    curveSegments: 12,
  });
  const front_cover = new THREE.Mesh(front_coverGeom, leatherMat);
  front_cover.position.set(0.015, 0, 0.075);
  root.add(front_cover);

  const back_cover = new THREE.Mesh(front_coverGeom, leatherMat);
  back_cover.position.set(0.015, 0, -0.112);
  root.add(back_cover);

  const page_blockGeom = new THREE.BoxGeometry(0.86, 1.10, 0.13);
  const page_block = new THREE.Mesh(page_blockGeom, pageMat);
  page_block.position.set(0.035, -0.02, 0);
  root.add(page_block);

  const spineGeom = new THREE.CylinderGeometry(0.105, 0.105, 1.20, 28);
  const spine = new THREE.Mesh(spineGeom, leatherMat);
  spine.position.set(-0.485, 0, 0);
  spine.scale.set(0.82, 1, 1);
  root.add(spine);

  const spine_capGeom = new THREE.SphereGeometry(0.105, 24, 12);
  const spine_top_cap = new THREE.Mesh(spine_capGeom, leatherMat);
  spine_top_cap.position.set(-0.485, 0.60, 0);
  spine_top_cap.scale.set(0.82, 0.72, 1);
  root.add(spine_top_cap);

  const spine_bottom_cap = new THREE.Mesh(spine_capGeom, leatherMat);
  spine_bottom_cap.position.set(-0.485, -0.60, 0);
  spine_bottom_cap.scale.set(0.82, 0.72, 1);
  root.add(spine_bottom_cap);

  const spine_hingeGeom = new THREE.CylinderGeometry(0.014, 0.014, 1.12, 12);
  const spine_hinge = new THREE.Mesh(spine_hingeGeom, leatherDarkMat);
  spine_hinge.position.set(-0.405, 0, 0.119);
  root.add(spine_hinge);

  const page_lineGeom = new THREE.BoxGeometry(0.82, 0.0025, 0.004);
  const page_lines = new THREE.InstancedMesh(page_lineGeom, pageLineMat, 12);
  const pageLineMatrix = new THREE.Matrix4();
  for (let i = 0; i < 12; i++) {
    pageLineMatrix.makeTranslation(0.045, -0.552 + i * 0.0095, 0.068);
    page_lines.setMatrixAt(i, pageLineMatrix);
  }
  page_lines.instanceMatrix.needsUpdate = true;
  root.add(page_lines);

  const bottom_page_shadowGeom = new THREE.BoxGeometry(0.84, 0.018, 0.012);
  const bottom_page_shadow = new THREE.Mesh(bottom_page_shadowGeom, pageLineMat);
  bottom_page_shadow.position.set(0.035, -0.574, 0.067);
  root.add(bottom_page_shadow);

  const coverPipePoints = roundedRectPoints(0.96, 1.20, 0.052, 0.128, 7);
  const cover_pipingGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(coverPipePoints, true, "centripetal"),
    112,
    0.008,
    8,
    true
  );
  const cover_piping = new THREE.Mesh(cover_pipingGeom, leatherDarkMat);
  cover_piping.position.x = 0.025;
  root.add(cover_piping);

  const stitchGeom = new THREE.BoxGeometry(0.025, 0.004, 0.004);
  const horizontalStitchCount = 23;
  const verticalStitchCount = 25;
  const totalStitches = horizontalStitchCount * 2 + verticalStitchCount * 2;
  const cover_stitches = new THREE.InstancedMesh(stitchGeom, stitchMat, totalStitches);
  const stitchMatrix = new THREE.Matrix4();
  const stitchPosition = new THREE.Vector3();
  const stitchQuaternion = new THREE.Quaternion();
  const stitchScale = new THREE.Vector3(1, 1, 1);
  const zAxis = new THREE.Vector3(0, 0, 1);
  let stitchIndex = 0;

  for (let i = 0; i < horizontalStitchCount; i++) {
    const t = i / (horizontalStitchCount - 1);
    const x = -0.395 + t * 0.82;
    stitchPosition.set(x, 0.584, 0.139);
    stitchQuaternion.identity();
    stitchMatrix.compose(stitchPosition, stitchQuaternion, stitchScale);
    cover_stitches.setMatrixAt(stitchIndex++, stitchMatrix);

    stitchPosition.set(x, -0.584, 0.139);
    stitchMatrix.compose(stitchPosition, stitchQuaternion, stitchScale);
    cover_stitches.setMatrixAt(stitchIndex++, stitchMatrix);
  }

  stitchQuaternion.setFromAxisAngle(zAxis, Math.PI / 2);
  for (let i = 0; i < verticalStitchCount; i++) {
    const t = i / (verticalStitchCount - 1);
    const y = -0.52 + t * 1.04;
    stitchPosition.set(-0.414, y, 0.139);
    stitchMatrix.compose(stitchPosition, stitchQuaternion, stitchScale);
    cover_stitches.setMatrixAt(stitchIndex++, stitchMatrix);

    stitchPosition.set(0.454, y, 0.139);
    stitchMatrix.compose(stitchPosition, stitchQuaternion, stitchScale);
    cover_stitches.setMatrixAt(stitchIndex++, stitchMatrix);
  }
  cover_stitches.instanceMatrix.needsUpdate = true;
  root.add(cover_stitches);

  const leather_grainGeom = new THREE.CircleGeometry(0.006, 8);
  const leather_grain = new THREE.InstancedMesh(leather_grainGeom, leatherGrainMat, 90);
  const grainMatrix = new THREE.Matrix4();
  const grainPosition = new THREE.Vector3();
  const grainQuaternion = new THREE.Quaternion();
  const grainScale = new THREE.Vector3();
  for (let i = 0; i < 90; i++) {
    const column = i % 10;
    const row = Math.floor(i / 10);
    const x = -0.35 + column * 0.082 + Math.sin(i * 1.7) * 0.012;
    const y = -0.49 + row * 0.14 + Math.cos(i * 2.3) * 0.014;
    const size = 0.55 + (i % 5) * 0.12;
    grainPosition.set(x, y, 0.130);
    grainQuaternion.setFromAxisAngle(zAxis, (i % 9) * 0.37);
    grainScale.set(size, size * 0.55, 1);
    grainMatrix.compose(grainPosition, grainQuaternion, grainScale);
    leather_grain.setMatrixAt(i, grainMatrix);
  }
  leather_grain.instanceMatrix.needsUpdate = true;
  root.add(leather_grain);

  const title_d = new THREE.Group();
  title_d.position.set(-0.13, -0.015, 0.143);
  root.add(title_d);

  const title_d_stemGeom = new THREE.BoxGeometry(0.014, 0.11, 0.008);
  const title_d_stem = new THREE.Mesh(title_d_stemGeom, goldMat);
  title_d_stem.position.x = -0.035;
  title_d.add(title_d_stem);

  const title_d_bowlGeom = new THREE.TorusGeometry(0.043, 0.0065, 8, 28);
  const title_d_bowl = new THREE.Mesh(title_d_bowlGeom, goldMat);
  title_d_bowl.position.x = 0.008;
  title_d_bowl.scale.x = 0.72;
  title_d.add(title_d_bowl);

  const title_d_top_serifGeom = new THREE.BoxGeometry(0.035, 0.007, 0.008);
  const title_d_top_serif = new THREE.Mesh(title_d_top_serifGeom, goldMat);
  title_d_top_serif.position.set(-0.025, 0.052, 0);
  title_d.add(title_d_top_serif);

  const title_d_bottom_serif = new THREE.Mesh(title_d_top_serifGeom, goldMat);
  title_d_bottom_serif.position.set(-0.025, -0.052, 0);
  title_d.add(title_d_bottom_serif);

  const title_i = new THREE.Group();
  title_i.position.set(-0.045, -0.015, 0.143);
  root.add(title_i);

  const title_i_stemGeom = new THREE.BoxGeometry(0.012, 0.075, 0.008);
  const title_i_stem = new THREE.Mesh(title_i_stemGeom, goldMat);
  title_i.add(title_i_stem);

  const title_i_dotGeom = new THREE.SphereGeometry(0.009, 12, 8);
  const title_i_dot = new THREE.Mesh(title_i_dotGeom, goldMat);
  title_i_dot.position.y = 0.052;
  title_i_dot.scale.z = 0.45;
  title_i.add(title_i_dot);

  const title_l = new THREE.Group();
  title_l.position.set(0.025, -0.015, 0.143);
  root.add(title_l);

  const title_l_stemGeom = new THREE.BoxGeometry(0.013, 0.11, 0.008);
  const title_l_stem = new THREE.Mesh(title_l_stemGeom, goldMat);
  title_l_stem.position.x = 0.006;
  title_l.add(title_l_stem);

  const title_l_baseGeom = new THREE.BoxGeometry(0.038, 0.008, 0.008);
  const title_l_base = new THREE.Mesh(title_l_baseGeom, goldMat);
  title_l_base.position.set(0.017, -0.052, 0);
  title_l.add(title_l_base);

  const title_a = new THREE.Group();
  title_a.position.set(0.105, -0.015, 0.143);
  root.add(title_a);

  const title_a_loopGeom = new THREE.TorusGeometry(0.032, 0.006, 8, 26);
  const title_a_loop = new THREE.Mesh(title_a_loopGeom, goldMat);
  title_a_loop.scale.x = 0.78;
  title_a.add(title_a_loop);

  const title_a_stemGeom = new THREE.BoxGeometry(0.010, 0.064, 0.008);
  const title_a_stem = new THREE.Mesh(title_a_stemGeom, goldMat);
  title_a_stem.position.set(0.027, -0.002, 0);
  title_a.add(title_a_stem);

  const title_emblemGeom = new THREE.OctahedronGeometry(0.014, 0);
  const title_emblem = new THREE.Mesh(title_emblemGeom, goldMat);
  title_emblem.position.set(0.015, -0.105, 0.145);
  title_emblem.scale.set(1, 1, 0.35);
  root.add(title_emblem);

  const emblem_centerGeom = new THREE.SphereGeometry(0.005, 10, 6);
  const emblem_center = new THREE.Mesh(emblem_centerGeom, goldMat);
  emblem_center.position.set(0.015, -0.105, 0.151);
  emblem_center.scale.z = 0.4;
  root.add(emblem_center);

  const spine_claspGeom = new THREE.BoxGeometry(0.018, 0.035, 0.018);
  const spine_clasp = new THREE.Mesh(spine_claspGeom, goldMat);
  spine_clasp.position.set(-0.574, 0.34, 0.025);
  root.add(spine_clasp);

  const lower_spine_markGeom = new THREE.BoxGeometry(0.012, 0.025, 0.014);
  const lower_spine_mark = new THREE.Mesh(lower_spine_markGeom, goldMat);
  lower_spine_mark.position.set(-0.572, -0.47, 0.02);
  root.add(lower_spine_mark);

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