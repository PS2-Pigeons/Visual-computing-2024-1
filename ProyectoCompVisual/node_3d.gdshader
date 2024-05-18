shader_type spatial;

void light() {
	// light we wish to accumulate
	DIFFUSE_LIGHT += ALBEDO * ATTENUATION * LIGHT_COLOR * max(dot(LIGHT,NORMAL), 0.0);

	// assign the result
	//SPECULAR_LIGHT = round(DIFFUSE_LIGHT*16.0 - 0.5)/16.0; // posterizes the final color
	SPECULAR_LIGHT = DIFFUSE_LIGHT; // do nothing to the result

	// cancel all contribution of the diffuse_light variable
	SPECULAR_LIGHT -= ALBEDO * DIFFUSE_LIGHT;
}