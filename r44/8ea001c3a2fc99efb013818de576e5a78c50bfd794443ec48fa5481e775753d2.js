// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const length = 3.2;
  const outerR = 0.34;
  const innerR = 0.245;
  const rimR = (outerR + innerR) * 0.5;
  const rimThickness = outerR - innerR;

  const carbon_tubeMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });

  const carbon_weave_lightMat = new THREE.MeshStandardMaterial({
    color: 0x555555,
    metalness: 0.0,
    roughness: 0.3,
  });

  const carbon_weave_darkMat = new THREE.MeshStandardMaterial({
    color: 0x292929,
    metalness: 0.0,
    roughness: 0.3,
  });

  const inner_boreMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.BackSide,
  });

  const bore_shadowMat = new THREE.MeshBasicMaterial({
    color: 0x010101,
    side: THREE.DoubleSide,
  });

  const carbon_tubeGeom = new THREE.CylinderGeometry(
    outerR, outerR, length, 96, 1, true
  );
  const carbon_tube = new THREE.Mesh(carbon_tubeGeom, carbon_tubeMat);
  carbon_tube.rotation.z = Math.PI / 2;
  root.add(carbon_tube);

  const inner_boreGeom = new THREE.CylinderGeometry(
    innerR, innerR, length - 0.035, 96, 1, true
  );
  const inner_bore = new THREE.Mesh(inner_boreGeom, inner_boreMat);
  inner_bore.rotation.z = Math.PI / 2;
  root.add(inner_bore);

  const end_rimGeom = new THREE.RingGeometry(innerR, outerR, 96);

  const left_end_rim = new THREE.Mesh(end_rimGeom, carbon_tubeMat);
  left_end_rim.rotation.y = -Math.PI / 2;
  left_end_rim.position.x = -length / 2 - 0.002;
  root.add(left_end_rim);

  const right_end_rim = new THREE.Mesh(end_rimGeom, carbon_tubeMat);
  right_end_rim.rotation.y = Math.PI / 2;
  right_end_rim.position.x = length / 2 + 0.002;
  root.add(right_end_rim);

  const outer_edgeGeom = new THREE.TorusGeometry(
    outerR - rimThickness * 0.5, rimThickness * 0.5, 12, 96
  );
  const inner_edgeGeom = new THREE.TorusGeometry(
    innerR + rimThickness * 0.5, rimThickness * 0.5, 12, 96
  );

  const left_outer_edge = new THREE.Mesh(outer_edgeGeom, carbon_tubeMat);
  left_outer_edge.rotation.y = Math.PI / 2;
  left_outer_edge.position.x = -length / 2;
  root.add(left_outer_edge);

  const right_outer_edge = new THREE.Mesh(outer_edgeGeom, carbon_tubeMat);
  right_outer_edge.rotation.y = Math.PI / 2;
  right_outer_edge.position.x = length / 2;
  root.add(right_outer_edge);

  const left_inner_edge = new THREE.Mesh(inner_edgeGeom, carbon_tubeMat);
  left_inner_edge.rotation.y = Math.PI / 2;
  left_inner_edge.position.x = -length / 2;
  root.add(left_inner_edge);

  const right_inner_edge = new THREE.Mesh(inner_edgeGeom, carbon_tubeMat);
  right_inner_edge.rotation.y = Math.PI / 2;
  right_inner_edge.position.x = length / 2;
  root.add(right_inner_edge);

  const bore_shadowGeom = new THREE.CircleGeometry(innerR * 0.98, 64);

  const left_bore_shadow = new THREE.Mesh(bore_shadowGeom, bore_shadowMat);
  left_bore_shadow.rotation.y = -Math.PI / 2;
  left_bore_shadow.position.x = -length / 2 + 0.075;
  root.add(left_bore_shadow);

  const right_bore_shadow = new THREE.Mesh(bore_shadowGeom, bore_shadowMat);
  right_bore_shadow.rotation.y = Math.PI / 2;
  right_bore_shadow.position.x = length / 2 - 0.075;
  root.add(right_bore_shadow);

  const weaveCols = 52;
  const weaveRows = 18;
  const weaveCount = weaveCols * weaveRows;
  const weaveRadius = outerR + 0.003;
  const weavePitchX = length / weaveCols;
  const weavePitchArc = Math.PI * 2 / weaveRows;

  const carbon_weaveGeom = new THREE.BoxGeometry(
    weavePitchX * 1.08,
    0.013,
    weavePitchArc * 1.08
  );

  const carbon_weave_light = new THREE.InstancedMesh(
    carbon_weaveGeom,
    carbon_weave_lightMat,
    weaveCount
  );
  const carbon_weave_dark = new THREE.InstancedMesh(
    carbon_weaveGeom,
    carbon_weave_darkMat,
    weaveCount
  );

  const weave_dummy = new THREE.Object3D();
  let lightIndex = 0;
  let darkIndex = 0;

  for (let i = 0; i < weaveCols; i++) {
    const x = -length / 2 + weavePitchX * (i + 0.5);
    for (let j = 0; j < weaveRows; j++) {
      const angle =
        weavePitchArc * (j + (i % 2) * 0.5) +
        (i % 2 === 0 ? -0.055 : 0.055);

      weave_dummy.position.set(
        x,
        Math.cos(angle) * weaveRadius,
        Math.sin(angle) * weaveRadius
      );
      weave_dummy.rotation.set(angle, 0, 0);
      weave_dummy.scale.set(1, 1, 1);
      weave_dummy.updateMatrix();

      if ((i + j) % 2 === 0) {
        carbon_weave_light.setMatrixAt(lightIndex++, weave_dummy.matrix);
      } else {
        carbon_weave_dark.setMatrixAt(darkIndex++, weave_dummy.matrix);
      }
    }
  }

  carbon_weave_light.instanceMatrix.needsUpdate = true;
  carbon_weave_dark.instanceMatrix.needsUpdate = true;
  root.add(carbon_weave_light, carbon_weave_dark);

  const rimCols = 22;
  const rimRows = 4;
  const rimCount = rimCols * rimRows * 2;
  const rim_weaveGeom = new THREE.BoxGeometry(
    0.026,
    0.012,
    (rimThickness / rimRows) * 1.08
  );
  const rim_weave = new THREE.InstancedMesh(
    rim_weaveGeom,
    carbon_weave_lightMat,
    rimCount
  );

  const rim_dummy = new THREE.Object3D();
  let rimIndex = 0;

  for (const side of [-1, 1]) {
    for (let i = 0; i < rimCols; i++) {
      const angle = Math.PI * 2 * i / rimCols;
      for (let j = 0; j < rimRows; j++) {
        const radius =
          innerR + rimThickness * (j + 0.5) / rimRows;
        rim_dummy.position.set(
          side * (length / 2 + 0.006),
          Math.cos(angle) * radius,
          Math.sin(angle) * radius
        );
        rim_dummy.rotation.set(angle, 0, 0);
        rim_dummy.scale.set(1, 1, 1);
        rim_dummy.updateMatrix();
        rim_weave.setMatrixAt(rimIndex++, rim_dummy.matrix);
      }
    }
  }

  rim_weave.instanceMatrix.needsUpdate = true;
  root.add(rim_weave);

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