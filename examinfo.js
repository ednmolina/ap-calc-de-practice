/*
 * AP Exam Info — Topic tested & exam tricks for each problem.
 * Keyed by problem ID. Math expressions use \(...\) for MathJax rendering.
 */
const EXAM_INFO = {
    1: {
        tested: "Separation of variables — basic form",
        tips: "On the AP exam, always write \\(+C\\) after integrating. If you forget the constant, you lose a point even if the rest is correct. Also, the general solution should include the absolute value inside the ln, but you can drop it when you exponentiate (the \\(\\pm\\) gets absorbed into the constant \\(A\\))."
    },
    2: {
        tested: "Separation of variables — implicit solutions",
        tips: "The AP exam accepts implicit solutions (like \\(y^2 = \\ldots\\)) as final answers unless the problem specifically says 'solve for \\(y\\).' Don't waste time solving explicitly unless asked. Also note: when taking a square root, justify which sign (\\(\\pm\\)) you keep if an initial condition is given."
    },
    3: {
        tested: "Separable DE with initial condition (IVP)",
        tips: "Classic AP free-response format: separate → integrate → apply IC → solve. The rubric typically awards 1 point for separation, 1 for antiderivatives, 1 for the constant, and 1 for using the IC. Don't skip steps — show the \\(+C\\) explicitly before plugging in the IC."
    },
    4: {
        tested: "Separable DE requiring algebraic manipulation",
        tips: "When the fraction on one side is complex, split it into simpler terms before integrating. The AP exam loves testing whether you can decompose expressions like \\(\\frac{1+2y}{y^2}\\) into \\(y^{-2} + 2y^{-1}\\). Implicit solutions are perfectly acceptable here."
    },
    5: {
        tested: "Separable DE with exponential functions",
        tips: "Remember: \\(e^{x-y} = e^x \\cdot e^{-y}\\). The AP exam frequently uses this factoring trick to make a DE separable. If you see \\(e\\) raised to a sum/difference, always try splitting it into a product."
    },
    6: {
        tested: "Separable DE requiring polynomial long division",
        tips: "When you get a fraction like \\(\\frac{y-1}{y+1}\\), perform polynomial long division or rewrite as \\(1 - \\frac{2}{y+1}\\). The AP exam tests this algebraic fluency. Also: implicit answers with ln terms are fine — don't try to solve for \\(y\\) explicitly when it's impossible."
    },
    7: {
        tested: "Slope field analysis — isoclines and equilibrium",
        tips: "Key AP skill: setting \\(\\frac{dy}{dx} = \\text{constant}\\) to find isoclines. The exam often asks 'at what points are slopes equal to [value]?' This means finding the curve where \\(\\frac{dy}{dx} = \\text{that value}\\). Lines where \\(\\frac{dy}{dx} = 0\\) are called nullclines and are the most commonly tested."
    },
    8: {
        tested: "Matching a slope field to a DE (multiple choice)",
        tips: "AP multiple choice strategy: check TWO conditions to eliminate options. First check where \\(\\frac{dy}{dx} = 0\\) (horizontal tangents), then check where \\(\\frac{dy}{dx}\\) is undefined (vertical tangents). This usually narrows it to one answer. Don't waste time checking all four options — eliminate systematically."
    },
    9: {
        tested: "Equilibrium solutions, stability, and concavity from a DE",
        tips: "This is a classic AP free-response problem. For concavity, use the chain rule: \\(\\frac{d^2y}{dx^2} = \\frac{d}{dy}[f(y)] \\cdot f(y)\\) where \\(\\frac{dy}{dx} = f(y)\\). The exam awards separate points for (1) finding equilibria, (2) determining where solutions increase/decrease, and (3) concavity analysis. Don't forget: concave up means the Euler approximation is an underestimate."
    },
    10: {
        tested: "Verifying claims about solution curves",
        tips: "The AP exam sometimes gives a student's claim and asks you to verify or refute it. Always solve the DE first, then compare with the claim. Know your conics: \\(x^2 + y^2 = r^2\\) is a circle, \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\) is an ellipse. State the domain of your particular solution — this is often worth a point."
    },
    11: {
        tested: "Euler's method — basic application (BC only)",
        tips: "The formula is \\(y_{n+1} = y_n + h \\cdot f(x_n, y_n)\\). On the AP exam, organize your work in a table with columns for \\(x_n\\), \\(y_n\\), and \\(f(x_n, y_n)\\). This makes it easy to check your arithmetic and earns presentation points. Always use the PREVIOUS \\(y\\)-value to compute the slope — a common error is using the new \\(y\\)."
    },
    12: {
        tested: "Euler's method with given number of steps",
        tips: "When the problem says 'use \\(N\\) steps from \\(a\\) to \\(b\\),' compute \\(h = \\frac{b-a}{N}\\) first. Show this calculation explicitly. The AP rubric often gives a point just for identifying the correct step size. Round intermediate values to 3–4 decimal places to avoid accumulating errors."
    },
    13: {
        tested: "Euler's method — overestimate vs. underestimate (BC only)",
        tips: "Critical AP concept: if the solution is CONCAVE UP, Euler's method UNDERESTIMATES (tangent line is below curve). If CONCAVE DOWN, it OVERESTIMATES. To determine concavity, compute \\(\\frac{d^2y}{dx^2}\\) at the initial point. This is one of the most commonly tested Euler's method concepts on the BC exam."
    },
    14: {
        tested: "Exponential decay — finding the decay constant",
        tips: "The AP exam uses two equivalent forms: \\(A(t) = A_0 e^{kt}\\) or \\(A(t) = A_0 \\left(\\frac{1}{2}\\right)^{t/t_{1/2}}\\). Know both. When finding \\(k\\), the formula \\(k = \\frac{\\ln(\\text{ratio})}{\\text{time}}\\) is your fastest path. Don't forget: \\(k\\) is NEGATIVE for decay. The exam often asks for the amount at a specific time — leave your answer in exact form unless told to approximate."
    },
    15: {
        tested: "Exponential growth — doubling time and DE formulation",
        tips: "Key relationship: if doubling time is \\(T\\), then \\(k = \\frac{\\ln 2}{T}\\). The AP exam often asks you to WRITE the DE \\(\\left(\\frac{dP}{dt} = kP\\right)\\) as a separate step worth its own point. Don't just jump to the solution — show the DE. Also: \\(P(t) = P_0 \\cdot 2^{t/T}\\) is equivalent to \\(P_0 e^{kt}\\) and sometimes easier to use."
    },
    16: {
        tested: "Newton's Law of Cooling — applied exponential decay",
        tips: "The substitution \\(u = T - T_{\\text{env}}\\) converts this to standard exponential decay. On the AP exam, always identify \\(T_{\\text{env}}\\) first. Common mistake: students forget to add \\(T_{\\text{env}}\\) back at the end. The answer is \\(T(t) = T_{\\text{env}} + (T_0 - T_{\\text{env}})e^{kt}\\), NOT just the exponential part."
    },
    17: {
        tested: "Mixing problem — setting up a DE from a word problem",
        tips: "AP exam strategy for mixing problems: Rate of change = Rate IN − Rate OUT. Rate IN = (concentration in) × (flow rate in). Rate OUT = (concentration in tank) × (flow rate out). Concentration in tank = \\(\\frac{\\text{Amount}}{\\text{Volume}}\\). If inflow ≠ outflow, the volume changes with time! This is a common source of errors."
    },
    18: {
        tested: "Logistic growth — identifying parameters from standard form (BC)",
        tips: "Memorize: in \\(\\frac{dP}{dt} = kP\\left(1 - \\frac{P}{L}\\right)\\), the carrying capacity is \\(L\\), and max growth occurs at \\(P = \\frac{L}{2}\\). The AP exam loves asking these three things: (1) carrying capacity, (2) population at max growth rate, (3) long-term behavior. These are essentially free points if you know the formula."
    },
    19: {
        tested: "Logistic growth — writing the particular solution (BC)",
        tips: "The logistic solution formula is \\(P(t) = \\frac{L}{1 + Ae^{-kLt}}\\) where \\(A = \\frac{L - P_0}{P_0}\\). Note: some textbooks write it as \\(e^{-kt}\\) where \\(k\\) already includes \\(L\\). Check which form your answer uses. On the AP exam, you're expected to know this formula — it won't be given to you on the BC exam."
    },
    20: {
        tested: "Logistic growth — non-standard form and finding inflection time (BC)",
        tips: "When the DE isn't in standard form, FACTOR it first: \\(3P - 0.01P^2 = 0.01P(300 - P)\\). Then read off \\(L = 300\\). To find when growth is fastest, solve \\(P(t) = \\frac{L}{2}\\). The inflection point of the logistic curve always occurs at \\(P = \\frac{L}{2}\\) — this is a fact worth memorizing for the BC exam."
    },
    21: {
        tested: "Direct integration IVP (antiderivative + initial condition)",
        tips: "This is the simplest type of DE on the AP exam — just integrate and plug in the IC. But don't be careless: the exam awards separate points for (1) correct antiderivative, (2) including \\(+C\\), and (3) solving for \\(C\\) using the IC. Students lose points by combining steps."
    },
    22: {
        tested: "Separable IVP — choosing the correct sign for square root",
        tips: "When your solution involves a square root \\((y = \\pm\\sqrt{\\ldots})\\), you MUST justify which sign to keep using the initial condition. On the AP exam, writing 'taking the positive root since \\(y(0) = 2 > 0\\)' earns you the justification point. Never leave \\(\\pm\\) in a particular solution."
    },
    23: {
        tested: "Separable IVP with inverse trig functions",
        tips: "Know your inverse trig integrals cold: \\(\\int \\frac{1}{1+x^2}\\,dx = \\arctan(x) + C\\). The AP exam tests this frequently. Also know the tangent addition formula: \\(\\tan(A+B) = \\frac{\\tan A + \\tan B}{1 - \\tan A \\cdot \\tan B}\\). Simplifying arctan expressions is a common BC-level skill."
    },
    24: {
        tested: "Separable IVP — recognizing \\(e^{x-y}\\) as separable",
        tips: "The trick \\(e^{a \\pm b} = e^a \\cdot e^{\\pm b}\\) appears constantly on the AP exam. If you see \\(e^{x-y}\\), \\(e^{2x+y}\\), etc., immediately split it. Also: when \\(C = 0\\), double-check your work — it's unusual but not wrong. The AP exam sometimes has elegant solutions like \\(y = x\\) to test whether students trust their algebra."
    },
    25: {
        tested: "Modeling — setting up and solving a DE from a physical scenario",
        tips: "AP free-response problems often give you the DE and ask you to solve it, OR describe a scenario and ask you to write AND solve the DE. Read carefully which one. For tank-draining problems, the key insight is that the rate is proportional to \\(\\sqrt{V}\\) (Torricelli's Law). Always state your domain restriction (\\(0 \\le t \\le 20\\) here)."
    },
    26: {
        tested: "Modeling — velocity with air resistance (approach to equilibrium)",
        tips: "Terminal velocity = the equilibrium solution (set \\(\\frac{dv}{dt} = 0\\)). The AP exam loves this: 'find the terminal velocity' is just solving \\(f(v) = 0\\). For the time to reach \\(X\\%\\) of terminal velocity, set \\(v(t) = 0.X \\cdot v_{\\text{term}}\\) and solve. The solution always has the form \\(v_{\\text{term}}(1 - e^{-t/\\tau})\\) where \\(\\tau\\) is the time constant."
    },
    27: {
        tested: "Proportional growth — 'rate proportional to amount'",
        tips: "Whenever you see 'rate of change proportional to the quantity,' immediately write \\(\\frac{dQ}{dt} = kQ\\). This phrase appears in nearly every AP exam. The solution is always \\(Q = Q_0 e^{kt}\\). Use two data points to find \\(k\\). Express answers in exact form: \\(50 \\cdot 4^{5/3}\\) is better than \\(\\approx 504\\)."
    },
    28: {
        tested: "Logistic model from a word problem — disease spread (BC)",
        tips: "When a problem says 'rate proportional to the product of infected and uninfected,' that's logistic: \\(\\frac{dI}{dt} = kI(N-I)\\). This is the verbal cue for logistic growth on the AP exam. The carrying capacity equals the total population. Finding \\(k\\) requires solving a transcendental equation — show your algebra clearly."
    },
    29: {
        tested: "Separable DE — splitting complex fractions",
        tips: "When you get \\(\\frac{1+y^2}{y}\\), split it as \\(\\frac{1}{y} + y\\). The AP exam tests this algebraic skill frequently. Implicit solutions like \\(\\ln|y| + \\frac{y^2}{2} = \\sin(x) + C\\) are perfectly valid final answers. Don't waste time trying to solve for \\(y\\) explicitly when it's clearly impossible."
    },
    30: {
        tested: "Basic separable DE — power rule integration",
        tips: "Even 'easy' problems on the AP exam require proper notation. Write the separation step explicitly: \\(y^2\\,dy = x\\,dx\\). Integrate both sides with the correct power rule. Remember: \\(\\int y^n\\,dy = \\frac{y^{n+1}}{n+1} + C\\). The cube root form \\(y = (\\ldots)^{1/3}\\) is preferred over the radical notation for clarity."
    },
    31: {
        tested: "Euler's method with transcendental slope function (BC)",
        tips: "When \\(f(x,y)\\) involves sin, cos, or other transcendentals, you'll need a calculator for intermediate values. On the AP exam (calculator section), show the setup clearly and round to 3 decimal places. Key insight: if the first slope is 0 (like \\(\\sin(0 \\cdot 1) = 0\\)), the first step doesn't change \\(y\\) — this is a common AP trick."
    },
    32: {
        tested: "Slope field where \\(\\frac{dy}{dx}\\) depends only on \\(x\\)",
        tips: "When \\(\\frac{dy}{dx} = f(x)\\) only (no \\(y\\)), all points on a vertical line \\(x = c\\) have the SAME slope. This means the slope field has horizontal 'bands.' The AP exam tests whether you recognize this pattern. Also: if \\(\\frac{dy}{dx}\\) depends only on \\(x\\), the DE is directly integrable — no separation needed."
    },
    33: {
        tested: "Qualitative analysis of logistic DE without solving (BC)",
        tips: "The AP exam often says 'WITHOUT solving the DE, determine...' This means use sign analysis only. For logistic \\(\\frac{dP}{dt} = kP\\left(1-\\frac{P}{L}\\right)\\): equilibria at \\(P=0\\) and \\(P=L\\), increasing for \\(0 < P < L\\), max growth at \\(P = \\frac{L}{2}\\). These facts should be instant recall — no computation needed."
    },
    34: {
        tested: "IVP with domain restrictions — identifying singular points",
        tips: "Critical AP skill: stating the domain of your solution. If the DE has \\(x^2 - 1\\) in the denominator, the solution can't cross \\(x = \\pm 1\\). The domain is the largest interval containing the initial \\(x\\)-value where the solution is continuous. Forgetting to state the domain costs you a point on the AP exam."
    },
    35: {
        tested: "Exponential decay — half-life and carbon dating",
        tips: "Half-life formula: \\(k = \\frac{-\\ln 2}{t_{1/2}}\\). For carbon dating, you're given the fraction remaining and solve for \\(t\\). The formula \\(t = \\frac{t_{1/2} \\cdot \\ln(\\text{fraction})}{-\\ln 2}\\) is worth memorizing. On the AP exam, leave answers in exact form like \\(\\frac{5730 \\ln 5}{\\ln 2}\\) unless asked to approximate."
    },
    36: {
        tested: "Euler's method — comparing approximation to exact solution (BC)",
        tips: "The AP exam sometimes asks you to compare Euler's approximation with the exact answer. When \\(\\frac{dy}{dx} = f(x)\\) only, the exact solution is just the antiderivative — use this to verify. Key insight: larger step sizes give worse approximations. If the solution is concave up, Euler underestimates; concave down, it overestimates."
    },
    37: {
        tested: "Modeling — continuous deposit + exponential growth",
        tips: "The DE \\(\\frac{dV}{dt} = rV + D\\) (growth rate + constant deposit) is a common AP application. It's NOT pure exponential — it's a linear first-order DE. The equilibrium (if \\(r > 0\\)) doesn't exist (\\(V\\) grows forever), but the form of the solution is \\(V = \\left(V_0 + \\frac{D}{r}\\right)e^{rt} - \\frac{D}{r}\\). This type of problem appears in the AB exam under 'applications of DEs.'"
    },
    38: {
        tested: "Logistic growth — solving for a specific time (BC)",
        tips: "After writing the logistic solution \\(P(t) = \\frac{L}{1+Ae^{-kt}}\\), solving \\(P(t) = \\text{target}\\) requires careful algebra. Set up the equation, isolate the exponential, then take ln. The AP exam awards points for each algebraic step. Common error: forgetting that \\(k\\) in the solution formula might be \\(kL\\) (depending on which form you use)."
    },
    39: {
        tested: "Autonomous DE — stability classification from sign analysis",
        tips: "For autonomous DEs (\\(\\frac{dy}{dx}\\) depends only on \\(y\\)), draw a PHASE LINE (number line with arrows). Stable equilibria have arrows pointing TOWARD them; unstable have arrows pointing AWAY. The AP exam loves asking 'classify each equilibrium as stable or unstable.' Also: the long-term behavior of a solution depends on which equilibria it's between."
    },
    40: {
        tested: "Direct integration IVP — logarithmic antiderivative",
        tips: "Remember: \\(\\int \\frac{1}{x}\\,dx = \\ln|x| + C\\), NOT \\(\\ln(x) + C\\). The absolute value matters! However, if the initial condition gives \\(x > 0\\), you can write \\(\\ln(x)\\). On the AP exam, stating the domain (\\(x > 0\\) here, since the IC is at \\(x = 1\\)) shows mathematical maturity and can earn you a point."
    },
    41: {
        tested: "Mixing problem with variable volume — integrating factor method",
        tips: "When inflow ≠ outflow, the volume \\(V(t)\\) changes with time. This makes the DE linear but NOT separable — you need an integrating factor. The AP exam (BC level) may test this. Key formula: integrating factor \\(\\mu = e^{\\int P(t)\\,dt}\\) for \\(\\frac{dy}{dt} + P(t)y = Q(t)\\). This is one of the harder modeling problems and typically appears as a free-response question."
    },
    42: {
        tested: "Newton's Law of Cooling — full solution with two conditions",
        tips: "Newton's Cooling always gives \\(T(t) = T_{\\text{env}} + (T_0 - T_{\\text{env}})e^{kt}\\) where \\(k < 0\\). You need TWO conditions: one to find \\(A\\) (usually the IC), one to find \\(k\\). On the AP exam, 'find when \\(T\\) reaches [value]' requires solving an exponential equation — always show the ln step explicitly. Common error: using the wrong sign for \\(k\\)."
    },
    43: {
        tested: "Mixing problem with constant volume — pure exponential decay of salt",
        tips: "When pure water flows in and mixed solution flows out at the same rate, the volume stays constant and the salt decays exponentially: \\(A(t) = A_0 e^{-t/\\tau}\\) where \\(\\tau = \\frac{V}{\\text{flow rate}}\\). This is actually the simplest mixing problem. On the AP exam, recognize that constant volume + pure water in = exponential decay of the solute."
    },
    44: {
        tested: "Separable DE — the classic snowplow problem",
        tips: "The snowplow problem is a famous calculus problem that tests setting up DEs from physical descriptions. The key insight: if snow falls at a constant rate and the plow clears at a rate inversely proportional to depth, you get a separable DE. On the AP exam, the hardest part is translating the word problem into a DE — practice this skill."
    },
    45: {
        tested: "Newton's Law of Cooling — thermometer reading problem",
        tips: "This is a variation of Newton's Cooling where the thermometer itself is the object cooling/warming. The setup is identical: \\(\\frac{dT}{dt} = k(T - T_{\\text{env}})\\). On the AP exam, read carefully whether the object is cooling DOWN to room temperature or warming UP to it — this determines the sign of \\((T_0 - T_{\\text{env}})\\)."
    },
    46: {
        tested: "Euler's method applied to a modeling problem (BC)",
        tips: "The AP exam sometimes combines Euler's method with a real-world scenario where you can't solve the DE analytically. In these cases, Euler's method IS the solution method. Organize your work in a clear table. The exam may ask you to interpret your answer in context — always include units and a sentence of interpretation."
    },
    47: {
        tested: "IVP with partial fractions",
        tips: "When separation gives you a rational function to integrate, use partial fractions. On the AP exam, the decomposition \\(\\frac{A}{\\text{factor}_1} + \\frac{B}{\\text{factor}_2}\\) is expected to be shown. Cover-up method is fastest: to find \\(A\\), cover up the factor under \\(A\\) and plug in its root. This saves time on the exam."
    },
    48: {
        tested: "Modeling — related rates meets DEs (conical tank)",
        tips: "The inverted cone problem combines geometry (similar triangles: \\(\\frac{r}{h} = \\frac{R}{H}\\)) with DEs. On the AP exam, you MUST state the similar triangles relationship and use it to eliminate one variable before writing the DE. This is worth its own point on the rubric. Also: \\(V = \\frac{1}{3}\\pi r^2 h\\) for a cone — have this memorized."
    },
    49: {
        tested: "Logistic growth — fish population in a bounded environment (BC)",
        tips: "When a problem mentions a 'maximum sustainable population' or 'limited resources,' think logistic. The carrying capacity is that maximum. On the AP exam, if \\(P_0 < L\\), the population increases toward \\(L\\); if \\(P_0 > L\\), it decreases toward \\(L\\). Both cases approach \\(L\\) as \\(t \\to \\infty\\). Sketch the S-curve to support your answer."
    },
    50: {
        tested: "Separable DE — geometric modeling (sphere evaporation)",
        tips: "This problem requires knowing \\(V = \\frac{4}{3}\\pi r^3\\) and \\(SA = 4\\pi r^2\\). The AP exam expects you to use \\(\\frac{dV}{dt} = \\frac{dV}{dr} \\cdot \\frac{dr}{dt}\\) via the chain rule, or equivalently, express the rate in terms of \\(r\\) directly. When 'rate proportional to surface area,' write \\(\\frac{dV}{dt} = -k \\cdot 4\\pi r^2\\). Then use \\(\\frac{dV}{dr} = 4\\pi r^2\\) to get \\(\\frac{dr}{dt} = -k\\). Elegant!"
    },
    // U-SUBSTITUTION
    51: {
        tested: "U-substitution — direct pattern recognition",
        tips: "This is the simplest u-sub pattern: the derivative of the inner function appears as a factor. On the AP exam, if you see \\(f'(g(x)) \\cdot g'(x)\\), immediately recognize it as the chain rule in reverse. Don't waste time writing out the full substitution on multiple choice — just identify \\(u\\) mentally and write the answer."
    },
    52: {
        tested: "U-substitution — recognizing f'/f pattern",
        tips: "Whenever the numerator is the derivative of the denominator, the integral is \\(\\ln|\\text{denominator}| + C\\). This pattern appears constantly on the AP exam. Memorize: \\(\\int \\frac{f'(x)}{f(x)}\\,dx = \\ln|f(x)| + C\\). On multiple choice, you can spot this in under 10 seconds."
    },
    53: {
        tested: "U-substitution — adjusting for a constant factor",
        tips: "When \\(du\\) doesn't match exactly, you can pull out or multiply by a constant. Here \\(du = -2x\\,dx\\) but you have \\(x\\,dx\\), so divide by \\(-2\\). The AP exam tests whether you handle the negative sign correctly. Common mistake: forgetting the negative and getting the wrong sign on the final answer."
    },
    54: {
        tested: "U-substitution with definite integrals — changing limits",
        tips: "On the AP exam, you MUST either (a) change the limits when you substitute, or (b) back-substitute before evaluating. Mixing approaches (substituting but keeping old limits) is a common error that costs full credit. The graders specifically check for this. Changing limits is usually faster."
    },
    55: {
        tested: "U-substitution — standard trig integrals",
        tips: "Memorize these results: \\(\\int \\tan x\\,dx = \\ln|\\sec x| + C\\) and \\(\\int \\cot x\\,dx = \\ln|\\sin x| + C\\). The AP exam expects instant recall on multiple choice. On free response, show the substitution \\(u = \\cos x\\) to earn method points. Also know: \\(\\int \\sec x\\,dx = \\ln|\\sec x + \\tan x| + C\\)."
    },
    56: {
        tested: "U-substitution — non-obvious inner function",
        tips: "When the substitution isn't immediately obvious, look for a composition: here \\(e^{\\sqrt{x}}\\) suggests \\(u = \\sqrt{x}\\). The AP exam occasionally tests 'creative' substitutions where you need to rewrite \\(\\frac{1}{\\sqrt{x}}\\,dx\\) as \\(2\\,du\\). Always verify by differentiating your answer — if you get the original integrand, you're correct."
    },
    57: {
        tested: "U-substitution — powers of ln(x)",
        tips: "The pattern \\(\\int \\frac{[\\ln(x)]^n}{x}\\,dx\\) with \\(u = \\ln x\\) appears frequently on the AP exam. It reduces to \\(\\int u^n\\,du = \\frac{u^{n+1}}{n+1} + C\\). Generalize this: any time you see \\(\\frac{1}{x}\\) paired with a function of \\(\\ln x\\), let \\(u = \\ln x\\)."
    },
    // INTEGRATION BY PARTS
    58: {
        tested: "Integration by parts — basic application (BC)",
        tips: "Use LIATE to choose \\(u\\): Logarithmic > Inverse trig > Algebraic > Trig > Exponential. Here \\(x\\) is algebraic and \\(e^x\\) is exponential, so \\(u = x\\). On the BC exam, IBP appears in both multiple choice and free response. Always write the formula \\(\\int u\\,dv = uv - \\int v\\,du\\) first to organize your work."
    },
    59: {
        tested: "Integration by parts — algebraic times trig (BC)",
        tips: "When you have (polynomial) × (trig), let \\(u\\) = polynomial (it simplifies when differentiated) and \\(dv\\) = trig (easy to integrate). On the AP exam, verify your answer by differentiating — product rule should give back the original integrand. This is a fast check that catches sign errors."
    },
    60: {
        tested: "Integration by parts — repeated application / tabular method (BC)",
        tips: "When IBP needs to be applied multiple times (polynomial degree > 1), use the tabular method: list derivatives of \\(u\\) and integrals of \\(dv\\), alternating signs (+, -, +, ...). This saves time on the BC exam. For \\(x^n e^x\\), you'll always need \\(n\\) applications. The pattern: \\(e^x(x^n - nx^{n-1} + n(n-1)x^{n-2} - \\ldots)\\)."
    },
    61: {
        tested: "Integration by parts — ln(x) as a standalone integrand (BC)",
        tips: "This is a must-know for the BC exam: \\(\\int \\ln x\\,dx = x\\ln x - x + C\\). The trick is letting \\(dv = dx\\), which students often don't think of. The AP exam tests this both as a standalone problem and as a step within larger problems (like finding areas or volumes involving \\(\\ln x\\))."
    },
    62: {
        tested: "Integration by parts — cyclic / boomerang method (BC)",
        tips: "When IBP produces the original integral on the right side, call it \\(I\\) and solve algebraically: \\(I = \\text{stuff} - I \\Rightarrow 2I = \\text{stuff}\\). This 'boomerang' technique appears on the BC exam for \\(\\int e^x \\sin x\\,dx\\) and \\(\\int e^x \\cos x\\,dx\\). Memorize both results — they save significant time on multiple choice."
    },
    63: {
        tested: "Integration by parts — definite integral with improper behavior (BC)",
        tips: "When IBP involves a definite integral where one term is undefined at an endpoint (like \\(\\ln(0)\\)), you must evaluate the limit. On the BC exam, state explicitly: \\(\\lim_{x \\to 0^+} x^3 \\ln x = 0\\). The graders want to see you acknowledge the issue. Use L'Hôpital's rule on \\(\\frac{\\ln x}{1/x^3}\\) if asked to justify."
    },
    64: {
        tested: "Combined techniques — substitution then IBP (BC)",
        tips: "The hardest integration problems on the BC exam combine multiple techniques. The key insight here: \\(x^3 e^{x^2}\\) can't be done by IBP alone (you'd loop forever). But rewriting as \\(x^2 \\cdot xe^{x^2}\\) and substituting \\(t = x^2\\) reduces it to \\(\\frac{1}{2}\\int te^t\\,dt\\), which is standard IBP. Always ask: 'Is there a substitution hiding inside?'"
    },

    // ===== PARAMETRIC EQUATIONS =====
    65: {
        tested: "Parametric derivatives — basic \\(dy/dx\\) (BC)",
        tips: "The formula \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}\\) is one of the most tested parametric concepts on the BC exam. Common mistakes: (1) inverting the fraction, (2) forgetting that the result is still in terms of \\(t\\), not \\(x\\). The AP rubric requires showing both derivatives separately before dividing."
    },
    66: {
        tested: "Parametric derivatives — evaluating at a specific \\(t\\) (BC)",
        tips: "When the problem asks for the slope at a specific \\(t\\)-value, find \\(dy/dx\\) as a function of \\(t\\) first, then substitute. Don't plug in \\(t\\) too early — that's a common error. On the AP exam, if \\(dx/dt = 0\\) at the given \\(t\\), the tangent is vertical (undefined slope), which is a valid answer."
    },
    67: {
        tested: "Parametric motion — speed of a particle (BC)",
        tips: "Speed = \\(\\sqrt{(x')^2 + (y')^2}\\). This is NOT the same as velocity (which is a vector). The AP exam distinguishes between speed (scalar, always positive) and velocity (vector with components). Distance traveled = \\(\\int_a^b \\text{speed}\\,dt\\). Don't confuse with displacement."
    },
    68: {
        tested: "Parametric second derivative \\(d^2y/dx^2\\) (BC)",
        tips: "The formula \\(\\frac{d^2y}{dx^2} = \\frac{\\frac{d}{dt}(dy/dx)}{dx/dt}\\) is tricky. The most common mistake: students write \\(\\frac{d^2y/dt^2}{d^2x/dt^2}\\), which is WRONG. On the AP exam, this formula is tested in free-response to determine concavity of parametric curves. Always show the intermediate step of differentiating \\(dy/dx\\) with respect to \\(t\\)."
    },
    69: {
        tested: "Parametric arc length (BC)",
        tips: "Arc length formula: \\(L = \\int_a^b \\sqrt{(dx/dt)^2 + (dy/dt)^2}\\,dt\\). On the BC exam, this often appears as a setup-only problem (no evaluation required) or with a substitution that simplifies the radical. Always factor inside the radical before attempting integration. If the integral doesn't simplify, you may only need to set it up."
    },
    70: {
        tested: "Parametric tangent lines (BC)",
        tips: "Finding tangent lines to parametric curves requires three things: (1) the point \\((x(t_0), y(t_0))\\), (2) the slope \\(dy/dx\\) at \\(t_0\\), (3) point-slope form. On the AP exam, don't forget to compute the actual \\((x,y)\\) coordinates — students often leave the answer in terms of \\(t\\). The tangent line equation should be in terms of \\(x\\) and \\(y\\) only."
    },
    71: {
        tested: "Parametric distance traveled — constant speed (BC)",
        tips: "When speed is constant, distance = speed × time. This is the simplest parametric distance problem but still appears on the AP exam as a 'gimme' point. The key insight: if \\(x'\\) and \\(y'\\) are both constant, the path is a straight line and the speed is constant. Verify by computing \\(\\sqrt{(x')^2 + (y')^2}\\) and confirming it has no \\(t\\) dependence."
    },

    // ===== POLAR COORDINATES =====
    72: {
        tested: "Polar area — full curve \\(r = a\\cos\\theta\\) (BC)",
        tips: "For \\(r = a\\cos\\theta\\), the curve is a circle of diameter \\(a\\) centered at \\((a/2, 0)\\). Area = \\(\\frac{1}{2}\\int r^2\\,d\\theta\\). Critical: choose bounds where the curve traces ONCE. For \\(r = a\\cos\\theta\\), use \\(-\\pi/2\\) to \\(\\pi/2\\) (or \\(0\\) to \\(\\pi\\)). Using \\(0\\) to \\(2\\pi\\) traces it twice and doubles the area — a common AP mistake."
    },
    73: {
        tested: "Polar area — one petal of a rose curve (BC)",
        tips: "For rose curves \\(r = a\\sin(n\\theta)\\) or \\(r = a\\cos(n\\theta)\\): if \\(n\\) is odd, there are \\(n\\) petals; if \\(n\\) is even, there are \\(2n\\) petals. One petal of \\(r = a\\sin(2\\theta)\\) spans \\(\\theta = 0\\) to \\(\\pi/2\\). On the AP exam, always sketch the curve first to identify correct bounds. The half-angle identity \\(\\sin^2\\theta = \\frac{1-\\cos 2\\theta}{2}\\) is essential here."
    },
    74: {
        tested: "Polar derivatives — \\(dy/dx\\) in polar (BC)",
        tips: "To find \\(dy/dx\\) in polar: use \\(x = r\\cos\\theta\\), \\(y = r\\sin\\theta\\), then \\(\\frac{dy}{dx} = \\frac{(dr/d\\theta)\\sin\\theta + r\\cos\\theta}{(dr/d\\theta)\\cos\\theta - r\\sin\\theta}\\). On the AP exam, horizontal tangents occur when the numerator = 0 (and denominator ≠ 0), vertical tangents when denominator = 0 (and numerator ≠ 0). Check both conditions."
    },
    75: {
        tested: "Polar area — region between two curves (BC)",
        tips: "Area between polar curves: \\(A = \\frac{1}{2}\\int_\\alpha^\\beta (r_1^2 - r_2^2)\\,d\\theta\\) where \\(r_1\\) is the outer curve. On the AP exam: (1) Find intersections by setting \\(r_1 = r_2\\), (2) Determine which is outer/inner in the region, (3) Check if the pole (origin) is involved — sometimes curves pass through the origin at different \\(\\theta\\) values, creating 'hidden' intersections."
    },
    76: {
        tested: "Polar-rectangular conversion (BC)",
        tips: "Key identities: \\(r^2 = x^2 + y^2\\), \\(x = r\\cos\\theta\\), \\(y = r\\sin\\theta\\). The trick of multiplying both sides by \\(r\\) converts many polar equations to rectangular form. On the AP exam, recognizing that \\(r = 2a\\sin\\theta\\) is a circle of radius \\(a\\) centered at \\((0,a)\\) saves time. Similarly, \\(r = 2a\\cos\\theta\\) is centered at \\((a,0)\\)."
    },
    77: {
        tested: "Polar area — lemniscate \\(r^2 = a\\cos(2\\theta)\\) (BC)",
        tips: "Lemniscates only exist where the right side is non-negative. For \\(r^2 = a\\cos(2\\theta)\\), valid when \\(\\cos(2\\theta) \\ge 0\\), i.e., \\(|\\theta| \\le \\pi/4\\) and \\(|\\theta - \\pi| \\le \\pi/4\\). Use symmetry to simplify: compute one lobe and multiply. On the AP exam, if you see \\(r^2 = \\ldots\\), remember that \\(r\\) can be negative, so the curve has two symmetric lobes."
    },

    // ===== VOLUMES OF REVOLUTION =====
    78: {
        tested: "Disk method — rotation about x-axis (AB/BC)",
        tips: "Disk method: \\(V = \\pi\\int_a^b [f(x)]^2\\,dx\\). This is one of the most common volume problems on both AB and BC exams. Common mistakes: (1) forgetting the \\(\\pi\\) outside, (2) not squaring the function, (3) confusing radius with height. The AP rubric awards separate points for the integrand setup and the evaluation."
    },
    79: {
        tested: "Shell method — rotation about y-axis (AB/BC)",
        tips: "Shell method: \\(V = 2\\pi\\int_a^b x \\cdot f(x)\\,dx\\). Use shells when rotating about the y-axis but the function is given as \\(y = f(x)\\). On the AP exam, you can also convert to \\(x = g(y)\\) and use disks — choose whichever gives a simpler integral. The AP exam accepts either method as long as the setup is correct."
    },
    80: {
        tested: "Washer method — region between two curves (AB/BC)",
        tips: "Washer method: \\(V = \\pi\\int_a^b [R(x)]^2 - [r(x)]^2\\,dx\\). Critical: \\(R\\) is the OUTER radius (farther from axis) and \\(r\\) is the INNER radius (closer to axis). On the AP exam, always find intersections first to determine bounds. A common error is subtracting the functions before squaring: \\((R-r)^2 \\neq R^2 - r^2\\)."
    },
    81: {
        tested: "Washer method — rotation about a non-axis line (AB/BC)",
        tips: "When rotating about \\(y = k\\) (not the x-axis), radii are DISTANCES from the axis: outer \\(R = f(x) - k\\) (or \\(k - f(x)\\) if axis is above). On the AP exam, draw a quick sketch showing the axis and measure distances carefully. The most common error: using \\(f(x)\\) directly instead of the distance from the axis of rotation."
    },
    82: {
        tested: "Volumes with known cross-sections (AB/BC)",
        tips: "Cross-section problems: \\(V = \\int_a^b A(x)\\,dx\\) where \\(A(x)\\) is the cross-sectional area. Common shapes: squares (\\(s^2\\)), semicircles (\\(\\frac{\\pi s^2}{8}\\)), equilateral triangles (\\(\\frac{\\sqrt{3}}{4}s^2\\)), isosceles right triangles (\\(\\frac{s^2}{2}\\)). On the AP exam, the 'side length' \\(s\\) is usually the distance between two curves. These are NOT revolution problems — no \\(\\pi\\) from rotation."
    },
    83: {
        tested: "Washer method — rotation about \\(y = k\\) above the region (AB/BC)",
        tips: "When the axis of rotation is ABOVE the region, the outer radius goes to the farther boundary (the x-axis here: \\(R = k - 0 = k\\)) and the inner radius goes to the curve (\\(r = k - f(x)\\)). On the AP exam, always ask: 'Which boundary is farther from the axis?' That's your outer radius. Sketch the cross-section perpendicular to the axis of rotation."
    },
    84: {
        tested: "Disk method — basic rational function (AB/BC)",
        tips: "Rotating \\(y = 1/x\\) about the x-axis gives the 'Gabriel's Horn' shape (for infinite bounds). On the AP exam with finite bounds, this is straightforward: \\(\\pi\\int (1/x)^2\\,dx = \\pi\\int x^{-2}\\,dx\\). Remember: \\(\\int x^{-2}\\,dx = -x^{-1}\\), not \\(\\ln|x|\\). Confusing \\(1/x^2\\) with \\(1/x\\) is a common AP mistake."
    },
    85: {
        tested: "Washer method — rotation about a vertical line \\(x = k\\) (AB/BC)",
        tips: "When rotating about a vertical line like \\(x = 5\\), integrate with respect to \\(y\\). Radii are horizontal distances: \\(R = 5 - y^2\\) (distance from axis to parabola) and \\(r = 5 - 4 = 1\\) (distance from axis to vertical line \\(x=4\\)). On the AP exam, always identify whether to integrate w.r.t. \\(x\\) or \\(y\\) based on the axis orientation. Vertical axis → integrate w.r.t. \\(y\\)."
    }
};
