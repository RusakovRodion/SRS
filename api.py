from flask import Blueprint, request, jsonify

api_blueprint = Blueprint('api', __name__)

# ----------- Users -----------
@api_blueprint.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    return jsonify({"message": "User created", "data": data}), 201

@api_blueprint.route('/user/<int:id>', methods=['GET'])
def get_user_by_id(id):
    return jsonify({"id": id, "name": "Example User"}), 200

@api_blueprint.route('/user/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    return jsonify({"message": f"User {id} updated", "data": data}), 200

@api_blueprint.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    return jsonify({"message": f"User {id} deleted"}), 200

@api_blueprint.route('/user/logout', methods=['POST'])
def logout_user():
    return jsonify({"message": "User logged out"}), 200

# ----------- Projects -----------
@api_blueprint.route('/project', methods=['POST'])
def create_project():
    data = request.get_json()
    return jsonify({"message": "Project created", "data": data}), 201

@api_blueprint.route('/project/<int:id>', methods=['GET'])
def get_project_by_id(id):
    return jsonify({"id": id, "name": "Example Project"}), 200

@api_blueprint.route('/project/<int:id>', methods=['PUT'])
def update_project(id):
    data = request.get_json()
    return jsonify({"message": f"Project {id} updated", "data": data}), 200

@api_blueprint.route('/project/<int:id>', methods=['DELETE'])
def delete_project(id):
    return jsonify({"message": f"Project {id} deleted"}), 200

# ----------- Objects -----------
@api_blueprint.route('/object', methods=['POST'])
def create_object():
    data = request.get_json()
    return jsonify({"message": "Object created", "data": data}), 201

@api_blueprint.route('/object/<int:id>', methods=['GET'])
def get_object_by_id(id):
    return jsonify({"id": id, "name": "Example Object"}), 200

@api_blueprint.route('/object/<int:id>', methods=['PUT'])
def update_object(id):
    data = request.get_json()
    return jsonify({"message": f"Object {id} updated", "data": data}), 200

@api_blueprint.route('/object/<int:id>', methods=['DELETE'])
def delete_object(id):
    return jsonify({"message": f"Object {id} deleted"}), 200

# ----------- Hardware -----------
@api_blueprint.route('/hardware', methods=['POST'])
def create_hardware():
    data = request.get_json()
    return jsonify({"message": "Hardware created", "data": data}), 201

@api_blueprint.route('/hardware/<int:id>', methods=['GET'])
def get_hardware_by_id(id):
    return jsonify({"id": id, "name": "Example Hardware"}), 200

@api_blueprint.route('/hardware/<int:id>', methods=['PUT'])
def update_hardware(id):
    data = request.get_json()
    return jsonify({"message": f"Hardware {id} updated", "data": data}), 200

@api_blueprint.route('/hardware/<int:id>', methods=['DELETE'])
def delete_hardware(id):
    return jsonify({"message": f"Hardware {id} deleted"}), 200

# ----------- Characteristics -----------
@api_blueprint.route('/characteristics', methods=['POST'])
def create_characteristics():
    data = request.get_json()
    return jsonify({"message": "Characteristics created", "data": data}), 201

@api_blueprint.route('/characteristics/<int:id>', methods=['GET'])
def get_characteristics_by_id(id):
    return jsonify({"id": id, "name": "Example Characteristics"}), 200

@api_blueprint.route('/characteristics/<int:id>', methods=['PUT'])
def update_characteristics(id):
    data = request.get_json()
    return jsonify({"message": f"Characteristics {id} updated", "data": data}), 200

@api_blueprint.route('/characteristics/<int:id>', methods=['DELETE'])
def delete_characteristics(id):
    return jsonify({"message": f"Characteristics {id} deleted"}), 200

# ----------- Unit_of_measurement -----------
@api_blueprint.route('/unit_of_measurement', methods=['POST'])
def create_unit_of_measurement():
    data = request.get_json()
    return jsonify({"message": "Unit_of_measurement created", "data": data}), 201

@api_blueprint.route('/unit_of_measurement/<int:id>', methods=['GET'])
def get_unit_of_measurement_by_id(id):
    return jsonify({"id": id, "name": "Example Unit_of_measurement"}), 200

@api_blueprint.route('/unit_of_measurement/<int:id>', methods=['PUT'])
def update_unit_of_measurement(id):
    data = request.get_json()
    return jsonify({"message": f"Unit_of_measurement {id} updated", "data": data}), 200

@api_blueprint.route('/unit_of_measurement/<int:id>', methods=['DELETE'])
def delete_unit_of_measurement(id):
    return jsonify({"message": f"Unit_of_measurement {id} deleted"}), 200
