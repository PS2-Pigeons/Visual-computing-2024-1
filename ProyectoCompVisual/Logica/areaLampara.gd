extends Area3D
var isPlayerHere = false
var onLight = true

func _process(delta: float) -> void:
	if isPlayerHere and Input.is_action_just_pressed("interact"):
		var tween = create_tween()
		if onLight:
			tween.tween_property($"../lampara/OmniLight3D","light_energy",0,0.3)
			onLight = !onLight
		else:
			tween.tween_property($"../lampara/OmniLight3D","light_energy",0.7,0.3)
			onLight = !onLight

func _on_body_entered(body: Node3D) -> void:
	if body is Player3D:
		body.set_is_in_interactive_area(true)
		SignalBus.change_text_interactive_label.emit("Press E to toggle the light")
		isPlayerHere = true

func _on_body_exited(body: Node3D) -> void:
	if body is Player3D:
		body.set_is_in_interactive_area(false)
		isPlayerHere = false
