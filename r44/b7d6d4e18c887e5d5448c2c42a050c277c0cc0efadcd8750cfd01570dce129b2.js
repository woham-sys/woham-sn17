// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rgb_light_tower";

  const bodyR = 0.42;
  const panelW = 0.56;
  const panelH = 2.28;
  const panelCenterY = -0.02;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x11171d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const capMat = new THREE.MeshStandardMaterial({
    color: 0x090c10,
    metalness: 0.0,
    roughness: 0.3,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x05070a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const panel_frameMat = new THREE.MeshStandardMaterial({
    color: 0x101820,
    metalness: 0.0,
    roughness: 0.3,
  });
  const diffuserMat = new THREE.MeshPhysicalMaterial({
    color: 0x7890a0,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const top_lensMat = new THREE.MeshPhysicalMaterial({
    color: 0x9aa5ad,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.78,
  });
  const lens_detailMat = new THREE.MeshStandardMaterial({
    color: 0x66727c,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.42,
  });
  const grilleMat = new THREE.MeshStandardMaterial({
    color: 0x252b31,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const grille_holeMat = new THREE.MeshStandardMaterial({
    color: 0x050608,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  function makeLedMaterial(color, opacity) {
    return new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 1.0,
      metalness: 0.0,
      roughness: 0.5,
      transparent: opacity < 1,
      opacity,
      depthWrite: opacity >= 1 ? false : true,
      side: THREE.DoubleSide,
    });
  }

  const led_redMat = makeLedMaterial(0xff1744, 1.0);
  const led_magentaMat = makeLedMaterial(0xff00d8, 1.0);
  const led_purpleMat = makeLedMaterial(0x8e35ff, 1.0);
  const led_blueMat = makeLedMaterial(0x1676ff, 1.0);
  const led_cyanMat = makeLedMaterial(0x00e6d5, 1.0);
  const led_greenMat = makeLedMaterial(0x39ff9b, 1.0);
  const led_whiteMat = makeLedMaterial(0xffffff, 1.0);

  const led_glowMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  function createRoundedPanelGeometry(width, height, radius, depth, bevel) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;

    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function createCurvedRoundedPanelGeometry(
    width,
    height,
    radius,
    radialOffset,
    columns,
    rows
  ) {
    const positions = [];
    const indices = [];
    const halfW = width / 2;
    const halfH = height / 2;
    const cornerR = Math.min(radius, halfW, halfH);
    const cornerCenters = [
      [halfW - cornerR, halfH - cornerR, 0],
      [-halfW + cornerR, halfH - cornerR, Math.PI / 2],
      [-halfW + cornerR, -halfH + cornerR, Math.PI],
      [halfW - cornerR, -halfH + cornerR, Math.PI * 1.5],
    ];
    const cornerSegments = 5;
    const perimeter = [];

    for (let cornerIndex = 0; cornerIndex < 4; cornerIndex++) {
      const corner = cornerCenters[cornerIndex];
      for (let i = 0; i < cornerSegments; i++) {
        const angle = corner[2] + (i / cornerSegments) * Math.PI / 2;
        perimeter.push({
          u: corner[0] + Math.cos(angle) * cornerR,
          v: corner[1] + Math.sin(angle) * cornerR,
        });
      }
    }

    for (let row = 0; row <= rows; row++) {
      const v = -halfH + (row / rows) * height;
      for (let column = 0; column <= columns; column++) {
        const u = -halfW + (column / columns) * width;
        const theta = u / bodyR;
        const radial = bodyR + radialOffset;
        positions.push(
          Math.sin(theta) * radial,
          v,
          Math.cos(theta) * radial
        );
      }
    }

    for (let row = 0; row < rows; row++) {
      const v0 = -halfH + (row / rows) * height;
      const v1 = -halfH + ((row + 1) / rows) * height;
      const middleV = (v0 + v1) / 2;

      for (let column = 0; column < columns; column++) {
        const u0 = -halfW + (column / columns) * width;
        const u1 = -halfW + ((column + 1) / columns) * width;
        const middleU = (u0 + u1) / 2;
        let inside = true;

        if (Math.abs(middleU) > halfW - 0.00001) {
          inside = Math.abs(middleU) <= halfW;
        }
        if (Math.abs(middleV) > halfH - 0.00001) {
          inside = Math.abs(middleV) <= halfH;
        }

        if (inside) {
          const cornerDistance = Math.max(
            Math.abs(middleU) - (halfW - cornerR),
            Math.abs(middleV) - (halfH - cornerR)
          );
          inside =
            cornerDistance <= 0 ||
            cornerDistance * cornerDistance <=
              cornerR * cornerR - 0.00001;
        }

        if (!inside) continue;

        const a = row * (columns + 1) + column;
        const b = a + 1;
        const c = a + columns + 1;
        const d = c + 1;
        indices.push(a, b, c, b, d, c);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createCurvedPatchGeometry(
    centerU,
    centerV,
    radiusU,
    radiusV,
    radialOffset,
    rings,
    segments
  ) {
    const positions = [];
    const indices = [];
    const centerTheta = centerU / bodyR;
    const centerRadial = bodyR + radialOffset;

    positions.push(
      Math.sin(centerTheta) * centerRadial,
      centerV,
      Math.cos(centerTheta) * centerRadial
    );

    for (let ring = 1; ring <= rings; ring++) {
      const ringScale = ring / rings;
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const u = centerU + Math.cos(angle) * radiusU * ringScale;
        const v = centerV + Math.sin(angle) * radiusV * ringScale;
        const theta = u / bodyR;
        const radial = bodyR + radialOffset;
        positions.push(
          Math.sin(theta) * radial,
          v,
          Math.cos(theta) * radial
        );
      }
    }

    for (let i = 0; i < segments; i++) {
      indices.push(0, 1 + i, 1 + ((i + 1) % segments));
    }

    for (let ring = 2; ring <= rings; ring++) {
      const innerStart = 1 + (ring - 2) * segments;
      const outerStart = 1 + (ring - 1) * segments;
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        const innerA = innerStart + i;
        const innerB = innerStart + next;
        const outerA = outerStart + i;
        const outerB = outerStart + next;
        indices.push(
          innerA, outerA, innerB,
          innerB, outerA, outerB
        );
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createCurvedEllipseGeometry(
    centerU,
    centerV,
    radiusU,
    radiusV,
    radialOffset,
    segments
  ) {
    const positions = [];
    const indices = [];
    const centerTheta = centerU / bodyR;
    const radial = bodyR + radialOffset;

    positions.push(
      Math.sin(centerTheta) * radial,
      centerV,
      Math.cos(centerTheta) * radial
    );

    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const u = centerU + Math.cos(angle) * radiusU;
      const v = centerV + Math.sin(angle) * radiusV;
      const theta = u / bodyR;
      positions.push(
        Math.sin(theta) * radial,
        v,
        Math.cos(theta) * radial
      );
    }

    for (let i = 0; i < segments; i++) {
      indices.push(0, 1 + i, 1 + ((i + 1) % segments));
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createLedBandGeometry(y0, y1) {
    return createCurvedRoundedPanelGeometry(
      panelW - 0.055,
      y1 - y0,
      0.055,
      0.028,
      12,
      3
    );
  }

  function addCurvedLedPatch(
    parent,
    name,
    material,
    u,
    v,
    radiusU,
    radiusV,
    radialOffset
  ) {
    const patchGeom = createCurvedPatchGeometry(
      u,
      v,
      radiusU,
      radiusV,
      radialOffset,
      3,
      24
    );
    const patch = new THREE.Mesh(patchGeom, material);
    patch.name = name;
    parent.add(patch);
    return patch;
  }

  const main_bodyGeom = new THREE.CylinderGeometry(
    bodyR,
    bodyR,
    2.72,
    48
  );
  const main_body = new THREE.Mesh(main_bodyGeom, bodyMat);
  main_body.name = "main_body";
  root.add(main_body);

  const front_panel_frameGeom = createCurvedRoundedPanelGeometry(
    panelW + 0.06,
    panelH + 0.07,
    0.085,
    0.012,
    14,
    24
  );
  const front_panel_frame = new THREE.Mesh(
    front_panel_frameGeom,
    panel_frameMat
  );
  front_panel_frame.name = "front_panel_frame";
  front_panel_frame.position.y = panelCenterY;
  root.add(front_panel_frame);

  const front_diffuserGeom = createCurvedRoundedPanelGeometry(
    panelW,
    panelH,
    0.075,
    0.022,
    14,
    24
  );
  const front_diffuser = new THREE.Mesh(front_diffuserGeom, diffuserMat);
  front_diffuser.name = "front_diffuser";
  front_diffuser.position.y = panelCenterY;
  root.add(front_diffuser);

  const led_top_redGeom = createLedBandGeometry(0.79, 1.10);
  const led_top_red = new THREE.Mesh(led_top_redGeom, led_redMat);
  led_top_red.name = "led_top_red";
  led_top_red.position.y = (0.79 + 1.10) / 2;
  root.add(led_top_red);

  const led_upper_magentaGeom = createLedBandGeometry(0.39, 0.81);
  const led_upper_magenta = new THREE.Mesh(
    led_upper_magentaGeom,
    led_magentaMat
  );
  led_upper_magenta.name = "led_upper_magenta";
  led_upper_magenta.position.y = (0.39 + 0.81) / 2;
  root.add(led_upper_magenta);

  const led_middle_purpleGeom = createLedBandGeometry(-0.03, 0.41);
  const led_middle_purple = new THREE.Mesh(
    led_middle_purpleGeom,
    led_purpleMat
  );
  led_middle_purple.name = "led_middle_purple";
  led_middle_purple.position.y = (-0.03 + 0.41) / 2;
  root.add(led_middle_purple);

  const led_lower_blueGeom = createLedBandGeometry(-0.46, -0.01);
  const led_lower_blue = new THREE.Mesh(led_lower_blueGeom, led_blueMat);
  led_lower_blue.name = "led_lower_blue";
  led_lower_blue.position.y = (-0.46 + -0.01) / 2;
  root.add(led_lower_blue);

  const led_bottom_cyanGeom = createLedBandGeometry(-1.13, -0.44);
  const led_bottom_cyan = new THREE.Mesh(
    led_bottom_cyanGeom,
    led_cyanMat
  );
  led_bottom_cyan.name = "led_bottom_cyan";
  led_bottom_cyan.position.y = (-1.13 + -0.44) / 2;
  root.add(led_bottom_cyan);

  const led_green_accentGeom = createLedBandGeometry(-0.70, -0.50);
  const led_green_accent = new THREE.Mesh(
    led_green_accentGeom,
    led_greenMat
  );
  led_green_accent.name = "led_green_accent";
  led_green_accent.position.y = (-0.70 + -0.50) / 2;
  root.add(led_green_accent);

  const upper_white_ledGeom = createCurvedPatchGeometry(
    0.025,
    0.43,
    0.145,
    0.145,
    0.034,
    3,
    28
  );
  const upper_white_led = new THREE.Mesh(
    upper_white_ledGeom,
    led_whiteMat
  );
  upper_white_led.name = "upper_white_led";
  root.add(upper_white_led);

  const middle_white_ledGeom = createCurvedPatchGeometry(
    -0.015,
    -0.08,
    0.165,
    0.16,
    0.034,
    3,
    28
  );
  const middle_white_led = new THREE.Mesh(
    middle_white_ledGeom,
    led_whiteMat
  );
  middle_white_led.name = "middle_white_led";
  root.add(middle_white_led);

  const lower_white_ledGeom = createCurvedPatchGeometry(
    0.025,
    -0.84,
    0.17,
    0.17,
    0.034,
    3,
    28
  );
  const lower_white_led = new THREE.Mesh(
    lower_white_ledGeom,
    led_whiteMat
  );
  lower_white_led.name = "lower_white_led";
  root.add(lower_white_led);

  const led_spill_upper = addCurvedLedPatch(
    root,
    "led_spill_upper",
    led_magentaMat,
    -0.275,
    0.55,
    0.045,
    0.22,
    0.016
  );
  const led_spill_middle = addCurvedLedPatch(
    root,
    "led_spill_middle",
    led_purpleMat,
    -0.275,
    -0.02,
    0.045,
    0.21,
    0.016
  );
  const led_spill_lower = addCurvedLedPatch(
    root,
    "led_spill_lower",
    led_cyanMat,
    -0.275,
    -0.78,
    0.045,
    0.25,
    0.016
  );

  const led_glows = new THREE.Group();
  led_glows.name = "led_glows";
  root.add(led_glows);

  const upper_led_glowGeom = createCurvedPatchGeometry(
    0.025,
    0.43,
    0.235,
    0.235,
    0.031,
    3,
    28
  );
  const upper_led_glow = new THREE.Mesh(
    upper_led_glowGeom,
    led_glowMat
  );
  upper_led_glow.name = "upper_led_glow";
  led_glows.add(upper_led_glow);

  const middle_led_glowGeom = createCurvedPatchGeometry(
    -0.015,
    -0.08,
    0.255,
    0.245,
    0.031,
    3,
    28
  );
  const middle_led_glow = new THREE.Mesh(
    middle_led_glowGeom,
    led_glowMat
  );
  middle_led_glow.name = "middle_led_glow";
  led_glows.add(middle_led_glow);

  const lower_led_glowGeom = createCurvedPatchGeometry(
    0.025,
    -0.84,
    0.26,
    0.255,
    0.031,
    3,
    28
  );
  const lower_led_glow = new THREE.Mesh(
    lower_led_glowGeom,
    led_glowMat
  );
  lower_led_glow.name = "lower_led_glow";
  led_glows.add(lower_led_glow);

  const upper_color_bleed = addCurvedLedPatch(
    led_glows,
    "upper_color_bleed",
    led_redMat,
    0.02,
    0.91,
    0.22,
    0.16,
    0.030
  );
  const middle_color_bleed = addCurvedLedPatch(
    led_glows,
    "middle_color_bleed",
    led_purpleMat,
    -0.02,
    0.18,
    0.23,
    0.17,
    0.030
  );
  const lower_color_bleed = addCurvedLedPatch(
    led_glows,
    "lower_color_bleed",
    led_blueMat,
    0.02,
    -0.48,
    0.23,
    0.17,
    0.030
  );
  const bottom_color_bleed = addCurvedLedPatch(
    led_glows,
    "bottom_color_bleed",
    led_greenMat,
    0.02,
    -0.98,
    0.22,
    0.15,
    0.030
  );

  const body_seamGeom = new THREE.TorusGeometry(
    bodyR - 0.004,
    0.009,
    8,
    48
  );

  const upper_body_seam = new THREE.Mesh(body_seamGeom, seamMat);
  upper_body_seam.name = "upper_body_seam";
  upper_body_seam.rotation.x = Math.PI / 2;
  upper_body_seam.position.y = 1.10;
  root.add(upper_body_seam);

  const center_body_seam = new THREE.Mesh(body_seamGeom, seamMat);
  center_body_seam.name = "center_body_seam";
  center_body_seam.rotation.x = Math.PI / 2;
  center_body_seam.position.y = -0.44;
  root.add(center_body_seam);

  const lower_body_seam = new THREE.Mesh(body_seamGeom, seamMat);
  lower_body_seam.name = "lower_body_seam";
  lower_body_seam.rotation.x = Math.PI / 2;
  lower_body_seam.position.y = -1.13;
  root.add(lower_body_seam);

  const top_capProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.42, 0.00),
    new THREE.Vector2(0.46, 0.04),
    new THREE.Vector2(0.47, 0.11),
    new THREE.Vector2(0.47, 0.34),
    new THREE.Vector2(0.45, 0.41),
    new THREE.Vector2(0.39, 0.47),
    new THREE.Vector2(0.00, 0.47),
  ];
  const top_capGeom = new THREE.LatheGeometry(top_capProfile, 12);
  const top_cap = new THREE.Mesh(top_capGeom, capMat);
  top_cap.name = "top_cap";
  top_cap.position.y = 1.34;
  root.add(top_cap);

  const top_cap_seamGeom = new THREE.TorusGeometry(
    0.445,
    0.012,
    8,
    48
  );
  const top_cap_seam = new THREE.Mesh(top_cap_seamGeom, seamMat);
  top_cap_seam.name = "top_cap_seam";
  top_cap_seam.rotation.x = Math.PI / 2;
  top_cap_seam.position.y = 1.35;
  root.add(top_cap_seam);

  const top_lens_recessGeom = new THREE.CylinderGeometry(
    0.335,
    0.335,
    0.025,
    40
  );
  const top_lens_recess = new THREE.Mesh(
    top_lens_recessGeom,
    seamMat
  );
  top_lens_recess.name = "top_lens_recess";
  top_lens_recess.position.y = 1.815;
  root.add(top_lens_recess);

  const top_lensGeom = new THREE.CylinderGeometry(
    0.278,
    0.278,
    0.018,
    48
  );
  const top_lens = new THREE.Mesh(top_lensGeom, top_lensMat);
  top_lens.name = "top_lens";
  top_lens.position.y = 1.833;
  root.add(top_lens);

  const top_lens_rimGeom = new THREE.TorusGeometry(
    0.303,
    0.026,
    10,
    48
  );
  const top_lens_rim = new THREE.Mesh(top_lens_rimGeom, seamMat);
  top_lens_rim.name = "top_lens_rim";
  top_lens_rim.rotation.x = Math.PI / 2;
  top_lens_rim.position.y = 1.839;
  root.add(top_lens_rim);

  const top_lens_outer_ringGeom = new THREE.TorusGeometry(
    0.205,
    0.006,
    8,
    40
  );
  const top_lens_outer_ring = new THREE.Mesh(
    top_lens_outer_ringGeom,
    lens_detailMat
  );
  top_lens_outer_ring.name = "top_lens_outer_ring";
  top_lens_outer_ring.rotation.x = Math.PI / 2;
  top_lens_outer_ring.position.y = 1.844;
  root.add(top_lens_outer_ring);

  const top_lens_inner_ringGeom = new THREE.TorusGeometry(
    0.112,
    0.005,
    8,
    32
  );
  const top_lens_inner_ring = new THREE.Mesh(
    top_lens_inner_ringGeom,
    lens_detailMat
  );
  top_lens_inner_ring.name = "top_lens_inner_ring";
  top_lens_inner_ring.rotation.x = Math.PI / 2;
  top_lens_inner_ring.position.y = 1.845;
  root.add(top_lens_inner_ring);

  const top_lens_centerGeom = new THREE.CylinderGeometry(
    0.045,
    0.045,
    0.008,
    24
  );
  const top_lens_center = new THREE.Mesh(
    top_lens_centerGeom,
    lens_detailMat
  );
  top_lens_center.name = "top_lens_center";
  top_lens_center.position.y = 1.846;
  root.add(top_lens_center);

  const bottom_collarGeom = new THREE.CylinderGeometry(
    0.445,
    0.445,
    0.14,
    32
  );
  const bottom_collar = new THREE.Mesh(bottom_collarGeom, capMat);
  bottom_collar.name = "bottom_collar";
  bottom_collar.position.y = -1.39;
  root.add(bottom_collar);

  const bottom_collar_seamGeom = new THREE.TorusGeometry(
    0.43,
    0.011,
    8,
    48
  );
  const bottom_collar_seam = new THREE.Mesh(
    bottom_collar_seamGeom,
    seamMat
  );
  bottom_collar_seam.name = "bottom_collar_seam";
  bottom_collar_seam.rotation.x = Math.PI / 2;
  bottom_collar_seam.position.y = -1.33;
  root.add(bottom_collar_seam);

  const bottom_baseProfile = [
    new THREE.Vector2(0.00, -0.23),
    new THREE.Vector2(0.35, -0.23),
    new THREE.Vector2(0.40, -0.20),
    new THREE.Vector2(0.43, -0.13),
    new THREE.Vector2(0.43, 0.13),
    new THREE.Vector2(0.41, 0.19),
    new THREE.Vector2(0.37, 0.22),
    new THREE.Vector2(0.00, 0.22),
  ];
  const bottom_baseGeom = new THREE.LatheGeometry(
    bottom_baseProfile,
    12
  );
  const bottom_base = new THREE.Mesh(bottom_baseGeom, capMat);
  bottom_base.name = "bottom_base";
  bottom_base.position.y = -1.62;
  root.add(bottom_base);

  const side_grille_group = new THREE.Group();
  side_grille_group.name = "side_grille_group";
  const grilleAngle = -1.18;
  const grilleNormal = new THREE.Vector3(
    Math.sin(grilleAngle),
    0,
    Math.cos(grilleAngle)
  ).normalize();
  side_grille_group.position.set(
    grilleNormal.x * (bodyR + 0.004),
    0.68,
    grilleNormal.z * (bodyR + 0.004)
  );
  side_grille_group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    grilleNormal
  );
  root.add(side_grille_group);

  const side_grilleGeom = createCurvedEllipseGeometry(
    0,
    0,
    0.105,
    0.19,
    0.008,
    28
  );
  const side_grille = new THREE.Mesh(side_grilleGeom, grilleMat);
  side_grille.name = "side_grille";
  side_grille_group.add(side_grille);

  const grille_hole_positions = [
    [-0.045, 0.13], [0.045, 0.13],
    [-0.075, 0.075], [0.000, 0.075], [0.075, 0.075],
    [-0.090, 0.015], [-0.030, 0.015], [0.030, 0.015], [0.090, 0.015],
    [-0.075, -0.045], [0.000, -0.045], [0.075, -0.045],
    [-0.055, -0.105], [0.025, -0.105],
    [0.000, -0.155],
  ];
  const grille_holesGeom = new THREE.CircleGeometry(0.012, 10);
  const grille_holes = new THREE.InstancedMesh(
    grille_holesGeom,
    grille_holeMat,
    grille_hole_positions.length
  );
  grille_holes.name = "grille_holes";
  const grille_dummy = new THREE.Object3D();

  for (let i = 0; i < grille_hole_positions.length; i++) {
    const u = grille_hole_positions[i][0];
    const v = grille_hole_positions[i][1];
    const theta = u / bodyR;
    const radial = bodyR + 0.013;
    grille_dummy.position.set(
      Math.sin(theta) * radial,
      v,
      Math.cos(theta) * radial
    );
    grille_dummy.updateMatrix();
    grille_holes.setMatrixAt(i, grille_dummy.matrix);
  }
  grille_holes.instanceMatrix.needsUpdate = true;
  side_grille_group.add(grille_holes);

  const lower_side_portGeom = createCurvedEllipseGeometry(
    -0.29,
    -0.93,
    0.025,
    0.075,
    0.010,
    20
  );
  const lower_side_port = new THREE.Mesh(
    lower_side_portGeom,
    seamMat
  );
  lower_side_port.name = "lower_side_port";
  root.add(lower_side_port);

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