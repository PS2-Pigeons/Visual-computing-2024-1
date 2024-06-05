extends Area3D
var isPlayerHere = false
var onLight = true
const selfName = "Lampara"

func _ready() -> void:
	area_entered.connect(_on_area_entered)
	area_exited.connect(_on_area_exited)

func _process(_delta: float) -> void:
	if isPlayerHere and Input.is_action_just_pressed("interact"):
		var tween = create_tween()
		if onLight:
			tween.tween_property($"../lampara/OmniLight3D","light_energy",0,0.3)
			onLight = !onLight
		else:
			tween.tween_property($"../lampara/OmniLight3D","light_energy",0.7,0.3)
			onLight = !onLight


func _on_area_entered(area: Area3D) -> void:
	if area.is_in_group("PlayerInteractiveFrustrum") :
		SignalBus.change_visible_interactive_label.emit(true)
		SignalBus.change_text_interactive_label.emit("Press E to toggle the lamp")
		isPlayerHere = true


func _on_area_exited(area: Area3D) -> void:
	if area.is_in_group("PlayerInteractiveFrustrum"):
		SignalBus.change_visible_interactive_label.emit(false)
		isPlayerHere = false
