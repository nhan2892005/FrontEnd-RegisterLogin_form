"use strict";
console.clear(),
	(function () {
		let t,
			e,
			i,
			n,
			o,
			r,
			a,
			c,
			l,
			s = Matter.World,
			d = Matter.Engine,
			h = Matter.Render,
			u = Matter.Runner,
			f = Matter.Composites,
			w = Matter.Common,
			M = Matter.Composite,
			m = Matter.Bodies,
			g = Matter.Body;
		const p = 500;
		let S,
			k = 1;
		const v = [
				"oklch(70% 0.1 24)",
				"oklch(75% 0.1 24)",
				"oklch(80% 0.1 24)",
				"oklch(85% 0.1 24)",
				"oklch(90% 0.1 24)",
				"oklch(95% 0.1 24)",
				"oklch(100% 0.1 24)"
			],
			y = [-0.7, 0.7, -0.8, 0.8];
		function b() {
			var y;
			(o = window.innerWidth),
				(r = window.innerHeight),
				(S = Math.min(((y = 0.8), Math.round((y * o) / 100)), 3)),
				(e = d.create()),
				(t = e.world),
				(i = h.create({
					element: document.body,
					engine: e,
					options: {
						hasBounds: !0,
						width: o,
						height: r,
						wireframes: !1,
						background: "transparent",
						pixelRatio: window.devicePixelRatio
					}
				})),
				(n = u.create()),
				u.run(n, e),
				(a = m.rectangle(-p / 2, r / 2, p, 2 * r, {
					friction: 0,
					frictionStatic: 0,
					isStatic: !0
				})),
				(c = m.rectangle(o + p / 2, r / 2, p, 2 * r, {
					friction: 0,
					frictionStatic: 0,
					isStatic: !0
				})),
				s.add(e.world, [a, c]),
				(l = m.rectangle(o / 2 - p, r + p / 2 + 5 * S, o + 2 * p, p, {
					isStatic: !0,
					label: "pit"
				})),
				M.add(t, l),
				(function () {
					let e = 7 * S,
						i = 7 * S,
						n = f.stack(
							0,
							0,
							Math.ceil(o / (2 * S + e)) + 1,
							Math.ceil(r / (2 * S + i)),
							e,
							i,
							function (t, e) {
								let i = w.choose(v);
								return (function (t, e, i) {
									let n = {
											angle: -Math.PI / 6,
											restitution: 1,
											friction: 0,
											frictionStatic: 0,
											mass: k,
											isStatic: !0,
											render: { fillStyle: i, lineWidth: 0 },
											chamfer: { radius: [S, S, S, S] }
										},
										o = Object.assign({}, n);
									o.angle = Math.PI / 6;
									let r = m.rectangle(0, 0, 2 * S, 4 * S, n),
										a = m.rectangle(1.24 * S, 0, 2 * S, 4 * S, o);
									console.log(a);
									let c = g.create({ parts: [r, a], isStatic: !0 });
									return g.setPosition(c, { x: t, y: e }), c;
								})(t, e, i);
							}
						);
					M.add(t, n);
				})(),
				Matter.Events.on(e, "collisionStart", (e) => {
					e.pairs.forEach((e, i) => {
						"pit" === e.bodyA.label && M.remove(t, e.bodyB);
					});
				}),
				h.run(i);
		}
		window.onload = () => {
			b();
		};
		let x = null;
		(window.onresize = () => {
			clearTimeout(x),
				(x = setTimeout(function () {
					(o = window.innerWidth),
						(r = window.innerHeight),
						i &&
							(i.canvas && (i.canvas.remove(), (i.canvas = null)),
							i.context && (i.context = null),
							i.textures && (i.textures = {})),
						s.clear(t),
						d.clear(e),
						h.stop(i),
						u.stop(n),
						b();
				}, 1e3));
		}),
			setInterval(() => {
				!(function (t, i) {
					let n = w.choose(v);
					const o = m.circle(t, i, 3 * S, {
						restitution: 1,
						friction: 0,
						frictionStatic: 0,
						mass: k,
						render: { fillStyle: n, strokeStyle: n, lineWidth: 0 }
					});
					s.add(e.world, o);
					let r = w.choose(y);
					g.applyForce(
						o,
						Matter.Vector.create(t, i),
						Matter.Vector.create(0.01 * r, 0)
					);
				})(Math.random() * o, 0);
			}, 320);
	})();
