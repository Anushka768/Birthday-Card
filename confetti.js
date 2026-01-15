var confetti = {
	maxCount: 150,
	speed: 2,
	frameInterval: 15,
	alpha: 1.0,
	gradient: false,
	start: null,
	stop: null,
	toggle: null,
	pause: null,
	resume: null,
	togglePause: null,
	remove: null,
	isPaused: null,
	isRunning: null
};

(function () {
	confetti.start = startConfetti;
	confetti.stop = stopConfetti;
	confetti.toggle = toggleConfetti;
	confetti.pause = pauseConfetti;
	confetti.resume = resumeConfetti;
	confetti.togglePause = toggleConfettiPause;
	confetti.isPaused = isConfettiPaused;
	confetti.remove = removeConfetti;
	confetti.isRunning = isConfettiRunning;

	var colors = [
		"rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,",
		"rgba(255,192,203,", "rgba(106,90,205,", "rgba(173,216,230,",
		"rgba(238,130,238,", "rgba(152,251,152,", "rgba(70,130,180,",
		"rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"
	];

	var streamingConfetti = false;
	var pause = false;
	var particles = [];
	var context = null;
	var waveAngle = 0;

	function resetParticle(p, w, h) {
		p.color = colors[Math.random() * colors.length | 0] + confetti.alpha + ")";
		p.x = Math.random() * w;
		p.y = Math.random() * h - h;
		p.diameter = Math.random() * 10 + 5;
		p.tilt = Math.random() * 10 - 10;
		p.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		p.tiltAngle = Math.random() * Math.PI;
		return p;
	}

	function startConfetti(timeout) {
		var canvas = document.getElementById("confetti-canvas");
		if (!canvas) {
			canvas = document.createElement("canvas");
			canvas.id = "confetti-canvas";
			canvas.style.cssText =
				"position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:999999";
			document.body.prepend(canvas);
			context = canvas.getContext("2d");
			resize();
			window.addEventListener("resize", resize);
		}

		while (particles.length < confetti.maxCount)
			particles.push(resetParticle({}, canvas.width, canvas.height));

		streamingConfetti = true;
		pause = false;
		run();

		if (timeout) setTimeout(stopConfetti, timeout);
	}

	function stopConfetti() {
		streamingConfetti = false;
	}

	function removeConfetti() {
		stopConfetti();   
		particles = [];
		if (context)
			context.clearRect(0, 0, window.innerWidth, window.innerHeight);
	}

	function toggleConfetti() {
		streamingConfetti ? stopConfetti() : startConfetti();
	}

	function pauseConfetti() { pause = true; }
	function resumeConfetti() { pause = false; run(); }
	function toggleConfettiPause() { pause ? resumeConfetti() : pauseConfetti(); }
	function isConfettiPaused() { return pause; }
	function isConfettiRunning() { return streamingConfetti; }

	function run() {
		if (pause || !particles.length) return;
		context.clearRect(0, 0, window.innerWidth, window.innerHeight);
		update();
		draw();
		requestAnimationFrame(run);
	}

	function draw() {
		particles.forEach(p => {
			context.beginPath();
			context.lineWidth = p.diameter;
			context.strokeStyle = p.color;
			context.moveTo(p.x, p.y);
			context.lineTo(p.x + p.tilt, p.y + p.tilt);
			context.stroke();
		});
	}

	function update() {
		waveAngle += 0.01;
		particles.forEach((p, i) => {
			p.tiltAngle += p.tiltAngleIncrement;
			p.x += Math.sin(waveAngle);
			p.y += (Math.cos(waveAngle) + p.diameter + confetti.speed) * 0.5;
			p.tilt = Math.sin(p.tiltAngle) * 15;

			if (p.y > window.innerHeight)
				streamingConfetti ? resetParticle(p, window.innerWidth, window.innerHeight) : particles.splice(i, 1);
		});
	}

	function resize() {
		var c = document.getElementById("confetti-canvas");
		if (c) {
			c.width = window.innerWidth;
			c.height = window.innerHeight;
		}
	}
})();
