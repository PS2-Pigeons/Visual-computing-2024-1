shader_type spatial;
uniform sampler2D NOISE_PATTERN;
uniform float amount = 40.0;

void fragment() {
	vec2 uv = UV*0.05;
	float a = fract(sin(dot(UV, vec2(12, 78) * TIME)) * 200.0) * 1.9;
	vec4 col = texture(NOISE_PATTERN, UV);
	col.a *= pow(a, amount);
	ALBEDO = vec3(col.a);
}