/**
 * AP Calculus DE Practice — Visual Aids Generator
 * Generates SVG diagrams for slope fields, Euler's method, 
 * exponential/logistic curves, and solution visualizations.
 * No external dependencies — pure SVG rendered in-browser.
 */

const DEVisuals = (function() {
    'use strict';

    // Color palette — warm greens and earth tones matching the editorial design
    const COLORS = {
        axes: 'var(--text-muted)',
        grid: 'rgba(128, 128, 128, 0.12)',
        slope: 'var(--accent)',
        curve: '#2c5f2d',
        curveAlt: '#3b5998',
        euler: '#d4a843',
        eulerPoint: '#b35900',
        tangent: '#2c5f2d',
        fill: 'rgba(44, 95, 45, 0.08)',
        text: 'var(--text-muted)',
        equilibrium: '#b35900',
        annotation: '#2c5f2d'
    };

    /**
     * Format a math string into SVG-compatible text with proper
     * superscripts, subscripts, Greek letters, and symbols.
     * Returns SVG <tspan> markup for use inside <text> elements.
     */
    function mathText(str) {
        if (!str) return '';
        let result = str;

        // Replace common Unicode math chars with proper SVG rendering
        // Greek letters (ensure θ, π, etc. use italic)
        result = result.replace(/([θπ])/g, '<tspan font-style="italic">$1</tspan>');

        // Handle superscripts: x², x³, t², eˣ, eᵗ, etc.
        // Pattern: letter followed by ² or ³
        result = result.replace(/([a-zA-Z)])²/g, '$1<tspan dy="-5" font-size="75%">2</tspan><tspan dy="5"></tspan>');
        result = result.replace(/([a-zA-Z)])³/g, '$1<tspan dy="-5" font-size="75%">3</tspan><tspan dy="5"></tspan>');

        // Handle caret-style exponents: ^(stuff) or ^single
        result = result.replace(/\^\(([^)]+)\)/g, '<tspan dy="-5" font-size="75%">$1</tspan><tspan dy="5"></tspan>');
        result = result.replace(/\^([a-zA-Z0-9])/g, '<tspan dy="-5" font-size="75%">$1</tspan><tspan dy="5"></tspan>');

        // Handle Unicode superscript chars
        result = result.replace(/ˣ/g, '<tspan dy="-5" font-size="75%">x</tspan><tspan dy="5"></tspan>');
        result = result.replace(/ᵗ/g, '<tspan dy="-5" font-size="75%">t</tspan><tspan dy="5"></tspan>');

        // Handle subscripts: P₀, x₀, t₀, etc.
        result = result.replace(/₀/g, '<tspan dy="3" font-size="75%">0</tspan><tspan dy="-3"></tspan>');
        result = result.replace(/₁/g, '<tspan dy="3" font-size="75%">1</tspan><tspan dy="-3"></tspan>');
        result = result.replace(/₂/g, '<tspan dy="3" font-size="75%">2</tspan><tspan dy="-3"></tspan>');

        // Square root symbol: √(...) or √x
        result = result.replace(/√\(([^)]+)\)/g, '√($1)');
        // Keep √ as-is since it renders fine in SVG fonts

        // Fractions: ⅔ renders fine, dy/dx should be styled
        result = result.replace(/dy\/dx/g, '<tspan font-style="italic">dy</tspan>/<tspan font-style="italic">dx</tspan>');
        result = result.replace(/dP\/dt/g, '<tspan font-style="italic">dP</tspan>/<tspan font-style="italic">dt</tspan>');
        result = result.replace(/dv\/dt/g, '<tspan font-style="italic">dv</tspan>/<tspan font-style="italic">dt</tspan>');
        result = result.replace(/dV\/dt/g, '<tspan font-style="italic">dV</tspan>/<tspan font-style="italic">dt</tspan>');

        // Italic single-letter variables in formulas (x, y, t, r, but not in words)
        // Only italicize standalone single letters that look like variables
        result = result.replace(/\b([xytr])\b(?![^<]*<\/tspan)/g, '<tspan font-style="italic">$1</tspan>');

        // Functions: sin, cos, tan, ln, exp — should be upright (roman)
        result = result.replace(/\b(sin|cos|tan|ln|exp|log)\b/g, '<tspan font-style="normal">$1</tspan>');

        return result;
    }

    /**
     * Create a formatted SVG <text> element for chart titles.
     * Uses the mathText helper plus a clean font stack.
     */
    function svgTitle(x, y, text, fontSize, fill, options = {}) {
        const fs = fontSize || 11;
        const fl = fill || COLORS.text;
        const anchor = options.anchor || 'middle';
        const weight = options.weight || '600';
        const family = 'font-family="-apple-system, BlinkMacSystemFont, \'SF Pro Text\', \'Segoe UI\', system-ui, sans-serif"';
        return `<text x="${x}" y="${y}" font-size="${fs}" fill="${fl}" text-anchor="${anchor}" font-weight="${weight}" ${family} letter-spacing="-0.2">${mathText(text)}</text>`;
    }

    /**
     * Create a formatted SVG <text> element for chart labels/annotations.
     */
    function svgLabel(x, y, text, fontSize, fill, options = {}) {
        const fs = fontSize || 9;
        const fl = fill || COLORS.text;
        const anchor = options.anchor || 'start';
        const style = options.italic ? ' font-style="italic"' : '';
        const weight = options.weight ? ` font-weight="${options.weight}"` : '';
        const family = 'font-family="-apple-system, BlinkMacSystemFont, \'SF Pro Text\', \'Segoe UI\', system-ui, sans-serif"';
        return `<text x="${x}" y="${y}" font-size="${fs}" fill="${fl}" text-anchor="${anchor}"${style}${weight} ${family}>${mathText(text)}</text>`;
    }

    // SVG wrapper with responsive sizing
    function createSVG(width, height, viewBox) {
        return `<svg xmlns="http://www.w3.org/2000/svg" 
            viewBox="${viewBox || `0 0 ${width} ${height}`}" 
            width="100%" height="auto" 
            style="max-width:${width}px; display:block; margin:12px auto;"
            preserveAspectRatio="xMidYMid meet">`;
    }

    // Draw axes with labels
    // Calculate nice tick step for a given range, targeting ~5-8 ticks
    function niceStep(range) {
        const span = range[1] - range[0];
        const rawStep = span / 6;
        const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
        const residual = rawStep / magnitude;
        let niceVal;
        if (residual <= 1.5) niceVal = 1;
        else if (residual <= 3) niceVal = 2;
        else if (residual <= 7) niceVal = 5;
        else niceVal = 10;
        return niceVal * magnitude;
    }

    // Format tick label (avoid unnecessary decimals)
    function formatTick(v) {
        if (Math.abs(v) >= 1000) return (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + 'k';
        if (Number.isInteger(v)) return v.toString();
        return v.toFixed(1);
    }

    function drawAxes(cx, cy, w, h, xLabel, yLabel, xRange, yRange) {
        let svg = '';
        // Grid lines (fixed 8 divisions)
        for (let i = 1; i < 8; i++) {
            const gx = i * w / 8;
            const gy = i * h / 8;
            svg += `<line x1="${gx}" y1="0" x2="${gx}" y2="${h}" stroke="${COLORS.grid}" stroke-width="0.5"/>`;
            svg += `<line x1="0" y1="${gy}" x2="${w}" y2="${gy}" stroke="${COLORS.grid}" stroke-width="0.5"/>`;
        }
        // Axes
        svg += `<line x1="0" y1="${cy}" x2="${w}" y2="${cy}" stroke="${COLORS.axes}" stroke-width="1.5"/>`;
        svg += `<line x1="${cx}" y1="0" x2="${cx}" y2="${h}" stroke="${COLORS.axes}" stroke-width="1.5"/>`;
        // Arrows
        svg += `<polygon points="${w-6},${cy-3} ${w},${cy} ${w-6},${cy+3}" fill="${COLORS.axes}"/>`;
        svg += `<polygon points="${cx-3},6 ${cx},0 ${cx+3},6" fill="${COLORS.axes}"/>`;
        // Labels
        svg += `<text x="${w-10}" y="${cy+16}" font-size="12" fill="${COLORS.text}" font-style="italic" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif">${xLabel || 'x'}</text>`;
        svg += `<text x="${cx+8}" y="14" font-size="12" fill="${COLORS.text}" font-style="italic" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif">${yLabel || 'y'}</text>`;
        // Smart tick marks with numbers
        if (xRange && yRange) {
            const xMin = xRange[0], xMax = xRange[1];
            const yMin = yRange[0], yMax = yRange[1];
            const xTick = niceStep(xRange);
            const yTick = niceStep(yRange);
            const plotW = w - 40;
            const plotH = h - 40;
            // X-axis ticks
            let xStart = Math.ceil(xMin / xTick) * xTick;
            for (let v = xStart; v <= xMax; v += xTick) {
                if (Math.abs(v) < xTick * 0.01) continue; // skip zero
                const pxCorrect = 20 + ((v - xMin) / (xMax - xMin)) * plotW;
                svg += `<line x1="${pxCorrect}" y1="${cy-3}" x2="${pxCorrect}" y2="${cy+3}" stroke="${COLORS.axes}" stroke-width="1"/>`;
                svg += `<text x="${pxCorrect}" y="${cy+15}" font-size="10" fill="${COLORS.text}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif">${formatTick(v)}</text>`;
            }
            // Y-axis ticks
            let yStart = Math.ceil(yMin / yTick) * yTick;
            for (let v = yStart; v <= yMax; v += yTick) {
                if (Math.abs(v) < yTick * 0.01) continue; // skip zero
                const pyCorrect = 20 + ((yMax - v) / (yMax - yMin)) * plotH;
                svg += `<line x1="${cx-3}" y1="${pyCorrect}" x2="${cx+3}" y2="${pyCorrect}" stroke="${COLORS.axes}" stroke-width="1"/>`;
                svg += `<text x="${cx-8}" y="${pyCorrect+4}" font-size="10" fill="${COLORS.text}" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif">${formatTick(v)}</text>`;
            }
        }
        return svg;
    }

    // Convert math coordinates to SVG coordinates
    function toSVG(x, y, cx, cy, scaleX, scaleY) {
        return { x: cx + x * scaleX, y: cy - y * scaleY };
    }

    /**
     * Generate a slope field SVG
     * @param {Function} dydx - function(x, y) returning the slope
     * @param {Array} xRange - [xMin, xMax]
     * @param {Array} yRange - [yMin, yMax]
     * @param {Object} options - { solutions: [{x0, y0, color}], equilibria: [y values], title }
     */
    function slopeField(dydx, xRange, yRange, options = {}) {
        const W = 360, H = 300;
        const margin = 30;
        const cx = margin + (0 - xRange[0]) / (xRange[1] - xRange[0]) * (W - 2 * margin);
        const cy = margin + (yRange[1] - 0) / (yRange[1] - yRange[0]) * (H - 2 * margin);
        const scaleX = (W - 2 * margin) / (xRange[1] - xRange[0]);
        const scaleY = (H - 2 * margin) / (yRange[1] - yRange[0]);

        let svg = createSVG(W, H);
        svg += drawAxes(cx, cy, W, H, 'x', 'y', xRange, yRange);

        // Draw slope segments
        const nx = 15, ny = 12;
        const dx = (xRange[1] - xRange[0]) / nx;
        const dy = (yRange[1] - yRange[0]) / ny;
        const segLen = Math.min(dx, dy) * 0.4;

        for (let i = 0; i <= nx; i++) {
            for (let j = 0; j <= ny; j++) {
                const x = xRange[0] + i * dx;
                const y = yRange[0] + j * dy;
                let slope = dydx(x, y);
                
                if (!isFinite(slope)) continue;
                if (Math.abs(slope) > 20) slope = Math.sign(slope) * 20;

                const angle = Math.atan(slope);
                const halfLen = segLen * 0.5;
                const x1 = x - halfLen * Math.cos(angle);
                const y1 = y - halfLen * Math.sin(angle);
                const x2 = x + halfLen * Math.cos(angle);
                const y2 = y + halfLen * Math.sin(angle);

                const p1 = toSVG(x1, y1, cx, cy, scaleX, scaleY);
                const p2 = toSVG(x2, y2, cx, cy, scaleX, scaleY);

                svg += `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" 
                    stroke="${COLORS.slope}" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>`;
            }
        }

        // Draw equilibrium lines
        if (options.equilibria) {
            options.equilibria.forEach(yEq => {
                const p = toSVG(xRange[0], yEq, cx, cy, scaleX, scaleY);
                const p2 = toSVG(xRange[1], yEq, cx, cy, scaleX, scaleY);
                svg += `<line x1="${p.x}" y1="${p.y}" x2="${p2.x}" y2="${p2.y}" 
                    stroke="${COLORS.equilibrium}" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.7"/>`;
                svg += `<text x="${p2.x - 5}" y="${p.y - 5}" font-size="10" fill="${COLORS.equilibrium}" text-anchor="end">y=${yEq}</text>`;
            });
        }

        // Draw solution curves
        if (options.solutions) {
            options.solutions.forEach(sol => {
                const color = sol.color || COLORS.curveAlt;
                let path = '';
                let x = sol.x0, y = sol.y0;
                const dt = 0.02;
                
                // Forward
                let points = [];
                x = sol.x0; y = sol.y0;
                for (let t = 0; t < 200; t++) {
                    const p = toSVG(x, y, cx, cy, scaleX, scaleY);
                    if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) break;
                    points.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
                    const s = dydx(x, y);
                    if (!isFinite(s)) break;
                    y += s * dt;
                    x += dt;
                }
                if (points.length > 1) {
                    svg += `<polyline points="${points.join(' ')}" fill="none" stroke="${color}" stroke-width="2" opacity="0.85"/>`;
                }

                // Backward
                points = [];
                x = sol.x0; y = sol.y0;
                for (let t = 0; t < 200; t++) {
                    const p = toSVG(x, y, cx, cy, scaleX, scaleY);
                    if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) break;
                    points.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
                    const s = dydx(x, y);
                    if (!isFinite(s)) break;
                    y -= s * dt;
                    x -= dt;
                }
                if (points.length > 1) {
                    svg += `<polyline points="${points.join(' ')}" fill="none" stroke="${color}" stroke-width="2" opacity="0.85"/>`;
                }

                // Mark initial point
                const p0 = toSVG(sol.x0, sol.y0, cx, cy, scaleX, scaleY);
                svg += `<circle cx="${p0.x}" cy="${p0.y}" r="4" fill="${color}" stroke="white" stroke-width="1"/>`;
            });
        }

        // Title
        if (options.title) {
            svg += svgTitle(W/2, H-5, options.title, 11);
        }

        svg += '</svg>';
        return svg;
    }

    /**
     * Generate an Euler's method visualization
     * @param {Function} dydx - function(x, y) returning the slope
     * @param {number} x0 - initial x
     * @param {number} y0 - initial y
     * @param {number} h - step size
     * @param {number} steps - number of steps
     * @param {Object} options - { exactSolution: function(x), xRange, yRange, title }
     */
    function eulerMethod(dydx, x0, y0, h, steps, options = {}) {
        const W = 360, H = 280;
        const margin = 35;

        // Compute Euler points
        const eulerPoints = [{x: x0, y: y0}];
        let x = x0, y = y0;
        for (let i = 0; i < steps; i++) {
            const slope = dydx(x, y);
            y = y + h * slope;
            x = x + h;
            eulerPoints.push({x, y});
        }

        // Determine ranges
        const xRange = options.xRange || [Math.min(x0 - 0.5, -0.5), Math.max(x0 + (steps + 1) * h, eulerPoints[eulerPoints.length-1].x + 0.5)];
        let yMin = Math.min(...eulerPoints.map(p => p.y)) - 0.5;
        let yMax = Math.max(...eulerPoints.map(p => p.y)) + 0.5;
        
        if (options.exactSolution) {
            for (let xv = xRange[0]; xv <= xRange[1]; xv += 0.1) {
                const yv = options.exactSolution(xv);
                if (isFinite(yv)) {
                    yMin = Math.min(yMin, yv - 0.3);
                    yMax = Math.max(yMax, yv + 0.3);
                }
            }
        }
        const yRange = options.yRange || [yMin, yMax];

        const cx = margin + (0 - xRange[0]) / (xRange[1] - xRange[0]) * (W - 2 * margin);
        const cy = margin + (yRange[1] - 0) / (yRange[1] - yRange[0]) * (H - 2 * margin);
        const scaleX = (W - 2 * margin) / (xRange[1] - xRange[0]);
        const scaleY = (H - 2 * margin) / (yRange[1] - yRange[0]);

        let svg = createSVG(W, H);
        svg += drawAxes(cx, cy, W, H, 'x', 'y', xRange, yRange);

        // Draw exact solution if provided
        if (options.exactSolution) {
            let points = [];
            for (let xv = xRange[0]; xv <= xRange[1]; xv += 0.05) {
                const yv = options.exactSolution(xv);
                if (!isFinite(yv)) continue;
                const p = toSVG(xv, yv, cx, cy, scaleX, scaleY);
                if (p.x >= 0 && p.x <= W && p.y >= 0 && p.y <= H) {
                    points.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
                }
            }
            if (points.length > 1) {
                svg += `<polyline points="${points.join(' ')}" fill="none" stroke="${COLORS.curve}" stroke-width="2" opacity="0.5" stroke-dasharray="4,3"/>`;
            }
        }

        // Draw Euler steps (line segments with tangent lines)
        for (let i = 0; i < eulerPoints.length - 1; i++) {
            const p1 = toSVG(eulerPoints[i].x, eulerPoints[i].y, cx, cy, scaleX, scaleY);
            const p2 = toSVG(eulerPoints[i+1].x, eulerPoints[i+1].y, cx, cy, scaleX, scaleY);
            svg += `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" 
                stroke="${COLORS.euler}" stroke-width="2.5" stroke-linecap="round"/>`;
        }

        // Draw points
        eulerPoints.forEach((pt, i) => {
            const p = toSVG(pt.x, pt.y, cx, cy, scaleX, scaleY);
            svg += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${i === 0 ? 5 : 4}" 
                fill="${i === 0 ? COLORS.eulerPoint : COLORS.euler}" stroke="white" stroke-width="1.5"/>`;
            // Label
            svg += `<text x="${p.x.toFixed(1)}" y="${p.y - 8}" font-size="9" fill="${COLORS.text}" text-anchor="middle">
                (${pt.x.toFixed(1)}, ${pt.y.toFixed(2)})</text>`;
        });

        // Legend
        svg += `<rect x="${W-130}" y="5" width="125" height="${options.exactSolution ? 38 : 22}" rx="4" fill="var(--bg-card)" stroke="${COLORS.grid}" opacity="0.9"/>`;
        svg += `<line x1="${W-122}" y1="16" x2="${W-108}" y2="16" stroke="${COLORS.euler}" stroke-width="2.5"/>`;
        svg += `<text x="${W-104}" y="19" font-size="9" fill="${COLORS.text}">Euler approximation</text>`;
        if (options.exactSolution) {
            svg += `<line x1="${W-122}" y1="32" x2="${W-108}" y2="32" stroke="${COLORS.curve}" stroke-width="2" stroke-dasharray="4,3"/>`;
            svg += `<text x="${W-104}" y="35" font-size="9" fill="${COLORS.text}">Exact solution</text>`;
        }

        // Title
        if (options.title) {
            svg += svgTitle(W/2, H-5, options.title, 11);
        }

        svg += '</svg>';
        return svg;
    }

    /**
     * Generate an exponential growth/decay curve
     * @param {number} A0 - initial amount
     * @param {number} k - growth/decay constant
     * @param {Object} options - { tMax, points: [{t, label}], title, yLabel, tLabel }
     */
    function exponentialCurve(A0, k, options = {}) {
        const W = 360, H = 240;
        const margin = 40;
        const tMax = options.tMax || (k > 0 ? 5 : 10);
        const tRange = [0, tMax];
        
        // Calculate y range
        let yMax = k > 0 ? A0 * Math.exp(k * tMax * 0.7) : A0 * 1.2;
        let yMin = k > 0 ? 0 : A0 * Math.exp(k * tMax) * 0.8;
        const yRange = [Math.min(0, yMin), yMax];

        const cx = margin;
        const cy = margin + (yRange[1] - 0) / (yRange[1] - yRange[0]) * (H - 2 * margin);
        const scaleX = (W - 2 * margin) / (tRange[1] - tRange[0]);
        const scaleY = (H - 2 * margin) / (yRange[1] - yRange[0]);

        let svg = createSVG(W, H);
        
        // Simple grid
        for (let i = 1; i < 8; i++) {
            const gx = margin + i * (W - 2 * margin) / 8;
            svg += `<line x1="${gx}" y1="${margin}" x2="${gx}" y2="${H-margin}" stroke="${COLORS.grid}" stroke-width="0.5"/>`;
        }
        for (let i = 1; i < 6; i++) {
            const gy = margin + i * (H - 2 * margin) / 6;
            svg += `<line x1="${margin}" y1="${gy}" x2="${W-margin}" y2="${gy}" stroke="${COLORS.grid}" stroke-width="0.5"/>`;
        }

        // Axes
        svg += `<line x1="${margin}" y1="${H-margin}" x2="${W-margin}" y2="${H-margin}" stroke="${COLORS.axes}" stroke-width="1.5"/>`;
        svg += `<line x1="${margin}" y1="${margin}" x2="${margin}" y2="${H-margin}" stroke="${COLORS.axes}" stroke-width="1.5"/>`;
        svg += `<text x="${W/2}" y="${H-5}" font-size="11" fill="${COLORS.text}" text-anchor="middle">${options.tLabel || 't'}</text>`;
        svg += `<text x="12" y="${H/2}" font-size="11" fill="${COLORS.text}" text-anchor="middle" transform="rotate(-90, 12, ${H/2})">${options.yLabel || 'A(t)'}</text>`;

        // Draw curve
        let points = [];
        for (let t = 0; t <= tMax; t += tMax / 100) {
            const y = A0 * Math.exp(k * t);
            const px = margin + (t / tMax) * (W - 2 * margin);
            const py = H - margin - (y - yRange[0]) / (yRange[1] - yRange[0]) * (H - 2 * margin);
            if (py >= margin && py <= H - margin) {
                points.push(`${px.toFixed(1)},${py.toFixed(1)}`);
            }
        }
        if (points.length > 1) {
            svg += `<polyline points="${points.join(' ')}" fill="none" stroke="${COLORS.curve}" stroke-width="2.5"/>`;
        }

        // Mark special points
        if (options.points) {
            options.points.forEach(pt => {
                const y = A0 * Math.exp(k * pt.t);
                const px = margin + (pt.t / tMax) * (W - 2 * margin);
                const py = H - margin - (y - yRange[0]) / (yRange[1] - yRange[0]) * (H - 2 * margin);
                svg += `<circle cx="${px}" cy="${py}" r="4" fill="${COLORS.eulerPoint}" stroke="white" stroke-width="1.5"/>`;
                // Dashed lines to axes
                svg += `<line x1="${px}" y1="${py}" x2="${px}" y2="${H-margin}" stroke="${COLORS.eulerPoint}" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>`;
                svg += `<line x1="${margin}" y1="${py}" x2="${px}" y2="${py}" stroke="${COLORS.eulerPoint}" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>`;
                if (pt.label) {
                    svg += `<text x="${px}" y="${py - 8}" font-size="9" fill="${COLORS.eulerPoint}" text-anchor="middle">${pt.label}</text>`;
                }
            });
        }

        // Initial point
        const py0 = H - margin - (A0 - yRange[0]) / (yRange[1] - yRange[0]) * (H - 2 * margin);
        svg += `<circle cx="${margin}" cy="${py0}" r="4" fill="${COLORS.curve}" stroke="white" stroke-width="1.5"/>`;
        svg += `<text x="${margin + 5}" y="${py0 - 8}" font-size="9" fill="${COLORS.curve}">${options.yLabel || 'A'}₀ = ${A0}</text>`;

        // Title
        if (options.title) {
            svg += svgTitle(W/2, 14, options.title, 11);
        }

        svg += '</svg>';
        return svg;
    }

    /**
     * Generate a logistic growth curve
     * @param {number} P0 - initial population
     * @param {number} K - carrying capacity
     * @param {number} r - growth rate
     * @param {Object} options - { tMax, title, showInflection }
     */
    function logisticCurve(P0, K, r, options = {}) {
        const W = 360, H = 260;
        const margin = 40;
        const tMax = options.tMax || 15;

        let svg = createSVG(W, H);

        // Grid
        for (let i = 1; i < 8; i++) {
            const gx = margin + i * (W - 2 * margin) / 8;
            svg += `<line x1="${gx}" y1="${margin}" x2="${gx}" y2="${H-margin}" stroke="${COLORS.grid}" stroke-width="0.5"/>`;
        }
        for (let i = 1; i < 6; i++) {
            const gy = margin + i * (H - 2 * margin) / 6;
            svg += `<line x1="${margin}" y1="${gy}" x2="${W-margin}" y2="${gy}" stroke="${COLORS.grid}" stroke-width="0.5"/>`;
        }

        // Axes
        svg += `<line x1="${margin}" y1="${H-margin}" x2="${W-margin}" y2="${H-margin}" stroke="${COLORS.axes}" stroke-width="1.5"/>`;
        svg += `<line x1="${margin}" y1="${margin}" x2="${margin}" y2="${H-margin}" stroke="${COLORS.axes}" stroke-width="1.5"/>`;
        svg += `<text x="${W/2}" y="${H-5}" font-size="11" fill="${COLORS.text}" text-anchor="middle">t</text>`;
        svg += `<text x="12" y="${H/2}" font-size="11" fill="${COLORS.text}" text-anchor="middle" transform="rotate(-90, 12, ${H/2})">P(t)</text>`;

        // Carrying capacity line
        const Ky = H - margin - (K / (K * 1.2)) * (H - 2 * margin);
        svg += `<line x1="${margin}" y1="${Ky}" x2="${W-margin}" y2="${Ky}" stroke="${COLORS.equilibrium}" stroke-width="1.5" stroke-dasharray="6,3"/>`;
        svg += `<text x="${W-margin+3}" y="${Ky+4}" font-size="10" fill="${COLORS.equilibrium}">K=${K}</text>`;

        // Logistic solution: P(t) = K / (1 + ((K-P0)/P0) * e^(-rt))
        const A = (K - P0) / P0;
        let points = [];
        for (let t = 0; t <= tMax; t += tMax / 150) {
            const P = K / (1 + A * Math.exp(-r * t));
            const px = margin + (t / tMax) * (W - 2 * margin);
            const py = H - margin - (P / (K * 1.2)) * (H - 2 * margin);
            points.push(`${px.toFixed(1)},${py.toFixed(1)}`);
        }
        svg += `<polyline points="${points.join(' ')}" fill="none" stroke="${COLORS.curve}" stroke-width="2.5"/>`;

        // Inflection point at P = K/2
        if (options.showInflection !== false) {
            const tInflection = Math.log(A) / r;
            if (tInflection > 0 && tInflection < tMax) {
                const px = margin + (tInflection / tMax) * (W - 2 * margin);
                const py = H - margin - ((K/2) / (K * 1.2)) * (H - 2 * margin);
                svg += `<circle cx="${px}" cy="${py}" r="4" fill="${COLORS.tangent}" stroke="white" stroke-width="1.5"/>`;
                svg += `<text x="${px + 6}" y="${py - 6}" font-size="9" fill="${COLORS.tangent}">Inflection (P=K/2)</text>`;
                // K/2 line
                svg += `<line x1="${margin}" y1="${py}" x2="${W-margin}" y2="${py}" stroke="${COLORS.tangent}" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>`;
                svg += `<text x="${W-margin+3}" y="${py+4}" font-size="9" fill="${COLORS.tangent}">K/2</text>`;
            }
        }

        // Initial point
        const py0 = H - margin - (P0 / (K * 1.2)) * (H - 2 * margin);
        svg += `<circle cx="${margin}" cy="${py0}" r="4" fill="${COLORS.curve}" stroke="white" stroke-width="1.5"/>`;
        svg += `<text x="${margin + 5}" y="${py0 + 14}" font-size="9" fill="${COLORS.curve}">P₀=${P0}</text>`;

        // Title
        if (options.title) {
            svg += svgTitle(W/2, 14, options.title, 11);
        }

        svg += '</svg>';
        return svg;
    }

    /**
     * Generate a general solution curve plot
     * @param {Function} yFunc - function(x) returning y
     * @param {Array} xRange - [xMin, xMax]
     * @param {Object} options - { yRange, title, points, annotations, additionalCurves }
     */
    function solutionCurve(yFunc, xRange, options = {}) {
        const W = 360, H = 240;
        const margin = 35;

        // Calculate y range
        let yMin = Infinity, yMax = -Infinity;
        for (let x = xRange[0]; x <= xRange[1]; x += (xRange[1] - xRange[0]) / 100) {
            const y = yFunc(x);
            if (isFinite(y)) {
                yMin = Math.min(yMin, y);
                yMax = Math.max(yMax, y);
            }
        }
        const yPad = (yMax - yMin) * 0.15 || 1;
        const yRange = options.yRange || [yMin - yPad, yMax + yPad];

        const cx = margin + (0 - xRange[0]) / (xRange[1] - xRange[0]) * (W - 2 * margin);
        const cy = margin + (yRange[1] - 0) / (yRange[1] - yRange[0]) * (H - 2 * margin);
        const scaleX = (W - 2 * margin) / (xRange[1] - xRange[0]);
        const scaleY = (H - 2 * margin) / (yRange[1] - yRange[0]);

        let svg = createSVG(W, H);
        svg += drawAxes(cx, cy, W, H, 'x', 'y', xRange, yRange);

        // Draw main curve
        let points = [];
        for (let x = xRange[0]; x <= xRange[1]; x += (xRange[1] - xRange[0]) / 200) {
            const y = yFunc(x);
            if (!isFinite(y)) continue;
            const p = toSVG(x, y, cx, cy, scaleX, scaleY);
            if (p.y >= 0 && p.y <= H) {
                points.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
            }
        }
        if (points.length > 1) {
            svg += `<polyline points="${points.join(' ')}" fill="none" stroke="${COLORS.curve}" stroke-width="2.5"/>`;
        }

        // Additional curves (e.g., family of solutions)
        if (options.additionalCurves) {
            options.additionalCurves.forEach((curve, idx) => {
                let pts = [];
                const colors = ['#06b6d4', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899'];
                for (let x = xRange[0]; x <= xRange[1]; x += (xRange[1] - xRange[0]) / 200) {
                    const y = curve(x);
                    if (!isFinite(y)) continue;
                    const p = toSVG(x, y, cx, cy, scaleX, scaleY);
                    if (p.y >= 0 && p.y <= H) {
                        pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
                    }
                }
                if (pts.length > 1) {
                    svg += `<polyline points="${pts.join(' ')}" fill="none" stroke="${colors[idx % colors.length]}" stroke-width="1.8" opacity="0.7"/>`;
                }
            });
        }

        // Mark special points
        if (options.points) {
            options.points.forEach(pt => {
                const p = toSVG(pt.x, pt.y, cx, cy, scaleX, scaleY);
                svg += `<circle cx="${p.x}" cy="${p.y}" r="4" fill="${pt.color || COLORS.eulerPoint}" stroke="white" stroke-width="1.5"/>`;
                if (pt.label) {
                    // Position label to avoid overflowing SVG edges
                    const labelX = p.x > W - 50 ? p.x - 6 : p.x + 6;
                    const labelY = p.y < 20 ? p.y + 14 : p.y - 6;
                    const anchor = p.x > W - 50 ? 'end' : 'start';
                    svg += `<text x="${labelX}" y="${labelY}" font-size="9" fill="${pt.color || COLORS.eulerPoint}" text-anchor="${anchor}">${pt.label}</text>`;
                }
            });
        }

        // Title
        if (options.title) {
            svg += svgTitle(W/2, 14, options.title, 11);
        }

        svg += '</svg>';
        return svg;
    }

    /**
     * Generate a simple table visualization for Euler's method steps
     */
    function eulerTable(dydx, x0, y0, h, steps) {
        let html = '<div class="euler-table-wrap"><table class="euler-table"><thead><tr>';
        html += '<th>Step</th><th>x<sub>n</sub></th><th>y<sub>n</sub></th><th>f(x<sub>n</sub>, y<sub>n</sub>)</th><th>y<sub>n+1</sub> = y<sub>n</sub> + h·f</th>';
        html += '</tr></thead><tbody>';

        let x = x0, y = y0;
        for (let i = 0; i <= steps; i++) {
            const slope = dydx(x, y);
            const yNext = y + h * slope;
            html += `<tr>`;
            html += `<td>${i}</td>`;
            html += `<td>${x.toFixed(2)}</td>`;
            html += `<td>${y.toFixed(4)}</td>`;
            html += `<td>${slope.toFixed(4)}</td>`;
            html += i < steps ? `<td>${yNext.toFixed(4)}</td>` : `<td>—</td>`;
            html += `</tr>`;
            if (i < steps) {
                y = yNext;
                x = x + h;
            }
        }

        html += '</tbody></table></div>';
        return html;
    }

    /**
     * Generate an inverted cone tank diagram
     * @param {Object} options - { radius, height, waterHeight, title }
     */
    function coneTank(options = {}) {
        const W = 340, H = 320;
        const R = options.radius || 3;
        const totalH = options.height || 6;
        const waterH = options.waterHeight || 4;
        const title = options.title || 'Inverted Cone Tank';

        let svg = createSVG(W, H);

        // Tank outline (inverted cone - apex at bottom)
        const topY = 40, bottomY = 280;
        const coneH = bottomY - topY;
        const topHalfW = 120; // half-width at top
        const cx = W / 2;

        // Cone outline
        svg += `<line x1="${cx - topHalfW}" y1="${topY}" x2="${cx}" y2="${bottomY}" stroke="${COLORS.axes}" stroke-width="2"/>`;
        svg += `<line x1="${cx + topHalfW}" y1="${topY}" x2="${cx}" y2="${bottomY}" stroke="${COLORS.axes}" stroke-width="2"/>`;
        // Top ellipse (rim)
        svg += `<ellipse cx="${cx}" cy="${topY}" rx="${topHalfW}" ry="14" fill="none" stroke="${COLORS.axes}" stroke-width="2"/>`;

        // Water level
        const waterFrac = waterH / totalH;
        const waterY = bottomY - waterFrac * coneH;
        const waterHalfW = waterFrac * topHalfW;

        // Water fill (trapezoid-ish shape)
        svg += `<path d="M${cx - waterHalfW},${waterY} Q${cx},${waterY + 8} ${cx + waterHalfW},${waterY} L${cx},${bottomY} Z" fill="rgba(59, 130, 246, 0.2)" stroke="none"/>`;
        // Water surface ellipse
        svg += `<ellipse cx="${cx}" cy="${waterY}" rx="${waterHalfW}" ry="${8 * waterFrac}" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" stroke-width="1.5"/>`;

        // Dimension labels
        // Height arrow (right side)
        const arrowX = cx + topHalfW + 30;
        svg += `<line x1="${arrowX}" y1="${topY}" x2="${arrowX}" y2="${bottomY}" stroke="${COLORS.annotation}" stroke-width="1.5" marker-start="url(#arrowUp)" marker-end="url(#arrowDown)"/>`;
        svg += `<text x="${arrowX + 8}" y="${(topY + bottomY) / 2 + 4}" font-size="13" fill="${COLORS.annotation}" font-weight="600">${totalH} m</text>`;

        // Radius arrow (top)
        svg += `<line x1="${cx}" y1="${topY - 22}" x2="${cx + topHalfW}" y2="${topY - 22}" stroke="${COLORS.annotation}" stroke-width="1.5" marker-end="url(#arrowRight)"/>`;
        svg += `<text x="${cx + topHalfW / 2 - 10}" y="${topY - 28}" font-size="13" fill="${COLORS.annotation}" font-weight="600">R = ${R} m</text>`;

        // Water height arrow (left side)
        const waterArrowX = cx - topHalfW - 30;
        svg += `<line x1="${waterArrowX}" y1="${waterY}" x2="${waterArrowX}" y2="${bottomY}" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,2"/>`;
        svg += `<text x="${waterArrowX - 8}" y="${(waterY + bottomY) / 2 + 4}" font-size="12" fill="#3b82f6" font-weight="600" text-anchor="end">h</text>`;

        // Water radius label
        svg += `<line x1="${cx}" y1="${waterY}" x2="${cx + waterHalfW}" y2="${waterY}" stroke="#3b82f6" stroke-width="1" stroke-dasharray="3,2"/>`;
        svg += `<text x="${cx + waterHalfW / 2}" y="${waterY - 6}" font-size="11" fill="#3b82f6" text-anchor="middle">r</text>`;

        // Similar triangles annotation
        svg += svgLabel(cx, bottomY + 16, `r/h = R/H = ${R}/${totalH} = 1/2`, 10, COLORS.text, {anchor: 'middle', italic: true});

        // Drain hole
        svg += `<circle cx="${cx}" cy="${bottomY}" r="4" fill="${COLORS.axes}"/>`;
        svg += `<text x="${cx + 10}" y="${bottomY + 4}" font-size="10" fill="${COLORS.text}">drain</text>`;

        // Arrow markers
        svg += `<defs>`;
        svg += `<marker id="arrowUp" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto"><path d="M0,6 L3,0 L6,6" fill="${COLORS.annotation}"/></marker>`;
        svg += `<marker id="arrowDown" markerWidth="6" markerHeight="6" refX="3" refY="0" orient="auto"><path d="M0,0 L3,6 L6,0" fill="${COLORS.annotation}"/></marker>`;
        svg += `<marker id="arrowRight" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="${COLORS.annotation}"/></marker>`;
        svg += `</defs>`;

        // Title
        svg += svgTitle(W/2, H - 4, title, 12);

        svg += '</svg>';
        return svg;
    }

    /**
     * Generate a mixing tank diagram
     * @param {Object} options - { volume, inRate, outRate, inConc, title, variableVolume }
     */
    function mixingTank(options = {}) {
        const W = 360, H = 300;
        const title = options.title || 'Mixing Tank';
        const vol = options.volume || '200 gal';
        const inRate = options.inRate || '5 L/min';
        const outRate = options.outRate || '3 L/min';
        const inConc = options.inConc || '3 g/L';
        const variableVol = options.variableVolume || false;

        let svg = createSVG(W, H);

        // Tank body (rounded rectangle)
        const tx = 90, ty = 60, tw = 180, th = 180;
        svg += `<rect x="${tx}" y="${ty}" width="${tw}" height="${th}" rx="10" ry="10" fill="rgba(59, 130, 246, 0.08)" stroke="${COLORS.axes}" stroke-width="2.5"/>`;

        // Water fill
        const waterLevel = variableVol ? 0.6 : 0.75;
        const waterTop = ty + th * (1 - waterLevel);
        svg += `<rect x="${tx + 2}" y="${waterTop}" width="${tw - 4}" height="${th * waterLevel - 2}" rx="8" fill="rgba(59, 130, 246, 0.2)"/>`;
        // Water surface wave
        svg += `<path d="M${tx + 5},${waterTop} Q${tx + tw*0.25},${waterTop - 4} ${tx + tw*0.5},${waterTop} Q${tx + tw*0.75},${waterTop + 4} ${tx + tw - 5},${waterTop}" fill="none" stroke="#3b82f6" stroke-width="1.5"/>`;

        // Inflow pipe (top left)
        svg += `<rect x="20" y="${ty + 10}" width="70" height="12" fill="${COLORS.axes}" rx="2"/>`;
        // Inflow arrow
        svg += `<polygon points="75,${ty + 4} 90,${ty + 16} 75,${ty + 28}" fill="#3b82f6"/>`;
        // Inflow label
        svg += `<text x="55" y="${ty + 0}" font-size="11" fill="#3b82f6" text-anchor="middle" font-weight="600">${inConc} @ ${inRate}</text>`;
        svg += `<text x="55" y="${ty - 12}" font-size="10" fill="${COLORS.text}" text-anchor="middle">IN</text>`;

        // Outflow pipe (bottom right)
        svg += `<rect x="${tx + tw}" y="${ty + th - 30}" width="70" height="12" fill="${COLORS.axes}" rx="2"/>`;
        // Outflow arrow
        svg += `<polygon points="${tx + tw + 55},${ty + th - 36} ${tx + tw + 70},${ty + th - 24} ${tx + tw + 55},${ty + th - 12}" fill="#ef4444"/>`;
        // Outflow label
        svg += `<text x="${tx + tw + 35}" y="${ty + th - 36}" font-size="11" fill="#ef4444" text-anchor="middle" font-weight="600">${outRate}</text>`;
        svg += `<text x="${tx + tw + 35}" y="${ty + th - 48}" font-size="10" fill="${COLORS.text}" text-anchor="middle">OUT</text>`;

        // Stirrer
        svg += `<line x1="${tx + tw/2}" y1="${ty - 10}" x2="${tx + tw/2}" y2="${ty + 50}" stroke="${COLORS.axes}" stroke-width="2"/>`;
        svg += `<ellipse cx="${tx + tw/2}" cy="${ty + 50}" rx="20" ry="5" fill="none" stroke="${COLORS.axes}" stroke-width="2"/>`;
        svg += `<text x="${tx + tw/2 + 25}" y="${ty + 54}" font-size="9" fill="${COLORS.text}">well-mixed</text>`;

        // Volume label in center
        svg += `<text x="${tx + tw/2}" y="${ty + th/2 + 15}" font-size="14" fill="${COLORS.annotation}" text-anchor="middle" font-weight="700">V = ${vol}</text>`;
        if (variableVol) {
            svg += `<text x="${tx + tw/2}" y="${ty + th/2 + 32}" font-size="11" fill="${COLORS.text}" text-anchor="middle" font-style="italic">(volume changes)</text>`;
        }
        svg += svgLabel(tx + tw/2, ty + th/2 + (variableVol ? 48 : 35), 'A(t) = salt amount', 12, COLORS.text, {anchor: 'middle'});

        // Title
        svg += svgTitle(W/2, H - 8, title, 12);

        svg += '</svg>';
        return svg;
    }

    /**
     * Generate a cooling/heating object diagram (cup, thermometer, etc.)
     * @param {Object} options - { type: 'cup'|'thermometer', tempInit, tempEnv, title }
     */
    function coolingDiagram(options = {}) {
        const W = 340, H = 260;
        const type = options.type || 'cup';
        const tempInit = options.tempInit || '90°C';
        const tempEnv = options.tempEnv || '22°C';
        const title = options.title || "Newton's Law of Cooling";

        let svg = createSVG(W, H);

        if (type === 'cup') {
            // Coffee cup
            const cupX = 100, cupY = 80, cupW = 100, cupH = 120;
            // Cup body (trapezoid)
            svg += `<path d="M${cupX},${cupY} L${cupX - 10},${cupY + cupH} L${cupX + cupW + 10},${cupY + cupH} L${cupX + cupW},${cupY} Z" fill="rgba(139, 92, 246, 0.1)" stroke="${COLORS.axes}" stroke-width="2.5"/>`;
            // Coffee fill
            svg += `<path d="M${cupX + 3},${cupY + 15} L${cupX - 7},${cupY + cupH - 3} L${cupX + cupW + 7},${cupY + cupH - 3} L${cupX + cupW - 3},${cupY + 15} Z" fill="rgba(139, 69, 19, 0.3)"/>`;
            // Steam
            for (let i = 0; i < 3; i++) {
                const sx = cupX + 25 + i * 25;
                svg += `<path d="M${sx},${cupY - 5} Q${sx + 5},${cupY - 20} ${sx - 3},${cupY - 35} Q${sx + 8},${cupY - 50} ${sx},${cupY - 60}" fill="none" stroke="${COLORS.text}" stroke-width="1.5" opacity="0.4" stroke-linecap="round"/>`;
            }
            // Handle
            svg += `<path d="M${cupX + cupW},${cupY + 30} Q${cupX + cupW + 35},${cupY + 50} ${cupX + cupW},${cupY + 90}" fill="none" stroke="${COLORS.axes}" stroke-width="2.5"/>`;
            // Temperature label on cup
            svg += `<text x="${cupX + cupW/2}" y="${cupY + cupH/2 + 10}" font-size="16" fill="${COLORS.annotation}" text-anchor="middle" font-weight="700">T₀ = ${tempInit}</text>`;
        } else {
            // Thermometer
            const thX = 150, thY = 50, thH = 160;
            svg += `<rect x="${thX - 6}" y="${thY}" width="12" height="${thH}" rx="6" fill="rgba(200,200,200,0.3)" stroke="${COLORS.axes}" stroke-width="1.5"/>`;
            svg += `<circle cx="${thX}" cy="${thY + thH + 10}" r="14" fill="#ef4444" stroke="${COLORS.axes}" stroke-width="1.5"/>`;
            // Mercury level
            const mercuryH = thH * 0.7;
            svg += `<rect x="${thX - 3}" y="${thY + thH - mercuryH}" width="6" height="${mercuryH}" fill="#ef4444" rx="3"/>`;
            svg += `<text x="${thX + 20}" y="${thY + 20}" font-size="13" fill="${COLORS.annotation}" font-weight="600">T₀ = ${tempInit}</text>`;
        }

        // Environment temperature (right side)
        svg += `<rect x="${W - 110}" y="80" width="95" height="50" rx="8" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,2"/>`;
        svg += `<text x="${W - 62}" y="100" font-size="10" fill="#10b981" text-anchor="middle">Environment</text>`;
        svg += svgLabel(W - 62, 120, `T_env = ${tempEnv}`, 14, '#10b981', {anchor: 'middle', weight: '700'});

        // Arrow showing heat flow
        svg += `<path d="M200,130 Q230,130 250,110" fill="none" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrowHeat)"/>`;
        svg += `<text x="230" y="148" font-size="10" fill="#f59e0b" text-anchor="middle">heat loss</text>`;

        // DE formula
        svg += `<text x="${W/2}" y="${H - 40}" font-size="12" fill="${COLORS.text}" text-anchor="middle" font-style="italic">dT/dt = k(T − T_env)</text>`;

        // Arrow marker for heat
        svg += `<defs><marker id="arrowHeat" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#f59e0b"/></marker></defs>`;

        // Title
        svg += svgTitle(W/2, H - 8, title, 12);

        svg += '</svg>';
        return svg;
    }

    /**
     * Generate a raindrop/sphere evaporation diagram
     * @param {Object} options - { radius, title }
     */
    function sphereDiagram(options = {}) {
        const W = 320, H = 280;
        const radius = options.radius || 3;
        const title = options.title || 'Spherical Raindrop';

        let svg = createSVG(W, H);
        const cx = W / 2, cy = 130;
        const r = 70;

        // Sphere (circle with gradient)
        svg += `<defs><radialGradient id="sphereGrad" cx="35%" cy="35%"><stop offset="0%" stop-color="rgba(59, 130, 246, 0.3)"/><stop offset="100%" stop-color="rgba(59, 130, 246, 0.05)"/></radialGradient></defs>`;
        svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#sphereGrad)" stroke="#3b82f6" stroke-width="2.5"/>`;

        // Highlight/reflection
        svg += `<ellipse cx="${cx - 20}" cy="${cy - 25}" rx="15" ry="10" fill="rgba(255,255,255,0.3)"/>`;

        // Radius line
        svg += `<line x1="${cx}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="${COLORS.annotation}" stroke-width="2" stroke-dasharray="4,2"/>`;
        svg += `<circle cx="${cx}" cy="${cy}" r="3" fill="${COLORS.annotation}"/>`;
        svg += `<text x="${cx + r/2}" y="${cy - 8}" font-size="14" fill="${COLORS.annotation}" text-anchor="middle" font-weight="700">r(t)</text>`;

        // Evaporation arrows (outward)
        const arrowAngles = [0, 45, 90, 135, 180, 225, 270, 315];
        arrowAngles.forEach(deg => {
            const rad = deg * Math.PI / 180;
            const x1 = cx + (r + 5) * Math.cos(rad);
            const y1 = cy + (r + 5) * Math.sin(rad);
            const x2 = cx + (r + 20) * Math.cos(rad);
            const y2 = cy + (r + 20) * Math.sin(rad);
            svg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#f59e0b" stroke-width="1.5" opacity="0.6" stroke-linecap="round"/>`;
        });
        svg += `<text x="${cx + r + 30}" y="${cy - r + 10}" font-size="10" fill="#f59e0b">evaporation</text>`;

        // Formulas
        svg += svgLabel(W/2, H - 60, 'V = (4/3)πr³     S = 4πr²', 11, COLORS.text, {anchor: 'middle'});
        svg += svgLabel(W/2, H - 40, 'dV/dt = −k · S  →  dr/dt = −k', 11, COLORS.text, {anchor: 'middle', italic: true});
        svg += svgLabel(W/2, H - 20, `r₀ = ${radius} mm`, 12, COLORS.annotation, {anchor: 'middle', weight: '600'});

        // Title
        svg += svgTitle(W/2, H - 2, title, 12);

        svg += '</svg>';
        return svg;
    }

    /**
     * Generate a snowplow diagram
     * @param {Object} options - { title }
     */
    function snowplowDiagram(options = {}) {
        const W = 360, H = 220;
        const title = options.title || 'Snowplow Problem';

        let svg = createSVG(W, H);

        // Road
        svg += `<rect x="20" y="100" width="320" height="50" rx="4" fill="rgba(100,100,100,0.15)" stroke="${COLORS.axes}" stroke-width="1.5"/>`;
        // Road center line
        svg += `<line x1="30" y1="125" x2="330" y2="125" stroke="#f59e0b" stroke-width="2" stroke-dasharray="12,8"/>`;

        // Snow layer (gets deeper to the right)
        svg += `<path d="M20,100 L20,85 Q100,80 180,70 Q260,55 340,40 L340,100 Z" fill="rgba(200, 220, 255, 0.4)" stroke="#94a3b8" stroke-width="1.5"/>`;

        // Snow depth labels
        svg += `<line x1="80" y1="78" x2="80" y2="100" stroke="${COLORS.annotation}" stroke-width="1" stroke-dasharray="3,2"/>`;
        svg += `<text x="80" y="72" font-size="10" fill="${COLORS.annotation}" text-anchor="middle">depth = rt₀</text>`;
        svg += `<line x1="280" y1="48" x2="280" y2="100" stroke="${COLORS.annotation}" stroke-width="1" stroke-dasharray="3,2"/>`;
        svg += `<text x="280" y="42" font-size="10" fill="${COLORS.annotation}" text-anchor="middle">depth = r(t₀+2)</text>`;

        // Plow
        svg += `<rect x="120" y="82" width="30" height="22" rx="3" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" stroke-width="2"/>`;
        svg += `<polygon points="118,82 118,104 108,100 108,86" fill="#ef4444" opacity="0.7"/>`;
        svg += `<text x="135" y="78" font-size="10" fill="#ef4444" text-anchor="middle" font-weight="600">plow</text>`;

        // Speed annotation
        svg += `<text x="135" y="118" font-size="10" fill="${COLORS.text}" text-anchor="middle">speed = k/(snow depth)</text>`;

        // Distance markers
        svg += `<text x="60" y="165" font-size="11" fill="${COLORS.text}" text-anchor="middle">4 mi (1st hr)</text>`;
        svg += `<line x1="30" y1="155" x2="90" y2="155" stroke="${COLORS.text}" stroke-width="1.5"/>`;
        svg += `<text x="180" y="165" font-size="11" fill="${COLORS.text}" text-anchor="middle">3 mi (2nd hr)</text>`;
        svg += `<line x1="130" y1="155" x2="230" y2="155" stroke="${COLORS.text}" stroke-width="1.5"/>`;

        // Timeline
        svg += svgLabel(W/2, 190, 'Snow starts at t = 0, plow starts at t = t₀ (noon)', 11, COLORS.text, {anchor: 'middle', italic: true});

        // Title
        svg += svgTitle(W/2, H - 4, title, 12);

        svg += '</svg>';
        return svg;
    }

    /**
     * Generate a falling object with forces diagram
     * @param {Object} options - { title, mass, terminalV }
     */
    function fallingObject(options = {}) {
        const W = 280, H = 280;
        const title = options.title || 'Falling Object with Air Resistance';

        let svg = createSVG(W, H);
        const cx = W / 2, cy = 130;

        // Object (circle)
        svg += `<circle cx="${cx}" cy="${cy}" r="25" fill="rgba(99, 102, 241, 0.15)" stroke="${COLORS.annotation}" stroke-width="2.5"/>`;
        svg += `<text x="${cx}" y="${cy + 5}" font-size="13" fill="${COLORS.annotation}" text-anchor="middle" font-weight="700">m</text>`;

        // Gravity arrow (down)
        svg += `<line x1="${cx}" y1="${cy + 30}" x2="${cx}" y2="${cy + 80}" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowGrav)"/>`;
        svg += `<text x="${cx + 15}" y="${cy + 65}" font-size="13" fill="#ef4444" font-weight="600">mg</text>`;

        // Air resistance arrow (up)
        svg += `<line x1="${cx}" y1="${cy - 30}" x2="${cx}" y2="${cy - 75}" stroke="#10b981" stroke-width="3" marker-end="url(#arrowAir)"/>`;
        svg += `<text x="${cx + 15}" y="${cy - 55}" font-size="13" fill="#10b981" font-weight="600">bv</text>`;

        // Velocity arrow (down, to the side)
        svg += `<line x1="${cx + 50}" y1="${cy - 10}" x2="${cx + 50}" y2="${cy + 40}" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrowVel)"/>`;
        svg += `<text x="${cx + 65}" y="${cy + 20}" font-size="12" fill="#f59e0b" font-weight="600">v(t)</text>`;

        // DE
        svg += svgLabel(W/2, H - 50, 'm(dv/dt) = mg − bv', 12, COLORS.text, {anchor: 'middle'});
        svg += svgLabel(W/2, H - 30, 'Terminal velocity: v_term = mg/b', 11, COLORS.text, {anchor: 'middle', italic: true});

        // Arrow markers
        svg += `<defs>`;
        svg += `<marker id="arrowGrav" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="#ef4444"/></marker>`;
        svg += `<marker id="arrowAir" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="#10b981"/></marker>`;
        svg += `<marker id="arrowVel" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="#f59e0b"/></marker>`;
        svg += `</defs>`;

        // Title
        svg += svgTitle(W/2, H - 8, title, 12);

        svg += '</svg>';
        return svg;
    }

    /**
     * Generate a cylindrical water tank diagram
     * @param {Object} options - { volume, title }
     */
    function waterTank(options = {}) {
        const W = 340, H = 280;
        const volume = options.volume || '1000 gal';
        const title = options.title || 'Water Tank';

        let svg = createSVG(W, H);
        const cx = W / 2;

        // Tank body (rounded rectangle)
        svg += `<rect x="${cx - 70}" y="50" width="140" height="160" rx="8" ry="8" 
            fill="rgba(59, 130, 246, 0.08)" stroke="${COLORS.axes}" stroke-width="2.5"/>`;

        // Water fill (gradient)
        svg += `<defs><linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:rgba(59,130,246,0.3)"/>
            <stop offset="100%" style="stop-color:rgba(59,130,246,0.6)"/>
        </linearGradient></defs>`;
        svg += `<rect x="${cx - 68}" y="70" width="136" height="138" rx="6" ry="6" fill="url(#waterGrad)"/>`;

        // Water surface wave
        svg += `<path d="M${cx - 68} 70 Q${cx - 40} 64, ${cx} 70 Q${cx + 40} 76, ${cx + 68} 70" 
            fill="none" stroke="rgba(59,130,246,0.8)" stroke-width="2"/>`;

        // Volume label inside tank
        svg += `<text x="${cx}" y="145" font-size="16" fill="#2563eb" text-anchor="middle" font-weight="700">${volume}</text>`;
        svg += `<text x="${cx}" y="165" font-size="11" fill="${COLORS.text}" text-anchor="middle">V(t)</text>`;

        // Drain pipe at bottom
        svg += `<rect x="${cx - 8}" y="210" width="16" height="30" fill="${COLORS.axes}" rx="3"/>`;
        // Drain flow
        svg += `<path d="M${cx} 240 Q${cx - 5} 250, ${cx} 255 Q${cx + 5} 260, ${cx} 265" 
            fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round"/>`;
        svg += `<circle cx="${cx}" cy="268" r="2" fill="#3b82f6"/>`;
        svg += `<circle cx="${cx - 3}" cy="272" r="1.5" fill="#3b82f6" opacity="0.7"/>`;
        svg += `<circle cx="${cx + 2}" cy="275" r="1" fill="#3b82f6" opacity="0.5"/>`;

        // Drain rate label
        svg += svgLabel(cx + 30, 235, 'dV/dt = −k√V', 11, '#ef4444', {weight: '600'});

        // Arrow showing drain direction
        svg += `<line x1="${cx + 25}" y1="225" x2="${cx + 12}" y2="225" stroke="#ef4444" stroke-width="1.5" marker-end="url(#drainArrow)"/>`;
        svg += `<defs><marker id="drainArrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="#ef4444"/></marker></defs>`;

        // Height dimension line
        svg += `<line x1="${cx + 80}" y1="50" x2="${cx + 80}" y2="210" stroke="${COLORS.text}" stroke-width="1" stroke-dasharray="3,2"/>`;
        svg += `<line x1="${cx + 75}" y1="50" x2="${cx + 85}" y2="50" stroke="${COLORS.text}" stroke-width="1"/>`;
        svg += `<line x1="${cx + 75}" y1="210" x2="${cx + 85}" y2="210" stroke="${COLORS.text}" stroke-width="1"/>`;

        // Title
        svg += svgTitle(cx, 28, title, 13);

        svg += '</svg>';
        return svg;
    }

    /**
     * Generate a parametric curve SVG
     * @param {Function} xFunc - function(t) returning x
     * @param {Function} yFunc - function(t) returning y
     * @param {Array} tRange - [tMin, tMax]
     * @param {Object} options - { title, tangentAt, points, showArrow, speedAt }
     */
    function parametricCurve(xFunc, yFunc, tRange, options = {}) {
        const W = 360, H = 300;
        const margin = 40;

        // Compute points and find bounds
        const numPts = 200;
        const dt = (tRange[1] - tRange[0]) / numPts;
        let rawPts = [];
        let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;
        for (let i = 0; i <= numPts; i++) {
            const t = tRange[0] + i * dt;
            const x = xFunc(t), y = yFunc(t);
            if (isFinite(x) && isFinite(y)) {
                rawPts.push({ t, x, y });
                xMin = Math.min(xMin, x); xMax = Math.max(xMax, x);
                yMin = Math.min(yMin, y); yMax = Math.max(yMax, y);
            }
        }
        const xPad = (xMax - xMin) * 0.15 || 1;
        const yPad = (yMax - yMin) * 0.15 || 1;
        const xRange = [xMin - xPad, xMax + xPad];
        const yRange = [yMin - yPad, yMax + yPad];

        const cx = margin + (0 - xRange[0]) / (xRange[1] - xRange[0]) * (W - 2 * margin);
        const cy = margin + (yRange[1] - 0) / (yRange[1] - yRange[0]) * (H - 2 * margin);
        const scaleX = (W - 2 * margin) / (xRange[1] - xRange[0]);
        const scaleY = (H - 2 * margin) / (yRange[1] - yRange[0]);

        let svg = createSVG(W, H);
        svg += drawAxes(cx, cy, W, H, 'x', 'y', xRange, yRange);

        // Draw parametric curve
        let points = rawPts.map(pt => {
            const p = toSVG(pt.x, pt.y, cx, cy, scaleX, scaleY);
            return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
        });
        if (points.length > 1) {
            svg += `<polyline points="${points.join(' ')}" fill="none" stroke="${COLORS.curve}" stroke-width="2.5"/>`;
        }

        // Direction arrow at midpoint
        if (options.showArrow !== false && rawPts.length > 10) {
            const midIdx = Math.floor(rawPts.length * 0.6);
            const p1 = toSVG(rawPts[midIdx - 1].x, rawPts[midIdx - 1].y, cx, cy, scaleX, scaleY);
            const p2 = toSVG(rawPts[midIdx + 1].x, rawPts[midIdx + 1].y, cx, cy, scaleX, scaleY);
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
            const pm = toSVG(rawPts[midIdx].x, rawPts[midIdx].y, cx, cy, scaleX, scaleY);
            const arrowSize = 8;
            const ax1 = pm.x - arrowSize * Math.cos(angle - 0.4);
            const ay1 = pm.y - arrowSize * Math.sin(angle - 0.4);
            const ax2 = pm.x - arrowSize * Math.cos(angle + 0.4);
            const ay2 = pm.y - arrowSize * Math.sin(angle + 0.4);
            svg += `<polygon points="${pm.x},${pm.y} ${ax1},${ay1} ${ax2},${ay2}" fill="${COLORS.curve}"/>`;
        }

        // Tangent line at specific t
        if (options.tangentAt !== undefined) {
            const t0 = options.tangentAt;
            const x0 = xFunc(t0), y0 = yFunc(t0);
            const eps = 0.001;
            const dxdt = (xFunc(t0 + eps) - xFunc(t0 - eps)) / (2 * eps);
            const dydt = (yFunc(t0 + eps) - yFunc(t0 - eps)) / (2 * eps);
            const p0 = toSVG(x0, y0, cx, cy, scaleX, scaleY);
            svg += `<circle cx="${p0.x}" cy="${p0.y}" r="5" fill="${COLORS.eulerPoint}" stroke="white" stroke-width="1.5"/>`;
            // Draw tangent segment
            const tangentLen = 1.5;
            if (Math.abs(dxdt) > 0.001 || Math.abs(dydt) > 0.001) {
                const norm = Math.sqrt(dxdt * dxdt + dydt * dydt);
                const tx1 = x0 - tangentLen * dxdt / norm;
                const ty1 = y0 - tangentLen * dydt / norm;
                const tx2 = x0 + tangentLen * dxdt / norm;
                const ty2 = y0 + tangentLen * dydt / norm;
                const pt1 = toSVG(tx1, ty1, cx, cy, scaleX, scaleY);
                const pt2 = toSVG(tx2, ty2, cx, cy, scaleX, scaleY);
                svg += `<line x1="${pt1.x}" y1="${pt1.y}" x2="${pt2.x}" y2="${pt2.y}" stroke="${COLORS.equilibrium}" stroke-width="2" stroke-dasharray="5,3"/>`;
            }
            svg += `<text x="${p0.x + 8}" y="${p0.y - 8}" font-size="9" fill="${COLORS.eulerPoint}">t=${t0}</text>`;
        }

        // Mark specific points
        if (options.points) {
            options.points.forEach(pt => {
                const x = xFunc(pt.t), y = yFunc(pt.t);
                const p = toSVG(x, y, cx, cy, scaleX, scaleY);
                svg += `<circle cx="${p.x}" cy="${p.y}" r="4" fill="${pt.color || COLORS.eulerPoint}" stroke="white" stroke-width="1.5"/>`;
                if (pt.label) {
                    svg += `<text x="${p.x + 6}" y="${p.y - 6}" font-size="9" fill="${pt.color || COLORS.eulerPoint}">${pt.label}</text>`;
                }
            });
        }

        // Speed vector visualization
        if (options.speedAt !== undefined) {
            const t0 = options.speedAt;
            const x0 = xFunc(t0), y0 = yFunc(t0);
            const eps = 0.001;
            const dxdt = (xFunc(t0 + eps) - xFunc(t0 - eps)) / (2 * eps);
            const dydt = (yFunc(t0 + eps) - yFunc(t0 - eps)) / (2 * eps);
            const p0 = toSVG(x0, y0, cx, cy, scaleX, scaleY);
            // Draw velocity vector
            const vScale = 0.3;
            const pv = toSVG(x0 + dxdt * vScale, y0 + dydt * vScale, cx, cy, scaleX, scaleY);
            svg += `<line x1="${p0.x}" y1="${p0.y}" x2="${pv.x}" y2="${pv.y}" stroke="#e63946" stroke-width="2.5" marker-end="url(#velArrow)"/>`;
            svg += `<defs><marker id="velArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="#e63946"/></marker></defs>`;
            const speed = Math.sqrt(dxdt * dxdt + dydt * dydt);
            svg += `<text x="${(p0.x + pv.x) / 2 + 8}" y="${(p0.y + pv.y) / 2}" font-size="9" fill="#e63946">speed=${speed.toFixed(2)}</text>`;
        }

        // Title
        if (options.title) {
            svg += svgTitle(W/2, 14, options.title, 11);
        }

        svg += '</svg>';
        return svg;
    }

    /**
     * Generate a polar curve SVG
     * @param {Function} rFunc - function(theta) returning r
     * @param {Array} thetaRange - [thetaMin, thetaMax]
     * @param {Object} options - { title, fillRange, secondCurve, showArea }
     */
    function polarCurve(rFunc, thetaRange, options = {}) {
        const W = 340, H = 340;
        const cx = W / 2, cy = H / 2;

        // Compute bounds
        let rMax = 0;
        const numPts = 300;
        const dTheta = (thetaRange[1] - thetaRange[0]) / numPts;
        for (let i = 0; i <= numPts; i++) {
            const theta = thetaRange[0] + i * dTheta;
            const r = rFunc(theta);
            if (isFinite(r) && r > 0) rMax = Math.max(rMax, r);
        }
        if (options.secondCurve) {
            for (let i = 0; i <= numPts; i++) {
                const theta = thetaRange[0] + i * dTheta;
                const r = options.secondCurve(theta);
                if (isFinite(r) && r > 0) rMax = Math.max(rMax, r);
            }
        }
        rMax *= 1.15;
        const scale = (Math.min(W, H) / 2 - 40) / rMax;

        let svg = createSVG(W, H);

        // Polar grid (concentric circles and radial lines)
        const numCircles = 4;
        for (let i = 1; i <= numCircles; i++) {
            const r = (i / numCircles) * rMax * scale;
            svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${COLORS.grid}" stroke-width="0.7"/>`;
            svg += `<text x="${cx + r + 2}" y="${cy - 3}" font-size="8" fill="${COLORS.text}">${(i * rMax / numCircles).toFixed(1)}</text>`;
        }
        // Radial lines every 45 degrees
        for (let a = 0; a < 360; a += 45) {
            const rad = a * Math.PI / 180;
            const maxR = rMax * scale;
            svg += `<line x1="${cx}" y1="${cy}" x2="${cx + maxR * Math.cos(rad)}" y2="${cy - maxR * Math.sin(rad)}" stroke="${COLORS.grid}" stroke-width="0.5"/>`;
        }
        // Axes
        svg += `<line x1="${cx - rMax * scale}" y1="${cy}" x2="${cx + rMax * scale}" y2="${cy}" stroke="${COLORS.axes}" stroke-width="1.2"/>`;
        svg += `<line x1="${cx}" y1="${cy + rMax * scale}" x2="${cx}" y2="${cy - rMax * scale}" stroke="${COLORS.axes}" stroke-width="1.2"/>`;

        // Shaded area region
        if (options.fillRange) {
            const [fStart, fEnd] = options.fillRange;
            let areaPath = `M${cx},${cy} `;
            const areaSteps = 100;
            const aDt = (fEnd - fStart) / areaSteps;
            for (let i = 0; i <= areaSteps; i++) {
                const theta = fStart + i * aDt;
                let r = rFunc(theta);
                if (options.secondCurve && options.showArea === 'between') {
                    r = rFunc(theta); // outer
                }
                if (r < 0) r = 0;
                const px = cx + r * scale * Math.cos(theta);
                const py = cy - r * scale * Math.sin(theta);
                areaPath += `L${px.toFixed(1)},${py.toFixed(1)} `;
            }
            areaPath += 'Z';
            svg += `<path d="${areaPath}" fill="rgba(44, 95, 45, 0.15)" stroke="none"/>`;

            // If showing area between two curves
            if (options.secondCurve && options.showArea === 'between') {
                let innerPath = `M${cx},${cy} `;
                for (let i = 0; i <= areaSteps; i++) {
                    const theta = fStart + i * aDt;
                    let r = options.secondCurve(theta);
                    if (r < 0) r = 0;
                    const px = cx + r * scale * Math.cos(theta);
                    const py = cy - r * scale * Math.sin(theta);
                    innerPath += `L${px.toFixed(1)},${py.toFixed(1)} `;
                }
                innerPath += 'Z';
                svg += `<path d="${innerPath}" fill="var(--bg-card, white)" stroke="none"/>`;
            }
        }

        // Draw main curve
        let points = [];
        for (let i = 0; i <= numPts; i++) {
            const theta = thetaRange[0] + i * dTheta;
            const r = rFunc(theta);
            if (!isFinite(r) || r < 0) continue;
            const px = cx + r * scale * Math.cos(theta);
            const py = cy - r * scale * Math.sin(theta);
            points.push(`${px.toFixed(1)},${py.toFixed(1)}`);
        }
        if (points.length > 1) {
            svg += `<polyline points="${points.join(' ')}" fill="none" stroke="${COLORS.curve}" stroke-width="2.5"/>`;
        }

        // Draw second curve if provided
        if (options.secondCurve) {
            let pts2 = [];
            for (let i = 0; i <= numPts; i++) {
                const theta = thetaRange[0] + i * dTheta;
                const r = options.secondCurve(theta);
                if (!isFinite(r) || r < 0) continue;
                const px = cx + r * scale * Math.cos(theta);
                const py = cy - r * scale * Math.sin(theta);
                pts2.push(`${px.toFixed(1)},${py.toFixed(1)}`);
            }
            if (pts2.length > 1) {
                svg += `<polyline points="${pts2.join(' ')}" fill="none" stroke="${COLORS.curveAlt}" stroke-width="2" stroke-dasharray="5,3"/>`;
            }
        }

        // Title
        if (options.title) {
            svg += svgTitle(W/2, 16, options.title, 11);
        }

        svg += '</svg>';
        return svg;
    }

    /**
     * Generate a volume of revolution diagram
     * @param {Function} fFunc - function(x) for the curve being rotated
     * @param {Array} xRange - [a, b] bounds of integration
     * @param {Object} options - { title, axis, axisOffset, gFunc, method }
     *   axis: 'x' or 'y' (axis of rotation)
     *   axisOffset: number (e.g., -1 for y=-1, 5 for x=5)
     *   gFunc: inner function for washer method
     *   method: 'disk', 'washer', 'shell', 'cross-section'
     */
    function volumeRevolution(fFunc, xRange, options = {}) {
        const W = 380, H = 300;
        const margin = 40;
        const method = options.method || 'disk';
        const axis = options.axis || 'x';
        const axisOffset = options.axisOffset || 0;
        const title = options.title || 'Volume of Revolution';

        // Compute y bounds
        let yMin = Infinity, yMax = -Infinity;
        for (let x = xRange[0]; x <= xRange[1]; x += (xRange[1] - xRange[0]) / 100) {
            const y = fFunc(x);
            if (isFinite(y)) { yMin = Math.min(yMin, y); yMax = Math.max(yMax, y); }
            if (options.gFunc) {
                const y2 = options.gFunc(x);
                if (isFinite(y2)) { yMin = Math.min(yMin, y2); yMax = Math.max(yMax, y2); }
            }
        }
        yMin = Math.min(yMin, axisOffset, 0);
        yMax = Math.max(yMax, axisOffset, 0);
        const yPad = (yMax - yMin) * 0.15 || 0.5;
        const xPad = (xRange[1] - xRange[0]) * 0.1;
        const fullXRange = [xRange[0] - xPad, xRange[1] + xPad];
        const fullYRange = [yMin - yPad, yMax + yPad];

        const plotW = W - 2 * margin;
        const plotH = H - 2 * margin;
        const ox = margin + (0 - fullXRange[0]) / (fullXRange[1] - fullXRange[0]) * plotW;
        const oy = margin + (fullYRange[1] - 0) / (fullYRange[1] - fullYRange[0]) * plotH;
        const sx = plotW / (fullXRange[1] - fullXRange[0]);
        const sy = plotH / (fullYRange[1] - fullYRange[0]);

        let svg = createSVG(W, H);
        svg += drawAxes(ox, oy, W, H, 'x', 'y', fullXRange, fullYRange);

        // Draw axis of rotation if offset
        if (axisOffset !== 0) {
            let axLine;
            if (axis === 'x') {
                const ay = oy - axisOffset * sy;
                axLine = `<line x1="${margin}" y1="${ay}" x2="${W-margin}" y2="${ay}" stroke="#e63946" stroke-width="1.5" stroke-dasharray="6,4"/>`;
                svg += axLine;
                svg += `<text x="${W-margin+3}" y="${ay-4}" font-size="9" fill="#e63946">y=${axisOffset}</text>`;
            } else {
                const ax = ox + axisOffset * sx;
                axLine = `<line x1="${ax}" y1="${margin}" x2="${ax}" y2="${H-margin}" stroke="#e63946" stroke-width="1.5" stroke-dasharray="6,4"/>`;
                svg += axLine;
                svg += `<text x="${ax+3}" y="${margin-4}" font-size="9" fill="#e63946">x=${axisOffset}</text>`;
            }
        }

        // Draw representative disk/washer cross-section
        const midX = (xRange[0] + xRange[1]) / 2;
        const fMid = fFunc(midX);
        if (method === 'disk' || method === 'washer') {
            const diskX = ox + midX * sx;
            const outerR = Math.abs(fMid - axisOffset) * sy;
            const innerR = options.gFunc ? Math.abs(options.gFunc(midX) - axisOffset) * sy : 0;
            // Draw ellipse to suggest 3D rotation
            svg += `<ellipse cx="${diskX}" cy="${oy - axisOffset * sy}" rx="8" ry="${outerR}" fill="rgba(44, 95, 45, 0.12)" stroke="${COLORS.curve}" stroke-width="1" stroke-dasharray="3,2"/>`;
            if (innerR > 2) {
                svg += `<ellipse cx="${diskX}" cy="${oy - axisOffset * sy}" rx="5" ry="${innerR}" fill="var(--bg-card, white)" stroke="${COLORS.curveAlt}" stroke-width="1" stroke-dasharray="3,2"/>`;
            }
            // Radius annotation
            const rTop = oy - fMid * sy;
            const rAxis = oy - axisOffset * sy;
            svg += `<line x1="${diskX + 12}" y1="${rTop}" x2="${diskX + 12}" y2="${rAxis}" stroke="${COLORS.annotation}" stroke-width="1.2"/>`;
            svg += `<text x="${diskX + 16}" y="${(rTop + rAxis) / 2 + 4}" font-size="8" fill="${COLORS.annotation}">R</text>`;
        }

        // Shaded region
        let regionPath = '';
        const steps = 80;
        const dx = (xRange[1] - xRange[0]) / steps;
        // Top boundary (f)
        for (let i = 0; i <= steps; i++) {
            const x = xRange[0] + i * dx;
            const y = fFunc(x);
            const px = ox + x * sx;
            const py = oy - y * sy;
            regionPath += (i === 0 ? 'M' : 'L') + `${px.toFixed(1)},${py.toFixed(1)} `;
        }
        // Bottom boundary (g or axis)
        if (options.gFunc) {
            for (let i = steps; i >= 0; i--) {
                const x = xRange[0] + i * dx;
                const y = options.gFunc(x);
                const px = ox + x * sx;
                const py = oy - y * sy;
                regionPath += `L${px.toFixed(1)},${py.toFixed(1)} `;
            }
        } else {
            const baseY = oy - axisOffset * sy;
            regionPath += `L${(ox + xRange[1] * sx).toFixed(1)},${baseY.toFixed(1)} `;
            regionPath += `L${(ox + xRange[0] * sx).toFixed(1)},${baseY.toFixed(1)} `;
        }
        regionPath += 'Z';
        svg += `<path d="${regionPath}" fill="rgba(44, 95, 45, 0.12)" stroke="none"/>`;

        // Draw main curve f(x)
        let fPoints = [];
        for (let x = fullXRange[0]; x <= fullXRange[1]; x += (fullXRange[1] - fullXRange[0]) / 200) {
            const y = fFunc(x);
            if (!isFinite(y)) continue;
            const px = ox + x * sx;
            const py = oy - y * sy;
            if (py >= margin - 5 && py <= H - margin + 5) fPoints.push(`${px.toFixed(1)},${py.toFixed(1)}`);
        }
        if (fPoints.length > 1) {
            svg += `<polyline points="${fPoints.join(' ')}" fill="none" stroke="${COLORS.curve}" stroke-width="2.5"/>`;
        }

        // Draw g(x) if washer
        if (options.gFunc) {
            let gPoints = [];
            for (let x = fullXRange[0]; x <= fullXRange[1]; x += (fullXRange[1] - fullXRange[0]) / 200) {
                const y = options.gFunc(x);
                if (!isFinite(y)) continue;
                const px = ox + x * sx;
                const py = oy - y * sy;
                if (py >= margin - 5 && py <= H - margin + 5) gPoints.push(`${px.toFixed(1)},${py.toFixed(1)}`);
            }
            if (gPoints.length > 1) {
                svg += `<polyline points="${gPoints.join(' ')}" fill="none" stroke="${COLORS.curveAlt}" stroke-width="2" stroke-dasharray="5,3"/>`;
            }
        }

        // Bounds markers
        const aX = ox + xRange[0] * sx;
        const bX = ox + xRange[1] * sx;
        svg += `<line x1="${aX}" y1="${margin}" x2="${aX}" y2="${H-margin}" stroke="${COLORS.text}" stroke-width="0.8" stroke-dasharray="3,3" opacity="0.5"/>`;
        svg += `<line x1="${bX}" y1="${margin}" x2="${bX}" y2="${H-margin}" stroke="${COLORS.text}" stroke-width="0.8" stroke-dasharray="3,3" opacity="0.5"/>`;
        const fmtBound = v => Math.abs(v - Math.PI) < 0.01 ? 'π' : Math.abs(v + Math.PI) < 0.01 ? '-π' : Math.abs(v - 2*Math.PI) < 0.01 ? '2π' : Number.isInteger(v) ? v.toString() : v.toFixed(2);
        svg += `<text x="${aX}" y="${H-margin+14}" font-size="9" fill="${COLORS.text}" text-anchor="middle">a=${fmtBound(xRange[0])}</text>`;
        svg += `<text x="${bX}" y="${H-margin+14}" font-size="9" fill="${COLORS.text}" text-anchor="middle">b=${fmtBound(xRange[1])}</text>`;

        // Rotation arrow to suggest 3D
        const arrowCx = ox + midX * sx;
        const arrowCy = oy - axisOffset * sy;
        const arrowR = Math.abs(fMid - axisOffset) * sy + 12;
        svg += `<path d="M${arrowCx + arrowR},${arrowCy - 4} A${arrowR},${arrowR * 0.3} 0 0,1 ${arrowCx + arrowR},${arrowCy + 4}" fill="none" stroke="${COLORS.text}" stroke-width="1" opacity="0.4"/>`;

        // Title
        svg += svgTitle(W/2, 14, title, 11);

        svg += '</svg>';
        return svg;
    }

    /**
     * Generate a cross-section volume diagram (non-revolution)
     * @param {Function} fFunc - function(x) giving the cross-section side length
     * @param {Array} xRange - [a, b]
     * @param {Object} options - { title, shape }
     */
    function crossSectionVolume(fFunc, xRange, options = {}) {
        const W = 380, H = 300;
        const margin = 40;
        const title = options.title || 'Volume with Known Cross-Sections';
        const shape = options.shape || 'square';

        let svg = createSVG(W, H);

        // Draw the base region in 2D (bottom half)
        const baseH = 140;
        const baseY = H - 30;
        const baseW = W - 2 * margin;

        // Axes for base
        svg += `<line x1="${margin}" y1="${baseY}" x2="${W-margin}" y2="${baseY}" stroke="${COLORS.axes}" stroke-width="1.5"/>`;
        svg += `<text x="${W-margin+5}" y="${baseY+4}" font-size="10" fill="${COLORS.text}">x</text>`;

        // Draw the curve (base boundary)
        let curvePts = [];
        for (let i = 0; i <= 100; i++) {
            const x = xRange[0] + i * (xRange[1] - xRange[0]) / 100;
            const s = fFunc(x);
            const px = margin + (x - xRange[0]) / (xRange[1] - xRange[0]) * baseW;
            const py = baseY - s / fFunc((xRange[0] + xRange[1]) / 2) * 60;
            curvePts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
        }
        // Close to axis
        curvePts.push(`${(margin + baseW).toFixed(1)},${baseY}`);
        curvePts.push(`${margin},${baseY}`);
        svg += `<polygon points="${curvePts.join(' ')}" fill="rgba(44, 95, 45, 0.1)" stroke="${COLORS.curve}" stroke-width="2"/>`;

        // Draw 3-4 representative cross-section shapes rising from the base
        const numSlices = 4;
        for (let i = 1; i <= numSlices; i++) {
            const x = xRange[0] + i * (xRange[1] - xRange[0]) / (numSlices + 1);
            const s = fFunc(x);
            const px = margin + (x - xRange[0]) / (xRange[1] - xRange[0]) * baseW;
            const sideLen = s / fFunc((xRange[0] + xRange[1]) / 2) * 55;

            if (shape === 'square') {
                // Draw a square cross-section with perspective
                const sqBottom = baseY;
                const sqTop = sqBottom - sideLen;
                const offset = sideLen * 0.3; // perspective offset
                // Front face
                svg += `<rect x="${px - sideLen/2}" y="${sqTop}" width="${sideLen}" height="${sideLen}" fill="rgba(44, 95, 45, 0.08)" stroke="${COLORS.curve}" stroke-width="1.2"/>`;
                // Top face (parallelogram for 3D effect)
                svg += `<polygon points="${px - sideLen/2},${sqTop} ${px - sideLen/2 + offset},${sqTop - offset*0.6} ${px + sideLen/2 + offset},${sqTop - offset*0.6} ${px + sideLen/2},${sqTop}" fill="rgba(44, 95, 45, 0.15)" stroke="${COLORS.curve}" stroke-width="0.8"/>`;
                // Side face
                svg += `<polygon points="${px + sideLen/2},${sqTop} ${px + sideLen/2 + offset},${sqTop - offset*0.6} ${px + sideLen/2 + offset},${sqBottom - offset*0.6} ${px + sideLen/2},${sqBottom}" fill="rgba(44, 95, 45, 0.05)" stroke="${COLORS.curve}" stroke-width="0.8"/>`;
            }
        }

        // Label
        svg += `<text x="${margin}" y="${baseY + 16}" font-size="9" fill="${COLORS.text}">x=${xRange[0]}</text>`;
        svg += `<text x="${W-margin}" y="${baseY + 16}" font-size="9" fill="${COLORS.text}" text-anchor="end">x=${xRange[1]}</text>`;
        svg += svgLabel(W/2, H - 2, `Cross-sections: ${shape}s with side = f(x)`, 9, COLORS.text, {anchor: 'middle', italic: true});

        // Title
        svg += svgTitle(W/2, 16, title, 11);

        svg += '</svg>';
        return svg;
    }

    // Public API
    return {
        slopeField,
        eulerMethod,
        eulerSteps: eulerMethod,
        exponentialCurve,
        logisticCurve,
        solutionCurve,
        eulerTable,
        coneTank,
        mixingTank,
        coolingDiagram,
        sphereDiagram,
        snowplowDiagram,
        fallingObject,
        waterTank,
        parametricCurve,
        polarCurve,
        volumeRevolution,
        crossSectionVolume
    };
})();
