function __sn17_user(THREE) {
  const root = new THREE.Group();
  const shell_group = new THREE.Group();
  root.add(shell_group);

  const radius_x = 1.0;
  const radius_y = 0.84;
  const radius_z = 0.92;

  const main_shellMat = new THREE.MeshStandardMaterial({
    color: 0xff0018,
    metalness: 0.0,
    roughness: 0.22,
    emissive: 0x4a0008,
    emissiveIntensity: 0.25,
  });
  const lower_shellMat = new THREE.MeshStandardMaterial({
    color: 0xff0018,
    metalness: 0.0,
    roughness: 0.24,
    emissive: 0x4a0008,
    emissiveIntensity: 0.25,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xb40012,
    metalness: 0.0,
    roughness: 0.3,
  });

  const main_shellGeom = new THREE.SphereGeometry(
    1,
    96,
    48,
    0,
    Math.PI * 2,
    0,
    1.98
  );
  const main_shell = new THREE.Mesh(main_shellGeom, main_shellMat);
  main_shell.scale.set(radius_x, radius_y, radius_z);
  shell_group.add(main_shell);

  const lower_shellGeom = new THREE.SphereGeometry(
    1,
    96,
    24,
    0,
    Math.PI * 2,
    1.98,
    Math.PI - 1.98
  );
  const lower_shell = new THREE.Mesh(lower_shellGeom, lower_shellMat);
  lower_shell.scale.set(radius_x, radius_y, radius_z);
  shell_group.add(lower_shell);

  function createEllipsoidLoop(theta, radial_scale) {
    const points = [];
    const count = 96;
    for (let i = 0; i < count; i++) {
      const phi = (i / count) * Math.PI * 2;
      const sin_theta = Math.sin(theta);
      points.push(
        new THREE.Vector3(
          radius_x * radial_scale * sin_theta * Math.cos(phi),
          radius_y * radial_scale * Math.cos(theta),
          radius_z * radial_scale * sin_theta * Math.sin(phi)
        )
      );
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }

  const equator_seamGeom = createEllipsoidLoop(Math.PI / 2, 1.003);
  const equator_seam = new THREE.Mesh(equator_seamGeom, seamMat);
  shell_group.add(equator_seam);

  const upper_panel_seamGeom = createEllipsoidLoop(0.62, 1.003);
  const upper_panel_seam = new THREE.Mesh(upper_panel_seamGeom, seamMat);
  shell_group.add(upper_panel_seam);

  const lower_panel_seamGeom = createEllipsoidLoop(2.38, 1.003);
  const lower_panel_seam = new THREE.Mesh(lower_panel_seamGeom, seamMat);
  shell_group.add(lower_panel_seam);

  function ellipsoidSurfacePose(phi, theta, offset) {
    const sin_theta = Math.sin(theta);
    const position = new THREE.Vector3(
      radius_x * sin_theta * Math.cos(phi),
      radius_y * Math.cos(theta),
      radius_z * sin_theta * Math.sin(phi)
    );
    const normal = new THREE.Vector3(
      position.x / (radius_x * radius_x),
      position.y / (radius_y * radius_y),
      position.z / (radius_z * radius_z)
    ).normalize();
    position.addScaledVector(normal, offset);
    return { position, normal };
  }

  const side_port_pose = ellipsoidSurfacePose(2.82, 1.78, 0.004);
  const side_port_rimGeom = new THREE.TorusGeometry(0.052, 0.006, 10, 32);
  const side_port_rim = new THREE.Mesh(side_port_rimGeom, seamMat);
  side_port_rim.position.copy(side_port_pose.position);
  side_port_rim.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    side_port_pose.normal
  );
  side_port_rim.scale.set(0.82, 1.18, 1);
  shell_group.add(side_port_rim);

  const side_port_centerGeom = new THREE.CircleGeometry(0.041, 32);
  const side_port_center = new THREE.Mesh(side_port_centerGeom, lower_shellMat);
  side_port_center.position
    .copy(side_port_pose.position)
    .addScaledVector(side_port_pose.normal, 0.002);
  side_port_center.quaternion.copy(side_port_rim.quaternion);
  side_port_center.scale.set(0.82, 1.18, 1);
  shell_group.add(side_port_center);

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
