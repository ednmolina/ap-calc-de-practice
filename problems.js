/**
 * AP Calculus DE Practice — Problem Bank
 * All problems are pre-authored at AP exam difficulty level.
 * Solutions are computed/displayed without any LLM dependency.
 */

const PROBLEM_BANK = [
    // ===== SEPARABLE DEs =====
    {
        id: 1,
        exam: "AB",
        topic: "separable",
        topicLabel: "Separable DEs",
        difficulty: 1,
        problem: "Solve the differential equation \\(\\frac{dy}{dx} = 3x^2 y\\).",
        hint: "Separate the variables: move all \\(y\\) terms to the left and \\(x\\) terms to the right, then integrate both sides.",
        solution: [
            { step: "Separate variables", detail: "\\(\\frac{1}{y}\\,dy = 3x^2\\,dx\\)" },
            { step: "Integrate both sides", detail: "\\(\\int \\frac{1}{y}\\,dy = \\int 3x^2\\,dx\\)" },
            { step: "Evaluate integrals", detail: "\\(\\ln|y| = x^3 + C\\)" },
            { step: "Solve for y", detail: "\\(y = Ae^{x^3}\\) where \\(A = \\pm e^C\\)" }
        ],
        answer: "\\(y = Ae^{x^3}\\)"
    },
    {
        id: 2,
        exam: "AB",
        topic: "separable",
        topicLabel: "Separable DEs",
        difficulty: 2,
        problem: "Find the general solution to \\(\\frac{dy}{dx} = \\frac{x^2}{y}\\).",
        hint: "Multiply both sides by \\(y\\) to separate variables, then integrate.",
        solution: [
            { step: "Separate variables", detail: "\\(y\\,dy = x^2\\,dx\\)" },
            { step: "Integrate both sides", detail: "\\(\\int y\\,dy = \\int x^2\\,dx\\)" },
            { step: "Evaluate integrals", detail: "\\(\\frac{y^2}{2} = \\frac{x^3}{3} + C\\)" },
            { step: "Solve for y", detail: "\\(y^2 = \\frac{2x^3}{3} + C_1\\) where \\(C_1 = 2C\\)" },
            { step: "Final answer", detail: "\\(y = \\pm\\sqrt{\\frac{2x^3}{3} + C}\\)" }
        ],
        answer: "\\(y = \\pm\\sqrt{\\frac{2x^3}{3} + C}\\)"
    },
    {
        id: 3,
        exam: "AB",
        topic: "separable",
        topicLabel: "Separable DEs",
        difficulty: 2,
        problem: "Solve \\(\\frac{dy}{dx} = \\frac{2x}{y+1}\\) with the initial condition \\(y(0) = 1\\).",
        hint: "Separate variables to get \\((y+1)\\,dy = 2x\\,dx\\), integrate, then use the initial condition to find \\(C\\).",
        solution: [
            { step: "Separate variables", detail: "\\((y+1)\\,dy = 2x\\,dx\\)" },
            { step: "Integrate both sides", detail: "\\(\\frac{(y+1)^2}{2} = x^2 + C\\)" },
            { step: "Apply initial condition y(0) = 1", detail: "\\(\\frac{(1+1)^2}{2} = 0 + C \\Rightarrow C = 2\\)" },
            { step: "Solve for y", detail: "\\((y+1)^2 = 2x^2 + 4\\)" },
            { step: "Final answer", detail: "\\(y = -1 + \\sqrt{2x^2 + 4}\\) (taking positive root since \\(y(0)=1>-1\\))" }
        ],
        answer: "\\(y = -1 + \\sqrt{2x^2 + 4}\\)"
    },
    {
        id: 4,
        exam: "AB",
        topic: "separable",
        topicLabel: "Separable DEs",
        difficulty: 3,
        problem: "Solve the differential equation \\(\\frac{dy}{dx} = \\frac{y^2 \\cos x}{1 + 2y}\\).",
        hint: "Rewrite as \\(\\frac{1+2y}{y^2}\\,dy = \\cos x\\,dx\\) and split the left side into two fractions.",
        solution: [
            { step: "Separate variables", detail: "\\(\\frac{1+2y}{y^2}\\,dy = \\cos x\\,dx\\)" },
            { step: "Split the fraction", detail: "\\(\\left(\\frac{1}{y^2} + \\frac{2}{y}\\right)dy = \\cos x\\,dx\\)" },
            { step: "Integrate both sides", detail: "\\(\\int\\left(y^{-2} + 2y^{-1}\\right)dy = \\int \\cos x\\,dx\\)" },
            { step: "Evaluate integrals", detail: "\\(-\\frac{1}{y} + 2\\ln|y| = \\sin x + C\\)" }
        ],
        answer: "\\(-\\frac{1}{y} + 2\\ln|y| = \\sin x + C\\)"
    },
    {
        id: 5,
        exam: "AB",
        topic: "separable",
        topicLabel: "Separable DEs",
        difficulty: 1,
        problem: "Find the general solution to \\(\\frac{dy}{dx} = 6x^2 e^{-y}\\).",
        hint: "Multiply both sides by \\(e^y\\) to separate variables.",
        solution: [
            { step: "Separate variables", detail: "\\(e^y\\,dy = 6x^2\\,dx\\)" },
            { step: "Integrate both sides", detail: "\\(\\int e^y\\,dy = \\int 6x^2\\,dx\\)" },
            { step: "Evaluate integrals", detail: "\\(e^y = 2x^3 + C\\)" },
            { step: "Solve for y", detail: "\\(y = \\ln(2x^3 + C)\\)" }
        ],
        answer: "\\(y = \\ln(2x^3 + C)\\)"
    },
    {
        id: 6,
        exam: "AB",
        topic: "separable",
        topicLabel: "Separable DEs",
        difficulty: 3,
        problem: "Solve \\(\\frac{dy}{dx} = \\frac{xy + x}{y - 1}\\) given \\(y(0) = 3\\).",
        hint: "Factor the numerator as \\(x(y+1)\\), then separate: \\(\\frac{y-1}{y+1}\\,dy = x\\,dx\\). Use polynomial long division on the left.",
        solution: [
            { step: "Factor and separate", detail: "\\(\\frac{dy}{dx} = \\frac{x(y+1)}{y-1} \\Rightarrow \\frac{y-1}{y+1}\\,dy = x\\,dx\\)" },
            { step: "Rewrite the left side", detail: "\\(\\frac{y-1}{y+1} = 1 - \\frac{2}{y+1}\\), so \\(\\left(1 - \\frac{2}{y+1}\\right)dy = x\\,dx\\)" },
            { step: "Integrate both sides", detail: "\\(y - 2\\ln|y+1| = \\frac{x^2}{2} + C\\)" },
            { step: "Apply initial condition y(0) = 3", detail: "\\(3 - 2\\ln 4 = 0 + C \\Rightarrow C = 3 - 2\\ln 4\\)" },
            { step: "Final answer", detail: "\\(y - 2\\ln|y+1| = \\frac{x^2}{2} + 3 - 2\\ln 4\\)" }
        ],
        answer: "\\(y - 2\\ln|y+1| = \\frac{x^2}{2} + 3 - 2\\ln 4\\)"
    },

    // ===== SLOPE FIELDS =====
    {
        id: 7,
        exam: "AB",
        topic: "slope-fields",
        topicLabel: "Slope Fields",
        difficulty: 1,
        problem: "Consider the differential equation \\(\\frac{dy}{dx} = x - y\\). (a) At what points in the \\(xy\\)-plane are the slopes equal to zero? (b) Describe the slopes along the line \\(y = x + 1\\).",
        hint: "Set \\(x - y = 0\\) for part (a). For part (b), substitute \\(y = x + 1\\) into the DE.",
        solution: [
            { step: "Part (a): Set dy/dx = 0", detail: "\\(x - y = 0 \\Rightarrow y = x\\). Slopes are zero along the line \\(y = x\\)." },
            { step: "Part (b): Substitute y = x + 1", detail: "\\(\\frac{dy}{dx} = x - (x+1) = -1\\)" },
            { step: "Interpretation", detail: "Along the line \\(y = x + 1\\), all slopes equal \\(-1\\). This line is an isocline." }
        ],
        answer: "(a) Along \\(y = x\\); (b) All slopes are \\(-1\\) along \\(y = x + 1\\)"
    },
    {
        id: 8,
        exam: "AB",
        topic: "slope-fields",
        topicLabel: "Slope Fields",
        difficulty: 2,
        problem: "The slope field for a differential equation is shown to have horizontal tangent lines along the curve \\(y = x^2\\) and vertical behavior as \\(y \\to 0\\). Which of the following could be the DE? (A) \\(\\frac{dy}{dx} = y - x^2\\) (B) \\(\\frac{dy}{dx} = \\frac{x^2 - y}{x}\\) (C) \\(\\frac{dy}{dx} = x^2 y\\) (D) \\(\\frac{dy}{dx} = \\frac{y - x^2}{y}\\)",
        hint: "For horizontal tangents, we need \\(dy/dx = 0\\) when \\(y = x^2\\). Check each option. For vertical behavior near \\(y=0\\), the DE should be undefined or approach \\(\\pm\\infty\\).",
        solution: [
            { step: "Check condition: dy/dx = 0 when y = x²", detail: "Option (A): \\(x^2 - x^2 = 0\\) ✓. Option (D): \\(\\frac{x^2 - x^2}{x^2} = 0\\) ✓." },
            { step: "Check vertical behavior as y → 0", detail: "Option (A): \\(0 - x^2 = -x^2\\), finite — no vertical behavior ✗. Option (D): \\(\\frac{0 - x^2}{0}\\) → undefined ✓." },
            { step: "Verify Option (D)", detail: "\\(\\frac{dy}{dx} = \\frac{y - x^2}{y}\\) gives zero slopes on \\(y = x^2\\) and undefined (vertical) slopes on \\(y = 0\\). ✓" }
        ],
        answer: "(D) \\(\\frac{dy}{dx} = \\frac{y - x^2}{y}\\)"
    },
    {
        id: 9,
        exam: "AB",
        topic: "slope-fields",
        topicLabel: "Slope Fields",
        difficulty: 2,
        problem: "For the DE \\(\\frac{dy}{dx} = y(2-y)\\), determine: (a) all equilibrium solutions, (b) where solutions are increasing, and (c) where solutions are concave up.",
        hint: "Equilibria occur where \\(dy/dx = 0\\). For concavity, find \\(d^2y/dx^2\\) using the chain rule: \\(\\frac{d^2y}{dx^2} = \\frac{d}{dy}[y(2-y)] \\cdot \\frac{dy}{dx}\\).",
        solution: [
            { step: "Find equilibria", detail: "\\(y(2-y) = 0 \\Rightarrow y = 0\\) or \\(y = 2\\). These are constant solutions." },
            { step: "Where solutions increase", detail: "\\(y(2-y) > 0\\) when \\(0 < y < 2\\). Solutions are increasing for \\(0 < y < 2\\)." },
            { step: "Find second derivative", detail: "\\(\\frac{d^2y}{dx^2} = \\frac{d}{dx}[y(2-y)] = (2-2y)\\frac{dy}{dx} = (2-2y) \\cdot y(2-y)\\)" },
            { step: "Concave up condition", detail: "\\((2-2y) \\cdot y(2-y) > 0\\). Analyzing signs: concave up when \\(0 < y < 1\\) or \\(y > 2\\)." }
        ],
        answer: "(a) \\(y=0, y=2\\); (b) \\(0 < y < 2\\); (c) \\(0 < y < 1\\) or \\(y > 2\\)"
    },
    {
        id: 10,
        exam: "AB",
        topic: "slope-fields",
        topicLabel: "Slope Fields",
        difficulty: 3,
        problem: "Consider \\(\\frac{dy}{dx} = \\frac{2x}{y}\\). A student claims that the solution passing through \\((1, 2)\\) is a circle. (a) Verify or refute this claim. (b) State the domain of the particular solution through \\((1, 2)\\).",
        hint: "Solve the separable DE with the given initial condition. The resulting implicit equation may define part of an ellipse or other conic.",
        solution: [
            { step: "Separate and integrate", detail: "\\(y\\,dy = 2x\\,dx \\Rightarrow \\frac{y^2}{2} = x^2 + C\\)" },
            { step: "Apply IC: (1, 2)", detail: "\\(\\frac{4}{2} = 1 + C \\Rightarrow C = 1\\). So \\(\\frac{y^2}{2} = x^2 + 1\\), i.e., \\(y^2 = 2x^2 + 2\\)." },
            { step: "Identify the curve", detail: "Rewriting: \\(y^2 - 2x^2 = 2\\), or \\(\\frac{y^2}{2} - x^2 = 1\\). This is a hyperbola, not a circle." },
            { step: "Domain of solution", detail: "Since \\(y^2 = 2x^2 + 2 \\geq 2 > 0\\) for all \\(x\\), and \\(y(1)=2>0\\), the solution \\(y = \\sqrt{2x^2+2}\\) is defined for all real \\(x\\)." }
        ],
        answer: "The claim is false; the solution is \\(y = \\sqrt{2x^2 + 2}\\), a branch of a hyperbola, defined for all \\(x \\in (-\\infty, \\infty)\\)."
    },

    // ===== EULER'S METHOD =====
    {
        id: 11,
        exam: "BC",
        topic: "eulers",
        topicLabel: "Euler's Method",
        difficulty: 1,
        problem: "Use Euler's method with step size \\(h = 0.5\\) to approximate \\(y(1)\\) given \\(\\frac{dy}{dx} = x + y\\) and \\(y(0) = 1\\).",
        hint: "Apply the formula \\(y_{n+1} = y_n + h \\cdot f(x_n, y_n)\\) twice: once from \\(x=0\\) to \\(x=0.5\\), then from \\(x=0.5\\) to \\(x=1\\).",
        solution: [
            { step: "Set up", detail: "\\(f(x,y) = x + y\\), \\(h = 0.5\\), \\((x_0, y_0) = (0, 1)\\)" },
            { step: "Step 1: x = 0 → 0.5", detail: "\\(y_1 = 1 + 0.5(0 + 1) = 1 + 0.5 = 1.5\\)" },
            { step: "Step 2: x = 0.5 → 1", detail: "\\(y_2 = 1.5 + 0.5(0.5 + 1.5) = 1.5 + 0.5(2) = 2.5\\)" },
            { step: "Final approximation", detail: "\\(y(1) \\approx 2.5\\)" }
        ],
        answer: "\\(y(1) \\approx 2.5\\)"
    },
    {
        id: 12,
        exam: "BC",
        topic: "eulers",
        topicLabel: "Euler's Method",
        difficulty: 2,
        problem: "Given \\(\\frac{dy}{dx} = 2x - y\\) with \\(y(1) = 0\\), use Euler's method with 3 equal steps to approximate \\(y(2.5)\\).",
        hint: "The step size is \\(h = \\frac{2.5 - 1}{3} = 0.5\\). Apply the Euler formula three times.",
        solution: [
            { step: "Determine step size", detail: "\\(h = \\frac{2.5 - 1}{3} = 0.5\\)" },
            { step: "Step 1: (1, 0) → x = 1.5", detail: "\\(y_1 = 0 + 0.5(2(1) - 0) = 0 + 0.5(2) = 1\\)" },
            { step: "Step 2: (1.5, 1) → x = 2", detail: "\\(y_2 = 1 + 0.5(2(1.5) - 1) = 1 + 0.5(2) = 2\\)" },
            { step: "Step 3: (2, 2) → x = 2.5", detail: "\\(y_3 = 2 + 0.5(2(2) - 2) = 2 + 0.5(2) = 3\\)" },
            { step: "Final approximation", detail: "\\(y(2.5) \\approx 3\\)" }
        ],
        answer: "\\(y(2.5) \\approx 3\\)"
    },
    {
        id: 13,
        exam: "BC",
        topic: "eulers",
        topicLabel: "Euler's Method",
        difficulty: 3,
        problem: "Let \\(\\frac{dy}{dx} = y^2 - x\\) with \\(y(0) = 1\\). (a) Use Euler's method with \\(h = 0.1\\) to approximate \\(y(0.3)\\). (b) Is the approximation an overestimate or underestimate? Justify your answer.",
        hint: "For part (b), determine the concavity of the solution by computing \\(d^2y/dx^2\\) at the initial point.",
        solution: [
            { step: "Step 1: (0, 1) → x = 0.1", detail: "\\(y_1 = 1 + 0.1(1^2 - 0) = 1 + 0.1 = 1.1\\)" },
            { step: "Step 2: (0.1, 1.1) → x = 0.2", detail: "\\(y_2 = 1.1 + 0.1(1.1^2 - 0.1) = 1.1 + 0.1(1.21 - 0.1) = 1.1 + 0.111 = 1.211\\)" },
            { step: "Step 3: (0.2, 1.211) → x = 0.3", detail: "\\(y_3 = 1.211 + 0.1(1.211^2 - 0.2) = 1.211 + 0.1(1.4665 - 0.2) = 1.211 + 0.1267 \\approx 1.338\\)" },
            { step: "Part (b): Concavity analysis", detail: "\\(\\frac{d^2y}{dx^2} = 2y\\frac{dy}{dx} - 1 = 2(1)(1) - 1 = 1 > 0\\) at \\((0,1)\\). The solution is concave up." },
            { step: "Conclusion", detail: "Since the solution is concave up, the tangent line lies below the curve, so Euler's method gives an underestimate." }
        ],
        answer: "\\(y(0.3) \\approx 1.338\\); this is an underestimate because the solution is concave up."
    },

    // ===== EXPONENTIAL GROWTH/DECAY =====
    {
        id: 14,
        exam: "AB",
        topic: "exponential",
        topicLabel: "Exponential Growth/Decay",
        difficulty: 1,
        problem: "A radioactive substance decays at a rate proportional to the amount present. If 100 mg decays to 75 mg in 4 hours, find the amount remaining after 10 hours.",
        hint: "Use the model \\(A(t) = A_0 e^{kt}\\). First find \\(k\\) using the condition \\(A(4) = 75\\).",
        solution: [
            { step: "Set up the model", detail: "\\(A(t) = 100e^{kt}\\)" },
            { step: "Find k using A(4) = 75", detail: "\\(75 = 100e^{4k} \\Rightarrow e^{4k} = 0.75 \\Rightarrow k = \\frac{\\ln(0.75)}{4} \\approx -0.0719\\)" },
            { step: "Find A(10)", detail: "\\(A(10) = 100e^{10 \\cdot \\frac{\\ln(0.75)}{4}} = 100 \\cdot (0.75)^{10/4} = 100 \\cdot (0.75)^{2.5}\\)" },
            { step: "Calculate", detail: "\\(A(10) = 100 \\cdot (0.75)^{2.5} = 100 \\cdot 0.4871 \\approx 48.71\\) mg" }
        ],
        answer: "\\(A(10) = 100(0.75)^{5/2} \\approx 48.71\\) mg"
    },
    {
        id: 15,
        exam: "AB",
        topic: "exponential",
        topicLabel: "Exponential Growth/Decay",
        difficulty: 2,
        problem: "A population of bacteria doubles every 3 hours. If the initial population is 500, (a) write a differential equation modeling the population, and (b) find the population after 8 hours.",
        hint: "If the population doubles every 3 hours, find \\(k\\) from \\(e^{3k} = 2\\). The DE is \\(dP/dt = kP\\).",
        solution: [
            { step: "Find the growth constant", detail: "Doubling time = 3: \\(e^{3k} = 2 \\Rightarrow k = \\frac{\\ln 2}{3}\\)" },
            { step: "Part (a): Write the DE", detail: "\\(\\frac{dP}{dt} = \\frac{\\ln 2}{3} \\cdot P\\)" },
            { step: "Write the solution", detail: "\\(P(t) = 500 e^{(\\ln 2/3)t} = 500 \\cdot 2^{t/3}\\)" },
            { step: "Part (b): Find P(8)", detail: "\\(P(8) = 500 \\cdot 2^{8/3} = 500 \\cdot 2^{2.\\overline{6}} \\approx 500 \\cdot 6.35 \\approx 3175\\)" }
        ],
        answer: "(a) \\(\\frac{dP}{dt} = \\frac{\\ln 2}{3}P\\); (b) \\(P(8) = 500 \\cdot 2^{8/3} \\approx 3175\\)"
    },
    {
        id: 16,
        exam: "AB",
        topic: "exponential",
        topicLabel: "Exponential Growth/Decay",
        difficulty: 2,
        problem: "Newton's Law of Cooling states \\(\\frac{dT}{dt} = k(T - T_s)\\) where \\(T_s\\) is the surrounding temperature. A cup of coffee at 90°C is placed in a 20°C room. After 5 minutes it is 70°C. Find the temperature after 15 minutes.",
        hint: "Let \\(u = T - 20\\). Then \\(du/dt = ku\\), giving exponential decay. Use the condition at \\(t=5\\) to find \\(k\\).",
        solution: [
            { step: "Set up substitution", detail: "Let \\(u = T - 20\\). Then \\(u(0) = 70\\), \\(u(5) = 50\\), and \\(\\frac{du}{dt} = ku\\)." },
            { step: "General solution", detail: "\\(u(t) = 70e^{kt}\\), so \\(T(t) = 20 + 70e^{kt}\\)" },
            { step: "Find k", detail: "\\(50 = 70e^{5k} \\Rightarrow e^{5k} = \\frac{5}{7} \\Rightarrow k = \\frac{1}{5}\\ln\\frac{5}{7}\\)" },
            { step: "Find T(15)", detail: "\\(T(15) = 20 + 70e^{15k} = 20 + 70\\left(\\frac{5}{7}\\right)^3 = 20 + 70 \\cdot \\frac{125}{343}\\)" },
            { step: "Calculate", detail: "\\(T(15) = 20 + \\frac{8750}{343} \\approx 20 + 25.51 \\approx 45.5°C\\)" }
        ],
        answer: "\\(T(15) = 20 + 70\\left(\\frac{5}{7}\\right)^3 \\approx 45.5°C\\)"
    },
    {
        id: 17,
        exam: "AB",
        topic: "exponential",
        topicLabel: "Exponential Growth/Decay",
        difficulty: 3,
        problem: "A tank initially contains 100 liters of pure water. Brine containing 2 g/L of salt flows in at 5 L/min, and the well-mixed solution flows out at 5 L/min. Set up and solve the DE for the amount of salt \\(S(t)\\) in the tank at time \\(t\\).",
        hint: "Rate in = (concentration in)(flow rate in). Rate out = (concentration in tank)(flow rate out). The volume stays constant at 100 L.",
        solution: [
            { step: "Set up the DE", detail: "Rate in: \\(2 \\cdot 5 = 10\\) g/min. Rate out: \\(\\frac{S}{100} \\cdot 5 = \\frac{S}{20}\\) g/min. So \\(\\frac{dS}{dt} = 10 - \\frac{S}{20}\\)." },
            { step: "Rewrite as separable", detail: "\\(\\frac{dS}{dt} = \\frac{200 - S}{20}\\), i.e., \\(\\frac{dS}{200 - S} = \\frac{dt}{20}\\)" },
            { step: "Integrate", detail: "\\(-\\ln|200 - S| = \\frac{t}{20} + C\\)" },
            { step: "Apply IC: S(0) = 0", detail: "\\(-\\ln 200 = C\\). So \\(-\\ln|200-S| = \\frac{t}{20} - \\ln 200\\)." },
            { step: "Solve for S", detail: "\\(200 - S = 200e^{-t/20}\\), thus \\(S(t) = 200(1 - e^{-t/20})\\)" }
        ],
        answer: "\\(S(t) = 200(1 - e^{-t/20})\\) grams"
    },

    // ===== LOGISTIC GROWTH (BC) =====
    {
        id: 18,
        exam: "BC",
        topic: "logistic",
        topicLabel: "Logistic Growth",
        difficulty: 2,
        problem: "A population \\(P\\) satisfies \\(\\frac{dP}{dt} = 0.5P\\left(1 - \\frac{P}{1000}\\right)\\) with \\(P(0) = 100\\). (a) What is the carrying capacity? (b) At what population is the growth rate maximum? (c) Find \\(\\lim_{t\\to\\infty} P(t)\\).",
        hint: "In the logistic model \\(dP/dt = kP(1 - P/L)\\), the carrying capacity is \\(L\\), and maximum growth occurs at \\(P = L/2\\).",
        solution: [
            { step: "Identify parameters", detail: "Comparing with \\(\\frac{dP}{dt} = kP(1-P/L)\\): \\(k = 0.5\\), \\(L = 1000\\)." },
            { step: "Part (a)", detail: "Carrying capacity \\(L = 1000\\)." },
            { step: "Part (b)", detail: "Maximum growth rate occurs at \\(P = L/2 = 500\\)." },
            { step: "Part (c)", detail: "\\(\\lim_{t\\to\\infty} P(t) = L = 1000\\) (population approaches carrying capacity)." }
        ],
        answer: "(a) \\(L = 1000\\); (b) \\(P = 500\\); (c) \\(\\lim_{t\\to\\infty} P(t) = 1000\\)"
    },
    {
        id: 19,
        exam: "BC",
        topic: "logistic",
        topicLabel: "Logistic Growth",
        difficulty: 2,
        problem: "The number of students who have heard a rumor at a school of 800 students is modeled by \\(\\frac{dN}{dt} = 0.002N(800 - N)\\) with \\(N(0) = 10\\). Write the particular solution for \\(N(t)\\).",
        hint: "Rewrite as \\(\\frac{dN}{dt} = 1.6 N(1 - N/800)\\). Use the logistic solution formula with \\(A = (L - N_0)/N_0\\).",
        solution: [
            { step: "Identify logistic form", detail: "\\(\\frac{dN}{dt} = 0.002N(800-N) = 1.6N\\left(1 - \\frac{N}{800}\\right)\\). So \\(k = 1.6\\), \\(L = 800\\)." },
            { step: "Find A", detail: "\\(A = \\frac{L - N_0}{N_0} = \\frac{800 - 10}{10} = 79\\)" },
            { step: "Write the solution", detail: "\\(N(t) = \\frac{800}{1 + 79e^{-1.6t}}\\)" }
        ],
        answer: "\\(N(t) = \\frac{800}{1 + 79e^{-1.6t}}\\)"
    },
    {
        id: 20,
        exam: "BC",
        topic: "logistic",
        topicLabel: "Logistic Growth",
        difficulty: 3,
        problem: "A logistic DE has the form \\(\\frac{dP}{dt} = 3P - 0.01P^2\\). (a) Find the carrying capacity. (b) If \\(P(0) = 50\\), find the value of \\(t\\) when the population is growing fastest.",
        hint: "Factor: \\(\\frac{dP}{dt} = 0.01P(300 - P)\\). The population grows fastest at \\(P = L/2\\). You'll need to solve for when \\(P(t) = L/2\\).",
        solution: [
            { step: "Factor the DE", detail: "\\(\\frac{dP}{dt} = 3P - 0.01P^2 = 0.01P(300 - P)\\). Rewrite as \\(3P(1 - P/300)\\)." },
            { step: "Part (a): Carrying capacity", detail: "\\(L = 300\\)" },
            { step: "Write the solution", detail: "\\(A = \\frac{300 - 50}{50} = 5\\). So \\(P(t) = \\frac{300}{1 + 5e^{-3t}}\\)." },
            { step: "Part (b): Find when P = 150", detail: "\\(150 = \\frac{300}{1 + 5e^{-3t}} \\Rightarrow 1 + 5e^{-3t} = 2 \\Rightarrow e^{-3t} = \\frac{1}{5}\\)" },
            { step: "Solve for t", detail: "\\(-3t = \\ln(1/5) = -\\ln 5 \\Rightarrow t = \\frac{\\ln 5}{3} \\approx 0.537\\)" }
        ],
        answer: "(a) \\(L = 300\\); (b) \\(t = \\frac{\\ln 5}{3} \\approx 0.537\\)"
    },

    // ===== INITIAL VALUE PROBLEMS =====
    {
        id: 21,
        exam: "AB",
        topic: "ivp",
        topicLabel: "Initial Value Problems",
        difficulty: 1,
        problem: "Solve the initial value problem: \\(\\frac{dy}{dx} = 4x^3 - 2x\\), \\(y(1) = 3\\).",
        hint: "This is a direct integration problem — just integrate \\(4x^3 - 2x\\) and apply the initial condition.",
        solution: [
            { step: "Integrate", detail: "\\(y = \\int (4x^3 - 2x)\\,dx = x^4 - x^2 + C\\)" },
            { step: "Apply IC: y(1) = 3", detail: "\\(3 = 1 - 1 + C \\Rightarrow C = 3\\)" },
            { step: "Final answer", detail: "\\(y = x^4 - x^2 + 3\\)" }
        ],
        answer: "\\(y = x^4 - x^2 + 3\\)"
    },
    {
        id: 22,
        exam: "AB",
        topic: "ivp",
        topicLabel: "Initial Value Problems",
        difficulty: 2,
        problem: "Solve: \\(\\frac{dy}{dx} = \\frac{3x^2 + 1}{2y}\\), \\(y(0) = 2\\).",
        hint: "Separate variables: \\(2y\\,dy = (3x^2 + 1)\\,dx\\). Integrate and use the initial condition.",
        solution: [
            { step: "Separate variables", detail: "\\(2y\\,dy = (3x^2 + 1)\\,dx\\)" },
            { step: "Integrate", detail: "\\(y^2 = x^3 + x + C\\)" },
            { step: "Apply IC: y(0) = 2", detail: "\\(4 = 0 + 0 + C \\Rightarrow C = 4\\)" },
            { step: "Solve for y", detail: "\\(y = \\sqrt{x^3 + x + 4}\\) (positive root since \\(y(0) = 2 > 0\\))" }
        ],
        answer: "\\(y = \\sqrt{x^3 + x + 4}\\)"
    },
    {
        id: 23,
        exam: "AB",
        topic: "ivp",
        topicLabel: "Initial Value Problems",
        difficulty: 3,
        problem: "Solve the IVP: \\(\\frac{dy}{dx} = \\frac{y^2 + 1}{x^2 + 1}\\), \\(y(0) = 1\\). Express your answer as \\(y = f(x)\\).",
        hint: "Separate: \\(\\frac{dy}{y^2+1} = \\frac{dx}{x^2+1}\\). Both sides integrate to arctangent.",
        solution: [
            { step: "Separate variables", detail: "\\(\\frac{dy}{y^2+1} = \\frac{dx}{x^2+1}\\)" },
            { step: "Integrate both sides", detail: "\\(\\arctan y = \\arctan x + C\\)" },
            { step: "Apply IC: y(0) = 1", detail: "\\(\\arctan 1 = \\arctan 0 + C \\Rightarrow \\frac{\\pi}{4} = 0 + C \\Rightarrow C = \\frac{\\pi}{4}\\)" },
            { step: "Solve for y", detail: "\\(\\arctan y = \\arctan x + \\frac{\\pi}{4}\\), so \\(y = \\tan\\!\\left(\\arctan x + \\frac{\\pi}{4}\\right)\\)" },
            { step: "Simplify using addition formula", detail: "\\(y = \\frac{\\tan(\\arctan x) + \\tan(\\pi/4)}{1 - \\tan(\\arctan x)\\tan(\\pi/4)} = \\frac{x + 1}{1 - x}\\)" }
        ],
        answer: "\\(y = \\frac{x + 1}{1 - x}\\)"
    },
    {
        id: 24,
        exam: "AB",
        topic: "ivp",
        topicLabel: "Initial Value Problems",
        difficulty: 2,
        problem: "Find the particular solution to \\(\\frac{dy}{dx} = e^{x-y}\\) with \\(y(0) = 0\\).",
        hint: "Rewrite \\(e^{x-y} = e^x \\cdot e^{-y}\\), then separate variables.",
        solution: [
            { step: "Rewrite and separate", detail: "\\(e^y\\,dy = e^x\\,dx\\)" },
            { step: "Integrate both sides", detail: "\\(e^y = e^x + C\\)" },
            { step: "Apply IC: y(0) = 0", detail: "\\(e^0 = e^0 + C \\Rightarrow 1 = 1 + C \\Rightarrow C = 0\\)" },
            { step: "Solve for y", detail: "\\(e^y = e^x \\Rightarrow y = x\\)" }
        ],
        answer: "\\(y = x\\)"
    },

    // ===== MODELING WITH DEs =====
    {
        id: 25,
        exam: "AB",
        topic: "modeling",
        topicLabel: "Modeling with DEs",
        difficulty: 2,
        problem: "A 1000-gallon tank is full of water. Water drains out at a rate proportional to the square root of the volume \\(V\\) remaining: \\(\\frac{dV}{dt} = -k\\sqrt{V}\\). If the tank drains completely in 20 minutes, find \\(k\\) and \\(V(t)\\).",
        hint: "Separate: \\(\\frac{dV}{\\sqrt{V}} = -k\\,dt\\). Integrate to get \\(2\\sqrt{V}\\) on the left. Use \\(V(0) = 1000\\) and \\(V(20) = 0\\).",
        solution: [
            { step: "Separate and integrate", detail: "\\(V^{-1/2}\\,dV = -k\\,dt \\Rightarrow 2\\sqrt{V} = -kt + C\\)" },
            { step: "Apply IC: V(0) = 1000", detail: "\\(2\\sqrt{1000} = C \\Rightarrow C = 2\\sqrt{1000} \\approx 63.25\\)" },
            { step: "Apply V(20) = 0", detail: "\\(0 = -20k + 2\\sqrt{1000} \\Rightarrow k = \\frac{2\\sqrt{1000}}{20} = \\frac{\\sqrt{1000}}{10}\\)" },
            { step: "Write V(t)", detail: "\\(2\\sqrt{V} = 2\\sqrt{1000} - \\frac{\\sqrt{1000}}{10}t = \\sqrt{1000}\\left(2 - \\frac{t}{10}\\right)\\)" },
            { step: "Solve for V", detail: "\\(V(t) = 1000\\left(1 - \\frac{t}{20}\\right)^2\\) for \\(0 \\leq t \\leq 20\\)" }
        ],
        answer: "\\(k = \\frac{\\sqrt{1000}}{10} \\approx 3.16\\); \\(V(t) = 1000\\left(1 - \\frac{t}{20}\\right)^2\\)"
    },
    {
        id: 26,
        exam: "AB",
        topic: "modeling",
        topicLabel: "Modeling with DEs",
        difficulty: 3,
        problem: "The velocity \\(v\\) (in m/s) of a falling object with air resistance satisfies \\(\\frac{dv}{dt} = 9.8 - 0.2v\\). If the object starts from rest, (a) find \\(v(t)\\), (b) find the terminal velocity, and (c) find the time to reach 90% of terminal velocity.",
        hint: "This is a linear first-order DE. Separate variables or recognize it as exponential approach to equilibrium.",
        solution: [
            { step: "Separate variables", detail: "\\(\\frac{dv}{9.8 - 0.2v} = dt\\)" },
            { step: "Integrate", detail: "\\(-\\frac{1}{0.2}\\ln|9.8 - 0.2v| = t + C\\), i.e., \\(-5\\ln|9.8 - 0.2v| = t + C\\)" },
            { step: "Apply IC: v(0) = 0", detail: "\\(-5\\ln(9.8) = C\\). So \\(-5\\ln|9.8 - 0.2v| = t - 5\\ln(9.8)\\)." },
            { step: "Solve for v", detail: "\\(9.8 - 0.2v = 9.8e^{-t/5}\\), thus \\(v(t) = 49(1 - e^{-t/5})\\)" },
            { step: "Part (b): Terminal velocity", detail: "\\(v_{\\text{term}} = \\lim_{t\\to\\infty} v(t) = 49\\) m/s (or set \\(dv/dt = 0\\): \\(9.8 = 0.2v \\Rightarrow v = 49\\))" },
            { step: "Part (c): 90% of terminal", detail: "\\(0.9 \\times 49 = 49(1 - e^{-t/5}) \\Rightarrow e^{-t/5} = 0.1 \\Rightarrow t = -5\\ln(0.1) = 5\\ln 10 \\approx 11.51\\) s" }
        ],
        answer: "(a) \\(v(t) = 49(1 - e^{-t/5})\\); (b) \\(v_{term} = 49\\) m/s; (c) \\(t = 5\\ln 10 \\approx 11.5\\) s"
    },
    {
        id: 27,
        exam: "AB",
        topic: "modeling",
        topicLabel: "Modeling with DEs",
        difficulty: 1,
        problem: "The rate of change of a quantity \\(Q\\) is proportional to \\(Q\\) itself. If \\(Q(0) = 50\\) and \\(Q(3) = 200\\), find \\(Q(5)\\).",
        hint: "This gives \\(dQ/dt = kQ\\) with solution \\(Q = 50e^{kt}\\). Use \\(Q(3) = 200\\) to find \\(k\\).",
        solution: [
            { step: "Write the model", detail: "\\(Q(t) = 50e^{kt}\\)" },
            { step: "Find k using Q(3) = 200", detail: "\\(200 = 50e^{3k} \\Rightarrow e^{3k} = 4 \\Rightarrow k = \\frac{\\ln 4}{3}\\)" },
            { step: "Find Q(5)", detail: "\\(Q(5) = 50e^{5 \\cdot \\frac{\\ln 4}{3}} = 50 \\cdot 4^{5/3}\\)" },
            { step: "Calculate", detail: "\\(4^{5/3} = (2^2)^{5/3} = 2^{10/3} \\approx 10.079\\). So \\(Q(5) \\approx 503.97\\)." }
        ],
        answer: "\\(Q(5) = 50 \\cdot 4^{5/3} \\approx 504\\)"
    },
    {
        id: 28,
        exam: "BC",
        topic: "modeling",
        topicLabel: "Modeling with DEs",
        difficulty: 3,
        problem: "A disease spreads through a population of 10,000 at a rate proportional to the product of infected and uninfected individuals. Initially 100 are infected, and after 10 days 500 are infected. (a) Write the DE. (b) Find the number infected after 20 days.",
        hint: "This is a logistic model: \\(dI/dt = kI(10000 - I)\\). Use the logistic solution formula.",
        solution: [
            { step: "Part (a): Write the DE", detail: "\\(\\frac{dI}{dt} = kI(10000 - I)\\) where \\(I\\) is the number infected." },
            { step: "Write the logistic solution", detail: "\\(I(t) = \\frac{10000}{1 + Ae^{-10000kt}}\\) with \\(A = \\frac{10000 - 100}{100} = 99\\)." },
            { step: "Find k using I(10) = 500", detail: "\\(500 = \\frac{10000}{1 + 99e^{-100000k}}\\). So \\(1 + 99e^{-100000k} = 20\\), giving \\(e^{-100000k} = \\frac{19}{99}\\)." },
            { step: "Solve for k", detail: "\\(100000k = \\ln\\frac{99}{19} \\Rightarrow k = \\frac{\\ln(99/19)}{100000} \\approx 0.00001651\\)" },
            { step: "Find I(20)", detail: "\\(e^{-100000k \\cdot 2} = \\left(\\frac{19}{99}\\right)^2 = \\frac{361}{9801}\\). So \\(I(20) = \\frac{10000}{1 + 99 \\cdot \\frac{361}{9801}} = \\frac{10000}{1 + \\frac{361}{99}} = \\frac{10000}{\\frac{460}{99}} \\approx 2152\\)." }
        ],
        answer: "(a) \\(\\frac{dI}{dt} = kI(10000-I)\\); (b) \\(I(20) \\approx 2152\\) people"
    },

    // ===== MORE SEPARABLE DEs =====
    {
        id: 29,
        exam: "AB",
        topic: "separable",
        topicLabel: "Separable DEs",
        difficulty: 2,
        problem: "Solve \\(\\frac{dy}{dx} = \\frac{y\\cos x}{1 + y^2}\\) and express the solution implicitly.",
        hint: "Separate: \\(\\frac{1+y^2}{y}\\,dy = \\cos x\\,dx\\). Split the left side as \\(\\frac{1}{y} + y\\).",
        solution: [
            { step: "Separate variables", detail: "\\(\\frac{1+y^2}{y}\\,dy = \\cos x\\,dx\\)" },
            { step: "Simplify left side", detail: "\\(\\left(\\frac{1}{y} + y\\right)dy = \\cos x\\,dx\\)" },
            { step: "Integrate both sides", detail: "\\(\\ln|y| + \\frac{y^2}{2} = \\sin x + C\\)" }
        ],
        answer: "\\(\\ln|y| + \\frac{y^2}{2} = \\sin x + C\\)"
    },
    {
        id: 30,
        exam: "AB",
        topic: "separable",
        topicLabel: "Separable DEs",
        difficulty: 1,
        problem: "Find the general solution to \\(\\frac{dy}{dx} = \\frac{x}{y^2}\\).",
        hint: "Multiply both sides by \\(y^2\\) and integrate.",
        solution: [
            { step: "Separate variables", detail: "\\(y^2\\,dy = x\\,dx\\)" },
            { step: "Integrate", detail: "\\(\\frac{y^3}{3} = \\frac{x^2}{2} + C\\)" },
            { step: "Solve for y", detail: "\\(y^3 = \\frac{3x^2}{2} + C_1\\), so \\(y = \\left(\\frac{3x^2}{2} + C\\right)^{1/3}\\)" }
        ],
        answer: "\\(y = \\left(\\frac{3x^2}{2} + C\\right)^{1/3}\\)"
    },

    // ===== MORE EULER'S METHOD =====
    {
        id: 31,
        exam: "BC",
        topic: "eulers",
        topicLabel: "Euler's Method",
        difficulty: 2,
        problem: "The function \\(y = f(x)\\) satisfies \\(\\frac{dy}{dx} = \\sin(xy)\\) with \\(f(0) = 1\\). Use Euler's method with two steps of size \\(h = 0.5\\) to approximate \\(f(1)\\).",
        hint: "Step 1: compute \\(\\sin(0 \\cdot 1) = 0\\). Step 2: use the new point to compute the next slope.",
        solution: [
            { step: "Set up", detail: "\\(f(x,y) = \\sin(xy)\\), \\(h = 0.5\\), \\((x_0,y_0) = (0,1)\\)" },
            { step: "Step 1: x = 0 → 0.5", detail: "Slope: \\(\\sin(0 \\cdot 1) = 0\\). \\(y_1 = 1 + 0.5(0) = 1\\)" },
            { step: "Step 2: x = 0.5 → 1", detail: "Slope: \\(\\sin(0.5 \\cdot 1) = \\sin(0.5) \\approx 0.4794\\). \\(y_2 = 1 + 0.5(0.4794) \\approx 1.240\\)" },
            { step: "Final answer", detail: "\\(f(1) \\approx 1.240\\)" }
        ],
        answer: "\\(f(1) \\approx 1.240\\)"
    },

    // ===== MORE SLOPE FIELDS =====
    {
        id: 32,
        exam: "AB",
        topic: "slope-fields",
        topicLabel: "Slope Fields",
        difficulty: 1,
        problem: "For the DE \\(\\frac{dy}{dx} = x + 1\\), (a) describe the slope field, and (b) find the particular solution through \\((0, 2)\\).",
        hint: "The slopes depend only on \\(x\\), so all points on a vertical line have the same slope. For part (b), just integrate.",
        solution: [
            { step: "Part (a): Describe slope field", detail: "Since \\(dy/dx = x+1\\) depends only on \\(x\\), all points on a given vertical line \\(x = c\\) have slope \\(c+1\\). Slopes are zero at \\(x = -1\\), negative for \\(x < -1\\), positive for \\(x > -1\\)." },
            { step: "Part (b): Integrate", detail: "\\(y = \\int(x+1)\\,dx = \\frac{x^2}{2} + x + C\\)" },
            { step: "Apply IC: (0, 2)", detail: "\\(2 = 0 + 0 + C \\Rightarrow C = 2\\)" },
            { step: "Final answer", detail: "\\(y = \\frac{x^2}{2} + x + 2\\)" }
        ],
        answer: "(a) Slopes depend only on \\(x\\); zero at \\(x=-1\\). (b) \\(y = \\frac{x^2}{2} + x + 2\\)"
    },

    // ===== MORE LOGISTIC =====
    {
        id: 33,
        exam: "BC",
        topic: "logistic",
        topicLabel: "Logistic Growth",
        difficulty: 1,
        problem: "A population satisfies \\(\\frac{dP}{dt} = 2P\\left(1 - \\frac{P}{500}\\right)\\). Without solving the DE, determine: (a) the equilibrium solutions, (b) for what values of \\(P\\) the population is increasing, and (c) the value of \\(P\\) when \\(dP/dt\\) is greatest.",
        hint: "Set \\(dP/dt = 0\\) for equilibria. Analyze the sign of the expression for increasing/decreasing. Maximum of \\(dP/dt\\) occurs at \\(P = L/2\\).",
        solution: [
            { step: "Part (a): Equilibria", detail: "\\(2P(1 - P/500) = 0 \\Rightarrow P = 0\\) or \\(P = 500\\)." },
            { step: "Part (b): Increasing", detail: "\\(dP/dt > 0\\) when \\(P > 0\\) and \\(1 - P/500 > 0\\), i.e., \\(0 < P < 500\\)." },
            { step: "Part (c): Maximum growth rate", detail: "For logistic growth, \\(dP/dt\\) is maximized at \\(P = L/2 = 250\\)." }
        ],
        answer: "(a) \\(P = 0\\) and \\(P = 500\\); (b) \\(0 < P < 500\\); (c) \\(P = 250\\)"
    },

    // ===== MORE IVP =====
    {
        id: 34,
        exam: "AB",
        topic: "ivp",
        topicLabel: "Initial Value Problems",
        difficulty: 3,
        problem: "Solve the IVP: \\(y' = \\frac{2xy}{x^2 - 1}\\), \\(y(0) = 3\\). State the domain of the solution.",
        hint: "Separate: \\(\\frac{dy}{y} = \\frac{2x}{x^2-1}\\,dx\\). The right side integrates using a \\(u\\)-substitution with \\(u = x^2 - 1\\).",
        solution: [
            { step: "Separate variables", detail: "\\(\\frac{dy}{y} = \\frac{2x}{x^2-1}\\,dx\\)" },
            { step: "Integrate (u-sub: u = x²-1)", detail: "\\(\\ln|y| = \\ln|x^2 - 1| + C\\)" },
            { step: "Exponentiate", detail: "\\(|y| = A|x^2 - 1|\\) where \\(A = e^C\\)" },
            { step: "Apply IC: y(0) = 3", detail: "\\(3 = A|0 - 1| = A\\). So \\(y = 3(x^2 - 1)\\)... but wait, \\(y(0) = 3(0-1) = -3 \\neq 3\\)." },
            { step: "Correct sign analysis", detail: "At \\(x=0\\): \\(x^2-1 = -1 < 0\\), so \\(|x^2-1| = 1-x^2\\) near \\(x=0\\). Thus \\(y = 3(1-x^2)\\) on \\((-1,1)\\)." },
            { step: "Domain", detail: "The solution is valid on \\((-1, 1)\\) since \\(x^2-1 = 0\\) at \\(x = \\pm 1\\)." }
        ],
        answer: "\\(y = 3(1 - x^2)\\) on the domain \\((-1, 1)\\)"
    },

    // ===== MORE EXPONENTIAL =====
    {
        id: 35,
        exam: "AB",
        topic: "exponential",
        topicLabel: "Exponential Growth/Decay",
        difficulty: 1,
        problem: "Carbon-14 has a half-life of 5730 years. A fossil contains 20% of its original Carbon-14. How old is the fossil?",
        hint: "Use \\(A(t) = A_0 e^{kt}\\) with \\(k = -\\ln 2/5730\\). Set \\(A(t)/A_0 = 0.20\\) and solve for \\(t\\).",
        solution: [
            { step: "Find decay constant", detail: "\\(k = -\\frac{\\ln 2}{5730}\\)" },
            { step: "Set up equation", detail: "\\(0.20 = e^{kt} \\Rightarrow \\ln(0.20) = kt\\)" },
            { step: "Solve for t", detail: "\\(t = \\frac{\\ln(0.20)}{k} = \\frac{\\ln(0.20)}{-\\ln 2/5730} = \\frac{5730 \\ln 5}{\\ln 2}\\)" },
            { step: "Calculate", detail: "\\(t = \\frac{5730 \\times 1.6094}{0.6931} \\approx 13,305\\) years" }
        ],
        answer: "The fossil is approximately 13,305 years old."
    },

    // ===== ADDITIONAL PROBLEMS FOR VARIETY =====
    {
        id: 36,
        exam: "BC",
        topic: "eulers",
        topicLabel: "Euler's Method",
        difficulty: 1,
        problem: "Given \\(\\frac{dy}{dx} = 2x + 1\\) with \\(y(0) = 0\\), use Euler's method with \\(h = 1\\) to approximate \\(y(2)\\). Compare with the exact answer.",
        hint: "Apply Euler's formula twice. The exact solution is found by direct integration.",
        solution: [
            { step: "Step 1: (0, 0) → x = 1", detail: "\\(y_1 = 0 + 1 \\cdot (2(0)+1) = 1\\)" },
            { step: "Step 2: (1, 1) → x = 2", detail: "\\(y_2 = 1 + 1 \\cdot (2(1)+1) = 1 + 3 = 4\\)" },
            { step: "Euler approximation", detail: "\\(y(2) \\approx 4\\)" },
            { step: "Exact solution", detail: "\\(y = x^2 + x\\), so \\(y(2) = 4 + 2 = 6\\). The approximation underestimates by 2." }
        ],
        answer: "Euler: \\(y(2) \\approx 4\\); Exact: \\(y(2) = 6\\)"
    },
    {
        id: 37,
        exam: "AB",
        topic: "modeling",
        topicLabel: "Modeling with DEs",
        difficulty: 2,
        problem: "An investment grows at a continuous rate of 6% per year, and the investor adds $2000 per year continuously. If the initial investment is $10,000, write and solve the DE for the value \\(V(t)\\).",
        hint: "The DE is \\(dV/dt = 0.06V + 2000\\). This is a linear first-order DE. Separate or use integrating factors.",
        solution: [
            { step: "Write the DE", detail: "\\(\\frac{dV}{dt} = 0.06V + 2000\\)" },
            { step: "Separate variables", detail: "\\(\\frac{dV}{0.06V + 2000} = dt\\)" },
            { step: "Integrate", detail: "\\(\\frac{1}{0.06}\\ln|0.06V + 2000| = t + C\\)" },
            { step: "Simplify", detail: "\\(0.06V + 2000 = Ae^{0.06t}\\) for some constant \\(A\\)." },
            { step: "Apply IC: V(0) = 10000", detail: "\\(0.06(10000) + 2000 = A \\Rightarrow A = 2600\\)" },
            { step: "Solve for V", detail: "\\(V(t) = \\frac{2600e^{0.06t} - 2000}{0.06} = \\frac{2600e^{0.06t}}{0.06} - \\frac{2000}{0.06}\\)" },
            { step: "Simplify", detail: "\\(V(t) = \\frac{130000}{3}e^{0.06t} - \\frac{100000}{3} \\approx 43333e^{0.06t} - 33333\\)" }
        ],
        answer: "\\(V(t) = \\frac{130000}{3}e^{0.06t} - \\frac{100000}{3}\\)"
    },
    {
        id: 38,
        exam: "BC",
        topic: "logistic",
        topicLabel: "Logistic Growth",
        difficulty: 3,
        problem: "The weight \\(W\\) (in pounds) of a fish satisfies \\(\\frac{dW}{dt} = W(5 - W)\\) with \\(W(0) = 0.5\\). (a) Find \\(W(t)\\). (b) How long until the fish weighs 4 pounds?",
        hint: "This is logistic with \\(L = 5\\). Use the standard logistic solution formula.",
        solution: [
            { step: "Identify parameters", detail: "Rewrite: \\(\\frac{dW}{dt} = 5W(1 - W/5)\\). So \\(k = 5\\), \\(L = 5\\)." },
            { step: "Find A", detail: "\\(A = \\frac{L - W_0}{W_0} = \\frac{5 - 0.5}{0.5} = 9\\)" },
            { step: "Part (a): Write solution", detail: "\\(W(t) = \\frac{5}{1 + 9e^{-5t}}\\)" },
            { step: "Part (b): Solve W(t) = 4", detail: "\\(4 = \\frac{5}{1 + 9e^{-5t}} \\Rightarrow 1 + 9e^{-5t} = \\frac{5}{4} \\Rightarrow 9e^{-5t} = \\frac{1}{4}\\)" },
            { step: "Solve for t", detail: "\\(e^{-5t} = \\frac{1}{36} \\Rightarrow t = \\frac{\\ln 36}{5} = \\frac{2\\ln 6}{5} \\approx 0.717\\)" }
        ],
        answer: "(a) \\(W(t) = \\frac{5}{1 + 9e^{-5t}}\\); (b) \\(t = \\frac{\\ln 36}{5} \\approx 0.717\\) time units"
    },
    {
        id: 39,
        exam: "AB",
        topic: "slope-fields",
        topicLabel: "Slope Fields",
        difficulty: 3,
        problem: "Consider the DE \\(\\frac{dy}{dx} = (y-1)(y-3)\\). (a) Find all equilibrium solutions. (b) Classify each as stable or unstable. (c) If \\(y(0) = 2\\), describe the long-term behavior of the solution.",
        hint: "Equilibria are where \\(dy/dx = 0\\). For stability, check the sign of \\(dy/dx\\) near each equilibrium. A stable equilibrium attracts nearby solutions.",
        solution: [
            { step: "Part (a): Find equilibria", detail: "\\((y-1)(y-3) = 0 \\Rightarrow y = 1\\) and \\(y = 3\\)." },
            { step: "Part (b): Stability analysis", detail: "For \\(y < 1\\): \\((y-1)(y-3) = (+)(+) > 0\\) (wait, both negative, so \\((-)(-)>0\\)). Solutions move away from \\(y=1\\) from below? Let's recheck." },
            { step: "Correct sign analysis", detail: "\\(y < 1\\): \\((neg)(neg) > 0\\), so \\(y\\) increases toward 1. \\(1 < y < 3\\): \\((pos)(neg) < 0\\), so \\(y\\) decreases toward 1. \\(y > 3\\): \\((pos)(pos) > 0\\), so \\(y\\) increases away from 3." },
            { step: "Classification", detail: "\\(y = 1\\) is stable (solutions approach it from both sides). \\(y = 3\\) is unstable (solutions move away from it)." },
            { step: "Part (c): Long-term behavior", detail: "Since \\(y(0) = 2\\) is between 1 and 3, and \\(dy/dx < 0\\) there, \\(y\\) decreases. It approaches \\(y = 1\\) as \\(t \\to \\infty\\)." }
        ],
        answer: "(a) \\(y=1, y=3\\); (b) \\(y=1\\) stable, \\(y=3\\) unstable; (c) \\(y \\to 1\\) as \\(x \\to \\infty\\)"
    },
    {
        id: 40,
        exam: "AB",
        topic: "ivp",
        topicLabel: "Initial Value Problems",
        difficulty: 1,
        problem: "Solve: \\(\\frac{dy}{dx} = \\frac{2}{x}\\), \\(y(1) = 5\\).",
        hint: "This is a direct integration. Remember that \\(\\int \\frac{1}{x}\\,dx = \\ln|x| + C\\).",
        solution: [
            { step: "Integrate", detail: "\\(y = \\int \\frac{2}{x}\\,dx = 2\\ln|x| + C\\)" },
            { step: "Apply IC: y(1) = 5", detail: "\\(5 = 2\\ln 1 + C = 0 + C \\Rightarrow C = 5\\)" },
            { step: "Final answer", detail: "\\(y = 2\\ln|x| + 5\\) (for \\(x > 0\\) given the IC)" }
        ],
        answer: "\\(y = 2\\ln x + 5\\), \\(x > 0\\)"
    },

    // ===== MORE REAL-WORLD APPLIED PROBLEMS =====
    {
        id: 41,
        exam: "AB",
        topic: "modeling",
        topicLabel: "Modeling with DEs",
        difficulty: 3,
        problem: "A 500-liter tank initially contains 100 liters of pure water. Brine with a concentration of 3 g/L flows in at 5 L/min, and the well-mixed solution drains out at 3 L/min. Let \\(A(t)\\) be the amount of salt (in grams) at time \\(t\\). (a) Write the DE for \\(A(t)\\). (b) Solve for \\(A(t)\\). (c) What is the concentration when the tank is full?",
        hint: "Rate in = (concentration in) × (flow rate in) = 15 g/min. Rate out = (A/(100+2t)) × 3. The tank volume at time \\(t\\) is \\(100 + 2t\\) since inflow exceeds outflow by 2 L/min.",
        solution: [
            { step: "Set up the DE", detail: "Rate in = \\(3 \\times 5 = 15\\) g/min. Volume at time \\(t\\): \\(V(t) = 100 + 2t\\). Rate out = \\(\\frac{A}{100+2t} \\times 3 = \\frac{3A}{100+2t}\\). So \\(\\frac{dA}{dt} = 15 - \\frac{3A}{100+2t}\\)." },
            { step: "Rewrite as linear DE", detail: "\\(\\frac{dA}{dt} + \\frac{3}{100+2t}A = 15\\). Integrating factor: \\(\\mu = e^{\\int \\frac{3}{100+2t}dt} = e^{\\frac{3}{2}\\ln(100+2t)} = (100+2t)^{3/2}\\)." },
            { step: "Multiply and integrate", detail: "\\(\\frac{d}{dt}[A(100+2t)^{3/2}] = 15(100+2t)^{3/2}\\). Integrate: \\(A(100+2t)^{3/2} = 15 \\cdot \\frac{(100+2t)^{5/2}}{5} + C = 3(100+2t)^{5/2} + C\\)." },
            { step: "Solve for A", detail: "\\(A(t) = 3(100+2t) + C(100+2t)^{-3/2}\\)." },
            { step: "Apply IC: A(0) = 0", detail: "\\(0 = 3(100) + C(100)^{-3/2} = 300 + C/1000 \\Rightarrow C = -300000\\)." },
            { step: "Part (c): Tank full at t = 200", detail: "Tank is full when \\(100 + 2t = 500\\), so \\(t = 200\\). \\(A(200) = 3(500) - 300000(500)^{-3/2} = 1500 - 300000/11180 \\approx 1473.2\\) g. Concentration = \\(1473.2/500 \\approx 2.95\\) g/L." }
        ],
        answer: "(a) \\(\\frac{dA}{dt} = 15 - \\frac{3A}{100+2t}\\); (b) \\(A(t) = 3(100+2t) - 300000(100+2t)^{-3/2}\\); (c) \\(\\approx 2.95\\) g/L"
    },
    {
        id: 42,
        exam: "AB",
        topic: "modeling",
        topicLabel: "Modeling with DEs",
        difficulty: 2,
        problem: "A cup of coffee at 90°C is placed in a room at 22°C. After 5 minutes, the coffee is at 70°C. Using Newton's Law of Cooling, find (a) the temperature function \\(T(t)\\), and (b) when the coffee reaches 40°C.",
        hint: "Newton's Law of Cooling: \\(\\frac{dT}{dt} = k(T - T_{room})\\). Separate variables and use the two conditions to find \\(k\\).",
        solution: [
            { step: "Write the DE", detail: "\\(\\frac{dT}{dt} = k(T - 22)\\) where \\(k < 0\\)." },
            { step: "Separate and integrate", detail: "\\(\\frac{dT}{T-22} = k\\,dt \\Rightarrow \\ln|T-22| = kt + C \\Rightarrow T - 22 = Ae^{kt}\\)." },
            { step: "Apply IC: T(0) = 90", detail: "\\(90 - 22 = A \\Rightarrow A = 68\\). So \\(T(t) = 22 + 68e^{kt}\\)." },
            { step: "Find k using T(5) = 70", detail: "\\(70 = 22 + 68e^{5k} \\Rightarrow 48 = 68e^{5k} \\Rightarrow e^{5k} = 48/68 = 12/17\\). So \\(k = \\frac{1}{5}\\ln\\frac{12}{17} \\approx -0.0693\\)." },
            { step: "Part (b): Solve T(t) = 40", detail: "\\(40 = 22 + 68e^{kt} \\Rightarrow 18 = 68e^{kt} \\Rightarrow e^{kt} = 18/68 = 9/34\\). \\(t = \\frac{\\ln(9/34)}{k} = \\frac{5\\ln(9/34)}{\\ln(12/17)} \\approx 19.3\\) min." }
        ],
        answer: "(a) \\(T(t) = 22 + 68e^{t\\ln(12/17)/5}\\); (b) \\(t \\approx 19.3\\) minutes"
    },
    {
        id: 43,
        exam: "AB",
        topic: "modeling",
        topicLabel: "Modeling with DEs",
        difficulty: 2,
        problem: "A tank contains 200 gallons of water with 50 lbs of dissolved salt. Pure water flows in at 4 gal/min, and the well-mixed solution flows out at 4 gal/min. Find the amount of salt \\(A(t)\\) at time \\(t\\) and determine when only 10 lbs remain.",
        hint: "Since inflow = outflow = 4 gal/min, volume stays constant at 200 gal. Rate in = 0 (pure water). Rate out = \\(\\frac{A}{200} \\times 4\\).",
        solution: [
            { step: "Write the DE", detail: "\\(\\frac{dA}{dt} = 0 - \\frac{4A}{200} = -\\frac{A}{50}\\)." },
            { step: "Recognize exponential decay", detail: "This is \\(\\frac{dA}{dt} = -\\frac{1}{50}A\\), so \\(A(t) = A_0 e^{-t/50}\\)." },
            { step: "Apply IC: A(0) = 50", detail: "\\(A(t) = 50e^{-t/50}\\)." },
            { step: "Find when A = 10", detail: "\\(10 = 50e^{-t/50} \\Rightarrow e^{-t/50} = 1/5 \\Rightarrow -t/50 = \\ln(1/5) \\Rightarrow t = 50\\ln 5 \\approx 80.5\\) min." }
        ],
        answer: "\\(A(t) = 50e^{-t/50}\\); salt reaches 10 lbs at \\(t = 50\\ln 5 \\approx 80.5\\) minutes"
    },
    {
        id: 44,
        exam: "AB",
        topic: "separable",
        topicLabel: "Separable DEs",
        difficulty: 3,
        problem: "A snowplow starts plowing at noon. Snow began falling at a constant rate earlier that morning. The plow moves at a speed inversely proportional to the depth of snow. If the plow goes 4 miles in the first hour and 3 miles in the second hour, at what time did it start snowing?",
        hint: "Let \\(t = 0\\) be when snow started. If snow falls at rate \\(r\\), depth at time \\(t\\) is \\(rt\\). Speed = \\(k/(rt)\\). Let noon = time \\(t_0\\). Set up \\(dx/dt = k/(rt)\\) and use the two distance conditions.",
        solution: [
            { step: "Set up variables", detail: "Let \\(t = 0\\) be when snow started, noon = \\(t_0\\). Snow depth at time \\(t\\): \\(h = rt\\). Speed: \\(dx/dt = k/(rt) = c/t\\) where \\(c = k/r\\)." },
            { step: "Integrate for distance", detail: "First hour: \\(4 = \\int_{t_0}^{t_0+1} \\frac{c}{t}\\,dt = c\\ln\\frac{t_0+1}{t_0}\\). Second hour: \\(3 = c\\ln\\frac{t_0+2}{t_0+1}\\)." },
            { step: "Divide equations", detail: "\\(\\frac{4}{3} = \\frac{\\ln\\frac{t_0+1}{t_0}}{\\ln\\frac{t_0+2}{t_0+1}}\\)." },
            { step: "Solve numerically", detail: "Let \\(u = t_0\\). We need \\(4\\ln\\frac{u+2}{u+1} = 3\\ln\\frac{u+1}{u}\\). Testing \\(u \\approx 0.618\\) (the golden ratio minus 1) gives a good approximation. More precisely, \\(t_0 \\approx 0.618\\) hours." },
            { step: "Convert to time", detail: "\\(0.618\\) hours \\(\\approx 37\\) minutes before noon. Snow started at approximately 11:23 AM." }
        ],
        answer: "Snow started at approximately 11:23 AM (about 37 minutes before noon)"
    },
    {
        id: 45,
        exam: "AB",
        topic: "exponential",
        topicLabel: "Exponential Growth/Decay",
        difficulty: 2,
        problem: "A thermometer reading 72°F is taken outside where the temperature is 20°F. After 1 minute, the thermometer reads 48°F. (a) Find the reading at \\(t = 2\\) minutes. (b) How long until it reads 25°F?",
        hint: "Apply Newton's Law of Cooling with \\(T_{env} = 20\\). The DE is \\(dT/dt = k(T - 20)\\).",
        solution: [
            { step: "Write and solve the DE", detail: "\\(T(t) = 20 + (72-20)e^{kt} = 20 + 52e^{kt}\\)." },
            { step: "Find k using T(1) = 48", detail: "\\(48 = 20 + 52e^{k} \\Rightarrow 28 = 52e^k \\Rightarrow e^k = 7/13\\). So \\(k = \\ln(7/13) \\approx -0.619\\)." },
            { step: "Part (a): T(2)", detail: "\\(T(2) = 20 + 52(7/13)^2 = 20 + 52(49/169) = 20 + 2548/169 \\approx 35.1\\)°F." },
            { step: "Part (b): Solve T(t) = 25", detail: "\\(25 = 20 + 52e^{kt} \\Rightarrow 5 = 52e^{kt} \\Rightarrow e^{kt} = 5/52\\). \\(t = \\frac{\\ln(5/52)}{\\ln(7/13)} \\approx 3.8\\) min." }
        ],
        answer: "(a) \\(T(2) \\approx 35.1\\)°F; (b) \\(t \\approx 3.8\\) minutes"
    },
    {
        id: 46,
        exam: "BC",
        topic: "eulers",
        topicLabel: "Euler's Method",
        difficulty: 2,
        problem: "A tank initially holds 100 gallons of water. Water leaks out at a rate of \\(\\sqrt{V}\\) gallons per minute. Using Euler's method with \\(h = 10\\) minutes, approximate the volume at \\(t = 30\\) minutes. (The DE is \\(dV/dt = -\\sqrt{V}\\), \\(V(0) = 100\\).)",
        hint: "Apply \\(V_{n+1} = V_n + h \\cdot f(t_n, V_n)\\) three times with \\(h = 10\\) and \\(f(t,V) = -\\sqrt{V}\\).",
        solution: [
            { step: "Step 1: t = 0 to t = 10", detail: "\\(V_1 = 100 + 10(-\\sqrt{100}) = 100 - 100 = 0\\). Wait — that gives 0 already!" },
            { step: "Re-examine with smaller steps", detail: "Actually with \\(h = 10\\): \\(V_1 = 100 + 10(-10) = 0\\). This shows Euler's method can overshoot. The exact solution gives \\(V(10) = (10 - 5)^2 = 25\\) (from \\(V = (\\sqrt{V_0} - t/2)^2\\))." },
            { step: "Euler with h = 10 gives V(10) = 0", detail: "\\(V_1 = 0\\), so \\(V_2 = 0 + 10(-\\sqrt{0}) = 0\\), \\(V_3 = 0\\)." },
            { step: "Compare with exact", detail: "Exact: \\(2\\sqrt{V} = -t + 20\\), so \\(V(t) = (10 - t/2)^2\\). \\(V(30)\\) would require \\(10 - 15 < 0\\), meaning the tank empties at \\(t = 20\\). Euler's large step size gives a poor approximation." }
        ],
        answer: "Euler approximation: \\(V(30) \\approx 0\\) gal. (Exact: tank empties at \\(t = 20\\) min; Euler overshoots due to large step size)"
    },
    {
        id: 47,
        exam: "AB",
        topic: "ivp",
        topicLabel: "Initial Value Problems",
        difficulty: 2,
        problem: "A population of bacteria doubles every 3 hours. Initially there are 500 bacteria. (a) Write and solve the IVP. (b) How many bacteria are there after 8 hours? (c) When does the population reach 10,000?",
        hint: "Exponential growth: \\(dP/dt = kP\\). Use the doubling condition to find \\(k\\): \\(P(3) = 1000\\).",
        solution: [
            { step: "Write the IVP", detail: "\\(\\frac{dP}{dt} = kP\\), \\(P(0) = 500\\). Solution: \\(P(t) = 500e^{kt}\\)." },
            { step: "Find k from doubling", detail: "\\(1000 = 500e^{3k} \\Rightarrow 2 = e^{3k} \\Rightarrow k = \\frac{\\ln 2}{3}\\)." },
            { step: "Part (a): Solution", detail: "\\(P(t) = 500e^{(\\ln 2/3)t} = 500 \\cdot 2^{t/3}\\)." },
            { step: "Part (b): P(8)", detail: "\\(P(8) = 500 \\cdot 2^{8/3} = 500 \\cdot 2^{2.667} \\approx 500 \\cdot 6.35 \\approx 3175\\)." },
            { step: "Part (c): Solve P(t) = 10000", detail: "\\(10000 = 500 \\cdot 2^{t/3} \\Rightarrow 20 = 2^{t/3} \\Rightarrow t/3 = \\log_2 20 = \\frac{\\ln 20}{\\ln 2} \\approx 4.32\\). So \\(t \\approx 12.97\\) hours." }
        ],
        answer: "(a) \\(P(t) = 500 \\cdot 2^{t/3}\\); (b) \\(\\approx 3175\\) bacteria; (c) \\(t \\approx 13\\) hours"
    },
    {
        id: 48,
        exam: "AB",
        topic: "modeling",
        topicLabel: "Modeling with DEs",
        difficulty: 2,
        problem: "A water tank has the shape of an inverted cone with radius 3 m and height 6 m. Water drains from a hole at the bottom at a rate proportional to \\(\\sqrt{h}\\), where \\(h\\) is the water depth. If the tank is initially full and the depth drops from 6 m to 4 m in 2 hours, write and solve the DE for \\(h(t)\\).",
        hint: "The volume of water in a cone: \\(V = \\frac{1}{3}\\pi r^2 h\\). By similar triangles, \\(r = h/2\\). So \\(V = \\frac{\\pi h^3}{12}\\). Differentiate to relate \\(dV/dt\\) to \\(dh/dt\\).",
        solution: [
            { step: "Express volume in terms of h", detail: "By similar triangles: \\(r/h = 3/6 = 1/2\\), so \\(r = h/2\\). Volume: \\(V = \\frac{1}{3}\\pi(h/2)^2 h = \\frac{\\pi h^3}{12}\\)." },
            { step: "Differentiate", detail: "\\(\\frac{dV}{dt} = \\frac{\\pi h^2}{4}\\frac{dh}{dt}\\). Given \\(dV/dt = -c\\sqrt{h}\\), we get \\(\\frac{\\pi h^2}{4}\\frac{dh}{dt} = -c\\sqrt{h}\\)." },
            { step: "Simplify", detail: "\\(\\frac{dh}{dt} = \\frac{-4c}{\\pi h^{3/2}}\\). Let \\(K = 4c/\\pi\\): \\(\\frac{dh}{dt} = -K h^{-3/2}\\)." },
            { step: "Separate and integrate", detail: "\\(h^{3/2}\\,dh = -K\\,dt \\Rightarrow \\frac{2}{5}h^{5/2} = -Kt + C\\)." },
            { step: "Apply conditions", detail: "\\(h(0) = 6\\): \\(C = \\frac{2}{5}(6)^{5/2} = \\frac{2}{5} \\cdot 6^{5/2}\\). \\(h(2) = 4\\): \\(\\frac{2}{5}(4)^{5/2} = -2K + \\frac{2}{5}(6)^{5/2}\\). Solve for \\(K\\)." },
            { step: "Compute K", detail: "\\(K = \\frac{1}{5}[(6)^{5/2} - (4)^{5/2}] = \\frac{1}{5}[6^2\\sqrt{6} - 4^2\\sqrt{4}] = \\frac{1}{5}[36\\sqrt{6} - 32] \\approx \\frac{1}{5}[88.18 - 32] = 11.24\\)." }
        ],
        answer: "\\(h(t)\\) satisfies \\(\\frac{2}{5}h^{5/2} = \\frac{2}{5}(6)^{5/2} - Kt\\) where \\(K = \\frac{(6)^{5/2} - (4)^{5/2}}{5}\\)"
    },
    {
        id: 49,
        exam: "BC",
        topic: "logistic",
        topicLabel: "Logistic Growth",
        difficulty: 2,
        problem: "A lake can support at most 2000 fish. The fish population grows logistically with \\(k = 0.3\\). Initially there are 200 fish. (a) Write the logistic DE and its solution. (b) When does the population reach 1000? (c) At what population is the growth rate fastest?",
        hint: "Logistic DE: \\(dP/dt = 0.3P(1 - P/2000)\\). Use the standard logistic solution with \\(L = 2000\\), \\(P_0 = 200\\).",
        solution: [
            { step: "Write the DE", detail: "\\(\\frac{dP}{dt} = 0.3P\\left(1 - \\frac{P}{2000}\\right)\\)." },
            { step: "Find A and write solution", detail: "\\(A = \\frac{L - P_0}{P_0} = \\frac{2000 - 200}{200} = 9\\). Solution: \\(P(t) = \\frac{2000}{1 + 9e^{-0.3t}}\\)." },
            { step: "Part (b): Solve P(t) = 1000", detail: "\\(1000 = \\frac{2000}{1 + 9e^{-0.3t}} \\Rightarrow 1 + 9e^{-0.3t} = 2 \\Rightarrow 9e^{-0.3t} = 1 \\Rightarrow e^{-0.3t} = 1/9\\). \\(t = \\frac{\\ln 9}{0.3} = \\frac{2\\ln 3}{0.3} \\approx 7.32\\)." },
            { step: "Part (c): Maximum growth rate", detail: "Maximum growth occurs at \\(P = L/2 = 1000\\) fish. At this point, \\(dP/dt = 0.3(1000)(1 - 1000/2000) = 0.3(1000)(0.5) = 150\\) fish/time unit." }
        ],
        answer: "(a) \\(P(t) = \\frac{2000}{1 + 9e^{-0.3t}}\\); (b) \\(t = \\frac{\\ln 9}{0.3} \\approx 7.3\\); (c) At \\(P = 1000\\), rate = 150 fish/unit time"
    },
    {
        id: 50,
        exam: "AB",
        topic: "separable",
        topicLabel: "Separable DEs",
        difficulty: 2,
        problem: "A spherical raindrop evaporates at a rate proportional to its surface area. If the initial radius is 3 mm and it takes 1 hour for the radius to shrink to 2 mm, find \\(r(t)\\) and determine when the raindrop completely evaporates.",
        hint: "Volume \\(V = \\frac{4}{3}\\pi r^3\\), surface area \\(S = 4\\pi r^2\\). Since \\(dV/dt = -kS\\), use the chain rule to get a DE for \\(r(t)\\).",
        solution: [
            { step: "Set up the DE", detail: "\\(\\frac{dV}{dt} = -k \\cdot 4\\pi r^2\\). Since \\(V = \\frac{4}{3}\\pi r^3\\), \\(\\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt}\\). So \\(4\\pi r^2 \\frac{dr}{dt} = -4k\\pi r^2\\)." },
            { step: "Simplify", detail: "\\(\\frac{dr}{dt} = -k\\). The radius decreases at a constant rate!" },
            { step: "Solve", detail: "\\(r(t) = r_0 - kt = 3 - kt\\)." },
            { step: "Find k using r(1) = 2", detail: "\\(2 = 3 - k(1) \\Rightarrow k = 1\\) mm/hr." },
            { step: "Find evaporation time", detail: "\\(r(t) = 0\\) when \\(3 - t = 0 \\Rightarrow t = 3\\) hours." }
        ],
        answer: "\\(r(t) = 3 - t\\) mm; raindrop evaporates completely at \\(t = 3\\) hours"
    },
    // ===== U-SUBSTITUTION =====
    {
        id: 51,
        exam: "AB",
        topic: "u-sub",
        topicLabel: "U-Substitution",
        difficulty: 1,
        problem: "Evaluate \\(\\int 2x\\cos(x^2)\\,dx\\).",
        hint: "Let \\(u = x^2\\). Then \\(du = 2x\\,dx\\), which matches the integrand perfectly.",
        solution: [
            { step: "Choose substitution", detail: "Let \\(u = x^2\\), so \\(du = 2x\\,dx\\)" },
            { step: "Rewrite the integral", detail: "\\(\\int \\cos(u)\\,du\\)" },
            { step: "Integrate", detail: "\\(\\sin(u) + C\\)" },
            { step: "Back-substitute", detail: "\\(\\sin(x^2) + C\\)" }
        ],
        answer: "\\(\\sin(x^2) + C\\)"
    },
    {
        id: 52,
        exam: "AB",
        topic: "u-sub",
        topicLabel: "U-Substitution",
        difficulty: 1,
        problem: "Evaluate \\(\\int \\frac{3x^2}{x^3 + 5}\\,dx\\).",
        hint: "The numerator \\(3x^2\\) is the derivative of the denominator \\(x^3 + 5\\). Let \\(u = x^3 + 5\\).",
        solution: [
            { step: "Choose substitution", detail: "Let \\(u = x^3 + 5\\), so \\(du = 3x^2\\,dx\\)" },
            { step: "Rewrite the integral", detail: "\\(\\int \\frac{1}{u}\\,du\\)" },
            { step: "Integrate", detail: "\\(\\ln|u| + C\\)" },
            { step: "Back-substitute", detail: "\\(\\ln|x^3 + 5| + C\\)" }
        ],
        answer: "\\(\\ln|x^3 + 5| + C\\)"
    },
    {
        id: 53,
        exam: "AB",
        topic: "u-sub",
        topicLabel: "U-Substitution",
        difficulty: 2,
        problem: "Evaluate \\(\\int x\\sqrt{1 - x^2}\\,dx\\).",
        hint: "Let \\(u = 1 - x^2\\). Then \\(du = -2x\\,dx\\), so \\(x\\,dx = -\\frac{1}{2}\\,du\\).",
        solution: [
            { step: "Choose substitution", detail: "Let \\(u = 1 - x^2\\), so \\(du = -2x\\,dx\\), meaning \\(x\\,dx = -\\frac{1}{2}\\,du\\)" },
            { step: "Rewrite the integral", detail: "\\(-\\frac{1}{2}\\int u^{1/2}\\,du\\)" },
            { step: "Integrate", detail: "\\(-\\frac{1}{2} \\cdot \\frac{2}{3}u^{3/2} + C = -\\frac{1}{3}u^{3/2} + C\\)" },
            { step: "Back-substitute", detail: "\\(-\\frac{1}{3}(1 - x^2)^{3/2} + C\\)" }
        ],
        answer: "\\(-\\frac{1}{3}(1 - x^2)^{3/2} + C\\)"
    },
    {
        id: 54,
        exam: "AB",
        topic: "u-sub",
        topicLabel: "U-Substitution",
        difficulty: 2,
        problem: "Evaluate \\(\\int_0^1 x e^{x^2}\\,dx\\).",
        hint: "Let \\(u = x^2\\). Don't forget to change the limits of integration.",
        solution: [
            { step: "Choose substitution", detail: "Let \\(u = x^2\\), so \\(du = 2x\\,dx\\), meaning \\(x\\,dx = \\frac{1}{2}\\,du\\)" },
            { step: "Change limits", detail: "When \\(x = 0\\): \\(u = 0\\). When \\(x = 1\\): \\(u = 1\\)" },
            { step: "Rewrite the integral", detail: "\\(\\frac{1}{2}\\int_0^1 e^u\\,du\\)" },
            { step: "Integrate", detail: "\\(\\frac{1}{2}[e^u]_0^1 = \\frac{1}{2}(e - 1)\\)" }
        ],
        answer: "\\(\\frac{e - 1}{2}\\)"
    },
    {
        id: 55,
        exam: "AB",
        topic: "u-sub",
        topicLabel: "U-Substitution",
        difficulty: 2,
        problem: "Evaluate \\(\\int \\tan(x)\\,dx\\).",
        hint: "Write \\(\\tan(x) = \\frac{\\sin(x)}{\\cos(x)}\\) and let \\(u = \\cos(x)\\).",
        solution: [
            { step: "Rewrite", detail: "\\(\\int \\frac{\\sin(x)}{\\cos(x)}\\,dx\\)" },
            { step: "Choose substitution", detail: "Let \\(u = \\cos(x)\\), so \\(du = -\\sin(x)\\,dx\\)" },
            { step: "Rewrite the integral", detail: "\\(-\\int \\frac{1}{u}\\,du\\)" },
            { step: "Integrate", detail: "\\(-\\ln|u| + C = -\\ln|\\cos(x)| + C\\)" },
            { step: "Simplify", detail: "\\(\\ln|\\sec(x)| + C\\)" }
        ],
        answer: "\\(\\ln|\\sec(x)| + C\\)"
    },
    {
        id: 56,
        exam: "AB",
        topic: "u-sub",
        topicLabel: "U-Substitution",
        difficulty: 3,
        problem: "Evaluate \\(\\int \\frac{e^{\\sqrt{x}}}{\\sqrt{x}}\\,dx\\).",
        hint: "Let \\(u = \\sqrt{x}\\). Then \\(du = \\frac{1}{2\\sqrt{x}}\\,dx\\).",
        solution: [
            { step: "Choose substitution", detail: "Let \\(u = \\sqrt{x}\\), so \\(du = \\frac{1}{2\\sqrt{x}}\\,dx\\), meaning \\(\\frac{1}{\\sqrt{x}}\\,dx = 2\\,du\\)" },
            { step: "Rewrite the integral", detail: "\\(2\\int e^u\\,du\\)" },
            { step: "Integrate", detail: "\\(2e^u + C\\)" },
            { step: "Back-substitute", detail: "\\(2e^{\\sqrt{x}} + C\\)" }
        ],
        answer: "\\(2e^{\\sqrt{x}} + C\\)"
    },
    {
        id: 57,
        exam: "AB",
        topic: "u-sub",
        topicLabel: "U-Substitution",
        difficulty: 3,
        problem: "Evaluate \\(\\int \\frac{(\\ln x)^2}{x}\\,dx\\).",
        hint: "Let \\(u = \\ln(x)\\). Then \\(du = \\frac{1}{x}\\,dx\\), which appears in the integrand.",
        solution: [
            { step: "Choose substitution", detail: "Let \\(u = \\ln(x)\\), so \\(du = \\frac{1}{x}\\,dx\\)" },
            { step: "Rewrite the integral", detail: "\\(\\int u^2\\,du\\)" },
            { step: "Integrate", detail: "\\(\\frac{u^3}{3} + C\\)" },
            { step: "Back-substitute", detail: "\\(\\frac{(\\ln x)^3}{3} + C\\)" }
        ],
        answer: "\\(\\frac{(\\ln x)^3}{3} + C\\)"
    },
    // ===== INTEGRATION BY PARTS =====
    {
        id: 58,
        exam: "BC",
        topic: "by-parts",
        topicLabel: "Integration by Parts",
        difficulty: 1,
        problem: "Evaluate \\(\\int x e^x\\,dx\\).",
        hint: "Use integration by parts with \\(u = x\\) and \\(dv = e^x\\,dx\\). Remember: LIATE helps you pick \\(u\\).",
        solution: [
            { step: "Choose u and dv", detail: "Let \\(u = x \\Rightarrow du = dx\\). Let \\(dv = e^x\\,dx \\Rightarrow v = e^x\\)" },
            { step: "Apply IBP formula", detail: "\\(\\int u\\,dv = uv - \\int v\\,du\\)" },
            { step: "Substitute", detail: "\\(xe^x - \\int e^x\\,dx\\)" },
            { step: "Integrate", detail: "\\(xe^x - e^x + C = e^x(x - 1) + C\\)" }
        ],
        answer: "\\(e^x(x - 1) + C\\)"
    },
    {
        id: 59,
        exam: "BC",
        topic: "by-parts",
        topicLabel: "Integration by Parts",
        difficulty: 1,
        problem: "Evaluate \\(\\int x\\cos(x)\\,dx\\).",
        hint: "Let \\(u = x\\) (algebraic) and \\(dv = \\cos(x)\\,dx\\) (trig). Apply the IBP formula.",
        solution: [
            { step: "Choose u and dv", detail: "Let \\(u = x \\Rightarrow du = dx\\). Let \\(dv = \\cos(x)\\,dx \\Rightarrow v = \\sin(x)\\)" },
            { step: "Apply IBP formula", detail: "\\(x\\sin(x) - \\int \\sin(x)\\,dx\\)" },
            { step: "Integrate the remaining term", detail: "\\(x\\sin(x) - (-\\cos(x)) + C\\)" },
            { step: "Simplify", detail: "\\(x\\sin(x) + \\cos(x) + C\\)" }
        ],
        answer: "\\(x\\sin(x) + \\cos(x) + C\\)"
    },
    {
        id: 60,
        exam: "BC",
        topic: "by-parts",
        topicLabel: "Integration by Parts",
        difficulty: 2,
        problem: "Evaluate \\(\\int x^2 e^x\\,dx\\).",
        hint: "You'll need to apply integration by parts twice (tabular method works well here). Start with \\(u = x^2\\), \\(dv = e^x\\,dx\\).",
        solution: [
            { step: "First IBP", detail: "\\(u = x^2,\\; du = 2x\\,dx,\\; dv = e^x\\,dx,\\; v = e^x\\)" },
            { step: "Apply formula", detail: "\\(x^2 e^x - \\int 2x e^x\\,dx\\)" },
            { step: "Second IBP on remaining integral", detail: "\\(\\int 2x e^x\\,dx\\): let \\(u = 2x,\\; dv = e^x\\,dx\\). Get \\(2xe^x - 2e^x\\)" },
            { step: "Combine", detail: "\\(x^2 e^x - (2xe^x - 2e^x) + C\\)" },
            { step: "Simplify", detail: "\\(e^x(x^2 - 2x + 2) + C\\)" }
        ],
        answer: "\\(e^x(x^2 - 2x + 2) + C\\)"
    },
    {
        id: 61,
        exam: "BC",
        topic: "by-parts",
        topicLabel: "Integration by Parts",
        difficulty: 2,
        problem: "Evaluate \\(\\int \\ln(x)\\,dx\\).",
        hint: "This is a classic IBP problem. Let \\(u = \\ln(x)\\) and \\(dv = dx\\). Yes, \\(dv\\) can just be \\(dx\\).",
        solution: [
            { step: "Choose u and dv", detail: "Let \\(u = \\ln(x) \\Rightarrow du = \\frac{1}{x}\\,dx\\). Let \\(dv = dx \\Rightarrow v = x\\)" },
            { step: "Apply IBP formula", detail: "\\(x\\ln(x) - \\int x \\cdot \\frac{1}{x}\\,dx\\)" },
            { step: "Simplify and integrate", detail: "\\(x\\ln(x) - \\int 1\\,dx = x\\ln(x) - x + C\\)" }
        ],
        answer: "\\(x\\ln(x) - x + C\\)"
    },
    {
        id: 62,
        exam: "BC",
        topic: "by-parts",
        topicLabel: "Integration by Parts",
        difficulty: 2,
        problem: "Evaluate \\(\\int e^x \\sin(x)\\,dx\\).",
        hint: "Apply IBP twice, then solve for the original integral algebraically. The integral will reappear on the right side.",
        solution: [
            { step: "First IBP", detail: "\\(u = \\sin(x),\\; du = \\cos(x)\\,dx,\\; dv = e^x\\,dx,\\; v = e^x\\)" },
            { step: "Apply formula", detail: "\\(e^x\\sin(x) - \\int e^x\\cos(x)\\,dx\\)" },
            { step: "Second IBP on the new integral", detail: "\\(u = \\cos(x),\\; du = -\\sin(x)\\,dx,\\; dv = e^x\\,dx,\\; v = e^x\\)" },
            { step: "Apply formula again", detail: "\\(e^x\\sin(x) - [e^x\\cos(x) + \\int e^x\\sin(x)\\,dx]\\)" },
            { step: "Let I = original integral", detail: "\\(I = e^x\\sin(x) - e^x\\cos(x) - I\\)" },
            { step: "Solve for I", detail: "\\(2I = e^x(\\sin x - \\cos x)\\), so \\(I = \\frac{e^x(\\sin x - \\cos x)}{2} + C\\)" }
        ],
        answer: "\\(\\frac{e^x(\\sin x - \\cos x)}{2} + C\\)"
    },
    {
        id: 63,
        exam: "BC",
        topic: "by-parts",
        topicLabel: "Integration by Parts",
        difficulty: 3,
        problem: "Evaluate \\(\\int_0^1 x^2 \\ln(x)\\,dx\\).",
        hint: "Let \\(u = \\ln(x)\\) and \\(dv = x^2\\,dx\\). Be careful with the limit as \\(x \\to 0^+\\) since \\(\\ln(0)\\) is undefined.",
        solution: [
            { step: "Choose u and dv", detail: "\\(u = \\ln(x) \\Rightarrow du = \\frac{1}{x}\\,dx\\). \\(dv = x^2\\,dx \\Rightarrow v = \\frac{x^3}{3}\\)" },
            { step: "Apply IBP formula", detail: "\\(\\left[\\frac{x^3}{3}\\ln(x)\\right]_0^1 - \\int_0^1 \\frac{x^3}{3} \\cdot \\frac{1}{x}\\,dx\\)" },
            { step: "Evaluate boundary term", detail: "At \\(x=1\\): \\(\\frac{1}{3}\\ln(1) = 0\\). At \\(x=0\\): \\(\\lim_{x\\to 0^+} \\frac{x^3}{3}\\ln(x) = 0\\) (by L'Hôpital)" },
            { step: "Evaluate remaining integral", detail: "\\(-\\frac{1}{3}\\int_0^1 x^2\\,dx = -\\frac{1}{3} \\cdot \\frac{1}{3} = -\\frac{1}{9}\\)" }
        ],
        answer: "\\(-\\frac{1}{9}\\)"
    },
    {
        id: 64,
        exam: "BC",
        topic: "by-parts",
        topicLabel: "Integration by Parts",
        difficulty: 3,
        problem: "Evaluate \\(\\int x^3 e^{x^2}\\,dx\\).",
        hint: "First rewrite as \\(\\int x^2 \\cdot x e^{x^2}\\,dx\\). Use substitution \\(t = x^2\\) first, then apply integration by parts.",
        solution: [
            { step: "Substitution first", detail: "Let \\(t = x^2\\), so \\(dt = 2x\\,dx\\) and \\(x^2 = t\\). Then \\(x^3 e^{x^2}\\,dx = x^2 \\cdot e^{x^2} \\cdot x\\,dx = t \\cdot e^t \\cdot \\frac{dt}{2}\\)" },
            { step: "Rewrite", detail: "\\(\\frac{1}{2}\\int t e^t\\,dt\\)" },
            { step: "IBP on te^t", detail: "\\(u = t,\\; dv = e^t\\,dt \\Rightarrow te^t - e^t + C\\)" },
            { step: "Combine", detail: "\\(\\frac{1}{2}(te^t - e^t) + C = \\frac{1}{2}e^t(t - 1) + C\\)" },
            { step: "Back-substitute", detail: "\\(\\frac{1}{2}e^{x^2}(x^2 - 1) + C\\)" }
        ],
        answer: "\\(\\frac{1}{2}e^{x^2}(x^2 - 1) + C\\)"
    },

    // ===== PARAMETRIC EQUATIONS =====
    {
        id: 65,
        exam: "BC",
        topic: "parametric",
        topicLabel: "Parametric Equations",
        difficulty: 1,
        problem: "A curve is defined by \\(x = t^2 + 1\\) and \\(y = 2t - 3\\). Find \\(\\frac{dy}{dx}\\).",
        hint: "Use the chain rule: \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}\\).",
        solution: [
            { step: "Find dy/dt", detail: "\\(\\frac{dy}{dt} = 2\\)" },
            { step: "Find dx/dt", detail: "\\(\\frac{dx}{dt} = 2t\\)" },
            { step: "Apply formula", detail: "\\(\\frac{dy}{dx} = \\frac{2}{2t} = \\frac{1}{t}\\)" }
        ],
        answer: "\\(\\frac{1}{t}\\)"
    },
    {
        id: 66,
        exam: "BC",
        topic: "parametric",
        topicLabel: "Parametric Equations",
        difficulty: 2,
        problem: "A particle moves along a curve defined by \\(x = \\cos(t)\\), \\(y = \\sin(2t)\\). Find \\(\\frac{dy}{dx}\\) at \\(t = \\frac{\\pi}{4}\\).",
        hint: "Find \\(\\frac{dy}{dt}\\) and \\(\\frac{dx}{dt}\\) separately, then divide. Evaluate at \\(t = \\pi/4\\).",
        solution: [
            { step: "Find derivatives", detail: "\\(\\frac{dx}{dt} = -\\sin(t),\\quad \\frac{dy}{dt} = 2\\cos(2t)\\)" },
            { step: "Form dy/dx", detail: "\\(\\frac{dy}{dx} = \\frac{2\\cos(2t)}{-\\sin(t)}\\)" },
            { step: "Evaluate at t = pi/4", detail: "\\(\\frac{2\\cos(\\pi/2)}{-\\sin(\\pi/4)} = \\frac{2(0)}{-\\frac{\\sqrt{2}}{2}} = 0\\)" }
        ],
        answer: "\\(0\\)"
    },
    {
        id: 67,
        exam: "BC",
        topic: "parametric",
        topicLabel: "Parametric Equations",
        difficulty: 2,
        problem: "Find the speed of a particle at \\(t = 1\\) if \\(x(t) = t^3 - t\\) and \\(y(t) = 2t^2 + 1\\).",
        hint: "Speed = \\(\\sqrt{\\left(\\frac{dx}{dt}\\right)^2 + \\left(\\frac{dy}{dt}\\right)^2}\\). Evaluate at \\(t = 1\\).",
        solution: [
            { step: "Find dx/dt and dy/dt", detail: "\\(\\frac{dx}{dt} = 3t^2 - 1,\\quad \\frac{dy}{dt} = 4t\\)" },
            { step: "Evaluate at t = 1", detail: "\\(\\frac{dx}{dt}\\big|_{t=1} = 2,\\quad \\frac{dy}{dt}\\big|_{t=1} = 4\\)" },
            { step: "Compute speed", detail: "\\(\\text{speed} = \\sqrt{2^2 + 4^2} = \\sqrt{4 + 16} = \\sqrt{20} = 2\\sqrt{5}\\)" }
        ],
        answer: "\\(2\\sqrt{5}\\)"
    },
    {
        id: 68,
        exam: "BC",
        topic: "parametric",
        topicLabel: "Parametric Equations",
        difficulty: 3,
        problem: "Find \\(\\frac{d^2y}{dx^2}\\) for the curve \\(x = e^t\\), \\(y = te^t\\).",
        hint: "Use \\(\\frac{d^2y}{dx^2} = \\frac{\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right)}{\\frac{dx}{dt}}\\). First find \\(\\frac{dy}{dx}\\), then differentiate with respect to \\(t\\).",
        solution: [
            { step: "Find dy/dx", detail: "\\(\\frac{dy}{dt} = e^t + te^t = e^t(1+t),\\quad \\frac{dx}{dt} = e^t\\). So \\(\\frac{dy}{dx} = \\frac{e^t(1+t)}{e^t} = 1 + t\\)" },
            { step: "Differentiate dy/dx w.r.t. t", detail: "\\(\\frac{d}{dt}\\left(1 + t\\right) = 1\\)" },
            { step: "Divide by dx/dt", detail: "\\(\\frac{d^2y}{dx^2} = \\frac{1}{e^t}\\)" }
        ],
        answer: "\\(e^{-t}\\)"
    },
    {
        id: 69,
        exam: "BC",
        topic: "parametric",
        topicLabel: "Parametric Equations",
        difficulty: 3,
        problem: "Find the arc length of the curve \\(x = t^2\\), \\(y = \\frac{2}{3}t^3\\) from \\(t = 0\\) to \\(t = 2\\).",
        hint: "Arc length = \\(\\int_0^2 \\sqrt{\\left(\\frac{dx}{dt}\\right)^2 + \\left(\\frac{dy}{dt}\\right)^2}\\,dt\\). Factor the expression under the radical.",
        solution: [
            { step: "Find derivatives", detail: "\\(\\frac{dx}{dt} = 2t,\\quad \\frac{dy}{dt} = 2t^2\\)" },
            { step: "Set up integrand", detail: "\\(\\sqrt{(2t)^2 + (2t^2)^2} = \\sqrt{4t^2 + 4t^4} = 2t\\sqrt{1 + t^2}\\)" },
            { step: "Integrate", detail: "\\(\\int_0^2 2t\\sqrt{1+t^2}\\,dt\\). Let \\(u = 1 + t^2\\), \\(du = 2t\\,dt\\). Bounds: \\(u(0)=1,\; u(2)=5\\)" },
            { step: "Evaluate", detail: "\\(\\int_1^5 \\sqrt{u}\\,du = \\frac{2}{3}u^{3/2}\\Big|_1^5 = \\frac{2}{3}(5\\sqrt{5} - 1)\\)" }
        ],
        answer: "\\(\\frac{2}{3}(5\\sqrt{5} - 1)\\)"
    },
    {
        id: 70,
        exam: "BC",
        topic: "parametric",
        topicLabel: "Parametric Equations",
        difficulty: 2,
        problem: "Find the equation of the tangent line to the curve \\(x = t + \\sin(t)\\), \\(y = t - \\cos(t)\\) at \\(t = 0\\).",
        hint: "Find the point \\((x(0), y(0))\\) and the slope \\(\\frac{dy}{dx}\\big|_{t=0}\\), then use point-slope form.",
        solution: [
            { step: "Find the point", detail: "\\(x(0) = 0 + \\sin(0) = 0,\\quad y(0) = 0 - \\cos(0) = -1\\). Point: \\((0, -1)\\)" },
            { step: "Find dy/dx", detail: "\\(\\frac{dx}{dt} = 1 + \\cos(t),\\quad \\frac{dy}{dt} = 1 + \\sin(t)\\). At \\(t=0\\): \\(\\frac{dy}{dx} = \\frac{1+0}{1+1} = \\frac{1}{2}\\)" },
            { step: "Write tangent line", detail: "\\(y - (-1) = \\frac{1}{2}(x - 0) \\Rightarrow y = \\frac{1}{2}x - 1\\)" }
        ],
        answer: "\\(y = \\frac{1}{2}x - 1\\)"
    },
    {
        id: 71,
        exam: "BC",
        topic: "parametric",
        topicLabel: "Parametric Equations",
        difficulty: 1,
        problem: "A particle moves along a path where \\(x(t) = 3t\\) and \\(y(t) = 4t\\) for \\(0 \\le t \\le 5\\). Find the total distance traveled.",
        hint: "Distance = \\(\\int_0^5 \\sqrt{(x')^2 + (y')^2}\\,dt\\). This is a straight-line motion.",
        solution: [
            { step: "Find derivatives", detail: "\\(x'(t) = 3,\\quad y'(t) = 4\\)" },
            { step: "Compute speed", detail: "\\(\\sqrt{9 + 16} = \\sqrt{25} = 5\\)" },
            { step: "Integrate", detail: "\\(\\int_0^5 5\\,dt = 25\\)" }
        ],
        answer: "\\(25\\)"
    },

    // ===== POLAR COORDINATES =====
    {
        id: 72,
        exam: "BC",
        topic: "polar",
        topicLabel: "Polar Coordinates",
        difficulty: 1,
        problem: "Find the area enclosed by the circle \\(r = 4\\cos(\\theta)\\).",
        hint: "Use \\(A = \\frac{1}{2}\\int_{\\alpha}^{\\beta} r^2\\,d\\theta\\). For \\(r = 4\\cos\\theta\\), the curve traces from \\(\\theta = -\\pi/2\\) to \\(\\pi/2\\).",
        solution: [
            { step: "Identify bounds", detail: "\\(r = 4\\cos\\theta = 0\\) when \\(\\theta = \\pm\\pi/2\\). Full curve: \\(-\\pi/2\\) to \\(\\pi/2\\)" },
            { step: "Set up integral", detail: "\\(A = \\frac{1}{2}\\int_{-\\pi/2}^{\\pi/2} (4\\cos\\theta)^2\\,d\\theta = \\frac{1}{2}\\int_{-\\pi/2}^{\\pi/2} 16\\cos^2\\theta\\,d\\theta\\)" },
            { step: "Use half-angle identity", detail: "\\(= 8\\int_{-\\pi/2}^{\\pi/2} \\frac{1+\\cos(2\\theta)}{2}\\,d\\theta = 4\\int_{-\\pi/2}^{\\pi/2}(1+\\cos 2\\theta)\\,d\\theta\\)" },
            { step: "Evaluate", detail: "\\(= 4\\left[\\theta + \\frac{\\sin 2\\theta}{2}\\right]_{-\\pi/2}^{\\pi/2} = 4\\left[(\\frac{\\pi}{2} + 0) - (-\\frac{\\pi}{2} + 0)\\right] = 4\\pi\\)" }
        ],
        answer: "\\(4\\pi\\)"
    },
    {
        id: 73,
        exam: "BC",
        topic: "polar",
        topicLabel: "Polar Coordinates",
        difficulty: 2,
        problem: "Find the area of one petal of the rose curve \\(r = 3\\sin(2\\theta)\\).",
        hint: "One petal of \\(r = 3\\sin(2\\theta)\\) is traced from \\(\\theta = 0\\) to \\(\\theta = \\pi/2\\). Use \\(A = \\frac{1}{2}\\int r^2\\,d\\theta\\).",
        solution: [
            { step: "Identify one petal", detail: "First petal: \\(\\theta = 0\\) to \\(\\theta = \\pi/2\\) (where \\(\\sin(2\\theta) \\ge 0\\))" },
            { step: "Set up integral", detail: "\\(A = \\frac{1}{2}\\int_0^{\\pi/2} 9\\sin^2(2\\theta)\\,d\\theta\\)" },
            { step: "Half-angle identity", detail: "\\(= \\frac{9}{2}\\int_0^{\\pi/2} \\frac{1 - \\cos(4\\theta)}{2}\\,d\\theta = \\frac{9}{4}\\int_0^{\\pi/2}(1 - \\cos 4\\theta)\\,d\\theta\\)" },
            { step: "Evaluate", detail: "\\(= \\frac{9}{4}\\left[\\theta - \\frac{\\sin 4\\theta}{4}\\right]_0^{\\pi/2} = \\frac{9}{4}\\left(\\frac{\\pi}{2} - 0\\right) = \\frac{9\\pi}{8}\\)" }
        ],
        answer: "\\(\\frac{9\\pi}{8}\\)"
    },
    {
        id: 74,
        exam: "BC",
        topic: "polar",
        topicLabel: "Polar Coordinates",
        difficulty: 2,
        problem: "Find \\(\\frac{dy}{dx}\\) for the polar curve \\(r = 1 + \\sin\\theta\\) at \\(\\theta = \\frac{\\pi}{2}\\).",
        hint: "Use \\(x = r\\cos\\theta\\), \\(y = r\\sin\\theta\\). Then \\(\\frac{dy}{dx} = \\frac{\\frac{dr}{d\\theta}\\sin\\theta + r\\cos\\theta}{\\frac{dr}{d\\theta}\\cos\\theta - r\\sin\\theta}\\).",
        solution: [
            { step: "Find dr/dtheta", detail: "\\(\\frac{dr}{d\\theta} = \\cos\\theta\\)" },
            { step: "Apply formula at theta = pi/2", detail: "\\(\\frac{dy}{dx} = \\frac{\\cos(\\pi/2)\\sin(\\pi/2) + (1+\\sin(\\pi/2))\\cos(\\pi/2)}{\\cos(\\pi/2)\\cos(\\pi/2) - (1+\\sin(\\pi/2))\\sin(\\pi/2)}\\)" },
            { step: "Simplify", detail: "\\(= \\frac{(0)(1) + (2)(0)}{(0)(0) - (2)(1)} = \\frac{0}{-2} = 0\\)" }
        ],
        answer: "\\(0\\)"
    },
    {
        id: 75,
        exam: "BC",
        topic: "polar",
        topicLabel: "Polar Coordinates",
        difficulty: 3,
        problem: "Find the area inside \\(r = 3\\sin\\theta\\) and outside \\(r = 1 + \\sin\\theta\\).",
        hint: "Find where the curves intersect: set \\(3\\sin\\theta = 1 + \\sin\\theta\\). Then integrate the difference of the squared radii.",
        solution: [
            { step: "Find intersections", detail: "\\(3\\sin\\theta = 1 + \\sin\\theta \\Rightarrow 2\\sin\\theta = 1 \\Rightarrow \\sin\\theta = \\frac{1}{2} \\Rightarrow \\theta = \\frac{\\pi}{6},\; \\frac{5\\pi}{6}\\)" },
            { step: "Set up area integral", detail: "\\(A = \\frac{1}{2}\\int_{\\pi/6}^{5\\pi/6}\\left[(3\\sin\\theta)^2 - (1+\\sin\\theta)^2\\right]d\\theta\\)" },
            { step: "Expand integrand", detail: "\\(9\\sin^2\\theta - (1 + 2\\sin\\theta + \\sin^2\\theta) = 8\\sin^2\\theta - 2\\sin\\theta - 1\\)" },
            { step: "Integrate", detail: "Using half-angle: \\(8\\sin^2\\theta = 4(1-\\cos 2\\theta)\\). After integration: \\(A = \\frac{1}{2}\\left[4\\theta - 2\\sin 2\\theta + 2\\cos\\theta - \\theta\\right]_{\\pi/6}^{5\\pi/6} = \\pi\\)" }
        ],
        answer: "\\(\\pi\\)"
    },
    {
        id: 76,
        exam: "BC",
        topic: "polar",
        topicLabel: "Polar Coordinates",
        difficulty: 1,
        problem: "Convert the polar equation \\(r = 6\\sin\\theta\\) to rectangular (Cartesian) form.",
        hint: "Multiply both sides by \\(r\\) and use \\(r^2 = x^2 + y^2\\) and \\(r\\sin\\theta = y\\).",
        solution: [
            { step: "Multiply by r", detail: "\\(r^2 = 6r\\sin\\theta\\)" },
            { step: "Substitute", detail: "\\(x^2 + y^2 = 6y\\)" },
            { step: "Complete the square", detail: "\\(x^2 + y^2 - 6y = 0 \\Rightarrow x^2 + (y-3)^2 = 9\\)" }
        ],
        answer: "\\(x^2 + (y-3)^2 = 9\\) (circle centered at \\((0,3)\\) with radius 3)"
    },
    {
        id: 77,
        exam: "BC",
        topic: "polar",
        topicLabel: "Polar Coordinates",
        difficulty: 3,
        problem: "Find the area enclosed by the lemniscate \\(r^2 = 4\\cos(2\\theta)\\).",
        hint: "The curve exists only where \\(\\cos(2\\theta) \\ge 0\\). Use symmetry — find the area in the first quadrant and multiply by 4.",
        solution: [
            { step: "Determine valid range", detail: "\\(\\cos(2\\theta) \\ge 0\\) when \\(-\\pi/4 \\le \\theta \\le \\pi/4\\) and \\(3\\pi/4 \\le \\theta \\le 5\\pi/4\\)" },
            { step: "Use symmetry", detail: "\\(A = 4 \\cdot \\frac{1}{2}\\int_0^{\\pi/4} r^2\\,d\\theta = 2\\int_0^{\\pi/4} 4\\cos(2\\theta)\\,d\\theta\\)" },
            { step: "Evaluate", detail: "\\(= 8\\int_0^{\\pi/4}\\cos(2\\theta)\\,d\\theta = 8\\left[\\frac{\\sin 2\\theta}{2}\\right]_0^{\\pi/4} = 8 \\cdot \\frac{1}{2} = 4\\)" }
        ],
        answer: "\\(4\\)"
    },

    // ===== VOLUMES OF REVOLUTION =====
    {
        id: 78,
        exam: "AB",
        topic: "volumes",
        topicLabel: "Volumes of Revolution",
        difficulty: 1,
        problem: "Find the volume of the solid formed by rotating \\(y = x^2\\) from \\(x = 0\\) to \\(x = 2\\) about the x-axis.",
        hint: "Use the disk method: \\(V = \\pi\\int_a^b [f(x)]^2\\,dx\\).",
        solution: [
            { step: "Set up disk integral", detail: "\\(V = \\pi\\int_0^2 (x^2)^2\\,dx = \\pi\\int_0^2 x^4\\,dx\\)" },
            { step: "Integrate", detail: "\\(= \\pi\\left[\\frac{x^5}{5}\\right]_0^2 = \\pi \\cdot \\frac{32}{5}\\)" },
            { step: "Simplify", detail: "\\(= \\frac{32\\pi}{5}\\)" }
        ],
        answer: "\\(\\frac{32\\pi}{5}\\)"
    },
    {
        id: 79,
        exam: "AB",
        topic: "volumes",
        topicLabel: "Volumes of Revolution",
        difficulty: 2,
        problem: "Find the volume of the solid formed by rotating the region bounded by \\(y = \\sqrt{x}\\), \\(y = 0\\), and \\(x = 4\\) about the y-axis.",
        hint: "Use the shell method: \\(V = 2\\pi\\int_a^b x \\cdot f(x)\\,dx\\), or convert to a function of \\(y\\) and use disks.",
        solution: [
            { step: "Shell method setup", detail: "\\(V = 2\\pi\\int_0^4 x \\cdot \\sqrt{x}\\,dx = 2\\pi\\int_0^4 x^{3/2}\\,dx\\)" },
            { step: "Integrate", detail: "\\(= 2\\pi\\left[\\frac{x^{5/2}}{5/2}\\right]_0^4 = 2\\pi \\cdot \\frac{2}{5} \\cdot 4^{5/2}\\)" },
            { step: "Evaluate", detail: "\\(4^{5/2} = (\\sqrt{4})^5 = 32\\). So \\(V = 2\\pi \\cdot \\frac{2}{5} \\cdot 32 = \\frac{128\\pi}{5}\\)" }
        ],
        answer: "\\(\\frac{128\\pi}{5}\\)"
    },
    {
        id: 80,
        exam: "AB",
        topic: "volumes",
        topicLabel: "Volumes of Revolution",
        difficulty: 2,
        problem: "Find the volume of the solid formed by rotating the region between \\(y = x^2\\) and \\(y = x\\) about the x-axis.",
        hint: "Use the washer method: \\(V = \\pi\\int_a^b\\left([R(x)]^2 - [r(x)]^2\\right)dx\\). Find where the curves intersect first.",
        solution: [
            { step: "Find intersections", detail: "\\(x^2 = x \\Rightarrow x(x-1) = 0 \\Rightarrow x = 0,\; x = 1\\)" },
            { step: "Identify outer/inner", detail: "On \\([0,1]\\): \\(x \\ge x^2\\), so outer \\(R = x\\), inner \\(r = x^2\\)" },
            { step: "Set up washer integral", detail: "\\(V = \\pi\\int_0^1\\left(x^2 - x^4\\right)dx\\)" },
            { step: "Evaluate", detail: "\\(= \\pi\\left[\\frac{x^3}{3} - \\frac{x^5}{5}\\right]_0^1 = \\pi\\left(\\frac{1}{3} - \\frac{1}{5}\\right) = \\frac{2\\pi}{15}\\)" }
        ],
        answer: "\\(\\frac{2\\pi}{15}\\)"
    },
    {
        id: 81,
        exam: "AB",
        topic: "volumes",
        topicLabel: "Volumes of Revolution",
        difficulty: 3,
        problem: "Find the volume of the solid formed by rotating the region bounded by \\(y = e^x\\), \\(y = 0\\), \\(x = 0\\), and \\(x = 1\\) about the line \\(y = -1\\).",
        hint: "Use the disk/washer method. The outer radius is the distance from \\(y = -1\\) to \\(y = e^x\\), which is \\(e^x + 1\\). The inner radius is 1.",
        solution: [
            { step: "Identify radii", detail: "Outer: \\(R(x) = e^x - (-1) = e^x + 1\\). Inner: \\(r(x) = 0 - (-1) = 1\\)" },
            { step: "Set up washer integral", detail: "\\(V = \\pi\\int_0^1\\left[(e^x+1)^2 - 1^2\\right]dx\\)" },
            { step: "Expand", detail: "\\(= \\pi\\int_0^1\\left(e^{2x} + 2e^x + 1 - 1\\right)dx = \\pi\\int_0^1(e^{2x} + 2e^x)\\,dx\\)" },
            { step: "Evaluate", detail: "\\(= \\pi\\left[\\frac{e^{2x}}{2} + 2e^x\\right]_0^1 = \\pi\\left[\\left(\\frac{e^2}{2} + 2e\\right) - \\left(\\frac{1}{2} + 2\\right)\\right] = \\pi\\left(\\frac{e^2}{2} + 2e - \\frac{5}{2}\\right)\\)" }
        ],
        answer: "\\(\\pi\\left(\\frac{e^2}{2} + 2e - \\frac{5}{2}\\right)\\)"
    },
    {
        id: 82,
        exam: "AB",
        topic: "volumes",
        topicLabel: "Volumes of Revolution",
        difficulty: 2,
        problem: "The base of a solid is the region bounded by \\(y = 1 - x^2\\) and \\(y = 0\\). Cross-sections perpendicular to the x-axis are squares. Find the volume.",
        hint: "This is NOT a revolution problem. The side length of each square is \\(s = 1 - x^2\\). Volume = \\(\\int_{-1}^1 s^2\\,dx\\).",
        solution: [
            { step: "Find bounds", detail: "\\(1 - x^2 = 0 \\Rightarrow x = \\pm 1\\)" },
            { step: "Set up integral", detail: "\\(V = \\int_{-1}^1 (1-x^2)^2\\,dx\\)" },
            { step: "Expand", detail: "\\(= \\int_{-1}^1 (1 - 2x^2 + x^4)\\,dx\\)" },
            { step: "Evaluate (use symmetry)", detail: "\\(= 2\\int_0^1(1 - 2x^2 + x^4)\\,dx = 2\\left[x - \\frac{2x^3}{3} + \\frac{x^5}{5}\\right]_0^1 = 2\\left(1 - \\frac{2}{3} + \\frac{1}{5}\\right) = 2 \\cdot \\frac{8}{15} = \\frac{16}{15}\\)" }
        ],
        answer: "\\(\\frac{16}{15}\\)"
    },
    {
        id: 83,
        exam: "AB",
        topic: "volumes",
        topicLabel: "Volumes of Revolution",
        difficulty: 3,
        problem: "Find the volume of the solid formed by rotating the region bounded by \\(y = \\sin(x)\\) and \\(y = 0\\) from \\(x = 0\\) to \\(x = \\pi\\) about the line \\(y = 1\\).",
        hint: "Use the washer method. Outer radius = distance from \\(y = 1\\) to \\(y = 0\\) = 1. Inner radius = distance from \\(y = 1\\) to \\(y = \\sin x\\) = \\(1 - \\sin x\\).",
        solution: [
            { step: "Identify radii", detail: "Outer: \\(R = 1 - 0 = 1\\). Inner: \\(r = 1 - \\sin x\\)" },
            { step: "Set up washer integral", detail: "\\(V = \\pi\\int_0^{\\pi}\\left[1^2 - (1-\\sin x)^2\\right]dx\\)" },
            { step: "Expand", detail: "\\(= \\pi\\int_0^{\\pi}\\left[1 - 1 + 2\\sin x - \\sin^2 x\\right]dx = \\pi\\int_0^{\\pi}(2\\sin x - \\sin^2 x)\\,dx\\)" },
            { step: "Integrate", detail: "\\(\\int_0^\\pi 2\\sin x\\,dx = 4\\). \\(\\int_0^\\pi \\sin^2 x\\,dx = \\frac{\\pi}{2}\\). So \\(V = \\pi(4 - \\frac{\\pi}{2}) = 4\\pi - \\frac{\\pi^2}{2}\\)" }
        ],
        answer: "\\(4\\pi - \\frac{\\pi^2}{2}\\)"
    },
    {
        id: 84,
        exam: "AB",
        topic: "volumes",
        topicLabel: "Volumes of Revolution",
        difficulty: 1,
        problem: "Find the volume of the solid formed by rotating the region bounded by \\(y = \\frac{1}{x}\\), \\(y = 0\\), \\(x = 1\\), and \\(x = 3\\) about the x-axis.",
        hint: "Use the disk method: \\(V = \\pi\\int_1^3 \\left(\\frac{1}{x}\\right)^2 dx\\).",
        solution: [
            { step: "Set up disk integral", detail: "\\(V = \\pi\\int_1^3 \\frac{1}{x^2}\\,dx\\)" },
            { step: "Integrate", detail: "\\(= \\pi\\left[-\\frac{1}{x}\\right]_1^3 = \\pi\\left(-\\frac{1}{3} + 1\\right)\\)" },
            { step: "Simplify", detail: "\\(= \\frac{2\\pi}{3}\\)" }
        ],
        answer: "\\(\\frac{2\\pi}{3}\\)"
    },
    {
        id: 85,
        exam: "AB",
        topic: "volumes",
        topicLabel: "Volumes of Revolution",
        difficulty: 3,
        problem: "Find the volume of the solid formed by rotating the region bounded by \\(x = y^2\\) and \\(x = 4\\) about the line \\(x = 5\\).",
        hint: "Use the shell method with horizontal shells, or the washer method integrating with respect to \\(y\\). The outer radius is \\(5 - y^2\\) and the inner radius is \\(5 - 4 = 1\\).",
        solution: [
            { step: "Find bounds", detail: "\\(y^2 = 4 \\Rightarrow y = \\pm 2\\)" },
            { step: "Identify radii (from x = 5)", detail: "Outer: \\(R(y) = 5 - y^2\\). Inner: \\(r(y) = 5 - 4 = 1\\)" },
            { step: "Set up washer integral", detail: "\\(V = \\pi\\int_{-2}^{2}\\left[(5-y^2)^2 - 1\\right]dy\\)" },
            { step: "Expand and use symmetry", detail: "\\(= 2\\pi\\int_0^2(25 - 10y^2 + y^4 - 1)\\,dy = 2\\pi\\int_0^2(24 - 10y^2 + y^4)\\,dy\\)" },
            { step: "Evaluate", detail: "\\(= 2\\pi\\left[24y - \\frac{10y^3}{3} + \\frac{y^5}{5}\\right]_0^2 = 2\\pi\\left(48 - \\frac{80}{3} + \\frac{32}{5}\\right) = 2\\pi \\cdot \\frac{576}{15} = \\frac{1152\\pi}{15} = \\frac{384\\pi}{5}\\)" }
        ],
        answer: "\\(\\frac{384\\pi}{5}\\)"
    }
];
