extends Node3D

var cartridgeOn : bool = false
@export var area3D : Area3D
@export var message : String = ""

func _ready() -> void:
	area3D.area_entered.connect(_on_area_3d_entered)
	area3D.area_exited.connect(_on_area_3d_exited)

func _on_area_3d_entered(body: Area3D) -> void:
	if body.is_in_group("PlayerInteractiveFrustrum"):
		SignalBus.change_text_interactive_label.emit(message)
		SignalBus.change_visible_interactive_label.emit(true)
		
func _on_area_3d_exited(body: Area3D) -> void:
	if body.is_in_group("PlayerInteractiveFrustrum"):
		SignalBus.change_visible_interactive_label.emit(false)
		
