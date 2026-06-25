/**
 * AP Calculus Review — Application Logic
 * Handles UI interactions, problem display, filtering, and custom problem sets.
 */

(function() {
    'use strict';

    // ===== State =====
    let currentProblem = null;
    let problemCount = 0;
    let solutionsViewed = 0;
    let topicsCoveredSet = new Set();

    // ===== DOM Elements =====
    const themeToggle = document.getElementById('themeToggle');
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    // Practice tab
    const examFilter = document.getElementById('examFilter');
    const topicFilter = document.getElementById('topicFilter');
    const difficultyFilter = document.getElementById('difficultyFilter');
    const generateBtn = document.getElementById('generateBtn');
    const problemCard = document.getElementById('problemCard');
    const problemText = document.getElementById('problemText');
    const problemVisual = document.getElementById('problemVisual');
    const examBadge = document.getElementById('examBadge');
    const topicBadge = document.getElementById('topicBadge');
    const diffBadge = document.getElementById('diffBadge');
    const problemNumber = document.getElementById('problemNumber');
    const hintBtn = document.getElementById('hintBtn');
    const solutionBtn = document.getElementById('solutionBtn');
    const infoBtn = document.getElementById('infoBtn');
    const hintArea = document.getElementById('hintArea');
    const solutionArea = document.getElementById('solutionArea');
    const infoArea = document.getElementById('infoArea');
    const totalAttempted = document.getElementById('totalAttempted');
    const solutionsViewedEl = document.getElementById('solutionsViewed');
    const topicsCovered = document.getElementById('topicsCovered');

    // Custom tab
    const buildSetBtn = document.getElementById('buildSetBtn');
    const customResults = document.getElementById('customResults');

    // ===== Visual Configurations for Problems =====
    const PROBLEM_VISUALS = {
        // Slope field problems
        7: {
            type: 'problem',
            generate: () => DEVisuals.slopeField(
                (x, y) => x - y,
                [-3, 3], [-3, 3],
                { title: 'Slope field: dy/dx = x − y', solutions: [{x0: 0, y0: 2, color: '#2c5f2d'}, {x0: 0, y0: -1, color: '#d4a843'}] }
            ),
            caption: 'Slope field for dy/dx = x − y with sample solution curves'
        },
        8: {
            type: 'problem',
            generate: () => DEVisuals.slopeField(
                (x, y) => y === 0 ? 999 : (y - x*x) / y,
                [-2.5, 2.5], [-2.5, 3],
                { title: 'Slope field (which DE matches?)', solutions: [{x0: -2, y0: 2.5, color: '#2c5f2d'}] }
            ),
            caption: 'Observe: horizontal tangents along y = x² and vertical behavior near y = 0'
        },
        9: {
            type: 'problem',
            generate: () => DEVisuals.slopeField(
                (x, y) => y * (2 - y),
                [-3, 3], [-1, 3.5],
                { title: 'Slope field: dy/dx = y(2−y)', equilibria: [0, 2], solutions: [{x0: -2, y0: 0.5, color: '#2c5f2d'}, {x0: -2, y0: 2.5, color: '#d4a843'}] }
            ),
            caption: 'Equilibria at y = 0 and y = 2; solutions approach y = 2 from below'
        },
        10: {
            type: 'problem',
            generate: () => DEVisuals.slopeField(
                (x, y) => x * y,
                [-2.5, 2.5], [-2.5, 2.5],
                { title: 'Slope field: dy/dx = xy', solutions: [{x0: -2, y0: 1, color: '#2c5f2d'}, {x0: -2, y0: -1, color: '#d4a843'}] }
            ),
            caption: 'Slopes depend on both x and y; solutions are Gaussian-like curves'
        },
        30: {
            type: 'problem',
            generate: () => DEVisuals.slopeField(
                (x, y) => Math.sin(x) * Math.cos(y),
                [-3.14, 3.14], [-3.14, 3.14],
                { title: 'Slope field: dy/dx = sin(x)cos(y)', solutions: [{x0: 0, y0: 0, color: '#2c5f2d'}] }
            ),
            caption: 'Periodic slope field with equilibria at x = nπ and y = (n+½)π'
        },

        // Euler's method problems
        11: {
            type: 'solution',
            generate: () => DEVisuals.eulerSteps(
                (x, y) => x + y, 0, 1, 0.5, 4,
                { title: "Euler's Method: h = 0.5" }
            ),
            caption: "Euler approximation from (0, 1) with step size 0.5"
        },
        12: {
            type: 'solution',
            generate: () => DEVisuals.eulerSteps(
                (x, y) => 2*x - y, 1, 0, 0.5, 4,
                { title: "Euler's Method: h = 0.5" }
            ),
            caption: "Euler approximation from (1, 0) with step size 0.5"
        },
        13: {
            type: 'solution',
            generate: () => DEVisuals.eulerSteps(
                (x, y) => y*y - x, 0, 1, 0.1, 5,
                { title: "Euler's Method: h = 0.1" }
            ),
            caption: "Euler approximation from (0, 1) with step size 0.1"
        },
        31: {
            type: 'solution',
            generate: () => DEVisuals.eulerSteps(
                (x, y) => Math.sin(x*y), 0, 1, 0.25, 4,
                { title: "Euler's Method: h = 0.25" }
            ),
            caption: "Euler approximation from (0, 1) with step size 0.25"
        },
        36: {
            type: 'solution',
            generate: () => DEVisuals.eulerSteps(
                (x, y) => 2*x + 1, 0, 0, 0.25, 4,
                { title: "Euler's Method: h = 0.25" }
            ),
            caption: "Euler approximation from (0, 0) with step size 0.25"
        },

        // Logistic growth
        18: {
            type: 'problem',
            generate: () => DEVisuals.logisticCurve(50, 1000, 0.5, { title: 'Logistic Growth: K = 1000', tMax: 15 }),
            caption: 'Population approaches carrying capacity K = 1000'
        },
        19: {
            type: 'problem',
            generate: () => DEVisuals.logisticCurve(10, 200, 0.8, { title: 'Logistic Growth: K = 200, r = 0.8', tMax: 12 }),
            caption: 'Fastest growth at P = K/2 = 100'
        },
        33: {
            type: 'problem',
            generate: () => DEVisuals.logisticCurve(100, 500, 2, { title: 'Logistic Growth: K = 500, r = 2', tMax: 6 }),
            caption: 'Population approaches carrying capacity K = 500'
        },
        38: {
            type: 'solution',
            generate: () => DEVisuals.logisticCurve(2, 15, 0.4, { title: 'Fish Weight: Logistic Growth to 15 lbs', tMax: 20 }),
            caption: 'Fish weight grows logistically toward maximum of 15 lbs'
        },
        49: {
            type: 'problem',
            generate: () => DEVisuals.logisticCurve(200, 2000, 0.3, { title: 'Fish Population: K = 2000', tMax: 20 }),
            caption: 'Lake fish population with carrying capacity 2000'
        },
        28: {
            type: 'solution',
            generate: () => DEVisuals.logisticCurve(100, 10000, 0.2, { title: 'Disease Spread: Logistic Model', tMax: 40 }),
            caption: 'Disease spreads logistically through population of 10,000'
        },

        // Modeling problems with solution curves
        25: {
            type: 'both',
            generateProblem: () => DEVisuals.waterTank({ volume: '1000 gal', title: 'Water Tank (draining via √V)' }),
            captionProblem: '1000-gallon tank drains at rate proportional to √V',
            generateSolution: () => DEVisuals.solutionCurve(
                (t) => 1000 * Math.pow(1 - t/20, 2),
                [0, 20],
                { title: 'V(t) = 1000(1 − t/20)²', yRange: [0, 1100], points: [{x: 0, y: 1000, label: '1000 gal', color: '#2c5f2d'}, {x: 10, y: 250, label: '250 gal', color: '#d4a843'}, {x: 20, y: 0, label: 'Empty', color: '#b35900'}] }
            ),
            captionSolution: 'Volume decreases quadratically — tank empties at t = 20 min'
        },
        26: {
            type: 'both',
            generateProblem: () => DEVisuals.fallingObject({ title: 'Falling Object with Air Resistance' }),
            captionProblem: 'Forces: gravity (mg) down, air resistance (bv) up',
            generateSolution: () => DEVisuals.solutionCurve(
                (t) => 49 * (1 - Math.exp(-0.2 * t)),
                [0, 25],
                { title: 'v(t) = 49(1 − e^(−t/5))', yRange: [0, 55], points: [{x: 0, y: 0, label: 'v₀ = 0', color: '#2c5f2d'}, {x: 11.5, y: 44.1, label: '90% v_term', color: '#d4a843'}, {x: 25, y: 49.3, label: 'v_term = 49', color: '#b35900'}] }
            ),
            captionSolution: 'Velocity approaches terminal velocity (49 m/s) exponentially'
        },
        27: {
            type: 'solution',
            generate: () => DEVisuals.exponentialCurve(
                50, Math.log(4)/3,
                { tMax: 6, title: 'Exponential Growth: Q(t) = 50·e^(kt)', points: [{t: 3, label: 'Q=200'}, {t: 5, label: 'Q(5)=?'}], yLabel: 'Q', tLabel: 't' }
            ),
            caption: 'Q grows exponentially; find Q(5) given Q(0) = 50, Q(3) = 200'
        },

        // Separable DE solution curves
        1: {
            type: 'solution',
            generate: () => DEVisuals.slopeField(
                (x, y) => 3*x*x*y,
                [-1.5, 1.5], [-2, 3],
                { title: 'Slope field: dy/dx = 3x²y', solutions: [{x0: 0, y0: 1, color: '#2c5f2d'}, {x0: 0, y0: -1, color: '#d4a843'}, {x0: 0, y0: 0.5, color: '#3b5998'}] }
            ),
            caption: 'Family of solutions y = Ae^(x³) shown on the slope field'
        },
        3: {
            type: 'solution',
            generate: () => DEVisuals.solutionCurve(
                (x) => -1 + Math.sqrt(2*x*x + 4),
                [-2.5, 2.5],
                { title: 'Solution: y = −1 + √(2x² + 4)', points: [{x: 0, y: 1, label: '(0, 1)', color: '#b35900'}] }
            ),
            caption: 'Particular solution through (0, 1)'
        },
        6: {
            type: 'solution',
            generate: () => DEVisuals.slopeField(
                (x, y) => x * (y + 1) / (y - 1),
                [-2.5, 2.5], [-0.5, 4.5],
                { title: 'Slope field: dy/dx = x(y+1)/(y−1)', solutions: [{x0: 0, y0: 3, color: '#2c5f2d'}] }
            ),
            caption: 'Solution curve through (0, 3) on the slope field'
        },

        // IVP problems
        22: {
            type: 'solution',
            generate: () => DEVisuals.solutionCurve(
                (x) => Math.sqrt(x*x*x + x + 4),
                [-1, 3],
                { title: 'Solution: y = √(x³ + x + 4)', points: [{x: 0, y: 2, label: '(0, 2)', color: '#b35900'}] }
            ),
            caption: 'Particular solution of the IVP through (0, 2)'
        },
        47: {
            type: 'solution',
            generate: () => DEVisuals.exponentialCurve(
                500, Math.log(2)/3,
                { tMax: 10, title: 'Bacteria: P(t) = 500·2^(t/3)', points: [{t: 3, label: '1000'}, {t: 8, label: '≈3175'}], yLabel: 'P', tLabel: 'Time (hours)' }
            ),
            caption: 'Bacteria population doubles every 3 hours'
        },

        // Modeling
        42: {
            type: 'problem',
            generate: () => DEVisuals.coolingDiagram({ type: 'cup', tempInit: '90°C', tempEnv: '22°C', title: "Coffee Cooling Setup" }),
            caption: "Newton's Law of Cooling: coffee at 90°C in a 22°C room"
        },
        37: {
            type: 'solution',
            generate: () => DEVisuals.solutionCurve(
                (t) => (10000 + 2000/0.06) * Math.exp(0.06 * t) - 2000/0.06,
                [0, 20],
                { title: 'Investment Growth with Contributions', yRange: [0, 150000], points: [{x: 0, y: 10000, label: '$10,000', color: '#2c5f2d'}, {x: 10, y: 46986, label: '≈$47K', color: '#d4a843'}] }
            ),
            caption: 'Investment at 6% continuous growth + $2000/yr contributions'
        },

        // Physical setup diagrams
        48: {
            type: 'problem',
            generate: () => DEVisuals.coneTank({ radius: 3, height: 6, waterHeight: 4, title: 'Inverted Cone Tank (draining)' }),
            caption: 'Cone: radius 3 m, height 6 m. By similar triangles: r = h/2'
        },
        41: {
            type: 'problem',
            generate: () => DEVisuals.mixingTank({ volume: '100 + 2t L', inRate: '5 L/min', outRate: '3 L/min', inConc: '3 g/L', title: 'Brine Mixing Tank (variable volume)', variableVolume: true }),
            caption: 'Inflow > outflow: volume increases from 100 L at rate 2 L/min'
        },
        43: {
            type: 'problem',
            generate: () => DEVisuals.mixingTank({ volume: '200 gal', inRate: '4 gal/min', outRate: '4 gal/min', inConc: 'Pure water', title: 'Salt Flush Tank (constant volume)', variableVolume: false }),
            caption: 'Pure water in, mixed solution out — constant volume 200 gal'
        },
        44: {
            type: 'problem',
            generate: () => DEVisuals.snowplowDiagram({ title: 'Snowplow Problem' }),
            caption: 'Snow falls at constant rate; plow speed ∝ 1/(snow depth)'
        },
        50: {
            type: 'problem',
            generate: () => DEVisuals.sphereDiagram({ radius: 3, title: 'Raindrop Evaporation' }),
            caption: 'Evaporation rate proportional to surface area → dr/dt = −k'
        },
        45: {
            type: 'problem',
            generate: () => DEVisuals.coolingDiagram({ type: 'thermometer', tempInit: '72°F', tempEnv: '20°F', title: 'Thermometer Cooling' }),
            caption: 'Thermometer at 72°F taken outside to 20°F environment'
        },
        46: {
            type: 'problem',
            generate: () => DEVisuals.mixingTank({ volume: '100 gal', inRate: '0', outRate: '√V gal/min', inConc: 'None', title: 'Leaking Tank (Euler\'s Method)', variableVolume: true }),
            caption: 'Water leaks at rate √V — use Euler method to approximate'
        },

        // Parametric Equations (65-71)
        65: {
            type: 'problem',
            generate: () => DEVisuals.parametricCurve(
                t => t*t + 1, t => 2*t - 3, [-3, 3],
                { title: 'x = t² + 1, y = 2t − 3', tangentAt: 1 }
            ),
            caption: 'Parabolic path with tangent line at t = 1'
        },
        66: {
            type: 'problem',
            generate: () => DEVisuals.parametricCurve(
                t => Math.cos(t), t => Math.sin(2*t), [0, 2*Math.PI],
                { title: 'x = cos(t), y = sin(2t)', tangentAt: Math.PI/4 }
            ),
            caption: 'Lissajous-type figure with tangent at t = π/4'
        },
        67: {
            type: 'problem',
            generate: () => DEVisuals.parametricCurve(
                t => t*t*t - t, t => 2*t*t + 1, [-1.5, 2],
                { title: 'x = t³ − t, y = 2t² + 1', speedAt: 1 }
            ),
            caption: 'Particle path with velocity vector shown at t = 1'
        },
        68: {
            type: 'problem',
            generate: () => DEVisuals.parametricCurve(
                t => Math.exp(t), t => t * Math.exp(t), [-1, 2],
                { title: 'x = eᵗ, y = teᵗ', tangentAt: 0, points: [{t: 0, label: '(1, 0)'}] }
            ),
            caption: 'Exponential parametric curve with tangent at t = 0'
        },
        69: {
            type: 'problem',
            generate: () => DEVisuals.parametricCurve(
                t => t*t, t => (2/3)*t*t*t, [0, 2],
                { title: 'x = t², y = ⅔t³ (arc length)', points: [{t: 0, label: 'start', color: '#2c5f2d'}, {t: 2, label: 'end', color: '#b35900'}] }
            ),
            caption: 'Curve from t = 0 to t = 2; find the arc length'
        },
        70: {
            type: 'problem',
            generate: () => DEVisuals.parametricCurve(
                t => t + Math.sin(t), t => t - Math.cos(t), [-2, 4],
                { title: 'x = t + sin(t), y = t − cos(t)', tangentAt: 0 }
            ),
            caption: 'Curve with tangent line at t = 0'
        },
        71: {
            type: 'problem',
            generate: () => DEVisuals.parametricCurve(
                t => 3*t, t => 4*t, [0, 5],
                { title: 'x = 3t, y = 4t (straight line)', points: [{t: 0, label: '(0,0)', color: '#2c5f2d'}, {t: 5, label: '(15,20)', color: '#b35900'}] }
            ),
            caption: 'Linear path — total distance = speed × time'
        },

        // Polar Coordinates (72-77)
        72: {
            type: 'problem',
            generate: () => DEVisuals.polarCurve(
                theta => 4 * Math.cos(theta), [0, Math.PI],
                { title: 'r = 4cos(θ) — Circle', fillRange: [0, Math.PI] }
            ),
            caption: 'Circle r = 4cos(θ) with enclosed area shaded'
        },
        73: {
            type: 'problem',
            generate: () => DEVisuals.polarCurve(
                theta => 3 * Math.sin(2 * theta), [0, 2*Math.PI],
                { title: 'r = 3sin(2θ) — Rose (4 petals)', fillRange: [0, Math.PI/2] }
            ),
            caption: 'Four-petal rose; one petal shaded for area calculation'
        },
        74: {
            type: 'problem',
            generate: () => DEVisuals.polarCurve(
                theta => 1 + Math.sin(theta), [0, 2*Math.PI],
                { title: 'r = 1 + sin(θ) — Cardioid' }
            ),
            caption: 'Cardioid curve; find dy/dx at θ = π/2'
        },
        75: {
            type: 'problem',
            generate: () => DEVisuals.polarCurve(
                theta => 3 * Math.sin(theta), [0, Math.PI],
                { title: 'r = 3sinθ vs r = 1 + sinθ', secondCurve: theta => 1 + Math.sin(theta), fillRange: [Math.PI/6, 5*Math.PI/6], showArea: 'between' }
            ),
            caption: 'Area inside r = 3sinθ and outside r = 1 + sinθ'
        },
        76: {
            type: 'problem',
            generate: () => DEVisuals.polarCurve(
                theta => 6 * Math.sin(theta), [0, Math.PI],
                { title: 'r = 6sin(θ) — Convert to rectangular' }
            ),
            caption: 'Circle r = 6sinθ (center at (0,3), radius 3)'
        },
        77: {
            type: 'problem',
            generate: () => DEVisuals.polarCurve(
                theta => { const v = 4*Math.cos(2*theta); return v >= 0 ? Math.sqrt(v) : 0; },
                [0, 2*Math.PI],
                { title: 'r² = 4cos(2θ) — Lemniscate', fillRange: [-Math.PI/4, Math.PI/4] }
            ),
            caption: 'Lemniscate with one lobe area shaded'
        },

        // Volumes of Revolution (78-85)
        78: {
            type: 'problem',
            generate: () => DEVisuals.volumeRevolution(
                x => x*x, [0, 2],
                { title: 'y = x² rotated about x-axis (Disk)', method: 'disk' }
            ),
            caption: 'Disk method: rotate y = x² about the x-axis'
        },
        79: {
            type: 'problem',
            generate: () => DEVisuals.volumeRevolution(
                x => Math.sqrt(x), [0, 4],
                { title: 'y = √x rotated about y-axis (Shell)', method: 'shell', axis: 'y' }
            ),
            caption: 'Shell method: rotate y = √x about the y-axis'
        },
        80: {
            type: 'problem',
            generate: () => DEVisuals.volumeRevolution(
                x => x, [0, 1],
                { title: 'y = x vs y = x² about x-axis (Washer)', method: 'washer', gFunc: x => x*x }
            ),
            caption: 'Washer method: region between y = x and y = x²'
        },
        81: {
            type: 'problem',
            generate: () => DEVisuals.volumeRevolution(
                x => Math.exp(x), [0, 1],
                { title: 'y = eˣ rotated about y = −1 (Washer)', method: 'washer', axisOffset: -1, gFunc: x => 0 }
            ),
            caption: 'Rotation about y = −1 creates washer with R = eˣ + 1'
        },
        82: {
            type: 'problem',
            generate: () => DEVisuals.crossSectionVolume(
                x => 1 - x*x, [-1, 1],
                { title: 'Cross-sections: squares on y = 1 − x²', shape: 'square' }
            ),
            caption: 'Square cross-sections perpendicular to x-axis'
        },
        83: {
            type: 'problem',
            generate: () => DEVisuals.volumeRevolution(
                x => Math.sin(x), [0, Math.PI],
                { title: 'y = sin(x) rotated about y = 1 (Washer)', method: 'washer', axisOffset: 1, gFunc: x => 0 }
            ),
            caption: 'Rotation about y = 1: R = 1, r = 1 − sin(x)'
        },
        84: {
            type: 'problem',
            generate: () => DEVisuals.volumeRevolution(
                x => 1/x, [1, 3],
                { title: 'y = 1/x rotated about x-axis (Disk)', method: 'disk' }
            ),
            caption: 'Disk method: Gabriel\'s horn segment from x = 1 to x = 3'
        },
        85: {
            type: 'problem',
            generate: () => DEVisuals.volumeRevolution(
                x => Math.sqrt(x), [0, 4],
                { title: 'x = y² and x = 4 about x = 5 (Washer)', method: 'washer', axis: 'y', axisOffset: 5, gFunc: x => 4 }
            ),
            caption: 'Rotation about x = 5: region between x = y² and x = 4'
        }
    };

    // ===== Theme Toggle =====
    function initTheme() {
        const saved = localStorage.getItem('de-drill-theme');
        if (saved === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('de-drill-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('de-drill-theme', 'dark');
        }
    });

    // ===== Tab Navigation =====
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            navBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(tp => tp.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`tab-${target}`).classList.add('active');
        });
    });

    // ===== Visual Rendering =====
    // Problems that have animated GIFs
    const VOLUME_GIF_PROBLEMS = [78, 79, 80, 81, 82, 83, 84, 85];
    const IVP_GIF_PROBLEMS = [21, 22, 23, 24, 25, 26, 27, 28, 34, 37, 40, 41, 42, 43, 47, 48];

    function getGifHtml(problemId) {
        if (VOLUME_GIF_PROBLEMS.includes(problemId)) {
            return `<div class="gif-container">
                <img src="gifs/vol_${problemId}.gif" alt="3D rotation animation" loading="lazy" />
                <p class="visual-caption">3D rotation animation</p>
            </div>`;
        }
        if (IVP_GIF_PROBLEMS.includes(problemId)) {
            return `<div class="gif-container">
                <img src="gifs/ivp_${problemId}.gif" alt="Solution animation" loading="lazy" />
                <p class="visual-caption">Animated solution curve</p>
            </div>`;
        }
        return '';
    }

    // Euler table data map to avoid duplicated if/else chains
    const EULER_TABLE_CONFIG = {
        11: { f: (x, y) => x + y, x0: 0, y0: 1, h: 0.5, steps: 2 },
        12: { f: (x, y) => 2*x - y, x0: 1, y0: 0, h: 0.5, steps: 3 },
        13: { f: (x, y) => y*y - x, x0: 0, y0: 1, h: 0.1, steps: 3 },
        31: { f: (x, y) => Math.sin(x*y), x0: 0, y0: 1, h: 0.25, steps: 4 },
        36: { f: (x, y) => 2*x + 1, x0: 0, y0: 0, h: 0.25, steps: 4 },
        46: { f: (x, y) => -0.5 * Math.sqrt(Math.max(0, y)), x0: 0, y0: 100, h: 2, steps: 5 }
    };

    function getEulerTableHtml(problemId) {
        const cfg = EULER_TABLE_CONFIG[problemId];
        if (!cfg) return '';
        return DEVisuals.eulerTable(cfg.f, cfg.x0, cfg.y0, cfg.h, cfg.steps);
    }

    function renderVisual(problemId, targetEl, context) {
        const config = PROBLEM_VISUALS[problemId];
        if (!config) {
            // Even without SVG config, show GIF for volume problems
            const gifHtml = (context === 'problem') ? getGifHtml(problemId) : '';
            targetEl.innerHTML = gifHtml;
            return '';
        }
        const gifHtml = getGifHtml(problemId);
        if (config.type === 'both') {
            if (context === 'problem') {
                targetEl.innerHTML = `<div class="visual-block">${config.generateProblem()}<p class="visual-caption">${config.captionProblem}</p></div>${gifHtml}`;
            } else if (context === 'solution') {
                return `<div class="visual-container">${config.generateSolution()}<p class="visual-caption">${config.captionSolution}</p></div>${gifHtml}`;
            }
        } else if (context === 'problem' && config.type === 'problem') {
            targetEl.innerHTML = `<div class="visual-block">${config.generate()}<p class="visual-caption">${config.caption}</p></div>${gifHtml}`;
        } else if (context === 'solution' && config.type === 'solution') {
            return `<div class="visual-container">${config.generate()}<p class="visual-caption">${config.caption}</p></div>${gifHtml}`;
        } else {
            targetEl.innerHTML = gifHtml;
        }
        return '';
    }

    // ===== Problem Generation =====
    function getFilteredProblems() {
        let problems = [...PROBLEM_BANK];
        const exam = examFilter.value;
        const topic = topicFilter.value;
        const difficulty = difficultyFilter.value;

        if (exam === 'AB') {
            problems = problems.filter(p => p.exam === 'AB');
        }
        // BC includes all AB content (BC is a superset)
        
        if (topic !== 'all') {
            problems = problems.filter(p => p.topic === topic);
        }
        if (difficulty !== 'all') {
            problems = problems.filter(p => p.difficulty === parseInt(difficulty));
        }
        return problems;
    }

    function displayProblem(problem) {
        currentProblem = problem;
        
        // Update pills
        examBadge.textContent = problem.exam;
        topicBadge.textContent = problem.topicLabel;
        
        const diffLabels = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };
        diffBadge.textContent = diffLabels[problem.difficulty];

        // Render visual
        renderVisual(problem.id, problemVisual, 'problem');

        // Update problem text
        problemText.innerHTML = problem.problem;
        problemNumber.textContent = `#${problem.id}`;

        // Reset hint/solution/info
        hintArea.style.display = 'none';
        solutionArea.style.display = 'none';
        infoArea.style.display = 'none';
        hintBtn.style.display = 'inline-block';
        solutionBtn.style.display = 'inline-block';
        infoBtn.style.display = (EXAM_INFO && EXAM_INFO[problem.id]) ? 'inline-block' : 'none';

        // Re-render MathJax
        if (window.MathJax && window.MathJax.typesetPromise) {
            MathJax.typesetPromise([problemCard]);
        }

        // Update stats
        problemCount++;
        topicsCoveredSet.add(problem.topic);
        updateStats();
    }

    function generateNewProblem() {
        let problems = getFilteredProblems();
        
        if (problems.length === 0) {
            let relaxed = [...PROBLEM_BANK];
            const exam = examFilter.value;
            const topic = topicFilter.value;
            
            if (exam === 'AB') relaxed = relaxed.filter(p => p.exam === 'AB');
            if (topic !== 'all') relaxed = relaxed.filter(p => p.topic === topic);
            
            if (relaxed.length > 0) {
                problems = relaxed;
            } else {
                relaxed = [...PROBLEM_BANK];
                if (exam === 'AB') relaxed = relaxed.filter(p => p.exam === 'AB');
                problems = relaxed;
            }
        }
        
        if (problems.length === 0) problems = [...PROBLEM_BANK];

        let problem;
        if (problems.length === 1) {
            problem = problems[0];
        } else {
            do {
                problem = problems[Math.floor(Math.random() * problems.length)];
            } while (currentProblem && problem.id === currentProblem.id);
        }

        displayProblem(problem);
    }

    generateBtn.addEventListener('click', generateNewProblem);

    // ===== Hint & Solution =====
    hintBtn.addEventListener('click', () => {
        if (!currentProblem) return;
        hintArea.innerHTML = `<strong>Hint:</strong> ${currentProblem.hint}`;
        hintArea.style.display = 'block';
        if (window.MathJax && window.MathJax.typesetPromise) {
            MathJax.typesetPromise([hintArea]);
        }
    });

    solutionBtn.addEventListener('click', () => {
        if (!currentProblem) return;
        
        let html = '<h4>Step-by-Step Solution</h4>';
        currentProblem.solution.forEach((s, i) => {
            html += `<div class="step"><p class="step-title">Step ${i+1}: ${s.step}</p><p>${s.detail}</p></div>`;
        });
        html += `<div class="answer-box"><strong>Answer:</strong> ${currentProblem.answer}</div>`;
        
        // Add solution visual if available
        const visualHtml = renderVisual(currentProblem.id, document.createElement('div'), 'solution');
        if (visualHtml) html += visualHtml;

        // Add Euler table for Euler's method problems
        if (currentProblem.topic === 'eulers') {
            html += getEulerTableHtml(currentProblem.id);
        }
        
        solutionArea.innerHTML = html;
        solutionArea.style.display = 'block';
        solutionsViewed++;
        updateStats();

        if (window.MathJax && window.MathJax.typesetPromise) {
            MathJax.typesetPromise([solutionArea]);
        }
    });

    // ===== AP Info (Floating Card) =====
    function dismissInfoPopover() {
        infoArea.style.display = 'none';
        infoBtn.textContent = 'AP Info';
    }

    infoBtn.addEventListener('click', () => {
        if (!currentProblem) return;
        const info = EXAM_INFO[currentProblem.id];
        if (!info) return;
        
        if (infoArea.style.display === 'block') {
            dismissInfoPopover();
            return;
        }
        
        let html = `<div class="info-popover-header">
            <span class="info-popover-title">AP Exam Intel</span>
            <button class="info-dismiss" onclick="document.getElementById('infoArea').style.display='none'; document.getElementById('infoBtn').textContent='AP Info';" aria-label="Close">&times;</button>
        </div>`;
        html += `<div class="info-section">
            <span class="info-section-label">What's being tested</span>
            <div class="info-section-content">${info.tested}</div>
        </div>`;
        html += `<div class="info-section">
            <span class="info-section-label">Exam tips & tricks</span>
            <div class="info-section-content">${info.tips}</div>
        </div>`;
        
        infoArea.innerHTML = html;
        infoArea.style.display = 'block';
        infoBtn.textContent = 'Hide Info';

        // Typeset any math in the info card
        if (window.MathJax && window.MathJax.typesetPromise) {
            MathJax.typesetPromise([infoArea]);
        }
    });

    // ===== Stats =====
    function updateStats() {
        totalAttempted.textContent = problemCount;
        solutionsViewedEl.textContent = solutionsViewed;
        topicsCovered.textContent = topicsCoveredSet.size;
    }

    // ===== Custom Problem Set =====
    buildSetBtn.addEventListener('click', () => {
        const count = parseInt(document.getElementById('customCount').value);
        const topic = document.getElementById('customTopic').value;
        const exam = document.getElementById('customExam').value;
        const difficulty = document.getElementById('customDifficulty').value;

        let pool = [...PROBLEM_BANK];
        if (topic) pool = pool.filter(p => p.topic === topic);
        if (exam === 'AB') pool = pool.filter(p => p.exam === 'AB');
        // BC includes AB
        if (difficulty) pool = pool.filter(p => p.difficulty === parseInt(difficulty));

        if (pool.length === 0) {
            customResults.innerHTML = '<p style="color: var(--text-muted); padding: 16px;">No problems match those filters. Try broadening your selections.</p>';
            return;
        }

        // Fisher-Yates shuffle for unbiased randomization
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        const selected = pool.slice(0, Math.min(count, pool.length));

        let html = '';
        selected.forEach((prob, idx) => {
            const diffLabels = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };
            let visualHtml = '';
            const config = PROBLEM_VISUALS[prob.id];
            if (config && (config.type === 'problem' || config.type === 'both')) {
                const gen = config.type === 'both' ? config.generateProblem : config.generate;
                const cap = config.type === 'both' ? config.captionProblem : config.caption;
                visualHtml = `<div class="visual-block">${gen()}<p class="visual-caption">${cap}</p></div>`;
            }

            html += `
                <div class="custom-problem">
                    <div class="custom-problem-header">
                        <div class="card-tags">
                            <span class="pill pill-exam">${prob.exam}</span>
                            <span class="pill pill-topic">${prob.topicLabel}</span>
                            <span class="pill pill-diff">${diffLabels[prob.difficulty]}</span>
                        </div>
                        <span class="custom-problem-num">${idx + 1} of ${selected.length}</span>
                    </div>
                    ${visualHtml}
                    <div class="custom-problem-text">${prob.problem}</div>
                    <div class="custom-actions">
                        <button class="action-btn hint-btn" onclick="window._toggleHint(${prob.id}, this)">Hint</button>
                        <button class="action-btn solution-btn" onclick="window._toggleSolution(${prob.id}, this)">Show Solution</button>
                        <button class="action-btn info-btn" onclick="window._toggleInfo(${prob.id}, this)">AP Info</button>
                    </div>
                    <div id="c-info-${prob.id}" class="custom-info-popover" style="display:none;"></div>
                    <div id="c-hint-${prob.id}" class="reveal-box hint-reveal" style="display:none;"></div>
                    <div id="c-sol-${prob.id}" class="reveal-box solution-reveal" style="display:none;"></div>
                </div>
            `;
        });

        customResults.innerHTML = html;

        // Store for hint/solution access
        window._customProbs = {};
        selected.forEach(p => { window._customProbs[p.id] = p; });

        if (window.MathJax && window.MathJax.typesetPromise) {
            MathJax.typesetPromise([customResults]);
        }
    });

    // Global hint/solution toggles for custom set
    window._toggleHint = function(id, btn) {
        const el = document.getElementById(`c-hint-${id}`);
        const prob = window._customProbs[id];
        if (el.style.display === 'none') {
            el.innerHTML = `<strong>Hint:</strong> ${prob.hint}`;
            el.style.display = 'block';
            btn.textContent = 'Hide Hint';
            if (window.MathJax && window.MathJax.typesetPromise) MathJax.typesetPromise([el]);
        } else {
            el.style.display = 'none';
            btn.textContent = 'Hint';
        }
    };

    window._toggleSolution = function(id, btn) {
        const el = document.getElementById(`c-sol-${id}`);
        const prob = window._customProbs[id];
        if (el.style.display === 'none') {
            let html = '<h4>Step-by-Step Solution</h4>';
            prob.solution.forEach((s, i) => {
                html += `<div class="step"><p class="step-title">Step ${i+1}: ${s.step}</p><p>${s.detail}</p></div>`;
            });
            html += `<div class="answer-box"><strong>Answer:</strong> ${prob.answer}</div>`;
            
            const config = PROBLEM_VISUALS[prob.id];
            if (config && (config.type === 'solution' || config.type === 'both')) {
                const gen = config.type === 'both' ? config.generateSolution : config.generate;
                const cap = config.type === 'both' ? config.captionSolution : config.caption;
                html += `<div class="visual-container">${gen()}<p class="visual-caption">${cap}</p></div>`;
            }

            if (prob.topic === 'eulers') {
                html += getEulerTableHtml(prob.id);
            }

            el.innerHTML = html;
            el.style.display = 'block';
            btn.textContent = 'Hide Solution';
            if (window.MathJax && window.MathJax.typesetPromise) MathJax.typesetPromise([el]);
        } else {
            el.style.display = 'none';
            btn.textContent = 'Show Solution';
        }
    };

    // Global info toggle for custom set
    window._toggleInfo = function(id, btn) {
        const el = document.getElementById(`c-info-${id}`);
        if (el.style.display === 'none') {
            const info = EXAM_INFO[id];
            if (!info) return;
            let html = `<div class="info-popover-header">
                <span class="info-popover-title">AP Exam Intel</span>
                <button class="info-dismiss" onclick="document.getElementById('c-info-${id}').style.display='none'; this.closest('.custom-problem').querySelector('.info-btn').textContent='AP Info';" aria-label="Close">&times;</button>
            </div>`;
            html += `<div class="info-section">
                <span class="info-section-label">What's being tested</span>
                <div class="info-section-content">${info.tested}</div>
            </div>`;
            html += `<div class="info-section">
                <span class="info-section-label">Exam tips & tricks</span>
                <div class="info-section-content">${info.tips}</div>
            </div>`;
            el.innerHTML = html;
            el.style.display = 'block';
            btn.textContent = 'Hide Info';
            if (window.MathJax && window.MathJax.typesetPromise) {
                MathJax.typesetPromise([el]);
            }
        } else {
            el.style.display = 'none';
            btn.textContent = 'AP Info';
        }
    };

    // ===== Review Tab Content =====
    function buildReviewCards() {
        const cards = [
            {
                title: 'Separable DEs',
                content: `<p>A DE of the form \\(\\frac{dy}{dx} = f(x) \\cdot g(y)\\) can be solved by separating:</p>
                    <div class="formula">\\[\\int \\frac{1}{g(y)}\\,dy = \\int f(x)\\,dx + C\\]</div>
                    <p><strong>Move all y to one side, all x to the other, integrate both sides.</strong></p>`
            },
            {
                title: 'Exponential Growth & Decay',
                content: `<p>If \\(\\frac{dy}{dt} = ky\\), then:</p>
                    <div class="formula">\\[y(t) = y_0 e^{kt}\\]</div>
                    <p>\\(k > 0\\) → growth. \\(k < 0\\) → decay. Half-life: \\(t_{1/2} = \\frac{\\ln 2}{|k|}\\)</p>`
            },
            {
                title: 'Logistic Growth (BC)',
                content: `<p>\\(\\frac{dP}{dt} = kP\\left(1 - \\frac{P}{L}\\right)\\) with solution:</p>
                    <div class="formula">\\[P(t) = \\frac{L}{1 + Ae^{-kt}}, \\quad A = \\frac{L - P_0}{P_0}\\]</div>
                    <p>Carrying capacity = \\(L\\). Max growth rate at \\(P = L/2\\).</p>`
            },
            {
                title: 'Slope Fields',
                content: `<p>A slope field shows \\(\\frac{dy}{dx}\\) at many points. To match:</p>
                    <ul>
                        <li>Where are slopes zero? Positive? Negative?</li>
                        <li>Do slopes depend on \\(x\\) only, \\(y\\) only, or both?</li>
                        <li>Look for isoclines (curves of equal slope)</li>
                    </ul>`
            },
            {
                title: "Euler's Method (BC)",
                content: `<p>Numerical approximation using tangent line steps:</p>
                    <div class="formula">\\[y_{n+1} = y_n + h \\cdot f(x_n, y_n)\\]</div>
                    <p>\\(h = \\Delta x\\) is the step size. Smaller \\(h\\) → better accuracy but more work.</p>`
            },
            {
                title: 'Initial Value Problems',
                content: `<p>Given a DE + condition \\(y(x_0) = y_0\\):</p>
                    <ol>
                        <li>Find the general solution</li>
                        <li>Plug in the initial condition to solve for \\(C\\)</li>
                        <li>Write the particular solution</li>
                    </ol>`
            }
        ];

        const container = document.getElementById('reviewCards');
        container.innerHTML = cards.map(c => `
            <div class="review-card">
                <h3>${c.title}</h3>
                ${c.content}
            </div>
        `).join('');

        if (window.MathJax && window.MathJax.typesetPromise) {
            MathJax.typesetPromise([container]);
        }
    }

    // ===== Initialize =====
    initTheme();
    updateStats();
    buildReviewCards();
    generateNewProblem();

})();
