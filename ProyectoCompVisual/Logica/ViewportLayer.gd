extends CanvasLayer


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	SignalBus.change_text_interactive_label.connect(change_text_interactive_label)
	SignalBus.change_visible_interactive_label.connect(change_visible_interactive_label)

func change_text_interactive_label(newText) -> void:
	$InteractiveLayer.text = newText

func change_visible_interactive_label(newVisible) -> void:
	$InteractiveLayer.visible = newVisible
