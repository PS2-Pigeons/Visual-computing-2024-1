extends Node3D
@onready var aspas = $Aspas

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	aspas.rotate_x(delta * 2)
