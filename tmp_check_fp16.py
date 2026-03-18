try:
    import onnx
    model = onnx.load("public/best.onnx")
    input0 = model.graph.input[0]
    input_type = input0.type.tensor_type.elem_type
    type_map = {1: "FP32", 10: "FP16", 11: "DOUBLE"}
    print(f"FP Type: {type_map.get(input_type, f'Type({input_type})')}")
except Exception as e:
    print(f"Error: {e}")
