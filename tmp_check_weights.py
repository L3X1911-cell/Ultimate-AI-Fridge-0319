try:
    import onnx
    model = onnx.load("public/best.onnx")
    # Check first initializer type
    init_type = model.graph.initializer[0].data_type
    # 1=FLOAT, 10=FLOAT16
    type_map = {1: "FP32", 10: "FP16"}
    print(f"Weight (Initializer) Type: {type_map.get(init_type, f'Type({init_type})')}")
except Exception as e:
    print(f"Error: {e}")
