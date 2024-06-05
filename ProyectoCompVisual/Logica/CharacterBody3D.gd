extends CharacterBody3D
class_name Player3D

const SPEED = 5.0
var mouse_sensivity = 0.002
# Get the gravity from the project settings to be synced with RigidBody nodes.
var gravity: float = ProjectSettings.get_setting("physics/3d/default_gravity")
var actualInteractionObject : Node3D = null 
@onready var cam :Camera3D = $Camera3D
@onready var lanter = $Camera3D/Lantern

func _unhandled_input(event: InputEvent) -> void:
	if Global3d.gameMode == Global3d.FirstPerson:
		if event is InputEventMouseButton:
			Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
		elif event.is_action_pressed("ui_cancel"):
			Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
		if Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
			if event is InputEventMouseMotion:
				rotate_y(-event.relative.x * mouse_sensivity)
				cam.rotate_x(-event.relative.y * mouse_sensivity)
	#elif Global3d.gameMode == Global3d.TV:
		

func _physics_process(delta: float) -> void:
	if Global3d.gameMode == Global3d.FirstPerson:
		if not is_on_floor():
			velocity.y -= gravity * delta
		var input_dir := Input.get_vector("left", "right", "up", "down")
		var direction = (transform.basis * Vector3(input_dir.x, 0, input_dir.y)).normalized()
		if direction:
			velocity.x = direction.x * SPEED
			velocity.z = direction.z * SPEED
		else:
			velocity.x = move_toward(velocity.x, 0, SPEED)
			velocity.z = move_toward(velocity.z, 0, SPEED)
		move_and_slide()

func set_interaction_object(object : Node3D) -> void:
	actualInteractionObject = object
