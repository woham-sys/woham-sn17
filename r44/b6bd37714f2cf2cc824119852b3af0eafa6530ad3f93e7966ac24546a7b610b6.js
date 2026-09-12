// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "electronic_reader";

  const deviceW = 0.72;
  const deviceH = 0.98;
  const deviceD = 0.075;
  const screenW = 0.52;
  const screenH = 0.75;
  const screenX = -0.015;
  const screenY = 0.025;

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    const r = Math.min(radius, width / 2, height / 2);

    shape.moveTo(x + r, y);
    shape.lineTo(x + width - r, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + r);
    shape.lineTo(x + width, y + height - r);
    shape.quadraticCurveTo(
      x + width,
      y + height,
      x + width - r,
      y + height
    );
    shape.lineTo(x + r, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    shape.closePath();
    return shape;
  }

  function polygonGeometry(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  function makeGradientGeometry(
    width,
    height,
    stops,
    segmentsX = 1,
    segmentsY = 18
  ) {
    const positions = [];
    const colors = [];
    const colorA = new THREE.Color();
    const colorB = new THREE.Color();
    const colorMix = new THREE.Color();

    for (let py = 0; py <= segmentsY; py++) {
      const v = py / segmentsY;
      const y = (v - 0.5) * height;
      let stopIndex = 0;

      while (
        stopIndex < stops.length - 2 &&
        v > stops[stopIndex + 1][0]
      ) {
        stopIndex++;
      }

      const stopA = stops[stopIndex];
      const stopB = stops[stopIndex + 1];
      const localT =
        (v - stopA[0]) /
        Math.max(stopB[0] - stopA[0], 0.000001);
      colorA.setHex(stopA[1]);
      colorB.setHex(stopB[1]);
      colorMix.copy(colorA).lerp(colorB, localT);

      for (let px = 0; px <= segmentsX; px++) {
        const u = px / segmentsX;
        const x = (u - 0.5) * width;
        positions.push(x, y, 0);
        colors.push(colorMix.r, colorMix.g, colorMix.b);
      }
    }

    const row = segmentsX + 1;
    const indices = [];

    for (let py = 0; py < segmentsY; py++) {
      for (let px = 0; px < segmentsX; px++) {
        const a = py * row + px;
        const b = a + 1;
        const d = (py + 1) * row + px;
        const c = d + 1;
        indices.push(a, b, d, b, c, d);
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
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const body_shellMat = new THREE.MeshStandardMaterial({
    color: 0x303232,
    metalness: 0.0,
    roughness: 0.8
  });
  const body_shellShape = roundedRectShape(deviceW, deviceH, 0.058);
  const body_shellGeom = new THREE.ExtrudeGeometry(body_shellShape, {
    depth: deviceD,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 3,
    curveSegments: 16
  });
  const body_shell = new THREE.Mesh(body_shellGeom, body_shellMat);
  body_shell.name = "body_shell";
  body_shell.position.z = -deviceD / 2;
  root.add(body_shell);

  const front_rimMat = new THREE.MeshStandardMaterial({
    color: 0x414342,
    metalness: 0.0,
    roughness: 0.8
  });
  const front_rimShape = roundedRectShape(0.704, 0.964, 0.052);
  const front_rimGeom = new THREE.ShapeGeometry(front_rimShape, 16);
  const front_rim = new THREE.Mesh(front_rimGeom, front_rimMat);
  front_rim.name = "front_rim";
  front_rim.position.z = 0.0465;
  root.add(front_rim);

  const front_bezelMat = new THREE.MeshStandardMaterial({
    color: 0x080909,
    metalness: 0.0,
    roughness: 0.3
  });
  const front_bezelShape = roundedRectShape(0.682, 0.942, 0.046);
  const front_bezelGeom = new THREE.ShapeGeometry(front_bezelShape, 16);
  const front_bezel = new THREE.Mesh(front_bezelGeom, front_bezelMat);
  front_bezel.name = "front_bezel";
  front_bezel.position.z = 0.048;
  root.add(front_bezel);

  const screen_recessMat = new THREE.MeshStandardMaterial({
    color: 0x020303,
    metalness: 0.0,
    roughness: 0.3
  });
  const screen_recessShape = roundedRectShape(
    screenW + 0.018,
    screenH + 0.018,
    0.009
  );
  const screen_recessGeom = new THREE.ShapeGeometry(
    screen_recessShape,
    8
  );
  const screen_recess = new THREE.Mesh(
    screen_recessGeom,
    screen_recessMat
  );
  screen_recess.name = "screen_recess";
  screen_recess.position.set(screenX, screenY, 0.049);
  root.add(screen_recess);

  const display_group = new THREE.Group();
  display_group.name = "display_group";
  display_group.position.set(screenX, screenY, 0.0505);
  root.add(display_group);

  const screen_backgroundMat = new THREE.MeshBasicMaterial({
    color: 0x111739
  });
  const screen_backgroundShape = roundedRectShape(
    screenW,
    screenH,
    0.006
  );
  const screen_backgroundGeom = new THREE.ShapeGeometry(
    screen_backgroundShape,
    8
  );
  const screen_background = new THREE.Mesh(
    screen_backgroundGeom,
    screen_backgroundMat
  );
  screen_background.name = "screen_background";
  display_group.add(screen_background);

  const sunset_glowMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: true,
    side: THREE.DoubleSide
  });
  const sunset_glowGeom = makeGradientGeometry(
    screenW - 0.006,
    screenH - 0.006,
    [
      [0.0, 0x101738],
      [0.22, 0x553a73],
      [0.39, 0xc66b78],
      [0.48, 0xf0a15d],
      [0.52, 0xf4c476],
      [0.61, 0x43b8c7],
      [0.78, 0x304c9d],
      [1.0, 0x17204a]
    ],
    8,
    24
  );
  const sunset_glow = new THREE.Mesh(
    sunset_glowGeom,
    sunset_glowMat
  );
  sunset_glow.name = "sunset_glow";
  sunset_glow.position.z = 0.0008;
  display_group.add(sunset_glow);

  const distant_mountainsMat = new THREE.MeshBasicMaterial({
    color: 0x655277,
    side: THREE.DoubleSide
  });
  const distant_mountainsGeom = polygonGeometry([
    [-0.255, -0.09],
    [-0.225, -0.055],
    [-0.195, -0.066],
    [-0.16, -0.025],
    [-0.125, -0.055],
    [-0.085, -0.04],
    [-0.04, -0.075],
    [0.015, -0.055],
    [0.07, -0.082],
    [0.13, -0.06],
    [0.18, -0.088],
    [0.255, -0.075],
    [0.255, -0.15],
    [-0.255, -0.15]
  ]);
  const distant_mountains = new THREE.Mesh(
    distant_mountainsGeom,
    distant_mountainsMat
  );
  distant_mountains.name = "distant_mountains";
  distant_mountains.position.z = 0.0014;
  display_group.add(distant_mountains);

  const foreground_silhouetteMat = new THREE.MeshBasicMaterial({
    color: 0x242640,
    side: THREE.DoubleSide
  });
  const foreground_silhouetteGeom = polygonGeometry([
    [-0.255, -0.075],
    [-0.22, -0.045],
    [-0.185, -0.055],
    [-0.15, -0.018],
    [-0.112, -0.04],
    [-0.075, -0.005],
    [-0.035, -0.035],
    [0.005, -0.012],
    [0.045, -0.045],
    [0.085, -0.025],
    [0.125, -0.058],
    [0.17, -0.04],
    [0.21, -0.072],
    [0.255, -0.06],
    [0.255, -0.19],
    [-0.255, -0.19]
  ]);
  const foreground_silhouette = new THREE.Mesh(
    foreground_silhouetteGeom,
    foreground_silhouetteMat
  );
  foreground_silhouette.name = "foreground_silhouette";
  foreground_silhouette.position.z = 0.0018;
  display_group.add(foreground_silhouette);

  const figure_darkMat = new THREE.MeshBasicMaterial({
    color: 0x11182d,
    side: THREE.DoubleSide
  });
  const figure_blueMat = new THREE.MeshBasicMaterial({
    color: 0x17467e,
    side: THREE.DoubleSide
  });
  const figure_cyanMat = new THREE.MeshBasicMaterial({
    color: 0x238fb4,
    side: THREE.DoubleSide
  });
  const figure_rustMat = new THREE.MeshBasicMaterial({
    color: 0x6b403f,
    side: THREE.DoubleSide
  });

  const central_figure = new THREE.Group();
  central_figure.name = "central_figure";
  central_figure.position.z = 0.0024;
  display_group.add(central_figure);

  const figure_torsoGeom = polygonGeometry([
    [-0.052, -0.115],
    [-0.028, -0.04],
    [-0.035, 0.035],
    [-0.02, 0.095],
    [0.018, 0.105],
    [0.045, 0.045],
    [0.055, -0.035],
    [0.045, -0.115],
    [0.005, -0.14]
  ]);
  const figure_torso = new THREE.Mesh(
    figure_torsoGeom,
    figure_rustMat
  );
  figure_torso.name = "figure_torso";
  central_figure.add(figure_torso);

  const figure_left_wingGeom = polygonGeometry([
    [-0.025, 0.075],
    [-0.085, 0.045],
    [-0.12, -0.025],
    [-0.085, -0.015],
    [-0.115, -0.09],
    [-0.045, -0.045],
    [-0.015, 0.015]
  ]);
  const figure_left_wing = new THREE.Mesh(
    figure_left_wingGeom,
    figure_blueMat
  );
  figure_left_wing.name = "figure_left_wing";
  figure_left_wing.position.z = 0.0002;
  central_figure.add(figure_left_wing);

  const figure_right_wingGeom = polygonGeometry([
    [0.015, 0.08],
    [0.08, 0.055],
    [0.12, -0.015],
    [0.082, -0.005],
    [0.112, -0.095],
    [0.045, -0.05],
    [0.02, 0.015]
  ]);
  const figure_right_wing = new THREE.Mesh(
    figure_right_wingGeom,
    figure_cyanMat
  );
  figure_right_wing.name = "figure_right_wing";
  figure_right_wing.position.z = 0.0003;
  central_figure.add(figure_right_wing);

  const figure_headGeom = polygonGeometry([
    [-0.014, 0.095],
    [-0.008, 0.13],
    [0.008, 0.145],
    [0.027, 0.137],
    [0.035, 0.118],
    [0.021, 0.102],
    [0.008, 0.092]
  ]);
  const figure_head = new THREE.Mesh(
    figure_headGeom,
    figure_darkMat
  );
  figure_head.name = "figure_head";
  figure_head.position.z = 0.0005;
  central_figure.add(figure_head);

  const figure_lower_bodyGeom = polygonGeometry([
    [-0.045, -0.1],
    [-0.018, -0.13],
    [-0.052, -0.205],
    [-0.09, -0.285],
    [-0.055, -0.335],
    [0.005, -0.315],
    [0.055, -0.27],
    [0.045, -0.19],
    [0.04, -0.115]
  ]);
  const figure_lower_body = new THREE.Mesh(
    figure_lower_bodyGeom,
    figure_darkMat
  );
  figure_lower_body.name = "figure_lower_body";
  figure_lower_body.position.z = 0.0003;
  central_figure.add(figure_lower_body);

  const figure_blue_panelGeom = polygonGeometry([
    [0.012, -0.12],
    [0.045, -0.13],
    [0.055, -0.2],
    [0.035, -0.275],
    [0.005, -0.3],
    [0.018, -0.205]
  ]);
  const figure_blue_panel = new THREE.Mesh(
    figure_blue_panelGeom,
    figure_cyanMat
  );
  figure_blue_panel.name = "figure_blue_panel";
  figure_blue_panel.position.z = 0.0006;
  central_figure.add(figure_blue_panel);

  const figure_highlightGeom = polygonGeometry([
    [-0.018, 0.055],
    [-0.008, 0.085],
    [0.004, 0.075],
    [-0.002, 0.025],
    [-0.012, -0.015]
  ]);
  const figure_highlight = new THREE.Mesh(
    figure_highlightGeom,
    figure_cyanMat
  );
  figure_highlight.name = "figure_highlight";
  figure_highlight.position.z = 0.0008;
  central_figure.add(figure_highlight);

  const horizon_glowMat = new THREE.MeshBasicMaterial({
    color: 0xffc36d,
    side: THREE.DoubleSide
  });
  const horizon_glowGeom = new THREE.CircleGeometry(0.018, 20);
  const horizon_glow = new THREE.Mesh(
    horizon_glowGeom,
    horizon_glowMat
  );
  horizon_glow.name = "horizon_glow";
  horizon_glow.scale.set(2.2, 0.45, 1);
  horizon_glow.position.set(0.145, -0.065, 0.003);
  display_group.add(horizon_glow);

  const sparkle_dotsMat = new THREE.MeshBasicMaterial({
    color: 0x72d8e8,
    side: THREE.DoubleSide
  });
  const sparkle_dotsGeom = new THREE.CircleGeometry(0.0022, 8);
  const sparkle_dots = new THREE.InstancedMesh(
    sparkle_dotsGeom,
    sparkle_dotsMat,
    14
  );
  sparkle_dots.name = "sparkle_dots";

  const sparkleDummy = new THREE.Object3D();
  for (let i = 0; i < 14; i++) {
    const angle = i * 2.3999632297;
    const radius = 0.025 + (i % 5) * 0.012;
    sparkleDummy.position.set(
      0.005 + Math.cos(angle) * radius,
      -0.015 + Math.sin(angle) * radius * 1.8,
      0.0034
    );
    sparkleDummy.rotation.set(0, 0, 0);
    sparkleDummy.scale.setScalar(0.65 + (i % 3) * 0.2);
    sparkleDummy.updateMatrix();
    sparkle_dots.setMatrixAt(i, sparkleDummy.matrix);
  }
  sparkle_dots.instanceMatrix.needsUpdate = true;
  display_group.add(sparkle_dots);

  const pixelPatterns = {
    A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
    C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
    E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    G: ["01111", "10000", "10000", "10111", "10001", "10001", "01111"],
    I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
    N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
    O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
    R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
    T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
    V: ["10001", "10001", "10001", "10001", "01010", "01010", "00100"]
  };

  function createPixelText(
    text,
    pixelSize,
    startX,
    topY,
    z,
    material
  ) {
    let count = 0;

    for (let i = 0; i < text.length; i++) {
      const pattern = pixelPatterns[text[i]];
      if (!pattern) {
        continue;
      }
      for (let row = 0; row < 7; row++) {
        for (let column = 0; column < 5; column++) {
          if (pattern[row][column] === "1") {
            count++;
          }
        }
      }
    }

    const geometry = new THREE.BoxGeometry(
      pixelSize * 0.82,
      pixelSize * 0.82,
      0.001
    );
    const mesh = new THREE.InstancedMesh(
      geometry,
      material,
      count
    );
    const dummy = new THREE.Object3D();
    let instanceIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const pattern = pixelPatterns[text[i]];
      if (!pattern) {
        continue;
      }

      for (let row = 0; row < 7; row++) {
        for (let column = 0; column < 5; column++) {
          if (pattern[row][column] !== "1") {
            continue;
          }

          dummy.position.set(
            startX + i * pixelSize * 6 + column * pixelSize,
            topY - row * pixelSize,
            z
          );
          dummy.rotation.set(0, 0, 0);
          dummy.scale.set(1, 1, 1);
          dummy.updateMatrix();
          mesh.setMatrixAt(instanceIndex, dummy.matrix);
          instanceIndex++;
          }
        }
      }

    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const screen_textMat = new THREE.MeshBasicMaterial({
    color: 0xe8f1f3
  });

  const top_caption = createPixelText(
    "BOOK NOCTURN",
    0.00245,
    -0.218,
    0.334,
    0.004,
    screen_textMat
  );
  top_caption.name = "top_caption";
  display_group.add(top_caption);

  const title_text = createPixelText(
    "RIVETING",
    0.0062,
    -0.218,
    0.285,
    0.0041,
    screen_textMat
  );
  title_text.name = "title_text";
  display_group.add(title_text);

  const subtitle_text = createPixelText(
    "A NOVEL",
    0.0027,
    -0.216,
    0.205,
    0.004,
    screen_textMat
  );
  subtitle_text.name = "subtitle_text";
  display_group.add(subtitle_text);

  const footer_text = createPixelText(
    "READER EDITION",
    0.00215,
    -0.218,
    -0.292,
    0.004,
    screen_textMat
  );
  footer_text.name = "footer_text";
  display_group.add(footer_text);

  const menu_buttonMat = new THREE.MeshBasicMaterial({
    color: 0x6551a6
  });
  const menu_buttonShape = roundedRectShape(0.043, 0.043, 0.008);
  const menu_buttonGeom = new THREE.ShapeGeometry(
    menu_buttonShape,
    8
  );
  const menu_button = new THREE.Mesh(
    menu_buttonGeom,
    menu_buttonMat
  );
  menu_button.name = "menu_button";
  menu_button.position.set(0.215, 0.318, 0.004);
  display_group.add(menu_button);

  const menu_dotsMat = new THREE.MeshBasicMaterial({
    color: 0xf0ebff,
    side: THREE.DoubleSide
  });
  const menu_dotsGeom = new THREE.CircleGeometry(0.0032, 10);
  const menu_dots = new THREE.InstancedMesh(
    menu_dotsGeom,
    menu_dotsMat,
    4
  );
  menu_dots.name = "menu_dots";

  const menuDummy = new THREE.Object3D();
  const menuPositions = [
    [0.207, 0.326],
    [0.223, 0.326],
    [0.207, 0.31],
    [0.223, 0.31]
  ];

  for (let i = 0; i < menuPositions.length; i++) {
    menuDummy.position.set(
      menuPositions[i][0],
      menuPositions[i][1],
      0.0047
    );
    menuDummy.rotation.set(0, 0, 0);
    menuDummy.scale.set(1, 1, 1);
    menuDummy.updateMatrix();
    menu_dots.setMatrixAt(i, menuDummy.matrix);
  }
  menu_dots.instanceMatrix.needsUpdate = true;
  display_group.add(menu_dots);

  const library_buttonMat = new THREE.MeshBasicMaterial({
    color: 0xf0eee2
  });
  const library_buttonShape = roundedRectShape(
    0.043,
    0.047,
    0.007
  );
  const library_buttonGeom = new THREE.ShapeGeometry(
    library_buttonShape,
    8
  );
  const library_button = new THREE.Mesh(
    library_buttonGeom,
    library_buttonMat
  );
  library_button.name = "library_button";
  library_button.position.set(0.213, -0.307, 0.004);
  display_group.add(library_button);

  const library_iconMat = new THREE.MeshBasicMaterial({
    color: 0x202124,
    side: THREE.DoubleSide
  });
  const library_iconGeom = new THREE.CircleGeometry(0.011, 16);
  const library_icon = new THREE.Mesh(
    library_iconGeom,
    library_iconMat
  );
  library_icon.name = "library_icon";
  library_icon.position.set(0.213, -0.304, 0.0047);
  display_group.add(library_icon);

  const library_markMat = new THREE.MeshBasicMaterial({
    color: 0xf5f2e7
  });
  const library_markGeom = new THREE.BoxGeometry(
    0.0022,
    0.012,
    0.001
  );
  const library_mark = new THREE.InstancedMesh(
    library_markGeom,
    library_markMat,
    3
  );
  library_mark.name = "library_mark";

  const libraryDummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    libraryDummy.position.set(
      0.209 + i * 0.004,
      -0.304,
      0.0052
    );
    libraryDummy.rotation.set(0, 0, 0);
    libraryDummy.scale.set(1, 1, 1);
    libraryDummy.updateMatrix();
    library_mark.setMatrixAt(i, libraryDummy.matrix);
  }
  library_mark.instanceMatrix.needsUpdate = true;
  display_group.add(library_mark);

  const page_indicatorsMat = new THREE.MeshBasicMaterial({
    color: 0xe9eef0
  });
  const page_indicatorsGeom = new THREE.BoxGeometry(
    0.006,
    0.003,
    0.001
  );
  const page_indicators = new THREE.InstancedMesh(
    page_indicatorsGeom,
    page_indicatorsMat,
    3
  );
  page_indicators.name = "page_indicators";

  const pageDummy = new THREE.Object3D();
  const pagePositions = [
    [-0.012, -0.354],
    [0.012, -0.354],
    [0.045, -0.354]
  ];

  for (let i = 0; i < pagePositions.length; i++) {
    pageDummy.position.set(
      pagePositions[i][0],
      pagePositions[i][1],
      0.004
    );
    pageDummy.rotation.set(0, 0, 0);
    pageDummy.scale.set(
      i === 1 ? 1.4 : 0.75,
      i === 1 ? 1.3 : 1,
      1
    );
    pageDummy.updateMatrix();
    page_indicators.setMatrixAt(i, pageDummy.matrix);
  }
  page_indicators.instanceMatrix.needsUpdate = true;
  display_group.add(page_indicators);

  const screen_glareMat = new THREE.MeshBasicMaterial({
    color: 0xb9c0c1,
    transparent: true,
    opacity: 0.1,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const screen_glareGeom = polygonGeometry([
    [-0.19, 0.375],
    [-0.085, 0.375],
    [0.055, 0.08],
    [0.005, 0.035]
  ]);
  const screen_glare = new THREE.Mesh(
    screen_glareGeom,
    screen_glareMat
  );
  screen_glare.name = "screen_glare";
  screen_glare.position.z = 0.0055;
  display_group.add(screen_glare);

  const bezel_logoMat = new THREE.MeshBasicMaterial({
    color: 0xaeb2b1
  });
  const bezel_logo = createPixelText(
    "RIBOCG",
    0.00255,
    -0.038,
    -0.407,
    0.052,
    bezel_logoMat
  );
  bezel_logo.name = "bezel_logo";
  root.add(bezel_logo);

  const side_controlsMat = new THREE.MeshStandardMaterial({
    color: 0x080909,
    metalness: 0.0,
    roughness: 0.8
  });

  const side_power_buttonGeom = new THREE.BoxGeometry(
    0.008,
    0.027,
    0.025
  );
  const side_power_button = new THREE.Mesh(
    side_power_buttonGeom,
    side_controlsMat
  );
  side_power_button.name = "side_power_button";
  side_power_button.position.set(
    deviceW / 2 + 0.011,
    0.345,
    0.002
  );
  root.add(side_power_button);

  const side_volume_buttonGeom = new THREE.BoxGeometry(
    0.008,
    0.09,
    0.025
  );
  const side_volume_button = new THREE.Mesh(
    side_volume_buttonGeom,
    side_controlsMat
  );
  side_volume_button.name = "side_volume_button";
  side_volume_button.position.set(
    deviceW / 2 + 0.011,
    0.225,
    0.002
  );
  root.add(side_volume_button);

  const side_charging_portGeom = new THREE.BoxGeometry(
    0.009,
    0.045,
    0.021
  );
  const side_charging_port = new THREE.Mesh(
    side_charging_portGeom,
    side_controlsMat
  );
  side_charging_port.name = "side_charging_port";
  side_charging_port.position.set(
    deviceW / 2 + 0.011,
    0.105,
    0.001
  );
  root.add(side_charging_port);

  function fitToUnitCube(THREE, object) {
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

  fitToUnitCube(THREE, root);
  return root;
}